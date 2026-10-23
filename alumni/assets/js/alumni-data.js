/**
 * Data & helper bersama role Alumni — konversi langsung dari lms-bengkod-web:
 *   _components/postsData.ts, alumniDirectory.ts, jobsData.ts, mediaUtils.ts
 * (tipe TypeScript dihapus, isi data tidak diubah).
 */

// ===================== postsData.ts =====================
// ============================================================
// DATA & STATE SHARED POSTINGAN ALUMNI
// Digunakan oleh:
// - /dashboard/alumni (halaman dashboard utama)
// - /dashboard/alumni/profil (halaman profil)
// ============================================================



const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQkqiGxfpLtkXDEKfHU0tytBlAdYOIRApOBc3Rrfb-wksiGmnXvPWKEbITsZPyx43epH_tQ8k1KIEQklEmpoc09jyf9Yk3NTHeh5I6TzbOe0Q8UIjlb_iAe9dyVNCAj0VzKo2h3OLkXJZKE-Lw5tDfOl5mmRKs03CL47_dpKCK7OKFkd_FBKfKWG0n_tEq3rLVnPyDCp9a9HgYZirkZebLiIeibs6M0W2dYWkzCzoMe7JX3BJMqnc_nQ";

const INITIAL_POSTS = [
  {
    id: 1,
    authorName: "Aisha Dwi Rahmawati",
    authorAvatar: DEFAULT_AVATAR,
    authorHeadline: "Data Scientist & Data Analyst | Undergraduate Student at Dian Nuswantoro University",
    date: "Feb 12, 2026",
    content:
      "Dengan gembira, saya membagikan proyek Sentiment Analysis System for OVO App yang saya kerjakan. Lihat di sini: https://lnkd.in/eVbna2d3",
    category: "Pencapaian Proyek / Capstone",
    visibility: "Semua orang",
    imageUrl: DEFAULT_AVATAR,
    likes: 3,
    isLiked: false,
    commentsCount: 36,
    repostsCount: 541,
    impressions: 502,
  },
  {
    id: 2,
    authorName: "Arif Alam",
    authorAvatar: "",
    authorHeadline: "Making AI Accessible to All | Building @Data ...",
    date: "Apr 12, 2025",
    isRepost: true,
    repostedBy: "Aisha Dwi Rahmawati",
    content: "Machine Learning Algorithms Cheatsheet\n➔ Linear Regression...",
    category: "Knowledge Sharing",
    visibility: "Semua orang",
    tablePreview: {
      title: "Cheatsheet Machine Learning Algorithms",
      rows: [
        {
          col1: "Linear Regression",
          col2: "Supervised",
          col3: "y = b0 + b1x",
          col4: "Simple, interpretable",
          col5: "House price prediction",
        },
        {
          col1: "Logistic Regression",
          col2: "Supervised",
          col3: "P = 1 / (1+e^-z)",
          col4: "Probabilistic output",
          col5: "Spam detection",
        },
        {
          col1: "Decision Tree",
          col2: "Supervised",
          col3: "Gini / Entropy",
          col4: "Easy to understand",
          col5: "Loan default prediction",
        },
        {
          col1: "Random Forest",
          col2: "Ensemble",
          col3: "Bagging + trees",
          col4: "High accuracy",
          col5: "Credit scoring",
        },
        {
          col1: "K-Means",
          col2: "Unsupervised",
          col3: "Min Euclidean dist",
          col4: "Fast, scalable",
          col5: "Customer segmentation",
        },
      ],
    },
    likes: 3,
    isLiked: false,
    commentsCount: 36,
    repostsCount: 541,
    impressions: 502,
  },
];

const STORAGE_KEY = "bengkod_alumni_posts_v1";

function loadPosts() {
  if (typeof window === "undefined") return INITIAL_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_POSTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return INITIAL_POSTS;
  } catch {
    return INITIAL_POSTS;
  }
}

function savePosts(posts) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event("bengkod_posts_updated"));
  } catch (err) {
    console.error("Gagal menyimpan postingan:", err);
  }
}

// ===================== alumniDirectory.ts =====================
// ============================================================
// DIREKTORI ALUMNI — satu sumber kebenaran untuk data alumni
// yang sudah terdaftar. Dipakai oleh ContributorPicker (memilih
// kontributor proyek) dan halaman tujuan /dashboard/alumni/[id].
//
// Foto profil memakai URL publik; bila gagal dimuat, komponen
// akan jatuh ke placeholder lokal /img/user.png.
// ============================================================


