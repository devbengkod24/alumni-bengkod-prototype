/**
 * Shared JS role Alumni: config Tailwind, layout sidebar/topbar, data store master, helper.
 * Dimuat di <head> setelah Tailwind CDN dan sebelum ../assets/js/main.js,
 * supaya layout sidebar dan data sudah siap saat DOM dirender.
 * 100% konsisten dengan lms-bengkod-web (app/(dashboard)/dashboard/alumni).
 */

tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
      colors: {
        primary1: '#1E3A8A', primary2: '#1D4ED8', primary3: '#3B82F6', primary4: '#93C5FD', primary5: '#DBEAFE',
        secondary1: '#FFC150', secondary2: '#FFCD73', secondary3: '#FFE0A8', secondary4: '#DEDFE1',
        neutral1: '#46494E', neutral2: '#55585E', neutral3: '#6B6E76', neutral4: '#DEDFE1', neutral5: '#F4F4F4', neutral6: '#FFFFFF',
        green1: '#1C6A1A', green2: '#068913', green3: '#CDFECF',
        red1: '#B00B0B', red2: '#D73D3D', red3: '#FCC6CD',
        yellow1: '#8F6F00', yellow2: '#FFCE22', yellow3: '#FFECAA',
        blue1: '#002C9D', blue2: '#2E63EA', blue3: '#B0C6FF',
      },
    },
  },
};

// Komponen UI dari DESIGN.md §4 (diproses Tailwind CDN lewat @apply)
document.head.insertAdjacentHTML('beforeend', `<style type="text/tailwindcss">
@layer components {
  .card { @apply bg-white rounded-xl border border-neutral4 p-6; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
  .th { @apply bg-neutral5 text-neutral2 text-xs font-semibold uppercase tracking-wider py-3.5 px-4 text-left border-b border-neutral4 whitespace-nowrap; }
  .tr { @apply border-b border-neutral4 hover:bg-blue-50/40 text-sm text-neutral1 transition-colors; }
  .td { @apply py-3.5 px-4 align-top; }
  .btn { @apply inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-40 disabled:cursor-not-allowed; }
  .btn-primary { @apply btn text-white bg-primary1 hover:bg-primary2 focus:ring-primary5; }
  .btn-outline { @apply btn text-neutral1 bg-white hover:bg-neutral5 border border-neutral4 focus:ring-neutral5; }
  .btn-danger { @apply btn text-white bg-red2 hover:bg-red1 focus:ring-red3; }
  .btn-success { @apply btn text-white bg-green2 hover:bg-green1 focus:ring-green3; }
  .btn-icon { @apply p-2 rounded-lg text-neutral2 hover:bg-primary5 hover:text-primary1 focus:outline-none focus:ring-2 focus:ring-primary3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent; }
  .label { @apply block text-sm font-medium text-neutral2 mb-1.5; }
  .input { @apply block w-full px-3.5 py-2.5 border border-neutral4 rounded-md text-neutral1 bg-white placeholder-neutral3 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 text-sm transition-all duration-150; }
  .modal-backdrop { @apply fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden items-center justify-center p-4; }
  .modal { @apply bg-white rounded-2xl w-full p-6 max-h-[90vh] overflow-y-auto; box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1); }
}
</style>`);

function lsGet(k, def) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}

function lsSet(k, val) {
  try {
    localStorage.setItem(k, JSON.stringify(val));
  } catch {
    // LocalStorage diblokir: abaikan
  }
}

// Avatar default resmi
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80";

