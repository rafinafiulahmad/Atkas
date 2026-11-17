export type CategorySlug =
  | 'ai-literacy'
  | 'applied-ai'
  | 'professional-development'
  | 'specialised-programmes';

export type TierAccentType = 'free' | 'literacy' | 'applied' | 'professional' | 'specialised';

export interface CourseModuleItem {
  code: string;
  title: string;
  topics: string[];
}

export interface CourseItem {
  id: string;
  code: string;
  slug: string;
  categorySlug: CategorySlug;
  categoryName: string;
  tierLabel: string;
  tierAccent: TierAccentType;
  chipLabel: string;
  title: string;
  hook: string;
  duration: string;
  fee: string;
  feeNote: 'FREE' | 'indicative';
  isFree: boolean;
  isFeatured: boolean;
  imageUrl: string;
  imageAlt: string;
  overview: string;
  keyAreas: string[];
  isDraftOutline: boolean;
  learningOutcomes: string[];
  modules: CourseModuleItem[];
  prerequisites: string;
  assessment: string;
  certificate: string;
  registrationNote: string;
}

export interface CategoryDefinition {
  slug: CategorySlug;
  levelLabel: string;
  title: string;
  shortDescription: string;
  homeCourseList: string[];
  feeRange: string;
  tierAccent: TierAccentType;
  bannerOverview: string;
  learningObjectives: string[];
  targetAudience: string[];
  learningApproach: string[];
  admissionNote: string;
  faqs: { q: string; a: string }[];
  isUnderDevelopment?: boolean;
}

export const SPECIALISED_DOMAINS: string[] = [
  'Healthcare AI',
  'Legal AI',
  'AI in Education',
  'Climate & Environmental AI',
  'AI for Public Policy & Governance',
  'AI for Development and Social Impact',
];