const ALUMNI_DIRECTORY = [
  {
    id: "aisha-dwi-rahmawati",
    name: "Aisha Dwi Rahmawati",
    headline:
      "Data Scientist & Data Analyst | Undergraduate Student at Dian Nuswantoro University",
    batch: "2024",
    location: "Kota Kudus, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQkqiGxfpLtkXDEKfHU0tytBlAdYOIRApOBc3Rrfb-wksiGmnXvPWKEbITsZPyx43epH_tQ8k1KIEQklEmpoc09jyf9Yk3NTHeh5I6TzbOe0Q8UIjlb_iAe9dyVNCAj0VzKo2h3OLkXJZKE-Lw5tDfOl5mmRKs03CL47_dpKCK7OKFkd_FBKfKWG0n_tEq3rLVnPyDCp9a9HgYZirkZebLiIeibs6M0W2dYWkzCzoMe7JX3BJMqnc_nQ",
    industry: "Teknologi, Informasi, dan Internet",
    email: "aisha.rahma@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/aisharah",
    github: "https://github.com/aishaadr",
    connections: 75,
    followers: 77,
    isVerified: true,
    about:
      "Motivated Informatics Engineering student at Universitas Dian Nuswantoro Semarang with a strong passion for data science and business analysis. Berpengalaman mendalami arsitektur sistem Next.js, TypeScript, Python, dan Laravel.",
  },
  {
    id: "clarista",
    name: "Clarista",
    headline: "Machine Learning Engineer | Deep Learning & Data Analysis Enthusiast",
    batch: "2024",
    location: "Semarang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=45",
    industry: "Teknologi, Informasi, dan Internet",
    email: "clarista@alumni.dinus.ac.id",
    github: "https://github.com/clarista",
    connections: 128,
    followers: 143,
    isVerified: true,
    about:
      "Fokus pada pengembangan model prediktif dan interpretasi model (SHAP) untuk menyelesaikan permasalahan nyata di industri UMKM dan kesehatan.",
  },
  {
    id: "rafi-pratama",
    name: "Rafi Pratama",
    headline: "Fullstack Web Developer | Next.js, TypeScript & Laravel",
    batch: "2023",
    location: "Kota Semarang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    industry: "Teknologi, Informasi, dan Internet",
    email: "rafi.pratama@alumni.dinus.ac.id",
    github: "https://github.com/rafipratama",
    connections: 96,
    followers: 88,
    isVerified: true,
    about:
      "Membangun aplikasi web berskala produksi dengan fokus pada performa, aksesibilitas, dan pengalaman pengguna.",
  },
  {
    id: "nadia-safira",
    name: "Nadia Safira",
    headline: "UI/UX Designer | Product Design & Design System",
    batch: "2024",
    location: "Kota Kudus, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    industry: "Desain",
    email: "nadia.safira@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/nadiasafira",
    connections: 152,
    followers: 201,
    isVerified: true,
    about:
      "Merancang antarmuka yang bersih dan berpusat pada pengguna, mulai dari riset, wireframe, hingga design system yang konsisten.",
  },
  {
    id: "bagas-wicaksono",
    name: "Bagas Wicaksono",
    headline: "IoT Engineer | Embedded Systems & Sensor Networks",
    batch: "2022",
    location: "Kota Surakarta, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=13",
    industry: "Perangkat Keras & IoT",
    email: "bagas.wicaksono@alumni.dinus.ac.id",
    github: "https://github.com/bagaswic",
    connections: 64,
    followers: 71,
    about:
      "Mengembangkan sistem monitoring berbasis IoT dengan integrasi sensor, mikrokontroler, dan dashboard real-time.",
  },
  {
    id: "salsabila-putri",
    name: "Salsabila Putri",
    headline: "Mobile Developer | Flutter & Android",
    batch: "2024",
    location: "Kabupaten Jepara, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    industry: "Teknologi, Informasi, dan Internet",
    email: "salsabila.putri@alumni.dinus.ac.id",
    connections: 87,
    followers: 95,
    isVerified: true,
    about:
      "Membangun aplikasi mobile lintas platform dengan pengalaman pengguna yang halus dan arsitektur yang mudah dirawat.",
  },
  {
    id: "dimas-aryo",
    name: "Dimas Aryo",
    headline: "Backend Engineer | Golang, Node.js & Cloud Infrastructure",
    batch: "2023",
    location: "Kota Semarang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
    industry: "Teknologi, Informasi, dan Internet",
    email: "dimas.aryo@alumni.dinus.ac.id",
    github: "https://github.com/dimasaryo",
    connections: 110,
    followers: 102,
    about:
      "Merancang API berperforma tinggi dan infrastruktur cloud yang andal untuk aplikasi berskala besar.",
  },
  {
    id: "kirana-maheswari",
    name: "Kirana Maheswari",
    headline: "Data Analyst | Business Intelligence & Visualization",
    batch: "2024",
    location: "Kota Magelang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=44",
    industry: "Teknologi, Informasi, dan Internet",
    email: "kirana.maheswari@alumni.dinus.ac.id",
    connections: 73,
    followers: 80,
    about:
      "Mengubah data mentah menjadi wawasan bisnis melalui dashboard interaktif dan analisis statistik.",
  },
  {
    id: "fajar-nugroho",
    name: "Fajar Nugroho",
    headline: "Cybersecurity Analyst | Network Security & Pentest",
    batch: "2022",
    location: "Kota Semarang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    industry: "Keamanan Siber",
    email: "fajar.nugroho@alumni.dinus.ac.id",
    github: "https://github.com/fajarn",
    connections: 58,
    followers: 66,
    about:
      "Berfokus pada pengujian penetrasi, hardening sistem, dan peningkatan kesadaran keamanan informasi.",
  },
  {
    id: "intan-permata",
    name: "Intan Permata",
    headline: "Frontend Engineer | React, Vue & Design Systems",
    batch: "2024",
    location: "Kota Salatiga, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=48",
    industry: "Teknologi, Informasi, dan Internet",
    email: "intan.permata@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/intanpermata",
    connections: 91,
    followers: 104,
    isVerified: true,
    about:
      "Menerjemahkan desain menjadi antarmuka yang responsif dan aksesibel dengan komponen yang dapat digunakan ulang.",
  },
];

