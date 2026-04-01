'use client';
import { Users, TrendingUp, Calendar, Wallet, BookOpen, Bell } from 'lucide-react';

export default function ParentDashboard() {
  const children = [
    { id: 1, name: 'Ahmad Rizki', class: '8A', nis: '2024001', photo: 'AR' },
    { id: 2, name: 'Siti Nurhaliza', class: '6B', nis: '2022045', photo: 'SN' },
  ];

  const statsCards = [
    { title: 'Total Anak', value: '2', icon: Users, color: 'blue' },
    { title: 'Rata-rata Nilai', value: '88.5', icon: TrendingUp, color: 'green' },
    { title: 'Kehadiran', value: '96%', icon: Calendar, color: 'purple' },
    { title: 'Tagihan Belum', value: 'Rp 300K', icon: Wallet, color: 'orange' },
  ];

  const recentActivities = [
    { type: 'grade', child: 'Ahmad Rizki', title: 'Nilai UTS Matematika keluar', value: '85', date: '2 jam lalu' },
    { type: 'attendance', child: 'Ahmad Rizki', title: 'Absensi hari ini', value: 'Hadir', date: 'Hari ini, 06:45' },
    { type: 'assignment', child: 'Siti Nurhaliza', title: 'Tugas Bahasa Indonesia dikumpulkan', value: 'Submitted', date: '3 jam lalu' },
    { type: 'announcement', child: 'School', title: 'Libur Tahun Baru Islam', value: '29 Mar 2026', date: '1 hari lalu' },
  ];

  const upcomingEvents = [
    { date: '01 Apr 2026', event: 'Parent-Teacher Meeting', class: '8A' },
    { date: '05 Apr 2026', event: 'Ujian Tengah Semester', class: 'All' },
    { date: '10 Apr 2026', event: 'Pembagian Raport', class: 'All' },
  ];

  const notifications = [
    { id: 1, title: 'SPP Maret 2026 belum dibayar', type: 'payment', urgent: true },
    { id: 2, title: 'Nilai UTS Matematika sudah keluar', type: 'grade', urgent: false },
    { id: 3, title: 'Undangan Parent-Teacher Meeting', type: 'event', urgent: false },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Selamat Datang, Budi Santoso!</h1>
        <p className="text-sm sm:text-base text-gray-600">Dashboard monitoring akademik anak-anak Anda.</p>
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
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Children Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                {child.photo}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">{child.name}</h3>
                <p className="text-sm text-gray-500">Kelas {child.class}</p>
                <p className="text-xs text-gray-400">NIS: {child.nis}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">88.5</div>
                <div className="text-xs text-gray-500">Rata-rata</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">96%</div>
                <div className="text-xs text-gray-500">Kehadiran</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">5</div>
                <div className="text-xs text-gray-500">Peringkat</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'grade' ? 'bg-green-100' :
                        activity.type === 'attendance' ? 'bg-blue-100' :
                          activity.type === 'assignment' ? 'bg-purple-100' :
                            'bg-orange-100'
                    }`}>
                      {activity.type === 'grade' ? <TrendingUp className="w-4 h-4" /> :
                        activity.type === 'attendance' ? <Calendar className="w-4 h-4" /> :
                          activity.type === 'assignment' ? <BookOpen className="w-4 h-4" /> :
                            <Bell className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{activity.title}</div>
                      <div className="text-xs text-gray-500">{activity.child}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{activity.value}</div>
                    <div className="text-xs text-gray-400">{activity.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Acara Mendatang</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{event.event}</div>
                    <div className="text-sm text-gray-500">Kelas {event.class}</div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">{event.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Notifikasi</h3>
          <button className="text-sm text-blue-600 hover:underline font-medium">Lihat Semua</button>
        </div>
        <div className="divide-y divide-gray-100">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-4 hover:bg-gray-50 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${notif.urgent ? 'bg-red-100' : 'bg-blue-100'}`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{notif.title}</div>
                    <div className="text-xs text-gray-500 capitalize">{notif.type}</div>
                  </div>
                </div>
                {notif.urgent && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Urgent</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
