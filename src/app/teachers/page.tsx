'use client';

import { useState } from 'react';
import {
  GraduationCap, Plus, Search, Filter, Edit, Trash2, Download, Upload,
  ChevronLeft, ChevronRight, Eye, Mail, Phone, Calendar, BookOpen
} from 'lucide-react';

export default function ManajemenGuru() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  const teachers = [
    { id: 1, nip: '199001012020011001', name: 'Budi Santoso, S.Pd', subject: 'Matematika', email: 'budi@smpn1.sch.id', phone: '0812-3456-7890', classes: '7A, 7B, 8A, 8B' },
    { id: 2, nip: '199002022020022002', name: 'Siti Aminah, S.Pd', subject: 'IPA', email: 'siti@smpn1.sch.id', phone: '0813-4567-8901', classes: '7A, 7B, 8A, 8B' },
    { id: 3, nip: '199003032020033003', name: 'Dewi Lestari, S.Pd', subject: 'Bahasa Indonesia', email: 'dewi@smpn1.sch.id', phone: '0814-5678-9012', classes: '7A, 7B, 7C, 8A' },
    { id: 4, nip: '199004042020044004', name: 'Ahmad Fauzi, S.Pd', subject: 'Bahasa Inggris', email: 'ahmad@smpn1.sch.id', phone: '0815-6789-0123', classes: '7A, 7B, 8A, 8B' },
    { id: 5, nip: '199005052020055005', name: 'Eko Prasetyo, S.Pd', subject: 'IPS', email: 'eko@smpn1.sch.id', phone: '0816-7890-1234', classes: '7A, 7B, 7C, 8A' },
  ];

  const subjects = ['ALL', 'Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPS', 'PJOK', 'Seni Budaya', 'PKN'];

  const filteredTeachers = teachers.filter(teacher => {
    const searchMatch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.nip.includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject === 'ALL' || teacher.subject === selectedSubject;
    return searchMatch && subjectMatch;
  });

  const statsCards = [
    { title: 'Total Guru', value: '86', change: '+5', icon: GraduationCap, color: 'blue' },
    { title: 'Guru PNS', value: '65', change: '+3', icon: GraduationCap, color: 'green' },
    { title: 'Guru Honorer', value: '21', change: '+2', icon: GraduationCap, color: 'orange' },
    { title: 'Total Kelas Diampu', value: '144', change: '+12', icon: BookOpen, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/teachers" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium text-sm">Guru</span>
          </a>
          <a href="/students" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium text-sm">Siswa</span>
          </a>
          <a href="/classes" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium text-sm">Kelas</span>
          </a>
          <a href="/attendance" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium text-sm">Absensi</span>
          </a>
          <a href="/finance" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium text-sm">Keuangan</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Manajemen Guru</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Guru</h1>
            <p className="text-gray-600">Kelola data guru, mata pelajaran, dan jadwal mengajar.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                orange: 'bg-orange-50 text-orange-600',
                purple: 'bg-purple-50 text-purple-600'
              };
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">↑ {stat.change}</span>
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
                    placeholder="Cari nama, NIP, atau mata pelajaran..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Subject Filter */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === 'ALL' ? 'Semua Mapel' : subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Import</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Tambah Guru</span>
                </button>
              </div>
            </div>
          </div>

          {/* Teachers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NIP</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama Lengkap</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mata Pelajaran</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">No. HP</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas Diampu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{teacher.nip}</td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{teacher.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {teacher.subject}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{teacher.email}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{teacher.phone}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{teacher.classes}</td>
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
          </div>
        </main>
      </div>
    </div>
  );
}
