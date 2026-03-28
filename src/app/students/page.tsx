'use client';

import { useState } from 'react';
import {
  Users, Plus, Search, Filter, Edit, Trash2, Download, Upload,
  ChevronLeft, ChevronRight, Eye, Mail, Phone, MapPin
, Menu, X } from 'lucide-react';

export default function ManajemenSiswa() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const students = [
    { id: 1, nis: '2024001', nisn: '0012345678', name: 'Ahmad Rizki', class: '8A', gender: 'L', birth_date: '2012-05-15', address: 'Jl. Merdeka No. 123', parent: 'Budi Santoso', phone: '0812-3456-7890', email: 'ahmad@example.com' },
    { id: 2, nis: '2024002', nisn: '0012345679', name: 'Siti Nurhaliza', class: '8A', gender: 'P', birth_date: '2012-06-20', address: 'Jl. Sudirman No. 45', parent: 'Ahmad Fauzi', phone: '0813-4567-8901', email: 'siti@example.com' },
    { id: 3, nis: '2024003', nisn: '0012345680', name: 'Budi Hartono', class: '8B', gender: 'L', birth_date: '2012-07-10', address: 'Jl. Gatot Subroto No. 78', parent: 'Siti Aminah', phone: '0814-5678-9012', email: 'budi@example.com' },
    { id: 4, nis: '2024004', nisn: '0012345681', name: 'Dewi Lestari', class: '8B', gender: 'P', birth_date: '2012-08-25', address: 'Jl. Ahmad Yani No. 90', parent: 'Dewi Sartika', phone: '0815-6789-0123', email: 'dewi@example.com' },
    { id: 5, nis: '2024005', nisn: '0012345682', name: 'Eko Prasetyo', class: '8C', gender: 'L', birth_date: '2012-09-05', address: 'Jl. Diponegoro No. 12', parent: 'Eko Widodo', phone: '0816-7890-1234', email: 'eko@example.com' },
  ];

  const classes = ['ALL', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  const filteredStudents = students.filter(student => {
    const searchMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nis.includes(searchTerm) ||
      student.nisn.includes(searchTerm);
    const classMatch = selectedClass === 'ALL' || student.class === selectedClass;
    return searchMatch && classMatch;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Same as Admin Dashboard */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/students" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Manajemen Siswa</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Manajemen Siswa</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daftar Siswa</h1>
            <p className="text-gray-600">Kelola data siswa, tambah, edit, atau hapus siswa.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
                <div className="p-3 rounded-lg bg-blue-50">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">1,234</div>
              <div className="text-sm text-gray-600">Total Siswa</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-50">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">612</div>
              <div className="text-sm text-gray-600">Siswa Laki-laki</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-50">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">622</div>
              <div className="text-sm text-gray-600">Siswa Perempuan</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-50">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">36</div>
              <div className="text-sm text-gray-600">Total Kelas</div>
            </div>
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
                    placeholder="Cari nama, NIS, atau NISN..."
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
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls === 'ALL' ? 'Semua Kelas' : `Kelas ${cls}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Import Excel</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Tambah Siswa</span>
                </button>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NIS/NISN</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama Lengkap</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">L/P</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">No. HP Orang Tua</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">{student.nis}</div>
                        <div className="text-xs text-gray-500">{student.nisn}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.parent}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {student.class}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          student.gender === 'L' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">{student.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
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

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredStudents.length)} dari {filteredStudents.length} siswa
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'bg-green-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
