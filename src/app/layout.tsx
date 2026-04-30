import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LMS Sekolah - Platform Manajemen Sekolah Modern',
  description: 'LMS lengkap untuk SD/SMP Negeri. Kelola belajar, absensi, keuangan, dan komunikasi dalam satu platform modern.',
  keywords: 'LMS, sekolah, pendidikan, SD, SMP, manajemen sekolah, belajar online',
  authors: [{ name: 'LMS Sekolah' }],
  openGraph: {
    title: 'LMS Sekolah - Platform Manajemen Sekolah Modern',
    description: 'LMS lengkap untuk SD/SMP Negeri. Kelola belajar, absensi, keuangan, dan komunikasi dalam satu platform modern.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
