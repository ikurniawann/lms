'use client';

import { useState } from 'react';
import {
  School, Plus, Search, Users, Calendar, Clock, Edit, Trash2, Eye, User
} from 'lucide-react';

export default function ManajemenKelas() {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    { id: 1, name: '7A', grade: '7', capacity: 32, students: 32, wali: 'Budi Santoso, S.Pd', room: 'R.101', schedule: '07:00 - 14:00' },
    { id: 2, name: '7B', grade: '7', capacity: 30, students: 30, wali: 'Siti Aminah, S.Pd', room: 'R.102', schedule: '07:00 - 14:00' },
    { id: 3, name: '7C', grade: '7', capacity: 31, students: 31, wali: 'Dewi Lestari, S.Pd', room: 'R.103', schedule: '07:00 - 14:00' },
    { id: 4, name: '8A', grade: '8', capacity: 32, students: 31, wali: 'Ahmad Fauzi, S.Pd', room: 'R.201', schedule: '07:00 - 14:00' },
    { id: 5, name: '8B', grade: '8', capacity: 30, students: 29, wali: 'Eko Prasetyo, S.Pd', room: 'R.202', schedule: '07:00 - 14:00' },
    { id: 6, name: '8C', grade: '8', capacity: 31, students: 30, wali: 'Rina Wijaya, S.Pd', room: 'R.203', schedule: '07:00 - 14:00' },
    { id: 7, name: '9A', grade: '9', capacity: 32, students: 32, wali: 'Budi Santoso, S.Pd', room: 'R.301', schedule: '07:00 - 14:00' },
    { id: 8, name: '9B', grade: '9', capacity: 30, students: 28, wali: 'Siti Aminah, S.Pd', room: 'R.302', schedule: '07:00 - 14:00' },
    { id: 9, name: '9C', grade: '9', capacity: 31, students: 30, wali: 'Dewi Lestari, S.Pd', room: 'R.303', schedule: '07:00 - 14:00' },
  ];

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.wali.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.includes(searchTerm)
  );

  const statsCards = [
    { title: 'Total Kelas', value: '36', icon: School, color: 'blue' },
    { title: 'Kelas 7', value: '12', icon: Users, color: 'green' },
    { title: 'Kelas 8', value: '12', icon: Users, color: 'purple' },
    { title: 'Kelas 9', value: '12', icon: Users, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <School className="w-5 h-5" />
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
          <a href="/classes" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <School className="w-5 h-5" />
            <span className="font-medium text-sm">Kelas</span>
          </a>
          <a href="/attendance" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Clock className="w-5 h-5" />
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
            <h1 className="text-xl font-bold text-gray-900">Manajemen Kelas</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Kelas</h1>
            <p className="text-gray-600">Kelola kelas, wali kelas, dan kapasitas siswa.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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

          {/* Actions Bar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama kelas atau wali kelas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Tambah Kelas</span>
              </button>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <School className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Kelas {cls.name}</h3>
                      <p className="text-sm text-gray-500">Grade {cls.grade}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Wali Kelas:</span>
                    </span>
                    <span className="font-medium text-gray-900">{cls.wali}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Siswa:</span>
                    </span>
                    <span className="font-medium text-gray-900">{cls.students}/{cls.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Ruangan:</span>
                    </span>
                    <span className="font-medium text-gray-900">{cls.room}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Jadwal:</span>
                    </span>
                    <span className="font-medium text-gray-900">{cls.schedule}</span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Kapasitas</span>
                    <span>{Math.round((cls.students / cls.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        cls.students >= cls.capacity 
                          ? 'bg-red-500' 
                          : cls.students >= cls.capacity * 0.9 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>Detail</span>
                  </button>
                  <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
