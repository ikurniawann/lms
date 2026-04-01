'use client';
import { BookOpen, TrendingUp, Award } from 'lucide-react';

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
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-700';
      case 'B': return 'bg-blue-100 text-blue-700';
      case 'C': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Akademik</h1>
        <p className="text-sm sm:text-base text-gray-600">Lihat progress belajar dan nilai anak Anda.</p>
      </div>

      {/* Child Info */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">AR</div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{child.name}</h2>
            <p className="text-sm text-gray-600">Kelas {child.class} • Semester {child.semester}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Grafik Performa Akademik</h3>
        <div className="h-48 sm:h-64 flex items-end justify-between space-x-2">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                style={{ height: `${(d.avg / 100) * 200}px` }}
              ></div>
              <div className="text-xs text-gray-600 mt-2">{d.month}</div>
              <div className="text-xs font-bold text-blue-600">{d.avg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Nilai Per Mata Pelajaran</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mata Pelajaran</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">UTS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">UAS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rata-rata</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SKS</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{g.subject}</td>
                  <td className="py-3 px-4 text-sm">{g.uts}</td>
                  <td className="py-3 px-4 text-sm">{g.uas}</td>
                  <td className="py-3 px-4 text-sm font-bold text-blue-600">{g.avg}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-bold ${getGradeColor(g.grade)}`}>{g.grade}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{g.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
