/**
 * BengkodStore: Single Source of Truth (SSOT) data prototype bersama
 * Menghubungkan alur data antar-role (Mitra, Koordinator, SuperAdmin) via localStorage.
 * Standar enum bahasa Indonesia.
 */
(function() {
  const KEYS = {
    LOWONGAN: 'bengkod_shared_lowongan_v2', // v2: tambah seed lowongan koordinator (Manajemen Pelamar)
    PENGUMUMAN: 'bengkod_shared_pengumuman_v1',
    KOORDINATOR: 'bengkod_shared_koordinator_v1',
    MITRA: 'bengkod_shared_mitra_v1',
    ALUMNI: 'bengkod_shared_alumni_v1',
    FORUM: 'bengkod_shared_forum_v2', // v2: tambah suka & dibagikan untuk feed forum
    LOGS: 'bengkod_shared_activity_logs_v1',
    CV_AUDIT: 'bengkod_shared_cv_audit_v1',
  };

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
    } catch {}
  }

  // Initial Seed Data (Bahasa Indonesia & Harmonisasi per Role)
  const SEED_LOWONGAN = [
    {
      id: 1,
      posisi: 'Frontend Developer (React)',
      nama_perusahaan: 'PT Solusi Digital Jateng',
      alamat: 'Jl. Pemuda No. 120, Semarang',
      kota: 'Semarang',
      email: 'hr@solusidigital.id',
      telepon: '024-7612345',
      website: 'https://solusidigital.id',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: 'Lulusan Baru',
      gaji_min: 3500000,
      gaji_max: 5000000,
      tampilkan_gaji: true,
      tags: ['React', 'TypeScript', 'Tailwind'],
      deskripsi: 'Kami membutuhkan Frontend Developer yang paham React dan modern frontend architecture.\n\nKualifikasi:\n- Memahami React dan state management\n- HTML/CSS/JavaScript yang solid',
      masa_berlaku: '2026-12-15',
      status: 'Belum Verifikasi',
      oleh: 'mitra',
      pengaju: 'Andi Kurniawan',
      diajukan: '2026-10-18',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 2,
      posisi: 'Mobile Engineer (Flutter)',
      nama_perusahaan: 'Gojek',
      alamat: 'Pasaraya Blok M Gedung B, Jakarta Selatan',
      kota: 'Jakarta',
      email: 'recruitment@gojek.com',
      telepon: '021-50251110',
      website: 'https://www.gojek.com',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: '2-3 Tahun',
      gaji_min: 9000000,
      gaji_max: 14000000,
      tampilkan_gaji: false,
      tags: ['Flutter', 'Dart', 'Firebase'],
      deskripsi: 'Bergabung dengan tim Driver App untuk membangun fitur baru.\n\nKualifikasi:\n- Minimal 2 tahun pengalaman Flutter\n- Memahami state management (Bloc/Riverpod)',
      masa_berlaku: '2026-11-20',
      status: 'Belum Verifikasi',
      oleh: 'mitra',
      pengaju: 'Maya Safitri',
      diajukan: '2026-10-21',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 3,
      posisi: 'Data Science Intern',
      nama_perusahaan: 'PT Data Nusantara',
      alamat: 'Jl. Kaliurang Km 5, Sleman',
      kota: 'Yogyakarta',
      email: 'career@datanusantara.id',
      telepon: '',
      website: '',
      tipe_kerja: 'Magang',
      kategori_lowongan: 'Lowongan Magang',
      pengalaman: 'Mahasiswa',
      gaji_min: 1000000,
      gaji_max: 1500000,
      tampilkan_gaji: true,
      tags: ['Python', 'Machine Learning', 'SQL'],
      deskripsi: 'Program magang 3 bulan di tim Data & AI.\n\nPersyaratan:\n- Mahasiswa tingkat akhir / fresh graduate\n- Mengenal Python dan dasar statistik',
      masa_berlaku: '2026-12-15',
      status: 'Belum Verifikasi',
      oleh: 'mitra',
      pengaju: 'Rina Pertiwi',
      diajukan: '2026-10-20',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 4,
      posisi: 'Backend Developer (Laravel)',
      nama_perusahaan: 'PT Solusi Digital Jateng',
      alamat: 'Jl. Pemuda No. 120, Semarang',
      kota: 'Semarang',
      email: 'hr@solusidigital.id',
      telepon: '024-7612345',
      website: 'https://solusidigital.id',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: '1-2 Tahun',
      gaji_min: 4000000,
      gaji_max: 6000000,
      tampilkan_gaji: true,
      tags: ['Laravel', 'PHP', 'MySQL'],
      deskripsi: 'Kami mencari Backend Developer berpengalaman dengan Laravel RESTful API.',
      masa_berlaku: '2026-11-30',
      status: 'Terverifikasi',
      oleh: 'mitra',
      pengaju: 'Andi Kurniawan',
      diajukan: '2026-10-15',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 5,
      posisi: 'Asisten Lab Bengkel Koding',
      nama_perusahaan: 'Bengkel Koding UDINUS',
      alamat: 'Jl. Imam Bonjol No. 207, Semarang',
      kota: 'Semarang',
      email: 'bengkelkoding@dinus.ac.id',
      telepon: '024-3517261',
      website: 'https://bengkelkoding.dinus.ac.id',
      tipe_kerja: 'Paruh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: 'Lulusan Baru',
      gaji_min: 0,
      gaji_max: 0,
      tampilkan_gaji: false,
      tags: ['Mentoring', 'Web Development'],
      deskripsi: 'Membantu praktikum dan mentoring peserta Bengkel Koding.',
      masa_berlaku: '2026-11-10',
      status: 'Terverifikasi',
      oleh: 'koordinator',
      pengaju: 'Dr. Ayu Lestari',
      diajukan: '2026-10-05',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 6,
      posisi: 'QA Engineer',
      nama_perusahaan: 'PT Telkom Indonesia',
      alamat: 'Jl. Japati No. 1, Bandung',
      kota: 'Bandung',
      email: 'recruitment@telkom.co.id',
      telepon: '022-4521510',
      website: 'https://www.telkom.co.id',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: '1-2 Tahun',
      gaji_min: 7000000,
      gaji_max: 10000000,
      tampilkan_gaji: true,
      tags: ['Selenium', 'Postman', 'Testing'],
      deskripsi: 'Menjamin kualitas produk digital Telkom melalui pengujian otomatis.',
      masa_berlaku: '2026-12-01',
      status: 'Terverifikasi',
      oleh: 'mitra',
      pengaju: 'Hendra Wijaya',
      diajukan: '2026-10-12',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 7,
      posisi: 'Mobile Developer (Flutter)',
      nama_perusahaan: 'PT Solusi Digital Jateng',
      alamat: 'Jl. Pemuda No. 120, Semarang',
      kota: 'Semarang',
      email: 'hr@solusidigital.id',
      telepon: '024-7612345',
      website: 'https://solusidigital.id',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: '2-3 Tahun',
      gaji_min: 5000000,
      gaji_max: 8000000,
      tampilkan_gaji: false,
      tags: ['Flutter', 'Dart', 'Firebase'],
      deskripsi: 'Dibutuhkan Mobile Developer Flutter berpengalaman.',
      masa_berlaku: '2026-10-25',
      status: 'Ditolak',
      oleh: 'mitra',
      pengaju: 'Andi Kurniawan',
      diajukan: '2026-09-15',
      alasan_penolakan: 'Deskripsi pekerjaan dan persyaratan kurang jelas. Mohon lengkapi informasi gaji dan benefit.',
      keterangan: 'Ditolak oleh koordinator'
    },
    {
      id: 8,
      posisi: 'Backend Developer (Junior)',
      nama_perusahaan: 'Bengkel Koding UDINUS',
      alamat: 'Jl. Imam Bonjol No. 207, Semarang',
      kota: 'Semarang',
      email: 'bengkelkoding@dinus.ac.id',
      telepon: '024-3517261',
      website: 'https://bengkelkoding.dinus.ac.id',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: 'Lulusan Baru',
      gaji_min: 4000000,
      gaji_max: 5500000,
      tampilkan_gaji: true,
      tags: ['Laravel', 'PHP', 'MySQL'],
      deskripsi: 'Mengembangkan dan memelihara API LMS Bengkel Koding bersama tim pengembang.\n\nKualifikasi:\n- Lulusan baru atau pengalaman di bawah 1 tahun\n- Memahami Laravel dan RESTful API',
      masa_berlaku: '2026-12-10',
      status: 'Terverifikasi',
      oleh: 'koordinator',
      pengaju: 'Dr. Ayu Lestari',
      diajukan: '2026-10-10',
      alasan_penolakan: '',
      keterangan: ''
    },
    {
      id: 9,
      posisi: 'Backend Developer (Senior)',
      nama_perusahaan: 'Bengkel Koding UDINUS',
      alamat: 'Jl. Imam Bonjol No. 207, Semarang',
      kota: 'Semarang',
      email: 'bengkelkoding@dinus.ac.id',
      telepon: '024-3517261',
      website: 'https://bengkelkoding.dinus.ac.id',
      tipe_kerja: 'Penuh Waktu',
      kategori_lowongan: 'Lowongan Kerja',
      pengalaman: '3-5 Tahun',
      gaji_min: 9000000,
      gaji_max: 13000000,
      tampilkan_gaji: true,
      tags: ['Laravel', 'Go', 'Docker', 'PostgreSQL'],
      deskripsi: 'Memimpin pengembangan arsitektur backend LMS Bengkel Koding dan membimbing developer junior.\n\nKualifikasi:\n- Pengalaman backend 3-5 tahun\n- Menguasai Laravel atau Go, Docker, dan desain database',
      masa_berlaku: '2026-12-10',
      status: 'Terverifikasi',
      oleh: 'koordinator',
      pengaju: 'Dr. Ayu Lestari',
      diajukan: '2026-10-10',
      alasan_penolakan: '',
      keterangan: ''
    }
  ];

  const SEED_PENGUMUMAN = [
    {
      id: 1,
      judul: 'Pengisian Tracer Study Angkatan 2025',
      isi: 'Seluruh alumni purna tugas asisten lab lulusan 2025 dimohon memperbarui data status karir dan masa tunggu sebelum 30 November 2026.',
      target: 'Alumni',
      published: true,
      published_at: '2026-10-18',
      author: 'Dr. Ayu Lestari, M.Kom'
    },
    {
      id: 2,
      judul: 'Survei Kepuasan Pengguna Lulusan Mitra 2026',
      isi: 'Mitra industri dimohon meluangkan waktu 5 menit untuk mengisi survei kepuasan performa kerja alumni Bengkel Koding.',
      target: 'Mitra',
      published: true,
      published_at: '2026-10-10',
      author: 'Dr. Ayu Lestari, M.Kom'
    },
    {
      id: 3,
      judul: 'Kemitraan Rekrutmen Batch Ganjil 2026/2027',
      isi: 'Pendaftaran mitra industri baru untuk rekrutmen talenta asisten lab resmi dibuka.',
      target: 'Semua',
      published: true,
      published_at: '2026-10-05',
      author: 'Super Admin'
    }
  ];

  const SEED_KOORDINATOR = [
    { id: 1, nama: 'Dr. Ayu Lestari, M.Kom', nidn: '0612058501', email: 'ayu.lestari@dinus.ac.id', status: 'Aktif', divisi: 'Developer & Data Science', alumni_count: 250, ditugaskan: '2026-01-15' },
    { id: 2, nama: 'Bambang Nugroho, M.T', nidn: '0621098802', email: 'bambang.nugroho@dinus.ac.id', status: 'Aktif', divisi: 'Divisi Developer', alumni_count: 140, ditugaskan: '2026-02-01' },
    { id: 3, nama: 'Rina Puspitasari, M.Cs', nidn: '0614039101', email: 'rina.puspitasari@dinus.ac.id', status: 'Menunggu Undangan', divisi: 'Divisi Data Science', alumni_count: 110, ditugaskan: '2026-10-10' }
  ];

  const SEED_MITRA = [
    { id: 1, nama_perusahaan: 'PT Telkom Indonesia', bidang_usaha: 'Telekomunikasi & IT', kota: 'Bandung', email: 'hr@telkom.co.id', pic: 'Hendra Wijaya', telp: '0812-3456-7890', status_verifikasi: 'Terverifikasi', status_akun: 'Aktif', alumni: 6, alumni_count: 6, loker_count: 2, terdaftar: '2026-01-12' },
    { id: 2, nama_perusahaan: 'Gojek', bidang_usaha: 'Teknologi & Ride Hailing', kota: 'Jakarta', email: 'recruitment@gojek.com', pic: 'Maya Safitri', telp: '0812-9876-5432', status_verifikasi: 'Terverifikasi', status_akun: 'Aktif', alumni: 4, alumni_count: 4, loker_count: 1, terdaftar: '2026-01-20' },
    { id: 3, nama_perusahaan: 'CV Solusi Digital Jateng', bidang_usaha: 'Software House', kota: 'Semarang', email: 'hr@solusidigital.id', pic: 'Andi Kurniawan', telp: '0813-4567-8901', status_verifikasi: 'Terverifikasi', status_akun: 'Aktif', alumni: 2, alumni_count: 2, loker_count: 2, terdaftar: '2026-02-05' },
    { id: 4, nama_perusahaan: 'PT Data Nusantara', bidang_usaha: 'Big Data & AI Services', kota: 'Yogyakarta', email: 'contact@datanusantara.id', pic: 'Rina Pertiwi', telp: '0815-6789-0123', status_verifikasi: 'Belum Verifikasi', status_akun: 'Aktif', alumni: 1, alumni_count: 1, loker_count: 1, terdaftar: '2026-03-01' },
    { id: 5, nama_perusahaan: 'PT Abal Sejahtera', bidang_usaha: 'Konsultan IT', kota: 'Kudus', email: 'info@abalsejahtera.com', pic: 'Budi Santoso', telp: '0817-8901-2345', status_verifikasi: 'Ditolak', status_akun: 'Nonaktif', alumni: 0, alumni_count: 0, loker_count: 0, terdaftar: '2026-03-15' }
  ];

  const SEED_ALUMNI = [
    { id: 1, nama: 'Rizky Pratama', nim: 'A11.2019.11823', email: 'rizky.pratama@gmail.com', tahun_lulus: 2023, divisi: 'Divisi Developer', status: 'Bekerja Penuh Waktu', status_karir: 'Bekerja Penuh Waktu', status_pekerjaan: 'Sudah Bekerja', jenis_pekerjaan: 'Penuh Waktu', gender: 'Laki-laki', ipk: 3.72, kota_domisili: 'Semarang', nama_perusahaan: 'PT Telkom Indonesia', perusahaan: 'PT Telkom Indonesia', jabatan: 'Backend Engineer', status_akun: 'Aktif', terdaftar: '2026-01-10', izin_bagikan: true, skill: ['Laravel', 'Vue.js', 'MySQL', 'Git', 'RESTful API'] },
    { id: 2, nama: 'Nadia Putri', nim: 'A11.2019.11902', email: 'nadia.putri@gmail.com', tahun_lulus: 2023, divisi: 'Divisi Data Science', status: 'Bekerja Penuh Waktu', status_karir: 'Bekerja Penuh Waktu', status_pekerjaan: 'Sudah Bekerja', jenis_pekerjaan: 'Penuh Waktu', gender: 'Perempuan', ipk: 3.85, kota_domisili: 'Jakarta', nama_perusahaan: 'Gojek', perusahaan: 'Gojek', jabatan: 'Data Analyst', status_akun: 'Aktif', terdaftar: '2026-01-15', izin_bagikan: true, skill: ['Python', 'Data Analysis', 'SQL', 'Tableau', 'Power BI'] },
    { id: 3, nama: 'Fajar Nugroho', nim: 'A11.2020.12011', email: 'fajar.nugroho@gmail.com', tahun_lulus: 2024, divisi: 'Divisi Developer', status: 'Wirausaha', status_karir: 'Wirausaha', status_pekerjaan: 'Sudah Bekerja', jenis_pekerjaan: 'Penuh Waktu', gender: 'Laki-laki', ipk: 3.65, kota_domisili: 'Semarang', nama_perusahaan: 'Studio Kode Semarang', perusahaan: 'Studio Kode Semarang', jabatan: 'Founder & CEO', status_akun: 'Aktif', terdaftar: '2026-02-01', izin_bagikan: true, skill: ['Fullstack Web', 'Product Management', 'Go', 'React'] },
    { id: 4, nama: 'Salsa Ramadhani', nim: 'A11.2020.12088', email: 'salsa.ramadhani@gmail.com', tahun_lulus: 2024, divisi: 'Divisi Data Science', status: 'Melanjutkan Pendidikan', status_karir: 'Melanjutkan Pendidikan', status_pekerjaan: 'Belum Bekerja', jenis_pekerjaan: 'Studi Lanjut', gender: 'Perempuan', ipk: 3.92, kota_domisili: 'Yogyakarta', nama_perusahaan: 'Universitas Gadjah Mada', perusahaan: 'Universitas Gadjah Mada', jabatan: 'S2 Ilmu Komputer', status_akun: 'Aktif', terdaftar: '2026-02-12', izin_bagikan: true, skill: ['Deep Learning', 'PyTorch', 'Research', 'NLP'] },
    { id: 5, nama: 'Bagas Saputra', nim: 'A11.2021.13120', email: 'bagas.saputra@gmail.com', tahun_lulus: 2025, divisi: 'Divisi Developer', status: 'Mencari Pekerjaan', status_karir: 'Mencari Pekerjaan', status_pekerjaan: 'Mencari Pekerjaan', jenis_pekerjaan: 'Paruh Waktu', gender: 'Laki-laki', ipk: 3.48, kota_domisili: 'Semarang', nama_perusahaan: '-', perusahaan: '-', jabatan: '-', status_akun: 'Nonaktif', terdaftar: '2026-03-05', izin_bagikan: false, skill: ['Java', 'Spring Boot', 'MySQL'] },
    { id: 6, nama: 'Intan Maharani', nim: 'A11.2018.10544', email: 'intan.maharani@gmail.com', tahun_lulus: 2022, divisi: 'Divisi Developer', status: 'Bekerja Paruh Waktu', status_karir: 'Bekerja Paruh Waktu', status_pekerjaan: 'Sudah Bekerja', jenis_pekerjaan: 'Paruh Waktu', gender: 'Perempuan', ipk: 3.68, kota_domisili: 'Semarang', nama_perusahaan: 'Dicoding Academy', perusahaan: 'Dicoding Academy', jabatan: 'Code Reviewer', status_akun: 'Aktif', terdaftar: '2026-01-08', izin_bagikan: true, skill: ['Kotlin', 'Android Jetpack', 'Clean Architecture'] },
    { id: 7, nama: 'Dimas Arya', nim: 'A11.2018.10601', email: 'dimas.arya@gmail.com', tahun_lulus: 2022, divisi: 'Divisi Developer', status: 'Bekerja Penuh Waktu', status_karir: 'Bekerja Penuh Waktu', status_pekerjaan: 'Sudah Bekerja', jenis_pekerjaan: 'Penuh Waktu', gender: 'Laki-laki', ipk: 3.75, kota_domisili: 'Semarang', nama_perusahaan: 'Bank BCA', perusahaan: 'Bank BCA', jabatan: 'Mobile Developer', status_akun: 'Aktif', terdaftar: '2026-01-18', izin_bagikan: true, skill: ['iOS', 'Swift', 'SwiftUI', 'CI/CD'] },
    { id: 8, nama: 'Ananda Wulan', nim: 'A11.2021.13301', email: 'ananda.wulan@gmail.com', tahun_lulus: 2025, divisi: 'Divisi Data Science', status: 'Bekerja Penuh Waktu', status_karir: 'Bekerja Penuh Waktu', status_pekerjaan: 'Sudah Bekerja', jenis_pekerjaan: 'Penuh Waktu', gender: 'Perempuan', ipk: 3.88, kota_domisili: 'Jakarta', nama_perusahaan: 'Tokopedia', perusahaan: 'Tokopedia', jabatan: 'Frontend Engineer', status_akun: 'Aktif', terdaftar: '2026-03-10', izin_bagikan: true, skill: ['Next.js', 'React', 'GraphQL', 'Tailwind CSS'] }
  ];

  const SEED_LOGS = [
    { id: 1, waktu: '2026-10-22 09:15', user: 'Super Admin', role: 'SuperAdmin', action: 'Penugasan Koordinator', detail: 'Menugaskan Dr. Ayu Lestari, M.Kom sebagai Koordinator Divisi Dev & DS', ip: '10.14.0.1', status: 'Sukses' },
    { id: 2, waktu: '2026-10-21 15:40', user: 'Dr. Ayu Lestari', role: 'Koordinator', action: 'Verifikasi Lowongan', detail: 'Menyetujui lowongan Backend Developer (Laravel) dari PT Solusi Digital Jateng', ip: '10.14.0.12', status: 'Sukses' },
    { id: 3, waktu: '2026-10-21 14:10', user: 'Andi Kurniawan', role: 'Mitra', action: 'Pengajuan Lowongan', detail: 'Mengajukan lowongan Frontend Developer (React)', ip: '192.168.1.45', status: 'Sukses' },
    { id: 4, waktu: '2026-10-20 11:20', user: 'Dr. Ayu Lestari', role: 'Koordinator', action: 'Tolak Lowongan', detail: 'Menolak lowongan Mobile Developer Flutter (alasan: deskripsi kurang lengkap)', ip: '10.14.0.12', status: 'Sukses' },
    { id: 5, waktu: '2026-10-18 10:30', user: 'Dr. Ayu Lestari', role: 'Koordinator', action: 'Publikasi Pengumuman', detail: 'Menerbitkan pengumuman "Pengisian Tracer Study Angkatan 2025"', ip: '10.14.0.12', status: 'Sukses' },
    { id: 6, waktu: '2026-10-15 08:30', user: 'Super Admin', role: 'SuperAdmin', action: 'Verifikasi Mitra', detail: 'Memverifikasi profil kemitraan PT Solusi Digital Jateng', ip: '10.14.0.1', status: 'Sukses' }
  ];

  const SEED_FORUM = [
    {
      id: 1,
      judul: 'Tips Menulis JD yang Menarik untuk Fresh Graduate',
      penulis: 'Andi Kurniawan',
      peran: 'Mitra',
      waktu: '2026-10-19T09:30:00',
      tags: ['Rekrutmen', 'Tips'],
      disukai: ['Rizky Pratama', 'Hendra Wijaya', 'Maya Safitri', 'Dr. Ayu Lestari, M.Kom'],
      dibagikan: 3,
      isi: 'Halo rekan mitra dan adik-adik alumni, saya ingin berbagi pengalaman dalam menulis job description yang menarik serta jelas bagi fresh graduate. Kuncinya adalah transparansi ekspektasi tech stack dan jenjang bimbingan mentor di awal kerja.',
      comments: [
        {
          id: 101,
          penulis: 'Rizky Pratama',
          peran: 'Alumni',
          waktu: '2026-10-19T10:15:00',
          isi: 'Sangat setuju Pak Andi! Pencantuman tech stack spesifik dan benefit bimbingan senior di awal sangat membantu fresh graduate agar lebih percaya diri saat melamar.'
        },
        {
          id: 102,
          penulis: 'Dr. Ayu Lestari, M.Kom',
          peran: 'Koordinator',
          waktu: '2026-10-19T11:00:00',
          isi: 'Terima kasih sharing-nya Pak Andi. Kami di laboratorium Bengkel Koding juga selalu mengarahkan asisten lab purna tugas agar terbiasa membaca kualifikasi teknis industri secara cermat.'
        },
        {
          id: 103,
          penulis: 'Hendra Wijaya',
          peran: 'Mitra',
          waktu: '2026-10-19T14:20:00',
          isi: 'Kami di Telkom juga memisahkan antara kualifikasi utama (must-have) dan nilai tambah (nice-to-have) agar kandidat potensial tidak ragu untuk mendaftar.'
        }
      ]
    },
    {
      id: 2,
      judul: 'Sharing: Pengalaman Onboarding Alumni Bengkel Koding',
      penulis: 'Maya Safitri',
      peran: 'Mitra',
      waktu: '2026-10-16T14:00:00',
      tags: ['Onboarding', 'Pengalaman'],
      disukai: ['Nadia Putri', 'Dr. Ayu Lestari, M.Kom', 'Dimas Arya', 'Andi Kurniawan', 'Hendra Wijaya'],
      dibagikan: 5,
      isi: 'Tahun ini kami menerima 3 alumni asisten lab Bengkel Koding di Gojek. Pengalaman onboarding mereka sangat positif karena sudah terbiasa dengan standard Git workflow dan code review.',
      comments: [
        {
          id: 201,
          penulis: 'Nadia Putri',
          peran: 'Alumni',
          waktu: '2026-10-16T15:10:00',
          isi: 'Terima kasih banyak Bu Maya atas kesempatannya! Kultur engineering dan mentoring di tim data sangat mendukung kami untuk terus berkembang.'
        },
        {
          id: 202,
          penulis: 'Dr. Ayu Lestari, M.Kom',
          peran: 'Koordinator',
          waktu: '2026-10-16T16:30:00',
          isi: 'Alhamdulillah, bangga sekali mendengar kabar ini. Terima kasih kepada Gojek yang selalu membuka pintu kolaborasi bagi talenta asisten lab UDINUS.'
        },
        {
          id: 203,
          penulis: 'Dimas Arya',
          peran: 'Alumni',
          waktu: '2026-10-17T09:00:00',
          isi: 'Kebiasaan hands-on problem solving di lab memang sangat terasa dampaknya saat masuk ke codebase skala produksi.'
        }
      ]
    },
    {
      id: 3,
      judul: 'Tips Lolos Interview Backend di Startup Tech',
      penulis: 'Rizky Pratama',
      peran: 'Alumni',
      waktu: '2026-10-19T10:00:00',
      tags: ['Karir', 'Interview'],
      disukai: ['Fajar Nugroho', 'Andi Kurniawan', 'Bagas Saputra'],
      dibagikan: 2,
      isi: 'Berikut tips yang berhasil saya gunakan saat wawancara teknis: kuasai indexing database, transaction isolation, serta pemahaman arsitektur RESTful API yang bersih.',
      comments: [
        {
          id: 301,
          penulis: 'Andi Kurniawan',
          peran: 'Mitra',
          waktu: '2026-10-19T11:45:00',
          isi: 'Poin optimasi query dan integritas transaksi ACID itu krusial sekali, terutama saat menangani beban data tinggi.'
        },
        {
          id: 302,
          penulis: 'Fajar Nugroho',
          peran: 'Alumni',
          waktu: '2026-10-19T13:20:00',
          isi: 'Mantap insight-nya Mas Rizky! Sangat bermanfaat untuk adik-adik asisten yang bersiap wisuda.'
        }
      ]
    },
    {
      id: 4,
      judul: 'Sharing Standar Kompensasi Fresh Graduate IT di Semarang',
      penulis: 'Intan Maharani',
      peran: 'Alumni',
      waktu: '2026-10-16T11:00:00',
      tags: ['Gaji', 'Karir'],
      disukai: ['Bagas Saputra', 'Andi Kurniawan'],
      dibagikan: 1,
      isi: 'Berdasarkan survei kecil rekan-rekan angkatan 2022-2024, range gaji fresh graduate IT di area Semarang berada di kisaran Rp 3.5jt - Rp 5.5jt tergantung spesialisasi dan portofolio.',
      comments: [
        {
          id: 401,
          penulis: 'Bagas Saputra',
          peran: 'Alumni',
          waktu: '2026-10-16T12:05:00',
          isi: 'Untuk entry level di Semarang angka tersebut sudah cukup bersaing, apalagi jika disertai benefit BPJS dan laptop kerja.'
        },
        {
          id: 402,
          penulis: 'Andi Kurniawan',
          peran: 'Mitra',
          waktu: '2026-10-16T13:30:00',
          isi: 'Betul, di software house kami standar awal fresh grad juga di kisaran tersebut dengan peninjauan performa berkala per semester.'
        }
      ]
    },
    {
      id: 5,
      judul: 'Rekomendasi Kursus & Sertifikasi Data Science Gratis',
      penulis: 'Salsa Ramadhani',
      peran: 'Alumni',
      waktu: '2026-10-12T08:00:00',
      tags: ['Belajar', 'Data Science'],
      disukai: ['Nadia Putri', 'Dr. Ayu Lestari, M.Kom', 'Ananda Wulan'],
      dibagikan: 4,
      isi: 'Bagi rekan-rekan Divisi Data Science yang ingin memperdalam Machine Learning, saya merekomendasikan Kaggle Learn, Google Career Certificates, dan DeepLearning.AI.',
      comments: [
        {
          id: 501,
          penulis: 'Nadia Putri',
          peran: 'Alumni',
          waktu: '2026-10-12T09:15:00',
          isi: 'Tambahan juga: hands-on di dataset publik Kaggle sangat membantu saat menyusun portofolio capstone.'
        },
        {
          id: 502,
          penulis: 'Dr. Ayu Lestari, M.Kom',
          peran: 'Koordinator',
          waktu: '2026-10-12T10:40:00',
          isi: 'Bagus sekali Salsa. Rekomendasi ini akan kami masukkan juga ke panduan materi mandiri asisten lab semester ini.'
        }
      ]
    }
  ];

  function normalisasiStatusKarir(val) {
    if (!val) return 'Mencari Pekerjaan';
    if (val === 'Bekerja Full Time') return 'Bekerja Penuh Waktu';
    if (val === 'Bekerja Part Time') return 'Bekerja Paruh Waktu';
    return val;
  }

  function normalisasiTipeKerja(val) {
    if (!val) return 'Penuh Waktu';
    if (val === 'Full Time') return 'Penuh Waktu';
    if (val === 'Part Time') return 'Paruh Waktu';
    if (val === 'Remote') return 'Jarak Jauh';
    return val;
  }

  function normalisasiKategori(val) {
    return val === 'Magang' || val === 'Lowongan Magang' ? 'Lowongan Magang' : 'Lowongan Kerja';
  }

  window.BengkodStore = {
    // --- LOWONGAN ---
    getLowongan() {
      const list = lsGet(KEYS.LOWONGAN, SEED_LOWONGAN);
      return list.map(l => {
        const tipe = normalisasiTipeKerja(l.tipe_kerja);
        let st = l.status || 'Belum Verifikasi';
        if (st === 'Aktif') st = 'Terverifikasi';
        if (st === 'Menunggu Persetujuan') st = 'Belum Verifikasi';
        // kategori didahulukan: form mitra & koordinator menulis kategori, kategori_lowongan bisa basi setelah edit
        const kat = normalisasiKategori(l.kategori || l.kategori_lowongan);
        return {
          ...l,
          tipe_kerja: tipe,
          status: st,
          kategori_lowongan: kat,
          kategori: kat === 'Lowongan Magang' ? 'Magang' : 'Kerja'
        };
      });
    },
    saveLowongan(list) {
      lsSet(KEYS.LOWONGAN, list);
      window.dispatchEvent(new CustomEvent('bengkod:lowongan-updated', { detail: list }));
    },
    addLowongan(item) {
      const list = this.getLowongan();
      const newId = list.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
      const created = {
        id: newId,
        posisi: item.posisi || 'Posisi Baru',
        nama_perusahaan: item.nama_perusahaan || 'PT Solusi Digital Jateng',
        alamat: item.alamat || 'Jl. Pemuda No. 120, Semarang',
        kota: item.kota || 'Semarang',
        email: item.email || 'hr@solusidigital.id',
        telepon: item.telepon || '024-7612345',
        website: item.website || 'https://solusidigital.id',
        tipe_kerja: normalisasiTipeKerja(item.tipe_kerja),
        kategori_lowongan: normalisasiKategori(item.kategori || item.kategori_lowongan),
        pengalaman: item.pengalaman || 'Lulusan Baru',
        gaji_min: Number(item.gaji_min) || 0,
        gaji_max: Number(item.gaji_max) || 0,
        tampilkan_gaji: item.tampilkan_gaji !== false,
        tags: Array.isArray(item.tags) ? item.tags : (item.tags || '').split(',').map(t => t.trim()).filter(Boolean),
        deskripsi: item.deskripsi || '',
        masa_berlaku: item.masa_berlaku || new Date(Date.now() + 30*86400000).toISOString().slice(0, 10),
        status: item.status || 'Belum Verifikasi', // 'Belum Verifikasi' | 'Terverifikasi' | 'Ditolak' | 'Draft'
        oleh: item.oleh || 'mitra',
        pengaju: item.pengaju || 'Andi Kurniawan',
        diajukan: item.diajukan || new Date().toISOString().slice(0, 10),
        alasan_penolakan: item.alasan_penolakan || '',
        keterangan: item.keterangan || ''
      };
      list.unshift(created);
      this.saveLowongan(list);
      this.logActivity('Mitra', 'Pengajuan Lowongan', `Mengajukan lowongan "${created.posisi}"`);
      return created;
    },
    updateLowonganStatus(id, newStatus, alasan = '') {
      const list = this.getLowongan();
      const item = list.find(l => l.id === id);
      if (item) {
        item.status = newStatus;
        if (alasan) {
          item.alasan_penolakan = alasan;
          item.keterangan = alasan;
        }
        this.saveLowongan(list);
        this.logActivity('Koordinator', newStatus === 'Terverifikasi' ? 'Verifikasi Lowongan' : 'Tolak Lowongan',
          `${newStatus === 'Terverifikasi' ? 'Menyetujui' : 'Menolak'} lowongan "${item.posisi}" dari ${item.nama_perusahaan}`);
      }
      return item;
    },

    // --- PENGUMUMAN ---
    getPengumuman(target = null) {
      const list = lsGet(KEYS.PENGUMUMAN, SEED_PENGUMUMAN);
      if (!target) return list;
      return list.filter(p => p.published && (p.target === target || p.target === 'Semua' || p.target === 'Alumni & Mitra'));
    },
    savePengumuman(list) {
      lsSet(KEYS.PENGUMUMAN, list);
      window.dispatchEvent(new CustomEvent('bengkod:pengumuman-updated', { detail: list }));
    },
    addPengumuman(item) {
      const list = lsGet(KEYS.PENGUMUMAN, SEED_PENGUMUMAN);
      const newId = list.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
      const created = {
        id: newId,
        judul: item.judul,
        isi: item.isi,
        target: item.target || 'Semua',
        published: item.published !== false,
        published_at: item.published_at || new Date().toISOString().slice(0, 10),
        author: item.author || 'Dr. Ayu Lestari, M.Kom'
      };
      list.unshift(created);
      this.savePengumuman(list);
      this.logActivity('Koordinator', 'Publikasi Pengumuman', `Menerbitkan pengumuman "${created.judul}" (Target: ${created.target})`);
      return created;
    },

    // --- KOORDINATOR ---
    getKoordinator() {
      return lsGet(KEYS.KOORDINATOR, SEED_KOORDINATOR);
    },
    saveKoordinator(list) {
      lsSet(KEYS.KOORDINATOR, list);
      window.dispatchEvent(new CustomEvent('bengkod:koordinator-updated', { detail: list }));
    },
    getActiveKoordinator() {
      const list = this.getKoordinator();
      return list.find(k => k.status === 'Aktif') || list[0];
    },

    // --- MITRA ---
    getMitra() {
      const list = lsGet(KEYS.MITRA, SEED_MITRA);
      const allAlumni = this.getAlumni();
      return list.map(m => {
        const matchingAlumni = allAlumni.filter(a => (a.nama_perusahaan || a.perusahaan || '').toLowerCase().includes((m.nama_perusahaan || '').toLowerCase())).length;
        const count = m.alumni != null ? m.alumni : (m.alumni_count != null ? m.alumni_count : matchingAlumni);
        return {
          ...m,
          alumni: count,
          alumni_count: count
        };
      });
    },
    saveMitra(list) {
      lsSet(KEYS.MITRA, list);
      window.dispatchEvent(new CustomEvent('bengkod:mitra-updated', { detail: list }));
    },
    updateMitraStatus(id, statusAkun, statusVerifikasi) {
      const list = this.getMitra();
      const m = list.find(x => x.id === id);
      if (m) {
        if (statusAkun) m.status_akun = statusAkun;
        if (statusVerifikasi) m.status_verifikasi = statusVerifikasi;
        this.saveMitra(list);
        this.logActivity('SuperAdmin', 'Update Status Mitra', `Memperbarui status mitra ${m.nama_perusahaan}: ${statusAkun || statusVerifikasi}`);
      }
      return m;
    },

    // --- ALUMNI ---
    getAlumni() {
      const list = lsGet(KEYS.ALUMNI, SEED_ALUMNI);
      return list.map(a => {
        const sk = normalisasiStatusKarir(a.status_karir || a.status);
        const per = a.nama_perusahaan || a.perusahaan || '-';
        return {
          ...a,
          status: sk,
          status_karir: sk,
          nama_perusahaan: per,
          perusahaan: per,
          jabatan: a.jabatan || '-'
        };
      });
    },
    saveAlumni(list) {
      lsSet(KEYS.ALUMNI, list);
      window.dispatchEvent(new CustomEvent('bengkod:alumni-updated', { detail: list }));
    },
    updateAlumniStatus(id, statusAkun) {
      const list = this.getAlumni();
      const a = list.find(x => x.id === id);
      if (a) {
        a.status_akun = statusAkun;
        this.saveAlumni(list);
        this.logActivity('SuperAdmin', 'Update Status Alumni', `Mengubah status akun alumni ${a.nama} menjadi ${statusAkun}`);
      }
      return a;
    },

    // --- FORUM & KOMENTAR ---
    getForum() {
      const list = lsGet(KEYS.FORUM, SEED_FORUM);
      return list.map(f => ({
        ...f,
        komentar: Array.isArray(f.comments) ? f.comments.length : (f.komentar || 0),
        comments: Array.isArray(f.comments) ? f.comments : []
      }));
    },
    saveForum(list) {
      lsSet(KEYS.FORUM, list);
      window.dispatchEvent(new CustomEvent('bengkod:forum-updated', { detail: list }));
    },
    addForumThread(item) {
      const list = this.getForum();
      const newId = list.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
      const created = {
        id: newId,
        judul: item.judul,
        isi: item.isi,
        tags: Array.isArray(item.tags) ? item.tags : (item.tags || '').split(',').map(t => t.trim()).filter(Boolean).slice(0, 3),
        penulis: item.penulis || 'Pengguna',
        peran: item.peran || 'Mitra',
        waktu: new Date().toISOString(),
        comments: []
      };
      list.unshift(created);
      this.saveForum(list);
      this.logActivity(created.peran, 'Buat Diskusi Forum', `Menerbitkan thread "${created.judul}"`);
      return created;
    },
    addForumComment(threadId, comment) {
      const list = this.getForum();
      const thread = list.find(t => t.id === Number(threadId));
      if (!thread) return null;
      if (!Array.isArray(thread.comments)) thread.comments = [];
      const newCommentId = Date.now();
      const newComment = {
        id: newCommentId,
        penulis: comment.penulis || 'Pengguna',
        peran: comment.peran || 'Mitra',
        waktu: new Date().toISOString(),
        isi: comment.isi || ''
      };
      thread.comments.push(newComment);
      thread.komentar = thread.comments.length;
      this.saveForum(list);
      this.logActivity(newComment.peran, 'Komentar Forum', `Mengomentari thread "${thread.judul}"`);
      return newComment;
    },
    deleteForumThread(threadId) {
      let list = this.getForum();
      const target = list.find(t => t.id === Number(threadId));
      list = list.filter(t => t.id !== Number(threadId));
      this.saveForum(list);
      if (target) {
        this.logActivity('Koordinator', 'Hapus Thread Forum', `Menghapus thread "${target.judul}"`);
      }
      return list;
    },

    // --- ACTIVITY LOGS ---
    getLogs() {
      return lsGet(KEYS.LOGS, SEED_LOGS);
    },
    logActivity(role, action, detail, status = 'Sukses') {
      const logs = this.getLogs();
      const now = new Date();
      const waktuStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const user = role === 'SuperAdmin' ? 'Super Admin' : role === 'Koordinator' ? (this.getActiveKoordinator().nama) : 'Andi Kurniawan (Mitra)';
      const entry = {
        id: Date.now(),
        waktu: waktuStr,
        user,
        role,
        action,
        detail,
        ip: '10.14.0.1',
        status
      };
      logs.unshift(entry);
      if (logs.length > 50) logs.pop();
      lsSet(KEYS.LOGS, logs);
      window.dispatchEvent(new CustomEvent('bengkod:logs-updated', { detail: logs }));
      return entry;
    }
  };
})();
