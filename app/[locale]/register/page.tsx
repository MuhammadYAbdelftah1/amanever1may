import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد | أمان إيفر',
  description: 'سجل الآن كتاجر، طبيب، أو مسوق بالعمولة وانضم إلى شبكة أمان إيفر للرعاية الصحية الرقمية.',
  robots: 'noindex, nofollow',
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />

      <main id="main-content" className="min-h-screen bg-gradient-to-br from-[#F8FAFB] to-white pt-20">
        <div className="container mx-auto px-4 py-12 max-w-md">
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