// ------------------------------------------------------------
// HELPER
// ------------------------------------------------------------

/** Rute halaman profil alumni yang sudah terdaftar. */
function alumniProfileHref(id) {
  return `/dashboard/alumni/${id}`;
}

/** Cari alumni berdasarkan id. */
function findAlumni(id) {
  if (!id) return undefined;
  return ALUMNI_DIRECTORY.find((a) => a.id === id);
}

/** Cari alumni berdasarkan nama (untuk kompatibilitas data lama). */
function findAlumniByName(name) {
  if (!name) return undefined;
  const key = name.trim().toLowerCase();
  return ALUMNI_DIRECTORY.find((a) => a.name.trim().toLowerCase() === key);
}

/**
 * Pencarian alumni untuk dropdown pemilih kontributor.
 * Mencocokkan nama, headline, batch, kampus, dan lokasi.
 */
function searchAlumni(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return ALUMNI_DIRECTORY;
  return ALUMNI_DIRECTORY.filter((a) =>
    [a.name, a.headline, a.batch, a.university, a.location, a.industry || ""]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

/** Inisial nama (maks. 2 huruf) untuk placeholder tanpa foto. */
function initialsOf(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ===================== jobsData.ts =====================
// ============================================================
// DATA & STATE LOWONGAN KERJA ALUMNI (JOBS PORTAL)
// Meniru LinkedIn Jobs dengan standar industri dan kemitraan
// resmi Bengkel Koding & Universitas Dian Nuswantoro.
// ============================================================



const INITIAL_JOBS = [
  {
    id: "job-goto-ai-eng",
    title: "Junior AI & Machine Learning Engineer",
    company: "GoTo Group (Gojek & Tokopedia)",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    location: "Jakarta Selatan, DKI Jakarta",
    workModel: "Hybrid",
    employmentType: "Penuh Waktu (Full-time)",
    experienceLevel: "Fresh Graduate",
    salaryRange: "Rp 12.000.000 - Rp 18.000.000 / bulan",
    datePosted: "1 hari lalu",
    applicantsCount: 28,
    isEasyApply: true,
    isPartner: true,
    industry: "Internet & Teknologi Finansial",
    companySize: "5.000+ Karyawan",
    companyWebsite: "https://gotocompany.com",
    aboutCompany: "GoTo adalah ekosistem digital terbesar di Indonesia yang menggabungkan layanan on-demand (Gojek), e-commerce (Tokopedia), dan layanan keuangan (GoTo Financial). Kami membangun solusi cerdas untuk jutaan pengguna.",
    description: "Kami mencari talenta alumni berbakat di bidang AI dan Rekayasa Data untuk bergabung dalam tim Applied Machine Learning GoTo. Anda akan bekerja sama dengan Principal Engineers untuk mengembangkan model prediktif, personalization algorithms, dan NLP processing pipelines berkinerja tinggi.",
    responsibilities: [
      "Mengembangkan, mengevaluasi, dan melakukan deployment model machine learning untuk sistem rekomendasi real-time.",
      "Melakukan data wrangling, feature engineering, dan eksplorasi dataset skala besar menggunakan Python, Spark, dan SQL.",
      "Berkolaborasi dengan tim backend engineer untuk mengintegrasikan model ke microservices arsitektur Go/Python.",
      "Memantau performa model di production dan melakukan A/B testing secara berkala.",
    ],
    qualifications: [
      "Lulusan S1 Informatika, Sistem Informasi, Sains Data, atau Matematika Terapan.",
      "Kemampuan kuat dalam bahasa pemrograman Python (Pandas, NumPy, Scikit-learn, PyTorch/TensorFlow).",
      "Memahami konsep dasar MLOps, Docker containerization, dan RESTful API.",
      "Nilai tambah bagi alumni yang pernah mengerjakan capstone sentiment analysis atau computer vision di Bengkel Koding.",
    ],
    skillsRequired: ["Python", "Machine Learning", "Data Science", "SQL", "Docker", "PyTorch", "Git"],
    benefits: [
      "Gaji kompetitif + Bonus Kinerja Tahunan",
      "Asuransi Kesehatan Komprehensif (Rawat Inap + Rawat Jalan + Gigi)",
      "Tunjangan Laptop MacBook Pro M3 & Home-Office Allowance",
      "Subsidi Kursus Pelatihan & Sertifikasi Cloud Profesional",
      "Jam kerja fleksibel dengan budaya kerja inklusif",
    ],
    alumniConnections: [
      {
        name: "Clarista",
        avatar: "https://i.pravatar.cc/150?img=45",
        role: "Associate ML Engineer",
        batch: "2024",
      },
      {
        name: "Gesang Bagas Wicaksono",
        avatar: "https://i.pravatar.cc/150?img=11",
        role: "Data Analyst",
        batch: "2023",
      },
    ],
  },
  {
    id: "job-mandiri-frontend",
    title: "Frontend Web Developer (Next.js & TypeScript)",
    company: "PT Bank Mandiri (Persero) Tbk - Digital Banking",
    companyLogo: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80",
    location: "Jakarta Pusat / Semarang",
    workModel: "Hybrid",
    employmentType: "Penuh Waktu (Full-time)",
    experienceLevel: "Junior (0-2 tahun)",
    salaryRange: "Rp 10.000.000 - Rp 15.000.000 / bulan",
    datePosted: "3 hari lalu",
    applicantsCount: 45,
    isEasyApply: true,
    isPartner: true,
    industry: "Perbankan & Jasa Keuangan",
    companySize: "10.000+ Karyawan",
    companyWebsite: "https://bankmandiri.co.id",
    aboutCompany: "Bank Mandiri adalah salah satu bank BUMN terbesar di Indonesia yang memimpin transformasi perbankan digital melalui Livin' by Mandiri dan Kopra by Mandiri.",
    description: "Divisi Digital Engineering Bank Mandiri membuka kesempatan bagi talenta alumni software engineering untuk membangun antarmuka web portal perbankan modern yang aman, responsif, dan berkecepatan tinggi.",
    responsibilities: [
      "Mengembangkan komponen UI/UX modern berbasis Next.js App Router, React, dan TypeScript yang scalable.",
      "Mengintegrasikan antarmuka dengan API perbankan terenkripsi sesuai standar keamanan OWASP.",
      "Mengoptimalkan performa web aplikasi, loading speed, dan aksesibilitas lintas peramban.",
      "Berpartisipasi aktif dalam code review dan automated testing (Jest, Cypress).",
    ],
    qualifications: [
      "S1 Teknik Informatika / Ilmu Komputer.",
      "Menguasai Next.js, React, TypeScript, dan TailwindCSS dengan standar kode bersih.",
      "Paham pengelolaan state (Zustand / Redux) dan asynchronous data fetching.",
      "Disiplin, teliti, dan memiliki semangat belajar arsitektur enterprise.",
    ],
    skillsRequired: ["Next.js", "TypeScript", "React", "TailwindCSS", "REST API", "Git", "Jest"],
    benefits: [
      "Paket remunerasi BUMN terkemuka + Tunjangan Hari Raya & Insentif",
      "Asuransi Kesehatan Mandiri Inhealth Platinum",
      "Jalur karier terstruktur menuju Lead Frontend Engineer",
      "Cuti tahunan 15 hari + Program Well-being karyawan",
    ],
    alumniConnections: [
      {
        name: "Aisha Dwi Rahmawati",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQkqiGxfpLtkXDEKfHU0tytBlAdYOIRApOBc3Rrfb-wksiGmnXvPWKEbITsZPyx43epH_tQ8k1KIEQklEmpoc09jyf9Yk3NTHeh5I6TzbOe0Q8UIjlb_iAe9dyVNCAj0VzKo2h3OLkXJZKE-Lw5tDfOl5mmRKs03CL47_dpKCK7OKFkd_FBKfKWG0n_tEq3rLVnPyDCp9a9HgYZirkZebLiIeibs6M0W2dYWkzCzoMe7JX3BJMqnc_nQ",
        role: "Data & Systems Specialist",
        batch: "2024",
      },
    ],
  },
  {
    id: "job-traveloka-data-analyst",
    title: "Product Data Analyst",
    company: "Traveloka",
    companyLogo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80",
    location: "Tangerang Selatan, Banten",
    workModel: "Hybrid",
    employmentType: "Penuh Waktu (Full-time)",
    experienceLevel: "Junior (0-2 tahun)",
    salaryRange: "Rp 11.000.000 - Rp 16.500.000 / bulan",
    datePosted: "Baru saja",
    applicantsCount: 16,
    isEasyApply: true,
    isPartner: true,
    industry: "Travel & Lifestyle Superapp",
    companySize: "2.000+ Karyawan",
    companyWebsite: "https://traveloka.com",
    aboutCompany: "Traveloka adalah platform perjalanan dan gaya hidup terkemuka di Asia Tenggara yang memberikan akses pemesanan tiket, akomodasi, dan layanan finansial.",
    description: "Kami mencari Product Data Analyst yang berorientasi pada data insights untuk membantu Product Manager memahami tren perilaku pengguna, konversi transaksi, dan peluang monetisasi fitur baru.",
    responsibilities: [
      "Merancang metrik performa produk dan membangun dashboard interaktif (Tableau / Looker / Metabase).",
      "Menjalankan query SQL kompleks di Google BigQuery untuk ekstraksi dan pemodelan data harian.",
      "Menganalisis hasil eksperimen A/B testing dan memberikan rekomendasi strategis ke tim bisnis.",
      "Menyusun laporan data bulanan yang komprehensif bagi pemangku kepentingan.",
    ],
    qualifications: [
      "Keahlian tinggi dalam SQL analitis (Window Functions, Aggregations, Joins).",
      "Mahir Python atau R untuk analisis statistik dan pembersihan data.",
      "Pengalaman menggunakan Tableau, Power BI, atau Google Looker Studio.",
      "Komunikasi yang jelas dalam mempresentasikan data teknis ke audiens non-teknis.",
    ],
    skillsRequired: ["SQL", "Data Analysis", "Python", "Tableau", "Looker", "BigQuery", "A/B Testing"],
    benefits: [
      "Traveloka Employee Travel Credit voucher tahunan",
      "Asuransi Kesehatan Pribadi & Tanggungan Keluarga",
      "Lingkungan kerja hybrid yang fleksibel (2 hari kantor, 3 hari WFH)",
      "Program mentoring langsung bersama Head of Analytics",
    ],
    alumniConnections: [
      {
        name: "Kuswanto, S.E",
        avatar: "https://i.pravatar.cc/150?img=12",
        role: "Advisory Partner",
        batch: "2023",
      },
    ],
  },
  {
    id: "job-dana-backend",
    title: "Backend Engineer (Go & Microservices)",
    company: "DANA Indonesia",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
    location: "Jakarta Selatan, DKI Jakarta",
    workModel: "Jarak Jauh (Remote)",
    employmentType: "Penuh Waktu (Full-time)",
    experienceLevel: "Mid-Level (2-4 tahun)",
    salaryRange: "Rp 15.000.000 - Rp 23.000.000 / bulan",
    datePosted: "4 hari lalu",
    applicantsCount: 62,
    isEasyApply: true,
    isPartner: true,
    industry: "Dompet Digital & FinTech",
    companySize: "1.000+ Karyawan",
    companyWebsite: "https://dana.id",
    aboutCompany: "DANA adalah dompet digital berplatform terbuka yang siap dimanfaatkan untuk mendukung setiap aktivitas ekonomi dan gaya hidup digital masyarakat Indonesia.",
    description: "Bergabunglah dengan tim core payment system DANA untuk menangani jutaan transaksi digital berkecepatan tinggi per hari dengan tingkat ketersediaan 99.99%.",
    responsibilities: [
      "Merancang dan mengembangkan REST & gRPC API menggunakan Golang.",
      "Mengelola arsitektur event-driven dengan Apache Kafka dan Redis caching.",
      "Mengoptimalkan performa database relasional (PostgreSQL) dan NoSQL (MongoDB).",
      "Menjamin standar keamanan transaksi finansial tingkat tinggi (PCI-DSS compliance).",
    ],
    qualifications: [
      "Pengalaman kuat pemrograman Golang atau Java/Node.js.",
      "Memahami distributed systems, concurrency pattern, dan message broker (Kafka/RabbitMQ).",
      "Terbiasa dengan arsitektur microservices dan Kubernetes deployment.",
    ],
    skillsRequired: ["Golang", "Microservices", "PostgreSQL", "Kafka", "Redis", "Docker", "Kubernetes"],
    benefits: [
      "100% Full Remote dari mana saja di Indonesia",
      "Tunjangan Internet & Perlengkapan Kerja Bulanan",
      "Bonus Tahunan & ESOP Stock Option",
      "Asuransi Rawat Inap & Rawat Jalan Mandiri Inhealth",
    ],
    alumniConnections: [],
  },
  {
    id: "job-telkom-intern",
    title: "Cloud & DevOps Engineering Intern",
    company: "Telkom Indonesia (Telkom DigitLab)",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
    location: "Semarang / Bandung",
    workModel: "Hybrid",
    employmentType: "Magang (Internship)",
    experienceLevel: "Magang",
    salaryRange: "Rp 4.500.000 - Rp 6.000.000 / bulan",
    datePosted: "2 hari lalu",
    applicantsCount: 94,
    isEasyApply: true,
    isPartner: true,
    industry: "Telekomunikasi & Layanan Digital",
    companySize: "20.000+ Karyawan",
    companyWebsite: "https://telkom.co.id",
    aboutCompany: "Telkom Indonesia adalah BUMN telekomunikasi dan penyedia jaringan telekomunikasi serta layanan digital terbesar di Indonesia.",
    description: "Program magang intensif 6 bulan bagi mahasiswa semester akhir dan fresh graduate alumni Bengkel Koding untuk mendalami infrastruktur cloud nasional, CI/CD pipeline, dan monitoring sistem.",
    responsibilities: [
      "Membantu konfigurasi pipeline CI/CD menggunakan GitLab CI dan GitHub Actions.",
      "Mempelajari orkestrasi kontainer Kubernetes dan Terraform Infrastructure-as-Code.",
      "Membangun dashboard monitoring metrik menggunakan Prometheus dan Grafana.",
      "Mendampingi tim senior dalam audit performa infrastruktur server.",
    ],
    qualifications: [
      "Mahasiswa tingkat akhir atau alumni fresh graduate jurusan rumpun informatika.",
      "Fasih dasar sistem operasi Linux dan bash scripting.",
      "Memahami dasar Git, Docker, dan jaringan komputer.",
      "Memiliki motivasi tinggi untuk belajar cloud computing (AWS / GCP / OpenStack).",
    ],
    skillsRequired: ["Linux", "Docker", "Git", "CI/CD", "DevOps", "Kubernetes", "Bash"],
    benefits: [
      "Uang saku magang kompetitif + Sertifikat Resmi Telkom DigitLab",
      "Peluang rekrutmen langsung ke program Management Trainee",
      "Bimbingan 1-on-1 bersama Cloud Architect Telkom",
      "Akses penuh ke server cloud laboratorium untuk riset",
    ],
    alumniConnections: [
      {
        name: "Gesang Bagas Wicaksono",
        avatar: "https://i.pravatar.cc/150?img=11",
        role: "DevOps Engineer",
        batch: "2023",
      },
    ],
  },
  {
    id: "job-blibli-data-science",
    title: "Data Scientist (Recommendation Engine)",
    company: "Blibli (PT Global Digital Niaga Tbk)",
    companyLogo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=120&auto=format&fit=crop&q=80",
    location: "Jakarta Barat / D.I. Yogyakarta",
    workModel: "Hybrid",
    employmentType: "Penuh Waktu (Full-time)",
    experienceLevel: "Junior (0-2 tahun)",
    salaryRange: "Rp 11.500.000 - Rp 17.000.000 / bulan",
    datePosted: "5 hari lalu",
    applicantsCount: 39,
    isEasyApply: true,
    isPartner: true,
    industry: "E-Commerce & Logistik Digital",
    companySize: "3.000+ Karyawan",
    companyWebsite: "https://blibli.com",
    aboutCompany: "Blibli adalah ekosistem perdagangan dan gaya hidup omnichannel terkemuka di Indonesia yang melayani konsumen B2C dan B2B.",
    description: "Kami mengundang Data Scientist muda berbakat untuk meningkatkan algoritma mesin pencarian produk dan rekomendasi personalisasi Blibli guna mendorong kepuasan jutaan pelanggan belanja daring.",
    responsibilities: [
      "Mengembangkan model Collaborative Filtering, Deep Learning recommendation, dan semantic search.",
      "Mengeksekusi pengolahan big data di ekosistem Apache Spark dan HDFS.",
      "Mengukur uplift transaksi melalui kerangka kerja pengujian A/B.",
    ],
    qualifications: [
      "Lulusan S1 Informatika, Matematika, Statistika, atau Sains Data.",
      "Keahlian mumpuni dalam Python, SQL, Spark, Scikit-learn, dan PyTorch.",
      "Familiar dengan algoritma Information Retrieval dan NLP embedding.",
    ],
    skillsRequired: ["Python", "Data Science", "Machine Learning", "PyTorch", "Spark", "SQL"],
    benefits: [
      "Voucher diskon belanja Blibli khusus karyawan",
      "Asuransi Kesehatan Kelas 1",
      "Kredit pengembangan diri tahunan untuk seminar internasional",
      "Kultur kerja kolaboratif bergaya Silicon Valley",
    ],
    alumniConnections: [],
  },
];

// Helper penyimpanan lokal
function loadSavedJobs() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("bengkod_saved_jobs");
    return raw ? JSON.parse(raw) : ["job-goto-ai-eng"];
  } catch {
    return [];
  }
}

function saveSavedJobs(ids) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("bengkod_saved_jobs", JSON.stringify(ids));
  } catch {}
}

