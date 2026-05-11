"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Phone,
  Mail,
  Tag,
  MapPin,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactFormSchema, contactTopics, type ContactFormValues } from "@/lib/contact/schema";
import { getSuccessMessageByTopic } from "@/lib/contact/topics";
import { knowledge } from "@/lib/knowledge";
import Link from "next/link";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      honeypot: "",
    },
  });

  // Watch message field for character count
  const messageValue = watch("message", "");
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Retry configuration
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          setSubmittedTopic(data.topic);
          setIsSuccess(true);
          reset();
          return; // Success, exit the retry loop
        } else {
          const error = await response.json();
          console.error("Form submission error:", error);
          
          if (attempt === maxRetries) {
            alert("حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.");
          }
        }
      } catch (error: any) {
        console.error(`Network error (attempt ${attempt}/${maxRetries}):`, error);
        
        if (attempt === maxRetries) {
          // Last attempt failed
          if (error.name === 'AbortError') {
            alert("انتهت مهلة الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
          } else {
            alert("تعذّر الإرسال. يرجى التحقق من اتصالك بالإنترنت أو راسلنا على واتساب.");
          }
        } else {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        }
      }
    }
    
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedTopic("");
    setCharCount(0);
    reset();
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center md:p-8">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" aria-hidden="true" />
        <h3 className="mb-2 text-2xl font-bold text-slate-900">وصلتنا رسالتك ✓</h3>
        <p className="mb-6 text-slate-600">
          {getSuccessMessageByTopic(submittedTopic)}
        </p>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          أرسل رسالة جديدة
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
      {/* Heading */}
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-slate-900">أرسل لنا رسالة</h2>
      </div>
      
      <p className="mb-6 text-sm text-slate-600">
        نرد على رسالتك خلال 15 دقيقة في ساعات العمل، أو خلال 24 ساعة كحد أقصى.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} aria-busy={isSubmitting} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User className="h-4 w-4" aria-hidden="true" />
            الاسم الكامل <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            dir="auto"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-emerald-500"
            }`}
            placeholder="مثال: أحمد محمد"
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Phone className="h-4 w-4" aria-hidden="true" />
            رقم الجوال <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-emerald-500"
            }`}
            placeholder="05xxxxxxxx"
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Mail className="h-4 w-4" aria-hidden="true" />
            البريد الإلكتروني (اختياري)
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            dir="ltr"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-emerald-500"
            }`}
            placeholder="example@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Topic */}
        <div>
          <label htmlFor="topic" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Tag className="h-4 w-4" aria-hidden="true" />
            موضوع التواصل <span className="text-red-600">*</span>
          </label>
          <select
            id="topic"
            aria-required="true"
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.topic
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-emerald-500"
            }`}
            {...register("topic")}
          >
            <option value="">اختر الموضوع</option>
            {contactTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.ar}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p id="topic-error" className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {errors.topic.message}
            </p>
          )}
        </div>

        {/* City (optional) */}
        <div>
          <label htmlFor="city" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            المدينة (اختياري)
          </label>
          <select
            id="city"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
            {...register("city")}
          >
            <option value="">اختر المدينة</option>
            {knowledge.network.cities.map((city) => (
              <option key={city.id} value={city.ar}>
                {city.ar}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            رسالتك <span className="text-red-600">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            dir="auto"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full rounded-lg border px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-300 focus:ring-red-500"
                : "border-slate-300 focus:ring-emerald-500"
            }`}
            placeholder="اكتب رسالتك هنا..."
            {...register("message", {
              onChange: (e) => setCharCount(e.target.value.length),
            })}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.message ? (
              <p id="message-error" className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
                {errors.message.message}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-500">
              <bdi>{messageValue.length}/2000</bdi>
            </span>
          </div>
        </div>

        {/* Honeypot (hidden) */}
        <input
          type="text"
          {...register("honeypot")}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              value="true"
              aria-required="true"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500"
              {...register("consent")}
            />
            <span className="text-sm text-slate-700">
              أوافق على معالجة بياناتي وفق{" "}
              <Link href="/ar/privacy" className="text-emerald-600 underline hover:text-emerald-700">
                سياسة الخصوصية
              </Link>{" "}
              وضوابط PDPL. <span className="text-red-600">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1 flex items-center gap-1 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              إرسال الرسالة
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
