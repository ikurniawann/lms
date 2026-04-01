'use client';

import { useState } from 'react';
import {
  BookOpen, FileText, Users, CheckSquare, TrendingUp,
  Plus, Search, Eye, Settings, ChevronRight,
  Upload, Edit, Trash2, Bell
} from 'lucide-react';

// Public Dashboard Guru - Tanpa Login
export default function PublicDashboardGuru() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { icon: TrendingUp, label: 'Dashboard', id: 'dashboard' },
    { icon: BookOpen, label: 'Materi', id: 'materi' },
    { icon: FileText, label: 'Tugas', id: 'tugas' },
    { icon: CheckSquare, label: 'Ujian', id: 'ujian' },
    { icon: Users, label: 'Siswa', id: 'siswa' },
    { icon: TrendingUp, label: 'Nilai', id: 'nilai' },
  ];

  const statsCards = [
    { title: 'Total Kelas', value: '8', icon: BookOpen, color: 'blue' },
    { title: 'Total Siswa', value: '248', icon: Users, color: 'green' },
    { title: 'Materi Diupload', value: '45', icon: Upload, color: 'purple' },
    { title: 'Tugas Diberikan', value: '23', icon: FileText, color: 'orange' },
  ];

  const myClasses = [
    { id: 1, name: '7A', subject: 'Matematika', students: 32, schedule: 'Sen, Rab 08:00' },
    { id: 2, name: '7B', subject: 'Matematika', students: 30, schedule: 'Sel, Kam 08:00' },
    { id: 3, name: '8A', subject: 'Matematika', students: 31, schedule: 'Sen, Rab 10:00' },
    { id: 4, name: '8B', subject: 'Matematika', students: 29, schedule: 'Sel, Kam 10:00' },
  ];

  const recentMaterials = [
    { id: 1, title: 'Aljabar Linear', class: '7A', uploaded: '2 jam lalu', downloads: 28 },
    { id: 2, title: 'Geometri Dasar', class: '7B', uploaded: '5 jam lalu', downloads: 25 },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', uploaded: '1 hari lalu', downloads: 30 },
  ];

  const recentAssignments = [
    { id: 1, title: 'Latihan Soal Bab 1', class: '7A', due: '2 Apr 2026', submitted: '28/32' },
    { id: 2, title: 'PR Geometri', class: '7B', due: '3 Apr 2026', submitted: '25/30' },
    { id: 3, title: 'Quiz Aljabar', class: '8A', due: '4 Apr 2026', submitted: '20/31' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Notice Banner */}
      <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm">
        <span className="font-semibold">👁️ Mode Public View</span> — Dashboard ini dapat diakses tanpa login. 
        <a href="/login" className="underline ml-2 hover:text-blue-200">Login untuk edit data</a>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            📍 Public View
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-green-700' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            );
          })}
        </nav>
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
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari siswa, kelas, materi... (Read-only)"
                  disabled
                  className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 hidden sm:inline">
                🔒 View Only Mode
              </span>
              <a 
                href="/login" 
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all"
              >
                Login
              </a>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Guru — Public View</h1>
            <p className="text-gray-600">Dashboard ini hanya untuk melihat data. Untuk mengedit, silakan login.</p>
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
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              );
            })}
          </div>

          {/* Login CTA Banner */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Ingin mengelola data ini?</h3>
                <p className="text-green-100 text-sm">Login untuk upload materi, input nilai, dan mengelola tugas.</p>
              </div>
              <a 
                href="/login"
                className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-all text-center"
              >
                Login Sekarang
              </a>
            </div>
          </div>

          {/* My Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Kelas Saya</h3>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded">View Only</span>
              </div>
              <div className="space-y-3">
                {myClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{classItem.name}</div>
                      <div className="text-sm text-gray-600">{classItem.subject} • {classItem.students} siswa</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{classItem.schedule}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Materials */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Materi Terbaru</h3>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded">View Only</span>
              </div>
              <div className="space-y-3">
                {recentMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{material.title}</div>
                        <div className="text-sm text-gray-600">Kelas {material.class}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{material.downloads} downloads</div>
                      <div className="text-xs text-gray-500">{material.uploaded}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Assignments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Tugas Terbaru</h3>
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded">View Only</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Terkumpul</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{assignment.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{assignment.class}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{assignment.due}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-green-600">{assignment.submitted}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">
              Dashboard ini ditampilkan dalam mode <strong>Public View</strong>. 
              Data di atas adalah contoh untuk keperluan demonstrasi.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Link public: <code className="bg-gray-200 px-2 py-1 rounded">/public/dashboard-guru</code>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
