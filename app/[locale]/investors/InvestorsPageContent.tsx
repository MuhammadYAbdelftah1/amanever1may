'use client';

import { motion } from 'framer-motion';
import { Calendar, Download, TrendingUp, Users, DollarSign, Building2, Target, Rocket, Award, FileText, Phone, Mail, MapPin, Linkedin, ExternalLink, AlertTriangle, Star } from 'lucide-react';
import { MetricCard, RoadmapTimeline, InvestorContactForm, DataRoomGate } from '@/components/investors';
import { INVESTOR_METRICS, MARKET_COMPARISON } from '@/data/investor-data';
import { useEffect } from 'react';

interface InvestorsPageContentProps {
  locale: string;
}

export function InvestorsPageContent({ locale }: InvestorsPageContentProps) {
  const isRTL = locale === 'ar';

  // Track page view
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'investor_page_view', {
        page_locale: locale,
        referrer: document.referrer,
      });
    }

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll >= 75 && (window as any).gtag) {
          (window as any).gtag('event', 'scroll_depth_75', {
            page_locale: locale,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [locale]);

  const t = {
    hero: {
      title: isRTL 
        ? 'نُعيد تعريف الوصول للرعاية الصحية'
        : 'Redefining Healthcare Access',
      subtitle: isRTL
        ? 'في السوق السعودي البالغ 67 مليار دولار'
        : 'in Saudi Arabia\'s $67B Market',
      description: isRTL
        ? 'منصة العضوية الصحية الأولى في المملكة — تربط 500K+ مستخدم بنخبة 500+ مقدم خدمة طبية، بنموذج Cashback مبتكر ومتوافق مع رؤية 2030.'
        : 'Saudi Arabia\'s first health membership platform — connecting 500K+ users with 500+ elite medical providers, featuring an innovative Cashback model aligned with Vision 2030.',
      downloadDeck: isRTL ? 'حمّل عرض المستثمرين' : 'Download Investor Deck',
      bookMeeting: isRTL ? 'احجز اجتماع' : 'Book a Meeting',
      stats: {
        growth: isRTL ? 'نمو سنوي' : 'YoY Growth',
        arr: 'ARR',
        partners: isRTL ? 'شريك' : 'Partners'
      }
    },
    opportunity: {
      title: isRTL ? 'الفرصة' : 'The Opportunity',
      subtitle: isRTL ? 'لماذا الآن؟' : 'Why Now?',
      tam: {
        title: 'TAM',
        subtitle: isRTL ? 'السوق الإجمالي' : 'Total Addressable Market',
        market: isRTL ? 'السوق الصحي السعودي' : 'Saudi Healthcare Market',
        digital: isRTL ? 'السوق الرقمي تحديداً' : 'Digital Market Specifically',
        growth: isRTL ? 'نمو' : 'Growth'
      },
      sam: {
        title: 'SAM',
        subtitle: isRTL ? 'السوق القابل للخدمة' : 'Serviceable Addressable Market',
        population: isRTL ? 'السكان المستهدفون (18-65)' : 'Target Population (18-65)',
        spending: isRTL ? 'معدل الإنفاق الصحي السنوي/فرد' : 'Annual Healthcare Spend/Person',
        market: isRTL ? 'حجم سوقنا المباشر' : 'Our Direct Market Size'
      },
      som: {
        title: 'SOM',
        subtitle: isRTL ? 'السوق القابل للتحقيق' : 'Serviceable Obtainable Market',
        target: isRTL ? 'هدف 2028: 5% اختراق' : '2028 Target: 5% Penetration',
        members: isRTL ? 'عضو' : 'Members',
        arr: isRTL ? 'ARR متوقع' : 'Projected ARR'
      },
      vision2030: {
        title: isRTL ? 'رياح رؤية 2030 الداعمة' : 'Vision 2030 Tailwinds'
      },
      marketGap: {
        title: isRTL ? 'فجوة السوق' : 'Market Gap',
        subtitle: isRTL ? 'الفرصة المحددة' : 'The Specific Opportunity',
        model: isRTL ? 'النموذج' : 'Model',
        players: isRTL ? 'اللاعبون' : 'Players',
        problem: isRTL ? 'المشكلة' : 'Problem'
      }
    },
    solution: {
      title: isRTL ? 'الحل' : 'The Solution',
      subtitle: isRTL ? 'ما نبنيه' : 'What We\'re Building',
      app: {
        title: isRTL ? 'التطبيق' : 'The App',
        users: isRTL ? 'مستخدم نشط' : 'Active Users',
        rating: isRTL ? 'تقييم' : 'Rating'
      },
      card: {
        title: isRTL ? 'البطاقة' : 'The Card',
        instant: isRTL ? 'QR فوري بدون موافقات مسبقة' : 'Instant QR without pre-approvals'
      },
      network: {
        title: isRTL ? 'الشبكة' : 'The Network',
        facilities: isRTL ? 'منشأة' : 'Facilities',
        cities: isRTL ? 'جدة، الرياض، الدمام' : 'Jeddah, Riyadh, Dammam'
      },
      cashback: {
        title: 'Cashback',
        model: isRTL ? 'نموذج فريد' : 'Unique Model',
        return: isRTL ? 'حتى 10% استرداد' : 'Up to 10% Return'
      },
      ai: {
        title: isRTL ? 'مساعد صحي ذكي مدعوم بالذكاء الاصطناعي' : 'AI-Powered Health Concierge',
        description: isRTL ? 'استشارة طبية خلال 5 دقائق + توجيه ذكي' : 'Medical consultation within 5 minutes + smart guidance'
      }
    },
    traction: {
      title: isRTL ? 'الإنجازات والمقاييس' : 'Traction & Metrics',
      subtitle: isRTL ? 'نحن نفوز بالفعل' : 'We\'re Already Winning',
      period: isRTL ? '(آخر 12 شهراً)' : '(Last 12 Months)',
      metrics: {
        members: isRTL ? 'أعضاء نشطون' : 'Active Members',
        arr: 'ARR',
        transactions: isRTL ? 'معاملات شهرية' : 'Monthly Transactions',
        retention: isRTL ? 'معدل الاحتفاظ' : 'Retention Rate',
        industry: isRTL ? 'الصناعة' : 'Industry',
        nps: isRTL ? 'درجة NPS' : 'NPS Score',
        bestInClass: isRTL ? 'الأفضل في الفئة' : 'Best-in-class',
        ltvCac: isRTL ? 'نسبة LTV/CAC' : 'LTV/CAC Ratio',
        healthy: isRTL ? 'صحي' : 'Healthy',
        payback: isRTL ? 'فترة الاسترداد' : 'Payback Period'
      }
    },
    businessModel: {
      title: isRTL ? 'نموذج الأعمال والاقتصاديات' : 'Business Model & Unit Economics',
      revenue: {
        title: isRTL ? 'تفصيل مصادر الإيرادات' : 'Revenue Streams Breakdown',
        subscriptions: isRTL ? 'رسوم الاشتراك (B2C)' : 'Subscription Fees (B2C)',
        commissions: isRTL ? 'عمولات من مقدمي الخدمة' : 'Commissions from Providers',
        corporate: isRTL ? 'خطط الشركات (B2B)' : 'Corporate Plans (B2B)',
        premium: isRTL ? 'إضافات مميزة (رعاية منزلية، كونسيرج)' : 'Premium Add-ons (Home Care, Concierge)'
      },
      unitEconomics: {
        title: isRTL ? 'اقتصاديات الوحدة (لكل عضو)' : 'Unit Economics (Per Member)',
        arpu: isRTL ? 'ARPU/سنة' : 'ARPU/Year',
        cac: 'CAC',
        margin: isRTL ? 'هامش الربح الإجمالي' : 'Gross Margin',
        ltv: isRTL ? 'LTV (3 سنوات)' : 'LTV (3 yr)',
        ratio: 'LTV/CAC'
      },
      profitability: {
        title: isRTL ? 'مسار الربحية' : 'Path to Profitability'
      }
    },
    team: {
      title: isRTL ? 'الفريق' : 'The Team',
      subtitle: isRTL ? 'لماذا نحن؟' : 'Why Us?',
      description: isRTL 
        ? 'نستثمر في الناس قبل المنتج. فريقنا يجمع خبرات عميقة في التقنية والرعاية الصحية والأعمال.'
        : 'We invest in people before products. Our team combines deep expertise in technology, healthcare, and business.',
      viewLinkedIn: isRTL ? 'عرض الملف الشخصي' : 'View Profile'
    },
    thesis: {
      title: isRTL ? 'أطروحة الاستثمار' : 'Investment Thesis',
      subtitle: isRTL ? 'لماذا سنفوز' : 'Why We Win'
    },
    roadmap: {
      title: isRTL ? 'خارطة الطريق نحو Unicorn' : 'Roadmap to Unicorn',
      subtitle: isRTL ? 'المسار' : 'The Path'
    },
    funding: {
      title: isRTL ? 'جولة التمويل الحالية' : 'Current Funding Round',
      subtitle: isRTL ? 'الطلب' : 'The Ask',
      raising: isRTL ? 'نجمع حالياً: SERIES A' : 'NOW RAISING: SERIES A',
      amount: isRTL ? 'المبلغ' : 'Amount',
      valuation: isRTL ? 'التقييم' : 'Valuation',
      lead: isRTL ? 'المستثمر الرئيسي' : 'Lead Investor',
      closing: isRTL ? 'الإغلاق' : 'Closing',
      minTicket: isRTL ? 'الحد الأدنى' : 'Min Ticket',
      useOfFunds: isRTL ? 'استخدام الأموال' : 'USE OF FUNDS',
      requestDeck: isRTL ? 'اطلب عرض المستثمرين' : 'Request Investor Deck',
      bookMeeting: isRTL ? 'احجز اجتماع' : 'Book a Meeting'
    },
    press: {
      title: isRTL ? 'الصحافة والتقدير' : 'Press & Recognition',
      subtitle: isRTL ? 'الدليل الاجتماعي' : 'Social Proof',
      mediaInquiries: isRTL ? 'استفسارات الإعلام' : 'Media Inquiries',
      contact: isRTL ? 'للاستفسارات الإعلامية، يرجى التواصل مع' : 'For media inquiries, please contact'
    },
    resources: {
      title: isRTL ? 'موارد المستثمرين' : 'Investor Resources',
      dataRoom: {
        title: isRTL ? 'غرفة البيانات (محمية بكلمة مرور)' : 'Data Room (Password Protected)',
        subtitle: isRTL ? 'الوصول إلى المستندات السرية والنماذج المالية' : 'Access confidential documents and financial models',
        requestAccess: isRTL ? 'طلب الوصول' : 'Request Access',
        formTitle: isRTL ? 'طلب الوصول لغرفة البيانات' : 'Request Data Room Access',
        name: isRTL ? 'الاسم' : 'Name',
        email: isRTL ? 'البريد الإلكتروني' : 'Email',
        company: isRTL ? 'الشركة' : 'Company',
        role: isRTL ? 'المنصب' : 'Role',
        submit: isRTL ? 'إرسال الطلب' : 'Submit Request',
        success: isRTL ? 'تم إرسال طلبك بنجاح!' : 'Request submitted successfully!',
        close: isRTL ? 'إغلاق' : 'Close'
      },
      pressReleases: {
        title: isRTL ? 'البيانات الصحفية' : 'Recent Press Releases',
        viewAll: isRTL ? 'عرض الكل' : 'View All'
      },
      reports: {
        title: isRTL ? 'التقارير الفصلية' : 'Quarterly Investor Updates',
        subscribe: isRTL ? 'اشترك في التحديثات' : 'Subscribe to Updates'
      },
      events: {
        title: isRTL ? 'المحاضرات والفعاليات' : 'Recent Talks & Panels'
      }
    },
    contact: {
      title: isRTL ? 'جاهز لبناء مستقبل' : 'Ready to Build the Future of',
      subtitle: isRTL ? 'الوصول للرعاية الصحية في منطقة الشرق الأوسط وشمال أفريقيا؟' : 'Healthcare Access in MENA?',
      irLead: isRTL ? 'مسؤول علاقات المستثمرين' : 'Investor Relations Lead',
      email: isRTL ? 'البريد الإلكتروني' : 'Email',
      phone: isRTL ? 'الهاتف' : 'Direct',
      scheduleCall: isRTL ? 'جدولة مكالمة' : 'Schedule a Call',
      requestDeck: isRTL ? 'طلب العرض' : 'Request Deck',
      form: {
        title: isRTL ? 'تواصل معنا' : 'Get in Touch',
        subtitle: isRTL ? 'املأ النموذج وسنتواصل معك قريباً' : 'Fill out the form and we\'ll be in touch soon',
        name: isRTL ? 'الاسم' : 'Name',
        email: isRTL ? 'البريد الإلكتروني' : 'Email',
        company: isRTL ? 'الشركة' : 'Company',
        investmentSize: isRTL ? 'حجم الاستثمار المقترح' : 'Proposed Investment Size',
        message: isRTL ? 'رسالة (اختياري)' : 'Message (Optional)',
        submit: isRTL ? 'إرسال' : 'Submit',
        success: isRTL ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Message sent successfully! We\'ll be in touch soon.',
        error: isRTL ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.',
        investmentSizes: [
          { value: '250k-500k', label: isRTL ? '250 ألف - 500 ألف دولار' : '$250K - $500K' },
          { value: '500k-1m', label: isRTL ? '500 ألف - 1 مليون دولار' : '$500K - $1M' },
          { value: '1m-5m', label: isRTL ? '1 - 5 مليون دولار' : '$1M - $5M' },
          { value: '5m+', label: isRTL ? '5 مليون دولار+' : '$5M+' }
        ]
      }
    },
    disclaimer: {
      text: isRTL
        ? 'هذه الصفحة لأغراض إعلامية فقط ولا تشكل عرضاً لبيع أو التماساً لعرض شراء أوراق مالية. أي استثمار يخضع للقوانين واللوائح المعمول بها.'
        : 'This page is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy securities. Any investment is subject to applicable laws and regulations.',
      forward: isRTL
        ? 'تحذير: تحتوي هذه الصفحة على بيانات تطلعية قد تختلف النتائج الفعلية عنها بشكل جوهري.'
        : 'Forward-Looking Statements: This page contains forward-looking statements. Actual results may differ materially.'
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-24 md:pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Development Warning Banner - Remove before production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-yellow-500 text-black px-4 py-2 text-center text-sm font-bold flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          تحذير: جميع البيانات المالية والإحصائيات في هذه الصفحة هي PLACEHOLDERS وتحتاج لمراجعة CFO/Legal قبل النشر
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F1B1C] via-[#1a2f30] to-[#0F1B1C] text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {t.hero.title}
              <br />
              <span className="text-[#C5A572]">{t.hero.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <button className="bg-[#C5A572] hover:bg-[#b39563] text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg">
                <Download className="w-5 h-5" />
                {t.hero.downloadDeck}
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg border border-white/20">
                <Calendar className="w-5 h-5" />
                {t.hero.bookMeeting}
              </button>
            </motion.div>

            {/* Hero Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#10B981] mb-2">
                  {INVESTOR_METRICS.yoyGrowth}
                </div>
                <div className="text-sm text-neutral-400">{t.hero.stats.growth}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C5A572] mb-2">
                  {INVESTOR_METRICS.arr}
                </div>
                <div className="text-sm text-neutral-400">{t.hero.stats.arr}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4A8B8E] mb-2">
                  {INVESTOR_METRICS.partners}
                </div>
                <div className="text-sm text-neutral-400">{t.hero.stats.partners}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Opportunity Section */}
      <OpportunitySection t={t} isRTL={isRTL} />

      {/* Solution Section */}
      <SolutionSection t={t} isRTL={isRTL} />

      {/* Traction Section */}
      <TractionSection t={t} isRTL={isRTL} />

      {/* Business Model Section */}
      <BusinessModelSection t={t} isRTL={isRTL} />

      {/* Team Section */}
      <TeamSection t={t} isRTL={isRTL} />

      {/* Investment Thesis Section */}
      <InvestmentThesisSection t={t} isRTL={isRTL} />

      {/* Roadmap Section */}
      <RoadmapSection t={t} isRTL={isRTL} />

      {/* Funding Round Section */}
      <FundingRoundSection t={t} isRTL={isRTL} />

      {/* Press & Recognition Section */}
      <PressSection t={t} isRTL={isRTL} />

      {/* Investor Resources Section */}
      <ResourcesSection t={t} isRTL={isRTL} />

      {/* Contact Section */}
      <ContactSection t={t} isRTL={isRTL} />

      {/* Disclaimer Footer */}
      <section className="py-8 bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4 text-xs text-neutral-600 dark:text-neutral-400 text-center">
            <p>{t.disclaimer.text}</p>
            <p>{t.disclaimer.forward}</p>
            <p className="text-neutral-500 dark:text-neutral-500">
              © 2026 Aman Ever. CR: {INVESTOR_METRICS.company.crNumber}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Import sections
import { OpportunitySection, SolutionSection, TractionSection } from './InvestorsSections';
import { BusinessModelSection, TeamSection, InvestmentThesisSection } from './InvestorsSections2';
import { RoadmapSection, FundingRoundSection, PressSection, ResourcesSection, ContactSection } from './InvestorsSections3';
