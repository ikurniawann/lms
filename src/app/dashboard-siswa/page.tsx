'use client';

import {
  BookOpen, FileText, CheckSquare, TrendingUp,
  Download, Clock, Award, Globe, LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/i18n';

export default function DashboardSiswa() {
  const { locale, t, toggleLanguage } = useTranslation();

  const statsCards = [
    { title: t('siswa.stats.averageGrade'), value: '87.5', change: '+2.3', icon: TrendingUp, color: 'blue' },
    { title: t('siswa.stats.assignmentsCompleted'), value: '18/20', change: '+3', icon: CheckSquare, color: 'green' },
    { title: t('siswa.stats.attendance'), value: '96%', change: '+1%', icon: Clock, color: 'purple' },
    { title: t('siswa.stats.awards'), value: '5', change: '+1', icon: Award, color: 'orange' },
  ];

  const schedule = [
    { day: t('schedule.monday'), subjects: ['Matematika (08:00)', 'IPA (10:00)', 'Bahasa Indonesia (13:00)'] },
    { day: t('schedule.tuesday'), subjects: ['IPA (08:00)', 'IPS (10:00)', 'Bahasa Inggris (13:00)'] },
    { day: t('schedule.wednesday'), subjects: ['Matematika (08:00)', 'PJOK (10:00)', 'Seni Budaya (13:00)'] },
    { day: t('schedule.thursday'), subjects: ['Bahasa Indonesia (08:00)', 'IPA (10:00)', 'PKN (13:00)'] },
    { day: t('schedule.friday'), subjects: ['Upacara (07:00)', 'Agama (09:00)', 'BK (10:00)'] },
  ];

  const recentMaterials = [
    { id: 1, subject: 'Matematika', title: 'Aljabar Linear', teacher: 'Budi Santoso, S.Pd', uploaded: '2 jam lalu' },
    { id: 2, subject: 'IPA', title: 'Sistem Pencernaan', teacher: 'Siti Aminah, S.Pd', uploaded: '5 jam lalu' },
    { id: 3, subject: 'Bahasa Indonesia', title: 'Teks Eksposisi', teacher: 'Dewi Lestari, S.Pd', uploaded: '1 hari lalu' },
  ];

  const upcomingAssignments = [
    { id: 1, subject: 'Matematika', title: 'Latihan Soal Bab 1', due: '2 Apr 2026', status: t('assignments.notDoneYet') },
    { id: 2, subject: 'IPA', title: 'PR Sistem Pencernaan', due: '3 Apr 2026', status: t('assignments.notDoneYet') },
    { id: 3, subject: 'Bahasa Inggris', title: 'Essay about Family', due: '4 Apr 2026', status: t('assignments.done') },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('siswa.title')}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t('siswa.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{locale === 'id' ? 'EN' : 'ID'}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">{t('common.logout')}</span>
          </button>
        </div>
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
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('schedule.title')}</h3>
            <Link href="/dashboard-siswa/jadwal" className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">{t('common.viewAll')}</Link>
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
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('materials.recentTitle')}</h3>
            <Link href="/dashboard-siswa/materi" className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">{t('common.viewAll')}</Link>
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
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('assignments.upcomingTitle')}</h3>
          <Link href="/dashboard-siswa/tugas" className="text-xs sm:text-sm text-blue-600 hover:underline font-medium">{t('common.viewAll')}</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('assignments.title')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('assignments.subject')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('assignments.deadline')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('assignments.status')}</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{assignment.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{assignment.subject}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{assignment.due}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${assignment.status === t('assignments.done') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-blue-600 hover:underline font-medium">
                      {assignment.status === t('assignments.done') ? t('common.view') : t('assignments.do')}
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
