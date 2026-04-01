'use client';

import {
  BookOpen, FileText, CheckSquare, TrendingUp,
  Download, Clock, Award
} from 'lucide-react';

export default function DashboardSiswa() {
  const statsCards = [
    { title: 'Rata-rata Nilai', value: '87.5', change: '+2.3', icon: TrendingUp, color: 'blue' },
    { title: 'Tugas Selesai', value: '18/20', change: '+3', icon: CheckSquare, color: 'green' },
    { title: 'Kehadiran', value: '96%', change: '+1%', icon: Clock, color: 'purple' },
    { title: 'Penghargaan', value: '5', change: '+1', icon: Award, color: 'orange' },
  ];

  const schedule = [
    { day: 'Senin', subjects: ['Matematika (08:00)', 'IPA (10:00)', 'Bahasa Indonesia (13:00)'] },
    { day: 'Selasa', subjects: ['IPA (08:00)', 'IPS (10:00)', 'Bahasa Inggris (13:00)'] },
    { day: 'Rabu', subjects: ['Matematika (08:00)', 'PJOK (10:00)', 'Seni Budaya (13:00)'] },
    { day: 'Kamis', subjects: ['Bahasa Indonesia (08:00)', 'IPA (10:00)', 'PKN (13:00)'] },
    { day: 'Jumat', subjects: ['Upacara (07:00)', 'Agama (09:00)', 'BK (10:00)'] },
  ];

  const recentMaterials = [
    { id: 1, subject: 'Matematika', title: 'Aljabar Linear', teacher: 'Budi Santoso, S.Pd', uploaded: '2 jam lalu' },
    { id: 2, subject: 'IPA', title: 'Sistem Pencernaan', teacher: 'Siti Aminah, S.Pd', uploaded: '5 jam lalu' },
    { id: 3, subject: 'Bahasa Indonesia', title: 'Teks Eksposisi', teacher: 'Dewi Lestari, S.Pd', uploaded: '1 hari lalu' },
  ];

  const upcomingAssignments = [
    { id: 1, subject: 'Matematika', title: 'Latihan Soal Bab 1', due: '2 Apr 2026', status: 'Belum dikerjakan' },
    { id: 2, subject: 'IPA', title: 'PR Sistem Pencernaan', due: '3 Apr 2026', status: 'Belum dikerjakan' },
    { id: 3, subject: 'Bahasa Inggris', title: 'Essay about Family', due: '4 Apr 2026', status: 'Sudah dikerjakan' },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Siswa</h1>
        <p className="text-sm sm:text-base text-gray-600">Pantau jadwal, materi, tugas, dan nilai kamu.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm text-green-600 font-medium">↑ {stat.change}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Schedule & Materials */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Weekly Schedule */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Jadwal Pelajaran</h3>
            <button className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {schedule.slice(0, 5).map((day, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">{day.day}</div>
                <div className="space-y-1">
                  {day.subjects.map((subject, idx) => (
                    <div key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Materials */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Materi Terbaru</h3>
            <button className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {recentMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{material.title}</div>
                    <div className="text-sm text-gray-600">{material.subject} • {material.teacher}</div>
                  </div>
                </div>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition-all">
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Tugas Mendatang</h3>
          <button className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{assignment.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{assignment.subject}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{assignment.due}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      assignment.status === 'Sudah dikerjakan'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-blue-600 hover:underline font-medium">
                      {assignment.status === 'Sudah dikerjakan' ? 'Lihat' : 'Kerjakan'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
