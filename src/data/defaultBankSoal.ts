import { Question } from '../types';

export const defaultBankSoal: Question[] = [
  // ==================== MATEMATIKA ====================
  // Kelas 7 Matematika
  {
    id: 'mat-7-01',
    grade: '7',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Bilangan Bulat dan Pecahan',
    questionType: 'pilihan_ganda',
    questionText: 'Suhu di dalam ruang pendingin daging awalnya adalah -12°C. Karena terjadi pemadaman listrik selama 4 jam, suhu ruangan tersebut naik sebesar 3°C setiap 30 menit. Berapakah suhu akhir di dalam ruang pendingin tersebut?',
    options: [
      'A. -24°C',
      'B. 0°C',
      'C. 12°C',
      'D. 24°C'
    ],
    correctAnswer: 'C',
    explanation: 'Waktu mati lampu = 4 jam = 8 kali 30 menit.\nKenaikan suhu total = 8 × 3°C = +24°C.\nSuhu akhir = Suhu awal + Kenaikan = -12°C + 24°C = 12°C.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menyelesaikan masalah kontekstual yang berkaitan dengan operasi hitung bilangan bulat.',
    scoreWeight: 2,
  },
  {
    id: 'mat-7-02',
    grade: '7',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Bentuk Aljabar',
    questionType: 'pilihan_ganda',
    questionText: 'Bentuk sederhana dari operasi aljabar 4(2x - 3y) - 3(x - 5y) adalah ...',
    options: [
      'A. 5x + 3y',
      'B. 5x - 3y',
      'C. 5x + 27y',
      'D. 11x - 27y'
    ],
    correctAnswer: 'A',
    explanation: '4(2x - 3y) - 3(x - 5y) = 8x - 12y - 3x + 15y = (8x - 3x) + (-12y + 15y) = 5x + 3y.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik mampu menyederhanakan bentuk aljabar linier satu dan dua variabel.',
    scoreWeight: 2,
  },
  {
    id: 'mat-7-03',
    grade: '7',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Perbandingan dan Skala',
    questionType: 'pilihan_ganda',
    questionText: 'Sebuah proyek pembangunan jembatan direncanakan selesai dalam waktu 30 hari oleh 15 orang pekerja. Setelah dikerjakan selama 10 hari, pekerjaan terhenti selama 5 hari karena cuaca buruk. Agar proyek selesai tepat waktu, banyak pekerja tambahan yang diperlukan adalah ...',
    options: [
      'A. 5 orang',
      'B. 10 orang',
      'C. 15 orang',
      'D. 20 orang'
    ],
    correctAnswer: 'A',
    explanation: 'Sisa hari normal = 30 - 10 = 20 hari untuk 15 pekerja. Total beban kerja sisa = 20 × 15 = 300 orang-hari.\nSisa hari yang tersedia setelah libur 5 hari = 20 - 5 = 15 hari.\nJumlah pekerja yang dibutuhkan = 300 / 15 = 20 orang pekerja.\nTambahan pekerja = 20 - 15 = 5 orang.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis dan memecahkan masalah perbandingan berbalik nilai dengan kondisi jeda waktu.',
    scoreWeight: 3,
  },

  // Kelas 8 Matematika
  {
    id: 'mat-8-01',
    grade: '8',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Teorema Pythagoras',
    questionType: 'pilihan_ganda',
    questionText: 'Sebuah kapal berlayar ke arah utara sejauh 24 km, kemudian berbelok ke arah barat sejauh 10 km. Jarak terdekat kapal sekarang dari titik awal keberangkatan adalah ...',
    options: [
      'A. 26 km',
      'B. 28 km',
      'C. 34 km',
      'D. 36 km'
    ],
    correctAnswer: 'A',
    explanation: 'Arah utara dan barat membentuk sudut 90° (siku-siku).\nMenggunakan Teorema Pythagoras: Jarak = √(24² + 10²) = √(576 + 100) = √676 = 26 km.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menerapkan Teorema Pythagoras untuk menentukan jarak terdekat.',
    scoreWeight: 2,
  },
  {
    id: 'mat-8-02',
    grade: '8',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Sistem Persamaan Linier Dua Variabel (SPLDV)',
    questionType: 'pilihan_ganda',
    questionText: 'Di koperasi sekolah, Ahmad membeli 3 buku tulis dan 2 pulpen seharga Rp16.500,00. Di tempat yang sama, Budi membeli 2 buku tulis dan 4 pulpen seharga Rp19.000,00. Harga 1 buku tulis dan 1 pulpen adalah ...',
    options: [
      'A. Rp5.500,00',
      'B. Rp6.000,00',
      'C. Rp6.500,00',
      'D. Rp7.000,00'
    ],
    correctAnswer: 'C',
    explanation: 'Misal buku = x, pulpen = y.\n(1) 3x + 2y = 16.500 | ×2 => 6x + 4y = 33.000\n(2) 2x + 4y = 19.000 | ×1 => 2x + 4y = 19.000\nEliminasi y: 4x = 14.000 => x = 3.500 (harga 1 buku).\nSubstitusi ke (1): 3(3.500) + 2y = 16.500 => 10.500 + 2y = 16.500 => 2y = 6.000 => y = 3.000 (harga 1 pulpen).\nHarga 1 buku + 1 pulpen = 3.500 + 3.000 = Rp6.500,00.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: true,
    indicator: 'Peserta didik mampu menyelesaikan masalah kontekstual menggunakan SPLDV.',
    scoreWeight: 2,
  },
  {
    id: 'mat-8-03',
    grade: '8',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Relasi dan Fungsi',
    questionType: 'uraian',
    questionText: 'Suatu fungsi dirumuskan dengan f(x) = ax + b. Jika diketahui f(2) = 7 dan f(-1) = -2:\na. Tentukan nilai a dan b!\nb. Tuliskan rumus fungsinya!\nc. Hitunglah nilai f(5)!',
    options: [],
    correctAnswer: 'a. a = 3, b = 1; b. f(x) = 3x + 1; c. f(5) = 16',
    explanation: 'Langkah penyelesaian:\na. f(2) = 2a + b = 7\n   f(-1) = -a + b = -2\n   Kurangkan kedua persamaan: 3a = 9 => a = 3.\n   Substitusi a: 2(3) + b = 7 => 6 + b = 7 => b = 1.\nb. Rumus fungsi: f(x) = 3x + 1.\nc. f(5) = 3(5) + 1 = 15 + 1 = 16.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis nilai konstanta fungsi linear dan menghitung nilai fungsi untuk domain tertentu.',
    scoreWeight: 5,
  },

  // Kelas 9 Matematika
  {
    id: 'mat-9-01',
    grade: '9',
    subject: 'Matematika',
    curriculum: 'Kurikulum 2013',
    topic: 'Perpangkatan dan Bentuk Akar',
    questionType: 'pilihan_ganda',
    questionText: 'Bentuk rasional dari pecahan 12 / (3 - √3) adalah ...',
    options: [
      'A. 6 + 2√3',
      'B. 6 - 2√3',
      'C. 4 + 2√3',
      'D. 2 + 2√3'
    ],
    correctAnswer: 'A',
    explanation: 'Kalikan dengan bentuk sekawan (3 + √3)/(3 + √3):\n= 12(3 + √3) / (3² - (√3)²)\n= 12(3 + √3) / (9 - 3)\n= 12(3 + √3) / 6\n= 2(3 + √3) = 6 + 2√3.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat merasionalkan bentuk akar penyebut pecahan kuadrat.',
    scoreWeight: 2,
  },
  {
    id: 'mat-9-02',
    grade: '9',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Persamaan dan Fungsi Kuadrat',
    questionType: 'pilihan_ganda',
    questionText: 'Akar-akar dari persamaan kuadrat x² - 5x + 6 = 0 adalah p dan q dengan p > q. Nilai dari 2p - 3q adalah ...',
    options: [
      'A. -1',
      'B. 0',
      'C. 1',
      'D. 2'
    ],
    correctAnswer: 'B',
    explanation: 'Faktorkan x² - 5x + 6 = 0 => (x - 3)(x - 2) = 0.\nMaka x = 3 atau x = 2.\nKarena p > q, maka p = 3 dan q = 2.\nNilai 2p - 3q = 2(3) - 3(2) = 6 - 6 = 0.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat menentukan akar persamaan kuadrat dan menyelesaikan operasi aritmetika akar-akarnya.',
    scoreWeight: 2,
  },
  {
    id: 'mat-9-03',
    grade: '9',
    subject: 'Matematika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Bangun Ruang Sisi Lengkung',
    questionType: 'uraian',
    questionText: 'Sebuah kaleng biskuit berbentuk tabung memiliki jari-jari alas 7 cm dan tinggi 20 cm. Jika kaleng tersebut akan dilapisi kertas kado pada seluruh permukaan luarnya, hitunglah:\na. Luas selimut tabung (π = 22/7)\nb. Luas seluruh permukaan kaleng biskuit tersebut!',
    options: [],
    correctAnswer: 'a. Luas selimut = 880 cm²; b. Luas permukaan = 1.188 cm²',
    explanation: 'Diketahui: r = 7 cm, t = 20 cm, π = 22/7.\na. Luas selimut = 2 × π × r × t = 2 × (22/7) × 7 × 20 = 880 cm².\nb. Luas permukaan tabung = 2 × π × r × (r + t) = 2 × (22/7) × 7 × (7 + 20) = 44 × 27 = 1.188 cm².',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menghitung luas selimut dan luas permukaan tabung dengan rumus matematis yang tepat.',
    scoreWeight: 5,
  },

  // ==================== ILMU PENGETAHUAN ALAM (IPA) ====================
  // Kelas 7 IPA
  {
    id: 'ipa-7-01',
    grade: '7',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Zat dan Perubahannya',
    questionType: 'pilihan_ganda',
    questionText: 'Perhatikan beberapa fenomena berikut!\n(1) Kamfer yang disimpan di lemari lama-kelamaan habis mengecil.\n(2) Bensin yang dibiarkan di wadah terbuka akan berkurang volumenya.\n(3) Besi pagar rumah berkarat karena terkena air hujan dan udara.\n(4) Singkong yang difermentasi menjadi tape manis.\nPerubahan kimia ditunjukkan oleh nomor ...',
    options: [
      'A. (1) dan (2)',
      'B. (1) dan (3)',
      'C. (2) dan (4)',
      'D. (3) dan (4)'
    ],
    correctAnswer: 'D',
    explanation: 'Perubahan fisika: (1) Menyublim dan (2) Menguap (hanya perubahan wujud tanpa zat baru).\nPerubahan kimia: (3) Korosi besi (terbentuk oksida besi Fe2O3) dan (4) Fermentasi ragi (terbentuk senyawa alkohol & glukosa baru). Maka nomor (3) dan (4) adalah perubahan kimia.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik mampu mengklasifikasikan perubahan fisika dan perubahan kimia pada peristiwa sehari-hari.',
    scoreWeight: 2,
  },
  {
    id: 'ipa-7-02',
    grade: '7',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Ekosistem dan Interaksi Makhluk Hidup',
    questionType: 'pilihan_ganda',
    questionText: 'Di sebuah ekosistem persawahan, populasi katak mengalami penurunan drastis akibat perburuan liar. Dampak langsung jangka pendek yang paling mungkin terjadi pada rantai makanan sawah tersebut adalah ...',
    options: [
      'A. Populasi ular bertambah, populasi belalang berkurang',
      'B. Populasi belalang meningkat, populasi ular menurun',
      'C. Hasil panen padi meningkat pesat',
      'D. Populasi burung elang bertambah pesat'
    ],
    correctAnswer: 'B',
    explanation: 'Rantai makanan: Padi -> Belalang -> Katak -> Ular -> Elang.\nJika populasi katak menurun drastis:\n1. Predator belalang berkurang, sehingga populasi belalang melonjak (meningkat).\n2. Mangsa ular berkurang, sehingga populasi ular akan menurun karena kekurangan sumber makanan.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis dampak ketidakseimbangan populasi dalam rantai makanan ekosistem.',
    scoreWeight: 2,
  },

  // Kelas 8 IPA
  {
    id: 'ipa-8-01',
    grade: '8',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Sistem Pencernaan Manusia',
    questionType: 'pilihan_ganda',
    questionText: 'Seorang siswa melakukan uji laboratorium terhadap sampel makanan X dengan hasil sebagai berikut:\n- Ditetesi Reagen Biuret menghasilkan warna ungu pekat.\n- Ditetesi Lugol menghasilkan warna cokelat terang (tidak membiru).\nBerdasarkan hasil uji tersebut, sampel makanan X mengandung nutrisi ... dan proses pencernaan kimiawinya pertama kali terjadi di organ ...',
    options: [
      'A. Karbohidrat, mulut oleh enzim ptialin',
      'B. Protein, lambung oleh enzim pepsin',
      'C. Lemak, usus halus oleh enzim lipase',
      'D. Glukosa, usus halus oleh enzim maltase'
    ],
    correctAnswer: 'B',
    explanation: 'Reagen Biuret yang menghasilkan warna ungu merupakan indikator positif adanya kandungan PROTEIN.\nUji Lugol negatif menunjukkan tidak ada amilum/karbohidrat.\nProtein pertama kali mengalami pencernaan kimiawi di lambung dengan bantuan asam klorida (HCl) dan enzim pepsin menjadi pepton.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis hasil uji reagen nutrisi makanan dan organ pencernaan kimiawinya.',
    scoreWeight: 2,
  },
  {
    id: 'ipa-8-02',
    grade: '8',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Hukum Newton dan Gerak Benda',
    questionType: 'pilihan_ganda',
    questionText: 'Sebuah balok bermassa 5 kg ditarik ke kanan dengan gaya F1 = 30 N dan ditahan ke kiri dengan gaya gesek F2 = 10 N. Percepatan yang dialami oleh balok tersebut adalah ...',
    options: [
      'A. 2 m/s²',
      'B. 4 m/s²',
      'C. 6 m/s²',
      'D. 8 m/s²'
    ],
    correctAnswer: 'B',
    explanation: 'Resultan gaya (ΣF) = F1 - F2 = 30 N - 10 N = 20 N ke arah kanan.\nMenggunakan Hukum II Newton: a = ΣF / m = 20 N / 5 kg = 4 m/s².',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik mampu menghitung percepatan gerak benda menggunakan Hukum II Newton.',
    scoreWeight: 2,
  },

  // Kelas 9 IPA
  {
    id: 'ipa-9-01',
    grade: '9',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    curriculum: 'Kurikulum 2013',
    topic: 'Pewarisan Sifat (Genetika)',
    questionType: 'pilihan_ganda',
    questionText: 'Kelinci berambut hitam dominan (HH) disilangkan dengan kelinci berambut putih resesif (hh). Seluruh keturunan F1 memiliki rambut hitam. Jika sesama F1 disilangkan, persentase kemungkinan diperoleh keturunan F2 yang bergenotipe heterozigot (Hh) adalah ...',
    options: [
      'A. 25%',
      'B. 50%',
      'C. 75%',
      'D. 100%'
    ],
    correctAnswer: 'B',
    explanation: 'P1: HH × hh => F1: 100% Hh (hitam).\nP2: Hh × Hh.\nKombinasi F2: 1 HH : 2 Hh : 1 hh (Rasio genotipe 1:2:1).\nPersentase genotipe heterozigot (Hh) = 2/4 × 100% = 50%.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menentukan persentase genotipe keturunan pada persilangan monohibrid dominan penuh.',
    scoreWeight: 2,
  },
  {
    id: 'ipa-9-02',
    grade: '9',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Listrik Dinamis dalam Kehidupan Sehari-hari',
    questionType: 'uraian',
    questionText: 'Dalam sebuah rumah tangga digunakan 4 buah lampu masing-masing 25 Watt menyala 10 jam sehari, dan 1 buah TV 100 Watt menyala 5 jam sehari. Jika tarif energi listrik adalah Rp1.500,00 per kWh, hitunglah:\na. Energi listrik total yang dikonsumsi per hari (dalam kWh)\nb. Biaya tagihan pemakaian listrik selama 30 hari (1 bulan)!',
    options: [],
    correctAnswer: 'a. Energi harian = 1,5 kWh; b. Biaya bulanan = Rp67.500,00',
    explanation: 'Langkah penyelesaian:\na. Lampu = 4 × 25 W × 10 jam = 1.000 Wh\n   TV = 1 × 100 W × 5 jam = 500 Wh\n   Total energi per hari = 1.000 + 500 = 1.500 Wh = 1,5 kWh.\nb. Energi 30 hari = 1,5 kWh × 30 hari = 45 kWh.\n   Biaya bulanan = 45 kWh × Rp1.500,00 = Rp67.500,00.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menghitung konsumsi energi listrik rumah tangga dan total biaya pemakaian dalam satu bulan.',
    scoreWeight: 5,
  },

  // ==================== BAHASA INDONESIA ====================
  // Kelas 7 Bahasa Indonesia
  {
    id: 'indo-7-01',
    grade: '7',
    subject: 'Bahasa Indonesia',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Teks Deskripsi',
    questionType: 'pilihan_ganda',
    questionText: 'Bacalah kutipan teks berikut!\n"Pantai Parangtritis menyajikan pemandangan senja yang memikat hati. Deburan ombak yang bergulung putih berpadu dengan hembusan angin laut yang sepoi-sepoi membelai pipi. Lembayung kemerahan perlahan merayap di ufuk barat, menciptakan siluet megah bukit karang di kejauhan."\nKutipan teks di atas melibatkan pancaindra ...',
    options: [
      'A. Penglihatan, pendengaran, dan perabaan',
      'B. Penglihatan, penciuman, dan perabaan',
      'C. Pendengaran, penciuman, dan pengecapan',
      'D. Perabaan, penciuman, dan penglihatan'
    ],
    correctAnswer: 'A',
    explanation: '- Penglihatan: "pemandangan senja yang memikat", "lembayung kemerahan di ufuk barat", "siluet bukit karang".\n- Pendengaran: "deburan ombak yang bergulung".\n- Perabaan: "hembusan angin laut yang sepoi-sepoi membelai pipi".',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat mengidentifikasi penggunaan cerapan pancaindra dalam teks deskripsi.',
    scoreWeight: 2,
  },
  {
    id: 'indo-7-02',
    grade: '7',
    subject: 'Bahasa Indonesia',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Teks Prosedur',
    questionType: 'pilihan_ganda',
    questionText: 'Kalimat berikut yang menggunakan kalimat perintah (imperatif) halus dalam teks prosedur adalah ...',
    options: [
      'A. Campurkan adonan tepung dengan kecepatan tinggi!',
      'B. Alangkah baiknya jika Anda menyaring santan terlebih dahulu agar tekstur kue lebih lembut.',
      'C. Apakah Anda sudah memanaskan oven sebelum memasukkan loyang?',
      'D. Minyak goreng dimasukkan sedikit demi sedikit ke dalam wajan penggorengan.'
    ],
    correctAnswer: 'B',
    explanation: 'Kalimat perintah halus menggunakan kata ajakan atau saran yang santun seperti "alangkah baiknya jika", "sebaiknya", "disarankan", sehingga instruksi terkesan santun dan persuasif.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik mampu membedakan jenis kalimat instruksi imperatif dalam teks prosedur.',
    scoreWeight: 2,
  },

  // Kelas 8 Bahasa Indonesia
  {
    id: 'indo-8-01',
    grade: '8',
    subject: 'Bahasa Indonesia',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Teks Eksplanasi',
    questionType: 'pilihan_ganda',
    questionText: 'Bacalah teks berikut!\n"Hujan asam terjadi akibat tingginya konsentrasi gas sulfur dioksida (SO2) dan nitrogen oksida (NOx) di atmosfer yang dihasilkan dari pembakaran bahan bakar fosil. Gas-gas polutan tersebut bereaksi dengan uap air, oksigen, dan zat kimia lainnya membentuk asam sulfat dan asam nitrat. Saat kondensasi terjadi, senyawa asam tersebut turun bersama rintik hujan dan mengikis bangunan serta merusak biota perairan."\nKonjungsi kausalitas (sebab-akibat) yang terdapat pada teks tersebut adalah ...',
    options: [
      'A. Yang, dengan, saat',
      'B. Akibat, dihasilkan dari, serta',
      'C. Akibat, membentuk, saat',
      'D. Akibat, bereaksi dengan, dan'
    ],
    correctAnswer: 'B',
    explanation: 'Konjungsi atau penanda kausalitas menunjukkan hubungan sebab-akibat. Kata "akibat" secara eksplisit menyatakan akibat, dan "dihasilkan dari" menyatakan sumber/sebab terjadinya polusi.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menganalisis kaidah kebahasaan konjungsi kausalitas dalam teks eksplanasi ilmiah.',
    scoreWeight: 2,
  },
  {
    id: 'indo-8-02',
    grade: '8',
    subject: 'Bahasa Indonesia',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Teks Ulasan / Resensi Buku',
    questionType: 'uraian',
    questionText: 'Jelaskan struktur teks ulasan secara urut beserta fungsi masing-masing bagiannya dalam menilai sebuah karya sastra!',
    options: [],
    correctAnswer: 'Struktur teks ulasan: 1. Identitas karya; 2. Orientasi; 3. Sinopsis; 4. Analisis; 5. Evaluasi; 6. Rekomendasi/Rangkuman.',
    explanation: 'Struktur teks ulasan yang lengkap:\n1. Identitas Karya: mencantumkan judul, pengarang, penerbit, tahun terbit, tebal halaman.\n2. Orientasi: pengantar yang menjelaskan keberadaan karya dan reputasi penulis.\n3. Sinopsis: ringkasan cerita atau inti isi karya secara objektif.\n4. Analisis: paparan unsur-unsur karya (tema, tokoh, alur, gaya bahasa).\n5. Evaluasi: penilaian mendalam kelebihan dan kelemahan karya secara kritis.\n6. Rekomendasi: simpulan dan saran peruntukan bagi pembaca.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menguraikan struktur dan fungsi komponen teks ulasan secara sistematis.',
    scoreWeight: 5,
  },

  // Kelas 9 Bahasa Indonesia
  {
    id: 'indo-9-01',
    grade: '9',
    subject: 'Bahasa Indonesia',
    curriculum: 'Kurikulum 2013',
    topic: 'Teks Pidato Persuasif',
    questionType: 'pilihan_ganda',
    questionText: 'Perhatikan penggalan pidato berikut!\n"Hadirin yang saya hormati, menjaga kebersihan lingkungan sekolah bukan hanya tanggung jawab penjaga sekolah, melainkan kehormatan bagi kita semua sebagai warga akademisi. Bila sekolah kita bersih, udara segar akan senantiasa mengalir, pikiran menjadi jernih, dan semangat belajar pun terpacu. Oleh sebab itu, marilah kita budayakan memilah sampah dari ruang kelas kita sendiri!"\nBagian penggalan pidato di atas merupakan bagian struktur ...',
    options: [
      'A. Pembukaan / Salam pembuka',
      'B. Pernyataan posisi',
      'C. Penguatan pernyataan posisi dan ajakan bertindak',
      'D. Ucapan syukur'
    ],
    correctAnswer: 'C',
    explanation: 'Kutipan tersebut berisi argumen pendukung pentingnya kebersihan dan diakhiri dengan kalimat persuasif/ajakan eksplisit ("Oleh sebab itu, marilah kita budayakan..."). Ini adalah ciri utama penutup dan penguatan pernyataan posisi pada pidato persuasif.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis bagian struktur teks pidato persuasif.',
    scoreWeight: 2,
  },

  // ==================== BAHASA INGGRIS ====================
  // Kelas 7 Bahasa Inggris
  {
    id: 'ing-7-01',
    grade: '7',
    subject: 'Bahasa Inggris',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Describing People and Habits',
    questionType: 'pilihan_ganda',
    questionText: 'Read the short dialogue below!\nRian: "What is your brother like, Sarah?"\nSarah: "Well, he is very diligent. He always ... up at 05.00 AM and ... his bed neatly before taking a bath."\nThe correct words to complete the sentences are ...',
    options: [
      'A. wake - make',
      'B. wakes - makes',
      'C. waking - making',
      'D. woke - made'
    ],
    correctAnswer: 'B',
    explanation: 'Sarah is describing a daily habit (Simple Present Tense). The subject is "He" (third person singular), so the verbs require an -s/-es suffix: "wakes" and "makes".',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Students are able to apply the correct verb agreement in the Simple Present Tense for daily routines.',
    scoreWeight: 2,
  },

  // Kelas 8 Bahasa Inggris
  {
    id: 'ing-8-01',
    grade: '8',
    subject: 'Bahasa Inggris',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Recount Text',
    questionType: 'pilihan_ganda',
    questionText: 'Read the text carefully!\n"Last Sunday, my friends and I visited Mount Bromo. We woke up at 3:00 AM to catch the sunrise from King Kong Hill. When the sun slowly emerged from the horizon, the golden light reflected beautifully over the sea of sand. It was truly breathtaking. After taking lots of photos, we rode horses across the caldera before returning to our hotel."\nWhat is the main idea of the paragraph?',
    options: [
      'A. The writer bought horses at Mount Bromo',
      'B. The writer experienced a memorable sunrise journey at Mount Bromo',
      'C. The writer complained about waking up early at 3:00 AM',
      'D. The writer lost camera equipment on King Kong Hill'
    ],
    correctAnswer: 'B',
    explanation: 'The paragraph recounts the writer\'s unforgettable personal experience watching the stunning sunrise at Mount Bromo and riding horses across the caldera with friends.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Students can determine the main idea of a personal recount text.',
    scoreWeight: 2,
  },

  // Kelas 9 Bahasa Inggris
  {
    id: 'ing-9-01',
    grade: '9',
    subject: 'Bahasa Inggris',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Passive Voice in Report Text',
    questionType: 'pilihan_ganda',
    questionText: '"Komodo dragons are the largest living lizards on Earth. They ... mainly on the Indonesian islands of Komodo, Rinca, and Flores."\nThe appropriate passive form to complete the sentence is ...',
    options: [
      'A. is found',
      'B. are found',
      'C. were finding',
      'D. was found'
    ],
    correctAnswer: 'B',
    explanation: 'The sentence states a factual scientific truth in the present tense (Passive Voice: S + am/is/are + V3). The subject "They" (plural) takes "are", and the past participle of find is "found".',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Students are able to apply appropriate passive voice construction in factual scientific report text.',
    scoreWeight: 2,
  },

  // ==================== ILMU PENGETAHUAN SOSIAL (IPS) ====================
  // Kelas 7 IPS
  {
    id: 'ips-7-01',
    grade: '7',
    subject: 'Ilmu Pengetahuan Sosial (IPS)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Keluarga Awal Kehidupan dan Interaksi Keruangan',
    questionType: 'pilihan_ganda',
    questionText: 'Wilayah pegunungan menghasilkan aneka komoditas sayuran dan buah-buahan segar, sedangkan wilayah pesisir menghasilkan ikan laut dan garam. Kedua wilayah tersebut saling melakukan pertukaran komoditas melalui perdagangan. Interaksi antarruang ini terjadi terutama karena adanya kondisi ...',
    options: [
      'A. Kesempatan antara (intervening opportunity)',
      'B. Saling melengkapi (regional complementary)',
      'C. Kemudahan transfer (transferability)',
      'D. Kesamaan mata pencaharian'
    ],
    correctAnswer: 'B',
    explanation: 'Kondisi saling melengkapi (complementarity) terjadi ketika ada wilayah-wilayah yang memiliki surplus komoditas yang berbeda sehingga mendorong terjadinya interaksi perdagangan bilateral yang saling menguntungkan.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik mampu menjelaskan konsep kondisi saling melengkapi dalam interaksi antarruang.',
    scoreWeight: 2,
  },

  // Kelas 8 IPS
  {
    id: 'ips-8-01',
    grade: '8',
    subject: 'Ilmu Pengetahuan Sosial (IPS)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Keragaman Masyarakat Indonesia dan Mobilitas Sosial',
    questionType: 'pilihan_ganda',
    questionText: 'Pak Hendro awalnya adalah seorang buruh tani yang tidak memiliki lahan sendiri. Berkat ketekunan, program pelatihan kewirausahaan, dan pinjaman modal usaha tani, kini ia sukses menjadi eksportir buah naga organik dan mempekerjakan puluhan warga di desanya. Saluran mobilitas sosial vertikal naik yang dialami Pak Hendro terutama melalui saluran ...',
    options: [
      'A. Organisasi politik dan militer',
      'B. Lembaga keagamaan dan adat',
      'C. Lembaga pendidikan dan ekonomi',
      'D. Paguyuban keluarga'
    ],
    correctAnswer: 'C',
    explanation: 'Pelatihan kewirausahaan merupakan bagian dari saluran pendidikan/keterampilan nonformal, dan pengembangan usaha tani hingga menjadi eksportir merupakan saluran lembaga ekonomi yang menaikkan status sosial ekonominya.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis saluran-saluran mobilitas sosial vertikal ke atas dalam kehidupan bermasyarakat.',
    scoreWeight: 2,
  },

  // Kelas 9 IPS
  {
    id: 'ips-9-01',
    grade: '9',
    subject: 'Ilmu Pengetahuan Sosial (IPS)',
    curriculum: 'Kurikulum 2013',
    topic: 'Globalisasi dan Perubahan Sosial Budaya',
    questionType: 'uraian',
    questionText: 'Globalisasi membawa dampak positif sekaligus tantangan bagi kebudayaan lokal di Indonesia. Analisislah 3 upaya strategis yang dapat dilakukan oleh generasi muda SMP dalam mempertahankan kearifan lokal di tengah arus globalisasi budaya populer!',
    options: [],
    correctAnswer: 'Upaya: 1. Literasi budaya lokal; 2. Kreativitas digital mempromosikan tradisi; 3. Sikap selektif terhadap budaya asing berlandaskan Pancasila.',
    explanation: '3 Upaya strategis generasi muda:\n1. Mempelajari dan Mengapresiasi Seni Budaya Daerah: Aktif mengikuti ekstrakurikuler kesenian tradisional (seperti tari saman, gamelan, angklung) agar tidak punah.\n2. Mengemas Budaya Lokal Secara Kreatif Digital: Memanfaatkan media sosial untuk membuat konten video edukatif dan modern mengenai kuliner khas, cerita rakyat, dan busana daerah.\n3. Mengembangkan Sikap Selektif Berdasarkan Nilai Pancasila: Menyaring pengaruh budaya asing yang bertentangan dengan norma kesopanan dan gotong royong bangsa Indonesia.',
    cognitiveLevel: 'C5 - Mengevaluasi',
    isHots: true,
    indicator: 'Peserta didik dapat mengevaluasi dan merumuskan sikap solutif dalam melestarikan budaya lokal di era globalisasi.',
    scoreWeight: 5,
  },

  // ==================== PENDIDIKAN PANCASILA ====================
  // Kelas 7 PPKn
  {
    id: 'ppkn-7-01',
    grade: '7',
    subject: 'Pendidikan Pancasila',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Sejarah Kelahiran Pancasila dan Norma',
    questionType: 'pilihan_ganda',
    questionText: 'Dalam sidang BPUPK pertama pada tanggal 29 Mei - 1 Juni 1945, para pendiri bangsa mendiskusikan dasar negara Indonesia merdeka. Sikap keteladanan yang paling menonjol dari para tokoh pendiri bangsa saat mengatasi perbedaan pendapat adalah ...',
    options: [
      'A. Memaksakan pandangan kelompok mayoritas',
      'B. Mengutamakan persatuan, musyawarah mufakat, dan kepentingan bangsa di atas kepentingan pribadi/golongan',
      'C. Menolak berkompromi sebelum kepentingan daerah diakomodasi sepenuhnya',
      'D. Menyerahkan keputusan sepenuhnya kepada pihak pemerintah Jepang'
    ],
    correctAnswer: 'B',
    explanation: 'Para pendiri bangsa (the founding fathers) menunjukkan kedewasaan berdemokrasi dengan menjunjung tinggi musyawarah mufakat, kebesaran jiwa untuk berkompromi demi persatuan dan kesatuan Negara Kesatuan Republik Indonesia.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat mengidentifikasi nilai-nilai keteladanan para pendiri bangsa dalam perumusan Pancasila.',
    scoreWeight: 2,
  },

  // Kelas 8 PPKn
  {
    id: 'ppkn-8-01',
    grade: '8',
    subject: 'Pendidikan Pancasila',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Kedudukan dan Fungsi UUD NRI Tahun 1945',
    questionType: 'pilihan_ganda',
    questionText: 'UUD NRI Tahun 1945 berkedudukan sebagai hukum dasar tertinggi dalam tata urutan perundang-undangan di Indonesia. Konsekuensi hukum dari kedudukan tersebut adalah ...',
    options: [
      'A. Setiap undang-undang dan peraturan di bawahnya tidak boleh bertentangan dengan ketentuan UUD NRI 1945',
      'B. UUD NRI 1945 tidak dapat diubah sama sekali oleh lembaga manapun',
      'C. Presiden berwenang membatalkan pasal-pasal dalam UUD NRI 1945',
      'D. Peraturan Daerah memiliki kekuatan hukum lebih mengikat dibanding UUD NRI 1945'
    ],
    correctAnswer: 'A',
    explanation: 'Sebagai "supreme law of the land", segala norma hukum tertulis di bawah UUD NRI Tahun 1945 (UU, Perppu, PP, Perpres, Perda) hierarkinya bersumber dan tidak boleh bertentangan dengan nilai-nilai UUD NRI 1945.',
    cognitiveLevel: 'C4 - Menganalisis',
    isHots: true,
    indicator: 'Peserta didik dapat menganalisis kedudukan dan implikasi UUD NRI Tahun 1945 sebagai hukum dasar tertulis tertinggi.',
    scoreWeight: 2,
  },

  // Kelas 9 PPKn
  {
    id: 'ppkn-9-01',
    grade: '9',
    subject: 'Pendidikan Pancasila',
    curriculum: 'Kurikulum 2013',
    topic: 'Kedaulatan Negara Kesatuan Republik Indonesia',
    questionType: 'pilihan_ganda',
    questionText: 'Pasal 1 Ayat (2) UUD NRI Tahun 1945 menyatakan bahwa "Kedaulatan berada di tangan rakyat dan dilaksanakan menurut Undang-Undang Dasar". Penerapan prinsip kedaulatan rakyat ini dalam kehidupan di lingkungan sekolah diwujudkan melalui kegiatan ...',
    options: [
      'A. Penunjukan langsung ketua OSIS oleh kepala sekolah tanpa rapat',
      'B. Pemilihan ketua OSIS secara demokratis melalui pemungutan suara siswa',
      'C. Penentuan sanksi disiplin siswa tanpa mendengarkan keterangan yang bersangkutan',
      'D. Pelaksanaan piket kelas yang hanya diwajibkan bagi siswa tertentu'
    ],
    correctAnswer: 'B',
    explanation: 'Pemilihan ketua dan pengurus Organisasi Siswa Intra Sekolah (OSIS) secara langsung, umum, bebas, rahasia, jujur, dan adil (Luber dan Jurdil) merupakan wujud nyata praktik kedaulatan rakyat dalam skala mikrokosmos sekolah.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat memberikan contoh implementasi kedaulatan rakyat dalam lingkungan sekolah.',
    scoreWeight: 2,
  },

  // ==================== INFORMATIKA ====================
  // Kelas 7 Informatika
  {
    id: 'inf-7-01',
    grade: '7',
    subject: 'Informatika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Berpikir Komputasional (Computational Thinking)',
    questionType: 'pilihan_ganda',
    questionText: 'Ketika seorang siswa memecah permasalahan merakit komputer menjadi beberapa bagian kecil seperti memilih motherboard, memasang prosesor, memasang RAM, dan menghubungkan kabel daya, pilar berpikir komputasional yang diterapkan adalah ...',
    options: [
      'A. Dekomposisi (Decomposition)',
      'B. Pengenalan Pola (Pattern Recognition)',
      'C. Abstraksi (Abstraction)',
      'D. Perancangan Algoritma (Algorithm Design)'
    ],
    correctAnswer: 'A',
    explanation: 'Dekomposisi adalah teknik memecah masalah kompleks menjadi bagian-bagian yang lebih kecil, sederhana, dan terkelola secara bertahap.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik mampu menerapkan pilar dekomposisi berpikir komputasional dalam pemecahan masalah.',
    scoreWeight: 2,
  },
  {
    id: 'inf-7-02',
    grade: '7',
    subject: 'Informatika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Perangkat Keras dan Sistem Komputer',
    questionType: 'pilihan_ganda',
    questionText: 'Perhatikan daftar perangkat berikut:\n(1) Barcode Scanner\n(2) SSD (Solid State Drive)\n(3) Monitor LCD\n(4) Keyboard Mekanik\nPerangkat yang berfungsi khusus sebagai peranti masukan (input device) adalah ...',
    options: [
      'A. (1) dan (3)',
      'B. (1) dan (4)',
      'C. (2) dan (3)',
      'D. (2) dan (4)'
    ],
    correctAnswer: 'B',
    explanation: 'Barcode scanner dan keyboard mekanik adalah perangkat input (masukan). Monitor adalah perangkat output (keluaran), sedangkan SSD adalah media penyimpanan (storage).',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat mengidentifikasi jenis perangkat keras masukan komputer.',
    scoreWeight: 2,
  },

  // Kelas 8 Informatika
  {
    id: 'inf-8-01',
    grade: '8',
    subject: 'Informatika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Jaringan Komputer dan Internet',
    questionType: 'pilihan_ganda',
    questionText: 'Topologi jaringan komputer yang menghubungkan setiap simpul/komputer ke satu perangkat pusat seperti Switch atau Hub dengan kabel tersendiri dinamakan ...',
    options: [
      'A. Topologi Bus',
      'B. Topologi Ring (Cincin)',
      'C. Topologi Star (Bintang)',
      'D. Topologi Mesh (Jala)'
    ],
    correctAnswer: 'C',
    explanation: 'Topologi Star (Bintang) menggunakan konsentrator pusat (Switch/Hub) di mana setiap workstation terhubung secara point-to-point langsung ke perangkat pusat.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat mengidentifikasi karakteristik topologi jaringan komputer.',
    scoreWeight: 2,
  },
  {
    id: 'inf-8-02',
    grade: '8',
    subject: 'Informatika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Representasi Data dan Bilangan Biner',
    questionType: 'pilihan_ganda',
    questionText: 'Nilai bilangan biner 1101₂ jika dikonversikan ke dalam bilangan desimal berbasis 10 adalah ...',
    options: [
      'A. 11',
      'B. 13',
      'C. 15',
      'D. 17'
    ],
    correctAnswer: 'B',
    explanation: '1101₂ = (1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰) = 8 + 4 + 0 + 1 = 13.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik mampu mengonversi bilangan biner ke bilangan desimal.',
    scoreWeight: 2,
  },

  // Kelas 9 Informatika
  {
    id: 'inf-9-01',
    grade: '9',
    subject: 'Informatika',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Dampak Sosial Informatika dan Keamanan Siber',
    questionType: 'pilihan_ganda',
    questionText: 'Upaya rekayasa sosial di mana pelaku kejahatan siber mengirim pesan palsu yang menyerupai institusi resmi (seperti bank atau sekolah) untuk memancing korban memberikan password atau data sensitif disebut ...',
    options: [
      'A. Phishing',
      'B. Ransomware',
      'C. Defacement',
      'D. Malware'
    ],
    correctAnswer: 'A',
    explanation: 'Phishing adalah bentuk penipuan daring untuk memancing informasi rahasia kredensial pengguna melalui email/pesan tiruan yang tampak resmi.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: true,
    indicator: 'Peserta didik dapat mengenali ancaman kejahatan siber phishing dalam etika digital.',
    scoreWeight: 2,
  },

  // ==================== IQRA / BACA TULIS AL-QUR'AN (BTQ) ====================
  // Kelas 7 IQRA/BTQ
  {
    id: 'iqra-7-01',
    grade: '7',
    subject: "IQRA / Baca Tulis Al-Qur'an (BTQ)",
    curriculum: 'Kurikulum Merdeka',
    topic: 'Hukum Nun Mati dan Tanwin (Tajwid)',
    questionType: 'pilihan_ganda',
    questionText: 'Apabila nun sukun (نْ) atau tanwin bertemu dengan huruf Ra (ر) atau Lam (ل), maka hukum bacaan tajwid yang berlaku adalah ...',
    options: [
      'A. Idzhar Halqi (dibaca jelas)',
      'B. Idgham Bighunnah (dibaca dengung)',
      'C. Idgham Bilaghunnah (dibaca lebur tanpa dengung)',
      'D. Iqlab (mengganti bunyi mim)'
    ],
    correctAnswer: 'C',
    explanation: 'Huruf Idgham Bilaghunnah ada dua, yaitu Lam (ل) dan Ra (ر). Bunyi nun sukun atau tanwin dimasukkan ke huruf berikutnya tanpa mendengung (ghunnah).',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat mengidentifikasi hukum bacaan Idgham Bilaghunnah.',
    scoreWeight: 2,
  },
  {
    id: 'iqra-7-02',
    grade: '7',
    subject: "IQRA / Baca Tulis Al-Qur'an (BTQ)",
    curriculum: 'Kurikulum Merdeka',
    topic: 'Makharijul Huruf Hijaiyah',
    questionType: 'pilihan_ganda',
    questionText: 'Huruf-huruf hijaiyah berikut yang tempat keluarnya berasal dari tenggorokan bagian tengah (Wasthul Halq) adalah ...',
    options: [
      'A. Hamzah (ء) dan Ha (هـ)',
      'B. ‘Ain (ع) dan Ha (ح)',
      'C. Ghain (غ) dan Kha (خ)',
      'D. Qaf (ق) dan Kaf (ك)'
    ],
    correctAnswer: 'B',
    explanation: 'Makhraj Halq (tenggorokan): Bagian tengah tenggorokan (Wasthul Halq) adalah tempat keluarnya huruf ‘Ain (ع) dan Ha halus (ح).',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat menentukan makharijul huruf halqiyyah.',
    scoreWeight: 2,
  },

  // Kelas 8 IQRA/BTQ
  {
    id: 'iqra-8-01',
    grade: '8',
    subject: "IQRA / Baca Tulis Al-Qur'an (BTQ)",
    curriculum: 'Kurikulum Merdeka',
    topic: 'Hukum Bacaan Mad',
    questionType: 'pilihan_ganda',
    questionText: 'Apabila huruf mad bertemu dengan hamzah (ء) dalam satu kata bersambung, maka hukum bacaannya dinamakan ... dan panjang bacaannya adalah ...',
    options: [
      'A. Mad Jaiz Munfashil, 2 harakat',
      'B. Mad Wajib Muttashil, 4 atau 5 harakat',
      'C. Mad ‘Aridh Lissukun, 2 sampai 6 harakat',
      'D. Mad Iwad, 2 harakat'
    ],
    correctAnswer: 'B',
    explanation: 'Mad Wajib Muttashil terjadi jika huruf mad bertemu hamzah dalam satu kata (contoh: جَاءَ, السَّمَاءَ). Panjang bacaannya 4 atau 5 harakat saat washal.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menerapkan hukum bacaan Mad Wajib Muttashil.',
    scoreWeight: 2,
  },

  // Kelas 9 IQRA/BTQ
  {
    id: 'iqra-9-01',
    grade: '9',
    subject: "IQRA / Baca Tulis Al-Qur'an (BTQ)",
    curriculum: 'Kurikulum Merdeka',
    topic: 'Tanda Waqaf dan Kaligrafi Al-Qur’an',
    questionType: 'pilihan_ganda',
    questionText: 'Tanda waqaf berbentuk huruf Mim kecil (مـ) di atas ayat Al-Qur’an memiliki arti dan ketentuan ...',
    options: [
      'A. Boleh berhenti dan boleh terus (Waqaf Jaiz)',
      'B. Harus berhenti (Waqaf Lazim)',
      'C. Dilarang berhenti (Waqaf La Waqfa Fihi)',
      'D. Lebih utama melanjutkan bacaan (Al-Washlu Ula)'
    ],
    correctAnswer: 'B',
    explanation: 'Tanda mim kecil (مـ) melambangkan Waqaf Lazim, artinya pembaca diharuskan berhenti agar makna ayat tidak rusak atau menimbulkan kerancuan makna.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat memahami fungsi tanda waqaf lazim dalam tilawah Al-Qur’an.',
    scoreWeight: 2,
  },

  // ==================== BIMBINGAN KONSELING (BK) ====================
  // Kelas 7 BK
  {
    id: 'bk-7-01',
    grade: '7',
    subject: 'Bimbingan Konseling (BK)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Penyesuaian Diri dan Manajemen Belajar Remaja',
    questionType: 'pilihan_ganda',
    questionText: 'Siswa yang lebih cepat memahami materi pelajaran apabila mendengarkan rekaman penjelasan guru, diskusi kelompok, dan membaca teks secara bersuara memiliki kecenderungan gaya belajar ...',
    options: [
      'A. Visual (Penglihatan)',
      'B. Auditori (Pendengaran)',
      'C. Kinestetik (Gerak dan Praktik)',
      'D. Spasial (Ruang)'
    ],
    correctAnswer: 'B',
    explanation: 'Gaya belajar auditori mengandalkan indra pendengaran untuk menyerap informasi dengan lebih efektif melalui nada bicara, diskusi, dan mendengarkan.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat mengenali modalitas gaya belajar mandiri.',
    scoreWeight: 2,
  },
  {
    id: 'bk-7-02',
    grade: '7',
    subject: 'Bimbingan Konseling (BK)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Pencegahan Perundungan (Anti-Bullying)',
    questionType: 'pilihan_ganda',
    questionText: 'Tindakan menyebarkan kabar bohong, foto aib teman tanpa izin, atau komentar bernada hinaan di media sosial grup kelas dikategorikan sebagai perilaku ...',
    options: [
      'A. Cyberbullying (Perundungan Siber)',
      'B. Verbal joke biasa',
      'C. Kritik konstruktif',
      'D. Aktualisasi diri'
    ],
    correctAnswer: 'A',
    explanation: 'Cyberbullying adalah segala bentuk pelecehan, penghinaan, atau intimidasi yang disengaja menggunakan media digital terhadap orang lain.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: true,
    indicator: 'Peserta didik dapat mengidentifikasi perilaku cyberbullying dalam pergaulan digital.',
    scoreWeight: 2,
  },

  // Kelas 8 BK
  {
    id: 'bk-8-01',
    grade: '8',
    subject: 'Bimbingan Konseling (BK)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Pengelolaan Emosi dan Manajemen Waktu',
    questionType: 'pilihan_ganda',
    questionText: 'Metode pengaturan waktu dengan cara membuat skala prioritas antara tugas yang "Penting & Mendesak", "Penting tapi Tidak Mendesak", dan "Tidak Penting" merujuk pada konsep ...',
    options: [
      'A. Matriks Eisenhower',
      'B. Metode Pomodoro',
      'C. Analisis SWOT',
      'D. Diagram Ishikawa'
    ],
    correctAnswer: 'A',
    explanation: 'Matriks Eisenhower adalah kerangka manajemen waktu yang mengelompokkan tugas berdasarkan tingkat kepentingan (importance) dan kedaruratan (urgency).',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat menerapkan prinsip skala prioritas dalam belajar.',
    scoreWeight: 2,
  },

  // Kelas 9 BK
  {
    id: 'bk-9-01',
    grade: '9',
    subject: 'Bimbingan Konseling (BK)',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Perencanaan Karir dan Lanjutan Studi',
    questionType: 'pilihan_ganda',
    questionText: 'Siswa kelas 9 SMP yang memiliki cita-cita ingin langsung siap bekerja dengan keahlian teknis spesifik (seperti otomotif, tata boga, atau rekayasa perangkat lunak) paling tepat melanjutkan studi ke jenjang ...',
    options: [
      'A. Sekolah Menengah Atas (SMA) Jalur Akademik',
      'B. Sekolah Menengah Kejuruan (SMK)',
      'C. Kursus Bahasa Singkat',
      'D. Sekolah Kedinasan Non-Formal'
    ],
    correctAnswer: 'B',
    explanation: 'SMK dirancang untuk mencetak lulusan dengan keterampilan kejuruan vokasi praktis yang siap kerja di dunia industri maupun berwirausaha.',
    cognitiveLevel: 'C3 - Menerapkan',
    isHots: false,
    indicator: 'Peserta didik dapat merencanakan kelanjutan studi sesuai bakat dan orientasi karir.',
    scoreWeight: 2,
  },

  // ==================== SENI BUDAYA ====================
  // Kelas 7 Seni Budaya
  {
    id: 'seni-7-01',
    grade: '7',
    subject: 'Seni Budaya',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Seni Rupa (Ragam Hias Nusantara)',
    questionType: 'pilihan_ganda',
    questionText: 'Motif ragam hias nusantara yang mengambil bentuk dedaunan, sulur, bunga, dan pohon disebut motif ragam hias bernuansa ...',
    options: [
      'A. Fauna (Animal)',
      'B. Flora (Vegetal)',
      'C. Geometris',
      'D. Figuratif (Manusia)'
    ],
    correctAnswer: 'B',
    explanation: 'Motif flora (vegetal) bersumber dari keindahan aneka ragam tumbuh-tumbuhan, dedaunan, dan bunga yang distilisasi.',
    cognitiveLevel: 'C1 - Mengingat',
    isHots: false,
    indicator: 'Peserta didik mampu mengklasifikasikan jenis motif ragam hias seni rupa.',
    scoreWeight: 2,
  },

  // Kelas 8 Seni Budaya
  {
    id: 'seni-8-01',
    grade: '8',
    subject: 'Seni Budaya',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Seni Musik (Alat Musik Tradisional)',
    questionType: 'pilihan_ganda',
    questionText: 'Alat musik tradisional Sasando yang berasal dari Pulau Rote, Nusa Tenggara Timur, dimainkan dengan cara ... dan termasuk klasifikasi alat musik ...',
    options: [
      'A. Dipukul, Membranofon',
      'B. Dipetik, Kordofon',
      'C. Ditiup, Aerofon',
      'D. Digesek, Idiofon'
    ],
    correctAnswer: 'B',
    explanation: 'Sasando terbuat dari bambu dengan daun lontar melengkung yang dawai-dawainya dimainkan dengan cara dipetik (alat musik dawai/kordofon).',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik dapat menentukan teknik memainkan alat musik tradisional nusantara.',
    scoreWeight: 2,
  },

  // Kelas 9 Seni Budaya
  {
    id: 'seni-9-01',
    grade: '9',
    subject: 'Seni Budaya',
    curriculum: 'Kurikulum Merdeka',
    topic: 'Seni Rupa (Aliran Gaya Lukis)',
    questionType: 'pilihan_ganda',
    questionText: 'Aliran seni lukis yang menggambarkan objek-objek dunia khayal, alam bawah sadar, dan mimpi yang di luar kenyataan logis disebut aliran ...',
    options: [
      'A. Realisme',
      'B. Surealisme',
      'C. Naturalisme',
      'D. Kubisme'
    ],
    correctAnswer: 'B',
    explanation: 'Surealisme adalah aliran seni rupa yang menampilkan objek fantasi dan imajinasi mimpi bawah sadar tanpa terikat logika realitas.',
    cognitiveLevel: 'C2 - Memahami',
    isHots: false,
    indicator: 'Peserta didik mampu mengidentifikasi karakteristik aliran seni lukis modern.',
    scoreWeight: 2,
  }
];
