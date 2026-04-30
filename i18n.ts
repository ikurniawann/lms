import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Validasi locales yang supported
export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];

// Middleware akan set locale ini di request
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
