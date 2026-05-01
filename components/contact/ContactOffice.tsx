"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { knowledge } from "@/lib/knowledge";

export function ContactOffice() {
  const { address, officeHours } = knowledge.organization;
  
  // Google Maps embed URL (replace with actual coordinates)
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.6!2d39.1925!3d21.5433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDMyJzM1LjkiTiAzOcKwMTEnMzMuMCJF!5e0!3m2!1sen!2ssa!4v1234567890";
  
  const googleMapsUrl = "https://goo.gl/maps/amanever"; // Replace with actual link

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Office Info */}
        <div>
          {/* Heading */}
          <div className="mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-slate-900">مقرنا الرئيسي</h2>
          </div>

          {/* Address */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {/* Image Banner */}
            <div className="w-full h-28 md:h-32 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                <div className="text-xs font-bold text-emerald-700 mb-1">
                  للمصممة
                </div>
                <div className="text-[10px] text-emerald-600 mb-1 px-2 leading-tight">
                  العنوان
                </div>
                <div className="text-[9px] text-gray-500 font-semibold mb-0.5">
                  Desktop: Full Width × 128px
                </div>
                <div className="text-[8px] text-gray-500">
                  Mobile: Full Width × 112px
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">العنوان</h3>
              <p className="mb-4 text-slate-700">{address.full}</p>
              <p className="text-sm text-slate-600">{address.ar}</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {/* Image Banner */}
            <div className="w-full h-28 md:h-32 overflow-hidden bg-emerald-50 relative border-b-2 border-dashed border-emerald-300">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                <div className="text-xs font-bold text-emerald-700 mb-1">
                  للمصممة
                </div>
                <div className="text-[10px] text-emerald-600 mb-1 px-2 leading-tight">
                  ساعات العمل
                </div>
                <div className="text-[9px] text-gray-500 font-semibold mb-0.5">
                  Desktop: Full Width × 128px
                </div>
                <div className="text-[8px] text-gray-500">
                  Mobile: Full Width × 112px
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-slate-900">ساعات العمل</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">الأحد - الخميس</span>
                  <span className="font-medium text-slate-900">
                    <bdi>9:00 ص - 6:00 م</bdi>
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">الجمعة - السبت</span>
                  <span className="font-medium text-red-600">مغلق</span>
                </div>
                
                <div className="mt-4 rounded-lg bg-emerald-50 p-3">
                  <p className="text-sm font-medium text-emerald-800">
                    {officeHours.emergency}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Directions Button */}
          <Button
            asChild
            size="lg"
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" />
              احصل على الاتجاهات
            </a>
          </Button>
        </div>

        {/* Right: Map */}
        <div className="relative h-[400px] overflow-hidden rounded-2xl border border-slate-200 lg:h-auto">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع أمان إيفر على الخريطة"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
