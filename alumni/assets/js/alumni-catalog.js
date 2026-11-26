const SHOWCASE_EXAMPLES = [
  {
    id: 1,
    postId: 1,
    nama: "AntreKlinik",
    category: "HealthTech & Layanan Publik",
    date: "27 Okt 2026",
    city: "Semarang, Indonesia –",
    tagline: "Antrean klinik dari ponsel, tanpa menunggu di ruang tunggu.",
    logo: "",
    banner: "assets/project-fuji.webp",
    demoLink: "https://antreklinik.bengkelkoding.id",
    attachments: [
      { name: "Dokumentasi_Arsitektur_AntreKlinik.pdf", type: "application/pdf", size: 1240500 }
    ],
    stack: ["Laravel", "MySQL", "REST API", "Tailwind CSS"],
    authorName: "Budi Santoso",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    waktu: Date.parse("2026-10-27T10:00:00"),
    tahap: "live",
    upvotes: 4,
    shares: 18,
    leadStory1: "AntreKlinik resmi dirilis sebagai solusi antrean digital cerdas yang memungkinkan pasien mendaftar poliklinik dan memantau estimasi giliran langsung dari ponsel pintar tanpa perlu berkerumun di ruang tunggu fasilitas kesehatan.",
    leadStory2: "Dibangun dengan arsitektur modular berbasis backend Laravel performa tinggi, sistem ini memperhitungkan ritme pemeriksaan dokter secara real-time dan memberikan perkiraan waktu panggilan yang presisi bagi pasien.",
    sectionHeading: "Fitur Utama & Arsitektur AntreKlinik",
    sectionIntro: "Beberapa kapabilitas inti yang telah diuji coba di klinik mitra lab:",
    keyFeatures: [
      "Pengambilan nomor antrean online dengan verifikasi NIK atau nomor rekam medis klinik",
      "Notifikasi real-time via WhatsApp saat nomor antrean pasien mendekati 3 nomor panggilan",
      "Dashboard multi-loket untuk pemanggilan pasien dan rekapitulasi waktu tunggu harian",
      "Pencatatan riwayat penanganan pasien dan evaluasi durasi konsultasi per dokter"
    ],
    feedbacks: [
      { id: 1, author: "Dimas Aryo", avatar: "https://i.pravatar.cc/150?img=15", text: "Fitur estimasi waktu tunggunya akurat dan sangat membantu mengurangi penumpukan di poliklinik!", status: "Diterapkan", date: "28 Okt 2026" },
      { id: 2, author: "Intan Permata", avatar: "https://i.pravatar.cc/150?img=48", text: "Bisa ditambahkan opsi reschedule antrean bila pasien mendadak berhalangan hadir?", status: "Pending", date: "29 Okt 2026" }
    ]
  },
  {
    id: 2,
    postId: 2,
    nama: "Sentimeter AI",
    category: "AI Analytics & NLP",
    date: "03 Nov 2026",
    city: "Semarang, Indonesia –",
    tagline: "Engine analisis sentimen ulasan publik multi-bahasa dengan latensi rendah.",
    logo: "",
    banner: "assets/project-city.jpg",
    stack: ["Python", "FastAPI", "Next.js", "Docker", "PyTorch"],
    authorName: "Clarista",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    waktu: Date.parse("2026-11-04T14:20:00"),
    tahap: "live",
    upvotes: 28,
    shares: 55,
    leadStory1: "Sentimeter AI resmi meluncur ke publik setelah uji performa komprehensif, menjadi engine analisis sentimen multi-bahasa pertama alumni yang dioptimasi khusus untuk ragam bahasa gaul, sarkasme, dan code-switching Indonesia.",
    leadStory2: "Dengan model transformer deep learning yang dikuantisasi menggunakan ONNX Runtime, platform ini mampu mendeteksi polaritas emosi teks secara real-time dengan latensi stabil di bawah 120ms pada skala ribuan request per detik.",
    sectionHeading: "Fitur Utama & Arsitektur Sistem",
    sectionIntro: "Kapabilitas teknis analisis opini dan sentimen publik:",
    keyFeatures: [
      "Latency inferensi ultra-rendah di bawah 120ms menggunakan arsitektur FastAPI dan ONNX Runtime",
      "Dukungan deteksi emosi multimodal (positif, netral, negatif, serta kategori sarkasme spesifik)",
      "Dashboard visualisasi tren sentimen real-time dan ekspor laporan analitik instan",
      "REST API terenkripsi siap integrasi ke backend sistem monitoring media sosial"
    ],
    feedbacks: [
      { id: 1, author: "Dimas Aryo", avatar: "https://i.pravatar.cc/150?img=15", text: "Latency inferensi sangat stabil di bawah 120ms pada pengujian load test, keren banget!", status: "Diterapkan", date: "03 Nov 2026" },
      { id: 2, author: "Budi Santoso", avatar: "https://i.pravatar.cc/150?img=11", text: "Akurasi deteksi bahasa campurannya sangat impresif untuk data ulasan e-commerce.", status: "Diterapkan", date: "04 Nov 2026" }
    ]
  },
  {
    id: 3,
    postId: 3,
    nama: "KasRT",
    category: "Fintech & Pengelolaan Warga",
    date: "31 Okt 2026",
    city: "Semarang, Indonesia –",
    tagline: "Catat kas dan iuran warga tanpa buku besar, otomatis rekap bulanan.",
    logo: "",
    banner: "assets/project-fuji.webp",
    stack: ["Python", "Flask", "SQL", "Bootstrap"],
    authorName: "Fajar Nugroho",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    waktu: Date.parse("2026-10-31T09:30:00"),
    tahap: "beta",
    upvotes: 2,
    shares: 9,
    leadStory1: "KasRT hadir menjawab kerumitan pembukuan iuran dan kas rukun tetangga manual, menghadirkan transparansi finansial lingkungan berbasis web yang mudah dioperasikan bendahara warga tanpa perlu keahlian akuntansi rumit.",
    leadStory2: "Platform ini dibangun dengan backend Python Flask yang ringan dan database SQL terstruktur, dilengkapi fitur pelaporan otomatis ke grup warga via pesan digital setiap awal bulan.",
    sectionHeading: "Fitur Unggulan Pengelolaan Kas",
    sectionIntro: "Fasilitas yang disediakan untuk kenyamanan pengurus dan warga:",
    keyFeatures: [
      "Pencatatan iuran sampah, keamanan, dan kas sosial dengan kuitansi digital otomatis",
      "Rekapitulasi pemasukan dan pengeluaran kas bulanan yang dapat diunduh dalam format PDF/Excel",
      "Portal transparansi warga untuk memantau saldo kas lingkungan secara terbuka",
      "Pengingat iuran otomatis tanpa perlu penagihan manual dari rumah ke rumah"
    ],
    feedbacks: [
      { id: 1, author: "Hendra Setiawan", avatar: "https://i.pravatar.cc/150?img=33", text: "Tampilan laporan PDF sangat rapi dan siap dicetak untuk rapat bulanan RT.", status: "Diperbaiki", date: "01 Nov 2026" },
      { id: 2, author: "Clarista", avatar: "https://i.pravatar.cc/150?img=5", text: "Transparansi kas terbuka seperti ini sangat menginspirasi tata kelola warga modern.", status: "Diterapkan", date: "02 Nov 2026" },
      { id: 3, author: "Budi Santoso", avatar: "https://i.pravatar.cc/150?img=11", text: "Usul fitur export ke CSV untuk backup data berkala bendahara.", status: "Pending", date: "03 Nov 2026" }
    ]
  },
  {
    id: 4,
    postId: 4,
    nama: "Bengkod Git Slicer",
    category: "Developer Tools & UI Tokens",
    date: "02 Nov 2026",
    city: "Semarang, Indonesia –",
    tagline: "Figma to Tailwind CSS v4 design token generator otomatis.",
    logo: "",
    banner: "assets/project-city.jpg",
    stack: ["TypeScript", "Node.js", "Tailwind CSS", "Figma API"],
    authorName: "Dimas Aryo",
    authorAvatar: "https://i.pravatar.cc/150?img=15",
    waktu: Date.parse("2026-11-02T16:00:00"),
    tahap: "beta",
    upvotes: 14,
    shares: 34,
    leadStory1: "Bengkod Git Slicer adalah utility generator token otomatis yang menjembatani file desain Figma langsung ke kode Tailwind CSS v4 produksi, memangkas waktu slicing antarmuka hingga 60% bagi pengembang frontend.",
    leadStory2: "Memanfaatkan Figma REST API dan arsitektur TypeScript Node.js, tool ini memetakan warna, tipografi, grid spasi, dan variabel komponen ke dalam konfigurasi token Tailwind CSS yang terstruktur rapi.",
    sectionHeading: "Fitur Otomasi Developer",
    sectionIntro: "Alur kerja otomasi dari kanvas desain ke kode:",
    keyFeatures: [
      "Ekstraksi variabel warna, radius, dan spacing Figma ke format tema Tailwind CSS v4",
      "Pengecekan konsistensi gaya desain otomatis (linting token) sebelum komit git",
      "Integrasi CI/CD webhook untuk sinkronisasi token saat file Figma diperbarui desainer",
      "Output kode komponen HTML/JSX yang bersih dan ramah accessibility"
    ],
    feedbacks: [
      { id: 1, author: "Clarista", avatar: "https://i.pravatar.cc/150?img=5", text: "Ekstraksi token warna langsung presisi tanpa perlu inspeksi manual di Figma lagi!", status: "Diperbaiki", date: "03 Nov 2026" },
      { id: 2, author: "Fajar Nugroho", avatar: "https://i.pravatar.cc/150?img=12", text: "Sangat berguna untuk standarisasi proyek lab Bengkel Koding.", status: "Pending", date: "04 Nov 2026" }
    ]
  },
  {
    id: 5,
    postId: 5,
    nama: "CoopDesk ERP",
    category: "POS & Retail Koperasi",
    date: "01 Nov 2026",
    city: "Semarang, Indonesia –",
    tagline: "Point of Sale & inventory digital kasir koperasi UMKM kampus.",
    logo: "",
    banner: "assets/project-fuji.webp",
    stack: ["React", "TypeScript", "Tailwind CSS", "IndexedDB"],
    authorName: "Intan Permata",
    authorAvatar: "https://i.pravatar.cc/150?img=48",
    waktu: Date.parse("2026-11-01T11:00:00"),
    tahap: "beta",
    upvotes: 9,
    shares: 15,
    leadStory1: "CoopDesk ERP diciptakan khusus untuk digitalisasi kasir dan inventaris koperasi UMKM kampus, mendukung transaksi kasir cepat serta pencatatan sisa hasil usaha (SHU) anggota secara otomatis.",
    leadStory2: "Ditenagai teknologi React, IndexedDB untuk mode offline-first, dan Tailwind CSS, aplikasi kasir ini tetap dapat bertransaksi lancar meskipun jaringan internet kampus mengalami gangguan.",
    sectionHeading: "Fitur Manajemen Koperasi",
    sectionIntro: "Modul lengkap yang siap digunakan kasir dan pengurus:",
    keyFeatures: [
      "Kasir Point of Sale cepat dengan scanner barcode dan cetak struk bluetooth",
      "Operasional offline-first dengan sinkronisasi database cloud otomatis saat online",
      "Manajemen stok barang masuk, kadaluarsa, dan peringatan batas minimum persediaan",
      "Kalkulasi pembagian SHU anggota koperasi transparan berdasarkan volume belanja"
    ],
    feedbacks: [
      { id: 1, author: "Budi Santoso", avatar: "https://i.pravatar.cc/150?img=11", text: "Mode offline-first-nya berjalan mulus saat koneksi lab sedang lambat.", status: "Diterapkan", date: "02 Nov 2026" }
    ]
  },
  {
    id: 6,
    postId: 6,
    nama: "Aplikasi Inventaris Gudang",
    category: "Logistik & Mobile Scanner",
    date: "04 Nov 2026",
    city: "Semarang, Indonesia –",
    tagline: "Sistem pelacakan stok dan scanner barcode gudang multi-cabang berbasis mobile.",
    logo: "",
    banner: "assets/project-city.jpg",
    demoLink: "https://logistik-scanner.bengkelkoding.id",
    attachments: [
      { name: "Panduan_Teknis_Logistik_Scanner.pdf", type: "application/pdf", size: 1120000 }
    ],
    stack: ["Flutter", "Firebase", "Dart", "Provider"],
    authorName: "Hendra Setiawan",
    authorAvatar: "https://i.pravatar.cc/150?img=33",
    waktu: Date.parse("2026-11-04T09:00:00"),
    tahap: "live",
    upvotes: 16,
    shares: 27,
    leadStory1: "Aplikasi Inventaris Gudang adalah solusi pelacakan barang berbasis Flutter mobile yang memudahkan staf gudang multi-cabang melakukan stock opname cepat dengan kamera ponsel pintar sebagai scanner barcode dan QR Code.",
    leadStory2: "Terhubung langsung dengan backend Google Firebase dan Dart state management, pembaruan stok barang di rak gudang terdistribusi secara instan ke kantor pusat tanpa jeda rekonsiliasi manual.",
    sectionHeading: "Spesifikasi & Keunggulan Mobile",
    sectionIntro: "Kapabilitas mobile inventory untuk pergudangan modern:",
    keyFeatures: [
      "Pemindaian barcode dan QR code batch berkecepatan tinggi menggunakan kamera perangkat",
      "Sinkronisasi real-time database stok antar cabang gudang dengan Firebase",
      "Validasi penempatan rak penyimpanan (bin location tracking) untuk mencegah salah letak barang",
      "Laporan stock opname dan audit log perpindahan logistik lengkap"
    ],
    feedbacks: [
      { id: 1, author: "Dimas Aryo", avatar: "https://i.pravatar.cc/150?img=15", text: "Respon scanner kamera sangat cepat bahkan untuk barcode yang agak pudar.", date: "04 Nov 2026" },
      { id: 2, author: "Intan Permata", avatar: "https://i.pravatar.cc/150?img=48", text: "Fitur validasi nomor rak membantu meminimalisir kesalahan peletakan barang.", date: "05 Nov 2026" },
      { id: 3, author: "Fajar Nugroho", avatar: "https://i.pravatar.cc/150?img=12", text: "Bisa ditambahkan fitur ekspor laporan audit ke format spreadsheet?", date: "05 Nov 2026" },
      { id: 4, author: "Clarista", avatar: "https://i.pravatar.cc/150?img=5", text: "UI mobile-nya sangat ergonomis untuk penggunaan satu tangan staf gudang.", date: "06 Nov 2026" },
      { id: 5, author: "Rian Hidayat", avatar: "https://i.pravatar.cc/150?img=60", text: "Integrasi state management Provider-nya sangat rapi dan konsumsi baterainya efisien.", date: "06 Nov 2026" },
      { id: 6, author: "Siti Rahma", avatar: "https://i.pravatar.cc/150?img=32", text: "Sangat membantu proses rekonsiliasi data inventaris harian staf gudang.", date: "07 Nov 2026" }
    ]
  }
];

