'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { BlogPost } from '@/data/blog-data';

interface ArticleShareProps {
  post: BlogPost;
}

export function ArticleShare({ post }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/ar/blog/${post.slug}`
    : '';

  const shareText = `${post.title} - أمان إيفر`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#E5EAEB]">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-[#4A8B8E]" />
        <h3 className="font-bold text-[#1A2B2C]">شارك المقال</h3>
      </div>

      <div className="space-y-3">
        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-[#E8F1F1] transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-[#1A2B2C]">واتساب</span>
        </a>

        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-[#E8F1F1] transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Twitter className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-[#1A2B2C]">تويتر</span>
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-[#E8F1F1] transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Facebook className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-[#1A2B2C]">فيسبوك</span>
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-[#E8F1F1] transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Linkedin className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-[#1A2B2C]">لينكد إن</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-[#E8F1F1] transition-all duration-300 group w-full"
        >
          <div className="w-10 h-10 rounded-full bg-[#4A8B8E] flex items-center justify-center group-hover:scale-110 transition-transform">
            {copied ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <LinkIcon className="w-5 h-5 text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-[#1A2B2C]">
            {copied ? 'تم النسخ!' : 'نسخ الرابط'}
          </span>
        </button>
      </div>
    </div>
  );
}
