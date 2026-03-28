'use client';
import { MessageSquare, Send, Users, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ParentMessages() {
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [newMessage, setNewMessage] = useState('');

  const teachers = [
    { id: 1, name: 'Budi Santoso, S.Pd', subject: 'Matematika', child: 'Ahmad Rizki', unread: 2 },
    { id: 2, name: 'Siti Aminah, S.Pd', subject: 'IPA', child: 'Ahmad Rizki', unread: 0 },
    { id: 3, name: 'Dewi Lestari, S.Pd', subject: 'Bahasa Indonesia', child: 'Ahmad Rizki', unread: 1 },
    { id: 4, name: 'Ahmad Fauzi, S.Pd', subject: 'Bahasa Inggris', child: 'Siti Nurhaliza', unread: 0 },
  ];

  const messages = [
    { id: 1, from: 'Budi Santoso, S.Pd', subject: 'Re: Progress Matematika Ahmad', preview: 'Terima kasih atas perhatian Bapak/Ibu...', date: '2 jam lalu', unread: true, teacher: 'Budi Santoso, S.Pd' },
    { id: 2, from: 'Dewi Lestari, S.Pd', subject: 'Tugas Bahasa Indonesia', preview: 'Mohon diingat bahwa tugas teks eksposisi...', date: '5 jam lalu', unread: true, teacher: 'Dewi Lestari, S.Pd' },
    { id: 3, from: 'Budi Santoso, S.Pd', subject: 'Undangan Parent-Teacher Meeting', preview: 'Kami mengundang Bapak/Ibu untuk hadir...', date: '1 hari lalu', unread: false, teacher: 'Budi Santoso, S.Pd' },
    { id: 4, from: 'Siti Aminah, S.Pd', subject: 'Nilai UTS IPA', preview: 'Nilai UTS IPA Ahmad sudah keluar...', date: '2 hari lalu', unread: false, teacher: 'Siti Aminah, S.Pd' },
    { id: 5, from: 'Ahmad Fauzi, S.Pd', subject: 'Re: English Homework', preview: 'Siti has done a great job...', date: '3 hari lalu', unread: false, teacher: 'Ahmad Fauzi, S.Pd' },
  ];

  const statsCards = [
    { title: 'Total Pesan', value: '48', icon: MessageSquare, color: 'blue' },
    { title: 'Belum Dibaca', value: '3', icon: Clock, color: 'green' },
    { title: 'Guru Terhubung', value: '12', icon: Users, color: 'purple' },
    { title: 'Balasan', value: '45', icon: Send, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <MessageSquare className="w-6 h-6 text-blue-600"/>
          <span className="ml-2 font-bold">Parent Portal</span>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/parent/dashboard" className="block px-4 py-3 hover:bg-gray-50">Dashboard</a>
          <a href="/parent/academic" className="block px-4 py-3 hover:bg-gray-50">Akademik</a>
          <a href="/parent/messages" className="block px-4 py-3 bg-blue-50 text-blue-700">Pesan</a>
          <a href="/parent/finance" className="block px-4 py-3 hover:bg-gray-50">Keuangan</a>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <h1 className="text-xl font-bold">Pesan</h1>
        </header>
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Komunikasi dengan Guru</h1>
            <p className="text-gray-600">Pesan dan komunikasi dengan guru pengampu.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Teachers List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-bold">Guru Pengampu</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {teachers.map(teacher => (
                  <div key={teacher.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {teacher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{teacher.name}</div>
                          <div className="text-xs text-gray-500">{teacher.subject} • {teacher.child}</div>
                        </div>
                      </div>
                      {teacher.unread > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">{teacher.unread}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="font-bold">Kotak Pesan</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
                  <Send className="w-4 h-4"/> Pesan Baru
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {messages.map(msg => (
                  <div key={msg.id} className={`p-4 hover:bg-gray-50 cursor-pointer transition-all ${msg.unread ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{msg.from}</span>
                          {msg.unread && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Baru</span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{msg.subject}</div>
                        <div className="text-sm text-gray-600 truncate">{msg.preview}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xs text-gray-500">{msg.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compose Message (Optional) */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-bold mb-4">Tulis Pesan Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kepada</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Pilih Guru</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Progress Belajar Ahmad"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                <Send className="w-4 h-4"/> Kirim Pesan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