const GIG_EXAMPLES = [
  {
    id: "demo-gig-1",
    title: "Aplikasi Mobile Reservasi Ruang Lab",
    category: "Mobile App",
    ownerId: "rizky-pratama",
    ownerName: "Rizky Pratama",
    ownerRole: "Mobile Tech Lead", image: "assets/project-fuji.webp",
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2026-12-15",
    postedDate: "2026-11-01",
    quota: 2,
    status: "Terbuka",
    rolesNeeded: ["Flutter Developer", "UI/UX Designer"],
    techStack: ["Flutter", "Dart", "Firebase", "Figma"],
    description: "Kami membutuhkan 2 rekan alumni untuk membangun aplikasi mobile reservasi lab Bengkel Koding UDINUS. Target selesai dalam 4 minggu dengan deliverables berupa aplikasi Android siap rilis, integrasi Firebase, dan dokumentasi REST API.",
    applicantsCount: 3,
  },
  {
    id: "demo-gig-2",
    title: "Sistem Absensi Asisten Lab & Honor Otomatis",
    category: "Backend API",
    ownerId: "dimas-wahyu",
    ownerName: "Dimas Wahyu Prabowo",
    ownerRole: "Software Architect", image: "assets/project-city.jpg",
    budgetRange: "> Rp 5.000.000",
    deadline: "2026-12-28",
    postedDate: "2026-10-28",
    quota: 1,
    status: "Sedang Dikerjakan",
    rolesNeeded: ["Backend Engineer"],
    techStack: ["Golang", "PostgreSQL", "Docker", "REST API"],
    description: "Membangun service microservice untuk kalkulasi honor asisten berdasarkan log presensi RFID dan integrasi ke sistem keuangan.",
    applicantsCount: 5,
  },
  {
    id: "demo-gig-3",
    title: "Redesign Portal Showcase Karya Bengkod",
    category: "UI/UX & Web Design",
    ownerId: "clarista-amanda",
    ownerName: "Clarista Amanda Putri",
    ownerRole: "Product Designer", image: "assets/project-fuji.webp",
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    deadline: "2026-11-30",
    postedDate: "2026-11-05",
    quota: 1,
    status: "Terbuka",
    rolesNeeded: ["UI/UX Designer"],
    techStack: ["Figma", "Design System", "Prototyping"],
    description: "Mendesain ulang laman showcase portofolio mahasiswa asisten agar terlihat modern, clean, dan siap dipertontonkan ke recruiter industri.",
    applicantsCount: 2,
  },
  {
    id: "demo-gig-4",
    title: "Dashboard Analitik Kelulusan & Tracer Study",
    category: "Frontend Development",
    ownerId: "rafi-fadhilah",
    ownerName: "Rafi Fadhilah",
    ownerRole: "Frontend Specialist", image: "assets/project-city.jpg",
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2026-12-20",
    postedDate: "2026-11-02",
    quota: 2,
    status: "Terbuka",
    rolesNeeded: ["React Developer", "Data Visualization"],
    techStack: ["Next.js", "Tailwind CSS", "Recharts", "TypeScript"],
    description: "Frontend dashboard untuk menyajikan sebaran karir alumni bengkod secara real-time dengan chart interaktif dan export data Excel/PDF. Dashboard akan menampilkan visualisasi data tracer study meliputi distribusi pekerjaan per bidang industri, rata-rata waktu tunggu kerja, dan tren gaji per angkatan.",
    applicantsCount: 4,
    applicants: [{
      id: "app-101",
      applicantId: "aisha-dwi-rahmawati",
      applicantName: "Aisha Dwi Rahmawati",
      applicantPhone: "081234567890",
      appliedDate: "2026-11-02",
      status: "PENDING",
      pitchMessage: "Tertarik mengambil peran React Developer & Tailwind CSS.",
      portfolioUrl: "https://github.com/aishadwir"
    }]
  },
  {
    id: "demo-gig-5",
    title: "Model AI Deteksi Plagiarisme Source Code",
    category: "Data Science & AI",
    ownerId: "bagas-arya",
    ownerName: "Bagas Arya",
    ownerRole: "ML Engineer", image: "assets/project-fuji.webp",
    budgetRange: "> Rp 5.000.000",
    deadline: "2027-01-15",
    postedDate: "2026-10-20",
    quota: 1,
    status: "Terbuka",
    rolesNeeded: ["Machine Learning Engineer"],
    techStack: ["Python", "PyTorch", "AST Parser", "FastAPI"],
    description: "Riset dan implementasi model deep learning untuk mengecek kemiripan struktur kode tugas pemrograman praktikum mahasiswa.",
    applicantsCount: 1,
  },
  {
    id: "demo-gig-6",
    title: "Automated Testing E2E Sistem Bengkod",
    category: "QA & Testing",
    ownerId: "fajar-nugraha",
    ownerName: "Fajar Nugraha",
    ownerRole: "QA Lead", image: "assets/project-city.jpg",
    budgetRange: "< Rp 1.000.000",
    deadline: "2026-11-25",
    postedDate: "2026-10-15",
    quota: 1,
    status: "Selesai",
    rolesNeeded: ["QA Automation Engineer"],
    techStack: ["Cypress", "JavaScript", "GitHub Actions"],
    description: "Menyusun skenario pengujian otomatis end-to-end untuk alur login, registrasi, dan upload portofolio.",
    applicantsCount: 3,
  },
  {
    id: "demo-gig-7",
    title: "Platform Mentoring & Code Review Antar-Alumni",
    category: "Web & Platform",
    ownerId: "aisha-dwi-rahmawati",
    ownerName: "Aisha Dwi Rahmawati",
    ownerRole: "Lab Bengkel Koding", image: "assets/project-fuji.webp",
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2027-01-30",
    postedDate: "2026-11-10",
    quota: 2,
    status: "Terbuka",
    rolesNeeded: ["Fullstack Developer", "UI Designer"],
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
    description: "Membangun platform peer code review khusus asisten dan alumni Bengkel Koding dengan fitur syntax highlight dan thread review.",
    applicantsCount: 2,
  }
];

