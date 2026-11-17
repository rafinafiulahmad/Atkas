import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { COURSE_CATEGORIES, FEATURED_COURSES } from '../data/coursesData';

const CATEGORY_TOP_BORDERS: Record<string, string> = {
  'ai-literacy': 'border-t-4 border-t-[var(--color-literacy)]',
  'applied-ai': 'border-t-4 border-t-[var(--color-applied)]',
  'professional-development': 'border-t-4 border-t-[var(--color-professional)]',
  'specialised-programmes':
    'border-t-4 border-t-[var(--color-specialised-border)] bg-[var(--color-specialised-bg)]',
};

const HOW_WE_TEACH_BLOCKS = [
  {
    title: 'Conceptual আর Practical',
    text: 'কেন আর কীভাবে কাজ করে, আগে সেটা বোঝা। তারপর হাতে-কলমে করে শেখা।',
  },
  {
    title: 'Project-Based Learning',
    text: 'প্রতিটা paid programme-এ project বা capstone থাকবে, যেটা instructor মূল্যায়ন করবেন।',
  },
  {
    title: 'Critical Thinking',
    text: 'AI-র উত্তর যাচাই করা, ভুল ধরা আর source verify করার অভ্যাস তৈরি করা।',
  },
  {
    title: 'Responsible Practice',
    text: 'Privacy, safety, bias আর ethics প্রতিটা স্তরেই আলোচনায় থাকে।',
  },
  {
    title: 'Clear Assessment',
    text: 'Curriculum, learning outcome, prerequisite আর completion requirement আগেই জানানো হবে।',
  },
  {
    title: 'Bilingual',
    text: 'বাংলা আর ইংরেজি, দুই ভাষাতেই সহজে বোঝার মতো content।',
  },
];

const COMMITMENT_ITEMS = [
  'চাকরি বা আয়ের কোনো guarantee নেই',
  'Certificate non-accredited, শুধু বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে',
  'ফি, সময়কাল, prerequisite আর assessment আগেই স্বচ্ছভাবে জানানো হবে',
  'Student feedback আর নতুন প্রযুক্তি অনুযায়ী curriculum উন্নত করা হবে',
];

