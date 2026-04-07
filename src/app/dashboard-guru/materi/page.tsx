'use client';

import { useState, useRef } from 'react';
import {
  BookOpen, Plus, Search, Filter, Edit, Trash2, Download, Upload, Eye,
  FileText, Video, Image, File, Menu, X, CheckCircle, AlertCircle, XCircle, FileSpreadsheet, FileCode,
  Calendar, Clock, User, Hash, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut
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
  description?: string;
  author?: string;
  createdAt?: string;
}

export default function MateriSaya() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, title: 'Aljabar Linear', class: '7A', subject: 'Matematika', type: 'PDF', size: '2.4 MB', uploaded: '2 jam lalu', downloads: 28, fileUrl: '#', description: 'Materi tentang aljabar linear untuk kelas 7', author: 'Budi Santoso', createdAt: '2024-01-15' },
    { id: 2, title: 'Geometri Dasar', class: '7B', subject: 'Matematika', type: 'PPT', size: '5.1 MB', uploaded: '5 jam lalu', downloads: 25, fileUrl: '#', description: 'Presentasi tentang dasar-dasar geometri', author: 'Budi Santoso', createdAt: '2024-01-14' },
    { id: 3, title: 'Persamaan Kuadrat', class: '8A', subject: 'Matematika', type: 'PDF', size: '3.2 MB', uploaded: '1 hari lalu', downloads: 30, fileUrl: '#', description: 'Penjelasan lengkap tentang persamaan kuadrat', author: 'Budi Santoso', createdAt: '2024-01-13' },
    { id: 4, title: 'Fungsi Linear', class: '8B', subject: 'Matematika', type: 'Video', size: '45.8 MB', uploaded: '2 hari lalu', downloads: 42, fileUrl: '#', description: 'Video pembelajaran fungsi linear', author: 'Budi Santoso', createdAt: '2024-01-12' },
    { id: 5, title: 'Statistika Dasar', class: '9A', subject: 'Matematika', type: 'PDF', size: '2.8 MB', uploaded: '3 hari lalu', downloads: 35, fileUrl: '#', description: 'Materi statistika untuk persiapan ujian', author: 'Budi Santoso', createdAt: '2024-01-11' },
    { id: 6, title: 'Peluang', class: '9B', subject: 'Matematika', type: 'PPT', size: '4.5 MB', uploaded: '4 hari lalu', downloads: 28, fileUrl: '#', description: 'Konsep dasar peluang dan penerapannya', author: 'Budi Santoso', createdAt: '2024-01-10' },
  ]);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadingMaterial, setDownloadingMaterial] = useState<Material | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [pdfPage, setPdfPage] = useState(1);
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

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const newMaterial: Material = {
        id: Date.now(),
        title: selectedFile.name.replace(/\.[^/.]+$/, ''),
        class: '7A',
        subject: 'Matematika',
        type: getFileType(selectedFile.name),
        size: formatFileSize(selectedFile.size),
        uploaded: 'Baru saja',
        downloads: 0,
        fileUrl: '#',
        description: 'Deskripsi materi baru',
        author: 'Budi Santoso',
        createdAt: new Date().toISOString().split('T')[0]
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
    setViewingMaterial(material);
    setShowViewModal(true);
  };

  const handleDownload = (material: Material) => {
    setDownloadingMaterial(material);
    setShowDownloadModal(true);
    setIsDownloading(true);
    setDownloadProgress(0);

    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setDownloadProgress(100);
      
      setMaterials(prev => prev.map(m =>
        m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
      ));

      setIsDownloading(false);
    }, 2000);
  };

  const openPdfViewer = (material: Material) => {
    const samplePdf = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    setPdfUrl(samplePdf);
    setPdfZoom(100);
    setPdfPage(1);
    setShowPdfViewer(true);
    setShowDownloadModal(false);
  };

  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setPdfUrl(null);
    setPdfZoom(100);
    setPdfPage(1);
    setDownloadingMaterial(null);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial({ ...material });
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
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[60] flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transition-all ${
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

      {/* PDF Viewer Modal */}
      {showPdfViewer && pdfUrl && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col">
          {/* PDF Toolbar */}
          <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={closePdfViewer} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold text-sm">{downloadingMaterial?.title || 'PDF Viewer'}</h3>
                <p className="text-xs text-gray-400">{downloadingMaterial?.type} - {downloadingMaterial?.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <div className="flex items-center bg-gray-800 rounded-lg">
                <button onClick={() => setPdfZoom(z => Math.max(50, z - 10))} className="p-2 hover:bg-gray-700 rounded-l-lg">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm min-w-[60px] text-center">{pdfZoom}%</span>
                <button onClick={() => setPdfZoom(z => Math.min(200, z + 10))} className="p-2 hover:bg-gray-700 rounded-r-lg">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Page navigation */}
              <div className="flex items-center bg-gray-800 rounded-lg ml-2">
                <button onClick={() => setPdfPage(p => Math.max(1, p - 1))} className="p-2 hover:bg-gray-700 rounded-l-lg">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm">Hal {pdfPage}</span>
                <button onClick={() => setPdfPage(p => p + 1)} className="p-2 hover:bg-gray-700 rounded-r-lg">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => window.open(pdfUrl, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg ml-4"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 bg-gray-800 overflow-auto flex items-center justify-center p-8">
            <iframe
              src={`${pdfUrl}#page=${pdfPage} &zoom=${pdfZoom}`}
              className="w-full h-full max-w-5xl bg-white shadow-2xl rounded-lg"
              style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'center top' }}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Detail Materi</h2>
              <button 
                onClick={() => { setShowViewModal(false); setViewingMaterial(null); }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-4 rounded-xl ${getFileColor(viewingMaterial.type)}`}>
                {getFileIcon(viewingMaterial.type)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{viewingMaterial.title}</h3>
                <p className="text-sm text-gray-500">{viewingMaterial.type} • {viewingMaterial.size}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-500 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Kelas</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingMaterial.class}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-500 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">Mata Pelajaran</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingMaterial.subject}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Pembuat</span>
                </div>
                <p className="font-semibold text-gray-900">{viewingMaterial.author}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm">Total Downloads</span>
                </div>
                <p className="font-semibold text-gray-900">{viewingMaterial.downloads} kali</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Tanggal Dibuat</span>
                </div>
                <p className="font-semibold text-gray-900">{viewingMaterial.createdAt}</p>
              </div>

              {viewingMaterial.description && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-500 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Deskripsi</span>
                  </div>
                  <p className="text-gray-900">{viewingMaterial.description}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => { setShowViewModal(false); handleDownload(viewingMaterial); }}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => { setShowViewModal(false); setViewingMaterial(null); }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && downloadingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            {!isDownloading && downloadProgress === 100 ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">File Siap!</h3>
                <p className="text-gray-600 mb-6"><span className="font-semibold">{downloadingMaterial.title}</span> berhasil dimuat.</p>

                <div className="flex flex-col gap-3">
                  {downloadingMaterial.type === 'PDF' && (
                    <button
                      onClick={() => openPdfViewer(downloadingMaterial)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Buka di PDF Viewer</span>
                    </button>
                  )}
                  <button
                    onClick={() => { setShowDownloadModal(false); setDownloadingMaterial(null); setDownloadProgress(0); }}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-lg ${getFileColor(downloadingMaterial.type)}`}>
                    {getFileIcon(downloadingMaterial.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{downloadingMaterial.title}</h3>
                    <p className="text-sm text-gray-500">{downloadingMaterial.size}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Mengunduh...</span>
                    <span className="text-sm font-semibold text-gray-900">{downloadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Mohon tunggu, file sedang diunduh...
                </p>
              </>
            )}
          </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
                <input
                  type="text"
                  value={editingMaterial.title}
                  onChange={(e) => setEditingMaterial({...editingMaterial, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kelas *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran *</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={editingMaterial.description || ''}
                  onChange={(e) => setEditingMaterial({...editingMaterial, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Deskripsi materi..."
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500"><span className="font-medium">File: </span>{editingMaterial.type} • {editingMaterial.size}</p>
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
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
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
                        className="p-2 hover:bg-blue-50 rounded-lg transition-all" title="Lihat Detail"
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
    </div>
  );
}
