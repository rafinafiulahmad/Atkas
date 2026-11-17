import { Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';

const TERMS_SECTIONS = [
  {
    title: '১. শিক্ষামূলক সেবার ধরন (Non-Accredited)',
    body: 'Atlas AI Education-এর সকল programme ও session হলো non-accredited শিক্ষামূলক প্রশিক্ষণ। কোনো course বা masterclass বিশ্ববিদ্যালয় ডিগ্রি, সরকারি সনদ বা আন্তর্জাতিক accreditation-এর সমতুল্য নয়।',
  },
  {
    title: '২. চাকরি বা আয়ের কোনো গ্যারান্টি নেই',
    body: 'যেকোনো course বা capstone সম্পূর্ণ করার পর চাকরি, ইন্টার্নশিপ, ক্লায়েন্ট বা আর্থিক আয়ের কোনো নিশ্চয়তা দেওয়া হয় না। শিক্ষার্থীর নিজস্ব প্রচেষ্টা ও বাস্তব প্রয়োগের ওপরই ফলাফল নির্ভর করে।',
  },
  {
    title: '৩. ফি, সময়সূচি ও Certificate শর্ত',
    body: 'ওয়েবসাইটে উল্লিখিত সকল paid course ফি ও সময়কাল indicative। প্রতিটি ব্যাচ চালুর আগে চূড়ান্ত ফি ও সময়সূচি প্রকাশ করা হবে। শুধুমাত্র নির্ধারিত অংশগ্রহণ ও মূল্যায়ন সফলভাবে শেষ করলে paid course-এ non-accredited Certificate দেওয়া হবে। Free Masterclass-এ কোনো automatic certificate নেই।',
  },
  {
    title: '৪. একাডেমিক সততা ও দায়িত্বশীল ব্যবহার',
    body: 'অংশগ্রহণকারীরা course-এর অ্যাসাইনমেন্ট ও project-এ মৌলিকতা বজায় রাখবেন, তথ্য যাচাই করবেন এবং কোনো বেআইনি বা ক্ষতিকর কাজে AI ব্যবহার করবেন না।',
  },
];

export function TermsPage() {
  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]}
        title="Terms & Conditions"
        subtitle="অংশগ্রহণ, মূল্যায়ন, non-accredited certificate ও নীতিগত শর্তাবলি।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-start gap-2.5 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-tint)] p-4 text-sm font-semibold text-[var(--color-heading)]">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
              aria-hidden="true"
            />
            <span>খসড়া, চূড়ান্ত আইনি পর্যালোচনার অপেক্ষায়</span>
          </div>

          <div className="space-y-8 rounded-[12px] border border-[var(--color-border)] bg-white p-7 sm:p-10">
            {TERMS_SECTIONS.map((sec) => (
              <article
                key={sec.title}
                className="prose-measure border-b border-[var(--color-border)] pb-7 last:border-b-0 last:pb-0"
              >
                <h2 className="text-xl font-bold text-[var(--color-heading)]">{sec.title}</h2>
                <p className="mt-2.5 text-base leading-relaxed text-[var(--color-body)]">
                  {sec.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
