/**
 * Aman Network Section
 * Displays the wide network of medical and health services
 * Infinite scrolling carousel with tabs for medical and health networks
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { 
  Hospital, 
  Stethoscope, 
  Sparkles, 
  Eye, 
  Accessibility, 
  Package, 
  Pill, 
  FlaskConical, 
  Baby, 
  Heart,
  Dumbbell,
  Salad,
  Glasses,
  Sparkle,
  X
} from 'lucide-react';
import { NetworkMapPopover } from '@/components/shared/network-map-popover';

interface AmanNetworkSectionProps {
  locale: string;
}

type NetworkService = {
  id: string;
  title: string;
  description: string;
  icon: any;
  badge: string;
  category: 'medical' | 'health';
};

const services: NetworkService[] = [
  // Medical Network
  {
    id: 'hospitals',
    title: 'مستشفيات كبرى',
    description: 'شراكات مع مستشفى سليمان الحبيب، مستشفى الموسى التخصصي، السعودي الألماني، ومستشفى كينغز كوليدج لندن جدة',
    icon: Hospital,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'clinics',
    title: 'مجمعات وعيادات تخصصية',
    description: 'شبكة واسعة من المجمعات الطبية والعيادات التخصصية في الرياض، جدة، الدمام، والأحساء وكافة مدن المملكة',
    icon: Stethoscope,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'dental-derma',
    title: 'الأسنان والجلدية والتجميل',
    description: 'عيادات متخصصة في طب الأسنان، الجلدية، والتجميل بأحدث التقنيات العالمية وخصومات تصل إلى 80%',
    icon: Sparkles,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'eyes-laser',
    title: 'مراكز العيون والليزر',
    description: 'شراكة مع مستشفيات ومراكز مغربي للعيون، ومركز آي سي لجراحة العيون والليزر بأحدث تقنيات تصحيح النظر',
    icon: Eye,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'physical-therapy',
    title: 'مراكز العلاج الطبيعي والتأهيل',
    description: 'مراكز متخصصة في العلاج الطبيعي وإعادة التأهيل بأحدث الأجهزة وتحت إشراف أخصائيين معتمدين',
    icon: Accessibility,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'medical-supplies',
    title: 'المستلزمات الطبية المنزلية',
    description: 'توفير كافة الأجهزة والمستلزمات الطبية المنزلية من أكسجين، أجهزة قياس، وكراسي متحركة بجودة عالية',
    icon: Package,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'pharmacies',
    title: 'صيدليات النهدي والدواء',
    description: 'شراكة مع أكبر سلاسل الصيدليات في المملكة: صيدليات النهدي وصيدليات الدواء لتأمين كافة احتياجاتكم الدوائية',
    icon: Pill,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'labs-xray',
    title: 'مختبرات البرج والمختبر',
    description: 'شراكة مع مختبرات البرج الطبية والمختبر لكافة أنواع التحاليل الطبية والفحوصات المخبرية والأشعة التشخيصية',
    icon: FlaskConical,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'pregnancy',
    title: 'رعاية الأمومة والطفولة',
    description: 'برامج متابعة الحمل والولادة ورعاية الأطفال حديثي الولادة في أفضل المراكز المتخصصة',
    icon: Baby,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  {
    id: 'surgery',
    title: 'العمليات الجراحية',
    description: 'تغطية شاملة للعمليات الجراحية العامة والتخصصية في أفضل المستشفيات بأعلى معايير الجودة والسلامة',
    icon: Heart,
    badge: 'الشبكة الطبية',
    category: 'medical',
  },
  // Health Network
  {
    id: 'gyms',
    title: 'الأندية الرياضية ومراكز اللياقة',
    description: 'خصومات حصرية على اشتراكات فتنس تايم، جولدز جيم، وأرقى الأندية الرياضية ومراكز اللياقة البدنية في المملكة',
    icon: Dumbbell,
    badge: 'الشبكة الصحية',
    category: 'health',
  },
  {
    id: 'nutrition',
    title: 'عيادات التغذية والمكملات',
    description: 'استشارات تغذية علاجية مع أخصائيين معتمدين، ومكملات غذائية أصلية من متاجر معتمدة بخصومات خاصة',
    icon: Salad,
    badge: 'الشبكة الصحية',
    category: 'health',
  },
  {
    id: 'opticals',
    title: 'مراكز البصريات',
    description: 'شراكة مع أفضل مراكز البصريات لتوفير النظارات الطبية والشمسية والعدسات اللاصقة بخصومات تصل إلى 50%',
    icon: Glasses,
    badge: 'الشبكة الصحية',
    category: 'health',
  },
  {
    id: 'spa',
    title: 'مراكز السبا والمساج العلاجي',
    description: 'خدمات السبا والمساج العلاجي والاسترخائي في أفضل المراكز المتخصصة لتعزيز الصحة النفسية والجسدية',
    icon: Sparkle,
    badge: 'الشبكة الصحية',
    category: 'health',
  },
];

function ServiceCard({ service }: { service: NetworkService }) {
  const Icon = service.icon;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-lg border border-teal-50 flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 w-[380px] md:w-[450px] shrink-0 group hover:scale-105">
      {/* Image Section - Large with designer notice */}
      <div className="h-64 md:h-80 relative overflow-hidden bg-gradient-to-br from-[#5B9A9E]/10 via-[#6BA5A8]/5 to-[#5B9A9E]/10">
        {/* Designer Notice - Simplified */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-[#5B9A9E]/30 shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <p className="text-lg font-bold text-gray-800 mb-3">إشعار للمصممة 🎨</p>
              <p className="text-sm font-black text-[#5B9A9E]">
                المقاس: 450×320 بكسل
              </p>
            </div>
          </div>
        </div>
        
        {/* Icon Badge */}
        <div className="absolute bottom-6 right-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-20">
          <Icon className="w-8 h-8 text-[#5B9A9E]" aria-hidden="true" />
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#5B9A9E]/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#6BA5A8]/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col items-center text-center">
        <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-3 whitespace-normal leading-tight group-hover:text-[#5B9A9E] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-600 font-semibold text-sm md:text-base leading-relaxed whitespace-normal line-clamp-2 mb-6">
          {service.description}
        </p>
        
        {/* Badge */}
        <div className="px-6 py-2 rounded-full border-2 border-[#5B9A9E]/30 bg-[#5B9A9E]/5 text-[#5B9A9E] text-xs font-black uppercase tracking-wider group-hover:bg-[#5B9A9E] group-hover:text-white transition-all duration-300">
          {service.badge}
        </div>
      </div>
    </div>
  );
}

export function AmanNetworkSection({ locale }: AmanNetworkSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'medical' | 'health'>('medical');
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [showNetworkMap, setShowNetworkMap] = useState(false);
  const [selectedNetworkType, setSelectedNetworkType] = useState<'medical' | 'health'>('medical');
  const [selectedZoneId, setSelectedZoneId] = useState(''); // For the region selector dialog
  const [selectedCityName, setSelectedCityName] = useState(''); // For the region selector dialog
  const [mapRegionId, setMapRegionId] = useState(''); // For passing to NetworkMapPopover
  const [mapCityName, setMapCityName] = useState(''); // For passing to NetworkMapPopover

  const regions = [
    {
      id: 'central',
      regionId: 'riyadh', // Maps to NetworkMapPopover region ID
      name: 'المنطقة الوسطى',
      cities: ['الرياض', 'الخرج', 'الدوادمي', 'الزلفي', 'المجمعة', 'شقراء', 'الأفلاج', 'وادي الدواسر', 'السليل', 'عفيف']
    },
    {
      id: 'western',
      regionId: 'makkah', // Maps to NetworkMapPopover region ID
      name: 'المنطقة الغربية',
      cities: ['مكة', 'جدة', 'المدينة المنورة', 'الطائف', 'ينبع', 'رابغ', 'القنفذة', 'الليث', 'بدر', 'خليص']
    },
    {
      id: 'eastern',
      regionId: 'eastern', // Maps to NetworkMapPopover region ID
      name: 'المنطقة الشرقية',
      cities: ['الدمام', 'الخبر', 'الظهران', 'الأحساء (الهفوف)', 'الأحساء (المبرز)', 'الجبيل', 'القطيف', 'الخفجي', 'رأس تنورة', 'بقيق', 'النعيرية', 'حفر الباطن']
    },
    {
      id: 'northern',
      regionId: 'tabuk', // Maps to NetworkMapPopover region ID (using tabuk as representative)
      name: 'المنطقة الشمالية',
      cities: ['تبوك', 'عرعر', 'سكاكا', 'دومة الجندل', 'القريات', 'رفحاء', 'طريف']
    },
    {
      id: 'southern',
      regionId: 'asir', // Maps to NetworkMapPopover region ID (using asir as representative)
      name: 'المنطقة الجنوبية',
      cities: ['أبها', 'خميس مشيط', 'نجران', 'جازان', 'الباحة', 'صبيا', 'بيش', 'محايل عسير', 'أحد رفيدة', 'شرورة', 'بلجرشي', 'المخواة']
    },
    {
      id: 'qassim',
      regionId: 'qassim', // Maps to NetworkMapPopover region ID
      name: 'منطقة القصيم',
      cities: ['بريدة', 'عنيزة', 'الرس', 'البكيرية', 'البدائع', 'رياض الخبراء', 'عيون الجواء']
    }
  ];

  const handleNetworkButtonClick = (networkType: 'medical' | 'health') => {
    setSelectedNetworkType(networkType);
    setSelectedZoneId('');
    setSelectedCityName('');
    setMapRegionId('');
    setMapCityName('');
    setShowRegionSelector(true);
  };

  const handleContinue = () => {
    if (selectedZoneId && selectedCityName) {
      const regionData = regions.find(r => r.id === selectedZoneId);
      if (regionData) {
        setMapRegionId(regionData.regionId);
        setMapCityName(selectedCityName);
        setShowRegionSelector(false);
        setShowNetworkMap(true);
      }
    }
  };

  const selectedRegionData = regions.find(r => r.id === selectedZoneId);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let animationId: number;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPos += 1;
        scrollContainer.scrollLeft = scrollPos;

        // When we reach the middle, reset to start (seamless because content is duplicated)
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPos >= maxScroll) {
          scrollPos = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeTab]);

  // Filter services based on active tab
  const filteredServices = services.filter(s => s.category === activeTab);
  
  // Duplicate services ONLY twice for seamless loop
  const duplicatedServices = [...filteredServices, ...filteredServices];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            شبكة أمان الواسعة
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            شبكة متكاملة من أفضل مقدمي الخدمات الطبية والصحية في المملكة
          </p>
          
          {/* Network Map Button */}
          <div className="flex justify-center">
            <NetworkMapPopover 
              locale={locale} 
              type={activeTab === 'medical' ? 'medical' : 'health'} 
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => handleNetworkButtonClick('medical')}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              activeTab === 'medical'
                ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#5B9A9E] hover:text-[#5B9A9E]'
            }`}
          >
            استكشف الشبكة الطبية
          </button>
          <button
            onClick={() => handleNetworkButtonClick('health')}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              activeTab === 'health'
                ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#5B9A9E] hover:text-[#5B9A9E]'
            }`}
          >
            استكشف الشبكة الصحية
          </button>
        </div>
      </div>

      {/* Region Selector Dialog - Simple & Easy */}
      {showRegionSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">اختر منطقتك ومدينتك</h3>
                  <p className="text-white/90 text-sm mt-1">
                    {selectedNetworkType === 'medical' ? 'الشبكة الطبية' : 'الشبكة الصحية'}
                  </p>
                </div>
                <button
                  onClick={() => setShowRegionSelector(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content - Simple Form */}
            <div className="p-8 space-y-6">
              {/* Step 1: Select Region */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  1️⃣ اختر المنطقة
                </label>
                <select
                  value={selectedZoneId}
                  onChange={(e) => {
                    setSelectedZoneId(e.target.value);
                    setSelectedCityName(''); // Reset city when region changes
                  }}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-[#5B9A9E] focus:ring-4 focus:ring-[#5B9A9E]/20 outline-none transition-all bg-white cursor-pointer"
                >
                  <option value="">-- اختر المنطقة --</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select City (only shows when region is selected) */}
              {selectedZoneId && selectedRegionData && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    2️⃣ اختر المدينة
                  </label>
                  <select
                    value={selectedCityName}
                    onChange={(e) => setSelectedCityName(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-[#5B9A9E] focus:ring-4 focus:ring-[#5B9A9E]/20 outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="">-- اختر المدينة --</option>
                    {selectedRegionData.cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedZoneId || !selectedCityName}
                className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 ${
                  selectedZoneId && selectedCityName
                    ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedZoneId && selectedCityName ? '✅ استكشف الشبكة الآن' : '⬆️ اختر المنطقة والمدينة أولاً'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Network Map Dialog */}
      <NetworkMapPopover 
        locale={locale} 
        type={selectedNetworkType}
        isOpen={showNetworkMap}
        onOpenChange={setShowNetworkMap}
        preSelectedRegion={mapRegionId}
        preSelectedCity={mapCityName}
      />

      {/* Infinite Scrolling Carousel */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-scroll scrollbar-hide"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedServices.map((service, index) => (
            <ServiceCard key={`${service.id}-${index}`} service={service} />
          ))}
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
