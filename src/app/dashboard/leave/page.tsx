'use client';

import { useState } from 'react';
import {
  Calendar, Plus, Search, Filter, Users, Clock, CheckCircle, XCircle,
  Edit, Trash2, Eye, Download, AlertCircle
} from 'lucide-react';

export default function ManajemenCuti() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const leaves = [
    { id: 1, nip: '199001012020011001', name: 'Budi Santoso, S.Pd', type: 'Cuti Tahunan', startDate: '01 Apr 2026', endDate: '05 Apr 2026', days: 5, reason: 'Liburan Keluarga', status: 'Approved', approvedBy: 'Kepala Sekolah' },
    { id: 2, nip: '199002022020022002', name: 'Siti Aminah, S.Pd', type: 'Cuti Sakit', startDate: '28 Mar 2026', endDate: '30 Mar 2026', days: 3, reason: 'Demam Berdarah', status: 'Approved', approvedBy: 'HRD' },
    { id: 3, nip: '199003032020033003', name: 'Dewi Lestari, S.Pd', type: 'Cuti Melahirkan', startDate: '15 Apr 2026', endDate: '15 Jul 2026', days: 90, reason: 'Melahirkan', status: 'Pending', approvedBy: '-' },
    { id: 4, nip: '199004042020044004', name: 'Ahmad Fauzi, S.Pd', type: 'Cuti Pernikahan', startDate: '10 Apr 2026', endDate: '12 Apr 2026', days: 3, reason: 'Pernikahan Anak', status: 'Approved', approvedBy: 'Kepala Sekolah' },
    { id: 5, nip: '199005052020055005', name: 'Eko Prasetyo, S.Pd', type: 'Izin', startDate: '29 Mar 2026', endDate: '29 Mar 2026', days: 1, reason: 'Acara Keluarga', status: 'Approved', approvedBy: 'HRD' },
    { id: 6, nip: '198906062019061006', name: 'Rina Wijaya, S.Pd', type: 'Cuti Tahunan', startDate: '05 May 2026', endDate: '12 May 2026', days: 8, reason: 'Umroh', status: 'Pending', approvedBy: '-' },
  ];

  const filteredLeaves = leaves.filter(leave => {
    const searchMatch = leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.nip.includes(searchTerm) ||
      leave.type.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === 'ALL' || leave.type === selectedType;
    const statusMatch = selectedStatus === 'ALL' || leave.status === selectedStatus;
    return searchMatch && typeMatch && statusMatch;
  });

  const statsCards = [
    { title: 'Total Pengajuan Cuti', value: '48', change: '+12', icon: Calendar, color: 'blue' },
    { title: 'Disetujui', value: '42', icon: CheckCircle, color: 'green' },
    { title: 'Pending', value: '4', icon: Clock, color: 'yellow' },
    { title: 'Ditolak', value: '2', icon: XCircle, color: 'red' },
  ];

  const leaveBalance = [
    { name: 'Cuti Tahunan', total: 12, used: 5, remaining: 7 },
    { name: 'Cuti Sakit', total: 10, used: 3, remaining: 7 },
    { name: 'Cuti Melahirkan', total: 90, used: 0, remaining: 90 },
    { name: 'Cuti Pernikahan', total: 3, used: 0, remaining: 3 },
    { name: 'Cuti Bereavement', total: 3, used: 1, remaining: 2 },
    { name: 'Izin', total: 5, used: 2, remaining: 3 },
  ];

  const types = ['ALL', 'Cuti Tahunan', 'Cuti Sakit', 'Cuti Melahirkan', 'Cuti Pernikahan', 'Cuti Bereavement', 'Izin'];
  const statuses = ['ALL', 'Approved', 'Pending', 'Rejected'];

  return (
    <div>
      {/* Content */}
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cuti & Izin Guru/Staff</h1>
          <p className="text-gray-600">Kelola pengajuan cuti, izin, dan rekap kehadiran guru/staff.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => {
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
                    <span className="text-sm text-green-600 font-medium">↑ {stat.change}</span>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            );
          })}
        </div>

        {/* Leave Balance Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Saldo Cuti Tahun Ini</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {leaveBalance.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">{item.name}</span>
                  <span className="text-sm text-gray-500">Total: {item.total}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Digunakan</span>
                    <span className="font-medium text-red-600">{item.used}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sisa</span>
                    <span className="font-medium text-green-600">{item.remaining}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${(item.remaining / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama, NIP, atau tipe cuti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === 'ALL' ? 'Semua Tipe' : type}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'ALL' ? 'Semua Status' : status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Ajukan Cuti</span>
              </button>
            </div>
          </div>
        </div>

        {/* Leaves Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">NIP</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tipe Cuti</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tanggal</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Durasi</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Alasan</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Disetujui Oleh</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-6 text-sm font-mono text-gray-700">{leave.nip}</td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{leave.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        leave.type === 'Cuti Tahunan' ? 'bg-blue-100 text-blue-700' :
                        leave.type === 'Cuti Sakit' ? 'bg-red-100 text-red-700' :
                        leave.type === 'Cuti Melahirkan' ? 'bg-pink-100 text-pink-700' :
                        leave.type === 'Cuti Pernikahan' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {leave.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <div>{leave.startDate}</div>
                      <div className="text-xs text-gray-500">s/d {leave.endDate}</div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{leave.days} hari</td>
                    <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">{leave.reason}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{leave.approvedBy}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        {leave.status === 'Pending' && (
                          <>
                            <button className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Approve">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Reject">
                              <XCircle className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