const VACANCY_EXAMPLES = [
  {
    id: 505,
    authorName: "Hendrawan Putra",
    authorHeadline: "Engineering Manager @ Tokopedia", image: "assets/project-fuji.webp",
    content: "Tim Commerce Tokopedia sedang membuka kesempatan referral untuk posisi Frontend Engineer (React/TypeScript). Kami mencari rekan alumni yang terbiasa membangun komponen web performa tinggi, responsive, dan menguasai state management. Silakan kirimkan CV dan portofolio Anda sebelum batas waktu review.",
    referral: {
      perusahaan: "Tokopedia",
      posisi: "Frontend Engineer",
      level: "Junior (1-2 tahun)",
      batas: "2026-12-10",
      ditutup: false,
    },
    pengajuan: [
      {
        id: 501,
        authorName: "Rafi Fadhilah",
        pesan: "Halo Aisha, saya tertarik melamar di tim Commerce. Selama di lab saya aktif riset React & Next.js.",
        status: "menunggu",
        masukan: "",
        waktu: "2026-11-19"
      }
    ]
  },
  {
    id: 506,
    authorName: "Dimas Wahyu Prabowo",
    authorHeadline: "Software Architect @ Traveloka", image: "assets/project-city.jpg",
    content: "Ada lowongan internal untuk Backend Engineer (Golang) di tim Core Booking Platform. Dicari rekan yang memiliki pemahaman kuat tentang concurrent programming, distributed cache, dan PostgreSQL.",
    referral: {
      perusahaan: "Traveloka",
      posisi: "Backend Engineer",
      level: "Mid Level",
      batas: "2026-12-20",
      ditutup: false,
    },
    pengajuan: [
      {
        id: 601,
        authorName: "Aisha Dwi Rahmawati",
        pesan: "Mas Dimas, saya ingin mencoba posisi ini untuk memperdalam arsitektur sistem skala besar.",
        status: "menunggu",
        masukan: "",
        waktu: "2026-11-18"
      }
    ]
  },
  {
    id: 507,
    authorName: "Clarista Amanda Putri",
    authorHeadline: "Product Designer @ Gojek", image: "assets/project-fuji.webp",
    content: "Tim Transport Gojek membuka program magang Product Design untuk mahasiswa tingkat akhir atau freshgrad. Fokus pada visual craft, UI prototyping, dan kolaborasi dengan developer.",
    referral: {
      perusahaan: "Gojek",
      posisi: "Product Design Intern",
      level: "Magang / Freshgrad",
      batas: "2026-11-30",
      ditutup: false,
    },
    pengajuan: []
  },
  {
    id: 508,
    authorName: "Bagas Arya",
    authorHeadline: "Machine Learning Engineer @ Bukalapak", image: "assets/project-city.jpg",
    content: "Lowongan referral posisi Data Scientist di tim Search & Recommendation. Kandidat diutamakan memiliki pemahaman model embedding dan search ranking.",
    referral: {
      perusahaan: "Bukalapak",
      posisi: "Data Scientist",
      level: "Junior (1-2 tahun)",
      batas: "2026-12-05",
      ditutup: false,
    },
    pengajuan: []
  },
  {
    id: 509,
    authorName: "Fajar Nugraha",
    authorHeadline: "QA Lead @ DANA Indonesia", image: "assets/project-fuji.webp",
    content: "Tim Payment Security DANA mencari SDET (Software Development Engineer in Test). Penempatan Jakarta Selatan dengan skema hybrid.",
    referral: {
      perusahaan: "DANA Indonesia",
      posisi: "SDET Engineer",
      level: "Mid Level",
      batas: "2026-11-15",
      ditutup: true,
    },
    pengajuan: []
  },
  {
    id: 510,
    authorName: "Aisha Dwi Rahmawati",
    authorHeadline: "Software Engineer @ Tokopedia", image: "assets/project-city.jpg",
    content: "Tim Payment & Checkout Tokopedia sedang membuka kesempatan referral untuk Fullstack / Frontend Developer. Diutamakan yang terbiasa dengan arsitektur micro-frontend dan testing.",
    referral: {
      perusahaan: "Tokopedia",
      posisi: "Fullstack Engineer (Payment)",
      level: "Junior (1-2 tahun)",
      batas: "2026-12-30",
      ditutup: false,
    },
    pengajuan: [
      {
        id: 1001,
        authorName: "Rafi Fadhilah",
        pesan: "Halo Aisha, saya tertarik melamar di tim Payment. Mohon dibantu review CV saya.",
        status: "menunggu",
        masukan: "",
        waktu: "2026-11-21"
      }
    ]
  }
];

