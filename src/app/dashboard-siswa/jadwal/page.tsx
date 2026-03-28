'use client';
import { Calendar, Clock, BookOpen, Users } from 'lucide-react';

export default function JadwalPage() {
  const schedule = {
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

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <Calendar className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">LMS Siswa</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-siswa" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/dashboard-siswa/jadwal" className="block px-4 py-3 bg-blue-50 text-blue-700">Jadwal</a>
          <a href="/dashboard-siswa/materi" className="block px-4 py-3 hover:bg-gray-50">Materi</a>
          <a href="/dashboard-siswa/tugas" className="block px-4 py-3 hover:bg-gray-50">Tugas</a>
          <a href="/dashboard-siswa/ujian" className="block px-4 py-3 hover:bg-gray-50">Ujian</a>
          <a href="/dashboard-siswa/nilai" className="block px-4 py-3 hover:bg-gray-50">Nilai</a>
          <a href="/dashboard-siswa/absensi" className="block px-4 py-3 hover:bg-gray-50">Absensi</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Jadwal Pelajaran</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Jadwal Kelas 8A</h1>
            <p className="text-gray-600">Jadwal pelajaran mingguan.</p>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map((day, dayIndex) => (
              <div key={day} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">{day}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {schedule[day].map((item, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="font-semibold text-gray-900">{item.subject}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3"/>
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
        </main>
      </div>
    </div>
  );
}
