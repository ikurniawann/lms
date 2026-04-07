'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen, FileText, Users, CheckSquare, TrendingUp,
  Upload, Edit, Trash2, Eye, Plus, X, CheckCircle, AlertCircle,
  Calendar, Clock, ChevronRight
} from 'lucide-react';

interface Material {
  id: number;
  title: string;
  class: string;
  uploaded: string;
  downloads: number;
  type: string;
  size: string;
}

interface Assignment {
  id: number;
  title: string;
  class: string;
  due: string;
  submitted: string;
  total: number;
  submittedCount: number;
}

interface ClassItem {
  id: number;
  name: string;
  subject: string;
  students: number;
  schedule: string;
}

export default function DashboardGuru() {
  const router = useRouter();
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);
  const [showInputGradeModal, setShowInputGradeModal] = useState(false);
  const [showViewAssignmentModal, setShowViewAssignmentModal] = useState(false);
  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState<Assignment | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [statsCards, setStatsCards] = useState([
    { title: 'Total Kelas', value: '8', change: '+2', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
    { title: 'Total Siswa', value: '248', change: '+12', icon: Users, color: 'bg-green-50 text-green-600' },
    { title: 'Materi', value: '45', change: '+8', icon: Upload, color: 'bg-purple-50 text-purple-600' },
    { title: 'Tugas', value: '23', change: '+5', icon: FileText, color: 'bg-orange-50 text-orange-600' },
  ]);

  const [myClasses, setMyClasses] = useState<ClassItem[]>([
    { id: 1, name: '7A', subject: 'Matematika', students: 32, schedule: 'Sen, Rab 08:00' },
    { id: 2, name: '7B', subject: 'Matematika', students: 30, schedule: 'Sel, Kam 08:00' },
    { id: 3, name: '8A', subject: 'Matematika', students: 31, schedule: 'Sen, Rab 10:00' },
    { id: 4, name: '8B', subject: 'Matematika', students: 29, schedule: 'Sel, Kam 10:00' },
  ]);

  const [recentMaterials, setRecentMaterials] = useState<Material[]>([
    { id: 1, title: 'Aljabar Linear', class: '7A', uploaded: '2 jam lalu', downloads: 28, type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Geometri Dasar', class: '7B', uploaded: '5 jam lalu', downloads: 25, type: 'PPT', size: '5.1 MB' },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', uploaded: '1 hari lalu', downloads: 30, type: 'PDF', size: '3.2 MB' },
  ]);

  const [recentAssignments, setRecentAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Latihan Soal Bab 1', class: '7A', due: '2 Apr 2026', submitted: '28/32', total: 32, submittedCount: 28 },
    { id: 2, title: 'PR Geometri', class: '7B', due: '3 Apr 2026', submitted: '25/30', total: 30, submittedCount: 25 },
    { id: 3, title: 'Quiz Aljabar', class: '8A', due: '4 Apr 2026', submitted: '20/31', total: 31, submittedCount: 20 },
  ]);

  const students = [
    { id: 1, nis: '2024001', name: 'Ahmad Rizki', class: '7A' },
    { id: 2, nis: '2024002', name: 'Siti Nurhaliza', class: '7A' },
    { id: 3, nis: '2024003', name: 'Budi Santoso', class: '7B' },
    { id: 4, nis: '2024004', name: 'Dewi Kusuma', class: '8A' },
    { id: 5, nis: '2024005', name: 'Eko Prasetyo', class: '8B' },
  ];

  // Quick Actions Handlers
  const handleUploadMateri = () => {
    router.push('/dashboard-guru/materi');
    // Alternative: setShowUploadModal(true);
  };

  const handleCreateTugas = () => {
    setShowCreateAssignmentModal(true);
  };

  const handleCreateUjian = () => {
    router.push('/dashboard-guru/ujian');
  };

  const handleInputNilai = () => {
    router.push('/dashboard-guru/grades');
  };

  // Material handlers
  const handleViewMaterial = (material: Material) => {
    setNotification({ message: `Melihat detail: ${material.title}`, type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteMaterial = (material: Material) => {
    if (confirm(`Hapus materi "${material.title}"?`)) {
      setRecentMaterials(prev => prev.filter(m => m.id !== material.id));
      setStatsCards(prev => prev.map(s => 
        s.title === 'Materi' ? { ...s, value: (parseInt(s.value) - 1).toString() } : s
      ));
      setNotification({ message: 'Materi berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Assignment handlers
  const handleViewAssignment = (assignment: Assignment) => {
    setViewingAssignment(assignment);
    setShowViewAssignmentModal(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment({ ...assignment });
    setShowEditAssignmentModal(true);
  };

  const handleDeleteAssignment = (assignment: Assignment) => {
    if (confirm(`Hapus tugas "${assignment.title}"?`)) {
      setRecentAssignments(prev => prev.filter(a => a.id !== assignment.id));
      setStatsCards(prev => prev.map(s => 
        s.title === 'Tugas' ? { ...s, value: (parseInt(s.value) - 1).toString() } : s
      ));
      setNotification({ message: 'Tugas berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSaveEditAssignment = () => {
    if (editingAssignment) {
      setRecentAssignments(prev => prev.map(a => 
        a.id === editingAssignment.id ? editingAssignment : a
      ));
      setShowEditAssignmentModal(false);
      setEditingAssignment(null);
      setNotification({ message: 'Tugas berhasil diupdate!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleCreateNewAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now(),
      title: 'Tugas Baru',
      class: selectedClass === 'ALL' ? '7A' : selectedClass,
      due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
      submitted: '0/30',
      total: 30,
      submittedCount: 0
    };
    setRecentAssignments(prev => [newAssignment, ...prev]);
    setStatsCards(prev => prev.map(s => 
      s.title === 'Tugas' ? { ...s, value: (parseInt(s.value) + 1).toString() } : s
    ));
    setShowCreateAssignmentModal(false);
    setNotification({ message: 'Tugas berhasil dibuat!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  // Class handlers
  const handleViewAllClasses = () => {
    router.push('/dashboard-guru/students');
  };

  const handleViewAllMaterials = () => {
    router.push('/dashboard-guru/materi');
  };

  const handleViewAllAssignments = () => {
    router.push('/dashboard-guru/tugas');
  };

  // Upload handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) {
      setNotification({ message: 'Pilih file terlebih dahulu!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 300);
    
    setTimeout(() => {
      const newMaterial: Material = {
        id: Date.now(),
        title: selectedFile.name.replace(/\.[^/.]+$/, ''),
        class: '7A',
        uploaded: 'Baru saja',
        downloads: 0,
        type: 'PDF',
        size: '2.0 MB'
      };
      setRecentMaterials(prev => [newMaterial, ...prev]);
      setStatsCards(prev => prev.map(s => 
        s.title === 'Materi' ? { ...s, value: (parseInt(s.value) + 1).toString() } : s
      ));
      setIsUploading(false);
      setUploadProgress(0);
      setSelectedFile(null);
      setShowUploadModal(false);
      setNotification({ message: 'Materi berhasil diupload!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }, 2000);
  };

  // Input grade handler
  const handleSubmitGrade = () => {
    if (!selectedStudent || !gradeValue) {
      setNotification({ message: 'Pilih siswa dan masukkan nilai!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setShowInputGradeModal(false);
    setSelectedStudent('');
    setGradeValue('');
    setNotification({ message: 'Nilai berhasil disimpan!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upload Materi</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isUploading ? (
              <>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Klik untuk memilih file</p>
                  <p className="text-sm text-gray-500">PDF, PPT, Video, dll</p>
                  <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
                </div>

                {selectedFile && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button onClick={handleUploadSubmit} className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Upload Sekarang
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Mengupload... {uploadProgress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateAssignmentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Buat Tugas Baru</h2>
              <button onClick={() => setShowCreateAssignmentModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tugas</label>
                <input type="text" placeholder="Masukkan judul tugas" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="ALL">Pilih Kelas</option>
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea rows={3} placeholder="Deskripsi tugas..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreateAssignmentModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleCreateNewAssignment} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Buat Tugas</button>
            </div>
          </div>
        </div>
      )}

      {/* View Assignment Modal */}
      {showViewAssignmentModal && viewingAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Detail Tugas</h2>
              <button onClick={() => { setShowViewAssignmentModal(false); setViewingAssignment(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Judul</p>
                <p className="font-semibold text-gray-900">{viewingAssignment.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Kelas</p>
                  <p className="font-semibold text-gray-900">{viewingAssignment.class}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-semibold text-gray-900">{viewingAssignment.due}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Progress Pengumpulan</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-2xl font-bold text-blue-900">{viewingAssignment.submitted}</p>
                  <div className="w-32 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(viewingAssignment.submittedCount / viewingAssignment.total) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowViewAssignmentModal(false); router.push('/dashboard-guru/tugas'); }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Lihat Detail Lengkap</button>
              <button onClick={() => { setShowViewAssignmentModal(false); setViewingAssignment(null); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Assignment Modal */}
      {showEditAssignmentModal && editingAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Tugas</h2>
              <button onClick={() => { setShowEditAssignmentModal(false); setEditingAssignment(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Tugas</label>
                <input type="text" value={editingAssignment.title} onChange={(e) => setEditingAssignment({...editingAssignment, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <select value={editingAssignment.class} onChange={(e) => setEditingAssignment({...editingAssignment, class: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input type="date" value={editingAssignment.due} onChange={(e) => setEditingAssignment({...editingAssignment, due: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowEditAssignmentModal(false); setEditingAssignment(null); }} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSaveEditAssignment} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Guru</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola kelas, materi, tugas, dan nilai siswa.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm text-green-600 font-medium">↑ {stat.change}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button onClick={handleUploadMateri} className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/30 text-sm sm:text-base">
          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Upload Materi</span>
          <span className="font-medium sm:hidden">Materi</span>
        </button>
        <button onClick={handleCreateTugas} className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 text-sm sm:text-base">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Buat Tugas</span>
          <span className="font-medium sm:hidden">Tugas</span>
        </button>
        <button onClick={handleCreateUjian} className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30 text-sm sm:text-base">
          <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Buat Ujian</span>
          <span className="font-medium sm:hidden">Ujian</span>
        </button>
        <button onClick={handleInputNilai} className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 text-sm sm:text-base">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium hidden sm:inline">Input Nilai</span>
          <span className="font-medium sm:hidden">Nilai</span>
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* My Classes */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Kelas Saya</h3>
            <button onClick={handleViewAllClasses} className="text-xs sm:text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {myClasses.map((classItem) => (
              <div key={classItem.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all gap-2 cursor-pointer" onClick={handleViewAllClasses}>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{classItem.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{classItem.subject} • {classItem.students} siswa</div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 sm:text-right">{classItem.schedule}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Materials */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Materi Terbaru</h3>
            <button onClick={handleViewAllMaterials} className="text-xs sm:text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {recentMaterials.map((material) => (
              <div key={material.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{material.title}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Kelas {material.class}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:text-right pl-10 sm:pl-0">
                  <div className="text-xs sm:text-sm text-gray-600">
                    <div>{material.downloads} downloads</div>
                    <div className="text-gray-400">{material.uploaded}</div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleViewMaterial(material)} className="p-2 hover:bg-blue-100 rounded-lg" title="Lihat">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button onClick={() => handleDeleteMaterial(material)} className="p-2 hover:bg-red-100 rounded-lg" title="Hapus">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Tugas Terbaru</h3>
          <button onClick={handleViewAllAssignments} className="text-xs sm:text-sm text-green-600 hover:underline font-medium">Lihat Semua</button>
        </div>
        
        {/* Mobile Cards */}
        <div className="block sm:hidden space-y-3">
          {recentAssignments.map((assignment) => (
            <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="font-medium text-gray-900 text-sm">{assignment.title}</div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{assignment.class}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <span>Deadline: {assignment.due}</span>
                <span className="text-green-600 font-medium">{assignment.submitted}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleViewAssignment(assignment)} className="flex-1 flex items-center justify-center gap-1 p-2 bg-white rounded-lg border border-gray-200 text-xs font-medium hover:bg-blue-50">
                  <Eye className="w-3 h-3" /> Lihat
                </button>
                <button onClick={() => handleEditAssignment(assignment)} className="flex-1 flex items-center justify-center gap-1 p-2 bg-white rounded-lg border border-gray-200 text-xs font-medium hover:bg-green-50">
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDeleteAssignment(assignment)} className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-red-50">
                  <Trash2 className="w-3 h-3 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Terkumpul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{assignment.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{assignment.class}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{assignment.due}</td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-green-600">{assignment.submitted}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleViewAssignment(assignment)} className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleEditAssignment(assignment)} className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                        <Edit className="w-4 h-4 text-green-600" />
                      </button>
                      <button onClick={() => handleDeleteAssignment(assignment)} className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
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
