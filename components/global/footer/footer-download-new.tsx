import Image from 'next/image';
import Link from 'next/link';
import { Smartphone, Star } from 'lucide-react';
import { FOOTER_CONFIG_NEW } from '@/lib/data/footer-config-new';
import { TempQRCode } from '@/components/shared/temp-qr-code';

export function FooterDownloadNew() {
  const { app } = FOOTER_CONFIG_NEW;

  return (
    <div className="max-w-sm mx-auto md:max-w-none md:mx-0">
      <h3 className="text-[#1A2B2C] font-bold text-base mb-4 flex items-center justify-center md:justify-start gap-2">
        <Smartphone className="w-5 h-5" aria-hidden="true" />
        <span>حمّل التطبيق</span>
      </h3>
      
      <p className="text-sm text-[#5A6B6C] mb-4 text-center md:text-start">
        صحتك في جيبك. حمّل أمان إيفر اليوم.
      </p>

      {/* App Store Badges - centered without background */}
      <div className="flex flex-col gap-2.5 mb-4 items-center md:items-start">
        {app.stores.map((store) => (
          <Link
            key={store.name}
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none rounded-xl"
            aria-label={`حمّل من ${store.name}`}
          >
            <Image
              src={store.badge}
              alt={`حمّل من ${store.name}`}
              width={160}
              height={48}
              className="h-11 w-auto"
            />
          </Link>
        ))}
      </div>

      {/* Trust Line - Rating & Downloads - centered */}
      {app.rating !== 'APP_RATING' && app.downloads !== 'DOWNLOAD_COUNT' && (
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-[#5A6B6C] mb-4 pb-4 border-b border-[#E5EAEB]">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
          <span className="font-medium">{app.rating}</span>
          <span className="text-[#8A9899]">·</span>
          <span>أكثر من {app.downloads} تحميل</span>
        </div>
      )}

      {/* QR Code Section - Light theme */}
      <div className="bg-[#F8FAFB] rounded-lg p-3.5 border border-[#E5EAEB]">
        <p className="text-xs text-[#5A6B6C] mb-3 text-center">
          امسح الكود للتحميل المباشر
        </p>
        <div className="flex justify-center">
          <div className="bg-white border border-[#E5EAEB] rounded-lg p-2">
            <TempQRCode
              iosUrl={app.stores.find(s => s.name === 'App Store')?.url}
              androidUrl={app.stores.find(s => s.name === 'Google Play')?.url}
              huaweiUrl={app.stores.find(s => s.name === 'Huawei AppGallery')?.url}
            />
          </div>
        </div>
        <p className="text-xs text-[#5A6B6C] mt-2 text-center">
          يوجهك تلقائياً للمتجر المناسب
        </p>
      </div>
    </div>
  );
}
