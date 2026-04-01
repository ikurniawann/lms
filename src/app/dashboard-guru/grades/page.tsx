'use client';

import { useState } from 'react';
import { TrendingUp, Search, Plus, Download, Edit, Eye, Trash2 } from 'lucide-react';

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const gradesData = [
    { id: 1, nis: '2024001', student: 'Ahmad Rizki', class: '7A', tugas: 85, uts: 88, uas: 87, avg: 86.7, grade: 'B', status: 'Lulus' },
    { id: 2, nis: '2024002', student: 'Siti Nurhaliza', class: '7A', tugas: 92, uts: 95, uas: 94, avg: 93.7, grade: 'A', status: 'Lulus' },
    { id: 3, nis: '2024003', student: 'Budi Santoso', class: '7A', tugas: 78, uts: 82, uas: 75, avg: 78.3, grade: 'C', status: 'Lulus' },
    { id: 4, nis: '2024004', student: 'Dewi Kusuma', class: '7B', tugas: 88, uts: 90, uas: 88, avg: 88.7, grade: 'B', status: 'Lulus' },
    { id: 5, nis: '2024005', student: 'Eko Prasetyo', class: '7B', tugas: 75, uts: 78, uas: 73, avg: 75.3, grade: 'C', status: 'Lulus' },
    { id: 6, nis: '2024006', student: 'Fitri Andayani', class: '8A', tugas: 95, uts: 98, uas: 96, avg: 96.3, grade: 'A', status: 'Lulus' },
    { id: 7, nis: '2024007', student: 'Galih Wicaksono', class: '8A', tugas: 82, uts: 85, uas: 80, avg: 82.3, grade: 'B', status: 'Lulus' },
    { id: 8, nis: '2024008', student: 'Hanifah Putri', class: '8B', tugas: 90, uts: 92, uas: 91, avg: 91.0, grade: 'A', status: 'Lulus' },
  ];

  const filteredData = gradesData.filter(g => {
    const matchSearch = g.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        g.nis.includes(searchTerm);
    const matchClass = selectedClass === 'ALL' || g.class === selectedClass;
    return matchSearch && matchClass;
  });

  const statsCards = [
    { title: 'Total Siswa', value: '248', icon: TrendingUp, color: 'blue' },
    { title: 'Rata-rata Kelas', value: '86.5', icon: TrendingUp, color: 'green' },
    { title: 'Grade A', value: '45', icon: TrendingUp, color: 'purple' },
    { title: 'Perlu Remedial', value: '8', icon: TrendingUp, color: 'orange' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-yellow-100 text-yellow-700';
      case 'D': return 'bg-orange-100 text-orange-700';
      case 'E': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAverageColor = (avg: number) => {
    if (avg >= 85) return 'text-green-600';
    if (avg >= 70) return 'text-blue-600';
    if (avg >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Input & Kelola Nilai</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola nilai siswa untuk tugas, UTS, dan UAS.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
          };
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
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
                <option key={c} value={c}>Kelas {c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all text-sm">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm">
              <Plus className="w-4 h-4" />
              <span>Tambah Nilai</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NIS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Tugas</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">UTS</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">UAS</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Rata-rata</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((g) => (
                <tr key={g.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm text-gray-600">{g.nis}</td>
                  <td className="py-3 px-4 font-medium text-sm">{g.student}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{g.class}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-sm">{g.tugas}</td>
                  <td className="py-3 px-4 text-center text-sm">{g.uts}</td>
                  <td className="py-3 px-4 text-center text-sm">{g.uas}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-bold text-sm ${getAverageColor(g.avg)}`}>{g.avg}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(g.grade)}`}>{g.grade}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{g.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
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
