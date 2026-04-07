'use client';
import { CheckSquare, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BuatUjianPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buat Ujian</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <CheckSquare className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-blue-700">Mode Public View</span>
            <p className="text-blue-600 text-sm mt-1">Halaman ini hanya untuk melihat data.</p>
          </div>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Login</Link>
        </div>
      </div>

      <div className="text-center py-12">
        <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Buat Ujian Baru</h1>
        <p className="text-gray-500 mb-6">Silakan login untuk mengakses fitur ini</p>
        <Link href="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">Login Sekarang</Link>
      </div>
    </div>
  );
}
