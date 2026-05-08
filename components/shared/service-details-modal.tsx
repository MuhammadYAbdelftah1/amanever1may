'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { X, Check, Star, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  locale?: string;
}

const serviceDetails: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  howItWorks: string[];
  pricing?: string;
}> = {
  'membership': {
    title: 'بطاقات العضوية (بريمير و VIP)',
    subtitle: 'خصومات تصل إلى 80% في أفضل المستشفيات',
    description: 'احصل على بطاقة عضوية أمان إيفر واستمتع بخصومات حصرية تصل إلى 80% في أكثر من 2000 مركز طبي في المملكة. بطاقتك تفتح لك أبواب أفضل المستشفيات والعيادات بأسعار لا تقبل المنافسة.',
    features: [
      'خصومات تصل إلى 80% في مستشفى سليمان الحبيب',
      'تغطية شاملة في الموسى والسعودي الألماني',
      'إصدار فوري للبطاقة خلال دقائق',
      'لا حاجة لموافقات مسبقة',
      'تغطية لأكثر من 2000 مركز طبي',
      'صلاحية سنوية قابلة للتجديد'
    ],
    benefits: [
      'توفير آلاف الريالات على الفواتير الطبية',
      'وصول فوري لأفضل المستشفيات',
      'خدمات طبية متميزة بأسعار مخفضة',
      'بطاقة رقمية وبلاستيكية',
      'إمكانية إضافة أفراد العائلة'
    ],
    howItWorks: [
      'اختر الباقة المناسبة لك (بريمير أو VIP)',
      'أكمل عملية التسجيل والدفع',
      'احصل على بطاقتك الرقمية فوراً',
      'ابدأ بالاستفادة من الخصومات مباشرة',
      'استمتع بتوفير حقيقي على كل زيارة'
    ],
    pricing: 'باقات تبدأ من 299 ريال سنوياً'
  },
  'instant-booking': {
    title: 'حجوزات واستشارات طبية فورية (صوتية ومرئية)',
    subtitle: 'طبيبك معك أينما كنت',
    description: 'احجز موعدك دون انتظار، أو احصل على استشارتك الطبية (صوت، فيديو، محادثة) على مدار الساعة مع نخبة من الأطباء.',
    features: [
      'حجز مواعيد طبية مع نخبة من الأطباء في مختلف التخصصات بدون انتظار أو تأخير',
      'استشارات طبية اونلاين (صوت، فيديو، أو محادثة نصية آمنة)',
      'تنبيهات وتذكيرات تلقائية بمواعيدك',
      'رعاية مستمرة لا تتوقف، نحن هنا من أجلك على مدار الساعة'
    ],
    benefits: [
      'توفير الوقت والجهد في البحث عن الأطباء',
      'خصومات حصرية تصل إلى 60% لأعضاء أمان',
      'إمكانية اختيار الطبيب حسب التقييمات',
      'استشارات فورية دون الحاجة للتنقل',
      'متابعة صحية مستمرة من منزلك'
    ],
    howItWorks: [
      'اختر التخصص الطبي المطلوب',
      'تصفح قائمة الأطباء المتاحين',
      'احجز موعدك الفوري أو المجدول',
      'احصل على تأكيد فوري عبر التطبيق',
      'استمتع باستشارتك الطبية'
    ],
    pricing: 'اشترك بعضوية أمان إيفر.. واستمتع بخصومات عالية تصل إلى 50% على كشوفاتك وحجوزاتك وإستشاراتك الطبية'
  },
  'home-care': {
    title: 'خدمات الرعاية المنزلية',
    subtitle: 'رعاية طبية متكاملة تصلك إلى باب بيتك',
    description: 'طاقم معتمد للزيارات الطبية، العلاج الطبيعي، وعناية خاصة بالأطفال وكبار السن. نوفر لك الراحة والأمان بتقديم الرعاية الطبية في منزلك دون الحاجة للتنقل.',
    features: [
      'رعاية شاملة لكل العائلة: تمريض وعناية طبية متخصصة تغطي جميع أفراد أسرتك (من الأطفال وحتى كبار السن)',
      'عيادة متكاملة في غرفتك: إجراء الفحوصات المخبرية، جلسات العلاج الطبيعي، التأهيل الحجامة والعديد من خدمات الرعاية المنزلية دون الحاجة لمغادرة منزلك',
      'عناية متخصصة ومستمرة: متابعة دقيقة لأصحاب الأمراض المزمنة، ورعاية فائقة واحترافية لما بعد العمليات الجراحية',
      'راحة بالك هي الأهم: تجربة علاجية آمنة وموثوقة، توفر عليك الجهد وتمنحك الطمأنينة في بيتك'
    ],
    benefits: [
      'راحة المريض في بيئته المألوفة',
      'تقليل خطر العدوى المستشفوية',
      'رعاية شخصية ومخصصة',
      'توفير تكاليف الإقامة بالمستشفى',
      'مرونة في اختيار مواعيد الزيارات'
    ],
    howItWorks: [
      'اطلب الخدمة عبر التطبيق',
      'حدد نوع الرعاية المطلوبة',
      'اختر الموعد المناسب لك',
      'يصلك الفريق الطبي في الموعد المحدد',
      'احصل على الرعاية الطبية المتكاملة'
    ],
    pricing: 'اشترك الان .. واستمتع بخدمات الرعاية المنزلية'
  },
  'medical-network': {
    title: 'استكشف الشبكة الطبية الآن',
    subtitle: 'أكثر من 2000 مركز طبي في خدمتك',
    description: 'شبكة طبية واسعة تضم أفضل المستشفيات والعيادات والمراكز الطبية المعتمدة في جميع مدن المملكة. نوفر لك وصولاً مباشراً لخدمات طبية متميزة بأسعار مخفضة.',
    features: [
      'مستشفيات رائدة (سليمان الحبيب، الموسى، السعودي الألماني)',
      'عيادات متخصصة في جميع التخصصات',
      'مختبرات البرج الطبية',
      'صيدليات النهدي والدواء',
      'مراكز الأشعة والتصوير الطبي',
      'عيادات الأسنان والتجميل'
    ],
    benefits: [
      'خصومات تصل إلى 80% على الخدمات',
      'لا حاجة لموافقات مسبقة',
      'تغطية شاملة في جميع مدن المملكة',
      'جودة عالية ومعايير طبية صارمة',
      'سهولة الوصول والحجز'
    ],
    howItWorks: [
      'استكشف الشبكة الطبية عبر التطبيق',
      'اختر المدينة والتخصص المطلوب',
      'تصفح المراكز الطبية المتاحة',
      'احجز موعدك مباشرة',
      'استمتع بالخصومات الحصرية'
    ]
  },
  'health-network': {
    title: 'استكشف الشبكة الصحية الآن',
    subtitle: 'نمط حياة صحي متكامل',
    description: 'شبكة واسعة من مراكز اللياقة البدنية والصحة والجمال. نوفر لك خصومات حصرية على أفضل الأندية الرياضية ومراكز العناية بالصحة والجمال.',
    features: [
      'أندية رياضية (فتنس تايم، جولدز جيم)',
      'عيادات التغذية العلاجية',
      'مراكز البصريات والعدسات',
      'مراكز السبا والمساج العلاجي',
      'صالونات التجميل المعتمدة',
      'مراكز اليوغا والاسترخاء'
    ],
    benefits: [
      'خصومات تصل إلى 50% على الاشتراكات',
      'برامج صحية متكاملة',
      'استشارات تغذية مجانية',
      'متابعة صحية دورية',
      'عروض حصرية للأعضاء'
    ],
    howItWorks: [
      'تصفح الشبكة الصحية',
      'اختر المركز المناسب لك',
      'احصل على الخصم الفوري',
      'ابدأ رحلتك الصحية',
      'استمتع بنمط حياة صحي'
    ]
  },
  'store': {
    title: 'متجر أمان الإلكتروني',
    subtitle: 'كل احتياجاتك بضغطة زر',
    description: 'كل ما تحتاجه من منتجات وخدمات طبية وصحية وتجميلية في مكان واحد. تسوق بذكاء، واستمتع بأسعار مخفضة وتجربة شراء سلسة ومريحة.',
    features: [
      '✔️ تنوع بلا حدود: خيارات واسعة وشاملة تلبي كافة احتياجاتك اليومية أنت وعائلتك',
      '✔️ عروض لا تتوقف: استمتع بخصومات حصرية وتخفيضات مستمرة صُممت خصيصاً لتسعدك',
      '✔️ توصيل سريع وآمن: طلباتك تصلك حتى باب بيتك بأقصى سرعة، وبتغليف يضمن أعلى معايير الأمان',
      '✔️ دفع مرن وميسر: تجربة تسوق مريحة بالكامل مع خيارات دفع متعددة تناسب ميزانيتك'
    ],
    benefits: [
      'أسعار مخفضة تصل إلى 40%',
      'ضمان الأصالة والجودة',
      'عروض حصرية للأعضاء',
      'نقاط ولاء على كل عملية شراء',
      'إمكانية الدفع بالتقسيط'
    ],
    howItWorks: [
      'تصفح المنتجات في التطبيق',
      'أضف ما تحتاجه للسلة',
      'اختر طريقة الدفع المناسبة',
      'احصل على توصيل سريع',
      'استمتع بمنتجات أصلية'
    ]
  },
  'cashback': {
    title: 'برنامج الكاش باك',
    subtitle: 'استثمارك في صحتك.. يعود إليك كرصيد خدمات!',
    description: 'لأننا نؤمن بأن اهتمامك بصحتك يجب أن يُكافأ، صممنا لك برنامجاً يحوّل نفقاتك الطبية إلى عوائد حقيقية. استمتع بكاش باك فوري يُضاف مباشرة إلى محفظتك الإلكترونية لتستخدمه في تغطية تكاليف خدماتك الطبية القادمة ضمن شبكتنا الواسعة.',
    features: [
      'كاش باك فوري: رصيد خدمات يرجع لك بشكل مباشر وبدون شروط معقدة',
      'مكافأة ترحيبية: من أول تجربة في التطبيق راح تحس بالفرق وتشوف التوفير',
      'استفد منه: رصيد خدمات جاهز يغطي تكاليف خدماتك الجاية'
    ],
    benefits: [
      'توفير حقيقي على مصاريفك الطبية',
      'رصيد نقدي قابل للاستخدام فوراً',
      'مكافآت تراكمية مع كل استخدام',
      'شفافية كاملة في حساب المكافآت',
      'سهولة في تتبع رصيدك'
    ],
    howItWorks: [
      'استخدم بطاقة أمان إيفر',
      'احصل على كاش باك تلقائي',
      'تابع رصيدك في التطبيق',
      'استخدم رصيدك في أي وقت',
      'استمتع بالتوفير المستمر'
    ],
    pricing: 'دع فواتيرك تدفع لك.. كاش باك يصل إلى 15% يُضاف لمحفظتك لتستمتع بخصومات إضافية على الخدمات'
  },
  'ask-doctor': {
    title: 'اسأل طبيب',
    subtitle: 'استشارات طبية فورية على مدار الساعة',
    description: 'احصل على استشارة طبية موثوقة (صوتية ومرئية) مع نخبة من الأطباء المعتمدين في المملكة خلال 15 دقيقة، خدمة متاحة 24 ساعة وأنت في مكانك',
    features: [
      'رد فوري خلال 15 دقيقة كحد أقصى',
      'أطباء معتمدون في جميع التخصصات (أطباء من جميع الجنسيات)',
      'خدمة متاحة 24/7 طوال أيام الأسبوع',
      'استشارة عبر الشات، الصوت، أو الفيديو',
      'خصوصية تامة وسرية المعلومات الطبية'
    ],
    benefits: [
      'وفّر وقتك وجهدك - لا حاجة لزيارة العيادة',
      'استشارات طبية موثوقة ومعتمدة من هيئة التخصصات',
      'أسعار مخفضة حصرية لأعضاء أمان إيفر',
      'راحة الاستشارة من منزلك في أي وقت',
      'متابعة صحية مستمرة مع نفس الطبيب'
    ],
    howItWorks: [
      'افتح التطبيق واختر "اسأل طبيب"',
      'حدد التخصص الطبي المطلوب',
      'اكتب استفسارك أو ابدأ مكالمة مباشرة',
      'احصل على رد من طبيب معتمد خلال 15 دقيقة'
    ],
    pricing: 'استشارتك الأولى علينا'
  },
  'points': {
    title: 'محفظة نقاط أمان إيفر',
    subtitle: 'كلما اعتنيت بصحتك أكثر.. كافأناك أكثر!',
    description: 'نقدر ثقتك بنا ونجعل من رحلة علاجك استثماراً ذكياً. اجمع النقاط التلقائية عند طلب خدماتنا او مع كل عملية شراء، واستخدمها كرصيد إضافي لدفع قيمة خدماتك القادمة بكل سهولة من داخل التطبيق.',
    features: [
      'احصل فوراً على نقاط تُضاف لمحفظتك مقابل عند طلب خدماتنا او مع كل عملية شراء داخل التطبيق',
      'استخدم نقاطك كطريقة دفع ذكية لتغطية أو تخفيض قيمة فواتيرك ومشترياتك المستقبلية داخل التطبيق',
      'فرص مستمرة لكسب نقاط إضافية عند الشراء او طلب خدماتنا من شبكتنا الطبية والصحية في التطبيق',
      'رصيد نقاطك متاح وصالح للاستخدام لمدة عام كامل (12 شهراً)، ليمنحك متسعاً من الوقت للاستفادة منه براحة'
    ],
    benefits: [
      'مكافآت حقيقية على ولائك',
      'خصومات إضافية عند الاستبدال',
      'سهولة في تتبع نقاطك',
      'عروض حصرية لأصحاب النقاط العالية',
      'إمكانية مشاركة النقاط مع العائلة'
    ],
    howItWorks: [
      'استخدم بطاقة أمان إيفر',
      'اجمع نقاط تلقائياً',
      'تابع رصيد نقاطك في التطبيق',
      'استبدل نقاطك بخدمات أو خصومات',
      'استمتع بمكافآت الولاء'
    ],
    pricing: 'اجمع نقاطك اليوم، واستفد منها بكل سهولة'
  }
};

