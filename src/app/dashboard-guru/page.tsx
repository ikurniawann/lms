'use client';

import { useState } from 'react';
import {
  BookOpen, FileText, Users, CheckSquare, TrendingUp,
  Plus, Search, Bell, Settings, ChevronRight,
  Upload, Edit, Trash2, Eye
} from 'lucide-react';

export default function DashboardGuru() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: TrendingUp, label: 'Dashboard', href: '/dashboard-guru', active: true },
    { icon: BookOpen, label: 'Materi Saya', href: '/dashboard-guru/materi' },
    { icon: FileText, label: 'Tugas', href: '/dashboard-guru/tugas' },
    { icon: CheckSquare, label: 'Ujian', href: '/dashboard-guru/ujian' },
    { icon: Users, label: 'Siswa', href: '/dashboard-guru/students' },
    { icon: CheckSquare, label: 'Absensi', href: '/dashboard-guru/attendance' },
    { icon: TrendingUp, label: 'Nilai', href: '/dashboard-guru/grades' },
  ];

  const statsCards = [
    { title: 'Total Kelas', value: '8', change: '+2', icon: BookOpen, color: 'blue' },
    { title: 'Total Siswa', value: '248', change: '+12', icon: Users, color: 'green' },
    { title: 'Materi Diupload', value: '45', change: '+8', icon: Upload, color: 'purple' },
    { title: 'Tugas Diberikan', value: '23', change: '+5', icon: FileText, color: 'orange' },
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

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
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
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${item.active ? 'text-green-700' : 'text-gray-400'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <a href="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Pengaturan</span>
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
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari siswa, kelas, materi..."
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Guru</h1>
            <p className="text-gray-600">Kelola kelas, materi, tugas, dan nilai siswa.</p>
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button className="flex items-center justify-center space-x-2 p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Materi</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
              <FileText className="w-5 h-5" />
              <span className="font-medium">Buat Tugas</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30">
              <CheckSquare className="w-5 h-5" />
              <span className="font-medium">Buat Ujian</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Input Nilai</span>
            </button>
          </div>

          {/* My Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Kelas Saya</h3>
                <button className="text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                {myClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
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
                <button className="text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
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
              <button className="text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Terkumpul</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
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
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-50 rounded-lg transition-all">
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
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
