'use client';

import { BlogCategory } from '@/data/blog-data';

interface BlogFiltersProps {
  categories: Array<{ name: BlogCategory; count: number }>;
  selectedCategory: BlogCategory | 'all';
  onCategoryChange: (category: BlogCategory | 'all') => void;
}

export function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold text-[#5A6B6C]">التصنيفات:</span>
      
      {/* All Categories */}
      <button
        onClick={() => onCategoryChange('all')}
        className={`
          px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
          ${selectedCategory === 'all'
            ? 'bg-[#4A8B8E] text-white shadow-lg'
            : 'bg-[#F8FAFB] text-[#5A6B6C] hover:bg-[#E8F1F1]'
          }
        `}
      >
        الكل
      </button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`
            px-4 py-2 rounded-full text-sm font-bold transition-all duration-300
            ${selectedCategory === category.name
              ? 'bg-[#4A8B8E] text-white shadow-lg'
              : 'bg-[#F8FAFB] text-[#5A6B6C] hover:bg-[#E8F1F1]'
            }
          `}
        >
          {category.name} ({category.count})
        </button>
      ))}
    </div>
  );
}
