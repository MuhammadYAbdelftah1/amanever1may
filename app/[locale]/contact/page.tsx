import type { Metadata } from "next";
import React from "react";
import {
  ContactHero,
  EmergencyBanner,
  ContactChannels,
  ContactByAudience,
  ContactForm,
  ContactOffice,
  ContactSocials,
  ContactFAQTeaser,
} from "@/components/contact";
import { knowledge } from "@/lib/knowledge";
import { Header } from "@/components/layout/header";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "اتصل بنا | أمان إيفر",
    description:
      "تواصل مع أمان إيفر عبر الخط الساخن 920018041، واتساب، البريد الإلكتروني، أو زيارة مقرنا في جدة. ردنا خلال 15 دقيقة.",
    openGraph: {
      title: "اتصل بأمان إيفر",
      description: "نحن هنا لخدمتك — في أي وقت تحتاجنا.",
      images: ["/og/contact.png"],
      locale: "ar_SA",
    },
    alternates: { canonical: "https://amanever.com/ar/contact" },
  };
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = React.use(params);
  const { locale } = resolvedParams;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const { contact, brandName, address } = knowledge.organization;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: brandName,
      url: "https://amanever.com",
      logo: "https://amanever.com/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: address.ar,
        addressLocality: "Jeddah",
        addressCountry: "SA",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+966" + contact.hotline.replace(/^0/, ""),
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
          hoursAvailable: "Mo-Su 00:00-23:59",
        },
        {
          "@type": "ContactPoint",
          telephone: "+966" + contact.landline.replace(/^0/, ""),
          contactType: "customer service",
          areaServed: "SA",
          availableLanguage: ["Arabic"],
        },
        {
          "@type": "ContactPoint",
          email: contact.partnershipsEmail,
          contactType: "partnerships",
        },
        {
          "@type": "ContactPoint",
          email: contact.affiliatesEmail,
          contactType: "affiliate program",
        },
      ],
    },
  };

  return (
    <>
      <Header locale={locale} />
      
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        {/* Hero */}
        <ContactHero />

      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* Contact Channels */}
      <ContactChannels />

      {/* Contact by Audience */}
      <ContactByAudience />

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-16">
        <ContactForm />
      </section>

      {/* Office Location & Map */}
      <ContactOffice />

      {/* Social Media */}
      <ContactSocials />

      {/* FAQ Teaser */}
      <ContactFAQTeaser />
      </main>
    </>
  );
}
