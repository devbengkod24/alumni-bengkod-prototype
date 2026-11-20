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
  .modal-backdrop { @apply fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden items-center justify-center p-4; }
  .modal { @apply bg-white rounded-2xl w-full p-6 max-h-[90vh] overflow-y-auto; box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1); }
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
      status_pekerjaan: 'Sudah Bekerja',
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
      status_pekerjaan: 'Sudah Bekerja',
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
      status_pekerjaan: 'Mencari Pekerjaan',
      jenis_pekerjaan: 'Part Time',
      status_karir: 'Mencari Pekerjaan',
      angkatan: 2020,
      tahun_lulus: 2024,
      ipk: 3.54,
      email: 'fajar.n@gmail.com',
      telepon: '0814-3333-4444',
      kota_domisili: 'Semarang',
      skill: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind'],
      bio: 'Fullstack Web Developer yang antusias dengan arsitektur microservices modern dan UX interaktif responsif. Terbuka untuk peluang kerja baru.',
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
      status_pekerjaan: 'Sudah Bekerja',
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
      status_pekerjaan: 'Sudah Bekerja',
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
      status_pekerjaan: 'Mencari Pekerjaan',
      jenis_pekerjaan: 'Full Time',
      status_karir: 'Mencari Pekerjaan',
      angkatan: 2021,
      tahun_lulus: 2025,
      ipk: 3.43,
      email: 'bagas.s@gmail.com',
      telepon: '0817-6666-7777',
      kota_domisili: 'Semarang',
      skill: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'FastAPI'],
      bio: 'AI & Data Specialist lulusan Bengkel Koding dengan fokus pada klasifikasi teks NLP, computer vision, dan deployment model machine learning. Aktif mencari peluang karir di bidang Data & AI.',
      pendidikan: 'S1 Teknik Informatika - Universitas Dian Nuswantoro (2021 - 2025)',
      pengalaman: 'Asisten Riset AI Laboratorium Bengkel Koding UDINUS (2023 - 2025)',
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
  pelamar: [
    { id: 1, nim: 'A11.2019.11823', lowongan_id: 1, lowongan_posisi: 'Backend Developer (Laravel)', telepon: '0812-1111-2222',
      riwayat: [
        { status: 'applied', waktu: '2026-10-16T09:30:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-18T10:15:00', catatan: 'Portofolio backend dan pemahaman REST API dinilai sangat baik.' },
        { status: 'interview', waktu: '2026-10-21T14:00:00', catatan: 'Interview teknis dan live coding via Google Meet 28 Okt 2026 14:00 WIB.' },
      ] },
    { id: 2, nim: 'A11.2020.12011', lowongan_id: 1, lowongan_posisi: 'Backend Developer (Laravel)', telepon: '0814-3333-4444',
      riwayat: [
        { status: 'applied', waktu: '2026-10-17T11:20:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-19T09:00:00', catatan: 'Berkas lengkap, sedang dalam tahap penilaian tim engineering.' },
      ] },
    { id: 3, nim: 'A11.2018.10544', lowongan_id: 1, lowongan_posisi: 'Backend Developer (Laravel)', telepon: '0816-5555-6666',
      riwayat: [
        { status: 'applied', waktu: '2026-10-15T14:10:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-16T11:00:00', catatan: 'Lolos review berkas dan pengalaman.' },
        { status: 'interview', waktu: '2026-10-19T13:30:00', catatan: 'Interview HR dan user berjalan lancar.' },
        { status: 'diterima', waktu: '2026-10-24T16:00:00', catatan: 'Kandidat diterima untuk posisi Backend Developer. Offering letter telah dikirim.' },
      ] },
    { id: 4, nim: 'A11.2021.13301', lowongan_id: 2, lowongan_posisi: 'Frontend Developer (React)', telepon: '0815-4444-5555',
      riwayat: [
        { status: 'applied', waktu: '2026-10-19T08:45:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-20T10:00:00', catatan: 'Portofolio Next.js dan Tailwind sangat impresif.' },
        { status: 'interview', waktu: '2026-10-23T11:00:00', catatan: 'Jadwal interview frontend 29 Okt 2026 pukul 10:00 WIB.' },
      ] },
    { id: 5, nim: 'A11.2019.11902', lowongan_id: 2, lowongan_posisi: 'Frontend Developer (React)', telepon: '0813-2222-3333',
      riwayat: [
        { status: 'applied', waktu: '2026-10-22T15:20:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
      ] },
    { id: 6, nim: 'A11.2021.13120', lowongan_id: 4, lowongan_posisi: 'Data Analyst Intern', telepon: '0817-6666-7777',
      riwayat: [
        { status: 'applied', waktu: '2026-10-18T16:30:00', catatan: 'Lamaran magang dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-20T09:30:00', catatan: 'Kemampuan Python dan SQL sesuai dengan kebutuhan proyek AI.' },
      ] },
    { id: 7, nim: 'A11.2019.11902', lowongan_id: 3, lowongan_posisi: 'UI/UX Designer', telepon: '0813-2222-3333',
      riwayat: [
        { status: 'applied', waktu: '2026-10-20T13:15:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-21T10:45:00', catatan: 'Studi kasus Figma dan wireframing sedang dievaluasi tim desain.' },
      ] },
    { id: 8, nim: 'A11.2018.10544', lowongan_id: 5, lowongan_posisi: 'Mobile Developer (Flutter)', telepon: '0816-5555-6666',
      riwayat: [
        { status: 'applied', waktu: '2026-10-17T10:00:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-18T14:20:00', catatan: 'Kualifikasi pengalaman fokus di native Android, sedangkan lowongan membutuhkan keahlian Flutter production.' },
        { status: 'ditolak', waktu: '2026-10-20T15:00:00', catatan: 'Belum memenuhi kualifikasi pengalaman Flutter minimal 2 tahun.' },
      ] },
  ],
};

