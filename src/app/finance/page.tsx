'use client';

import { useState } from 'react';
import {
  Wallet, TrendingUp, TrendingDown, Users, DollarSign, Search, Filter,
  Download, Upload, Plus, CheckCircle, XCircle, Clock, AlertCircle
} from 'lucide-react';

export default function Keuangan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const financeStats = [
    { title: 'Total Tagihan Bulan Ini', value: 'Rp 186.000.000', change: '+12%', icon: Wallet, color: 'blue' },
    { title: 'Sudah Dibayar', value: 'Rp 158.500.000', percentage: 85.2, icon: CheckCircle, color: 'green' },
    { title: 'Belum Dibayar', value: 'Rp 27.500.000', percentage: 14.8, icon: Clock, color: 'yellow' },
    { title: 'Tunggakan', value: 'Rp 12.300.000', change: '-5%', icon: AlertCircle, color: 'red' },
  ];

  const payments = [
    { id: 1, nis: '2024001', student: 'Ahmad Rizki', class: '8A', bill: 'SPP Maret 2026', amount: 150000, status: 'Lunas', date: '25 Mar 2026', method: 'Transfer' },
    { id: 2, nis: '2024002', student: 'Siti Nurhaliza', class: '8A', bill: 'SPP Maret 2026', amount: 150000, status: 'Lunas', date: '26 Mar 2026', method: 'Tunai' },
    { id: 3, nis: '2024003', student: 'Budi Hartono', class: '8A', bill: 'SPP Maret 2026', amount: 150000, status: 'Belum', date: '-', method: '-' },
    { id: 4, nis: '2024004', student: 'Dewi Lestari', class: '8A', bill: 'SPP Maret 2026', amount: 150000, status: 'Lunas', date: '24 Mar 2026', method: 'Transfer' },
    { id: 5, nis: '2024005', student: 'Eko Prasetyo', class: '8A', bill: 'SPP Maret 2026', amount: 150000, status: 'Tunggakan', date: '-', method: '-' },
    { id: 6, nis: '2024006', student: 'Fitri Handayani', class: '8A', bill: 'SPP Maret 2026', amount: 150000, status: 'Lunas', date: '27 Mar 2026', method: 'QRIS' },
  ];

  const classFinance = [
    { class: '7A', total: 4800000, paid: 4500000, unpaid: 300000, arrears: 150000, percentage: 93.8 },
    { class: '7B', total: 4500000, paid: 4350000, unpaid: 150000, arrears: 0, percentage: 96.7 },
    { class: '7C', total: 4650000, paid: 4650000, unpaid: 0, arrears: 0, percentage: 100 },
    { class: '8A', total: 4800000, paid: 4200000, unpaid: 600000, arrears: 300000, percentage: 87.5 },
    { class: '8B', total: 4500000, paid: 4200000, unpaid: 300000, arrears: 150000, percentage: 93.3 },
    { class: '8C', total: 4650000, paid: 4500000, unpaid: 150000, arrears: 0, percentage: 96.8 },
    { class: '9A', total: 4800000, paid: 4800000, unpaid: 0, arrears: 0, percentage: 100 },
    { class: '9B', total: 4500000, paid: 4350000, unpaid: 150000, arrears: 0, percentage: 96.7 },
    { class: '9C', total: 4650000, paid: 4500000, unpaid: 150000, arrears: 0, percentage: 96.8 },
  ];

  const filteredPayments = payments.filter(payment => {
    const searchMatch = payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.nis.includes(searchTerm) ||
      payment.class.toLowerCase().includes(searchTerm.toLowerCase());
    const classMatch = selectedClass === 'ALL' || payment.class === selectedClass;
    const statusMatch = selectedStatus === 'ALL' || payment.status === selectedStatus;
    return searchMatch && classMatch && statusMatch;
  });

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Sekolah</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Wallet className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="/students" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Siswa</span>
          </a>
          <a href="/teachers" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Guru</span>
          </a>
          <a href="/classes" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium text-sm">Kelas</span>
          </a>
          <a href="/attendance" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <Clock className="w-5 h-5" />
            <span className="font-medium text-sm">Absensi</span>
          </a>
          <a href="/finance" className="flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <Wallet className="w-5 h-5" />
            <span className="font-medium text-sm">Keuangan</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Keuangan</h1>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Keuangan & SPP</h1>
            <p className="text-gray-600">Kelola tagihan SPP, pembayaran, dan tunggakan siswa.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {financeStats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                yellow: 'bg-yellow-50 text-yellow-600',
                red: 'bg-red-50 text-red-600'
              };
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {stat.change && (
                      <span className={`text-sm font-medium ${
                        stat.change.startsWith('-') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                  {stat.percentage && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            stat.percentage >= 90 ? 'bg-green-500' :
                            stat.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{stat.percentage}% collected</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
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
                <option value="7C">7C</option>
                <option value="8A">8A</option>
                <option value="8B">8B</option>
                <option value="8C">8C</option>
                <option value="9A">9A</option>
                <option value="9B">9B</option>
                <option value="9C">9C</option>
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
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Bayar</span>
              </button>
            </div>
          </div>

          {/* Class Finance Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Ringkasan Per Kelas</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Total Tagihan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Dibayar</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Belum</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tunggakan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {classFinance.map((item) => (
                    <tr key={item.class} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {item.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{formatRupiah(item.total)}</td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-green-600">{formatRupiah(item.paid)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-yellow-600">{formatRupiah(item.unpaid)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-red-600">{formatRupiah(item.arrears)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div 
                              className={`h-2 rounded-full ${
                                item.percentage >= 95 ? 'bg-green-500' :
                                item.percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Riwayat Pembayaran</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NIS</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama Siswa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tagihan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Jumlah</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tanggal</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Metode</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{payment.nis}</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{payment.student}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {payment.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{payment.bill}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{formatRupiah(payment.amount)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          payment.status === 'Lunas' ? 'bg-green-100 text-green-700' :
                          payment.status === 'Belum' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{payment.date}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{payment.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
