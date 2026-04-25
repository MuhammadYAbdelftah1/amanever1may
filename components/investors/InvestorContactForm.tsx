'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const investorFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  investmentSize: z.string().min(1, 'Please select investment size'),
  message: z.string().optional(),
});

type InvestorFormData = z.infer<typeof investorFormSchema>;

interface InvestorContactFormProps {
  isRTL?: boolean;
  translations: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    company: string;
    investmentSize: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    investmentSizes: {
      value: string;
      label: string;
    }[];
  };
}

export function InvestorContactForm({ isRTL = false, translations }: InvestorContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvestorFormData>({
    resolver: zodResolver(investorFormSchema),
  });

  const onSubmit = async (data: InvestorFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement actual API call
      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'deck_request_submitted', {
          investment_size: data.investmentSize,
          company: data.company,
        });
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-lg"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{translations.title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400">{translations.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {translations.name} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {translations.email} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {translations.company} <span className="text-red-500">*</span>
          </label>
          <input
            {...register('company')}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
            disabled={isSubmitting}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
          )}
        </div>

        {/* Investment Size */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {translations.investmentSize} <span className="text-red-500">*</span>
          </label>
          <select
            {...register('investmentSize')}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition"
            disabled={isSubmitting}
          >
            <option value="">Select...</option>
            {translations.investmentSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {errors.investmentSize && (
            <p className="text-red-500 text-sm mt-1">{errors.investmentSize.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2">{translations.message}</label>
          <textarea
            {...register('message')}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-[#4A8B8E] focus:border-transparent outline-none transition resize-none"
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#4A8B8E] hover:bg-[#3d7373] text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '...' : translations.submit}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200"
          >
            {translations.success}
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
          >
            {translations.error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
