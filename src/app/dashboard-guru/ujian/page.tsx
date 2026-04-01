'use client';
import { FileText, Plus, Eye, Edit } from 'lucide-react';

export default function UjianPage() {
  const exams = [
    { id: 1, title: 'UTS Matematika 7A', class: '7A', date: '15 Apr 2026', duration: '90 menit', students: 32, status: 'Scheduled' },
    { id: 2, title: 'Quiz Aljabar 8A', class: '8A', date: '5 Apr 2026', duration: '45 menit', students: 31, status: 'Active' },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Notice Banner */}
      <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm fixed top-0 left-0 right-0 z-50">
        <span className="font-semibold">👁️ Mode Public View</span> — Halaman ini dapat diakses tanpa login.
        <a href="/login" className="underline ml-2 hover:text-blue-200">Login untuk edit</a>
      </div>

      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200" style={{ marginTop: '36px' }}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/dashboard-guru/materi" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Materi Saya</span>
          </a>
          <a href="/dashboard-guru/tugas" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Tugas</span>
          </a>
          <a href="/dashboard-guru/ujian" className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 border border-green-200 rounded-lg transition-all">
            <span className="font-medium text-sm">Ujian</span>
          </a>
          <a href="/dashboard-guru/buat-ujian" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Buat Ujian</span>
          </a>
          <a href="/dashboard-guru/students" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Siswa</span>
          </a>
          <a href="/dashboard-guru/attendance" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Absensi</span>
          </a>
          <a href="/dashboard-guru/grades" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all">
            <span className="font-medium text-sm">Nilai</span>
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <a href="/login" className="flex items-center space-x-3 px-4 py-3 text-green-600 hover:bg-green-50 rounded-lg transition-all border border-green-200">
            <span className="font-medium text-sm">Login untuk Edit Data</span>
          </a>
        </div>
      </aside>
      <div className="ml-64" style={{ marginTop: '36px' }}>
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
