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
    { title: 'Total Tugas', value: '23', color: 'blue' },
    { title: 'Sudah Dikumpul', value: '18', color: 'green' },
    { title: 'Belum Dikerjakan', value: '4', color: 'yellow' },
    { title: 'Terlambat', value: '1', color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sudah Dikumpulkan': return 'bg-green-100 text-green-700';
      case 'Belum Dikerjakan': return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tugas & PR</h1>
        <p className="text-sm sm:text-base text-gray-600">Kerjakan dan kumpulkan tugas tepat waktu.</p>
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

      {/* Assignments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Daftar Tugas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nilai</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{a.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.subject}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{a.due}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {a.score ? (
                      <span className="font-bold text-green-600">{a.score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {a.submitted ? (
                      <span className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Terkumpul
                      </span>
                    ) : (
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors">
                        <Upload className="w-3 h-3" /> Kumpulkan
                      </button>
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
