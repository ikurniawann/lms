'use client';

import { useState } from 'react';
import { CheckSquare, Plus, Download, Calendar } from 'lucide-react';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState('2026-03-28');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const attendanceData = [
    { id: 1, date: '28 Mar 2026', class: '7A', total: 32, present: 30, absent: 2, percentage: 93.8 },
    { id: 2, date: '28 Mar 2026', class: '7B', total: 30, present: 29, absent: 1, percentage: 96.7 },
    { id: 3, date: '28 Mar 2026', class: '8A', total: 31, present: 31, absent: 0, percentage: 100 },
    { id: 4, date: '28 Mar 2026', class: '8B', total: 29, present: 27, absent: 2, percentage: 93.1 },
    { id: 5, date: '27 Mar 2026', class: '7A', total: 32, present: 31, absent: 1, percentage: 96.9 },
    { id: 6, date: '27 Mar 2026', class: '7B', total: 30, present: 28, absent: 2, percentage: 93.3 },
    { id: 7, date: '27 Mar 2026', class: '8A', total: 31, present: 30, absent: 1, percentage: 96.8 },
    { id: 8, date: '27 Mar 2026', class: '8B', total: 29, present: 29, absent: 0, percentage: 100 },
  ];

  const filteredData = attendanceData.filter(a => {
    const matchClass = selectedClass === 'ALL' || a.class === selectedClass;
    return matchClass;
  });

  const statsCards = [
    { title: 'Total Kelas', value: '8', color: 'blue' },
    { title: 'Hadir Hari Ini', value: '245', color: 'green' },
    { title: 'Tidak Hadir', value: '3', color: 'red' },
    { title: 'Rata-rata %', value: '96.2%', color: 'orange' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Rekap Absensi</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola dan monitoring kehadiran siswa per kelas.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="ALL">Semua Kelas</option>
            {classes.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Input Absensi
          </button>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hadir</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tidak Hadir</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Persentase</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{a.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">{a.total}</td>
                  <td className="py-3 px-4 text-sm text-green-600">{a.present}</td>
                  <td className="py-3 px-4 text-sm text-red-600">{a.absent}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${a.percentage >= 95 ? 'bg-green-500' : a.percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${a.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold">{a.percentage}%</span>
                    </div>
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
