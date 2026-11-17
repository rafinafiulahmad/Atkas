import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  Lock,
  Eye,
  FileCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Users,
  Award,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { WOMENS_SAFETY_PROGRAMME } from '../data/coursesData';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'এই কর্মসূচিতে অংশগ্রহণের জন্য কোনো ফি দিতে হবে কি?',
    a: 'না। এটি Atlas AI Education-এর একটি সম্পূর্ণ বিনামূল্যের (BDT 0) বিশেষায়িত সামাজিক সচেতনতামূলক শিক্ষা উদ্যোগ। কোনো নিবন্ধন ফি, হিডেন চার্জ বা আবেদন ফি নেই।',
  },
  {
    q: 'অংশগ্রহণের জন্য কি কোডিং বা কম্পিউটার সায়েন্সের অভিজ্ঞতা প্রয়োজন?',
    a: 'একেবারেই না। দৈনন্দিন জীবনে স্মার্টফোন, সোশ্যাল মিডিয়া বা ইন্টারনেট ব্যবহার করেন এমন যেকোনো নারী, শিক্ষার্থী ও শিক্ষক এই কর্মসূচিতে সহজে অংশ নিতে পারবেন। সকল ধারণা সহজ ও ব্যবহারিক ভাষায় ব্যাখ্যা করা হয়।',
  },
  {
    q: '১৮ বছরের কম বয়সী কিশোরী বা স্কুলের শিক্ষার্থীরা কি অংশ নিতে পারবে?',
    a: 'হ্যাঁ, স্কুল ও কলেজের নারী শিক্ষার্থীদের স্বাগতম। তবে ১৮ বছরের কম বয়সীদের ক্ষেত্রে অভিভাবকের সম্মতি ও অবগতি নিশ্চিত করে নিবন্ধন করতে হবে।',
  },
  {
    q: 'পরবর্তী ব্যাচের ক্লাস কবে শুরু হবে এবং সময়সূচি কী?',
    a: 'আমরা কোনো অনুমাননির্ভর বা কাল্পনিক তারিখ ঘোষণা করি না। ব্যাচের চূড়ান্ত সময়সূচি ও অনলাইন সেশন লিঙ্ক নির্ধারিত হওয়ার সাথে সাথে নিবন্ধিত শিক্ষার্থীদের ইমেইল ও হোয়াটসঅ্যাপে জানিয়ে দেওয়া হবে।',
  },
  {
    q: 'কর্মসূচি শেষে কি কোনো সার্টিফিকেট দেওয়া হবে?',
    a: '৪ সপ্তাহের সকল সেশনে সক্রিয় উপস্থিতি ও সমাপনী ডিজিটাল সেলফ-প্রটেকশন চেকলিস্ট সফলভাবে সম্পন্ন করার ভিত্তিতে Atlas AI Education থেকে একটি non-accredited Certificate of Participation প্রদান করা হবে।',
  },
  {
    q: 'ব্যক্তিগত কোনো সাইবার হয়রানির ঘটনা বা ছবি কি এই ফর্মে জমা দিতে হবে?',
    a: 'কখনোই না। আমাদের কঠোর সেফগার্ডিং নীতি অনুযায়ী এই ফর্মে বা ক্লাসে কোনো ব্যক্তিগত সংবেদনশীল ছবি বা গোপনীয় নথি চাওয়া হয় না এবং জমা দেওয়া সম্পূর্ণ নিষেধ।',
  },
];

