'use client';
import { Calendar, Clock, BookOpen, Users } from 'lucide-react';

export default function JadwalPage() {
  type ScheduleItem = { subject: string; time: string; teacher: string; room: string };
  type Schedule = { [key: string]: ScheduleItem[] };

  const schedule: Schedule = {
    'Senin': [
      { subject: 'Matematika', time: '07:00 - 08:30', teacher: 'Budi Santoso, S.Pd', room: 'R.101' },
      { subject: 'IPA', time: '08:30 - 10:00', teacher: 'Siti Aminah, S.Pd', room: 'R.101' },
      { subject: 'Bahasa Indonesia', time: '10:30 - 12:00', teacher: 'Dewi Lestari, S.Pd', room: 'R.101' },
    ],
    'Selasa': [
      { subject: 'Bahasa Inggris', time: '07:00 - 08:30', teacher: 'Ahmad Fauzi, S.Pd', room: 'R.101' },
      { subject: 'IPS', time: '08:30 - 10:00', teacher: 'Eko Prasetyo, S.Pd', room: 'R.101' },
      { subject: 'PJOK', time: '10:30 - 12:00', teacher: 'Rina Wijaya, S.Pd', room: 'Lapangan' },
    ],
    'Rabu': [
      { subject: 'Matematika', time: '07:00 - 08:30', teacher: 'Budi Santoso, S.Pd', room: 'R.101' },
      { subject: 'Seni Budaya', time: '08:30 - 10:00', teacher: 'Fitri Handayani, S.Pd', room: 'R.103' },
      { subject: 'PKN', time: '10:30 - 12:00', teacher: 'Ahmad Fauzi, S.Pd', room: 'R.101' },
    ],
    'Kamis': [
      { subject: 'IPA', time: '07:00 - 08:30', teacher: 'Siti Aminah, S.Pd', room: 'R.101' },
      { subject: 'Bahasa Indonesia', time: '08:30 - 10:00', teacher: 'Dewi Lestari, S.Pd', room: 'R.101' },
      { subject: 'Agama', time: '10:30 - 12:00', teacher: 'Ustadz Ali', room: 'Masjid' },
    ],
    'Jumat': [
      { subject: 'Upacara', time: '07:00 - 08:00', teacher: 'All Teachers', room: 'Lapangan' },
      { subject: 'BK', time: '08:00 - 09:30', teacher: 'Konselor', room: 'R.104' },
      { subject: 'Pramuka', time: '09:30 - 12:00', teacher: 'Pembina', room: 'Lapangan' },
    ],
  };

  const statsCards = [
    { title: 'Total Pelajaran', value: '15', icon: BookOpen, color: 'blue' },
    { title: 'Jam Per Minggu', value: '35', icon: Clock, color: 'green' },
    { title: 'Guru Pengampu', value: '12', icon: Users, color: 'purple' },
    { title: 'Ruangan', value: '8', icon: Calendar, color: 'orange' },
  ];

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Jadwal Pelajaran</h1>
        <p className="text-sm sm:text-base text-gray-600">Jadwal pelajaran mingguan kelas 8A.</p>
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

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
              <h3 className="text-lg font-bold text-white">{day}</h3>
            </div>
            <div className="p-4 space-y-3">
              {schedule[day].map((item, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-3 py-2">
                  <div className="font-semibold text-gray-900 text-sm">{item.subject}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.teacher} • {item.room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
