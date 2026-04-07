'use client';

import { useState } from 'react';
import { Users, Search, Eye, Edit, Plus, Trash2 } from 'lucide-react';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const students = [
    { id: 1, nis: '2024001', name: 'Ahmad Rizki', class: '7A', gender: 'L', avg: 85.5, attendance: 96, status: 'Aktif' },
    { id: 2, nis: '2024002', name: 'Siti Nurhaliza', class: '7A', gender: 'P', avg: 92.3, attendance: 98, status: 'Aktif' },
    { id: 3, nis: '2024003', name: 'Budi Santoso', class: '7A', gender: 'L', avg: 78.5, attendance: 90, status: 'Aktif' },
    { id: 4, nis: '2024004', name: 'Dewi Kusuma', class: '7B', gender: 'P', avg: 88.7, attendance: 95, status: 'Aktif' },
    { id: 5, nis: '2024005', name: 'Eko Prasetyo', class: '7B', gender: 'L', avg: 75.2, attendance: 88, status: 'Aktif' },
    { id: 6, nis: '2024006', name: 'Fitri Andayani', class: '8A', gender: 'P', avg: 94.1, attendance: 99, status: 'Aktif' },
  ];

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.nis.includes(searchTerm);
    const matchClass = selectedClass === 'ALL' || s.class === selectedClass;
    return matchSearch && matchClass;
  });

  const statsCards = [
    { title: 'Total Siswa', value: '248' },
    { title: 'Laki-laki', value: '128' },
    { title: 'Perempuan', value: '120' },
    { title: 'Rata-rata', value: '86.5' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Data Siswa</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola data siswa di kelas Anda.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Tambah Siswa
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NIS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rata-rata</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kehadiran</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-600">{s.nis}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        s.gender === 'L' ? 'bg-blue-500' : 'bg-pink-500'
                      }`}>
                        {s.name.charAt(0)}
                      </div>
                      <span className="font-medium text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{s.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-green-600">{s.avg}</td>
                  <td className="py-3 px-4 text-sm">{s.attendance}%</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-blue-50 rounded-lg" title="Lihat">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg" title="Hapus">
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
    </div>
  );
}
