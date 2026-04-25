'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

interface CalSchedulerProps {
  isRTL?: boolean;
}

export function CalScheduler({ isRTL = false }: CalSchedulerProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'aman-ever-invest' });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg">
      <Cal
        namespace="aman-ever-invest"
        calLink="muhammad-abd-el-ftah-y7ftl7/aman-ever-invest"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'scroll',
        }}
        config={{
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
        }}
      />
    </div>
  );
}
