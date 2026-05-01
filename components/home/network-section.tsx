'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { 
  Hospital, 
  Stethoscope, 
  Pill, 
  Activity,
  Dumbbell,
  Apple,
  Glasses,
  Waves
} from 'lucide-react';
import Image from 'next/image';
import { NetworkMapPopover } from '@/components/shared/network-map-popover';

interface NetworkSectionProps {
  locale: string;
}

const medicalNetwork = [
  { 
    id: 'hospitals', 
    icon: Hospital,
    titleKey: 'hospitals',
    descKey: 'hospitalsDesc',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'clinics', 
    icon: Stethoscope,
    titleKey: 'clinics',
    descKey: 'clinicsDesc',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'pharmacies', 
    icon: Pill,
    titleKey: 'pharmacies',
    descKey: 'pharmaciesDesc',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'labs', 
    icon: Activity,
    titleKey: 'labs',
    descKey: 'labsDesc',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600'
  },
];

const healthNetwork = [
  { 
    id: 'gyms', 
    icon: Dumbbell,
    titleKey: 'gyms',
    descKey: 'gymsDesc',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'nutrition', 
    icon: Apple,
    titleKey: 'nutrition',
    descKey: 'nutritionDesc',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'opticals', 
    icon: Glasses,
    titleKey: 'opticals',
    descKey: 'opticalsDesc',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'spa', 
    icon: Waves,
    titleKey: 'spa',
    descKey: 'spaDesc',
    image: 'https://images.unsplash.com/photo-1544161515-4af6b1d46afc?auto=format&fit=crop&q=80&w=600'
  },
];

export function NetworkSection({ locale }: NetworkSectionProps) {
  const t = useTranslations('home.network');
  const [activeTab, setActiveTab] = useState<'medical' | 'health'>('health');

  const currentNetwork = activeTab === 'medical' ? medicalNetwork : healthNetwork;

  return (
    <section className="py-12 md:py-24 bg-[#f8fcfc] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black text-[#003d3d] mb-6 md:mb-8 leading-tight">
            {t('title')}
          </h2>

          {/* Tabs */}
          <div className="inline-flex flex-col sm:flex-row bg-white p-2 rounded-2xl md:rounded-[1.5rem] shadow-xl border border-teal-100 mb-8 md:mb-12 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-6 md:px-10 py-3 rounded-xl font-black transition-all text-sm md:text-base ${
                activeTab === 'medical'
                  ? 'bg-[#4d8080] text-white shadow-lg'
                  : 'text-gray-400 hover:text-teal-600'
              }`}
            >
              {t('tabs.medical')}
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-6 md:px-10 py-3 rounded-xl font-black transition-all text-sm md:text-base ${
                activeTab === 'health'
                  ? 'bg-[#4d8080] text-white shadow-lg'
                  : 'text-gray-400 hover:text-teal-600'
              }`}
            >
              {t('tabs.health')}
            </button>
          </div>
          
          {/* Network Map Button */}
          <div className="flex justify-center mb-8">
            <NetworkMapPopover 
              locale={locale} 
              type={activeTab === 'medical' ? 'medical' : 'health'} 
            />
          </div>
        </div>

        {/* Infinite Marquee */}
        <div className="relative w-full overflow-hidden py-10">
          {/* Gradient Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#f8fcfc] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#f8fcfc] to-transparent z-10 pointer-events-none" />

          {/* Marquee Container */}
          <div className="network-marquee-container">
            <div className="network-marquee-content">
              {/* First Set */}
              {currentNetwork.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`first-${item.id}`}
                    className="network-marquee-item group"
                  >
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-teal-50 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 w-[280px] md:w-[350px] shrink-0">
                      {/* Image */}
                      <div className="h-40 relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={t(`${activeTab}.${item.titleKey}`)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        
                        {/* Icon Badge */}
                        <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-6 h-6 text-[#4d8080]" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col items-center text-center">
                        <h3 className="text-lg md:text-xl font-black text-gray-800 mb-2">
                          {t(`${activeTab}.${item.titleKey}`)}
                        </h3>
                        <p className="text-gray-500 font-bold text-xs md:text-sm leading-relaxed line-clamp-2">
                          {t(`${activeTab}.${item.descKey}`)}
                        </p>
                        
                        {/* Badge */}
                        <div className="mt-6 px-4 py-1.5 rounded-full border border-teal-100 text-[#4d8080] text-[10px] font-black uppercase tracking-wider">
                          {t(`tabs.${activeTab}`)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Duplicate Set for Infinite Effect */}
              {currentNetwork.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`second-${item.id}`}
                    className="network-marquee-item group"
                    aria-hidden="true"
                  >
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-teal-50 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 w-[280px] md:w-[350px] shrink-0">
                      <div className="h-40 relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={t(`${activeTab}.${item.titleKey}`)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-6 h-6 text-[#4d8080]" />
                        </div>
                      </div>
                      <div className="p-8 flex flex-col items-center text-center">
                        <h3 className="text-lg md:text-xl font-black text-gray-800 mb-2">
                          {t(`${activeTab}.${item.titleKey}`)}
                        </h3>
                        <p className="text-gray-500 font-bold text-xs md:text-sm leading-relaxed line-clamp-2">
                          {t(`${activeTab}.${item.descKey}`)}
                        </p>
                        <div className="mt-6 px-4 py-1.5 rounded-full border border-teal-100 text-[#4d8080] text-[10px] font-black uppercase tracking-wider">
                          {t(`tabs.${activeTab}`)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
