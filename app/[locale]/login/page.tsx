import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'تسجيل الدخول | أمان إيفر',
  description: 'سجل دخولك إلى حسابك في أمان إيفر. دخول المشتركين، الأطباء، التجار، والمسوقين بالعمولة.',
  robots: 'noindex, nofollow', // منع الفهرسة لصفحات تسجيل الدخول
};

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { locale } = await params;
  const { type } = await searchParams;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />

      <main id="main-content" className="min-h-screen bg-gradient-to-br from-[#F8FAFB] to-white pt-20">
        <div className="container mx-auto px-4 py-12 max-w-md">
          <LoginForm initialTab={type as any} />
        </div>
      </main>
    </>
  );
}
