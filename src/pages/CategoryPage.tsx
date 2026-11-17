import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Clock } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { CourseCard } from '../components/CourseCard';
import {
  CategorySlug,
  SPECIALISED_DOMAINS,
  getCategoryBySlug,
  getCoursesByCategory,
} from '../data/coursesData';
import { NotFoundPage } from './NotFoundPage';

interface CategoryPageProps {
  categorySlug: CategorySlug;
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const category = getCategoryBySlug(categorySlug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!category) {
    return <NotFoundPage />;
  }

  const courses = getCoursesByCategory(categorySlug);

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Programmes', to: '/programmes' },
          { label: category.title },
        ]}
        badge={`${category.levelLabel} · ${category.feeRange}`}
        title={category.title}
        subtitle={category.bannerOverview}
        accent={category.tierAccent}
      />

      {/* Objectives & Target Audience */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-6 sm:p-8">
            <h2 className="font-en text-xl font-bold text-[var(--color-heading)]">
              Learning Objectives
            </h2>
            <ul className="mt-4 space-y-3">
              {category.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-heading)]">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8">
              <h2 className="font-en text-xl font-bold text-[var(--color-heading)]">
                Target Audience
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-body)]">
                {category.targetAudience.map((aud, idx) => (
                  <li key={idx}>{aud}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8">
              <h2 className="font-en text-xl font-bold text-[var(--color-heading)]">
                Learning Approach
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-body)]">
                {category.learningApproach.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Catalogue or Specialised Development Notice */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-en text-2xl font-bold text-[var(--color-heading)]">
                {category.isUnderDevelopment ? 'Programme Status' : 'Programme Catalogue'}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-body)]">
                {category.isUnderDevelopment
                  ? 'নির্দিষ্ট পেশা ও খাতভিত্তিক বিশেষায়িত বিভাগ'
                  : `${category.title} বিভাগের সকল programme`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.code} course={course} />
            ))}
          </div>

          {categorySlug === 'specialised-programmes' && (
            <div className="mt-12 rounded-[12px] border border-[var(--color-border)] border-t-4 border-t-[var(--color-specialised-border)] bg-[var(--color-specialised-bg)] p-7 sm:p-9">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-heading)]">
                <Clock className="h-4 w-4 text-[var(--color-primary)]" aria-hidden="true" />
                <span className="font-en">Upcoming Specialised Domains (Under Development)</span>
              </div>
              <p className="prose-measure mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                Women’s Safety in the AI Era ছাড়াও স্বাস্থ্য, আইন, শিক্ষা ও পরিবেশের মতো খাতভিত্তিক পেশাজীবীদের সাথে পরামর্শক্রমে নিম্নের বিশেষায়িত কর্মসূচিগুলোর পাঠ্যক্রম প্রস্তুত করা হচ্ছে:
              </p>

              <div className="mt-5">
                <div className="flex flex-wrap gap-2.5">
                  {SPECIALISED_DOMAINS.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 font-en text-xs font-medium text-[var(--color-heading)] shadow-2xs"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Registration / Application Note & Category FAQ */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-tint)] p-6 sm:p-7">
              <h2 className="text-xl font-bold text-[var(--color-heading)]">
                Registration ও Application তথ্য
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-heading)]">
                {category.admissionNote}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={
                    categorySlug === 'ai-literacy'
                      ? '/free-masterclass'
                      : categorySlug === 'specialised-programmes'
                      ? '/programmes/womens-safety-in-the-ai-era'
                      : '/programmes'
                  }
                  className="inline-flex min-h-[44px] items-center rounded-[8px] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  {categorySlug === 'ai-literacy'
                    ? 'Free Session-এ Register করুন'
                    : categorySlug === 'specialised-programmes'
                    ? 'Women’s Safety Programme দেখুন'
                    : 'সব Programme দেখুন'}
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-[var(--color-heading)]">
              এই Category সম্পর্কে সাধারণ প্রশ্ন
            </h2>
            <div className="mt-4 divide-y divide-[var(--color-border)] rounded-[12px] border border-[var(--color-border)] bg-white">
              {category.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="px-5 py-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-4 text-left text-sm font-semibold text-[var(--color-heading)] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[var(--color-primary)] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
