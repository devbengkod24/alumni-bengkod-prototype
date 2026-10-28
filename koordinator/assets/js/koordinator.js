/**
 * Shared JS role Koordinator: config Tailwind, layout sidebar/topbar, data dummy, helper.
 * Dimuat di <head> setelah Tailwind CDN dan sebelum ../assets/js/main.js,
 * supaya sidebar sudah ada saat main.js membuat ikon Lucide.
 * Data dummy mengikuti field di alumni-api (Alumni, Lowongan, Pengumuman, ForumReport, Mitra).
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

// ===================== DATA DUMMY =====================
const KOOR_DEFAULT = {
  user: { name: 'Dr. Ayu Lestari, M.Kom', email: 'ayu.lestari@dinus.ac.id' },

  // Urut per alur kerja: rekrutmen, komunikasi, tracer study, administrasi
  nav: [
    { href: 'dashboard.html', icon: 'layout-dashboard', label: 'Dashboard' },
    { href: 'lowongan.html', icon: 'briefcase', label: 'Lowongan' },
    { href: 'manajemen-pelamar.html', icon: 'user-check', label: 'Manajemen Pelamar' },
    { href: 'pengumuman.html', icon: 'megaphone', label: 'Pengumuman' },
    { href: 'forum.html', icon: 'messages-square', label: 'Forum' },
    { icon: 'database', label: 'Tracer Data', submenu: [
      { href: 'data-alumni.html', icon: 'graduation-cap', label: 'Data Alumni' },
      { href: 'data-mitra.html', icon: 'building-2', label: 'Data Mitra' },
    ] },
    { href: 'analitik.html', icon: 'chart-column', label: 'Analitik Tracer' },
    { href: 'manajemen-users.html', icon: 'users', label: 'Management Users' },
  ],

  // Rekap per tahun lulus (status karir mengikuti enum alumni-api)
  rekap: [
    { tahun: 2019, total: 38, terdaftar: 30, fulltime: 22, parttime: 2, wirausaha: 3, studi: 2, mencari: 1, masaTunggu: 4.8 },
    { tahun: 2020, total: 42, terdaftar: 35, fulltime: 24, parttime: 3, wirausaha: 2, studi: 3, mencari: 3, masaTunggu: 6.1 },
    { tahun: 2021, total: 51, terdaftar: 44, fulltime: 30, parttime: 4, wirausaha: 4, studi: 2, mencari: 4, masaTunggu: 5.4 },
    { tahun: 2022, total: 55, terdaftar: 49, fulltime: 34, parttime: 5, wirausaha: 3, studi: 4, mencari: 3, masaTunggu: 4.2 },
    { tahun: 2023, total: 60, terdaftar: 52, fulltime: 35, parttime: 6, wirausaha: 4, studi: 3, mencari: 4, masaTunggu: 3.6 },
    { tahun: 2024, total: 64, terdaftar: 50, fulltime: 30, parttime: 7, wirausaha: 3, studi: 4, mencari: 6, masaTunggu: 3.1 },
    { tahun: 2025, total: 58, terdaftar: 31, fulltime: 14, parttime: 5, wirausaha: 2, studi: 3, mencari: 7, masaTunggu: 2.4 },
  ],

  alumni: [
    { id: 1, nama: 'Rizky Pratama', nim: 'A11.2019.11823', tahun_lulus: 2023, status: 'Bekerja Full Time', nama_perusahaan: 'PT Telkom Indonesia', jabatan: 'Backend Engineer' },
    { id: 2, nama: 'Nadia Putri', nim: 'A11.2019.11902', tahun_lulus: 2023, status: 'Bekerja Full Time', nama_perusahaan: 'Gojek', jabatan: 'Data Analyst' },
    { id: 3, nama: 'Fajar Nugroho', nim: 'A11.2020.12011', tahun_lulus: 2024, status: 'Wirausaha', nama_perusahaan: 'Studio Kode Semarang', jabatan: 'Founder' },
    { id: 4, nama: 'Salsa Ramadhani', nim: 'A11.2020.12088', tahun_lulus: 2024, status: 'Melanjutkan Pendidikan', nama_perusahaan: 'Universitas Gadjah Mada', jabatan: 'S2 Ilmu Komputer' },
    { id: 5, nama: 'Bagas Saputra', nim: 'A11.2021.13120', tahun_lulus: 2025, status: 'Mencari Pekerjaan', nama_perusahaan: '-', jabatan: '-' },
    { id: 6, nama: 'Intan Maharani', nim: 'A11.2018.10544', tahun_lulus: 2022, status: 'Bekerja Part Time', nama_perusahaan: 'Dicoding', jabatan: 'Code Reviewer' },
    { id: 7, nama: 'Dimas Arya', nim: 'A11.2018.10601', tahun_lulus: 2022, status: 'Bekerja Full Time', nama_perusahaan: 'Bank BCA', jabatan: 'Mobile Developer' },
    { id: 8, nama: 'Ananda Wulan', nim: 'A11.2021.13301', tahun_lulus: 2025, status: 'Bekerja Full Time', nama_perusahaan: 'Tokopedia', jabatan: 'Frontend Engineer' },
  ],

  mitra: [
    { id: 1, nama_perusahaan: 'PT Telkom Indonesia', bidang_usaha: 'Telekomunikasi', kota: 'Bandung', pic: 'Hendra Wijaya', alumni: 6 },
    { id: 2, nama_perusahaan: 'Gojek', bidang_usaha: 'Teknologi', kota: 'Jakarta', pic: 'Maya Safitri', alumni: 4 },
    { id: 3, nama_perusahaan: 'PT Solusi Digital Jateng', bidang_usaha: 'Software House', kota: 'Semarang', pic: 'Andi Kurniawan', alumni: 2 },
    { id: 4, nama_perusahaan: 'PT Data Nusantara', bidang_usaha: 'Data & AI', kota: 'Yogyakarta', pic: 'Rina Pertiwi', alumni: 1 },
  ],

  // status lowongan: Belum Verifikasi | Terverifikasi | Ditolak (enum alumni-api).
  // Field mengikuti LowonganData alumni-api + data lowongan di mitra.js (gaji_min/max, tags).
  lowongan: [
    { id: 1, posisi: 'Frontend Developer (React)', nama_perusahaan: 'PT Solusi Digital Jateng', alamat: 'Jl. Pemuda No. 120, Semarang', kota: 'Semarang', email: 'hr@solusidigital.id', telepon: '024-7612345', website: 'https://solusidigital.id',
      tipe_kerja: 'Full Time', kategori_lowongan: 'Kerja', pengalaman: 'Fresh Graduate', gaji_min: 3500000, gaji_max: 5000000, tags: ['React', 'TypeScript', 'Tailwind'],
      deskripsi: 'Kami membutuhkan Frontend Developer yang paham React.\n\nKualifikasi:\n- Memahami React dan state management\n- HTML/CSS/JavaScript yang solid',
      masa_berlaku: '2026-12-15', status: 'Belum Verifikasi', oleh: 'mitra', pengaju: 'Andi Kurniawan', diajukan: '2026-10-18', keterangan: '' },
    { id: 2, posisi: 'Mobile Engineer (Flutter)', nama_perusahaan: 'Gojek', alamat: 'Pasaraya Blok M Gedung B, Jakarta Selatan', kota: 'Jakarta', email: 'hr@gojek.com', telepon: '021-50251110', website: 'https://www.gojek.com',
      tipe_kerja: 'Full Time', kategori_lowongan: 'Kerja', pengalaman: '2-3 Tahun', gaji_min: 9000000, gaji_max: 14000000, tags: ['Flutter', 'Dart', 'Firebase'],
      deskripsi: 'Bergabung dengan tim Driver App untuk membangun fitur baru yang dipakai jutaan mitra driver.\n\nKualifikasi:\n- Minimal 2 tahun pengalaman Flutter\n- Memahami state management (Bloc/Riverpod)\n- Pernah publish aplikasi ke Play Store',
      masa_berlaku: '2026-11-20', status: 'Belum Verifikasi', oleh: 'mitra', pengaju: 'Maya Safitri', diajukan: '2026-10-21', keterangan: '' },
    { id: 3, posisi: 'Data Science Intern', nama_perusahaan: 'PT Data Nusantara', alamat: 'Jl. Kaliurang Km 5, Sleman', kota: 'Yogyakarta', email: 'career@datanusantara.id', telepon: '', website: '',
      tipe_kerja: 'Magang', kategori_lowongan: 'Magang', pengalaman: 'Mahasiswa', gaji_min: 1000000, gaji_max: 1500000, tags: ['Python', 'Machine Learning', 'SQL'],
      deskripsi: 'Program magang 3 bulan di tim Data & AI.\n\nPersyaratan:\n- Mahasiswa tingkat akhir / fresh graduate\n- Mengenal Python dan dasar statistik',
      masa_berlaku: '2026-12-15', status: 'Belum Verifikasi', oleh: 'mitra', pengaju: 'Rina Pertiwi', diajukan: '2026-10-20', keterangan: '' },
    { id: 4, posisi: 'Backend Developer (Laravel)', nama_perusahaan: 'PT Solusi Digital Jateng', alamat: 'Jl. Pemuda No. 120, Semarang', kota: 'Semarang', email: 'hr@solusidigital.id', telepon: '024-7612345', website: 'https://solusidigital.id',
      tipe_kerja: 'Full Time', kategori_lowongan: 'Kerja', pengalaman: '1-2 Tahun', gaji_min: 4000000, gaji_max: 6000000, tags: ['Laravel', 'PHP', 'MySQL'],
      deskripsi: 'Kami mencari Backend Developer yang berpengalaman dengan Laravel.\n\nKualifikasi:\n- Minimal 1 tahun pengalaman Laravel\n- Memahami RESTful API\n- Familiar dengan Git dan CI/CD',
      masa_berlaku: '2026-11-30', status: 'Terverifikasi', oleh: 'mitra', pengaju: 'Andi Kurniawan', diajukan: '2026-10-15', keterangan: '' },
    { id: 5, posisi: 'Asisten Lab Bengkel Koding', nama_perusahaan: 'Bengkel Koding UDINUS', alamat: 'Jl. Imam Bonjol No. 207, Semarang', kota: 'Semarang', email: 'bengkelkoding@dinus.ac.id', telepon: '024-3517261', website: 'https://bengkelkoding.dinus.ac.id',
      tipe_kerja: 'Part Time', kategori_lowongan: 'Kerja', pengalaman: 'Fresh Graduate', gaji_min: 0, gaji_max: 0, tags: ['Mentoring', 'Web Development'],
      deskripsi: 'Membantu praktikum dan mentoring peserta Bengkel Koding.\n\nKualifikasi:\n- Alumni Bengkel Koding\n- Komunikatif dan senang mengajar',
      masa_berlaku: '2026-11-10', status: 'Terverifikasi', oleh: 'koordinator', pengaju: 'Dr. Ayu Lestari', diajukan: '2026-10-05', keterangan: '' },
    { id: 6, posisi: 'QA Engineer', nama_perusahaan: 'PT Telkom Indonesia', alamat: 'Jl. Japati No. 1, Bandung', kota: 'Bandung', email: 'recruitment@telkom.co.id', telepon: '022-4521510', website: 'https://www.telkom.co.id',
      tipe_kerja: 'Full Time', kategori_lowongan: 'Kerja', pengalaman: '1-2 Tahun', gaji_min: 7000000, gaji_max: 10000000, tags: ['Selenium', 'Postman', 'Testing'],
      deskripsi: 'Menjamin kualitas produk digital Telkom melalui pengujian manual dan otomatis.\n\nKualifikasi:\n- Memahami test case & bug reporting\n- Pengalaman automation testing jadi nilai plus',
      masa_berlaku: '2026-12-01', status: 'Terverifikasi', oleh: 'mitra', pengaju: 'Hendra Wijaya', diajukan: '2026-10-12', keterangan: '' },
    { id: 7, posisi: 'Mobile Developer (Flutter)', nama_perusahaan: 'PT Solusi Digital Jateng', alamat: 'Jl. Pemuda No. 120, Semarang', kota: 'Semarang', email: 'hr@solusidigital.id', telepon: '024-7612345', website: 'https://solusidigital.id',
      tipe_kerja: 'Full Time', kategori_lowongan: 'Kerja', pengalaman: '2-3 Tahun', gaji_min: 5000000, gaji_max: 8000000, tags: ['Flutter', 'Dart', 'Firebase'],
      deskripsi: 'Dibutuhkan Mobile Developer Flutter berpengalaman.\n\nKualifikasi:\n- Minimal 2 tahun pengalaman Flutter\n- Pengalaman publish ke App Store dan Play Store',
      masa_berlaku: '2026-10-25', status: 'Ditolak', oleh: 'mitra', pengaju: 'Andi Kurniawan', diajukan: '2026-09-15', keterangan: 'Deskripsi pekerjaan dan persyaratan kurang jelas. Mohon lengkapi informasi gaji dan benefit.' },
  ],

  // role: alumnus | mitra | koordinator | superadmin. Dua terakhir terkunci untuk koordinator.
  users: [
    { id: 1, name: 'Rizky Pratama', email: 'rizky.pratama@gmail.com', role: 'alumnus', aktif: true },
    { id: 2, name: 'Nadia Putri', email: 'nadia.putri@gmail.com', role: 'alumnus', aktif: true },
    { id: 3, name: 'Bagas Saputra', email: 'bagas.s@gmail.com', role: 'alumnus', aktif: false },
    { id: 4, name: 'Gojek (Maya Safitri)', email: 'hr@gojek.com', role: 'mitra', aktif: true },
    { id: 5, name: 'PT Solusi Digital Jateng', email: 'hr@solusidigital.id', role: 'mitra', aktif: true },
    { id: 6, name: 'Dr. Ayu Lestari', email: 'koordinator@dinus.ac.id', role: 'koordinator', aktif: true },
    { id: 7, name: 'Super Admin', email: 'superadmin@dinus.ac.id', role: 'superadmin', aktif: true },
  ],

  pengumuman: [
    { id: 1, judul: 'Pengisian Tracer Study Angkatan 2025', isi: 'Seluruh alumni lulusan 2025 wajib mengisi tracer study sebelum 30 November 2026.', target: 'Alumni', published: true, published_at: '2026-10-18' },
    { id: 2, judul: 'Survei Kepuasan Pengguna Lulusan', isi: 'Mitra dimohon mengisi survei kepuasan terhadap alumni Bengkel Koding yang bekerja di perusahaan Anda.', target: 'Mitra', published: true, published_at: '2026-10-10' },
    { id: 3, judul: 'Job Fair Bengkel Koding 2026', isi: 'Draft: rencana job fair Desember 2026, menunggu konfirmasi tanggal.', target: 'Alumni & Mitra', published: false, published_at: '' },
  ],

  // Lamaran alumni ke lowongan buatan koordinator: nim -> KOOR.alumni, lowongan_id -> KOOR.lowongan
  // (5 Asisten Lab, 8 Backend Junior, 9 Backend Senior). Status = entri riwayat terakhir
  // (applied | review | interview | diterima | ditolak); tanggal melamar = entri pertama.
  pelamar: [
    { id: 1, nim: 'A11.2021.13301', lowongan_id: 5, telepon: '0815-4444-5555',
      riwayat: [
        { status: 'applied', waktu: '2026-10-07T10:15:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-09T09:00:00', catatan: 'Berkas lengkap, lolos seleksi administrasi.' },
        { status: 'interview', waktu: '2026-10-12T13:00:00', catatan: 'Micro-teaching 27 Okt 2026, 13.00 WIB di Lab Bengkel Koding.' },
      ] },
    { id: 2, nim: 'A11.2021.13120', lowongan_id: 5, telepon: '0817-6666-7777',
      riwayat: [{ status: 'applied', waktu: '2026-10-24T20:12:00', catatan: 'Lamaran dikirim melalui portal alumni.' }] },
    { id: 3, nim: 'A11.2020.12088', lowongan_id: 5, telepon: '0818-7777-8888',
      riwayat: [
        { status: 'applied', waktu: '2026-10-08T08:05:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-10T10:30:00', catatan: 'Pengalaman mentoring sedang ditinjau.' },
      ] },
    { id: 4, nim: 'A11.2020.12011', lowongan_id: 5, telepon: '0814-3333-4444',
      riwayat: [
        { status: 'applied', waktu: '2026-10-06T15:20:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-07T09:40:00', catatan: 'Berkas lengkap, lanjut review jadwal.' },
        { status: 'ditolak', waktu: '2026-10-09T10:00:00', catatan: 'Jadwal kerja tidak memungkinkan untuk posisi paruh waktu di lab.' },
      ] },
    { id: 5, nim: 'A11.2021.13120', lowongan_id: 8, telepon: '0817-6666-7777',
      riwayat: [
        { status: 'applied', waktu: '2026-10-14T19:30:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-16T09:15:00', catatan: 'Pengalaman Spring Boot relevan, lanjut review teknis.' },
      ] },
    { id: 6, nim: 'A11.2020.12011', lowongan_id: 8, telepon: '0814-3333-4444',
      riwayat: [
        { status: 'applied', waktu: '2026-10-13T08:40:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-14T09:00:00', catatan: 'Berkas lengkap, lolos seleksi administrasi.' },
        { status: 'interview', waktu: '2026-10-17T13:30:00', catatan: 'Interview teknis 28 Okt 2026, 10.00 WIB via Google Meet.' },
      ] },
    { id: 7, nim: 'A11.2021.13301', lowongan_id: 8, telepon: '0815-4444-5555',
      riwayat: [{ status: 'applied', waktu: '2026-10-22T16:40:00', catatan: 'Lamaran dikirim melalui portal alumni.' }] },
    { id: 8, nim: 'A11.2020.12088', lowongan_id: 8, telepon: '0818-7777-8888',
      riwayat: [{ status: 'applied', waktu: '2026-10-25T08:05:00', catatan: 'Lamaran dikirim melalui portal alumni.' }] },
    { id: 9, nim: 'A11.2019.11823', lowongan_id: 9, telepon: '0812-1111-2222',
      riwayat: [
        { status: 'applied', waktu: '2026-10-12T19:05:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-13T09:15:00', catatan: 'Berkas lengkap, lolos seleksi administrasi.' },
        { status: 'interview', waktu: '2026-10-14T14:00:00', catatan: 'Interview teknis 16 Okt 2026, 10.00 WIB via Google Meet.' },
        { status: 'diterima', waktu: '2026-10-21T11:20:00', catatan: 'Lolos interview teknis dan HR. Surat penawaran dikirim via email.' },
      ] },
    { id: 10, nim: 'A11.2018.10544', lowongan_id: 9, telepon: '0816-5555-6666',
      riwayat: [
        { status: 'applied', waktu: '2026-10-13T13:25:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-15T10:30:00', catatan: 'Berkas lengkap, lanjut review pengalaman.' },
        { status: 'ditolak', waktu: '2026-10-17T16:00:00', catatan: 'Pengalaman backend belum memenuhi syarat minimal 3 tahun.' },
      ] },
    { id: 11, nim: 'A11.2018.10601', lowongan_id: 9, telepon: '0819-8888-9999',
      riwayat: [
        { status: 'applied', waktu: '2026-10-18T11:45:00', catatan: 'Lamaran dikirim melalui portal alumni.' },
        { status: 'review', waktu: '2026-10-20T08:30:00', catatan: 'Pengalaman CI/CD relevan, lanjut review teknis.' },
      ] },
    { id: 12, nim: 'A11.2019.11902', lowongan_id: 9, telepon: '0813-2222-3333',
      riwayat: [{ status: 'applied', waktu: '2026-10-23T09:00:00', catatan: 'Lamaran dikirim melalui portal alumni.' }] },
  ],
};

// Getter store mengembalikan salinan baru tiap akses: ubah satu salinan, lalu simpan lewat setter (KOOR.x = salinan).
const KOOR = {
  get user() {
    if (window.BengkodStore) {
      const active = window.BengkodStore.getActiveKoordinator();
      if (active) return { name: active.nama, email: active.email, divisi: active.divisi, foto: active.foto };
    }
    return KOOR_DEFAULT.user;
  },
  nav: KOOR_DEFAULT.nav,
  rekap: KOOR_DEFAULT.rekap,
  get alumni() {
    return window.BengkodStore ? window.BengkodStore.getAlumni() : KOOR_DEFAULT.alumni;
  },
  get mitra() {
    return window.BengkodStore ? window.BengkodStore.getMitra() : KOOR_DEFAULT.mitra;
  },
  get lowongan() {
    return window.BengkodStore ? window.BengkodStore.getLowongan() : KOOR_DEFAULT.lowongan;
  },
  set lowongan(val) {
    if (window.BengkodStore) {
      window.BengkodStore.saveLowongan(val);
    }
    KOOR_DEFAULT.lowongan = val;
  },
  get pengumuman() {
    return window.BengkodStore ? window.BengkodStore.getPengumuman() : KOOR_DEFAULT.pengumuman;
  },
  set pengumuman(val) {
    if (window.BengkodStore) {
      window.BengkodStore.savePengumuman(val);
    }
    KOOR_DEFAULT.pengumuman = val;
  },
  // Disimpan di localStorage agar akun dari tambah-akun.html muncul di Management Users
  get users() {
    try { return JSON.parse(localStorage.getItem('bengkod_koor_users_v1')) || KOOR_DEFAULT.users; } catch { return KOOR_DEFAULT.users; }
  },
  set users(val) {
    try { localStorage.setItem('bengkod_koor_users_v1', JSON.stringify(val)); } catch {}
    KOOR_DEFAULT.users = val;
  },
};

// ===================== STANDAR BADGE RESMI (TANPA IKON) =====================
const BADGE = {
  green: 'bg-green3 text-green1 border-green2/30',
  yellow: 'bg-yellow3 text-yellow1 border-yellow2/30',
  red: 'bg-red3 text-red1 border-red2/30',
  blue: 'bg-primary5 text-primary1 border-primary4/50',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gray: 'bg-neutral5 text-neutral2 border-neutral4',
};

const BADGE_COLOR = {
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
const BADGE_LABEL = { pending: 'Menunggu', approved: 'Ditindak', rejected: 'Diabaikan' };

function badge(status) {
  const s = status || '-';
  const cls = BADGE[BADGE_COLOR[s] || 'blue'];
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cls}">${BADGE_LABEL[s] || s}</span>`;
}

// Isi avatar koordinator: foto profil jika ada, selain itu inisial nama (tanpa gelar depan)
function koorInitials(nama) {
  return (nama || '').replace(/^(Dr\.|Prof\.|Ir\.)\s*/i, '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
}
function koorAvatar() {
  const u = KOOR.user;
  return u.foto ? `<img src="${esc(u.foto)}" alt="" class="w-full h-full object-cover">` : koorInitials(u.name);
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtDate(iso) {
  return iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
}

function fmtGaji(min, max) {
  const rp = n => 'Rp ' + Number(n).toLocaleString('id-ID');
  if (!min && !max) return 'Tidak dicantumkan';
  return min && max ? `${rp(min)} - ${rp(max)}` : rp(min || max);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

// Audit log: aksi sensitif dicatat beserta waktu & pelakunya.
const AUDIT_KEY = 'koor-audit-log';
function getAudit() {
  try { return JSON.parse(localStorage.getItem(AUDIT_KEY)) || []; } catch { return []; }
}
function audit(aksi, target) {
  if (window.BengkodStore) {
    window.BengkodStore.logActivity('Koordinator', aksi, target);
  }
  const log = [{ aksi, target, pelaku: KOOR.user.name, waktu: new Date().toISOString() }, ...getAudit()].slice(0, 50);
  try { localStorage.setItem(AUDIT_KEY, JSON.stringify(log)); } catch { /* storage diblokir: abaikan */ }
}

// ===================== PELAMAR (manajemen-pelamar.html & detail-pelamar.html) =====================
const STATUS_PELAMAR = { applied: 'Applied', review: 'Review', interview: 'Interview', diterima: 'Diterima', ditolak: 'Ditolak' };
const PELAMAR_KEY = 'koor-pelamar-v2';
function getPelamar() {
  try { return JSON.parse(localStorage.getItem(PELAMAR_KEY)) || KOOR_DEFAULT.pelamar; } catch { return KOOR_DEFAULT.pelamar; }
}
function savePelamar(list) {
  try { localStorage.setItem(PELAMAR_KEY, JSON.stringify(list)); } catch { /* storage diblokir: abaikan */ }
}
// Hanya lowongan buatan koordinator yang masih tayang
function lowonganPelamar() {
  return KOOR.lowongan.filter(l => l.oleh === 'koordinator' && l.status === 'Terverifikasi');
}
// Lamaran digabung dengan data alumni & lowongannya (dicocokkan lewat id, bukan nama posisi); terbaru di atas
function gabungPelamar(list) {
  const alumni = KOOR.alumni;
  const lowongan = lowonganPelamar();
  return list.map(p => ({
    ...p,
    alumni: alumni.find(a => a.nim === p.nim),
    lowongan: lowongan.find(l => l.id === p.lowongan_id),
    status: p.riwayat[p.riwayat.length - 1].status,
    tanggal: p.riwayat[0].waktu,
  })).filter(p => p.alumni && p.lowongan).sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}
function fmtWaktu(iso) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';
}
function inisial(nama) {
  return nama.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

// Dialog konfirmasi generik untuk aksi sensitif
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

// Ekspor CSV (bisa langsung dibuka di Excel)
function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// Tab sederhana: tombol [data-tab="x"] menampilkan panel #tab-x
function initTabs(root = document) {
  const btns = root.querySelectorAll('[data-tab]');
  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => {
      const active = b === btn;
      b.setAttribute('aria-selected', active);
      b.className = `px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap ${active ? 'border-primary1 text-primary1' : 'border-transparent text-neutral2 hover:text-primary1'}`;
      document.getElementById('tab-' + b.dataset.tab).classList.toggle('hidden', !active);
    });
  }));
  if (btns[0]) btns[0].click();
}

