import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Siswa - LMS Guru',
  description: 'Kelola data siswa',
};

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
