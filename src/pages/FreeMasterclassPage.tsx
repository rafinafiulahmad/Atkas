import { Check, Clock } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { FrontendForm } from '../components/FrontendForm';
import { COURSES } from '../data/coursesData';

const MASTERCLASS_RULES = [
  'প্রতি মাসে ১টি live session (প্রায় ২–২.৫ ঘণ্টা)',
  'অংশগ্রহণ ফি BDT 0 (সম্পূর্ণ ফ্রি)',
  'আসন অনুযায়ী আগে থেকে Registration লাগতে পারে',
  'এটি কোনো পূর্ণাঙ্গ course নয় — একটি উন্মুক্ত পরিচিতি আয়োজন',
  'অংশগ্রহণের পর কোনো automatic certificate দেওয়া হয় না',
];

export function FreeMasterclassPage() {
  const freeCourse = COURSES.find((c) => c.code === 'FREE');

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Free Masterclass' },
        ]}
        badge="CODE: FREE · BDT 0"
        title="Free Masterclass: AI Fundamentals & Digital Literacy"
        subtitle="AI কী, কীভাবে কাজ করে এবং দৈনন্দিন জীবনে নিরাপদে ব্যবহারের প্রাথমিক ধারণা নিয়ে প্রতি মাসের উন্মুক্ত শিক্ষামূলক session।"
        accent="free"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Left: Details & Rules */}
          <div className="space-y-6 lg:col-span-5">
            {freeCourse && (
              <div className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white">
                <div className="aspect-[16/10] bg-slate-100">
                  <img
                    src={freeCourse.imageUrl}
                    alt={freeCourse.imageAlt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[var(--color-heading)]">
                    Session কাঠামো ও নিয়মাবলি
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-body)]">
                    {MASTERCLASS_RULES.map((rule) => (
                      <li key={rule} className="flex items-start gap-2.5">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[var(--color-free)]"
                          aria-hidden="true"
                        />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-start gap-2.5 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-tint)] p-4 text-xs leading-relaxed text-[var(--color-heading)]">
                    <Clock
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                    <span>তারিখ চূড়ান্ত হলে নিবন্ধিত সবাইকে জানানো হবে।</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Simple Front-End Registration Form */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-[var(--color-heading)]">
              Free Session Registration
            </h2>
            <p className="mt-2 text-sm text-[var(--color-body)]">
              পরবর্তী monthly session-এর তারিখ ও যুক্ত হওয়ার নির্দেশনা পেতে আপনার নাম, ইমেইল ও ফোন নম্বর দিন।
            </p>
            <div className="mt-6">
              <FrontendForm mode="free-masterclass" courseCode="FREE" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
