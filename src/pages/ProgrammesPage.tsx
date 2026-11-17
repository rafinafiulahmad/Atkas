import { useState } from 'react';
import { Search } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { CourseCard } from '../components/CourseCard';
import {
  COURSE_CATEGORIES,
  COURSES,
  CategorySlug,
  SPECIALISED_DOMAINS,
} from '../data/coursesData';

type FilterTab = 'all' | CategorySlug;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-literacy', label: 'AI Literacy' },
  { id: 'applied-ai', label: 'Applied AI' },
  { id: 'professional-development', label: 'Professional Development' },
  { id: 'specialised-programmes', label: 'Specialised' },
];

export function ProgrammesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCourses = COURSES.filter((course) => {
    if (activeTab !== 'all' && course.categorySlug !== activeTab) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      course.code,
      course.title,
      course.categoryName,
      course.hook,
      ...course.keyAreas,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const activeCategory =
    activeTab !== 'all'
      ? COURSE_CATEGORIES.find((cat) => cat.slug === activeTab)
      : undefined;

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'সব Programme' }]}
        title="সব Programme"
        subtitle="১২টা programme, ৪টা category, নিজের level অনুযায়ী বেছে নিন"
      />

      {/* Filter Bar + Search */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Horizontal scrollable pill tabs on mobile */}
            <div
              role="tablist"
              aria-label="Category filter"
              className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
            >
              {FILTER_TABS.map((tab) => {
                const selected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[44px] shrink-0 rounded-full px-4 py-2 font-en text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'border border-[var(--color-border)] bg-[var(--color-soft-bg)] text-[var(--color-heading)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-body)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Course বা code খুঁজুন..."
                aria-label="Course বা code খুঁজুন"
                className="min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] py-2 pl-10 pr-4 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid / Specialised Development Notice */}
      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {activeCategory && (
            <div className="mb-8 rounded-[12px] border border-[var(--color-border)] bg-white p-5">
              <p className="font-en text-xs font-semibold text-[var(--color-primary)]">
                {activeCategory.levelLabel} · {activeCategory.feeRange}
              </p>
              <h2 className="mt-1 font-en text-xl font-bold text-[var(--color-heading)]">
                {activeCategory.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-body)]">
                {activeCategory.shortDescription}
              </p>
            </div>
          )}

          {filteredCourses.length === 0 ? (
            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-8 text-center">
              <p className="text-base font-semibold text-[var(--color-heading)]">
                &ldquo;{searchQuery}&rdquo;-এর সাথে মিলে এমন কোনো programme পাওয়া যায়নি।
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex min-h-[44px] items-center rounded-[8px] bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] cursor-pointer"
              >
                সব Programme দেখুন
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.code} course={course} />
                ))}
              </div>

              {activeTab === 'specialised-programmes' && (
                <div className="mt-10 rounded-[12px] border border-[var(--color-border)] border-t-4 border-t-[var(--color-specialised-border)] bg-[var(--color-specialised-bg)] p-7 sm:p-9">
                  <span className="inline-block rounded-full bg-slate-200 px-3 py-1 font-en text-xs font-semibold text-[var(--color-heading)]">
                    Upcoming Specialised Domains (Under Development)
                  </span>
                  <p className="prose-measure mt-3 text-sm leading-relaxed text-[var(--color-body)]">
                    Women’s Safety in the AI Era ছাড়াও স্বাস্থ্য, আইন, শিক্ষা ও পরিবেশের মতো খাতভিত্তিক পেশাজীবীদের সাথে পরামর্শক্রমে নিম্নের বিশেষায়িত কর্মসূচিগুলোর পাঠ্যক্রম প্রস্তুত করা হচ্ছে:
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {SPECIALISED_DOMAINS.map((domain) => (
                      <span
                        key={domain}
                        className="rounded-full border border-[var(--color-border)] bg-white px-3.5 py-1.5 font-en text-xs font-medium text-[var(--color-heading)]"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
