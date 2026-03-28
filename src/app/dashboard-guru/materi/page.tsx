'use client';

import { useState } from 'react';
import {
  BookOpen, Plus, Search, Filter, Edit, Trash2, Download, Upload, Eye,
  FileText, Video, Image, File
} from 'lucide-react';

export default function MateriSaya() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  const materials = [
    { id: 1, title: 'Aljabar Linear', class: '7A', subject: 'Matematika', type: 'PDF', size: '2.4 MB', uploaded: '2 jam lalu', downloads: 28 },
    { id: 2, title: 'Geometri Dasar', class: '7B', subject: 'Matematika', type: 'PPT', size: '5.1 MB', uploaded: '5 jam lalu', downloads: 25 },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', subject: 'Matematika', type: 'PDF', size: '3.2 MB', uploaded: '1 hari lalu', downloads: 30 },
    { id: 4, title: 'Fungsi Linear', class: '8B', subject: 'Matematika', type: 'Video', size: '45.8 MB', uploaded: '2 hari lalu', downloads: 42 },
    { id: 5, title: 'Statistika Dasar', class: '9A', subject: 'Matematika', type: 'PDF', size: '2.8 MB', uploaded: '3 hari lalu', downloads: 35 },
    { id: 6, title: 'Peluang', class: '9B', subject: 'Matematika', type: 'PPT', size: '4.5 MB', uploaded: '4 hari lalu', downloads: 28 },
  ];

  const filteredMaterials = materials.filter(mat => {
    const searchMatch = mat.title.toLowerCase().includes(searchTerm.toLowerCase());
    const classMatch = selectedClass === 'ALL' || mat.class === selectedClass;
    const subjectMatch = selectedSubject === 'ALL' || mat.subject === selectedSubject;
    return searchMatch && classMatch && subjectMatch;
  });

  const statsCards = [
    { title: 'Total Materi', value: '45', change: '+8', icon: BookOpen, color: 'blue' },
    { title: 'Total Downloads', value: '1,234', change: '+156', icon: Download, color: 'green' },
    { title: 'PDF', value: '28', icon: FileText, color: 'purple' },
    { title: 'Video', value: '12', icon: Video, color: 'orange' },
  ];

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="w-5 h-5" />;
      case 'PPT': return <FileText className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Image': return <Image className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const getFileColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-600';
      case 'PPT': return 'bg-orange-100 text-orange-600';
      case 'Video': return 'bg-blue-100 text-blue-600';
      case 'Image': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Same as Dashboard Guru */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </div>
          </a>
          <a href="/dashboard-guru/materi" className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Materi Saya</span>
            </div>
          </a>
          <a href="/dashboard-guru/tugas" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium text-sm">Tugas</span>
            </div>
          </a>
          <a href="/dashboard-guru/ujian" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium text-sm">Ujian</span>
            </div>
          </a>
          <a href="/dashboard-guru/students" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Siswa</span>
            </div>
          </a>
          <a href="/dashboard-guru/attendance" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Absensi</span>
            </div>
          </a>
          <a href="/dashboard-guru/grades" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Nilai</span>
            </div>
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <a href="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">Pengaturan</span>
          </a>
          <a href="/logout" className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">Keluar</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari siswa, kelas, materi..."
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Materi Saya</h1>
            <p className="text-gray-600">Kelola materi pembelajaran untuk siswa.</p>
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
                    {stat.change && (
                      <span className="text-sm text-green-600 font-medium">↑ {stat.change}</span>
                    )}
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
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari judul materi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Class Filter */}
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

                {/* Subject Filter */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ALL">Semua Mapel</option>
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">IPA</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                </select>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Upload Materi</span>
              </button>
            </div>
          </div>

          {/* Materials Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Judul</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mapel</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tipe</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ukuran</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Downloads</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Diupload</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((mat) => (
                    <tr key={mat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getFileColor(mat.type)}`}>
                            {getFileIcon(mat.type)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{mat.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {mat.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{mat.subject}</td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">{mat.type}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{mat.size}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{mat.downloads}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{mat.uploaded}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Download">
                            <Download className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-yellow-50 rounded-lg transition-all" title="Edit">
                            <Edit className="w-4 h-4 text-yellow-600" />
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
        </main>
      </div>
    </div>
  );
}
