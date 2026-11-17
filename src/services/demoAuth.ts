import { CategorySlug } from '../data/coursesData';

export type IdentityRole =
  | 'শিক্ষার্থী'
  | 'পেশাজীবী'
  | 'গবেষক'
  | 'প্রতিষ্ঠানের প্রতিনিধি'
  | 'অন্যান্য';

export const IDENTITY_OPTIONS: IdentityRole[] = [
  'শিক্ষার্থী',
  'পেশাজীবী',
  'গবেষক',
  'প্রতিষ্ঠানের প্রতিনিধি',
  'অন্যান্য',
];

export interface DemoUserProfile {
  id: string;
  name: string;
  email: string;
  memberSince: string; // ISO date string recorded at sign-up
  phone: string;
  identity: IdentityRole | '';
  bio: string;
  interests: CategorySlug[];
  emailUpdates: boolean;
}

export interface DemoSessionState {
  isAuthenticated: boolean;
  user: DemoUserProfile | null;
  savedProgrammes: string[];
  savedResources: string[];
  freeMasterclassRegistered: boolean;
}

const STORAGE_KEYS = {
  SESSION_ACTIVE: 'atlas_demo_session_active',
  USER_PROFILE: 'atlas_demo_user_profile',
  SAVED_PROGRAMMES: 'atlas_demo_saved_programmes',
  SAVED_RESOURCES: 'atlas_demo_saved_resources',
  FREE_MASTERCLASS: 'atlas_demo_free_masterclass_registered',
} as const;

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or private-mode errors gracefully
  }
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

function readJson<T>(key: string, fallback: T): T {
  const raw = safeGetItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getInitials(name: string): string {
  const cleaned = name.trim();
  if (!cleaned) return 'U';
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return Array.from(parts[0]).slice(0, 2).join('').toUpperCase();
  }
  const first = Array.from(parts[0])[0] || '';
  const last = Array.from(parts[parts.length - 1])[0] || '';
  return `${first}${last}`.toUpperCase();
}

export function getDemoState(): DemoSessionState {
  const active = safeGetItem(STORAGE_KEYS.SESSION_ACTIVE) === 'true';
  const storedProfile = readJson<DemoUserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);
  const savedProgrammes = readJson<string[]>(STORAGE_KEYS.SAVED_PROGRAMMES, []);
  const savedResources = readJson<string[]>(STORAGE_KEYS.SAVED_RESOURCES, []);
  const freeMasterclassRegistered = safeGetItem(STORAGE_KEYS.FREE_MASTERCLASS) === 'true';

  return {
    isAuthenticated: Boolean(active && storedProfile),
    user: active && storedProfile ? storedProfile : null,
    savedProgrammes: Array.isArray(savedProgrammes) ? savedProgrammes : [],
    savedResources: Array.isArray(savedResources) ? savedResources : [],
    freeMasterclassRegistered,
  };
}

/**
 * Demo sign-up: creates local browser profile and activates session.
 * Password is validated on the form and NEVER persisted anywhere.
 */
export function demoSignUp(input: { name: string; email: string }): DemoUserProfile {
  const cleanName = input.name.trim();
  const cleanEmail = input.email.trim().toLowerCase();
  const existing = readJson<DemoUserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);

  const profile: DemoUserProfile = {
    id: existing && existing.email === cleanEmail ? existing.id : `demo_${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    memberSince:
      existing && existing.email === cleanEmail
        ? existing.memberSince
        : new Date().toISOString(),
    phone: existing && existing.email === cleanEmail ? existing.phone : '',
    identity: existing && existing.email === cleanEmail ? existing.identity : '',
    bio: existing && existing.email === cleanEmail ? existing.bio : '',
    interests: existing && existing.email === cleanEmail ? existing.interests : [],
    emailUpdates: existing && existing.email === cleanEmail ? existing.emailUpdates : false,
  };

  safeSetItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  safeSetItem(STORAGE_KEYS.SESSION_ACTIVE, 'true');
  return profile;
}

/**
 * Demo login: restores existing browser profile if email matches,
 * or initializes a demo session for the given email.
 * Password is validated in UI and NEVER saved or stored.
 */
export function demoLogin(input: { email: string }): DemoUserProfile {
  const cleanEmail = input.email.trim().toLowerCase();
  const existing = readJson<DemoUserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);

  if (existing && existing.email.toLowerCase() === cleanEmail) {
    safeSetItem(STORAGE_KEYS.SESSION_ACTIVE, 'true');
    return existing;
  }

  const fallbackName = cleanEmail.split('@')[0] || 'Learner';
  const profile: DemoUserProfile = {
    id: `demo_${Date.now()}`,
    name: fallbackName,
    email: cleanEmail,
    memberSince: new Date().toISOString(),
    phone: '',
    identity: '',
    bio: '',
    interests: [],
    emailUpdates: false,
  };

  safeSetItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  safeSetItem(STORAGE_KEYS.SESSION_ACTIVE, 'true');
  return profile;
}

export function demoLogout(): void {
  safeSetItem(STORAGE_KEYS.SESSION_ACTIVE, 'false');
}

export function updateDemoProfile(
  updates: Partial<Pick<DemoUserProfile, 'name' | 'phone' | 'identity' | 'bio' | 'interests' | 'emailUpdates'>>
): DemoUserProfile | null {
  const existing = readJson<DemoUserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);
  if (!existing) return null;

  const updated: DemoUserProfile = {
    ...existing,
    ...updates,
    bio: typeof updates.bio === 'string' ? updates.bio.slice(0, 200) : existing.bio,
  };

  safeSetItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
  return updated;
}

export function toggleSavedProgramme(code: string): string[] {
  const current = readJson<string[]>(STORAGE_KEYS.SAVED_PROGRAMMES, []);
  const exists = current.includes(code);
  const next = exists ? current.filter((item) => item !== code) : [...current, code];
  safeSetItem(STORAGE_KEYS.SAVED_PROGRAMMES, JSON.stringify(next));
  return next;
}

export function toggleSavedResource(id: string): string[] {
  const current = readJson<string[]>(STORAGE_KEYS.SAVED_RESOURCES, []);
  const exists = current.includes(id);
  const next = exists ? current.filter((item) => item !== id) : [...current, id];
  safeSetItem(STORAGE_KEYS.SAVED_RESOURCES, JSON.stringify(next));
  return next;
}

export function markFreeMasterclassRegistered(): void {
  safeSetItem(STORAGE_KEYS.FREE_MASTERCLASS, 'true');
}

export function clearAllDemoData(): void {
  safeRemoveItem(STORAGE_KEYS.SESSION_ACTIVE);
  safeRemoveItem(STORAGE_KEYS.USER_PROFILE);
  safeRemoveItem(STORAGE_KEYS.SAVED_PROGRAMMES);
  safeRemoveItem(STORAGE_KEYS.SAVED_RESOURCES);
  safeRemoveItem(STORAGE_KEYS.FREE_MASTERCLASS);
}
