'use client';
import { BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ParentAssignments() {
  const children = [
    { name: 'Ahmad Rizki', class: '8A' },
    { name: 'Siti Nurhaliza', class: '6B' },
  ];

  const assignments = [
    { id: 1, title: 'Latihan Soal Bab 1', subject: 'Matematika', child: 'Ahmad Rizki', due: '2 Apr 2026', status: 'Belum Dikerjakan', submitted: false },
    { id: 2, title: 'PR Geometri', subject: 'Matematika', child: 'Ahmad Rizki', due: '3 Apr 2026', status: 'Belum Dikerjakan', submitted: false },
    { id: 3, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', child: 'Ahmad Rizki', due: '28 Mar 2026', status: 'Sudah Dikumpul', submitted: true, score: 85 },
    { id: 4, title: 'Sistem Pencernaan', subject: 'IPA', child: 'Siti Nurhaliza', due: '20 Mar 2026', status: 'Sudah Dikumpul', submitted: true, score: 92 },
    { id: 5, title: 'Simple Present Tense', subject: 'Bahasa Inggris', child: 'Siti Nurhaliza', due: '25 Mar 2026', status: 'Terlambat', submitted: false },
  ];

  const statsCards = [
    { title: 'Total Tugas', value: '15', icon: BookOpen, color: 'blue' },
    { title: 'Sudah Dikumpul', value: '12', icon: CheckCircle, color: 'green' },
    { title: 'Belum Dikerjakan', value: '2', icon: Clock, color: 'yellow' },
    { title: 'Terlambat', value: '1', icon: AlertCircle, color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Sudah Dikumpul': return 'bg-green-100 text-green-700';
      case 'Belum Dikerjakan': return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">Parent Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/parent/dashboard" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/parent/academic" className="block px-4 py-3 hover:bg-gray-50">Akademik</a>
          <a href="/parent/assignments" className="block px-4 py-3 bg-blue-50 text-blue-700">Tugas</a>
          <a href="/parent/finance" className="block px-4 py-3 hover:bg-gray-50">Keuangan</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Tugas & PR</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Monitoring Tugas Anak</h1>
            <p className="text-gray-600">Pantau tugas dan PR anak-anak Anda.</p>
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
                  <th className="text-left p-4">Siswa</th>
                  <th className="text-left p-4">Mapel</th>
                  <th className="text-left p-4">Deadline</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{a.title}</td>
                    <td className="p-4 text-sm">{a.child}</td>
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
