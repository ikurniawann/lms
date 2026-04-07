'use client';
import { Bell, Calendar, Users, Megaphone, Pin } from 'lucide-react';

export default function ParentAnnouncements() {
  const announcements = [
    { id: 1, title: 'Libur Tahun Baru Islam 1448 H', category: 'Libur', target: 'Semua', date: '26 Mar 2026', content: 'Sekolah libur pada tanggal 29 Maret 2026 بمناسبة Tahun Baru Islam 1448 H.', pinned: true },
    { id: 2, title: 'Parent-Teacher Meeting Kelas 8A', category: 'Rapat', target: 'Orang Tua 8A', date: '25 Mar 2026', content: 'Undangan rapat orang tua kelas 8A pada tanggal 1 April 2026, pukul 09:00-12:00 di Aula Sekolah.', pinned: true },
    { id: 3, title: 'Jadwal UTS Ganjil 2026', category: 'Akademik', target: 'Semua', date: '20 Mar 2026', content: 'Ujian Tengah Semester Ganjil akan dilaksanakan pada 15-20 April 2026.', pinned: false },
    { id: 4, title: 'Pembayaran SPP Bulan April', category: 'Keuangan', target: 'Orang Tua', date: '18 Mar 2026', content: 'Pembayaran SPP bulan April 2026 dapat dilakukan mulai 1-10 April 2026.', pinned: false },
    { id: 5, title: 'Lomba Padel Antar Kelas', category: 'Event', target: 'Siswa', date: '15 Mar 2026', content: 'Lomba padel antar kelas akan diadakan pada 5 April 2026.', pinned: false },
  ];

  const categories = ['Semua', 'Akademik', 'Libur', 'Rapat', 'Keuangan', 'Event'];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Akademik': return 'bg-blue-100 text-blue-700';
      case 'Libur': return 'bg-green-100 text-green-700';
      case 'Rapat': return 'bg-purple-100 text-purple-700';
      case 'Keuangan': return 'bg-orange-100 text-orange-700';
      case 'Event': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pengumuman Sekolah</h1>
        <p className="text-sm sm:text-base text-gray-600">Informasi terbaru dari sekolah untuk orang tua.</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {announcements.map(ann => (
          <div key={ann.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(ann.category)}`}>
                  {ann.category}
                </span>
                {ann.pinned && (
                  <Pin className="w-4 h-4 text-red-500 fill-current" />
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{ann.title}</h3>
              <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
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
            <div className="p-4 sm:p-6">
              <p className="text-gray-600 text-sm mb-4">{ann.content}</p>
              <button className="text-blue-600 text-sm font-medium hover:underline">Baca Selengkapnya →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
