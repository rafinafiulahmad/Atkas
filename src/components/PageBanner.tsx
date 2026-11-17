import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { TierAccentType } from '../data/coursesData';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  badge?: string;
  accent?: TierAccentType;
}

const ACCENT_BORDER_MAP: Record<TierAccentType, string> = {
  free: 'border-t-4 border-t-[var(--color-free)]',
  literacy: 'border-t-4 border-t-[var(--color-literacy)]',
  applied: 'border-t-4 border-t-[var(--color-applied)]',
  professional: 'border-t-4 border-t-[#60A5FA]',
  specialised: 'border-t-4 border-t-[var(--color-specialised-border)]',
};

export function PageBanner({
  breadcrumbs,
  title,
  subtitle,
  badge,
  accent,
}: PageBannerProps) {
  return (
    <section
      className={`hero-gradient text-white ${accent ? ACCENT_BORDER_MAP[accent] : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 sm:pt-28 sm:pb-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-blue-100">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />}
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-white hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {badge && (
          <p className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1 font-en text-xs font-semibold text-white">
            {badge}
          </p>
        )}

        <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="prose-measure mt-3 text-base leading-relaxed text-blue-100 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
