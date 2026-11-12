import React, { useState } from 'react';
import { Question, ExamHeaderConfig, Subject, GradeLevel } from '../types';
import { 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Plus, 
  Settings2, 
  Printer, 
  Sparkles, 
  Check, 
  X,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface ExamBuilderViewProps {
  selectedQuestions: Question[];
  headerConfig: ExamHeaderConfig;
  onUpdateHeaderConfig: (newConfig: Partial<ExamHeaderConfig>) => void;
  onRemoveQuestion: (id: string) => void;
  onMoveQuestion: (index: number, direction: 'up' | 'down') => void;
  onUpdateQuestion: (updated: Question) => void;
  onAddCustomQuestion: (question: Question) => void;
  onNavigateToPrint: () => void;
  onClearAll: () => void;
  onOpenFastGenerator?: () => void;
}

export const ExamBuilderView: React.FC<ExamBuilderViewProps> = ({
  selectedQuestions,
  headerConfig,
  onUpdateHeaderConfig,
  onRemoveQuestion,
  onMoveQuestion,
  onUpdateQuestion,
  onAddCustomQuestion,
  onNavigateToPrint,
  onClearAll,
  onOpenFastGenerator,
}) => {
  const [showHeaderSettings, setShowHeaderSettings] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Question | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEnhancingAI, setIsEnhancingAI] = useState(false);

  // New Custom Question State
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: '',
    grade: headerConfig.grade,
    subject: headerConfig.subject,
    curriculum: 'Kurikulum Merdeka',
    topic: 'Materi Pilihan Guru',
    questionType: 'pilihan_ganda',
    questionText: '',
    options: ['A. ', 'B. ', 'C. ', 'D. '],
    correctAnswer: 'A',
    explanation: '',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menyelesaikan persoalan materi...',
    scoreWeight: 2,
  });

  // Calculate statistics
  const pgCount = selectedQuestions.filter((q) => q.questionType === 'pilihan_ganda').length;
  const essayCount = selectedQuestions.filter((q) => q.questionType === 'uraian' || q.questionType === 'isian').length;
  const totalScore = selectedQuestions.reduce((acc, q) => acc + (q.scoreWeight || 2), 0);

  const startEdit = (q: Question) => {
    setEditingQuestionId(q.id);
    setEditFormData(JSON.parse(JSON.stringify(q)));
  };

  const cancelEdit = () => {
    setEditingQuestionId(null);
    setEditFormData(null);
  };

  const saveEdit = () => {
    if (editFormData) {
      onUpdateQuestion(editFormData);
      setEditingQuestionId(null);
      setEditFormData(null);
    }
  };

  const handleEnhanceWithAI = async (q: Question) => {
    setIsEnhancingAI(true);
    try {
      const res = await fetch('/api/generate-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q.questionText,
          subject: q.subject,
          grade: q.grade,
          currentAnswer: q.correctAnswer,
        }),
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.explanation) {
          onUpdateQuestion({
            ...q,
            explanation: `${data.explanation}\n\n[Pedoman Rubrik Nilai: ${data.scoringRubric || 'Sesuai langkah kerja'}]`,
            correctAnswer: data.suggestedAnswer || q.correctAnswer,
          });
          return;
        }
      }
      // Fallback if API is offline or running static
      onUpdateQuestion({
        ...q,
        explanation: `Pedoman Pembahasan & Rubrik ${q.subject}:\n1. Telaah konsep materi dan variabel yang tertera pada butir soal.\n2. Lakukan penalaran terstruktur untuk mengeliminasi opsi yang kurang tepat.\n3. Pilihan (${q.correctAnswer}) memenuhi kriteria jawaban paling akurat.\n\n[Rubrik Penilaian: Bobot nilai penuh untuk pengerjaan terstruktur dan tepat]`,
      });
    } catch (err) {
      console.warn('Enhance AI fallback triggered:', err);
      onUpdateQuestion({
        ...q,
        explanation: `Pedoman Pembahasan & Rubrik ${q.subject}:\n1. Telaah konsep materi dan variabel yang tertera pada butir soal.\n2. Lakukan penalaran terstruktur untuk mengeliminasi opsi yang kurang tepat.\n3. Pilihan (${q.correctAnswer}) memenuhi kriteria jawaban paling akurat.\n\n[Rubrik Penilaian: Bobot nilai penuh untuk pengerjaan terstruktur dan tepat]`,
      });
    } finally {
      setIsEnhancingAI(false);
    }
  };

  const handleCreateCustom = () => {
    if (!newQuestion.questionText.trim()) return;
    const finalQ: Question = {
      ...newQuestion,
      id: `custom-${Date.now()}`,
      grade: headerConfig.grade,
      subject: headerConfig.subject,
    };
    onAddCustomQuestion(finalQ);
    setShowAddModal(false);
    setNewQuestion({
      id: '',
      grade: headerConfig.grade,
      subject: headerConfig.subject,
      curriculum: 'Kurikulum Merdeka',
      topic: 'Materi Pilihan Guru',
      questionType: 'pilihan_ganda',
      questionText: '',
      options: ['A. ', 'B. ', 'C. ', 'D. '],
      correctAnswer: 'A',
      explanation: '',
      cognitiveLevel: 'C3 - Menerapkan',
      isHots: false,
      indicator: '',
      scoreWeight: 2,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title & Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Penyusun Naskah Soal Ujian
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Atur nomor urut soal, lengkapi identitas kop surat sekolah, periksa bobot nilai, dan buat soal kustom.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenFastGenerator && (
            <button
              onClick={onOpenFastGenerator}
              className="px-3.5 py-2 text-xs font-black rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 flex items-center gap-1.5 shadow-xs transition-colors"
              title="Buat naskah ujian 10 s/d 50 butir soal seketika"
            >
              <span>⚡ Buat Soal Kilat (s/d 50 Soal)</span>
            </button>
          )}

          <button
            onClick={() => setShowHeaderSettings(!showHeaderSettings)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{showHeaderSettings ? 'Tutup Kop Surat' : 'Edit Kop Surat Sekolah'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Soal Manual</span>
          </button>

          <button
            onClick={onNavigateToPrint}
            disabled={selectedQuestions.length === 0}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-4 h-4" />
            <span>Pratinjau & Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 font-medium">Total Butir Soal</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{selectedQuestions.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Siap diujikan</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 font-medium">Pilihan Ganda (PG)</div>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{pgCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Opsi 4 pilihan (A, B, C, D)</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 font-medium">Uraian / Isian Singkat</div>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">{essayCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Dilengkapi rubrik penskoran</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="text-xs text-slate-500 font-medium">Total Bobot Nilai</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{totalScore} <span className="text-xs font-normal text-slate-500">Poin</span></div>
          <div className="text-[11px] text-slate-400 mt-0.5">Skor maksimal evaluasi</div>
        </div>
      </div>

      {/* Kop Surat Sekolah Drawer / Form */}
      {showHeaderSettings && (
        <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-blue-600" />
              <span>Format Kop Surat Naskah Ujian Sekolah</span>
            </h3>
            <span className="text-xs text-slate-500">Standar resmi naskah cetak dinas pendidikan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Instansi / Dinas / Yayasan</label>
              <input
                type="text"
                value={headerConfig.agency}
                onChange={(e) => onUpdateHeaderConfig({ agency: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Satuan Pendidikan (SMP)</label>
              <input
                type="text"
                value={headerConfig.schoolName}
                onChange={(e) => onUpdateHeaderConfig({ schoolName: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alamat Lengkap & Kontak Sekolah</label>
              <input
                type="text"
                value={headerConfig.schoolAddress}
                onChange={(e) => onUpdateHeaderConfig({ schoolAddress: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Judul Ujian / Asesmen</label>
              <input
                type="text"
                value={headerConfig.examTitle}
                onChange={(e) => onUpdateHeaderConfig({ examTitle: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tahun Pelajaran</label>
              <input
                type="text"
                value={headerConfig.academicYear}
                onChange={(e) => onUpdateHeaderConfig({ academicYear: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alokasi Waktu Ujian</label>
              <input
                type="text"
                value={headerConfig.timeAllocation}
                onChange={(e) => onUpdateHeaderConfig({ timeAllocation: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hari / Tanggal Ujian</label>
              <input
                type="text"
                value={headerConfig.dateStr}
                onChange={(e) => onUpdateHeaderConfig({ dateStr: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran Naskah</label>
              <select
                value={headerConfig.subject}
                onChange={(e) => onUpdateHeaderConfig({ subject: e.target.value as Subject })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
              >
                <option value="Matematika">Matematika</option>
                <option value="Ilmu Pengetahuan Alam (IPA)">Ilmu Pengetahuan Alam (IPA)</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Ilmu Pengetahuan Sosial (IPS)">Ilmu Pengetahuan Sosial (IPS)</option>
                <option value="Pendidikan Pancasila">Pendidikan Pancasila</option>
                <option value="Informatika">Informatika</option>
                <option value="IQRA / Baca Tulis Al-Qur'an (BTQ)">IQRA / Baca Tulis Al-Qur'an (BTQ)</option>
                <option value="Bimbingan Konseling (BK)">Bimbingan Konseling (BK)</option>
                <option value="Seni Budaya">Seni Budaya</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tingkat Kelas</label>
              <select
                value={headerConfig.grade}
                onChange={(e) => onUpdateHeaderConfig({ grade: e.target.value as GradeLevel })}
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
              >
                <option value="7">Kelas 7 SMP</option>
                <option value="8">Kelas 8 SMP</option>
                <option value="9">Kelas 9 SMP</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={headerConfig.twoColumns}
                onChange={(e) => onUpdateHeaderConfig({ twoColumns: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Gunakan format 2 Kolom saat dicetak (lebih hemat kertas fotokopi)</span>
            </label>

            <button
              onClick={() => setShowHeaderSettings(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Simpan Pengaturan Kop
            </button>
          </div>
        </div>
      )}

      {/* Selected Questions List */}
      <div className="space-y-4">
        {selectedQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">Naskah Ujian Masih Kosong</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Silakan buat paket soal instan otomatis hingga 50 butir atau pilih dari bank soal terpadu.
              </p>
            </div>
            {onOpenFastGenerator && (
              <button
                onClick={onOpenFastGenerator}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs shadow-sm transition-all"
              >
                <span>⚡ Langsung Buatkan Naskah Ujian Otomatis (s/d 50 Soal)</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Urutan Soal Naskah Ujian ({selectedQuestions.length} butir)</span>
              <button
                onClick={onClearAll}
                className="text-red-600 hover:text-red-700 font-semibold hover:underline"
              >
                Kosongkan Semua Soal
              </button>
            </div>

            {selectedQuestions.map((q, index) => {
              const isEditing = editingQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-5 space-y-4"
                >
                  {isEditing && editFormData ? (
                    /* Inline Editing Mode */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-bold text-xs text-blue-700">Edit Butir Soal #{index + 1}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-md flex items-center gap-1 hover:bg-emerald-700"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Simpan</span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-md flex items-center gap-1 hover:bg-slate-300"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Batal</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Teks Soal / Stimulus</label>
                        <textarea
                          rows={3}
                          value={editFormData.questionText}
                          onChange={(e) => setEditFormData({ ...editFormData, questionText: e.target.value })}
                          className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>

                      {editFormData.questionType === 'pilihan_ganda' && (
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-700">Pilihan Jawaban (A, B, C, D)</label>
                          {editFormData.options.map((opt, optIndex) => (
                            <input
                              key={optIndex}
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...editFormData.options];
                                newOpts[optIndex] = e.target.value;
                                setEditFormData({ ...editFormData, options: newOpts });
                              }}
                              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Kunci Jawaban</label>
                          <input
                            type="text"
                            value={editFormData.correctAnswer}
                            onChange={(e) => setEditFormData({ ...editFormData, correctAnswer: e.target.value })}
                            className="w-full p-2 text-xs border border-slate-200 rounded-lg font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Bobot Nilai (Poin)</label>
                          <input
                            type="number"
                            value={editFormData.scoreWeight || 2}
                            onChange={(e) => setEditFormData({ ...editFormData, scoreWeight: Number(e.target.value) })}
                            className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Level Kognitif</label>
                          <input
                            type="text"
                            value={editFormData.cognitiveLevel}
                            onChange={(e) => setEditFormData({ ...editFormData, cognitiveLevel: e.target.value })}
                            className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Pembahasan & Rubrik</label>
                        <textarea
                          rows={2}
                          value={editFormData.explanation}
                          onChange={(e) => setEditFormData({ ...editFormData, explanation: e.target.value })}
                          className="w-full p-2 text-xs border border-slate-200 rounded-lg font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Normal Display Mode */
                    <>
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-800">{q.subject}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500 font-medium">{q.topic}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {q.scoreWeight || 2} Poin
                          </span>
                        </div>

                        {/* Order & Edit buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onMoveQuestion(index, 'up')}
                            disabled={index === 0}
                            title="Pindah ke Atas"
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onMoveQuestion(index, 'down')}
                            disabled={index === selectedQuestions.length - 1}
                            title="Pindah ke Bawah"
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEdit(q)}
                            title="Edit Butir Soal"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEnhanceWithAI(q)}
                            disabled={isEnhancingAI}
                            title="Lengkapi Pembahasan dengan AI"
                            className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-md"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemoveQuestion(q.id)}
                            title="Hapus dari Naskah"
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="text-sm text-slate-900 leading-relaxed whitespace-pre-line font-medium">
                        {q.questionText}
                      </div>

                      {/* Options */}
                      {q.questionType === 'pilihan_ganda' && q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, optIdx) => {
                            const optLetter = opt.trim().substring(0, 1).toUpperCase();
                            const isCorrect = optLetter === q.correctAnswer.toUpperCase();
                            return (
                              <div
                                key={optIdx}
                                className={`p-2 rounded-lg border ${
                                  isCorrect
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                                    : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                {opt}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Card Footer: Answer & Explanation preview */}
                      <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">Kunci: <span className="text-emerald-700">{q.correctAnswer}</span></span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500">Kognitif: {q.cognitiveLevel}</span>
                        </div>
                        <div className="text-slate-600 font-mono text-[11px] line-clamp-2">
                          {q.explanation}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Tambah Soal Manual Kustom */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Tambah Butir Soal Manual</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Materi Pokok / Topik</label>
                <input
                  type="text"
                  value={newQuestion.topic}
                  onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  placeholder="Contoh: Operasi Hitung Bentuk Aljabar"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teks Soal / Stimulus Kasus</label>
                <textarea
                  rows={3}
                  value={newQuestion.questionText}
                  onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                  placeholder="Tuliskan pertanyaan ujian di sini..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bentuk Soal</label>
                <select
                  value={newQuestion.questionType}
                  onChange={(e) => setNewQuestion({ ...newQuestion, questionType: e.target.value as any })}
                  className="w-full p-2 border border-slate-200 rounded-lg"
                >
                  <option value="pilihan_ganda">Pilihan Ganda (4 Opsi A-B-C-D)</option>
                  <option value="uraian">Uraian / Essay</option>
                  <option value="isian">Isian Singkat</option>
                </select>
              </div>

              {newQuestion.questionType === 'pilihan_ganda' && (
                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700">Opsi Jawaban</label>
                  {newQuestion.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newQuestion.options];
                        updated[idx] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: updated });
                      }}
                      className="w-full p-2 border border-slate-200 rounded-lg"
                      placeholder={`Opsi ${String.fromCharCode(65 + idx)}`}
                    />
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kunci Jawaban</label>
                  <input
                    type="text"
                    value={newQuestion.correctAnswer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-bold"
                    placeholder="Contoh: A atau jawaban singkat"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bobot Nilai</label>
                  <input
                    type="number"
                    value={newQuestion.scoreWeight || 2}
                    onChange={(e) => setNewQuestion({ ...newQuestion, scoreWeight: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pembahasan & Langkah Penyelesaian</label>
                <textarea
                  rows={2}
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg font-mono text-[11px]"
                  placeholder="Langkah penyelesaian lengkap untuk memudahkan evaluasi guru..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleCreateCustom}
                disabled={!newQuestion.questionText.trim()}
                className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
              >
                Tambahkan ke Naskah
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
