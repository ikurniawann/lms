'use client';

import { useState } from 'react';
import { 
  CheckSquare, Plus, Download, Calendar, Search, Filter, 
  ChevronDown, ChevronUp, X, CheckCircle, AlertCircle, 
  Clock, Users, TrendingUp, FileSpreadsheet, Eye, Edit, Trash2
} from 'lucide-react';

type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';

interface AttendanceRecord {
  id: number;
  date: string;
  class: string;
  subject: string;
  teacher: string;
  totalStudents: number;
  present: number;
  sick: number;
  permission: number;
  absent: number;
  percentage: number;
  notes?: string;
  details?: StudentAttendance[];
}

interface StudentAttendance {
  nis: string;
  name: string;
  status: AttendanceStatus;
  note?: string;
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState('2026-04-07');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [showInputModal, setShowInputModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<AttendanceRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
  const subjects = ['Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPS', 'PJOK'];

  const [records, setRecords] = useState<AttendanceRecord[]>([
    { 
      id: 1, date: '2026-04-07', class: '7A', subject: 'Matematika', teacher: 'Budi Santoso', totalStudents: 32, present: 30, sick: 1, permission: 1, absent: 0, percentage: 93.8,
      notes: 'Umumnya hadir',
      details: [
        { nis: '2024001', name: 'Ahmad Rizki', status: 'Hadir' },
        { nis: '2024002', name: 'Siti Nurhaliza', status: 'Hadir' },
        { nis: '2024003', name: 'Budi Santoso', status: 'Sakit', note: 'Demam' },
        { nis: '2024004', name: 'Dewi Kusuma', status: 'Izin', note: 'Acara keluarga' },
      ]
    },
    { id: 2, date: '2026-04-07', class: '7B', subject: 'Matematika', teacher: 'Budi Santoso', totalStudents: 30, present: 29, sick: 0, permission: 0, absent: 1, percentage: 96.7, notes: '' },
    { id: 3, date: '2026-04-07', class: '8A', subject: 'IPA', teacher: 'Ani Wulandari', totalStudents: 31, present: 31, sick: 0, permission: 0, absent: 0, percentage: 100, notes: 'Lengkap' },
    { id: 4, date: '2026-04-07', class: '8B', subject: 'IPA', teacher: 'Ani Wulandari', totalStudents: 29, present: 27, sick: 1, permission: 1, absent: 0, percentage: 93.1, notes: '' },
    { id: 5, date: '2026-04-06', class: '7A', subject: 'Bahasa Indonesia', teacher: 'Dedi Kurniawan', totalStudents: 32, present: 31, sick: 0, permission: 1, absent: 0, percentage: 96.9, notes: '' },
    { id: 6, date: '2026-04-06', class: '7B', subject: 'Bahasa Indonesia', teacher: 'Dedi Kurniawan', totalStudents: 30, present: 28, sick: 2, permission: 0, absent: 0, percentage: 93.3, notes: '' },
    { id: 7, date: '2026-04-06', class: '8A', subject: 'Bahasa Inggris', teacher: 'Siti Rahayu', totalStudents: 31, present: 30, sick: 0, permission: 1, absent: 0, percentage: 96.8, notes: '' },
    { id: 8, date: '2026-04-06', class: '8B', subject: 'Bahasa Inggris', teacher: 'Siti Rahayu', totalStudents: 29, present: 29, sick: 0, permission: 0, absent: 0, percentage: 100, notes: 'Semua hadir' },
  ]);

  // Form state
  const [formData, setFormData] = useState<Partial<AttendanceRecord>>({
    date: new Date().toISOString().split('T')[0],
    class: '7A',
    subject: 'Matematika',
    notes: ''
  });

  // Filter records
  const filteredData = records.filter(a => {
    const matchClass = selectedClass === 'ALL' || a.class === selectedClass;
    const matchDate = a.date === selectedDate;
    return matchClass;
  });

  // Stats
  const stats = {
    totalClasses: new Set(records.filter(r => r.date === selectedDate).map(r => r.class)).size,
    totalPresent: records.filter(r => r.date === selectedDate).reduce((acc, r) => acc + r.present, 0),
    totalAbsent: records.filter(r => r.date === selectedDate).reduce((acc, r) => acc + r.absent + r.sick + r.permission, 0),
    avgPercentage: records.filter(r => r.date === selectedDate).length 
      ? (records.filter(r => r.date === selectedDate).reduce((acc, r) => acc + r.percentage, 0) / records.filter(r => r.date === selectedDate).length).toFixed(1)
      : '0'
  };

  const handleAdd = () => {
    if (!formData.class || !formData.subject) {
      setNotification({ message: 'Kelas dan mata pelajaran wajib diisi!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const totalStudents = 30; // default
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      date: formData.date || new Date().toISOString().split('T')[0],
      class: formData.class || '7A',
      subject: formData.subject || 'Matematika',
      teacher: 'Budi Santoso',
      totalStudents,
      present: totalStudents,
      sick: 0,
      permission: 0,
      absent: 0,
      percentage: 100,
      notes: formData.notes || '',
      details: []
    };

    setRecords(prev => [newRecord, ...prev]);
    setShowInputModal(false);
    setNotification({ message: 'Data absensi berhasil ditambahkan!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = () => {
    if (!editingRecord) return;

    setRecords(prev => prev.map(r => 
      r.id === editingRecord.id ? { ...r, ...formData } as AttendanceRecord : r
    ));
    
    setShowEditModal(false);
    setEditingRecord(null);
    setNotification({ message: 'Data absensi berhasil diupdate!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (record: AttendanceRecord) => {
    if (confirm(`Hapus data absensi ${record.class} - ${record.subject}?`)) {
      setRecords(prev => prev.filter(r => r.id !== record.id));
      setNotification({ message: 'Data absensi berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Tanggal', 'Kelas', 'Mapel', 'Guru', 'Total', 'Hadir', 'Sakit', 'Izin', 'Alpa', 'Persentase', 'Catatan'].join(','),
      ...filteredData.map(r => [
        r.date, r.class, r.subject, r.teacher, r.totalStudents, r.present, r.sick, r.permission, r.absent, r.percentage + '%', r.notes
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `absensi-${selectedDate}.csv`;
    a.click();
    
    setNotification({ message: 'File CSV berhasil diunduh!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const openEdit = (record: AttendanceRecord) => {
    setEditingRecord(record);
    setFormData({ ...record });
    setShowEditModal(true);
  };

  const openView = (record: AttendanceRecord) => {
    setViewingRecord(record);
    setShowViewModal(true);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-green-100 text-green-700 border-green-200';
    if (percentage >= 90) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-green-500';
    if (percentage >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Input/Edit Modal */}
      {(showInputModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{showEditModal ? 'Edit Absensi' : 'Input Absensi'}</h2>
                <p className="text-sm text-gray-500">{showEditModal ? 'Update data absensi' : 'Catat kehadiran siswa'}</p>
              </div>
              <button onClick={() => { setShowInputModal(false); setShowEditModal(false); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                  <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Catatan tentang absensi hari ini..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
              </div>

              {!showEditModal && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700"><strong>Info:</strong> Setelah menyimpan, Anda dapat mengisi detail kehadiran setiap siswa.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => { setShowInputModal(false); setShowEditModal(false); }} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={showEditModal ? handleEdit : handleAdd} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">{showEditModal ? 'Update Absensi' : 'Simpan Absensi'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Detail Absensi</h2>
                <p className="text-sm text-gray-500">{viewingRecord.class} • {viewingRecord.subject} • {viewingRecord.date}</p>
              </div>
              <button onClick={() => { setShowViewModal(false); setViewingRecord(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-green-700">{viewingRecord.present}</div><div className="text-sm text-green-600">Hadir</div></div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-yellow-700">{viewingRecord.sick}</div><div className="text-sm text-yellow-600">Sakit</div></div>
                <div className="bg-blue-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-blue-700">{viewingRecord.permission}</div><div className="text-sm text-blue-600">Izin</div></div>
                <div className="bg-red-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-red-700">{viewingRecord.absent}</div><div className="text-sm text-red-600">Alpa</div></div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Persentase Kehadiran</span>
                  <span className="text-sm font-bold text-gray-900">{viewingRecord.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${getBarColor(viewingRecord.percentage)}`} style={{ width: `${viewingRecord.percentage}%` }} />
                </div>
              </div>

              {viewingRecord.notes && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-1">Catatan</p>
                  <p className="text-gray-900">{viewingRecord.notes}</p>
                </div>
              )}

              {viewingRecord.details && viewingRecord.details.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Detail Kehadiran Siswa</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr><th className="text-left py-2 px-4 text-sm font-medium">NIS</th><th className="text-left py-2 px-4 text-sm font-medium">Nama</th><th className="text-left py-2 px-4 text-sm font-medium">Status</th><th className="text-left py-2 px-4 text-sm font-medium">Keterangan</th></tr>
                      </thead>
                      <tbody>
                        {viewingRecord.details.map((d, i) => (
                          <tr key={i} className="border-t">
                            <td className="py-2 px-4 text-sm">{d.nis}</td>
                            <td className="py-2 px-4 text-sm">{d.name}</td>
                            <td className="py-2 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                d.status === 'Hadir' ? 'bg-green-100 text-green-700' :
                                d.status === 'Sakit' ? 'bg-yellow-100 text-yellow-700' :
                                d.status === 'Izin' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                              }`}>{d.status}</span>
                            </td>
                            <td className="py-2 px-4 text-sm text-gray-500">{d.note || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => { setShowViewModal(false); openEdit(viewingRecord); }} className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Edit Data</button>
              <button onClick={() => { setShowViewModal(false); setViewingRecord(null); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Rekap Absensi</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola dan monitoring kehadiran siswa per kelas.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { title: 'Total Kelas', value: stats.totalClasses.toString(), icon: Users, color: 'blue' },
          { title: 'Total Hadir', value: stats.totalPresent.toString(), icon: CheckSquare, color: 'green' },
          { title: 'Tidak Hadir', value: stats.totalAbsent.toString(), icon: AlertCircle, color: 'red' },
          { title: 'Rata-rata %', value: stats.avgPercentage + '%', icon: TrendingUp, color: 'orange' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            red: 'bg-red-50 text-red-600',
            orange: 'bg-orange-50 text-orange-600'
          };
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="ALL">Semua Kelas</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>

          <button onClick={() => setShowInputModal(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Input Absensi
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas/Mapel</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Hadir</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Sakit</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Izin</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Alpa</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Persentase</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4 text-sm">{a.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.class}</span>
                    <div className="text-xs text-gray-500 mt-1">{a.subject}</div>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-green-600 font-medium">{a.present}</td>
                  <td className="py-3 px-4 text-center text-sm text-yellow-600">{a.sick}</td>
                  <td className="py-3 px-4 text-center text-sm text-blue-600">{a.permission}</td>
                  <td className="py-3 px-4 text-center text-sm text-red-600">{a.absent}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getBarColor(a.percentage)}`} style={{ width: `${a.percentage}%` }} />
                      </div>
                      <span className={`text-sm font-bold ${a.percentage >= 95 ? 'text-green-600' : a.percentage >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>{a.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button onClick={() => openView(a)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail"><Eye className="w-4 h-4 text-blue-600" /></button>
                      <button onClick={() => openEdit(a)} className="p-2 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4 text-yellow-600" /></button>
                      <button onClick={() => handleDelete(a)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Hapus"><Trash2 className="w-4 h-4 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="py-12 text-center">
          <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data absensi</h3>
          <p className="text-gray-500 mb-4">Belum ada data absensi untuk tanggal dan filter yang dipilih.</p>
          <button onClick={() => setShowInputModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Input Absensi</button>
        </div>
      )}
    </div>
  );
}
