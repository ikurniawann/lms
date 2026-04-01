'use client';

import { useState } from 'react';
import {
  Wallet, Plus, Search, Download, FileText, TrendingUp,
  DollarSign, AlertCircle, CheckCircle, Clock, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const financeStats = [
    { title: 'Total Tagihan', value: 'Rp532.000.000', icon: DollarSign, color: 'blue' },
    { title: 'Terkumpul', value: 'Rp415.500.000', icon: CheckCircle, color: 'green' },
    { title: 'Belum Terbayar', value: 'Rp86.500.000', icon: Clock, color: 'yellow' },
    { title: 'Tunggakan', value: 'Rp30.000.000', icon: AlertCircle, color: 'red' },
  ];

  const classFinance = [
    { class: '7A', total: 12960000, paid: 10800000, unpaid: 1440000, arrears: 720000 },
    { class: '7B', total: 12600000, paid: 11000000, unpaid: 1000000, arrears: 600000 },
    { class: '8A', total: 13200000, paid: 12500000, unpaid: 500000, arrears: 200000 },
    { class: '8B', total: 12600000, paid: 11500000, unpaid: 800000, arrears: 300000 },
  ];

  const recentPayments = [
    { id: 1, student: 'Ahmad Rizki', class: '8A', amount: 450000, date: '15 Maret 2026', type: 'SPP Maret', status: 'Lunas' },
    { id: 2, student: 'Siti Nurhaliza', class: '8A', amount: 450000, date: '15 Maret 2026', type: 'SPP Maret', status: 'Lunas' },
    { id: 3, student: 'Budi Hartono', class: '8B', amount: 450000, date: '14 Maret 2026', type: 'SPP Maret', status: 'Lunas' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Keuangan & SPP</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola tagihan SPP, pembayaran, dan tunggakan siswa.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {financeStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            yellow: 'bg-yellow-50 text-yellow-600',
            red: 'bg-red-50 text-red-600'
          };
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama siswa, NIS, atau kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="ALL">Semua Kelas</option>
            <option value="7A">7A</option>
            <option value="7B">7B</option>
            <option value="8A">8A</option>
            <option value="8B">8B</option>
            <option value="9A">9A</option>
            <option value="9B">9B</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="ALL">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Belum">Belum Dibayar</option>
            <option value="Tunggakan">Tunggakan</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Bayar
          </button>
        </div>
      </div>

      {/* Class Finance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Ringkasan Per Kelas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Tagihan</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Dibayar</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Belum</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tunggakan</th>
              </tr>
            </thead>
            <tbody>
              {classFinance.map((item) => (
                <tr key={item.class} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{item.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{formatRupiah(item.total)}</td>
                  <td className="py-3 px-4 text-sm text-green-600">{formatRupiah(item.paid)}</td>
                  <td className="py-3 px-4 text-sm text-yellow-600">{formatRupiah(item.unpaid)}</td>
                  <td className="py-3 px-4 text-sm text-red-600">{formatRupiah(item.arrears)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Pembayaran Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Siswa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jenis</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jumlah</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm text-gray-900">{p.student}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{p.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{p.type}</td>
                  <td className="py-3 px-4 text-sm font-medium">{formatRupiah(p.amount)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