function loadJobApplications() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("bengkod_job_applications");
    if (raw) return JSON.parse(raw);
    // Data bawaan contoh untuk pengalaman awal yang realistis
    return [
      {
        id: "app-default-1",
        jobId: "job-mandiri-frontend",
        jobTitle: "Frontend Web Developer (Next.js & TypeScript)",
        company: "PT Bank Mandiri (Persero) Tbk - Digital Banking",
        companyLogo: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80",
        applicantName: "Aisha Dwi Rahmawati",
        applicantEmail: "aisha.rahma@alumni.dinus.ac.id",
        applicantPhone: "+62 812-3456-7890",
        applicantLocation: "Jakarta Pusat / Semarang (Di Kantor)",
        resumeFileName: "CV_Aisha_Dwi_Rahmawati_2026.pdf",
        portfolioUrl: "https://github.com/aishaadr",
        linkedinUrl: "https://linkedin.com/in/aisharah",
        coverNote: "Saya sangat tertarik berkontribusi pada pengembangan arsitektur frontend web Livin' by Mandiri dengan pengalaman Next.js & TypeScript saya.",
        status: "Ditinjau oleh HR",
        appliedAt: "2 hari yang lalu",
      },
      {
        id: "app-default-2",
        jobId: "job-goto-ai-eng",
        jobTitle: "Junior AI & Machine Learning Engineer",
        company: "GoTo Group (Gojek & Tokopedia)",
        companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
        applicantName: "Aisha Dwi Rahmawati",
        applicantEmail: "aisha.rahma@alumni.dinus.ac.id",
        applicantPhone: "+62 812-3456-7890",
        applicantLocation: "Jakarta Selatan, DKI Jakarta (Gabungan)",
        resumeFileName: "CV_Aisha_Dwi_Rahmawati_2026.pdf",
        portfolioUrl: "https://github.com/aishaadr",
        linkedinUrl: "https://linkedin.com/in/aisharah",
        coverNote: "Tertarik dengan inovasi machine learning terapan pada ekosistem GoTo.",
        status: "Lamaran Terkirim",
        appliedAt: "1 minggu yang lalu",
      },
      {
        id: "app-default-3",
        jobId: "job-traveloka-data-analyst",
        jobTitle: "Product Data Analyst",
        company: "Traveloka",
        companyLogo: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&auto=format&fit=crop&q=80",
        applicantName: "Aisha Dwi Rahmawati",
        applicantEmail: "aisha.rahma@alumni.dinus.ac.id",
        applicantPhone: "+62 812-3456-7890",
        applicantLocation: "Tangerang Selatan, Banten (Di Kantor)",
        resumeFileName: "CV_Aisha_Dwi_Rahmawati_2026.pdf",
        portfolioUrl: "https://github.com/aishaadr",
        linkedinUrl: "https://linkedin.com/in/aisharah",
        coverNote: "Memiliki keahlian data analytics dan SQL untuk product insights.",
        status: "Wawancara Teknis",
        appliedAt: "2 minggu yang lalu",
      },
    ];
  } catch {
    return [];
  }
}

