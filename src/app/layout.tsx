import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
