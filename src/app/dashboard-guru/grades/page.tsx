'use client';

import { useState, useMemo } from 'react';
import { 
  TrendingUp, Search, Plus, Download, Edit, Eye, Trash2, X, XCircle, 
  AlertCircle, CheckCircle, FileSpreadsheet, Users, Calculator,
  ChevronDown, ChevronUp, Filter, Save, RotateCcw
} from 'lucide-react';

interface Grade {
  id: number;
  nis: string;
  student: string;
  class: string;
  subject: string;
  tugas: number;
  uts: number;
  uas: number;
  praktik?: number;
  kehadiran?: number;
  avg: number;
  grade: string;
  status: 'Lulus' | 'Remedial' | 'Tidak Lulus';
  semester: string;
  tahunAjaran: string;
  lastUpdated?: string;
  notes?: string;
}

interface Student {
  nis: string;
  name: string;
  class: string;
}

const subjects = ['Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPS', 'PJOK', 'Agama', 'Seni'];
const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
const semesters = ['Ganjil 2025/2026', 'Genap 2025/2026'];

const studentsData: Student[] = [
  { nis: '2024001', name: 'Ahmad Rizki', class: '7A' },
  { nis: '2024002', name: 'Siti Nurhaliza', class: '7A' },
  { nis: '2024003', name: 'Budi Santoso', class: '7A' },
  { nis: '2024004', name: 'Dewi Kusuma', class: '7B' },
  { nis: '2024005', name: 'Eko Prasetyo', class: '7B' },
  { nis: '2024006', name: 'Fitri Andayani', class: '8A' },
  { nis: '2024007', name: 'Galih Wicaksono', class: '8A' },
  { nis: '2024008', name: 'Hanifah Putri', class: '8B' },
  { nis: '2024009', name: 'Indra Wijaya', class: '9A' },
  { nis: '2024010', name: 'Joko Susilo', class: '9A' },
];

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil 2025/2026');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [viewingGrade, setViewingGrade] = useState<Grade | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: keyof Grade; direction: 'asc' | 'desc'} | null>(null);

  const [grades, setGrades] = useState<Grade[]>([
    { id: 1, nis: '2024001', student: 'Ahmad Rizki', class: '7A', subject: 'Matematika', tugas: 85, uts: 88, uas: 87, praktik: 90, kehadiran: 95, avg: 86.7, grade: 'B', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: '' },
    { id: 2, nis: '2024002', student: 'Siti Nurhaliza', class: '7A', subject: 'Matematika', tugas: 92, uts: 95, uas: 94, praktik: 88, kehadiran: 100, avg: 93.7, grade: 'A', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: 'Sangat baik' },
    { id: 3, nis: '2024003', student: 'Budi Santoso', class: '7A', subject: 'Matematika', tugas: 78, uts: 82, uas: 75, praktik: 80, kehadiran: 90, avg: 78.3, grade: 'C', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: 'Perlu meningkatkan tugas' },
    { id: 4, nis: '2024001', student: 'Ahmad Rizki', class: '7A', subject: 'IPA', tugas: 80, uts: 85, uas: 82, praktik: 85, kehadiran: 92, avg: 83.2, grade: 'B', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-02', notes: '' },
    { id: 5, nis: '2024004', student: 'Dewi Kusuma', class: '7B', subject: 'Matematika', tugas: 88, uts: 90, uas: 88, praktik: 92, kehadiran: 98, avg: 88.7, grade: 'B', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: '' },
    { id: 6, nis: '2024005', student: 'Eko Prasetyo', class: '7B', subject: 'Matematika', tugas: 65, uts: 70, uas: 68, praktik: 72, kehadiran: 85, avg: 68.3, grade: 'D', status: 'Remedial', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: 'Perlu remedial UTS' },
    { id: 7, nis: '2024006', student: 'Fitri Andayani', class: '8A', subject: 'Matematika', tugas: 95, uts: 98, uas: 96, praktik: 95, kehadiran: 100, avg: 96.3, grade: 'A', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: 'Excellent' },
    { id: 8, nis: '2024007', student: 'Galih Wicaksono', class: '8A', subject: 'Matematika', tugas: 82, uts: 85, uas: 80, praktik: 85, kehadiran: 88, avg: 82.3, grade: 'B', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: '' },
    { id: 9, nis: '2024008', student: 'Hanifah Putri', class: '8B', subject: 'Matematika', tugas: 90, uts: 92, uas: 91, praktik: 90, kehadiran: 95, avg: 91.0, grade: 'A', status: 'Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: '' },
    { id: 10, nis: '2024009', student: 'Indra Wijaya', class: '9A', subject: 'Matematika', tugas: 55, uts: 60, uas: 58, praktik: 65, kehadiran: 75, avg: 58.3, grade: 'E', status: 'Tidak Lulus', semester: 'Ganjil 2025/2026', tahunAjaran: '2025/2026', lastUpdated: '2026-04-01', notes: 'Sangat memerlukan bimbingan' },
  ]);

  // Form state untuk add/edit
  const [formData, setFormData] = useState<Partial<Grade>>({
    nis: '',
    student: '',
    class: '7A',
    subject: 'Matematika',
    tugas: 0,
    uts: 0,
    uas: 0,
    praktik: 0,
    kehadiran: 100,
    semester: 'Ganjil 2025/2026',
    tahunAjaran: '2025/2026',
    notes: ''
  });

  // Calculate average dan grade
  const calculateGrade = (tugas: number, uts: number, uas: number, praktik: number = 0) => {
    const weights = { tugas: 0.2, uts: 0.25, uas: 0.35, praktik: 0.2 };
    const avg = (tugas * weights.tugas) + (uts * weights.uts) + (uas * weights.uas) + (praktik * weights.praktik);
    
    let grade = 'E';
    let status: 'Lulus' | 'Remedial' | 'Tidak Lulus' = 'Tidak Lulus';
    
    if (avg >= 85) { grade = 'A'; status = 'Lulus'; }
    else if (avg >= 75) { grade = 'B'; status = 'Lulus'; }
    else if (avg >= 65) { grade = 'C'; status = 'Lulus'; }
    else if (avg >= 50) { grade = 'D'; status = 'Remedial'; }
    
    return { avg: Math.round(avg * 10) / 10, grade, status };
  };

  // Filter dan sort data
  const filteredData = useMemo(() => {
    let data = grades.filter(g => {
      const matchSearch = g.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          g.nis.includes(searchTerm);
      const matchClass = selectedClass === 'ALL' || g.class === selectedClass;
      const matchSubject = selectedSubject === 'ALL' || g.subject === selectedSubject;
      const matchSemester = g.semester === selectedSemester;
      return matchSearch && matchClass && matchSubject && matchSemester;
    });

    if (sortConfig) {
      data.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if ((aValue ?? 0) < (bValue ?? 0)) return sortConfig.direction === 'asc' ? -1 : 1;
        if ((aValue ?? 0) > (bValue ?? 0)) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [grades, searchTerm, selectedClass, selectedSubject, selectedSemester, sortConfig]);

  // Stats
  const stats = useMemo(() => {
    const filtered = filteredData;
    const avg = filtered.length > 0 ? filtered.reduce((acc, g) => acc + g.avg, 0) / filtered.length : 0;
    const gradeA = filtered.filter(g => g.grade === 'A').length;
    const remedial = filtered.filter(g => g.status === 'Remedial').length;
    const tidakLulus = filtered.filter(g => g.status === 'Tidak Lulus').length;
    
    return {
      total: filtered.length,
      avg: avg.toFixed(1),
      gradeA,
      remedial,
      tidakLulus
    };
  }, [filteredData]);

  const handleSort = (key: keyof Grade) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleAdd = () => {
    if (!formData.nis || !formData.subject) {
      setNotification({ message: 'NIS dan Mata Pelajaran wajib diisi!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const student = studentsData.find(s => s.nis === formData.nis);
    if (!student) {
      setNotification({ message: 'Siswa tidak ditemukan!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const existing = grades.find(g => g.nis === formData.nis && g.subject === formData.subject && g.semester === selectedSemester);
    if (existing) {
      setNotification({ message: 'Nilai untuk siswa dan mapel ini sudah ada!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const { avg, grade, status } = calculateGrade(
      formData.tugas || 0,
      formData.uts || 0,
      formData.uas || 0,
      formData.praktik || 0
    );

    const newGrade: Grade = {
      id: Date.now(),
      nis: student.nis,
      student: student.name,
      class: student.class,
      subject: formData.subject || 'Matematika',
      tugas: formData.tugas || 0,
      uts: formData.uts || 0,
      uas: formData.uas || 0,
      praktik: formData.praktik || 0,
      kehadiran: formData.kehadiran || 100,
      avg,
      grade,
      status,
      semester: selectedSemester,
      tahunAjaran: '2025/2026',
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: formData.notes || ''
    };

    setGrades(prev => [...prev, newGrade]);
    setShowAddModal(false);
    resetForm();
    setNotification({ message: 'Nilai berhasil ditambahkan!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = () => {
    if (!editingGrade) return;

    const { avg, grade, status } = calculateGrade(
      formData.tugas || 0,
      formData.uts || 0,
      formData.uas || 0,
      formData.praktik || 0
    );

    setGrades(prev => prev.map(g => 
      g.id === editingGrade.id 
        ? { ...g, ...formData, avg, grade, status, lastUpdated: new Date().toISOString().split('T')[0] } as Grade
        : g
    ));
    
    setShowEditModal(false);
    setEditingGrade(null);
    resetForm();
    setNotification({ message: 'Nilai berhasil diupdate!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (grade: Grade) => {
    if (confirm(`Hapus nilai ${grade.student} - ${grade.subject}?`)) {
      setGrades(prev => prev.filter(g => g.id !== grade.id));
      setNotification({ message: 'Nilai berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleExport = () => {
    const csv = [
      ['NIS', 'Nama', 'Kelas', 'Mapel', 'Tugas', 'UTS', 'UAS', 'Praktik', 'Kehadiran', 'Rata-rata', 'Grade', 'Status', 'Semester'].join(','),
      ...filteredData.map(g => [
        g.nis, g.student, g.class, g.subject, g.tugas, g.uts, g.uas, 
        g.praktik || 0, g.kehadiran || 0, g.avg, g.grade, g.status, g.semester
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nilai-siswa-${selectedSemester.replace(/\s/g, '-')}.csv`;
    a.click();
    
    setNotification({ message: 'File CSV berhasil diunduh!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      nis: '',
      student: '',
      class: '7A',
      subject: 'Matematika',
      tugas: 0,
      uts: 0,
      uas: 0,
      praktik: 0,
      kehadiran: 100,
      semester: selectedSemester,
      tahunAjaran: '2025/2026',
      notes: ''
    });
  };

  const openEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setFormData({ ...grade });
    setShowEditModal(true);
  };

  const openView = (grade: Grade) => {
    setViewingGrade(grade);
    setShowViewModal(true);
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-700 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'D': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'E': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Lulus': return 'bg-green-100 text-green-700';
      case 'Remedial': return 'bg-orange-100 text-orange-700';
      case 'Tidak Lulus': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAverageColor = (avg: number) => {
    if (avg >= 85) return 'text-green-600';
    if (avg >= 70) return 'text-blue-600';
    if (avg >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const SortHeader = ({ label, sortKey }: { label: string; sortKey: keyof Grade }) => (
    <button
      onClick={() => handleSort(sortKey)}
      className="flex items-center gap-1 hover:text-green-600"
    >
      {label}
      {sortConfig?.key === sortKey && (
        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
      )}
    </button>
  );

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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tambah Nilai</h2>
                <p className="text-sm text-gray-500">Input nilai siswa baru</p>
              </div>
              <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Siswa *</label>
                  <select
                    value={formData.nis}
                    onChange={(e) => {
                      const student = studentsData.find(s => s.nis === e.target.value);
                      setFormData({ ...formData, nis: e.target.value, student: student?.name || '', class: student?.class || '7A' });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Siswa</option>
                    {studentsData.map(s => (
                      <option key={s.nis} value={s.nis}>{s.name} ({s.nis})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {subjects.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {semesters.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kehadiran (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.kehadiran}
                    onChange={(e) => setFormData({ ...formData, kehadiran: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Nilai Komponen
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tugas (20%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.tugas}
                      onChange={(e) => setFormData({ ...formData, tugas: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UTS (25%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.uts}
                      onChange={(e) => setFormData({ ...formData, uts: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UAS (35%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.uas}
                      onChange={(e) => setFormData({ ...formData, uas: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Praktik (20%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.praktik}
                      onChange={(e) => setFormData({ ...formData, praktik: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Catatan untuk siswa..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              {/* Preview */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Preview Nilai</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-green-600">Rata-rata</p>
                    <p className="text-2xl font-bold text-green-800">
                      {calculateGrade(formData.tugas || 0, formData.uts || 0, formData.uas || 0, formData.praktik || 0).avg}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Grade</p>
                    <p className="text-2xl font-bold text-green-800">
                      {calculateGrade(formData.tugas || 0, formData.uts || 0, formData.uas || 0, formData.praktik || 0).grade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600">Status</p>
                    <p className="text-lg font-bold text-green-800">
                      {calculateGrade(formData.tugas || 0, formData.uts || 0, formData.uas || 0, formData.praktik || 0).status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Simpan Nilai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingGrade && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Nilai</h2>
                <p className="text-sm text-gray-500">{editingGrade.student} - {editingGrade.subject}</p>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditingGrade(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Nilai Komponen
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tugas (20%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.tugas}
                      onChange={(e) => setFormData({ ...formData, tugas: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UTS (25%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.uts}
                      onChange={(e) => setFormData({ ...formData, uts: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UAS (35%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.uas}
                      onChange={(e) => setFormData({ ...formData, uas: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Praktik (20%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.praktik}
                      onChange={(e) => setFormData({ ...formData, praktik: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Catatan untuk siswa..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              {/* Preview */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Preview Update</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-yellow-600">Rata-rata</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {calculateGrade(formData.tugas || 0, formData.uts || 0, formData.uas || 0, formData.praktik || 0).avg}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-yellow-600">Grade</p>
                    <p className="text-2xl font-bold text-yellow-800">
                      {calculateGrade(formData.tugas || 0, formData.uts || 0, formData.uas || 0, formData.praktik || 0).grade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-yellow-600">Status</p>
                    <p className="text-lg font-bold text-yellow-800">
                      {calculateGrade(formData.tugas || 0, formData.uts || 0, formData.uas || 0, formData.praktik || 0).status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => { setShowEditModal(false); setEditingGrade(null); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Update Nilai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingGrade && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Detail Nilai</h2>
                <p className="text-sm text-gray-500">{viewingGrade.semester}</p>
              </div>
              <button onClick={() => { setShowViewModal(false); setViewingGrade(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-700">{viewingGrade.grade}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{viewingGrade.student}</h3>
                  <p className="text-sm text-gray-500">{viewingGrade.nis} • {viewingGrade.class}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(viewingGrade.status)}`}>
                    {viewingGrade.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Mata Pelajaran</p>
                    <p className="font-semibold text-gray-900">{viewingGrade.subject}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Kehadiran</p>
                    <p className="font-semibold text-gray-900">{viewingGrade.kehadiran}%</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-3">Nilai Komponen</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tugas (20%)</span>
                      <span className="font-semibold">{viewingGrade.tugas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">UTS (25%)</span>
                      <span className="font-semibold">{viewingGrade.uts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">UAS (35%)</span>
                      <span className="font-semibold">{viewingGrade.uas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Praktik (20%)</span>
                      <span className="font-semibold">{viewingGrade.praktik || 0}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                    <span className="font-semibold text-gray-700">Rata-rata</span>
                    <span className={`font-bold ${getAverageColor(viewingGrade.avg)}`}>{viewingGrade.avg}</span>
                  </div>
                </div>

                {viewingGrade.notes && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Catatan</p>
                    <p className="text-yellow-700">{viewingGrade.notes}</p>
                  </div>
                )}

                <div className="text-sm text-gray-500 text-right">
                  Terakhir diupdate: {viewingGrade.lastUpdated}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => { setShowViewModal(false); openEdit(viewingGrade); }}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit Nilai
              </button>
              <button
                onClick={() => { setShowViewModal(false); setViewingGrade(null); }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Input & Kelola Nilai</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola nilai siswa untuk tugas, UTS, dan UAS.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { title: 'Total Nilai', value: stats.total.toString(), icon: FileSpreadsheet, color: 'blue' },
          { title: 'Rata-rata', value: stats.avg, icon: TrendingUp, color: 'green' },
          { title: 'Grade A', value: stats.gradeA.toString(), icon: CheckCircle, color: 'purple' },
          { title: 'Perlu Perhatian', value: (stats.remedial + stats.tidakLulus).toString(), icon: AlertCircle, color: 'orange' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            orange: 'bg-orange-50 text-orange-600'
          };
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau NIS..."
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
                <option key={c} value={c}>Kelas {c}</option>
              ))}
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="ALL">Semua Mapel</option>
              {subjects.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {semesters.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Nilai</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">NIS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas/Mapel</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer">
                  <SortHeader label="Tugas" sortKey="tugas" />
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer">
                  <SortHeader label="UTS" sortKey="uts" />
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer">
                  <SortHeader label="UAS" sortKey="uas" />
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer">
                  <SortHeader label="Rata-rata" sortKey="avg" />
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Grade</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((g) => (
                <tr key={g.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4 font-mono text-sm text-gray-600">{g.nis}</td>
                  <td className="py-3 px-4 font-medium text-sm">{g.student}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{g.class}</span>
                    <div className="text-xs text-gray-500 mt-1">{g.subject}</div>
                  </td>
                  <td className="py-3 px-4 text-center text-sm">{g.tugas}</td>
                  <td className="py-3 px-4 text-center text-sm">{g.uts}</td>
                  <td className="py-3 px-4 text-center text-sm">{g.uas}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-bold text-sm ${getAverageColor(g.avg)}`}>{g.avg}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getGradeColor(g.grade)}`}>{g.grade}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(g.status)}`}>{g.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openView(g)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => openEdit(g)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-yellow-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(g)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
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
      {filteredData.length === 0 && (
        <div className="py-12 text-center">
          <FileSpreadsheet className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data nilai</h3>
          <p className="text-gray-500 mb-4">Belum ada nilai untuk filter yang dipilih.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Tambah Nilai Pertama
          </button>
        </div>
      )}
    </div>
  );
}
