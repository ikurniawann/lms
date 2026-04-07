'use client';

import { useState } from 'react';
import { 
  FileText, Plus, Search, Calendar, Clock, Users, CheckCircle, 
  Edit, Trash2, Eye, XCircle, X, AlertCircle, ChevronDown, ChevronUp,
  GripVertical, Copy, MoreVertical, Check, Type, List, AlignLeft,
  Circle, Square, Trash, PlusCircle
} from 'lucide-react';

type QuestionType = 'multiple_choice' | 'essay' | 'checkbox' | 'short_answer';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  answer?: string;
  points: number;
  required: boolean;
}

interface Exam {
  id: number;
  title: string;
  class: string;
  subject: string;
  date: string;
  duration: number;
  students: number;
  status: 'Scheduled' | 'Active' | 'Ended' | 'Draft';
  totalQuestions: number;
  totalPoints: number;
  questions?: Question[];
  description?: string;
  instructions?: string;
  startTime?: string;
  endTime?: string;
}

const questionTypeLabels: Record<QuestionType, { label: string; icon: React.ReactNode }> = {
  multiple_choice: { label: 'Pilihan Ganda', icon: <Circle className="w-4 h-4" /> },
  checkbox: { label: 'Pilihan Ganda (Multi)', icon: <CheckCircle className="w-4 h-4" /> },
  essay: { label: 'Essay', icon: <AlignLeft className="w-4 h-4" /> },
  short_answer: { label: 'Jawaban Pendek', icon: <Type className="w-4 h-4" /> },
};