export const COURSE_CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'ai-literacy',
    levelLabel: 'Entry level',
    title: 'AI Literacy & Foundation',
    shortDescription: 'AI-র প্রাথমিক ধারণা, digital awareness আর দৈনন্দিন কাজে ব্যবহার।',
    homeCourseList: [
      'AI Fundamentals (Free)',
      'Everyday Productivity',
      'AI-Powered Digital Creation',
      'AI Safety & Ethics',
    ],
    feeRange: 'Free + BDT 990–1,990',
    tierAccent: 'literacy',
    bannerOverview:
      'যাঁরা একদম নতুন বা AI-কে সহজভাবে বুঝে দৈনন্দিন পড়াশোনা ও কাজের সাথে যুক্ত করতে চান, তাঁদের জন্য এই স্তর। এখানে প্রতি মাসের Free session থেকে শুরু করে structured foundation course রয়েছে।',
    learningObjectives: [
      'AI কীভাবে কাজ করে এবং এর সীমাবদ্ধতা ও ভুল (hallucination) কোথায়, তা বোঝা',
      'দৈনন্দিন লেখালেখি, পড়াশোনা, নোট তৈরি ও দাপ্তরিক কাজে পরিষ্কার Prompt ব্যবহার করা',
      'Visual ও digital content তৈরিতে copyright ও নৈতিকতার সীমানা মেনে চলা',
      'Privacy, data safety, deepfake ও misinformation যাচাইয়ের বাস্তব অভ্যাস গড়ে তোলা',
    ],
    targetAudience: [
      'শিক্ষার্থী (স্কুল, কলেজ ও বিশ্ববিদ্যালয় পর্যায়)',
      'সাধারণ মানুষ ও নতুন শিক্ষার্থী',
      'AI-তে আগ্রহী পেশাজীবী যাঁরা নিরাপদ সূচনা খুঁজছেন',
    ],
    learningApproach: [
      'সহজ বাংলা-ইংরেজি ব্যাখ্যা ও বাস্তব উদাহরণ ভিত্তিক আলোচনা',
      'প্রতিটি ধারণা হাতে-কলমে যাচাই করার অনুশীলন',
      'মুখস্থ নয়, বুঝে এবং source verify করে AI ব্যবহারের অভ্যাস',
    ],
    admissionNote:
      'Free session (BDT 0)-এ সরাসরি Register করা যাবে। Paid foundation course-গুলোর ফি indicative BDT 990–1,990; চূড়ান্ত ব্যাচ ঘোষণার আগে নিশ্চিত ফি জানানো হবে।',
    faqs: [
      {
        q: 'আগে থেকে programming বা coding জানা কি দরকার?',
        a: 'না, এই category-র কোনো course-এর জন্যই coding বা technical background দরকার নেই। সাধারণ কম্পিউটার বা স্মার্টফোন ব্যবহার জানলেই শুরু করা যাবে।',
      },
      {
        q: 'Free Masterclass করলে কি automatic certificate পাওয়া যায়?',
        a: 'না। Free session একটি open পরিচিতি আয়োজন; এখানে automatic certificate দেওয়া হয় না।',
      },
    ],
  },
  {
    slug: 'applied-ai',
    levelLabel: 'Practical level',
    title: 'Applied AI',
    shortDescription: 'হাতে-কলমে project-এর মাধ্যমে AI-র বাস্তব প্রয়োগ।',
    homeCourseList: [
      'Website Development',
      'Research & Data Analytics',
      'Automation & Workflow',
      'Business & Digital Transformation',
    ],
    feeRange: 'BDT 2,990–4,490',
    tierAccent: 'applied',
    bannerOverview:
      'যাঁরা AI-এর প্রাথমিক ব্যবহার থেকে এগিয়ে বাস্তব project ও কাজের workflow তৈরি করতে চান, তাঁদের জন্য Applied AI। এখানে website, research analytics, automation এবং ব্যবসায়িক রূপান্তরের ওপর হাতে-কলমে কাজ করা হয়।',
    learningObjectives: [
      'HTML, CSS, JavaScript ও AI-assisted coding ব্যবহার করে responsive website তৈরি ও live deploy করা',
      'Data cleaning, analysis ও research synthesis-এ তথ্য যাচাইয়ের নিয়ম প্রয়োগ করা',
      'বারবার করা কাজগুলোকে automation ও workflow tool দিয়ে গুছিয়ে আনা',
      'ছোট ব্যবসা বা টিমের কাজে দায়িত্বশীলভাবে AI গ্রহণ ও process improvement পরিকল্পনা করা',
    ],
    targetAudience: [
      'যাঁরা মৌলিক ধারণা থেকে এগিয়ে project-ভিত্তিক বাস্তব দক্ষতা চান',
      'তরুণ পেশাজীবী, গবেষক, উদ্যোক্তা ও freelancer যাঁরা কাজের গতি ও মান বাড়াতে চান',
    ],
    learningApproach: [
      'Project-Based Learning — প্রতিটি course শেষে একটি সম্পূর্ণ বাস্তব project তৈরি',
      'Instructor review ও নির্দিষ্ট rubric-এর মাধ্যমে ভুল সংশোধন ও দিকনির্দেশনা',
      'Source verification ও privacy সুরক্ষা বজায় রেখে practical কাজ সম্পন্ন করা',
    ],
    admissionNote:
      'Applied AI category-র course-গুলোর indicative ফি BDT 2,990–4,490। AP-201-এর indicative ফি BDT 3,990; বাকি course-গুলোর নির্দিষ্ট ফি ও সময়সূচি চূড়ান্ত ব্যাচে ঘোষণা করা হবে।',
    faqs: [
      {
        q: 'এই স্তরের course-গুলোতে কি বাস্তব project থাকবে?',
        a: 'হ্যাঁ, প্রতিটি paid Applied AI course-এ হাতে-কলমে project থাকবে, যেগুলো instructor মূল্যায়ন করবেন।',
      },
      {
        q: 'কোনো কাজের বা আয়ের guarantee কি দেওয়া হয়?',
        a: 'না। আমরা বাস্তব দক্ষতা শেখাই; চাকরি, ফ্রিল্যান্সিং আয় বা client পাওয়ার কোনো guarantee দিই না।',
      },
    ],
  },
  {
    slug: 'professional-development',
    levelLabel: 'Advanced level',
    title: 'AI Professional Development',
    shortDescription: 'Engineering, research আর leadership-এর গভীর দক্ষতা।',
    homeCourseList: [
      'Full-Stack & AI Application',
      'AI Research & Data Intelligence',
      'AI Agents & Automation',
      'Governance & Leadership',
    ],
    feeRange: 'BDT 9,990–14,990',
    tierAccent: 'professional',
    bannerOverview:
      'অভিজ্ঞ ডেভেলপার, গবেষক, প্রযুক্তি পেশাজীবী ও প্রাতিষ্ঠানিক নেতৃত্বের জন্য উচ্চতর স্তর। এখানে full-stack AI systems, advanced data intelligence, AI agent architecture এবং institutional AI governance নিয়ে নিবিড়ভাবে কাজ করা হয়।',
    learningObjectives: [
      'Full-stack web application-এ secure API ও AI capability যুক্ত করার কাঠামো শেখা',
      'উচ্চতর research design, hallucination auditing ও evidence synthesis পদ্ধতি প্রয়োগ করা',
      'Tool calling, error guardrails এবং human-in-the-loop সহ AI agent system ডিজাইন করা',
      'প্রতিষ্ঠানের জন্য AI policy, algorithmic risk audit ও governance framework তৈরি করা',
    ],
    targetAudience: [
      'অভিজ্ঞ শিক্ষার্থী ও গবেষক',
      'সফটওয়্যার প্রকৌশলী ও প্রযুক্তি পেশাজীবী',
      'নীতিনির্ধারণী পর্যায়ের পেশাজীবী ও প্রাতিষ্ঠানিক নেতৃত্ব',
    ],
    learningApproach: [
      'Case study, system design review ও capstone project-ভিত্তিক নিবিড় অনুশীলন',
      'সকল কারিগরি ও নীতিগত সিদ্ধান্তে security, reliability ও accountability যাচাই',
      'সীমিত আসনে structured review ও লিখিত feedback',
    ],
    admissionNote:
      'এই category-র indicative ফি BDT 9,990–14,990। PD-304-এর indicative ফি BDT 14,990; অন্যান্য track-গুলোর সুনির্দিষ্ট ফি ও সময়সূচি চূড়ান্ত ব্যাচের আগে জানানো হবে।',
    faqs: [
      {
        q: 'এই track-গুলোতে ভর্তির জন্য কি পূর্ব অভিজ্ঞতা দরকার?',
        a: 'হ্যাঁ, প্রতিটি track-এর ধরন অনুযায়ী software development, research বা institutional leadership-এ পূর্ব অভিজ্ঞতা থাকা প্রয়োজন।',
      },
      {
        q: 'Certificate কি আন্তর্জাতিক বা university accredited?',
        a: 'না। সফল অংশগ্রহণ ও capstone মূল্যায়নের ভিত্তিতে Atlas AI Education থেকে non-accredited Certificate প্রদান করা হয়।',
      },
    ],
  },
  {
    slug: 'specialised-programmes',
    levelLabel: 'Domain-specific',
    title: 'Specialised Programmes',
    shortDescription:
      'Women’s Safety in the AI Era এবং বাস্তব জীবনের জরুরি ক্ষেত্রভিত্তিক বিশেষায়িত শিক্ষা কর্মসূচি।',
    homeCourseList: ['Women’s Safety in the AI Era (Free)'],
    feeRange: 'Free + Domain-specific',
    tierAccent: 'specialised',
    bannerOverview:
      'ডিজিটাল নিরাপত্তা, স্বাস্থ্য, আইন, শিক্ষা, জলবায়ু ও পাবলিক পলিসির মতো বাস্তব জীবনের জরুরি খাতের বাস্তব চাহিদা অনুযায়ী বিশেষায়িত শিক্ষা কর্মসূচি।',
    learningObjectives: [
      'ডিজিটাল পরিসরে AI-সৃষ্ট ঝুঁকি, ডিপফেক ও হয়রানি মোকাবেলায় কার্যকর জ্ঞান অর্জন',
      'প্রাইভেসি সুরক্ষা, অ্যাকাউন্ট নিরাপত্তা এবং ডিজিটাল প্রমাণের সংরক্ষণ পদ্ধতি শেখা',
      'নির্দিষ্ট পেশাগত খাতের বাস্তব সমস্যা, কমপ্লায়েন্স ও এথিক্যাল প্রোটোকল নির্ধারণ',
    ],
    targetAudience: [
      'নারী ও কন্যাশিশু, শিক্ষার্থী, শিক্ষক, শিক্ষাবিদ ও সামাজিক সংগঠনের প্রতিনিধি',
      'নির্দিষ্ট খাতের (স্বাস্থ্য, আইন, শিক্ষা, পলিসি) গবেষক ও পেশাজীবী',
    ],
    learningApproach: [
      'বাস্তব কেস অ্যানালাইসিস, ব্যবহারিক প্রটেকশন চেকলিস্ট ও নিরাপদ শিখন পরিবেশ',
      'অপ্রস্তুত বা অনুমাননির্ভর কোনো syllabus বা কাল্পনিক তারিখ ঘোষণা না করা',
    ],
    admissionNote:
      'Women’s Safety in the AI Era কর্মসূচিটি সম্পূর্ণ বিনামূল্যে (BDT 0)। ভবিষ্যৎ পেশাগত খাতের বিশেষায়িত কোর্সসমূহ প্রস্তুত হলে বিস্তারিত ফি ও সময়সূচি আনুষ্ঠানিকভাবে জানানো হবে।',
    faqs: [
      {
        q: 'Women’s Safety in the AI Era কর্মসূচিতে অংশগ্রহণে কোনো ফি দিতে হবে?',
        a: 'না, এটি সম্পূর্ণ বিনামূল্যে (BDT 0) ৪ সপ্তাহের একটি উন্মুক্ত শিক্ষা ও সচেতনতামূলক কর্মসূচি।',
      },
      {
        q: 'অন্যান্য Specialised Programme-গুলো কবে চালু হবে?',
        a: 'Healthcare, Legal AI, Climate AI ইত্যাদি ক্ষেত্রগুলো বর্তমানে রূপরেখা পর্যায়ে আছে। সংশ্লিষ্ট বিশেষজ্ঞদের পরামর্শে প্রস্তুত হলে জানানো হবে।',
      },
    ],
    isUnderDevelopment: false,
  },
];

