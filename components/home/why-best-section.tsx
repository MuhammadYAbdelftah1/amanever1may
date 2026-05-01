'use client';

import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Image from 'next/image';
import { 
  Users, 
  Globe, 
  Zap, 
  Calendar, 
  Home, 
  MessageCircle, 
  Wallet, 
  CreditCard, 
  Star 
} from 'lucide-react';

interface WhyBestSectionProps {
  locale: string;
}

const features = [
  {
    id: 1,
    icon: Users,
    title: 'شمولية تامة بلا قيود',
    description: 'خدماتنا وبطاقاتنا متاحة لجميع فئات المجتمع (مواطنين، مقيمين، وزوار)، ولكافة الأعمار والحالات الصحية دون أي قيود أو استثناءات.',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    icon: Globe,
    title: 'تغطية واسعة وميسرة',
    description: 'نقدم لك تغطية جغرافية شاملة بلا حدود ائتمانية، والأهم من ذلك: لا تتطلب خدماتنا أي موافقات مسبقة من الشركة.',
    iconColor: 'text-emerald-600',
  },
  {
    id: 3,
    icon: Zap,
    title: 'سهولة وسرعة فائقة',
    description: 'إصدار فوري للبطاقة الإلكترونية في ثوانٍ معدودة عبر التطبيق، مع فريق خدمة عملاء متاح لخدمتك على مدار الساعة.',
    iconColor: 'text-amber-600',
  },
  {
    id: 4,
    icon: Calendar,
    title: 'حجوزات طبية واستشارات فورية',
    description: 'احجز موعدك الطبي واحصل على استشارة فورية مع نخبة من الأطباء في ثوانٍ معدودة عبر التطبيق.',
    iconColor: 'text-purple-600',
  },
  {
    id: 5,
    icon: Home,
    title: 'خدمات الرعاية المنزلية',
    description: 'خدمات تمريضية متخصصة، رعاية كبار السن، فحوصات مخبرية منزلية، علاج طبيعي، وحجامة؛ نأتيك بفريق طبي متكامل إلى منزلك.',
    iconColor: 'text-pink-600',
  },
  {
    id: 6,
    icon: MessageCircle,
    title: 'استجابة طبية سريعة (سؤالك الأول مجاناً)',
    description: 'نضمن لك في خدمة "اسأل طبيب" سرعة استجابة فائقة وردوداً خلال 15 دقيقة كحد أقصى، ولأن صحتك تهمنا، جعلنا سؤالك واستشارتك الأولى مجانية بالكامل.',
    iconColor: 'text-cyan-600',
  },
  {
    id: 7,
    icon: Wallet,
    title: 'مزايا مالية وعالم من التوفير',
    description: 'نمنحك خصومات مباشرة تصل إلى 80%، بالإضافة إلى استرداد نقدي (كاش باك) ومحفظة نقاط متكاملة ضمن برنامج الولاء.',
    iconColor: 'text-green-600',
  },
  {
    id: 8,
    icon: CreditCard,
    title: 'خيارات دفع مرنة وميسرة',
    description: 'نمنحك كافة وسائل الدفع الإلكتروني، بالإضافة إلى توفير خدمات الدفع بالتقسيط المريح عبر (تابي وتمارا) لتسهيل حصولك على الرعاية.',
    iconColor: 'text-indigo-600',
  },
  {
    id: 9,
    icon: Star,
    title: 'الشفافية والموثوقية',
    description: 'نؤمن بالشفافية المطلقة، حيث يتيح لك التطبيق الاطلاع على التقييمات الحقيقية للخدمات والمنشآت الطبية من قبل العملاء لتتخذ قرارك وأنت مطمئن.',
    iconColor: 'text-rose-600',
  },
];

export function WhyBestSection({ locale }: WhyBestSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2B2C] mb-3">
            لماذا نحن الأفضل؟
          </h2>
          <p className="text-lg md:text-xl text-[#5A6B6C]">
            المميزات التنافسية
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Hero Image - Takes full width at top */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* Placeholder with designer notice */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="text-center">
                      <div className="text-5xl mb-3">🎨</div>
                      <p className="text-sm font-bold text-gray-700 mb-1">إشعار للمصممة</p>
                      <p className="text-xs text-gray-600 mb-2">
                        تصميم رقم {feature.id}<br />
                        <span className="font-mono font-bold text-base">800×600px</span>
                      </p>
                      <div className="mt-3 px-4 py-2 bg-white/80 rounded-lg border-2 border-dashed border-gray-400">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          {feature.title}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          صورة توضيحية Hero للميزة
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Icon overlay in corner */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2} />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 md:p-6">
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#1A2B2C] mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#5A6B6C] leading-relaxed mb-4 text-sm">
                    {feature.description}
                  </p>

                  {/* Download Buttons */}
                  <div className="pt-4 border-t border-gray-100">
                    <AppDownloadButtons layout="horizontal" showHuawei={true} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-br from-[#4A8B8E] to-[#356B6E] rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl">
          <h3 className="text-xl md:text-3xl font-bold text-white mb-3">
            استمتع بكل هذه المميزات الآن
          </h3>
          <p className="text-base md:text-lg text-white/90 mb-6">
            حمل تطبيق أمان إيفر
          </p>
          <div className="flex justify-center">
            <AppDownloadButtons layout="horizontal" showHuawei={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
