'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error(error);
    
    // Handle ChunkLoadError by reloading the page
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      console.log('ChunkLoadError detected, reloading page...');
      window.location.reload();
    }
  }, [error]);

  const isChunkError = error.name === 'ChunkLoadError' || error.message.includes('Loading chunk');

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {t('siteName')}
        </h2>
        <p className="text-lg mb-6">
          {isChunkError ? 'جاري تحديث الصفحة...' : 'حدث خطأ ما'}
        </p>
        {!isChunkError && (
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            حاول مرة أخرى
          </button>
        )}
      </div>
    </div>
  );
}
