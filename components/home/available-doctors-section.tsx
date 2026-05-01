/**
 * Available Doctors Section (أطباء متاحون 24 ساعة)
 * Displays available doctors in an infinite scrolling carousel
 */

'use client';

import { useRef, useEffect } from 'react';
import { Calendar, Info } from 'lucide-react';
import Image from 'next/image';

interface AvailableDoctorsSectionProps {
  locale: string;
}

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  image: string;
  available: boolean;
};

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'د. خالد السقاف',
    specialty: 'استشاري أمراض القلب',
    hospital: 'مستشفى الملك فهد',
    image: '/images/m-doc.jpeg',
    available: true,
  },
  {
    id: 2,
    name: 'د. هند الغامدي',
    specialty: 'استشارية طب الأطفال',
    hospital: 'مركز الرعاية التخصصي',
    image: '/images/Woman_doctor_smiling_in_hospital_202605010020.jpeg',
    available: true,
  },
  {
    id: 3,
    name: 'د. عمر منصور',
    specialty: 'استشاري جراحة العظام',
    hospital: 'مستشفى الأمل التخصصي',
    image: '/images/m-doc.jpeg',
    available: true,
  },
  {
    id: 4,
    name: 'د. سارة بخش',
    specialty: 'استشارية الأمراض الجلدية',
    hospital: 'مجمع النخبة الطبي',
    image: '/images/Woman_doctor_smiling_in_hospital_202605010020.jpeg',
    available: true,
  },
];

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="w-[300px] md:w-[350px] bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group shrink-0">
      {/* Doctor Image - Taller */}
      <div className="h-80 md:h-96 rounded-t-[2.5rem] overflow-hidden relative">
        <img
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          src={doctor.image}
        />
        {/* Available Badge */}
        {doctor.available && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg z-10">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            متاح الآن
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="text-center p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-[#4d8080] font-bold text-sm mb-3 uppercase tracking-wide">
          {doctor.specialty}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs font-bold mb-6">
          <Info className="w-3.5 h-3.5 text-[#4d8080]" aria-hidden="true" />
          <span>{doctor.hospital}</span>
        </div>

        {/* Action Buttons - Push to bottom */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button className="py-3 px-4 bg-slate-50 text-gray-600 rounded-2xl font-black text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
            الملف الشخصي
          </button>
          <button className="py-3 px-4 bg-[#4d8080] text-white rounded-2xl font-black text-xs hover:bg-[#3d6666] transition-colors shadow-lg shadow-teal-900/10 flex items-center justify-center gap-2">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            حجز موعد
          </button>
        </div>
      </div>
    </div>
  );
}

export function AvailableDoctorsSection({ locale }: AvailableDoctorsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let animationId: number;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPos += 0.6;
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
  }, []);

  // Triple duplicate doctors for seamless loop
  const duplicatedDoctors = [...doctors, ...doctors, ...doctors];

  return (
    <section id="available-doctors" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#003d3d] mb-4">
            أطباء متاحون 24 ساعة
          </h2>
          <div className="h-1.5 w-24 bg-[#4d8080] mx-auto rounded-full" />
        </div>

        {/* Infinite Scrolling Doctors */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedDoctors.map((doctor, index) => (
              <DoctorCard key={`${doctor.id}-${index}`} doctor={doctor} />
            ))}
          </div>
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
