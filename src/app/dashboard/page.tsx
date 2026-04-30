'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, School,
  FileText, Wallet, CheckSquare, Calendar, Award, BookOpen,
  CreditCard, UserCog, Megaphone, MessageSquare, Search,
  Bell, Settings, LogOut, ChevronRight, TrendingUp, TrendingDown, Globe
} from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function DashboardAdmin() {
  const { locale, t, toggleLanguage } = useTranslation();

  const statsCards = [
    { title: t('admin.stats.totalStudents'), value: '1,234', change: '+24', changeType: 'increase', period: t('admin.stats.thisMonth'), color: 'orange', icon: Users },
    { title: t('admin.stats.totalTeachers'), value: '86', change: '+5', changeType: 'increase', period: t('admin.stats.thisMonth'), color: 'blue', icon: GraduationCap },
    { title: t('admin.stats.totalParents'), value: '1,180', change: '+18', changeType: 'increase', period: t('admin.stats.thisMonth'), color: 'purple', icon: UserCheck },
    { title: t('admin.stats.totalClasses'), value: '36', change: '+2', changeType: 'increase', period: t('admin.stats.thisMonth'), color: 'cyan', icon: School },
    { title: t('admin.stats.attendanceToday'), value: '94.5%', change: '+2.1%', changeType: 'increase', period: t('admin.stats.vsYesterday'), color: 'green', icon: CheckSquare },
    { title: t('admin.stats.revenueThisMonth'), value: 'Rp 124.5jt', change: '+12.5%', changeType: 'increase', period: t('admin.stats.vsLastMonth'), color: 'emerald', icon: Wallet },
  ];

  const attendanceData = [
    { label: t('attendance.present'), value: 87, color: 'bg-teal-500' },
    { label: t('attendance.absent'), value: 40, color: 'bg-orange-500' },
    { label: t('attendance.late'), value: 20, color: 'bg-purple-500' },
    { label: t('attendance.halfDay'), value: 20, color: 'bg-green-500' }
  ];

  const revenueData = [
    { month: 'Jan', fee: 50, collected: 18 },
    { month: 'Feb', fee: 60, collected: 24 },
    { month: 'Mar', fee: 80, collected: 50 },
    { month: 'Apr', fee: 70, collected: 30 },
    { month: 'May', fee: 90, collected: 60 },
    { month: 'Jun', fee: 65, collected: 20 },
    { month: 'Jul', fee: 75, collected: 40 },
    { month: 'Aug', fee: 85, collected: 50 },
    { month: 'Sep', fee: 70, collected: 10 },
    { month: 'Oct', fee: 80, collected: 50 },
    { month: 'Nov', fee: 90, collected: 20 },
    { month: 'Dec', fee: 75, collected: 40 }
  ];

  const recentActivities = [
    { id: 1, user: 'Ahmad Rizki', action: t('admin.activities.paidSPP'), amount: 'Rp 450.000', time: t('admin.time.5minAgo'), status: 'success' },
    { id: 2, user: 'Siti Nurhaliza', action: t('admin.activities.uploadedMaterial'), amount: '', time: t('admin.time.15minAgo'), status: 'info' },
    { id: 3, user: 'Budi Santoso', action: t('admin.activities.submittedLeave'), amount: '', time: t('admin.time.1hourAgo'), status: 'warning' },
    { id: 4, user: 'Dewi Lestari', action: t('admin.activities.createdExam'), amount: '', time: t('admin.time.2hoursAgo'), status: 'info' },
    { id: 5, user: 'Eko Prasetyo', action: t('admin.activities.paidSPP'), amount: 'Rp 450.000', time: t('admin.time.3hoursAgo'), status: 'success' }
  ];

  const colorClasses: Record<string, string> = {
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    green: 'bg-green-50 text-green-600',
    emerald: 'bg-emerald-50 text-emerald-600'
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with Language Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('admin.title')}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t('admin.subtitle')}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
              <div className="flex items-center space-x-1 text-xs">
                <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                  {stat.changeType === 'increase' ? '↑' : '↓'} {stat.change}
                </span>
                <span className="text-gray-500">{stat.period}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Student Attendance */}
        <div className="lg:col-span-1 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('attendance.title')}</h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {attendanceData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('attendance.totalAttendance')}</span>
              <span className="text-lg font-bold text-green-600">87%</span>
            </div>
          </div>
        </div>

        {/* Revenue Statistics */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('revenue.title')}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {t('revenue.totalBilling')}: <span className="font-semibold text-gray-900">Rp 850.000</span> • 
                {t('revenue.collected')}: <span className="font-semibold text-green-600">Rp 412.000</span>
              </p>
            </div>
          </div>

          <div className="h-48 sm:h-64 flex items-end space-x-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex space-x-1 items-end justify-center" style={{ height: '180px' }}>
                  <div className="w-3 sm:w-4 bg-teal-500 rounded-t transition-all hover:bg-teal-600" style={{ height: `${(item.fee / 100) * 180}px` }} title={`${t('revenue.totalBilling')}: ${item.fee}`} />
                  <div className="w-3 sm:w-4 bg-orange-500 rounded-t transition-all hover:bg-orange-600" style={{ height: `${(item.collected / 100) * 180}px` }} title={`${t('revenue.collected')}: ${item.collected}`} />
                </div>
                <span className="text-xs text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded" />
              <span className="text-sm text-gray-600">{t('revenue.totalBilling')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span className="text-sm text-gray-600">{t('revenue.collected')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('admin.activities.title')}</h3>
            <Link href="/dashboard/activities" className="text-sm text-green-600 hover:underline">{t('common.viewAll')}</Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{activity.user}</div>
                    <div className="text-sm text-gray-600">{activity.action}</div>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && <div className="font-semibold text-gray-900 text-sm">{activity.amount}</div>}
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('calendar.title')}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5 rotate-180" /></button>
              <span className="font-medium text-gray-900">Maret 2026</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 28;
              const hasEvent = [5, 12, 15, 20, 25].includes(day);
              return (
                <div key={day} className={`aspect-square flex items-center justify-center text-sm rounded-lg ${isToday ? 'bg-green-600 text-white font-bold' : hasEvent ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>{day}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
