/**
 * Data & helper bersama role Alumni — konversi langsung dari lms-bengkod-web:
 *   _components/postsData.ts, alumniDirectory.ts, jobsData.ts, mediaUtils.ts
 * (tipe TypeScript dihapus, isi data tidak diubah).
 *
 * Halaman alumni sekarang memakai data.js (versi revisi). File ini tinggal dipakai
 * forum koordinator lewat assets/js/forum-feed.js (loadPosts dan savePosts).
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
    date: "03 Nov 2026",
    content: "Alhamdulillah! Sentimeter AI resmi meluncur ke publik setelah uji performa bersama rekan-rekan laboratorium. Engine ini siap menganalisis opini dan sentimen pelanggan dengan akurasi 94%.\n\nSilakan coba versi live-nya dan bagikan masukan Anda!",
    category: "Karya & Showcase",
    visibility: "Semua orang",
    imageUrl: DEFAULT_AVATAR,
    likes: 24,
    isLiked: false,
    commentsCount: 12,
    repostsCount: 18,
    impressions: 740,
    karya: {
      nama: "Sentimeter AI",
      tagline: "Engine analisis sentimen ulasan publik multi-bahasa",
      pitch: "Sentimeter AI is the fastest way to understand customer sentiment and public opinion across languages.",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewsCount: 28,
      followersCount: "1.4K",
      categoryTags: ["AI Analytics", "NLP Tools", "Sentiment Intelligence"],
      tahap: "live",
      url: "https://sentimeter.bengkelkoding.com",
      stack: ["Python", "PyTorch", "Next.js", "Docker", "FastAPI"],
      screenshots: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
      ],
      overview: "Sentimeter AI dikembangkan untuk memecahkan problem analisis ulasan pelanggan berskala besar di Indonesia yang menggunakan bahasa gaul, sarkasme, dan percampuran multi-bahasa (code-switching). Dengan model deep learning transformer yang di-fine-tune khusus, platform ini mampu mendeteksi polaritas emosi teks secara real-time dengan latensi di bawah 120ms.",
      upvotes: 28,
      isUpvoted: false,
      feedbacks: [
        { id: "fb-1", author: "Dimas Aryo", category: "Apresiasi", text: "Latency inferensi sangat stabil di bawah 120ms, keren banget!", status: "Diterapkan", date: "02 Nov 2026" },
        { id: "fb-2", author: "Clarista", category: "UI/UX", text: "Visualisasi confusion matrix di dashboard sangat informatif.", status: "Diterapkan", date: "03 Nov 2026" }
      ]
    }
  },
  {
    id: 3,
    authorName: "Dimas Aryo",
    authorAvatar: "https://i.pravatar.cc/150?img=15",
    authorHeadline: "Backend Engineer | Golang, Node.js & Cloud Infrastructure · Batch 2023",
    date: "02 Nov 2026",
    content: "Halo rekan-rekan alumni Bengkel Koding! Saya baru saja merilis MVP Bengkod Git Slicer ke server staging. Alat ini otomatis mengonversi design token Figma langsung menjadi konfigurasi Tailwind CSS v4.\n\nButuh bantuan rekan-rekan untuk uji coba dan laporan bug di bawah!",
    category: "Karya & Showcase",
    visibility: "Semua orang",
    imageUrl: "",
    likes: 15,
    isLiked: false,
    commentsCount: 8,
    repostsCount: 9,
    impressions: 430,
    karya: {
      nama: "Bengkod Git Slicer",
      tagline: "Figma to Tailwind CSS v4 design token generator",
      pitch: "Bengkod Git Slicer bridges design systems and production code by converting Figma tokens into Tailwind configs.",
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=120&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 14,
      followersCount: "820",
      categoryTags: ["Developer Tools", "Design Systems", "CLI Utilities"],
      tahap: "beta",
      url: "https://staging-slicer.bengkelkoding.dev",
      stack: ["TypeScript", "Node.js", "Tailwind CSS", "Figma API"],
      screenshots: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
      ],
      overview: "Alat open-source untuk developer yang ingin memangkas waktu slicing UI dari Figma. Mendukung ekstraksi color styles, typography tokens, border radii, dan flex layout spacing secara otomatis menjadi Tailwind theme extend JSON.",
      upvotes: 14,
      isUpvoted: false,
      feedbacks: [
        { id: "fb-3", author: "Intan Permata", category: "UI/UX", text: "Dropdown export font family terpotong di resolusi tablet.", status: "Diperbaiki", date: "02 Nov 2026" },
        { id: "fb-4", author: "Fajar Nugroho", category: "Bug", text: "Hex color 8-digit alpha kadang parsing error saat di-export.", status: "Pending", date: "03 Nov 2026" }
      ]
    }
  },
  {
    id: 4,
    authorName: "Intan Permata",
    authorAvatar: "https://i.pravatar.cc/150?img=48",
    authorHeadline: "Frontend Engineer | React, Vue & Design Systems · Batch 2024",
    date: "01 Nov 2026",
    content: "Sedang mengembangkan CoopDesk ERP, prototipe sistem kasir dan pencatatan inventaris koperasi digital. Mohon masukan terkait alur checkout kasirnya ya rekan-rekan!",
    category: "Karya & Showcase",
    visibility: "Semua orang",
    imageUrl: "",
    likes: 9,
    isLiked: false,
    commentsCount: 5,
    repostsCount: 4,
    impressions: 310,
    karya: {
      nama: "CoopDesk ERP",
      tagline: "Point of Sale & inventory digital koperasi UMKM",
      pitch: "CoopDesk ERP is a lightweight, responsive point-of-sale system tailored for campus cooperatives and retail micro-businesses.",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
      rating: 4.8,
      reviewsCount: 9,
      followersCount: "430",
      categoryTags: ["Point of Sale", "Retail ERP", "Offline-First PWA"],
      tahap: "beta",
      url: "https://coopdesk-demo.bengkelkoding.dev",
      stack: ["React", "Tailwind CSS", "SQLite", "PWA"],
      screenshots: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
      ],
      overview: "Sistem kasir web offline-first yang dirancang untuk kebutuhan koperasi mahasiswa dan unit usaha kecil. Dilengkapi fitur pencatatan stok otomatis, barcode scanning via webcam, dan laporan laba rugi harian yang dapat diakses dari browser maupun smartphone.",
      upvotes: 9,
      isUpvoted: false,
      feedbacks: [
        { id: "fb-5", author: "Maulidya Ayu", category: "UI/UX", text: "Shortcut keyboard tombol F2 untuk cari barang sudah pas dan responsif.", status: "Diterapkan", date: "02 Nov 2026" }
      ]
    }
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
  {
    id: 5,
    authorName: "Aisha Dwi Rahmawati",
    authorAvatar: DEFAULT_AVATAR,
    authorHeadline: "Data Scientist & Data Analyst | Undergraduate Student at Dian Nuswantoro University",
    date: "03 Nov 2026",
    content: "Halo rekan-rekan asisten Bengkel Koding! Divisi AI/Data di kantor kami sedang membuka posisi Backend Developer Intern untuk menangani pipeline ETL dan microservices analitik. Kriteria utama: familiar dengan Python/Node.js, paham REST API dan siap belajar arsitektur cloud. Silakan kirimkan CV dan perkenalan singkat lewat tombol di bawah!",
    category: "Internal Referral",
    visibility: "Semua orang",
    imageUrl: "",
    likes: 8,
    isLiked: false,
    commentsCount: 4,
    repostsCount: 3,
    impressions: 290,
    jenis: "referral",
    referral: {
      perusahaan: "PT Solusi Digital Jateng",
      posisi: "Backend Developer Intern",
      level: "Magang/Freshgrad",
      batas: "2026-11-20",
    },
    pengajuan: [
      {
        id: 101,
        authorName: "Yoga Kurniawan",
        authorAvatar: "https://i.pravatar.cc/150?img=33",
        authorHeadline: "Backend Developer · Batch 2023",
        format: "ats",
        pesan: "Halo Aisha! Saya sangat tertarik dengan posisi Backend Developer Intern ini. Saya sudah terbiasa membangun API dengan Node.js dan PostgreSQL di berbagai proyek lab dan siap kerja hybrid di Semarang.",
        status: "menunggu",
        masukan: "",
        waktu: "2026-11-04T09:15:00",
        no_hp: "081234567890",
        linkedin: "https://linkedin.com/in/yogakurniawan",
      },
    ],
  },
  {
    id: 6,
    authorName: "Dimas Aryo",
    authorAvatar: "https://i.pravatar.cc/150?img=15",
    authorHeadline: "Backend Engineer | Golang, Node.js & Cloud Infrastructure · Batch 2023",
    date: "02 Nov 2026",
    content: "Di PT Awan Nusantara ada lowongan Junior Mobile Developer untuk proyek aplikasi mobile logistik. Dibutuhkan yang punya dasar Flutter atau React Native dan terbiasa consume API. Boleh langsung minta referral di bawah!",
    category: "Internal Referral",
    visibility: "Semua orang",
    imageUrl: "",
    likes: 12,
    isLiked: false,
    commentsCount: 6,
    repostsCount: 5,
    impressions: 410,
    jenis: "referral",
    referral: {
      perusahaan: "PT Awan Nusantara",
      posisi: "Junior Mobile Developer",
      level: "Junior (1-2 tahun)",
      batas: "2026-11-25",
    },
    pengajuan: [],
  },
  {
    id: 7,
    authorName: "Intan Permata",
    authorAvatar: "https://i.pravatar.cc/150?img=48",
    authorHeadline: "Frontend Engineer | React, Vue & Design Systems · Batch 2024",
    date: "25 Okt 2026",
    content: "Info referral untuk posisi UI/UX Designer di Studio Inovasi sudah ditutup ya rekan-rekan. Terima kasih banyak untuk rekan alumni yang sudah mengajukan!",
    category: "Internal Referral",
    visibility: "Semua orang",
    imageUrl: "",
    likes: 5,
    isLiked: false,
    commentsCount: 2,
    repostsCount: 1,
    impressions: 190,
    jenis: "referral",
    referral: {
      perusahaan: "Studio Inovasi",
      posisi: "UI/UX Designer",
      level: "Junior (1-2 tahun)",
      batas: "2026-10-31",
    },
    pengajuan: [],
  },
];

const OPSI_LEVEL_REFERRAL = ["Magang/Freshgrad", "Junior (1-2 tahun)", "Mid"];

const STORAGE_KEY = "bengkod_alumni_posts_v2";

function loadPosts() {
  if (typeof window === "undefined") return INITIAL_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Auto-merge if new seed posts are not present
      const existingIds = new Set(parsed.map(p => p.id));
      const missing = INITIAL_POSTS.filter(p => !existingIds.has(p.id));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
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

// ===================== Proyek & Portofolio Storage (Two-Way Sync) =====================
const PROJECTS_STORAGE_KEY = "bengkod_alumni_projects_v2";

function loadStoredProjects() {
  if (typeof window === "undefined") return typeof INITIAL_PROJECTS !== "undefined" ? INITIAL_PROJECTS : [];
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) {
      if (typeof INITIAL_PROJECTS !== "undefined") {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {}
  return typeof INITIAL_PROJECTS !== "undefined" ? INITIAL_PROJECTS : [];
}

function saveStoredProjects(projects) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("bengkod_projects_updated"));
  } catch (err) {
    console.error("Gagal menyimpan proyek:", err);
  }
}

function syncProjectToFeed(project, author) {
  if (!project || !project.title) return;
  const authorName = (author && author.name) || "Aisha Dwi Rahmawati";
  const authorAvatar = (author && author.avatarUrl) || DEFAULT_AVATAR;
  const authorHeadline = (author && author.headline) || "Alumni Bengkel Koding";

  const posts = typeof loadPosts === "function" ? loadPosts() : [];
  const existingIdx = posts.findIndex(p => p.karya && (p.karya.projectId === project.id || (p.karya.nama && p.karya.nama.toLowerCase() === project.title.toLowerCase())));

  const toList = (v) => (Array.isArray(v) ? v : (typeof v === "string" ? v.split(",").map(s => s.trim()).filter(Boolean) : []));
  const categoryTags = project.category ? toList(project.category) : (project.categoryTags || ["Software"]);
  const demoUrl = project.linkUrl || project.demoUrl || undefined;
  const logoUrl = project.logoUrl || undefined;
  const bannerUrl = project.bannerUrl || project.imageUrl || undefined;
  const screenshots = bannerUrl ? [bannerUrl] : (project.screenshots || []);

  const karyaObj = {
    projectId: project.id,
    nama: project.title,
    tagline: project.tagline || (project.desc ? project.desc.slice(0, 100) : "Karya inovatif alumni Bengkel Koding"),
    pitch: project.pitch || project.tagline || project.desc || undefined,
    categoryTags: categoryTags.length > 0 ? categoryTags : ["Software"],
    url: demoUrl,
    logo: logoUrl || bannerUrl,
    bannerUrl: bannerUrl,
    screenshots: screenshots,
    stack: project.tags || [],
    overview: project.desc || undefined,
    contributors: project.contributors || [],
    upvotes: 1,
    isUpvoted: true,
    feedbacks: [],
  };

  if (existingIdx >= 0) {
    posts[existingIdx].karya = { ...posts[existingIdx].karya, ...karyaObj };
  } else {
    const newPost = {
      id: Date.now(),
      authorName: authorName,
      authorAvatar: authorAvatar,
      authorHeadline: authorHeadline,
      date: "Baru saja",
      category: "Karya & Showcase",
      content: "", // Postingan karya tampil sebagai kartu saja, tanpa teks pengantar
      visibility: "Semua orang",
      karya: karyaObj,
      likes: 1,
      isLiked: true,
      commentsCount: 0,
      repostsCount: 0,
      impressions: 1,
    };
    posts.unshift(newPost);
  }

  if (typeof savePosts === "function") savePosts(posts);
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
  {
    id: "nadjwa-salsabila",
    name: "Nadjwa Salsabila",
    headline: "UI/UX Designer · Tokopedia | Product Design & Design Systems",
    batch: "2023",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=25",
    industry: "E-Commerce & Digital Design",
    email: "nadjwa.salsabila@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/nadjwasalsabila",
    connections: 210,
    followers: 245,
    isVerified: true,
    about:
      "Product Designer yang berfokus pada checkout experience dan design token system di e-commerce platform. Alumnus Bengkel Koding angkatan 2023.",
  },
  {
    id: "maulidya-ayu-pratiwi",
    name: "Maulidya Ayu Pratiwi",
    headline: "Frontend Developer · Gojek | React, TypeScript & Microfrontend",
    batch: "2024",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=26",
    industry: "Teknologi, Informasi, dan Internet",
    email: "maulidya.ayu@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/maulidyaayu",
    github: "https://github.com/maulidyaayu",
    connections: 184,
    followers: 198,
    isVerified: true,
    about:
      "Mengembangkan performant merchant web application di ekosistem GoTo. Berpengalaman dengan modern React, Tailwind CSS, dan testing.",
  },
  {
    id: "alvyan-anantama",
    name: "Alvyan Anantama",
    headline: "Data Analyst · Traveloka | Product Analytics & Growth Strategy",
    batch: "2023",
    location: "Kota Tangerang, Banten, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    industry: "Online Travel & Lifestyle",
    email: "alvyan.anantama@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/alvyananantama",
    connections: 165,
    followers: 178,
    isVerified: true,
    about:
      "Menganalisis funnel konversi pengguna dan mengoptimalkan performa kampanye promosi menggunakan SQL, Python, dan Tableau di Traveloka.",
  },
  {
    id: "budi-santoso",
    name: "Budi Santoso",
    headline: "DevOps Engineer · Tiket.com | Kubernetes, CI/CD & Cloud Infra",
    batch: "2022",
    location: "Jakarta Pusat, DKI Jakarta, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=60",
    industry: "Cloud & DevOps Infrastructure",
    email: "budi.santoso@alumni.dinus.ac.id",
    github: "https://github.com/budisantoso-dev",
    connections: 140,
    followers: 155,
    isVerified: true,
    about:
      "Merancang pipeline CI/CD otomatis, containerization dengan Kubernetes, dan sistem observabilitas monitoring 24/7.",
  },
  {
    id: "rizky-firmansyah",
    name: "Rizky Firmansyah",
    headline: "Fullstack Developer · Koinworks | Go, Node.js & React",
    batch: "2024",
    location: "Kota Semarang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    industry: "Finansial & Teknologi (Fintech)",
    email: "rizky.firmansyah@alumni.dinus.ac.id",
    github: "https://github.com/rizkyfirman",
    connections: 132,
    followers: 147,
    isVerified: true,
    about:
      "Mengembangkan layanan pembayaran digital dan arsitektur microservices yang aman dan dapat diskalakan.",
  },
  {
    id: "dewi-rahmawati",
    name: "Dewi Rahmawati",
    headline: "QA Engineer · Kredivo | Automated Testing & Quality Assurance",
    batch: "2023",
    location: "Kota Surakarta, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=49",
    industry: "Fintech & Software QA",
    email: "dewi.rahmawati@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/dewirahmawati-qa",
    connections: 118,
    followers: 129,
    isVerified: true,
    about:
      "Spesialis dalam pengujian otomatis E2E menggunakan Playwright dan Cypress untuk memastikan kualitas rilis aplikasi kredit digital.",
  },
  {
    id: "sindu-aditya-putra",
    name: "Sindu Aditya Putra",
    headline: "Backend Engineer · Shopee | Golang, Microservices & Distributed Systems",
    batch: "2023",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=59",
    industry: "E-Commerce & Logistik Digital",
    email: "sindu.aditya@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/sinduaditya",
    github: "https://github.com/sinduaditya",
    connections: 195,
    followers: 215,
    isVerified: true,
    about:
      "Fokus pada perancangan arsitektur backend berkapasitas throughput tinggi, message queue Kafka, dan integrasi payment gateway ShopeePay.",
  },
  {
    id: "taliya-maharani",
    name: "Taliya Maharani",
    headline: "Product Manager · GoTo | Product Strategy & User Discovery",
    batch: "2023",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    industry: "Internet & Layanan On-Demand",
    email: "taliya.maharani@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/taliyamaharani",
    connections: 230,
    followers: 260,
    isVerified: true,
    about:
      "Mengelola siklus pengembangan produk digital mulai dari user problem validation, roadmap per kuartal, hingga peluncuran fitur driver and merchant app di Gojek.",
  },
  {
    id: "andi-pratama",
    name: "Andi Pratama",
    headline: "Mobile Developer · Bukalapak | Android Native, Kotlin & Flutter",
    batch: "2024",
    location: "Kota Semarang, Jawa Tengah, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=18",
    industry: "E-Commerce & Mobile Apps",
    email: "andi.pratama@alumni.dinus.ac.id",
    github: "https://github.com/andipratama-dev",
    connections: 142,
    followers: 156,
    isVerified: true,
    about:
      "Mobile engineer dengan pengalaman merilis aplikasi berskala jutaan unduhan. Penggemar Clean Architecture, Jetpack Compose, dan Flutter cross-platform.",
  },
  {
    id: "siti-nuraini",
    name: "Siti Nuraini",
    headline: "Data Scientist · Grab | Predictive Modeling & Dynamic Pricing",
    batch: "2023",
    location: "Jakarta Pusat, DKI Jakarta, Indonesia",
    university: "Universitas Dian Nuswantoro",
    avatarUrl: "https://i.pravatar.cc/150?img=41",
    industry: "Ride-Hailing & Layanan Data",
    email: "siti.nuraini@alumni.dinus.ac.id",
    linkedin: "https://www.linkedin.com/in/sitinuraini-ds",
    connections: 180,
    followers: 204,
    isVerified: true,
    about:
      "Menganalisis elastisitas harga demand-supply dan mengembangkan model prediktif machine learning untuk estimasi waktu kedatangan mitra pengemudi.",
  },
];

// ============================================================
// DIREKTORI PERUSAHAAN MITRA BENGKEL KODING
// Selaras dengan isian edit profile role perusahaan (mitra)
// ============================================================
const COMPANY_DIRECTORY = [
  {
    id: "pt-solusi-digital-jateng",
    name: "PT Solusi Digital Jateng",
    nama_perusahaan: "PT Solusi Digital Jateng",
    headline: "Software House & Enterprise Digital Solutions Partner",
    industry: "Software House",
    bidang_usaha: "Software House",
    location: "Kota Semarang, Jawa Tengah, Indonesia",
    city: "Semarang",
    kota: "Semarang",
    province: "Jawa Tengah",
    provinsi: "Jawa Tengah",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "50132",
    kode_pos: "50132",
    address: "Jl. Pemuda No. 120, Gedung Solusi Lt. 3",
    alamat: "Jl. Pemuda No. 120, Gedung Solusi Lt. 3",
    email: "hr@solusidigital.id",
    phone: "024-7612345",
    telepon: "024-7612345",
    website: "https://solusidigital.id",
    logoUrl: "",
    avatarText: "SD",
    coverGradient: "from-[#1E3A8A] via-[#1D4ED8] to-[#3B82F6]",
    coverImageUrl: "",
    companySize: "50 - 200 Karyawan",
    foundedYear: "2015",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 1420,
    alumniCount: 8,
    about: "PT Solusi Digital Jateng adalah perusahaan software house terkemuka di Jawa Tengah yang bergerak di bidang pengembangan aplikasi web, mobile, dan sistem integrasi enterprise. Kami telah melayani lebih dari 100 klien korporasi dan institusi sejak 2015 dengan komitmen keunggulan rekayasa perangkat lunak dan talenta muda berbakat.",
    deskripsi: "PT Solusi Digital Jateng adalah perusahaan software house yang bergerak di bidang pengembangan aplikasi web dan mobile. Kami telah melayani lebih dari 100 klien sejak 2015 dengan tim yang berpengalaman.",
    pic: {
      name: "Andi Kurniawan",
      nama: "Andi Kurniawan",
      role: "HR Manager",
      jabatan: "HR Manager",
      email: "andi.k@solusidigital.id",
      phone: "0812-3456-7890",
      telepon: "0812-3456-7890"
    },
    alumniList: [
      { name: "Rizky Pratama", role: "Backend Engineer", batch: "2023", avatar: "RP" },
      { name: "Clarista", role: "Machine Learning Engineer", batch: "2024", avatar: "CL" },
      { name: "Rizky Firmansyah", role: "Fullstack Developer", batch: "2024", avatar: "RF" }
    ],
    jobs: [
      {
        id: "job-sd-1",
        title: "Frontend Developer (React)",
        workType: "Penuh Waktu",
        location: "Semarang (Hybrid)",
        salary: "Rp 3.500.000 - Rp 5.000.000",
        posted: "3 hari lalu",
        skills: ["React", "TypeScript", "Tailwind CSS"]
      },
      {
        id: "job-sd-2",
        title: "Backend Developer (Laravel)",
        workType: "Penuh Waktu",
        location: "Semarang (Onsite)",
        salary: "Rp 4.000.000 - Rp 6.000.000",
        posted: "1 minggu lalu",
        skills: ["Laravel", "PHP", "MySQL", "REST API"]
      }
    ]
  },
  {
    id: "gojek",
    name: "Gojek (GoTo Group)",
    nama_perusahaan: "Gojek (GoTo Group)",
    headline: "Superapp Terdepan Asia Tenggara · On-Demand Services & Digital Payments",
    industry: "Teknologi & Layanan On-Demand",
    bidang_usaha: "Startup Teknologi",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12160",
    kode_pos: "12160",
    address: "Pasaraya Blok M Gedung B, Jl. Iskandarsyah II No. 2, Melawai",
    alamat: "Pasaraya Blok M Gedung B, Jl. Iskandarsyah II No. 2, Melawai",
    email: "recruitment@gojek.com",
    phone: "021-50251110",
    telepon: "021-50251110",
    website: "https://www.gojek.com",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    avatarText: "GJ",
    coverGradient: "from-[#00880C] via-[#00AA13] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "5.000+ Karyawan",
    foundedYear: "2010",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 84500,
    alumniCount: 14,
    about: "Gojek adalah platform on-demand terkemuka di Asia Tenggara dan pelopor ekosistem multi-layanan multi-sektor yang menghubungkan jutaan konsumen dengan jutaan mitra pengemudi dan merchant.",
    deskripsi: "Gojek adalah ekosistem digital terbesar di Indonesia yang menggabungkan layanan on-demand, e-commerce, dan layanan keuangan. Kami membangun solusi cerdas untuk jutaan pengguna.",
    pic: {
      name: "Maya Safitri",
      nama: "Maya Safitri",
      role: "Talent Acquisition Lead",
      jabatan: "Talent Acquisition Lead",
      email: "maya.safitri@gojek.com",
      phone: "0812-9876-5432",
      telepon: "0812-9876-5432"
    },
    alumniList: [
      { name: "Maulidya Ayu Pratiwi", role: "Frontend Developer", batch: "2024", avatar: "MA" },
      { name: "Nadia Putri", role: "Data Analyst", batch: "2023", avatar: "NP" }
    ],
    jobs: [
      {
        id: "job-goto-ai-eng",
        title: "Junior AI & Machine Learning Engineer",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Selatan",
        salary: "Rp 12.000.000 - Rp 18.000.000",
        posted: "1 hari lalu",
        skills: ["Python", "Machine Learning", "Docker", "PyTorch"]
      },
      {
        id: "job-gojek-mob",
        title: "Mobile Engineer (Flutter)",
        workType: "Penuh Waktu",
        location: "Jakarta Selatan",
        salary: "Rp 9.000.000 - Rp 14.000.000",
        posted: "4 hari lalu",
        skills: ["Flutter", "Dart", "Firebase"]
      }
    ]
  },
  {
    id: "pt-telkom-indonesia",
    name: "PT Telkom Indonesia (Persero) Tbk",
    nama_perusahaan: "PT Telkom Indonesia",
    headline: "BUMN Telekomunikasi & Digital Connectivity, Platform & Services Terbesar",
    industry: "Telekomunikasi & Layanan Digital",
    bidang_usaha: "Telekomunikasi",
    location: "Kota Bandung, Jawa Barat, Indonesia",
    city: "Bandung",
    kota: "Bandung",
    province: "Jawa Barat",
    provinsi: "Jawa Barat",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "40133",
    kode_pos: "40133",
    address: "Jl. Japati No. 1, Sadang Serang, Coblong",
    alamat: "Jl. Japati No. 1, Sadang Serang, Coblong",
    email: "hr@telkom.co.id",
    phone: "022-4521510",
    telepon: "022-4521510",
    website: "https://www.telkom.co.id",
    logoUrl: "",
    avatarText: "TL",
    coverGradient: "from-[#B00B0B] via-[#D73D3D] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "10.000+ Karyawan",
    foundedYear: "1965",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 120000,
    alumniCount: 12,
    about: "PT Telkom Indonesia adalah Badan Usaha Milik Negara (BUMN) yang bergerak di bidang jasa layanan teknologi informasi dan komunikasi serta jaringan telekomunikasi terbesar di Indonesia.",
    deskripsi: "Penyedia solusi digital dan infrastruktur telekomunikasi terdepan untuk transformasi digital Indonesia.",
    pic: {
      name: "Hendra Wijaya",
      nama: "Hendra Wijaya",
      role: "Head of Campus Recruitment",
      jabatan: "Head of Campus Recruitment",
      email: "hendra.wijaya@telkom.co.id",
      phone: "0812-3456-7890",
      telepon: "0812-3456-7890"
    },
    alumniList: [
      { name: "Rizky Pratama", role: "Backend Engineer", batch: "2023", avatar: "RP" },
      { name: "Bagas Wicaksono", role: "IoT Engineer", batch: "2022", avatar: "BW" }
    ],
    jobs: [
      {
        id: "job-telkom-cloud",
        title: "Cloud Platform Specialist",
        workType: "Penuh Waktu (Hybrid)",
        location: "Bandung / Jakarta",
        salary: "Rp 9.000.000 - Rp 14.000.000",
        posted: "5 hari lalu",
        skills: ["AWS", "Kubernetes", "Linux", "Terraform"]
      }
    ]
  },
  {
    id: "pt-data-nusantara",
    name: "PT Data Nusantara Analitika",
    nama_perusahaan: "PT Data Nusantara",
    headline: "Big Data, AI Intelligence & Business Analytics Consulting",
    industry: "Big Data & AI Services",
    bidang_usaha: "Konsultan IT",
    location: "Kabupaten Sleman, D.I. Yogyakarta, Indonesia",
    city: "Yogyakarta",
    kota: "Yogyakarta",
    province: "D.I. Yogyakarta",
    provinsi: "D.I. Yogyakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "55281",
    kode_pos: "55281",
    address: "Jl. Kaliurang KM 5.5 No. 42, Sleman",
    alamat: "Jl. Kaliurang KM 5.5 No. 42, Sleman",
    email: "contact@datanusantara.id",
    phone: "0274-567890",
    telepon: "0274-567890",
    website: "https://datanusantara.id",
    logoUrl: "",
    avatarText: "DN",
    coverGradient: "from-[#0F172A] via-[#1E3A8A] to-[#0284C7]",
    coverImageUrl: "",
    companySize: "50 - 150 Karyawan",
    foundedYear: "2018",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 3800,
    alumniCount: 5,
    about: "PT Data Nusantara Analitika adalah penyedia solusi analitik data tingkat lanjut, machine learning, dan arsitektur data warehouse bagi institusi perbankan, kesehatan, dan pemerintahan.",
    deskripsi: "Solusi end-to-end data analytics, machine learning, dan BI dashboard untuk optimalisasi keputusan bisnis.",
    pic: {
      name: "Rina Pertiwi",
      nama: "Rina Pertiwi",
      role: "People Operations Manager",
      jabatan: "People Operations Manager",
      email: "rina.p@datanusantara.id",
      phone: "0815-6789-0123",
      telepon: "0815-6789-0123"
    },
    alumniList: [
      { name: "Aisha Dwi Rahmawati", role: "Data Scientist", batch: "2024", avatar: "AD" },
      { name: "Kirana Maheswari", role: "Data Analyst", batch: "2024", avatar: "KM" }
    ],
    jobs: [
      {
        id: "job-dn-bi",
        title: "Junior Data Analyst & BI Specialist",
        workType: "Penuh Waktu (Remote)",
        location: "Yogyakarta",
        salary: "Rp 5.500.000 - Rp 8.000.000",
        posted: "2 hari lalu",
        skills: ["SQL", "Power BI", "Python", "Tableau"]
      }
    ]
  },
  {
    id: "tokopedia",
    name: "Tokopedia",
    nama_perusahaan: "Tokopedia",
    headline: "E-Commerce Ekosistem Terbesar di Indonesia",
    industry: "E-Commerce & Teknologi",
    bidang_usaha: "E-Commerce",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12930",
    kode_pos: "12930",
    address: "Tokopedia Tower Ciputra World 2, Jl. Prof. DR. Satrio No. Kav. 11",
    alamat: "Tokopedia Tower Ciputra World 2, Jl. Prof. DR. Satrio No. Kav. 11",
    email: "recruitment@tokopedia.com",
    phone: "021-80647333",
    telepon: "021-80647333",
    website: "https://www.tokopedia.com",
    logoUrl: "",
    avatarText: "TK",
    coverGradient: "from-[#03AC0E] via-[#00880C] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "4.000+ Karyawan",
    foundedYear: "2009",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 65000,
    alumniCount: 9,
    about: "Tokopedia adalah perusahaan teknologi Indonesia dengan misi mencapai pemerataan ekonomi secara digital melalui platform jual beli daring terbesar.",
    deskripsi: "Membangun ekosistem e-commerce yang inklusif untuk jutaan penjual dan pembeli di seluruh nusantara.",
    pic: {
      name: "Dian Sastro",
      nama: "Dian Sastro",
      role: "Employer Branding Specialist",
      jabatan: "Employer Branding Specialist",
      email: "dian.s@tokopedia.com",
      phone: "0811-2233-4455",
      telepon: "0811-2233-4455"
    },
    alumniList: [
      { name: "Nadjwa Salsabila", role: "UI/UX Designer", batch: "2023", avatar: "NS" },
      { name: "Nadia Safira", role: "Product Designer", batch: "2024", avatar: "NS" }
    ],
    jobs: [
      {
        id: "job-tokped-uiux",
        title: "Product Designer (UI/UX)",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Selatan",
        salary: "Rp 10.000.000 - Rp 14.000.000",
        posted: "3 hari lalu",
        skills: ["Figma", "Design System", "User Research"]
      }
    ]
  },
  {
    id: "traveloka",
    name: "Traveloka",
    nama_perusahaan: "Traveloka",
    headline: "Southeast Asia Lifestyle Superapp · Flights, Hotels & Experiences",
    industry: "Online Travel & Lifestyle",
    bidang_usaha: "Startup Teknologi",
    location: "Kabupaten Tangerang, Banten, Indonesia",
    city: "Tangerang",
    kota: "Tangerang",
    province: "Banten",
    provinsi: "Banten",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "15345",
    kode_pos: "15345",
    address: "Traveloka Campus, BSD Green Office Park",
    alamat: "Traveloka Campus, BSD Green Office Park",
    email: "careers@traveloka.com",
    phone: "021-29775800",
    telepon: "021-29775800",
    website: "https://www.traveloka.com",
    logoUrl: "",
    avatarText: "TV",
    coverGradient: "from-[#0194F3] via-[#0264D4] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "3.000+ Karyawan",
    foundedYear: "2012",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 48000,
    alumniCount: 6,
    about: "Traveloka adalah platform perjalanan dan gaya hidup terkemuka di Asia Tenggara yang menyediakan akses pemesanan tiket penerbangan, hotel, dan aktivitas gaya hidup.",
    deskripsi: "Memudahkan jutaan orang menjelajahi dunia melalui teknologi pemesanan perjalanan digital kelas dunia.",
    pic: {
      name: "Kevin Sanjaya",
      nama: "Kevin Sanjaya",
      role: "Tech Recruiter Lead",
      jabatan: "Tech Recruiter Lead",
      email: "kevin.s@traveloka.com",
      phone: "0812-9988-7766",
      telepon: "0812-9988-7766"
    },
    alumniList: [
      { name: "Alvyan Anantama", role: "Data Analyst", batch: "2023", avatar: "AA" }
    ],
    jobs: [
      {
        id: "job-tvlk-da",
        title: "Data Analyst - Growth & Marketing",
        workType: "Penuh Waktu (Hybrid)",
        location: "Tangerang / Jakarta",
        salary: "Rp 9.000.000 - Rp 13.500.000",
        posted: "6 hari lalu",
        skills: ["SQL", "Python", "Tableau", "A/B Testing"]
      }
    ]
  },
  {
    id: "bank-mandiri",
    name: "PT Bank Mandiri (Persero) Tbk",
    nama_perusahaan: "Bank Mandiri - Digital Banking",
    headline: "Transformasi Perbankan Digital Nasional · Livin' & Kopra by Mandiri",
    industry: "Perbankan & Jasa Keuangan",
    bidang_usaha: "Perbankan & Keuangan",
    location: "Jakarta Pusat / Semarang, Indonesia",
    city: "Jakarta Pusat",
    kota: "Jakarta Pusat",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "10260",
    kode_pos: "10260",
    address: "Plaza Mandiri, Jl. Jend. Gatot Subroto Kav. 36-38",
    alamat: "Plaza Mandiri, Jl. Jend. Gatot Subroto Kav. 36-38",
    email: "careers@bankmandiri.co.id",
    phone: "021-5265045",
    telepon: "021-5265045",
    website: "https://bankmandiri.co.id",
    logoUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80",
    avatarText: "BM",
    coverGradient: "from-[#002B66] via-[#0A4B9C] to-[#E5A823]",
    coverImageUrl: "",
    companySize: "10.000+ Karyawan",
    foundedYear: "1998",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 154000,
    alumniCount: 11,
    about: "Bank Mandiri adalah salah satu bank BUMN terbesar di Indonesia yang memimpin transformasi perbankan digital melalui aplikasi unggulan Livin' by Mandiri untuk retail dan Kopra by Mandiri untuk korporasi.",
    deskripsi: "Membangun ekosistem finansial digital modern, aman, dan berdaya saing global untuk memajukan perekonomian Indonesia.",
    pic: {
      name: "Bambang Sutrisno",
      nama: "Bambang Sutrisno",
      role: "Human Capital Business Partner",
      jabatan: "Human Capital Business Partner",
      email: "bambang.sutrisno@bankmandiri.co.id",
      phone: "0811-9876-5432",
      telepon: "0811-9876-5432"
    },
    alumniList: [
      { name: "Aisha Dwi Rahmawati", role: "Data & Systems Specialist", batch: "2024", avatar: "AD" },
      { name: "Dimas Aryo", role: "Backend Engineer", batch: "2023", avatar: "DA" }
    ],
    jobs: [
      {
        id: "job-mandiri-frontend",
        title: "Frontend Web Developer (Next.js & TypeScript)",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Pusat / Semarang",
        salary: "Rp 10.000.000 - Rp 15.000.000",
        posted: "3 hari lalu",
        skills: ["Next.js", "TypeScript", "React", "TailwindCSS"]
      }
    ]
  },
  {
    id: "dana-indonesia",
    name: "DANA Indonesia",
    nama_perusahaan: "DANA Indonesia (PT Espay Debit Indonesia Koe)",
    headline: "Dompet Digital Terkemuka Indonesia · Cashless Society Pioneer",
    industry: "Finansial & Teknologi (Fintech)",
    bidang_usaha: "Startup Teknologi",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12710",
    kode_pos: "12710",
    address: "Capital Place Office Tower Lt. 18, Jl. Jend. Gatot Subroto Kav. 18",
    alamat: "Capital Place Office Tower Lt. 18, Jl. Jend. Gatot Subroto Kav. 18",
    email: "people@dana.id",
    phone: "021-1500445",
    telepon: "021-1500445",
    website: "https://dana.id",
    logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
    avatarText: "DN",
    coverGradient: "from-[#118EEA] via-[#0D70BA] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "1.000+ Karyawan",
    foundedYear: "2018",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 52000,
    alumniCount: 7,
    about: "DANA adalah platform dompet digital berdesain terbuka yang dirancang untuk mendukung setiap aktivitas transaksi finansial non-tunai masyarakat Indonesia secara mudah, aman, dan cerdas.",
    deskripsi: "Menghadirkan infrastruktur pembayaran digital yang inklusif, cepat, dan terpercaya bagi puluhan juta pengguna dan ratusan ribu merchant rekanan.",
    pic: {
      name: "Jessica Tan",
      nama: "Jessica Tan",
      role: "Talent Acquisition Lead",
      jabatan: "Talent Acquisition Lead",
      email: "jessica.tan@dana.id",
      phone: "0812-1234-5678",
      telepon: "0812-1234-5678"
    },
    alumniList: [
      { name: "Sindu Aditya Putra", role: "Core Backend Engineer", batch: "2023", avatar: "SA" },
      { name: "Dewi Rahmawati", role: "Quality Assurance Specialist", batch: "2023", avatar: "DR" }
    ],
    jobs: [
      {
        id: "job-dana-backend",
        title: "Backend Engineer (Go & Microservices)",
        workType: "Penuh Waktu (Remote)",
        location: "Jakarta Selatan",
        salary: "Rp 15.000.000 - Rp 23.000.000",
        posted: "4 hari lalu",
        skills: ["Go", "Microservices", "Kafka", "Docker", "Redis"]
      }
    ]
  },
  {
    id: "shopee-indonesia",
    name: "Shopee Indonesia",
    nama_perusahaan: "Shopee Indonesia (Sea Group)",
    headline: "Platform E-Commerce Terkemuka di Asia Tenggara & Taiwan",
    industry: "E-Commerce & Internet",
    bidang_usaha: "E-Commerce",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12190",
    kode_pos: "12190",
    address: "Pacific Century Place Lt. 26, SCBD Lot 10, Jl. Jend. Sudirman",
    alamat: "Pacific Century Place Lt. 26, SCBD Lot 10, Jl. Jend. Sudirman",
    email: "careers@shopee.co.id",
    phone: "021-80604250",
    telepon: "021-80604250",
    website: "https://careers.shopee.co.id",
    logoUrl: "",
    avatarText: "SP",
    coverGradient: "from-[#EE4D2D] via-[#FF5722] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "10.000+ Karyawan",
    foundedYear: "2015",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 140000,
    alumniCount: 12,
    about: "Shopee adalah platform e-commerce terkemuka di Asia Tenggara dan Taiwan yang berkomitmen membantu pembeli dan penjual bertransaksi secara aman, nyaman, dan terintegrasi melalui ekosistem digital Sea Group.",
    deskripsi: "Menyediakan pengalaman belanja daring yang mudah, aman, dan cepat bagi jutaan pengguna setiap harinya.",
    pic: {
      name: "Agus Pratama",
      nama: "Agus Pratama",
      role: "Campus Recruitment Lead",
      jabatan: "Campus Recruitment Lead",
      email: "agus.p@shopee.co.id",
      phone: "0813-2345-6789",
      telepon: "0813-2345-6789"
    },
    alumniList: [
      { name: "Sindu Aditya Putra", role: "Backend Engineer", batch: "2023", avatar: "SA" },
      { name: "Rizky Firmansyah", role: "Software Engineer", batch: "2024", avatar: "RF" }
    ],
    jobs: [
      {
        id: "job-shopee-be",
        title: "Software Engineer (Backend)",
        workType: "Penuh Waktu (Onsite)",
        location: "Jakarta Selatan",
        salary: "Rp 14.000.000 - Rp 20.000.000",
        posted: "2 hari lalu",
        skills: ["Golang", "MySQL", "Redis", "Distributed Systems"]
      }
    ]
  },
  {
    id: "bukalapak",
    name: "PT Bukalapak.com Tbk",
    nama_perusahaan: "Bukalapak",
    headline: "All Commerce Platform · Memberdayakan UMKM & Inovasi Teknologi",
    industry: "E-Commerce & FinTech",
    bidang_usaha: "E-Commerce",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12560",
    kode_pos: "12560",
    address: "Metropolitan Tower Lt. 22, Jl. R.A. Kartini Kav. 14, Cilandak",
    alamat: "Metropolitan Tower Lt. 22, Jl. R.A. Kartini Kav. 14, Cilandak",
    email: "careers@bukalapak.com",
    phone: "021-50813333",
    telepon: "021-50813333",
    website: "https://careers.bukalapak.com",
    logoUrl: "",
    avatarText: "BL",
    coverGradient: "from-[#E31F51] via-[#C91340] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "2.500+ Karyawan",
    foundedYear: "2010",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 42000,
    alumniCount: 6,
    about: "Bukalapak adalah perusahaan teknologi Indonesia yang berfokus menciptakan ekonomi yang adil untuk semua melalui platform all-commerce daring dan luring (Mitra Bukalapak).",
    deskripsi: "Mendukung digitalisasi jutaan warung dan pelaku UMKM di seluruh pelosok nusantara dengan teknologi mutakhir.",
    pic: {
      name: "Rahmat Hidayat",
      nama: "Rahmat Hidayat",
      role: "Talent Acquisition Partner",
      jabatan: "Talent Acquisition Partner",
      email: "rahmat.h@bukalapak.com",
      phone: "0812-8765-4321",
      telepon: "0812-8765-4321"
    },
    alumniList: [
      { name: "Andi Pratama", role: "Mobile Developer", batch: "2024", avatar: "AP" }
    ],
    jobs: [
      {
        id: "job-buka-mob",
        title: "Mobile Software Engineer (Android)",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Selatan / Remote",
        salary: "Rp 11.000.000 - Rp 16.000.000",
        posted: "5 hari lalu",
        skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Coroutines"]
      }
    ]
  },
  {
    id: "tiket-com",
    name: "Tiket.com (PT Global Tiket Network)",
    nama_perusahaan: "Tiket.com",
    headline: "Pionir Online Travel Agent (OTA) Indonesia · Blibli Tiket Action",
    industry: "Online Travel & Entertainment",
    bidang_usaha: "Startup Teknologi",
    location: "Jakarta Barat, DKI Jakarta, Indonesia",
    city: "Jakarta Barat",
    kota: "Jakarta Barat",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "11470",
    kode_pos: "11470",
    address: "Wisma Barito Pacific Tower B Lt. 12, Jl. Letjen S. Parman Kav. 62-63",
    alamat: "Wisma Barito Pacific Tower B Lt. 12, Jl. Letjen S. Parman Kav. 62-63",
    email: "people@tiket.com",
    phone: "021-39730888",
    telepon: "021-39730888",
    website: "https://tiket.com",
    logoUrl: "",
    avatarText: "TK",
    coverGradient: "from-[#0064D2] via-[#FEDB00] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "1.800+ Karyawan",
    foundedYear: "2011",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 39000,
    alumniCount: 5,
    about: "Tiket.com adalah OTA terkemuka di Indonesia yang menyediakan solusi liburan dan perjalanan lengkap mulai dari tiket pesawat, kereta api, hotel, sewa mobil, hingga tiket event.",
    deskripsi: "Menjadikan perjalanan dan liburan lebih mudah, menyenangkan, dan terjangkau bagi semua pelanggan.",
    pic: {
      name: "Novita Sari",
      nama: "Novita Sari",
      role: "Lead Tech Recruiter",
      jabatan: "Lead Tech Recruiter",
      email: "novita.s@tiket.com",
      phone: "0815-4321-9876",
      telepon: "0815-4321-9876"
    },
    alumniList: [
      { name: "Budi Santoso", role: "DevOps Engineer", batch: "2022", avatar: "BS" }
    ],
    jobs: [
      {
        id: "job-tiket-devops",
        title: "DevOps & Site Reliability Engineer",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Barat",
        salary: "Rp 13.000.000 - Rp 19.000.000",
        posted: "3 hari lalu",
        skills: ["Kubernetes", "AWS", "Terraform", "Prometheus", "CI/CD"]
      }
    ]
  },
  {
    id: "grab-indonesia",
    name: "Grab Indonesia",
    nama_perusahaan: "Grab Indonesia",
    headline: "Everyday Superapp di Asia Tenggara · Transportasi, Makanan & FinTech",
    industry: "Teknologi & On-Demand",
    bidang_usaha: "Startup Teknologi",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12950",
    kode_pos: "12950",
    address: "Lippo Kuningan Lt. 27, Jl. H.R. Rasuna Said Kav. B-12",
    alamat: "Lippo Kuningan Lt. 27, Jl. H.R. Rasuna Said Kav. B-12",
    email: "careers@grab.com",
    phone: "021-80648777",
    telepon: "021-80648777",
    website: "https://grab.careers",
    logoUrl: "",
    avatarText: "GR",
    coverGradient: "from-[#00B14F] via-[#00853B] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "6.000+ Karyawan",
    foundedYear: "2012",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 78000,
    alumniCount: 8,
    about: "Grab adalah superapp terkemuka di Asia Tenggara yang menyediakan layanan mobilitas harian, pesan-antar makanan, pembayaran digital, dan solusi logistik cerdas.",
    deskripsi: "Mendorong kemajuan ekonomi digital inklusif bagi jutaan mitra pengemudi, merchant UMKM, dan konsumen di Indonesia.",
    pic: {
      name: "Farhan Maulana",
      nama: "Farhan Maulana",
      role: "Regional Tech Recruiter",
      jabatan: "Regional Tech Recruiter",
      email: "farhan.m@grab.com",
      phone: "0812-7654-3210",
      telepon: "0812-7654-3210"
    },
    alumniList: [
      { name: "Siti Nuraini", role: "Data Scientist", batch: "2023", avatar: "SN" }
    ],
    jobs: [
      {
        id: "job-grab-ds",
        title: "Data Scientist - Marketplace Analytics",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Selatan",
        salary: "Rp 14.000.000 - Rp 21.000.000",
        posted: "1 hari lalu",
        skills: ["Python", "Machine Learning", "SQL", "Spark", "Dynamic Pricing"]
      }
    ]
  },
  {
    id: "koinworks",
    name: "KoinWorks (PT Lunaria Annua Teknologi)",
    nama_perusahaan: "KoinWorks",
    headline: "Financial Superapp for Businesses and Individuals in Indonesia",
    industry: "Finansial & Teknologi (Fintech)",
    bidang_usaha: "Startup Teknologi",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12870",
    kode_pos: "12870",
    address: "Cyber 2 Tower Lt. 35, Jl. H.R. Rasuna Said Blok X-5 No. 13",
    alamat: "Cyber 2 Tower Lt. 35, Jl. H.R. Rasuna Said Blok X-5 No. 13",
    email: "recruitment@koinworks.com",
    phone: "021-29323999",
    telepon: "021-29323999",
    website: "https://koinworks.com",
    logoUrl: "",
    avatarText: "KW",
    coverGradient: "from-[#0A2540] via-[#00D4B2] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "800+ Karyawan",
    foundedYear: "2016",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 28000,
    alumniCount: 4,
    about: "KoinWorks adalah superapp finansial pertama di Indonesia yang menyediakan solusi pinjaman modal bisnis UMKM, investasi peer-to-peer, dan pengelolaan kas bisnis terpadu.",
    deskripsi: "Mendukung inklusi finansial pelaku usaha mikro dan menengah Indonesia dengan teknologi perbankan digital terbuka.",
    pic: {
      name: "Vina Anggraeni",
      nama: "Vina Anggraeni",
      role: "People Partner",
      jabatan: "People Partner",
      email: "vina.a@koinworks.com",
      phone: "0811-3456-7890",
      telepon: "0811-3456-7890"
    },
    alumniList: [
      { name: "Rizky Firmansyah", role: "Fullstack Developer", batch: "2024", avatar: "RF" }
    ],
    jobs: [
      {
        id: "job-kw-fs",
        title: "Fullstack Engineer (React & Golang)",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Selatan",
        salary: "Rp 10.000.000 - Rp 15.000.000",
        posted: "4 hari lalu",
        skills: ["React", "Golang", "PostgreSQL", "REST API"]
      }
    ]
  },
  {
    id: "kredivo",
    name: "Kredivo Group (FinAccel)",
    nama_perusahaan: "Kredivo Group",
    headline: "Leading Digital Credit & Buy Now Pay Later (BNPL) Platform in SEA",
    industry: "Fintech & Pembiayaan Digital",
    bidang_usaha: "Startup Teknologi",
    location: "Jakarta Selatan, DKI Jakarta, Indonesia",
    city: "Jakarta Selatan",
    kota: "Jakarta Selatan",
    province: "DKI Jakarta",
    provinsi: "DKI Jakarta",
    country: "Indonesia",
    negara: "Indonesia",
    postalCode: "12190",
    kode_pos: "12190",
    address: "Dipo Tower Lt. 3, Jl. Gatot Subroto No. Kav. 51-52",
    alamat: "Dipo Tower Lt. 3, Jl. Gatot Subroto No. Kav. 51-52",
    email: "careers@kredivo.com",
    phone: "021-57903899",
    telepon: "021-57903899",
    website: "https://kredivo.com",
    logoUrl: "",
    avatarText: "KD",
    coverGradient: "from-[#F7931E] via-[#EF4823] to-[#1E3A8A]",
    coverImageUrl: "",
    companySize: "1.200+ Karyawan",
    foundedYear: "2015",
    isVerified: true,
    status_verifikasi: "Terverifikasi",
    followersCount: 31000,
    alumniCount: 5,
    about: "Kredivo adalah platform kredit digital terdepan di Indonesia yang memberikan kemudahan pembiayaan instan bagi konsumen untuk berbelanja di ribuan merchant e-commerce dan offline.",
    deskripsi: "Menghadirkan akses kredit instan yang cepat, terjangkau, dan aman dengan penilaian risiko berbasis AI dan data science canggih.",
    pic: {
      name: "Dimas Suryo",
      nama: "Dimas Suryo",
      role: "Talent Specialist",
      jabatan: "Talent Specialist",
      email: "dimas.s@kredivo.com",
      phone: "0812-4567-8901",
      telepon: "0812-4567-8901"
    },
    alumniList: [
      { name: "Dewi Rahmawati", role: "QA Engineer", batch: "2023", avatar: "DR" }
    ],
    jobs: [
      {
        id: "job-kd-qa",
        title: "Quality Assurance Engineer (Automation)",
        workType: "Penuh Waktu (Hybrid)",
        location: "Jakarta Selatan",
        salary: "Rp 9.500.000 - Rp 14.500.000",
        posted: "3 hari lalu",
        skills: ["Playwright", "Cypress", "Python", "API Testing"]
      }
    ]
  }
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
  const key = id.trim().toLowerCase();
  return ALUMNI_DIRECTORY.find((a) => a.id.toLowerCase() === key || a.name.toLowerCase() === key);
}

/** Cari alumni berdasarkan nama (untuk kompatibilitas data lama). */
function findAlumniByName(name) {
  if (!name) return undefined;
  const key = name.trim().toLowerCase();
  return ALUMNI_DIRECTORY.find((a) => a.name.trim().toLowerCase() === key || a.name.toLowerCase().includes(key));
}

