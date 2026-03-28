'use client';
import { BookOpen, Download, FileText, Video, Search } from 'lucide-react';

export default function MateriPage() {
  const materials = [
    { id: 1, title: 'Aljabar Linear', subject: 'Matematika', type: 'PDF', size: '2.4 MB', uploaded: '2 hari lalu', teacher: 'Budi Santoso, S.Pd' },
    { id: 2, title: 'Geometri Dasar', subject: 'Matematika', type: 'PPT', size: '5.1 MB', uploaded: '3 hari lalu', teacher: 'Budi Santoso, S.Pd' },
    { id: 3, title: 'Sistem Pencernaan', subject: 'IPA', type: 'PDF', size: '3.8 MB', uploaded: '5 hari lalu', teacher: 'Siti Aminah, S.Pd' },
    { id: 4, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', type: 'PDF', size: '2.1 MB', uploaded: '1 minggu lalu', teacher: 'Dewi Lestari, S.Pd' },
    { id: 5, title: 'Simple Present Tense', subject: 'Bahasa Inggris', type: 'Video', size: '45.2 MB', uploaded: '1 minggu lalu', teacher: 'Ahmad Fauzi, S.Pd' },
  ];

  const statsCards = [
    { title: 'Total Materi', value: '45', icon: BookOpen, color: 'blue' },
    { title: 'Materi Baru', value: '8', icon: FileText, color: 'green' },
    { title: 'Video', value: '12', icon: Video, color: 'purple' },
    { title: 'Dokumen', value: '33', icon: FileText, color: 'orange' },
  ];

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="w-5 h-5"/>;
      case 'PPT': return <FileText className="w-5 h-5"/>;
      case 'Video': return <Video className="w-5 h-5"/>;
      default: return <FileText className="w-5 h-5"/>;
    }
  };

  const getFileColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-600';
      case 'PPT': return 'bg-orange-100 text-orange-600';
      case 'Video': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">LMS Siswa</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-siswa" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-siswa/jadwal" className="block px-4 py-3 hover:bg-gray-50">Jadwal</a>
          <a href="/dashboard-siswa/materi" className="block px-4 py-3 bg-blue-50 text-blue-700">Materi</a>
          <a href="/dashboard-siswa/tugas" className="block px-4 py-3 hover:bg-gray-50">Tugas</a>
          <a href="/dashboard-siswa/ujian" className="block px-4 py-3 hover:bg-gray-50">Ujian</a>
          <a href="/dashboard-siswa/nilai" className="block px-4 py-3 hover:bg-gray-50">Nilai</a>
          <a href="/dashboard-siswa/absensi" className="block px-4 py-3 hover:bg-gray-50">Absensi</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Materi Pembelajaran</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Materi Saya</h1>
            <p className="text-gray-600">Download dan pelajari materi pembelajaran.</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
              <input placeholder="Cari materi..." className="w-full pl-10 pr-4 py-2 border rounded-lg"/>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Judul</th>
                  <th className="text-left p-4">Mapel</th>
                  <th className="text-left p-4">Tipe</th>
                  <th className="text-left p-4">Ukuran</th>
                  <th className="text-left p-4">Guru</th>
                  <th className="text-left p-4">Diupload</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map(m => (
                  <tr key={m.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getFileColor(m.type)}`}>{getFileIcon(m.type)}</div>
                      <span className="font-medium">{m.title}</span>
                    </td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{m.subject}</span></td>
                    <td className="p-4 text-sm">{m.type}</td>
                    <td className="p-4 text-sm text-gray-600">{m.size}</td>
                    <td className="p-4 text-sm text-gray-600">{m.teacher}</td>
                    <td className="p-4 text-sm text-gray-600">{m.uploaded}</td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                        <Download className="w-3 h-3"/> Download
                      </button>
                    </td>
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
