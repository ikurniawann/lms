'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, School, FileText, Wallet,
  CheckSquare, Calendar, Award, BookOpen, CreditCard, UserCog, Megaphone, Settings,
  Menu, X, ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Siswa', href: '/dashboard/students' },
  { icon: GraduationCap, label: 'Guru', href: '/dashboard/teachers' },
  { icon: UserCheck, label: 'Orang Tua', href: '/dashboard/parents' },
  { icon: School, label: 'Kelas', href: '/dashboard/classes' },
  { icon: FileText, label: 'Ujian', href: '/dashboard/exams' },
  { icon: Wallet, label: 'Keuangan', href: '/dashboard/finance' },
  { icon: CheckSquare, label: 'Absensi', href: '/dashboard/attendance' },
  { icon: Calendar, label: 'Cuti', href: '/dashboard/leave' },
  { icon: Award, label: 'Sertifikat', href: '/dashboard/certificates' },
  { icon: BookOpen, label: 'Perpustakaan', href: '/dashboard/library' },
  { icon: CreditCard, label: 'Akun', href: '/dashboard/accounts' },
  { icon: UserCog, label: 'HRM', href: '/dashboard/hrm' },
  { icon: Megaphone, label: 'Pengumuman', href: '/dashboard/announcements' },
];

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[60] flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:flex h-16 items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate">Admin Sekolah</div>
              <div className="text-xs text-gray-500">SMPN 1 Jakarta</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-180px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-green-700' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-green-700' : 'text-gray-400'}`} />
              </a>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
          <a
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 lg:pt-4 lg:ml-72 min-h-screen lg:pl-4">
        {children}
      </main>
    </div>
  );
}