export function HomePage() {
  return (
    <Layout>
      {/* 6.1 Hero (Blue gradient, white text, 2 columns desktop / 1 mobile) */}
      <section className="hero-gradient text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pt-32 lg:pb-20">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-blue-50">
              Atlas AI Institute-এর education initiative
            </span>

            <h1
              className="mt-5 font-bold tracking-tight text-white font-en"
              style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', lineHeight: 1.15 }}
            >
              Understand AI. Apply AI. Advance Responsibly
            </h1>

            <p className="prose-measure mt-4 text-base leading-relaxed text-blue-100 sm:text-lg">
              আপনি নতুন শিক্ষার্থী হোন কিংবা অভিজ্ঞ পেশাজীবী—নিজের জ্ঞান, দক্ষতা ও লক্ষ্যের সঙ্গে মানানসই AI Programme বেছে নিন। শুরু করুন প্রতি মাসের বিনামূল্যের AI Masterclass দিয়ে।
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/programmes"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-[8px] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-blue-50 whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/free-masterclass"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-[8px] border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
              >
                <span>Join a Free Masterclass</span>
              </Link>
            </div>

            <p className="mt-6 font-en text-xs tracking-wide text-blue-200">
              AI Literacy &middot; Applied Skills &middot; Professional Development &middot; Specialised Learning
            </p>

            <p className="mt-2 text-xs text-blue-100/80">
              Non-accredited programme &middot; চাকরি বা আয়ের কোনো guarantee নেই &middot; ফি indicative
            </p>
          </div>

          {/* Right Column: Glass-Style Card */}
          <div className="lg:col-span-5">
            <div className="rounded-[16px] border border-white/25 bg-white/10 p-6 backdrop-blur-md sm:p-7">
              <h2 className="text-lg font-bold text-white">নিজের মতো করে শেখার পথ</h2>

              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4ADE80]"
                  />
                  <div>
                    <p className="font-en text-sm font-semibold text-white">Understand AI</p>
                    <p className="text-sm text-blue-100">AI কী, কীভাবে কাজ করে, ঝুঁকি কোথায়</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#60A5FA]"
                  />
                  <div>
                    <p className="font-en text-sm font-semibold text-white">Apply AI</p>
                    <p className="text-sm text-blue-100">কাজ, research আর project-এ প্রয়োগ</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#A78BFA]"
                  />
                  <div>
                    <p className="font-en text-sm font-semibold text-white">Develop Expertise</p>
                    <p className="text-sm text-blue-100">Engineering, automation, governance</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300"
                  />
                  <div>
                    <p className="font-en text-sm font-semibold text-white">Specialise</p>
                    <p className="text-sm text-blue-100">নির্দিষ্ট খাতের AI (শীঘ্রই আসছে)</p>
                  </div>
                </li>
              </ul>

              <p className="mt-6 border-t border-white/20 pt-4 text-xs leading-relaxed text-blue-100">
                এটা বাধ্যতামূলক চার ধাপ নয়। আপনার অভিজ্ঞতা অনুযায়ী যেকোনো জায়গা থেকে শুরু করা যায়।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.2 Featured Programmes (White Background, 4-col desktop, 2-col tablet, 1-col mobile, gap 24px) */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-en text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                Featured Programmes
              </h2>
              <p className="mt-2 text-base text-[var(--color-body)]">
                প্রতিটা স্তর থেকে একটা করে। বিস্তারিত দেখতে &ldquo;View Course&rdquo; চাপুন।
              </p>
            </div>

            <Link
              to="/programmes"
              className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-primary)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-tint)] whitespace-nowrap shrink-0"
            >
              সব Programme (১২টি) →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURED_COURSES.map((course) => (
              <CourseCard key={course.code} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 6.3 Course Categories (#F5F8FF Background, 4-column cards with 4px colored top borders) */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="font-en text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              Course categories
            </h2>
            <p className="mt-2 text-base text-[var(--color-body)]">
              প্রতিটার নিজস্ব landing page আর programme catalogue আছে, কিন্তু সব একই institution-এর অধীনে।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {COURSE_CATEGORIES.map((category) => (
              <article
                key={category.slug}
                className={`flex flex-col justify-between rounded-[12px] border border-[var(--color-border)] ${
                  CATEGORY_TOP_BORDERS[category.slug]
                } ${
                  category.isUnderDevelopment ? '' : 'bg-white'
                } p-6 shadow-[0_2px_8px_rgba(11,31,75,0.04)]`}
              >
                <div>
                  <p className="font-en text-xs font-semibold text-[var(--color-body)]">
                    {category.levelLabel}
                  </p>
                  <h3 className="mt-1 font-en text-lg font-bold text-[var(--color-heading)]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                    {category.shortDescription}
                  </p>

                  {category.homeCourseList.length > 0 && (
                    <ul className="mt-5 divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)] text-sm text-[var(--color-heading)]">
                      {category.homeCourseList.map((item) => (
                        <li key={item} className="py-2 font-en text-[13px] font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5 pt-2">
                  <p className="font-en text-xs font-semibold text-[var(--color-body)]">
                    {category.feeRange}
                  </p>
                  <Link
                    to={`/programmes/${category.slug}`}
                    className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:underline"
                  >
                    <span>Category দেখুন</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6.4 Free Masterclass Band (White section containing #EAF1FD 16px rounded box) */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[16px] bg-[var(--color-tint)] p-7 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <h2 className="font-en text-2xl font-bold text-[var(--color-heading)]">
                Free Masterclass
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[var(--color-heading)]">
                AI Fundamentals &amp; Digital Literacy: প্রতি মাসে একটা session, ২–২.৫ ঘণ্টা, অংশগ্রহণ ফি BDT 0। আসন অনুযায়ী Registration লাগতে পারে। এটা পূর্ণাঙ্গ course নয়, একটা open শেখার আয়োজন।
              </p>
            </div>

            <Link
              to="/free-masterclass"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] whitespace-nowrap shrink-0"
            >
              <span>Register করুন →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6.4b Featured Specialised Programme: Women’s Safety in the AI Era */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-white shadow-sm">
            <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--color-tint)] px-3 py-1 font-en text-xs font-bold text-[var(--color-primary)]">
                    Specialised Programme · Free
                  </span>
                  <span className="rounded-full bg-[#EAF7EE] px-3 py-1 font-en text-xs font-bold text-[#1E8E3E]">
                    BDT 0
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-en text-xs font-semibold text-[var(--color-navy)]">
                    4 Weeks
                  </span>
                </div>

                <h2 className="mt-4 font-bn text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                  AI যুগে নারী ও মেয়েদের ডিজিটাল নিরাপত্তা
                </h2>
                <p className="mt-1 font-en text-base font-semibold text-[var(--color-primary)]">
                  Women’s Safety in the AI Era: A Free Four-Week Programme
                </p>

                <p className="prose-measure mt-3 text-sm leading-relaxed text-[var(--color-body)] sm:text-base">
                  কৃত্রিম বুদ্ধিমত্তা ও ডিজিটাল প্রযুক্তির যুগে অনলাইনে নারী ও কন্যাশিশুদের নিরাপত্তা, ডিপফেক ও সিন্থেটিক মিডিয়ার ঝুঁকি, প্রাইভেসি সুরক্ষা এবং কার্যকর প্রতিরোধমূলক জ্ঞান নিয়ে ৪ সপ্তাহের সম্পূর্ণ বিনামূল্যের সচেতনতামূলক কর্মসূচি।
                </p>

                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-[var(--color-heading)]">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#1E8E3E]" aria-hidden="true" />
                    <span>Deepfakes ও ছবি বিকৃতি শনাক্তকরণ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#1E8E3E]" aria-hidden="true" />
                    <span>ব্যক্তিগত তথ্যের প্রাইভেসি ও অ্যাকাউন্ট সুরক্ষা</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#1E8E3E]" aria-hidden="true" />
                    <span>হয়রানি ও ব্ল্যাকমেইল প্রতিরোধ কৌশল</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#1E8E3E]" aria-hidden="true" />
                    <span>প্রমাণ সংরক্ষণ ও প্রাতিষ্ঠানিক সহায়তা গাইড</span>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to="/programmes/womens-safety-in-the-ai-era"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <span>কর্মসূচির বিস্তারিত ও ফ্রি রেজিস্ট্রেশন</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <p className="font-en text-xs text-[var(--color-body)]">
                    Non-accredited Certificate of Participation · BDT 0
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] border border-[var(--color-border)] shadow-xs">
                  <img
                    src="/src/assets/images/course_womens_digital_safety_1794926670102.jpg"
                    alt="Women’s Safety in the AI Era"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 to-transparent"
                  />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-en text-xs font-semibold">Specialised Digital Safety Track</p>
                    <p className="text-[11px] text-blue-100">নারী, শিক্ষার্থী ও শিক্ষাবিদদের জন্য</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 আমরা কীভাবে শেখাই (#F5F8FF background, 3 columns, 6 blocks with 2px top border) */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              আমরা কীভাবে শেখাই
            </h2>
            <p className="prose-measure mt-3 text-base leading-relaxed text-[var(--color-body)]">
              Atlas AI Education কোনো coaching centre বা course marketplace নয়। এটা Atlas AI Institute-এর research-ভিত্তিক education initiative, যেখানে concept, practice আর responsibility একসাথে শেখানো হয়।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {HOW_WE_TEACH_BLOCKS.map((block) => (
              <div key={block.title} className="border-t-2 border-[var(--color-primary)] pt-4">
                <h3 className="font-en text-lg font-bold text-[var(--color-heading)]">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 আমাদের অঙ্গীকার (#0B1F4B navy background, white text, 2-column checklist) */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              আমাদের অঙ্গীকার: বাস্তব দক্ষতা, ফাঁকা প্রতিশ্রুতি নয়
            </h2>
            <p className="mt-3 text-base leading-relaxed text-blue-100">
              চাকরি, আয়, আন্তর্জাতিক স্বীকৃতি বা accreditation নিয়ে আমরা কোনো ভিত্তিহীন কথা বলি না।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {COMMITMENT_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-b border-white/15 py-4 text-sm leading-relaxed text-blue-50 sm:text-base"
              >
                <Check
                  className="mt-1 h-5 w-5 shrink-0 text-[#60A5FA]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="prose-measure mt-8 text-sm leading-relaxed text-blue-200">
            শিক্ষা যেন শুধু উচ্চ ফি দিতে পারা মানুষের মধ্যে সীমাবদ্ধ না থাকে, সেজন্য ভবিষ্যতে Scholarship ও financial assistance নিয়ে ভাবা হচ্ছে। চালু হওয়ার আগে এগুলোকে নিশ্চিত সুবিধা হিসেবে ধরা যাবে না।
          </p>
        </div>
      </section>
    </Layout>
  );
}
