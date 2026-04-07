'use client';

import { useState } from 'react';
import {
  GraduationCap, Plus, Search, Edit, Trash2, Eye, Mail, Phone
} from 'lucide-react';

export default function ManajemenGuru() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  const teachers = [
    { id: 1, nip: '199001012020011001', name: 'Budi Santoso, S.Pd', subject: 'Matematika', email: 'budi@smpn1.sch.id', phone: '0812-3456-7890', classes: '7A, 7B, 8A, 8B' },
    { id: 2, nip: '199002022020022002', name: 'Siti Aminah, S.Pd', subject: 'IPA', email: 'siti@smpn1.sch.id', phone: '0813-4567-8901', classes: '7A, 7B, 8A, 8B' },
    { id: 3, nip: '199003032020033003', name: 'Dewi Lestari, S.Pd', subject: 'Bahasa Indonesia', email: 'dewi@smpn1.sch.id', phone: '0814-5678-9012', classes: '7A, 7B, 7C, 8A' },
    { id: 4, nip: '199004042020044004', name: 'Ahmad Fauzi, S.Pd', subject: 'Bahasa Inggris', email: 'ahmad@smpn1.sch.id', phone: '0815-6789-0123', classes: '7A, 7B, 8A, 8B' },
    { id: 5, nip: '199005052020055005', name: 'Eko Prasetyo, S.Pd', subject: 'IPS', email: 'eko@smpn1.sch.id', phone: '0816-7890-1234', classes: '7A, 7B, 7C, 8A' },
  ];

  const subjects = ['ALL', 'Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPS', 'PJOK', 'Seni Budaya', 'PKN'];

  const filteredTeachers = teachers.filter(teacher => {
    const searchMatch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.nip.includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject === 'ALL' || teacher.subject === selectedSubject;
    return searchMatch && subjectMatch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Manajemen Guru</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola data guru, mata pelajaran, dan jadwal mengajar.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">86</div>
          <div className="text-sm text-gray-600">Total Guru</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">65</div>
          <div className="text-sm text-gray-600">Guru PNS</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">21</div>
          <div className="text-sm text-gray-600">Guru Honorer</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">144</div>
          <div className="text-sm text-gray-600">Total Kelas Diampu</div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, NIP, atau mata pelajaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s === 'ALL' ? 'Semua Mapel' : s}
              </option>
            ))}
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Tambah Guru
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NIP</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kontak</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-900">{t.nip}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.classes}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{t.subject}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{t.phone}</div>
                    <div className="text-xs text-gray-500">{t.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-blue-50 rounded-lg" title="Lihat">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg" title="Edit">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg" title="Hapus">
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
  );
}