/**
 * Pencarian alumni untuk dropdown pencarian & pemilih kontributor.
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

/** Rute halaman profil perusahaan mitra berbasis slug. */
function companyProfileHref(slugOrId) {
  const slug = encodeURIComponent(slugOrId || "");
  const isSubdir = typeof window !== "undefined" && (window.location.pathname || "").replace(/\\/g, "/").includes("/alumni/mitra");
  return isSubdir ? `detail.html?slug=${slug}` : `mitra/detail.html?slug=${slug}`;
}

/** Cari perusahaan mitra berdasarkan id. */
function findCompany(id) {
  if (!id) return undefined;
  const key = id.trim().toLowerCase();
  return COMPANY_DIRECTORY.find((c) =>
    c.id.toLowerCase() === key ||
    c.name.toLowerCase() === key ||
    c.nama_perusahaan.toLowerCase() === key ||
    c.name.toLowerCase().includes(key) ||
    c.nama_perusahaan.toLowerCase().includes(key)
  );
}

/** Cari perusahaan berdasarkan nama. */
function findCompanyByName(name) {
  if (!name) return undefined;
  const key = name.trim().toLowerCase();
  return COMPANY_DIRECTORY.find((c) => c.name.toLowerCase().includes(key) || c.nama_perusahaan.toLowerCase().includes(key));
}

