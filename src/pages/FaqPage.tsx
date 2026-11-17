import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';

const FAQ_ITEMS = [
  {
    q: 'Free Masterclass কীভাবে কাজ করে?',
    a: 'AI Fundamentals & Digital Literacy হলো প্রতি মাসে আয়োজিত একটি উন্মুক্ত session (প্রায় ২–২.৫ ঘণ্টা)। এতে অংশগ্রহণ ফি BDT 0, তবে আসন অনুযায়ী আগে থেকে Registration লাগতে পারে। এটি কোনো পূর্ণাঙ্গ course নয় এবং এখানে automatic certificate দেওয়া হয় না।',
  },
  {
    q: 'ওয়েবসাইটে দেওয়া ফি কি চূড়ান্ত?',
    a: 'না। সব paid programme-এর ফি বর্তমানে indicative হিসেবে দেখানো হয়েছে (AI Literacy BDT 990–1,990, Applied AI BDT 2,990–4,490, Professional Development BDT 9,990–14,990)। যেগুলোর নির্দিষ্ট ফি উল্লেখ নেই, সেখানে category range দেওয়া আছে। প্রতিটি ব্যাচ চালুর আগে চূড়ান্ত ফি নিশ্চিত করে জানানো হবে।',
  },
  {
    q: 'Certificate কি accredited?',
    a: 'না। Atlas AI Education থেকে প্রদত্ত Certificate-গুলো non-accredited। Paid programme-এ বাস্তব অংশগ্রহণ, নির্ধারিত assignment এবং project বা capstone মূল্যায়নের ভিত্তিতেই এই Certificate দেওয়া হয়। Free Masterclass-এ automatic certificate থাকে না।',
  },
  {
    q: 'চাকরি বা আয়ের কোনো নিশ্চয়তা আছে কি?',
    a: 'না। Atlas AI Education চাকরি, ইন্টার্নশিপ, ফ্রিল্যান্সিং আয় বা কোনো কর্মসংস্থানের guarantee দেয় না। আমরা বাস্তব দক্ষতা ও দায়িত্বশীল ব্যবহার শেখানোর ওপর জোর দিই।',
  },
  {
    q: 'কোন category দিয়ে শুরু করা উচিত?',
    a: 'আপনি যদি AI-তে একদম নতুন হন, তাহলে Free Masterclass বা AI Literacy & Foundation দিয়ে শুরু করতে পারেন। মৌলিক ধারণা থাকলে এবং project-ভিত্তিক দক্ষতা চাইলে Applied AI বেছে নিন। আর যদি software engineering, research বা leadership-এ পূর্ব অভিজ্ঞতা থাকে, তাহলে AI Professional Development উপযোগী হতে পারে।',
  },
  {
    q: 'Specialised Programme কবে আসবে?',
    a: 'Specialised Programmes এখনো development-এ আছে এবং শুরুর কোনো তারিখ নির্ধারিত হয়নি। Healthcare, Legal, Education, Climate, Public Policy ও Social Impact-এর মতো ক্ষেত্রগুলোর জন্য syllabus চূড়ান্ত হলে তা প্রকাশ করা হবে।',
  },
  {
    q: 'Scholarship বা আর্থিক সহায়তা আছে কি?',
    a: 'ভবিষ্যতে Scholarship ও financial assistance চালুর সম্ভাবনা বিবেচনা করা হচ্ছে। তবে আনুষ্ঠানিকভাবে চালু হওয়ার আগে এটিকে নিশ্চিত সুবিধা হিসেবে ধরা যাবে না। কোনো শতাংশ ছাড় বা আসন সংখ্যা এখনো নির্ধারিত নয়।',
  },
];

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
        title="সাধারণ প্রশ্ন ও উত্তর (FAQ)"
        subtitle="Free Masterclass, indicative ফি, non-accredited certificate, category নির্বাচন ও Scholarship সংক্রান্ত স্পষ্ট উত্তর।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="divide-y divide-[var(--color-border)] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.q} className="px-6 py-2">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3 text-left text-base font-bold text-[var(--color-heading)] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[var(--color-primary)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-6 text-sm leading-relaxed text-[var(--color-body)] sm:text-base">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
