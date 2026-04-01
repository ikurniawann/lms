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

  const getStatusColor = (status: string) => {
    switch(status) {
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
        <p className="text-sm sm:text-base text-gray-600">Pantau jadwal ujian dan hasil ujian anak-anak Anda.</p>
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Jadwal Ujian</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama Ujian</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Siswa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Waktu</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(e => (
                <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{e.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{e.child}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{e.subject}</span></td>
                  <td className="py-3 px-4 text-sm text-gray-600">{e.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{e.time}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(e.status)}`}>{e.status}</span></td>
                  <td className="py-3 px-4">
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
      </div>
    </div>
  );
}
