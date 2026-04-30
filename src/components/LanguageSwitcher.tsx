'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleLanguage = () => {
    const newLocale = locale === 'id' ? 'en' : 'id';
    
    // Untuk subdomain, kita set cookie dan redirect
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Redirect ke pathname yang sama dengan locale baru
    router.push(pathname);
    router.refresh();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      title={locale === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {locale === 'id' ? 'EN' : 'ID'}
      </span>
    </button>
  );
}
