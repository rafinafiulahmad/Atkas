import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CategorySlug } from '../data/coursesData';
import {
  clearAllDemoData,
  demoLogin,
  demoLogout,
  demoSignUp,
  DemoSessionState,
  DemoUserProfile,
  getDemoState,
  IdentityRole,
  markFreeMasterclassRegistered,
  toggleSavedProgramme,
  toggleSavedResource,
  updateDemoProfile,
} from '../services/demoAuth';

interface AuthContextValue extends DemoSessionState {
  login: (email: string) => DemoUserProfile;
  signup: (name: string, email: string) => DemoUserProfile;
  logout: () => void;
  updateProfile: (updates: {
    name?: string;
    phone?: string;
    identity?: IdentityRole | '';
    bio?: string;
    interests?: CategorySlug[];
    emailUpdates?: boolean;
  }) => DemoUserProfile | null;
  toggleProgrammeBookmark: (code: string) => void;
  toggleResourceBookmark: (id: string) => void;
  recordFreeMasterclassRegistration: () => void;
  wipeDemoData: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoSessionState>(() => getDemoState());

  const refresh = useCallback(() => {
    setState(getDemoState());
  }, []);

  useEffect(() => {
    const onStorage = () => refresh();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [refresh]);

  const login = useCallback((email: string) => {
    const user = demoLogin({ email });
    setState(getDemoState());
    return user;
  }, []);

  const signup = useCallback((name: string, email: string) => {
    const user = demoSignUp({ name, email });
    setState(getDemoState());
    return user;
  }, []);

  const logout = useCallback(() => {
    demoLogout();
    setState(getDemoState());
  }, []);

  const updateProfile = useCallback(
    (updates: {
      name?: string;
      phone?: string;
      identity?: IdentityRole | '';
      bio?: string;
      interests?: CategorySlug[];
      emailUpdates?: boolean;
    }) => {
      const updated = updateDemoProfile(updates);
      setState(getDemoState());
      return updated;
    },
    []
  );

  const toggleProgrammeBookmark = useCallback((code: string) => {
    toggleSavedProgramme(code);
    setState(getDemoState());
  }, []);

  const toggleResourceBookmark = useCallback((id: string) => {
    toggleSavedResource(id);
    setState(getDemoState());
  }, []);

  const recordFreeMasterclassRegistration = useCallback(() => {
    markFreeMasterclassRegistered();
    setState(getDemoState());
  }, []);

  const wipeDemoData = useCallback(() => {
    clearAllDemoData();
    setState(getDemoState());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateProfile,
        toggleProgrammeBookmark,
        toggleResourceBookmark,
        recordFreeMasterclassRegistration,
        wipeDemoData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
