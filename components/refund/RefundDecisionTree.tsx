"use client";

import { useState } from 'react';
import { CreditCard, Stethoscope, Home, Coins, CheckCircle2, ChevronRight } from 'lucide-react';

interface DecisionOption {
  id: string;
  title: string;
  icon: string;
  result: string;
  color: string;
  link: string;
}

interface RefundDecisionTreeProps {
  title: string;
  subtitle: string;
  options: DecisionOption[];
}

export function RefundDecisionTree({ title, subtitle, options }: RefundDecisionTreeProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      card: CreditCard,
      stethoscope: Stethoscope,
      home: Home,
      coins: Coins,
    };
    return icons[iconName] || CreditCard;
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      green: {
        bg: isSelected ? 'bg-green-50' : 'bg-white',
        border: isSelected ? 'border-green-500' : 'border-[#E5EAEB]',
        text: 'text-green-600',
        hover: 'hover:border-green-300',
      },
      blue: {
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        border: isSelected ? 'border-blue-500' : 'border-[#E5EAEB]',
        text: 'text-blue-600',
        hover: 'hover:border-blue-300',
      },
      purple: {
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        border: isSelected ? 'border-purple-500' : 'border-[#E5EAEB]',
        text: 'text-purple-600',
        hover: 'hover:border-purple-300',
      },
      gray: {
        bg: isSelected ? 'bg-gray-50' : 'bg-white',
        border: isSelected ? 'border-gray-500' : 'border-[#E5EAEB]',
        text: 'text-gray-600',
        hover: 'hover:border-gray-300',
      },
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="bg-[#E8F1F1] rounded-2xl p-6 md:p-8 border border-[#4A8B8E]/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A2B2C] mb-2">
          {title}
        </h2>
        <p className="text-[#5A6B6C]">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {options.map((option) => {
          const Icon = getIcon(option.icon);
          const colors = getColorClasses(option.color, selectedOption === option.id);
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`${colors.bg} ${colors.border} ${colors.hover} border-2 rounded-xl p-5 transition-all duration-200 text-right hover:shadow-md ${
                isSelected ? 'shadow-lg scale-105' : ''
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center mx-auto`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#1A2B2C] text-center">
                  {option.title}
                </h3>

                {/* Result - Show when selected */}
                {isSelected && (
                  <div className="mt-2 pt-3 border-t border-[#E5EAEB]">
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle2 className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <p className="text-sm text-[#5A6B6C] text-right">
                        {option.result}
                      </p>
                    </div>
                    <a
                      href={option.link}
                      className={`inline-flex items-center gap-2 text-sm ${colors.text} hover:underline font-medium`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>اقرأ التفاصيل</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {!selectedOption && (
        <p className="text-center text-sm text-[#8A9899] mt-4">
          👆 اضغط على نوع الخدمة لمعرفة شروط الاسترداد
        </p>
      )}
    </div>
  );
}
