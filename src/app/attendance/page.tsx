'use client';

import { useState } from 'react';
import {
  CheckSquare, QrCode, Users, Calendar, TrendingUp,
  Search, Filter, Download, Upload, ScanLine, Camera
} from 'lucide-react';

export default function AbsensiQR() {
  const [selectedClass, setSelectedClass] = useState('8A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceData = [
    { id: 1, nis: '2024001', name: 'Ahmad Rizki', class: '8A', check_in: '07:15', check_out: '15:30', status: 'Hadir', photo: true },
    { id: 2, nis: '2024002', name: 'Siti Nurhaliza', class: '8A', check_in: '07:20', check_out: '15:30', status: 'Hadir', photo: true },
    { id: 3, nis: '2024003', name: 'Budi Hartono', class: '8A', check_in: '07:35', check_out: '15:30', status: 'Terlambat', photo: true },
    { id: 4, nis: '2024004', name: 'Dewi Lestari', class: '8A', check_in: '-', check_out: '-', status: 'Sakit', photo: false },
    { id: 5, nis: '2024005', name: 'Eko Prasetyo', class: '8A', check_in: '-', check_out: '-', status: 'Izin', photo: false },
  ];

  const statsCards = [
    { title: 'Hadir', value: '28', total: '32', color: 'green', icon: CheckSquare },
    { title: 'Terlambat', value: '2', total: '32', color: 'yellow', icon: Calendar },
    { title: 'Sakit', value: '1', total: '32', color: 'blue', icon: Users },
    { title: 'Izin', value: '1', total: '32', color: 'purple', icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
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
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/attendance" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <CheckSquare className="w-5 h-5" />
            <span className="font-medium text-sm">Absensi QR</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Absensi QR Code</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Absensi QR Code</h1>
            <p className="text-gray-600">Scan QR code untuk absensi siswa secara otomatis.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-xl shadow-green-600/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <QrCode className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Scan QR Code</h3>
              <p className="text-sm text-green-100 mb-4">Scan QR code siswa untuk absensi otomatis</p>
              <button className="w-full bg-white text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all flex items-center justify-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Buka Kamera</span>
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Generate QR Siswa</h3>
              <p className="text-sm text-gray-600 mb-4">Download QR code per siswa</p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                Download QR
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Absensi Manual</h3>
              <p className="text-sm text-gray-600 mb-4">Upload file Excel absensi</p>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center justify-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Excel</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                green: 'bg-green-50 text-green-600',
                yellow: 'bg-yellow-50 text-yellow-600',
                blue: 'bg-blue-50 text-blue-600',
                purple: 'bg-purple-50 text-purple-600'
              };
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}/{stat.total}</div>
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
                  {['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'].map((cls) => (
                    <option key={cls} value={cls}>Kelas {cls}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all">
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NIS</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Check In</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Check Out</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Foto</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{student.nis}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{student.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{student.check_in}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{student.check_out}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          student.status === 'Hadir' ? 'bg-green-100 text-green-700' :
                          student.status === 'Terlambat' ? 'bg-yellow-100 text-yellow-700' :
                          student.status === 'Sakit' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {student.photo ? (
                          <span className="text-green-600 text-sm font-medium">✅ Ada</span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
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
