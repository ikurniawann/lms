'use client';
import { FileText, Plus, Eye, Edit } from 'lucide-react';

export default function UjianPage() {
  const exams = [
    { id: 1, title: 'UTS Matematika 7A', class: '7A', date: '15 Apr 2026', duration: '90 menit', students: 32, status: 'Scheduled' },
    { id: 2, title: 'Quiz Aljabar 8A', class: '8A', date: '5 Apr 2026', duration: '45 menit', students: 31, status: 'Active' },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r"><div className="h-16 px-6 flex items-center"><FileText className="w-6 h-6 text-green-600"/><span className="ml-2 font-bold">LMS Guru</span></div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-guru/ujian" className="block px-4 py-3 bg-green-50 text-green-700">Ujian</a>
        </nav>
      </aside>
      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center"><h1 className="text-xl font-bold">Ujian</h1></header>
        <main className="p-6">
          <div className="mb-6"><h1 className="text-2xl font-bold">Ujian & Quiz</h1><p className="text-gray-600">Kelola ujian dan quiz untuk siswa.</p></div>
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b flex justify-between"><h3 className="font-bold">Daftar Ujian</h3><button className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"><Plus className="w-4 h-4"/>Buat Ujian</button></div>
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="text-left p-4">Judul</th><th className="text-left p-4">Kelas</th><th className="text-left p-4">Tanggal</th><th className="text-left p-4">Durasi</th><th className="text-left p-4">Status</th><th className="text-left p-4">Actions</th></tr></thead>
              <tbody>
                {exams.map(e => (
                  <tr key={e.id} className="border-b"><td className="p-4 font-medium">{e.title}</td><td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{e.class}</span></td><td className="p-4">{e.date}</td><td className="p-4">{e.duration}</td><td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">{e.status}</span></td><td className="p-4 flex gap-2"><button className="p-2 hover:bg-blue-50 rounded"><Eye className="w-4 h-4 text-blue-600"/></button><button className="p-2 hover:bg-green-50 rounded"><Edit className="w-4 h-4 text-green-600"/></button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
