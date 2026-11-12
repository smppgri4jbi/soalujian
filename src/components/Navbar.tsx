import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  Printer, 
  GraduationCap, 
  Share2,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'bank' | 'builder' | 'generator' | 'print' | 'student';
  setActiveTab: (tab: 'bank' | 'builder' | 'generator' | 'print' | 'student') => void;
  selectedCount: number;
  onQuickPrint: () => void;
  onShareLink: () => void;
  onOpenFastGenerator: () => void;
  copiedNotification: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCount,
  onQuickPrint,
  onShareLink,
  onOpenFastGenerator,
  copiedNotification,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('bank')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">BankSoal SMP</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Kelas 7 · 8 · 9
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Kurikulum Merdeka & K13 Terpadu</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'bank'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bank Soal</span>
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'builder'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Naskah Ujian</span>
              {selectedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-xs font-bold rounded-full bg-blue-600 text-white">
                  {selectedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'generator'
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('print')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'print'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Pratinjau & PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'student'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Mode Siswa (CBT)</span>
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenFastGenerator}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
              title="Buat naskah ujian 10 s/d 50 soal langsung jadi"
            >
              <span>⚡ Buat Kilat (s/d 50 Soal)</span>
            </button>

            <button
              onClick={onShareLink}
              title="Salin Link Ujian Siswa"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copiedNotification ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Tautan Disalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan Link</span>
                </>
              )}
            </button>

            <button
              onClick={onQuickPrint}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak PDF</span>
              <span className="sm:hidden">Cetak</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
