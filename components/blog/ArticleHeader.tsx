'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blog-data';
import { BlogVideoPlayer } from './BlogVideoPlayer';

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const [formattedDate, setFormattedDate] = useState('');
  const isVideo = post.coverImageType === 'video';

  useEffect(() => {
    const date = new Date(post.publishedDate);
    setFormattedDate(
      date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, [post.publishedDate]);

  return (
    <header className="relative">
      {/* Breadcrumbs */}
      <div className="bg-[#F8FAFB] py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm text-[#5A6B6C]">
            <Link href="/ar" className="hover:text-[#4A8B8E] transition-colors">
              الرئيسية
            </Link>
            <ArrowRight className="w-4 h-4" />
            <Link href="/ar/blog" className="hover:text-[#4A8B8E] transition-colors">
              المدونة
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-[#1A2B2C] font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#E8F1F1] to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-[#4A8B8E] text-white px-4 py-2 rounded-full text-sm font-bold">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2B2C] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-[#5A6B6C] mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#5A6B6C]">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#4A8B8E]" />
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4A8B8E]" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4A8B8E]" />
              <span>{post.readTimeMinutes} دقائق قراءة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image or Video */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8">
        {isVideo ? (
          <BlogVideoPlayer
            src={post.coverImage}
            title={post.title}
            className="h-[400px] md:h-[500px] shadow-2xl"
          />
        ) : (
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}
      </div>
    </header>
  );
}
