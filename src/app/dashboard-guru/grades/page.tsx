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
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Nilai</h1>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all text-sm">
            <Download className="w-4 h-4" />
            <span className="font-medium hidden sm:inline">Export</span>
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Input & Kelola Nilai</h1>
          <p className="text-sm sm:text-base text-gray-600">Kelola nilai siswa untuk tugas, UTS, dan UAS.</p>
        </div>

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
              <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
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

            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-sm">
              <Plus className="w-4 h-4" />
              <span className="font-medium">Input Nilai</span>
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">NIS</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">Nama</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">Kelas</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">Tugas</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">UTS</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">UAS</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">Rata-rata</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">Grade</th>
                  <th className="text-left py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((g) => (
                  <tr key={g.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-3 px-4 lg:py-4 lg:px-6 font-mono text-xs lg:text-sm text-gray-600">{g.nis}</td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-xs lg:text-sm font-bold">
                          {g.student.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 text-xs lg:text-sm">{g.student}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <span className="px-2 py-1 lg:px-3 lg:py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {g.class}
                      </span>
                    </td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm text-gray-600">{g.tugas}</td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm text-gray-600">{g.uts}</td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6 text-xs lg:text-sm text-gray-600">{g.uas}</td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <span className={`font-bold text-xs lg:text-sm ${getAverageColor(g.avg)}`}>
                        {g.avg}
                      </span>
                    </td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <span className={`px-2 py-1 lg:px-3 lg:py-1 text-xs font-medium rounded-full ${getGradeColor(g.grade)}`}>
                        {g.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 lg:py-4 lg:px-6">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 lg:p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail">
                          <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600" />
                        </button>
                        <button className="p-1.5 lg:p-2 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                          <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-600" />
                        </button>
                        <button className="p-1.5 lg:p-2 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                          <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredData.map((g) => (
            <div key={g.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {g.student.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{g.student}</div>
                    <div className="text-xs text-gray-500 font-mono">{g.nis}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-1.5 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                    <Edit className="w-4 h-4 text-green-600" />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Kelas</div>
                  <div className="font-medium text-sm text-blue-700">{g.class}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500">Grade</div>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getGradeColor(g.grade)}`}>
                    {g.grade}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Tugas</div>
                  <div className="font-semibold text-sm text-gray-700">{g.tugas}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">UTS</div>
                  <div className="font-semibold text-sm text-gray-700">{g.uts}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">UAS</div>
                  <div className="font-semibold text-sm text-gray-700">{g.uas}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Rata-rata</div>
                  <div className={`font-bold text-sm ${getAverageColor(g.avg)}`}>{g.avg}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="py-12 text-center bg-white rounded-xl shadow-sm border border-gray-100">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data nilai</h3>
            <p className="text-gray-500 mb-4 px-4 text-sm">Tidak ditemukan data nilai dengan filter yang dipilih.</p>
          </div>
        )}
      </main>
    </div>
  );
}
