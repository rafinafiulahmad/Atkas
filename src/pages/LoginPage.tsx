import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || '/profile';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('দয়া করে একটি সঠিক Email address লিখুন।');
      return;
    }
    if (password.length < 8) {
      setError('Password কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }

    login(email);
    navigate(from, { replace: true });
  };

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Login' }]}
        title="Login"
        subtitle="আপনার browser-এর demo account-এ প্রবেশ করুন।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
          <div className="mb-5 flex items-start gap-2.5 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-tint)] p-4 text-sm font-medium text-[var(--color-heading)]">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
              aria-hidden="true"
            />
            <span>এটা demo authentication। আসল account system পরে যুক্ত হবে।</span>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8"
          >
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2 rounded-[8px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-[var(--color-heading)]"
                >
                  ইমেইল (Email) *
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-[var(--color-heading)]"
                >
                  Password *
                </label>
                <input
                  id="login-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-[8px] bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] cursor-pointer"
            >
              Login করুন
            </button>

            <p className="mt-5 border-t border-[var(--color-border)] pt-5 text-center text-sm text-[var(--color-body)]">
              এখনো demo account নেই?{' '}
              <Link
                to="/signup"
                state={{ from }}
                className="font-semibold text-[var(--color-primary)] hover:underline"
              >
                Sign up করুন →
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