function getMitraLowongan() {
  if (window.BengkodStore) {
    const all = window.BengkodStore.getLowongan();
    return all.filter(l => l.nama_perusahaan === 'PT Solusi Digital Jateng' || l.oleh === 'mitra');
  }
  return lsGet('mitra-lowongan', MITRA_DEFAULT.lowongan);
}

const MITRA = {
  profil: lsGet('mitra-profil', MITRA_DEFAULT.profil),
  get lowongan() {
    return getMitraLowongan();
  },
  set lowongan(val) {
    lsSet('mitra-lowongan', val);
    if (window.BengkodStore) {
      const all = window.BengkodStore.getLowongan();
      val.forEach(myL => {
        const idx = all.findIndex(x => x.id === myL.id);
        if (idx >= 0) all[idx] = Object.assign(all[idx], myL);
        else all.unshift(myL);
      });
      window.BengkodStore.saveLowongan(all);
    }
  },
  get alumni() {
    return window.BengkodStore ? window.BengkodStore.getAlumni() : MITRA_DEFAULT.alumni;
  },
  get pengumuman() {
    return window.BengkodStore ? window.BengkodStore.getPengumuman('Mitra') : MITRA_DEFAULT.pengumuman;
  },
  get pelamar() {
    return getPelamar();
  },
  set pelamar(val) {
    savePelamar(val);
  },
};

function saveProfil() { lsSet('mitra-profil', MITRA.profil); }
function saveLowongan() {
  if (window.BengkodStore) {
    const all = window.BengkodStore.getLowongan();
    const myItems = getMitraLowongan();
    myItems.forEach(myL => {
      const idx = all.findIndex(x => x.id === myL.id);
      if (idx >= 0) all[idx] = Object.assign(all[idx], myL);
      else all.unshift(myL);
    });
    window.BengkodStore.saveLowongan(all);
  }
  lsSet('mitra-lowongan', getMitraLowongan());
}

// ===================== STANDAR BADGE RESMI (TANPA IKON) =====================
const BADGE_THEMES = {
  green: 'bg-green3 text-green1 border-green2/30',
  yellow: 'bg-yellow3 text-yellow1 border-yellow2/30',
  red: 'bg-red3 text-red1 border-red2/30',
  blue: 'bg-primary5 text-primary1 border-primary4/50',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gray: 'bg-neutral5 text-neutral2 border-neutral4',
};

