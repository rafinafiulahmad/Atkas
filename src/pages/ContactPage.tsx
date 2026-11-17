import { Layout } from '../components/Layout';
import { PageBanner } from '../components/PageBanner';
import { FrontendForm } from '../components/FrontendForm';

export function ContactPage() {
  return (
    <Layout>
      <PageBanner
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="যোগাযোগ (Contact)"
        subtitle="Programme, Free Masterclass বা প্রাতিষ্ঠানিক কোনো জিজ্ঞাসা থাকলে নিচের ফর্মের মাধ্যমে বার্তা পাঠাতে পারেন।"
      />

      <section className="bg-[var(--color-soft-bg)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-tint)] p-4 text-sm text-[var(--color-heading)]">
            এটি একটি front-end যোগাযোগ ফর্ম। কোনো কাল্পনিক ফোন নম্বর বা ঠিকানা প্রকাশ করা হয়নি।
          </div>
          <FrontendForm mode="contact" />
        </div>
      </section>
    </Layout>
  );
}
