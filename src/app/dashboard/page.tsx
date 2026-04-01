'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  School,
  FileText,
  Wallet,
  CheckSquare,
  Calendar,
  Award,
  BookOpen,
  CreditCard,
  UserCog,
  Megaphone,
  Calendar as CalendarEvent,
  MessageSquare,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  MoreVertical
} from 'lucide-react';

export default function DashboardAdmin() {
  const statsCards = [
    {
      title: 'Total Siswa',
      value: '1,234',
      change: '+24',
      changeType: 'increase',
      period: 'Bulan Ini',
      color: 'orange',
      icon: Users
    },
    {
      title: 'Total Guru',
      value: '86',
      change: '+5',
      changeType: 'increase',
      period: 'Bulan Ini',
      color: 'blue',
      icon: GraduationCap
    },
    {
      title: 'Total Orang Tua',
      value: '1,180',
      change: '+18',
      changeType: 'increase',
      period: 'Bulan Ini',
      color: 'purple',
      icon: UserCheck
    },
    {
      title: 'Total Kelas',
      value: '36',
      change: '+2',
      changeType: 'increase',
      period: 'Bulan Ini',
      color: 'cyan',
      icon: School
    },
    {
      title: 'Kehadiran Hari Ini',
      value: '94.5%',
      change: '+2.1%',
      changeType: 'increase',
      period: 'vs Kemarin',
      color: 'green',
      icon: CheckSquare
    },
    {
      title: 'Pemasukan Bulan Ini',
      value: 'Rp 124.5jt',
      change: '+12.5%',
      changeType: 'increase',
      period: 'vs Bulan Lalu',
      color: 'emerald',
      icon: Wallet
    }
  ];

  const attendanceData = [
    { label: 'Hadir', value: 87, color: 'bg-teal-500' },
    { label: 'Tidak Hadir', value: 40, color: 'bg-orange-500' },
    { label: 'Terlambat', value: 20, color: 'bg-purple-500' },
    { label: 'Setengah Hari', value: 20, color: 'bg-green-500' }
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
    { id: 1, user: 'Ahmad Rizki', action: 'Membayar SPP', amount: 'Rp 450.000', time: '5 menit lalu', status: 'success' },
    { id: 2, user: 'Siti Nurhaliza', action: 'Mengupload Materi', amount: '', time: '15 menit lalu', status: 'info' },
    { id: 3, user: 'Budi Santoso', action: 'Mengajukan Cuti', amount: '', time: '1 jam lalu', status: 'warning' },
    { id: 4, user: 'Dewi Lestari', action: 'Membuat Ujian', amount: '', time: '2 jam lalu', status: 'info' },
    { id: 5, user: 'Eko Prasetyo', action: 'Membayar SPP', amount: 'Rp 450.000', time: '3 jam lalu', status: 'success' }
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
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola sekolah Anda, pantau absensi, keuangan, dan performa.</p>
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
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Kehadiran Siswa</h3>
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
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Kehadiran</span>
              <span className="text-lg font-bold text-green-600">87%</span>
            </div>
          </div>
        </div>

        {/* Revenue Statistics */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Statistik Pemasukan</h3>
              <p className="text-sm text-gray-600 mt-1">Total Tagihan: <span className="font-semibold text-gray-900">Rp 850.000</span> • Terkumpul: <span className="font-semibold text-green-600">Rp 412.000</span></p>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-48 sm:h-64 flex items-end space-x-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex space-x-1 items-end justify-center" style={{ height: '180px' }}>
                  <div
                    className="w-3 sm:w-4 bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                    style={{ height: `${(item.fee / 100) * 180}px` }}
                    title={`Tagihan: ${item.fee}`}
                  />
                  <div
                    className="w-3 sm:w-4 bg-orange-500 rounded-t transition-all hover:bg-orange-600"
                    style={{ height: `${(item.collected / 100) * 180}px` }}
                    title={`Terkumpul: ${item.collected}`}
                  />
                </div>
                <span className="text-xs text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded" />
              <span className="text-sm text-gray-600">Total Tagihan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span className="text-sm text-gray-600">Terkumpul</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
            <a href="/dashboard/activities" className="text-sm text-green-600 hover:underline">Lihat Semua</a>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
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
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Kalender</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <span className="font-medium text-gray-900">Maret 2026</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 28;
              const hasEvent = [5, 12, 15, 20, 25].includes(day);
              
              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                    isToday
                      ? 'bg-green-600 text-white font-bold'
                      : hasEvent
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
