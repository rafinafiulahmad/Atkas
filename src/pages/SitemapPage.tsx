import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { COURSE_CATEGORIES, COURSES } from '../data/coursesData';

const MAIN_PAGES = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'সব Programme (১২টি)', to: '/programmes' },
  { label: 'Resources', to: '/resources' },
  { label: 'Free Masterclass Registration', to: '/free-masterclass' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export function SitemapPage() {
  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Sitemap' }]}
        title="Sitemap"
        subtitle="Atlas AI Education ওয়েবসাইটের সকল page, category ও programme-এর তালিকা।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
            <h2 className="font-en text-lg font-bold text-[var(--color-heading)]">Main Pages</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {MAIN_PAGES.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-medium text-[var(--color-primary)] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
            <h2 className="font-en text-lg font-bold text-[var(--color-heading)]">
              Programme Categories
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {COURSE_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/programmes/${cat.slug}`}
                    className="font-en font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    {cat.title}
                  </Link>
                  <p className="text-xs text-[var(--color-body)]">{cat.levelLabel}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6">
            <h2 className="font-en text-lg font-bold text-[var(--color-heading)]">
              All Programmes
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COURSES.map((course) => (
                <li key={course.code}>
                  <Link
                    to={
                      course.slug === 'womens-safety-in-the-ai-era'
                        ? '/programmes/womens-safety-in-the-ai-era'
                        : `/programmes/${course.code}`
                    }
                    className="font-en text-[var(--color-primary)] hover:underline"
                  >
                    <span className="font-bold">{course.code}</span> — {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
