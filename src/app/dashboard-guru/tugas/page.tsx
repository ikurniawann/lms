'use client';

import { useState } from 'react';
import { 
  FileText, Plus, Search, Calendar, Clock, Users, CheckCircle, 
  Edit, Trash2, Eye, Download, ChevronRight 
} from 'lucide-react';

export default function TugasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const assignments = [
    { id: 1, title: 'Latihan Soal Bab 1', class: '7A', subject: 'Matematika', due: '2 Apr 2026', submitted: '28/32', status: 'Active' },
    { id: 2, title: 'PR Geometri', class: '7B', subject: 'Matematika', due: '3 Apr 2026', submitted: '25/30', status: 'Active' },
    { id: 3, title: 'Quiz Aljabar', class: '8A', subject: 'Matematika', due: '4 Apr 2026', submitted: '20/31', status: 'Active' },
    { id: 4, title: 'Tugas Persamaan Kuadrat', class: '8B', subject: 'Matematika', due: '25 Mar 2026', submitted: '29/29', status: 'Selesai' },
  ];

  const filteredAssignments = assignments.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'ALL' || a.class === selectedClass;
    return matchSearch && matchClass;
  });

  const statsCards = [
    { title: 'Total Tugas', value: '23', icon: FileText, color: 'blue' },
    { title: 'Tugas Aktif', value: '12', icon: Clock, color: 'green' },
    { title: 'Rata-rata Submit', value: '87%', icon: CheckCircle, color: 'purple' },
    { title: 'Total Siswa', value: '248', icon: Users, color: 'orange' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Manajemen Tugas</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola tugas dan PR untuk siswa.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-50 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tugas..."
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

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Buat Tugas</span>
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {filteredAssignments.map((a) => (
          <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className="font-medium text-gray-900 text-sm">{a.title}</div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                a.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {a.status}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{a.class}</span>
              <span className="text-xs text-gray-500">{a.subject}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{a.due}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="text-green-600 font-medium">{a.submitted}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-white border border-gray-200 rounded-lg text-xs font-medium">
                <Eye className="w-3 h-3" /> Lihat
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-white border border-gray-200 rounded-lg text-xs font-medium">
                <Edit className="w-3 h-3" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Terkumpul</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{a.title}</div>
                    <div className="text-xs text-gray-500">{a.subject}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">{a.class}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{a.due}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-green-600">{a.submitted}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      a.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat">
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
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada tugas</h3>
          <p className="text-gray-500 mb-4">Tidak ditemukan tugas dengan filter yang dipilih.</p>
        </div>
      )}
    </div>
  );
}