export const COURSES: CourseItem[] = [
  // 1. FREE Masterclass
  {
    id: 'FREE',
    code: 'FREE',
    slug: 'ai-fundamentals-digital-literacy-masterclass',
    categorySlug: 'ai-literacy',
    categoryName: 'AI Literacy & Foundation',
    tierLabel: 'Free Monthly Session',
    tierAccent: 'free',
    chipLabel: '#AI Literacy',
    title: 'AI Fundamentals & Digital Literacy',
    hook: 'AI কী আর কীভাবে নিরাপদে ব্যবহার করবেন, শুরু হোক এই open session দিয়ে।',
    duration: 'প্রতি মাসে ১টি · ২–২.৫ ঘণ্টা',
    fee: 'BDT 0',
    feeNote: 'FREE',
    isFree: true,
    isFeatured: true,
    imageUrl: '/src/assets/images/course_ai_literacy_session_1794924850721.jpg',
    imageAlt: 'Open AI literacy workshop room with attendees seated before a projection screen',
    overview:
      'নতুন শিক্ষার্থী, শিক্ষক ও সাধারণ নাগরিকদের জন্য প্রতি মাসে আয়োজিত একটি উন্মুক্ত পরিচিতি session। এখানে জটিল কারিগরি পরিভাষা ছাড়াই AI কী, কীভাবে কাজ করে, দৈনন্দিন জীবনে কী কাজে লাগে এবং কোথায় সতর্ক থাকতে হবে তা দেখানো হয়। এটা পূর্ণাঙ্গ course নয়, বরং একটি উন্মুক্ত শেখার আয়োজন।',
    keyAreas: [
      'Basic AI Concepts',
      'Everyday AI Applications',
      'Prompting Fundamentals',
      'Safe & Responsible AI Use',
    ],
    isDraftOutline: false,
    learningOutcomes: [
      'Generative AI ও প্রচলিত সফটওয়্যারের মধ্যে মৌলিক পার্থক্য বুঝতে পারা',
      'সহজ ও পরিষ্কারভাবে Prompt লিখে দৈনন্দিন কাজে AI tool ব্যবহার করা',
      'AI-র ভুল তথ্য (hallucination), deepfake ও privacy ঝুঁকি সম্পর্কে প্রাথমিক সচেতনতা তৈরি করা',
    ],
    modules: [
      {
        code: 'S1',
        title: 'AI Fundamentals in Plain Language',
        topics: ['AI কী এবং কী নয়', 'Language models কীভাবে কাজ করে', 'বাস্তব সক্ষমতা ও সীমাবদ্ধতা'],
      },
      {
        code: 'S2',
        title: 'Everyday Applications & Prompting Basics',
        topics: ['স্পষ্ট নির্দেশনা ও context দেওয়া', 'পড়াশোনা ও কাজের সাধারণ উদাহরণ'],
      },
      {
        code: 'S3',
        title: 'Safe & Responsible Use',
        topics: ['ব্যক্তিগত তথ্য সুরক্ষা', 'তথ্য যাচাইয়ের অভ্যাস ও open Q&A'],
      },
    ],
    prerequisites: 'কোনো পূর্ব অভিজ্ঞতা বা coding জ্ঞানের প্রয়োজন নেই।',
    assessment: 'কোনো পরীক্ষা বা মূল্যায়ন নেই; live demonstration ও open Q&A পর্ব থাকে।',
    certificate:
      'Free Masterclass একটি উন্মুক্ত পরিচিতি session হওয়ায় এখানে automatic certificate দেওয়া হয় না।',
    registrationNote:
      'অংশগ্রহণ ফি BDT 0। আসন অনুযায়ী Registration লাগতে পারে। তারিখ চূড়ান্ত হলে নিবন্ধিত সবাইকে জানানো হবে।',
  },

  // 2. AL-101
  {
    id: 'AL-101',
    code: 'AL-101',
    slug: 'ai-everyday-professional-productivity',
    categorySlug: 'ai-literacy',
    categoryName: 'AI Literacy & Foundation',
    tierLabel: 'AI Literacy',
    tierAccent: 'literacy',
    chipLabel: '#AI Literacy',
    title: 'AI for Everyday & Professional Productivity',
    hook: 'পড়াশোনা আর অফিসের কাজে AI tool গুছিয়ে ব্যবহার করুন।',
    duration: '৪ সপ্তাহ (indicative)',
    fee: 'BDT 990–1,490',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: true,
    imageUrl: '/src/assets/images/course_everyday_productivity_1794924806999.jpg',
    imageAlt: 'Tidy desk with laptop, notebook, and coffee cup during structured document work',
    overview:
      'দৈনন্দিন পড়াশোনা, নোট গোছানো, ইমেইল, প্রতিবেদন তৈরি এবং অফিসের কাজের গতি ও মান বাড়ানোর জন্য কাঠামোবদ্ধ foundation course। শুধু tool-এর ব্যবহার নয়, AI-র আউটপুট যাচাই ও নিজস্ব মান বজায় রাখার অভ্যাসও এখানে শেখানো হয়।',
    keyAreas: [
      'Structured Prompting',
      'Document & Email Workflows',
      'Study & Note Synthesis',
      'Verification & Accuracy Habits',
    ],
    isDraftOutline: false,
    learningOutcomes: [
      'কাজের ধরন অনুযায়ী structured prompt ও reusable template তৈরি করা',
      'বড় ডকুমেন্ট, পড়াশোনার নোট ও মিটিং সারসংক্ষেপ দ্রুত গুছিয়ে নেওয়া',
      'তথ্য যাচাই করে ভুল বা অপ্রাসঙ্গিক অংশ বাদ দিয়ে নির্ভরযোগ্য কাজ তৈরি করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Structured Prompting Principles',
        topics: ['Role, context ও constraints সেট করা', 'Iterative refinement কৌশল'],
      },
      {
        code: 'M2',
        title: 'Document, Email & Study Workflows',
        topics: ['প্রতিবেদন ও ইমেইল খসড়া তৈরি', 'Study note ও summary workflow'],
      },
      {
        code: 'M3',
        title: 'Verification, Ethics & Practical Project',
        topics: ['Source check ও accuracy audit', 'ব্যক্তিগত তথ্য গোপনীয়তা ও final project'],
      },
    ],
    prerequisites: 'কম্পিউটার বা স্মার্টফোন এবং ইন্টারনেট ব্যবহারের সাধারণ অভিজ্ঞতা।',
    assessment: 'নিয়মিত practical assignment এবং course শেষে একটি applied workflow project মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'Indicative ফি BDT 990–1,490। চূড়ান্ত সময়সূচি ও নিশ্চিত ফি cohort শুরুর আগে জানানো হবে।',
  },

  // 3. AL-102
  {
    id: 'AL-102',
    code: 'AL-102',
    slug: 'intro-ai-powered-digital-creation',
    categorySlug: 'ai-literacy',
    categoryName: 'AI Literacy & Foundation',
    tierLabel: 'AI Literacy',
    tierAccent: 'literacy',
    chipLabel: '#AI Literacy',
    title: 'Introduction to AI-Powered Digital Creation',
    hook: 'AI দিয়ে ডিজাইন আর content বানানোর প্রথম ধাপ।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 990–1,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_digital_creation_1794924807458.jpg',
    imageAlt: 'Creative media desk with storyboard sketches, layout swatches, and presentation display',
    overview:
      'শিক্ষা, যোগাযোগ ও সৃজনশীল কাজের জন্য AI-সহায়ক visual layout, presentation এবং digital content তৈরির প্রাথমিক ও দায়িত্বশীল প্রশিক্ষণ। অসত্য বা বিভ্রান্তিকর কন্টেন্ট এড়িয়ে স্বচ্ছ ও মানসম্মত সৃষ্টিশীল কাজের ওপর গুরুত্ব দেওয়া হয়।',
    keyAreas: [
      'Content Planning & Storyboarding',
      'Visual & Slide Design Basics',
      'Editing & Cultural Context',
      'Copyright & Attribution',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'AI-সহায়ক কাজের আগে পরিষ্কার content outline ও storyboard তৈরি করা',
      'Slide, graphic layout ও educational content-এ সামঞ্জস্যপূর্ণ ভিজ্যুয়াল তৈরি করা',
      'Copyright, attribution ও নৈতিক সীমানা মেনে digital media প্রকাশ করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Content Planning & Creative Briefs',
        topics: ['Audience অনুযায়ী বার্তা ঠিক করা', 'Outline ও storyboard তৈরি'],
      },
      {
        code: 'M2',
        title: 'Visual Layout & Slide Workflows',
        topics: ['AI-assisted visual ও presentation draft', 'Typography ও color সামঞ্জস্য'],
      },
      {
        code: 'M3',
        title: 'Attribution, Ethics & Portfolio Project',
        topics: ['Copyright ও disclosure নিয়ম', 'Mini digital creation project'],
      },
    ],
    prerequisites: 'কোনো পূর্ব design বা technical অভিজ্ঞতা বাধ্যতামূলক নয়।',
    assessment: 'Practical assignment এবং একটি সম্পূর্ণ digital media project মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 990–1,990 indicative)।',
  },

  // 4. AL-103
  {
    id: 'AL-103',
    code: 'AL-103',
    slug: 'ai-safety-ethics-responsible-use',
    categorySlug: 'ai-literacy',
    categoryName: 'AI Literacy & Foundation',
    tierLabel: 'AI Literacy',
    tierAccent: 'literacy',
    chipLabel: '#AI Literacy',
    title: 'AI Safety, Ethics & Responsible Use',
    hook: 'Privacy, bias আর misinformation বুঝে দায়িত্বশীলভাবে AI ব্যবহার।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 990–1,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_ai_safety_ethics_1794924808097.jpg',
    imageAlt: 'Small team seated around a wooden table discussing AI privacy and verification practices',
    overview:
      'AI ব্যবহারের সামাজিক, নৈতিক ও ব্যক্তিগত নিরাপত্তাজনিত দিকগুলো সহজভাবে বোঝার course। কীভাবে গোপনীয় তথ্য সুরক্ষিত রাখতে হয়, অ্যালগরিদমিক পক্ষপাত (bias) ও ভুল তথ্য চিনতে হয় এবং কর্মক্ষেত্রে নিরাপদ নিয়ম মেনে চলতে হয়, তা এখানে শেখানো হয়।',
    keyAreas: [
      'Data Privacy & Hygiene',
      'Bias & Fairness Recognition',
      'Misinformation & Deepfakes',
      'Safe Workplace & Study Habits',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'সংবেদনশীল ব্যক্তিগত ও প্রাতিষ্ঠানিক তথ্য AI tool-এ না দেওয়ার নিয়ম অনুসরণ করা',
      'AI-উৎপন্ন টেক্সট ও ছবিতে bias, hallucination ও misinformation শনাক্ত করা',
      'নিজের দল বা শিক্ষা প্রতিষ্ঠানের জন্য নিরাপদ ব্যবহারের প্রাথমিক checklist তৈরি করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Privacy & Data Protection Basics',
        topics: ['Data sharing-এর ঝুঁকি', 'ব্যক্তিগত ও অফিসিয়াল তথ্য আলাদা রাখা'],
      },
      {
        code: 'M2',
        title: 'Bias, Hallucination & Verification',
        topics: ['কেন AI ভুল বা পক্ষপাতদুষ্ট উত্তর দেয়', 'বাস্তব তথ্য যাচাইয়ের ধাপ'],
      },
      {
        code: 'M3',
        title: 'Responsible Guidelines Project',
        topics: ['Deepfake সচেতনতা', 'বাস্তব ব্যবহারের জন্য একটি safety checklist তৈরি'],
      },
    ],
    prerequisites: 'যেকোনো শিক্ষার্থী, শিক্ষক বা পেশাজীবী অংশ নিতে পারবেন।',
    assessment: 'Case study বিশ্লেষণ এবং একটি Responsible Use checklist/guide মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 990–1,990 indicative)।',
  },

  // 5. AP-201
  {
    id: 'AP-201',
    code: 'AP-201',
    slug: 'ai-powered-website-development',
    categorySlug: 'applied-ai',
    categoryName: 'Applied AI',
    tierLabel: 'Applied AI',
    tierAccent: 'applied',
    chipLabel: '#Applied AI',
    title: 'AI-Powered Website Development',
    hook: 'AI দিয়ে নিজের responsive website বানান আর live deploy করুন।',
    duration: '৬ সপ্তাহ (indicative)',
    fee: 'BDT 3,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: true,
    imageUrl: '/src/assets/images/course_website_development_1794924809286.jpg',
    imageAlt: 'Clean developer workstation showing code editor alongside responsive website interface',
    overview:
      'HTML, CSS, JavaScript এবং আধুনিক AI coding assistant ব্যবহার করে একদম শুরু থেকে responsive website তৈরি, debugging এবং live deploy করার ৬ সপ্তাহের project-ভিত্তিক course। শুধু AI থেকে কোড কপি করা নয়, কোড পড়ে বোঝা ও ঠিক করার অভ্যাস তৈরি করাই মূল লক্ষ্য।',
    keyAreas: [
      'Semantic HTML & Responsive CSS',
      'JavaScript Interactivity',
      'AI-Assisted Coding & Debugging',
      'GitHub & Live Deployment',
    ],
    isDraftOutline: false,
    learningOutcomes: [
      'Mobile ও desktop-উপযোগী clean, semantic ও accessible web page গঠন করা',
      'JavaScript দিয়ে interactive UI আচরণ ও ফর্ম validation তৈরি করা',
      'AI tool দিয়ে দ্রুত code draft ও debugging করা এবং কোডের নিরাপত্তা যাচাই করা',
      'GitHub repository ব্যবস্থাপনা করে সম্পূর্ণ website live deploy করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Semantic HTML & Responsive Layout',
        topics: ['Clean HTML structure', 'Flexbox, CSS Grid ও mobile-first layout'],
      },
      {
        code: 'M2',
        title: 'JavaScript Interactivity & AI Debugging',
        topics: ['DOM manipulation ও event handling', 'AI-assisted code review ও bug fixing'],
      },
      {
        code: 'M3',
        title: 'GitHub Workflow & Live Website Project',
        topics: ['Git version control ও hosting', 'সম্পূর্ণ responsive website live deployment'],
      },
    ],
    prerequisites: 'কম্পিউটার চালানোর সাধারণ দক্ষতা; আগে থেকে web development জানা বাধ্যতামূলক নয়।',
    assessment: 'সাপ্তাহিক coding lab এবং একটি live deployed responsive website project মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'Indicative ফি BDT 3,990। চূড়ান্ত সময়সূচি ও নিশ্চিত ফি cohort শুরুর আগে জানানো হবে।',
  },

  // 6. AP-202
  {
    id: 'AP-202',
    code: 'AP-202',
    slug: 'ai-powered-research-data-analytics',
    categorySlug: 'applied-ai',
    categoryName: 'Applied AI',
    tierLabel: 'Applied AI',
    tierAccent: 'applied',
    chipLabel: '#Applied AI',
    title: 'AI-Powered Research & Data Analytics',
    hook: 'AI দিয়ে research আর data বিশ্লেষণ, তথ্য যাচাইসহ।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 2,990–4,490',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_research_analytics_1794924809260.jpg',
    imageAlt: 'Quantitative research desk with statistical charts, spreadsheets, and printed reports',
    overview:
      'শিক্ষার্থী, গবেষক ও বিশ্লেষকদের জন্য AI-সহায়ক তথ্য সংকলন, data cleaning, chart visualization এবং evidence-based প্রতিবেদন তৈরির ব্যবহারিক প্রশিক্ষণ। প্রতিটি বিশ্লেষণে source citation যাচাই ও গবেষণার নৈতিকতা বজায় রাখা বাধ্যতামূলক।',
    keyAreas: [
      'Research Design & Literature Review',
      'Data Cleaning & Structuring',
      'Charting & Data Visualisation',
      'Citation Verification & Ethics',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'গবেষণার প্রশ্ন পরিষ্কারভাবে সাজিয়ে প্রাসঙ্গিক তথ্য ও উৎস যাচাই করা',
      'অগোছালো dataset পরিষ্কার করে বোধগম্য chart ও summary table তৈরি করা',
      'AI-র বানানো ভুয়া reference (citation) ধরে সঠিক প্রমাণভিত্তিক প্রতিবেদন লেখা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Source Evaluation & Research Structure',
        topics: ['গবেষণার কাঠামো তৈরি', 'অসত্য তথ্য ও ভুয়া citation শনাক্ত করা'],
      },
      {
        code: 'M2',
        title: 'Data Cleaning & Visualisation',
        topics: ['Spreadsheet ও dataset পরিষ্কার করা', 'পরিষ্কার chart ও insight তৈরি'],
      },
      {
        code: 'M3',
        title: 'Evidence-Based Analytics Project',
        topics: ['গবেষণায় নৈতিকতা ও সীমাবদ্ধতা উল্লেখ', 'পূর্ণাঙ্গ analytical report project'],
      },
    ],
    prerequisites: 'সাধারণ spreadsheet ব্যবহারের ধারণা এবং লেখালেখি বা গবেষণায় আগ্রহ।',
    assessment: 'Dataset cleaning অনুশীলন এবং একটি evidence-based research report মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 2,990–4,490 indicative)।',
  },

  // 7. AP-203
  {
    id: 'AP-203',
    code: 'AP-203',
    slug: 'ai-automation-workflow-development',
    categorySlug: 'applied-ai',
    categoryName: 'Applied AI',
    tierLabel: 'Applied AI',
    tierAccent: 'applied',
    chipLabel: '#Applied AI',
    title: 'AI Automation & Workflow Development',
    hook: 'বারবার করা কাজ automation-এ নিয়ে আসুন।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 2,990–4,490',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_workflow_automation_1794924807818.jpg',
    imageAlt: 'Workstation displaying structured node-based workflow diagrams and process blueprints',
    overview:
      'নিয়মিত অফিস, ডাটা এন্ট্রি, ফর্ম সংগ্রহ, ইমেইল ট্রিগার ও রিপোর্টিংয়ের মতো পুনরাবৃত্তিমূলক কাজগুলো no-code tool, webhook ও API-এর মাধ্যমে নির্ভরযোগ্য workflow-তে রূপান্তর করার হাতে-কলমে প্রশিক্ষণ।',
    keyAreas: [
      'Workflow Mapping & Triggers',
      'No-Code Automation Platforms',
      'Webhooks & Basic APIs',
      'Error Handling & Human Review',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'কোন কাজগুলো automation-এর উপযোগী আর কোথায় মানুষের নজরদারি দরকার তা নির্ধারণ করা',
      'একাধিক অ্যাপের মধ্যে webhook ও no-code trigger সংযোগ তৈরি করা',
      'Error handling ও fallback নিয়ম যুক্ত করে নির্ভরযোগ্য workflow পরীক্ষা করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Process Mapping & Automation Logic',
        topics: ['কাজের ধাপ ভেঙে দেখা', 'Trigger, action ও condition ডিজাইন'],
      },
      {
        code: 'M2',
        title: 'No-Code Tools, Webhooks & APIs',
        topics: ['Form, sheet ও notification সংযোগ', 'JSON ও REST API-এর প্রাথমিক ব্যবহার'],
      },
      {
        code: 'M3',
        title: 'Reliability Testing & Workflow Project',
        topics: ['Error notification ও human-in-the-loop', 'বাস্তব automation workflow জমা'],
      },
    ],
    prerequisites: 'নিয়মিত কম্পিউটার, spreadsheet ও web app ব্যবহারের অভ্যাস।',
    assessment: 'সাপ্তাহিক workflow তৈরি ও একটি কার্যকর end-to-end automation project মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 2,990–4,490 indicative)।',
  },

  // 8. AP-204
  {
    id: 'AP-204',
    code: 'AP-204',
    slug: 'ai-business-digital-transformation',
    categorySlug: 'applied-ai',
    categoryName: 'Applied AI',
    tierLabel: 'Applied AI',
    tierAccent: 'applied',
    chipLabel: '#Applied AI',
    title: 'AI for Business & Digital Transformation',
    hook: 'ব্যবসার কাজে AI বসানোর বাস্তব কৌশল।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 2,990–4,490',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_business_transformation_1794924809638.jpg',
    imageAlt: 'Small business team collaborating in a bright meeting room with strategy whiteboard',
    overview:
      'ক্ষুদ্র ও মাঝারি ব্যবসা, স্টার্টআপ এবং প্রতিষ্ঠানের দলনেতাদের জন্য বাস্তবসম্মত AI প্রয়োগ কৌশল। বাজার গবেষণা, গ্রাহক যোগাযোগ, টিমের কাজের মানোন্নয়ন এবং সীমিত বাজেটে ঝুঁকিহীন পাইলট প্রকল্প চালানোর পরিকল্পনা শেখানো হয়।',
    keyAreas: [
      'Operational Process Audit',
      'Market & Customer Research',
      'Pilot Project & KPI Measurement',
      'Team Guidelines & Privacy',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'প্রতিষ্ঠানের আসল কর্মপ্রবাহ পরীক্ষা করে কোথায় AI কাজে লাগবে তা চিহ্নিত করা',
      'অপ্রয়োজনীয় খরচ এড়িয়ে ছোট ও পরিমাপযোগ্য AI পাইলট পরিকল্পনা তৈরি করা',
      'গ্রাহক ও কর্মীদের তথ্যের গোপনীয়তা রক্ষা করে টিম নীতিমালা ঠিক করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Business Process Audit & Use-Case Selection',
        topics: ['সময় ও খরচের bottlenecks খুঁজে বের করা', 'অবাস্তব প্রত্যাশা বনাম বাস্তব লক্ষ্য'],
      },
      {
        code: 'M2',
        title: 'Market Insight & Customer Support Workflows',
        topics: ['বাজার ও গ্রাহক মতামত বিশ্লেষণ', 'টিম যোগাযোগ ও ডকুমেন্টেশন'],
      },
      {
        code: 'M3',
        title: 'Pilot Roadmap & Transformation Plan',
        topics: ['KPI মূল্যায়ন ও privacy নিয়ম', 'ব্যবসায়িক AI গ্রহণ পরিকল্পনা project'],
      },
    ],
    prerequisites: 'ব্যবসা পরিচালনা, ম্যানেজমেন্ট বা প্রাতিষ্ঠানিক কাজের সাধারণ অভিজ্ঞতা।',
    assessment: 'Case বিশ্লেষণ ও প্রতিষ্ঠানের জন্য একটি বাস্তবসম্মত AI adoption roadmap মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 2,990–4,490 indicative)।',
  },

  // 9. PD-301
  {
    id: 'PD-301',
    code: 'PD-301',
    slug: 'advanced-full-stack-ai-application-development',
    categorySlug: 'professional-development',
    categoryName: 'AI Professional Development',
    tierLabel: 'Professional',
    tierAccent: 'professional',
    chipLabel: '#Professional Development',
    title: 'Advanced Full-Stack & AI Application Development',
    hook: 'Full-stack app-এ AI feature গড়ার গভীর প্রশিক্ষণ।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 9,990–14,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_fullstack_engineering_1794924810463.jpg',
    imageAlt: 'Dual-monitor engineering desk showing TypeScript code and database schema diagrams',
    overview:
      'অভিজ্ঞ ওয়েব ডেভেলপার ও প্রকৌশলীদের জন্য TypeScript, React/Next.js, backend APIs, relational database এবং নিরাপদ server-side AI integration-এর গভীর প্রশিক্ষণ। বাস্তব সিস্টেমে rate limiting, cost control ও data security কীভাবে নিশ্চিত করতে হয় তা এখানে প্রাধান্য পায়।',
    keyAreas: [
      'TypeScript & Modern React / Next.js',
      'Backend APIs & Database Design',
      'Server-Side AI Integration & Security',
      'Production Capstone Application',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'Type-safe full-stack architecture ডিজাইন ও modular backend API তৈরি করা',
      'Client-এ API key প্রকাশ না করে নিরাপদ server-side AI route বাস্তবায়ন করা',
      'Authentication, validation ও error recovery-সহ একটি production-মানের capstone app নির্মাণ করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'TypeScript & Full-Stack Architecture',
        topics: ['Clean frontend state ও API contracts', 'Scalable folder ও component structure'],
      },
      {
        code: 'M2',
        title: 'Backend Services, Auth & Databases',
        topics: ['Relational schema ও data persistence', 'Server-side AI SDKs ও rate limiting'],
      },
      {
        code: 'M3',
        title: 'Security Hardening & Capstone Project',
        topics: ['Prompt injection প্রতিরক্ষা ও logging', 'সম্পূর্ণ full-stack AI app capstone'],
      },
    ],
    prerequisites: 'HTML, CSS, JavaScript এবং প্রাথমিক web application তৈরির বাস্তব অভিজ্ঞতা (অথবা AP-201 সমমান)।',
    assessment: 'Code architecture review এবং একটি সম্পূর্ণ full-stack AI capstone project মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 9,990–14,990 indicative)।',
  },

  // 10. PD-302
  {
    id: 'PD-302',
    code: 'PD-302',
    slug: 'advanced-ai-research-data-intelligence',
    categorySlug: 'professional-development',
    categoryName: 'AI Professional Development',
    tierLabel: 'Professional',
    tierAccent: 'professional',
    chipLabel: '#Professional Development',
    title: 'Advanced AI Research & Data Intelligence',
    hook: 'গবেষণা আর data intelligence-এর উন্নত পদ্ধতি।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 9,990–14,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_data_intelligence_1794924810524.jpg',
    imageAlt: 'Research and data intelligence studio with quantitative evidence charts and reports',
    overview:
      'গবেষক, নীতি-বিশ্লেষক ও সিনিয়র ডাটা পেশাজীবীদের জন্য উচ্চতর গবেষণা কাঠামো, পরিমাণগত ও গুণগত প্রমাণ সংশ্লেষণ (evidence synthesis), এবং বড় তথ্যভাণ্ডারে AI-সহায়ক বিশ্লেষণের নির্ভরযোগ্যতা নিরীক্ষার (hallucination & bias audit) নিবিড় প্রশিক্ষণ।',
    keyAreas: [
      'Complex Research Architecture',
      'Quantitative & Qualitative Synthesis',
      'Hallucination & Bias Auditing',
      'Decision-Grade Intelligence Capstone',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'একাধিক উৎস থেকে প্রাপ্ত তথ্যের মান যাচাই করে reproducible research pipeline তৈরি করা',
      'AI-সহায়ক বিশ্লেষণে statistical fallacy ও hallucination ঝুঁকি পরিমাপ করা',
      'নীতিনির্ধারণী বা প্রাতিষ্ঠানিক সিদ্ধান্তের উপযোগী প্রমাণনির্ভর intelligence dossier উপস্থাপন করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Advanced Research Protocols',
        topics: ['প্রাতিষ্ঠানিক গবেষণার প্রশ্ন গঠন', 'Reproducibility ও documentation মানদণ্ড'],
      },
      {
        code: 'M2',
        title: 'Synthesis, Hallucination & Bias Audits',
        topics: ['Multi-document evidence verification', 'Sampling ও algorithmic bias নিরীক্ষা'],
      },
      {
        code: 'M3',
        title: 'Data Intelligence Capstone',
        topics: ['Executive evidence brief প্রণয়ন', 'Peer ও instructor methodological review'],
      },
    ],
    prerequisites: 'গবেষণা পদ্ধতি বা data analysis-এ পূর্ব কাজের অভিজ্ঞতা (অথবা AP-202 সমমান)।',
    assessment: 'Methodological audit এবং একটি decision-grade data intelligence capstone মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 9,990–14,990 indicative)।',
  },

  // 11. PD-303
  {
    id: 'PD-303',
    code: 'PD-303',
    slug: 'ai-agents-intelligent-automation-engineering',
    categorySlug: 'professional-development',
    categoryName: 'AI Professional Development',
    tierLabel: 'Professional',
    tierAccent: 'professional',
    chipLabel: '#Professional Development',
    title: 'AI Agents & Intelligent Automation Engineering',
    hook: 'AI agent আর বুদ্ধিমান automation system বানানো।',
    duration: 'চূড়ান্ত ব্যাচে ঘোষণা করা হবে',
    fee: 'BDT 9,990–14,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_ai_agents_engineering_1794924811129.jpg',
    imageAlt: 'Technical engineering workstation showing multi-step system architecture blueprints',
    overview:
      'একাধিক ধাপে কাজ করতে সক্ষম AI agent architecture, tool ও API orchestration, নির্দিষ্ট নিরাপত্তা সীমারেখা (guardrails), latency ও নির্ভরযোগ্যতা পরীক্ষা এবং human-in-the-loop তদারকি ব্যবস্থা নির্মাণের কারিগরি প্রশিক্ষণ।',
    keyAreas: [
      'Agent Architecture & Tool Schemas',
      'Multi-Step API Orchestration',
      'Safety Guardrails & Human Oversight',
      'Automated Evaluation Suites',
    ],
    isDraftOutline: true,
    learningOutcomes: [
      'কখন deterministic workflow আর কখন agentic orchestration দরকার তা সঠিকভাবে সিদ্ধান্ত নেওয়া',
      'সুনির্দিষ্ট schema, permission boundary ও timeout নিয়ন্ত্রণসহ tool-calling তৈরি করা',
      'Evaluation rubric ও test suite দিয়ে agentic সিস্টেমের নির্ভরযোগ্যতা যাচাই করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Agent Architecture & Tool Orchestration',
        topics: ['State, memory ও structured tool calls', 'Error boundary ও fallback নকশা'],
      },
      {
        code: 'M2',
        title: 'Guardrails, Cost & Human Oversight',
        topics: ['Permission scopes ও approval checkpoints', 'Latency ও reliability পর্যবেক্ষণ'],
      },
      {
        code: 'M3',
        title: 'Evaluation & Automation Capstone',
        topics: ['Automated regression testing', 'Resilient automation system capstone'],
      },
    ],
    prerequisites: 'API integration, scripting বা automation workflow নির্মাণের পূর্ব অভিজ্ঞতা।',
    assessment: 'System design review, test suite যাচাই ও একটি agentic automation capstone মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'সময়কাল ও নির্দিষ্ট ফি চূড়ান্ত ব্যাচে ঘোষণা করা হবে (category range: BDT 9,990–14,990 indicative)।',
  },

  // 12. PD-304
  {
    id: 'PD-304',
    code: 'PD-304',
    slug: 'ai-governance-strategy-institutional-leadership',
    categorySlug: 'professional-development',
    categoryName: 'AI Professional Development',
    tierLabel: 'Professional',
    tierAccent: 'professional',
    chipLabel: '#Professional Development',
    title: 'AI Governance, Strategy & Institutional Leadership',
    hook: 'প্রতিষ্ঠানের জন্য AI policy, risk আর leadership কৌশল।',
    duration: '৮ সপ্তাহ (indicative)',
    fee: 'BDT 14,990',
    feeNote: 'indicative',
    isFree: false,
    isFeatured: true,
    imageUrl: '/src/assets/images/course_ai_governance_leadership_1794924812599.jpg',
    imageAlt: 'Executive policy seminar room with institutional leaders reviewing governance documents',
    overview:
      'প্রাতিষ্ঠানিক নেতৃত্ব, পরিচালক ও নীতি-বিশেষজ্ঞদের জন্য বৈশ্বিক AI নিয়ন্ত্রণ কাঠামো, প্রতিষ্ঠানের অভ্যন্তরীণ AI policy প্রণয়ন, vendor ও algorithmic risk নিরীক্ষা এবং দীর্ঘমেয়াদি দায়িত্বশীল AI কৌশল নির্ধারণের ৮ সপ্তাহের নির্বাহী প্রোগ্রাম।',
    keyAreas: [
      'Global AI Regulatory Frameworks',
      'Institutional AI Strategy & Readiness',
      'Algorithmic Risk & Vendor Audits',
      'Governance Charter Capstone',
    ],
    isDraftOutline: false,
    learningOutcomes: [
      'আন্তর্জাতিক ও আঞ্চলিক AI governance কাঠামোর তুলনামূলক বিশ্লেষণ ও প্রয়োগ',
      'প্রতিষ্ঠানের সক্ষমতা যাচাই করে বাস্তবসম্মত AI adoption ও governance charter তৈরি করা',
      'তৃতীয় পক্ষের AI vendor, procurement ঝুঁকি ও accountability কাঠামো নিরীক্ষা করা',
    ],
    modules: [
      {
        code: 'M1',
        title: 'Global Regulatory Frameworks & Policy',
        topics: ['আন্তর্জাতিক AI নীতি-কাঠামো ও মানদণ্ড', 'Accountability, transparency ও compliance'],
      },
      {
        code: 'M2',
        title: 'Institutional Readiness & Risk Auditing',
        topics: ['Vendor due diligence ও procurement checklist', 'Data governance ও bias audit'],
      },
      {
        code: 'M3',
        title: 'Governance Charter Capstone',
        topics: ['প্রতিষ্ঠানের অভ্যন্তরীণ AI নীতিমালা খসড়া', 'Executive Governance Charter presentation'],
      },
    ],
    prerequisites: 'প্রাতিষ্ঠানিক ব্যবস্থাপনা, নীতি-নির্ধারণ, গবেষণা বা নেতৃত্ব পর্যায়ে কাজের অভিজ্ঞতা।',
    assessment: 'Policy case বিশ্লেষণ এবং একটি পূর্ণাঙ্গ Institutional AI Governance Charter Capstone মূল্যায়ন।',
    certificate:
      'বাস্তব অংশগ্রহণ ও মূল্যায়নের ভিত্তিতে non-accredited Certificate প্রদান করা হয়।',
    registrationNote:
      'Indicative ফি BDT 14,990। চূড়ান্ত সময়সূচি ও নিশ্চিত ফি cohort শুরুর আগে জানানো হবে।',
  },
  // 13. Specialised Programme: Women’s Safety in the AI Era (Free)
  {
    id: 'SP-WSAI',
    code: 'SP-WSAI',
    slug: 'womens-safety-in-the-ai-era',
    categorySlug: 'specialised-programmes',
    categoryName: 'Specialised Programmes',
    tierLabel: 'Free 4-Week Programme',
    tierAccent: 'specialised',
    chipLabel: '#Specialised',
    title: 'Women’s Safety in the AI Era',
    hook: 'AI যুগে নারী ও মেয়েদের জন্য deepfake, digital abuse ও privacy সুরক্ষায় ৪ সপ্তাহের সম্পূর্ণ বিনামূল্যের সচেতনতামূলক কর্মসূচি।',
    duration: '৪ সপ্তাহ · Weekly Session',
    fee: 'BDT 0 — Completely Free',
    feeNote: 'FREE',
    isFree: true,
    isFeatured: false,
    imageUrl: '/src/assets/images/course_womens_digital_safety_1794926670102.jpg',
    imageAlt: 'Women’s Safety in the AI Era — Atlas AI Education',
    overview:
      'কৃত্রিম বুদ্ধিমত্তা ও ডিজিটাল প্রযুক্তির দ্রুত প্রসারের সাথে সাথে অনলাইনে নারী ও কন্যাশিশুদের নিরাপত্তা এক নতুন চ্যালেঞ্জের মুখে পড়েছে। ডিপফেক, সিন্থেটিক মিডিয়া, ছবি বিকৃতি, সাইবার বুলিং ও তথ্য চুরির মতো ঝুঁকিগুলো মোকাবেলায় সচেতনতা এবং বাস্তব প্রতিরোধমূলক জ্ঞান অপরিহার্য। এই ৪ সপ্তাহের উন্মুক্ত কর্মসূচিতে অংশগ্রহণকারীরা কোনো অ্যালার্মিস্ট ভীতি ছাড়া বাস্তবসম্মত উপায়ে ঝুঁকি শনাক্তকরণ, ব্যক্তিগত তথ্যের সুরক্ষা এবং আইনি ও প্রাতিষ্ঠানিক সহায়তা গ্রহণ করতে শিখবেন।',
    keyAreas: [
      'AI-Enabled Digital Risks',
      'Deepfakes & Synthetic Media',
      'Online Harassment & Blackmail',
      'Privacy & Personal Data Protection',
      'Fact-Checking & Misinformation',
      'Evidence Preservation & Reporting Pathways',
    ],
    isDraftOutline: false,
    learningOutcomes: [
      'আধুনিক জেনারেটিভ AI এবং ডিপফেক কীভাবে তৈরি হয় ও কাজ করে তা সঠিকভাবে উপলব্ধি করা',
      'সোশ্যাল মিডিয়া, মেসেজিং প্ল্যাটফর্ম ও ব্রাউজিংয়ে ব্যক্তিগত তথ্যের এক্সপোজার ন্যূনতম পর্যায়ে রাখা',
      'সোশ্যাল ইঞ্জিনিয়ারিং, সাইবার বুলিং এবং ব্ল্যাকমেইলিংয়ের প্রাথমিক লক্ষণ শনাক্ত করা',
      'কোনো অপ্রীতিকর ঘটনার ক্ষেত্রে ডিজিটাল প্রমাণ সংরক্ষণ (Evidence Preservation) এবং সঠিক চ্যানেলে রিপোর্ট করার প্রাতিষ্ঠানিক ধাপগুলো জানা',
      'বন্ধু, সহপাঠী ও কমিউনিটির অন্য সদস্যদের মধ্যে ডিজিটাল সচেতনতা ছড়িয়ে দেওয়ার প্রাথমিক সক্ষমতা অর্জন',
    ],
    modules: [
      {
        code: 'Week 1',
        title: 'AI, Digital Awareness and Online Safety',
        topics: [
          'Understanding how modern AI tools work',
          'Common online risks in everyday digital spaces',
          'Social media privacy and digital footprint',
          'Identifying suspicious interactions and digital threats',
        ],
      },
      {
        code: 'Week 2',
        title: 'Deepfakes, Image Manipulation and Synthetic Media',
        topics: [
          'What are deepfakes and generative AI media?',
          'Realistic image synthesis and audio manipulation',
          'Risks of non-consensual imagery and impersonation',
          'How to detect manipulated content and verify visual authenticity',
        ],
      },
      {
        code: 'Week 3',
        title: 'Online Harassment, Privacy and Personal Data Protection',
        topics: [
          'Digital abuse, blackmail, cyber harassment and impersonation tactics',
          'Account security, multi-factor authentication and credential safety',
          'Privacy settings on social platforms and messaging apps',
          'Protecting personal photographs and sensitive data',
        ],
      },
      {
        code: 'Week 4',
        title: 'Fact-Checking, Digital Self-Protection and Reporting Mechanisms',
        topics: [
          'Verifying information and spotting AI-generated misinformation',
          'What to do if targeted: evidence preservation and documentation',
          'Reporting channels on digital platforms',
          'Bangladesh legal frameworks and institutional support mechanisms (e.g. Cyber Security Unit, relevant citizen helplines where officially available)',
          'Building supportive digital communities and peer awareness',
        ],
      },
    ],
    prerequisites:
      'কোনো কোডিং বা পূর্ববর্তী প্রযুক্তিগত জ্ঞান প্রয়োজন নেই। স্মার্টফোন বা ডিজিটাল প্ল্যাটফর্ম ব্যবহারের সাধারণ অভিজ্ঞতাই যথেষ্ট।',
    assessment:
      'সাপ্তাহিক কেস অ্যানালাইসিস, ইন্টারঅ্যাক্টিভ আলোচনা এবং ব্যক্তিগত ডিজিটাল স্ব-সুরক্ষা চেকলিস্ট সম্পন্নকরণ।',
    certificate:
      '৪ সপ্তাহের সকল সেশনে সক্রিয় অংশগ্রহণ ও সমাপনী চেকলিস্ট পূরণের ভিত্তিতে Atlas AI Education থেকে non-accredited Certificate of Participation।',
    registrationNote:
      'সম্পূর্ণ বিনামূল্যে (BDT 0)। পরবর্তী ব্যাচের দিনক্ষণ ও সেশন সময়সূচি নিশ্চিত হওয়ার সাথে সাথে আবেদনকারীদের ইমেইল ও নোটিফিকেশনে জানানো হবে।',
  },
];

