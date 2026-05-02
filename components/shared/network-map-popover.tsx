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
  preSelectedRegion?: string;
  preSelectedCity?: string;
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

export function NetworkMapPopover({ locale, type, trigger, isMobile = false, isOpen: controlledIsOpen, onOpenChange, preSelectedRegion, preSelectedCity }: NetworkMapPopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Map region IDs to zone IDs
  const getZoneFromRegion = (regionId: string): string => {
    if (!regionId) return 'all';
    const region = saudiRegions.find(r => r.id === regionId);
    return region?.zone || 'all';
  };

  // Initialize with pre-selected values if provided
  const [selectedZone, setSelectedZone] = useState(preSelectedRegion ? getZoneFromRegion(preSelectedRegion) : 'all');
  const [selectedRegion, setSelectedRegion] = useState(preSelectedRegion || 'all');
  const [selectedCity, setSelectedCity] = useState(preSelectedCity || '');
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

  // Determine if we should show selection UI or go directly to map
  const hasPreSelection = preSelectedRegion && preSelectedCity;

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

  // Mock providers data for results list
  const getMockProviders = () => {
    const providers = [];
    const count = Math.min(providerCount, 20); // Show max 20 in list
    
    for (let i = 0; i < count; i++) {
      providers.push({
        id: i + 1,
        name: type === 'medical' 
          ? `${['مستشفى', 'عيادة', 'مركز طبي'][i % 3]} ${['الحبيب', 'الموسى', 'السعودي الألماني', 'كينغز كوليدج', 'المركز الطبي'][i % 5]}`
          : `${['نادي', 'مركز لياقة', 'عيادة تغذية', 'مركز سبا'][i % 4]} ${['فتنس تايم', 'جولدز جيم', 'الصحة', 'اللياقة'][i % 4]}`,
        address: selectedCity || 'الرياض',
        distance: `${(Math.random() * 10 + 0.5).toFixed(1)} كم`,
        rating: (Math.random() * 1 + 4).toFixed(1),
        type: type === 'medical' 
          ? ['مستشفى', 'عيادة', 'مركز طبي'][i % 3]
          : ['نادي رياضي', 'مركز لياقة', 'عيادة تغذية', 'مركز سبا'][i % 4]
      });
    }
    
    return providers;
  };

  const providers = getMockProviders();
  return (
    <>
      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col p-0">
          {/* Header - Minimalist */}
          <DialogHeader className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                {type === 'medical' ? (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#5B9A9E]/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-[#5B9A9E]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-[#5B9A9E]/10 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 md:w-5 md:h-5 text-[#5B9A9E]" />
                  </div>
                )}
                <div>
                  <DialogTitle className="text-sm md:text-lg font-bold text-gray-900">
                    {isArabic ? networkType : networkTypeEn}
                  </DialogTitle>
                  <p className="text-[10px] md:text-xs text-gray-500 truncate max-w-[150px] md:max-w-none">
                    {selectedCity || (selectedRegion !== 'all' ? saudiRegions.find(r => r.id === selectedRegion)?.nameAr : 'المملكة العربية السعودية')}
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-lg md:text-2xl font-bold text-[#5B9A9E]">{providerCount}+</p>
                <p className="text-[10px] md:text-xs text-gray-500">{isArabic ? 'مقدم خدمة' : 'Providers'}</p>
              </div>
            </div>
          </DialogHeader>

          {/* Main Content - Responsive Layout */}
          {/* Desktop: Split 50/50 | Mobile: Vertical Stack */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Side: Map (Desktop: 50% | Mobile: 40% height) */}
            <div className="h-[40vh] md:h-auto md:w-1/2 border-b md:border-b-0 md:border-l border-gray-100 relative shrink-0">
              <div className="absolute inset-0 bg-[#001a1a]">
                <iframe 
                  title="Saudi Arabia Network Map" 
                  width="100%" 
                  height="100%" 
                  src={`https://maps.google.com/maps?q=${selectedCity || (selectedRegion !== 'all' ? saudiRegions.find(r => r.id === selectedRegion)?.nameAr : 'Saudi Arabia')}&t=&z=${selectedCity ? 13 : selectedRegion !== 'all' ? 8 : 6}&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full" 
                  style={{ filter: 'invert(90%) hue-rotate(150deg) brightness(0.9) contrast(1.1)' }}
                />
                
                {/* Map Overlay - Minimalist */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Location Badge */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-white/95 backdrop-blur-sm px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#5B9A9E]" />
                      <div>
                        <p className="text-[10px] md:text-xs font-bold text-gray-900 truncate max-w-[120px] md:max-w-none">
                          {selectedCity || (selectedRegion !== 'all' ? saudiRegions.find(r => r.id === selectedRegion)?.nameAr : 'المملكة')}
                        </p>
                        <p className="text-[8px] md:text-[10px] text-gray-500">{providerCount}+ {isArabic ? 'مقدم خدمة' : 'providers'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Results List (Desktop: 50% | Mobile: 60% height) */}
            <div className="flex-1 md:w-1/2 flex flex-col bg-gray-50 overflow-hidden">
              {/* Filters Bar - Only show if no pre-selection */}
              {!hasPreSelection && (
                <div className="p-2 md:p-4 bg-white border-b border-gray-100">
                  {/* Mobile: Vertical Stack | Desktop: Horizontal */}
                  <div className="flex flex-col md:flex-row gap-2">
                    {/* Zone Filter */}
                    <select
                      value={selectedZone}
                      onChange={(e) => {
                        setSelectedZone(e.target.value);
                        setSelectedRegion('all');
                        setSelectedCity('');
                      }}
                      className="flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B9A9E] focus:border-transparent bg-white"
                    >
                      {geographicZones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {isArabic ? zone.nameAr : zone.nameEn}
                        </option>
                      ))}
                    </select>

                    {/* Region Filter */}
                    <select
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setSelectedCity('');
                      }}
                      className="flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B9A9E] focus:border-transparent bg-white"
                    >
                      {filteredRegions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {isArabic ? region.nameAr : region.nameEn}
                        </option>
                      ))}
                    </select>

                    {/* City Filter */}
                    {selectedRegion !== 'all' && availableCities.length > 0 && (
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B9A9E] focus:border-transparent bg-white"
                      >
                        <option value="">{isArabic ? 'جميع المدن' : 'All Cities'}</option>
                        {availableCities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Reset Button */}
                    <button
                      onClick={handleReset}
                      className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      title={isArabic ? 'إعادة تعيين' : 'Reset'}
                    >
                      <Filter className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Results List - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-2 md:p-4 space-y-2 md:space-y-3">
                  {providers.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-100 hover:border-[#5B9A9E] hover:shadow-md transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1 group-hover:text-[#5B9A9E] transition-colors truncate">
                            {provider.name}
                          </h3>
                          <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0" />
                            <span className="truncate">{provider.address}</span>
                            <span className="shrink-0">• {provider.distance}</span>
                          </p>
                        </div>
                        <div className="text-left mr-2 shrink-0">
                          <div className="flex items-center gap-1 bg-amber-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg">
                            <span className="text-[10px] md:text-xs font-bold text-amber-600">⭐ {provider.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-[#5B9A9E]/10 text-[#5B9A9E] rounded-md md:rounded-lg font-semibold">
                          {provider.type}
                        </span>
                        <button className="text-[10px] md:text-xs text-[#5B9A9E] font-semibold hover:underline">
                          {isArabic ? 'عرض التفاصيل ←' : 'View Details →'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-2 md:p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload('excel')}
                    className="flex-1 bg-[#5B9A9E] hover:bg-[#4A8A8E] text-white text-xs md:text-sm py-1.5 md:py-2 h-auto"
                  >
                    <FileSpreadsheet className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                    {isArabic ? 'Excel' : 'Excel'}
                  </Button>
                  
                  <Button
                    onClick={() => handleDownload('pdf')}
                    className="flex-1 bg-[#5B9A9E] hover:bg-[#4A8A8E] text-white text-xs md:text-sm py-1.5 md:py-2 h-auto"
                  >
                    <FileText className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                    {isArabic ? 'PDF' : 'PDF'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
