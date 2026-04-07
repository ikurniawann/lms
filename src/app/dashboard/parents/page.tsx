'use client';

import { useState } from 'react';
import {
  UserCheck, Plus, Search, Filter, Edit, Trash2, Download, Upload,
  Eye, Mail, Phone, Users, Wallet
} from 'lucide-react';

export default function ManajemenOrangTua() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const parents = [
    { id: 1, name: 'Budi Santoso', email: 'budi@example.com', phone: '0812-3456-7890', student: 'Ahmad Rizki', class: '8A', address: 'Jl. Merdeka No. 123', occupation: 'Wiraswasta' },
    { id: 2, name: 'Siti Aminah', email: 'siti@example.com', phone: '0813-4567-8901', student: 'Siti Nurhaliza', class: '8A', address: 'Jl. Sudirman No. 45', occupation: 'PNS' },
    { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@example.com', phone: '0814-5678-9012', student: 'Budi Hartono', class: '8B', address: 'Jl. Gatot Subroto No. 78', occupation: 'Swasta' },
    { id: 4, name: 'Dewi Sartika', email: 'dewi@example.com', phone: '0815-6789-0123', student: 'Dewi Lestari', class: '8B', address: 'Jl. Ahmad Yani No. 90', occupation: 'Guru' },
    { id: 5, name: 'Eko Widodo', email: 'eko@example.com', phone: '0816-7890-1234', student: 'Eko Prasetyo', class: '8C', address: 'Jl. Diponegoro No. 12', occupation: 'Wiraswasta' },
  ];

  const filteredParents = parents.filter(parent => {
    const searchMatch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.phone.includes(searchTerm);
    const classMatch = selectedClass === 'ALL' || parent.class === selectedClass;
    return searchMatch && classMatch;
  });

  const statsCards = [
    { title: 'Total Orang Tua', value: '1,180', change: '+18', icon: UserCheck, color: 'blue' },
    { title: 'Email Terverifikasi', value: '1,056', percentage: 89.5, icon: Mail, color: 'green' },
    { title: 'No. HP Aktif', value: '1,142', percentage: 96.8, icon: Phone, color: 'purple' },
    { title: 'Tunggakan SPP', value: '86', icon: Wallet, color: 'red' },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      {/* Content */}
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Orang Tua / Wali</h1>
          <p className="text-gray-600">Kelola data orang tua/wali siswa untuk komunikasi dan informasi.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              green: 'bg-green-50 text-green-600',
              purple: 'bg-purple-50 text-purple-600',
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
                {stat.percentage && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-green-500"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.percentage}%</div>
                  </div>
                )}
              </div>
            );
          })}
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
                  placeholder="Cari nama orang tua, siswa, atau no. HP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Class Filter */}
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
            </div>

            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Import</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Tambah Orang Tua</span>
              </button>
            </div>
          </div>
        </div>

        {/* Parents Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama Orang Tua</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nama Siswa</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">No. HP</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Pekerjaan</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.map((parent) => (
                  <tr key={parent.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{parent.name}</div>
                      <div className="text-xs text-gray-500">{parent.address}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{parent.student}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {parent.class}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{parent.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{parent.phone}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{parent.occupation}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                          <Edit className="w-4 h-4 text-green-600" />
                        </button>
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