function alumniProfileForBoard(defaults = {}) {
  const alumni = ALUMNI_DIRECTORY[0];
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem("bengkod_alumni_profile"));
  } catch {}
  return {
    id: alumni.id,
    name: saved?.name || alumni.name,
    avatar: saved?.avatarUrl || defaults.avatar || alumni.avatarUrl || DEFAULT_AVATAR,
    headline: saved?.headline || defaults.headline || alumni.headline,
    email: saved?.email || alumni.email,
    phone: saved?.whatsapp || saved?.phone,
    batch: saved?.batch || alumni.batch
  };
}

function loadShowcaseWorks() {
  const byAuthorAndTitle = new Map();
  const key = (title, author) => JSON.stringify([title, author].map(value => (value || "").trim().toLowerCase()));
  for (const work of structuredClone(SHOWCASE_EXAMPLES)) {
    byAuthorAndTitle.set(key(work.nama, work.authorName), work);
  }
  for (const post of loadPosts()) {
    const work = post.karya;
    if (!work?.nama) continue;
    const workKey = key(work.nama, post.authorName);
    const existing = byAuthorAndTitle.get(workKey);
    const mapped = {
      id: `post-${post.id}`,
      nama: work.nama,
      tagline: work.tagline || "",
      category: work.categoryTags?.join(" · ") || "",
      date: post.date,
      logo: work.logo || "",
      banner: work.bannerUrl || (work.nama === "Sentimeter AI" || post.id % 2 === 0 ? "assets/project-city.jpg" : "assets/project-fuji.webp"),
      stack: work.stack || [],
      authorName: post.authorName,
      authorAvatar: post.authorAvatar,
      waktu: boardDate(post.date) || (post.id > 1e12 ? post.id : 0),
      tahap: work.tahap || "live",
      leadStory1: work.overview || work.pitch || "",
      upvotes: post.likes || 0,
      shares: post.repostsCount || 0,
      feedbacks: []
    };
    byAuthorAndTitle.set(workKey, {
      ...mapped,
      ...existing,
      sourcePostId: post.id,
      projectId: work.projectId,
      demoLink: work.url || existing?.demoLink || "",
      contributors: work.contributors ?? existing?.contributors ?? [],
      attachments: (work.attachments && work.attachments.length) ? work.attachments : (existing?.attachments || [])
    });
  }
  let stored;
  try {
    stored = JSON.parse(localStorage.getItem("bengkod_showcase_karya"));
  } catch {}
  if (Array.isArray(stored)) {
    for (const work of stored) {
      if (!work?.nama) continue;
      const workKey = key(work.nama, work.authorName);
      const existing = byAuthorAndTitle.get(workKey);
      byAuthorAndTitle.set(workKey, {
        ...existing,
        ...work,
        banner: /^assets\/banner-/.test(work.banner || "") ? (existing?.banner || "assets/project-city.jpg") : (work.banner || existing?.banner || ""),
        demoLink: work.demoLink && work.demoLink !== "#" ? work.demoLink : existing?.demoLink || ""
      });
    }
  }
  return [...byAuthorAndTitle.values()];
}

