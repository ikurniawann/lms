'use client';

import { useState } from 'react';
import { FileText, Plus, Search, Calendar, Clock, Users, CheckCircle, Edit, Trash2, Eye, Download } from 'lucide-react';

export default function TugasPage() {
  const assignments = [
    { id: 1, title: 'Latihan Soal Bab 1', class: '7A', subject: 'Matematika', due: '2 Apr 2026', submitted: '28/32', status: 'Active' },
    { id: 2, title: 'PR Geometri', class: '7B', subject: 'Matematika', due: '3 Apr 2026', submitted: '25/30', status: 'Active' },
    { id: 3, title: 'Quiz Aljabar', class: '8A', subject: 'Matematika', due: '4 Apr 2026', submitted: '20/31', status: 'Active' },
    { id: 4, title: 'Tugas Persamaan Kuadrat', class: '8B', subject: 'Matematika', due: '25 Mar 2026', submitted: '29/29', status: 'Selesai' },
  ];

  const statsCards = [
    { title: 'Total Tugas', value: '23', change: '+5', icon: FileText, color: 'blue' },
    { title: 'Tugas Aktif', value: '12', icon: Clock, color: 'green' },
    { title: 'Rata-rata Submit', value: '87%', icon: CheckCircle, color: 'purple' },
    { title: 'Total Siswa', value: '248', icon: Users, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"><FileText className="w-5 h-5"/><span className="text-sm">Dashboard</span></a>
          <a href="/dashboard-guru/materi" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"><FileText className="w-5 h-5"/><span className="text-sm">Materi Saya</span></a>
          <a href="/dashboard-guru/tugas" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200"><FileText className="w-5 h-5"/><span className="text-sm">Tugas</span></a>
          <a href="/dashboard-guru/ujian" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"><FileText className="w-5 h-5"/><span className="text-sm">Ujian</span></a>
          <a href="/dashboard-guru/students" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"><FileText className="w-5 h-5"/><span className="text-sm">Siswa</span></a>
          <a href="/dashboard-guru/grades" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"><FileText className="w-5 h-5"/><span className="text-sm">Nilai</span></a>
        </nav>
      </aside>
      <div className="lg:ml-64">
        <header className="h-16 bg-white border-b border-gray-200"><div className="h-full px-6 flex items-center"><h1 className="text-xl font-bold">Tugas</h1></div></header>
        <main className="p-6">
          <div className="mb-8"><h1 className="text-2xl font-bold mb-2">Manajemen Tugas</h1><p className="text-gray-600">Kelola tugas dan PR untuk siswa.</p></div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border"><div className="text-2xl font-bold">{stat.value}</div><div className="text-sm text-gray-600">{stat.title}</div></div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold">Daftar Tugas</h3>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm flex items-center gap-2"><Plus className="w-4 h-4"/>Buat Tugas</button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="text-left p-4">Judul</th><th className="text-left p-4">Kelas</th><th className="text-left p-4">Deadline</th><th className="text-left p-4">Terkumpul</th><th className="text-left p-4">Status</th><th className="text-left p-4">Actions</th></tr></thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{a.title}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.class}</span></td>
                    <td className="p-4 text-sm">{a.due}</td>
                    <td className="p-4 text-sm">{a.submitted}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-sm ${a.status==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{a.status}</span></td>
                    <td className="p-4 flex gap-2"><button className="p-2 hover:bg-blue-50 rounded"><Eye className="w-4 h-4 text-blue-600"/></button><button className="p-2 hover:bg-green-50 rounded"><Edit className="w-4 h-4 text-green-600"/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
