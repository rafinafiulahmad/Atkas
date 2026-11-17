import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';

export function ScholarshipsPage() {
  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Scholarships' }]}
        title="Scholarships ও Financial Assistance"
        subtitle="আর্থিক সীমাবদ্ধতার কারণে যেন আগ্রহী শিক্ষার্থীরা পিছিয়ে না পড়ে, সে বিষয়ে ভবিষ্যৎ পরিকল্পনার স্বচ্ছ তথ্য।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-7 sm:p-10">
            <div className="flex items-start gap-3 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-tint)] p-4">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold leading-relaxed text-[var(--color-heading)]">
                ভবিষ্যতে Scholarship ও financial assistance বিবেচনা করা হতে পারে; তবে আনুষ্ঠানিকভাবে চালু হওয়ার আগে এগুলোকে নিশ্চিত সুবিধা হিসেবে প্রচার করা হয় না।
              </p>
            </div>

            <div className="prose-measure mt-8 space-y-5 text-base leading-relaxed text-[var(--color-body)]">
              <p>
                Atlas AI Education চায় না উচ্চ ফি-র কারণে কোনো যোগ্য বা আগ্রহী শিক্ষার্থী AI শেখা থেকে দূরে থাকুক। সেজন্য প্রতিষ্ঠানটি ভবিষ্যতে প্রয়োজনভিত্তিক বা মেধাভিত্তিক fee waiver ও financial assistance চালুর সম্ভাবনা নিয়ে চিন্তাভাবনা করছে।
              </p>
              <p>
                এই মুহূর্তে কোনো নির্দিষ্ট শতাংশ ছাড়, আসন সংখ্যা বা আবেদনের সময়সীমা নির্ধারিত হয়নি। প্রতিটি ব্যাচ চূড়ান্ত হওয়ার সময় প্রাতিষ্ঠানিক সামর্থ্য ও বাজেট সাপেক্ষে কোনো সহায়তা প্রযোজ্য হলে তা সরাসরি ও স্বচ্ছভাবে ঘোষণা করা হবে।
              </p>
              <p>
                গুরুত্বপূর্ণ: Atlas AI Education-এর কোনো ফর্ম বা আবেদন প্রক্রিয়ায় সংবেদনশীল ব্যাংক নথি, অ্যাকাউন্ট নম্বর বা আর্থিক গোপনীয় তথ্য চাওয়া হয় না।
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6">
              <Link
                to="/free-masterclass"
                className="inline-flex min-h-[44px] items-center rounded-[8px] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Free Session-এ Register করুন →
              </Link>
              <Link
                to="/programmes"
                className="inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-tint)]"
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