const BADGE_COLOR_MAP = {
  'Aktif': 'green', 'Terverifikasi': 'green', 'Terbit': 'green', 'approved': 'green', 'Sukses': 'green',
  'Sudah Bekerja': 'green', 'Bekerja Penuh Waktu': 'green', 'Bekerja Full Time': 'green', 'Wirausaha': 'green',
  'Penuh Waktu': 'green', 'Full Time': 'green', 'Mitra': 'green', 'Mengunduh CV (PDF)': 'green',
  'Belum Verifikasi': 'yellow', 'Menunggu Persetujuan': 'yellow', 'Menunggu Undangan': 'yellow', 'Menunggu': 'yellow',
  'pending': 'yellow', 'Draft': 'gray', 'Mencari Pekerjaan': 'yellow', 'Belum Memungkinkan Bekerja': 'yellow',
  'Bekerja Paruh Waktu': 'yellow', 'Bekerja Part Time': 'yellow', 'Paruh Waktu': 'yellow', 'Part Time': 'yellow',
  'Belum Bekerja': 'yellow', 'Alumni': 'yellow',
  'Ditolak': 'red', 'Nonaktif': 'red', 'rejected': 'red', 'Gagal': 'red', 'Kedaluwarsa': 'red',
  'Melanjutkan Pendidikan': 'blue', 'Menikah / Mengurus Keluarga': 'blue', 'Magang': 'blue',
  'Jarak Jauh': 'blue', 'Remote': 'blue', 'Koordinator': 'blue', 'Laki-laki': 'blue', 'Perempuan': 'blue',
  'SuperAdmin': 'purple', 'Melihat CV': 'blue',
  'Applied': 'blue', 'Review': 'yellow', 'Interview': 'purple', 'Diterima': 'green',
};

function badge(status) {
  const s = status || '-';
  const theme = BADGE_COLOR_MAP[s] || 'blue';
  const cls = BADGE_THEMES[theme] || BADGE_THEMES.blue;
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cls}">${s}</span>`;
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
const DEFAULT_CV_AUDIT = [
  { id: 'log-1', alumniId: 1, alumniNama: 'Rizky Pratama', nim: 'A11.2019.11823', akses_oleh: 'PT Solusi Digital Jateng', aktivitas: 'Melihat CV', waktu: '2026-10-21T14:32:00' },
  { id: 'log-2', alumniId: 2, alumniNama: 'Nadia Putri', nim: 'A11.2019.11902', akses_oleh: 'PT Solusi Digital Jateng', aktivitas: 'Mengunduh CV (PDF)', waktu: '2026-10-20T10:15:00' },
  { id: 'log-3', alumniId: 6, alumniNama: 'Bagas Saputra', nim: 'A11.2021.13120', akses_oleh: 'PT Solusi Digital Jateng', aktivitas: 'Melihat CV', waktu: '2026-10-19T16:45:00' },
  { id: 'log-4', alumniId: 4, alumniNama: 'Ananda Wulan', nim: 'A11.2021.13301', akses_oleh: 'PT Solusi Digital Jateng', aktivitas: 'Mengunduh CV (PDF)', waktu: '2026-10-18T11:20:00' },
  { id: 'log-5', alumniId: 3, alumniNama: 'Fajar Nugroho', nim: 'A11.2020.12011', akses_oleh: 'PT Solusi Digital Jateng', aktivitas: 'Melihat CV', waktu: '2026-10-17T09:05:00' },
];

function getCvAudit() {
  const stored = lsGet(CV_AUDIT_KEY);
  if (stored !== null) return stored;
  return DEFAULT_CV_AUDIT;
}

function logCvAccess(alumniId, alumniNama, aktivitas = 'Melihat CV', extra = {}) {
  const alumnus = (MITRA.alumni || []).find(x => x.id === alumniId) || {};
  const nim = extra.nim || alumnus.nim || '-';
  const entry = {
    id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    alumniId,
    alumniNama: alumniNama || alumnus.nama || 'Alumni Bengkel Koding',
    nim,
    akses_oleh: (MITRA.profil && MITRA.profil.nama_perusahaan) || 'PT Solusi Digital Jateng',
    aktivitas: aktivitas || 'Melihat CV',
    waktu: new Date().toISOString(),
    ...extra
  };
  const currentLogs = getCvAudit();
  const log = [entry, ...currentLogs].slice(0, 100);
  lsSet(CV_AUDIT_KEY, log);
  return entry;
}

