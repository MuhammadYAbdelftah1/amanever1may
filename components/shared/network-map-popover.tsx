'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Download, 
  X, 
  Building2, 
  Stethoscope,
  Filter,
  FileSpreadsheet,
  FileText,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface NetworkMapPopoverProps {
  locale: string;
  type: 'medical' | 'health';
  trigger?: React.ReactNode;
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// المناطق الإدارية الـ 13 في المملكة العربية السعودية
const saudiRegions = [
  { 
    id: 'all', 
    nameAr: 'جميع المناطق', 
    nameEn: 'All Regions',
    zone: 'all',
    cities: []
  },
  { 
    id: 'riyadh', 
    nameAr: 'منطقة الرياض', 
    nameEn: 'Riyadh Region',
    zone: 'central',
    cities: ['الرياض', 'الخرج', 'الدوادمي', 'المجمعة', 'القويعية', 'وادي الدواسر', 'الأفلاج', 'الزلفي', 'شقراء', 'حوطة بني تميم', 'عفيف', 'السليل', 'ضرما', 'المزاحمية', 'رماح', 'ثادق', 'حريملاء', 'الدرعية', 'الحريق']
  },
  { 
    id: 'makkah', 
    nameAr: 'منطقة مكة المكرمة', 
    nameEn: 'Makkah Region',
    zone: 'western',
    cities: ['مكة المكرمة', 'جدة', 'الطائف', 'القنفذة', 'الليث', 'رابغ', 'خليص', 'رنية', 'تربة', 'الجموم', 'الكامل', 'المويه', 'ميسان', 'أضم', 'العرضيات', 'بحرة', 'الخرمة']
  },
  { 
    id: 'madinah', 
    nameAr: 'منطقة المدينة المنورة', 
    nameEn: 'Madinah Region',
    zone: 'western',
    cities: ['المدينة المنورة', 'ينبع', 'العلا', 'مهد الذهب', 'بدر', 'خيبر', 'الحناكية', 'العيص', 'وادي الفرع']
  },
  { 
    id: 'qassim', 
    nameAr: 'منطقة القصيم', 
    nameEn: 'Qassim Region',
    zone: 'central',
    cities: ['بريدة', 'عنيزة', 'الرس', 'المذنب', 'البكيرية', 'البدائع', 'الأسياح', 'النبهانية', 'رياض الخبراء', 'الشماسية', 'عيون الجواء', 'عقلة الصقور', 'ضرية']
  },
  { 
    id: 'eastern', 
    nameAr: 'المنطقة الشرقية', 
    nameEn: 'Eastern Region',
    zone: 'eastern',
    cities: ['الدمام', 'الخبر', 'الظهران', 'الأحساء', 'حفر الباطن', 'الجبيل', 'القطيف', 'بقيق', 'النعيرية', 'الخفجي', 'رأس تنورة', 'قرية العليا', 'العديد', 'أبو حدرية']
  },
  { 
    id: 'asir', 
    nameAr: 'منطقة عسير', 
    nameEn: 'Asir Region',
    zone: 'southern',
    cities: ['أبها', 'خميس مشيط', 'بيشة', 'النماص', 'محايل', 'سراة عبيدة', 'أحد رفيدة', 'رجال ألمع', 'المجاردة', 'تثليث', 'ظهران الجنوب', 'البرك', 'بللسمر', 'بلقرن', 'تنومة']
  },
  { 
    id: 'tabuk', 
    nameAr: 'منطقة تبوك', 
    nameEn: 'Tabuk Region',
    zone: 'northern',
    cities: ['تبوك', 'الوجه', 'ضباء', 'تيماء', 'أملج', 'حقل', 'البدع']
  },
  { 
    id: 'hail', 
    nameAr: 'منطقة حائل', 
    nameEn: 'Hail Region',
    zone: 'northern',
    cities: ['حائل', 'بقعاء', 'الغزالة', 'الشنان', 'السليمي', 'الحائط', 'الشملي', 'موقق', 'سميراء']
  },
  { 
    id: 'northern', 
    nameAr: 'منطقة الحدود الشمالية', 
    nameEn: 'Northern Borders Region',
    zone: 'northern',
    cities: ['عرعر', 'رفحاء', 'طريف', 'العويقيلة']
  },
  { 
    id: 'jazan', 
    nameAr: 'منطقة جازان', 
    nameEn: 'Jazan Region',
    zone: 'southern',
    cities: ['جازان', 'صبيا', 'أبو عريش', 'صامطة', 'بيش', 'فرسان', 'الدرب', 'العارضة', 'الحرث', 'ضمد', 'الريث', 'أحد المسارحة', 'الطوال', 'هروب', 'الداير', 'العيدابي', 'فيفا']
  },
  { 
    id: 'najran', 
    nameAr: 'منطقة نجران', 
    nameEn: 'Najran Region',
    zone: 'southern',
    cities: ['نجران', 'شرورة', 'حبونا', 'بدر الجنوب', 'يدمة', 'ثار', 'خباش']
  },
  { 
    id: 'bahah', 
    nameAr: 'منطقة الباحة', 
    nameEn: 'Al Bahah Region',
    zone: 'southern',
    cities: ['الباحة', 'بلجرشي', 'المندق', 'المخواة', 'قلوة', 'العقيق', 'القرى', 'غامد الزناد', 'الحجرة']
  },
  { 
    id: 'jouf', 
    nameAr: 'منطقة الجوف', 
    nameEn: 'Al Jouf Region',
    zone: 'northern',
    cities: ['سكاكا', 'القريات', 'دومة الجندل', 'طبرجل']
  }
];

// المناطق الجغرافية الرئيسية
const geographicZones = [
  { id: 'all', nameAr: 'جميع المناطق', nameEn: 'All Zones', color: '#5B9A9E' },
  { id: 'northern', nameAr: 'المنطقة الشمالية', nameEn: 'Northern Zone', color: '#3B7A7E' },
  { id: 'southern', nameAr: 'المنطقة الجنوبية', nameEn: 'Southern Zone', color: '#4A8B8E' },
  { id: 'eastern', nameAr: 'المنطقة الشرقية', nameEn: 'Eastern Zone', color: '#2A6A6E' },
  { id: 'western', nameAr: 'المنطقة الغربية', nameEn: 'Western Zone', color: '#5AAA9E' },
  { id: 'central', nameAr: 'المنطقة الوسطى', nameEn: 'Central Zone', color: '#6BA5A8' }
];

export function NetworkMapPopover({ locale, type, trigger, isMobile = false, isOpen: controlledIsOpen, onOpenChange }: NetworkMapPopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const isArabic = locale === 'ar';
  const networkType = type === 'medical' ? 'الشبكة الطبية' : 'الشبكة الصحية';
  const networkTypeEn = type === 'medical' ? 'Medical Network' : 'Health Network';

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Close city dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };

    if (showCityDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCityDropdown]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, setIsOpen]);

  // Filter regions based on selected zone
  const filteredRegions = selectedZone === 'all' 
    ? saudiRegions 
    : saudiRegions.filter(r => r.zone === selectedZone || r.id === 'all');

  // Get cities for selected region
  const availableCities = selectedRegion === 'all' 
    ? [] 
    : saudiRegions.find(r => r.id === selectedRegion)?.cities || [];

  // Filter cities based on search
  const filteredCities = availableCities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle download
  const handleDownload = (format: 'excel' | 'pdf') => {
    // TODO: Implement actual download logic
    const fileName = `${type}-network-${selectedZone}-${selectedRegion}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
    console.log(`Downloading ${fileName}...`);
    alert(`سيتم تحميل ملف ${networkType} بصيغة ${format.toUpperCase()}`);
  };

  // Reset filters
  const handleReset = () => {
    setSelectedZone('all');
    setSelectedRegion('all');
    setSelectedCity('');
    setSearchQuery('');
  };

  // Get provider count (mock data - replace with real API)
  const getProviderCount = () => {
    const baseCount = type === 'medical' ? 500 : 200;
    if (selectedCity) return Math.floor(Math.random() * 20) + 5;
    if (selectedRegion !== 'all') return Math.floor(Math.random() * 50) + 20;
    if (selectedZone !== 'all') return Math.floor(Math.random() * 150) + 50;
    return baseCount;
  };

  const providerCount = getProviderCount();

  return (
    <>
      {/* Trigger Button - Only show if not controlled externally */}
      {!onOpenChange && (
        <Button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-[#5B9A9E] hover:bg-[#4A8B8E] text-white"
        >
          <MapPin className="w-5 h-5" />
          <span>{isArabic ? 'استكشف الشبكة' : 'Explore Network'}</span>
        </Button>
      )}

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#5B9A9E]/5 to-[#6BA5A8]/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {type === 'medical' ? (
                  <Building2 className="w-6 h-6 text-[#5B9A9E]" />
                ) : (
                  <Stethoscope className="w-6 h-6 text-[#5B9A9E]" />
                )}
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    {isArabic ? `استكشف ${networkType}` : `Explore ${networkTypeEn}`}
                  </DialogTitle>
                  <p className="text-sm text-gray-600">
                    {isArabic ? `${providerCount}+ مقدم خدمة في المملكة` : `${providerCount}+ providers in Saudi Arabia`}
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Geographic Zones */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {isArabic ? 'اختر المنطقة الجغرافية' : 'Select Geographic Zone'}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {geographicZones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => {
                        setSelectedZone(zone.id);
                        setSelectedRegion('all');
                        setSelectedCity('');
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedZone === zone.id
                          ? 'border-[#5B9A9E] bg-[#5B9A9E]/10 shadow-md'
                          : 'border-gray-200 hover:border-[#5B9A9E]/50 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: zone.color }}
                        />
                        <span className="font-bold text-sm text-gray-900">
                          {isArabic ? zone.nameAr : zone.nameEn}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-[#5B9A9E]/10 to-[#6BA5A8]/10 rounded-2xl border-2 border-dashed border-[#5B9A9E]/30 overflow-hidden">
                {/* Tactical Map */}
                <div className="relative w-full h-full bg-[#001a1a] rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl">
                  <iframe 
                    title="Saudi Arabia Network Map" 
                    width="100%" 
                    height="100%" 
                    src={`https://maps.google.com/maps?q=${selectedCity || (selectedRegion !== 'all' ? saudiRegions.find(r => r.id === selectedRegion)?.nameAr : 'Saudi Arabia')}&t=&z=${selectedCity ? 13 : selectedRegion !== 'all' ? 8 : 6}&ie=UTF8&iwloc=&output=embed`}
                    className="transition-all duration-1000 grayscale-[0.8] contrast-[1.2] brightness-[0.7] opacity-100" 
                    style={{ filter: 'invert(90%) hue-rotate(150deg) brightness(0.8) contrast(1.3)' }}
                  />
                  
                  {/* Overlay Effects */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Rotating Gradient */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] origin-center animate-[spin_10s_linear_infinite] opacity-20">
                      <div className="w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/40 to-transparent rounded-tr-full"></div>
                    </div>
                    
                    {/* Grid Pattern */}
                    <div 
                      className="absolute inset-0 opacity-10" 
                      style={{ 
                        backgroundImage: 'radial-gradient(circle, rgb(45, 212, 191) 1px, transparent 0px)', 
                        backgroundSize: '40px 40px' 
                      }}
                    />
                    
                    {/* Network Markers */}
                    {providerCount > 0 && (
                      <>
                        {/* Central Marker */}
                        <div className="absolute flex flex-col items-center transition-all duration-[2000ms] ease-linear" style={{ top: '50%', left: '50%' }}>
                          <div className="relative group/marker cursor-crosshair animate-in fade-in zoom-in duration-500">
                            <div className="absolute -inset-4 bg-teal-500 rounded-full opacity-20 animate-ping"></div>
                            <div className="w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-white"></div>
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] font-black tracking-widest text-white whitespace-nowrap opacity-60 group-hover/marker:opacity-100 transition-opacity">
                              {providerCount}+ {isArabic ? 'مقدم خدمة' : 'Providers'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Additional Markers */}
                        <div className="absolute flex flex-col items-center transition-all duration-[2000ms] ease-linear" style={{ top: '30%', left: '30%' }}>
                          <div className="relative group/marker cursor-crosshair animate-in fade-in zoom-in duration-500" style={{ animationDelay: '500ms' }}>
                            <div className="absolute -inset-4 bg-amber-500 rounded-full opacity-20 animate-ping"></div>
                            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-white"></div>
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] font-black tracking-widest text-white whitespace-nowrap opacity-60 group-hover/marker:opacity-100 transition-opacity">
                              {isArabic ? 'مستشفيات' : 'Hospitals'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute flex flex-col items-center transition-all duration-[2000ms] ease-linear" style={{ top: '70%', left: '70%' }}>
                          <div className="relative group/marker cursor-crosshair animate-in fade-in zoom-in duration-500" style={{ animationDelay: '1000ms' }}>
                            <div className="absolute -inset-4 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-white"></div>
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] font-black tracking-widest text-white whitespace-nowrap opacity-60 group-hover/marker:opacity-100 transition-opacity">
                              {isArabic ? 'عيادات' : 'Clinics'}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Info Panel */}
                    <div className="absolute top-4 left-4 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3 h-3 text-[#5B9A9E]" />
                        <span className="text-[10px] font-black tracking-tighter text-white">
                          {isArabic ? 'نظام الكشف' : 'Detection System'}
                        </span>
                      </div>
                      <div className="font-mono text-[9px] text-teal-200 opacity-60">
                        {selectedCity && <div>CITY: {selectedCity}</div>}
                        {selectedRegion !== 'all' && <div>REGION: {saudiRegions.find(r => r.id === selectedRegion)?.nameAr}</div>}
                        {selectedZone !== 'all' && <div>ZONE: {geographicZones.find(z => z.id === selectedZone)?.nameAr}</div>}
                        <div>COUNT: {providerCount}+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Administrative Regions */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  {isArabic ? 'اختر المنطقة الإدارية' : 'Select Administrative Region'}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredRegions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => {
                        setSelectedRegion(region.id);
                        setSelectedCity('');
                      }}
                      className={`px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm font-semibold ${
                        selectedRegion === region.id
                          ? 'border-[#5B9A9E] bg-[#5B9A9E] text-white shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-[#5B9A9E] hover:bg-[#5B9A9E]/5'
                      }`}
                    >
                      {isArabic ? region.nameAr : region.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Selection */}
              {selectedRegion !== 'all' && availableCities.length > 0 && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    {isArabic ? 'اختر المدينة' : 'Select City'}
                  </label>
                  
                  {/* Search Input */}
                  <div className="relative mb-3">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isArabic ? 'ابحث عن مدينة...' : 'Search for a city...'}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B9A9E] focus:border-transparent"
                    />
                  </div>

                  {/* Cities Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 text-sm ${
                          selectedCity === city
                            ? 'border-[#5B9A9E] bg-[#5B9A9E] text-white'
                            : 'border-gray-200 text-gray-700 hover:border-[#5B9A9E] hover:bg-[#5B9A9E]/5'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="bg-gradient-to-r from-[#5B9A9E]/10 to-[#6BA5A8]/10 rounded-xl p-4 border border-[#5B9A9E]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {isArabic ? 'النتائج المتاحة' : 'Available Results'}
                    </p>
                    <p className="text-2xl font-bold text-[#5B9A9E]">
                      {providerCount}+ {isArabic ? 'مقدم خدمة' : 'providers'}
                    </p>
                  </div>
                  <div className="text-right">
                    {selectedCity && (
                      <p className="text-sm font-semibold text-gray-900">{selectedCity}</p>
                    )}
                    {selectedRegion !== 'all' && (
                      <p className="text-xs text-gray-600">
                        {saudiRegions.find(r => r.id === selectedRegion)?.nameAr}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 border-gray-300"
              >
                <Filter className="w-4 h-4 ml-2" />
                {isArabic ? 'إعادة تعيين' : 'Reset Filters'}
              </Button>
              
              <Button
                onClick={() => handleDownload('excel')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <FileSpreadsheet className="w-4 h-4 ml-2" />
                {isArabic ? 'تحميل Excel' : 'Download Excel'}
              </Button>
              
              <Button
                onClick={() => handleDownload('pdf')}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <FileText className="w-4 h-4 ml-2" />
                {isArabic ? 'تحميل PDF' : 'Download PDF'}
              </Button>
            </div>
          </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
