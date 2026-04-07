'use client';

import { useState } from 'react';
import { 
  Users, Search, Eye, Edit, Plus, Trash2, X, CheckCircle, AlertCircle,
  Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen, TrendingUp,
  Filter, Download, ChevronDown, ChevronUp
} from 'lucide-react';

interface Student {
  id: number;
  nis: string;
  nisn: string;
  name: string;
  class: string;
  gender: 'L' | 'P';
  birthDate: string;
  birthPlace: string;
  address: string;
  phone: string;
  email: string;
  parentName: string;
  parentPhone: string;
  avg: number;
  attendance: number;
  status: 'Aktif' | 'Nonaktif' | 'Cuti';
  joinedYear: string;
  religion: string;
}

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: keyof Student; direction: 'asc' | 'desc'} | null>(null);

  const [students, setStudents] = useState<Student[]>([
    { id: 1, nis: '2024001', nisn: '00987654321', name: 'Ahmad Rizki', class: '7A', gender: 'L', birthDate: '2012-05-15', birthPlace: 'Jakarta', address: 'Jl. Merdeka No. 123, Jakarta', phone: '08123456789', email: 'ahmad.rizki@email.com', parentName: 'Bapak Rizki', parentPhone: '08129876543', avg: 85.5, attendance: 96, status: 'Aktif', joinedYear: '2024', religion: 'Islam' },
    { id: 2, nis: '2024002', nisn: '00987654322', name: 'Siti Nurhaliza', class: '7A', gender: 'P', birthDate: '2012-08-20', birthPlace: 'Bandung', address: 'Jl. Sudirman No. 45, Bandung', phone: '08123456790', email: 'siti.nurhaliza@email.com', parentName: 'Ibu Nurhaliza', parentPhone: '08129876544', avg: 92.3, attendance: 98, status: 'Aktif', joinedYear: '2024', religion: 'Islam' },
    { id: 3, nis: '2024003', nisn: '00987654323', name: 'Budi Santoso', class: '7A', gender: 'L', birthDate: '2011-12-10', birthPlace: 'Surabaya', address: 'Jl. Gatot Subroto No. 78, Surabaya', phone: '08123456791', email: 'budi.santoso@email.com', parentName: 'Bapak Santoso', parentPhone: '08129876545', avg: 78.5, attendance: 90, status: 'Aktif', joinedYear: '2024', religion: 'Kristen' },
    { id: 4, nis: '2024004', nisn: '00987654324', name: 'Dewi Kusuma', class: '7B', gender: 'P', birthDate: '2012-03-25', birthPlace: 'Yogyakarta', address: 'Jl. Malioboro No. 12, Yogyakarta', phone: '08123456792', email: 'dewi.kusuma@email.com', parentName: 'Ibu Kusuma', parentPhone: '08129876546', avg: 88.7, attendance: 95, status: 'Aktif', joinedYear: '2024', religion: 'Islam' },
    { id: 5, nis: '2024005', nisn: '00987654325', name: 'Eko Prasetyo', class: '7B', gender: 'L', birthDate: '2011-09-05', birthPlace: 'Semarang', address: 'Jl. Pemuda No. 56, Semarang', phone: '08123456793', email: 'eko.prasetyo@email.com', parentName: 'Bapak Prasetyo', parentPhone: '08129876547', avg: 75.2, attendance: 88, status: 'Aktif', joinedYear: '2024', religion: 'Katolik' },
    { id: 6, nis: '2024006', nisn: '00987654326', name: 'Fitri Andayani', class: '8A', gender: 'P', birthDate: '2011-06-30', birthPlace: 'Malang', address: 'Jl. Ahmad Yani No. 89, Malang', phone: '08123456794', email: 'fitri.andayani@email.com', parentName: 'Ibu Andayani', parentPhone: '08129876548', avg: 94.1, attendance: 99, status: 'Aktif', joinedYear: '2023', religion: 'Islam' },
    { id: 7, nis: '2024007', nisn: '00987654327', name: 'Galih Wicaksono', class: '8A', gender: 'L', birthDate: '2011-11-12', birthPlace: 'Surabaya', address: 'Jl. Basuki Rahmat No. 34, Surabaya', phone: '08123456795', email: 'galih.wicaksono@email.com', parentName: 'Bapak Wicaksono', parentPhone: '08129876549', avg: 82.3, attendance: 94, status: 'Aktif', joinedYear: '2023', religion: 'Islam' },
    { id: 8, nis: '2024008', nisn: '00987654328', name: 'Hanifah Putri', class: '8B', gender: 'P', birthDate: '2010-04-18', birthPlace: 'Medan', address: 'Jl. Diponegoro No. 67, Medan', phone: '08123456796', email: 'hanifah.putri@email.com', parentName: 'Ibu Putri', parentPhone: '08129876550', avg: 91.0, attendance: 97, status: 'Aktif', joinedYear: '2023', religion: 'Islam' },
    { id: 9, nis: '2024009', nisn: '00987654329', name: 'Indra Wijaya', class: '9A', gender: 'L', birthDate: '2010-07-22', birthPlace: 'Palembang', address: 'Jl. Sudirman No. 123, Palembang', phone: '08123456797', email: 'indra.wijaya@email.com', parentName: 'Bapak Wijaya', parentPhone: '08129876551', avg: 68.5, attendance: 85, status: 'Cuti', joinedYear: '2022', religion: 'Buddha' },
    { id: 10, nis: '2024010', nisn: '00987654330', name: 'Joko Susilo', class: '9A', gender: 'L', birthDate: '2010-02-14', birthPlace: 'Makassar', address: 'Jl. Ujung Pandang No. 45, Makassar', phone: '08123456798', email: 'joko.susilo@email.com', parentName: 'Bapak Susilo', parentPhone: '08129876552', avg: 72.8, attendance: 82, status: 'Nonaktif', joinedYear: '2022', religion: 'Hindu' },
  ]);

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
  const religions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.nis.includes(searchTerm) ||
                        s.nisn.includes(searchTerm);
    const matchClass = selectedClass === 'ALL' || s.class === selectedClass;
    const matchStatus = selectedStatus === 'ALL' || s.status === selectedStatus;
    return matchSearch && matchClass && matchStatus;
  });

  const stats = {
    total: students.length,
    laki: students.filter(s => s.gender === 'L').length,
    perempuan: students.filter(s => s.gender === 'P').length,
    aktif: students.filter(s => s.status === 'Aktif').length,
    avg: (students.reduce((acc, s) => acc + s.avg, 0) / students.length).toFixed(1)
  };

  const [formData, setFormData] = useState<Partial<Student>>({
    nis: '',
    nisn: '',
    name: '',
    class: '7A',
    gender: 'L',
    birthDate: '',
    birthPlace: '',
    address: '',
    phone: '',
    email: '',
    parentName: '',
    parentPhone: '',
    religion: 'Islam',
    status: 'Aktif',
    joinedYear: new Date().getFullYear().toString()
  });

  const handleAdd = () => {
    if (!formData.name || !formData.nis) {
      setNotification({ message: 'Nama dan NIS wajib diisi!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      nis: formData.nis || '',
      nisn: formData.nisn || '',
      name: formData.name || '',
      class: formData.class || '7A',
      gender: formData.gender || 'L',
      birthDate: formData.birthDate || '',
      birthPlace: formData.birthPlace || '',
      address: formData.address || '',
      phone: formData.phone || '',
      email: formData.email || '',
      parentName: formData.parentName || '',
      parentPhone: formData.parentPhone || '',
      avg: 0,
      attendance: 100,
      status: formData.status as 'Aktif' | 'Nonaktif' | 'Cuti' || 'Aktif',
      joinedYear: formData.joinedYear || new Date().getFullYear().toString(),
      religion: formData.religion || 'Islam'
    };

    setStudents(prev => [...prev, newStudent]);
    setShowAddModal(false);
    resetForm();
    setNotification({ message: 'Siswa berhasil ditambahkan!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = () => {
    if (!editingStudent) return;

    setStudents(prev => prev.map(s => 
      s.id === editingStudent.id ? { ...s, ...formData } as Student : s
    ));
    
    setShowEditModal(false);
    setEditingStudent(null);
    resetForm();
    setNotification({ message: 'Data siswa berhasil diupdate!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (student: Student) => {
    if (confirm(`Hapus data siswa "${student.name}"?`)) {
      setStudents(prev => prev.filter(s => s.id !== student.id));
      setNotification({ message: 'Siswa berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleExport = () => {
    const csv = [
      ['NIS', 'NISN', 'Nama', 'Kelas', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Alamat', 'No HP', 'Email', 'Nama Ortu', 'No Ortu', 'Status'].join(','),
      ...filteredStudents.map(s => [
        s.nis, s.nisn, s.name, s.class, s.gender === 'L' ? 'Laki-laki' : 'Perempuan',
        s.birthPlace, s.birthDate, s.religion, s.address, s.phone, s.email,
        s.parentName, s.parentPhone, s.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-siswa-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    setNotification({ message: 'File CSV berhasil diunduh!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      nis: '',
      nisn: '',
      name: '',
      class: '7A',
      gender: 'L',
      birthDate: '',
      birthPlace: '',
      address: '',
      phone: '',
      email: '',
      parentName: '',
      parentPhone: '',
      religion: 'Islam',
      status: 'Aktif',
      joinedYear: new Date().getFullYear().toString()
    });
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setShowEditModal(true);
  };

  const openView = (student: Student) => {
    setViewingStudent(student);
    setShowViewModal(true);
  };

  const handleSort = (key: keyof Student) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Aktif': return 'bg-green-100 text-green-700 border-green-200';
      case 'Nonaktif': return 'bg-red-100 text-red-700 border-red-200';
      case 'Cuti': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const SortHeader = ({ label, sortKey }: { label: string; sortKey: keyof Student }) => (
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

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{showEditModal ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</h2>
                <p className="text-sm text-gray-500">{showEditModal ? 'Update informasi siswa' : 'Lengkapi data siswa'}</p>
              </div>
              <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIS *</label>
                  <input type="text" value={formData.nis} onChange={(e) => setFormData({...formData, nis: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                  <input type="text" value={formData.nisn} onChange={(e) => setFormData({...formData, nisn: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                  <select value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value as 'L' | 'P'})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                  <input type="text" value={formData.birthPlace} onChange={(e) => setFormData({...formData, birthPlace: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                  <input type="date" value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                  <select value={formData.religion} onChange={(e) => setFormData({...formData, religion: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {religions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as 'Aktif' | 'Nonaktif' | 'Cuti'})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                    <option value="Cuti">Cuti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea rows={2} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Siswa</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">Data Orang Tua/Wali</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ortu/Wali</label>
                    <input type="text" value={formData.parentName} onChange={(e) => setFormData({...formData, parentName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. HP Ortu</label>
                    <input type="tel" value={formData.parentPhone} onChange={(e) => setFormData({...formData, parentPhone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={showEditModal ? handleEdit : handleAdd} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">{showEditModal ? 'Update Siswa' : 'Simpan Siswa'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Detail Siswa</h2>
                <p className="text-sm text-gray-500">{viewingStudent.nis} • {viewingStudent.nisn}</p>
              </div>
              <button onClick={() => { setShowViewModal(false); setViewingStudent(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${viewingStudent.gender === 'L' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                  {viewingStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{viewingStudent.name}</h3>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(viewingStudent.status)}`}>{viewingStudent.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-500">Kelas</p><p className="font-semibold text-gray-900">{viewingStudent.class}</p></div>
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-500">Jenis Kelamin</p><p className="font-semibold text-gray-900">{viewingStudent.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p></div>
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-500">Tempat, Tgl Lahir</p><p className="font-semibold text-gray-900">{viewingStudent.birthPlace}, {viewingStudent.birthDate}</p></div>
                <div className="bg-gray-50 p-3 rounded-lg"><p className="text-sm text-gray-500">Agama</p><p className="font-semibold text-gray-900">{viewingStudent.religion}</p></div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 text-gray-700 mb-2"><MapPin className="w-4 h-4" /><span className="font-medium">Alamat</span></div>
                <p className="text-gray-900">{viewingStudent.address || '-'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-gray-500 mb-1"><Phone className="w-4 h-4" /><span className="text-sm">No. HP</span></div><p className="font-semibold text-gray-900">{viewingStudent.phone || '-'}</p></div>
                <div className="bg-gray-50 p-3 rounded-lg"><div className="flex items-center gap-2 text-gray-500 mb-1"><Mail className="w-4 h-4" /><span className="text-sm">Email</span></div><p className="font-semibold text-gray-900">{viewingStudent.email || '-'}</p></div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Data Orang Tua</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-blue-600">Nama</p><p className="font-semibold text-blue-900">{viewingStudent.parentName || '-'}</p></div>
                  <div><p className="text-sm text-blue-600">No. HP</p><p className="font-semibold text-blue-900">{viewingStudent.parentPhone || '-'}</p></div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Statistik Akademik</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-sm text-green-600">Rata-rata Nilai</p><p className="text-2xl font-bold text-green-800">{viewingStudent.avg}</p></div>
                  <div><p className="text-sm text-green-600">Kehadiran</p><p className="text-2xl font-bold text-green-800">{viewingStudent.attendance}%</p></div>
                  <div><p className="text-sm text-green-600">Tahun Masuk</p><p className="text-2xl font-bold text-green-800">{viewingStudent.joinedYear}</p></div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button onClick={() => { setShowViewModal(false); openEdit(viewingStudent); }} className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Edit Data</button>
              <button onClick={() => { setShowViewModal(false); setViewingStudent(null); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Data Siswa</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola data siswa di kelas Anda.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { title: 'Total Siswa', value: stats.total.toString(), icon: Users, color: 'blue' },
          { title: 'Laki-laki', value: stats.laki.toString(), icon: Users, color: 'green' },
          { title: 'Perempuan', value: stats.perempuan.toString(), icon: Users, color: 'purple' },
          { title: 'Rata-rata Nilai', value: stats.avg, icon: TrendingUp, color: 'orange' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : stat.color === 'green' ? 'bg-green-50 text-green-600' : stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'}`}>
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
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari nama, NIS, atau NISN..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="ALL">Semua Kelas</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="ALL">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
            <option value="Cuti">Cuti</option>
          </select>

          <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>

          <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Tambah Siswa
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700"><SortHeader label="NIS" sortKey="nis" /></th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700"><SortHeader label="Nama" sortKey="name" /></th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Jenis Kelamin</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer"><SortHeader label="Rata-rata" sortKey="avg" /></th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer"><SortHeader label="Kehadiran" sortKey="attendance" /></th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-3 px-4 font-mono text-sm text-gray-600">{s.nis}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${s.gender === 'L' ? 'bg-blue-500' : 'bg-pink-500'}`}>{s.name.charAt(0)}</div>
                      <span className="font-medium text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{s.class}</span></td>
                  <td className="py-3 px-4 text-sm">{s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                  <td className="py-3 px-4 text-center text-sm font-bold text-green-600">{s.avg}</td>
                  <td className="py-3 px-4 text-center text-sm">{s.attendance}%</td>
                  <td className="py-3 px-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(s.status)}`}>{s.status}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button onClick={() => openView(s)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat Detail"><Eye className="w-4 h-4 text-blue-600" /></button>
                      <button onClick={() => openEdit(s)} className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4 text-green-600" /></button>
                      <button onClick={() => handleDelete(s)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Hapus"><Trash2 className="w-4 h-4 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="py-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data siswa</h3>
          <p className="text-gray-500 mb-4">Belum ada siswa yang sesuai filter.</p>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Tambah Siswa Pertama</button>
        </div>
      )}
    </div>
  );
}
