'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  FileText, Clock, Calendar, TrendingUp, Play, X, CheckCircle, AlertCircle, 
  ChevronLeft, ChevronRight, Upload, File, Timer, Eye, RotateCcw
} from 'lucide-react';

interface Question {
  id: number;
  type: 'multiple_choice' | 'essay';
  question: string;
  options?: string[];
  answer?: string;
  userAnswer?: string;
}

interface Exam {
  id: number;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  durationMinutes: number;
  room: string;
  status: 'Akan Datang' | 'Berlangsung' | 'Selesai';
  score?: number;
  startTime?: string;
  endTime?: string;
  questions?: Question[];
  instructions?: string;
}

export default function UjianPage() {
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [examMode, setExamMode] = useState<'online' | 'upload' | null>(null);
  const [examResult, setExamResult] = useState<{score: number, correct: number, total: number} | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    { 
      id: 1, 
      title: 'UTS Matematika', 
      subject: 'Matematika', 
      date: '15 Apr 2026', 
      time: '08:00 - 10:00', 
      duration: '120 menit', 
      durationMinutes: 120,
      room: 'R.101', 
      status: 'Akan Datang',
      instructions: 'Kerjakan dengan jujur. Tidak boleh menggunakan kalkulator.',
      questions: [
        { id: 1, type: 'multiple_choice', question: 'Berapakah hasil dari 2 + 2 × 3?', options: ['8', '12', '6', '10'], answer: '8' },
        { id: 2, type: 'multiple_choice', question: 'Manakah yang merupakan bilangan prima?', options: ['4', '6', '7', '9'], answer: '7' },
        { id: 3, type: 'essay', question: 'Jelaskan konsep aljabar linear dan berikan contoh penerapannya dalam kehidupan sehari-hari!' },
        { id: 4, type: 'multiple_choice', question: 'Luas persegi dengan sisi 5 cm adalah?', options: ['20 cm²', '25 cm²', '15 cm²', '10 cm²'], answer: '25 cm²' },
        { id: 5, type: 'essay', question: 'Selesaikan persamaan berikut: 3x + 7 = 22. Tunjukkan langkah-langkahnya!' },
      ]
    },
    { 
      id: 2, 
      title: 'Quiz Fisika', 
      subject: 'Fisika', 
      date: '07 Apr 2026', 
      time: '13:00 - 13:45', 
      duration: '45 menit', 
      durationMinutes: 45,
      room: 'R.102', 
      status: 'Berlangsung',
      instructions: 'Ujian sedang berlangsung. Sisa waktu tertera diatas.',
      questions: [
        { id: 1, type: 'multiple_choice', question: 'Satuan gaya dalam SI adalah?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], answer: 'Newton' },
        { id: 2, type: 'multiple_choice', question: 'Rumus kecepatan adalah?', options: ['v = s/t', 'v = s×t', 'v = t/s', 'v = s+t'], answer: 'v = s/t' },
        { id: 3, type: 'essay', question: 'Jelaskan hukum Newton pertama dan berikan contohnya!' },
        { id: 4, type: 'multiple_choice', question: 'Bunyi merambat paling cepat melalui?', options: ['Udara', 'Air', 'Besi', 'Karet'], answer: 'Besi' },
      ]
    },
    { 
      id: 3, 
      title: 'Quiz Aljabar', 
      subject: 'Matematika', 
      date: '25 Mar 2026', 
      time: '07:00 - 07:45', 
      duration: '45 menit', 
      durationMinutes: 45,
      room: 'R.101', 
      status: 'Selesai', 
      score: 85 
    },
    { 
      id: 4, 
      title: 'Ujian Praktikum IPA', 
      subject: 'IPA', 
      date: '10 Apr 2026', 
      time: '09:00 - 11:00', 
      duration: '120 menit', 
      durationMinutes: 120,
      room: 'Lab', 
      status: 'Berlangsung',
      instructions: 'Unggah laporan praktikum dalam format PDF.',
    },
    { 
      id: 5, 
      title: 'Quiz Teks Eksposisi', 
      subject: 'Bahasa Indonesia', 
      date: '20 Mar 2026', 
      time: '10:30 - 11:15', 
      duration: '45 menit', 
      durationMinutes: 45,
      room: 'R.101', 
      status: 'Selesai', 
      score: 90 
    },
  ]);

  const statsCards = [
    { title: 'Total Ujian', value: exams.length.toString() },
    { title: 'Sedang Berjalan', value: exams.filter(e => e.status === 'Berlangsung').length.toString() },
    { title: 'Rata-rata Nilai', value: '87.5' },
    { title: 'Selesai', value: exams.filter(e => e.status === 'Selesai').length.toString() },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-700';
      case 'Akan Datang': return 'bg-blue-100 text-blue-700';
      case 'Berlangsung': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUp = () => {
    setExamStarted(false);
    setShowExamModal(false);
    setNotification({ message: 'Waktu ujian habis! Jawaban otomatis dikirim.', type: 'error' });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowStartModal(true);
    setExamMode(null);
    setSelectedFile(null);
  };

  const handleBeginOnlineExam = () => {
    if (!selectedExam) return;
    
    setShowStartModal(false);
    setShowExamModal(true);
    setExamStarted(true);
    setTimeLeft(selectedExam.durationMinutes * 60);
    setCurrentQuestion(0);
    setExamMode('online');
    
    if (selectedExam.questions) {
      setQuestions(selectedExam.questions.map(q => ({ ...q, userAnswer: '' })));
    } else {
      setQuestions([]);
    }
  };

  const handleBeginUploadExam = () => {
    if (!selectedExam) return;
    
    setShowStartModal(false);
    setShowExamModal(true);
    setExamStarted(true);
    setTimeLeft(selectedExam.durationMinutes * 60);
    setExamMode('upload');
    setSelectedFile(null);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, userAnswer: answer } : q
    ));
  };

  const handleSubmitExam = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    setShowExamModal(false);
    setExamStarted(false);

    // Calculate score for online exam
    if (examMode === 'online' && questions.length > 0) {
      let correct = 0;
      let totalMC = 0;
      
      questions.forEach(q => {
        if (q.type === 'multiple_choice') {
          totalMC++;
          if (q.userAnswer === q.answer) {
            correct++;
          }
        }
      });

      const mcScore = totalMC > 0 ? Math.round((correct / totalMC) * 70) : 0;
      const essayScore = questions.filter(q => q.type === 'essay').length > 0 ? 25 : 0;
      const finalScore = Math.min(100, mcScore + essayScore);

      setExamResult({ score: finalScore, correct, total: totalMC });
      setShowResultModal(true);

      // Update exam status
      setExams(prev => prev.map(e => 
        e.id === selectedExam?.id 
          ? { ...e, status: 'Selesai', score: finalScore }
          : e
      ));
    } else if (examMode === 'upload') {
      setNotification({ message: 'File berhasil diupload! Menunggu penilaian.', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
      
      setExams(prev => prev.map(e => 
        e.id === selectedExam?.id 
          ? { ...e, status: 'Selesai' }
          : e
      ));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleCloseResult = () => {
    setShowResultModal(false);
    setExamResult(null);
    setSelectedExam(null);
  };

  const answeredCount = questions.filter(q => q.userAnswer && q.userAnswer.trim() !== '').length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[70] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Start Exam Modal */}
      {showStartModal && selectedExam && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Mulai Ujian</h2>
              <button onClick={() => setShowStartModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Judul</p>
                <p className="font-semibold text-gray-900">{selectedExam.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Mata Pelajaran</p>
                  <p className="font-semibold text-gray-900">{selectedExam.subject}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Durasi</p>
                  <p className="font-semibold text-gray-900">{selectedExam.duration}</p>
                </div>
              </div>
              
              {selectedExam.instructions && (
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800"><strong>Petunjuk:</strong> {selectedExam.instructions}</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Pilih mode ujian:</p>
              
              {selectedExam.questions && selectedExam.questions.length > 0 ? (
                <button
                  onClick={handleBeginOnlineExam}
                  className="w-full flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Exam Online</p>
                    <p className="text-sm text-gray-500">Jawab soal langsung di aplikasi</p>
                  </div>
                </button>
              ) : null}

              <button
                onClick={handleBeginUploadExam}
                className="w-full flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Upload File</p>
                  <p className="text-sm text-gray-500">Unggah jawaban dalam format PDF/DOC</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Modal */}
      {showExamModal && selectedExam && examStarted && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowExamModal(false)} className="p-2 hover:bg-gray-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold">{selectedExam.title}</h3>
                <p className="text-xs text-gray-400">{selectedExam.subject}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-lg">
                <Timer className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium text-sm"
              >
                Selesai
              </button>
            </div>
          </div>

          {/* Online Exam Mode */}
          {examMode === 'online' && questions.length > 0 && (
            <>
              {/* Progress Bar */}
              <div className="bg-gray-700 px-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">Soal {currentQuestion + 1} dari {questions.length}</span>
                  <span className="text-sm text-gray-300">{answeredCount} dijawab</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Question Navigation */}
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(idx)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium flex-shrink-0 ${
                        idx === currentQuestion 
                          ? 'bg-blue-600 text-white' 
                          : q.userAnswer 
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-xl p-6">
                  <div className="mb-6">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${
                      questions[currentQuestion].type === 'multiple_choice' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {questions[currentQuestion].type === 'multiple_choice' ? 'Pilihan Ganda' : 'Essay'}
                    </span>
                    
                    <p className="text-lg font-medium text-gray-900 mb-4">
                      {currentQuestion + 1}. {questions[currentQuestion].question}
                    </p>

                    {questions[currentQuestion].type === 'multiple_choice' && questions[currentQuestion].options ? (
                      <div className="space-y-2">
                        {questions[currentQuestion].options.map((option, idx) => (
                          <label
                            key={idx}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              questions[currentQuestion].userAnswer === option
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${questions[currentQuestion].id}`}
                              value={option}
                              checked={questions[currentQuestion].userAnswer === option}
                              onChange={() => handleAnswerChange(questions[currentQuestion].id, option)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        value={questions[currentQuestion].userAnswer || ''}
                        onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                        placeholder="Tulis jawaban Anda di sini..."
                        rows={8}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" /> Sebelumnya
                    </button>
                    
                    <button
                      onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                      disabled={currentQuestion === questions.length - 1}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      Selanjutnya <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Upload Mode */}
          {examMode === 'upload' && (
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-2xl mx-auto bg-white rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Jawaban</h3>
                  <p className="text-gray-600">Unggah file jawaban ujian Anda (PDF, DOC, DOCX)</p>
                </div>

                <div 
                  onClick={() => document.getElementById('exam-file')?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Klik untuk memilih file</p>
                  <p className="text-sm text-gray-500">Maksimal 10MB</p>
                  <input 
                    id="exam-file"
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden" 
                  />
                </div>

                {selectedFile && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="w-8 h-8 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kirim Jawaban?</h3>
              <p className="text-gray-600">
                {examMode === 'online' 
                  ? `Anda telah menjawab ${answeredCount} dari ${questions.length} soal.` 
                  : selectedFile 
                    ? 'File akan dikirim untuk dinilai.' 
                    : 'Anda belum mengupload file.'}
              </p>
              
              {examMode === 'online' && answeredCount < questions.length && (
                <p className="text-sm text-orange-600 mt-2"><strong>Peringatan:</strong> Masih ada {questions.length - answeredCount} soal yang belum dijawab!</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={confirmSubmit}
                disabled={examMode === 'upload' && !selectedFile}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  examMode === 'upload' && !selectedFile
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Ya, Kirim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResultModal && examResult && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ujian Selesai!</h3>
              <p className="text-gray-600">Terima kasih telah mengikuti ujian.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-500 mb-1">Nilai Anda</p>
                <p className="text-5xl font-bold text-green-600">{examResult.score}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{examResult.correct}/{examResult.total}</p>
                  <p className="text-sm text-gray-500">Benar (PG)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{questions.filter(q => q.type === 'essay').length}</p>
                  <p className="text-sm text-gray-500">Essay</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCloseResult}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ujian & Quiz</h1>
        <p className="text-sm sm:text-base text-gray-600">Lihat jadwal ujian dan hasil ujianmu.</p>
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

      {/* Exams Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nama Ujian</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mapel</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tanggal</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Durasi</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nilai</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(e => (
                <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-sm">{e.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{e.subject}</span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="text-gray-600">{e.date}</div>
                    <div className="text-gray-500 text-xs">{e.time}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{e.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(e.status)}`}>{e.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    {e.score ? (
                      <span className="font-bold text-green-600">{e.score}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {e.status === 'Berlangsung' && (
                        <button
                          onClick={() => handleStartExam(e)}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center gap-2"
                        >
                          <Play className="w-3 h-3" /> Ikuti
                        </button>
                      )}
                      
                      {e.status === 'Selesai' && e.score && (
                        <button className="p-2 hover:bg-blue-50 rounded-lg" title="Lihat Hasil">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                      )}

                      {e.status === 'Akan Datang' && (
                        <span className="text-sm text-gray-400">Belum mulai</span>
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
