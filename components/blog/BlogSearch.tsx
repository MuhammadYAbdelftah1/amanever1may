'use client';

import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function BlogSearch({ onSearch, searchQuery }: BlogSearchProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A9899]" />
        <input
          type="text"
          placeholder="ابحث في المقالات..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pr-12 pl-12 py-4 rounded-xl border-2 border-[#E5EAEB] focus:border-[#4A8B8E] focus:outline-none text-[#1A2B2C] placeholder:text-[#8A9899] transition-all duration-300"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9899] hover:text-[#4A8B8E] transition-colors duration-300"
            aria-label="مسح البحث"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
