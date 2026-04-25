import Link from 'next/link';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

export function ServiceCard({ icon, title, description, href, delay = 0 }: ServiceCardProps) {
  return (
    <Link 
      href={href} 
      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl block snap-center flex-shrink-0"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <Card className="w-[280px] md:w-[320px] h-[380px] md:h-[420px] overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/50 relative">
        {/* Image Container with Overlay */}
        <div className="relative h-[240px] md:h-[280px] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-8">
          <div className="relative w-full h-full">
            <Image
              src="/images/logo.png"
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <CardContent className="p-6 flex flex-col justify-center h-[140px]">
          <h3 className="text-xl font-bold text-center mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground text-center line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
