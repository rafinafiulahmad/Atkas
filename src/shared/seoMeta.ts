export interface RouteSeoEntry {
  path: string;
  canonicalPath?: string;
  excludeFromSitemap?: boolean;
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

const BASE_ORG = {
  '@type': 'EducationalOrganization',
  name: 'Atlas AI Education',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Atlas AI Institute',
  },
  description:
    'Atlas AI Education (Atlas AI Institute) — AI Literacy & Foundation, Applied AI, AI Professional Development, এবং Specialised Programmes।',
};

export const ROUTE_SEO_ENTRIES: RouteSeoEntry[] = [
  {
    path: '/',
    title: 'Atlas AI Education – Atlas AI Institute',
    description:
      'AI বুঝুন। কাজে লাগান। দায়িত্ব নিয়ে এগোন। Atlas AI Institute-এর education initiative — ১২টি programme ও প্রতি মাসের Free Masterclass।',
    ogType: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      ...BASE_ORG,
    },
  },
  {
    path: '/about',
    title: 'About – Atlas AI Education',
    description:
      'Atlas AI Education কী ও কেন — Atlas AI Institute-এর education initiative-এর লক্ষ্য, শেখার পদ্ধতি ও নীতিগত অঙ্গীকার।',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Atlas AI Education',
      mainEntity: BASE_ORG,
    },
  },
  {
    path: '/programmes',
    title: 'সব Programme (১২টি) – Atlas AI Education',
    description:
      '১২টা programme, ৪টা category — AI Literacy & Foundation, Applied AI, AI Professional Development ও Specialised Programmes।',
    ogType: 'website',
  },
  {
    path: '/free-masterclass',
    title: 'Free Masterclass Registration – Atlas AI Education',
    description:
      'AI Fundamentals & Digital Literacy: প্রতি মাসে ১টা session (২–২.৫ ঘণ্টা, ফি BDT 0)। পরবর্তী session-এর জন্য Register করুন।',
    ogType: 'website',
  },
  {
    path: '/programmes/ai-literacy',
    title: 'AI Literacy & Foundation – Atlas AI Education',
    description:
      'Entry level: AI-র প্রাথমিক ধারণা, digital awareness ও দৈনন্দিন কাজে ব্যবহার (Free + indicative BDT 990–1,990)।',
    ogType: 'website',
  },
  {
    path: '/programmes/applied-ai',
    title: 'Applied AI – Atlas AI Education',
    description:
      'Practical level: হাতে-কলমে project-এর মাধ্যমে AI-র বাস্তব প্রয়োগ (indicative BDT 2,990–4,490)।',
    ogType: 'website',
  },
  {
    path: '/programmes/professional-development',
    title: 'AI Professional Development – Atlas AI Education',
    description:
      'Advanced level: Engineering, research ও leadership-এর গভীর দক্ষতা (indicative BDT 9,990–14,990)।',
    ogType: 'website',
  },
  {
    path: '/programmes/specialised-programmes',
    title: 'Specialised Programmes – Atlas AI Education',
    description:
      'Women’s Safety in the AI Era (বিনামূল্যের ৪ সপ্তাহের কর্মসূচি) এবং বাস্তব জীবনের জরুরি ক্ষেত্রভিত্তিক বিশেষায়িত শিক্ষা উদ্যোগ।',
    ogType: 'website',
  },
  {
    path: '/programmes/womens-safety-in-the-ai-era',
    title: 'Women’s Safety in the AI Era – Atlas AI Education',
    description:
      'AI যুগে নারী ও মেয়েদের ডিজিটাল নিরাপত্তা: deepfake, synthetic media, privacy ও cyber abuse সুরক্ষায় ৪ সপ্তাহের সম্পূর্ণ বিনামূল্যের সচেতনতামূলক কর্মসূচি।',
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Women’s Safety in the AI Era',
      alternateName: 'AI যুগে নারী ও মেয়েদের ডিজিটাল নিরাপত্তা',
      description:
        'A Free Four-Week Digital Safety and AI Awareness Programme focusing on deepfakes, synthetic media, privacy protection, and online safety for women, girls, and educators.',
      provider: BASE_ORG,
      isAccessibleForFree: true,
      timeRequired: 'P4W',
      educationalLevel: 'Beginner / Awareness',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BDT',
        category: 'Free Educational Programme',
      },
    },
  },
  {
    path: '/programmes/SP-WSAI',
    canonicalPath: '/programmes/womens-safety-in-the-ai-era',
    excludeFromSitemap: true,
    title: 'Women’s Safety in the AI Era (SP-WSAI) – Atlas AI Education',
    description:
      'AI যুগে নারী ও মেয়েদের ডিজিটাল নিরাপত্তা: ৪ সপ্তাহের সম্পূর্ণ বিনামূল্যের সচেতনতামূলক কর্মসূচি।',
    ogType: 'article',
  },

  // Primary Code-Based Course Detail Routes (/programmes/:code)
  {
    path: '/programmes/FREE',
    title: 'AI Fundamentals & Digital Literacy (FREE) – Atlas AI Education',
    description: 'AI কী আর কীভাবে নিরাপদে ব্যবহার করবেন, শুরু হোক এই open session দিয়ে (BDT 0)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AL-101',
    title: 'AI for Everyday & Professional Productivity (AL-101) – Atlas AI Education',
    description: 'পড়াশোনা আর অফিসের কাজে AI tool গুছিয়ে ব্যবহার করুন (indicative BDT 990–1,490)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AL-102',
    title: 'Introduction to AI-Powered Digital Creation (AL-102) – Atlas AI Education',
    description: 'AI দিয়ে ডিজাইন আর content বানানোর প্রথম ধাপ (category range BDT 990–1,990 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AL-103',
    title: 'AI Safety, Ethics & Responsible Use (AL-103) – Atlas AI Education',
    description: 'Privacy, bias আর misinformation বুঝে দায়িত্বশীলভাবে AI ব্যবহার (category range BDT 990–1,990 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AP-201',
    title: 'AI-Powered Website Development (AP-201) – Atlas AI Education',
    description: 'AI দিয়ে নিজের responsive website বানান আর live deploy করুন (indicative BDT 3,990)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AP-202',
    title: 'AI-Powered Research & Data Analytics (AP-202) – Atlas AI Education',
    description: 'AI দিয়ে research আর data বিশ্লেষণ, তথ্য যাচাইসহ (category range BDT 2,990–4,490 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AP-203',
    title: 'AI Automation & Workflow Development (AP-203) – Atlas AI Education',
    description: 'বারবার করা কাজ automation-এ নিয়ে আসুন (category range BDT 2,990–4,490 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/AP-204',
    title: 'AI for Business & Digital Transformation (AP-204) – Atlas AI Education',
    description: 'ব্যবসার কাজে AI বসানোর বাস্তব কৌশল (category range BDT 2,990–4,490 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/PD-301',
    title: 'Advanced Full-Stack & AI Application Development (PD-301) – Atlas AI Education',
    description: 'Full-stack app-এ AI feature গড়ার গভীর প্রশিক্ষণ (category range BDT 9,990–14,990 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/PD-302',
    title: 'Advanced AI Research & Data Intelligence (PD-302) – Atlas AI Education',
    description: 'গবেষণা আর data intelligence-এর উন্নত পদ্ধতি (category range BDT 9,990–14,990 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/PD-303',
    title: 'AI Agents & Intelligent Automation Engineering (PD-303) – Atlas AI Education',
    description: 'AI agent আর বুদ্ধিমান automation system বানানো (category range BDT 9,990–14,990 indicative)।',
    ogType: 'article',
  },
  {
    path: '/programmes/PD-304',
    title: 'AI Governance, Strategy & Institutional Leadership (PD-304) – Atlas AI Education',
    description: 'প্রতিষ্ঠানের জন্য AI policy, risk আর leadership কৌশল (indicative BDT 14,990)।',
    ogType: 'article',
  },

  // Supporting Slug Aliases (backward compatible)
  {
    path: '/programmes/ai-fundamentals-digital-literacy-masterclass',
    canonicalPath: '/programmes/FREE',
    excludeFromSitemap: true,
    title: 'AI Fundamentals & Digital Literacy (FREE) – Atlas AI Education',
    description: 'AI কী আর কীভাবে নিরাপদে ব্যবহার করবেন, শুরু হোক এই open session দিয়ে (BDT 0)।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-everyday-professional-productivity',
    canonicalPath: '/programmes/AL-101',
    excludeFromSitemap: true,
    title: 'AI for Everyday & Professional Productivity (AL-101) – Atlas AI Education',
    description: 'পড়াশোনা আর অফিসের কাজে AI tool গুছিয়ে ব্যবহার করুন (indicative BDT 990–1,490)।',
    ogType: 'article',
  },
  {
    path: '/programmes/intro-ai-powered-digital-creation',
    canonicalPath: '/programmes/AL-102',
    excludeFromSitemap: true,
    title: 'Introduction to AI-Powered Digital Creation (AL-102) – Atlas AI Education',
    description: 'AI দিয়ে ডিজাইন আর content বানানোর প্রথম ধাপ।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-safety-ethics-responsible-use',
    canonicalPath: '/programmes/AL-103',
    excludeFromSitemap: true,
    title: 'AI Safety, Ethics & Responsible Use (AL-103) – Atlas AI Education',
    description: 'Privacy, bias আর misinformation বুঝে দায়িত্বশীলভাবে AI ব্যবহার।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-powered-website-development',
    canonicalPath: '/programmes/AP-201',
    excludeFromSitemap: true,
    title: 'AI-Powered Website Development (AP-201) – Atlas AI Education',
    description: 'AI দিয়ে নিজের responsive website বানান আর live deploy করুন (indicative BDT 3,990)।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-powered-research-data-analytics',
    canonicalPath: '/programmes/AP-202',
    excludeFromSitemap: true,
    title: 'AI-Powered Research & Data Analytics (AP-202) – Atlas AI Education',
    description: 'AI দিয়ে research আর data বিশ্লেষণ, তথ্য যাচাইসহ।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-automation-workflow-development',
    canonicalPath: '/programmes/AP-203',
    excludeFromSitemap: true,
    title: 'AI Automation & Workflow Development (AP-203) – Atlas AI Education',
    description: 'বারবার করা কাজ automation-এ নিয়ে আসুন।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-business-digital-transformation',
    canonicalPath: '/programmes/AP-204',
    excludeFromSitemap: true,
    title: 'AI for Business & Digital Transformation (AP-204) – Atlas AI Education',
    description: 'ব্যবসার কাজে AI বসানোর বাস্তব কৌশল।',
    ogType: 'article',
  },
  {
    path: '/programmes/advanced-full-stack-ai-application-development',
    canonicalPath: '/programmes/PD-301',
    excludeFromSitemap: true,
    title: 'Advanced Full-Stack & AI Application Development (PD-301) – Atlas AI Education',
    description: 'Full-stack app-এ AI feature গড়ার গভীর প্রশিক্ষণ।',
    ogType: 'article',
  },
  {
    path: '/programmes/advanced-ai-research-data-intelligence',
    canonicalPath: '/programmes/PD-302',
    excludeFromSitemap: true,
    title: 'Advanced AI Research & Data Intelligence (PD-302) – Atlas AI Education',
    description: 'গবেষণা আর data intelligence-এর উন্নত পদ্ধতি।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-agents-intelligent-automation-engineering',
    canonicalPath: '/programmes/PD-303',
    excludeFromSitemap: true,
    title: 'AI Agents & Intelligent Automation Engineering (PD-303) – Atlas AI Education',
    description: 'AI agent আর বুদ্ধিমান automation system বানানো।',
    ogType: 'article',
  },
  {
    path: '/programmes/ai-governance-strategy-institutional-leadership',
    canonicalPath: '/programmes/PD-304',
    excludeFromSitemap: true,
    title: 'AI Governance, Strategy & Institutional Leadership (PD-304) – Atlas AI Education',
    description: 'প্রতিষ্ঠানের জন্য AI policy, risk আর leadership কৌশল (indicative BDT 14,990)।',
    ogType: 'article',
  },

  // Supporting Institutional & Utility Pages
  {
    path: '/resources',
    title: 'Resources – Atlas AI Education',
    description:
      'AI শিক্ষা ও দায়িত্বশীল ব্যবহারের সহায়ক Guide, PDF ও নির্ভরযোগ্য Reference।',
    ogType: 'website',
  },
  {
    path: '/login',
    excludeFromSitemap: true,
    title: 'Login – Atlas AI Education',
    description: 'Atlas AI Education-এর demo account-এ প্রবেশ করুন।',
    ogType: 'website',
  },
  {
    path: '/signup',
    excludeFromSitemap: true,
    title: 'Sign Up – Atlas AI Education',
    description: 'Atlas AI Education-এ নতুন demo learner profile তৈরি করুন।',
    ogType: 'website',
  },
  {
    path: '/profile',
    excludeFromSitemap: true,
    title: 'My Profile – Atlas AI Education',
    description: 'আপনার প্রোফাইল, আগ্রহের ক্ষেত্র ও সংরক্ষিত আইটেম দেখুন।',
    ogType: 'website',
  },
  {
    path: '/menu',
    excludeFromSitemap: true,
    title: 'Menu – Atlas AI Education',
    description: 'Atlas AI Education মোবাইল মেন্যু ও সব পেজের তালিকা।',
    ogType: 'website',
  },
  {
    path: '/scholarships',
    title: 'Scholarships – Atlas AI Education',
    description:
      'ভবিষ্যতে Scholarship ও financial assistance বিবেচনার সম্ভাবনা সংক্রান্ত স্বচ্ছ তথ্য।',
    ogType: 'website',
  },
  {
    path: '/faq',
    title: 'FAQ – Atlas AI Education',
    description:
      'Free Masterclass, indicative ফি, non-accredited certificate, category নির্বাচন ও Scholarship নিয়ে সাধারণ প্রশ্নোত্তর।',
    ogType: 'website',
  },
  {
    path: '/contact',
    title: 'Contact – Atlas AI Education',
    description: 'Atlas AI Education সম্পর্কে যেকোনো জিজ্ঞাসা পাঠাতে যোগাযোগ করুন।',
    ogType: 'website',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy – Atlas AI Education',
    description: 'Atlas AI Education-এর ব্যক্তিগত তথ্য সুরক্ষা ও গোপনীয়তা নীতিমালা (খসড়া)।',
    ogType: 'article',
  },
  {
    path: '/privacy-policy',
    canonicalPath: '/privacy',
    excludeFromSitemap: true,
    title: 'Privacy Policy – Atlas AI Education',
    description: 'Atlas AI Education-এর ব্যক্তিগত তথ্য সুরক্ষা ও গোপনীয়তা নীতিমালা (খসড়া)।',
    ogType: 'article',
  },
  {
    path: '/terms',
    title: 'Terms & Conditions – Atlas AI Education',
    description: 'Non-accredited programme, শর্তাবলি ও ফলাফলের স্বচ্ছতা নীতিমালা (খসড়া)।',
    ogType: 'article',
  },
  {
    path: '/sitemap',
    title: 'Sitemap – Atlas AI Education',
    description: 'Atlas AI Education ওয়েবসাইটের সকল page, category ও programme তালিকা।',
    ogType: 'website',
  },
];

export function resolveRouteSeo(pathname: string): { entry: RouteSeoEntry; isKnown: boolean } {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const found =
    ROUTE_SEO_ENTRIES.find((item) => item.path === clean) ||
    ROUTE_SEO_ENTRIES.find((item) => item.path.toLowerCase() === clean.toLowerCase());
  if (found) {
    return { entry: found, isKnown: true };
  }
  return {
    entry: {
      path: clean,
      title: 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি – Atlas AI Education',
      description: 'Atlas AI Education ওয়েবসাইটে এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।',
      ogType: 'website',
    },
    isKnown: false,
  };
}