function saveJobApplications(apps) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("bengkod_job_applications", JSON.stringify(apps));
  } catch {}
}

// ===================== mediaUtils.ts =====================
// ============================================================
// MEDIA HELPERS (satu sumber kebenaran)
// Dipakai oleh MediaPicker, EditProjectModal, AddProjectModal,
// dan kartu proyek di page.tsx, supaya perilaku "thumbnail
// mengikuti tautan / gambar" konsisten di semua tempat.
// ============================================================

// ------------------------------------------------------------
// TIPE DATA
// ------------------------------------------------------------

/**
 * Nilai yang dipertukarkan antara MediaPicker dan modal proyek.
 * linkUrl & imageUrl diturunkan otomatis dari `items` agar kartu proyek
 * di page.tsx (yang memakai linkUrl/imageUrl) tetap bekerja tanpa perubahan.
 * `items` bersifat opsional supaya kode lama ({ linkUrl, imageUrl }) tetap valid.
 */

const MAX_MEDIA_ITEMS = 10;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

// ------------------------------------------------------------
// URL
// ------------------------------------------------------------

/**
 * Normalisasi tautan yang diketik user.
 * Menambahkan "https://" bila user menempel tanpa protokol
 * (mis. "github.com/user/repo" → "https://github.com/user/repo").
 * Mengembalikan "" bila tidak bisa diparsing.
 */
