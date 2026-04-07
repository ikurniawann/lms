'use client';

import { useState, useRef } from 'react';
import { 
  FileText, Clock, CheckCircle, AlertCircle, Upload, X, Eye, 
  RotateCcw, Calendar, File, Download
} from 'lucide-react';

interface Submission {
  date: string;
  time: string;
  fileName: string;
  fileSize: string;
  revision: number;
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  description?: string;
  due: string;
  dueDateTime: string;
  status: 'Belum Dikerjakan' | 'Sudah Dikumpulkan' | 'Terlambat' | 'Perlu Revisi';
  submitted: boolean;
  score?: number;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  submissions?: Submission[];
  canRevise?: boolean;
}

export default function TugasPage() {
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { 
      id: 1, 
      title: 'Latihan Soal Bab 1', 
      subject: 'Matematika', 
      description: 'Kerjakan soal nomor 1-20 pada halaman 45-48',
      due: '2 Apr 2026, 23:59', 
      dueDateTime: '2026-04-02T23:59:00',
      status: 'Belum Dikerjakan', 
      submitted: false,
      fileUrl: '#',
      fileName: 'Latihan_Soal_Bab_1.pdf',
      fileSize: '245 KB'
    },
    { 
      id: 2, 
      title: 'PR Geometri', 
      subject: 'Matematika', 
      description: 'PR tentang bangun ruang dan bangun datar',
      due: '3 Apr 2026, 23:59', 
      dueDateTime: '2026-04-03T23:59:00',
      status: 'Belum Dikerjakan', 
      submitted: false 
    },
    { 
      id: 3, 
      title: 'Quiz Aljabar', 
      subject: 'Matematika', 
      description: 'Quiz tentang persamaan linear',
      due: '25 Mar 2026, 23:59', 
      dueDateTime: '2026-03-25T23:59:00',
      status: 'Sudah Dikumpulkan', 
      submitted: true, 
      score: 85,
      submissions: [
        { date: '25 Mar 2026', time: '20:15', fileName: 'Quiz_Aljabar_Ahmad.pdf', fileSize: '1.2 MB', revision: 1 }
      ]
    },
    { 
      id: 4, 
      title: 'Teks Eksposisi', 
      subject: 'Bahasa Indonesia', 
      description: 'Buat teks eksposisi tentang lingkungan',
      due: '28 Mar 2026, 23:59', 
      dueDateTime: '2026-03-28T23:59:00',
      status: 'Terlambat', 
      submitted: false 
    },
    { 
      id: 5, 
      title: 'Sistem Pencernaan', 
      subject: 'IPA', 
      description: 'Essay tentang sistem pencernaan manusia',
      due: '20 Mar 2026, 23:59', 
      dueDateTime: '2026-03-20T23:59:00',
      status: 'Perlu Revisi', 
      submitted: true,
      canRevise: true,
      submissions: [
        { date: '20 Mar 2026', time: '18:30', fileName: 'Sistem_Pencernaan_v1.pdf', fileSize: '2.1 MB', revision: 1 }
      ]
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const statsCards = [
    { title: 'Total Tugas', value: assignments.length.toString(), color: 'blue' },
    { title: 'Sudah Dikumpul', value: assignments.filter(a => a.submitted).length.toString(), color: 'green' },
    { title: 'Belum Dikerjakan', value: assignments.filter(a => !a.submitted && a.status !== 'Terlambat').length.toString(), color: 'yellow' },
    { title: 'Terlambat', value: assignments.filter(a => a.status === 'Terlambat').length.toString(), color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sudah Dikumpulkan': return 'bg-green-100 text-green-700';
      case 'Belum Dikerjakan': return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat': return 'bg-red-100 text-red-700';
      case 'Perlu Revisi': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const isDeadlinePassed = (dueDateTime: string) => {
    return new Date() > new Date(dueDateTime);
  };

  const canSubmit = (assignment: Assignment) => {
    if (assignment.status === 'Sudah Dikumpulkan' && !assignment.canRevise) return false;
    if (isDeadlinePassed(assignment.dueDateTime) && assignment.status !== 'Perlu Revisi') return false;
    return true;
  };

  const handleOpenSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
    setSelectedFile(null);
  };

  const handleOpenDetail = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !selectedAssignment) {
      setNotification({ message: 'Pilih file terlebih dahulu!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      const now = new Date();
      const submissionDate = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      const submissionTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

      const newSubmission: Submission = {
        date: submissionDate,
        time: submissionTime,
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB',
        revision: (selectedAssignment.submissions?.length || 0) + 1
      };

      setAssignments(prev => prev.map(a => {
        if (a.id === selectedAssignment.id) {
          return {
            ...a,
            status: 'Sudah Dikumpulkan',
            submitted: true,
            canRevise: false,
            submissions: [...(a.submissions || []), newSubmission]
          };
        }
        return a;
      }));

      setIsUploading(false);
      setShowSubmitModal(false);
      setSelectedFile(null);
      setSelectedAssignment(null);
      setNotification({ message: 'Tugas berhasil dikumpulkan!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }, 2000);
  };

  const handleRevisi = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
    setSelectedFile(null);
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

      {/* Submit Modal */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedAssignment.submitted ? 'Revisi Tugas' : 'Kumpulkan Tugas'}</h2>
                <p className="text-sm text-gray-500">{selectedAssignment.title}</p>
              </div>
              <button 
                onClick={() => { setShowSubmitModal(false); setSelectedFile(null); }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isUploading ? (
              <>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-700"><strong>Deadline:</strong> {selectedAssignment.due}</p>
                  {selectedAssignment.submissions && selectedAssignment.submissions.length > 0 && (
                    <p className="text-sm text-blue-600 mt-1">
                      Pengumpulan ke-{selectedAssignment.submissions.length + 1}
                    </p>
                  )}
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Klik untuk memilih file</p>
                  <p className="text-sm text-gray-500">PDF, Word, atau format lainnya</p>
                  <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
                </div>

                {selectedFile && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="w-8 h-8 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                  className={`w-full mt-4 px-4 py-3 rounded-lg font-medium ${
                    selectedFile 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {selectedAssignment.submitted ? 'Kirim Revisi' : 'Kumpulkan Tugas'}
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Mengupload... {uploadProgress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Detail Tugas</h2>
              <button onClick={() => { setShowDetailModal(false); setSelectedAssignment(null); }} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Judul</p>
                <p className="font-semibold text-gray-900">{selectedAssignment.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Mata Pelajaran</p>
                  <p className="font-semibold text-gray-900">{selectedAssignment.subject}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(selectedAssignment.status)}`}>
                    {selectedAssignment.status}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-semibold text-gray-900">{selectedAssignment.due}</p>
              </div>

              {selectedAssignment.description && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Deskripsi</p>
                  <p className="text-gray-900">{selectedAssignment.description}</p>
                </div>
              )}

              {selectedAssignment.score && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Nilai</p>
                  <p className="text-3xl font-bold text-green-700">{selectedAssignment.score}</p>
                </div>
              )}

              {selectedAssignment.submissions && selectedAssignment.submissions.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Riwayat Pengumpulan:</p>
                  <div className="space-y-2">
                    {selectedAssignment.submissions.map((sub, idx) => (
                      <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-900 text-sm">{sub.fileName}</p>
                            <p className="text-xs text-blue-600">{sub.fileSize}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-blue-700">{sub.date}</p>
                            <p className="text-xs text-blue-600">{sub.time}</p>
                          </div>
                        </div>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-blue-200 text-blue-800 text-xs rounded">
                          Pengumpulan ke-{sub.revision}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAssignment.fileName && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">File Tugas:</p>
                  <button className="flex items-center gap-2 text-blue-600 hover:underline">
                    <File className="w-4 h-4" />
                    <span className="text-sm">{selectedAssignment.fileName} ({selectedAssignment.fileSize})</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {selectedAssignment.canRevise && (
                <button 
                  onClick={() => { setShowDetailModal(false); handleRevisi(selectedAssignment); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  Revisi
                </button>
              )}
              
              <button 
                onClick={() => { setShowDetailModal(false); setSelectedAssignment(null); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Tugas & PR</h1>
        <p className="text-sm sm:text-base text-gray-600">Kerjakan dan kumpulkan tugas tepat waktu.</p>
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

      {/* Assignments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Daftar Tugas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deadline</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nilai</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{a.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{a.subject}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{a.due}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>
                      {a.status === 'Sudah Dikumpulkan' && <CheckCircle className="w-3 h-3" />}
                      {a.status === 'Terlambat' && <AlertCircle className="w-3 h-3" />}
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {a.score ? (
                      <span className="font-bold text-green-600">{a.score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenDetail(a)}
                        className="p-2 hover:bg-blue-50 rounded-lg"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      
                      {canSubmit(a) ? (
                        <button 
                          onClick={() => handleOpenSubmit(a)}
                          className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                            a.canRevise 
                              ? 'bg-orange-600 text-white hover:bg-orange-700' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <Upload className="w-3 h-3" />
                          {a.canRevise ? 'Revisi' : 'Kumpulkan'}
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {a.status === 'Sudah Dikumpulkan' ? 'Selesai' : 'Ditutup'}
                        </span>
                      )}
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