export function WomensSafetyProgrammePage() {
  const programme = WOMENS_SAFETY_PROGRAMME;
  const [openWeek, setOpenWeek] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Registration Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetGroup, setTargetGroup] = useState('university_student');
  const [ageBracket, setAgeBracket] = useState<'adult' | 'minor'>('adult');
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim().length < 2) {
      setFormError('দয়া করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setFormError('দয়া করে একটি সঠিক Email Address দিন।');
      return;
    }
    if (phone.trim().length < 6) {
      setFormError('দয়া করে একটি সচল Phone / WhatsApp নম্বর লিখুন।');
      return;
    }
    if (ageBracket === 'minor' && !guardianConsent) {
      setFormError('১৮ বছরের কম বয়সীদের ক্ষেত্রে অভিভাবকের সম্মতির বক্সে টিক দেওয়া আবশ্যক।');
      return;
    }
    if (!privacyConsent) {
      setFormError('এগিয়ে যেতে সেফগার্ডিং ও প্রাইভেসি নীতিতে সম্মতি দিন।');
      return;
    }

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedRef = `WSAI-2026-${randomSuffix}`;
    setReferenceId(generatedRef);
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setTargetGroup('university_student');
    setAgeBracket('adult');
    setGuardianConsent(false);
    setMotivation('');
    setPrivacyConsent(false);
    setFormError(null);
  };

  return (
    <Layout
      customTitle="Women’s Safety in the AI Era – Atlas AI Education"
      customDescription="AI যুগে নারী ও মেয়েদের ডিজিটাল নিরাপত্তা: deepfake, synthetic media, privacy ও cyber abuse সুরক্ষায় ৪ সপ্তাহের সম্পূর্ণ বিনামূল্যের সচেতনতামূলক কর্মসূচি।"
    >
      {/* 1. Hero Section */}
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-blue-100">
            <Link to="/" className="hover:text-white hover:underline">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <Link to="/programmes" className="hover:text-white hover:underline">
              Programmes
            </Link>
            <span aria-hidden="true">›</span>
            <Link to="/programmes/specialised-programmes" className="hover:text-white hover:underline">
              Specialised Programmes
            </Link>
            <span aria-hidden="true">›</span>
            <span className="font-semibold text-white">Women’s Safety in the AI Era</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-white px-3 py-1 font-en text-xs font-bold text-[var(--color-navy)] shadow-xs">
                  SP-WSAI
                </span>
                <span className="rounded-full bg-[#EAF7EE] px-3 py-1 font-en text-xs font-bold text-[#1E8E3E] shadow-xs">
                  FREE · BDT 0
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 font-en text-xs font-semibold text-white backdrop-blur-xs">
                  4 Weeks
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 font-en text-xs font-semibold text-white backdrop-blur-xs">
                  Specialised Programme
                </span>
              </div>

              {/* Bilingual Title */}
              <h1
                className="mt-5 font-bold tracking-tight text-white font-bn"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)', lineHeight: 1.25 }}
              >
                AI যুগে নারী ও মেয়েদের ডিজিটাল নিরাপত্তা
              </h1>

              <p className="mt-3 font-en text-lg font-semibold tracking-wide text-blue-100 sm:text-xl">
                Women’s Safety in the AI Era
              </p>

              <p className="mt-1 font-en text-sm text-blue-200">
                A Free Four-Week Digital Safety and AI Awareness Programme
              </p>

              <p className="prose-measure mt-5 text-base leading-relaxed text-blue-100">
                কৃত্রিম বুদ্ধিমত্তা ও ডিজিটাল প্রযুক্তির যুগে অনলাইনে নারী ও কন্যাশিশুদের নিরাপত্তা, ডিপফেক ও ছবি বিকৃতির ঝুঁকি প্রতিরোধ, প্রাইভেসি সুরক্ষা এবং কার্যকর প্রাতিষ্ঠানিক সহায়তা গ্রহণের ব্যবহারিক উপায়।
              </p>

              {/* Meta information row */}
              <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/20 pt-5 text-sm text-blue-50">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                  <span>৪ সপ্তাহ · সাপ্তাহিক সেশন</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                  <span>নারী, কন্যাশিশু, শিক্ষার্থী ও শিক্ষক</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                  <span>Certificate of Participation</span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#register"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-[8px] bg-white px-6 py-2.5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-blue-50 whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span>বিনামূল্যে রেজিস্টার করুন</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-[8px] border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 whitespace-nowrap shrink-0"
                >
                  কারিকুলাম দেখুন
                </a>
              </div>

              {/* Organiser attribution */}
              <p className="mt-5 font-en text-xs text-blue-200">
                Organised by <strong className="font-semibold text-white">Atlas AI Education</strong> — An Education Initiative of Atlas AI Institute
              </p>
            </div>

            {/* Right Column: Hero Image with Badge */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[16px] border border-white/20 bg-slate-900 shadow-2xl">
                <img
                  src={programme.imageUrl}
                  alt={programme.imageAlt}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-102"
                  loading="eager"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 font-en text-xs font-semibold backdrop-blur-md">
                    Educational Awareness Initiative
                  </span>
                  <p className="mt-2 text-sm font-medium text-blue-100">
                    নিরাপদ ও সচেতন ডিজিটাল ভবিষ্যৎ গড়ার বাস্তব প্রস্তুতি।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Highlights Bar */}
      <section className="border-b border-[var(--color-border)] bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-4 text-center">
              <p className="text-xs font-semibold text-[var(--color-body)]">কোর্সের ধরন</p>
              <p className="mt-1 font-en text-base font-bold text-[var(--color-heading)]">Free Programme</p>
              <p className="mt-0.5 font-en text-xs font-bold text-[#1E8E3E]">BDT 0 (সম্পূর্ণ ফ্রি)</p>
            </div>
            <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-4 text-center">
              <p className="text-xs font-semibold text-[var(--color-body)]">সময়কাল</p>
              <p className="mt-1 font-en text-base font-bold text-[var(--color-heading)]">4 Weeks</p>
              <p className="mt-0.5 text-xs text-[var(--color-body)]">সাপ্তাহিক ১টি সেশন</p>
            </div>
            <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-4 text-center">
              <p className="text-xs font-semibold text-[var(--color-body)]">যোগ্যতা</p>
              <p className="mt-1 font-en text-base font-bold text-[var(--color-heading)]">All Welcome</p>
              <p className="mt-0.5 text-xs text-[var(--color-body)]">কোডিং জানা আবশ্যক নয়</p>
            </div>
            <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-4 text-center">
              <p className="text-xs font-semibold text-[var(--color-body)]">স্বীকৃতি</p>
              <p className="mt-1 font-en text-base font-bold text-[var(--color-heading)]">Participation</p>
              <p className="mt-0.5 text-xs text-[var(--color-body)]">Non-accredited Certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Programme Purpose & Overview */}
      <section className="border-b border-[var(--color-border)] bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <span className="inline-block rounded-full bg-[var(--color-tint)] px-3.5 py-1 font-en text-xs font-bold text-[var(--color-primary)]">
                Programme Overview
              </span>
              <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                AI যুগে ডিজিটাল নিরাপত্তার গুরুত্ব ও উদ্দেশ্য
              </h2>
              <div className="prose-measure mt-5 space-y-4 text-base leading-relaxed text-[var(--color-body)]">
                <p>
                  বর্তমান সময়ে জেনারেটিভ AI প্রযুক্তির দ্রুত বিকাশ যেমন অপার সম্ভাবনার দ্বার খুলে দিয়েছে, তেমনি ডিজিটাল জগতে নারী ও কন্যাশিশুদের সুরক্ষায় এক নতুন বাস্তবতার জন্ম দিয়েছে। ছবি বিকৃতি, ডিপফেক ভিডিও, কণ্ঠস্বর অনুকরণ এবং তথ্য চুরির মতো প্রযুক্তিগত অপব্যবহার যেকোনো সাধারণ ইন্টারনেটের ব্যবহারকারীকে ঝুঁকিতে ফেলতে পারে।
                </p>
                <p>
                  <strong className="text-[var(--color-heading)]">Women’s Safety in the AI Era</strong> কোনো অ্যালার্মিস্ট ভীতি ছড়ানোর কর্মসূচি নয়; বরং এটি একটি দায়িত্বশীল ও ক্ষমতায়নমুখী শিক্ষামূলক প্ল্যাটফর্ম। এখানে আমরা শিক্ষার্থীদের শেখাবো কীভাবে প্রযুক্তির ঝুঁকিগুলোকে যুক্তি ও সচেতনতা দিয়ে শনাক্ত করা যায়, সোশ্যাল মিডিয়ায় নিজের ব্যক্তিগত তথ্যের নিয়ন্ত্রণ ধরে রাখা যায় এবং যেকোনো সাইবার সংকটে আতঙ্কিত না হয়ে সুনির্দিষ্ট আইনি ও প্রাতিষ্ঠানিক ধাপ অনুসরণ করা যায়।
                </p>
                <p>
                  এই ৪ সপ্তাহের প্রোগ্রামে কাউকে কোনো অপ্রয়োজনীয় প্রযুক্তিগত জটিলতায় না ফেলে বাস্তব জীবনের বাস্তবসম্মত করণীয়গুলো হাতে-কলমে তুলে ধরা হবে।
                </p>
              </div>

              {/* Safety Pledge Box */}
              <div className="mt-8 rounded-[12px] border border-blue-200 bg-blue-50/60 p-5">
                <div className="flex items-start gap-3">
                  <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-heading)]">
                      সহমর্মিতা ও কোনো দোষারোপহীন (Non-Victim-Blaming) দৃষ্টিভঙ্গি
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--color-body)]">
                      ডিজিটাল অপরাধের সম্পূর্ণ দায় অপরাধীর। এখানে নারী ও কন্যাশিশুদের আত্মবিশ্বাস কমাতে নয়, বরং প্রযুক্তিকে স্বাধীনভাবে ও সুরক্ষিত উপায়ে ব্যবহারের জন্য আত্মবিশ্বাস ও দক্ষতা বৃদ্ধি করাই আমাদের একমাত্র অঙ্গীকার।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Key Focal Areas */}
            <div className="lg:col-span-5">
              <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-6 sm:p-7">
                <h3 className="text-lg font-bold text-[var(--color-heading)]">
                  যেসব বিষয়ে আলোকপাত করা হবে
                </h3>
                <p className="mt-1 text-xs text-[var(--color-body)]">
                  ৪ সপ্তাহের সম্পূর্ণ কর্মসূচির মূল কাঠামোগত ভিত্তি:
                </p>

                <ul className="mt-5 space-y-3.5">
                  <li className="flex items-start gap-3 rounded-[8px] bg-white p-3.5 border border-[var(--color-border)] shadow-2xs">
                    <Eye className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                    <div>
                      <p className="font-en text-sm font-semibold text-[var(--color-heading)]">
                        Deepfakes & Synthetic Media
                      </p>
                      <p className="text-xs text-[var(--color-body)]">
                        AI দিয়ে ছবি বা ভিডিও বিকৃতি শনাক্তকরণ ও সত্যতা যাচাই।
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 rounded-[8px] bg-white p-3.5 border border-[var(--color-border)] shadow-2xs">
                    <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#1E8E3E]" aria-hidden="true" />
                    <div>
                      <p className="font-en text-sm font-semibold text-[var(--color-heading)]">
                        Privacy & Personal Data
                      </p>
                      <p className="text-xs text-[var(--color-body)]">
                        ডিজিটাল ফুটপ্রিন্ট নিয়ন্ত্রণ, সোশ্যাল মিডিয়া সেটিংস ও ২-ফ্যাক্টর নিরাপত্তা।
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 rounded-[8px] bg-white p-3.5 border border-[var(--color-border)] shadow-2xs">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#E37400]" aria-hidden="true" />
                    <div>
                      <p className="font-en text-sm font-semibold text-[var(--color-heading)]">
                        Online Harassment & Blackmail
                      </p>
                      <p className="text-xs text-[var(--color-body)]">
                        সাইবার বুলিং, ব্ল্যাকমেইলিং ও ইমপারসোনেশন প্রতিরোধে করণীয়।
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3 rounded-[8px] bg-white p-3.5 border border-[var(--color-border)] shadow-2xs">
                    <FileCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-navy)]" aria-hidden="true" />
                    <div>
                      <p className="font-en text-sm font-semibold text-[var(--color-heading)]">
                        Evidence Preservation & Reporting
                      </p>
                      <p className="text-xs text-[var(--color-body)]">
                        ডিজিটাল প্রমাণ সঠিকভাবে সংরক্ষণ ও প্রাতিষ্ঠানিক সহায়তা গ্রহণ।
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Target Audience */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white px-3.5 py-1 font-en text-xs font-bold text-[var(--color-primary)] border border-[var(--color-border)]">
              Target Audience
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              কারা এই কর্মসূচিতে অংশ নিতে পারবেন
            </h2>
            <p className="mt-2 text-base text-[var(--color-body)]">
              এই প্রোগ্রামটি বিশেষ করে নারী, শিক্ষার্থী, শিক্ষাবিদ এবং তৃণমূল কমিউনিটির সচেতনতা বৃদ্ধিকারীদের জন্য ডিজাইন করা হয়েছে।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-2xs">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[var(--color-tint)] text-[var(--color-primary)]">
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
                নারী ও কন্যাশিশু
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                যাঁরা দৈনন্দিন জীবনে ডিজিটাল যোগাযোগ, সোশ্যাল মিডিয়া ও অনলাইন স্পেসে নিজেদের গোপনীয়তা ও সম্মান নিরাপদে বজায় রাখতে চান।
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-2xs">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#EEEDFC] text-[#4B3FD6]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
                স্কুল ও কলেজের শিক্ষার্থী
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                বয়ঃসন্ধি ও প্রাক-বিশ্ববিদ্যালয় পর্যায়ের শিক্ষার্থী, যাঁদের অনলাইন পরিচিতি ও ডিজিটাল আচরণে প্রাথমিক সুরক্ষাবলয় তৈরি করা জরুরি।
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-2xs">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#EAF7EE] text-[#1E8E3E]">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
                বিশ্ববিদ্যালয়ের শিক্ষার্থী
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                ক্যাম্পাস জীবন, রিসার্চ, নেটওয়ার্কিং এবং ফ্রিল্যান্সিংয়ে যুক্ত নারী শিক্ষার্থী, যাঁরা সাইবার রিস্ক ও ক্যারিয়ার প্রোফাইল সুরক্ষিত রাখতে চান।
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-2xs">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#E8EDF7] text-[var(--color-navy)]">
                <FileCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
                শিক্ষক ও শিক্ষাবিদ
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                বিদ্যালয়, কলেজ বা বিশ্ববিদ্যালয়ের শিক্ষকবৃন্দ যাঁরা ক্লাসরুমে ছাত্রীদের মাঝে সাইবার সচেতনতা ও হেল্পলাইন গাইডেন্স প্রদান করতে চান।
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-white p-6 shadow-2xs sm:col-span-2 lg:col-span-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-amber-50 text-amber-700">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[var(--color-heading)]">
                কমিউনিটি এডুকেটর ও প্রাসঙ্গিক সামাজিক প্রতিষ্ঠান
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                নারী অধিকার, যুব উন্নয়ন এবং ডিজিটাল সাক্ষরতা নিয়ে কর্মরত বিভিন্ন এনজিও ও সামাজিক প্ল্যাটফর্মের প্রতিনিধি, যাঁরা নিজ কমিউনিটিতে কার্যকর সুরক্ষা প্রোটোকল পৌঁছাতে চান।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-Week Detailed Curriculum */}
      <section id="curriculum" className="border-b border-[var(--color-border)] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[var(--color-tint)] px-3.5 py-1 font-en text-xs font-bold text-[var(--color-primary)]">
              Structured Curriculum
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              ৪ সপ্তাহের বিস্তারিত কারিকুলাম ও আউটকাম
            </h2>
            <p className="mt-2 text-base text-[var(--color-body)]">
              প্রতিটি সপ্তাহে একটি নির্দিষ্ট বিষয়ের তাত্ত্বিক ও ব্যবহারিক দিক আলোচনা করা হবে এবং বাস্তবিক আত্মরক্ষার দক্ষতা শেখানো হবে।
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {programme.modules.map((mod, idx) => {
              const isOpen = openWeek === idx;
              return (
                <div
                  key={mod.code}
                  className={`overflow-hidden rounded-[12px] border transition-all ${
                    isOpen
                      ? 'border-[var(--color-primary)] shadow-sm'
                      : 'border-[var(--color-border)] hover:border-slate-300'
                  } bg-white`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenWeek(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[var(--color-soft-bg)] cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-en text-xs font-bold text-white">
                        W{idx + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-en text-xs font-bold text-[var(--color-primary)]">
                            {mod.code}
                          </span>
                          <span className="text-xs text-[var(--color-body)]">· ১ সপ্তাহের মডিউল</span>
                        </div>
                        <h3 className="font-en text-base font-bold text-[var(--color-heading)] sm:text-lg">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[var(--color-body)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[var(--color-border)] bg-[var(--color-soft-bg)] p-5 sm:p-7">
                      <p className="text-xs font-bold text-[var(--color-heading)] uppercase tracking-wider">
                        মূল আলোচ্য বিষয়সমূহ (Key Topics)
                      </p>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {mod.topics.map((topic, tIdx) => (
                          <li
                            key={tIdx}
                            className="flex items-start gap-2.5 rounded-[8px] bg-white p-3 border border-[var(--color-border)] text-sm text-[var(--color-heading)]"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Weekly Outcome Box */}
                      <div className="mt-5 rounded-[8px] border border-emerald-200 bg-emerald-50/70 p-4">
                        <p className="font-en text-xs font-bold text-[#1E8E3E] uppercase tracking-wider">
                          Weekly Expected Outcome
                        </p>
                        <p className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                          {idx === 0 &&
                            'অংশগ্রহণকারীরা সাধারণ ডিজিটাল দুর্বলতা ও ঝুঁকিগুলো পরিষ্কারভাবে বুঝতে পারবেন এবং প্রাথমিক সুরক্ষামূলক ব্যবস্থা গ্রহণে সক্ষম হবেন।'}
                          {idx === 1 &&
                            'সিন্থেটিক ও ম্যানিপুলেটেড মিডিয়া শনাক্ত করার কার্যকর উপায় শিখবেন এবং ডিপফেক সংক্রান্ত ব্যক্তিগত ও সামাজিক ঝুঁকি সম্পর্কে স্পষ্ট ধারণা পাবেন।'}
                          {idx === 2 &&
                            'সোশ্যাল মিডিয়া ও মেসেজিং অ্যাকাউন্টের সম্পূর্ণ নিরাপত্তা নিশ্চিত করতে পারবেন এবং সাইবার হয়রানি ও ব্ল্যাকমেইলিংয়ের ঝুঁকি হ্রাস করার বাস্তব দক্ষতা অর্জন করবেন।'}
                          {idx === 3 &&
                            'কোনো অনাকাঙ্ক্ষিত ঘটনা ঘটলে কীভাবে তাৎক্ষণিক পদক্ষেপ নিতে হয়, ডিজিটাল প্রমাণ আইনগতভাবে অক্ষুণ্ণ রেখে সংরক্ষণ করতে হয় এবং প্রাতিষ্ঠানিক সহায়তা চাইতে হয় তা জানবেন।'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Learning Outcomes & Practical Skills */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-soft-bg)] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-white px-3.5 py-1 font-en text-xs font-bold text-[var(--color-primary)] border border-[var(--color-border)]">
                Learning Outcomes
              </span>
              <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
                এই প্রোগ্রাম শেষে আপনি কী কী শিখবেন
              </h2>
              <p className="prose-measure mt-3 text-base text-[var(--color-body)]">
                এটি কোনো মুখস্থবিদ্যা নয়। প্রতিটি আউটকাম দৈনন্দিন অনলাইন জীবনে নিজের এবং পরিবারের সুরক্ষায় সরাসরি প্রয়োগযোগ্য বাস্তব দক্ষতা তৈরি করে।
              </p>

              <div className="mt-6 rounded-[12px] border border-[var(--color-border)] bg-white p-5">
                <p className="font-en text-xs font-bold text-[var(--color-primary)] uppercase">
                  Participation Certificate
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-heading)]">
                  ৪ সপ্তাহের সফল অংশগ্রহণ ও স্ব-সুরক্ষা চেকলিস্ট জমা দেওয়ার পর Atlas AI Education-এর ডিজিটাল সার্টিফিকেট অব পার্টিসিপেশন।
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[16px] border border-[var(--color-border)] bg-white p-6 sm:p-8 shadow-xs">
                <ul className="space-y-4">
                  {programme.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-tint)] text-[var(--color-primary)]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <p className="text-sm leading-relaxed text-[var(--color-heading)]">
                        {outcome}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Learning Methodology */}
      <section className="border-b border-[var(--color-border)] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[var(--color-tint)] px-3.5 py-1 font-en text-xs font-bold text-[var(--color-primary)]">
              Learning Methodology
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              আমরা কীভাবে শেখাই
            </h2>
            <p className="mt-2 text-base text-[var(--color-body)]">
              সহজ ভাষা, পারস্পরিক সম্মান এবং সুরক্ষিত আলোচনার পরিবেশ নিশ্চিত করে এই শিক্ষণ পদ্ধতি সাজানো হয়েছে।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-6">
              <h3 className="font-en text-base font-bold text-[var(--color-heading)]">
                1. Practical Checklists
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                তাত্ত্বিক ব্যাখ্যার সাথে সাথে প্রতিটি সেশনে ধাপে ধাপে নিজের ফোন বা ল্যাপটপের প্রাইভেসি সেটিংস পরিবর্তনের চেকলিস্ট অনুশীলন।
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-6">
              <h3 className="font-en text-base font-bold text-[var(--color-heading)]">
                2. Real-World Case Studies
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                বাস্তব জীবনের বিভিন্ন বেনামী কেস অ্যানালাইসিসের মাধ্যমে অপরাধের প্যাটার্ন ও সুরক্ষার কার্যকর কৌশল পর্যবেক্ষণ।
              </p>
            </div>

            <div className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-6">
              <h3 className="font-en text-base font-bold text-[var(--color-heading)]">
                3. Safe & Supportive Space
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                যেখানে শিক্ষার্থীরা দ্বিধাহীনভাবে তাদের প্রশ্ন করতে পারবেন এবং কোনো ধরনের সমালোচনা বা জাজমেন্টের শিকার হবেন না।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Safeguarding & Safe Participation Rules */}
      <section className="border-b border-[var(--color-border)] bg-amber-50/50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[16px] border border-amber-200 bg-white p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 text-amber-800">
              <AlertTriangle className="h-6 w-6 shrink-0" aria-hidden="true" />
              <h2 className="text-xl font-bold sm:text-2xl">
                সেফগার্ডিং ও অংশগ্রহণ নীতিমালা (Safeguarding Policy)
              </h2>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-[10px] border border-amber-100 bg-amber-50/40 p-4">
                <h3 className="text-sm font-bold text-[var(--color-heading)]">
                  ১. নাবালিকা ও অপ্রাপ্তবয়স্কদের সুরক্ষা
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-body)]">
                  ১৮ বছরের কম বয়সী শিক্ষার্থী অংশগ্রহণ করতে চাইলে অভিভাবকের অবগতি ও সম্মতি আবশ্যক। নিবন্ধনের সময় অভিভাবকীয় সম্মতি স্বীকার করতে হবে।
                </p>
              </div>

              <div className="rounded-[10px] border border-amber-100 bg-amber-50/40 p-4">
                <h3 className="text-sm font-bold text-[var(--color-heading)]">
                  ২. কোনো সংবেদনশীল তথ্য জমা নয়
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-body)]">
                  নিবন্ধন ফর্মে বা ক্লাসে ব্যক্তিগত কোনো স্পর্শকাতর ছবি, ব্ল্যাকমেইল সংক্রান্ত স্ক্রিনশট বা হয়রানির নথি জমা দেওয়া সম্পূর্ণ নিষেধ।
                </p>
              </div>

              <div className="rounded-[10px] border border-amber-100 bg-amber-50/40 p-4">
                <h3 className="text-sm font-bold text-[var(--color-heading)]">
                  ৩. স্বচ্ছ সময়সূচি ও নোটিশ
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-body)]">
                  আমরা কোনো কাল্পনিক শুরুর তারিখ বা কৃত্রিম কাউন্টডাউন ব্যবহার করি না। ব্যাচ চূড়ান্ত হলে আবেদনকারীদের ইমেইল ও হোয়াটসঅ্যাপে নিশ্চিত করা হবে।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="border-b border-[var(--color-border)] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[var(--color-tint)] px-3.5 py-1 font-en text-xs font-bold text-[var(--color-primary)]">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              সাধারণ জিজ্ঞাসা
            </h2>
            <p className="mt-2 text-base text-[var(--color-body)]">
              Women’s Safety in the AI Era প্রোগ্রাম সংক্রান্ত প্রাসঙ্গিক প্রশ্ন ও উত্তর।
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[10px] border border-[var(--color-border)] bg-white transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-4.5 text-left text-sm font-bold text-[var(--color-heading)] hover:text-[var(--color-primary)] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`ml-3 h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[var(--color-border)] bg-[var(--color-soft-bg)] p-4.5 text-sm leading-relaxed text-[var(--color-body)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Registration Form Section */}
      <section id="register" className="bg-[var(--color-soft-bg)] py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block rounded-full bg-white px-3.5 py-1 font-en text-xs font-bold text-[#1E8E3E] border border-emerald-200 shadow-2xs">
              Free Registration · BDT 0
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-heading)] sm:text-3xl">
              কর্মসূচিতে অংশ নিতে তথ্য দিন
            </h2>
            <p className="mt-2 text-sm text-[var(--color-body)]">
              এটি একটি উন্মুক্ত শিক্ষামূলক কর্মসূচির আগ্রহ নিবন্ধন ফর্ম। কোনো পেমেন্ট বা ফি প্রদান করতে হবে না।
            </p>
          </div>

          <div className="mt-8">
            {formSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-[16px] border border-emerald-200 bg-white p-6 sm:p-10 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-1 h-8 w-8 shrink-0 text-[#1E8E3E]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-heading)]">
                      আপনার তথ্য জমা হয়েছে
                    </h3>
                    <p className="mt-2 text-base text-[var(--color-body)]">
                      Women’s Safety in the AI Era প্রোগ্রামের জন্য আপনার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।
                    </p>

                    <div className="mt-4 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] p-4">
                      <p className="font-en text-xs font-semibold text-[var(--color-body)] uppercase">
                        Registration Reference ID
                      </p>
                      <p className="mt-1 font-en text-xl font-bold text-[var(--color-primary)] tracking-wide">
                        {referenceId}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2 text-xs text-[var(--color-body)]">
                      <p>
                        ✓ পরবর্তী ব্যাচের দিনক্ষণ এবং অনলাইন ক্লাসের লিংক নির্ধারিত হওয়ার পর আপনার ইমেইল ও হোয়াটসঅ্যাপে পাঠানো হবে।
                      </p>
                      <p>
                        ✓ এটি একটি সম্পূর্ণ বিনামূল্যের সামাজিক সচেতনতা প্রোগ্রাম; কোনো আর্থিক লেনদেন বা সংবেদনশীল নথি নেওয়া হয় না।
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="mt-6 inline-flex min-h-[44px] items-center rounded-[8px] border border-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-tint)] cursor-pointer"
                    >
                      আরেকটি নিবন্ধন করুন
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleRegisterSubmit}
                noValidate
                className="rounded-[16px] border border-[var(--color-border)] bg-white p-6 sm:p-10 shadow-sm"
              >
                {formError && (
                  <div
                    role="alert"
                    className="mb-6 flex items-start gap-2.5 rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="wsai-name" className="block text-sm font-semibold text-[var(--color-heading)]">
                      পূর্ণ নাম *
                    </label>
                    <input
                      id="wsai-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="wsai-email" className="block text-sm font-semibold text-[var(--color-heading)]">
                      Email Address *
                    </label>
                    <input
                      id="wsai-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="wsai-phone" className="block text-sm font-semibold text-[var(--color-heading)]">
                      Phone / WhatsApp নম্বর *
                    </label>
                    <input
                      id="wsai-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 font-en text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="wsai-group" className="block text-sm font-semibold text-[var(--color-heading)]">
                      অংশগ্রহণকারীর ক্যাটাগরি *
                    </label>
                    <select
                      id="wsai-group"
                      value={targetGroup}
                      onChange={(e) => setTargetGroup(e.target.value)}
                      className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    >
                      <option value="university_student">বিশ্ববিদ্যালয়ের শিক্ষার্থী</option>
                      <option value="college_student">কলেজের শিক্ষার্থী</option>
                      <option value="school_student">স্কুলের শিক্ষার্থী</option>
                      <option value="educator">শিক্ষক বা শিক্ষাবিদ</option>
                      <option value="community_educator">কমিউনিটি এডুকেটর / সামাজিক সংগঠক</option>
                      <option value="professional">চাকরিজীবী / পেশাজীবী</option>
                      <option value="other">অন্যান্য আগ্রহী শিক্ষার্থী</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-heading)]">
                      বয়সসীমা *
                    </label>
                    <div className="mt-2.5 flex items-center gap-6">
                      <label className="flex items-center gap-2 text-sm text-[var(--color-heading)] cursor-pointer">
                        <input
                          type="radio"
                          name="ageBracket"
                          value="adult"
                          checked={ageBracket === 'adult'}
                          onChange={() => setAgeBracket('adult')}
                          className="h-4 w-4 text-[var(--color-primary)]"
                        />
                        <span>১৮ বছর বা তার বেশি</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[var(--color-heading)] cursor-pointer">
                        <input
                          type="radio"
                          name="ageBracket"
                          value="minor"
                          checked={ageBracket === 'minor'}
                          onChange={() => setAgeBracket('minor')}
                          className="h-4 w-4 text-[var(--color-primary)]"
                        />
                        <span>১৮ বছরের কম</span>
                      </label>
                    </div>
                  </div>

                  {ageBracket === 'minor' && (
                    <div className="sm:col-span-2 rounded-[8px] border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-start gap-2.5">
                        <input
                          id="wsai-guardian"
                          type="checkbox"
                          checked={guardianConsent}
                          onChange={(e) => setGuardianConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-amber-300 text-[var(--color-primary)]"
                        />
                        <label htmlFor="wsai-guardian" className="text-xs leading-relaxed text-amber-900 cursor-pointer">
                          <strong>অভিভাবকের সম্মতি:</strong> আমি আমার মা-বাবা বা বৈধ অভিভাবকের অবগতি ও সম্মতি সাপেক্ষে এই ৪ সপ্তাহের সচেতনতামূলক শিক্ষামূলক কর্মসূচিতে অংশগ্রহণ করছি।
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label htmlFor="wsai-motivation" className="block text-sm font-semibold text-[var(--color-heading)]">
                      শেখার প্রত্যাশা বা আগ্রহ (ঐচ্ছিক)
                    </label>
                    <textarea
                      id="wsai-motivation"
                      rows={3}
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="এই প্রোগ্রাম থেকে ডিজিটাল নিরাপত্তার কোন বিষয়টি বিশেষভাবে শিখতে চান? (ব্যক্তিগত কোনো সংবেদনশীল ঘটনা লিখবেন না)"
                      className="mt-1.5 w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-soft-bg)] px-3.5 py-2.5 text-sm text-[var(--color-heading)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Safeguarding notice */}
                <div className="mt-5 rounded-[8px] border border-blue-100 bg-blue-50/50 p-3.5 text-xs text-blue-900">
                  <p className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>
                      <strong>গোপনীয়তা ও নিরাপত্তা:</strong> এই ফর্মের মাধ্যমে কোনো সংবেদনশীল ব্যক্তিগত ছবি বা ফাইল গ্রহণ করা হয় না। আপনার প্রদানকৃত যোগাযোগ তথ্য কেবল ক্লাসের নোটিফিকেশনের জন্য সংরক্ষিত থাকবে।
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-2.5">
                  <input
                    id="wsai-consent"
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <label htmlFor="wsai-consent" className="text-xs leading-relaxed text-[var(--color-body)] cursor-pointer">
                    আমি বুঝেছি এটি সম্পূর্ণ বিনামূল্যের (BDT 0) একটি non-accredited শিক্ষামূলক উদ্যোগ। আমি কোনো সংবেদনশীল সাইবার নথি শেয়ার করবো না এবং ব্যাচের সময়সূচি নিশ্চিত হলে ইমেইলে নোটিফিকেশন পেতে সম্মতি জানাচ্ছি। *
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center rounded-[8px] bg-[var(--color-primary)] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-hover)] cursor-pointer shadow-xs"
                  >
                    নিবন্ধন সম্পন্ন করুন (Free)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
