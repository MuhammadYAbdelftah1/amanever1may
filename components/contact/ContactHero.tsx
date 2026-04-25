"use client";

import Link from "next/link";
import { Phone, MessageCircle, ShieldCheck, Lock, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { knowledge } from "@/lib/knowledge";

export function ContactHero() {
  const { contact } = knowledge.organization;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-16 md:py-24 mt-20 md:mt-24">
      {/* Abstract dotted pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #10b981 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
            نحن هنا لخدمتك — في أي وقت تحتاجنا
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-lg text-slate-600 md:text-xl">
            اختر الطريقة الأنسب للتواصل معنا، وراح يصلك ردنا خلال 15 دقيقة في
            ساعات العمل.
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
            >
              <Link href={`tel:${contact.hotline}`}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                اتصل بنا
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 sm:w-auto"
            >
              <Link
                href={contact.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                محادثة واتساب
              </Link>
            </Button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5 text-sm text-slate-700">
              <ShieldCheck
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              />
              متاح 24/7 لخط الطوارئ الطبية
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5 text-sm text-slate-700">
              <Lock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              بياناتك محمية وفق PDPL
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5 text-sm text-slate-700">
              <Clock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              متوسط الرد: أقل من 15 دقيقة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
