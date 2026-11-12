import React, { useState } from 'react';
import { Question, GradeLevel, Subject, Curriculum, ExamHeaderConfig } from '../types';
import { defaultBankSoal } from '../data/defaultBankSoal';
import { generateClientQuestions } from '../utils/clientQuestionGenerator';
import { Zap, Sparkles, Loader2, X, CheckCircle, BookOpen, Clock, FileText } from 'lucide-react';

interface FastExamGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyInstantExam: (questions: Question[], subject: Subject, grade: GradeLevel, count: number) => void;
}

export const FastExamGeneratorModal: React.FC<FastExamGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyInstantExam,
}) => {
  const [subject, setSubject] = useState<Subject>('Matematika');
  const [grade, setGrade] = useState<GradeLevel>('8');
  const [curriculum, setCurriculum] = useState<Curriculum>('Kurikulum Merdeka');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [mode, setMode] = useState<'instant_smart' | 'ai_pure'>('instant_smart');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const subjects: Subject[] = [
    'Matematika',
    'Ilmu Pengetahuan Alam (IPA)',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Ilmu Pengetahuan Sosial (IPS)',
    'Pendidikan Pancasila',
    'Informatika',
    "IQRA / Baca Tulis Al-Qur'an (BTQ)",
    'Bimbingan Konseling (BK)',
    'Seni Budaya',
  ];

  const countOptions = [10, 20, 25, 30, 40, 50];

  const handleGenerate = async () => {
    setIsLoading(true);
    setStatusMessage(`Sedang menyusun naskah ${questionCount} soal untuk ${subject} Kelas ${grade}...`);

    try {
      if (mode === 'instant_smart') {
        // Fast smart synthesis: collect matching bank questions, synthesize/expand to target count
        const matchingBank = defaultBankSoal.filter(
          (q) => q.subject === subject || q.grade === grade
        );
        const subjectMatching = defaultBankSoal.filter((q) => q.subject === subject);

        // If we already have enough or need more, call API or synthesize
        if (subjectMatching.length >= questionCount) {
          const selected = subjectMatching.slice(0, questionCount);
          onApplyInstantExam(selected, subject, grade, questionCount);
          onClose();
          return;
        }

        // Call backend API for batch generation
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade,
            subject,
            curriculum,
            examType: 'Penilaian Akhir Semester (PAS/SAS)',
            topic: `Materi Inti Semester SMP ${subject} Kelas ${grade}`,
            count: questionCount,
            difficulty: 'Campuran (Mudah, Sedang, HOTS)',
            questionType: 'pilihan_ganda',
          }),
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.questions && data.questions.length > 0) {
            onApplyInstantExam(data.questions, subject, grade, questionCount);
            onClose();
            return;
          }
        }
        
        // If API fails or returns HTML/non-ok, use client generator directly
        const clientQuestions = generateClientQuestions({
          grade,
          subject,
          curriculum,
          count: questionCount,
          topic: `Materi Pokok ${subject} Kelas ${grade}`,
          questionType: 'pilihan_ganda',
        });
        onApplyInstantExam(clientQuestions, subject, grade, questionCount);
        onClose();
      } else {
        // Pure AI Generation
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade,
            subject,
            curriculum,
            examType: 'Penilaian Akhir Semester (PAS/SAS)',
            topic: `Standar Capaian Pembelajaran dan Soal HOTS ${subject} Kelas ${grade}`,
            count: questionCount,
            difficulty: 'Campuran',
            questionType: 'pilihan_ganda',
          }),
        });
        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !contentType.includes('application/json')) {
          throw new Error(`API error ${res.status}`);
        }
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          onApplyInstantExam(data.questions, subject, grade, questionCount);
          onClose();
        } else {
          throw new Error('Gagal menghasilkan soal.');
        }
      }
    } catch (err: any) {
      console.warn('FastExamGenerator fallback triggered:', err);
      // Resilient fallback: ensure teacher gets their exam package immediately
      const clientFallback = generateClientQuestions({
        grade,
        subject,
        curriculum,
        count: questionCount,
        topic: `Materi Pokok ${subject} Kelas ${grade}`,
        questionType: 'pilihan_ganda',
      });
      onApplyInstantExam(clientFallback, subject, grade, questionCount);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Generator Naskah Kilat (1-Klik)</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Aplikasi Langsung Membuatkan Soal Ujian
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pilih mapel dan target jumlah soal (hingga 50 butir). Sistem akan otomatis menyusun naskah ujian resmi lengkap dengan kunci jawaban, kisi-kisi, dan siap cetak PDF.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection Form */}
        <div className="space-y-4 text-xs">
          
          {/* Grid: Mapel & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Mapel */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Mata Pelajaran (10 Mapel SMP)</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 text-xs"
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Tingkat Kelas */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Tingkat Kelas SMP</label>
              <div className="grid grid-cols-3 gap-2">
                {(['7', '8', '9'] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`py-2 px-3 rounded-xl font-extrabold text-xs transition-all border ${
                      grade === g
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Kelas {g}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Jumlah Soal: Up to 50 questions */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">Pilih Jumlah Butir Soal</label>
              <span className="text-[11px] font-semibold text-blue-600">
                Target: {questionCount} Butir Soal Lengkap
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {countOptions.map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all border flex flex-col items-center justify-center ${
                    questionCount === cnt
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{cnt}</span>
                  <span className="text-[9px] font-normal opacity-90">Soal</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mode Pembuatan */}
          <div className="pt-1">
            <label className="block font-bold text-slate-700 mb-1.5">Metode Penyusunan Cepat</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('instant_smart')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'instant_smart'
                    ? 'bg-blue-50/80 border-blue-400 text-blue-950 ring-1 ring-blue-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kombinasi Cerdas (Paling Cepat)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Memadukan bank soal kurasi dan perakitan cepat. Langsung jadi dalam hitungan detik!
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMode('ai_pure')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'ai_pure'
                    ? 'bg-purple-50/80 border-purple-400 text-purple-950 ring-1 ring-purple-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Generasi Baru via Gemini AI</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Menghasilkan butir soal baru secara paralel berdasarkan topik mendalam.
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer & Action Button */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          {isLoading && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Membuat {questionCount} Soal...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Langsung Buatkan Naskah ({questionCount} Soal)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
