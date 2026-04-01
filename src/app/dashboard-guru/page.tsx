'use client';

import {
  BookOpen, FileText, Users, CheckSquare, TrendingUp,
  Upload, Edit, Trash2, Eye, Plus
} from 'lucide-react';

export default function DashboardGuru() {
  const statsCards = [
    { title: 'Total Kelas', value: '8', change: '+2', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { title: 'Total Siswa', value: '248', change: '+12', icon: Users, color: 'bg-green-50 text-green-600' },
    { title: 'Materi', value: '45', change: '+8', icon: Upload, color: 'bg-purple-50 text-purple-600' },
    { title: 'Tugas', value: '23', change: '+5', icon: FileText, color: 'bg-orange-50 text-orange-600' },
  ];

  const myClasses = [
    { id: 1, name: '7A', subject: 'Matematika', students: 32, schedule: 'Sen, Rab 08:00' },
    { id: 2, name: '7B', subject: 'Matematika', students: 30, schedule: 'Sel, Kam 08:00' },
    { id: 3, name: '8A', subject: 'Matematika', students: 31, schedule: 'Sen, Rab 10:00' },
    { id: 4, name: '8B', subject: 'Matematika', students: 29, schedule: 'Sel, Kam 10:00' },
  ];

  const recentMaterials = [
    { id: 1, title: 'Aljabar Linear', class: '7A', uploaded: '2 jam lalu', downloads: 28 },
    { id: 2, title: 'Geometri Dasar', class: '7B', uploaded: '5 jam lalu', downloads: 25 },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', uploaded: '1 hari lalu', downloads: 30 },
  ];

  const recentAssignments = [
    { id: 1, title: 'Latihan Soal Bab 1', class: '7A', due: '2 Apr 2026', submitted: '28/32' },
    { id: 2, title: 'PR Geometri', class: '7B', due: '3 Apr 2026', submitted: '25/30' },
    { id: 3, title: 'Quiz Aljabar', class: '8A', due: '4 Apr 2026', submitted: '20/31' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Guru</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola kelas, materi, tugas, dan nilai siswa.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 text-sm sm:text-base">
          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Upload Materi</span>
          <span className="font-medium sm:hidden">Materi</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 text-sm sm:text-base">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Buat Tugas</span>
          <span className="font-medium sm:hidden">Tugas</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30 text-sm sm:text-base">
          <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Buat Ujian</span>
          <span className="font-medium sm:hidden">Ujian</span>
        </button>
        <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 text-sm sm:text-base">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Input Nilai</span>
          <span className="font-medium sm:hidden">Nilai</span>
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* My Classes */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Kelas Saya</h3>
            <button className="text-xs sm:text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {myClasses.map((classItem) => (
              <div key={classItem.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all gap-2">
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{classItem.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{classItem.subject} • {classItem.students} siswa</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 sm:text-right">{classItem.schedule}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Materials */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Materi Terbaru</h3>
            <button className="text-xs sm:text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {recentMaterials.map((material) => (
              <div key={material.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{material.title}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Kelas {material.class}</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 sm:text-right pl-10 sm:pl-0">
                  <div>{material.downloads} downloads</div>
                  <div className="text-gray-400">{material.uploaded}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Tugas Terbaru</h3>
          <button className="text-xs sm:text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
        </div>
        
        {/* Mobile Cards */}
        <div className="block sm:hidden space-y-3">
          {recentAssignments.map((assignment) => (
            <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-gray-900 text-sm">{assignment.title}</div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{assignment.class}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span>Deadline: {assignment.due}</span>
                <span className="text-green-600 font-medium">{assignment.submitted}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-white rounded-lg border border-gray-200 text-xs font-medium">
                  <Eye className="w-3 h-3" /> Lihat
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-white rounded-lg border border-gray-200 text-xs font-medium">
                  <Edit className="w-3 h-3" /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Terkumpul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{assignment.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{assignment.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{assignment.due}</td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-green-600">{assignment.submitted}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg transition-all">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
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