function getAlumniCvAccessInfo(alumniId) {
  const allLogs = getCvAudit();
  const logs = allLogs.filter(l => Number(l.alumniId) === Number(alumniId));
  if (!logs.length) {
    return {
      hasViewed: false,
      lastViewed: null,
      lastActivity: null,
      totalAccess: 0,
      totalViews: 0,
      totalDownloads: 0,
      logs: []
    };
  }
  const sorted = [...logs].sort((a, b) => new Date(b.waktu) - new Date(a.waktu));
  const latest = sorted[0];
  return {
    hasViewed: true,
    lastViewed: latest.waktu,
    lastActivity: latest.aktivitas,
    totalAccess: sorted.length,
    totalViews: sorted.filter(l => l.aktivitas === 'Melihat CV').length,
    totalDownloads: sorted.filter(l => l.aktivitas === 'Mengunduh CV (PDF)').length,
    logs: sorted
  };
}

function clearCvAudit() {
  lsSet(CV_AUDIT_KEY, []);
}

function resetCvAuditDefault() {
  lsSet(CV_AUDIT_KEY, DEFAULT_CV_AUDIT);
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

// ===================== PELAMAR (manajemen-pelamar.html & detail-pelamar.html) =====================
const STATUS_PELAMAR = { applied: 'Applied', review: 'Review', interview: 'Interview', diterima: 'Diterima', ditolak: 'Ditolak' };
const PELAMAR_KEY = 'mitra-pelamar-v1';

function getPelamar() {
  return lsGet(PELAMAR_KEY, MITRA_DEFAULT.pelamar);
}

function savePelamar(list) {
  lsSet(PELAMAR_KEY, list);
}

function lowonganPelamarMitra() {
  return MITRA.lowongan;
}

function gabungPelamar(list) {
  const alumni = MITRA.alumni;
  const lowongan = lowonganPelamarMitra();
  return (list || []).map(p => {
    const l = lowongan.find(x => x.id === p.lowongan_id)
      || lowongan.find(x => p.lowongan_posisi && x.posisi.toLowerCase() === p.lowongan_posisi.toLowerCase())
      || lowongan[0]
      || { id: p.lowongan_id, posisi: p.lowongan_posisi || 'Lowongan Mitra', pengalaman: 'Fresh Graduate', tipe_kerja: 'Full Time', nama_perusahaan: (MITRA.profil && MITRA.profil.nama_perusahaan) || 'PT Solusi Digital Jateng' };
    const a = alumni.find(x => x.nim === p.nim)
      || alumni.find(x => x.id === p.alumniId)
      || { nama: 'Alumni Bengkel Koding', nim: p.nim, tahun_lulus: 2024, divisi: 'Web Development', skill: [], email: 'alumni@bengkod.id' };
    const riwayat = p.riwayat || [];
    const lastRiwayat = riwayat.length ? riwayat[riwayat.length - 1] : { status: 'applied', waktu: new Date().toISOString() };
    const firstRiwayat = riwayat.length ? riwayat[0] : { waktu: new Date().toISOString() };
    return {
      ...p,
      alumni: a,
      lowongan: l,
      status: lastRiwayat.status,
      tanggal: firstRiwayat.waktu,
    };
  }).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

function fmtWaktu(iso) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';
}

function inisial(nama) {
  return (nama || '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function audit(aksi, target) {
  if (window.BengkodStore) {
    window.BengkodStore.logActivity('Mitra', aksi, target);
  }
}

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
  { href: _base + 'kelola-anggota.html', icon: 'user-check', label: 'Alumni Bekerja', match: 'kelola-anggota.html' },
  { href: _base + 'manajemen-pelamar.html', icon: 'file-text', label: 'Manajemen Pelamar', match: 'manajemen-pelamar.html' },
  { href: _base + 'data-alumni.html', icon: 'users', label: 'Data Alumni', match: 'data-alumni.html' },
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
  const navTarget = main.dataset.nav || current;

  const navItems = MITRA_NAV.map(n => {
    if (n.submenu) {
      const subActive = n.submenu.some(s => s.match === navTarget);
      const subItems = n.submenu.map(s => {
        const active = s.match === navTarget;
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
    const active = n.match === navTarget;
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
        <a href="${_rootBase}index.html" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors">
          <i data-lucide="log-out" class="w-5 h-5"></i><span>Keluar</span></a>
      </div>
    </aside>`);

  // Breadcrumbs Generator (100% Identik dengan Nav.tsx lms-bengkod-web)
  const isDashboard = current === 'index.html' || main.dataset.title === 'Dashboard';
  const pageTitle = esc(main.dataset.title);

  let breadcrumbHTML;
  if (isDashboard) {
    breadcrumbHTML = `<a href="${_base}index.html" class="text-neutral1 hover:text-primary1 transition-colors font-medium">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1">Mitra</span>`;
  } else if (main.dataset.nav === 'manajemen-pelamar.html') {
    breadcrumbHTML = `<a href="${_base}index.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <a href="${_base}manajemen-pelamar.html" class="text-neutral2 hover:text-primary1 transition-colors">Manajemen Pelamar</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1 truncate">${pageTitle}</span>`;
  } else {
    breadcrumbHTML = `<a href="${_base}index.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <a href="${_base}index.html" class="text-neutral2 hover:text-primary1 transition-colors">Mitra</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1 truncate">${pageTitle}</span>`;
  }

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

      <!-- Right Header: Profil User Interaktif (Sama persis dengan Alumni) -->
      <div class="flex items-center gap-3 shrink-0">
        <div class="relative flex items-center" id="profile-dropdown-wrapper">
          <button
            type="button"
            id="profile-menu-btn"
            class="flex items-center gap-2.5 text-sm rounded-full focus:ring-4 focus:ring-primary5 p-0.5 transition-all cursor-pointer group"
            aria-expanded="false"
            aria-label="Menu Pengguna"
          >
            <div class="text-right hidden sm:block">
              <div class="text-sm font-semibold text-neutral1 leading-tight group-hover:text-primary1 transition-colors">${esc(MITRA.profil.nama_perusahaan)}</div>
              <div class="text-[11px] text-neutral3">Mitra Perusahaan</div>
            </div>
            <div class="w-9 h-9 rounded-full bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50 shadow-xs">
              ${initials}
            </div>
          </button>

          <!-- Dropdown Popover Profil (100% Identik dengan Alumni) -->
          <div id="dropdown-profile-menu" class="hidden absolute top-12 right-0 z-[70] w-64 origin-top-right rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden">
            <div class="px-4 pt-3.5 pb-3 bg-gradient-to-br from-primary1 via-primary2 to-primary3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                  ${initials}
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-white truncate">${esc(MITRA.profil.nama_perusahaan)}</p>
                  <p class="text-[11px] text-white/80 truncate">${esc(MITRA.profil.email || 'hr@solusidigital.id')}</p>
                </div>
              </div>
            </div>
            <ul class="py-1.5 text-sm text-neutral1">
              <li>
                <a href="${_base}profil-perusahaan.html" class="flex items-center gap-2.5 px-4 py-2 text-xs md:text-sm hover:bg-primary5 transition-colors group">
                  <span class="w-7 h-7 rounded-lg bg-primary5 text-primary2 flex items-center justify-center group-hover:bg-primary2 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 1 .33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </span>
                  <span>Pengaturan Profil</span>
                </a>
              </li>
            </ul>
            <div class="border-t border-neutral4/70"></div>
            <ul class="py-1.5">
              <li>
                <button type="button" onclick="window.location.href='${_rootBase}index.html'" class="flex items-center gap-2.5 w-full px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors group">
                  <span class="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </span>
                  <span>Keluar</span>
                </button>
              </li>
            </ul>
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

  // Dropdown toggle & click outside (Sama dengan Alumni)
  const profileBtn = document.getElementById('profile-menu-btn');
  const profileDropdown = document.getElementById('dropdown-profile-menu');
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !profileDropdown.classList.contains('hidden');
      profileDropdown.classList.toggle('hidden', isOpen);
      profileBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
        profileDropdown.classList.add('hidden');
        profileBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !profileDropdown.classList.contains('hidden')) {
        profileDropdown.classList.add('hidden');
        profileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (window.lucide) window.lucide.createIcons();
});
