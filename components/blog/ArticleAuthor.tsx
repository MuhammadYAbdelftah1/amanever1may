'use client';

import Image from 'next/image';
import { Twitter, Linkedin } from 'lucide-react';
import { BlogAuthor } from '@/data/blog-data';

interface ArticleAuthorProps {
  author: BlogAuthor;
}

export function ArticleAuthor({ author }: ArticleAuthorProps) {
  return (
    <div className="mt-12 p-6 bg-[#F8FAFB] rounded-2xl border border-[#E5EAEB]">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-[#E8F1F1]">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#1A2B2C] mb-1">
            {author.name}
          </h3>
          <p className="text-sm text-[#4A8B8E] font-medium mb-3">
            {author.title}
          </p>
          <p className="text-sm text-[#5A6B6C] leading-relaxed mb-4">
            {author.bio}
          </p>

          {/* Credentials */}
          {author.credentials && author.credentials.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-bold text-[#5A6B6C] mb-2">المؤهلات:</p>
              <ul className="space-y-1">
                {author.credentials.map((credential, index) => (
                  <li key={index} className="text-xs text-[#5A6B6C] flex items-start gap-2">
                    <span className="text-[#4A8B8E] mt-1">•</span>
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {author.social && (
            <div className="flex items-center gap-3">
              {author.social.twitter && (
                <a
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A6B6C] hover:text-[#4A8B8E] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {author.social.linkedin && (
                <a
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A6B6C] hover:text-[#4A8B8E] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
