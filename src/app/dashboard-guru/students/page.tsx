'use client';

import { useState } from 'react';
import { Users, Search, Eye, Edit, Plus, Trash2, Download, Upload, ChevronRight, FileText } from 'lucide-react';

export default function SiswaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  const students = [
    { id: 1, nis: '2024001', name: 'Ahmad Rizki', class: '7A', gender: 'L', avg: 85.5, attendance: 96, status: 'Aktif' },
    { id: 2, nis: '2024002', name: 'Siti Nurhaliza', class: '7A', gender: 'P', avg: 92.3, attendance: 98, status: 'Aktif' },
    { id: 3, nis: '2024003', name: 'Budi Santoso', class: '7A', gender: 'L', avg: 78.5, attendance: 90, status: 'Aktif' },
    { id: 4, nis: '2024004', name: 'Dewi Kusuma', class: '7B', gender: 'P', avg: 88.7, attendance: 95, status: 'Aktif' },
    { id: 5, nis: '2024005', name: 'Eko Prasetyo', class: '7B', gender: 'L', avg: 75.2, attendance: 88, status: 'Aktif' },
    { id: 6, nis: '2024006', name: 'Fitri Andayani', class: '8A', gender: 'P', avg: 94.1, attendance: 99, status: 'Aktif' },
    { id: 7, nis: '2024007', name: 'Galih Wicaksono', class: '8A', gender: 'L', avg: 81.3, attendance: 92, status: 'Aktif' },
    { id: 8, nis: '2024008', name: 'Hanifah Putri', class: '8B', gender: 'P', avg: 89.5, attendance: 97, status: 'Aktif' },
  ];

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.nis.includes(searchTerm);
    const matchClass = selectedClass === 'ALL' || s.class === selectedClass;
    return matchSearch && matchClass;
  });

  const statsCards = [
    { title: 'Total Siswa', value: '248', icon: Users, color: 'blue' },
    { title: 'Laki-laki', value: '128', icon: Users, color: 'green' },
    { title: 'Perempuan', value: '120', icon: Users, color: 'purple' },
    { title: 'Rata-rata Nilai', value: '86.5', icon: FileText, color: 'orange' },
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
          <a href="/dashboard-guru/students" className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg transition-all">
            <span className="font-medium text-sm">Siswa</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/attendance" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
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
          <h1 className="text-xl font-bold text-gray-900">Siswa</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          {</* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Siswa</h1>
            <p className="text-gray-600">Kelola data siswa di kelas Anda.</p>
          </div>

          {</* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                purple: 'bg-purple-50 text-purple-600',
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

          {</* Actions Bar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-3 flex-1">
                {</* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari nama atau NIS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {</* Class Filter */}
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

              {</* Add Button */}
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Tambah Siswa</span>
              </button>
            </div>
          </div>

          {</* Students Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NIS</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Gender</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Rata-rata</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kehadiran</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6 font-mono text-sm text-gray-600">{s.nis}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            s.gender === 'L' ? 'bg-blue-500' : 'bg-pink-500'
                          }`}>
                            {s.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {s.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                      <td className="py-4 px-6">
                        <span className={`font-bold ${s.avg >= 80 ? 'text-green-600' : s.avg >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {s.avg}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{s.attendance}%</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {</* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="py-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data siswa</h3>
                <p className="text-gray-500 mb-4">Tidak ditemukan siswa dengan filter yang dipilih.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
