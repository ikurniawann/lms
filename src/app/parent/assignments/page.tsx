'use client';
import { BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ParentAssignments() {
  const assignments = [
    { id: 1, title: 'Latihan Soal Bab 1', subject: 'Matematika', child: 'Ahmad Rizki', due: '2 Apr 2026', status: 'Belum Dikerjakan', submitted: false },
    { id: 2, title: 'PR Geometri', subject: 'Matematika', child: 'Ahmad Rizki', due: '3 Apr 2026', status: 'Belum Dikerjakan', submitted: false },
    { id: 3, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', child: 'Ahmad Rizki', due: '28 Mar 2026', status: 'Sudah Dikumpul', submitted: true, score: 85 },
    { id: 4, title: 'Sistem Pencernaan', subject: 'IPA', child: 'Siti Nurhaliza', due: '20 Mar 2026', status: 'Sudah Dikumpul', submitted: true, score: 92 },
    { id: 5, title: 'Simple Present Tense', subject: 'Bahasa Inggris', child: 'Siti Nurhaliza', due: '25 Mar 2026', status: 'Terlambat', submitted: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sudah Dikumpul': return 'bg-green-100 text-green-700';
      case 'Belum Dikerjakan': return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tugas & PR</h1>
        <p className="text-sm sm:text-base text-gray-600">Pantau tugas dan PR anak-anak Anda.</p>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Monitoring Tugas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul Tugas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Siswa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{a.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{a.child}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.subject}</span></td>
                  <td className="py-3 px-4 text-sm text-gray-600">{a.due}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>{a.status}</span></td>
                  <td className="py-3 px-4">
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
      </div>    </div>
  );
}
