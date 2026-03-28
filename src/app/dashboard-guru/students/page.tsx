'use client';
import { Users, Search, Eye, Edit } from 'lucide-react';

export default function SiswaPage() {
  const students = [
    { id: 1, nis: '2024001', name: 'Ahmad Rizki', class: '8A', avg: 85.5, attendance: 96 },
    { id: 2, nis: '2024002', name: 'Siti Nurhaliza', class: '8A', avg: 92.3, attendance: 98 },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r"><div className="h-16 px-6 flex items-center"><Users className="w-6 h-6 text-green-600"/><span className="ml-2 font-bold">LMS Guru</span></div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-guru/students" className="block px-4 py-3 bg-green-50 text-green-700">Siswa</a>
        </nav>
      </aside>
      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center"><h1 className="text-xl font-bold">Siswa</h1></header>
        <main className="p-6">
          <div className="mb-6"><h1 className="text-2xl font-bold">Daftar Siswa</h1><p className="text-gray-600">Kelola siswa di kelas Anda.</p></div>
          <div className="mb-4"><input placeholder="Cari siswa..." className="w-80 px-4 py-2 border rounded-lg"/></div>
          <div className="bg-white rounded-xl shadow-sm border">
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="text-left p-4">NIS</th><th className="text-left p-4">Nama</th><th className="text-left p-4">Kelas</th><th className="text-left p-4">Rata-rata</th><th className="text-left p-4">Kehadiran</th><th className="text-left p-4">Actions</th></tr></thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b"><td className="p-4 font-mono text-sm">{s.nis}</td><td className="p-4 font-medium">{s.name}</td><td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{s.class}</span></td><td className="p-4 font-bold text-green-600">{s.avg}</td><td className="p-4">{s.attendance}%</td><td className="p-4 flex gap-2"><button className="p-2 hover:bg-blue-50 rounded"><Eye className="w-4 h-4 text-blue-600"/></button><button className="p-2 hover:bg-green-50 rounded"><Edit className="w-4 h-4 text-green-600"/></button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
