'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#E5EAEB] z-50">
        <div
          className="h-full bg-[#4A8B8E] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none prose-headings:text-[#1A2B2C] prose-headings:font-bold prose-p:text-[#5A6B6C] prose-p:leading-relaxed prose-a:text-[#4A8B8E] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1A2B2C] prose-ul:text-[#5A6B6C] prose-ol:text-[#5A6B6C] prose-blockquote:border-r-4 prose-blockquote:border-[#4A8B8E] prose-blockquote:bg-[#F8FAFB] prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:text-[#5A6B6C] prose-code:text-[#4A8B8E] prose-code:bg-[#F8FAFB] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#1A2B2C] prose-pre:text-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>

      {/* Medical Disclaimer */}
      <div className="mt-12 p-6 bg-[#FFF9E6] border-r-4 border-yellow-500 rounded-lg">
        <p className="text-sm text-[#5A6B6C] leading-relaxed">
          <strong className="text-[#1A2B2C]">تنويه طبي:</strong> المعلومات الواردة في هذا المقال هي لأغراض تعليمية فقط ولا تغني عن استشارة الطبيب المختص. 
          إذا كنت تعاني من أي أعراض أو حالة صحية، يرجى استشارة طبيبك.
        </p>
      </div>
    </>
  );
}
