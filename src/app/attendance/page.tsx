'use client';

import { useState } from 'react';
import {
  CheckSquare, Calendar, Users, TrendingUp, Search, Filter, Download,
  CheckCircle, XCircle, Clock, AlertCircle
, Menu, X } from 'lucide-react';

export default function RekapAbsensi() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');

  const attendanceStats = [
    { title: 'Rata-rata Kehadiran', value: '94.5%', change: '+2.1%', icon: TrendingUp, color: 'green' },
    { title: 'Hadir Hari Ini', value: '1,168', total: '1,234', icon: CheckCircle, color: 'blue' },
    { title: 'Sakit Hari Ini', value: '12', icon: AlertCircle, color: 'yellow' },
    { title: 'Izin Hari Ini', value: '8', icon: Clock, color: 'purple' },
  ];

  const classAttendance = [
    { class: '7A', students: 32, present: 30, sick: 1, permission: 1, absent: 0, percentage: 93.8 },
    { class: '7B', students: 30, present: 29, sick: 0, permission: 1, absent: 0, percentage: 96.7 },
    { class: '7C', students: 31, present: 31, sick: 0, permission: 0, absent: 0, percentage: 100 },
    { class: '8A', students: 32, present: 30, sick: 2, permission: 0, absent: 0, percentage: 93.8 },
    { class: '8B', students: 30, present: 28, sick: 1, permission: 1, absent: 0, percentage: 93.3 },
    { class: '8C', students: 31, present: 30, sick: 0, permission: 1, absent: 0, percentage: 96.8 },
    { class: '9A', students: 32, present: 32, sick: 0, permission: 0, absent: 0, percentage: 100 },
    { class: '9B', students: 30, present: 29, sick: 1, permission: 0, absent: 0, percentage: 96.7 },
    { class: '9C', students: 31, present: 30, sick: 1, permission: 0, absent: 0, percentage: 96.8 },
  ];

  const recentAbsences = [
    { id: 1, student: 'Ahmad Rizki', class: '8A', date: '28 Mar 2026', status: 'Sakit', description: 'Demam' },
    { id: 2, student: 'Siti Nurhaliza', class: '7A', date: '28 Mar 2026', status: 'Izin', description: 'Acara Keluarga' },
    { id: 3, student: 'Budi Hartono', class: '8A', date: '28 Mar 2026', status: 'Sakit', description: 'Flu' },
    { id: 4, student: 'Dewi Lestari', class: '7B', date: '28 Mar 2026', status: 'Izin', description: 'Sakit Gigi' },
    { id: 5, student: 'Eko Prasetyo', class: '9B', date: '27 Mar 2026', status: 'Sakit', description: 'Tipes' },
  ];

  const filteredAttendance = classAttendance.filter(item => 
    selectedClass === 'ALL' || item.class === selectedClass
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <CheckSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/students" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Siswa</span>
          </a>
          <a href="/teachers" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Guru</span>
          </a>
          <a href="/classes" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Kelas</span>
          </a>
          <a href="/attendance" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <CheckSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Absensi</span>
          </a>
          <a href="/finance" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Keuangan</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Rekap Absensi</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Rekap Absensi Siswa</h1>
            <p className="text-gray-600">Monitor kehadiran siswa per kelas dan rekap bulanan.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {attendanceStats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                green: 'bg-green-50 text-green-600',
                blue: 'bg-blue-50 text-blue-600',
                yellow: 'bg-yellow-50 text-yellow-600',
                purple: 'bg-purple-50 text-purple-600'
              };
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {stat.change && (
                      <span className="text-sm text-green-600 font-medium">↑ {stat.change}</span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                    {stat.total && <span className="text-sm text-gray-500">/{stat.total}</span>}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ALL">Semua Kelas</option>
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="7C">7C</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                  <option value="8C">8C</option>
                  <option value="9A">9A</option>
                  <option value="9B">9B</option>
                  <option value="9C">9C</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bulan</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-end">
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Class Attendance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Kehadiran Per Kelas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Siswa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Hadir</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Sakit</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Izin</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Alpa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((item) => (
                    <tr key={item.class} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {item.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.students}</td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-green-600">{item.present}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-yellow-600">{item.sick}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-purple-600">{item.permission}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-red-600">{item.absent}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div 
                              className={`h-2 rounded-full ${
                                item.percentage >= 95 ? 'bg-green-500' :
                                item.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Absences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Ketidakhadiran Terbaru</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentAbsences.map((absence) => (
                <div key={absence.id} className="p-4 hover:bg-gray-50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        absence.status === 'Sakit' ? 'bg-yellow-100' : 'bg-purple-100'
                      }`}>
                        {absence.status === 'Sakit' ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{absence.student}</div>
                        <div className="text-sm text-gray-500">Kelas {absence.class} • {absence.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        absence.status === 'Sakit' ? 'bg-yellow-100 text-yellow-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {absence.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{absence.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
