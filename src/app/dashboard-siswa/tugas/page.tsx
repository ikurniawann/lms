'use client';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';

export default function TugasPage() {
  const assignments = [
    { id: 1, title: 'Latihan Soal Bab 1', subject: 'Matematika', due: '2 Apr 2026, 23:59', status: 'Belum Dikerjakan', submitted: false },
    { id: 2, title: 'PR Geometri', subject: 'Matematika', due: '3 Apr 2026, 23:59', status: 'Belum Dikerjakan', submitted: false },
    { id: 3, title: 'Quiz Aljabar', subject: 'Matematika', due: '25 Mar 2026, 23:59', status: 'Sudah Dikumpulkan', submitted: true, score: 85 },
    { id: 4, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', due: '28 Mar 2026, 23:59', status: 'Terlambat', submitted: false },
    { id: 5, title: 'Sistem Pencernaan', subject: 'IPA', due: '20 Mar 2026, 23:59', status: 'Sudah Dikumpulkan', submitted: true, score: 92 },
  ];

  const statsCards = [
    { title: 'Total Tugas', value: '23', icon: FileText, color: 'blue' },
    { title: 'Sudah Dikumpul', value: '18', icon: CheckCircle, color: 'green' },
    { title: 'Belum Dikerjakan', value: '4', icon: Clock, color: 'yellow' },
    { title: 'Terlambat', value: '1', icon: AlertCircle, color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Sudah Dikumpulkan': return 'bg-green-100 text-green-700';
      case 'Belum Dikerjakan': return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <FileText className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">LMS Siswa</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-siswa" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-siswa/jadwal" className="block px-4 py-3 hover:bg-gray-50">Jadwal</a>
          <a href="/dashboard-siswa/materi" className="block px-4 py-3 hover:bg-gray-50">Materi</a>
          <a href="/dashboard-siswa/tugas" className="block px-4 py-3 bg-blue-50 text-blue-700">Tugas</a>
          <a href="/dashboard-siswa/ujian" className="block px-4 py-3 hover:bg-gray-50">Ujian</a>
          <a href="/dashboard-siswa/nilai" className="block px-4 py-3 hover:bg-gray-50">Nilai</a>
          <a href="/dashboard-siswa/absensi" className="block px-4 py-3 hover:bg-gray-50">Absensi</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Tugas & PR</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Daftar Tugas</h1>
            <p className="text-gray-600">Kerjakan dan kumpulkan tugas tepat waktu.</p>
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
                  <th className="text-left p-4">Judul Tugas</th>
                  <th className="text-left p-4">Mapel</th>
                  <th className="text-left p-4">Deadline</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Nilai</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{a.title}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.subject}</span></td>
                    <td className="p-4 text-sm text-gray-600">{a.due}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>{a.status}</span></td>
                    <td className="p-4">
                      {a.score ? (
                        <span className="font-bold text-green-600">{a.score}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      {a.submitted ? (
                        <span className="text-green-600 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Terkumpul</span>
                      ) : (
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                          <Upload className="w-3 h-3"/> Kumpulkan
                        </button>
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
