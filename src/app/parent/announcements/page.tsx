'use client';
import { Bell, Calendar, Users, Megaphone } from 'lucide-react';

export default function ParentAnnouncements() {
  const announcements = [
    { id: 1, title: 'Libur Tahun Baru Islam 1448 H', category: 'Libur', target: 'Semua', date: '26 Mar 2026', content: 'Sekolah libur pada tanggal 29 Maret 2026 بمناسبة Tahun Baru Islam 1448 H.', pinned: true },
    { id: 2, title: 'Parent-Teacher Meeting Kelas 8A', category: 'Rapat', target: 'Orang Tua 8A', date: '25 Mar 2026', content: 'Undangan rapat orang tua kelas 8A pada tanggal 1 April 2026, pukul 09:00-12:00 di Aula Sekolah.', pinned: true },
    { id: 3, title: 'Jadwal UTS Ganjil 2026', category: 'Akademik', target: 'Semua', date: '20 Mar 2026', content: 'Ujian Tengah Semester Ganjil akan dilaksanakan pada 15-20 April 2026. Siswa diharapkan belajar dengan giat.', pinned: false },
    { id: 4, title: 'Pembayaran SPP Bulan April', category: 'Keuangan', target: 'Orang Tua', date: '18 Mar 2026', content: 'Pembayaran SPP bulan April 2026 dapat dilakukan mulai 1-10 April 2026 melalui transfer bank atau tunai.', pinned: false },
    { id: 5, title: 'Lomba Padel Antar Kelas', category: 'Event', target: 'Siswa', date: '15 Mar 2026', content: 'Lomba padel antar kelas akan diadakan pada 5 April 2026. Pendaftaran dibuka hingga 30 Maret 2026.', pinned: false },
  ];

  const statsCards = [
    { title: 'Total Pengumuman', value: '24', icon: Bell, color: 'blue' },
    { title: 'Pengumuman Baru', value: '5', icon: Megaphone, color: 'green' },
    { title: 'Acara Mendatang', value: '3', icon: Calendar, color: 'purple' },
    { title: 'Total Views', value: '1,234', icon: Users, color: 'orange' },
  ];

  const categories = ['ALL', 'Akademik', 'Libur', 'Rapat', 'Keuangan', 'Event', 'Umum'];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <Bell className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">Parent Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/parent/dashboard" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/parent/academic" className="block px-4 py-3 hover:bg-gray-50">Akademik</a>
          <a href="/parent/announcements" className="block px-4 py-3 bg-blue-50 text-blue-700">Pengumuman</a>
          <a href="/parent/finance" className="block px-4 py-3 hover:bg-gray-50">Keuangan</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Pengumuman</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Pengumuman Sekolah</h1>
            <p className="text-gray-600">Informasi terbaru dari sekolah untuk orang tua.</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {categories.map((cat, i) => (
              <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                cat === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                {cat === 'ALL' ? 'Semua' : cat}
              </button>
            ))}
          </div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map(ann => (
              <div key={ann.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all">
                <div className="p-6 border-b">
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
                      <div className="text-red-500">📌</div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{ann.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3"/>
                      <span>{ann.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3"/>
                      <span>{ann.date}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{ann.content}</p>
                  <button className="text-blue-600 text-sm font-medium hover:underline">Baca Selengkapnya →</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
