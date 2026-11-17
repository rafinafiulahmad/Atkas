import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  User,
} from 'lucide-react';
import { COURSE_CATEGORIES } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../services/demoAuth';
import { SeoHead } from './SeoHead';

interface LayoutProps {
  children: React.ReactNode;
  customTitle?: string;
  customDescription?: string;
  customJsonLd?: Record<string, unknown>;
}

const CATEGORY_LINKS = COURSE_CATEGORIES.map((cat) => ({
  to: `/programmes/${cat.slug}`,
  label: cat.title,
  level: cat.levelLabel,
}));

const MENU_PATHS = [
  '/menu',
  '/about',
  '/scholarships',
  '/free-masterclass',
  '/faq',
  '/contact',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/sitemap',
  '/login',
  '/signup',
  '/profile',
];

const BOTTOM_NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/', icon: Home },
  { id: 'programmes', label: 'Programmes', to: '/programmes', icon: BookOpen },
  { id: 'resources', label: 'Resources', to: '/resources', icon: FileText },
  { id: 'menu', label: 'Menu', to: '/menu', icon: Menu },
] as const;

export function Layout({
  children,
  customTitle,
  customDescription,
  customJsonLd,
}: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategoriesOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Outside click and Escape key listeners for desktop dropdowns
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCategoriesOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Detect keyboard / input focus on mobile to hide bottom navigation bar
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        setIsInputFocused(true);
      }
    };
    const handleFocusOut = () => {
      setIsInputFocused(false);
    };
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Desktop nav active indicator logic
  const isNavActive = (path: string) => {
    if (path === '/programmes') {
      return (
        location.pathname === '/programmes' ||
        (location.pathname.startsWith('/programmes/') &&
          !CATEGORY_LINKS.some((c) => location.pathname === c.to))
      );
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isCategoryActive = CATEGORY_LINKS.some((c) => location.pathname === c.to);

  // Mobile bottom navigation active indicator logic
  const isBottomItemActive = (id: (typeof BOTTOM_NAV_ITEMS)[number]['id']) => {
    if (id === 'home') {
      return location.pathname === '/';
    }
    if (id === 'programmes') {
      return (
        location.pathname === '/programmes' ||
        location.pathname.startsWith('/programmes/')
      );
    }
    if (id === 'resources') {
      return (
        location.pathname === '/resources' ||
        location.pathname.startsWith('/resources/')
      );
    }
    if (id === 'menu') {
      return MENU_PATHS.some(
        (m) => location.pathname === m || location.pathname.startsWith(m + '/')
      );
    }
    return false;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[var(--color-heading)] pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <SeoHead
        pathname={location.pathname}
        customTitle={customTitle}
        customDescription={customDescription}
        customJsonLd={customJsonLd}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[8px] focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        মূল অংশে যান
      </a>

      {/* Top Header (Transparent, scrolls with page) */}
      <header className="absolute top-0 inset-x-0 z-30 border-b border-white/15 bg-transparent">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Left Logo: White rounded square with blue "A" + white "Atlas AI Education" (clicks to Home) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-[8px] py-1"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white font-en text-lg font-bold text-[var(--color-primary)] shadow-xs"
            >
              A
            </span>
            <span className="font-en text-base font-bold tracking-tight text-white sm:text-lg">
              Atlas AI Education
            </span>
          </Link>

          {/* Desktop Navigation (≥768px): About · Categories (dropdown) · Programmes · Resources · Scholarships · FAQ · Contact */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-2.5 lg:gap-4 xl:gap-6"
          >
            <Link
              to="/about"
              aria-current={isNavActive('/about') ? 'page' : undefined}
              className={`font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                isNavActive('/about')
                  ? 'border-white font-bold text-white'
                  : 'border-transparent font-medium text-blue-100 hover:text-white'
              }`}
            >
              About
            </Link>

            {/* Categories Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={categoriesOpen}
                aria-haspopup="menu"
                onClick={() => setCategoriesOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1 font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors cursor-pointer ${
                  isCategoryActive
                    ? 'border-white font-bold text-white'
                    : 'border-transparent font-medium text-blue-100 hover:text-white'
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-150 ${
                    categoriesOpen ? 'rotate-180 text-white' : 'text-blue-100'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {categoriesOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full w-72 pt-2 z-30"
                >
                  <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-2 shadow-lg">
                    {CATEGORY_LINKS.map((cat) => {
                      const active = location.pathname === cat.to;
                      return (
                        <Link
                          key={cat.to}
                          to={cat.to}
                          role="menuitem"
                          onClick={() => setCategoriesOpen(false)}
                          className={`block rounded-[8px] px-3 py-2.5 transition-colors ${
                            active
                              ? 'bg-[var(--color-tint)] text-[var(--color-primary)]'
                              : 'text-[var(--color-heading)] hover:bg-[var(--color-soft-bg)]'
                          }`}
                        >
                          <span className="font-en block text-[11px] font-medium text-[var(--color-body)]">
                            {cat.level}
                          </span>
                          <span className="font-en block text-sm font-semibold">{cat.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/programmes"
              aria-current={isNavActive('/programmes') ? 'page' : undefined}
              className={`font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                isNavActive('/programmes')
                  ? 'border-white font-bold text-white'
                  : 'border-transparent font-medium text-blue-100 hover:text-white'
              }`}
            >
              Programmes
            </Link>

            <Link
              to="/resources"
              aria-current={isNavActive('/resources') ? 'page' : undefined}
              className={`font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                isNavActive('/resources')
                  ? 'border-white font-bold text-white'
                  : 'border-transparent font-medium text-blue-100 hover:text-white'
              }`}
            >
              Resources
            </Link>

            <Link
              to="/scholarships"
              aria-current={isNavActive('/scholarships') ? 'page' : undefined}
              className={`font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                isNavActive('/scholarships')
                  ? 'border-white font-bold text-white'
                  : 'border-transparent font-medium text-blue-100 hover:text-white'
              }`}
            >
              Scholarships
            </Link>

            <Link
              to="/faq"
              aria-current={isNavActive('/faq') ? 'page' : undefined}
              className={`font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                isNavActive('/faq')
                  ? 'border-white font-bold text-white'
                  : 'border-transparent font-medium text-blue-100 hover:text-white'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              aria-current={isNavActive('/contact') ? 'page' : undefined}
              className={`font-en text-xs lg:text-sm whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
                isNavActive('/contact')
                  ? 'border-white font-bold text-white'
                  : 'border-transparent font-medium text-blue-100 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Area: Desktop Auth (≥768px) and Mobile Avatar (<768px) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Desktop Auth Area (≥768px) */}
            <div className="hidden md:flex items-center">
              {isAuthenticated && user ? (
                <div ref={userDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="menu"
                    aria-label="Account menu"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/30 bg-white/10 pl-1.5 pr-3 text-white transition-colors hover:bg-white/20 cursor-pointer"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white font-en text-xs font-bold text-[var(--color-primary)]">
                      {getInitials(user.name)}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white transition-transform ${
                        userMenuOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {userMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-2 w-56 rounded-[12px] border border-[var(--color-border)] bg-white p-2 shadow-lg z-30"
                    >
                      <div className="border-b border-[var(--color-border)] px-3 py-2">
                        <p className="truncate text-sm font-semibold text-[var(--color-heading)]">
                          {user.name}
                        </p>
                        <p className="truncate font-en text-xs text-[var(--color-body)]">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                        className="mt-1 flex min-h-[44px] items-center gap-2.5 rounded-[8px] px-3 font-en text-sm font-medium text-[var(--color-heading)] transition-colors hover:bg-[var(--color-soft-bg)]"
                      >
                        <User className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="flex min-h-[44px] w-full items-center gap-2.5 rounded-[8px] px-3 font-en text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] border border-white/60 bg-white/10 px-4 py-2 font-en text-sm font-semibold text-white transition-colors hover:bg-white/20 whitespace-nowrap"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Header Right (<768px): 44px Round Avatar Icon */}
            <div className="flex md:hidden items-center">
              {isAuthenticated && user ? (
                <Link
                  to="/profile"
                  aria-label="My Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-en text-sm font-bold text-[var(--color-primary)] shadow-xs transition-transform active:scale-95"
                >
                  {getInitials(user.name)}
                </Link>
              ) : (
                <Link
                  to="/login"
                  aria-label="Login"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-xs transition-colors hover:bg-white/20 active:bg-white/30"
                >
                  <User className="h-5 w-5 text-white" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Global 4-Column Footer (#07142F) */}
      <footer className="bg-[var(--color-footer)] text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Logo + Statement */}
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--color-primary)] font-en text-base font-bold text-white"
                >
                  A
                </span>
                <span className="font-en text-base font-bold text-white">Atlas AI Education</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Atlas AI Institute-এর একটি education initiative। AI • Education • Skills • Responsible Innovation
              </p>
            </div>

            {/* Column 2: Explore */}
            <div>
              <h3 className="font-en text-sm font-semibold text-white">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/about" className="font-en transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/programmes" className="font-bn transition-colors hover:text-white">
                    সব Programme
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="font-en transition-colors hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/free-masterclass" className="font-en transition-colors hover:text-white">
                    Free Session
                  </Link>
                </li>
                <li>
                  <Link to="/scholarships" className="font-en transition-colors hover:text-white">
                    Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="font-en transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div>
              <h3 className="font-en text-sm font-semibold text-white">Categories</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {CATEGORY_LINKS.map((cat) => (
                  <li key={cat.to}>
                    <Link to={cat.to} className="font-en transition-colors hover:text-white">
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Policies */}
            <div>
              <h3 className="font-en text-sm font-semibold text-white">Policies</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/contact" className="font-en transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="font-en transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="font-en transition-colors hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="font-en transition-colors hover:text-white">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Divider + Mandatory Disclosure */}
          <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
            <p className="leading-relaxed">
              © 2026 Atlas AI Education · Atlas AI Institute · Non-accredited programme। চাকরি বা আয়ের কোনো guarantee নেই।
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (<768px, fixed bottom) */}
      <nav
        aria-label="Mobile navigation"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        className={`fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-border)] bg-white shadow-[0_-2px_10px_rgba(11,31,75,0.06)] md:hidden transition-transform duration-200 ${
          isInputFocused ? 'translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
      >
        <div className="grid grid-cols-4 items-center h-16 px-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const active = isBottomItemActive(item.id);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className="flex min-h-[48px] h-full flex-col items-center justify-center text-center select-none cursor-pointer"
              >
                <div
                  className={`flex flex-col items-center justify-center w-full max-w-[72px] sm:max-w-[80px] py-1 px-1.5 rounded-full transition-colors duration-150 ${
                    active
                      ? 'bg-[var(--color-tint)] text-[var(--color-primary)] font-bold'
                      : 'bg-transparent text-[var(--color-body)] font-medium hover:text-[var(--color-primary)]'
                  }`}
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={active ? 2 : 1.75}
                    aria-hidden="true"
                  />
                  <span className="font-en text-[11px] leading-tight tracking-tight mt-0.5">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
