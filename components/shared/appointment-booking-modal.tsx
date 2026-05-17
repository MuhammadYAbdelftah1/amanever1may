'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Search,
  Heart,
  Bone,
  Baby,
  Users,
  Droplet,
  Eye,
  Smile,
  Ear,
  Brain,
  Scissors,
  Stethoscope,
  Activity,
  Camera,
  Syringe,
  Ambulance
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';
import Image from 'next/image';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    name: string;
    type: string;
    address: string;
    phone?: string;
  };
}

type BookingStep = 
  | 'specialty'      // اختيار التخصص
  | 'doctor'         // اختيار الطبيب
  | 'datetime'       // اختيار التاريخ والوقت
  | 'booking-type'   // اختيار نوع الحجز (ميداني/أونلاين)
  | 'summary'        // ملخص الحجز
  | 'phone'          // إدخال رقم الموبايل
  | 'otp'            // إدخال OTP
  | 'name'           // إدخال الاسم
  | 'success'        // نجاح الحجز
  | 'download-app';  // تحميل التطبيق للحجز الأونلاين

// التخصصات الطبية
const medicalSpecialties = [
  { id: 1, name: 'أمراض القلب والأوعية الدموية', icon: Heart, doctorsCount: 12, color: '#EF4444' },
  { id: 2, name: 'جراحة العظام', icon: Bone, doctorsCount: 8, color: '#F59E0B' },
  { id: 3, name: 'طب الأطفال', icon: Baby, doctorsCount: 15, color: '#10B981' },
  { id: 4, name: 'النساء والولادة', icon: Users, doctorsCount: 10, color: '#EC4899' },
  { id: 5, name: 'الأمراض الجلدية', icon: Droplet, doctorsCount: 7, color: '#8B5CF6' },
  { id: 6, name: 'طب العيون', icon: Eye, doctorsCount: 9, color: '#3B82F6' },
  { id: 7, name: 'طب الأسنان', icon: Smile, doctorsCount: 12, color: '#06B6D4' },
  { id: 8, name: 'الأنف والأذن والحنجرة', icon: Ear, doctorsCount: 6, color: '#14B8A6' },
  { id: 9, name: 'الطب النفسي', icon: Brain, doctorsCount: 8, color: '#6366F1' },
  { id: 10, name: 'الجراحة العامة', icon: Scissors, doctorsCount: 11, color: '#EF4444' },
  { id: 11, name: 'الباطنية', icon: Stethoscope, doctorsCount: 14, color: '#059669' },
  { id: 12, name: 'المسالك البولية', icon: Droplet, doctorsCount: 5, color: '#0EA5E9' },
  { id: 13, name: 'الأشعة والتصوير', icon: Camera, doctorsCount: 7, color: '#7C3AED' },
  { id: 14, name: 'التخدير', icon: Syringe, doctorsCount: 9, color: '#DC2626' },
  { id: 15, name: 'الطوارئ', icon: Ambulance, doctorsCount: 20, color: '#DC2626' },
];

