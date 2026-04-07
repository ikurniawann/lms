'use client';
import { CheckSquare, Clock, Calendar } from 'lucide-react';

export default function AbsensiPage() {
  const attendance = [
    { date: '28 Mar 2026', day: 'Jumat', status: 'Hadir', checkIn: '06:45', checkOut: '14:00', notes: '-' },
    { date: '27 Mar 2026', day: 'Kamis', status: 'Hadir', checkIn: '06:50', checkOut: '14:00', notes: '-' },
    { date: '26 Mar 2026', day: 'Rabu', status: 'Hadir', checkIn: '06:55', checkOut: '14:00', notes: '-' },
    { date: '25 Mar 2026', day: 'Selasa', status: 'Sakit', checkIn: '-', checkOut: '-', notes: 'Surat dokter' },
    { date: '24 Mar 2026', day: 'Senin', status: 'Hadir', checkIn: '07:00', checkOut: '14:00', notes: '-' },
    { date: '21 Mar 2026', day: 'Jumat', status: 'Hadir', checkIn: '06:40', checkOut: '14:00', notes: '-' },
    { date: '20 Mar 2026', day: 'Kamis', status: 'Izin', checkIn: '-', checkOut: '-', notes: 'Acara keluarga' },
  ];

  const statsCards = [
    { title: 'Kehadiran', value: '96%', color: 'green' },
    { title: 'Hadir', value: '92', color: 'blue' },
    { title: 'Sakit', value: '3', color: 'yellow' },
    { title: 'Izin', value: '2', color: 'purple' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Hadir': return 'bg-green-100 text-green-700';
      case 'Sakit': return 'bg-yellow-100 text-yellow-700';
      case 'Izin': return 'bg-purple-100 text-purple-700';
      case 'Alpa': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const monthlyStats = [
    { month: 'Mar 2026', present: 20, sick: 1, permission: 1, absent: 0 },
    { month: 'Feb 2026', present: 18, sick: 1, permission: 1, absent: 0 },
    { month: 'Jan 2026', present: 19, sick: 0, permission: 1, absent: 0 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Absensi Saya</h1>
        <p className="text-sm sm:text-base text-gray-600">Lihat riwayat kehadiran dan absensi kamu.</p>
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

      {/* Monthly Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Ringkasan Bulanan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bulan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hadir</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sakit</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Izin</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Alpa</th>
              </tr>
            </thead>
            <tbody>
              {monthlyStats.map((m, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{m.month}</td>
                  <td className="py-3 px-4 text-sm text-green-600">{m.present}</td>
                  <td className="py-3 px-4 text-sm text-yellow-600">{m.sick}</td>
                  <td className="py-3 px-4 text-sm text-purple-600">{m.permission}</td>
                  <td className="py-3 px-4 text-sm text-red-600">{m.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Riwayat Kehadiran</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hari</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check Out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{a.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{a.day}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>{a.status}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">{a.checkIn}</td>
                  <td className="py-3 px-4 text-sm">{a.checkOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
