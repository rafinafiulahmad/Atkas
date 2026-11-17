import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Clock } from 'lucide-react';
import { CourseItem, TierAccentType } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';

interface CourseCardProps {
  course: CourseItem;
}

const ACCENT_STYLES: Record<
  TierAccentType,
  {
    topBorder: string;
    chipBg: string;
    chipText: string;
    fallbackGradient: string;
  }
> = {
  free: {
    topBorder: 'border-t-[4px] border-t-[var(--color-free)]',
    chipBg: 'bg-[#EAF7EE]',
    chipText: 'text-[#1E8E3E]',
    fallbackGradient: 'linear-gradient(135deg, #1E8E3E 0%, #0B1F4B 100%)',
  },
  literacy: {
    topBorder: 'border-t-[4px] border-t-[var(--color-literacy)]',
    chipBg: 'bg-[var(--color-tint)]',
    chipText: 'text-[var(--color-primary)]',
    fallbackGradient: 'linear-gradient(135deg, #0056D2 0%, #0B1F4B 100%)',
  },
  applied: {
    topBorder: 'border-t-[4px] border-t-[var(--color-applied)]',
    chipBg: 'bg-[#EEEDFC]',
    chipText: 'text-[#4B3FD6]',
    fallbackGradient: 'linear-gradient(135deg, #4B3FD6 0%, #0B1F4B 100%)',
  },
  professional: {
    topBorder: 'border-t-[4px] border-t-[var(--color-professional)]',
    chipBg: 'bg-[#E8EDF7]',
    chipText: 'text-[#0B1F4B]',
    fallbackGradient: 'linear-gradient(135deg, #0B1F4B 0%, #1F3A73 100%)',
  },
  specialised: {
    topBorder: 'border-t-[4px] border-t-[#9AA5B8]',
    chipBg: 'bg-[#F1F4F9]',
    chipText: 'text-[#0B1F4B]',
    fallbackGradient: 'linear-gradient(135deg, #0056D2 0%, #9AA5B8 100%)',
  },
};

export function CourseCard({ course }: CourseCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { savedProgrammes, toggleProgrammeBookmark } = useAuth();
  const isSaved = savedProgrammes.includes(course.code);
  const accent = ACCENT_STYLES[course.tierAccent] || ACCENT_STYLES.specialised;
  const coursePath =
    course.slug === 'womens-safety-in-the-ai-era'
      ? '/programmes/womens-safety-in-the-ai-era'
      : `/programmes/${course.code}`;

  return (
    <article
      className={`group flex h-full flex-col justify-between overflow-hidden rounded-[12px] border border-[var(--color-border)] ${accent.topBorder} bg-white shadow-[0_2px_10px_rgba(11,31,75,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(11,31,75,0.12)]`}
    >
      <div>
        {/* 1. Featured Image 16:10 + Navy Overlay + Top-Right Bookmark + Code & Tier Pill */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Link
            to={coursePath}
            className="block h-full w-full"
            aria-label={`${course.title} (${course.code})`}
          >
          {!imgFailed ? (
            <img
              src={course.imageUrl}
              alt={course.imageAlt}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              style={{ background: accent.fallbackGradient }}
            >
              <span
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 rounded-full bg-white/10"
              />
            </div>
          )}

          {/* Navy bottom gradient overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(11, 31, 75, 0.75) 0%, rgba(11, 31, 75, 0) 100%)',
            }}
          />

          {/* Bottom-left Course Code + Bottom-right White Tier Pill */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 py-3">
            <span className="font-en text-sm font-bold tracking-wide text-white">
              {course.code}
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 font-en text-[11px] font-semibold text-[#1F1F1F] shadow-xs whitespace-nowrap shrink-0">
              {course.tierLabel}
            </span>
          </div>
        </Link>

        {/* Top-Right 44px Bookmark Button */}
        <button
          type="button"
          onClick={() => toggleProgrammeBookmark(course.code)}
          aria-label={isSaved ? `${course.title} bookmark সরান` : `${course.title} save করুন`}
          aria-pressed={isSaved}
          className={`absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-colors cursor-pointer ${
            isSaved
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-white/90 text-[var(--color-navy)] hover:bg-white'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" />
        </button>
        </div>

        {/* Card Body */}
        <div className="p-5 pb-0">
          {/* 3. Category / Tier Chip */}
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 font-en text-xs font-semibold ${accent.chipBg} ${accent.chipText}`}
          >
            {course.chipLabel}
          </span>

          {/* 4. English Bold Title (max 2 lines) */}
          <h3 className="mt-3 line-clamp-2 font-en text-lg font-bold leading-snug text-[var(--color-heading)]">
            <Link
              to={coursePath}
              className="transition-colors group-hover:text-[var(--color-primary)]"
            >
              {course.title}
            </Link>
          </h3>

          {/* 5. 1-Line Hook */}
          <p className="mt-2 font-bn text-sm leading-relaxed text-[var(--color-body)]">
            {course.hook}
          </p>
        </div>
      </div>

      {/* 6 & 7. Meta + View Course CTA & Indicative Price */}
      <div className="p-5 pt-4">
        <div className="border-t border-[var(--color-border)] pt-3.5">
          <p className="flex items-center gap-1.5 font-bn text-xs font-medium text-[var(--color-body)]">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{course.duration}</span>
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              to={coursePath}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[8px] bg-[var(--color-primary)] px-4 py-2 font-en text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] whitespace-nowrap shrink-0"
            >
              <span>View Course</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            {course.isFree ? (
              <span className="inline-flex min-h-[36px] items-center rounded-[8px] border border-[var(--color-free)] bg-[#EAF7EE] px-3 py-1 font-en text-xs font-bold tracking-wide text-[var(--color-free)] shrink-0">
                FREE
              </span>
            ) : (
              <div className="text-right shrink-0">
                <p className="font-en text-sm font-bold text-[var(--color-heading)] tabular-nums">
                  {course.fee}
                </p>
                <p className="font-en text-[11px] font-medium text-[var(--color-body)]">
                  indicative
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