// ===================== DATA DUMMY MASTER ALUMNI =====================
const ALUMNI_DATA = {
  profile: lsGet('bengkod_alumni_profile', {
    id: "aisha-dwi-rahmawati",
    name: "Aisha Dwi Rahmawati",
    firstName: "Aisha Dwi",
    lastName: "Rahmawati",
    headline: "Data Scientist & Data Analyst | Undergraduate Student at Dian Nuswantoro University",
    batch: "2024",
    divisi: "Divisi Data Science",
    isVerified: true,
    location: "Kota Kudus, Jawa Tengah, Indonesia",
    city: "Kota Kudus, Jawa Tengah",
    countryCode: "ID",
    industry: "Teknologi, Informasi, dan Internet",
    university: "Universitas Dian Nuswantoro",
    connections: 75,
    followers: 77,
    email: "aisha.rahma@alumni.dinus.ac.id",
    phone: "+62 812-3456-7890",
    linkedin: "https://www.linkedin.com/in/aisharah",
    github: "https://github.com/aishaadr",
    website: "https://aisharahma.dev",
    about: "Motivated Informatics Engineering student at Universitas Dian Nuswantoro Semarang with a strong passion for data science, machine learning, and business analysis. Berpengalaman sebagai Asisten Laboratorium Bengkel Koding membimbing kelas Data Science & Python.",
    avatarUrl: DEFAULT_AVATAR,
    coverGradient: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #0284C7 100%)",

    // Detail Portofolio & Resume
    projects: [
      {
        id: 1,
        title: "Sentiment Analysis System for OVO App",
        period: "Okt 2024 : Des 2024",
        desc: "Sistem klasifikasi sentimen ulasan pengguna aplikasi OVO pada Google Play Store menggunakan algoritma IndoBERT dan Bi-LSTM dengan akurasi 92.4%.",
        tags: ["Python", "PyTorch", "NLP", "FastAPI", "Docker"],
        contributor: "Clarista",
        linkUrl: "https://github.com/aishaadr/ovo-sentiment-analysis",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80"
      },
      {
        id: 2,
        title: "Customer Churn Prediction Dashboard",
        period: "Agu 2024 : Sep 2024",
        desc: "Dashboard analitik prediksi churn pelanggan telekomunikasi dengan visualisasi interaktif SHAP value untuk interpretasi model machine learning.",
        tags: ["Python", "Scikit-Learn", "Streamlit", "PostgreSQL"],
        contributor: "Rafi Pratama",
        linkUrl: "https://github.com/aishaadr/churn-prediction",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80"
      }
    ],

    experience: [
      {
        id: 1,
        title: "Asisten Laboratorium Bengkel Koding",
        company: "Universitas Dian Nuswantoro",
        period: "Sep 2023 : Jul 2024 (11 bulan)",
        location: "Semarang, Jawa Tengah",
        type: "Paruh Waktu (Part-time)",
        desc: "Membimbing 120+ mahasiswa kelas unggulan pada materi Machine Learning, Deep Learning (PyTorch), Data Preprocessing, dan integrasi FastAPI."
      },
      {
        id: 2,
        title: "Data Analyst Intern",
        company: "PT Telkom Indonesia (Persero) Tbk",
        period: "Feb 2024 : Jun 2024 (5 bulan)",
        location: "Bandung, Jawa Barat (Hybrid)",
        type: "Magang (Internship)",
        desc: "Membangun dashboard otomatisasi pelaporan KPI divisi infrastruktur digital menggunakan SQL, BigQuery, dan Looker Studio."
      }
    ],

    education: [
      {
        id: 1,
        institution: "Universitas Dian Nuswantoro",
        degree: "Sarjana Komputer (S.Kom), Teknik Informatika",
        period: "2021 : 2025",
        grade: "IPK 3.82 / 4.00",
        activities: "Asisten Lab Bengkel Koding, Ketua Divisi Riset AI Himpunan Mahasiswa Teknik Informatika (HMTI)."
      }
    ],

    certifications: [
      {
        id: 1,
        title: "Google Cloud Certified Associate Cloud Engineer",
        issuer: "Google Cloud",
        issueDate: "Nov 2024",
        credentialId: "GCP-ACE-982141",
        credentialUrl: "https://cloud.google.com/certification"
      },
      {
        id: 2,
        title: "Machine Learning Developer Certification",
        issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
        issueDate: "Agu 2024",
        credentialId: "BNSP-TI-2024-8871",
        credentialUrl: "#"
      }
    ],

    organizations: [
      {
        id: 1,
        name: "Bengkel Koding Core Team",
        role: "Lead Divisi Data Science & AI",
        period: "2023 : 2024",
        desc: "Mengelola kurikulum pelatihan, review capstone project, dan pelatihan asisten laboratorium baru."
      }
    ],

    skills: [
      { id: 1, name: "Python", endorsements: 24 },
      { id: 2, name: "Machine Learning", endorsements: 21 },
      { id: 3, name: "Data Science & Analytics", endorsements: 19 },
      { id: 4, name: "PyTorch & Deep Learning", endorsements: 16 },
      { id: 5, name: "SQL & Relational Databases", endorsements: 15 },
      { id: 6, name: "FastAPI & RESTful APIs", endorsements: 12 },
      { id: 7, name: "Docker & Containerization", endorsements: 9 }
    ]
  }),

  // Direktori Alumni Rekan Kerja Sama
  directory: [
    {
      id: "clarista",
      name: "Clarista, S.Kom",
      headline: "Machine Learning Engineer at DataMind Corp | AI Researcher",
      batch: "2024",
      divisi: "Divisi Data Science",
      location: "Semarang, Jawa Tengah",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
      connections: 128
    },
    {
      id: "rafi-pratama",
      name: "Rafi Pratama, S.Kom",
      headline: "Fullstack Web Developer at Traveloka | Next.js & Laravel",
      batch: "2023",
      divisi: "Divisi Developer",
      location: "Jakarta Selatan, DKI Jakarta",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
      connections: 96
    },
    {
      id: "hendra-wijaya",
      name: "Hendra Wijaya, S.Kom",
      headline: "Cloud & DevOps Specialist at Gojek | Docker & Kubernetes",
      batch: "2023",
      divisi: "Divisi Developer",
      location: "Jakarta Selatan, DKI Jakarta",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
      connections: 110
    }
  ],

  // Data Postingan Linimasa Interaktif (Sesuai INITIAL_POSTS di postsData.ts)
  posts: lsGet('bengkod_alumni_posts', [
    {
      id: 1,
      authorName: "Aisha Dwi Rahmawati",
      authorAvatar: DEFAULT_AVATAR,
      authorHeadline: "Data Scientist & Data Analyst | Undergraduate Student at Dian Nuswantoro University",
      date: "Feb 12, 2026",
      visibility: "Semua orang",
      content: "Dengan gembira, saya membagikan proyek Sentiment Analysis System for OVO App yang saya kerjakan. Lihat di sini: https://lnkd.in/eVbna2d3",
      category: "Pencapaian Proyek / Capstone",
      imageUrl: DEFAULT_AVATAR,
      likes: 3,
      isLiked: false,
      commentsCount: 36,
      repostsCount: 541,
      impressions: 502,
      comments: [
        {
          id: 101,
          author: "Grace Liu",
          headline: "Analyst at Zepto",
          avatar: "https://i.pravatar.cc/150?img=47",
          time: "1w",
          text: "Interesting approach to simplifying the AI stack. Having infrastructure, platforms, and model services working together could make scaling AI much more efficient.",
          likes: 2,
          replies: []
        },
        {
          id: 102,
          author: "Kuswanto, S.E",
          headline: "Founder & CEO at APMGN Holding Nusantara | Building Indonesia'...",
          avatar: "https://i.pravatar.cc/150?img=12",
          time: "2w",
          text: "Perspective Valuable",
          likes: 3,
          replies: []
        }
      ]
    },
    {
      id: 2,
      authorName: "Arif Alam",
      authorAvatar: "",
      authorHeadline: "Making AI Accessible to All | Building @Data ...",
      date: "Apr 12, 2025",
      isRepost: true,
      repostedBy: "Aisha Dwi Rahmawati",
      content: "Ringkasan komprehensif algoritma Machine Learning populer untuk referensi cepat mahasiswa dan alumni Bengkel Koding.",
      category: "Knowledge Sharing",
      visibility: "Semua orang",
      tablePreview: {
        title: "Cheatsheet Machine Learning Algorithms",
        rows: [
          { col1: "Linear Regression", col2: "Supervised", col3: "y = b0 + b1x", col4: "Simple, interpretable", col5: "House price prediction" },
          { col1: "Logistic Regression", col2: "Supervised", col3: "P = 1 / (1+e^-z)", col4: "Probabilistic output", col5: "Spam detection" },
          { col1: "Decision Tree", col2: "Supervised", col3: "Gini / Entropy", col4: "Non-linear, visualizable", col5: "Loan approval" },
          { col1: "Random Forest", col2: "Supervised (Ensemble)", col3: "Bagging of Trees", col4: "High accuracy, robust", col5: "Fraud detection" },
          { col1: "K-Means Clustering", col2: "Unsupervised", col3: "Euclidean Distance", col4: "Easy to implement", col5: "Customer segmentation" },
        ]
      },
      imageUrl: "",
      likes: 18,
      isLiked: false,
      commentsCount: 12,
      repostsCount: 89,
      impressions: 1240,
      comments: []
    }
  ]),

  // Data Lowongan Kerja Mitra Industri Resmi
  jobs: lsGet('bengkod_jobs_data', [
    {
      id: "job-goto-ai-eng",
      title: "Junior AI & Machine Learning Engineer",
      company: "GoTo Group (Gojek & Tokopedia)",
      companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      location: "Jakarta Selatan, DKI Jakarta",
      workModel: "Hybrid",
      employmentType: "Penuh Waktu (Full-time)",
      experienceLevel: "Fresh Graduate",
      salaryRange: "Rp 12.000.000 : Rp 18.000.000 / bulan",
      datePosted: "1 hari lalu",
      applicantsCount: 28,
      isEasyApply: true,
      isPartner: true,
      industry: "Internet & Teknologi Finansial",
      companySize: "5.000+ Karyawan",
      companyWebsite: "https://gotocompany.com",
      aboutCompany: "GoTo adalah ekosistem digital terbesar di Indonesia yang menggabungkan layanan on-demand (Gojek), e-commerce (Tokopedia), dan layanan keuangan.",
      description: "Kami mencari talenta alumni berbakat di bidang AI dan Rekayasa Data untuk bergabung dalam tim Applied Machine Learning GoTo. Anda akan bekerja sama mengembangkan model prediktif, personalization algorithms, dan NLP processing pipelines berkinerja tinggi.",
      responsibilities: [
        "Mengembangkan, mengevaluasi, dan melakukan deployment model machine learning untuk sistem rekomendasi real-time.",
        "Melakukan data wrangling, feature engineering, dan eksplorasi dataset skala besar menggunakan Python, Spark, dan SQL.",
        "Berkolaborasi dengan tim backend engineer untuk mengintegrasikan model ke microservices arsitektur Go/Python.",
        "Memantau performa model di production dan melakukan A/B testing secara berkala."
      ],
      qualifications: [
        "Lulusan S1 Teknik Informatika, Ilmu Komputer, atau bidang terkait dari Bengkel Koding UDINUS.",
        "Memiliki pemahaman kuat mengenai algoritma Machine Learning, Deep Learning, dan pemrosesan data dengan Python (Pandas, PyTorch, Scikit-Learn).",
        "Terbiasa dengan SQL, REST API, Git, dan dasar containerization Docker.",
        "Memiliki portofolio proyek data science atau capstone nyata."
      ],
      skillsRequired: ["Python", "PyTorch", "Machine Learning", "SQL", "Docker", "FastAPI"],
      benefits: ["Asuransi Kesehatan Komprehensif", "Tunjangan Kerja Hybrid", "Budget Pembelajaran & Sertifikasi Tahunan", "BPJS Ketenagakerjaan"],
      alumniConnections: [
        { name: "Clarista, S.Kom", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80", role: "AI Engineer", batch: "2024" }
      ]
    },
    {
      id: "job-traveloka-fe-eng",
      title: "Frontend Engineer (Next.js & TypeScript)",
      company: "Traveloka Indonesia",
      companyLogo: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=120&auto=format&fit=crop&q=80",
      location: "Tangerang, Banten (Hybrid)",
      workModel: "Hybrid",
      employmentType: "Penuh Waktu (Full-time)",
      experienceLevel: "Junior (0-2 tahun)",
      salaryRange: "Rp 10.000.000 : Rp 15.000.000 / bulan",
      datePosted: "2 hari lalu",
      applicantsCount: 35,
      isEasyApply: true,
      isPartner: true,
      industry: "Online Travel & Lifestyle",
      companySize: "2.000+ Karyawan",
      companyWebsite: "https://traveloka.com",
      aboutCompany: "Traveloka adalah platform perjalanan terdepan di Asia Tenggara yang menyediakan akses mudah bagi jutaan konsumen untuk menemukan berbagai kebutuhan transportasi dan akomodasi.",
      description: "Bergabung bersama tim web core Traveloka untuk membangun antarmuka web modern yang cepat, responsif, dan aksesibel bagi jutaan pengguna di Asia Tenggara.",
      responsibilities: [
        "Mengembangkan komponen web modular dengan Next.js 15, TypeScript, dan Tailwind CSS.",
        "Mengoptimalkan Core Web Vitals, waktu rendering, dan performa halaman web.",
        "Mengintegrasikan GraphQL dan REST API backend secara aman dan efisien."
      ],
      qualifications: [
        "Menguasai React, Next.js, TypeScript, dan state management modern.",
        "Memahami prinsip Web Accessibility (WCAG) dan responsive design.",
        "Lulusan Bengkel Koding divisi Developer menjadi nilai tambah utama."
      ],
      skillsRequired: ["Next.js", "TypeScript", "React", "Tailwind CSS", "REST API"],
      benefits: ["Voucher Liburan Tahunan", "Asuransi Rawat Inap & Jalan", "Fasilitas Laptop Mac/ThinkPad", "Skema Kerja Fleksibel"],
      alumniConnections: [
        { name: "Rafi Pratama, S.Kom", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80", role: "Fullstack Web Developer", batch: "2023" }
      ]
    },
    {
      id: "job-telkom-ds-intern",
      title: "Data Science & AI Research Intern",
      company: "PT Telkom Indonesia",
      companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
      location: "Semarang, Jawa Tengah",
      workModel: "Di Kantor (On-site)",
      employmentType: "Magang (Internship)",
      experienceLevel: "Magang",
      salaryRange: "Uang Saku Standar BUMN + Sertifikat",
      datePosted: "3 hari lalu",
      applicantsCount: 42,
      isEasyApply: true,
      isPartner: true,
      industry: "Telekomunikasi Digital",
      companySize: "10.000+ Karyawan",
      companyWebsite: "https://telkom.co.id",
      aboutCompany: "Telkom Indonesia adalah perusahaan telekomunikasi digital terbesar di Indonesia dengan komitmen mengakselerasi digitalisasi ekosistem bangsa.",
      description: "Program magang intensif 6 bulan bagi mahasiswa semester akhir atau lulusan baru Bengkel Koding UDINUS untuk melakukan riset pemanfaatan generative AI dan analitik prediktif.",
      responsibilities: [
        "Membantu pengolahan big data dan visualisasi insight tren jaringan.",
        "Membangun prototipe model deteksi anomali pada log transmisi data.",
        "Menyusun laporan teknis hasil eksperimen model machine learning."
      ],
      qualifications: [
        "Mahasiswa tingkat akhir atau lulusan baru prodi Informatika/Sistem Informasi UDINUS.",
        "Memiliki pemahaman dasar Python, SQL, dan visualisasi data.",
        "Mampu bekerja sama dalam tim laboratorium riset."
      ],
      skillsRequired: ["Python", "Data Analysis", "SQL", "Pandas", "Matplotlib"],
      benefits: ["Uang Saku Bulanan", "Mentoring dari Principal Data Scientist", "Sertifikat Resmi Magang BUMN"],
      alumniConnections: []
    }
  ]),

  savedJobs: lsGet('bengkod_saved_jobs', ['job-goto-ai-eng']),
  applications: lsGet('bengkod_job_applications', [
    {
      id: "app-101",
      jobId: "job-traveloka-fe-eng",
      jobTitle: "Frontend Engineer (Next.js & TypeScript)",
      company: "Traveloka Indonesia",
      status: "Ditinjau oleh HR",
      appliedAt: "2026-10-18"
    }
  ])
};

function saveProfileData() {
  lsSet('bengkod_alumni_profile', ALUMNI_DATA.profile);
}
function savePostsData() {
  lsSet('bengkod_alumni_posts', ALUMNI_DATA.posts);
}
function saveSavedJobsData() {
  lsSet('bengkod_saved_jobs', ALUMNI_DATA.savedJobs);
}
function saveApplicationsData() {
  lsSet('bengkod_job_applications', ALUMNI_DATA.applications);
}

// Navigasi Sidebar Role Alumni (Sesuai Aside.tsx lms-bengkod-web)
const ALUMNI_NAV = [
  { href: 'dashboard.html', icon: 'layout-dashboard', label: 'Dashboard', match: 'dashboard.html' },
  { href: 'profil.html', icon: 'user', label: 'Profil Saya', match: 'profil.html' },
  { href: 'lowongan.html', icon: 'briefcase', label: 'Lowongan Kerja', match: 'lowongan.html' },
  { href: 'status-karir.html', icon: 'clipboard-check', label: 'Status Karir', match: 'status-karir.html' },
];

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ===================== LAYOUT GENERATOR ALUMNI =====================
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main[data-title]');
  if (!main) return;
  const current = location.pathname.split('/').pop() || 'dashboard.html';

  const navItems = ALUMNI_NAV.map(n => {
    const active = n.match === current || (current === 'index.html' && n.match === 'dashboard.html');
    return `
      <a href="${n.href}" ${active ? 'aria-current="page"' : ''}
        class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
        <i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i>
        <span>${n.label}</span>
      </a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="sidebar-overlay" class="fixed inset-0 bg-neutral1/40 backdrop-blur-sm z-40 hidden"></div>
    <aside id="sidebar" class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 z-50 flex flex-col -translate-x-full transition-transform duration-300 ease-in-out" aria-label="Menu Alumni">
      <!-- Logo Resmi Bengkel Koding -->
      <a href="../index.html" class="flex items-center justify-center py-5 px-4 border-b border-neutral4 focus:outline-none focus:ring-2 focus:ring-primary1">
        <img src="../assets/images/bengkelkoding-text.webp" alt="Bengkel Koding Logo" class="h-9 w-auto object-contain">
      </a>
      <!-- Navigation Links -->
      <nav class="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">${navItems}</nav>
      <!-- Footer Sidebar: Keluar Langsung ke Beranda -->
      <div class="p-3 border-t border-neutral4">
        <a href="http://127.0.0.1:5500/" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors">
          <i data-lucide="log-out" class="w-5 h-5"></i><span>Keluar</span></a>
      </div>
    </aside>`);

  // Breadcrumbs Generator (100% Identik dengan Nav.tsx lms-bengkod-web)
  const isDashboard = current === 'dashboard.html' || current === 'index.html' || main.dataset.title === 'Dashboard';
  const pageTitle = esc(main.dataset.title);

  const breadcrumbHTML = isDashboard
    ? `<a href="dashboard.html" class="text-neutral1 hover:text-primary1 transition-colors font-medium">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1">Alumni</span>`
    : `<a href="dashboard.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <a href="dashboard.html" class="text-neutral2 hover:text-primary1 transition-colors">Alumni</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1 truncate">${pageTitle}</span>`;

  const wrapper = document.createElement('div');
  wrapper.id = 'main-wrapper';
  wrapper.className = 'flex-1 flex flex-col min-h-screen min-w-0 duration-300 ease-in-out lg:pl-64';
  wrapper.style.transition = 'padding-left 300ms ease-in-out';
  wrapper.innerHTML = `
    <!-- Topbar Header Identik dengan lms-bengkod-web Nav.tsx -->
    <nav class="sticky top-0 z-[60] bg-white border-b border-neutral4 shadow-sm">
      <div class="w-full px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex min-w-0 flex-1 items-center justify-start gap-3">
            <!-- Hamburger Menu Toggle -->
            <button
              id="sidebar-toggle"
              type="button"
              class="inline-flex items-center p-2 ml-1 text-sm fill-neutral2 rounded-lg hover:bg-neutral5 focus:outline-none shrink-0"
              aria-label="Toggle sidebar"
              aria-expanded="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0-1 .45-1 1s.45 1 1 1H4c-.55 0-1-.45-1-1s.45-1-1-1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/>
              </svg>
            </button>

            <!-- Breadcrumb Nav -->
            <div class="relative flex items-center text-sm text-neutral1 min-w-0 flex-1 ml-1" aria-label="Breadcrumb">
              ${breadcrumbHTML}
            </div>
          </div>

          <!-- Right Header: Profil User Alumni -->
          <div class="flex items-center gap-3 shrink-0">
            <a href="profil.html" class="flex items-center gap-2.5 p-1 rounded-full hover:bg-neutral5 transition-colors focus:ring-4 focus:ring-primary5">
              <div class="text-right hidden sm:block mr-1">
                <div class="text-sm font-semibold text-neutral1 leading-tight">${esc(ALUMNI_DATA.profile.name)}</div>
                <div class="text-[11px] text-neutral3">Alumni ${esc(ALUMNI_DATA.profile.batch)}</div>
              </div>
              <img
                src="${ALUMNI_DATA.profile.avatarUrl}"
                alt="Foto Profil"
                class="w-9 h-9 rounded-full object-cover border border-primary4/50 shadow-sm"
              >
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex-1 px-6 lg:px-10 py-6" id="main-content-slot"></div>
    <!-- StudentFooter Identik dengan Footer.tsx -->
    <footer class="w-full px-2 lg:px-4 py-4 mt-auto">
      <div class="max-w-7xl mx-auto border-t border-neutral4/80 pt-4 flex justify-between text-neutral3 items-center text-xs lg:text-sm">
        <p>© 2026 Bengkel Koding</p>
        <div class="flex items-center gap-1 md:gap-2">
          <a class="hover:underline text-xs lg:text-sm" href="#">Terms</a>
          <span>•</span>
          <a class="hover:underline text-xs lg:text-sm" href="#">Privacy</a>
        </div>
      </div>
    </footer>`;

  main.before(wrapper);
  const slot = document.getElementById('main-content-slot');
  if (slot) slot.appendChild(main);

  // Toggle sidebar desktop collapse & mobile drawer (100% Mengikuti Aside.tsx lms-bengkod-web)
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');

  const checkIsDesktop = () => window.innerWidth >= 1024;
  let sidebarOpen = checkIsDesktop();

  function applySidebarState() {
    const desktop = checkIsDesktop();
    if (sidebarOpen) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('translate-x-0');
      if (desktop) {
        wrapper.classList.remove('lg:pl-0');
        wrapper.classList.add('lg:pl-64');
        overlay.classList.add('hidden');
      } else {
        wrapper.classList.remove('lg:pl-64');
        wrapper.classList.add('lg:pl-0');
        overlay.classList.remove('hidden');
      }
    } else {
      sidebar.classList.remove('translate-x-0');
      sidebar.classList.add('-translate-x-full');
      wrapper.classList.remove('lg:pl-64');
      wrapper.classList.add('lg:pl-0');
      overlay.classList.add('hidden');
    }
    toggleBtn.setAttribute('aria-expanded', sidebarOpen ? 'true' : 'false');
  }

  applySidebarState();

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sidebarOpen = !sidebarOpen;
    applySidebarState();
  });

  overlay.addEventListener('click', () => {
    sidebarOpen = false;
    applySidebarState();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !checkIsDesktop() && sidebarOpen) {
      sidebarOpen = false;
      applySidebarState();
    }
  });

  if (window.lucide) window.lucide.createIcons();
});
