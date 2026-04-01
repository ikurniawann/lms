'use client';

import { useState } from 'react';
import { BookOpen, Plus, Search, Edit, Trash2, Download, Eye, FileText, Video, File } from 'lucide-react';

export default function MateriSaya() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const materials = [
    { id: 1, title: 'Aljabar Linear', class: '7A', subject: 'Matematika', type: 'PDF', size: '2.4 MB', downloads: 28 },
    { id: 2, title: 'Geometri Dasar', class: '7B', subject: 'Matematika', type: 'PPT', size: '5.1 MB', downloads: 25 },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', subject: 'Matematika', type: 'PDF', size: '3.2 MB', downloads: 30 },
    { id: 4, title: 'Fungsi Linear', class: '8B', subject: 'Matematika', type: 'Video', size: '45.8 MB', downloads: 42 },
    { id: 5, title: 'Statistika Dasar', class: '9A', subject: 'Matematika', type: 'PDF', size: '2.8 MB', downloads: 35 },
  ];

  const filteredMaterials = materials.filter(mat => {
    const searchMatch = mat.title.toLowerCase().includes(searchTerm.toLowerCase());
    const classMatch = selectedClass === 'ALL' || mat.class === selectedClass;
    return searchMatch && classMatch;
  });

  const statsCards = [
    { title: 'Total Materi', value: '45' },
    { title: 'Downloads', value: '1,234' },
    { title: 'PDF', value: '28' },
    { title: 'Video', value: '12' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-600" />;
      case 'PPT': return <FileText className="w-5 h-5 text-orange-600" />;
      case 'Video': return <Video className="w-5 h-5 text-blue-600" />;
      default: return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Materi Saya</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola materi pembelajaran untuk siswa.</p>
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
              placeholder="Cari judul materi..."
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
            <option value="7A">7A</option>
            <option value="7B">7B</option>
            <option value="8A">8A</option>
            <option value="8B">8B</option>
            <option value="9A">9A</option>
            <option value="9B">9B</option>
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Upload Materi
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tipe</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ukuran</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Downloads</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((mat) => (
                <tr key={mat.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">{getFileIcon(mat.type)}</div>
                      <span className="font-medium text-sm">{mat.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{mat.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{mat.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{mat.size}</td>
                  <td className="py-3 px-4 text-sm font-medium">{mat.downloads}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-blue-50 rounded-lg" title="Lihat">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg" title="Download">
                        <Download className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-yellow-50 rounded-lg" title="Edit">
                        <Edit className="w-4 h-4 text-yellow-600" />
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
