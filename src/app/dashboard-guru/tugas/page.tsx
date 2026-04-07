'use client';

import { useState } from 'react';
import { 
  FileText, Plus, Search, Calendar, Clock, Users, CheckCircle, 
  Edit, Trash2, Eye, XCircle, ChevronRight, X, AlertCircle,
  BookOpen, Hash, AlignLeft, FileCheck
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  class: string;
  subject: string;
  due: string;
  submitted: string;
  status: 'Active' | 'Selesai' | 'Draft';
  description?: string;
  totalStudents?: number;
  submittedCount?: number;
  createdAt?: string;
  instructions?: string;
  attachments?: string[];
}

export default function TugasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState<Assignment | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: 1, 
      title: 'Latihan Soal Bab 1', 
      class: '7A', 
      subject: 'Matematika', 
      due: '2 Apr 2026', 
      submitted: '28/32', 
      status: 'Active',
      totalStudents: 32,
      submittedCount: 28,
      description: 'Latihan soal untuk menguji pemahaman siswa tentang Bab 1',
      instructions: 'Kerjakan soal nomor 1-20 pada halaman 25-27. Tulis jawaban di kertas folio bergaris.',
      createdAt: '2024-03-25',
      attachments: ['Latihan_Bab1.pdf']
    },
    { 
      id: 2, 
      title: 'PR Geometri', 
      class: '7B', 
      subject: 'Matematika', 
      due: '3 Apr 2026', 
      submitted: '25/30', 
      status: 'Active',
      totalStudents: 30,
      submittedCount: 25,
      description: 'PR tentang sifat-sifat bangun datar geometri',
      instructions: 'Gambar 5 bangun datar dan tuliskan sifat-sifatnya masing-masing.',
      createdAt: '2024-03-26',
      attachments: []
    },
    { 
      id: 3, 
      title: 'Quiz Aljabar', 
      class: '8A', 
      subject: 'Matematika', 
      due: '4 Apr 2026', 
      submitted: '20/31', 
      status: 'Active',
      totalStudents: 31,
      submittedCount: 20,
      description: 'Quiz singkat tent operasi aljabar',
      instructions: 'Kerjakan quiz online ini dalam waktu 30 menit.',
      createdAt: '2024-03-27',
      attachments: ['Soal_Quiz.pdf']
    },
    { 
      id: 4, 
      title: 'Tugas Persamaan Kuadrat', 
      class: '8B', 
      subject: 'Matematika', 
      due: '25 Mar 2026', 
      submitted: '29/29', 
      status: 'Selesai',
      totalStudents: 29,
      submittedCount: 29,
      description: 'Tugas membuktikan rumus persamaan kuadrat',
      instructions: 'Buktikan rumus abc untuk persamaan kuadrat dengan contoh soal.',
      createdAt: '2024-03-20',
      attachments: ['Rumus_Persamaan.pdf']
    },
  ]);

  // Form state untuk create tugas
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: '',
    class: '7A',
    subject: 'Matematika',
    due: '',
    description: '',
    instructions: '',
    status: 'Active'
  });

  const filteredAssignments = assignments.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'ALL' || a.class === selectedClass;
    const matchStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
    return matchSearch && matchClass && matchStatus;
  });

  const statsCards = [
    { title: 'Total Tugas', value: assignments.length.toString(), icon: FileText, color: 'blue' },
    { title: 'Tugas Aktif', value: assignments.filter(a => a.status === 'Active').length.toString(), icon: Clock, color: 'green' },
    { title: 'Rata-rata Submit', value: '87%', icon: CheckCircle, color: 'purple' },
    { title: 'Total Siswa', value: '248', icon: Users, color: 'orange' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
  const subjects = ['Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPS', 'PJOK', 'Agama', 'Seni'];

  const handleCreate = () => {
    if (!newAssignment.title || !newAssignment.due) {
      setNotification({ message: 'Judul dan deadline wajib diisi!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const totalStudents = 30; // default
    const assignment: Assignment = {
      id: Date.now(),
      title: newAssignment.title || '',
      class: newAssignment.class || '7A',
      subject: newAssignment.subject || 'Matematika',
      due: newAssignment.due || '',
      submitted: `0/${totalStudents}`,
      status: 'Active',
      totalStudents,
      submittedCount: 0,
      description: newAssignment.description || '',
      instructions: newAssignment.instructions || '',
      createdAt: new Date().toISOString().split('T')[0],
      attachments: []
    };

    setAssignments(prev => [assignment, ...prev]);
    setShowCreateModal(false);
    setNewAssignment({
      title: '',
      class: '7A',
      subject: 'Matematika',
      due: '',
      description: '',
      instructions: '',
      status: 'Active'
    });
    setNotification({ message: 'Tugas berhasil dibuat!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleView = (a: Assignment) => {
    setViewingAssignment(a);
    setShowViewModal(true);
  };

  const handleEdit = (a: Assignment) => {
    setEditingAssignment({ ...a });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingAssignment) {
      const total = editingAssignment.totalStudents || 30;
      const submitted = editingAssignment.submittedCount || 0;
      const updated = {
        ...editingAssignment,
        submitted: `${submitted}/${total}`
      };
      
      setAssignments(prev => prev.map(a => a.id === updated.id ? updated : a));
      setShowEditModal(false);
      setEditingAssignment(null);
      setNotification({ message: 'Tugas berhasil diupdate!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = (a: Assignment) => {
    if (confirm(`Hapus tugas "${a.title}"?`)) {
      setAssignments(prev => prev.filter(item => item.id !== a.id));
      setNotification({ message: 'Tugas berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Selesai': return 'bg-gray-100 text-gray-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Buat Tugas Baru</h2>
                <p className="text-sm text-gray-500">Isi detail tugas untuk siswa</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tugas *</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Contoh: Latihan Soal Bab 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas *</label>
                  <select
                    value={newAssignment.class}
                    onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {classes.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline *</label>
                <input
                  type="date"
                  value={newAssignment.due}
                  onChange={(e) => setNewAssignment({...newAssignment, due: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <input
                  type="text"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="Deskripsi singkat tugas..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instruksi Pengerjaan</label>
                <textarea
                  value={newAssignment.instructions}
                  onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
                  rows={4}
                  placeholder="Tuliskan instruksi lengkap untuk siswa..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Buat Tugas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Detail Tugas</h2>
              <button onClick={() => { setShowViewModal(false); setViewingAssignment(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{viewingAssignment.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(viewingAssignment.status)}`}>
                    {viewingAssignment.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Users className="w-4 h-4" />
                    <span>Kelas</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingAssignment.class}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Mapel</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingAssignment.subject}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline</span>
                </div>
                <p className="font-semibold text-gray-900">{viewingAssignment.due}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                  <Users className="w-4 h-4" />
                  <span>Progress Pengumpulan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${((viewingAssignment.submittedCount || 0) / (viewingAssignment.totalStudents || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900">{viewingAssignment.submitted}</span>
                </div>
              </div>

              {viewingAssignment.description && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Deskripsi</span>
                  </div>
                  <p className="text-gray-900">{viewingAssignment.description}</p>
                </div>
              )}

              {viewingAssignment.instructions && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <AlignLeft className="w-4 h-4" />
                    <span>Instruksi Pengerjaan</span>
                  </div>
                  <p className="text-gray-900 whitespace-pre-line">{viewingAssignment.instructions}</p>
                </div>
              )}

              {viewingAssignment.attachments && viewingAssignment.attachments.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <FileCheck className="w-4 h-4" />
                    <span>Lampiran</span>
                  </div>
                  <div className="space-y-2">
                    {viewingAssignment.attachments.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => { setShowViewModal(false); handleEdit(viewingAssignment); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => { setShowViewModal(false); setViewingAssignment(null); }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Edit Tugas</h2>
              <button onClick={() => { setShowEditModal(false); setEditingAssignment(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tugas *</label>
                <input
                  type="text"
                  value={editingAssignment.title}
                  onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas *</label>
                  <select
                    value={editingAssignment.class}
                    onChange={(e) => setEditingAssignment({...editingAssignment, class: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {classes.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={editingAssignment.subject}
                    onChange={(e) => setEditingAssignment({...editingAssignment, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline *</label>
                <input
                  type="date"
                  value={editingAssignment.due}
                  onChange={(e) => setEditingAssignment({...editingAssignment, due: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingAssignment.status}
                  onChange={(e) => setEditingAssignment({...editingAssignment, status: e.target.value as 'Active' | 'Selesai' | 'Draft'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Active">Aktif</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <input
                  type="text"
                  value={editingAssignment.description || ''}
                  onChange={(e) => setEditingAssignment({...editingAssignment, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instruksi Pengerjaan</label>
                <textarea
                  value={editingAssignment.instructions || ''}
                  onChange={(e) => setEditingAssignment({...editingAssignment, instructions: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => { setShowEditModal(false); setEditingAssignment(null); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Manajemen Tugas</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola tugas dan PR untuk siswa.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-50 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-orange-50 text-orange-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tugas..."
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
              {classes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="ALL">Semua Status</option>
              <option value="Active">Aktif</option>
              <option value="Selesai">Selesai</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Buat Tugas</span>
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-3">
        {filteredAssignments.map((a) => (
          <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-2">
              <div className="font-medium text-gray-900 text-sm">{a.title}</div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(a.status)}`}>
                {a.status}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{a.class}</span>
              <span className="text-xs text-gray-500">{a.subject}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{a.due}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="text-green-600 font-medium">{a.submitted}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleView(a)}
                className="flex-1 flex items-center justify-center gap-1 p-2 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-blue-50"
              >
                <Eye className="w-3 h-3" /> Lihat
              </button>
              <button 
                onClick={() => handleEdit(a)}
                className="flex-1 flex items-center justify-center gap-1 p-2 bg-white border border-gray-200 rounded-lg text-xs font-medium hover:bg-yellow-50"
              >
                <Edit className="w-3 h-3" /> Edit
              </button>
              <button 
                onClick={() => handleDelete(a)}
                className="p-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
              >
                <Trash2 className="w-3 h-3 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Terkumpul</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{a.title}</div>
                    <div className="text-xs text-gray-500">{a.subject}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">{a.class}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{a.due}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-green-600">{a.submitted}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView(a)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleEdit(a)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-all" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-yellow-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(a)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-all" 
                        title="Hapus"
                      >
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

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada tugas</h3>
          <p className="text-gray-500 mb-4">Tidak ditemukan tugas dengan filter yang dipilih.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Buat Tugas Baru
          </button>
        </div>
      )}
    </div>
  );
}
