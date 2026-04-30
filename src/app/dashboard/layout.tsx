'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, School,
  Menu, X, Settings, ChevronRight, BookOpen, Globe
} from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function DashboardAdminLayout({
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
    { icon: LayoutDashboard, label: t('admin.menu.dashboard'), href: '/dashboard' },
    { icon: Users, label: t('admin.menu.students'), href: '/dashboard/students' },
    { icon: GraduationCap, label: t('admin.menu.teachers'), href: '/dashboard/teachers' },
    { icon: UserCheck, label: t('admin.menu.parents'), href: '/dashboard/parents' },
    { icon: School, label: t('admin.menu.classes'), href: '/dashboard/classes' },
    { icon: Users, label: t('admin.menu.attendance'), href: '/dashboard/attendance' },
    { icon: BookOpen, label: t('admin.menu.exams'), href: '/dashboard/exams' },
    { icon: Users, label: t('admin.menu.finance'), href: '/dashboard/finance' },
    { icon: Users, label: t('admin.menu.leave'), href: '/dashboard/leave' },
    { icon: Users, label: t('admin.menu.announcements'), href: '/dashboard/announcements' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">{t('admin.title')}</span>
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">{t('admin.title')}</span>
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate">Admin Sekolah</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
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
