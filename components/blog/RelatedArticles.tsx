'use client';

import { BlogPost } from '@/data/blog-data';
import { BlogCard } from './BlogCard';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-[#F8FAFB]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B2C] mb-4">
            مقالات ذات صلة
          </h2>
          <p className="text-[#5A6B6C]">
            قد تهمك هذه المقالات أيضاً
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
