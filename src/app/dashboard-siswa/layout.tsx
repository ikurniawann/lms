'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen, FileText, CheckSquare, Clock, TrendingUp,
  Menu, X, Settings, ChevronRight, GraduationCap, Globe
} from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function DashboardSiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const menuItems = [
    { icon: GraduationCap, label: t('siswa.menu.dashboard'), href: '/dashboard-siswa' },
    { icon: Clock, label: t('siswa.menu.attendance'), href: '/dashboard-siswa/absensi' },
    { icon: FileText, label: t('siswa.menu.schedule'), href: '/dashboard-siswa/jadwal' },
    { icon: BookOpen, label: t('siswa.menu.materials'), href: '/dashboard-siswa/materi' },
    { icon: TrendingUp, label: t('siswa.menu.grades'), href: '/dashboard-siswa/nilai' },
    { icon: FileText, label: t('siswa.menu.assignments'), href: '/dashboard-siswa/tugas' },
    { icon: CheckSquare, label: t('siswa.menu.exams'), href: '/dashboard-siswa/ujian' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">{t('siswa.title')}</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Toggle menu">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] lg:hidden overscroll-contain" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overscroll-contain ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Desktop Header */}
        <div className="hidden lg:flex h-16 items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">{t('siswa.title')}</span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">{t('common.menu')}</span>
          <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
              ST
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate">Ahmad Rizki</div>
              <div className="text-xs text-gray-500">Siswa • Kelas 10A</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-700' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-purple-700' : 'text-gray-400'}`} />
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
          <Link href="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">{t('common.settings')}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:pt-4 lg:ml-72 min-h-screen lg:pl-4">
        {children}
      </main>
    </div>
  );
}