export function ServiceDetailsModal({ isOpen, onClose, serviceId, locale = 'ar' }: ServiceDetailsModalProps) {
  const service = serviceDetails[serviceId];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!service) return null;

  // Minimalist content for both mobile and desktop
  const content = (
    <div className="space-y-0">
      {/* Banner Image - Full Width at Top */}
      <div className="relative w-full h-48 md:h-56 bg-gray-100 overflow-hidden">
        {/* Simple text notice for designer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm md:text-base text-gray-600 mb-1">إشعار للمصممة</p>
            <p className="text-xs md:text-sm text-gray-500">المقاس: 800×{typeof window !== 'undefined' && window.innerWidth >= 768 ? '224' : '192'} بكسل</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Header - Centered */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {service.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            {service.subtitle}
          </p>
        </div>

        {/* Description - Centered */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {service.description}
          </p>
        </div>

        {/* Features - Compact */}
        <div className="max-w-xl mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 text-center">
            المميزات الرئيسية
          </h3>
          <ul className="space-y-3">
            {service.features.slice(0, 6).map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm md:text-base">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        {service.pricing && (
          <div className="bg-emerald-50 rounded-xl p-4 md:p-5 text-center max-w-xl mx-auto">
            <p className="text-sm md:text-base font-semibold text-gray-900">{service.pricing}</p>
          </div>
        )}

        {/* CTA Buttons - Compact */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xl mx-auto">
          <Button 
            className="flex-1 bg-gradient-to-r from-[#4A8B8E] to-[#356B6E] hover:from-[#356B6E] hover:to-[#4A8B8E] text-white font-bold py-4 md:py-5 text-base md:text-lg rounded-xl shadow-lg"
            onClick={() => {
              if (serviceId === 'membership') {
                window.location.href = `/${locale}/services#membership`;
              } else {
                window.location.href = `/${locale}/register`;
              }
            }}
          >
            {serviceId === 'membership' ? 'اختر باقتك الآن' : serviceId === 'instant-booking' ? 'احجز الآن' : serviceId === 'points' ? 'ابدأ بجمع نقاطك الآن' : serviceId === 'home-care' ? 'اطلب الخدمة الآن' : serviceId === 'ask-doctor' ? 'اطلب الخدمة الآن' : serviceId === 'store' ? 'تصفح المتجر الآن' : 'ابدأ الآن'}
          </Button>
          <Button 
            variant="ghost"
            className="sm:w-auto text-gray-600 hover:text-gray-900 font-semibold py-4 md:py-5 px-8"
            onClick={onClose}
          >
            إغلاق
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile: Sheet (Popover from bottom) - Minimalist Design
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="bottom" 
          className="h-auto max-h-[80vh] overflow-y-auto p-0 rounded-t-3xl border-t-4 border-[#4A8B8E] shadow-2xl"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{service.title}</SheetTitle>
          </SheetHeader>
          
          {/* Drag Handle */}
          <div className="sticky top-0 z-10 bg-white pt-3 pb-2 flex justify-center">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>
          
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Dialog (Center popup) - Same Minimalist Design
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 rounded-3xl shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{service.title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