function showcaseWorkLink(work, prefix = "") {
  return `${prefix}detail-karya.html?id=${encodeURIComponent(work.id)}`;
}

function findShowcaseWork(works, id) {
  if (!id) return null;
  return works.find(work => String(work.id) === id)
    || works.find(work => work.postId != null && String(work.postId) === id)
    || works.find(work => work.sourcePostId != null && String(work.sourcePostId) === id)
    || null;
}

const SPOTLIGHT_STORAGE_KEY = "bengkod_showcase_spotlight";

function loadSpotlightWorks() {
  let ids;
  try {
    ids = JSON.parse(localStorage.getItem(SPOTLIGHT_STORAGE_KEY));
  } catch {}
  const works = new Map(loadShowcaseWorks().map(work => [String(work.id), work]));
  if (!Array.isArray(ids)) return Array.from(works.values()).slice(0, 3);
  return ids.map(id => works.get(String(id))).filter(Boolean);
}

function toggleSpotlightWork(id) {
  const selected = loadSpotlightWorks().map(work => String(work.id));
  const next = selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id];
  localStorage.setItem(SPOTLIGHT_STORAGE_KEY, JSON.stringify(next));
}

function loadBoardGigs() {
  const gigs = loadGigs();
  const ids = new Set(gigs.map(gig => gig.id));
  return [...gigs, ...structuredClone(GIG_EXAMPLES).filter(gig => !ids.has(gig.id))]
    .filter(gig => !gig.boardDeleted);
}

