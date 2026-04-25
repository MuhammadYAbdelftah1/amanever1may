import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, contactTopics } from "@/lib/contact/schema";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validatedData = contactFormSchema.parse(body);

    // Honeypot check (bot detection)
    if (validatedData.honeypot) {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Find routing email based on topic
    const topic = contactTopics.find((t) => t.id === validatedData.topic);
    const routeTo = topic?.routesTo || "info@amanever.com";

    // Prepare email data
    const emailData = {
      to: routeTo,
      subject: `رسالة جديدة من موقع أمان إيفر - ${topic?.ar || "استفسار عام"}`,
      from: validatedData.email || "noreply@amanever.com",
      replyTo: validatedData.email || undefined,
      body: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || "غير محدد",
        topic: topic?.ar || validatedData.topic,
        city: validatedData.city || "غير محدد",
        message: validatedData.message,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get("user-agent") || "Unknown",
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown",
      },
    };

    // TODO: Integrate with actual email service (SendGrid, AWS SES, Resend, etc.)
    // For now, log to console (replace with actual email sending)
    console.log("📧 Contact Form Submission:", emailData);

    // TODO: Optional - Store in database for backup/analytics
    // await db.contactSubmissions.create({ data: validatedData });

    // TODO: Optional - Send to CRM (HubSpot, Salesforce, etc.)
    // await sendToCRM(validatedData);

    // TODO: Optional - Send confirmation email to user
    // if (validatedData.email) {
    //   await sendConfirmationEmail(validatedData.email, validatedData.name);
    // }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "تم استلام رسالتك بنجاح. سنتواصل معك قريباً.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Server errors
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
