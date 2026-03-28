'use client';

import { useState } from 'react';
import {
  FileText, Plus, Search, Calendar, Clock, Users, TrendingUp,
  Edit, Trash2, Eye, Download, Upload, CheckCircle, AlertCircle
} from 'lucide-react';

export default function ManajemenUjian() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const exams = [
    { id: 1, code: 'UTS-GANJIL-2026', name: 'UTS Ganjil 2026', type: 'UTS', subject: 'Semua Mapel', classes: '7A, 7B, 7C, 8A, 8B, 8C, 9A, 9B, 9C', date: '15-20 Sep 2026', duration: '90 menit', students: 288, status: 'Selesai' },
    { id: 2, code: 'UAS-GANJIL-2026', name: 'UAS Ganjil 2026', type: 'UAS', subject: 'Semua Mapel', classes: '7A, 7B, 7C, 8A, 8B, 8C, 9A, 9B, 9C', date: '10-15 Des 2026', duration: '120 menit', students: 288, status: 'Akan Datang' },
    { id: 3, code: 'QUIZ-MTK-8A-001', name: 'Quiz Matematika Bab 3', type: 'Quiz', subject: 'Matematika', classes: '8A, 8B', date: '30 Mar 2026', duration: '45 menit', students: 62, status: 'Berlangsung' },
    { id: 4, code: 'US-2026', name: 'Ujian Sekolah 2026', type: 'US', subject: 'Semua Mapel UN', classes: '9A, 9B, 9C', date: '01-05 Mei 2026', duration: '120 menit', students: 93, status: 'Akan Datang' },
    { id: 5, code: 'QUIZ-IPA-7A-002', name: 'Quiz IPA Sistem Pencernaan', type: 'Quiz', subject: 'IPA', classes: '7A, 7B', date: '28 Mar 2026', duration: '30 menit', students: 62, status: 'Selesai' },
  ];

  const filteredExams = exams.filter(exam => {
    const searchMatch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === 'ALL' || exam.type === selectedType;
    return searchMatch && typeMatch;
  });

  const statsCards = [
    { title: 'Total Ujian', value: '24', change: '+3', icon: FileText, color: 'blue' },
    { title: 'Ujian Bulan Ini', value: '5', icon: Calendar, color: 'green' },
    { title: 'Siswa Ujian', value: '288', icon: Users, color: 'purple' },
    { title: 'Rata-rata Nilai', value: '82.5', change: '+2.3', icon: TrendingUp, color: 'orange' },
  ];

  const examResults = [
    { exam: 'UTS Matematika 8A', students: 32, avg: 85.5, highest: 98, lowest: 62, passed: 30 },
    { exam: 'UTS IPA 8A', students: 32, avg: 83.2, highest: 95, lowest: 58, passed: 29 },
    { exam: 'UTS B.Indonesia 8A', students: 32, avg: 87.8, highest: 96, lowest: 70, passed: 32 },
    { exam: 'UTS B.Inggris 8A', students: 32, avg: 79.5, highest: 92, lowest: 55, passed: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <FileText className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/exams" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <FileText className="w-5 h-5" />
            <span className="font-medium text-sm">Ujian</span>
          </a>
          <a href="/students" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Siswa</span>
          </a>
          <a href="/teachers" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Guru</span>
          </a>
          <a href="/announcements" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Pengumuman</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Manajemen Ujian</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Jadwal & Hasil Ujian</h1>
            <p className="text-gray-600">Kelola jadwal ujian, soal, dan rekap nilai siswa.</p>
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
                    placeholder="Cari nama ujian, kode, atau mapel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ALL">Semua Tipe</option>
                  <option value="UTS">UTS</option>
                  <option value="UAS">UAS</option>
                  <option value="US">Ujian Sekolah</option>
                  <option value="Quiz">Quiz</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Import Soal</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Buat Ujian</span>
                </button>
              </div>
            </div>
          </div>

          {/* Exams Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Jadwal Ujian</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kode</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama Ujian</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tipe</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mapel</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Durasi</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6 text-sm font-mono text-gray-700">{exam.code}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{exam.name}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          exam.type === 'UTS' ? 'bg-blue-100 text-blue-700' :
                          exam.type === 'UAS' ? 'bg-purple-100 text-purple-700' :
                          exam.type === 'US' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {exam.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{exam.subject}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{exam.classes}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{exam.date}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{exam.duration}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          exam.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                          exam.status === 'Berlangsung' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {exam.status}
                        </span>
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
          </div>

          {/* Exam Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Hasil Ujian Terbaru</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ujian</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Siswa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Rata-rata</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nilai Tertinggi</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nilai Terendah</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Lulus</th>
                  </tr>
                </thead>
                <tbody>
                  {examResults.map((result, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{result.exam}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{result.students}</td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-bold text-blue-600">{result.avg}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-green-600">{result.highest}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-red-600">{result.lowest}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{result.passed}/{result.students}</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
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
