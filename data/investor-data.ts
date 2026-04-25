/**
 * Investor Relations Data
 * CRITICAL: All metrics are PLACEHOLDERS
 * Must be reviewed and approved by CFO before publication
 */

export const INVESTOR_METRICS = {
  // Hero Metrics
  activeMembers: "500K+", // PLACEHOLDER - needs CFO approval
  arr: "SAR 4.2M", // PLACEHOLDER - needs CFO approval
  yoyGrowth: "+120%", // PLACEHOLDER - needs CFO approval
  partners: "500+", // PLACEHOLDER - needs CFO approval
  
  // Key Metrics Dashboard
  arrGrowth: "+180%", // PLACEHOLDER - needs CFO approval
  monthlyTransactions: "85K", // PLACEHOLDER - needs CFO approval
  retentionRate: "78%", // PLACEHOLDER - needs CFO approval
  industryRetention: "45%", // Industry benchmark
  npsScore: "72", // PLACEHOLDER - needs CFO approval
  npsTarget: "70+", // Best-in-class
  ltvCacRatio: "4.8x", // PLACEHOLDER - needs CFO approval
  healthyLtvCac: "3x+",
  paybackPeriod: "8 months", // PLACEHOLDER - needs CFO approval
  healthyPayback: "<12 mo",
  
  // Market Size (TAM/SAM/SOM)
  tam: {
    marketSize: "$67B",
    year: "2026",
    digitalMarketCurrent: "$4.4B",
    digitalMarketCurrentYear: "2026",
    digitalMarketFuture: "$18.3B",
    futureYear: "2032",
    cagr: "22.5%"
  },
  sam: {
    targetPopulation: "24.5M",
    annualSpendPerPerson: "SAR 6,500",
    marketSize: "$42B"
  },
  som: {
    targetYear: "2028",
    penetration: "5%",
    targetMembers: "1.2M",
    projectedArr: "$180M"
  },
  
  // Business Model
  revenueStreams: {
    subscriptions: 60,
    commissions: 25,
    corporate: 10,
    premiumAddons: 5
  },
  unitEconomics: {
    arpu: "SAR 3,490",
    cac: "SAR 180",
    grossMargin: "62%",
    ltv: "SAR 8,200",
    ltvCac: "4.8x"
  },
  profitabilityPath: [
    { quarter: "Q4 2026", milestone: "Break-even" },
    { quarter: "Q2 2027", milestone: "25% EBITDA margin" },
    { quarter: "Q4 2028", milestone: "Series C / Pre-IPO scale" }
  ],
  
  // Current Funding Round
  fundingRound: {
    round: "Series A",
    amount: "$15M USD",
    amountSar: "SAR 56M",
    valuation: "$60M",
    leadInvestor: "Confirmed — undisclosed",
    closing: "Q3 2026",
    minTicket: "$500K",
    useOfFunds: [
      { category: "Geographic Expansion", percentage: 40, description: "الرياض + GCC" },
      { category: "Tech & AI", percentage: 25, description: "Health Concierge, Predictive" },
      { category: "Provider Network Growth", percentage: 20, description: "" },
      { category: "Marketing & Brand", percentage: 10, description: "" },
      { category: "محفظة المالية", percentage: 5, description: "" }
    ]
  },
  
  // Roadmap Milestones
  roadmap: [
    { quarter: "2026 Q3", milestone: "Series A Closing ($15M)" },
    { quarter: "2026 Q4", milestone: "Expansion: الرياض + الدمام كاملة" },
    { quarter: "2027 Q1", milestone: "AI Health Concierge Launch" },
    { quarter: "2027 Q2", milestone: "B2B Corporate Plans Scaling (1M+ employees reach)" },
    { quarter: "2027 Q4", milestone: "Series B ($35M) — توسع GCC (UAE, Kuwait, Bahrain)" },
    { quarter: "2028 Q2", milestone: "2M+ Active Members" },
    { quarter: "2028 Q4", milestone: "Unicorn Status ($1B+ Valuation) — Pre-IPO" },
    { quarter: "2029-2030", milestone: "Tadawul IPO (Saudi Stock Exchange)" }
  ],
  
  // Team (Placeholders)
  team: [
    {
      name: "محمد أحمد", // PLACEHOLDER
      title: "Co-founder & CEO",
      bio: "خبرة 15+ سنة في التقنية والرعاية الصحية", // PLACEHOLDER
      previousCompanies: ["شركة تقنية كبرى", "مستشفى رائد"], // PLACEHOLDER
      quote: "نؤمن بأن الرعاية الصحية الجيدة حق للجميع", // PLACEHOLDER
      linkedin: "#", // PLACEHOLDER
      image: "/team/placeholder-ceo.jpg"
    },
    {
      name: "سارة خالد", // PLACEHOLDER
      title: "Co-founder & CTO",
      bio: "خبرة 12+ سنة في تطوير المنصات الصحية", // PLACEHOLDER
      previousCompanies: ["شركة تقنية عالمية", "منصة صحية"], // PLACEHOLDER
      quote: "التقنية يمكن أن تغير حياة الملايين", // PLACEHOLDER
      linkedin: "#", // PLACEHOLDER
      image: "/team/placeholder-cto.jpg"
    },
    {
      name: "أحمد عبدالله", // PLACEHOLDER
      title: "CFO",
      bio: "خبرة 10+ سنوات في المالية والاستثمار", // PLACEHOLDER
      previousCompanies: ["بنك استثماري", "شركة ناشئة"], // PLACEHOLDER
      quote: "النمو المستدام هو مفتاح النجاح", // PLACEHOLDER
      linkedin: "#", // PLACEHOLDER
      image: "/team/placeholder-cfo.jpg"
    }
    // Add more team members as needed
  ],
  
  // Company Info
  company: {
    crNumber: "7038166471",
    foundingDate: "2023", // PLACEHOLDER
    headquarters: "جدة، البغدادية الشرقية",
    phone: "920018041",
    email: "info@amanever.com",
    investorEmail: "ir@amanever.com",
    investorPhone: "+966 12 614 2206", // PLACEHOLDER
    investorName: "قسم علاقات المستثمرين" // PLACEHOLDER
  },
  
  // Vision 2030 Tailwinds
  vision2030: [
    {
      icon: "flag",
      title: "20% من ميزانية 2026",
      titleEn: "20% of 2026 Budget",
      description: "للصحة (أكبر بند حكومي)",
      descriptionEn: "for Healthcare (Largest government item)"
    },
    {
      icon: "building-2",
      title: "خصخصة 290 مستشفى",
      titleEn: "Privatization of 290 Hospitals",
      description: "بحلول 2030",
      descriptionEn: "by 2030"
    },
    {
      icon: "trending-up",
      title: "هدف 65% قطاع خاص",
      titleEn: "65% Private Sector Target",
      description: "من ~40% حالياً",
      descriptionEn: "from ~40% currently"
    },
    {
      icon: "cpu",
      title: "SDAIA + NPHIES",
      titleEn: "SDAIA + NPHIES",
      description: "البنية التحتية الرقمية جاهزة",
      descriptionEn: "Digital infrastructure ready"
    },
    {
      icon: "heart-pulse",
      title: "SEHA Virtual Hospital",
      titleEn: "SEHA Virtual Hospital",
      description: "أكبر شبكة تطبيب عن بُعد عالمياً",
      descriptionEn: "World's largest telemedicine network"
    }
  ],
  
  // Investment Thesis
  investmentThesis: [
    {
      number: "1",
      titleAr: "First-Mover Advantage في فئة \"بطاقات العضوية الصحية\" بالسعودية",
      titleEn: "First-Mover Advantage in \"Health Membership Cards\" category in Saudi Arabia"
    },
    {
      number: "2",
      titleAr: "Network Effects: كل عضو يجذب أعضاء (referral) + كل منشأة تجذب أعضاء",
      titleEn: "Network Effects: Each member attracts members (referral) + each facility attracts members"
    },
    {
      number: "3",
      titleAr: "Recurring Revenue Model مع Retention 78% (vs industry 45%)",
      titleEn: "Recurring Revenue Model with 78% Retention (vs industry 45%)"
    },
    {
      number: "4",
      titleAr: "Multi-sided Platform: B2C + B2B + B2B2C — 3 خطوط إيراد متكاملة",
      titleEn: "Multi-sided Platform: B2C + B2B + B2B2C — 3 integrated revenue streams"
    },
    {
      number: "5",
      titleAr: "Defensible Moat: شبكة 500+ منشأة + Data + Compliance (PDPL/SFDA)",
      titleEn: "Defensible Moat: 500+ facility network + Data + Compliance (PDPL/SFDA)"
    }
  ],
  
  // Press & Recognition (Placeholders)
  press: {
    logos: [
      { name: "Argaam", logo: "/press/argaam.png" },
      { name: "Wamda", logo: "/press/wamda.png" },
      { name: "Forbes ME", logo: "/press/forbes.png" },
      { name: "Arab News", logo: "/press/arabnews.png" },
      { name: "MAGNiTT", logo: "/press/magnitt.png" }
    ],
    quotes: [
      {
        quote: "أمان إيفر تعيد تعريف الوصول للرعاية الصحية في السعودية", // PLACEHOLDER
        source: "مجلة تقنية", // PLACEHOLDER
        date: "2026" // PLACEHOLDER
      }
    ]
  },
  
  // Investor Resources
  resources: {
    dataRoom: [
      { title: "Pitch Deck (Latest)", titleAr: "عرض المستثمرين (الأحدث)" },
      { title: "Financial Model (5-Year Projection)", titleAr: "النموذج المالي (توقعات 5 سنوات)" },
      { title: "Market Research Reports", titleAr: "تقارير أبحاث السوق" },
      { title: "Legal Documents", titleAr: "المستندات القانونية" },
      { title: "Cap Table", titleAr: "جدول رأس المال" }
    ],
    pressReleases: [
      { title: "2026-Q2: Series A Announcement", titleAr: "2026-Q2: إعلان الجولة A" },
      { title: "2026-Q1: 500K Members Milestone", titleAr: "2026-Q1: إنجاز 500 ألف عضو" },
      { title: "2025-Q4: Expansion to Riyadh", titleAr: "2025-Q4: التوسع في الرياض" }
    ],
    quarterlyReports: [
      { title: "Q1 2026 Report (Members Only)", titleAr: "تقرير Q1 2026 (للأعضاء فقط)" },
      { title: "Q4 2025 Report", titleAr: "تقرير Q4 2025" }
    ],
    events: [
      { title: "LEAP 2026 (Riyadh)", titleAr: "LEAP 2026 (الرياض)" },
      { title: "STEP Conference 2026", titleAr: "مؤتمر STEP 2026" },
      { title: "Saudi Health Forum 2026", titleAr: "منتدى الصحة السعودي 2026" }
    ]
  }
};

