import { Check } from 'lucide-react';
import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';

const OBJECTIVES = [
  {
    title: 'AI Literacy',
    desc: 'সাধারণ মানুষ, শিক্ষার্থী ও শিক্ষকদের মাঝে AI সম্পর্কে পরিষ্কার ও ভয়মুক্ত মৌলিক ধারণা পৌঁছে দেওয়া।',
  },
  {
    title: 'Practical Skills',
    desc: 'হাতে-কলমে project ও বাস্তব উদাহরণের মাধ্যমে দৈনন্দিন ও পেশাগত কাজে AI প্রয়োগের দক্ষতা তৈরি।',
  },
  {
    title: 'Professional Development',
    desc: 'Software engineering, data intelligence, automation ও leadership পর্যায়ে গভীর সক্ষমতা গড়ে তোলা।',
  },
  {
    title: 'Responsible AI',
    desc: 'Privacy, bias যাচাই, source verification এবং নৈতিক ব্যবহারকে প্রতিটি course-এর অবিচ্ছেদ্য অংশ রাখা।',
  },
  {
    title: 'Specialised Learning',
    desc: 'ভবিষ্যতে স্বাস্থ্য, আইন, শিক্ষা, জলবায়ু ও public policy খাতের জন্য নির্দিষ্ট programme তৈরি করা।',
  },
  {
    title: 'Institutional Capacity',
    desc: 'প্রতিষ্ঠান ও দলনেতাদের জন্য বাস্তবসম্মত ও ঝুঁকি-সচেতন AI নীতি ও গ্রহণযোগ্য কাঠামো গঠনে সহায়তা।',
  },
];

const ETHICAL_PRINCIPLES = [
  {
    title: 'Academic Integrity',
    text: 'প্রতিটি অ্যাসাইনমেন্ট ও project-এ মৌলিক চিন্তা, সঠিক তথ্যসূত্র ও যাচাইকৃত উৎসের চর্চা বজায় রাখা।',
  },
  {
    title: 'Transparency',
    text: 'ফি, সময়কাল, prerequisite ও সীমাবদ্ধতা নিয়ে শুরু থেকেই অস্পষ্টতা ছাড়াই স্পষ্ট তথ্য দেওয়া।',
  },
  {
    title: 'Responsible AI',
    text: 'গোপনীয়তা, নিরাপত্তা ও অ্যালগরিদমিক পক্ষপাত সম্পর্কে সচেতনতা তৈরি করা।',
  },
  {
    title: 'Accessibility',
    text: 'প্রতি মাসের Free Masterclass ও সাধ্যানুযায়ী indicative ফি কাঠামোর মাধ্যমে শেখার সুযোগ বিস্তৃত রাখা।',
  },
  {
    title: 'Honest Certification',
    text: 'Certificate শুধুমাত্র বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে দেওয়া হয় এবং এটি non-accredited।',
  },
  {
    title: 'No False Promises',
    text: 'চাকরি, আয় বা স্বীকৃতি নিয়ে কোনো বাড়িয়ে বলা বা অতিরঞ্জিত প্রতিশ্রুতি না দেওয়া।',
  },
  {
    title: 'Continuous Improvement',
    text: 'শিক্ষার্থীদের মতামত ও প্রযুক্তির পরিবর্তনের সাথে তাল মিলিয়ে syllabus নিয়মিত হালনাগাদ করা।',
  },
];

export function AboutPage() {
  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        badge="An Education Initiative of Atlas AI Institute"
        title="Atlas AI Education কী ও কেন"
        subtitle="Understand AI. Apply AI. Advance Responsibly। এটি কোনো coaching centre বা course marketplace নয় — গবেষণানির্ভর ও বাস্তবসম্মত AI শিক্ষার একটি কাঠামোবদ্ধ উদ্যোগ।"
      />

      {/* Vision */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-tint)] p-7 sm:p-10">
            <p className="font-en text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Our Vision
            </p>
            <h2 className="mt-2 font-en text-xl font-bold text-[var(--color-heading)] sm:text-2xl">
              &ldquo;An AI-literate, capable and responsible society&rdquo;
            </h2>
            <p className="prose-measure mt-3 text-base leading-relaxed text-[var(--color-heading)]">
              আমাদের লক্ষ্য এমন একটি সমাজ গড়ে তোলায় ভূমিকা রাখা, যেখানে মানুষ শুধু AI tool চালাতে জানবে না — বরং AI কীভাবে কাজ করে, কোথায় ভুল হতে পারে এবং কীভাবে দায়িত্বশীলভাবে তা নিজের শিক্ষা, কর্মক্ষেত্র ও প্রতিষ্ঠানে কাজে লাগানো যায়, সে বিষয়েও পরিষ্কার ধারণা রাখবে।
            </p>
          </div>
        </div>
      </section>

      {/* 6 Objectives */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
            ছয়টি মূল উদ্দেশ্য
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECTIVES.map((obj) => (
              <div
                key={obj.title}
                className="rounded-[12px] border border-[var(--color-border)] bg-white p-6"
              >
                <h3 className="font-en text-lg font-bold text-[var(--color-primary)]">
                  {obj.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Method + 7 Ethical Commitments */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-[var(--color-heading)]">শেখার পদ্ধতি</h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-body)]">
              প্রতিটি programme-এ আগে মূল ধারণা পরিষ্কার করা হয়, তারপর বাস্তব সমস্যা বা project-এর মাধ্যমে অনুশীলন করানো হয়। Paid course-গুলোতে instructor-এর সরাসরি মূল্যায়ন ও feedback থাকে, যাতে শুধু theory নয়, কাজের মান উন্নত হয়।
            </p>
            <div className="mt-6 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-5">
              <p className="font-en text-sm font-bold text-[var(--color-heading)]">
                Understand AI. Apply AI. Advance Responsibly.
              </p>
              <p className="mt-1 font-en text-xs text-[var(--color-body)]">
                An Education Initiative of Atlas AI Institute
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-[var(--color-heading)]">নীতিগত অঙ্গীকার</h2>
            <div className="mt-6 divide-y divide-[var(--color-border)] rounded-[12px] border border-[var(--color-border)] bg-white px-6">
              {ETHICAL_PRINCIPLES.map((item) => (
                <div key={item.title} className="flex items-start gap-3 py-4">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-en text-sm font-bold text-[var(--color-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
