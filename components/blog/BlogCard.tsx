'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/data/blog-data';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    
    // Format date on client side
    const date = new Date(post.publishedDate);
    setFormattedDate(
      date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    return () => clearTimeout(timer);
  }, [index, post.publishedDate]);

  return (
    <article
      className={`
        group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl
        transition-all duration-500 border border-[#E5EAEB]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {/* Cover Image */}
      <Link href={`/ar/blog/${post.slug}`} className="block relative h-56 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-[#4A8B8E] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {post.category}
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ مميز
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-[#8A9899] mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{post.readTimeMinutes} دقائق</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/ar/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-[#1A2B2C] mb-3 line-clamp-2 group-hover:text-[#4A8B8E] transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-[#5A6B6C] text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5EAEB]">
          <span className="text-xs text-[#8A9899]">{formattedDate}</span>
          
          <Link
            href={`/ar/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[#4A8B8E] font-bold text-sm hover:gap-3 transition-all duration-300"
          >
            <span>اقرأ المزيد</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
