'use client';

import { useState } from 'react';
import {
  BookOpen, Download, FileText, Video, Search, Eye, X, CheckCircle, AlertCircle,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut
} from 'lucide-react';

interface Material {
  id: number;
  title: string;
  subject: string;
  type: string;
  size: string;
  uploaded: string;
  teacher: string;
  description?: string;
  fileUrl?: string;
}

export default function MateriPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [pdfPage, setPdfPage] = useState(1);
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const [materials] = useState<Material[]>([
    { id: 1, title: 'Aljabar Linear', subject: 'Matematika', type: 'PDF', size: '2.4 MB', uploaded: '2 hari lalu', teacher: 'Budi Santoso, S.Pd', description: 'Materi lengkap tentang aljabar linear', fileUrl: '/materi/aljabar.pdf' },
    { id: 2, title: 'Geometri Dasar', subject: 'Matematika', type: 'PPT', size: '5.1 MB', uploaded: '3 hari lalu', teacher: 'Budi Santoso, S.Pd', description: 'Presentasi tentang geometri dasar' },
    { id: 3, title: 'Sistem Pencernaan', subject: 'IPA', type: 'PDF', size: '3.8 MB', uploaded: '5 hari lalu', teacher: 'Siti Aminah, S.Pd', description: 'Materi biologi tentang sistem pencernaan' },
    { id: 4, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', type: 'PDF', size: '2.1 MB', uploaded: '1 minggu lalu', teacher: 'Dewi Lestari, S.Pd', description: 'Penjelasan tentang teks eksposisi' },
    { id: 5, title: 'Simple Present Tense', subject: 'Bahasa Inggris', type: 'Video', size: '45.2 MB', uploaded: '1 minggu lalu', teacher: 'Ahmad Fauzi, S.Pd', description: 'Video pembelajaran grammar' },
  ]);

  const statsCards = [
    { title: 'Total Materi', value: materials.length.toString(), color: 'blue' },
    { title: 'Materi Baru', value: '3', color: 'green' },
    { title: 'Video', value: materials.filter(m => m.type === 'Video').length.toString(), color: 'purple' },
    { title: 'Dokumen', value: materials.filter(m => m.type !== 'Video').length.toString(), color: 'orange' },
  ];

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-600';
      case 'PPT': return 'bg-orange-100 text-orange-600';
      case 'Video': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const handleDownload = (material: Material) => {
    setViewingMaterial(material);
    setShowDownloadModal(true);
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setDownloadProgress(100);
      setIsDownloading(false);
    }, 2000);
  };

  const openPdfViewer = (material: Material) => {
    const samplePdf = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    setPdfUrl(samplePdf);
    setPdfZoom(100);
    setPdfPage(1);
    setViewingMaterial(material);
    setShowPdfViewer(true);
    setShowDownloadModal(false);
  };

  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setPdfUrl(null);
    setPdfZoom(100);
    setPdfPage(1);
    setViewingMaterial(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showPdfViewer && pdfUrl && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex flex-col">
          {/* Toolbar */}
          <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={closePdfViewer} className="p-2 hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold text-sm">{viewingMaterial?.title}</h3>
                <p className="text-xs text-gray-400">{viewingMaterial?.subject} - {viewingMaterial?.teacher}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-800 rounded-lg">
                <button onClick={() => setPdfZoom(z => Math.max(50, z - 10))} className="p-2 hover:bg-gray-700 rounded-l-lg">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm">{pdfZoom}%</span>
                <button onClick={() => setPdfZoom(z => Math.min(200, z + 10))} className="p-2 hover:bg-gray-700 rounded-r-lg">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

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
                onClick={() => pdfUrl && window.open(pdfUrl, '_blank')}
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
              src={`${pdfUrl}#page=${pdfPage}&zoom=${pdfZoom}`}
              className="w-full h-full max-w-5xl bg-white shadow-2xl rounded-lg"
              style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'center top' }}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && viewingMaterial && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            {!isDownloading && downloadProgress === 100 ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">File Siap!</h3>
                <p className="text-gray-600 mb-6"><span className="font-semibold">{viewingMaterial.title}</span> berhasil dimuat.</p>

                <div className="flex flex-col gap-3">
                  {viewingMaterial.type === 'PDF' && (
                    <button
                      onClick={() => openPdfViewer(viewingMaterial)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Buka di PDF Viewer</span>
                    </button>
                  )}
                  <button
                    onClick={() => { setShowDownloadModal(false); setViewingMaterial(null); setDownloadProgress(0); }}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-3 rounded-lg ${getFileColor(viewingMaterial.type)}`}>
                    {getFileIcon(viewingMaterial.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{viewingMaterial.title}</h3>
                    <p className="text-sm text-gray-500">{viewingMaterial.size}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Memuat file...</span>
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
                  Mohon tunggu, file sedang dimuat...
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Materi Pembelajaran</h1>
        <p className="text-sm sm:text-base text-gray-600">Download dan pelajari materi pembelajaran.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari materi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Daftar Materi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tipe</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ukuran</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Guru</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((m) => (
                <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getFileColor(m.type)}`}>
                        {getFileIcon(m.type)}
                      </div>
                      <span className="font-medium text-sm text-gray-900">{m.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{m.subject}</span></td>
                  <td className="py-3 px-4 text-sm text-gray-600">{m.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{m.size}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{m.teacher}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => handleDownload(m)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-3 h-3" /> Download
                    </button>
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
