'use client';
import { CheckSquare, Calendar } from 'lucide-react';

export default function AttendancePage() {
  const attendance = [
    { date: '28 Mar 2026', class: '7A', present: 30, absent: 2, percentage: 93.8 },
    { date: '28 Mar 2026', class: '7B', present: 29, absent: 1, percentage: 96.7 },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r"><div className="h-16 px-6 flex items-center"><CheckSquare className="w-6 h-6 text-green-600"/><span className="ml-2 font-bold">LMS Guru</span></div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-guru/attendance" className="block px-4 py-3 bg-green-50 text-green-700">Absensi</a>
        </nav>
      </aside>
      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center"><h1 className="text-xl font-bold">Absensi</h1></header>
        <main className="p-6">
          <div className="mb-6"><h1 className="text-2xl font-bold">Absensi Kelas</h1><p className="text-gray-600">Rekap kehadiran siswa per kelas.</p></div>
          <div className="bg-white rounded-xl shadow-sm border">
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="text-left p-4">Tanggal</th><th className="text-left p-4">Kelas</th><th className="text-left p-4">Hadir</th><th className="text-left p-4">Tidak Hadir</th><th className="text-left p-4">Persentase</th></tr></thead>
              <tbody>
                {attendance.map((a,i) => (
                  <tr key={i} className="border-b"><td className="p-4">{a.date}</td><td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.class}</span></td><td className="p-4 text-green-600">{a.present}</td><td className="p-4 text-red-600">{a.absent}</td><td className="p-4 font-bold">{a.percentage}%</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