function normalizeUrl(raw) {
  const s = (raw || "").trim();
  if (!s) return "";
  const withProto = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withProto);
    if (!u.hostname.includes(".")) return "";
    return u.toString();
  } catch {
    return "";
  }
}

/** URL favicon (ikon) dari sebuah tautan. */
function faviconFor(link) {
  const norm = normalizeUrl(link);
  if (!norm) return "";
  try {
    const host = new URL(norm).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  } catch {
    return "";
  }
}

/** Nama host yang rapi untuk ditampilkan (tanpa www). */
function hostFor(link) {
  const norm = normalizeUrl(link);
  if (!norm) return "";
  try {
    return new URL(norm).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const safeDecode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

/**
 * Saran judul dari sebuah tautan.
 *   github.com/aishaadr/Smart-Restroom  →  "aishaadr/Smart-Restroom"
 *   youtube.com/watch?v=abc              →  "youtube.com/watch"
 */
function suggestTitleFromUrl(link) {
  const norm = normalizeUrl(link);
  if (!norm) return "";
  try {
    const u = new URL(norm);
    const host = u.hostname.replace(/^www\./, "");
    const segs = u.pathname.split("/").filter(Boolean).map(safeDecode);

    if ((host === "github.com" || host === "gitlab.com") && segs.length >= 2) {
      return `${segs[0]}/${segs[1].replace(/\.git$/i, "")}`;
    }

    const full = `${host}${segs.length ? `/${segs.join("/")}` : ""}`;
    return full.length > 80 ? `${full.slice(0, 77)}...` : full;
  } catch {
    return "";
  }
}

/**
 * Gambar pratinjau (social preview) untuk tautan yang mendukungnya.
 * Saat ini: repositori GitHub (github.com/pemilik/repo).
 * Mengembalikan "" bila tidak ada; pemanggil jatuh ke favicon.
 */
function previewImageFor(link) {
  const norm = normalizeUrl(link);
  if (!norm) return "";
  try {
    const u = new URL(norm);
    if (u.hostname.replace(/^www\./, "") !== "github.com") return "";
    const segs = u.pathname.split("/").filter(Boolean);
    if (segs.length < 2) return "";
    return `https://opengraph.githubassets.com/1/${segs[0]}/${segs[1].replace(/\.git$/i, "")}`;
  } catch {
    return "";
  }
}

// ------------------------------------------------------------
// BERKAS GAMBAR
// ------------------------------------------------------------

/** "Smart-Restroom_v2.png" → "Smart Restroom v2" */
function titleFromFileName(name) {
  return (name || "")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Mengembalikan pesan error, atau "" bila berkas valid. */
function validateImageFile(file) {
  if (!file.type.startsWith("image/")) return "Berkas harus berupa gambar (PNG, JPG, atau WEBP).";
  if (file.size > MAX_IMAGE_BYTES) return "Ukuran gambar maksimal 5 MB.";
  return "";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Format berkas tidak didukung."));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Gagal membaca berkas."));
    reader.readAsDataURL(file);
  });
}

