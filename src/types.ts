export type GradeLevel = '7' | '8' | '9';

export type Subject =
  | 'Matematika'
  | 'Ilmu Pengetahuan Alam (IPA)'
  | 'Bahasa Indonesia'
  | 'Bahasa Inggris'
  | 'Ilmu Pengetahuan Sosial (IPS)'
  | 'Pendidikan Pancasila'
  | 'Informatika'
  | 'IQRA / Baca Tulis Al-Qur\'an (BTQ)'
  | 'Bimbingan Konseling (BK)'
  | 'Seni Budaya';

export type Curriculum = 'Kurikulum Merdeka' | 'Kurikulum 2013';

export type QuestionType = 'pilihan_ganda' | 'uraian' | 'isian';

export interface Question {
  id: string;
  grade: GradeLevel;
  subject: Subject;
  curriculum: Curriculum;
  topic: string;
  questionText: string;
  questionType: QuestionType;
  options: string[]; // ['A. ...', 'B. ...', 'C. ...', 'D. ...']
  correctAnswer: string; // 'A', 'B', 'C', 'D' or string answer
  explanation: string;
  cognitiveLevel: string; // e.g. 'C2 - Memahami', 'C4 - Menganalisis'
  isHots: boolean;
  indicator: string; // Indikator soal untuk kisi-kisi
  scoreWeight?: number; // default: 2 for PG, 5 for essay
}

export interface ExamHeaderConfig {
  province: string;
  agency: string;
  schoolName: string;
  schoolAddress: string;
  examTitle: string;
  academicYear: string;
  subject: Subject;
  grade: GradeLevel;
  dateStr: string;
  timeAllocation: string;
  generalInstructions: string[];
  showScoreTable: boolean;
  twoColumns: boolean;
  fontSize: 'sm' | 'base' | 'lg';
}

export interface StudentSubmission {
  studentName: string;
  studentClass: string;
  studentNumber: string;
  answers: Record<string, string>;
  submittedAt: string;
  score: number;
  totalScore: number;
  maxScore: number;
}
