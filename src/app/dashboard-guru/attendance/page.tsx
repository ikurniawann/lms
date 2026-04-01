'use client';

import { useState } from 'react';
import { CheckSquare, Search, ChevronRight, FileText, Plus, Download, Calendar, Users } from 'lucide-react';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState('2026-03-28');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const attendanceData = [
    { id: 1, date: '28 Mar 2026', class: '7A', total: 32, present: 30, absent: 2, percentage: 93.8 },
    { id: 2, date: '28 Mar 2026', class: '7B', total: 30, present: 29, absent: 1, percentage: 96.7 },
    { id: 3, date: '28 Mar 2026', class: '8A', total: 31, present: 31, absent: 0, percentage: 100 },
    { id: 4, date: '28 Mar 2026', class: '8B', total: 29, present: 27, absent: 2, percentage: 93.1 },
    { id: 5, date: '27 Mar 2026', class: '7A', total: 32, present: 31, absent: 1, percentage: 96.9 },
    { id: 6, date: '27 Mar 2026', class: '7B', total: 30, present: 28, absent: 2, percentage: 93.3 },
    { id: 7, date: '27 Mar 2026', class: '8A', total: 31, present: 30, absent: 1, percentage: 96.8 },
    { id: 8, date: '27 Mar 2026', class: '8B', total: 29, present: 29, absent: 0, percentage: 100 },
  ];

  const filteredData = attendanceData.filter(a => {
    const matchClass = selectedClass === 'ALL' || a.class === selectedClass;
    return matchClass;
  });

  const statsCards = [
    { title: 'Total Kelas', value: '8', icon: Users, color: 'blue' },
    { title: 'Hadir Hari Ini', value: '245', icon: CheckSquare, color: 'green' },
    { title: 'Tidak Hadir', value: '3', icon: CheckSquare, color: 'red' },
    { title: 'Rata-rata %', value: '96.2%', icon: CheckSquare, color: 'orange' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/materi" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Materi Saya</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/tugas" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Tugas</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/ujian" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Ujian</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/buat-ujian" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Buat Ujian</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/students" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Siswa</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/attendance" className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg transition-all">
            <span className="font-medium text-sm">Absensi</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/grades" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Nilai</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-gray-900">Absensi</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Rekap Absensi</h1>
            <p className="text-gray-600">Kelola dan monitoring kehadiran siswa per kelas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                red: 'bg-red-50 text-red-600',
                orange: 'bg-orange-50 text-orange-600'
              };
              return (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.title}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ALL">Semua Kelas</option>
                  {classes.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Input Absensi</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Siswa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Hadir</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tidak Hadir</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((a) => (
                    <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6 text-sm text-gray-900">{a.date}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {a.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{a.total}</td>
                      <td className="py-4 px-6 text-sm font-medium text-green-600">{a.present}</td>
                      <td className="py-4 px-6 text-sm font-medium text-red-600">{a.absent}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${a.percentage >= 95 ? 'bg-green-500' : a.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${a.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900">{a.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="py-12 text-center">
                <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data absensi</h3>
                <p className="text-gray-500 mb-4">Tidak ditemukan data absensi dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
