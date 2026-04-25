import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: { width: 60, height: 20 },
  medium: { width: 100, height: 33 },
  large: { width: 120, height: 40 },
};

export function Logo({ size = 'medium', className }: LogoProps) {
  const dimensions = sizeMap[size];

  return (
    <div className={cn('relative', className)}>
      <Image
        src="/images/logo.png"
        alt="أمان إيفر - Aman Ever"
        width={dimensions.width}
        height={dimensions.height}
        priority // Above-fold image, load immediately
        quality={90} // Higher quality for logo
        sizes="(max-width: 640px) 60px, (max-width: 768px) 100px, 120px"
        className="object-contain"
      />
    </div>
  );
}
