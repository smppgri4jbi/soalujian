import React, { useState } from 'react';
import { Question, GradeLevel, Subject, Curriculum } from '../types';
import { Sparkles, Loader2, Plus, Check, BookOpen, Layers, AlertCircle } from 'lucide-react';
import { generateClientQuestions } from '../utils/clientQuestionGenerator';

interface AIGeneratorModalProps {
  onAddGeneratedQuestions: (questions: Question[]) => void;
  onClose?: () => void;
  defaultSubject?: Subject;
  defaultGrade?: GradeLevel;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  onAddGeneratedQuestions,
  onClose,
  defaultSubject = 'Matematika',
  defaultGrade = '8',
}) => {
  const [grade, setGrade] = useState<GradeLevel>(defaultGrade);
  const [subject, setSubject] = useState<Subject>(defaultSubject);
  const [curriculum, setCurriculum] = useState<Curriculum>('Kurikulum Merdeka');
  const [examType, setExamType] = useState('Penilaian Akhir Semester (PAS/SAS)');
  const [topic, setTopic] = useState('Aljabar dan Persamaan Linier');
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState('Campuran (Mudah, Sedang, HOTS)');
  const [questionType, setQuestionType] = useState<'pilihan_ganda' | 'uraian'>('pilihan_ganda');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Topic suggestion presets per subject
  const topicPresets: Record<string, string[]> = {
    Matematika: [
      'Aljabar dan Persamaan Linier',
      'Teorema Pythagoras dan Tripel Pythagoras',
      'Bangun Ruang Sisi Lengkung (Tabung, Kerucut, Bola)',
      'Statistika dan Peluang SMP',
      'Bilangan Bulat, Pecahan dan Rasio',
      'Fungsi Kuadrat dan Grafik Parabola',
    ],
    'Ilmu Pengetahuan Alam (IPA)': [
      'Sistem Pencernaan dan Uji Makanan',
      'Zat Aditif dan Zat Adiktif',
      'Hukum Newton dan Dinamika Gerak',
      'Pewarisan Sifat dan Genetika Mendel',
      'Listrik Dinamis dan Energi Rumah Tangga',
      'Struktur Bumi, Gempa dan Tata Surya',
    ],
    'Bahasa Indonesia': [
      'Teks Deskripsi dan Cerapan Pancaindra',
      'Teks Prosedur dan Kalimat Imperatif',
      'Teks Eksplanasi dan Konjungsi Kausalitas',
      'Teks Pidato Persuasif',
      'Teks Cerita Pendek (Cerpen) dan Unsur Intrinsik',
    ],
    'Bahasa Inggris': [
      'Describing People, Animals, and Places',
      'Recount Text and Past Events',
      'Passive Voice in Factual Report Text',
      'Expressing Hopes, Wishes, and Congratulations',
      'Procedure Text (Recipes and Manuals)',
    ],
    'Ilmu Pengetahuan Sosial (IPS)': [
      'Interaksi Antarruang dan Potensi Wilayah',
      'Mobilitas Sosial dan Keragaman Budaya',
      'Perkembangan Kerajaan Islam di Nusantara',
      'Kondisi Geografis Negara ASEAN',
      'Globalisasi dan Kearifan Lokal',
    ],
    'Pendidikan Pancasila': [
      'Kelahiran Pancasila dan Nilai Pendiri Bangsa',
      'UUD NRI Tahun 1945 sebagai Norma Tertinggi',
      'Bhinneka Tunggal Ika dan Integrasi Nasional',
      'Kedaulatan Rakyat dan Sistem Demokrasi',
    ],
    'Informatika': [
      'Berpikir Komputasional (Dekomposisi, Pola, Algoritma)',
      'Sistem Komputer dan Perangkat Keras Input-Output',
      'Jaringan Komputer Lokal (LAN) dan Internet',
      'Representasi Data dan Konversi Bilangan Biner',
      'Dampak Sosial Informatika dan Keamanan Data',
    ],
    "IQRA / Baca Tulis Al-Qur'an (BTQ)": [
      'Hukum Nun Mati dan Tanwin (Idzhar, Idgham, Iqlab, Ikhfa)',
      'Makharijul Huruf Hijaiyah dan Sifat Huruf',
      'Hukum Bacaan Mad (Mad Thabi’i dan Mad Far’i)',
      'Tanda-tanda Waqaf dan Kaidah Membaca Al-Qur’an',
      'Kaidah Penulisan Huruf Hijaiyah Bersambung dan Kaligrafi',
    ],
    'Bimbingan Konseling (BK)': [
      'Penyesuaian Diri dan Manajemen Waktu Belajar',
      'Pencegahan Perundungan (Anti-Bullying) & Etika Bergaul',
      'Pengelolaan Emosi Remaja dan Manajemen Stres',
      'Mengenali Potensi Diri dan Gaya Belajar (VAK)',
      'Perencanaan Karir dan Peminatan Lanjutan SMA/SMK',
    ],
    'Seni Budaya': [
      'Seni Rupa: Menggambar Model dan Ragam Hias Nusantara',
      'Seni Musik: Alat Musik Tradisional Nusantara dan Tangga Nada',
      'Seni Tari: Pola Lantai dan Gerak Tari Tradisional',
      'Seni Rupa: Aliran Gaya Lukis (Realisme, Surealisme)',
      'Ansambel Musik Campuran dan Lagu Daerah Nusantara',
    ],
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setInfoNotice(null);
    setGeneratedQuestions([]);
    setSelectedIds([]);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          subject,
          curriculum,
          examType,
          topic,
          count: Number(count),
          difficulty,
          questionType,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.includes('application/json')) {
        throw new Error(`API response status: ${response.status}`);
      }

      const data = await response.json();

      if (data.notice) {
        setInfoNotice(data.notice);
      }

      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
        setSelectedIds(data.questions.map((q: Question) => q.id));
      } else {
        throw new Error(data.error || 'Format soal yang diterima tidak sesuai.');
      }
    } catch (err: any) {
      console.warn('API call failed or running in static Vercel host. Activating client generator fallback:', err);
      // Seamlessly generate questions directly on the client side
      const fallbackQuestions = generateClientQuestions({
        grade,
        subject,
        curriculum,
        count: Number(count),
        topic,
        questionType,
      });

      setGeneratedQuestions(fallbackQuestions);
      setSelectedIds(fallbackQuestions.map((q) => q.id));
      setInfoNotice(
        'Naskah soal berhasil disusun dari Bank Soal Kurikulum Terpadu (mode offline/client siap cetak). Anda dapat langsung memeriksa dan menambahkannya ke naskah ujian.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    const toAdd = generatedQuestions.filter((q) => selectedIds.includes(q.id));
    onAddGeneratedQuestions(toAdd);
    if (onClose) onClose();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-md space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-purple-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Didukung Model Cerdas Gemini 3.8 Flash</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Generator Soal Ujian Otomatis SMP
        </h2>
        <p className="text-purple-100 text-sm max-w-2xl leading-relaxed">
          Hasilkan naskah soal berstandar Capaian Pembelajaran (CP) Kurikulum Merdeka atau Kompetensi Dasar (KD) K13 secara otomatis lengkap dengan kunci jawaban, kisi-kisi, dan pembahasan detail langkah demi langkah.
        </p>
      </div>

      {/* Generator Form Deck */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          
          {/* Tingkat Kelas */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Tingkat Kelas SMP</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold text-slate-800"
            >
              <option value="7">Kelas 7 SMP (Fase D)</option>
              <option value="8">Kelas 8 SMP (Fase D)</option>
              <option value="9">Kelas 9 SMP (Fase D)</option>
            </select>
          </div>

          {/* Mata Pelajaran */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Mata Pelajaran</label>
            <select
              value={subject}
              onChange={(e) => {
                const newSub = e.target.value as Subject;
                setSubject(newSub);
                if (topicPresets[newSub]?.[0]) {
                  setTopic(topicPresets[newSub][0]);
                }
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold text-slate-800"
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

          {/* Kurikulum */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Kerangka Kurikulum</label>
            <select
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value as Curriculum)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold text-slate-800"
            >
              <option value="Kurikulum Merdeka">Kurikulum Merdeka (Capaian Pembelajaran)</option>
              <option value="Kurikulum 2013">Kurikulum 2013 Revisi (Kompetensi Dasar)</option>
            </select>
          </div>

          {/* Jenis Asesmen */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Jenis Ujian</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 text-slate-800"
            >
              <option value="Penilaian Akhir Semester (PAS/SAS)">Penilaian Akhir Semester (PAS/SAS)</option>
              <option value="Penilaian Tengah Semester (PTS/STS)">Penilaian Tengah Semester (PTS/STS)</option>
              <option value="Penilaian Harian (PH/UH)">Penilaian Harian / Ulangan Harian</option>
              <option value="Ujian Sekolah (US/Asesmen Standar)">Ujian Sekolah / Asesmen Akhir Jenjang</option>
            </select>
          </div>

          {/* Bentuk Soal */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Bentuk Soal</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 text-slate-800"
            >
              <option value="pilihan_ganda">Pilihan Ganda (4 Opsi: A, B, C, D)</option>
              <option value="uraian">Uraian / Essay Terstruktur</option>
            </select>
          </div>

          {/* Jumlah Soal */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Jumlah Butir Soal (s/d 50 Soal)</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold text-slate-800"
            >
              <option value="5">5 Butir Soal</option>
              <option value="10">10 Butir Soal (Kuis/PH)</option>
              <option value="20">20 Butir Soal (PTS/STS Standar)</option>
              <option value="25">25 Butir Soal</option>
              <option value="30">30 Butir Soal (PAS/SAS Semester)</option>
              <option value="40">40 Butir Soal (Standar Ujian Sekolah)</option>
              <option value="50">50 Butir Soal Lengkap (Paket Ujian Komprehensif)</option>
            </select>
          </div>

        </div>

        {/* Topik / Materi Spesifik with Preset Chips */}
        <div className="space-y-2 text-xs">
          <label className="block font-bold text-slate-700">Topik / Materi Pokok / Capaian Pembelajaran</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden text-sm"
            placeholder="Ketik topik spesifik yang ingin diujikan..."
          />

          {/* Preset Topics */}
          {topicPresets[subject] && (
            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-medium">Saran Topik:</span>
              {topicPresets[subject].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(item)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    topic === item
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Otomatis dilengkapi kunci jawaban, level kognitif Bloom, dan rubrik evaluasi.
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyusun Soal dengan Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Hasilkan Paket Soal Otomatis</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Info / Quota Fallback Notice */}
      {infoNotice && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-4 text-xs flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{infoNotice}</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Results Deck */}
      {generatedQuestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div>
              <h3 className="font-extrabold text-sm text-emerald-900">
                Berhasil Menyusun {generatedQuestions.length} Butir Soal Ujian!
              </h3>
              <p className="text-xs text-emerald-700">
                {selectedIds.length} dari {generatedQuestions.length} soal dipilih untuk dimasukkan ke naskah ujian.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSelectedIds(
                    selectedIds.length === generatedQuestions.length
                      ? []
                      : generatedQuestions.map((q) => q.id)
                  )
                }
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100"
              >
                {selectedIds.length === generatedQuestions.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
              </button>

              <button
                onClick={handleApply}
                disabled={selectedIds.length === 0}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Tambahkan ke Naskah Ujian ({selectedIds.length})</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {generatedQuestions.map((q, idx) => {
              const isChecked = selectedIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-xl border p-5 space-y-3 transition-colors ${
                    isChecked ? 'border-purple-300 bg-purple-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(q.id)}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-bold text-slate-900">Soal #{idx + 1}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600 font-medium">{q.cognitiveLevel}</span>
                      {q.isHots && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="text-amber-700 font-bold">HOTS</span>
                        </>
                      )}
                    </div>

                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                      Kunci: {q.correctAnswer}
                    </span>
                  </div>

                  <div className="text-sm text-slate-900 leading-relaxed whitespace-pre-line font-medium">
                    {q.questionText}
                  </div>

                  {q.questionType === 'pilihan_ganda' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1 border border-slate-200">
                    <div className="font-semibold text-slate-700">Pembahasan & Langkah Penyelesaian:</div>
                    <div className="text-slate-600 font-mono text-[11px] whitespace-pre-line">
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