/** Pencarian perusahaan berdasarkan nama, bidang, kota, lokasi. */
function searchCompanies(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return COMPANY_DIRECTORY;
  return COMPANY_DIRECTORY.filter((c) =>
    [c.name, c.nama_perusahaan, c.industry, c.bidang_usaha, c.city, c.kota, c.location, c.about, c.deskripsi]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

/** Inisial nama (maks. 2 huruf) untuk placeholder tanpa foto. */
function initialsOf(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Membangun profil lengkap alumni untuk tampilan publik (detail.html?id=...).
 * Menyediakan data profil, proyek, keahlian, riwayat pendidikan, sertifikasi, organisasi, postingan, dan rekomendasi teman.
 */
function getAlumniFullProfile(id) {
  const alumni = findAlumni(id) || ALUMNI_DIRECTORY[0];
  const isAisha = alumni.id === "aisha-dwi-rahmawati";

  const profile = {
    id: alumni.id,
    name: alumni.name,
    firstName: alumni.name.split(" ")[0] || "",
    lastName: alumni.name.split(" ").slice(1).join(" ") || "",
    headline: alumni.headline,
    batch: alumni.batch || "2024",
    isVerified: alumni.isVerified !== false,
    location: alumni.location || "Kota Semarang, Jawa Tengah, Indonesia",
    countryCode: "ID",
    city: (alumni.location || "Kota Semarang").split(",")[0],
    industry: alumni.industry || "Teknologi, Informasi, dan Internet",
    university: alumni.university || "Universitas Dian Nuswantoro",
    connections: alumni.connections || 85,
    followers: alumni.followers || 92,
    linkedin: alumni.linkedin || "",
    github: alumni.github || "",
    website: alumni.website || "",
    email: alumni.email || (alumni.id + "@alumni.dinus.ac.id"),
    about: alumni.about || `Alumnus Universitas Dian Nuswantoro program studi Teknik Informatika dengan fokus keahlian di bidang teknologi informasi dan rekayasa perangkat lunak. Aktif berpartisipasi dalam ekosistem Bengkel Koding UDINUS.`,
    avatarUrl: alumni.avatarUrl || DEFAULT_AVATAR,
    coverImageUrl: alumni.coverImageUrl || "",
    coverGradient: alumni.coverGradient || "from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]",
  };

  // Proyek sesuai bidang
  let projects = [];
  if (isAisha && typeof INITIAL_PROJECTS !== "undefined") {
    projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
  } else if (alumni.projects) {
    projects = JSON.parse(JSON.stringify(alumni.projects));
  } else {
    // Generate proyek realistis berbasis headline
    const h = (alumni.headline || "").toLowerCase();
    if (h.includes("ui/ux") || h.includes("design")) {
      projects = [
        {
          id: 101,
          title: "Comprehensive E-Commerce Design System & Checkout Redesign",
          period: "Jan 2026 – Apr 2026",
          desc: "Merancang design system token-based multi-platform dan menyederhanakan alur checkout untuk meningkatkan conversion rate pengguna mobile.",
          tags: ["Figma & Design Tokens", "UX Research", "Design System"],
          linkUrl: "https://figma.com",
          imageUrl: "assets/img/kursus-3.png"
        },
        {
          id: 102,
          title: "Telemedicine Patient Portal & Appointment Booking App",
          period: "Okt 2025 – Des 2025",
          desc: "Riset pengguna dan prototipe aplikasi konsultasi dokter daring berbasis human-centered design dengan aksesibilitas standar WCAG 2.1.",
          tags: ["UI/UX Prototyping", "Design Thinking"],
          linkUrl: "https://figma.com",
          imageUrl: "assets/img/kursus-4.png"
        }
      ];
    } else if (h.includes("machine learning") || h.includes("data") || h.includes("ai")) {
      projects = [
        {
          id: 103,
          title: "UMKM Business Viability & Credit Risk Predictive Engine",
          period: "Feb 2026 – Mei 2026",
          desc: "Model prediksi probabilitas keberhasilan dan risiko kredit UMKM dari data historis menggunakan ensemble CatBoost dan analisis SHAP.",
          tags: ["Machine Learning", "Python", "SHAP Explainability"],
          linkUrl: "https://github.com",
          imageUrl: "assets/img/kursus-1.png"
        },
        {
          id: 104,
          title: "Automated Sentiment & Review Intelligence for Digital Services",
          period: "Agu 2025 – Nov 2025",
          desc: "Pipeline analisis sentimen ulasan aplikasi berskala besar menggunakan IndoBERT transformer dan visualisasi interaktif Streamlit.",
          tags: ["Natural Language Processing", "Python", "Transformers"],
          linkUrl: "https://github.com",
          imageUrl: "assets/img/kursus-2.png"
        }
      ];
    } else if (h.includes("devops") || h.includes("cloud")) {
      projects = [
        {
          id: 105,
          title: "High-Availability Kubernetes Cluster & Automated GitOps CI/CD",
          period: "Jan 2026 – Mar 2026",
          desc: "Membangun arsitektur microservices berbasis Kubernetes dengan ArgoCD, Prometheus monitoring, dan zero-downtime deployment pipeline.",
          tags: ["Kubernetes", "DevOps", "Terraform", "CI/CD"],
          linkUrl: "https://github.com",
          imageUrl: "assets/img/kursus-5.png"
        }
      ];
    } else {
      projects = [
        {
          id: 106,
          title: "Integrated Enterprise Resource & Student Tracer Study System",
          period: "Jan 2026 – Apr 2026",
          desc: "Membangun web portal berskala produksi menggunakan arsitektur modern Next.js, TypeScript, RESTful API, dan database relasional PostgreSQL.",
          tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
          linkUrl: "https://github.com",
          imageUrl: "assets/img/kursus-1.png"
        },
        {
          id: 107,
          title: "High-Performance REST & GraphQL Microservices Architecture",
          period: "Sep 2025 – Des 2025",
          desc: "Backend service berkecepatan tinggi dengan integrasi Redis caching, message queue, dan automated unit testing standar OWASP.",
          tags: ["Backend Engineering", "REST API", "Docker"],
          linkUrl: "https://github.com",
          imageUrl: "assets/img/kursus-2.png"
        }
      ];
    }
  }

  // Keahlian
  let skills = [];
  if (isAisha && typeof INITIAL_SKILLS !== "undefined") {
    skills = JSON.parse(JSON.stringify(INITIAL_SKILLS));
  } else if (alumni.skills) {
    skills = JSON.parse(JSON.stringify(alumni.skills));
  } else {
    const h = (alumni.headline || "").toLowerCase();
    if (h.includes("ui/ux") || h.includes("design")) {
      skills = [
        { id: 201, name: "UI/UX Design & Prototyping", level: "Tingkat Lanjut", links: [{ label: "Figma Mastery", key: "f1" }] },
        { id: 202, name: "Design Systems & Token Architecture", level: "Tingkat Lanjut", links: [{ label: "Component Library", key: "f2" }] },
        { id: 203, name: "User Research & Usability Testing", level: "Tingkat Menengah", links: [] },
        { id: 204, name: "Wireframing & Information Architecture", level: "Tingkat Menengah", links: [] }
      ];
    } else if (h.includes("data") || h.includes("machine learning")) {
      skills = [
        { id: 205, name: "Python for Data Science & ML", level: "Tingkat Lanjut", links: [{ label: "Pandas, NumPy, Scikit-Learn", key: "d1" }] },
        { id: 206, name: "Machine Learning & Predictive Modeling", level: "Tingkat Lanjut", links: [] },
        { id: 207, name: "SQL & Data Warehousing (BigQuery)", level: "Tingkat Lanjut", links: [] },
        { id: 208, name: "Data Visualization (Tableau & Metabase)", level: "Tingkat Menengah", links: [] }
      ];
    } else if (h.includes("devops") || h.includes("cloud")) {
      skills = [
        { id: 209, name: "Docker & Containerization", level: "Tingkat Lanjut", links: [] },
        { id: 210, name: "Kubernetes Cluster Management", level: "Tingkat Lanjut", links: [] },
        { id: 211, name: "CI/CD Pipeline Automation (GitHub Actions / GitLab)", level: "Tingkat Lanjut", links: [] },
        { id: 212, name: "Linux Server Administration & AWS", level: "Tingkat Menengah", links: [] }
      ];
    } else {
      skills = [
        { id: 213, name: "Web Application Architecture (Next.js / React)", level: "Tingkat Lanjut", links: [] },
        { id: 214, name: "TypeScript & JavaScript ES6+", level: "Tingkat Lanjut", links: [] },
        { id: 215, name: "Backend API Engineering (Laravel / Go / Node)", level: "Tingkat Menengah", links: [] },
        { id: 216, name: "Database Design & SQL Optimization", level: "Tingkat Menengah", links: [] }
      ];
    }
  }

  // Pendidikan
  const educations = [
    {
      id: 301,
      name: alumni.university || "Universitas Dian Nuswantoro",
      degree: "Sarjana Komputer (S.Kom)",
      major: "Teknik Informatika",
      period: `2020 – ${alumni.batch || "2024"}`,
      logoUrl: "",
      tags: ["Pemrograman Web", "Struktur Data & Algoritma", "Kecerdasan Buatan", "Rekayasa Perangkat Lunak"]
    }
  ];

  // Sertifikasi
  let certifications = [];
  if (isAisha && typeof INITIAL_CERTIFICATIONS !== "undefined") {
    certifications = JSON.parse(JSON.stringify(INITIAL_CERTIFICATIONS));
  } else {
    const h = (alumni.headline || "").toLowerCase();
    if (h.includes("ui/ux") || h.includes("design")) {
      certifications = [
        { id: 401, name: "Google UX Design Professional Certificate", issuer: "Coursera / Google", date: "Diterbitkan Nov 2024", credId: "G-UX-882194", tags: ["Figma", "UX Research", "Accessibility"], url: "https://coursera.org" },
        { id: 402, name: "Certified UI Designer Specialist", issuer: "Bengkel Koding UDINUS", date: "Diterbitkan Jul 2024", credId: "BK-UI-2024", tags: ["Design Systems"], url: "#" }
      ];
    } else if (h.includes("data") || h.includes("machine learning")) {
      certifications = [
        { id: 403, name: "IBM Data Science Professional Certificate", issuer: "IBM / Coursera", date: "Diterbitkan Des 2024", credId: "IBM-DS-77412", tags: ["Python", "SQL", "Machine Learning"], url: "https://coursera.org" },
        { id: 404, name: "TensorFlow Developer Certificate", issuer: "Google Developers", date: "Diterbitkan Agu 2024", credId: "TF-DEV-3391", tags: ["Deep Learning"], url: "https://tensorflow.org" }
      ];
    } else {
      certifications = [
        { id: 405, name: "Fullstack Web Development Specialist", issuer: "Bengkel Koding UDINUS", date: "Diterbitkan Sep 2024", credId: "BK-FS-2024", tags: ["Next.js", "Laravel", "TypeScript"], url: "#" },
        { id: 406, name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services (AWS)", date: "Diterbitkan Jan 2025", credId: "AWS-SAA-9920", tags: ["Cloud Computing"], url: "https://aws.amazon.com" }
      ];
    }
  }

  // Organisasi
  const organizations = [
    {
      id: 501,
      name: "Bengkel Koding Universitas Dian Nuswantoro",
      role: "Asisten Praktikum & Mentor Laboratorium",
      period: `Agu 2022 – Jul ${alumni.batch || "2024"}`,
      affiliated: "Universitas Dian Nuswantoro",
      desc: "Membimbing ratusan mahasiswa dalam penguasaan logika pemrograman, rekayasa perangkat lunak, dan peninjauan tugas proyek akhir praktikum.",
      tags: ["Mentorship", "Laboratorium", "Peer Teaching"]
    },
    {
      id: 502,
      name: "Himpunan Mahasiswa Teknik Informatika (HMTI UDINUS)",
      role: "Anggota Divisi Pengembangan IPTEK & Penalaran",
      period: "Okt 2021 – Okt 2022",
      affiliated: "Universitas Dian Nuswantoro",
      desc: "Menyelenggarakan workshop teknologi kampus, kompetisi coding tahunan DinusFest, dan seminar industri IT.",
      tags: ["Event Management", "Leadership"]
    }
  ];

  // Penghargaan
  const honors = [
    {
      id: 601,
      title: "Juara 1 Capstone Project Showcase Bengkel Koding",
      issuer: "Fakultas Ilmu Komputer Universitas Dian Nuswantoro",
      date: "Jul 2024",
      description: "Apresiasi proyek akhir terbaik atas inovasi aplikasi berbasis kebutuhan nyata masyarakat dan performa sistem tinggi.",
      relatedEducationId: "301"
    }
  ];

  // Postingan
  let posts = [];
  if (isAisha && typeof INITIAL_POSTS !== "undefined") {
    posts = JSON.parse(JSON.stringify(INITIAL_POSTS));
  } else {
    posts = [
      {
        id: 701,
        authorName: alumni.name,
        authorAvatar: alumni.avatarUrl || DEFAULT_AVATAR,
        authorHeadline: alumni.headline,
        date: "3 hari lalu",
        content: `Halo rekan-rekan alumni Bengkel Koding dan jaringan profesional! Senang sekali bisa mendokumentasikan perjalanan saya di bidang ${alumni.industry || "teknologi"}.\n\nBagi rekan-rekan yang ingin berdiskusi terkait kolaborasi proyek, peluang karir, atau sharing wawasan teknis, silakan hubungi saya melalui profil ini. Sukses selalu untuk komunitas Bengkel Koding UDINUS!`,
        category: "Knowledge Sharing",
        visibility: "Semua orang",
        imageUrl: projects[0] && projects[0].imageUrl ? projects[0].imageUrl : "",
        likes: 12,
        isLiked: false,
        commentsCount: 4,
        repostsCount: 2,
        impressions: 210,
      }
    ];
  }

  // Rekomendasi alumni lain (kecuali alumni ini)
  const recommendedPeople = ALUMNI_DIRECTORY
    .filter((a) => a.id !== alumni.id)
    .slice(0, 8)
    .map((a, idx) => ({
      id: idx + 1,
      alumniId: a.id,
      name: a.name,
      avatar: a.avatarUrl || `https://i.pravatar.cc/150?img=${(idx % 60) + 10}`,
      headline: a.headline,
      verified: a.isVerified !== false,
    }));

  return {
    profile,
    projects,
    skills,
    educations,
    certifications,
    organizations,
    honors,
    posts,
    recommendedPeople,
  };
}

/**
 * Membangun profil lengkap perusahaan mitra untuk tampilan publik (perusahaan.html?id=...).
 * Selaras dengan isian edit profil role perusahaan di mitra/profil-perusahaan.html.
 */
function getCompanyFullProfile(id) {
  let company = findCompany(id) || COMPANY_DIRECTORY[0];

  // Sinkronisasi data dinamis dari localStorage mitra jika viewing PT Solusi Digital Jateng
  if (company.id === "pt-solusi-digital-jateng") {
    try {
      const saved = JSON.parse(localStorage.getItem("mitra_profil") || "null");
      if (saved) {
        company = {
          ...company,
          name: saved.nama_perusahaan || company.name,
          nama_perusahaan: saved.nama_perusahaan || company.nama_perusahaan,
          industry: saved.bidang_usaha || company.industry,
          bidang_usaha: saved.bidang_usaha || company.bidang_usaha,
          email: saved.email || company.email,
          phone: saved.telepon || company.phone,
          telepon: saved.telepon || company.telepon,
          website: saved.website || company.website,
          address: saved.alamat || company.address,
          alamat: saved.alamat || company.alamat,
          city: saved.kota || company.city,
          kota: saved.kota || company.kota,
          province: saved.provinsi || company.province,
          provinsi: saved.provinsi || company.provinsi,
          country: saved.negara || company.country,
          negara: saved.negara || company.negara,
          postalCode: saved.kode_pos || company.postalCode,
          kode_pos: saved.kode_pos || company.kode_pos,
          about: saved.deskripsi || company.about,
          deskripsi: saved.deskripsi || company.deskripsi,
          logoUrl: saved.logo || company.logoUrl,
          pic: {
            name: saved.pic_nama || company.pic.name,
            nama: saved.pic_nama || company.pic.nama,
            role: saved.pic_jabatan || company.pic.role,
            jabatan: saved.pic_jabatan || company.pic.jabatan,
            email: saved.pic_email || company.pic.email,
            phone: saved.pic_telepon || company.pic.phone,
            telepon: saved.pic_telepon || company.pic.telepon,
          }
        };
      }
    } catch {}
  }

  // Rekomendasi perusahaan mitra lainnya
  const similarCompanies = COMPANY_DIRECTORY
    .filter((c) => c.id !== company.id)
    .slice(0, 5);

  return {
    company,
    jobs: company.jobs || [],
    alumniList: company.alumniList || [],
    similarCompanies,
  };
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

// ============================================================
// BENGKOD GIGS & SIDE-PROJECT EXCHANGE (Data & Helper)
// Model Transparan: Budget Range tanpa tracking transaksi uang
// ============================================================

// v5: lamaran menyimpan resumeFileName (CV terlampir)
const GIGS_STORAGE_KEY = "bengkod_alumni_gigs_v5";
const GIGS_APPLY_KEY = "bengkod_alumni_gigs_apply_v5";

const GIGS_BUDGET_RANGES = [
  "< Rp 1.000.000",
  "Rp 1.000.000 - Rp 3.000.000",
  "Rp 3.000.000 - Rp 5.000.000",
  "> Rp 5.000.000",
  "Bagi Hasil / Equity",
];

const INITIAL_GIGS = [
  {
    id: "gig-1",
    title: "Sistem Presensi QR Code Mobile App untuk Event Komunitas",
    ownerId: "aisha-dwi-rahmawati",
    ownerName: "Aisha Dwi Rahmawati",
    ownerAvatar: DEFAULT_AVATAR,
    ownerRole: "Alumni 2024 · Lab Bengkel Koding",
    ownerPhone: "081234567890",
    category: "Mobile App",
    rolesNeeded: ["Flutter Developer", "Backend Laravel"],
    techStack: ["Flutter", "Laravel", "MySQL", "QR Scanner"],
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2026-12-10",
    quota: 1,
    status: "Terbuka", // Terbuka | Sedang Dikerjakan | Selesai | Batal
    postedDate: "2026-11-01",
    description: `Membangun aplikasi presensi peserta seminar dan workshop berbasis scan dynamic QR code dengan dashboard analitik kehadiran real-time serta dukungan mode offline synchronization saat sinyal di venue terbatas.

Ruang Lingkup & Deliverables Utama:
1. Pengembangan modul scanner kamera responsif pada Flutter dengan latensi pembacaan dynamic QR Code di bawah 300ms.
2. Mekanisme caching lokal (SQLite / Isar database) untuk pencatatan kehadiran presensi offline yang otomatis sinkron ke server saat jaringan stabil.
3. Dashboard web panel bagi panitia event untuk memantau grafik kehadiran, rekapitulasi data partisipasi, dan ekspor berkas laporan format CSV/Excel.
4. Implementasi API backend Laravel yang aman dengan perlindungan rate-limiting dan otentikasi JWT.

Ekspektasi Kontributor:
Rekan alumni diharapkan menguasai state management Flutter (BLoC/Provider) serta arsitektur RESTful API Laravel. Koordinasi teknis dilakukan fleksibel via GitHub PR dan grup WhatsApp komunikasi tim.`,
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: [
      {
        id: "app-101",
        applicantId: "dimas-aryo",
        applicantName: "Dimas Aryo",
        resumeFileName: "CV_Dimas_Aryo_ATS.pdf",
        applicantAvatar: "https://i.pravatar.cc/150?img=15",
        applicantBatch: "2023",
        applicantPhone: "081298765432",
        skills: ["Golang", "Laravel", "REST API", "Docker"],
        pitchMessage: "Halo Mbak Aisha! Saya sudah terbiasa membangun backend scanner & database offline sync Laravel. Siap bantu sprint 2 minggu penuh.",
        portfolioItems: [
          { title: "High-Throughput QR Ticket Engine", linkUrl: "https://github.com/dimasaryo", stack: "Laravel · Redis" }
        ],
        appliedDate: "02 Nov 2026",
        status: "PENDING"
      },
      {
        id: "app-102",
        applicantId: "kirana-maheswari",
        applicantName: "Kirana Maheswari",
        resumeFileName: "CV_Kirana_Maheswari_ATS.pdf",
        applicantAvatar: "https://i.pravatar.cc/150?img=44",
        applicantBatch: "2024",
        applicantPhone: "081345678901",
        skills: ["Flutter", "Firebase", "UI Slicing"],
        pitchMessage: "Tertarik handle UI Flutter mobile-nya. Portofolio app kampus saya sudah include dynamic QR code scanner.",
        portfolioItems: [
          { title: "EventPass Mobile App", linkUrl: "https://github.com/kiranam", stack: "Flutter · BLoC" }
        ],
        appliedDate: "03 Nov 2026",
        status: "PENDING"
      }
    ]
  },
  {
    id: "gig-2",
    title: "Revamp Landing Page & Design System Studio Kreatif",
    ownerId: "nadjwa-salsabila",
    ownerName: "Nadjwa Salsabila",
    ownerAvatar: "https://i.pravatar.cc/150?img=25",
    ownerRole: "Alumni 2023 · Product Designer",
    ownerPhone: "081122334455",
    category: "UI/UX & Web",
    rolesNeeded: ["Frontend Developer (React/Tailwind)"],
    techStack: ["React", "Next.js", "Tailwind CSS", "Figma"],
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    deadline: "2026-11-25",
    quota: 1,
    status: "Terbuka",
    postedDate: "2026-11-02",
    description: `Menerjemahkan berkas desain Figma studio kreatif yang sudah komprehensif menjadi implementasi kode Next.js & Tailwind CSS yang sangat cepat, pixel-perfect, responsif mobile-first, dan dilengkapi micro-interaction halus.

Spesifikasi & Kebutuhan Teknis:
1. Slicing 5 halaman utama: Home Showcase, Portofolio Detail, Layanan Desain, Tentang Studio, dan Formulir Kontak Inquiry.
2. Penataan komponen modular (atomik) yang reusable dengan integrasi Tailwind CSS token warna serta tipografi yang terstandarisasi.
3. Optimasi performa web audit Core Web Vitals (Lighthouse score > 90) dengan optimasi lazy-load aset gambar WebP/SVG.
4. Setup deployment otomatis ke Vercel dengan integrasi domain kustom.`,
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: [
      {
        id: "app-201",
        applicantId: "intan-permata",
        applicantName: "Intan Permata",
        resumeFileName: "CV_Intan_Permata_ATS.pdf",
        applicantAvatar: "https://i.pravatar.cc/150?img=48",
        applicantBatch: "2024",
        applicantPhone: "081987654321",
        skills: ["React", "Tailwind CSS", "Design Token"],
        pitchMessage: "Sangat familiar dengan token design system dan Tailwind CSS v4. Siap selesaikan dalam 5 hari.",
        portfolioItems: [
          { title: "Clean Design System UI Kit", linkUrl: "https://github.com/intanpermata", stack: "React · Storybook" }
        ],
        appliedDate: "03 Nov 2026",
        status: "PENDING"
      }
    ]
  },
  {
    id: "gig-3",
    title: "Pipeline Data ETL & Dashboard Visualisasi Penjualan UMKM",
    ownerId: "clarista",
    ownerName: "Clarista",
    ownerAvatar: "https://i.pravatar.cc/150?img=45",
    ownerRole: "Alumni 2024 · Machine Learning Engineer",
    ownerPhone: "081555667788",
    category: "Data Science",
    rolesNeeded: ["Python Data Analyst"],
    techStack: ["Python", "PostgreSQL", "Metabase", "Docker"],
    budgetRange: "> Rp 5.000.000",
    deadline: "2026-12-20",
    quota: 1,
    status: "Sedang Dikerjakan",
    postedDate: "2026-10-28",
    description: `Membangun arsitektur data pipeline otomatis (ETL) yang mengonsolidasi riwayat transaksi multi-channel e-commerce ke data warehouse PostgreSQL terpusat, lengkap dengan visualisasi dashboard Metabase untuk memantau performa penjualan UMKM.

Tanggung Jawab & Fitur Proyek:
1. Penjadwalan cron job script Python untuk penarikan data API transaksi secara berkala dengan penanganan retry logic.
2. Proses data cleansing, validasi tipe data skema, dan transformasi agregasi bulanan/mingguan menggunakan Pandas & SQLAlchemy.
3. Konfigurasi query analitik dan dashboard Metabase interaktif yang menampilkan metrik GMV, repeat order rate, dan performa kategori produk.
4. Deployment pipeline terisolasi menggunakan Docker container pada server VPS.`,
    assignedContributor: {
      id: "aisha-dwi-rahmawati",
      name: "Aisha Dwi Rahmawati",
      avatar: DEFAULT_AVATAR,
      role: "Alumni 2024 · Data Scientist",
      phone: "081234567890",
      assignedDate: "30 Okt 2026"
    },
    endorsement: "",
    completedDate: null,
    applicants: [
      {
        id: "app-301",
        applicantId: "aisha-dwi-rahmawati",
        applicantName: "Aisha Dwi Rahmawati",
        resumeFileName: "CV_Aisha_Dwi_Rahmawati_ATS.pdf",
        applicantAvatar: DEFAULT_AVATAR,
        applicantBatch: "2024",
        applicantPhone: "081234567890",
        skills: ["Python", "Pandas", "PostgreSQL", "Metabase"],
        pitchMessage: "Halo Clarista, saya tertarik membantu pipeline data ETL ini. Sebelumnya sudah membuat engine probabilitas UMKM serupa.",
        portfolioItems: [
          { title: "UMKM Success Probability Prediction", linkUrl: "https://github.com/aishaadr", stack: "Python · PostgreSQL" }
        ],
        appliedDate: "29 Okt 2026",
        status: "ACCEPTED"
      }
    ]
  },
  {
    id: "gig-4",
    title: "Audit Keamanan & Penetrasi Aplikasi Internal Laboratorium",
    ownerId: "fajar-nugroho",
    ownerName: "Fajar Nugroho",
    ownerAvatar: "https://i.pravatar.cc/150?img=33",
    ownerRole: "Alumni 2022 · Cybersecurity Specialist",
    ownerPhone: "081777889900",
    category: "Keamanan Siber",
    rolesNeeded: ["Security Researcher / Pentester"],
    techStack: ["OWASP Top 10", "Burp Suite", "Linux Hardening"],
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2026-10-30",
    quota: 1,
    status: "Selesai",
    postedDate: "2026-10-15",
    description: "Pengujian penetrasi grey-box untuk 3 sistem informasi internal lab sebelum peluncuran resmi tahun depan.",
    assignedContributor: {
      id: "aisha-dwi-rahmawati",
      name: "Aisha Dwi Rahmawati",
      avatar: DEFAULT_AVATAR,
      role: "Alumni 2024 · Data Scientist",
      phone: "081234567890",
      assignedDate: "18 Okt 2026"
    },
    endorsement: "Aisha bekerja dengan sangat terstruktur. Dokumentasi temuan dan data-driven vulnerability assessment diserahkan tepat waktu.",
    completedDate: "30 Okt 2026",
    applicants: []
  },
  {
    id: "gig-5",
    title: "Slicing Desain UI/UX ke React & Tailwind CSS untuk Dashboard Koperasi",
    ownerId: "maulidya-ayu-pratiwi",
    ownerName: "Maulidya Ayu Pratiwi",
    ownerAvatar: "https://i.pravatar.cc/150?img=26",
    ownerRole: "Alumni 2024 · Frontend Developer @ Gojek",
    ownerPhone: "081234567801",
    category: "Frontend",
    rolesNeeded: ["Frontend Developer (React/Tailwind)", "Component Slicer"],
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Figma"],
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    deadline: "2026-12-05",
    quota: 2,
    status: "Terbuka",
    postedDate: "03 Nov 2026",
    description: "Mencari 2 orang rekan alumni untuk membantu slicing 8 halaman dashboard admin koperasi digital dari Figma ke React + Tailwind CSS. Komponen atomik sudah terstruktur rapi.",
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: [
      {
        id: "app-501",
        applicantId: "dimas-aryo",
        applicantName: "Dimas Aryo",
        resumeFileName: "CV_Dimas_Aryo_ATS.pdf",
        applicantAvatar: "https://i.pravatar.cc/150?img=15",
        applicantBatch: "2023",
        applicantPhone: "081298765432",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        pitchMessage: "Halo Mbak Maulidya, saya siap bantu slicing 4 halaman pertama dalam 3 hari.",
        portfolioItems: [
          { title: "Admin Portal Dashboard", linkUrl: "https://github.com/dimasaryo", stack: "React · Tailwind" }
        ],
        appliedDate: "03 Nov 2026",
        status: "PENDING"
      }
    ]
  },
  {
    id: "gig-6",
    title: "Microservice Payment Gateway Webhook & Invoicing (Golang / Fiber)",
    ownerId: "sindu-aditya-putra",
    ownerName: "Sindu Aditya Putra",
    ownerAvatar: "https://i.pravatar.cc/150?img=59",
    ownerRole: "Alumni 2023 · Backend Engineer @ Shopee",
    ownerPhone: "081234567802",
    category: "Backend",
    rolesNeeded: ["Backend Golang", "Database Specialist"],
    techStack: ["Golang", "Fiber", "PostgreSQL", "Docker", "Redis"],
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2026-12-15",
    quota: 1,
    status: "Terbuka",
    postedDate: "02 Nov 2026",
    description: "Membangun service invoicing dan webhook gateway pembayaran untuk platform kursus coding internal. Endpoint terdokumentasi via Swagger dan butuh unit test coverage minimal 80%.",
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: []
  },
  {
    id: "gig-7",
    title: "Automated End-to-End Regression Testing dengan Playwright / TypeScript",
    ownerId: "fajar-nugroho",
    ownerName: "Fajar Nugroho",
    ownerAvatar: "https://i.pravatar.cc/150?img=33",
    ownerRole: "Alumni 2022 · Cybersecurity Specialist",
    ownerPhone: "081777889900",
    category: "QA / Testing",
    rolesNeeded: ["QA Automation Engineer"],
    techStack: ["Playwright", "TypeScript", "GitHub Actions", "Jest"],
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    deadline: "2026-11-28",
    quota: 1,
    status: "Terbuka",
    postedDate: "01 Nov 2026",
    description: "Menyusun skenario automated smoke test & regression test untuk alur checkout sertifikasi dan otentikasi portal laboratorium Bengkel Koding.",
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: []
  },
  {
    id: "gig-8",
    title: "Aplikasi POS Kasir Offline-First & Bluetooth Thermal Printer",
    ownerId: "andi-pratama",
    ownerName: "Andi Pratama",
    ownerAvatar: "https://i.pravatar.cc/150?img=18",
    ownerRole: "Alumni 2024 · Mobile Developer @ Bukalapak",
    ownerPhone: "081234567803",
    category: "Mobile App",
    rolesNeeded: ["Flutter Developer", "Mobile Engineer"],
    techStack: ["Flutter", "Dart", "SQLite", "Bluetooth ESC/POS"],
    budgetRange: "> Rp 5.000.000",
    deadline: "2026-12-25",
    quota: 2,
    status: "Terbuka",
    postedDate: "03 Nov 2026",
    description: "Mencari 2 orang rekan asisten/alumni untuk modul cetak struk kasir bluetooth thermal printer dan sinkronisasi background transaksi toko retail.",
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: []
  },
  {
    id: "gig-9",
    title: "Model Rekomendasi Silabus Belajar Mahasiswa (FastAPI & Scikit-Learn)",
    ownerId: "siti-nuraini",
    ownerName: "Siti Nuraini",
    ownerAvatar: "https://i.pravatar.cc/150?img=41",
    ownerRole: "Alumni 2023 · Data Scientist @ Grab",
    ownerPhone: "081234567804",
    category: "Data Science",
    rolesNeeded: ["Python Data Scientist"],
    techStack: ["Python", "FastAPI", "Scikit-Learn", "Pandas", "PostgreSQL"],
    budgetRange: "Rp 3.000.000 - Rp 5.000.000",
    deadline: "2026-12-18",
    quota: 1,
    status: "Terbuka",
    postedDate: "02 Nov 2026",
    description: "Membangun algoritma rekomendasi silabus praktikum dan jalur belajar mahasiswa Bengkel Koding berdasarkan minat karier dan histori capaian mata kuliah.",
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: []
  },
  {
    id: "gig-10",
    title: "Desain Ulang UI/UX Mobile App Ekosistem Komunitas Lab",
    ownerId: "intan-permata",
    ownerName: "Intan Permata",
    ownerAvatar: "https://i.pravatar.cc/150?img=48",
    ownerRole: "Alumni 2024 · Frontend Engineer & UI",
    ownerPhone: "081987654321",
    category: "UI/UX & Web",
    rolesNeeded: ["UI/UX Designer", "Product Designer"],
    techStack: ["Figma", "Design Token", "Prototyping", "User Testing"],
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    deadline: "2026-11-30",
    quota: 1,
    status: "Terbuka",
    postedDate: "03 Nov 2026",
    description: "Revamp antarmuka aplikasi mobile komunitas alumni Bengkel Koding agar lebih modern, clean, dan memiliki visual token serta design system yang konsisten.",
    assignedContributor: null,
    endorsement: "",
    completedDate: null,
    applicants: []
  },
  // Proyek milik Aisha yang sedang dikerjakan, supaya alur "Tandai Selesai" di Kelola Gigs bisa dicoba
  {
    id: "gig-11",
    title: "Dashboard Rekap Nilai Praktikum Lab Bengkel Koding",
    ownerId: "aisha-dwi-rahmawati",
    ownerName: "Aisha Dwi Rahmawati",
    ownerAvatar: DEFAULT_AVATAR,
    ownerRole: "Alumni 2024 · Lab Bengkel Koding",
    ownerPhone: "081234567890",
    category: "Data Science",
    rolesNeeded: ["Data Analyst", "Frontend Dashboard"],
    techStack: ["Python", "Streamlit", "Google Sheets API"],
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    deadline: "2026-11-28",
    quota: 1,
    status: "Sedang Dikerjakan",
    postedDate: "20 Okt 2026",
    description: `Membuat dashboard rekap nilai praktikum per kelas dari Google Sheets asisten, lengkap dengan grafik sebaran nilai dan ekspor laporan PDF untuk koordinator lab.

Deliverables:
1. Script sinkronisasi Google Sheets ke dataset terstruktur.
2. Dashboard Streamlit berisi filter kelas, grafik distribusi nilai, dan daftar mahasiswa remedial.
3. Ekspor ringkasan nilai per kelas ke PDF.`,
    assignedContributor: {
      id: "rafi-pratama",
      name: "Rafi Pratama",
      avatar: "https://i.pravatar.cc/150?img=12",
      batch: "2023",
      phone: "081311122233",
      assignedDate: "24 Okt 2026"
    },
    endorsement: "",
    completedDate: null,
    applicants: [
      {
        id: "app-1101",
        applicantId: "rafi-pratama",
        applicantName: "Rafi Pratama",
        resumeFileName: "CV_Rafi_Pratama_ATS.pdf",
        applicantAvatar: "https://i.pravatar.cc/150?img=12",
        applicantBatch: "2023",
        applicantPhone: "081311122233",
        skills: ["Python", "Streamlit", "Pandas"],
        pitchMessage: "Saya pernah membuat dashboard nilai serupa untuk asisten praktikum Basis Data. Bisa mulai minggu ini.",
        portfolioItems: [
          { title: "Lab Grade Dashboard", linkUrl: "https://github.com/rafipratama", stack: "Python · Streamlit" }
        ],
        appliedDate: "21 Okt 2026",
        status: "ACCEPTED"
      }
    ]
  }
];

function loadGigs() {
  if (typeof window === "undefined") return INITIAL_GIGS;
  try {
    const raw = localStorage.getItem(GIGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GIGS_STORAGE_KEY, JSON.stringify(INITIAL_GIGS));
      return INITIAL_GIGS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Pastikan gig baru di INITIAL_GIGS tetap masuk jika belum ada di localStorage
      const existingIds = new Set(parsed.map(g => g.id));
      const missing = INITIAL_GIGS.filter(g => !existingIds.has(g.id));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        localStorage.setItem(GIGS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    return INITIAL_GIGS;
  } catch {
    return INITIAL_GIGS;
  }
}

function saveGigs(gigs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GIGS_STORAGE_KEY, JSON.stringify(gigs));
    window.dispatchEvent(new Event("bengkod_gigs_updated"));
  } catch (err) {
    console.error("Gagal menyimpan gigs:", err);
  }
}

function loadMyApplications() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GIGS_APPLY_KEY);
    if (!raw) {
      // Seed aplikasi bawaan untuk akun Aisha (1 aktif, 1 selesai)
      const seedApps = [
        {
          id: "app-301",
          gigId: "gig-3",
          gigTitle: "Pipeline Data ETL & Dashboard Visualisasi Penjualan UMKM",
          ownerName: "Clarista",
          ownerPhone: "081555667788",
          message: "Halo Clarista, saya tertarik membantu pipeline data ETL ini. Sebelumnya sudah membuat engine probabilitas UMKM serupa.",
          resumeFileName: "CV_Aisha_Dwi_Rahmawati_ATS.pdf",
          portfolioItems: [
            { title: "UMKM Success Probability Prediction", linkUrl: "https://github.com/aishaadr", stack: "Python · PostgreSQL" }
          ],
          appliedDate: "29 Okt 2026",
          status: "ACCEPTED", // PENDING | ACCEPTED | REJECTED | COMPLETED
          budgetRange: "> Rp 5.000.000"
        },
        {
          id: "app-401",
          gigId: "gig-4",
          gigTitle: "Audit Keamanan & Penetrasi Aplikasi Internal Laboratorium",
          ownerName: "Fajar Nugroho",
          ownerPhone: "081777889900",
          message: "Saya siap membantu penyusunan laporan temuan dan data pentest.",
          resumeFileName: "CV_Aisha_Dwi_Rahmawati_ATS.pdf",
          portfolioItems: [],
          appliedDate: "16 Okt 2026",
          status: "COMPLETED",
          budgetRange: "Rp 3.000.000 - Rp 5.000.000",
          endorsement: "Aisha bekerja dengan sangat terstruktur. Dokumentasi temuan dan data-driven vulnerability assessment diserahkan tepat waktu."
        }
      ];
      localStorage.setItem(GIGS_APPLY_KEY, JSON.stringify(seedApps));
      return seedApps;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveMyApplications(apps) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GIGS_APPLY_KEY, JSON.stringify(apps));
    window.dispatchEvent(new Event("bengkod_gigs_apply_updated"));
  } catch (err) {
    console.error("Gagal menyimpan lamaran:", err);
  }
}

/** Format URL WhatsApp dengan teks pesan siap kirim */
function formatWaUrl(phone, text) {
  const cleanPhone = (phone || "").replace(/[^0-9]/g, "").replace(/^0/, "62");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text || "")}`;
}

/** Auto-publish gig yang selesai ke Feed Beranda */
function publishGigCompletionToFeed(gig, endorsement) {
  try {
    const posts = typeof loadPosts === "function" ? loadPosts() : [];
    const contributorName = (gig.assignedContributor && gig.assignedContributor.name) || "Rekan Kontributor";
    const newPost = {
      id: Date.now(),
      authorName: gig.ownerName,
      authorAvatar: gig.ownerAvatar,
      authorHeadline: gig.ownerRole,
      date: "Baru saja",
      category: "Karya & Showcase",
      visibility: "Semua orang",
      content: `🎉 Kolaborasi Bengkod Gigs Selesai!\n\nProyek "${gig.title}" telah rampung dikerjakan bersama @${contributorName}.\n\n⭐ Catatan Rekomendasi:\n"${endorsement || 'Pengerjaan berkualitas, komunikasi profesional, dan serah terima tepat waktu.'}"\n\n#BengkodGigs #KolaborasiAlumni`,
      likes: 1,
      isLiked: false,
      commentsCount: 0,
      repostsCount: 0,
      impressions: 1,
    };
    if (typeof savePosts === "function") {
      savePosts([newPost, ...posts]);
    }
  } catch (err) {
    console.warn("Gagal auto-publish ke feed:", err);
  }
}

