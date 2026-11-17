import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ChevronRight, LogOut, User } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../services/demoAuth';

interface MenuItem {
  label: string;
  to: string;
}

const EXPLORE_ITEMS: MenuItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Free Session', to: '/free-masterclass' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

const CATEGORY_ITEMS: MenuItem[] = [
  { label: 'AI Literacy', to: '/programmes/ai-literacy' },
  { label: 'Applied AI', to: '/programmes/applied-ai' },
  { label: 'Professional Development', to: '/programmes/professional-development' },
  { label: 'Specialised Programmes', to: '/programmes/specialised-programmes' },
];

const POLICY_ITEMS: MenuItem[] = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Sitemap', to: '/sitemap' },
];

export function MenuPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect to Home if opened on desktop (≥768px)
  if (isDesktop) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout
      customTitle="Menu – Atlas AI Education"
      customDescription="Atlas AI Education মোবাইল মেন্যু ও সব পেজের তালিকা।"
    >
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Menu' }]}
        title="Menu"
        subtitle="Atlas AI Education-এর সকল পেজ, বিভাগ ও অ্যাকাউন্টের তালিকা।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
          {/* Account Section */}
          <div>
            <h2 className="px-1 text-xs font-bold uppercase tracking-wider text-[var(--color-body)]">
              Account
            </h2>
            <div className="mt-2 divide-y divide-[var(--color-border)] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-xs">
              {isAuthenticated && user ? (
                <>
                  <div className="flex min-h-[48px] items-center gap-3 px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-en text-xs font-bold text-white">
                      {getInitials(user.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--color-heading)]">
                        {user.name}
                      </p>
                      <p className="truncate font-en text-xs text-[var(--color-body)]">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="flex min-h-[48px] items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] active:bg-[var(--color-tint)] cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <User className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
                      <span>My Profile</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-[var(--color-body)]" aria-hidden="true" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 active:bg-red-100 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <LogOut className="h-4 w-4 text-red-600" aria-hidden="true" />
                      <span>Logout</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-red-400" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex min-h-[48px] items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] active:bg-[var(--color-tint)] cursor-pointer"
                  >
                    <span>Login</span>
                    <ChevronRight className="h-4 w-4 text-[var(--color-body)]" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/signup"
                    className="flex min-h-[48px] items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] active:bg-[var(--color-tint)] cursor-pointer"
                  >
                    <span>Sign up</span>
                    <ChevronRight className="h-4 w-4 text-[var(--color-body)]" aria-hidden="true" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h2 className="px-1 text-xs font-bold uppercase tracking-wider text-[var(--color-body)]">
              Explore
            </h2>
            <div className="mt-2 divide-y divide-[var(--color-border)] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-xs">
              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-[48px] items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] active:bg-[var(--color-tint)] cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--color-body)]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h2 className="px-1 text-xs font-bold uppercase tracking-wider text-[var(--color-body)]">
              Categories
            </h2>
            <div className="mt-2 divide-y divide-[var(--color-border)] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-xs">
              {CATEGORY_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-[48px] items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] active:bg-[var(--color-tint)] cursor-pointer"
                >
                  <span className="font-en">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--color-body)]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Policies Section */}
          <div>
            <h2 className="px-1 text-xs font-bold uppercase tracking-wider text-[var(--color-body)]">
              Policies
            </h2>
            <div className="mt-2 divide-y divide-[var(--color-border)] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white shadow-xs">
              {POLICY_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-[48px] items-center justify-between px-4 py-3 text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)] active:bg-[var(--color-tint)] cursor-pointer"
                >
                  <span className="font-en">{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-[var(--color-body)]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
