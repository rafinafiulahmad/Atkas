import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { CategoryPage } from './pages/CategoryPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { FreeMasterclassPage } from './pages/FreeMasterclassPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProfilePage } from './pages/ProfilePage';
import { MenuPage } from './pages/MenuPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { SitemapPage } from './pages/SitemapPage';
import { WomensSafetyProgrammePage } from './pages/WomensSafetyProgrammePage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route
            path="/programmes/ai-literacy"
            element={<CategoryPage categorySlug="ai-literacy" />}
          />
          <Route
            path="/programmes/applied-ai"
            element={<CategoryPage categorySlug="applied-ai" />}
          />
          <Route
            path="/programmes/professional-development"
            element={<CategoryPage categorySlug="professional-development" />}
          />
          <Route
            path="/programmes/specialised-programmes"
            element={<CategoryPage categorySlug="specialised-programmes" />}
          />
          <Route
            path="/programmes/womens-safety-in-the-ai-era"
            element={<WomensSafetyProgrammePage />}
          />
          <Route
            path="/programmes/SP-WSAI"
            element={<WomensSafetyProgrammePage />}
          />
          <Route path="/programmes/:code" element={<CourseDetailsPage />} />
          <Route path="/free-masterclass" element={<FreeMasterclassPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
