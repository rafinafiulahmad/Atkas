import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';

export function NotFoundPage() {
  return (
    <Layout
      customTitle="পৃষ্ঠাটি খুঁজে পাওয়া যায়নি – Atlas AI Education"
      customDescription="Atlas AI Education-এ আপনি যে page বা course-টি খুঁজছেন তা পাওয়া যায়নি।"
    >
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: '404' }]}
        title="পৃষ্ঠাটি খুঁজে পাওয়া যায়নি"
        subtitle="404 — Page Not Found"
      />

      <section className="bg-[var(--color-soft-bg)] py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-8 sm:p-12">
            <h2 className="text-xl font-bold text-[var(--color-heading)]">
              সঠিক লিঙ্ক ব্যবহার করুন
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">
              আপনি যে page বা programme-টি খুঁজছেন তা এখানে নেই অথবা ঠিকানাটি পরিবর্তিত হয়ে থাকতে পারে।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex min-h-[44px] items-center rounded-[8px] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                হোম পেজে ফিরুন
              </Link>
              <Link
                to="/programmes"
                className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-primary)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-tint)]"
              >
                সব Programme দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