function saveBoardGig(gig, updates = {}) {
  const gigs = loadGigs();
  return saveGigs([{ ...gig, ...updates }, ...gigs.filter(item => item.id !== gig.id)]);
}

function ownsBoardGig(gig, profile) {
  if (!gig) return false;
  return gig.ownerId ? gig.ownerId === profile.id : gig.ownerName === profile.name;
}

function gigApplicantStatus(app) {
  if (["REJECTED", "Ditolak"].includes(app.status)) return "rejected";
  if (["ACCEPTED", "COMPLETED", "Diterima"].includes(app.status)) return "accepted";
  return "pending";
}

function loadBoardVacancies() {
  const posts = loadPosts().filter(post => post.referral);
  const ids = new Set(posts.map(post => post.id));
  return [...posts, ...structuredClone(VACANCY_EXAMPLES).filter(post => !ids.has(post.id))]
    .filter(post => !post.boardDeleted);
}

function saveBoardVacancy(post, updates = {}) {
  const posts = loadPosts();
  const existing = posts.find(item => item.id === post.id);
  return savePosts([{
    category: "Referral",
    jenis: "referral",
    date: new Date().toISOString(),
    ...existing,
    ...post,
    ...updates
  }, ...posts.filter(item => item.id !== post.id)]);
}