export default function UjianPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewingExam, setViewingExam] = useState<Exam | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    { 
      id: 1, 
      title: 'UTS Matematika 7A', 
      class: '7A', 
      subject: 'Matematika',
      date: '15 Apr 2026', 
      duration: 90, 
      students: 32, 
      status: 'Scheduled',
      totalQuestions: 30,
      totalPoints: 100,
      description: 'Ujian Tengah Semester Matematika',
      instructions: 'Kerjakan dengan jujur. Tidak boleh membuka buku atau catatan.',
      startTime: '08:00',
      endTime: '09:30',
      questions: [
        { id: 1, type: 'multiple_choice', question: 'Berapa hasil dari 2 + 3 × 4?', options: ['14', '20', '12', '16'], answer: '14', points: 2, required: true },
        { id: 2, type: 'essay', question: 'Jelaskan konsep persamaan linear!', points: 10, required: true },
        { id: 3, type: 'short_answer', question: 'Tuliskan rumus luas lingkaran!', points: 3, required: true },
      ]
    },
    { 
      id: 2, 
      title: 'Quiz Aljabar 8A', 
      class: '8A', 
      subject: 'Matematika',
      date: '5 Apr 2026', 
      duration: 45, 
      students: 31, 
      status: 'Active',
      totalQuestions: 15,
      totalPoints: 50,
      description: 'Quiz singkat tentang aljabar',
      instructions: 'Waktu 45 menit. Pilih jawaban yang paling tepat.',
      startTime: '10:00',
      endTime: '10:45',
      questions: [
        { id: 1, type: 'multiple_choice', question: 'Sederhanakan: 3x + 2x - x', options: ['4x', '5x', '3x', '2x'], answer: '4x', points: 2, required: true },
        { id: 2, type: 'checkbox', question: 'Manakah yang termasuk bentuk aljabar?', options: ['2x', '3', 'x²', '5+3'], points: 4, required: true },
      ]
    },
    { 
      id: 3, 
      title: 'UAS IPA 9B', 
      class: '9B', 
      subject: 'IPA',
      date: '20 Apr 2026', 
      duration: 120, 
      students: 28, 
      status: 'Draft',
      totalQuestions: 40,
      totalPoints: 100,
      description: 'Ujian Akhir Semester IPA',
      instructions: 'Ujian tertulis',
      startTime: '08:00',
      endTime: '10:00',
      questions: []
    },
  ]);

  // Form state untuk create ujian
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    title: '',
    class: '7A',
    subject: 'Matematika',
    date: '',
    duration: 60,
    description: '',
    instructions: '',
    startTime: '08:00',
    endTime: '09:00',
    status: 'Draft',
    questions: []
  });

  // State untuk soal yang sedang dibuat
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);

  const filteredExams = exams.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'ALL' || e.class === selectedClass;
    const matchStatus = selectedStatus === 'ALL' || e.status === selectedStatus;
    return matchSearch && matchClass && matchStatus;
  });

  const statsCards = [
    { title: 'Total Ujian', value: exams.length.toString(), icon: FileText, color: 'blue' },
    { title: 'Aktif', value: exams.filter(e => e.status === 'Active').length.toString(), icon: CheckCircle, color: 'green' },
    { title: 'Terjadwal', value: exams.filter(e => e.status === 'Scheduled').length.toString(), icon: Clock, color: 'purple' },
    { title: 'Total Siswa', value: exams.reduce((acc, e) => acc + e.students, 0).toString(), icon: Users, color: 'orange' },
  ];

  const classes = ['7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
  const subjects = ['Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPS', 'PJOK', 'Agama', 'Seni'];
  const durations = [30, 45, 60, 90, 120, 150, 180];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Ended': return 'bg-gray-100 text-gray-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  // Fungsi untuk menambah soal baru
  const addQuestion = (type: QuestionType) => {
    const newQ: Question = {
      id: Date.now(),
      type,
      question: type === 'multiple_choice' ? 'Pertanyaan pilihan ganda' : 
                type === 'essay' ? 'Tulis pertanyaan essay...' : 
                type === 'checkbox' ? 'Pertanyaan multi-select' : 'Pertanyaan jawaban pendek',
      options: type === 'multiple_choice' || type === 'checkbox' ? ['Pilihan 1', 'Pilihan 2', 'Pilihan 3', 'Pilihan 4'] : undefined,
      points: type === 'essay' ? 10 : 2,
      required: true,
    };
    setNewQuestions(prev => [...prev, newQ]);
    setExpandedQuestion(newQ.id);
  };

  // Update soal
  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setNewQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  // Hapus soal
  const deleteQuestion = (id: number) => {
    setNewQuestions(prev => prev.filter(q => q.id !== id));
  };

  // Duplicate soal
  const duplicateQuestion = (q: Question) => {
    const duplicated = { ...q, id: Date.now() };
    setNewQuestions(prev => [...prev, duplicated]);
  };

  // Add option untuk multiple choice
  const addOption = (questionId: number) => {
    setNewQuestions(prev => prev.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: [...q.options, `Pilihan ${q.options.length + 1}`] };
      }
      return q;
    }));
  };

  // Update option
  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setNewQuestions(prev => prev.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  // Delete option
  const deleteOption = (questionId: number, optionIndex: number) => {
    setNewQuestions(prev => prev.map(q => {
      if (q.id === questionId && q.options && q.options.length > 2) {
        return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
      }
      return q;
    }));
  };

  const handleCreate = () => {
    if (!newExam.title || !newExam.date) {
      setNotification({ message: 'Judul dan tanggal wajib diisi!', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const totalPoints = newQuestions.reduce((acc, q) => acc + q.points, 0);

    const exam: Exam = {
      id: Date.now(),
      title: newExam.title || '',
      class: newExam.class || '7A',
      subject: newExam.subject || 'Matematika',
      date: newExam.date || '',
      duration: newExam.duration || 60,
      students: 30,
      status: newExam.status as 'Draft' | 'Scheduled' | 'Active' | 'Ended' || 'Draft',
      totalQuestions: newQuestions.length,
      totalPoints,
      description: newExam.description || '',
      instructions: newExam.instructions || '',
      startTime: newExam.startTime || '08:00',
      endTime: newExam.endTime || '09:00',
      questions: [...newQuestions]
    };

    setExams(prev => [exam, ...prev]);
    setShowCreateModal(false);
    setNewQuestions([]);
    setNewExam({
      title: '',
      class: '7A',
      subject: 'Matematika',
      date: '',
      duration: 60,
      description: '',
      instructions: '',
      startTime: '08:00',
      endTime: '09:00',
      status: 'Draft',
      questions: []
    });
    setNotification({ message: 'Ujian berhasil dibuat!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleView = (e: Exam) => {
    setViewingExam(e);
    setShowViewModal(true);
  };

  const handleEdit = (e: Exam) => {
    setEditingExam({ ...e });
    setNewQuestions(e.questions || []);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingExam) {
      const totalPoints = newQuestions.reduce((acc, q) => acc + q.points, 0);
      const updated = {
        ...editingExam,
        totalQuestions: newQuestions.length,
        totalPoints,
        questions: [...newQuestions]
      };
      
      setExams(prev => prev.map(e => e.id === updated.id ? updated : e));
      setShowEditModal(false);
      setEditingExam(null);
      setNewQuestions([]);
      setNotification({ message: 'Ujian berhasil diupdate!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = (e: Exam) => {
    if (confirm(`Hapus ujian "${e.title}"?`)) {
      setExams(prev => prev.filter(item => item.id !== e.id));
      setNotification({ message: 'Ujian berhasil dihapus!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Komponen render soal
  const QuestionEditor = ({ question, isPreview = false }: { question: Question; isPreview?: boolean }) => {
    const isExpanded = expandedQuestion === question.id || isPreview;
    const typeInfo = questionTypeLabels[question.type];

    return (
      <div className={`border rounded-xl mb-4 ${isExpanded ? 'border-green-300 bg-white' : 'border-gray-200 bg-gray-50'} ${isPreview ? 'pointer-events-none opacity-75' : ''}`}>
        <div 
          className="flex items-start gap-3 p-4 cursor-pointer"
          onClick={() => !isPreview && setExpandedQuestion(isExpanded ? null : question.id)}
        >
          {!isPreview && (<div className="mt-1 text-gray-400"><GripVertical className="w-5 h-5" /></div>)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {typeInfo.icon}
                {typeInfo.label}
              </span>
              <span className="text-sm text-gray-500">{question.points} poin</span>
              {question.required && <span className="text-red-500 text-sm">*</span>}
            </div>
            
            {!isPreview && isExpanded ? (
              <input
                type="text"
                value={question.question}
                onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-base font-medium text-gray-900 border-b border-gray-300 focus:border-green-500 outline-none pb-1 bg-transparent"
                placeholder="Tulis pertanyaan..."
              />
            ) : (
              <p className="text-gray-900 font-medium">{question.question}</p>
            )}
          </div>
          
          {!isPreview && (
            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); duplicateQuestion(question); }}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Duplikat"
              >
                <Copy className="w-4 h-4 text-gray-500" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteQuestion(question.id); }}
                className="p-2 hover:bg-red-50 rounded-lg"
                title="Hapus"
              >
                <Trash className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="px-4 pb-4">
            <!-- Options untuk Multiple Choice / Checkbox -->
            {(question.type === 'multiple_choice' || question.type === 'checkbox') && question.options && (
              <div className="space-y-2 mb-4">
                {question.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {question.type === 'multiple_choice' ? (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    ) : (
                      <div className="w-4 h-4 rounded border-2 border-gray-300" />
                    )}
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(question.id, idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                      placeholder={`Pilihan ${idx + 1}`}
                    />
                    {!isPreview && question.options.length > 2 && (
                      <button 
                        onClick={() => deleteOption(question.id, idx)}
                        className="p-1 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
                {!isPreview && (
                  <button
                    onClick={() => addOption(question.id)}
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 mt-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Tambah Pilihan
                  </button>
                )}
              </div>
            )}

            <!-- Jawaban untuk Short Answer / Essay -->
            {(question.type === 'short_answer' || question.type === 'essay') && (
              <div className="mb-4">
                {question.type === 'short_answer' ? (
                  <input
                    type="text"
                    disabled
                    placeholder="Jawaban pendek..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                  />
                ) : (
                  <textarea
                    disabled
                    rows={3}
                    placeholder="Jawaban essay..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm resize-none"
                  />
                )}
              </div>
            )}

            {!isPreview && (
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Bobot:</span>
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 0 })}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                    min={1}
                  />
                  <span className="text-sm text-gray-600">poin</span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={question.required}
                    onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded"
                  />
                  <span className="text-sm text-gray-600">Wajib diisi</span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    );
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

      {/* Create/Edit Modal */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <!-- Header -->
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{showEditModal ? 'Edit Ujian' : 'Buat Ujian Baru'}</h2>
                <p className="text-sm text-gray-500">{showEditModal ? 'Edit detail dan soal ujian' : 'Buat ujian dengan berbagai tipe soal'}</p>
              </div>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  setNewQuestions([]);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div className="flex-1 overflow-hidden flex">
              <!-- Left Panel: Settings -->
              <div className="w-1/3 border-r border-gray-200 overflow-y-auto p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Ujian *</label>
                    <input
                      type="text"
                      value={showEditModal ? editingExam?.title : newExam.title}
                      onChange={(e) => showEditModal 
                        ? setEditingExam({...editingExam!, title: e.target.value})
                        : setNewExam({...newExam, title: e.target.value})
                      }
                      placeholder="Contoh: UTS Matematika Semester 1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                      <select
                        value={showEditModal ? editingExam?.class : newExam.class}
                        onChange={(e) => showEditModal
                          ? setEditingExam({...editingExam!, class: e.target.value})
                          : setNewExam({...newExam, class: e.target.value})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mapel</label>
                      <select
                        value={showEditModal ? editingExam?.subject : newExam.subject}
                        onChange={(e) => showEditModal
                          ? setEditingExam({...editingExam!, subject: e.target.value})
                          : setNewExam({...newExam, subject: e.target.value})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Ujian *</label>
                    <input
                      type="date"
                      value={showEditModal ? editingExam?.date : newExam.date}
                      onChange={(e) => showEditModal
                        ? setEditingExam({...editingExam!, date: e.target.value})
                        : setNewExam({...newExam, date: e.target.value})
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai</label>
                      <input
                        type="time"
                        value={showEditModal ? editingExam?.startTime : newExam.startTime}
                        onChange={(e) => showEditModal
                          ? setEditingExam({...editingExam!, startTime: e.target.value})
                          : setNewExam({...newExam, startTime: e.target.value})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Durasi (menit)</label>
                      <select
                        value={showEditModal ? editingExam?.duration : newExam.duration}
                        onChange={(e) => showEditModal
                          ? setEditingExam({...editingExam!, duration: parseInt(e.target.value)})
                          : setNewExam({...newExam, duration: parseInt(e.target.value)})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {durations.map(d => <option key={d} value={d}>{d} menit</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={showEditModal ? editingExam?.status : newExam.status}
                      onChange={(e) => showEditModal
                        ? setEditingExam({...editingExam!, status: e.target.value as any})
                        : setNewExam({...newExam, status: e.target.value as any})
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Terjadwal</option>
                      <option value="Active">Aktif</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                      rows={2}
                      value={showEditModal ? editingExam?.description : newExam.description}
                      onChange={(e) => showEditModal
                        ? setEditingExam({...editingExam!, description: e.target.value})
                        : setNewExam({...newExam, description: e.target.value})
                      }
                      placeholder="Deskripsi singkat ujian..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instruksi</label>
                    <textarea
                      rows={3}
                      value={showEditModal ? editingExam?.instructions : newExam.instructions}
                      onChange={(e) => showEditModal
                        ? setEditingExam({...editingExam!, instructions: e.target.value})
                        : setNewExam({...newExam, instructions: e.target.value})
                      }
                      placeholder="Instruksi untuk peserta ujian..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>

                  <!-- Summary -->
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Ringkasan</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <p>Jumlah Soal: <span className="font-semibold">{newQuestions.length}</span></p>
                      <p>Total Bobot: <span className="font-semibold">{newQuestions.reduce((acc, q) => acc + q.points, 0)} poin</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Panel: Questions -->
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Soal Ujian</h3>
                  
                  {newQuestions.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">Belum ada soal. Tambahkan soal di bawah.</p>
                    </div>
                  ) : (
                    <div>
                      {newQuestions.map((q) => (
                        <QuestionEditor key={q.id} question={q} />
                      ))}
                    </div>
                  )}
                </div>

                <!-- Add Question Buttons -->
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm font-medium text-gray-700 mb-3">Tambah Soal:</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(questionTypeLabels) as QuestionType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => addQuestion(type)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-sm"
                      >
                        {questionTypeLabels[type].icon}
                        {questionTypeLabels[type].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {newQuestions.length} soal • {newQuestions.reduce((acc, q) => acc + q.points, 0)} poin
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    setNewQuestions([]);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={showEditModal ? handleSaveEdit : handleCreate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {showEditModal ? 'Simpan Perubahan' : 'Buat Ujian'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingExam && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Detail Ujian</h2>
                <p className="text-sm text-gray-500">{viewingExam.subject} • {viewingExam.class}</p>
              </div>
              <button 
                onClick={() => { setShowViewModal(false); setViewingExam(null); }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <!-- Header Info -->
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{viewingExam.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewingExam.status)}`}>
                    {viewingExam.status}
                  </span>
                </div>
              </div>

              <!-- Info Grid -->
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Tanggal</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingExam.date}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Durasi</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingExam.duration} menit</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Jumlah Soal</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingExam.totalQuestions} soal</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Total Bobot</span>
                  </div>
                  <p className="font-semibold text-gray-900">{viewingExam.totalPoints} poin</p>
                </div>
              </div>

              {viewingExam.description && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Deskripsi</p>
                  <p className="text-gray-900">{viewingExam.description}</p>
                </div>
              )}

              {viewingExam.instructions && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-1">Instruksi</p>
                  <p className="text-gray-900 whitespace-pre-line">{viewingExam.instructions}</p>
                </div>
              )}

              <!-- Questions Preview -->
              {viewingExam.questions && viewingExam.questions.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Daftar Soal</h4>
                  <div className="space-y-4">
                    {viewingExam.questions.map((q, idx) => (
                      <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-sm font-medium text-gray-500">{idx + 1}.</span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {questionTypeLabels[q.type].label}
                              </span>
                              <span className="text-xs text-gray-500">{q.points} poin</span>
                            </div>
                            
                            {q.options && (
                              <div className="space-y-1 ml-4">
                                {q.options.map((opt, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                    {q.type === 'multiple_choice' ? (
                                      <div className="w-3 h-3 rounded-full border border-gray-400" />
                                    ) : (
                                      <div className="w-3 h-3 rounded border border-gray-400" />
                                    )}
                                    {opt}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => { setShowViewModal(false); handleEdit(viewingExam); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Ujian</span>
              </button>
              <button
                onClick={() => { setShowViewModal(false); setViewingExam(null); }}
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
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ujian & Quiz</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola ujian dan quiz untuk siswa.</p>
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
                placeholder="Cari ujian..."
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
              <option value="Draft">Draft</option>
              <option value="Scheduled">Terjadwal</option>
              <option value="Active">Aktif</option>
              <option value="Ended">Selesai</option>
            </select>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Buat Ujian</span>
          </button>
        </div>
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Judul</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Soal/Bobot</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((e) => (
                <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{e.title}</div>
                    <div className="text-xs text-gray-500">{e.subject} • {e.duration} menit</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">{e.class}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{e.date}</td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-900">{e.totalQuestions} soal</span>
                    <div className="text-xs text-gray-500">{e.totalPoints} poin</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(e.status)}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleView(e)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleEdit(e)}
                        className="p-2 hover:bg-yellow-50 rounded-lg transition-all" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-yellow-600" />
                      </button>
                      <button 
                        onClick={() => handleDelete(e)}
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
      {filteredExams.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada ujian</h3>
          <p className="text-gray-500 mb-4">Belum ada ujian yang dibuat.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Buat Ujian Pertama
          </button>
        </div>
      )}
    </div>
  );
}
