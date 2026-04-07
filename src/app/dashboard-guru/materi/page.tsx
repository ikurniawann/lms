'use client';

import { useState, useRef } from 'react';
import {
  BookOpen, Plus, Search, Filter, Edit, Trash2, Download, Upload, Eye,
  FileText, Video, Image, File, Menu, X, CheckCircle, AlertCircle, XCircle, FileSpreadsheet, FileCode
} from 'lucide-react';

interface Material {
  id: number;
  title: string;
  class: string;
  subject: string;
  type: string;
  size: string;
  uploaded: string;
  downloads: number;
  fileUrl?: string;
}

export default function MateriSaya() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, title: 'Aljabar Linear', class: '7A', subject: 'Matematika', type: 'PDF', size: '2.4 MB', uploaded: '2 jam lalu', downloads: 28, fileUrl: '#' },
    { id: 2, title: 'Geometri Dasar', class: '7B', subject: 'Matematika', type: 'PPT', size: '5.1 MB', uploaded: '5 jam lalu', downloads: 25, fileUrl: '#' },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', subject: 'Matematika', type: 'PDF', size: '3.2 MB', uploaded: '1 hari lalu', downloads: 30, fileUrl: '#' },
    { id: 4, title: 'Fungsi Linear', class: '8B', subject: 'Matematika', type: 'Video', size: '45.8 MB', uploaded: '2 hari lalu', downloads: 42, fileUrl: '#' },
    { id: 5, title: 'Statistika Dasar', class: '9A', subject: 'Matematika', type: 'PDF', size: '2.8 MB', uploaded: '3 hari lalu', downloads: 35, fileUrl: '#' },
    { id: 6, title: 'Peluang', class: '9B', subject: 'Matematika', type: 'PPT', size: '4.5 MB', uploaded: '4 hari lalu', downloads: 28, fileUrl: '#' },
  ]);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMaterials = materials.filter(mat => {
    const searchMatch = mat.title.toLowerCase().includes(searchTerm.toLowerCase());
    const classMatch = selectedClass === 'ALL' || mat.class === selectedClass;
    const subjectMatch = selectedSubject === 'ALL' || mat.subject === selectedSubject;
    return searchMatch && classMatch && subjectMatch;
  });

  const statsCards = [
    { title: 'Total Materi', value: materials.length.toString(), change: '+8', icon: BookOpen, color: 'blue' },
    { title: 'Total Downloads', value: '1,234', change: '+156', icon: Download, color: 'green' },
    { title: 'PDF', value: materials.filter(m => m.type === 'PDF').length.toString(), icon: FileText, color: 'purple' },
    { title: 'Video', value: materials.filter(m => m.type === 'Video').length.toString(), icon: Video, color: 'orange' },
  ];

  const getFileIcon = (type: string) => {
    switch(type.toUpperCase()) {
      case 'PDF': return <FileText className="w-5 h-5" />;
      case 'PPT': return <FileText className="w-5 h-5" />;
      case 'VIDEO': return <Video className="w-5 h-5" />;
      case 'IMAGE': return <Image className="w-5 h-5" />;
      case 'EXCEL': return <FileSpreadsheet className="w-5 h-5" />;
      case 'WORD': return <FileText className="w-5 h-5" />;
      case 'CODE': return <FileCode className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const getFileColor = (type: string) => {
    switch(type.toUpperCase()) {
      case 'PDF': return 'bg-red-100 text-red-600';
      case 'PPT': return 'bg-orange-100 text-orange-600';
      case 'VIDEO': return 'bg-blue-100 text-blue-600';
      case 'IMAGE': return 'bg-purple-100 text-purple-600';
      case 'EXCEL': return 'bg-green-100 text-green-600';
      case 'WORD': return 'bg-blue-100 text-blue-600';
      case 'CODE': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const typeMap: { [key: string]: string } = {
      'pdf': 'PDF',
      'ppt': 'PPT',
      'pptx': 'PPT',
      'mp4': 'Video',
      'avi': 'Video',
      'mov': 'Video',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image',
      'xls': 'Excel',
      'xlsx': 'Excel',
      'doc': 'Word',
      'docx': 'Word',
      'js': 'Code',
      'ts': 'Code',
      'html': 'Code',
      'css': 'Code',
    };
    return typeMap[ext] || 'File';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setNotification({ message: 'Pilih file terlebih dahulu', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate completion after 3 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Add new material to list
      const newMaterial: Material = {
        id: Date.now(),
        title: selectedFile.name.replace(/\.[^/.]+$/, ''),
        class: '7A',
        subject: 'Matematika',
        type: getFileType(selectedFile.name),
        size: formatFileSize(selectedFile.size),
        uploaded: 'Baru saja',
        downloads: 0,
        fileUrl: '#'
      };
      
      setMaterials(prev => [newMaterial, ...prev]);
      setUploadStatus('success');
      
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadStatus('idle');
        setUploadProgress(0);
        setSelectedFile(null);
        setNotification({ message: 'Materi berhasil diupload!', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
      }, 1000);
    }, 3000);
  };

  const handleView = (material: Material) => {
    setNotification({ message: `Menampilkan preview: ${material.title}`, type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownload = (material: Material) => {
    // Simulate download
    setMaterials(prev => prev.map(m => 
      m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
    ));
    setNotification({ message: `Downloading ${material.title}...`, type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingMaterial) {
      setMaterials(prev => prev.map(m => 
        m.id === editingMaterial.id ? editingMaterial : m
      ));
      setShowEditModal(false);
      setEditingMaterial(null);
      setNotification({ message: 'Materi berhasil diupdate!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = (material: Material) => {
    if (confirm(`Hapus materi "${material.title}"?`)) {
      setMaterials(prev => prev.filter(m => m.id !== material.id));
      setNotification({ message: 'Materi berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transition-all ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upload Materi</h2>
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadStatus('idle');
                  setUploadProgress(0);
                  setSelectedFile(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {uploadStatus === 'idle' && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Klik atau drag file ke sini</p>
                <p className="text-sm text-gray-500">Support: PDF, PPT, Video, Image, Excel, Word, dll</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="*/*"
                />
              </div>
            )}

            {selectedFile && uploadStatus === 'idle' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getFileColor(getFileType(selectedFile.name))}`}>
                    {getFileIcon(getFileType(selectedFile.name))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button
                  onClick={handleUpload}
                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                >
                  Upload Sekarang
                </button>
              </div>
            )}

            {uploadStatus === 'uploading' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Mengupload...</p>
                <p className="text-sm text-gray-500 mb-4">{uploadProgress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900">Upload Berhasil!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Materi</h2>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingMaterial(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={editingMaterial.title}
                  onChange={(e) => setEditingMaterial({...editingMaterial, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <select
                  value={editingMaterial.class}
                  onChange={(e) => setEditingMaterial({...editingMaterial, class: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                  <option value="9A">9A</option>
                  <option value="9B">9B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                <select
                  value={editingMaterial.subject}
                  onChange={(e) => setEditingMaterial({...editingMaterial, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">IPA</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="IPS">IPS</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingMaterial(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">LMS Guru</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              GS
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Budi Santoso, S.Pd</div>
              <div className="text-xs text-gray-500">Guru Matematika</div>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <a href="/dashboard-guru" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </div>
          </a>
          <a href="/dashboard-guru/materi" className="flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 rounded-lg transition-all border border-green-200">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Materi Saya</span>
            </div>
          </a>
          <a href="/dashboard-guru/tugas" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium text-sm">Tugas</span>
            </div>
          </a>
          <a href="/dashboard-guru/ujian" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5" />
              <span className="font-medium text-sm">Ujian</span>
            </div>
          </a>
          <a href="/dashboard-guru/students" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Siswa</span>
            </div>
          </a>
          <a href="/dashboard-guru/attendance" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Absensi</span>
            </div>
          </a>
          <a href="/dashboard-guru/grades" className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium text-sm">Nilai</span>
            </div>
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <a href="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-all mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">Pengaturan</span>
          </a>
          <a href="/logout" className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium text-sm">Keluar</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari siswa, kelas, materi..."
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Materi Saya</h1>
            <p className="text-gray-600">Kelola materi pembelajaran untuk siswa.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                purple: 'bg-purple-50 text-purple-600',
                orange: 'bg-orange-50 text-orange-600'
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

          {/* Actions Bar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari judul materi..."
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
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ALL">Semua Mapel</option>
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">IPA</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                </select>
              </div>

              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/30"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Upload Materi</span>
              </button>
            </div>
          </div>

          {/* Materials Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Judul</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mapel</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tipe</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ukuran</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Downloads</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Diupload</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map((mat) => (
                    <tr key={mat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getFileColor(mat.type)}`}>
                            {getFileIcon(mat.type)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{mat.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {mat.class}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{mat.subject}</td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-600">{mat.type}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{mat.size}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{mat.downloads}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{mat.uploaded}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleView(mat)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => handleDownload(mat)}
                            className="p-2 hover:bg-green-50 rounded-lg transition-all" title="Download"
                          >
                            <Download className="w-4 h-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleEdit(mat)}
                            className="p-2 hover:bg-yellow-50 rounded-lg transition-all" title="Edit"
                          >
                            <Edit className="w-4 h-4 text-yellow-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(mat)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-all" title="Hapus"
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
        </main>
      </div>
    </div>
  );
}