// بيانات الأطباء (Mock Data) مع صور حقيقية
const mockDoctors = [
  {
    id: 1,
    name: 'د. محمد أحمد العلي',
    title: 'استشاري أمراض القلب',
    specialtyId: 1,
    rating: 4.8,
    reviewsCount: 120,
    price: 300,
    experience: '15 سنة خبرة',
    education: 'بورد أمريكي',
    languages: ['العربية', 'الإنجليزية'],
    availableDays: ['اليوم', 'غداً', 'بعد غد'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces',
    gender: 'male'
  },
  {
    id: 2,
    name: 'د. خالد سعيد المطيري',
    title: 'أخصائي أمراض القلب',
    specialtyId: 1,
    rating: 4.6,
    reviewsCount: 85,
    price: 250,
    experience: '10 سنوات خبرة',
    education: 'بورد سعودي',
    languages: ['العربية'],
    availableDays: ['بعد غد', 'الأحد'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces',
    gender: 'male'
  },
  {
    id: 3,
    name: 'د. فاطمة حسن الزهراني',
    title: 'استشارية أمراض القلب',
    specialtyId: 1,
    rating: 4.9,
    reviewsCount: 150,
    price: 350,
    experience: '20 سنة خبرة',
    education: 'بورد كندي',
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    availableDays: ['اليوم', 'غداً'],
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces',
    gender: 'female'
  },
  {
    id: 4,
    name: 'د. عبدالله محمد القحطاني',
    title: 'استشاري جراحة العظام',
    specialtyId: 2,
    rating: 4.7,
    reviewsCount: 95,
    price: 400,
    experience: '18 سنة خبرة',
    education: 'بورد بريطاني',
    languages: ['العربية', 'الإنجليزية'],
    availableDays: ['غداً', 'بعد غد'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=faces',
    gender: 'male'
  },
  {
    id: 5,
    name: 'د. نورة عبدالرحمن السديري',
    title: 'استشارية طب الأطفال',
    specialtyId: 3,
    rating: 4.9,
    reviewsCount: 200,
    price: 280,
    experience: '12 سنة خبرة',
    education: 'بورد أمريكي',
    languages: ['العربية', 'الإنجليزية'],
    availableDays: ['اليوم', 'غداً', 'بعد غد'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces',
    gender: 'female'
  },
];

// الأوقات المتاحة
const timeSlots = [
  { time: '09:00', period: 'ص', available: true },
  { time: '10:30', period: 'ص', available: true },
  { time: '12:00', period: 'ظ', available: false },
  { time: '02:00', period: 'م', available: true },
  { time: '04:00', period: 'م', available: true },
  { time: '06:00', period: 'م', available: true },
  { time: '08:00', period: 'م', available: false },
];

export function AppointmentBookingModal({ isOpen, onClose, provider }: AppointmentBookingModalProps) {
  const [step, setStep] = useState<BookingStep>('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingType, setBookingType] = useState<'field' | 'online' | null>(null);
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [fullName, setFullName] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('specialty');
        setSelectedSpecialty(null);
        setSelectedDoctor(null);
        setSelectedDate('');
        setSelectedTime('');
        setBookingType(null);
        setSpecialtySearch('');
        setPhoneNumber('');
        setOtp(['', '', '', '', '', '']);
        setFullName('');
        setPhoneError('');
        setOtpTimer(60);
        setCanResendOtp(false);
        setBookingNumber('');
        setCopied(false);
      }, 300);
    }
  }, [isOpen]);

  // OTP Timer
  useEffect(() => {
    if (step === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
    }
  }, [step, otpTimer]);

  // Validate Saudi phone number
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove spaces and special characters
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Check if it starts with 05 (10 digits) or +966 (13 digits)
    const saudiPattern = /^(05\d{8}|(\+966|00966)5\d{8})$/;
    return saudiPattern.test(cleanPhone);
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string): string => {
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (cleanPhone.startsWith('05')) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1****$3');
    }
    return phone;
  };

  // Handle phone submission
  const handlePhoneSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('الرجاء إدخال رقم موبايل سعودي صحيح (مثال: 0512345678)');
      return;
    }
    setPhoneError('');
    setStep('otp');
    setOtpTimer(60);
    setCanResendOtp(false);
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
  };

  // Handle OTP verification
  const handleOtpVerify = () => {
    if (otp.every(digit => digit !== '')) {
      setStep('name');
    }
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    setOtpTimer(60);
    setCanResendOtp(false);
    setOtp(['', '', '', '', '', '']);
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (fullName.trim().length < 3) {
      return;
    }
    setStep('success');
  };

  // Handle copy booking number
  const handleCopyBookingNumber = () => {
    navigator.clipboard.writeText(bookingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get title based on provider type
  const getTitle = () => {
    if (step === 'download-app') return 'حمّل التطبيق الآن';
    if (step === 'success') return 'تم الحجز بنجاح!';
    if (step === 'specialty') return 'اختر التخصص المطلوب';
    if (step === 'doctor') return 'اختر الطبيب المناسب';
    if (step === 'datetime') return 'اختر التاريخ والوقت';
    if (step === 'booking-type') return 'اختر نوع الحجز';
    if (step === 'summary') return 'ملخص الحجز';
    if (step === 'phone') return 'أدخل رقم الموبايل';
    if (step === 'otp') return 'أدخل رمز التحقق';
    if (step === 'name') return 'أدخل اسمك الكامل';
    
    const type = provider.type.toLowerCase();
    if (type.includes('مختبر') || type.includes('أشعة')) {
      return 'حجز موعد للفحص';
    }
    return 'حجز موعد مع طبيب';
  };

  // Get filtered specialties
  const filteredSpecialties = medicalSpecialties.filter(specialty =>
    specialty.name.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  // Get doctors for selected specialty
  const availableDoctors = selectedSpecialty
    ? mockDoctors.filter(doctor => doctor.specialtyId === selectedSpecialty)
    : [];

  // Get selected specialty name
  const selectedSpecialtyName = selectedSpecialty
    ? medicalSpecialties.find(s => s.id === selectedSpecialty)?.name
    : '';

  // Generate dates for next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'اليوم' : i === 1 ? 'غداً' : dayNames[date.getDay()];
      const dateStr = `${date.getDate()}/${date.getMonth() + 1}`;
      dates.push({ dayName, dateStr, fullDate: date.toISOString().split('T')[0] });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  // Handle specialty selection
  const handleSpecialtySelect = (specialtyId: number) => {
    setSelectedSpecialty(specialtyId);
    setStep('doctor');
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep('datetime');
  };

  // Handle datetime confirmation
  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep('booking-type');
    }
  };

  // Handle booking type selection
  const handleBookingTypeSelect = (type: 'field' | 'online') => {
    setBookingType(type);
    if (type === 'online') {
      setStep('download-app');
    } else {
      setStep('summary');
    }
  };

  // Handle summary confirmation
  const handleSummaryConfirm = () => {
    // Generate mock booking number
    setBookingNumber(`AE${Math.floor(10000 + Math.random() * 90000)}`);
    setStep('phone');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">
              {getTitle()}
            </DialogTitle>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Specialty Selection */}
          {step === 'specialty' && (
            <div className="space-y-4">
              {/* Provider Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <Building2 className="w-5 h-5 text-[#5B9A9E] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{provider.name}</p>
                    <p className="text-xs text-gray-600">{provider.type}</p>
                  </div>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={specialtySearch}
                  onChange={(e) => setSpecialtySearch(e.target.value)}
                  placeholder="ابحث عن تخصص..."
                  className="w-full pr-10 pl-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-[#5B9A9E] focus:outline-none transition-colors"
                  dir="rtl"
                />
              </div>

              {/* Specialties Count */}
              <p className="text-sm text-gray-600 px-1">
                📋 التخصصات المتاحة ({filteredSpecialties.length})
              </p>

              {/* Specialties List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredSpecialties.map((specialty) => {
                  return (
                    <button
                      key={specialty.id}
                      onClick={() => handleSpecialtySelect(specialty.id)}
                      className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#5B9A9E] rounded-xl p-4 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-right">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                            style={{ backgroundColor: `${specialty.color}15` }}
                          >
                            <Image
                              src="/images/specialty-icon.webp"
                              alt={specialty.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm group-hover:text-[#5B9A9E] transition-colors">
                              {specialty.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {specialty.doctorsCount} {specialty.doctorsCount === 1 ? 'طبيب' : 'أطباء'} متاح
                            </p>
                          </div>
                        </div>
                        <div className="text-[#5B9A9E] group-hover:translate-x-[-4px] transition-transform">
                          ←
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredSpecialties.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">لا توجد تخصصات مطابقة للبحث</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Doctor Selection */}
          {step === 'doctor' && (
            <div className="space-y-4">
              {/* Specialty Header */}
              <div className="bg-gradient-to-r from-[#5B9A9E]/10 to-[#6BA5A8]/10 rounded-xl p-4 border-2 border-[#5B9A9E]/20">
                <div className="flex items-center gap-3">
                  {(() => {
                    const specialty = medicalSpecialties.find(s => s.id === selectedSpecialty);
                    return (
                      <>
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                          style={{ backgroundColor: `${specialty?.color}15` }}
                        >
                          <Image
                            src="/images/specialty-icon.webp"
                            alt={selectedSpecialtyName || ''}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{selectedSpecialtyName}</p>
                          <p className="text-xs text-gray-600">{availableDoctors.length} {availableDoctors.length === 1 ? 'طبيب' : 'أطباء'}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Doctors List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {availableDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#5B9A9E] rounded-xl p-4 transition-all duration-200 text-right group"
                  >
                    <div className="space-y-3">
                      {/* Doctor Name & Title */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-gray-200 group-hover:border-[#5B9A9E] transition-colors">
                            <Image
                              src={doctor.image}
                              alt={doctor.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm group-hover:text-[#5B9A9E] transition-colors">
                              {doctor.name}
                            </p>
                            <p className="text-xs text-gray-600">{doctor.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{doctor.experience}</p>
                          </div>
                        </div>
                        <div className="text-[#5B9A9E] group-hover:translate-x-[-4px] transition-transform">
                          ←
                        </div>
                      </div>

                      {/* Rating & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <span className="text-xs font-bold text-amber-600">⭐ {doctor.rating}</span>
                            <span className="text-xs text-gray-500">({doctor.reviewsCount})</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            {doctor.languages.join(' • ')}
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-[#5B9A9E]">{doctor.price} ريال</p>
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">📅 متاح:</span>
                        <div className="flex gap-1 flex-wrap">
                          {doctor.availableDays.map((day, idx) => (
                            <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep('specialty')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع للتخصصات
              </button>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {step === 'datetime' && selectedDoctor && (
            <div className="space-y-4">
              {/* Doctor Info */}
              <div className="bg-gradient-to-r from-[#5B9A9E]/10 to-[#6BA5A8]/10 rounded-xl p-4 border-2 border-[#5B9A9E]/20">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#5B9A9E]">
                    <Image
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{selectedDoctor.name}</p>
                    <p className="text-xs text-gray-600">{selectedDoctor.title}</p>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  📅 اختر التاريخ:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.map((date, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(date.fullDate)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedDate === date.fullDate
                          ? 'border-[#5B9A9E] bg-[#5B9A9E]/10'
                          : 'border-gray-200 hover:border-[#5B9A9E]/50'
                      }`}
                    >
                      <p className={`text-xs font-bold ${
                        selectedDate === date.fullDate ? 'text-[#5B9A9E]' : 'text-gray-900'
                      }`}>
                        {date.dayName}
                      </p>
                      <p className={`text-xs ${
                        selectedDate === date.fullDate ? 'text-[#5B9A9E]' : 'text-gray-600'
                      }`}>
                        {date.dateStr}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    ⏰ اختر الوقت:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => slot.available && setSelectedTime(`${slot.time} ${slot.period}`)}
                        disabled={!slot.available}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedTime === `${slot.time} ${slot.period}`
                            ? 'border-[#5B9A9E] bg-[#5B9A9E]/10'
                            : slot.available
                            ? 'border-gray-200 hover:border-[#5B9A9E]/50'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <p className={`text-sm font-bold ${
                          selectedTime === `${slot.time} ${slot.period}`
                            ? 'text-[#5B9A9E]'
                            : slot.available
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}>
                          {slot.time}
                        </p>
                        <p className={`text-xs ${
                          selectedTime === `${slot.time} ${slot.period}`
                            ? 'text-[#5B9A9E]'
                            : slot.available
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}>
                          {slot.period}
                        </p>
                        {!slot.available && (
                          <p className="text-[10px] text-red-500 mt-1">محجوز</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleDateTimeConfirm}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 rounded-xl font-bold text-base transition-all ${
                  selectedDate && selectedTime
                    ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                تأكيد الموعد
              </button>

              <button
                onClick={() => setStep('doctor')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع لاختيار طبيب آخر
              </button>
            </div>
          )}

          {/* Step 4: Booking Type Selection */}
          {step === 'booking-type' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">اختر طريقة الحجز المناسبة</p>
              </div>

              {/* Booking Options */}
              <div className="space-y-3">
                <button
                  onClick={() => handleBookingTypeSelect('field')}
                  className="w-full bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] hover:from-[#4A8A8E] hover:to-[#5A9A98] text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="font-bold text-base mb-1">🏢 حجز موعد ميداني</p>
                      <p className="text-xs text-white/90">زيارة المركز الطبي</p>
                    </div>
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      ←
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleBookingTypeSelect('online')}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-[#5B9A9E] text-[#5B9A9E] rounded-xl p-4 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="font-bold text-base mb-1">💻 حجز موعد أونلاين</p>
                      <p className="text-xs text-gray-600">استشارة عن بُعد</p>
                    </div>
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      ←
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setStep('datetime')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع
              </button>
            </div>
          )}

          {/* Step 5: Booking Summary */}
          {step === 'summary' && selectedDoctor && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">تأكد من صحة البيانات قبل المتابعة</p>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-[#5B9A9E]/10 to-[#6BA5A8]/10 rounded-xl p-5 border-2 border-[#5B9A9E]/20 space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-[#5B9A9E]/20">
                  <Activity className="w-5 h-5 text-[#5B9A9E]" />
                  <p className="font-bold text-gray-900">ملخص الحجز</p>
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#5B9A9E] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">المستشفى</p>
                      <p className="font-semibold text-gray-900">{provider.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    {(() => {
                      const specialty = medicalSpecialties.find(s => s.id === selectedSpecialty);
                      return (
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center shrink-0 overflow-hidden"
                          style={{ backgroundColor: `${specialty?.color}15` }}
                        >
                          <Image
                            src="/images/specialty-icon.webp"
                            alt={selectedSpecialtyName || ''}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                      );
                    })()}
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">التخصص</p>
                      <p className="font-semibold text-gray-900">{selectedSpecialtyName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-300">
                      <Image
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">الطبيب</p>
                      <p className="font-semibold text-gray-900">{selectedDoctor.name}</p>
                      <p className="text-xs text-gray-600">{selectedDoctor.title}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-[#5B9A9E] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">التاريخ</p>
                      <p className="font-semibold text-gray-900">
                        {availableDates.find(d => d.fullDate === selectedDate)?.dayName} - {availableDates.find(d => d.fullDate === selectedDate)?.dateStr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-[#5B9A9E] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">الوقت</p>
                      <p className="font-semibold text-gray-900">{selectedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Activity className="w-4 h-4 text-[#5B9A9E] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">التكلفة</p>
                      <p className="font-bold text-[#5B9A9E] text-lg">{selectedDoctor.price} ريال</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#5B9A9E] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">نوع الحجز</p>
                      <p className="font-semibold text-gray-900">
                        {bookingType === 'field' ? 'حجز ميداني' : 'حجز أونلاين'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSummaryConfirm}
                className="w-full py-3 bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white rounded-xl font-bold text-base hover:shadow-lg transition-all"
              >
                تأكيد وإكمال الحجز
              </button>

              <button
                onClick={() => setStep('booking-type')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← تعديل
              </button>
            </div>
          )}

          {/* Step 6: Phone Number */}
          {step === 'phone' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#5B9A9E]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-[#5B9A9E]" />
                </div>
                <p className="text-gray-600 text-sm">
                  أدخل رقم موبايلك لإرسال رمز التحقق
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  رقم الموبايل
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneError('');
                  }}
                  placeholder="05xxxxxxxx"
                  className={`w-full px-4 py-3 border-2 rounded-xl text-center text-lg tracking-wider focus:outline-none transition-colors ${
                    phoneError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-[#5B9A9E]'
                  }`}
                  dir="ltr"
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-2 text-right">{phoneError}</p>
                )}
              </div>

              <button
                onClick={handlePhoneSubmit}
                disabled={!phoneNumber}
                className={`w-full py-3 rounded-xl font-bold text-base transition-all ${
                  phoneNumber
                    ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                إرسال رمز التحقق
              </button>

              <button
                onClick={() => setStep('summary')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع
              </button>
            </div>
          )}

          {/* Step 7: OTP */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#5B9A9E]/10 rounded-full flex items-center justify-center mx-auto mb-3 relative overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Aman Ever"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-900 font-bold mb-1">أدخل رمز التحقق</p>
                <p className="text-gray-600 text-sm">
                  تم إرسال الرمز إلى: {formatPhoneNumber(phoneNumber)}
                </p>
              </div>

              <div className="flex justify-center gap-2 mb-4" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className="w-12 h-12 border-2 border-gray-300 rounded-xl text-center text-xl font-bold focus:border-[#5B9A9E] focus:outline-none transition-colors"
                  />
                ))}
              </div>

              <div className="text-center">
                {canResendOtp ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-[#5B9A9E] font-semibold text-sm hover:underline"
                  >
                    إعادة إرسال الرمز
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    إعادة إرسال بعد: <span className="font-bold text-[#5B9A9E]">{otpTimer}</span> ثانية
                  </p>
                )}
              </div>

              <button
                onClick={handleOtpVerify}
                disabled={!otp.every(digit => digit !== '')}
                className={`w-full py-3 rounded-xl font-bold text-base transition-all ${
                  otp.every(digit => digit !== '')
                    ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                تحقق
              </button>

              <button
                onClick={() => setStep('phone')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع
              </button>
            </div>
          )}

          {/* Step 8: Name */}
          {step === 'name' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#5B9A9E]/10 rounded-full flex items-center justify-center mx-auto mb-3 relative overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Aman Ever"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <p className="text-gray-600 text-sm">
                  أدخل اسمك الكامل لإتمام الحجز
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: محمد أحمد العلي"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-right focus:border-[#5B9A9E] focus:outline-none transition-colors"
                  dir="rtl"
                />
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={fullName.trim().length < 3}
                className={`w-full py-3 rounded-xl font-bold text-base transition-all ${
                  fullName.trim().length >= 3
                    ? 'bg-gradient-to-r from-[#5B9A9E] to-[#6BA5A8] text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                تأكيد الحجز
              </button>

              <button
                onClick={() => setStep('otp')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع
              </button>
            </div>
          )}

          {/* Step 9: Success */}
          {step === 'success' && (
            <div className="space-y-4 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Aman Ever"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  تم الحجز بنجاح!
                </h3>
              </div>

              {/* Booking Number */}
              <div className="bg-gradient-to-r from-[#5B9A9E]/10 to-[#6BA5A8]/10 rounded-xl p-4 border-2 border-[#5B9A9E]/20">
                <p className="text-sm text-gray-600 mb-2">رقم الحجز</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold text-[#5B9A9E]">#{bookingNumber}</p>
                  <button
                    onClick={handleCopyBookingNumber}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                    title="نسخ رقم الحجز"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-[#5B9A9E]" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">احتفظ به للمراجعة</p>
              </div>

              {/* Download App Message */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  برجاء تحميل التطبيق لإتمام عملية الدفع وإدارة مواعيدك
                </p>
              </div>

              {/* App Download Buttons */}
              <div className="pt-2">
                <AppDownloadButtons layout="vertical" showHuawei={true} />
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                إغلاق
              </button>
            </div>
          )}

          {/* Step 10: Download App (for online booking) */}
          {step === 'download-app' && (
            <div className="space-y-4 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-[#5B9A9E]/10 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Aman Ever"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  الحجز الأونلاين متاح عبر التطبيق
                </h3>
                <p className="text-sm text-gray-600">
                  حمّل التطبيق الآن للحجز الأونلاين والاستشارة عن بُعد
                </p>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-right">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">استشارة فورية</p>
                    <p className="text-xs text-gray-600">تواصل مع الطبيب خلال دقائق</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">دفع آمن</p>
                    <p className="text-xs text-gray-600">طرق دفع متعددة ومؤمنة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">إدارة المواعيد</p>
                    <p className="text-xs text-gray-600">تتبع جميع مواعيدك بسهولة</p>
                  </div>
                </div>
              </div>

              {/* App Download Buttons */}
              <div className="pt-2">
                <AppDownloadButtons layout="vertical" showHuawei={true} />
              </div>

              <button
                onClick={() => setStep('booking-type')}
                className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                ← رجوع
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
