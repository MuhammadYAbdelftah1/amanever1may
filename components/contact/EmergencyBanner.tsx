"use client";

import Link from "next/link";
import { AlertTriangle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmergencyBanner() {
  return (
    <section
      className="container mx-auto px-4 py-8"
      role="alert"
      aria-live="polite"
    >
      <div className="rounded-2xl border-s-4 border-red-600 bg-red-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <AlertTriangle
              className="h-6 w-6 flex-shrink-0 text-red-600"
              aria-hidden="true"
            />
            <div>
              <h2 className="mb-2 text-lg font-bold text-red-900">
                هذه الصفحة ليست للحالات الطارئة
              </h2>
              <p className="text-sm text-red-800">
                إذا كنت تواجه حالة طبية طارئة، يرجى الاتصال فوراً على:
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <Link href="tel:997">
                <Phone className="h-5 w-5" aria-hidden="true" />
                الهلال الأحمر — 997
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50"
            >
              <Link href="tel:911">
                <Phone className="h-5 w-5" aria-hidden="true" />
                الطوارئ الموحد — 911
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