// Chart Data (Placeholders)
export const CHART_DATA = {
  revenueGrowth: [
    { month: "Jan", revenue: 100 },
    { month: "Feb", revenue: 120 },
    { month: "Mar", revenue: 150 },
    { month: "Apr", revenue: 180 },
    { month: "May", revenue: 220 },
    { month: "Jun", revenue: 270 },
    { month: "Jul", revenue: 320 },
    { month: "Aug", revenue: 380 },
    { month: "Sep", revenue: 450 },
    { month: "Oct", revenue: 530 },
    { month: "Nov", revenue: 620 },
    { month: "Dec", revenue: 720 }
  ],
  
  acquisitionFunnel: [
    { stage: "Visitors", value: 100000 },
    { stage: "Sign-ups", value: 25000 },
    { stage: "Activated", value: 15000 },
    { stage: "Paying", value: 10000 },
    { stage: "Retained", value: 7800 }
  ],
  
  geographicDistribution: [
    { city: "Jeddah", members: 45 },
    { city: "Riyadh", members: 30 },
    { city: "Dammam", members: 15 },
    { city: "Others", members: 10 }
  ]
};

// Market Comparison Table
export const MARKET_COMPARISON = [
  {
    model: "التأمين التقليدي",
    modelEn: "Traditional Insurance",
    players: "Bupa, Tawuniya, MedGulf",
    problem: "غالي، موافقات بطيئة، استثناءات",
    problemEn: "Expensive, slow approvals, exclusions"
  },
  {
    model: "تطبيقات الاستشارات",
    modelEn: "Consultation Apps",
    players: "Altibbi, Cura, Labayh",
    problem: "استشارات فقط، بدون شبكة منشآت",
    problemEn: "Consultations only, no facility network"
  },
  {
    model: "بطاقات الخصم",
    modelEn: "Discount Cards",
    players: "لا يوجد لاعب رئيسي",
    playersEn: "No major player",
    problem: "السوق فارغ",
    problemEn: "Market empty"
  },
  {
    model: "أمان إيفر",
    modelEn: "Aman Ever",
    players: "—",
    problem: "بطاقة + شبكة + Cashback + تطبيق متكامل",
    problemEn: "Card + Network + Cashback + Integrated app",
    highlight: true
  }
];
