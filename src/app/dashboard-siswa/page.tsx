'use client';

import { useState } from 'react';
import {
  BookOpen, Calendar, FileText, CheckSquare, TrendingUp,
  Bell, Settings, LogOut, ChevronRight, Download, Clock, Award
} from 'lucide-react';

export default function DashboardSiswa() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: TrendingUp, label: 'Dashboard', href: '/dashboard-siswa', active: true },
    { icon: Calendar, label: 'Jadwal', href: '/dashboard-siswa/schedule' },
    { icon: BookOpen, label: 'Materi', href: '/dashboard-siswa/materi' },
    { icon: FileText, label: 'Tugas', href: '/dashboard-siswa/tugas' },
    { icon: CheckSquare, label: 'Ujian', href: '/dashboard-siswa/ujian' },
    { icon: TrendingUp, label: 'Nilai', href: '/dashboard-siswa/nilai' },
    { icon: CheckSquare, label: 'Absensi', href: '/dashboard-siswa/attendance' },
  ];

  const statsCards = [
    { title: 'Rata-rata Nilai', value: '87.5', change: '+2.3', icon: TrendingUp, color: 'blue' },
    { title: 'Tugas Selesai', value: '18/20', change: '+3', icon: CheckSquare, color: 'green' },
    { title: 'Kehadiran', value: '96%', change: '+1%', icon: Clock, color: 'purple' },
    { title: 'Penghargaan', value: '5', change: '+1', icon: Award, color: 'orange' },
  ];

  const schedule = [
    { day: 'Senin', subjects: ['Matematika (08:00)', 'IPA (10:00)', 'Bahasa Indonesia (13:00)'] },
    { day: 'Selasa', subjects: ['IPA (08:00)', 'IPS (10:00)', 'Bahasa Inggris (13:00)'] },
    { day: 'Rabu', subjects: ['Matematika (08:00)', 'PJOK (10:00)', 'Seni Budaya (13:00)'] },
    { day: 'Kamis', subjects: ['Bahasa Indonesia (08:00)', 'IPA (10:00)', 'PKN (13:00)'] },
    { day: 'Jumat', subjects: ['Upacara (07:00)', 'Agama (09:00)', 'BK (10:00)'] },
  ];

  const recentMaterials = [
    { id: 1, subject: 'Matematika', title: 'Aljabar Linear', teacher: 'Budi Santoso, S.Pd', uploaded: '2 jam lalu' },
    { id: 2, subject: 'IPA', title: 'Sistem Pencernaan', teacher: 'Siti Aminah, S.Pd', uploaded: '5 jam lalu' },
    { id: 3, subject: 'Bahasa Indonesia', title: 'Teks Eksposisi', teacher: 'Dewi Lestari, S.Pd', uploaded: '1 hari lalu' },
  ];

  const upcomingAssignments = [
    { id: 1, subject: 'Matematika', title: 'Latihan Soal Bab 1', due: '2 Apr 2026', status: 'Belum dikerjakan' },
    { id: 2, subject: 'IPA', title: 'PR Sistem Pencernaan', due: '3 Apr 2026', status: 'Belum dikerjakan' },
    { id: 3, subject: 'Bahasa Inggris', title: 'Essay about Family', due: '4 Apr 2026', status: 'Sudah dikerjakan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Siswa</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              AR
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Ahmad Rizki</div>
              <div className="text-xs text-gray-500">Kelas 8A • NIS: 12345</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${item.active ? 'text-blue-700' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <a href="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all mb-1">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Pengaturan</span>
          </a>
          <a href="/logout" className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Keluar</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
                <BookOpen className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Siswa</h1>
            <p className="text-gray-600">Pantau jadwal, materi, tugas, dan nilai kamu.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                purple: 'bg-purple-50 text-purple-600',
                orange: 'bg-orange-50 text-orange-600'
              };
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">↑ {stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              );
            })}
          </div>

          {/* Schedule & Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Jadwal Pelajaran</h3>
                <button className="text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                {schedule.slice(0, 5).map((day, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2">{day.day}</div>
                    <div className="space-y-1">
                      {day.subjects.map((subject, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          <span>{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Materials */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Materi Terbaru</h3>
                <button className="text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                {recentMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{material.title}</div>
                        <div className="text-sm text-gray-600">{material.subject} • {material.teacher}</div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-all">
                      <Download className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Tugas Mendatang</h3>
              <button className="text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mata Pelajaran</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{assignment.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{assignment.subject}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{assignment.due}</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          assignment.status === 'Sudah dikerjakan'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm text-blue-600 hover:underline font-medium">
                          {assignment.status === 'Sudah dikerjakan' ? 'Lihat' : 'Kerjakan'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
