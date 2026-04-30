'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
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

interface LocaleContextType {
  locale: Locale;
  t: (key: string, defaultValue?: string) => string;
  toggleLanguage: () => void;
  setLanguage: (newLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Get initial locale from localStorage or default to 'id'
function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'id';
  const saved = localStorage.getItem('locale') as Locale;
  return saved || 'id';
}

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());

  // Save locale to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

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

  return (
    <LocaleContext.Provider value={{ locale, t, toggleLanguage, setLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }
  return context;
}

// Export for server-side usage
export { idTranslations, enTranslations };
export type { Locale };
