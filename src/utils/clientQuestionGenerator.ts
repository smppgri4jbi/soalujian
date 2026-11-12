import { Question, GradeLevel, Subject, Curriculum } from '../types';
import { defaultBankSoal } from '../data/defaultBankSoal';

export function generateClientQuestions({
  grade,
  subject,
  curriculum = 'Kurikulum Merdeka',
  count = 10,
  topic = 'Materi Pembelajaran Terpadu',
  questionType = 'pilihan_ganda',
}: {
  grade: GradeLevel;
  subject: Subject;
  curriculum?: Curriculum;
  count?: number;
  topic?: string;
  questionType?: 'pilihan_ganda' | 'uraian' | 'isian';
}): Question[] {
  const matching = defaultBankSoal.filter(
    (q) => q.subject === subject || q.grade === grade
  );
  const subjectOnly = defaultBankSoal.filter((q) => q.subject === subject);
  const pool = subjectOnly.length > 0 ? subjectOnly : matching.length > 0 ? matching : defaultBankSoal;

  const targetCount = Math.min(Math.max(count || 10, 1), 50);
  const results: Question[] = [];

  for (let i = 0; i < targetCount; i++) {
    const base = pool[i % pool.length];
    const itemNum = i + 1;
    const isVary = i >= pool.length;

    results.push({
      ...base,
      id: `client-${Date.now()}-${itemNum}`,
      grade,
      subject,
      curriculum,
      topic: isVary ? `${topic} - Bagian ${Math.ceil(itemNum / 5)}` : (base.topic || topic),
      questionText: isVary ? `[Soal Mandiri #${itemNum}] ${base.questionText}` : base.questionText,
      explanation: isVary ? `[Langkah Evaluasi #${itemNum}]:\n${base.explanation}` : base.explanation,
      questionType: base.questionType || questionType,
      scoreWeight: questionType === 'pilihan_ganda' ? 2 : 5,
    });
  }

  return results;
}
