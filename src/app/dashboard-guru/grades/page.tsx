'use client';
import { TrendingUp, Search } from 'lucide-react';

export default function GradesPage() {
  const grades = [
    { student: 'Ahmad Rizki', class: '8A', uts: 85, uas: 88, avg: 86.5, grade: 'B' },
    { student: 'Siti Nurhaliza', class: '8A', uts: 92, uas: 95, avg: 93.5, grade: 'A' },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r"><div className="h-16 px-6 flex items-center"><TrendingUp className="w-6 h-6 text-green-600"/><span className="ml-2 font-bold">LMS Guru</span></div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-guru/grades" className="block px-4 py-3 bg-green-50 text-green-700">Nilai</a>
        </nav>
      </aside>
      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center"><h1 className="text-xl font-bold">Nilai</h1></header>
        <main className="p-6">
          <div className="mb-6"><h1 className="text-2xl font-bold">Input & Kelola Nilai</h1><p className="text-gray-600">Kelola nilai siswa untuk UTS dan UAS.</p></div>
          <div className="mb-4"><input placeholder="Cari siswa..." className="w-80 px-4 py-2 border rounded-lg"/></div>
          <div className="bg-white rounded-xl shadow-sm border">
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="text-left p-4">Nama</th><th className="text-left p-4">Kelas</th><th className="text-left p-4">UTS</th><th className="text-left p-4">UAS</th><th className="text-left p-4">Rata-rata</th><th className="text-left p-4">Grade</th></tr></thead>
              <tbody>
                {grades.map((g,i) => (
                  <tr key={i} className="border-b"><td className="p-4 font-medium">{g.student}</td><td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{g.class}</span></td><td className="p-4">{g.uts}</td><td className="p-4">{g.uas}</td><td className="p-4 font-bold text-green-600">{g.avg}</td><td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">{g.grade}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
