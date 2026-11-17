import { useState } from 'react';
import { ArrowRight, Bookmark, ExternalLink, FileText, Info, Search } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { useAuth } from '../context/AuthContext';
import { CategorySlug, COURSE_CATEGORIES } from '../data/coursesData';
import { RESOURCES, ResourceType } from '../data/resourcesData';

type TypeFilter = 'All' | ResourceType;
type CategoryFilter = 'all' | CategorySlug | 'general';

const TYPE_TABS: TypeFilter[] = ['All', 'Guide', 'PDF', 'Link'];

export function ResourcesPage() {
  const { savedResources, toggleResourceBookmark } = useAuth();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredResources = RESOURCES.filter((item) => {
    if (typeFilter !== 'All' && item.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (!normalizedQuery) return true;

    const haystack = `${item.title} ${item.description} ${item.type}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const isExternalUrl = (url: string) => /^https?:\/\//i.test(url);

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Resources' }]}
        title="Resources"
        subtitle="AI শিক্ষা ও দায়িত্বশীল ব্যবহারের সহায়ক Guide, PDF ও নির্ভরযোগ্য Reference।"
      />

      {/* Filter Bar + Category Select + Search */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Type Filter Tabs */}
            <div
              role="tablist"
              aria-label="Resource type filter"
              className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
            >
              {TYPE_TABS.map((type) => {
                const selected = typeFilter === type;
                return (
                  <button
                    key={type}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTypeFilter(type)}
                    className={`min-h-[44px] shrink-0 rounded-full px-4 py-2 font-en text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'border border-[var(--color-border)] bg-[var(--color-soft-bg)] text-[var(--color-heading)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Category Select & Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                aria-label="Category filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="min-h-[44px] rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
              >
                <option value="all">All Categories</option>
                {COURSE_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.title}
                  </option>
                ))}
                <option value="general">General</option>
              </select>

              <div className="relative w-full sm:w-64 shrink-0">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-body)]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Resource খুঁজুন..."
                  aria-label="Resource খুঁজুন"
                  className="min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] py-2 pl-10 pr-4 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Cards / Empty Notice */}
      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {RESOURCES.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-[12px] border border-[var(--color-border)] bg-white p-8 text-center sm:p-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-tint)] text-[var(--color-primary)]">
                <Info className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-[var(--color-heading)]">
                Resources শীঘ্রই যুক্ত হবে
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                যাচাইকৃত Guide, PDF ও শিক্ষামূলক Reference প্রস্তুত হলে এখানে প্রকাশ করা হবে।
              </p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-8 text-center">
              <p className="text-base font-semibold text-[var(--color-heading)]">
                নির্বাচিত filter অনুযায়ী কোনো resource পাওয়া যায়নি।
              </p>
              <button
                type="button"
                onClick={() => {
                  setTypeFilter('All');
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex min-h-[44px] items-center rounded-[8px] bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] cursor-pointer"
              >
                সব Filter রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((item) => {
                const isSaved = savedResources.includes(item.id);
                const external = isExternalUrl(item.url);

                return (
                  <article
                    key={item.id}
                    className="relative flex flex-col justify-between rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-[0_2px_10px_rgba(11,31,75,0.05)]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-tint)] px-3 py-1 font-en text-xs font-semibold text-[var(--color-primary)]">
                          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{item.type}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleResourceBookmark(item.id)}
                          aria-label={
                            isSaved
                              ? `${item.title} bookmark সরান`
                              : `${item.title} save করুন`
                          }
                          aria-pressed={isSaved}
                          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                            isSaved
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                              : 'border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:bg-[var(--color-tint)]'
                          }`}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <h2 className="mt-3 font-en text-lg font-bold leading-snug text-[var(--color-heading)]">
                        {item.title}
                      </h2>

                      <p className="mt-2 line-clamp-1 text-sm text-[var(--color-body)]">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                      <a
                        href={item.url}
                        target={external || item.type === 'PDF' ? '_blank' : undefined}
                        rel={external || item.type === 'PDF' ? 'noopener noreferrer' : undefined}
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[8px] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
                      >
                        <span>খুলুন</span>
                        {external ? (
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        )}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
