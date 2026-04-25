import Image from 'next/image';
import Link from 'next/link';
import { Smartphone, Star } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';
import { TempQRCode } from '@/components/shared/temp-qr-code';

export function FooterDownloadNew() {
  const { app } = FOOTER_CONFIG_NEW;

  return (
    <div>
      <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
        <Smartphone className="w-5 h-5" aria-hidden="true" />
        <span>حمّل التطبيق</span>
      </h3>
      
      <p className="text-sm text-slate-300 mb-5">
        صحتك في جيبك. حمّل أمان إيفر اليوم.
      </p>

      {/* App Store Badges */}
      <div className="flex flex-col gap-3 mb-6">
        {app.stores.map((store) => (
          <Link
            key={store.name}
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-emerald-400 focus:outline-none rounded"
            aria-label={`حمّل من ${store.name}`}
          >
            <Image
              src={store.badge}
              alt={`حمّل من ${store.name}`}
              width={160}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        ))}
      </div>

      {/* Trust Line - Rating & Downloads */}
      {app.rating !== 'APP_RATING' && app.downloads !== 'DOWNLOAD_COUNT' && (
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-6 pb-6 border-b border-white/10">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
          <span className="font-medium">{app.rating}</span>
          <span className="text-slate-500">·</span>
          <span>أكثر من {app.downloads} تحميل</span>
        </div>
      )}

      {/* QR Code Section - Temporary Smart Redirect */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-xs text-slate-400 mb-3 text-center">
          امسح الكود للتحميل المباشر
        </p>
        <div className="flex justify-center">
          <TempQRCode
            iosUrl={app.stores.find(s => s.name === 'App Store')?.url}
            androidUrl={app.stores.find(s => s.name === 'Google Play')?.url}
            huaweiUrl={app.stores.find(s => s.name === 'Huawei AppGallery')?.url}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          يوجهك تلقائياً للمتجر المناسب
        </p>
      </div>
    </div>
  );
}
