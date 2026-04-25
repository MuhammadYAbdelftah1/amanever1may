import Image from 'next/image';
import { FOOTER_CONFIG } from '@/lib/data/footer-config';
import { Smartphone } from 'lucide-react';
import { AppDownloadButtons } from '@/components/shared/app-download-buttons';

export function FooterDownload() {
  return (
    <div>
      <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
        <Smartphone className="w-5 h-5" />
        <span>حمّل التطبيق</span>
      </h3>
      
      <p className="text-sm text-slate-300 mb-5">
        صحتك في جيبك. حمّل أمان إيفر اليوم.
      </p>

      {/* App Download Buttons */}
      <div className="mb-4">
        <AppDownloadButtons layout="vertical" showHuawei={true} />
      </div>

      {/* Newsletter section - OMITTED until backend is ready */}
      {/* 
      <div className="mt-8 pt-8 border-t border-white/10">
        <p className="text-sm text-slate-300 mb-3">
          📧 نشرة أمان إيفر الأسبوعية
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition"
          >
            اشتراك
          </button>
        </form>
      </div>
      */}
    </div>
  );
}
