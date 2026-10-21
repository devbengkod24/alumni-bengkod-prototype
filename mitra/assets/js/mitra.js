/**
 * Shared JS role Mitra: config Tailwind, layout sidebar/topbar, data dummy, helper.
 * Dimuat di <head> setelah Tailwind CDN dan sebelum ../../assets/js/main.js
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

document.head.insertAdjacentHTML('beforeend', `<style type="text/tailwindcss">
@layer components {
  .card { @apply bg-white rounded-xl border border-neutral4 p-6; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .th { @apply bg-neutral5 text-neutral2 text-xs font-semibold uppercase tracking-wider py-3.5 px-4 text-left border-b border-neutral4 whitespace-nowrap; }
  .tr { @apply border-b border-neutral4 hover:bg-blue-50/40 text-sm text-neutral1 transition-colors; }
  .td { @apply py-3.5 px-4 align-top; }
  .btn { @apply inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-40 disabled:cursor-not-allowed; }
  .btn-primary { @apply btn text-white bg-primary1 hover:bg-primary2 focus:ring-primary5; }
  .btn-secondary { @apply btn text-white bg-secondary1 hover:bg-secondary2 focus:ring-secondary3; }
  .btn-outline { @apply btn text-neutral1 bg-white hover:bg-neutral5 border border-neutral4 focus:ring-neutral5; }
  .btn-danger { @apply btn text-white bg-red2 hover:bg-red1 focus:ring-red3; }
  .btn-success { @apply btn text-white bg-green2 hover:bg-green1 focus:ring-green3; }
  .btn-icon { @apply p-2 rounded-lg text-neutral2 hover:bg-primary5 hover:text-primary1 focus:outline-none focus:ring-2 focus:ring-primary3; }
  .label { @apply block text-sm font-medium text-neutral2 mb-1.5; }
  .input { @apply block w-full px-3.5 py-2.5 border border-neutral4 rounded-md text-neutral1 bg-white placeholder-neutral3 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 text-sm transition-all duration-150; }
  .error-msg { @apply text-xs text-red2 mt-1; }
}
</style>`);

// ===================== STORAGE HELPERS =====================
function lsGet(key, def = null) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; } catch { return def; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ===================== DATA DUMMY =====================
const MITRA_DEFAULT = {
  profil: {
    nama_perusahaan: 'PT Solusi Digital Jateng', email: 'hr@solusidigital.id', telepon: '024-7612345',
    website: 'https://solusidigital.id', bidang_usaha: 'Software House', lokasi: 'Semarang, Jawa Tengah',
    alamat: 'Jl. Pemuda No. 120, Semarang', kota: 'Semarang', provinsi: 'Jawa Tengah', negara: 'Indonesia',
    kode_pos: '50132', deskripsi: 'PT Solusi Digital Jateng adalah perusahaan software house yang bergerak di bidang pengembangan aplikasi web dan mobile. Kami telah melayani lebih dari 100 klien sejak 2015 dengan tim yang berpengalaman.',
    pic_nama: 'Andi Kurniawan', pic_jabatan: 'HR Manager', pic_email: 'andi.k@solusidigital.id', pic_telepon: '0812-3456-7890', logo: '',
  },
  lowongan: [
    { id: 1, posisi: 'Backend Developer (Laravel)', tipe_kerja: 'Full Time', kategori: 'Kerja', pengalaman: '1-2 Tahun', gaji_min: 4000000, gaji_max: 6000000, tampilkan_gaji: true, lokasi: 'Semarang', tags: ['Laravel', 'PHP', 'MySQL'], deskripsi: 'Kami mencari Backend Developer yang berpengalaman dengan Laravel.\n\nKualifikasi:\n- Minimal 1 tahun pengalaman Laravel\n- Memahami RESTful API\n- Familiar dengan Git dan CI/CD', masa_berlaku: '2026-11-30', status: 'Aktif', dibuat: '2026-10-15', diajukan: '2026-10-15', alasan_penolakan: '' },
    { id: 2, posisi: 'Frontend Developer (React)', tipe_kerja: 'Full Time', kategori: 'Kerja', pengalaman: 'Fresh Graduate', gaji_min: 3500000, gaji_max: 5000000, tampilkan_gaji: true, lokasi: 'Semarang', tags: ['React', 'TypeScript', 'Tailwind'], deskripsi: 'Kami membutuhkan Frontend Developer yang paham React.\n\nKualifikasi:\n- Memahami React dan state management\n- HTML/CSS/JavaScript yang solid', masa_berlaku: '2026-12-15', status: 'Menunggu Persetujuan', dibuat: '2026-10-18', diajukan: '2026-10-18', alasan_penolakan: '' },
    { id: 3, posisi: 'UI/UX Designer', tipe_kerja: 'Part Time', kategori: 'Kerja', pengalaman: 'Fresh Graduate', gaji_min: 0, gaji_max: 0, tampilkan_gaji: false, lokasi: 'Remote', tags: ['Figma', 'UI Design', 'Prototyping'], deskripsi: 'Mencari UI/UX Designer part-time untuk mendukung tim desain kami.\n\nKualifikasi:\n- Menguasai Figma\n- Memahami prinsip UX dan User Research', masa_berlaku: '2026-11-15', status: 'Draft', dibuat: '2026-10-20', diajukan: '', alasan_penolakan: '' },
    { id: 4, posisi: 'Data Analyst Intern', tipe_kerja: 'Magang', kategori: 'Magang', pengalaman: 'Mahasiswa', gaji_min: 1000000, gaji_max: 1500000, tampilkan_gaji: true, lokasi: 'Semarang', tags: ['Python', 'Data Analysis', 'SQL'], deskripsi: 'Program magang 3 bulan untuk mahasiswa/i.\n\nPersyaratan:\n- Mahasiswa semester 5 ke atas\n- Mengenal Python dasar', masa_berlaku: '2026-10-31', status: 'Kedaluwarsa', dibuat: '2026-09-01', diajukan: '2026-09-01', alasan_penolakan: '' },
    { id: 5, posisi: 'Mobile Developer (Flutter)', tipe_kerja: 'Full Time', kategori: 'Kerja', pengalaman: '2-3 Tahun', gaji_min: 5000000, gaji_max: 8000000, tampilkan_gaji: false, lokasi: 'Semarang', tags: ['Flutter', 'Dart', 'Firebase'], deskripsi: 'Dibutuhkan Mobile Developer Flutter berpengalaman.\n\nKualifikasi:\n- Minimal 2 tahun pengalaman Flutter\n- Pengalaman publish ke App Store dan Play Store', masa_berlaku: '2026-10-25', status: 'Ditolak', dibuat: '2026-09-15', diajukan: '2026-09-15', alasan_penolakan: 'Deskripsi pekerjaan dan persyaratan kurang jelas. Mohon lengkapi informasi gaji dan benefit.' },
  ],
  alumni: [
    {
      id: 1,
      nama: 'Rizky Pratama',
      nim: 'A11.2019.11823',
      gender: 'Laki-laki',
      jenis_pekerjaan: 'Full Time',
      status_karir: 'Bekerja Full Time',
      angkatan: 2019,
      tahun_lulus: 2023,
      ipk: 3.72,
      email: 'rizky.pratama@gmail.com',
      telepon: '0812-1111-2222',
      kota_domisili: 'Semarang',
      skill: ['Laravel', 'Vue.js', 'MySQL', 'Git', 'RESTful API'],
      bio: 'Software Engineer dengan spesialisasi Backend Laravel dan Vue.js. Berpengalaman mengembangkan sistem informasi terintegrasi dan arsitektur database relasional.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2019 - 2023)',
      pengalaman: 'Backend Developer di PT Tech Nusantara (2023 - Sekarang) · Asisten Lab Bengkel Koding (2021 - 2023)',
      proyek: 'Sistem Tracer Study Alumni, Portal Monitoring Skripsi, E-Commerce B2B',
      izin_bagikan: true,
      cv_url: '#',
      linkedin: 'https://linkedin.com/in/rizkypratama'
    },
    {
      id: 2,
      nama: 'Nadia Putri',
      nim: 'A11.2019.11902',
      gender: 'Perempuan',
      jenis_pekerjaan: 'Full Time',
      status_karir: 'Bekerja Full Time',
      angkatan: 2019,
      tahun_lulus: 2023,
      ipk: 3.85,
      email: 'nadia.putri@gmail.com',
      telepon: '0813-2222-3333',
      kota_domisili: 'Jakarta',
      skill: ['Python', 'Data Analysis', 'SQL', 'Tableau', 'Power BI'],
      bio: 'Data Analyst yang berfokus pada insight bisnis melalui data mining, dashboarding visual, dan automated reporting.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2019 - 2023)',
      pengalaman: 'Junior Data Analyst di FinTech Maju Bersama (2023 - Sekarang) · Asisten Praktikum Basis Data (2021 - 2022)',
      proyek: 'Dashboard Prediksi Churn Pelanggan, Automasi ETL Pipeline Penjualan',
      izin_bagikan: true,
      cv_url: '#',
      linkedin: 'https://linkedin.com/in/nadiaputri'
    },
    {
      id: 3,
      nama: 'Fajar Nugroho',
      nim: 'A11.2020.12011',
      gender: 'Laki-laki',
      jenis_pekerjaan: 'Part Time',
      status_karir: 'Bekerja Part Time',
      angkatan: 2020,
      tahun_lulus: 2024,
      ipk: 3.54,
      email: 'fajar.n@gmail.com',
      telepon: '0814-3333-4444',
      kota_domisili: 'Semarang',
      skill: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind'],
      bio: 'Fullstack Web Developer yang antusias dengan arsitektur microservices modern dan UX interaktif responsif.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2020 - 2024)',
      pengalaman: 'Web Developer Freelance (2024 - Sekarang) · Koordinator Lab Pemrograman Web Bengkel Koding (2022 - 2024)',
      proyek: 'Platform LMS Kelas Online, Sistem Kasir POS Cloud UMKM',
      izin_bagikan: true,
      cv_url: '#',
      linkedin: ''
    },
    {
      id: 4,
      nama: 'Ananda Wulan',
      nim: 'A11.2021.13301',
      gender: 'Perempuan',
      jenis_pekerjaan: 'Full Time',
      status_karir: 'Bekerja Full Time',
      angkatan: 2021,
      tahun_lulus: 2025,
      ipk: 3.91,
      email: 'ananda.w@gmail.com',
      telepon: '0815-4444-5555',
      kota_domisili: 'Jakarta',
      skill: ['React', 'TypeScript', 'Next.js', 'Figma', 'Tailwind'],
      bio: 'Frontend Engineer berdedikasi tinggi dengan keahlian kuat dalam desain interface modern, performa web, dan aksesibilitas standar WCAG.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2021 - 2025)',
      pengalaman: 'Frontend Specialist di Digital Agency ID (2025 - Sekarang) · UI Designer & Mentor Asisten (2023 - 2025)',
      proyek: 'Design System Komponen UI UDINUS, Portal Lowongan Karir Kampus',
      izin_bagikan: true,
      cv_url: '#',
      linkedin: 'https://linkedin.com/in/anandawulan'
    },
    {
      id: 5,
      nama: 'Intan Maharani',
      nim: 'A11.2018.10544',
      gender: 'Perempuan',
      jenis_pekerjaan: 'Part Time',
      status_karir: 'Bekerja Part Time',
      angkatan: 2018,
      tahun_lulus: 2022,
      ipk: 3.65,
      email: 'intan.m@gmail.com',
      telepon: '0816-5555-6666',
      kota_domisili: 'Bandung',
      skill: ['Java', 'Spring Boot', 'Android', 'Firebase', 'PostgreSQL'],
      bio: 'Mobile & Backend Developer dengan fokus pada pembuatan aplikasi native Android performa tinggi serta backend enterprise microservices.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2018 - 2022)',
      pengalaman: 'Part-time Mobile Developer di Kreasi Mandiri (2022 - Sekarang) · Asisten Mobile Bengkel Koding (2020 - 2022)',
      proyek: 'Aplikasi Reservasi Klinik Kesehatan Mobile, Backend API Payment Gateway',
      izin_bagikan: true,
      cv_url: '#',
      linkedin: ''
    },
    {
      id: 6,
      nama: 'Bagas Saputra',
      nim: 'A11.2021.13120',
      gender: 'Laki-laki',
      jenis_pekerjaan: 'Full Time',
      status_karir: 'Bekerja Full Time',
      angkatan: 2021,
      tahun_lulus: 2025,
      ipk: 3.43,
      email: 'bagas.s@gmail.com',
      telepon: '0817-6666-7777',
      kota_domisili: 'Semarang',
      skill: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'FastAPI'],
      bio: 'AI & Data Specialist lulusan Bengkel Koding dengan fokus pada klasifikasi teks NLP, computer vision, dan deployment model machine learning.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2021 - 2025)',
      pengalaman: 'Junior AI Engineer di PT Inovasi Cerdas (2025 - Sekarang) · Asisten Riset AI Laboratorium (2023 - 2025)',
      proyek: 'Deteksi Kualitas Produk dengan Computer Vision, Chatbot Layanan Akademik',
      izin_bagikan: true,
      cv_url: '#',
      linkedin: 'https://linkedin.com/in/bagassaputra'
    },
  ],
  pengumuman: [
    { id: 1, judul: 'Pengisian Tracer Study Angkatan 2025', isi: 'Seluruh alumni lulusan 2025 wajib mengisi tracer study sebelum 30 November 2026. Mitra dimohon untuk membantu menginformasikan kepada alumni yang bekerja di perusahaan Anda.', target: 'Alumni & Mitra', published_at: '2026-10-18', oleh: 'Koordinator Alumni' },
    { id: 2, judul: 'Survei Kepuasan Pengguna Lulusan', isi: 'Mitra dimohon mengisi survei kepuasan terhadap alumni Bengkel Koding yang bekerja di perusahaan Anda. Link survei akan dikirimkan melalui email terdaftar paling lambat 25 Oktober 2026.', target: 'Mitra', published_at: '2026-10-10', oleh: 'Koordinator Alumni' },
    { id: 3, judul: 'Job Fair Bengkel Koding 2026', isi: 'Bengkel Koding UDINUS akan menyelenggarakan Job Fair pada Desember 2026. Mitra yang ingin berpartisipasi dapat menghubungi koordinator melalui portal atau email resmi.', target: 'Alumni & Mitra', published_at: '2026-10-05', oleh: 'Koordinator Alumni' },
    { id: 4, judul: 'Pembaruan Kebijakan Posting Lowongan', isi: 'Mulai 1 November 2026, setiap lowongan yang diajukan mitra wajib mencantumkan rentang gaji. Lowongan tanpa informasi gaji tidak akan diverifikasi oleh koordinator.', target: 'Mitra', published_at: '2026-09-28', oleh: 'Koordinator Alumni' },
  ],
  forum: [
    { id: 1, judul: 'Tips Menulis JD yang Menarik untuk Fresh Graduate', penulis: 'Andi Kurniawan', peran: 'Mitra', waktu: '2026-10-19T09:30:00', komentar: 8, tags: ['Rekrutmen', 'Tips'], isi: 'Halo rekan mitra, saya ingin berbagi pengalaman dalam menulis job description yang menarik bagi fresh graduate.' },
    { id: 2, judul: 'Sharing: Pengalaman Onboarding Alumni Bengkel Koding', penulis: 'Maya Sari', peran: 'Mitra', waktu: '2026-10-16T14:00:00', komentar: 15, tags: ['Onboarding', 'Pengalaman'], isi: 'Tahun ini kami menerima 3 alumni Bengkel Koding dan pengalaman onboarding mereka sangat positif.' },
    { id: 3, judul: 'Tips lolos interview backend di startup', penulis: 'Rizky Pratama', peran: 'Alumni', waktu: '2026-10-19T10:00:00', komentar: 24, tags: ['Karir', 'Interview'], isi: 'Berikut tips yang berhasil saya gunakan ketika interview di beberapa startup tech.' },
    { id: 4, judul: 'Sharing gaji fresh graduate Semarang 2026', penulis: 'Intan Maharani', peran: 'Alumni', waktu: '2026-10-16T11:00:00', komentar: 41, tags: ['Gaji', 'Karir'], isi: 'Berdasarkan survei informal di grup alumni, berikut range gaji fresh graduate di Semarang.' },
    { id: 5, judul: 'Rekomendasi kursus Data Science gratis', penulis: 'Salsa Ramadhani', peran: 'Alumni', waktu: '2026-10-12T08:00:00', komentar: 12, tags: ['Belajar', 'Data Science'], isi: 'Kumpulan kursus Data Science gratis yang saya coba dan rekomendasikan.' },
  ],
};

const MITRA = {
  profil: lsGet('mitra-profil', MITRA_DEFAULT.profil),
  lowongan: lsGet('mitra-lowongan', MITRA_DEFAULT.lowongan),
  alumni: MITRA_DEFAULT.alumni,
  pengumuman: MITRA_DEFAULT.pengumuman,
  forum: lsGet('mitra-forum', MITRA_DEFAULT.forum),
};

function saveProfil() { lsSet('mitra-profil', MITRA.profil); }
function saveLowongan() { lsSet('mitra-lowongan', MITRA.lowongan); }
function saveForum() { lsSet('mitra-forum', MITRA.forum); }

// ===================== HELPERS =====================
const BADGE_MAP = {
  'Aktif': 'bg-green3 text-green1 border-green2/30',
  'Menunggu Persetujuan': 'bg-yellow3 text-yellow1 border-yellow2/30',
  'Draft': 'bg-neutral5 text-neutral2 border-neutral4',
  'Ditolak': 'bg-red3 text-red1 border-red2/30',
  'Kedaluwarsa': 'bg-red3 text-red1 border-red2/30',
};
const BADGE_ICON = { 'Aktif': '●', 'Menunggu Persetujuan': '◐', 'Draft': '○', 'Ditolak': '✕', 'Kedaluwarsa': '⌛' };

function badge(status) {
  const cls = BADGE_MAP[status] || 'bg-primary5 text-primary1 border-primary4/50';
  const icon = BADGE_ICON[status] || '●';
  return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cls}"><span>${icon}</span>${status}</span>`;
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtDate(iso) {
  return iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
}

function fmtDateTime(iso) {
  return iso ? new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
}

function fmtCurrency(num) {
  if (!num) return 'Tidak Ditampilkan';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

// CV Audit log
const CV_AUDIT_KEY = 'mitra-cv-audit';
function getCvAudit() { return lsGet(CV_AUDIT_KEY, []); }
function logCvAccess(alumniId, alumniNama) {
  const log = [{ alumniId, alumniNama, akses_oleh: MITRA.profil.nama_perusahaan, waktu: new Date().toISOString() }, ...getCvAudit()].slice(0, 100);
  lsSet(CV_AUDIT_KEY, log);
}

// Confirm dialog
let pendingConfirm = null;
function confirmAction({ title, message, okLabel = 'Ya, Lanjutkan', danger = false }, onOk) {
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  const ok = document.getElementById('confirm-ok');
  ok.textContent = okLabel;
  ok.className = `px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-4 ${danger ? 'bg-red2 hover:bg-red1 focus:ring-red3' : 'bg-primary1 hover:bg-primary2 focus:ring-primary5'}`;
  pendingConfirm = onOk;
  openModal('confirm-modal');
}

function nextLowonganId() { return MITRA.lowongan.reduce((m, l) => Math.max(m, l.id), 0) + 1; }
function nextForumId() { return MITRA.forum.reduce((m, f) => Math.max(m, f.id), 0) + 1; }

// ===================== DYNAMIC PATH DETECTION =====================
// Detect depth: mitra/*.html = depth 1, mitra/lowongan/*.html = depth 2
const _pathParts = location.pathname.split('/').filter(Boolean);
const _mitraIdx = _pathParts.findIndex(p => p === 'mitra');
const _depth = _mitraIdx >= 0 ? _pathParts.length - _mitraIdx - 1 : 1;
const _base = _depth >= 2 ? '../' : './';
const _lowBase = _depth >= 2 ? '' : 'lowongan/';
const _rootBase = _depth >= 2 ? '../../' : '../';

const MITRA_NAV = [
  { href: _base + 'index.html', icon: 'layout-dashboard', label: 'Dashboard', match: 'index.html' },
  { href: _base + 'data-alumni.html', icon: 'users', label: 'Data Alumni', match: 'data-alumni.html' },
  { href: _base + 'profil-perusahaan.html', icon: 'building-2', label: 'Profil Perusahaan', match: 'profil-perusahaan.html' },
  { href: _base + 'pengumuman.html', icon: 'megaphone', label: 'Pengumuman', match: 'pengumuman.html' },
  { href: _base + 'forum.html', icon: 'messages-square', label: 'Forum', match: 'forum.html' },
  {
    label: 'Lowongan', icon: 'briefcase', submenu: [
      { href: _lowBase + 'kelola.html', icon: 'file-pen', label: 'Kelola Lowongan', match: 'kelola.html' },
      { href: _lowBase + 'semua.html', icon: 'list', label: 'Semua Lowongan', match: 'semua.html' },
    ]
  },
];

// ===================== LAYOUT (Sidebar + Topbar) =====================
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main[data-title]');
  if (!main) return;
  const current = location.pathname.split('/').pop() || 'index.html';

  const navItems = MITRA_NAV.map(n => {
    if (n.submenu) {
      const subActive = n.submenu.some(s => s.match === current);
      const subItems = n.submenu.map(s => {
        const active = s.match === current;
        return `<a href="${s.href}" ${active ? 'aria-current="page"' : ''}
          class="flex items-center gap-2.5 w-full pl-9 pr-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral2 hover:bg-primary5 hover:text-primary1'}">
          <i data-lucide="${s.icon}" class="w-4 h-4 shrink-0"></i><span>${s.label}</span></a>`;
      }).join('');
      return `<div class="space-y-0.5">
        <button data-submenu-toggle class="flex items-center justify-between gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${subActive ? 'text-primary1 bg-primary5' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
          <span class="flex items-center gap-3"><i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i><span>${n.label}</span></span>
          <i data-lucide="chevron-down" class="w-4 h-4 shrink-0 transition-transform ${subActive ? 'rotate-180' : ''}"></i>
        </button>
        <div class="space-y-0.5 ${subActive ? '' : 'hidden'}" data-submenu>${subItems}</div>
      </div>`;
    }
    const active = n.match === current;
    return `<a href="${n.href}" ${active ? 'aria-current="page"' : ''}
      class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
      <i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i><span>${n.label}</span></a>`;
  }).join('');

  const initials = MITRA.profil.nama_perusahaan.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="sidebar-overlay" class="fixed inset-0 bg-neutral1/40 backdrop-blur-sm z-40 hidden"></div>
    <aside id="sidebar" class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 z-50 flex flex-col -translate-x-full transition-transform duration-300 ease-in-out" aria-label="Menu Mitra">
      <a href="${_base}index.html" class="flex items-center justify-center py-5 px-4 border-b border-neutral4 focus:outline-none focus:ring-2 focus:ring-primary1">
        <img src="${_rootBase}assets/images/bengkelkoding-text.webp" alt="Bengkel Koding Logo" class="h-9 w-auto object-contain">
      </a>
      <nav class="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">${navItems}</nav>
      <div class="p-3 border-t border-neutral4">
        <a href="http://127.0.0.1:5500/" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors">
          <i data-lucide="log-out" class="w-5 h-5"></i><span>Keluar</span></a>
      </div>
    </aside>`);

  // Breadcrumbs Generator (100% Identik dengan Nav.tsx lms-bengkod-web)
  const isDashboard = current === 'index.html' || main.dataset.title === 'Dashboard';
  const pageTitle = esc(main.dataset.title);

  const breadcrumbHTML = isDashboard
    ? `<a href="${_base}index.html" class="text-neutral1 hover:text-primary1 transition-colors font-medium">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1">Mitra</span>`
    : `<a href="${_base}index.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <a href="${_base}index.html" class="text-neutral2 hover:text-primary1 transition-colors">Mitra</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1 truncate">${pageTitle}</span>`;

  const wrapper = document.createElement('div');
  wrapper.id = 'main-wrapper';
  wrapper.className = 'lg:ml-64 min-h-screen flex flex-col transition-all duration-300';
  wrapper.innerHTML = `
    <!-- Topbar Header Identik dengan lms-bengkod-web Nav.tsx -->
    <header class="sticky top-0 z-30 bg-white border-b border-neutral4 h-16 px-3 lg:px-6 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <!-- Hamburger Menu Toggle (Selalu tampil di desktop & mobile) -->
        <button
          id="sidebar-toggle"
          type="button"
          class="inline-flex items-center justify-center p-2 text-neutral2 hover:bg-neutral5 hover:text-neutral1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary5 transition-colors shrink-0"
          aria-label="Toggle sidebar"
          aria-expanded="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="currentColor">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0-1 .45-1 1s.45 1 1 1H4c-.55 0-1-.45-1-1s.45-1-1-1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/>
          </svg>
        </button>

        <!-- Breadcrumb Nav -->
        <nav class="flex items-center text-sm text-neutral1 min-w-0 flex-1 ml-1" aria-label="Breadcrumb">
          ${breadcrumbHTML}
        </nav>
      </div>

      <!-- Right Header: Profil User -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- Profil Avatar & Identitas -->
        <div class="flex items-center gap-2.5">
          <div class="text-right hidden sm:block">
            <div class="text-sm font-semibold text-neutral1 leading-tight">${esc(MITRA.profil.nama_perusahaan)}</div>
            <div class="text-[11px] text-neutral3">Mitra Perusahaan</div>
          </div>
          <div class="w-9 h-9 rounded-full bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50">
            ${initials}
          </div>
        </div>
      </div>
    </header>`;

  main.classList.add('flex-1', 'p-4', 'sm:p-6', 'space-y-6');
  main.before(wrapper);
  wrapper.appendChild(main);

  // Confirm modal
  document.body.insertAdjacentHTML('beforeend', `
    <div id="confirm-modal" data-modal-backdrop class="fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 elevation5" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <h3 id="confirm-title" class="font-semibold text-base text-neutral1"></h3>
        <p id="confirm-message" class="!text-sm text-neutral2 mt-2"></p>
        <div class="mt-6 flex justify-end gap-2">
          <button onclick="closeModal('confirm-modal')" class="px-4 py-2 border border-neutral4 text-neutral1 text-sm font-medium rounded-lg hover:bg-neutral5">Batal</button>
          <button id="confirm-ok"></button>
        </div>
      </div>
    </div>`);
  document.getElementById('confirm-ok').addEventListener('click', () => {
    closeModal('confirm-modal');
    if (pendingConfirm) pendingConfirm();
    pendingConfirm = null;
  });

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
        wrapper.classList.remove('lg:ml-0');
        wrapper.classList.add('lg:ml-64');
        overlay.classList.add('hidden');
      } else {
        wrapper.classList.remove('lg:ml-64');
        wrapper.classList.add('lg:ml-0');
        overlay.classList.remove('hidden');
      }
    } else {
      sidebar.classList.remove('translate-x-0');
      sidebar.classList.add('-translate-x-full');
      wrapper.classList.remove('lg:ml-64');
      wrapper.classList.add('lg:ml-0');
      overlay.classList.add('hidden');
    }
    toggleBtn.setAttribute('aria-expanded', sidebarOpen ? 'true' : 'false');
  }

  // Terapkan state awal saat DOM siap
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

  // Submenu toggle untuk menu bertingkat (Lowongan -> Kelola / Semua)
  document.querySelectorAll('[data-submenu-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      const chevron = btn.querySelector('[data-lucide="chevron-down"]');
      const hidden = submenu.classList.toggle('hidden');
      if (chevron) chevron.classList.toggle('rotate-180', !hidden);
    });
  });

  if (window.lucide) window.lucide.createIcons();
});