// ===================== LAYOUT (Sidebar + Topbar Sesuai lms-bengkod-web) =====================
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main[data-title]');
  if (!main) return;
  const current = location.pathname.split('/').pop() || 'dashboard.html';
  // Halaman turunan (mis. detail-pelamar) menunjuk menu induknya lewat data-nav
  const activeHref = main.dataset.nav || current;

  const navItems = KOOR.nav.map(n => {
    // Menu bertingkat (pola sama dengan sidebar mitra)
    if (n.submenu) {
      const open = n.submenu.some(s => s.href === activeHref);
      const subItems = n.submenu.map(s => {
        const active = s.href === activeHref;
        return `<a href="${s.href}" ${active ? 'aria-current="page"' : ''}
          class="flex items-center gap-2.5 w-full pl-9 pr-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral2 hover:bg-primary5 hover:text-primary1'}">
          <i data-lucide="${s.icon}" class="w-4 h-4 shrink-0"></i><span>${s.label}</span></a>`;
      }).join('');
      return `<div class="space-y-0.5">
        <button type="button" data-submenu-toggle aria-expanded="${open}" class="flex items-center justify-between gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${open ? 'text-primary1 bg-primary5' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
          <span class="flex items-center gap-3"><i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i><span>${n.label}</span></span>
          <i data-lucide="chevron-down" class="w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}"></i>
        </button>
        <div class="space-y-0.5 ${open ? '' : 'hidden'}">${subItems}</div>
      </div>`;
    }
    const active = n.href === activeHref;
    return `<a href="${n.href}" ${active ? 'aria-current="page"' : ''}
      class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
      <i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i><span>${n.label}</span></a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="sidebar-overlay" class="fixed inset-0 bg-neutral1/40 backdrop-blur-sm z-40 hidden"></div>
    <aside id="sidebar" class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 z-50 flex flex-col -translate-x-full transition-transform duration-300 ease-in-out" aria-label="Menu Koordinator">
      <a href="../index.html" class="flex items-center justify-center py-5 px-4 border-b border-neutral4 focus:outline-none focus:ring-2 focus:ring-primary1">
        <img src="../assets/images/bengkelkoding-text.webp" alt="Bengkel Koding Logo" class="h-9 w-auto object-contain">
      </a>
      <nav class="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">${navItems}</nav>
      <div class="p-3 border-t border-neutral4">
        <a href="../index.html" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors">
          <i data-lucide="log-out" class="w-5 h-5"></i><span>Keluar</span></a>
      </div>
    </aside>`);

  // Breadcrumbs Generator (100% Identik dengan Nav.tsx lms-bengkod-web)
  const isDashboard = current === 'dashboard.html' || main.dataset.title === 'Dashboard';
  const pageTitle = esc(main.dataset.title);
  const parent = KOOR.nav.find(n => n.href && n.href === main.dataset.nav);

  const breadcrumbHTML = isDashboard
    ? `<a href="dashboard.html" class="text-neutral1 hover:text-primary1 transition-colors font-medium">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1">Koordinator</span>`
    : `<a href="dashboard.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <a href="dashboard.html" class="text-neutral2 hover:text-primary1 transition-colors">Koordinator</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       ${parent ? `<span class="hidden sm:inline-flex items-center"><a href="${parent.href}" class="text-neutral2 hover:text-primary1 transition-colors">${parent.label}</a><span class="mx-2 text-neutral3 select-none font-normal">›</span></span>` : ''}
       <span class="font-medium text-neutral1 truncate">${pageTitle}</span>`;


  const wrapper = document.createElement('div');
  wrapper.id = 'main-wrapper';
  wrapper.className = 'lg:ml-64 min-h-screen flex flex-col transition-all duration-300';
  wrapper.innerHTML = `
    <!-- Topbar Header Identik dengan lms-bengkod-web Nav.tsx -->
    <header class="sticky top-0 z-30 bg-white border-b border-neutral4 h-16 px-3 lg:px-6 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <!-- Hamburger Menu Toggle (Selalu tampil dan berfungsi seperti di lms-bengkod-web) -->
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
              <div class="text-sm font-semibold text-neutral1 leading-tight group-hover:text-primary1 transition-colors">${esc(KOOR.user.name)}</div>
              <div class="text-[11px] text-neutral3">Koordinator Alumni</div>
            </div>
            <div data-koor-avatar class="w-9 h-9 rounded-full overflow-hidden bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50 shadow-xs">${koorAvatar()}</div>
          </button>

          <!-- Dropdown Popover Profil (100% Identik dengan Alumni) -->
          <div id="dropdown-profile-menu" class="hidden absolute top-12 right-0 z-[70] w-64 origin-top-right rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden">
            <div class="px-4 pt-3.5 pb-3 bg-gradient-to-br from-primary1 via-primary2 to-primary3">
              <div class="flex items-center gap-2.5">
                <div data-koor-avatar class="w-9 h-9 rounded-full overflow-hidden bg-white/20 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm shrink-0">${koorAvatar()}</div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-white truncate">${esc(KOOR.user.name)}</p>
                  <p class="text-[11px] text-white/80 truncate">${esc(KOOR.user.email)}</p>
                </div>
              </div>
            </div>
            <ul class="py-1.5 text-sm text-neutral1">
              <li>
                <a href="profil.html" class="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-primary5 transition-colors group">
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
                <button type="button" onclick="window.location.href='../index.html'" class="flex items-center gap-2.5 w-full px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors group">
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

  // Modal konfirmasi bersama
  document.body.insertAdjacentHTML('beforeend', `
    <div id="confirm-modal" data-modal-backdrop class="fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 elevation5" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
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

  // Dropdown toggle & click outside
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

  document.querySelectorAll('[data-submenu-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const hidden = btn.nextElementSibling.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', !hidden);
    btn.lastElementChild.classList.toggle('rotate-180', !hidden);
  }));

  if (window.lucide) window.lucide.createIcons();
});