function boardDate(value) {
  const text = value || "";
  const local = /^(\d{1,2}) (Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des) (\d{4})$/.exec(text);
  if (local) {
    const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"].indexOf(local[2]);
    return Date.UTC(Number(local[3]), month, Number(local[1]));
  }
  return Date.parse(text) || 0;
}

function latestBoardGigs() {
  return loadBoardGigs().sort((a, b) => boardDate(b.postedDate) - boardDate(a.postedDate)
    || (Number(b.id.replace(/^gig-/, "")) || 0) - (Number(a.id.replace(/^gig-/, "")) || 0));
}

function boardGigLink(gig) {
  return `gigs.html?gig=${encodeURIComponent(gig.id)}`;
}

function boardVacancyLink(id) {
  return `referral.html?lowongan=${encodeURIComponent(id)}`;
}

function dashboardAttachmentOptions(kind, profile) {
  const ownedByName = record => record.authorName === profile.name || record.authorName === ALUMNI_DIRECTORY[0].name;
  if (kind === "karya") {
    return loadShowcaseWorks().filter(ownedByName).map(work => ({
      id: work.id, title: work.nama, detail: work.tagline, link: showcaseWorkLink(work)
    }));
  }
  if (kind === "gigs") {
    return latestBoardGigs().filter(gig => gig.ownerId === profile.id || gig.ownerName === profile.name).map(gig => ({
      id: gig.id, title: gig.title, detail: [gig.category, gig.status].filter(Boolean).join(" · "),
      link: boardGigLink(gig)
    }));
  }
  return loadBoardVacancies().filter(ownedByName).map(({ id, referral }) => ({
    id, title: referral.posisi, detail: referral.perusahaan, link: boardVacancyLink(id)
  }));
}
