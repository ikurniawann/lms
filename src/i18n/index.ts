// Central i18n export
export { LocaleProvider, useTranslation } from './LocaleContext';
export type { Locale } from './LocaleContext';

// Re-export translations for direct import if needed
import idTranslations from './translations/id.json';
import enTranslations from './translations/en.json';

export { idTranslations, enTranslations };

export const translations = {
  id: idTranslations,
  en: enTranslations,
};
