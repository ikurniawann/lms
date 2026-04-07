'use client';

import { useState } from 'react';
import { 
  Users, TrendingUp, Calendar, Wallet, BookOpen, Bell, X, Eye, 
  GraduationCap, Clock, FileText, CheckCircle, ChevronRight, Phone, Mail
} from 'lucide-react';

interface Child {
  id: number;
  name: string;
  class: string;
  nis: string;
  photo: string;
  avgGrade: number;
  attendance: number;
  rank: number;
  teacher: string;
  phone: string;
  email: string;
}

interface Activity {
  id: number;
  type: 'grade' | 'attendance' | 'assignment' | 'exam' | 'payment';
  title: string;
  description?: string;
  value?: string;
  date: string;
  time?: string;
  status?: 'success' | 'warning' | 'pending';
}

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showChildModal, setShowChildModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'grades' | 'attendance'>('overview');

  const children: Child[] = [
    { 
      id: 1, 
      name: 'Ahmad Rizki', 
      class: '10A', 
      nis: '2024001', 
      photo: 'AR',
      avgGrade: 88.5,
      attendance: 96,
      rank: 5,
      teacher: 'Budi Santoso, S.Pd',
      phone: '0812-3456-7890',
      email: 'ahmad.rizki@email.com'
    },
    { 
      id: 2, 
      name: 'Siti Nurhaliza', 
      class: '8B', 
      nis: '2022045', 
      photo: 'SN',
      avgGrade: 91.2,
      attendance: 98,
      rank: 3,
      teacher: 'Dewi Lestari, S.Pd',
      phone: '0812-3456-7891',
      email: 'siti.nurhaliza@email.com'
    },
  ];

  const childActivities: Record<number, Activity[]> = {
    1: [
      { id: 1, type: 'grade', title: 'Nilai UTS Matematika', description: 'Ujian Tengah Semester - Matematika', value: '85', date: 'Hari ini', time: '10:30', status: 'success' },
      { id: 2, type: 'attendance', title: 'Absensi Masuk', description: 'Hadir tepat waktu', value: 'Hadir', date: 'Hari ini', time: '06:45', status: 'success' },
      { id: 3, type: 'assignment', title: 'Tugas Fisika Dikumpulkan', description: 'Latihan Soal Bab 3', date: 'Kemarin', time: '20:15', status: 'success' },
      { id: 4, type: 'exam', title: 'Ujian Praktikum', description: 'Praktikum Biologi - Sistem Pencernaan', value: '92', date: '2 hari lalu', status: 'success' },
      { id: 5, type: 'payment', title: 'Pembayaran SPP', description: 'SPP Februari 2026 - Lunas', value: 'Rp 150.000', date: '1 minggu lalu', status: 'success' },
    ],
    2: [
      { id: 1, type: 'grade', title: 'Nilai Quiz Bahasa Inggris', description: 'Vocabulary Test', value: '95', date: 'Hari ini', time: '09:00', status: 'success' },
      { id: 2, type: 'attendance', title: 'Absensi Masuk', description: 'Hadir tepat waktu', value: 'Hadir', date: 'Hari ini', time: '06:50', status: 'success' },
      { id: 3, type: 'assignment', title: 'Tugas Seni Budaya', description: 'Gambar Pemandangan - Sudah dikumpulkan', date: 'Kemarin', time: '19:00', status: 'success' },
      { id: 4, type: 'payment', title: 'Pembayaran SPP', description: 'SPP Maret 2026 - Lunas', value: 'Rp 150.000', date: '5 hari lalu', status: 'success' },
    ]
  };

  const childGrades: Record<number, {subject: string; teacher: string; grade: number; status: string}[]> = {
    1: [
      { subject: 'Matematika', teacher: 'Budi Santoso, S.Pd', grade: 85, status: 'Baik' },
      { subject: 'Fisika', teacher: 'Ahmad Fauzi, S.Pd', grade: 88, status: 'Baik' },
      { subject: 'Biologi', teacher: 'Siti Aminah, S.Pd', grade: 92, status: 'Sangat Baik' },
      { subject: 'Bahasa Indonesia', teacher: 'Dewi Lestari, S.Pd', grade: 78, status: 'Cukup' },
      { subject: 'Bahasa Inggris', teacher: 'Rina Susanti, S.Pd', grade: 90, status: 'Sangat Baik' },
    ],
    2: [
      { subject: 'Matematika', teacher: 'Budi Santoso, S.Pd', grade: 89, status: 'Baik' },
      { subject: 'IPA', teacher: 'Siti Aminah, S.Pd', grade: 94, status: 'Sangat Baik' },
      { subject: 'Bahasa Indonesia', teacher: 'Dewi Lestari, S.Pd', grade: 91, status: 'Sangat Baik' },
      { subject: 'Bahasa Inggris', teacher: 'Rina Susanti, S.Pd', grade: 95, status: 'Sangat Baik' },
      { subject: 'Seni Budaya', teacher: 'Ahmad Fauzi, S.Pd', grade: 88, status: 'Baik' },
    ]
  };

  const childAttendance: Record<number, {month: string; present: number; sick: number; absent: number; percentage: number}[]> = {
    1: [
      { month: 'Januari', present: 22, sick: 0, absent: 0, percentage: 100 },
      { month: 'Februari', present: 20, sick: 1, absent: 0, percentage: 95 },
      { month: 'Maret', present: 21, sick: 0, absent: 1, percentage: 95 },
    ],
    2: [
      { month: 'Januari', present: 22, sick: 0, absent: 0, percentage: 100 },
      { month: 'Februari', present: 21, sick: 0, absent: 0, percentage: 100 },
      { month: 'Maret', present: 22, sick: 0, absent: 0, percentage: 100 },
    ]
  };

  const statsCards = [
    { title: 'Total Anak', value: '2', icon: Users, color: 'blue' },
    { title: 'Rata-rata Nilai', value: '89.9', icon: TrendingUp, color: 'green' },
    { title: 'Kehadiran', value: '97%', icon: Calendar, color: 'purple' },
    { title: 'Tagihan Belum', value: 'Rp 450K', icon: Wallet, color: 'orange' },
  ];

  const upcomingEvents = [
    { date: '01 Apr 2026', event: 'Parent-Teacher Meeting', class: 'All' },
    { date: '05 Apr 2026', event: 'Ujian Tengah Semester', class: 'All' },
    { date: '10 Apr 2026', event: 'Pembagian Raport', class: 'All' },
  ];

  const notifications = [
    { id: 1, title: 'SPP Maret 2026 belum dibayar', type: 'payment', urgent: true },
    { id: 2, title: 'Nilai UTS Matematika sudah keluar', type: 'grade', urgent: false },
    { id: 3, title: 'Undangan Parent-Teacher Meeting', type: 'event', urgent: false },
  ];

  const handleChildClick = (child: Child) => {
    setSelectedChild(child);
    setShowChildModal(true);
    setActiveTab('overview');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade': return <TrendingUp className="w-4 h-4" />;
      case 'attendance': return <Calendar className="w-4 h-4" />;
      case 'assignment': return <BookOpen className="w-4 h-4" />;
      case 'exam': return <FileText className="w-4 h-4" />;
      case 'payment': return <Wallet className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'grade': return 'bg-green-100 text-green-600';
      case 'attendance': return 'bg-blue-100 text-blue-600';
      case 'assignment': return 'bg-purple-100 text-purple-600';
      case 'exam': return 'bg-orange-100 text-orange-600';
      case 'payment': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const currentActivities = selectedChild ? childActivities[selectedChild.id] || [] : [];
  const currentGrades = selectedChild ? childGrades[selectedChild.id] || [] : [];
  const currentAttendance = selectedChild ? childAttendance[selectedChild.id] || [] : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Child Detail Modal */}
      {showChildModal && selectedChild && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                    {selectedChild.photo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedChild.name}</h2>
                    <p className="text-white/80">Kelas {selectedChild.class} • NIS: {selectedChild.nis}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChildModal(false)} 
                  className="p-2 hover:bg-white/20 rounded-lg text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['overview', 'activities', 'grades', 'attendance'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab 
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab === 'overview' && 'Ringkasan'}
                  {tab === 'activities' && 'Aktivitas'}
                  {tab === 'grades' && 'Nilai'}
                  {tab === 'attendance' && 'Absensi'}
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-700">{selectedChild.avgGrade}</p>
                      <p className="text-sm text-green-600">Rata-rata Nilai</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-700">{selectedChild.attendance}%</p>
                      <p className="text-sm text-blue-600">Kehadiran</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl text-center">
                      <GraduationCap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-700">#{selectedChild.rank}</p>
                      <p className="text-sm text-purple-600">Peringkat</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Informasi Kontak</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{selectedChild.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{selectedChild.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Wali Kelas: {selectedChild.teacher}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities Preview */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Aktivitas Terbaru</h4>
                      <button 
                        onClick={() => setActiveTab('activities')}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Lihat Semua <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {currentActivities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.date}{activity.time && `, ${activity.time}`}</p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.value || activity.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="space-y-3">
                  {currentActivities.map((activity) => (
                    <div key={activity.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{activity.title}</p>
                              {activity.description && (
                                <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                              )}
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                              {activity.value || activity.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" /> {activity.date}
                            </span>
                            {activity.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {activity.time}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'grades' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg font-semibold text-sm text-gray-700">
                    <span>Mata Pelajaran</span>
                    <span>Guru</span>
                    <span className="text-center">Nilai</span>
                    <span className="text-center">Status</span>
                  </div>
                  
                  {currentGrades.map((grade, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 p-4 border border-gray-200 rounded-xl items-center">
                      <span className="font-medium text-gray-900">{grade.subject}</span>
                      <span className="text-sm text-gray-600">{grade.teacher}</span>
                      <span className="text-center font-bold text-lg text-gray-900">{grade.grade}</span>
                      <span className={`text-center px-2 py-1 rounded-full text-xs font-medium ${
                        grade.grade >= 90 ? 'bg-green-100 text-green-700' :
                        grade.grade >= 80 ? 'bg-blue-100 text-blue-700' :
                        grade.grade >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {grade.status}
                      </span>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-900">Rata-rata Keseluruhan</span>
                      <span className="text-2xl font-bold text-blue-700">{selectedChild.avgGrade}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attendance' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 p-3 bg-gray-50 rounded-lg font-semibold text-sm text-gray-700">
                    <span>Bulan</span>
                    <span className="text-center">Hadir</span>
                    <span className="text-center">Sakit</span>
                    <span className="text-center">Alpa</span>
                    <span className="text-center">Persentase</span>
                  </div>
                  
                  {currentAttendance.map((att, idx) => (
                    <div key={idx} className="grid grid-cols-5 gap-4 p-4 border border-gray-200 rounded-xl items-center">
                      <span className="font-medium text-gray-900">{att.month}</span>
                      <span className="text-center text-green-600 font-semibold">{att.present}</span>
                      <span className="text-center text-yellow-600 font-semibold">{att.sick}</span>
                      <span className="text-center text-red-600 font-semibold">{att.absent}</span>
                      <span className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          att.percentage >= 95 ? 'bg-green-100 text-green-700' :
                          att.percentage >= 80 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {att.percentage}%
                        </span>
                      </span>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-900">Total Kehadiran</span>
                      <span className="text-2xl font-bold text-blue-700">{selectedChild.attendance}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Selamat Datang, Budi Santoso!</h1>
        <p className="text-sm sm:text-base text-gray-600">Dashboard monitoring akademik anak-anak Anda. Klik nama anak untuk melihat detail aktivitas.</p>
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

      {/* Children Cards - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {children.map((child) => (
          <div 
            key={child.id} 
            onClick={() => handleChildClick(child)}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                {child.photo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{child.name}</h3>
                  <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">Kelas {child.class}</p>
                <p className="text-xs text-gray-400">NIS: {child.nis}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{child.avgGrade}</div>
                <div className="text-xs text-gray-500">Rata-rata</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{child.attendance}%</div>
                <div className="text-xs text-gray-500">Kehadiran</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">#{child.rank}</div>
                <div className="text-xs text-gray-500">Peringkat</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
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
