import React, { useState } from 'react';
import { Question, ExamHeaderConfig } from '../types';
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  KeyRound, 
  Table, 
  Layout, 
  Type as TypeIcon,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface PrintPreviewViewProps {
  questions: Question[];
  headerConfig: ExamHeaderConfig;
  onUpdateHeaderConfig: (newConfig: Partial<ExamHeaderConfig>) => void;
  onShareLink: () => void;
  copiedNotification: boolean;
}

export const PrintPreviewView: React.FC<PrintPreviewViewProps> = ({
  questions,
  headerConfig,
  onUpdateHeaderConfig,
  onShareLink,
  copiedNotification,
}) => {
  const [viewMode, setViewMode] = useState<'student_exam' | 'teacher_key' | 'kisi_kisi' | 'answer_sheet'>('student_exam');
  const [copiedText, setCopiedText] = useState(false);

  const pgQuestions = questions.filter((q) => q.questionType === 'pilihan_ganda');
  const essayQuestions = questions.filter((q) => q.questionType === 'uraian' || q.questionType === 'isian');

  // Trigger browser auto print dialog
  const handlePrint = () => {
    window.print();
  };

  // Copy full document text for Word/Docs
  const handleCopyDocument = () => {
    let content = `NASKAH SOAL UJIAN SMP\n${headerConfig.agency}\n${headerConfig.schoolName}\n${headerConfig.schoolAddress}\n\n`;
    content += `Mata Pelajaran: ${headerConfig.subject}\nKelas: ${headerConfig.grade}\nHari/Tanggal: ${headerConfig.dateStr}\nWaktu: ${headerConfig.timeAllocation}\n\n`;
    content += `PETUNJUK UMUM:\n${headerConfig.generalInstructions.map((ins, i) => `${i + 1}. ${ins}`).join('\n')}\n\n`;
    content += `I. SOAL PILIHAN GANDA\n`;
    pgQuestions.forEach((q, idx) => {
      content += `\n${idx + 1}. ${q.questionText}\n`;
      q.options.forEach((opt) => {
        content += `   ${opt}\n`;
      });
    });

    if (essayQuestions.length > 0) {
      content += `\n\nII. SOAL URAIAN / ESSAY\n`;
      essayQuestions.forEach((q, idx) => {
        content += `\n${pgQuestions.length + idx + 1}. ${q.questionText}\n   (Bobot: ${q.scoreWeight || 5} Poin)\n`;
      });
    }

    if (viewMode === 'teacher_key') {
      content += `\n\n==================== KUNCI JAWABAN DAN PEMBAHASAN ====================\n`;
      questions.forEach((q, idx) => {
        content += `\nNo. ${idx + 1} | Kunci: ${q.correctAnswer}\nTopik: ${q.topic} (Level: ${q.cognitiveLevel})\nPembahasan:\n${q.explanation}\n`;
      });
    }

    navigator.clipboard.writeText(content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  // Download plain formatted document
  const handleDownloadTxt = () => {
    let content = `${headerConfig.agency}\n${headerConfig.schoolName}\n${headerConfig.schoolAddress}\n\n`;
    content += `MATA PELAJARAN : ${headerConfig.subject}\nKELAS          : ${headerConfig.grade}\nWAKTU          : ${headerConfig.timeAllocation}\nTANGGAL        : ${headerConfig.dateStr}\n\n`;
    content += `--------------------------------------------------------------------------------\n\n`;
    
    questions.forEach((q, i) => {
      content += `${i + 1}. ${q.questionText}\n`;
      if (q.questionType === 'pilihan_ganda') {
        q.options.forEach((opt) => {
          content += `   ${opt}\n`;
        });
      }
      content += '\n';
    });

    content += `\n================================================================================\n`;
    content += `KUNCI JAWABAN & PEMBAHASAN LENGKAP:\n`;
    questions.forEach((q, i) => {
      content += `\nNo. ${i + 1} [Kunci: ${q.correctAnswer}] (${q.cognitiveLevel})\n${q.explanation}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Naskah_Ujian_${headerConfig.subject}_Kelas_${headerConfig.grade}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Print Control Toolbar - Hidden in Print */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Pratinjau Naskah & Cetak PDF Otomatis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Standar naskah A4 resmi untuk fotokopi siswa, kunci evaluasi guru, dan matriks kisi-kisi.
            </p>
          </div>

          {/* Action Print Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh PDF Sekarang</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Dokumen (.txt)</span>
            </button>

            <button
              onClick={handleCopyDocument}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Naskah</span>
                </>
              )}
            </button>

            <button
              onClick={onShareLink}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copiedNotification ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Link Ujian Tersalin</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <span>Bagikan Link Ujian Siswa</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Mode Tabs & Layout Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          
          {/* 4 View Modes */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setViewMode('student_exam')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                viewMode === 'student_exam'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Naskah Ujian Siswa</span>
              </span>
            </button>

            <button
              onClick={() => setViewMode('teacher_key')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                viewMode === 'teacher_key'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>Kunci & Pembahasan Guru</span>
              </span>
            </button>

            <button
              onClick={() => setViewMode('kisi_kisi')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                viewMode === 'kisi_kisi'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-purple-600" />
                <span>Matriks Kisi-Kisi Soal</span>
              </span>
            </button>

            <button
              onClick={() => setViewMode('answer_sheet')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                viewMode === 'answer_sheet'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lembar Jawab Siswa (LJK)</span>
              </span>
            </button>
          </div>

          {/* Typography & Columns options */}
          <div className="flex items-center gap-3 text-xs">
            <label className="inline-flex items-center gap-1.5 text-slate-700 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={headerConfig.twoColumns}
                onChange={(e) => onUpdateHeaderConfig({ twoColumns: e.target.checked })}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>2 Kolom (Hemat Kertas)</span>
            </label>

            <div className="flex items-center gap-1 text-slate-500">
              <TypeIcon className="w-3.5 h-3.5" />
              <span>Ukuran Huruf:</span>
              <select
                value={headerConfig.fontSize}
                onChange={(e) => onUpdateHeaderConfig({ fontSize: e.target.value as any })}
                className="p-1 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-800"
              >
                <option value="sm">Kecil (Kompak)</option>
                <option value="base">Standar (11pt)</option>
                <option value="lg">Besar (12pt)</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* ==================== PAPER PREVIEW CONTAINER ==================== */}
      <div className="bg-slate-200 p-4 sm:p-8 rounded-2xl flex justify-center overflow-x-auto">
        <div 
          className={`print-page bg-white shadow-xl rounded-sm p-8 sm:p-12 text-black max-w-[210mm] w-full min-h-[297mm] exam-paper-preview ${
            headerConfig.fontSize === 'sm' ? 'text-[13px] leading-tight' : headerConfig.fontSize === 'lg' ? 'text-[16px] leading-relaxed' : 'text-[14px] leading-normal'
          }`}
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >

          {/* ==================== 1. NASKAH UJIAN SISWA ==================== */}
          {viewMode === 'student_exam' && (
            <div className="space-y-6">
              
              {/* Kop Surat Resmi */}
              <div className="text-center space-y-1 pb-4 kop-double-line">
                <div className="flex items-center justify-between">
                  {/* Left School Emblem placeholder */}
                  <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs p-1 text-center shrink-0">
                    TUT WURI
                  </div>

                  {/* Header text */}
                  <div className="space-y-0.5 flex-1 px-4">
                    <h4 className="text-xs uppercase tracking-wider font-semibold">{headerConfig.province || 'PEMERINTAH DAERAH'}</h4>
                    <h3 className="text-sm uppercase tracking-wide font-bold">{headerConfig.agency}</h3>
                    <h2 className="text-lg uppercase tracking-tight font-extrabold">{headerConfig.schoolName}</h2>
                    <p className="text-[11px] italic">{headerConfig.schoolAddress}</p>
                  </div>

                  {/* Right Emblem placeholder */}
                  <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs p-1 text-center shrink-0">
                    SMP {headerConfig.grade}
                  </div>
                </div>
              </div>

              {/* Judul Ujian */}
              <div className="text-center space-y-0.5">
                <h3 className="text-base font-bold uppercase tracking-wider">{headerConfig.examTitle}</h3>
                <p className="text-xs font-semibold uppercase">{headerConfig.academicYear}</p>
              </div>

              {/* Identitas Ujian & Siswa Grid */}
              <div className="border border-black p-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                <div>
                  <span className="inline-block w-28">Mata Pelajaran</span>
                  <span>: <strong>{headerConfig.subject}</strong></span>
                </div>
                <div>
                  <span className="inline-block w-28">Nama Siswa</span>
                  <span>: .................................................</span>
                </div>

                <div>
                  <span className="inline-block w-28">Kelas / Semester</span>
                  <span>: <strong>Kelas {headerConfig.grade} SMP</strong></span>
                </div>
                <div>
                  <span className="inline-block w-28">Nomor Absen/Peserta</span>
                  <span>: .................................................</span>
                </div>

                <div>
                  <span className="inline-block w-28">Hari, Tanggal</span>
                  <span>: {headerConfig.dateStr}</span>
                </div>
                <div>
                  <span className="inline-block w-28">Ruang / Kelas</span>
                  <span>: .................................................</span>
                </div>

                <div>
                  <span className="inline-block w-28">Alokasi Waktu</span>
                  <span>: {headerConfig.timeAllocation}</span>
                </div>
                <div>
                  <span className="inline-block w-28">Nilai Evaluasi</span>
                  <span>: [ ________ ]  (Paraf: ____ )</span>
                </div>
              </div>

              {/* Petunjuk Umum */}
              <div className="bg-slate-50 border border-black/40 p-3 text-xs space-y-1">
                <div className="font-bold underline">PETUNJUK UMUM:</div>
                <ol className="list-decimal list-inside space-y-0.5 text-black">
                  {headerConfig.generalInstructions.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ol>
              </div>

              {/* Bagian I: Pilihan Ganda */}
              {pgQuestions.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="font-bold border-b border-black pb-1 uppercase tracking-wide text-xs">
                    I. PILIHAN GANDA (Pilihlah salah satu jawaban yang paling tepat dengan menyilang huruf A, B, C, atau D!)
                  </div>

                  <div className={headerConfig.twoColumns ? 'print-columns space-y-4' : 'space-y-4'}>
                    {pgQuestions.map((q, idx) => (
                      <div key={q.id} className="avoid-break space-y-1.5 text-justify">
                        <div className="flex items-start gap-1.5">
                          <span className="font-bold shrink-0">{idx + 1}.</span>
                          <span className="whitespace-pre-line">{q.questionText}</span>
                        </div>

                        {/* Options A, B, C, D */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-5 text-xs">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className="font-normal">
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bagian II: Soal Uraian / Essay */}
              {essayQuestions.length > 0 && (
                <div className="space-y-4 pt-4 avoid-break">
                  <div className="font-bold border-b border-black pb-1 uppercase tracking-wide text-xs">
                    II. URAIAN / ESSAY (Jawablah pertanyaan berikut dengan singkat, jelas, dan sistematis!)
                  </div>

                  <div className="space-y-6">
                    {essayQuestions.map((q, idx) => (
                      <div key={q.id} className="avoid-break space-y-2">
                        <div className="flex items-start gap-1.5">
                          <span className="font-bold shrink-0">{pgQuestions.length + idx + 1}.</span>
                          <div>
                            <span className="whitespace-pre-line">{q.questionText}</span>
                            <span className="text-[11px] italic font-semibold ml-2">[Bobot: {q.scoreWeight || 5} Poin]</span>
                          </div>
                        </div>

                        {/* Blank answer line lines for students */}
                        <div className="space-y-3 pt-2 pl-5">
                          <div className="border-b border-dotted border-black/40 h-4"></div>
                          <div className="border-b border-dotted border-black/40 h-4"></div>
                          <div className="border-b border-dotted border-black/40 h-4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Selamat Mengerjakan */}
              <div className="pt-8 text-center text-xs italic font-bold border-t border-black/40">
                *** Selamat Mengerjakan, Junjung Tinggi Kejujuran dan Prestasi ***
              </div>

            </div>
          )}

          {/* ==================== 2. KUNCI JAWABAN & PEMBAHASAN GURU ==================== */}
          {viewMode === 'teacher_key' && (
            <div className="space-y-6">
              <div className="text-center space-y-1 pb-3 border-b-2 border-black">
                <h3 className="text-xs uppercase font-bold text-slate-600">DOKUMEN PEGANGAN GURU / TIM PENILAI</h3>
                <h2 className="text-lg uppercase font-black">LEMBAR KUNCI JAWABAN & PEDOMAN PENSKORAN</h2>
                <p className="text-xs">{headerConfig.subject} · Kelas {headerConfig.grade} SMP · {headerConfig.academicYear}</p>
              </div>

              {/* Quick Answer Key Matrix Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase underline">Tabel Kunci Jawaban Cepat (Pilihan Ganda):</h4>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center text-xs font-mono">
                  {pgQuestions.map((q, idx) => (
                    <div key={q.id} className="border border-black p-1 bg-slate-50">
                      <div className="text-[10px] text-slate-500 font-sans">No {idx + 1}</div>
                      <div className="font-black text-sm text-black">{q.correctAnswer}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Question-by-Question Explanations */}
              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-xs uppercase underline">Pembahasan Terperinci & Rubrik Evaluasi Pembelajaran:</h4>
                <div className="space-y-4">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="avoid-break border border-black/50 p-3.5 space-y-2 bg-white">
                      <div className="flex items-center justify-between text-xs font-bold border-b border-black/20 pb-1">
                        <span>Nomor {idx + 1} ({q.questionType.toUpperCase()})</span>
                        <span className="bg-black text-white px-2 py-0.5 rounded text-[11px]">
                          Kunci: {q.correctAnswer} (Bobot: {q.scoreWeight || 2} Poin)
                        </span>
                      </div>

                      <div className="text-xs italic text-slate-700">
                        <strong>Stimulus Soal:</strong> {q.questionText}
                      </div>

                      <div className="text-xs bg-slate-50 p-2.5 border border-slate-200 rounded font-mono text-[11px] whitespace-pre-line leading-relaxed">
                        <strong className="font-sans text-black">Langkah Pembahasan:</strong>
                        {'\n'}{q.explanation}
                      </div>

                      <div className="text-[11px] text-slate-600 flex flex-wrap gap-3">
                        <span><strong>Materi:</strong> {q.topic}</span>
                        <span>·</span>
                        <span><strong>Level Kognitif:</strong> {q.cognitiveLevel}</span>
                        <span>·</span>
                        <span><strong>Indikator:</strong> {q.indicator}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. KISI-KISI SOAL UJIAN ==================== */}
          {viewMode === 'kisi_kisi' && (
            <div className="space-y-6">
              <div className="text-center space-y-1 pb-3 border-b-2 border-black">
                <h3 className="text-xs uppercase font-bold text-slate-600">FORMAT KISI-KISI PENULISAN SOAL</h3>
                <h2 className="text-base uppercase font-black">{headerConfig.schoolName}</h2>
                <p className="text-xs">Mata Pelajaran: {headerConfig.subject} | Kelas: {headerConfig.grade} | Tahun: {headerConfig.academicYear}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-black text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-center font-bold">
                      <th className="border border-black p-2 w-10">No</th>
                      <th className="border border-black p-2">Materi Pokok / CP</th>
                      <th className="border border-black p-2">Indikator Soal</th>
                      <th className="border border-black p-2 w-24">Level Kognitif</th>
                      <th className="border border-black p-2 w-20">Bentuk</th>
                      <th className="border border-black p-2 w-16">No Soal</th>
                      <th className="border border-black p-2 w-16">Kunci</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((q, idx) => (
                      <tr key={q.id} className="align-top hover:bg-slate-50">
                        <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                        <td className="border border-black p-2">{q.topic}</td>
                        <td className="border border-black p-2 text-[11px]">{q.indicator}</td>
                        <td className="border border-black p-2 text-center text-[11px]">{q.cognitiveLevel}</td>
                        <td className="border border-black p-2 text-center uppercase text-[10px]">{q.questionType === 'pilihan_ganda' ? 'PG' : 'Uraian'}</td>
                        <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                        <td className="border border-black p-2 text-center font-bold">{q.correctAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between pt-8 text-xs text-center avoid-break">
                <div>
                  <p>Mengetahui,</p>
                  <p>Kepala {headerConfig.schoolName}</p>
                  <div className="h-16"></div>
                  <p className="font-bold underline">___________________________</p>
                  <p>NIP. ........................................</p>
                </div>

                <div>
                  <p>{headerConfig.schoolAddress.split(',')[0] || 'Kota'}, {headerConfig.dateStr}</p>
                  <p>Guru Mata Pelajaran,</p>
                  <div className="h-16"></div>
                  <p className="font-bold underline">___________________________</p>
                  <p>NIP. ........................................</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 4. LEMBAR JAWAB SISWA (LJK) ==================== */}
          {viewMode === 'answer_sheet' && (
            <div className="space-y-6">
              <div className="text-center space-y-1 pb-3 border-b-2 border-black">
                <h3 className="text-xs uppercase font-bold text-slate-600">{headerConfig.schoolName}</h3>
                <h2 className="text-base uppercase font-black">LEMBAR JAWAB PENILAIAN SISWA (LJK)</h2>
                <p className="text-xs">{headerConfig.subject} · Kelas {headerConfig.grade} SMP · {headerConfig.academicYear}</p>
              </div>

              {/* Identity Form */}
              <div className="border border-black p-3 grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div>Nama Lengkap : ....................................................</div>
                  <div>Nomor Absen  : ....................................................</div>
                </div>
                <div className="space-y-2">
                  <div>Kelas / Ruang: ....................................................</div>
                  <div>Tanda Tangan : ....................................................</div>
                </div>
              </div>

              {/* LJK Multiple Choice Grid */}
              <div className="space-y-3 pt-2">
                <div className="font-bold text-xs uppercase border-b pb-1">I. LEMBAR JAWAB PILIHAN GANDA (Beri tanda silang (X) pada huruf yang dipilih):</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-1.5 text-xs">
                  {pgQuestions.map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-black/20 pb-1">
                      <span className="font-bold w-6">{idx + 1}.</span>
                      <div className="flex items-center gap-2 font-mono font-bold">
                        <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">A</span>
                        <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">B</span>
                        <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">C</span>
                        <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">D</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Essay Ruang Jawab */}
              {essayQuestions.length > 0 && (
                <div className="space-y-3 pt-4 avoid-break">
                  <div className="font-bold text-xs uppercase border-b pb-1">II. LEMBAR JAWAB URAIAN / ESSAY:</div>
                  <div className="space-y-4">
                    {essayQuestions.map((_, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-xs font-bold">Nomor {pgQuestions.length + idx + 1}:</div>
                        <div className="border border-black p-2 min-h-24 rounded-xs bg-slate-50/20"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
