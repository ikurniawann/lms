'use client';
import { TrendingUp, Award, BookOpen, Star } from 'lucide-react';

export default function NilaiPage() {
  const grades = [
    { subject: 'Matematika', uts: 85, uas: 88, avg: 86.5, grade: 'B', credit: 4 },
    { subject: 'IPA', uts: 90, uas: 92, avg: 91, grade: 'A', credit: 4 },
    { subject: 'Bahasa Indonesia', uts: 88, uas: 90, avg: 89, grade: 'B', credit: 4 },
    { subject: 'Bahasa Inggris', uts: 82, uas: 85, avg: 83.5, grade: 'B', credit: 4 },
    { subject: 'IPS', uts: 87, uas: 89, avg: 88, grade: 'B', credit: 4 },
    { subject: 'PJOK', uts: 95, uas: 93, avg: 94, grade: 'A', credit: 2 },
    { subject: 'Seni Budaya', uts: 90, uas: 92, avg: 91, grade: 'A', credit: 2 },
    { subject: 'PKN', uts: 88, uas: 90, avg: 89, grade: 'B', credit: 2 },
  ];

  const statsCards = [
    { title: 'Rata-rata Kelas', value: '88.1', icon: TrendingUp, color: 'blue' },
    { title: 'Peringkat', value: '5', icon: Award, color: 'green' },
    { title: 'Total SKS', value: '26', icon: BookOpen, color: 'purple' },
    { title: 'Nilai Tertinggi', value: '94', icon: Star, color: 'orange' },
  ];

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-yellow-100 text-yellow-700';
      case 'D': return 'bg-orange-100 text-orange-700';
      case 'E': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">LMS Siswa</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-siswa" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-siswa/jadwal" className="block px-4 py-3 hover:bg-gray-50">Jadwal</a>
          <a href="/dashboard-siswa/materi" className="block px-4 py-3 hover:bg-gray-50">Materi</a>
          <a href="/dashboard-siswa/tugas" className="block px-4 py-3 hover:bg-gray-50">Tugas</a>
          <a href="/dashboard-siswa/ujian" className="block px-4 py-3 hover:bg-gray-50">Ujian</a>
          <a href="/dashboard-siswa/nilai" className="block px-4 py-3 bg-blue-50 text-blue-700">Nilai</a>
          <a href="/dashboard-siswa/absensi" className="block px-4 py-3 hover:bg-gray-50">Absensi</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Nilai & Raport</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Nilai Akademik</h1>
            <p className="text-gray-600">Lihat nilai UTS, UAS, dan rata-rata kamu.</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h3 className="font-bold">Nilai Per Mata Pelajaran</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4">Mata Pelajaran</th>
                  <th className="text-left p-4">UTS</th>
                  <th className="text-left p-4">UAS</th>
                  <th className="text-left p-4">Rata-rata</th>
                  <th className="text-left p-4">Grade</th>
                  <th className="text-left p-4">SKS</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{g.subject}</td>
                    <td className="p-4">{g.uts}</td>
                    <td className="p-4">{g.uas}</td>
                    <td className="p-4 font-bold text-blue-600">{g.avg}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-sm font-bold ${getGradeColor(g.grade)}`}>{g.grade}</span></td>
                    <td className="p-4 text-sm text-gray-600">{g.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Semester Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Ringkasan Semester Ini</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold">88.1</div>
                <div className="text-blue-100 text-sm">Rata-rata Semester</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5/32</div>
                <div className="text-blue-100 text-sm">Peringkat Kelas</div>
              </div>
              <div>
                <div className="text-3xl font-bold">26/26</div>
                <div className="text-blue-100 text-sm">Total SKS</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
