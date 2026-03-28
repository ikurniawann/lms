'use client';

import { useState } from 'react';
import { FileText, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BuatUjianPage() {
  const [examTitle, setExamTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'multiple_choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10
  });

  const sampleQuestions = [
    {
      id: 1,
      type: 'multiple_choice',
      question: 'Hasil dari 2x + 5 = 15 adalah...',
      options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'],
      correctAnswer: 'x = 5',
      points: 10
    },
    {
      id: 2,
      type: 'multiple_choice',
      question: 'Rumus luas segitiga adalah...',
      options: ['p × l', '½ × a × t', 'π × r²', 's × s'],
      correctAnswer: '½ × a × t',
      points: 10
    },
    {
      id: 3,
      type: 'multiple_choice',
      question: 'Nilai dari ³√27 adalah...',
      options: ['3', '6', '9', '27'],
      correctAnswer: '3',
      points: 10
    },
    {
      id: 4,
      type: 'essay',
      question: 'Jelaskan langkah-langkah menyelesaikan persamaan kuadrat dengan rumus abc!',
      points: 15
    },
    {
      id: 5,
      type: 'essay',
      question: 'Sebuah segitiga memiliki alas 12 cm dan tinggi 8 cm. Hitunglah luas segitiga tersebut dan jelaskan caramu!',
      points: 15
    }
  ];

  const addQuestion = () => {
    setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10
    });
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const loadSampleQuestions = () => {
    setQuestions(sampleQuestions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const saveExam = () => {
    alert('Ujian berhasil disimpan! (Demo - belum connect ke database)');
    console.log({
      title: examTitle,
      subject,
      class: selectedClass,
      duration,
      questions
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed w-64 bg-white border-r">
        <div className="h-16 px-6 flex items-center">
          <FileText className="w-6 h-6 text-green-600"/>
          <span className="ml-2 font-bold">LMS Guru</span>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/dashboard-guru" className="block px-4 py-3 hover:bg-gray-50">Dashboard</Link>
          <Link href="/dashboard-guru/ujian" className="block px-4 py-3 bg-green-50 text-green-700">Ujian</Link>
        </nav>
      </aside>

      <div className="ml-64">
        <header className="h-16 bg-white border-b px-6 flex items-center">
          <Link href="/dashboard-guru/ujian" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2"/>
            <h1 className="text-xl font-bold">Buat Ujian Baru</h1>
          </Link>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Buat Soal Ujian</h1>
            <p className="text-gray-600">Buat soal ujian untuk siswa Anda.</p>
          </div>

          {/* Exam Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="font-bold mb-4">Informasi Ujian</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Ujian</label>
                <input
                  type="text"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="Contoh: UTS Matematika Bab 1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mata Pelajaran</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Pilih Mapel</option>
                  <option value="Matematika">Matematika</option>
                  <option value="IPA">IPA</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Pilih Kelas</option>
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durasi (menit)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="90"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Add Question */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Tambah Soal</h3>
              <button
                onClick={loadSampleQuestions}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Load Sample 5 Soal
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Soal</label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="multiple_choice">Pilihan Ganda</option>
                  <option value="essay">Essay</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pertanyaan</label>
                <textarea
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  rows={3}
                  placeholder="Tulis pertanyaan di sini..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {currentQuestion.type === 'multiple_choice' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt: string, i: number) => (
                      <div key={i}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Opsi {String.fromCharCode(65 + i)}</label>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(i, e.target.value)}
                          placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jawaban Benar</label>
                    <select
                      value={currentQuestion.correctAnswer}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Pilih Jawaban</option>
                      {currentQuestion.options.map((opt: string, i: number) => (
                        <option key={i} value={opt}>{String.fromCharCode(65 + i)}. {opt}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poin</label>
                <input
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={addQuestion}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5"/>
                <span>Tambah Soal</span>
              </button>
            </div>
          </div>

          {/* Questions List */}
          {questions.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="font-bold mb-4">Daftar Soal ({questions.length})</h3>
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <div key={q.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-bold text-gray-900">Soal {i + 1}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            q.type === 'multiple_choice' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {q.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Essay'}
                          </span>
                          <span className="text-sm text-gray-600">{q.points} poin</span>
                        </div>
                        <p className="text-gray-700">{q.question}</p>
                        {q.type === 'multiple_choice' && (
                          <div className="mt-2 space-y-1">
                            {q.options.map((opt: string, idx: number) => (
                              <div key={idx} className={`text-sm ${
                                opt === q.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-600'
                              }`}>
                                {String.fromCharCode(65 + idx)}. {opt} {opt === q.correctAnswer && '✓'}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeQuestion(q.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-600"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard-guru/ujian"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              Batal
            </Link>
            <button
              onClick={saveExam}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center space-x-2"
            >
              <Save className="w-5 h-5"/>
              <span>Simpan Ujian</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
