'use client';
import { useState, useRef } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Upload, X, RotateCcw, FileIcon } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  due: string;
  deadlineTime: string;
  status: 'Belum Dikerjakan' | 'Sudah Dikumpulkan' | 'Terlambat' | 'Revisi';
  submitted: boolean;
  submittedAt?: string;
  score?: number;
  fileUrl?: string;
  fileName?: string;
  canRevise: boolean;
}

export default function TugasPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Latihan Soal Bab 1', subject: 'Matematika', due: '2 Apr 2026', deadlineTime: '23:59', status: 'Belum Dikerjakan', submitted: false, canRevise: true },
    { id: 2, title: 'PR Geometri', subject: 'Matematika', due: '3 Apr 2026', deadlineTime: '23:59', status: 'Belum Dikerjakan', submitted: false, canRevise: true },
    { id: 3, title: 'Quiz Aljabar', subject: 'Matematika', due: '25 Mar 2026', deadlineTime: '23:59', status: 'Sudah Dikumpulkan', submitted: true, submittedAt: '25 Mar 2026, 14:30', score: 85, fileName: 'jawaban-quiz.pdf', canRevise: false },
    { id: 4, title: 'Teks Eksposisi', subject: 'Bahasa Indonesia', due: '28 Mar 2026', deadlineTime: '23:59', status: 'Terlambat', submitted: false, canRevise: false },
    { id: 5, title: 'Sistem Pencernaan', subject: 'IPA', due: '20 Mar 2026', deadlineTime: '23:59', status: 'Sudah Dikumpulkan', submitted: true, submittedAt: '20 Mar 2026, 09:15', score: 92, fileName: 'tugas-ipa.pdf', canRevise: false },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const statsCards = [
    { title: 'Total Tugas', value: assignments.length.toString(), color: 'blue' },
    { title: 'Sudah Dikumpul', value: assignments.filter(a => a.submitted).length.toString(), color: 'green' },
    { title: 'Belum Dikerjakan', value: assignments.filter(a => a.status === 'Belum Dikerjakan').length.toString(), color: 'yellow' },
    { title: 'Terlambat', value: assignments.filter(a => a.status === 'Terlambat').length.toString(), color: 'red' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sudah Dikumpulkan': return 'bg-green-100 text-green-700';
      case 'Belum Dikerjakan': return 'bg-yellow-100 text-yellow-700';
      case 'Terlambat': return 'bg-red-100 text-red-700';
      case 'Revisi': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAssignment || !uploadedFile) return;

    setIsSubmitting(true);
    
    // Simulasi upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const now = new Date();
    const submittedTime = now.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setAssignments(prev => prev.map(a => 
      a.id === selectedAssignment.id 
        ? { 
            ...a, 
            status: 'Sudah Dikumpulkan', 
            submitted: true, 
            submittedAt: submittedTime,
            fileName: uploadedFile.name,
            canRevise: true
          }
        : a
    ));

    setIsSubmitting(false);
    setIsSubmitModalOpen(false);
    setUploadedFile(null);
    setSelectedAssignment(null);
  };

  const handleRevise = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };

  const openSubmitModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
    setUploadedFile(null);
    setSelectedAssignment(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
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
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Terkumpul</th>
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
                  <td className="py-3 px-4 text-sm">
                    <div className="text-gray-900">{a.due}</div>
                    <div className="text-gray-500 text-xs">{a.deadlineTime}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusColor(a.status)}`}>
                      {a.status === 'Sudah Dikumpulkan' && <CheckCircle className="w-3 h-3" />}
                      {a.status === 'Terlambat' && <AlertCircle className="w-3 h-3" />}
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {a.submittedAt ? (
                      <div>
                        <div className="text-green-600 font-medium">✓ Sudah</div>
                        <div className="text-gray-500 text-xs">{a.submittedAt}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {a.score ? (
                      <span className="font-bold text-green-600">{a.score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {a.submitted ? (
                      <div className="flex items-center gap-2">
                        {a.canRevise && (
                          <button 
                            onClick={() => handleRevise(a)}
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm flex items-center gap-2 hover:bg-orange-200 transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" /> Revisi
                          </button>
                        )}
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Terkumpul
                        </span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => openSubmitModal(a)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
                      >
                        <Upload className="w-3 h-3" /> Kumpulkan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedAssignment.submitted ? 'Revisi Tugas' : 'Kumpulkan Tugas'}
              </h3>
              <button onClick={closeSubmitModal} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Judul Tugas</p>
              <p className="font-semibold text-gray-900">{selectedAssignment.title}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Deadline</p>
              <p className="font-semibold text-gray-900">{selectedAssignment.due}, {selectedAssignment.deadlineTime}</p>
            </div>

            {selectedAssignment.submitted && selectedAssignment.submittedAt && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Sudah dikumpulkan: {selectedAssignment.submittedAt}
                </p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Upload File Tugas</p>
              
              {!uploadedFile ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Klik untuk upload file</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUploadedFile(null)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={closeSubmitModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!uploadedFile || isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    {selectedAssignment.submitted ? 'Upload Revisi' : 'Kumpulkan'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
