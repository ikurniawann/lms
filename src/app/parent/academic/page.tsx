'use client';
import { BookOpen, TrendingUp, Award, BarChart } from 'lucide-react';

export default function ParentAcademic() {
  const child = { name: 'Ahmad Rizki', class: '8A', semester: 'Ganjil 2025/2026' };

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

  const chartData = [
    { month: 'Jul', avg: 85 },
    { month: 'Aug', avg: 87 },
    { month: 'Sep', avg: 86 },
    { month: 'Oct', avg: 88 },
    { month: 'Nov', avg: 89 },
    { month: 'Dec', avg: 88.5 },
  ];

  const statsCards = [
    { title: 'Rata-rata Semester', value: '88.5', icon: TrendingUp, color: 'blue' },
    { title: 'Peringkat Kelas', value: '5/32', icon: Award, color: 'green' },
    { title: 'Total SKS', value: '26', icon: BookOpen, color: 'purple' },
    { title: 'Nilai Tertinggi', value: '94 (PJOK)', icon: BarChart, color: 'orange' },
  ];

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">Parent Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/parent/dashboard" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/parent/academic" className="block px-4 py-3 bg-blue-50 text-blue-700">Akademik</a>
          <a href="/parent/attendance" className="block px-4 py-3 hover:bg-gray-50">Absensi</a>
          <a href="/parent/finance" className="block px-4 py-3 hover:bg-gray-50">Keuangan</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Akademik</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{child.name}</h1>
            <p className="text-gray-600">Kelas {child.class} • Semester {child.semester}</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="font-bold mb-4">Grafik Performa Akademik</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-600 rounded-t" style={{ height: `${(d.avg / 100) * 200}px` }}></div>
                  <div className="text-xs text-gray-600 mt-2">{d.month}</div>
                  <div className="text-xs font-bold text-blue-600">{d.avg}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
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
        </main>
      </div>
    </div>
  );
}
