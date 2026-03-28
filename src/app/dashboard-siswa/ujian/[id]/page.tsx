'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function UjianPage({ params }: { params: { id: string } }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  type Question = {
    id: number;
    type: 'multiple_choice' | 'essay';
    question: string;
    options?: string[];
    points: number;
  };

  type Exam = {
    id: number;
    title: string;
    subject: string;
    class: string;
    duration: number;
    totalPoints: number;
    questions: Question[];
  };

  // Sample exam data
  const exam: Exam = {
    id: 1,
    title: 'UTS Matematika Bab 1 - Aljabar',
    subject: 'Matematika',
    class: '8A',
    duration: 90, // minutes
    totalPoints: 60,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Hasil dari 2x + 5 = 15 adalah...',
        options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'],
        points: 10
      },
      {
        id: 2,
        type: 'multiple_choice',
        question: 'Rumus luas segitiga adalah...',
        options: ['p × l', '½ × a × t', 'π × r²', 's × s'],
        points: 10
      },
      {
        id: 3,
        type: 'multiple_choice',
        question: 'Nilai dari ³√27 adalah...',
        options: ['3', '6', '9', '27'],
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
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = () => {
    const totalSeconds = exam.duration * 60;
    const remaining = totalSeconds - currentTime;
    if (remaining <= 0) return '00:00';
    return formatTime(remaining);
  };

  const handleMultipleChoice = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleEssay = (questionId: number, answer: string) => {
    setEssayAnswers({ ...essayAnswers, [questionId]: answer });
  };

  const handleSubmit = () => {
    if (confirm('Yakin ingin mengumpulkan ujian?')) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        alert('Ujian berhasil dikumpulkan!');
      }, 2000);
    }
  };

  const getProgress = () => {
    const answered = Object.keys(answers).length + Object.keys(essayAnswers).length;
    return (answered / exam.questions.length) * 100;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600"/>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ujian Tersubmit!</h1>
          <p className="text-gray-600 mb-6">Jawaban Anda telah berhasil dikumpulkan.</p>
          <Link
            href="/dashboard-siswa/ujian"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard-siswa/ujian" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5"/>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{exam.title}</h1>
              <p className="text-sm text-gray-600">{exam.subject} • Kelas {exam.class}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentTime > exam.duration * 50 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-5 h-5"/>
              <span className="font-bold">{getRemainingTime()}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <Save className="w-4 h-4"/>
              <span>Kumpulkan</span>
            </button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{Math.round(getProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </header>

      {/* Questions */}
      <main className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {exam.questions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      q.type === 'multiple_choice' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {q.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Essay'}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">{q.points} poin</span>
                  </div>
                </div>
                {q.type === 'multiple_choice' && answers[q.id] && (
                  <CheckCircle className="w-5 h-5 text-green-600"/>
                )}
              </div>

              <p className="text-lg font-medium text-gray-900 mb-4">{q.question}</p>

              {q.type === 'multiple_choice' ? (
                <div className="space-y-3">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        answers[q.id] === opt
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => handleMultipleChoice(q.id, e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700">
                        {String.fromCharCode(65 + i)}. {opt}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div>
                  <textarea
                    value={essayAnswers[q.id] || ''}
                    onChange={(e) => handleEssay(q.id, e.target.value)}
                    rows={6}
                    placeholder="Tulis jawaban Anda di sini..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-right text-sm text-gray-500 mt-2">
                    {essayAnswers[q.id]?.length || 0} karakter
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button (Bottom) */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-3 shadow-lg shadow-green-600/30"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Mengumpulkan...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-6 h-6"/>
                <span>Kumpulkan Ujian</span>
              </>
            )}
          </button>
        </div>

        {/* Warning */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0"/>
          <div className="text-sm text-yellow-700">
            <p className="font-medium mb-1">Perhatian:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Pastikan semua jawaban sudah terisi sebelum mengumpulkan</li>
              <li>Ujian akan otomatis terkumpul jika waktu habis</li>
              <li>Setelah dikumpulkan, jawaban tidak dapat diubah</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
