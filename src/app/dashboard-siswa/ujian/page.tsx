'use client';
import { FileText, Clock, Calendar, TrendingUp, Play } from 'lucide-react';
import Link from 'next/link';

export default function UjianPage() {
  const exams = [
    { id: 1, title: 'UTS Matematika', subject: 'Matematika', date: '15 Apr 2026', time: '08:00 - 10:00', duration: '120 menit', room: 'R.101', status: 'Akan Datang' },
    { id: 2, title: 'UTS IPA', subject: 'IPA', date: '16 Apr 2026', time: '08:00 - 10:00', duration: '120 menit', room: 'R.101', status: 'Akan Datang' },
    { id: 3, title: 'Quiz Aljabar', subject: 'Matematika', date: '25 Mar 2026', time: '07:00 - 07:45', duration: '45 menit', room: 'R.101', status: 'Selesai', score: 85 },
    { id: 4, title: 'Quiz Teks Eksposisi', subject: 'Bahasa Indonesia', date: '20 Mar 2026', time: '10:30 - 11:15', duration: '45 menit', room: 'R.101', status: 'Selesai', score: 90 },
  ];

  const statsCards = [
    { title: 'Total Ujian', value: '12', icon: FileText, color: 'blue' },
    { title: 'Ujian Bulan Ini', value: '4', icon: Calendar, color: 'green' },
    { title: 'Rata-rata Nilai', value: '87.5', icon: TrendingUp, color: 'purple' },
    { title: 'Jam Ujian', value: '18', icon: Clock, color: 'orange' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Akan Datang': return 'bg-blue-100 text-blue-700';
      case 'Berlangsung': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ujian & Quiz</h1>
        <p className="text-sm sm:text-base text-gray-600">Lihat jadwal ujian dan hasil ujianmu.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama Ujian</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Durasi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nilai</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(e => (
                <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{e.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{e.subject}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="text-gray-600">{e.date}</div>
                    <div className="text-gray-500 text-xs">{e.time}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{e.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(e.status)}`}>{e.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    {e.score ? (
                      <span className="font-bold text-green-600">{e.score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {e.status === 'Berlangsung' && (
                      <Link
                        href={`/dashboard-siswa/ujian/${e.id}`}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center gap-2 inline-flex"
                      >
                        <Play className="w-3 h-3" /> Mulai
                      </Link>
                    )}
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
