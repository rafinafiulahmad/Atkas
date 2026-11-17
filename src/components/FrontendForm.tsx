import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FrontendFormProps {
  mode: 'course-application' | 'free-masterclass' | 'contact';
  courseCode?: string;
  courseTitle?: string;
}

export function FrontendForm({ mode, courseCode, courseTitle }: FrontendFormProps) {
  const { recordFreeMasterclassRegistration } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [background, setBackground] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [accepted, setAccepted] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim().length < 2) {
      setError('দয়া করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('দয়া করে একটি সঠিক Email address লিখুন।');
      return;
    }

    if (mode === 'free-masterclass' || mode === 'course-application') {
      if (phone.trim().length < 6) {
        setError('দয়া করে একটি সচল Phone / WhatsApp নম্বর লিখুন।');
        return;
      }
    }

    if (mode === 'course-application' && background.trim().length < 3) {
      setError('দয়া করে আপনার বর্তমান শিক্ষাগত বা পেশাগত পরিচয় লিখুন।');
      return;
    }

    if (mode === 'contact') {
      if (subject.trim().length < 3) {
        setError('দয়া করে Message-এর Subject লিখুন।');
        return;
      }
      if (message.trim().length < 10) {
        setError('দয়া করে আপনার Message কমপক্ষে ১০ অক্ষরে লিখুন।');
        return;
      }
    }

    if (!accepted) {
      setError('এগিয়ে যাওয়ার আগে Privacy ও Terms সম্মতি বক্সে টিক দিন।');
      return;
    }

    if (mode === 'free-masterclass') {
      recordFreeMasterclassRegistration();
    }
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setBackground('');
    setSubject('');
    setMessage('');
    setAccepted(false);
    setError(null);
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-[var(--color-free)]"
            aria-hidden="true"
          />
          <div>
            <h3 className="text-xl font-bold text-[var(--color-heading)]">
              আপনার তথ্য জমা হয়েছে
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
              {mode === 'free-masterclass'
                ? 'Free Masterclass-এর তারিখ চূড়ান্ত হলে নিবন্ধিত সবাইকে জানানো হবে।'
                : mode === 'course-application'
                ? `${courseTitle || 'এই programme'}${
                    courseCode ? ` (${courseCode})` : ''
                  }-এর জন্য আপনার আগ্রহ নথিভুক্ত হয়েছে। ব্যাচ ও সময়সূচি চূড়ান্ত হলে জানানো হবে।`
                : 'আপনার বার্তাটি গ্রহণ করা হয়েছে। কোনো ব্যক্তিগত তথ্য জনসমক্ষে প্রকাশ করা হয় না।'}
            </p>
            <p className="mt-2 text-xs text-[var(--color-body)]">
              এটি একটি front-end interest ও enquiry ফর্ম; এখানে কোনো payment বা ব্যাংক সংক্রান্ত নথি সংগ্রহ করা হয় না।
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-5 inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-tint)] cursor-pointer"
            >
              নতুন করে তথ্য দিন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 sm:p-8"
    >
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-[8px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${mode}-name`} className="block text-sm font-semibold text-[var(--color-heading)]">
            পূর্ণ নাম *
          </label>
          <input
            id={`${mode}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম"
            className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor={`${mode}-email`} className="block text-sm font-semibold text-[var(--color-heading)]">
            Email Address *
          </label>
          <input
            id={`${mode}-email`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
          />
        </div>

        {(mode === 'free-masterclass' || mode === 'course-application') && (
          <div>
            <label htmlFor={`${mode}-phone`} className="block text-sm font-semibold text-[var(--color-heading)]">
              Phone / WhatsApp *
            </label>
            <input
              id={`${mode}-phone`}
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
            />
          </div>
        )}

        {mode === 'course-application' && (
          <div>
            <label htmlFor={`${mode}-bg`} className="block text-sm font-semibold text-[var(--color-heading)]">
              শিক্ষাগত বা পেশাগত পরিচয় *
            </label>
            <input
              id={`${mode}-bg`}
              type="text"
              required
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="যেমন: University Student / Analyst"
              className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
            />
          </div>
        )}

        {mode === 'free-masterclass' && (
          <div>
            <label htmlFor={`${mode}-bg`} className="block text-sm font-semibold text-[var(--color-heading)]">
              পেশা বা শিক্ষাস্তর (ঐচ্ছিক)
            </label>
            <input
              id={`${mode}-bg`}
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="যেমন: শিক্ষার্থী, শিক্ষক, চাকরিজীবী"
              className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
            />
          </div>
        )}

        {mode === 'contact' && (
          <>
            <div className="sm:col-span-2">
              <label htmlFor={`${mode}-subject`} className="block text-sm font-semibold text-[var(--color-heading)]">
                বিষয় (Subject) *
              </label>
              <input
                id={`${mode}-subject`}
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="আপনার প্রশ্নের বিষয়"
                className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`${mode}-msg`} className="block text-sm font-semibold text-[var(--color-heading)]">
                বার্তা (Message) *
              </label>
              <textarea
                id={`${mode}-msg`}
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার জিজ্ঞাসা বিস্তারিত লিখুন..."
                className="mt-1.5 w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2.5 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
              />
            </div>
          </>
        )}

        {mode === 'course-application' && (
          <div className="sm:col-span-2">
            <label htmlFor={`${mode}-note`} className="block text-sm font-semibold text-[var(--color-heading)]">
              শেখার লক্ষ্য (ঐচ্ছিক)
            </label>
            <textarea
              id={`${mode}-note`}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="এই programme থেকে কী শিখতে চান তা সংক্ষেপে লিখতে পারেন..."
              className="mt-1.5 w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2.5 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start gap-2.5">
        <input
          id={`${mode}-consent`}
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        />
        <label htmlFor={`${mode}-consent`} className="text-xs leading-relaxed text-[var(--color-body)]">
          আমি বুঝেছি এটি একটি non-accredited শিক্ষামূলক প্রোগ্রাম; এখানে কোনো ব্যাংক/পেমেন্ট নথি চাওয়া হচ্ছে না এবং আবেদন করলেই ভর্তি বা চাকরি নিশ্চিত হয় না।
        </label>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[8px] bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] cursor-pointer"
        >
          {mode === 'free-masterclass'
            ? 'Free Session-এ Register করুন'
            : mode === 'course-application'
            ? 'আবেদন জমা দিন'
            : 'বার্তা পাঠান'}
        </button>
      </div>
    </form>
  );
}
