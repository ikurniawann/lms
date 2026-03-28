'use client';

import { useState } from 'react';
import {
  Megaphone, Plus, Search, Calendar, Users, Eye, Edit, Trash2,
  Pin, Clock, AlertCircle, CheckCircle
} from 'lucide-react';

export default function Pengumuman() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const announcements = [
    { id: 1, title: 'Libur Tahun Baru Islam 1448 H', category: 'Libur', target: 'Semua', author: 'Admin', date: '26 Mar 2026', pinned: true, views: 1234, status: 'Active' },
    { id: 2, title: 'Jadwal UTS Ganjil 2026', category: 'Akademik', target: 'Siswa & Guru', author: 'Kurikulum', date: '25 Mar 2026', pinned: true, views: 892, status: 'Active' },
    { id: 3, title: 'Rapat Orang Tua Kelas 9', category: 'Rapat', target: 'Orang Tua', author: 'Kesiswaan', date: '24 Mar 2026', pinned: false, views: 456, status: 'Active' },
    { id: 4, title: 'Pembayaran SPP Bulan April', category: 'Keuangan', target: 'Orang Tua', author: 'Finance', date: '23 Mar 2026', pinned: false, views: 678, status: 'Active' },
    { id: 5, title: 'Lomba Padel Antar Kelas', category: 'Event', target: 'Siswa', author: 'OSIS', date: '20 Mar 2026', pinned: false, views: 523, status: 'Active' },
    { id: 6, title: 'Pemeliharaan Server 29 Mar', category: 'IT', target: 'Semua', author: 'IT Support', date: '18 Mar 2026', pinned: false, views: 345, status: 'Scheduled' },
  ];

  const filteredAnnouncements = announcements.filter(ann => {
    const searchMatch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.author.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'ALL' || ann.category === selectedCategory;
    return searchMatch && categoryMatch;
  });

  const statsCards = [
    { title: 'Total Pengumuman', value: '48', change: '+5', icon: Megaphone, color: 'blue' },
    { title: 'Aktif', value: '42', icon: CheckCircle, color: 'green' },
    { title: 'Terjadwal', value: '6', icon: Clock, color: 'yellow' },
    { title: 'Total Views', value: '12,456', change: '+1,234', icon: Eye, color: 'purple' },
  ];

  const categories = ['ALL', 'Akademik', 'Libur', 'Rapat', 'Keuangan', 'Event', 'IT', 'Umum'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Megaphone className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/announcements" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <Megaphone className="w-5 h-5" />
            <span className="font-medium text-sm">Pengumuman</span>
          </a>
          <a href="/events" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Calendar className="w-5 h-5" />
            <span className="font-medium text-sm">Acara</span>
          </a>
          <a href="/messages" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Pesan</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Pengumuman</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pengumuman Sekolah</h1>
            <p className="text-gray-600">Kelola pengumuman untuk siswa, guru, dan orang tua.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                yellow: 'bg-yellow-50 text-yellow-600',
                purple: 'bg-purple-50 text-purple-600'
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
                    placeholder="Cari judul, kategori, atau penulis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'ALL' ? 'Semua Kategori' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Buat Pengumuman</span>
              </button>
            </div>
          </div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`px-3 py-1 text-xs font-medium rounded-full ${
                      ann.category === 'Akademik' ? 'bg-blue-100 text-blue-700' :
                      ann.category === 'Libur' ? 'bg-green-100 text-green-700' :
                      ann.category === 'Rapat' ? 'bg-purple-100 text-purple-700' :
                      ann.category === 'Keuangan' ? 'bg-orange-100 text-orange-700' :
                      ann.category === 'Event' ? 'bg-pink-100 text-pink-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ann.category}
                    </div>
                    {ann.pinned && (
                      <Pin className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{ann.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{ann.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{ann.date}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{ann.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-500">By:</span>
                      <span className="font-medium text-gray-900">{ann.author}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    ann.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ann.status}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-all">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-green-50 rounded-lg transition-all">
                      <Edit className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
