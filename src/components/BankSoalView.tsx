import React, { useState, useMemo } from 'react';
import { Question, GradeLevel, Subject, Curriculum, QuestionType } from '../types';
import { 
  Search, 
  Filter, 
  Check, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Award,
  Layers,
  BookMarked
} from 'lucide-react';

interface BankSoalViewProps {
  bankQuestions: Question[];
  selectedQuestionIds: string[];
  onToggleSelectQuestion: (question: Question) => void;
  onOpenAIGenerator: () => void;
  onOpenFastGenerator: () => void;
  onAutoSelectBundle: (grade: GradeLevel, subject: Subject, count: number) => void;
}

export const BankSoalView: React.FC<BankSoalViewProps> = ({
  bankQuestions,
  selectedQuestionIds,
  onToggleSelectQuestion,
  onOpenAIGenerator,
  onOpenFastGenerator,
  onAutoSelectBundle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [onlyHots, setOnlyHots] = useState(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  const toggleExplanation = (id: string) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredQuestions = useMemo(() => {
    return bankQuestions.filter((q) => {
      if (selectedGrade !== 'all' && q.grade !== selectedGrade) return false;
      if (selectedSubject !== 'all' && q.subject !== selectedSubject) return false;
      if (selectedCurriculum !== 'all' && q.curriculum !== selectedCurriculum) return false;
      if (selectedType !== 'all' && q.questionType !== selectedType) return false;
      if (onlyHots && !q.isHots) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchText = q.questionText.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchIndicator = q.indicator.toLowerCase().includes(query);
        const matchOptions = q.options.some((opt) => opt.toLowerCase().includes(query));
        if (!matchText && !matchTopic && !matchIndicator && !matchOptions) return false;
      }

      return true;
    });
  }, [bankQuestions, selectedGrade, selectedSubject, selectedCurriculum, selectedType, onlyHots, searchQuery]);

  // Complete 10 Subjects list including newly requested subjects
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner / Hero Intro */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-100 text-xs font-semibold">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Bank Soal Kurikulum Merdeka & K13 Terpadu SMP (10 Mapel)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Penyusunan Ujian Cepat, Standar Kemdikbud & Otomasi PDF
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Pilih butir soal terkurasi atau buat naskah kilat hingga 50 butir soal lengkap dengan kunci jawaban, kisi-kisi penulisan soal, dan cetak PDF instan.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenFastGenerator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md transition-all"
            >
              <span>⚡ Buatkan Naskah Ujian Kilat (1-Klik s/d 50 Soal)</span>
            </button>

            <button
              onClick={onOpenAIGenerator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-sm shadow-sm hover:bg-blue-50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Buat Topik Spesifik via AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci materi, stimulus soal, atau indikator CP/KD..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-2">
            <span>Ditemukan: <strong className="text-slate-800">{filteredQuestions.length}</strong> butir soal</span>
            <span>·</span>
            <span>Terpilih dalam naskah: <strong className="text-blue-600">{selectedQuestionIds.length}</strong> soal</span>
          </div>
        </div>

        {/* Filter Badges & Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100">
          
          {/* Filter Kelas */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tingkat Kelas</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">Semua Kelas (7, 8, 9)</option>
              <option value="7">Kelas 7 SMP</option>
              <option value="8">Kelas 8 SMP</option>
              <option value="9">Kelas 9 SMP</option>
            </select>
          </div>

          {/* Filter Mapel */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Mata Pelajaran</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">Semua Mata Pelajaran</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Filter Kurikulum */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kurikulum</label>
            <select
              value={selectedCurriculum}
              onChange={(e) => setSelectedCurriculum(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">Semua Kurikulum</option>
              <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
              <option value="Kurikulum 2013">Kurikulum 2013 (K13)</option>
            </select>
          </div>

          {/* Filter Bentuk Soal */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Bentuk Soal</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-xs py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">Semua Bentuk</option>
              <option value="pilihan_ganda">Pilihan Ganda (PG)</option>
              <option value="uraian">Uraian / Essay</option>
              <option value="isian">Isian Singkat</option>
            </select>
          </div>

          {/* Filter HOTS Toggle */}
          <div className="flex flex-col justify-end">
            <button
              onClick={() => setOnlyHots(!onlyHots)}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                onlyHots
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${onlyHots ? 'text-amber-600' : 'text-slate-400'}`} />
              <span>Hanya Soal HOTS</span>
            </button>
          </div>

        </div>
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada soal yang sesuai dengan filter</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Coba ubah kata kunci pencarian atau sesuaikan pilihan filter kelas dan mata pelajaran Anda.
            </p>
            <button
              onClick={() => {
                setSelectedGrade('all');
                setSelectedSubject('all');
                setSelectedCurriculum('all');
                setSelectedType('all');
                setOnlyHots(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-blue-600 hover:underline"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const isSelected = selectedQuestionIds.includes(q.id);
            const isExpanded = !!expandedExplanations[q.id];

            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl border transition-all duration-200 shadow-xs ${
                  isSelected ? 'border-blue-400 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-5 space-y-4">
                  {/* Card Header Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                        #{index + 1}
                      </span>
                      <span className="font-semibold text-blue-700">{q.subject}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-medium text-slate-700">Kelas {q.grade} SMP</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-600">{q.curriculum}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500 italic">{q.topic}</span>
                      {q.isHots && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-amber-700 font-bold flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-500" />
                            HOTS
                          </span>
                        </>
                      )}
                    </div>

                    {/* Action Button: Add to Exam */}
                    <button
                      onClick={() => onToggleSelectQuestion(q)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Sudah di Naskah</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Pilih ke Naskah</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Question Stem Text */}
                  <div className="text-slate-900 text-sm leading-relaxed whitespace-pre-line font-normal">
                    {q.questionText}
                  </div>

                  {/* Multiple Choice Options (if applicable) */}
                  {q.questionType === 'pilihan_ganda' && q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const optLetter = opt.trim().substring(0, 1).toUpperCase();
                        const isCorrect = isExpanded && optLetter === q.correctAnswer.toUpperCase();
                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                                : 'bg-slate-50/70 border-slate-200/80 text-slate-800'
                            }`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Question Footer info */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="text-slate-500">
                      <span>Level: <strong className="text-slate-700">{q.cognitiveLevel}</strong></span>
                      <span className="mx-2">·</span>
                      <span>Bentuk: <strong className="text-slate-700 uppercase">{q.questionType.replace('_', ' ')}</strong></span>
                      <span className="mx-2">·</span>
                      <span>Bobot: <strong className="text-slate-700">{q.scoreWeight || 2} Poin</strong></span>
                    </div>

                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>{isExpanded ? 'Tutup Kunci & Pembahasan' : 'Lihat Kunci & Pembahasan'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Explanation Panel */}
                  {isExpanded && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Kunci Jawaban: {q.correctAnswer}
                        </span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-700 font-medium">Pembahasan Pedagogis</span>
                      </div>

                      <div className="text-slate-700 leading-relaxed whitespace-pre-line bg-white p-3 rounded-lg border border-slate-200/60 font-mono text-[11px]">
                        {q.explanation}
                      </div>

                      <div className="text-slate-500 italic">
                        <strong>Indikator Soal (Kisi-Kisi):</strong> {q.indicator}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
