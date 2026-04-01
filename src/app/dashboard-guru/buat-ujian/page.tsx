'use client';

import { CheckSquare, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BuatUjianPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Notice */}
      <div className="bg-blue-600 text-white px-4 py-2 text-center text-sm">
        <span className="font-semibold">👁️ Mode Public View</span> — Halaman ini hanya untuk melihat data. 
        <Link href="/login" className="underline ml-2 hover:text-blue-200">Login untuk membuat ujian</Link>
      </div>

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/materi" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Materi</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/tugas" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Tugas</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/ujian" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Ujian</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/buat-ujian" className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <span>Buat Ujian</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/students" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Siswa</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/attendance" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Absensi</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/dashboard-guru/grades" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <span>Nilai</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Buat Ujian</h1>
          <Link href="/login" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
            Login untuk Edit
          </Link>
        </header>

        <main className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">ℹ️ Informasi</h2>
            <p className="text-yellow-700">
              Halaman ini memerlukan login untuk membuat ujian baru. Saat ini Anda melihat mode public view.
            </p>
          </div>

          <div className="text-center py-12">
            <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Buat Ujian Baru</h2>
            <p className="text-gray-500 mb-6">Silakan login untuk mengakses fitur ini</p>
            <Link href="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all">
              Login Sekarang
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