/** ID unik untuk media baru. Panggil hanya di event handler (bukan saat render). */
function newMediaId() {
  return `media-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ------------------------------------------------------------
// KONVERSI  MediaValue  ⇄  daftar MediaItem  ⇄  ProjectItem
// ------------------------------------------------------------

/**
 * Ambil daftar media dari sebuah nilai.
 * Data lama (hanya linkUrl / imageUrl) otomatis dikonversi menjadi item.
 */
function itemsFromValue(value) {
  if (value.items) return value.items;

  const items = [];
  const link = normalizeUrl(value.linkUrl);
  if (link) {
    items.push({
      id: "legacy-link",
      kind: "link",
      url: link,
      title: suggestTitleFromUrl(link) || "Tautan proyek",
      description: "",
    });
  }
  if (value.imageUrl) {
    items.push({
      id: "legacy-image",
      kind: "image",
      url: value.imageUrl,
      title: "Gambar proyek",
      description: "",
      thumbnail: value.imageUrl,
    });
  }
  return items;
}

/**
 * Susun MediaValue dari daftar item.
 *  - linkUrl  : tautan dari media link pertama
 *  - imageUrl : gambar dari media pertama yang punya gambar
 *               (gambar unggahan, atau thumbnail kustom dari link)
 */
function valueFromItems(items) {
  const firstLink = items.find((i) => i.kind === "link");

  let imageUrl = "";
  for (const i of items) {
    if (i.kind === "image" && i.url) {
      imageUrl = i.url;
      break;
    }
    if (i.kind === "link" && i.thumbnail) {
      imageUrl = i.thumbnail;
      break;
    }
  }

  return { linkUrl: firstLink?.url || "", imageUrl, items };
}

/** Dari proyek tersimpan (baru: ada `media`, lama: linkUrl/imageUrl) ke nilai MediaPicker. */
function projectToMediaValue(p) {
  const items =
    p.media && p.media.length > 0
      ? p.media
      : itemsFromValue({ linkUrl: p.linkUrl || "", imageUrl: p.imageUrl || "" });
  return valueFromItems(items);
}

/** Dari nilai MediaPicker ke field proyek: { linkUrl, imageUrl, media }. */
function mediaToProjectFields(value) {
  const items = itemsFromValue(value);
  const v = valueFromItems(items);
  return { linkUrl: v.linkUrl, imageUrl: v.imageUrl, media: items };
}