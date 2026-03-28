'use client';
import { Calendar, Clock, TrendingUp, BookOpen } from 'lucide-react';

export default function ParentExams() {
  const exams = [
    { id: 1, title: 'UTS Matematika', subject: 'Matematika', child: 'Ahmad Rizki', date: '15 Apr 2026', time: '08:00 - 10:00', room: 'R.101', status: 'Akan Datang', score: null },
    { id: 2, title: 'UTS IPA', subject: 'IPA', child: 'Ahmad Rizki', date: '16 Apr 2026', time: '08:00 - 10:00', room: 'R.101', status: 'Akan Datang', score: null },
    { id: 3, title: 'Quiz Aljabar', subject: 'Matematika', child: 'Ahmad Rizki', date: '25 Mar 2026', time: '07:00 - 07:45', room: 'R.101', status: 'Selesai', score: 85 },
    { id: 4, title: 'UTS Bahasa Indonesia', subject: 'Bahasa Indonesia', child: 'Siti Nurhaliza', date: '17 Apr 2026', time: '08:00 - 10:00', room: 'R.201', status: 'Akan Datang', score: null },
    { id: 5, title: 'Quiz Teks Eksposisi', subject: 'Bahasa Indonesia', child: 'Siti Nurhaliza', date: '20 Mar 2026', time: '10:30 - 11:15', room: 'R.201', status: 'Selesai', score: 90 },
  ];

  const statsCards = [
    { title: 'Total Ujian', value: '12', icon: BookOpen, color: 'blue' },
    { title: 'Ujian Bulan Ini', value: '4', icon: Calendar, color: 'green' },
    { title: 'Rata-rata Nilai', value: '87.5', icon: TrendingUp, color: 'purple' },
    { title: 'Jam Ujian', value: '18', icon: Clock, color: 'orange' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Akan Datang': return 'bg-blue-100 text-blue-700';
      case 'Berlangsung': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <Calendar className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">Parent Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/parent/dashboard" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/parent/academic" className="block px-4 py-3 hover:bg-gray-50">Akademik</a>
          <a href="/parent/exams" className="block px-4 py-3 bg-blue-50 text-blue-700">Ujian</a>
          <a href="/parent/finance" className="block px-4 py-3 hover:bg-gray-50">Keuangan</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Jadwal Ujian</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Ujian & Quiz</h1>
            <p className="text-gray-600">Pantau jadwal ujian dan hasil ujian anak-anak Anda.</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Nama Ujian</th>
                  <th className="text-left p-4">Siswa</th>
                  <th className="text-left p-4">Mapel</th>
                  <th className="text-left p-4">Tanggal & Waktu</th>
                  <th className="text-left p-4">Ruangan</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {exams.map(e => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{e.title}</td>
                    <td className="p-4 text-sm">{e.child}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{e.subject}</span></td>
                    <td className="p-4 text-sm">
                      <div>{e.date}</div>
                      <div className="text-gray-500">{e.time}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{e.room}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(e.status)}`}>{e.status}</span></td>
                    <td className="p-4">
                      {e.score ? (
                        <span className="font-bold text-green-600">{e.score}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
