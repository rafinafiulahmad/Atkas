import { Info } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';

const PRIVACY_SECTIONS = [
  {
    title: '১. আমরা কী তথ্য সংগ্রহ করি',
    body: 'Registration, Application বা Contact ফর্মের মাধ্যমে কেবল নাম, Email address, ফোন নম্বর (প্রযোজ্য ক্ষেত্রে) এবং শিক্ষাগত বা পেশাগত পরিচয়ের সাধারণ তথ্য সংগ্রহ করা হয়। কোনো ফর্মে ব্যাংক অ্যাকাউন্ট নম্বর, কার্ড তথ্য বা সংবেদনশীল জাতীয় পরিচয়পত্র চাওয়া হয় না।',
  },
  {
    title: '২. তথ্য ব্যবহারের উদ্দেশ্য',
    body: 'সংগ্রহ করা তথ্য শুধুমাত্র Free Masterclass বা নির্বাচিত programme-এর সময়সূচি জানানো, শিক্ষার্থীর প্রশ্নের উত্তর দেওয়া এবং শিক্ষামূলক যোগাযোগের জন্যই ব্যবহার করা হবে। বাণিজ্যিক বিজ্ঞাপন বা তৃতীয় পক্ষের কাছে তথ্য বিক্রি করা হয় না।',
  },
  {
    title: '৩. তথ্য সুরক্ষা ও গোপনীয়তা',
    body: 'বর্তমান ফর্মগুলো front-end ভিত্তিক হওয়ায় ব্রাউজার রিফ্রেশ করলে কোনো সার্ভারে ডেটা সংরক্ষিত থাকে না। ভবিষ্যতে আনুষ্ঠানিক ভর্তি ব্যবস্থা চালু হলে প্রয়োজনীয় নিরাপত্তা ও ডেটা সুরক্ষা নীতিমালা যুক্ত করা হবে।',
  },
];

export function PrivacyPolicyPage() {
  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
        title="Privacy Policy"
        subtitle="Atlas AI Education-এ ব্যক্তিগত তথ্যের সুরক্ষা ও ব্যবহার সংক্রান্ত নীতিমালা।"
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
            {PRIVACY_SECTIONS.map((sec) => (
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
