'use client';
import { CheckSquare, Clock, Calendar, TrendingUp } from 'lucide-react';

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
    { title: 'Kehadiran', value: '96%', icon: CheckSquare, color: 'green' },
    { title: 'Hadir', value: '92', icon: CheckSquare, color: 'blue' },
    { title: 'Sakit', value: '3', icon: Clock, color: 'yellow' },
    { title: 'Izin', value: '2', icon: Calendar, color: 'purple' },
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
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <CheckSquare className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">LMS Siswa</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-siswa" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-siswa/jadwal" className="block px-4 py-3 hover:bg-gray-50">Jadwal</a>
          <a href="/dashboard-siswa/materi" className="block px-4 py-3 hover:bg-gray-50">Materi</a>
          <a href="/dashboard-siswa/tugas" className="block px-4 py-3 hover:bg-gray-50">Tugas</a>
          <a href="/dashboard-siswa/ujian" className="block px-4 py-3 hover:bg-gray-50">Ujian</a>
          <a href="/dashboard-siswa/nilai" className="block px-4 py-3 hover:bg-gray-50">Nilai</a>
          <a href="/dashboard-siswa/absensi" className="block px-4 py-3 bg-blue-50 text-blue-700">Absensi</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Absensi Saya</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Rekap Kehadiran</h1>
            <p className="text-gray-600">Lihat riwayat kehadiran dan absensi kamu.</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Monthly Summary */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h3 className="font-bold">Ringkasan Bulanan</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Bulan</th>
                  <th className="text-left p-4">Hadir</th>
                  <th className="text-left p-4">Sakit</th>
                  <th className="text-left p-4">Izin</th>
                  <th className="text-left p-4">Alpa</th>
                  <th className="text-left p-4">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {monthlyStats.map((m, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{m.month}</td>
                    <td className="p-4 text-green-600">{m.present}</td>
                    <td className="p-4 text-yellow-600">{m.sick}</td>
                    <td className="p-4 text-purple-600">{m.permission}</td>
                    <td className="p-4 text-red-600">{m.absent}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${(m.present / (m.present + m.sick + m.permission + m.absent)) * 100}%` }}/>
                        </div>
                        <span className="font-bold">{Math.round((m.present / (m.present + m.sick + m.permission + m.absent)) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance History */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="font-bold">Riwayat Kehadiran</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Tanggal</th>
                  <th className="text-left p-4">Hari</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Check In</th>
                  <th className="text-left p-4">Check Out</th>
                  <th className="text-left p-4">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{a.date}</td>
                    <td className="p-4 text-sm text-gray-600">{a.day}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>{a.status}</span></td>
                    <td className="p-4 text-sm">{a.checkIn}</td>
                    <td className="p-4 text-sm">{a.checkOut}</td>
                    <td className="p-4 text-sm text-gray-600">{a.notes}</td>
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