// ============================================================
// NOTIFIKASI AISHA (lonceng di topbar alumni.js)
// Status baca disimpan terpisah di localStorage (lihat alumniNotifReadIds di alumni.js).
// tautan relatif terhadap folder alumni/.
// ============================================================
const NOTIFIKASI_AISHA = [
  {
    id: "notif-referral-101",
    jenis: "referral",
    judul: "Pengajuan referral baru",
    pesan: "Yoga Kurniawan meminta review & referral untuk Backend Developer Intern di PT Solusi Digital Jateng.",
    waktu: "2026-11-04T09:15:00",
    tautan: "dashboard.html#activity-card-5",
  },
  {
    id: "notif-gig-102",
    jenis: "gigs",
    judul: "Pelamar gigs baru",
    pesan: "Kirana Maheswari mengajukan minat di \"Sistem Presensi QR Code Mobile App untuk Event Komunitas\".",
    waktu: "2026-11-03T13:40:00",
    tautan: "gigs-kelola.html?pelamar=gig-1",
  },
  {
    id: "notif-gig-101",
    jenis: "gigs",
    judul: "Pelamar gigs baru",
    pesan: "Dimas Aryo mengajukan minat di \"Sistem Presensi QR Code Mobile App untuk Event Komunitas\".",
    waktu: "2026-11-02T10:05:00",
    tautan: "gigs-kelola.html?pelamar=gig-1",
  },
  {
    id: "notif-pengumuman-2",
    jenis: "pengumuman",
    judul: "Pengumuman koordinator",
    pesan: "Pengisian Data Alumni Terbaru: perbarui profil, keahlian, dan tracer study Anda.",
    waktu: "2026-10-21T08:00:00",
    tautan: "pengumuman.html#pengumuman-2",
  },
  {
    id: "notif-pengumuman-1",
    jenis: "pengumuman",
    judul: "Pengumuman koordinator",
    pesan: "Jadwal Pelepasan Alumni Angkatan 2024 sudah terbit.",
    waktu: "2026-10-24T08:00:00",
    tautan: "pengumuman.html#pengumuman-1",
  },
];

// Expose globals for Alpine.js & pages
if (typeof window !== "undefined") {
  window.NOTIFIKASI_AISHA = NOTIFIKASI_AISHA;
  window.GIGS_BUDGET_RANGES = GIGS_BUDGET_RANGES;
  window.INITIAL_GIGS = INITIAL_GIGS;
  window.loadGigs = loadGigs;
  window.saveGigs = saveGigs;
  window.loadMyApplications = loadMyApplications;
  window.saveMyApplications = saveMyApplications;
  window.formatWaUrl = formatWaUrl;
  window.publishGigCompletionToFeed = publishGigCompletionToFeed;
}