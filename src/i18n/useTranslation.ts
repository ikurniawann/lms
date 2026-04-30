'use client';

import { useState, useCallback } from 'react';
import idTranslations from './translations/id.json';
import enTranslations from './translations/en.json';

type Locale = 'id' | 'en';

const translations: Record<Locale, typeof idTranslations> = {
  id: idTranslations,
  en: enTranslations,
};

// Helper to get nested value by key path (e.g., "guru.menu.dashboard")
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function useTranslation(initialLocale: Locale = 'id') {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = useCallback(
    (key: string, defaultValue?: string) => {
      const value = getNestedValue(translations[locale], key);
      return value || defaultValue || key;
    },
    [locale]
  );

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => (prev === 'id' ? 'en' : 'id'));
  }, []);

  const setLanguage = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
  }, []);

  return {
    locale,
    t,
    toggleLanguage,
    setLanguage,
  };
}

// Export translations for server-side usage
export { idTranslations, enTranslations };
export type { Locale };
