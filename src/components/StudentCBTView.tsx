import React, { useState, useEffect } from 'react';
import { Question, ExamHeaderConfig } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  RotateCcw, 
  BookOpen,
  Award,
  Share2,
  Printer
} from 'lucide-react';

interface StudentCBTViewProps {
  questions: Question[];
  headerConfig: ExamHeaderConfig;
  onExitStudentMode: () => void;
  onShareLink: () => void;
  copiedNotification: boolean;
}

export const StudentCBTView: React.FC<StudentCBTViewProps> = ({
  questions,
  headerConfig,
  onExitStudentMode,
  onShareLink,
  copiedNotification,
}) => {
  // Student identification state
  const [isStarted, setIsStarted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState(`Kelas ${headerConfig.grade}-A`);
  const [studentNumber, setStudentNumber] = useState('');

  // Exam taking state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 mins in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isStarted || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isStarted, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (ans: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: ans,
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleSubmitExam = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);
  };

  // Evaluation calculations
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  let earnedScore = 0;
  let maxPossibleScore = 0;
  let correctCount = 0;
  let wrongCount = 0;

  questions.forEach((q) => {
    const weight = q.scoreWeight || 2;
    maxPossibleScore += weight;
    const studentAns = answers[q.id]?.trim().toUpperCase();
    const correctAns = q.correctAnswer.trim().toUpperCase();

    if (q.questionType === 'pilihan_ganda') {
      if (studentAns && studentAns === correctAns) {
        earnedScore += weight;
        correctCount += 1;
      } else if (studentAns) {
        wrongCount += 1;
      }
    } else {
      // For essays/short answers, grant standard score if filled as student practice
      if (studentAns && studentAns.length > 5) {
        earnedScore += weight;
        correctCount += 1;
      }
    }
  });

  const finalGrade = maxPossibleScore > 0 ? Math.round((earnedScore / maxPossibleScore) * 100) : 0;

  // Start Screen
  if (!isStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">{headerConfig.examTitle}</h1>
            <p className="text-sm font-semibold text-blue-600">{headerConfig.schoolName}</p>
            <p className="text-xs text-slate-500">Mata Pelajaran: {headerConfig.subject} · Kelas {headerConfig.grade} SMP</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-700">Petunjuk Simulasi Ujian CBT Siswa:</div>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Jumlah Soal: <strong>{questions.length} butir</strong></li>
              <li>Waktu Pengerjaan: <strong>{headerConfig.timeAllocation}</strong></li>
              <li>Siswa dapat menandai soal ragu-ragu dan berpindah nomor kapan saja.</li>
              <li>Setelah submit, hasil skor dan evaluasi pembahasan lengkap akan langsung ditampilkan.</li>
            </ul>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Siswa</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Masukkan nama lengkap siswa..."
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                <input
                  type="text"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor Absen / Peserta</label>
                <input
                  type="text"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="Contoh: 14"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onExitStudentMode}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Kembali ke Panel Guru
            </button>

            <button
              onClick={() => setIsStarted(true)}
              disabled={!studentName.trim() || questions.length === 0}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              Mulai Ujian Sekarang
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Submitted Evaluation Report Screen
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Score Card Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">Ujian Telah Selesai Diserahkan!</h2>
            <p className="text-xs text-slate-500">Evaluasi Pembelajaran Mandiri Siswa</p>
          </div>

          <div className="bg-slate-50 max-w-sm mx-auto rounded-2xl p-6 border border-slate-200 space-y-2">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Nilai / Skor Akhir</div>
            <div className="text-5xl font-black text-blue-600 font-mono">{finalGrade}</div>
            <div className="text-xs text-slate-600 font-medium">
              Skor Perolehan: {earnedScore} dari {maxPossibleScore} poin
            </div>
          </div>

          <div className="grid grid-cols-3 max-w-md mx-auto gap-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-emerald-700 font-bold">Benar</div>
              <div className="text-xl font-black text-emerald-800 mt-1">{correctCount}</div>
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
              <div className="text-red-700 font-bold">Salah</div>
              <div className="text-xl font-black text-red-800 mt-1">{wrongCount}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-slate-600 font-bold">Dilewati</div>
              <div className="text-xl font-black text-slate-800 mt-1">{totalQuestions - answeredCount}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsStarted(false);
                setAnswers({});
                setFlagged({});
                setTimeLeft(90 * 60);
              }}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Coba Ulang Ujian</span>
            </button>

            <button
              onClick={onExitStudentMode}
              className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs"
            >
              Kembali ke Dashboard Guru
            </button>
          </div>
        </div>

        {/* Detailed Solutions & Pedagogical Explanations for Students */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 border-b pb-3">
            Pembahasan & Kunci Jawaban Lengkap Evaluasi Pembelajaran
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const studentAns = answers[q.id]?.trim().toUpperCase();
              const isCorrect = studentAns === q.correctAnswer.trim().toUpperCase();

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : studentAns
                      ? 'bg-red-50/20 border-red-200'
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Nomor {idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Jawaban Anda: <strong className={isCorrect ? 'text-emerald-700' : 'text-red-600'}>{studentAns || 'Tidak Dijawab'}</strong></span>
                      <span className="text-slate-300">·</span>
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Kunci: {q.correctAnswer}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                    {q.questionText}
                  </div>

                  {/* Multiple Choice Options */}
                  {q.questionType === 'pilihan_ganda' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const optLetter = opt.trim().substring(0, 1).toUpperCase();
                        const isThisCorrect = optLetter === q.correctAnswer.toUpperCase();
                        const isStudentPick = optLetter === studentAns;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border ${
                              isThisCorrect
                                ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold'
                                : isStudentPick
                                ? 'bg-red-100/60 border-red-300 text-red-900'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Step-by-Step Solution */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Pembahasan Langkah Penyelesaian:</span>
                    </div>
                    <div className="text-slate-700 font-mono text-[11px] whitespace-pre-line leading-relaxed">
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // Active Exam Taking Screen
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      
      {/* Top Test Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900">{headerConfig.examTitle}</h2>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>{studentName}</span>
            <span>·</span>
            <span>{studentClass}</span>
            <span>·</span>
            <span>{headerConfig.subject}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-mono font-bold text-sm">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Main Examination Grid: Question Card on Left, Navigator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Active Question Area */}
        <div className="lg:col-span-3 space-y-4">
          {currentQ ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
                    {currentIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">dari {questions.length} Butir Soal</span>
                </div>

                <button
                  onClick={handleToggleFlag}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                    flagged[currentQ.id]
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>Ragu-ragu</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-base text-slate-900 leading-relaxed whitespace-pre-line font-medium">
                {currentQ.questionText}
              </div>

              {/* Answer Controls */}
              {currentQ.questionType === 'pilihan_ganda' ? (
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const optLetter = opt.trim().substring(0, 1).toUpperCase();
                    const isSelected = answers[currentQ.id] === optLetter;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(optLetter)}
                        className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg border font-bold text-xs flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-slate-100 border-slate-300 text-slate-700'
                          }`}
                        >
                          {optLetter}
                        </span>
                        <span className="flex-1">{opt.replace(/^[A-Da-d]\.\s*/, '')}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-700">Tulis Jawaban Uraian Anda:</label>
                  <textarea
                    rows={5}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleSelectAnswer(e.target.value)}
                    placeholder="Ketikkan langkah pengerjaan atau uraian jawaban Anda..."
                    className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Soal Sebelumnya</span>
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Soal Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Selesai & Kumpulkan</span>
                  </button>
                )}
              </div>

            </div>
          ) : null}
        </div>

        {/* Right: Question Number Grid Palette */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">Navigasi Nomor Soal</h3>
            
            <div className="grid grid-cols-5 gap-2 max-h-[420px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!answers[q.id];
                const isFlagged = !!flagged[q.id];

                let bgClass = 'bg-slate-100 border-slate-200 text-slate-700';
                if (isCurrent) {
                  bgClass = 'ring-2 ring-blue-500 font-extrabold bg-blue-50 text-blue-800 border-blue-400';
                } else if (isFlagged) {
                  bgClass = 'bg-amber-100 border-amber-300 text-amber-900 font-bold';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-600 border-emerald-600 text-white font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block"></span>
                <span>Sudah Dijawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-200 border border-amber-400 inline-block"></span>
                <span>Ragu-ragu ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300 inline-block"></span>
                <span>Belum Dijawab ({totalQuestions - answeredCount})</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              Kumpulkan Ujian
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal before submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Konfirmasi Pengumpulan Ujian</h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>{totalQuestions}</strong> butir soal.
              {answeredCount < totalQuestions && (
                <span className="block mt-1 text-amber-700 font-semibold">
                  Peringatan: Masih ada {totalQuestions - answeredCount} butir soal yang belum Anda jawab.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs"
              >
                Ya, Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