export const WOMENS_SAFETY_PROGRAMME: CourseItem = COURSES[COURSES.length - 1];

export const FEATURED_COURSES: CourseItem[] = COURSES.filter((c) => c.isFeatured);

const LEGACY_SLUG_TO_CODE: Record<string, string> = {
  'womens-safety-in-the-ai-era': 'SP-WSAI',
  'sp-wsai': 'SP-WSAI',
  'ai-literacy-professional-productivity': 'AL-101',
  'intro-ai-governance-responsible-ai': 'AL-103',
  'ai-powered-web-development': 'AP-201',
  'ai-powered-web-development-foundation': 'AP-201',
  'ai-research-data-analytics': 'AP-202',
  'ai-powered-web-development-advanced': 'PD-301',
  'ai-automation-intelligent-systems': 'PD-303',
  'ai-governance-responsible-ai': 'PD-304',
  'advanced-ai-governance-responsible-ai': 'PD-304',
};

export function getCourseByCodeOrSlug(param: string): CourseItem | undefined {
  const clean = decodeURIComponent(param).trim();
  const upper = clean.toUpperCase();
  const byCode = COURSES.find((c) => c.code.toUpperCase() === upper);
  if (byCode) return byCode;

  const lower = clean.toLowerCase();
  const bySlug = COURSES.find((c) => c.slug.toLowerCase() === lower);
  if (bySlug) return bySlug;

  const mappedCode = LEGACY_SLUG_TO_CODE[lower];
  if (mappedCode) {
    return COURSES.find((c) => c.code === mappedCode);
  }
  return undefined;
}

export function getCoursesByCategory(categorySlug: CategorySlug): CourseItem[] {
  return COURSES.filter((c) => c.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: CategorySlug): CategoryDefinition | undefined {
  return COURSE_CATEGORIES.find((cat) => cat.slug === slug);
}
