'use client';

import { useState } from 'react';
import { BlogPost, BlogCategory } from '@/data/blog-data';
import { BlogCard } from './BlogCard';
import { BlogFilters } from './BlogFilters';
import { BlogSearch } from './BlogSearch';
import { searchPosts } from '@/data/blog-data';

interface BlogGridProps {
  posts: BlogPost[];
  categories: Array<{ name: BlogCategory; count: number }>;
}

export function BlogGrid({ posts, categories }: BlogGridProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle category filter
  const handleCategoryChange = (category: BlogCategory | 'all') => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when filtering by category

    if (category === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === category));
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all'); // Clear category filter when searching

    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(searchPosts(query));
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Filters and Search */}
        <div className="mb-12 space-y-6">
          <BlogSearch onSearch={handleSearch} searchQuery={searchQuery} />
          <BlogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-[#5A6B6C]">
            {filteredPosts.length === 0 ? (
              <span>لم يتم العثور على مقالات</span>
            ) : (
              <span>
                عرض <span className="font-bold text-[#4A8B8E]">{filteredPosts.length}</span> مقالة
                {searchQuery && ` لـ "${searchQuery}"`}
                {selectedCategory !== 'all' && ` في "${selectedCategory}"`}
              </span>
            )}
          </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#1A2B2C] mb-2">
              لم نجد ما تبحث عنه
            </h3>
            <p className="text-[#5A6B6C] mb-6">
              جرب البحث بكلمات مختلفة أو تصفح جميع المقالات
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFilteredPosts(posts);
              }}
              className="bg-[#4A8B8E] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#356B6E] transition-all duration-300"
            >
              عرض جميع المقالات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
