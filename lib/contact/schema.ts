import { z } from "zod";

export const contactTopics = [
  { id: "general", ar: "استفسار عام", routesTo: "info@amanever.com" },
  { id: "booking", ar: "حجز استشارة طبية", routesTo: "info@amanever.com" },
  { id: "membership", ar: "اشتراك أو باقة عضوية", routesTo: "info@amanever.com" },
  { id: "billing", ar: "فاتورة أو استرداد", routesTo: "info@amanever.com" },
  { id: "doctor", ar: "انضمام كطبيب", routesTo: "partnerships@amanever.com" },
  { id: "partner", ar: "شراكة B2B / منشأة طبية", routesTo: "partnerships@amanever.com" },
  { id: "affiliate", ar: "مسوّق بالعمولة", routesTo: "affiliates@amanever.com" },
  { id: "tech", ar: "مشكلة تقنية في التطبيق", routesTo: "info@amanever.com" },
  { id: "media", ar: "استفسار إعلامي / صحفي", routesTo: "info@amanever.com" },
  { id: "other", ar: "أخرى", routesTo: "info@amanever.com" },
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب (حرفان على الأقل)").max(80),
  phone: z.string().regex(/^(05|\+9665)\d{8}$/, "رقم جوال سعودي غير صالح"),
  email: z.string().email("بريد إلكتروني غير صالح").optional().or(z.literal("")),
  topic: z.enum(contactTopics.map((t) => t.id) as [string, ...string[]]),
  city: z.string().optional(),
  message: z
    .string()
    .min(10, "الرسالة قصيرة جداً (10 حروف على الأقل)")
    .max(2000, "الرسالة طويلة جداً"),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "يجب الموافقة على معالجة البيانات",
    }),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
