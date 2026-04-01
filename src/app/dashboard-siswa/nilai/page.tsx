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
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Nilai & Raport</h1>
        <p className="text-sm sm:text-base text-gray-600">Lihat nilai UTS, UAS, dan rata-rata kamu.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 sm:mb-8">
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
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{g.subject}</td>
                  <td className="py-3 px-4 text-sm">{g.uts}</td>
                  <td className="py-3 px-4 text-sm">{g.uas}</td>
                  <td className="py-3 px-4 text-sm font-bold text-blue-600">{g.avg}</td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-sm font-bold ${getGradeColor(g.grade)}`}>{g.grade}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semester Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Ringkasan Semester Ini</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl sm:text-3xl font-bold">88.1</div>
            <div className="text-blue-100 text-sm">Rata-rata Semester</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">5/32</div>
            <div className="text-blue-100 text-sm">Peringkat Kelas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">26/26</div>
            <div className="text-blue-100 text-sm">Total SKS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
