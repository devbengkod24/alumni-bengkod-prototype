/**
 * Data contoh dan penyimpanan prototype (localStorage browser).
 * Bentuk tabelnya mengikuti database alumni-monolight. Semua nama dan angka fiktif.
 */
(function () {
  // v5: beranda (karya dan referral), gigs, portofolio, dan status karir ganda.
  // v4 dilewati karena ada browser yang menyimpannya saat file ini masih setengah diubah.
  const KEY_DATA = 'alumni_revisi_data_v5';
  const KEY_LAMA = 'alumni_revisi_data_v3';
  const KEY_SESI = 'alumni_revisi_sesi_v1';
  const SANDI_ALUMNI = 'alumni123';

  const STATUS = [
    'Bekerja Full Time',
    'Bekerja Part Time',
    'Wiraswasta',
    'Melanjutkan Pendidikan',
    'Tidak Bekerja Tetapi Sedang Mencari Pekerjaan',
    'Belum Memungkinkan Bekerja',
    'Menikah/Mengurus Keluarga',
  ];
  const STATUS_BEKERJA = STATUS.slice(0, 3);
  const STATUS_STUDI = STATUS[3];
  const STATUS_TIDAK_BEKERJA = STATUS.slice(4);

  const OPSI = {
    jns_kelamin: ['Laki-Laki', 'Perempuan'],
    bidang_job: ['Infokom', 'Non Infokom'],
    jns_job: ['Perusahaan Swasta', 'Perusahaan Nirlaba', 'Institusi/Organisasi Multilateral', 'Lembaga Pemerintah', 'BUMN/BUMD', 'Wirausaha'],
    jabatan_job: ['Founder', 'Co-Founder', 'Staff', 'Freelance'],
    lingkup_job: ['Lokal/Wilayah Tidak Berbadan Hukum', 'Lokal/Wilayah Berbadan Hukum', 'Nasional', 'Multinasional', 'Internasional'],
    biaya_studi: ['Sendiri', 'Beasiswa'],
    tingkat: ['Lokal', 'Nasional', 'Internasional'],
    kemampuan: ['Sangat Baik', 'Baik', 'Cukup', 'Kurang'],
    kategori_forum: ['Karier', 'Teknologi', 'Studi Lanjut', 'Wirausaha', 'Kampus dan Komunitas'],
    jenis_forum: ['tanya', 'diskusi', 'polling'],
    alasan_laporan: ['Spam', 'Pelecehan', 'Tidak Relevan', 'Lainnya'],
    jenis_post: ['pengalaman', 'kegiatan', 'karya', 'referral'],
    tahap_karya: ['beta', 'live'],
    fokus_review: ['Bug', 'UI/UX', 'Beban Server', 'Auth'],
    kategori_feedback: ['Bug', 'UI/UX', 'Arsitektur/Performa', 'Apresiasi'],
    level_referral: ['Magang/Freshgrad', 'Junior (1-2 tahun)', 'Mid'],
    format_cv: ['ats', 'modern'],
    peran_gig: ['Frontend', 'Backend', 'Mobile', 'UI/UX', 'QA'],
    budget_gig: ['< Rp 1 Juta', 'Rp 1 Juta - Rp 3 Juta', 'Rp 3 Juta - Rp 5 Juta', '> Rp 5 Juta', 'Bagi Hasil / Equity'],
  };

  const diskusiBaru = isi => ({ gambar: '', diubah: '', suka: [], disimpan: [], dilihat: 0, sematkan: false, kunci: false, disembunyikan: '', id_jawaban: null, undangan: [], opsi: [], balasan: [], ...isi });
  const balasanBaru = isi => ({ id_induk: null, id_tujuan: null, diubah: '', suka: [], disembunyikan: '', ...isi });
  // Gambar postingan contoh, relatif terhadap halaman di folder alumni/
  const GAMBAR_CONTOH = { 1: '../assets/images/register-panel.png', 4: 'assets/img/antreklinik.svg', 5: 'assets/img/kasrt.svg' };
  const postBaru = isi => ({ jenis: 'pengalaman', gambar: '', suka: [], komentar: [], tag: [], ...isi });

  // Postingan tambahan agar profil alumni punya beberapa isi feed. Ditambahkan ke data yang sudah tersimpan,
  // kunci menjaga agar tidak tercatat dua kali. id_alumni 29 Ananda Anggraini, 3 Nadia Ramadhani, 4 Fajar Saputra.
  const POSTINGAN_TAMBAHAN = [
    {
      kunci: 'tambahan-29-1', gambar: 'assets/img/design-system.svg', id_alumni: 29, jenis: 'pengalaman', waktu: '2026-11-03T09:15:00', suka: [2, 3, 9],
      isi: 'Tiga bulan terakhir saya merapikan design system di kantor. Pelajaran terbesarnya: mulai dari komponen yang paling sering dipakai seperti tombol, input, dan kartu, baru menyusul yang jarang. Dokumentasi singkat di Figma ternyata lebih sering dibaca developer daripada dokumen panjang.',
      komentar: [
        { id: 1, id_alumni: 2, isi: 'Setuju, tim backend kami juga lebih cepat paham kalau contohnya langsung ada di Figma.', waktu: '2026-11-03T10:02:00' },
        { id: 2, id_alumni: 3, isi: 'Boleh minta contoh struktur halaman dokumentasinya, Kak?', waktu: '2026-11-03T11:40:00' },
      ],
    },
    {
      kunci: 'tambahan-29-2', gambar: 'assets/img/workshop-ux.svg', id_alumni: 29, jenis: 'kegiatan', waktu: '2026-10-26T14:00:00', suka: [4, 6],
      isi: 'Akhir pekan kemarin saya mengisi sesi "Riset Pengguna Sederhana untuk Proyek Kampus" di Kudus. Pesertanya mencoba wawancara lima pengguna dalam satu jam, lalu menyusun temuan pakai affinity map. Terima kasih untuk panitia dan teman-teman yang datang.',
      komentar: [
        { id: 1, id_alumni: 4, isi: 'Materinya kepakai banget buat tugas akhir adik tingkat.', waktu: '2026-10-26T16:30:00' },
      ],
    },
    {
      kunci: 'tambahan-29-3', id_alumni: 29, jenis: 'pengalaman', waktu: '2026-10-12T19:45:00', suka: [3],
      isi: 'Untuk teman-teman yang sedang menyusun portofolio UI/UX: tampilkan proses, bukan hanya hasil akhir. Cukup tiga studi kasus yang jelas masalah, riset, dan alasannya, itu jauh lebih kuat daripada sepuluh mockup tanpa cerita.',
    },
    {
      kunci: 'tambahan-3-1', gambar: 'assets/img/migrasi-typescript.svg', id_alumni: 3, jenis: 'pengalaman', waktu: '2026-11-02T20:10:00', suka: [2, 29],
      isi: 'Baru selesai migrasi dashboard internal dari JavaScript ke TypeScript. Bug karena salah tipe data turun jauh, dan review kode jadi lebih cepat karena struktur datanya kelihatan dari awal.',
      komentar: [
        { id: 1, id_alumni: 29, isi: 'Keren! Butuh berapa lama migrasinya?', waktu: '2026-11-02T21:00:00' },
      ],
    },
    {
      kunci: 'tambahan-3-2', gambar: 'assets/img/kelas-react.svg', id_alumni: 3, jenis: 'kegiatan', waktu: '2026-10-15T08:30:00', suka: [4],
      isi: 'Hari ini ikut jadi mentor di kelas React untuk adik tingkat di Bengkel Koding. Senang lihat semangat mereka bikin komponen pertama dengan Tailwind CSS.',
    },
    {
      kunci: 'tambahan-4-1', id_alumni: 4, jenis: 'pengalaman', waktu: '2026-10-30T18:20:00', suka: [2, 3, 29],
      isi: 'Kuliah S2 sambil tetap mengerjakan proyek Flutter ternyata bisa, asal jadwalnya disiplin. Saya pakai pagi untuk kuliah dan tugas, malam untuk ngoding. Firebase sangat membantu karena tidak perlu urus server sendiri.',
      komentar: [
        { id: 1, id_alumni: 2, isi: 'Mantap, semangat studinya, Fajar.', waktu: '2026-10-30T19:00:00' },
      ],
    },
    {
      kunci: 'tambahan-4-2', gambar: 'assets/img/proposal-tesis.svg', id_alumni: 4, jenis: 'kegiatan', waktu: '2026-10-08T13:00:00', suka: [6],
      isi: 'Presentasi proposal tesis tentang aplikasi mobile untuk UMKM sudah lewat. Masih banyak revisi, tapi arahnya sudah jelas. Doakan lancar sampai sidang ya.',
    },
  ];
  // Tanggal lokal dalam format YYYY-MM-DD (format bawaan locale sv-SE)
  const hariIni = () => new Date().toLocaleDateString('sv-SE');
  const nanti = hari => new Date(Date.now() + hari * 864e5).toLocaleDateString('sv-SE');

  // ===================== DATA CONTOH FORUM =====================
  function dataForumAwal() {
    const JUDUL_WAWANCARA = 'Apa saja yang perlu disiapkan untuk wawancara backend?';
    const JUDUL_AI = 'Asisten AI di tempat kerja, membantu atau bikin ketergantungan?';

    return {
      forum: [
        diskusiBaru({
          id: 1, id_user: 1, jenis: 'diskusi', kategori: 'Kampus dan Komunitas', waktu: '2026-10-01T09:00:00',
          judul: 'Selamat datang di Forum Alumni, baca ini dulu',
          isi: 'Forum ini tempat alumni Bengkel Koding bertanya dan berbagi pengalaman. Agar tetap nyaman:\n\n1. Pilih kategori yang sesuai dan tulis judul yang jelas.\n2. Cek diskusi serupa sebelum bertanya.\n3. Jaga bahasa dan jangan membagikan data pribadi orang lain.\n4. Tandai jawaban yang menyelesaikan masalah Anda.\n\nKonten yang melanggar bisa dilaporkan dan akan ditinjau koordinator.',
          sematkan: true, kunci: true, dilihat: 96, suka: [2, 4, 5, 8],
        }),
        diskusiBaru({
          id: 2, id_user: 10, jenis: 'tanya', kategori: 'Karier', waktu: '2026-10-26T19:20:00',
          judul: JUDUL_WAWANCARA,
          isi: 'Minggu depan saya ikut wawancara backend untuk pertama kali. Materi apa yang paling sering ditanyakan, dan bagaimana cara latihannya? #wawancara #backend',
          id_jawaban: 1, dilihat: 64, suka: [2, 4, 6, 7, 12], disimpan: [7],
          balasan: [
            balasanBaru({ id: 1, id_user: 2, waktu: '2026-10-26T20:02:00', suka: [4, 6, 10, 12], isi: 'Tiga hal yang hampir selalu ditanyakan: indeks database, transaksi, dan rancangan API. Latihan paling efektif adalah menjelaskan satu proyek sendiri dari awal sampai deploy, karena pewawancara biasanya menggali dari situ.' }),
            balasanBaru({ id: 2, id_user: 4, id_induk: 1, id_tujuan: 2, waktu: '2026-10-26T21:15:00', suka: [2, 10], isi: 'Setuju. Tambahan dari saya, siapkan juga contoh bug paling sulit yang pernah Anda selesaikan.' }),
            balasanBaru({ id: 3, id_user: 12, waktu: '2026-10-27T08:40:00', suka: [10], isi: 'Kalau ada tes langsung, biasanya diminta membuat CRUD sederhana dengan validasi. Latih sampai bisa selesai dalam 30 menit.' }),
          ],
        }),
        diskusiBaru({
          id: 3, id_user: 3, jenis: 'tanya', kategori: 'Studi Lanjut', waktu: '2026-11-01T10:30:00',
          judul: 'Beasiswa S2 dalam negeri apa yang cocok untuk lulusan Informatika?',
          isi: 'Saya ingin lanjut S2 tahun depan sambil tetap bekerja. Ada rekomendasi beasiswa dan kampus yang kelasnya fleksibel? #s2 #beasiswa',
          dilihat: 18, suka: [6, 9],
        }),
        diskusiBaru({
          id: 4, id_user: 7, jenis: 'tanya', kategori: 'Teknologi', waktu: '2026-10-30T14:05:00',
          judul: 'Laravel di VPS 1 GB, lebih baik Nginx atau Apache?',
          isi: 'Aplikasi Laravel di kantor akan dipindah ke VPS 1 GB. Mana yang lebih hemat memori untuk kondisi ini, Nginx dengan PHP-FPM atau Apache? #laravel #deploy',
          dilihat: 41, suka: [12],
          balasan: [
            balasanBaru({ id: 1, id_user: 6, waktu: '2026-10-30T16:30:00', suka: [7], isi: 'Saya memakai Nginx dengan PHP-FPM di VPS 2 GB dan cukup stabil. Untuk 1 GB, batasi jumlah worker PHP-FPM dan tambahkan swap.' }),
          ],
        }),
        diskusiBaru({
          id: 5, id_user: 1, jenis: 'polling', kategori: 'Kampus dan Komunitas', waktu: '2026-10-28T09:00:00',
          judul: 'Topik webinar alumni bulan Desember',
          isi: 'Hasil polling ini dipakai untuk menentukan topik webinar bersama program studi.',
          dilihat: 73, suka: [11, 12],
          opsi: [
            { id: 1, teks: 'Persiapan karier di bidang AI', suara: [4, 6, 8, 9, 11] },
            { id: 2, teks: 'Manajemen proyek perangkat lunak', suara: [12, 15] },
            { id: 3, teks: 'Beasiswa dan studi lanjut', suara: [3, 7, 13] },
            { id: 4, teks: 'Memulai usaha digital', suara: [5, 14] },
          ],
        }),
        diskusiBaru({
          id: 6, id_user: 5, jenis: 'diskusi', kategori: 'Wirausaha', waktu: '2026-10-22T08:15:00',
          judul: 'Cara menentukan harga proyek freelance pertama',
          isi: 'Saya sering bingung menentukan harga proyek website untuk UMKM. Teman-teman biasanya menghitung per jam, per fitur, atau harga paket? #freelance',
          dilihat: 52, suka: [7, 13, 14],
          balasan: [
            balasanBaru({ id: 1, id_user: 14, waktu: '2026-10-22T10:10:00', suka: [5, 7], isi: 'Saya memakai harga paket per fitur, lalu menambahkan biaya jika revisi lebih dari dua kali. Klien lebih mudah memahami hasil akhirnya.' }),
            balasanBaru({ id: 2, id_user: 13, waktu: '2026-10-23T09:00:00', suka: [5], isi: 'Jangan lupa tulis batas pekerjaan di awal supaya revisi tidak melebar.' }),
            balasanBaru({ id: 3, id_user: 16, waktu: '2026-10-23T20:20:00', isi: 'Kalau untuk toko online, saya lebih suka pembayaran bertahap per tahap pekerjaan.' }),
          ],
        }),
        diskusiBaru({
          id: 7, id_user: 2, jenis: 'diskusi', kategori: 'Teknologi', waktu: '2026-10-31T16:40:00',
          judul: JUDUL_AI,
          isi: 'Di tim saya sebagian kode awal sudah dibantu asisten AI. Pekerjaan lebih cepat, tetapi review jadi lebih berat. Bagaimana pengalaman di tempat kerja teman-teman? #ai',
          dilihat: 37, suka: [4, 6, 9],
          balasan: [
            balasanBaru({ id: 1, id_user: 9, waktu: '2026-10-31T18:05:00', suka: [2, 6], isi: 'Di tempat saya aturannya sederhana, semua kode wajib dipahami penulisnya sebelum masuk review.' }),
            balasanBaru({ id: 2, id_user: 6, id_induk: 1, id_tujuan: 9, waktu: '2026-10-31T19:30:00', suka: [9], isi: 'Aturan yang bagus. Kami juga mewajibkan tes untuk kode yang dihasilkan AI.' }),
            balasanBaru({ id: 3, id_user: 17, waktu: '2026-11-01T20:02:00', isi: 'Mau cepat mahir? Beli paket kursus kilat saya, diskon 70 persen hari ini saja. Hubungi nomor di profil saya.' }),
          ],
        }),
        diskusiBaru({
          id: 8, id_user: 12, jenis: 'tanya', kategori: 'Karier', waktu: '2026-11-01T21:10:00',
          judul: 'Perlukah sertifikasi cloud untuk pindah ke DevOps?',
          isi: 'Saya sudah dua tahun menjadi web developer dan ingin pindah ke DevOps. Lebih baik ambil sertifikasi cloud dulu atau memperbanyak proyek pribadi? #devops #cloud',
          dilihat: 12,
        }),
        diskusiBaru({
          id: 9, id_user: 15, jenis: 'diskusi', kategori: 'Karier', waktu: '2026-10-25T12:00:00',
          judul: 'Jual akun kursus premium harga murah',
          isi: 'Tersedia akun kursus premium, harga miring, stok terbatas. Hubungi saya lewat pesan pribadi.',
          disembunyikan: 'Spam', dilihat: 9,
        }),
      ],
      laporan: [
        { id: 1, id_pelapor: 2, id_topik: 9, id_balasan: null, alasan: 'Spam', catatan: '', status: 'selesai', waktu: '2026-10-25T13:10:00', ditinjau: '2026-10-25T15:00:00' },
        { id: 2, id_pelapor: 7, id_topik: 6, id_balasan: 3, alasan: 'Tidak Relevan', catatan: '', status: 'diabaikan', waktu: '2026-10-24T09:30:00', ditinjau: '2026-10-24T11:00:00' },
        { id: 3, id_pelapor: 4, id_topik: 7, id_balasan: 3, alasan: 'Spam', catatan: 'Menawarkan kursus berbayar di tengah diskusi.', status: 'menunggu', waktu: '2026-11-01T20:30:00', ditinjau: '' },
      ],
      notifikasi: [
        { id: 1, id_user: 2, ikon: 'circle-check', pesan: `Jawaban Anda dipilih sebagai jawaban terbaik di "${JUDUL_WAWANCARA}".`, tautan: 'forum-detail.html?id=2#balasan-1', waktu: '2026-10-27T09:00:00', dibaca: false },
        { id: 2, id_user: 2, ikon: 'message-square', pesan: `Ananda Safitri membalas "${JUDUL_AI}".`, tautan: 'forum-detail.html?id=7#balasan-1', waktu: '2026-10-31T18:05:00', dibaca: false },
        { id: 3, id_user: 1, ikon: 'flag', pesan: `Fajar Saputra melaporkan balasan di "${JUDUL_AI}".`, tautan: 'laporan-forum.html', waktu: '2026-11-01T20:30:00', dibaca: false },
        { id: 4, id_user: 1, ikon: 'users', pesan: 'Aisha Dwi Rahmawati memperbarui profil & data tracer.', tautan: 'profil-alumni.html?id=2', waktu: '2026-11-02T10:15:00', dibaca: false },
        { id: 5, id_user: 1, ikon: 'rocket', pesan: 'Bagas Pratama meluncurkan karya baru ke Showcase.', tautan: 'karya.html', waktu: '2026-11-03T14:20:00', dibaca: false },
        { id: 6, id_user: 1, ikon: 'briefcase', pesan: 'Nadia Putri membagikan lowongan #Referral di PT Cakra Teknologi.', tautan: 'forum.html', waktu: '2026-11-04T08:45:00', dibaca: true },
        { id: 7, id_user: 1, ikon: 'flag', pesan: 'Yoga Pratama melaporkan postingan yang mengandung tautan mencurigakan.', tautan: 'laporan-forum.html', waktu: '2026-11-04T16:00:00', dibaca: false },
        { id: 8, id_user: 1, ikon: 'clipboard-list', pesan: '5 alumni baru mengisi kuesioner tracer study.', tautan: 'tracer.html', waktu: '2026-11-05T11:30:00', dibaca: true },
        { id: 9, id_user: 1, ikon: 'megaphone', pesan: 'Pengumuman "Jadwal Pelepasan Alumni" berhasil terbit.', tautan: 'pengumuman.html', waktu: '2026-11-05T15:00:00', dibaca: true },
      ],
    };
  }

  // ===================== DATA CONTOH =====================
  function buatDataAwal() {
    const db = {
      users: [{ id: 1, nama: 'Dr. Ayu Lestari, M.Kom', email: 'koordinator@contoh.id', password: 'koor12345', role: 'admin', status: 'verified', code: '', foto: '' }],
      tracer: [],
      cv: { academics: [], jobs: [], projects: [], internships: [], organizations: [], awards: [], courses: [], skills: [] },
      feed: [],
      gigs: [],
      pengumuman: [],
      statistik: [],
      ...dataForumAwal(),
    };

    const depanL = ['Rizky', 'Fajar', 'Bagas', 'Dimas', 'Yoga', 'Arif', 'Hendra', 'Gilang', 'Wahyu', 'Bima'];
    const depanP = ['Nadia', 'Salsa', 'Intan', 'Ananda', 'Putri', 'Dewi', 'Maya', 'Rani', 'Citra', 'Laras'];
    const belakangL = ['Pratama', 'Saputra', 'Nugroho', 'Wijaya', 'Kurniawan', 'Hidayat', 'Setiawan', 'Firmansyah'];
    const belakangP = ['Ramadhani', 'Maharani', 'Wulandari', 'Safitri', 'Lestari', 'Anggraini', 'Kusuma', 'Puspita'];
    const instansi = ['PT Solusi Digital Jateng', 'PT Cakra Teknologi', 'PT Awan Nusantara', 'PT Data Semesta', 'CV Karya Mandiri', 'Yayasan Cerdas Bangsa', 'Koperasi Maju Bersama', 'Kantor Pemerintah Kota'];
    const kampus = ['Universitas Dian Nuswantoro', 'Universitas Negeri Contoh', 'Institut Teknologi Nusantara'];
    const kota = ['Semarang', 'Semarang', 'Jakarta', 'Kudus', 'Yogyakarta', 'Bandung', 'Surabaya', 'Solo'];
    const keahlian = [['Laravel', 'MySQL', 'REST API'], ['React', 'Tailwind CSS', 'TypeScript'], ['Flutter', 'Firebase'], ['Figma', 'UI/UX Research'], ['Python', 'Machine Learning', 'SQL'], ['Docker', 'Linux', 'CI/CD'], ['Node.js', 'Express', 'MongoDB'], ['QA Testing', 'Selenium']];
    const pola = [0, 0, 0, 2, 0, 1, 3, 0, 4, 0, 0, 1, 2, 0, 5, 0, 3, 0, 6, 0];
    // [tahun lulus, total lulusan, jumlah yang mengisi tracer]
    const angkatan = [[2022, 24, 10], [2023, 28, 14], [2024, 30, 16], [2025, 26, 12], [2026, 18, 8]];

    let i = 0;
    angkatan.forEach(([tahun, total, pengisi]) => {
      db.statistik.push({ id: tahun, tahun_lulus: tahun, alumni_total: total });
      for (let n = 0; n < pengisi; n++, i++) {
        const lk = i % 2 === 0;
        const urut = Math.floor(i / 2);
        const depan = (lk ? depanL : depanP)[urut % 10];
        const belakang = (lk ? belakangL : belakangP)[urut % 8];
        const id = i + 2;
        const status = STATUS[pola[i % pola.length]];
        const nama = `${depan} ${belakang}`;
        const email = i === 0 ? 'rizky@contoh.id' : `${depan}.${belakang}${i}@contoh.id`.toLowerCase();

        db.users.push({ id, nama, email, password: SANDI_ALUMNI, role: 'alumni', status: 'verified', code: '', foto: '' });

        const tracer = {
          id, id_alumni: id, nama_alumni: nama, jns_kelamin: lk ? 'Laki-Laki' : 'Perempuan',
          nim: `A11.${tahun - 4}.${String(11000 + i * 37)}`, tahun_masuk: tahun - 4, tahun_lulus: tahun,
          no_hp: `0812${String(10000000 + i * 4111)}`, linkedin: `https://linkedin.com/in/${nama.toLowerCase().replace(/\s+/g, '-')}`, email, status, kota: kota[i % 8], keahlian: keahlian[i % 8],
          bidang_job: '', jns_job: '', nama_job: '', jabatan_job: '', lingkup_job: '',
          biaya_studi: '', nama_studi: '', prodi: '', tgl_studi: '', nama_sampingan: '', peran_sampingan: '',
          updated_at: `${tahun}-11-${String((i % 20) + 1).padStart(2, '0')}`,
        };
        if (STATUS_BEKERJA.includes(status)) {
          const wira = status === 'Wiraswasta';
          Object.assign(tracer, {
            bidang_job: i % 4 === 3 ? 'Non Infokom' : 'Infokom',
            jns_job: wira ? 'Wirausaha' : OPSI.jns_job[[0, 0, 4, 3, 0, 1][i % 6]],
            nama_job: wira ? `Usaha ${belakang} Digital` : instansi[i % instansi.length],
            jabatan_job: wira ? 'Founder' : status === 'Bekerja Part Time' ? 'Freelance' : 'Staff',
            lingkup_job: OPSI.lingkup_job[[2, 1, 2, 3, 0, 4, 2][i % 7]],
          });
        }
        if (status === STATUS_STUDI) {
          Object.assign(tracer, {
            biaya_studi: i % 2 ? 'Beasiswa' : 'Sendiri', nama_studi: kampus[i % 3],
            prodi: 'Magister Teknik Informatika', tgl_studi: `${tahun}-09-01`,
          });
        }
        db.tracer.push(tracer);

        db.cv.academics.push({
          id: id * 10, id_alumni: id, nama_studi: 'Universitas Dian Nuswantoro', prodi: 'Teknik Informatika',
          ipk: (3 + (i % 9) / 10).toFixed(2), tahun_masuk: tahun - 4, tahun_lulus: tahun,
          kota: 'Semarang', negara: 'Indonesia', catatan: 'Lulus dari program S1 Teknik Informatika.',
        });
        db.cv.skills.push({
          id: id * 10, id_alumni: id, kerjasama_skill: 'Baik', ahli_skill: i % 3 ? 'Baik' : 'Sangat Baik', inggris_skill: 'Cukup',
          komunikasi_skill: 'Baik', pengembangan_skill: 'Baik', kepemimpinan_skill: 'Cukup', etoskerja_skill: 'Sangat Baik',
        });
        if (STATUS_BEKERJA.includes(status)) {
          db.cv.jobs.push({
            id: id * 10, id_alumni: id, nama_job: tracer.nama_job, jabatan_job: tracer.jabatan_job,
            periode_masuk_job: `Januari ${Math.min(tahun + 1, 2026)}`, periode_keluar_job: 'Sekarang',
            kota: 'Semarang', negara: 'Indonesia', catatan: 'Menangani pekerjaan harian sesuai jabatan.',
          });
        }
      }
    });

    // Status karir ganda: bekerja sambil S2, atau punya pekerjaan sampingan
    const ganda = (id, isi) => Object.assign(db.tracer.find(t => t.id_alumni === id), isi);
    ganda(2, { nama_sampingan: 'Klien UMKM (lepas)', peran_sampingan: 'Freelance Backend Developer' });
    ganda(4, { biaya_studi: 'Beasiswa', nama_studi: 'Universitas Dian Nuswantoro', prodi: 'Magister Teknik Informatika', tgl_studi: '2025-09-01' });
    ganda(9, { biaya_studi: 'Sendiri', nama_studi: 'Institut Teknologi Nusantara', prodi: 'Magister Sistem Informasi', tgl_studi: '2026-02-01' });
    ganda(12, { nama_sampingan: 'Studio Kode Lepas', peran_sampingan: 'Mobile Developer (part time)' });

    // Alumni demo yang belum mengisi tracer study
    db.users.push({ id: 900, nama: 'Nadia Putri', email: 'nadia@contoh.id', password: SANDI_ALUMNI, role: 'alumni', status: 'verified', code: '', foto: '' });

    // Bank karya di Profil Saya. id_post menandai proyek yang sudah dipublikasikan di Beranda, id_gig berasal dari gig yang selesai.
    db.cv.projects.push(
      { id: 1, id_alumni: 2, nama_proyek: 'AntreKlinik', peran_proyek: 'Backend Developer', tahun_proyek: 2025, stack_proyek: 'Laravel, MySQL, REST API', link_proyek: 'https://antreklinik.contoh.id', deskripsi_proyek: 'Sistem antrean online untuk klinik kecil. Pasien mengambil nomor dari ponsel dan mendapat pengingat lewat WhatsApp.', id_post: 4 },
      { id: 2, id_alumni: 2, nama_proyek: 'Dashboard Penjualan UMKM', peran_proyek: 'Fullstack Developer', tahun_proyek: 2024, stack_proyek: 'Laravel, Chart.js', link_proyek: 'https://github.com/contoh/dashboard-umkm', deskripsi_proyek: 'Dashboard stok dan omzet harian untuk toko kelontong.' },
      { id: 3, id_alumni: 6, nama_proyek: 'KasRT', peran_proyek: 'Pembuat Produk', tahun_proyek: 2026, stack_proyek: 'Python, Flask, SQL', link_proyek: 'https://kasrt.contoh.id', deskripsi_proyek: 'Aplikasi pencatatan kas dan iuran warga untuk pengurus RT.', id_post: 5 },
      { id: 4, id_alumni: 10, nama_proyek: 'Aplikasi Perpustakaan Sekolah', peran_proyek: 'Web Developer', tahun_proyek: 2025, stack_proyek: 'Laravel, MySQL', link_proyek: 'https://github.com/contoh/perpus-sekolah', deskripsi_proyek: 'Peminjaman buku dan laporan bulanan untuk perpustakaan SMA.' },
      { id: 5, id_alumni: 7, nama_proyek: 'Pipeline Deploy Otomatis Sekolah', peran_proyek: 'DevOps', tahun_proyek: 2025, stack_proyek: 'Docker, CI/CD', link_proyek: 'https://github.com/contoh/deploy-sekolah', deskripsi_proyek: 'Deploy otomatis website sekolah setiap ada perubahan di repositori.' },
      { id: 6, id_alumni: 4, nama_proyek: 'Aplikasi Inventaris Gudang', peran_proyek: 'Freelance Mobile via Bengkod Gigs', tahun_proyek: 2026, stack_proyek: 'Flutter, Firebase', link_proyek: '', deskripsi_proyek: 'Proyek dari Hendra Setiawan. Endorsement: "Fajar disiplin, komunikatif, dan menyerahkan aplikasi lebih cepat dari jadwal."', id_gig: 4 },
      { id: 7, id_alumni: 4, nama_proyek: 'Catatan Keuangan Mahasiswa', peran_proyek: 'Mobile Developer', tahun_proyek: 2024, stack_proyek: 'Flutter', link_proyek: 'https://github.com/contoh/catatan-keuangan', deskripsi_proyek: 'Aplikasi pencatat pengeluaran harian dengan grafik bulanan.' },
    );

    // Isi CV lengkap untuk akun demo
    db.cv.internships.push({ id: 1, id_alumni: 2, nama_intern: 'PT Cakra Teknologi', periode_masuk_intern: 'Juli 2021', periode_keluar_intern: 'Desember 2021', jabatan_intern: 'Web Developer Intern', kota: 'Semarang', negara: 'Indonesia', catatan: 'Membantu membuat fitur website internal.' });
    db.cv.organizations.push({ id: 1, id_alumni: 2, nama_org: 'Himpunan Mahasiswa Teknik Informatika', periode_masuk_org: '2019', periode_keluar_org: '2020', jabatan_org: 'Staf Divisi Akademik', kota: 'Semarang', negara: 'Indonesia', catatan: 'Mengelola kegiatan belajar bersama.' });
    db.cv.awards.push({ id: 1, id_alumni: 2, nama_award: 'Juara 2 Lomba Web Design', institusi_award: 'Universitas Dian Nuswantoro', tingkat_award: 'Lokal', tahun_award: 2021, deskripsi_award: 'Membuat website bertema pendidikan.' });
    db.cv.courses.push({ id: 1, id_alumni: 2, nama_course: 'Sertifikasi Web Developer', institusi_course: 'Lembaga Sertifikasi Contoh', tingkat_course: 'Nasional', tahun_course: 2022 });

    db.feed = [
      postBaru({
        id: 1, id_alumni: 8, jenis: 'kegiatan', waktu: '2026-10-29T19:30:00', suka: [2, 4, 5], gambar: GAMBAR_CONTOH[1],
        isi: 'Semester ini saya mulai kuliah S2 sambil tetap berbagi materi di komunitas. Kalau ada yang mau tanya soal persiapan masuk magister, silakan tulis di komentar.',
        komentar: [{ id: 1, id_alumni: 2, isi: 'Selamat ya, semoga lancar studinya.', waktu: '2026-10-29T20:05:00' }],
      }),
      postBaru({
        id: 2, id_alumni: 2, waktu: '2026-10-24T10:00:00', suka: [4, 7],
        isi: 'Tips wawancara backend dari pengalaman saya: kuasai indeks database, transaksi, dan cara merancang API yang rapi.',
        komentar: [
          { id: 1, id_alumni: 4, isi: 'Bagian transaksi memang sering ditanyakan.', waktu: '2026-10-24T11:20:00' },
          { id: 2, id_alumni: 7, isi: 'Terima kasih sudah berbagi.', waktu: '2026-10-24T13:45:00' },
        ],
      }),
      postBaru({
        id: 3, id_alumni: 5, waktu: '2026-10-18T08:15:00', suka: [2],
        isi: 'Usaha digital kecil saya baru saja menerima proyek pertama dari luar kota. Terima kasih untuk teman-teman alumni yang sudah membantu.',
      }),
      postBaru({
        id: 4, id_alumni: 2, jenis: 'karya', waktu: '2026-10-27T10:00:00', suka: [4, 6, 9, 12], gambar: GAMBAR_CONTOH[4],
        isi: 'Setelah tiga bulan uji coba bersama teman-teman alumni, AntreKlinik sekarang dipakai tiga klinik di Semarang. Terima kasih untuk semua masukannya.',
        karya: { nama: 'AntreKlinik', tagline: 'Antrean klinik dari ponsel, tanpa menunggu di ruang tunggu.', tahap: 'live', fokus: [], stack: ['Laravel', 'MySQL', 'REST API'], link: 'https://antreklinik.contoh.id', id_proyek: 1 },
        feedback: [
          { id: 1, id_user: 4, kategori: 'Arsitektur/Performa', isi: 'Halaman antrean memuat ulang semua data tiap 5 detik. Coba kirim perubahan saja supaya server lebih ringan.', status: 'diterapkan', waktu: '2026-09-12T10:00:00' },
          { id: 2, id_user: 8, kategori: 'Apresiasi', isi: 'Pengingat WhatsApp-nya sangat membantu pasien lansia.', status: '', waktu: '2026-10-27T12:00:00' },
        ],
        spotlight_sampai: new Date(Date.now() + 20 * 864e5).toISOString(),
      }),
      postBaru({
        id: 5, id_alumni: 6, jenis: 'karya', waktu: '2026-10-31T09:30:00', suka: [2, 7], gambar: GAMBAR_CONTOH[5],
        isi: 'KasRT sudah bisa mencatat iuran dan membuat laporan bulanan. Sebelum dipakai warga, saya butuh bantuan uji coba, terutama alur pembayaran.',
        karya: { nama: 'KasRT', tagline: 'Catat kas dan iuran warga tanpa buku besar.', tahap: 'beta', fokus: ['Bug', 'UI/UX'], stack: ['Python', 'Flask', 'SQL'], link: 'https://kasrt.contoh.id', id_proyek: 3 },
        feedback: [
          { id: 1, id_user: 4, kategori: 'Bug', isi: 'Total iuran tidak berubah setelah pembayaran dihapus.', status: 'diperbaiki', waktu: '2026-10-31T13:00:00' },
          { id: 2, id_user: 4, kategori: 'UI/UX', isi: 'Tombol simpan sebaiknya tetap terlihat di layar ponsel.', status: 'diterapkan', waktu: '2026-10-31T13:10:00' },
          { id: 3, id_user: 7, kategori: 'UI/UX', isi: 'Daftar warga perlu kolom pencarian, sulit dicari kalau sudah lebih dari 50 orang.', status: '', waktu: '2026-11-01T08:20:00' },
        ],
        spotlight_sampai: '',
      }),
      postBaru({
        id: 6, id_alumni: 2, jenis: 'referral', waktu: '2026-11-01T08:00:00', suka: [10],
        isi: 'Tim kami butuh satu intern backend. Kriteria utama: paham Laravel dan dasar SQL, serta mau belajar Docker.',
        referral: { perusahaan: 'PT Solusi Digital Jateng', posisi: 'Backend Developer Intern', level: 'Magang/Freshgrad', batas: nanti(10) },
        pengajuan: [
          { id: 1, id_user: 10, format: 'ats', pesan: 'Saya lulusan 2022 yang sedang mencari kerja. Sudah membuat aplikasi perpustakaan dengan Laravel dan MySQL.', status: 'menunggu', masukan: '', waktu: '2026-11-02T09:15:00' },
          { id: 2, id_user: 18, format: 'modern', pesan: 'Saya sedang S2 dan ingin magang paruh waktu. Terbiasa dengan Laravel dan REST API.', status: 'menunggu', masukan: '', waktu: '2026-11-02T11:00:00' },
        ],
      }),
      postBaru({
        id: 7, id_alumni: 12, jenis: 'referral', waktu: '2026-10-30T13:00:00',
        isi: 'Dicari developer yang sudah pernah merilis aplikasi Flutter ke Play Store.',
        referral: { perusahaan: 'PT Awan Nusantara', posisi: 'Mobile Developer', level: 'Junior (1-2 tahun)', batas: nanti(14) },
        pengajuan: [],
      }),
      postBaru({
        id: 8, id_alumni: 14, waktu: '2026-10-20T16:00:00', suka: [4, 5], tag: [4],
        isi: 'Proyek "Aplikasi Inventaris Gudang" lewat Bengkod Gigs sudah selesai. Terima kasih untuk tim yang sudah mengerjakan. Fajar disiplin, komunikatif, dan menyerahkan aplikasi lebih cepat dari jadwal.',
      }),
    ];

    db.gigs = [
      {
        id: 1, id_owner: 12, judul: 'Website Company Profile Klinik Gigi', peran: ['Frontend', 'UI/UX'], stack: ['React', 'Tailwind CSS'],
        deskripsi: 'Klinik gigi kenalan saya butuh website profil dengan jadwal dokter dan formulir reservasi.\n\nDeliverables: desain Figma tiga halaman, website responsif, dan panduan singkat mengubah jadwal.',
        budget: 'Rp 1 Juta - Rp 3 Juta', deadline: nanti(30), kuota: 2, status: 'open', waktu: '2026-10-29T10:00:00', endorsement: '', selesai_pada: '',
        pelamar: [{ id: 1, id_user: 2, format: 'modern', pesan: 'Saya pernah membuat dashboard UMKM dan bisa mengerjakan bagian reservasi sampai terhubung ke WhatsApp.', portofolio: [2], status: 'menunggu', waktu: '2026-10-30T08:00:00' }],
      },
      {
        id: 2, id_owner: 2, judul: 'Aplikasi Mobile Absensi Karyawan', peran: ['Mobile', 'Backend'], stack: ['Flutter', 'Laravel'],
        deskripsi: 'Side-project untuk kantor cabang kecil: absensi dengan lokasi dan foto, lalu rekap bulanan untuk HRD.\n\nDeliverables: aplikasi Flutter, API Laravel, dan dokumentasi API.',
        budget: 'Rp 3 Juta - Rp 5 Juta', deadline: nanti(45), kuota: 2, status: 'open', waktu: '2026-11-01T19:00:00', endorsement: '', selesai_pada: '',
        pelamar: [
          { id: 1, id_user: 4, format: 'ats', pesan: 'Saya sudah dua kali mengerjakan aplikasi Flutter dengan Firebase, termasuk lewat Bengkod Gigs. Siap mulai minggu ini.', portofolio: [6, 7], status: 'menunggu', waktu: '2026-11-02T08:00:00' },
          { id: 2, id_user: 10, format: 'modern', pesan: 'Saya bisa mengerjakan API Laravel dan dokumentasinya. Contoh proyeknya terlampir.', portofolio: [4], status: 'menunggu', waktu: '2026-11-02T10:30:00' },
        ],
      },
      {
        id: 3, id_owner: 5, judul: 'Toko Online Usaha Maharani Digital', peran: ['Backend'], stack: ['Laravel', 'Docker'],
        deskripsi: 'Toko online untuk produk usaha saya, termasuk pembayaran transfer dan deploy ke VPS.\n\nDeliverables: website toko, panel admin, dan skrip deploy Docker.',
        budget: 'Bagi Hasil / Equity', deadline: nanti(20), kuota: 1, status: 'progress', waktu: '2026-10-15T09:00:00', endorsement: '', selesai_pada: '',
        pelamar: [{ id: 1, id_user: 7, format: 'ats', pesan: 'Saya terbiasa menyiapkan Docker dan deploy otomatis, bisa sekalian merapikan servernya.', portofolio: [5], status: 'diterima', waktu: '2026-10-16T10:00:00' }],
      },
      {
        id: 4, id_owner: 14, judul: 'Aplikasi Inventaris Gudang', peran: ['Mobile'], stack: ['Flutter', 'Firebase'],
        deskripsi: 'Aplikasi pencatatan barang masuk dan keluar untuk gudang usaha saya.\n\nDeliverables: aplikasi Android dan pelatihan singkat untuk staf gudang.',
        budget: 'Rp 3 Juta - Rp 5 Juta', deadline: '2026-10-18', kuota: 1, status: 'selesai', waktu: '2026-09-20T09:00:00',
        endorsement: 'Fajar disiplin, komunikatif, dan menyerahkan aplikasi lebih cepat dari jadwal.', selesai_pada: '2026-10-20T15:00:00',
        pelamar: [{ id: 1, id_user: 4, format: 'modern', pesan: 'Saya sudah membuat aplikasi keuangan dengan Flutter dan siap mengerjakan versi Android.', portofolio: [7], status: 'diterima', waktu: '2026-09-21T10:00:00' }],
      },
    ];

    db.notifikasi.push(
      { id: 4, id_user: 2, ikon: 'hand', pesan: 'Fajar Saputra mengajukan minat di "Aplikasi Mobile Absensi Karyawan".', tautan: 'gigs.html?id=2', waktu: '2026-11-02T08:00:00', dibaca: false },
      { id: 5, id_user: 2, ikon: 'send', pesan: 'Yoga Kurniawan meminta review dan referral untuk Backend Developer Intern.', tautan: 'beranda.html#post-6', waktu: '2026-11-02T09:15:00', dibaca: false },
    );

    db.pengumuman = [
      { id: 4, judul: 'Pengisian Tracer Study Lulusan 2026', penulis: 'Koordinator Alumni', isi: 'Seluruh lulusan 2026 diminta mengisi tracer study paling lambat 30 November 2026 melalui menu Tracerstudy.', published_at: '2026-10-20' },
      { id: 3, judul: 'Pembaruan Data Kontak Alumni', penulis: 'Koordinator Alumni', isi: 'Pastikan nomor WhatsApp dan email pada tracer study masih aktif agar informasi dari program studi dapat diterima.', published_at: '2026-10-05' },
      { id: 2, judul: 'Temu Alumni Teknik Informatika', penulis: 'Koordinator Alumni', isi: 'Temu alumni akan diadakan di kampus UDINUS pada Desember 2026. Informasi lengkap menyusul.', published_at: '2026-09-18' },
      { id: 1, judul: 'Feed Alumni Sudah Dibuka', penulis: 'Koordinator Alumni', isi: 'Alumni dapat membagikan kabar dan pencapaian melalui menu Feed.', published_at: '2026-08-02' },
    ];

    return db;
  }

  // ===================== PENYIMPANAN =====================
  let db = null;

  const baca = kunci => {
    try { return JSON.parse(localStorage.getItem(kunci)); } catch { return null; }
  };

  function muat() {
    if (db) return db;
    db = baca(KEY_DATA);
    if (!db) {
      const lama = baca(KEY_LAMA);
      db = lama ? naikkanDariV3(lama) : buatDataAwal();
      simpan();
    }
    // Data yang tersimpan sebelum postingan contoh punya gambar ikut dilengkapi
    db.feed.forEach(p => { if (!p.gambar && GAMBAR_CONTOH[p.id] && p.waktu < '2026-11-01') p.gambar = GAMBAR_CONTOH[p.id]; });
    // Postingan tambahan hanya ditambahkan sekali, dan hanya untuk akun alumni yang masih ada
    let adaGambarBaru = false;
    db.feed.forEach(p => {
      const contoh = p.kunci && POSTINGAN_TAMBAHAN.find(x => x.kunci === p.kunci);
      if (contoh?.gambar && !p.gambar) {
        p.gambar = contoh.gambar;
        adaGambarBaru = true;
      }
    });
    if (adaGambarBaru) simpan();
    const kunciAda = new Set(db.feed.map(p => p.kunci).filter(Boolean));
    const tambahan = POSTINGAN_TAMBAHAN.filter(p => !kunciAda.has(p.kunci) && db.users.some(u => u.id === p.id_alumni && u.role === 'alumni'));
    tambahan.forEach(p => {
      const id = db.feed.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
      const pengguna = new Set(db.users.map(u => u.id));
      db.feed.push(postBaru({
        ...p, id,
        suka: p.suka.filter(x => pengguna.has(x)),
        komentar: (p.komentar || []).filter(k => pengguna.has(k.id_alumni)),
      }));
    });
    if (tambahan.length) simpan();
    // Normalisasi: satukan 'Sedang studi lanjut S2' ke 'Melanjutkan Pendidikan'
    let adaNormalisasi = false;
    db.tracer.forEach(t => {
      const s = (t.status || '').trim().toLowerCase();
      if (s === 'sedang studi lanjut s2' || s === 'sedang studi lanjut') {
        t.status = 'Melanjutkan Pendidikan';
        adaNormalisasi = true;
      }
    });
    if (adaNormalisasi) simpan();
    // Pastikan koordinator punya notifikasi contoh untuk paginasi jika belum ada
    const notifKoor = db.notifikasi.filter(n => n.id_user === 1);
    if (notifKoor.length < 5) {
      const dataAwal = buatDataAwal();
      const belumAda = dataAwal.notifikasi.filter(n => n.id_user === 1 && !db.notifikasi.some(x => x.id === n.id));
      if (belumAda.length) {
        db.notifikasi.push(...belumAda);
        simpan();
      }
    }
    // Pelamar gig yang tersimpan sebelum ada pilihan versi CV: format diambil dari data contoh (hanya menambah field yang kosong)
    const tanpaFormat = (db.gigs || []).flatMap(g => g.pelamar.filter(a => !a.format).map(a => [g, a]));
    if (tanpaFormat.length) {
      const contohGig = buatDataAwal().gigs;
      let adaFormat = false;
      tanpaFormat.forEach(([g, a]) => {
        const c = contohGig.find(x => x.id === g.id && x.judul === g.judul)?.pelamar.find(x => x.id === a.id && x.id_user === a.id_user);
        if (c?.format) {
          a.format = c.format;
          adaFormat = true;
        }
      });
      if (adaFormat) simpan();
    }
    return db;
  }

  // Isian di data v3 (akun, tracer, riwayat, feed, forum) tetap dipakai. Yang belum ada diambil dari data contoh.
  function naikkanDariV3(lama) {
    const contoh = buatDataAwal();
    const idPost = new Map(); // id postingan contoh -> id barunya setelah postingan lama
    lama.feed.forEach(p => Object.assign(p, postBaru(p)));
    contoh.feed.filter(p => p.id > 3).forEach(p => {
      const id = idBaru(lama.feed);
      idPost.set(p.id, id);
      lama.feed.push({ ...p, id });
    });
    lama.tracer.forEach(t => {
      const c = contoh.tracer.find(x => x.id_alumni === t.id_alumni) || {};
      t.kota ??= c.kota ?? '';
      t.keahlian ??= c.keahlian ?? [];
      t.nama_sampingan ??= c.nama_sampingan ?? '';
      t.peran_sampingan ??= c.peran_sampingan ?? '';
    });
    lama.cv.projects ??= contoh.cv.projects.map(r => (r.id_post ? { ...r, id_post: idPost.get(r.id_post) } : r));
    lama.gigs ??= contoh.gigs;
    contoh.notifikasi.filter(n => n.id > 3).forEach(n => lama.notifikasi.push({
      ...n, id: idBaru(lama.notifikasi), tautan: n.tautan.replace(/#post-(\d+)/, (_, id) => `#post-${idPost.get(Number(id))}`),
    }));
    return lama;
  }

  function simpan() {
    try {
      localStorage.setItem(KEY_DATA, JSON.stringify(db));
      return true;
    } catch {
      return false; // penyimpanan browser penuh atau diblokir
    }
  }

  const idBaru = list => list.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
  const bersih = s => String(s ?? '').trim();
  const kodeAcak = () => String(Math.floor(100000 + Math.random() * 900000));
  const gagal = (error, field) => ({ ok: false, error, field });
  const kini = () => new Date().toISOString();
  const ms = iso => new Date(iso).getTime();
  const alihkan = (list, id) => (list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
  const adalahKoor = id => akun.cari(id)?.role === 'admin';
  // "Laravel, react , Laravel" menjadi ['Laravel', 'react']
  const daftarKata = s => [...new Set(String(s ?? '').split(',').map(bersih).filter(Boolean))];
  const urlAman = s => /^https?:\/\/\S+$/i.test(bersih(s));

  function beritahu(idUser, ikon, pesan, tautan) {
    const list = muat().notifikasi;
    list.push({ id: idBaru(list), id_user: idUser, ikon, pesan, tautan, waktu: kini(), dibaca: false });
  }

  // ===================== AKUN =====================
  const akun = {
    cariEmail: email => muat().users.find(u => u.email.toLowerCase() === bersih(email).toLowerCase()),

    aktif() {
      let id = null;
      try { id = Number(localStorage.getItem(KEY_SESI)); } catch { /* storage diblokir */ }
      return muat().users.find(u => u.id === id) || null;
    },

    masuk(email, password) {
      const u = akun.cariEmail(email);
      if (!u) return gagal('Email belum terdaftar, silakan mendaftar terlebih dahulu.', 'email');
      if (u.password !== password) return gagal('Password yang dimasukkan salah.', 'password');
      if (u.status !== 'verified') return { ok: false, perluOtp: true, user: u, error: 'Akun belum diverifikasi.' };
      try { localStorage.setItem(KEY_SESI, String(u.id)); } catch { /* storage diblokir */ }
      return { ok: true, user: u };
    },

    keluar() {
      try { localStorage.removeItem(KEY_SESI); } catch { /* storage diblokir */ }
    },

    daftar({ nama, email, password }) {
      if (!bersih(nama)) return gagal('Nama wajib diisi.', 'nama');
      if (akun.cariEmail(email)) return gagal('Alamat email sudah terdaftar, silakan gunakan email lain.', 'email');
      if (String(password).length < 8) return gagal('Password harus terdiri dari minimal 8 karakter.', 'password');
      const data = muat();
      const user = {
        id: idBaru(data.users), nama: bersih(nama), email: bersih(email), password,
        role: 'alumni', status: 'notverified', code: kodeAcak(), foto: '',
      };
      data.users.push(user);
      simpan();
      return { ok: true, user };
    },

    verifikasiOtp(email, kode) {
      const u = akun.cariEmail(email);
      if (!u || !u.code || u.code !== bersih(kode)) return gagal('Kode OTP salah atau sudah kedaluwarsa.', 'otp');
      u.status = 'verified';
      u.code = '';
      simpan();
      return { ok: true, user: u };
    },

    kirimUlangOtp(email) {
      const u = akun.cariEmail(email);
      if (!u) return gagal('Email belum terdaftar.', 'email');
      u.code = kodeAcak();
      simpan();
      return { ok: true, user: u };
    },

    cekKode(email, kode) {
      const u = akun.cariEmail(email);
      return Boolean(u && u.code && u.code === bersih(kode));
    },

    gantiPasswordLewatKode(email, kode, password) {
      const u = akun.cariEmail(email);
      if (!u || !u.code || u.code !== bersih(kode)) return gagal('Kode yang Anda masukkan salah.', 'otp');
      if (String(password).length < 8) return gagal('Password harus terdiri dari minimal 8 karakter.', 'password');
      u.password = password;
      u.code = '';
      simpan();
      return { ok: true };
    },

    gantiPassword(id, lama, baru) {
      const u = muat().users.find(x => x.id === id);
      if (!u || u.password !== lama) return gagal('Password lama tidak sesuai.', 'lama');
      if (String(baru).length < 8) return gagal('Password baru minimal 8 karakter.', 'baru');
      u.password = baru;
      simpan();
      return { ok: true };
    },

    gantiFoto(id, foto) {
      const u = muat().users.find(x => x.id === id);
      if (!u) return gagal('Akun tidak ditemukan.');
      const lama = u.foto;
      u.foto = foto;
      if (!simpan()) { u.foto = lama; return gagal('Foto terlalu besar untuk disimpan di prototype ini.'); }
      return { ok: true };
    },

    alumni: () => muat().users.filter(u => u.role === 'alumni' && u.status === 'verified'),
    cari: id => muat().users.find(u => u.id === Number(id)),
  };

  // ===================== TRACER STUDY =====================
  const tracer = {
    semua: () => muat().tracer,
    milik: idAlumni => muat().tracer.find(t => t.id_alumni === idAlumni) || null,

    // Tempat dan posisi alumni saat ini, baik bekerja, part time, wirausaha, maupun studi lanjut
    karir(t) {
      const tempat = t?.nama_job || t?.nama_studi || '';
      const posisi = t?.jabatan_job || t?.prodi || '';
      return { tempat, posisi, ringkas: tempat ? `${posisi} di ${tempat}` : t?.status || 'Alumni Bengkel Koding' };
    },

    jumlahPerStatus() {
      const hasil = Object.fromEntries(STATUS.map(s => [s, 0]));
      muat().tracer.forEach(t => {
        let st = t.status;
        const s = (st || '').trim().toLowerCase();
        if (s === 'sedang studi lanjut s2' || s === 'sedang studi lanjut') st = 'Melanjutkan Pendidikan';
        if (st in hasil) hasil[st]++;
      });
      return hasil;
    },

    hitung(kolom, nilai) {
      const hasil = Object.fromEntries(nilai.map(n => [n, 0]));
      muat().tracer.forEach(t => { if (t[kolom] in hasil) hasil[t[kolom]]++; });
      return hasil;
    },

    simpan(idAlumni, form) {
      const data = muat();
      const lain = data.tracer.filter(t => t.id_alumni !== idAlumni);
      const nim = bersih(form.nim);
      const noHp = bersih(form.no_hp);
      if (!nim) return gagal('NIM wajib diisi.', 'nim');
      if (lain.some(t => t.nim === nim)) return gagal('NIM ini sudah dipakai alumni lain.', 'nim');
      if (lain.some(t => t.no_hp === noHp)) return gagal('Nomor HP ini sudah dipakai alumni lain.', 'no_hp');
      if (Number(form.tahun_lulus) < Number(form.tahun_masuk)) return gagal('Tahun lulus tidak boleh lebih awal dari tahun masuk.', 'tahun_lulus');
      if (!bersih(form.kota)) return gagal('Kota domisili wajib diisi.', 'kota');
      if (!STATUS.includes(form.status)) return gagal('Pilih status Anda saat ini.', 'status');

      const user = akun.cari(idAlumni);
      const kerja = STATUS_BEKERJA.includes(form.status);
      // Studi lanjut dan pekerjaan sampingan bisa berjalan bersama status utama
      const studi = form.status === STATUS_STUDI || Boolean(form.juga_studi);
      const sampingan = Boolean(form.ada_sampingan);
      const baris = {
        id_alumni: idAlumni, nama_alumni: user.nama, email: user.email, jns_kelamin: form.jns_kelamin, nim,
        tahun_masuk: Number(form.tahun_masuk), tahun_lulus: Number(form.tahun_lulus), no_hp: noHp,
        linkedin: bersih(form.linkedin) || (data.tracer.find(t => t.id_alumni === idAlumni)?.linkedin || ''),
        status: form.status,
        kota: bersih(form.kota), keahlian: daftarKata(form.keahlian),
        // Jawaban cabang lain dikosongkan agar tidak tertinggal saat status berubah
        bidang_job: kerja ? form.bidang_job : '', jns_job: kerja ? form.jns_job : '', nama_job: kerja ? bersih(form.nama_job) : '',
        jabatan_job: kerja ? form.jabatan_job : '', lingkup_job: kerja ? form.lingkup_job : '',
        biaya_studi: studi ? form.biaya_studi : '', nama_studi: studi ? bersih(form.nama_studi) : '',
        prodi: studi ? bersih(form.prodi) : '', tgl_studi: studi ? form.tgl_studi : '',
        nama_sampingan: sampingan ? bersih(form.nama_sampingan) : '', peran_sampingan: sampingan ? bersih(form.peran_sampingan) : '',
        updated_at: new Date().toISOString().slice(0, 10),
      };
      const ada = data.tracer.find(t => t.id_alumni === idAlumni);
      if (ada) Object.assign(ada, baris);
      else data.tracer.push({ id: idBaru(data.tracer), ...baris });
      simpan();
      return { ok: true };
    },

    // Direktori sesama alumni: angkatan berarti tahun masuk, s2 mencakup yang bekerja sambil studi
    direktori(idUser, { kata = '', angkatan = '', keahlian = '', kota = '', s2 = false } = {}) {
      const dicari = bersih(kata).toLowerCase();
      const sama = (a, b) => a.toLowerCase() === b.toLowerCase();
      return muat().tracer
        .filter(t => t.id_alumni !== idUser
          && (!angkatan || t.tahun_masuk === Number(angkatan))
          && (!keahlian || t.keahlian.some(k => sama(k, keahlian)))
          && (!kota || sama(t.kota, kota))
          && (!s2 || Boolean(t.nama_studi))
          && (!dicari || [t.nama_alumni, t.kota, tracer.karir(t).ringkas, ...t.keahlian].join(' ').toLowerCase().includes(dicari)))
        .sort((a, b) => a.nama_alumni.localeCompare(b.nama_alumni));
    },
  };

  // ===================== STATISTIK (OTOMATIS DARI LMS-BENGKOD-API) =====================
  const statistik = {
    terdeteksi: tahun => muat().tracer.filter(t => t.tahun_lulus === tahun).length,

    // Sumber: total akun asisten di lms-bengkod-api berumur >= 1 tahun per tahun angkatan NIM,
    // disandingkan dengan alumni yang sudah memverifikasi NIM dan aktif di Portal Alumni.
    semua() {
      const data = muat();
      const tahun = new Set([...data.statistik.map(s => s.tahun_lulus), ...data.tracer.map(t => t.tahun_lulus)]);
      return [...tahun].sort((a, b) => a - b).map(t => {
        const baris = data.statistik.find(s => s.tahun_lulus === t);
        const totalLms = baris ? baris.alumni_total : statistik.terdeteksi(t);
        return {
          id: baris ? baris.id : null,
          tahun_lulus: t,
          alumni_total: totalLms,
          alumni_terlacak: statistik.terdeteksi(t),
          sumber: 'lms-bengkod-api',
        };
      });
    },

    tigaTahun() {
      const batas = new Date().getFullYear() - 2;
      return statistik.semua().filter(s => s.tahun_lulus >= batas);
    },

    waktuSinkron() {
      return muat().statistik_synced_at || '2026-11-11T08:00:00.000Z';
    },

    sinkronLms() {
      const data = muat();
      data.statistik_synced_at = new Date().toISOString();
      simpan();
      return { ok: true, waktu: data.statistik_synced_at };
    },

    // Rincian gabungan asisten LMS (sudah mendaftar portal vs belum mendaftar) untuk tahun tertentu
    detailAngkatan(tahun) {
      const thn = Number(tahun);
      const ringkas = statistik.semua().find(s => s.tahun_lulus === thn);
      const terdaftarRaw = muat().tracer.filter(t => t.tahun_lulus === thn);

      const terdaftar = terdaftarRaw.map(t => ({
        id: t.id_alumni,
        nama: t.nama_alumni,
        nim: t.nim,
        email: t.email,
        no_hp: t.no_hp || '',
        terdaftar: true,
        status_karir: t.status,
        updated_at: t.updated_at,
        foto: akun.cari(t.id_alumni)?.foto || '',
      }));

      const totalLms = ringkas ? Math.max(ringkas.alumni_total, terdaftar.length) : terdaftar.length;
      const jumlahBelum = Math.max(0, totalLms - terdaftar.length);

      const namaDepanLms = ['Aldi', 'Bagus', 'Candra', 'Dika', 'Eka', 'Farhan', 'Galih', 'Hafiz', 'Ilham', 'Jihan', 'Kartika', 'Lutfi', 'Miftah', 'Naufal', 'Oky', 'Putra', 'Qori', 'Reza', 'Siti', 'Taufik'];
      const namaBelakangLms = ['Santoso', 'Wibowo', 'Kusuma', 'Permadi', 'Haryanto', 'Ramadhan', 'Nugraha', 'Purnomo', 'Utama', 'Prasetyo', 'Syahputra', 'Maulana', 'Fauzan', 'Setiadi'];

      const belum = [];
      for (let k = 0; k < jumlahBelum; k++) {
        const idx = (thn + k * 3) % namaDepanLms.length;
        const idxB = (thn * 2 + k * 5) % namaBelakangLms.length;
        const nimNo = 14000 + (thn % 10) * 100 + k * 19;
        const nim = `A11.${thn - 4}.${nimNo}`;
        belum.push({
          id: null,
          nama: `${namaDepanLms[idx]} ${namaBelakangLms[idxB]}`,
          nim,
          email: `${nim.toLowerCase()}@mhs.dinus.ac.id`,
          no_hp: '', // Di lms-bengkod-api tabel users hanya menyimpan identity_code, name, dan email
          terdaftar: false,
          status_karir: '',
          updated_at: '',
          foto: '',
        });
      }

      return {
        tahun: thn,
        totalLms,
        totalTerdaftar: terdaftar.length,
        totalBelum: belum.length,
        cakupan: totalLms ? Math.round((terdaftar.length / totalLms) * 100) : 0,
        asisten: [...terdaftar, ...belum],
      };
    },
  };

  // ===================== DATA CV =====================
  const cv = {
    milik: (tabel, idAlumni) => muat().cv[tabel].filter(r => r.id_alumni === idAlumni),

    simpan(tabel, idAlumni, baris) {
      const list = muat().cv[tabel];
      const ada = list.find(r => r.id === Number(baris.id) && r.id_alumni === idAlumni);
      if (ada) Object.assign(ada, baris, { id: ada.id, id_alumni: idAlumni });
      else list.push({ ...baris, id: idBaru(list), id_alumni: idAlumni });
      simpan();
      return { ok: true };
    },

    hapus(tabel, idAlumni, id) {
      const data = muat();
      data.cv[tabel] = data.cv[tabel].filter(r => !(r.id === id && r.id_alumni === idAlumni));
      simpan();
    },
  };

  // ===================== BERANDA (FEED) =====================
  // Jenis postingan: pengalaman, kegiatan, karya (Hall of Fame dan uji beta), dan referral
  function cariPengajuan(id, idPengajuan, idUser) {
    const p = feed.cari(id);
    const a = p?.pengajuan?.find(x => x.id === Number(idPengajuan));
    if (!a || p.id_alumni !== idUser) return gagal('Hanya pemberi referral yang bisa menanggapi pengajuan ini.');
    if (a.status !== 'menunggu') return gagal('Pengajuan ini sudah ditanggapi.');
    return { ok: true, p, a };
  }

  const feed = {
    semua: () => [...muat().feed].sort((a, b) => b.waktu.localeCompare(a.waktu) || b.id - a.id),
    cari: id => muat().feed.find(p => p.id === Number(id)),

    tambah(idAlumni, { jenis = 'pengalaman', isi, gambar, tag = [], karya = {}, referral = {} }) {
      const data = muat();
      const teks = bersih(isi);
      if (!OPSI.jenis_post.includes(jenis)) return gagal('Pilih jenis postingan.', 'jenis');
      const post = postBaru({
        id: idBaru(data.feed), id_alumni: idAlumni, jenis, isi: teks, gambar: gambar || '', waktu: kini(),
        tag: [...new Set(tag.map(Number))].filter(id => id !== idAlumni && akun.cari(id)?.role === 'alumni'),
      });
      let proyek = null;

      if (jenis === 'karya') {
        const k = { nama: bersih(karya.nama), tagline: bersih(karya.tagline), tahap: karya.tahap, fokus: (karya.fokus || []).filter(f => OPSI.fokus_review.includes(f)), stack: daftarKata(karya.stack), link: bersih(karya.link) };
        if (!k.nama) return gagal('Nama produk wajib diisi.', 'nama');
        if (!k.tagline) return gagal('Tulis tagline satu baris.', 'tagline');
        if (!OPSI.tahap_karya.includes(k.tahap)) return gagal('Pilih tahap produk.', 'tahap');
        if (k.tahap === 'beta' && !k.fokus.length) return gagal('Pilih minimal satu fokus review untuk tester.', 'fokus');
        if (!urlAman(k.link)) return gagal('Tautan harus diawali http:// atau https://.', 'link');
        // Proyek & Portofolio di Profil Saya jadi sumber data karya
        proyek = karya.id_proyek ? cv.milik('projects', idAlumni).find(r => r.id === Number(karya.id_proyek)) : null;
        if (karya.id_proyek && !proyek) return gagal('Proyek tidak ditemukan di portofolio Anda.');
        if (proyek?.id_post) return gagal('Proyek ini sudah dipublikasikan di Beranda.');
        Object.assign(post, { karya: { ...k, fokus: k.tahap === 'beta' ? k.fokus : [], id_proyek: null }, feedback: [], spotlight_sampai: '' });
      } else if (jenis === 'referral') {
        const r = { perusahaan: bersih(referral.perusahaan), posisi: bersih(referral.posisi), level: referral.level, batas: referral.batas || '' };
        if (!r.perusahaan) return gagal('Nama perusahaan wajib diisi.', 'perusahaan');
        if (!r.posisi) return gagal('Posisi yang dibuka wajib diisi.', 'posisi');
        if (!OPSI.level_referral.includes(r.level)) return gagal('Pilih level pengalaman.', 'level');
        if (!r.batas || r.batas < hariIni()) return gagal('Batas waktu review tidak boleh lewat dari hari ini.', 'batas');
        if (!teks) return gagal('Tulis pesan dan kriteria utama.', 'isi');
        Object.assign(post, { referral: r, pengajuan: [] });
      } else if (!teks && !gambar) {
        return gagal('Tulis keterangan atau pilih gambar terlebih dahulu.', 'isi');
      }

      data.feed.push(post);
      if (!simpan()) {
        data.feed.pop();
        return gagal('Gambar terlalu besar untuk disimpan di prototype ini.', 'gambar');
      }
      // Karya yang ditulis langsung di Beranda ikut masuk portofolio supaya tetap satu sumber
      if (jenis === 'karya') {
        if (!proyek) {
          proyek = { id: idBaru(data.cv.projects), id_alumni: idAlumni, nama_proyek: post.karya.nama, peran_proyek: 'Pembuat Produk', tahun_proyek: new Date().getFullYear(), stack_proyek: post.karya.stack.join(', '), link_proyek: post.karya.link, deskripsi_proyek: teks || post.karya.tagline };
          data.cv.projects.push(proyek);
        }
        proyek.id_post = post.id;
        post.karya.id_proyek = proyek.id;
        simpan();
      }
      return { ok: true, id: post.id };
    },

    hapus(id, idAlumni) {
      const data = muat();
      const p = feed.cari(id);
      if (p?.id_alumni !== idAlumni) return;
      data.feed = data.feed.filter(x => x !== p);
      // Proyeknya tetap di portofolio dan bisa dipublikasikan lagi
      data.cv.projects.forEach(r => { if (r.id_post === p.id) r.id_post = null; });
      simpan();
    },

    suka(id, idAlumni) {
      const p = feed.cari(id);
      if (!p) return;
      p.suka = p.suka.includes(idAlumni) ? p.suka.filter(x => x !== idAlumni) : [...p.suka, idAlumni];
      simpan();
    },

    komentar(id, idAlumni, isi) {
      const p = feed.cari(id);
      const teks = bersih(isi);
      if (!p || !teks) return;
      p.komentar.push({ id: idBaru(p.komentar), id_alumni: idAlumni, isi: teks, waktu: new Date().toISOString() });
      simpan();
    },

    // ----- Karya: feedback tester, tanggapan pembuat, dan rilis Live -----
    feedback(id, idUser, { kategori, isi, upvote = false }) {
      const p = feed.cari(id);
      const teks = bersih(isi);
      if (p?.jenis !== 'karya') return gagal('Feedback hanya untuk karya.');
      if (p.id_alumni === idUser) return gagal('Anda tidak bisa memberi feedback untuk karya sendiri.');
      if (!OPSI.kategori_feedback.includes(kategori)) return gagal('Pilih kategori feedback.', 'kategori');
      if (!teks) return gagal('Tulis feedback Anda.', 'isi');
      p.feedback.push({ id: idBaru(p.feedback), id_user: idUser, kategori, isi: teks, status: '', waktu: kini() });
      if (upvote && !p.suka.includes(idUser)) p.suka.push(idUser);
      beritahu(p.id_alumni, 'flask-conical', `${akun.cari(idUser).nama} memberi feedback ${kategori} untuk ${p.karya.nama}.`, `beranda.html#post-${p.id}`);
      simpan();
      return { ok: true };
    },

    // Bug ditandai diperbaiki, masukan lain ditandai diterapkan. Apresiasi tidak perlu ditanggapi.
    tanggapi(id, idFeedback, idUser) {
      const p = feed.cari(id);
      const f = p?.feedback?.find(x => x.id === Number(idFeedback));
      if (!f || p.id_alumni !== idUser) return gagal('Hanya pembuat karya yang bisa menanggapi feedback.');
      if (f.kategori === 'Apresiasi' || f.status) return gagal('Feedback ini tidak perlu ditanggapi lagi.');
      f.status = f.kategori === 'Bug' ? 'diperbaiki' : 'diterapkan';
      beritahu(f.id_user, 'circle-check', `Feedback ${f.kategori} Anda untuk ${p.karya.nama} sudah ${f.status}. Terima kasih!`, `beranda.html#post-${p.id}`);
      simpan();
      return { ok: true };
    },

    rilis(id, idUser) {
      const p = feed.cari(id);
      if (p?.jenis !== 'karya' || p.id_alumni !== idUser) return gagal('Hanya pembuat karya yang bisa mengubah tahap.');
      if (p.karya.tahap === 'live') return gagal('Karya ini sudah Live.');
      Object.assign(p.karya, { tahap: 'live', fokus: [] });
      simpan();
      return { ok: true };
    },

    promosikanKeLive(id, idUser) {
      return feed.rilis(id, idUser);
    },

    // Koordinator menyematkan karya Live ke carousel Beranda selama 30 hari. Tekan lagi untuk melepas.
    spotlight(id, idUser) {
      const p = feed.cari(id);
      if (!adalahKoor(idUser)) return gagal('Spotlight khusus koordinator.');
      if (p?.karya?.tahap !== 'live') return gagal('Hanya karya Live yang bisa masuk spotlight.');
      const aktif = p.spotlight_sampai > kini();
      p.spotlight_sampai = aktif ? '' : new Date(Date.now() + 30 * 864e5).toISOString();
      if (!aktif) beritahu(p.id_alumni, 'trophy', `${p.karya.nama} masuk Spotlight Beranda selama 30 hari.`, `beranda.html#post-${p.id}`);
      simpan();
      return { ok: true };
    },

    spotlightAktif: () => feed.semua().filter(p => p.spotlight_sampai > kini()),

    // ponytail: ambang lencana tetap (3 feedback, 2 ditanggapi), jadikan pengaturan koordinator kalau perlu diubah
    lencanaTester(idUser) {
      const milik = muat().feed.flatMap(p => p.feedback || []).filter(f => f.id_user === idUser);
      if (milik.filter(f => f.status).length >= 2) return 'Quality Contributor';
      return milik.length >= 3 ? 'Active Tester' : '';
    },

    // ----- Referral: bukan job board, sistem hanya mempertemukan dan tidak mencatat proses di kantor -----
    ajukan(id, idUser, { format, pesan }) {
      const p = feed.cari(id);
      const teks = bersih(pesan);
      if (p?.jenis !== 'referral') return gagal('Postingan referral tidak ditemukan.');
      if (p.id_alumni === idUser) return gagal('Anda tidak bisa mengajukan ke referral sendiri.');
      if (p.referral.batas < hariIni()) return gagal('Batas waktu review referral ini sudah lewat.');
      if (p.pengajuan.some(a => a.id_user === idUser)) return gagal('Anda sudah mengajukan ke referral ini.');
      if (!OPSI.format_cv.includes(format)) return gagal('Pilih versi CV yang dilampirkan.', 'format');
      if (!teks) return gagal('Tulis pesan perkenalan singkat.', 'pesan');
      if (teks.length > 250) return gagal('Pesan perkenalan maksimal 250 karakter.', 'pesan');
      p.pengajuan.push({ id: idBaru(p.pengajuan), id_user: idUser, format, pesan: teks, status: 'menunggu', masukan: '', waktu: kini() });
      beritahu(p.id_alumni, 'send', `${akun.cari(idUser).nama} meminta review dan referral untuk ${p.referral.posisi}.`, `beranda.html#post-${p.id}`);
      simpan();
      return { ok: true };
    },

    hubungi(id, idPengajuan, idUser) {
      const c = cariPengajuan(id, idPengajuan, idUser);
      if (!c.ok) return c;
      c.a.status = 'dihubungi';
      beritahu(c.a.id_user, 'message-circle', `${akun.cari(idUser).nama} akan menghubungi Anda lewat WhatsApp soal referral ${c.p.referral.posisi}.`, `beranda.html#post-${c.p.id}`);
      simpan();
      return { ok: true };
    },

    beriMasukan(id, idPengajuan, idUser, masukan) {
      const c = cariPengajuan(id, idPengajuan, idUser);
      const teks = bersih(masukan);
      if (!c.ok) return c;
      if (!teks) return gagal('Tulis masukan singkat.', 'masukan');
      if (teks.length > 150) return gagal('Masukan maksimal 150 karakter.', 'masukan');
      Object.assign(c.a, { status: 'masukan', masukan: teks });
      beritahu(c.a.id_user, 'lightbulb', `Masukan dari ${akun.cari(idUser).nama} untuk referral ${c.p.referral.posisi}: "${teks}"`, `beranda.html#post-${c.p.id}`);
      simpan();
      return { ok: true };
    },
  };

  // ===================== GIGS & PROYEK =====================
  // Status: open (buka lamaran) -> progress (sedang dikerjakan) -> selesai, atau batal
  function mulaiKerja(g) {
    g.status = 'progress';
    g.pelamar.filter(a => a.status === 'menunggu').forEach(a => {
      a.status = 'ditolak';
      beritahu(a.id_user, 'circle-x', `Tim "${g.judul}" sudah lengkap, pengajuan Anda belum diterima.`, `gigs.html?id=${g.id}`);
    });
  }

  const gigs = {
    semua: () => [...muat().gigs].sort((a, b) => ms(b.waktu) - ms(a.waktu)),
    cari: id => muat().gigs.find(g => g.id === Number(id)),
    terisi: g => g.pelamar.filter(a => a.status === 'diterima').length,
    milik: idUser => gigs.semua().filter(g => g.id_owner === idUser),
    dilamar: idUser => gigs.semua().filter(g => g.pelamar.some(a => a.id_user === idUser)),

    daftar({ kata = '', peran = '', stack = '', budget = '', status = 'open' } = {}) {
      const dicari = bersih(kata).toLowerCase();
      return gigs.semua().filter(g => (!status || g.status === status)
        && (!peran || g.peran.includes(peran))
        && (!stack || g.stack.some(s => s.toLowerCase() === stack.toLowerCase()))
        && (!budget || g.budget === budget)
        && (!dicari || [g.judul, g.deskripsi, ...g.stack].join(' ').toLowerCase().includes(dicari)));
    },

    simpan(idUser, form) {
      const data = muat();
      const g = {
        judul: bersih(form.judul), peran: (form.peran || []).filter(p => OPSI.peran_gig.includes(p)), stack: daftarKata(form.stack),
        deskripsi: bersih(form.deskripsi), budget: form.budget, deadline: form.deadline || '', kuota: Number(form.kuota),
      };
      if (g.judul.length < 10) return gagal('Judul proyek minimal 10 karakter.', 'judul');
      if (!g.peran.length) return gagal('Pilih minimal satu kategori peran.', 'peran');
      if (!g.stack.length) return gagal('Isi tech stack, pisahkan dengan koma.', 'stack');
      if (!g.deskripsi) return gagal('Tulis deskripsi dan deliverables.', 'deskripsi');
      if (!OPSI.budget_gig.includes(g.budget)) return gagal('Pilih rentang budget.', 'budget');
      if (!g.deadline || g.deadline < hariIni()) return gagal('Deadline tidak boleh lewat dari hari ini.', 'deadline');
      if (!Number.isInteger(g.kuota) || g.kuota < 1 || g.kuota > 10) return gagal('Kuota tim antara 1 sampai 10 orang.', 'kuota');
      const baru = { id: idBaru(data.gigs), id_owner: idUser, ...g, status: 'open', waktu: kini(), pelamar: [], endorsement: '', selesai_pada: '' };
      data.gigs.push(baru);
      simpan();
      return { ok: true, id: baru.id };
    },

    lamar(id, idUser, { pesan, portofolio = [], format }) {
      const g = gigs.cari(id);
      const teks = bersih(pesan);
      const milik = cv.milik('projects', idUser).map(r => r.id);
      const lampiran = [...new Set(portofolio.map(Number))];
      if (g?.status !== 'open') return gagal('Gig ini sudah tidak menerima pelamar.');
      if (g.id_owner === idUser) return gagal('Anda tidak bisa melamar gig sendiri.');
      if (g.pelamar.some(a => a.id_user === idUser)) return gagal('Anda sudah mengajukan minat di gig ini.');
      if (!teks) return gagal('Tulis pitching singkat.', 'pesan');
      if (teks.length > 250) return gagal('Pitching maksimal 250 karakter.', 'pesan');
      if (lampiran.length < 1 || lampiran.length > 2 || !lampiran.every(x => milik.includes(x))) return gagal('Lampirkan 1 sampai 2 proyek dari portofolio Anda.', 'portofolio');
      if (!OPSI.format_cv.includes(format)) return gagal('Pilih versi CV yang dilampirkan.', 'format');
      g.pelamar.push({ id: idBaru(g.pelamar), id_user: idUser, format, pesan: teks, portofolio: lampiran, status: 'menunggu', waktu: kini() });
      beritahu(g.id_owner, 'hand', `${akun.cari(idUser).nama} mengajukan minat di "${g.judul}".`, `gigs.html?id=${g.id}`);
      simpan();
      return { ok: true };
    },

    // Gig mulai dikerjakan otomatis saat kuota tim penuh, atau lebih awal lewat gigs.mulai
    putuskan(id, idPelamar, idUser, terima) {
      const g = gigs.cari(id);
      const a = g?.pelamar.find(x => x.id === Number(idPelamar));
      if (!a || g.id_owner !== idUser) return gagal('Hanya pemilik proyek yang bisa memilih pelamar.');
      if (g.status !== 'open' || a.status !== 'menunggu') return gagal('Pelamar ini sudah diputuskan.');
      a.status = terima ? 'diterima' : 'ditolak';
      beritahu(a.id_user, terima ? 'circle-check' : 'circle-x', terima ? `Anda diterima di "${g.judul}". Kontak pemilik proyek sudah terbuka.` : `Pengajuan Anda di "${g.judul}" belum diterima.`, `gigs.html?id=${g.id}`);
      if (terima && gigs.terisi(g) >= g.kuota) mulaiKerja(g);
      simpan();
      return { ok: true };
    },

    mulai(id, idUser) {
      const g = gigs.cari(id);
      if (g?.id_owner !== idUser || g.status !== 'open') return gagal('Gig ini tidak bisa dimulai.');
      if (!gigs.terisi(g)) return gagal('Terima minimal satu pelamar terlebih dahulu.');
      mulaiKerja(g);
      simpan();
      return { ok: true };
    },

    selesai(id, idUser, { endorsement, bagikan }) {
      const data = muat();
      const g = gigs.cari(id);
      const teks = bersih(endorsement);
      if (g?.id_owner !== idUser || g.status !== 'progress') return gagal('Gig ini belum bisa ditandai selesai.');
      if (!teks) return gagal('Tulis catatan rekomendasi untuk tim Anda.', 'endorsement');
      const owner = akun.cari(idUser);
      const tim = g.pelamar.filter(a => a.status === 'diterima').map(a => a.id_user);
      Object.assign(g, { status: 'selesai', endorsement: teks, selesai_pada: kini() });
      // Pengalaman freelance masuk ke portofolio kontributor, jadi ikut terbaca di Profil Saya dan Generate CV
      tim.forEach(idTim => {
        const list = data.cv.projects;
        list.push({ id: idBaru(list), id_alumni: idTim, nama_proyek: g.judul, peran_proyek: `Freelance ${g.peran.join(', ')} via Bengkod Gigs`, tahun_proyek: new Date().getFullYear(), stack_proyek: g.stack.join(', '), link_proyek: '', deskripsi_proyek: `Proyek dari ${owner.nama}. Endorsement: "${teks}"`, id_gig: g.id });
        beritahu(idTim, 'award', `${owner.nama} menandai "${g.judul}" selesai dan memberi endorsement. Proyeknya sudah masuk portofolio Anda.`, 'profil.html');
      });
      if (bagikan) data.feed.push(postBaru({ id: idBaru(data.feed), id_alumni: idUser, waktu: kini(), tag: tim, isi: `Proyek "${g.judul}" lewat Bengkod Gigs sudah selesai. Terima kasih untuk tim yang sudah mengerjakan. ${teks}` }));
      simpan();
      return { ok: true };
    },

    batal(id, idUser) {
      const g = gigs.cari(id);
      if (g?.id_owner !== idUser || !['open', 'progress'].includes(g.status)) return gagal('Gig ini tidak bisa dibatalkan.');
      g.status = 'batal';
      g.pelamar.filter(a => a.status !== 'ditolak').forEach(a => beritahu(a.id_user, 'circle-x', `"${g.judul}" dibatalkan oleh pemilik proyek.`, `gigs.html?id=${g.id}`));
      simpan();
      return { ok: true };
    },
  };

  // ===================== PENGUMUMAN =====================
  const pengumuman = {
    semua: () => [...muat().pengumuman].sort((a, b) => b.published_at.localeCompare(a.published_at) || b.id - a.id),
    cari: id => muat().pengumuman.find(p => p.id === Number(id)),

    simpan({ id, judul, isi }) {
      const data = muat();
      const ada = data.pengumuman.find(p => p.id === Number(id));
      if (ada) Object.assign(ada, { judul: bersih(judul), isi: bersih(isi) });
      else data.pengumuman.push({ id: idBaru(data.pengumuman), judul: bersih(judul), isi: bersih(isi), penulis: 'Koordinator Alumni', published_at: new Date().toISOString().slice(0, 10) });
      simpan();
      return { ok: true };
    },

    hapus(id) {
      const data = muat();
      data.pengumuman = data.pengumuman.filter(p => p.id !== id);
      simpan();
    },
  };

  // ===================== FORUM =====================
  const POLA_TAG = /(^|\s)#([\p{L}][\p{L}\p{N}_]*)/gu;
  const KATA_UMUM = new Set(['yang', 'dan', 'atau', 'untuk', 'dari', 'dengan', 'pada', 'apa', 'apakah', 'bagaimana', 'cara', 'ada', 'ini', 'itu', 'saya', 'kita', 'bisa', 'sudah', 'lebih', 'perlu', 'saja', 'baik']);

  // Siapa yang cocok menjawab tiap kategori, dibaca dari data tracer. Kategori lain terbuka untuk semua alumni.
  const COCOK_KATEGORI = {
    Karier: t => STATUS_BEKERJA.includes(t.status),
    Teknologi: t => t.bidang_job === 'Infokom',
    // Termasuk alumni yang bekerja sambil S2
    'Studi Lanjut': t => Boolean(t.nama_studi),
    Wirausaha: t => t.status === 'Wiraswasta',
  };
  const cocokKategori = (kategori, t) => !COCOK_KATEGORI[kategori] || Boolean(t && COCOK_KATEGORI[kategori](t));

  const kataKunci = teks => bersih(teks).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(k => k.length > 2 && !KATA_UMUM.has(k));
  const tautanDiskusi = (id, idBalasan) => `forum-detail.html?id=${id}${idBalasan ? `#balasan-${idBalasan}` : ''}`;
  const balasanDari = (t, id) => t?.balasan.find(b => b.id === Number(id));
  const balasanTampil = t => t.balasan.filter(b => !b.disembunyikan);
  const aktivitas = t => Math.max(ms(t.waktu), ...t.balasan.map(b => ms(b.waktu)));
  const skorRamai = t => t.suka.length + balasanTampil(t).length * 2 + Math.floor(t.dilihat / 10);
  const teksCari = t => [t.judul, t.isi, akun.cari(t.id_user).nama, ...balasanTampil(t).map(b => b.isi)].join(' ').toLowerCase();

  // Semua laporan atas konten yang sama ditutup bersama supaya koordinator tidak meninjau dua kali
  function tutupLaporan({ id_topik, id_balasan }, status) {
    const { t } = forum.konten({ id_topik, id_balasan });
    const pesan = status === 'selesai'
      ? `Laporan Anda di "${t.judul}" sudah ditindaklanjuti. Terima kasih.`
      : `Laporan Anda di "${t.judul}" sudah ditinjau dan tidak ditemukan pelanggaran.`;
    muat().laporan
      .filter(l => l.status === 'menunggu' && l.id_topik === id_topik && l.id_balasan === id_balasan)
      .forEach(l => {
        Object.assign(l, { status, ditinjau: kini() });
        beritahu(l.id_pelapor, 'flag', pesan, 'forum.html');
      });
  }

  const forum = {
    POLA_TAG,
    balasanTampil,
    aktivitas,
    cari: id => muat().forum.find(t => t.id === Number(id)),

    // Diskusi yang disembunyikan hanya terlihat oleh penulisnya dan koordinator
    semua: idUser => muat().forum.filter(t => !t.disembunyikan || t.id_user === idUser || adalahKoor(idUser)),

    tag: t => [...new Set([...`${t.judul} ${t.isi}`.matchAll(POLA_TAG)].map(m => m[2].toLowerCase()))],

    daftar(idUser, { tab = 'terbaru', kategori = '', tag = '', kata = '' } = {}) {
      const saring = {
        belum: t => t.jenis === 'tanya' && !t.id_jawaban && !t.disembunyikan,
        tersimpan: t => t.disimpan.includes(idUser),
        saya: t => t.id_user === idUser || t.balasan.some(b => b.id_user === idUser),
        tersembunyi: t => t.disembunyikan,
      }[tab] || (() => true);
      const dicari = bersih(kata).toLowerCase();
      const list = forum.semua(idUser).filter(t => saring(t)
        && (!kategori || t.kategori === kategori)
        && (!tag || forum.tag(t).includes(tag))
        && (!dicari || teksCari(t).includes(dicari)));
      if (tab === 'populer') return list.sort((a, b) => skorRamai(b) - skorRamai(a) || b.id - a.id);
      // Diskusi yang baru dibalas naik ke atas, yang disematkan tetap paling atas di tab Terbaru
      return list.sort((a, b) => (tab === 'terbaru' ? b.sematkan - a.sematkan : 0) || aktivitas(b) - aktivitas(a));
    },

    tagPopuler(idUser) {
      const jumlah = new Map();
      forum.semua(idUser).filter(t => !t.disembunyikan).forEach(t => forum.tag(t).forEach(x => jumlah.set(x, (jumlah.get(x) || 0) + 1)));
      return [...jumlah].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8);
    },

    // ponytail: hanya mencocokkan kata di judul, ganti ke pencarian teks penuh saat sudah memakai backend
    serupa(judul, idUser, kecuali = 0) {
      const kata = kataKunci(judul);
      if (!kata.length) return [];
      return forum.semua(idUser)
        .filter(t => t.id !== kecuali && !t.disembunyikan)
        .map(t => ({ t, sama: kata.filter(k => kataKunci(t.judul).includes(k)).length }))
        .filter(x => x.sama >= Math.min(2, kata.length))
        .sort((a, b) => b.sama - a.sama)
        .slice(0, 3)
        .map(x => x.t);
    },

    // Diskusi serupa didahulukan, lalu dilengkapi diskusi satu kategori
    terkait(t, idUser) {
      const sekategori = forum.daftar(idUser, { kategori: t.kategori }).filter(x => x.id !== t.id && !x.disembunyikan);
      return [...new Set([...forum.serupa(t.judul, idUser, t.id), ...sekategori])].slice(0, 3);
    },

    simpan(idUser, { id, jenis, kategori, judul, isi, gambar, opsi = [] }) {
      const data = muat();
      const ada = forum.cari(id);
      if (id && ada?.id_user !== idUser) return gagal('Hanya penulis yang bisa mengubah diskusi ini.');
      const jenisAkhir = ada ? ada.jenis : jenis;
      const teksJudul = bersih(judul);
      const teksIsi = bersih(isi);
      const pilihan = [...new Set(opsi.map(bersih).filter(Boolean))];
      if (!OPSI.jenis_forum.includes(jenisAkhir)) return gagal('Pilih jenis diskusi.', 'jenis');
      if (!OPSI.kategori_forum.includes(kategori)) return gagal('Pilih kategori yang sesuai.', 'kategori');
      if (teksJudul.length < 10) return gagal('Judul minimal 10 karakter agar mudah dipahami.', 'judul');
      if (jenisAkhir !== 'polling' && !teksIsi) return gagal('Isi diskusi wajib ditulis.', 'isi');
      if (!ada && jenis === 'polling' && pilihan.length < 2) return gagal('Polling butuh minimal dua pilihan yang berbeda.', 'opsi');

      const GAMBAR_BESAR = gagal('Gambar terlalu besar untuk disimpan di prototype ini.', 'gambar');
      if (ada) {
        const gambarLama = ada.gambar;
        Object.assign(ada, { kategori, judul: teksJudul, isi: teksIsi, gambar: gambar || ada.gambar, diubah: kini() });
        if (simpan()) return { ok: true, id: ada.id };
        ada.gambar = gambarLama;
        return GAMBAR_BESAR;
      }
      const baru = diskusiBaru({
        id: idBaru(data.forum), id_user: idUser, jenis, kategori, judul: teksJudul, isi: teksIsi, gambar: gambar || '', waktu: kini(),
        opsi: pilihan.map((teks, i) => ({ id: i + 1, teks, suara: [] })),
      });
      data.forum.push(baru);
      if (simpan()) return { ok: true, id: baru.id };
      data.forum.pop();
      return GAMBAR_BESAR;
    },

    hapus(id, idUser) {
      const data = muat();
      if (forum.cari(id)?.id_user !== idUser) return gagal('Hanya penulis yang bisa menghapus diskusi ini.');
      data.forum = data.forum.filter(t => t.id !== Number(id));
      data.laporan = data.laporan.filter(l => l.id_topik !== Number(id));
      simpan();
      return { ok: true };
    },

    // ponytail: tiap muat ulang dihitung, simpan daftar pembaca kalau butuh angka unik
    lihat(id) {
      const t = forum.cari(id);
      if (!t) return;
      t.dilihat += 1;
      simpan();
    },

    suka(id, idUser, idBalasan) {
      const t = forum.cari(id);
      const sasaran = idBalasan ? balasanDari(t, idBalasan) : t;
      if (!sasaran) return;
      sasaran.suka = alihkan(sasaran.suka, idUser);
      simpan();
    },

    tandai(id, idUser) {
      const t = forum.cari(id);
      if (!t) return;
      t.disimpan = alihkan(t.disimpan, idUser);
      simpan();
    },

    pilihOpsi(id, idOpsi, idUser) {
      const t = forum.cari(id);
      const opsi = t?.opsi.find(o => o.id === Number(idOpsi));
      if (!opsi || t.kunci || adalahKoor(idUser) || t.opsi.some(o => o.suara.includes(idUser))) return gagal('Suara tidak dapat disimpan.');
      opsi.suara.push(idUser);
      simpan();
      return { ok: true };
    },

    balas(id, idUser, isi, idInduk) {
      const t = forum.cari(id);
      const teks = bersih(isi);
      if (!t || t.kunci || t.disembunyikan) return gagal('Diskusi ini sudah ditutup.');
      if (!teks) return gagal('Tulis balasan terlebih dahulu.', 'isi');
      const induk = balasanDari(t, idInduk);
      const baru = balasanBaru({
        id: idBaru(t.balasan), id_user: idUser, isi: teks, waktu: kini(),
        // Balasan hanya satu tingkat: membalas balasan tetap masuk ke induk yang sama
        id_induk: induk ? induk.id_induk || induk.id : null,
        id_tujuan: induk ? induk.id_user : null,
      });
      t.balasan.push(baru);
      const nama = akun.cari(idUser).nama;
      new Set([t.id_user, induk?.id_user]).forEach(penerima => {
        if (penerima && penerima !== idUser) beritahu(penerima, 'message-square', `${nama} membalas "${t.judul}".`, tautanDiskusi(t.id, baru.id));
      });
      simpan();
      return { ok: true, id: baru.id };
    },

    ubahBalasan(id, idBalasan, idUser, isi) {
      const b = balasanDari(forum.cari(id), idBalasan);
      const teks = bersih(isi);
      if (b?.id_user !== idUser) return gagal('Hanya penulis yang bisa mengubah balasan ini.');
      if (!teks) return gagal('Balasan tidak boleh kosong.', 'isi');
      Object.assign(b, { isi: teks, diubah: kini() });
      simpan();
      return { ok: true };
    },

    hapusBalasan(id, idBalasan, idUser) {
      const data = muat();
      const t = forum.cari(id);
      const b = balasanDari(t, idBalasan);
      if (b?.id_user !== idUser) return gagal('Hanya penulis yang bisa menghapus balasan ini.');
      // Balasan di bawahnya ikut terhapus agar tidak ada percakapan yang kehilangan induk
      const hilang = t.balasan.filter(x => x.id === b.id || x.id_induk === b.id).map(x => x.id);
      t.balasan = t.balasan.filter(x => !hilang.includes(x.id));
      if (hilang.includes(t.id_jawaban)) t.id_jawaban = null;
      data.laporan = data.laporan.filter(l => !(l.id_topik === t.id && hilang.includes(l.id_balasan)));
      simpan();
      return { ok: true };
    },

    // Penanya memilih jawaban, koordinator bisa membantu kalau penanya tidak kembali. Pilih lagi untuk membatalkan.
    pilihJawaban(id, idBalasan, idUser) {
      const t = forum.cari(id);
      const b = balasanDari(t, idBalasan);
      if (!b || b.id_induk || b.disembunyikan || t.jenis !== 'tanya') return gagal('Balasan ini tidak bisa dipilih sebagai jawaban.');
      if (t.id_user !== idUser && !adalahKoor(idUser)) return gagal('Hanya penanya atau koordinator yang bisa memilih jawaban.');
      t.id_jawaban = t.id_jawaban === b.id ? null : b.id;
      if (t.id_jawaban && b.id_user !== idUser) beritahu(b.id_user, 'circle-check', `Jawaban Anda dipilih sebagai jawaban terbaik di "${t.judul}".`, tautanDiskusi(t.id, b.id));
      simpan();
      return { ok: true };
    },

    reputasi(idUser) {
      let jawaban = 0;
      let suka = 0;
      muat().forum.forEach(t => balasanTampil(t).filter(b => b.id_user === idUser).forEach(b => {
        jawaban += t.id_jawaban === b.id ? 1 : 0;
        suka += b.suka.length;
      }));
      return { jawaban, suka, poin: jawaban * 5 + suka };
    },

    palingMembantu: () => akun.alumni()
      .map(user => ({ user, ...forum.reputasi(user.id) }))
      .filter(x => x.poin > 0)
      .sort((a, b) => b.poin - a.poin)
      .slice(0, 5),

    // Alumni yang cocok menurut data tracer, yang paling sering membantu di atas. Orang yang sudah terlibat tidak ditawarkan lagi.
    bisaBantu(t) {
      const terlibat = new Set([t.id_user, ...t.balasan.map(b => b.id_user)]);
      return muat().tracer
        .filter(a => cocokKategori(t.kategori, a) && !terlibat.has(a.id_alumni))
        .sort((a, b) => forum.reputasi(b.id_alumni).poin - forum.reputasi(a.id_alumni).poin || a.tahun_lulus - b.tahun_lulus || a.id_alumni - b.id_alumni)
        .slice(0, 3)
        .map(a => akun.cari(a.id_alumni));
    },

    // Pertanyaan terbuka yang sesuai dengan data tracer pengguna. Koordinator melihat semuanya.
    untukSaya(idUser) {
      const saya = tracer.milik(idUser);
      return forum.daftar(idUser, { tab: 'belum' })
        .filter(t => t.id_user !== idUser && !t.balasan.some(b => b.id_user === idUser) && (adalahKoor(idUser) || cocokKategori(t.kategori, saya)))
        .slice(0, 3);
    },

    undang(id, idUser, idAlumni) {
      const t = forum.cari(id);
      if (!t || (t.id_user !== idUser && !adalahKoor(idUser))) return gagal('Hanya penanya atau koordinator yang bisa mengundang.');
      if (t.undangan.includes(idAlumni)) return gagal('Alumni ini sudah diundang.');
      t.undangan.push(idAlumni);
      beritahu(idAlumni, 'life-buoy', `${akun.cari(idUser).nama} meminta bantuan Anda di "${t.judul}".`, tautanDiskusi(t.id));
      simpan();
      return { ok: true };
    },

    // Alumni yang menulis diskusi atau balasan dalam 30 hari terakhir
    alumniAktif() {
      const batas = Date.now() - 30 * 24 * 60 * 60 * 1000;
      const aktif = new Set();
      muat().forum.forEach(t => [t, ...t.balasan].forEach(x => { if (ms(x.waktu) >= batas && !adalahKoor(x.id_user)) aktif.add(x.id_user); }));
      return aktif.size;
    },

    // Moderasi koordinator: menyematkan atau menutup diskusi
    atur(id, idUser, kolom) {
      const t = forum.cari(id);
      if (!t || !adalahKoor(idUser) || !['sematkan', 'kunci'].includes(kolom)) return gagal('Tindakan ini khusus koordinator.');
      t[kolom] = !t[kolom];
      simpan();
      return { ok: true };
    },

    konten({ id_topik, id_balasan }) {
      const t = forum.cari(id_topik);
      const b = id_balasan ? balasanDari(t, id_balasan) : null;
      return { t, b, sasaran: id_balasan ? b : t };
    },

    // Konten tidak dihapus agar bisa dipulihkan kalau koordinator keliru
    sembunyikan(target, idUser, alasan) {
      const { t, b, sasaran } = forum.konten(target);
      const teks = bersih(alasan);
      if (!adalahKoor(idUser)) return gagal('Hanya koordinator yang bisa menyembunyikan konten.');
      if (!sasaran) return gagal('Konten tidak ditemukan.');
      if (!teks) return gagal('Pilih alasan terlebih dahulu.', 'alasan');
      sasaran.disembunyikan = teks;
      if (b && t.id_jawaban === b.id) t.id_jawaban = null;
      if (sasaran.id_user !== idUser) beritahu(sasaran.id_user, 'eye-off', `${b ? 'Balasan' : 'Diskusi'} Anda di "${t.judul}" disembunyikan koordinator. Alasan: ${teks}.`, tautanDiskusi(t.id, b?.id));
      tutupLaporan(target, 'selesai');
      simpan();
      return { ok: true };
    },

    pulihkan(target, idUser) {
      const { t, b, sasaran } = forum.konten(target);
      if (!adalahKoor(idUser)) return gagal('Hanya koordinator yang bisa memulihkan konten.');
      if (!sasaran) return gagal('Konten tidak ditemukan.');
      sasaran.disembunyikan = '';
      if (sasaran.id_user !== idUser) beritahu(sasaran.id_user, 'eye', `${b ? 'Balasan' : 'Diskusi'} Anda di "${t.judul}" sudah dipulihkan.`, tautanDiskusi(t.id, b?.id));
      simpan();
      return { ok: true };
    },

    lapor(idUser, { id_topik, id_balasan, alasan, catatan }) {
      const data = muat();
      const idTopik = Number(id_topik);
      const idBalasan = Number(id_balasan) || null;
      const { t, b, sasaran } = forum.konten({ id_topik: idTopik, id_balasan: idBalasan });
      const teks = bersih(catatan);
      if (!sasaran) return gagal('Konten tidak ditemukan.');
      if (sasaran.id_user === idUser || adalahKoor(idUser)) return gagal('Konten ini tidak bisa Anda laporkan.');
      if (!OPSI.alasan_laporan.includes(alasan)) return gagal('Pilih alasan laporan.', 'alasan');
      if (alasan === 'Lainnya' && !teks) return gagal('Jelaskan alasan laporan Anda.', 'catatan');
      if (data.laporan.some(l => l.status === 'menunggu' && l.id_pelapor === idUser && l.id_topik === idTopik && l.id_balasan === idBalasan)) return gagal('Anda sudah melaporkan konten ini.');
      data.laporan.push({ id: idBaru(data.laporan), id_pelapor: idUser, id_topik: idTopik, id_balasan: idBalasan, alasan, catatan: teks, status: 'menunggu', waktu: kini(), ditinjau: '' });
      const nama = akun.cari(idUser).nama;
      data.users.filter(u => u.role === 'admin').forEach(u => beritahu(u.id, 'flag', `${nama} melaporkan ${b ? 'balasan' : 'diskusi'} di "${t.judul}".`, 'laporan-forum.html'));
      simpan();
      return { ok: true };
    },

    laporan: status => muat().laporan.filter(l => l.status === status).sort((a, b) => ms(b.waktu) - ms(a.waktu)),

    // status: selesai berarti konten disembunyikan, diabaikan berarti konten tetap tampil
    tinjau(idLaporan, idUser, status) {
      const l = muat().laporan.find(x => x.id === Number(idLaporan));
      if (!adalahKoor(idUser)) return gagal('Hanya koordinator yang bisa meninjau laporan.');
      if (l?.status !== 'menunggu') return gagal('Laporan ini sudah ditinjau.');
      if (status === 'selesai') return forum.sembunyikan(l, idUser, l.alasan === 'Lainnya' ? l.catatan : l.alasan);
      tutupLaporan(l, 'diabaikan');
      simpan();
      return { ok: true };
    },
  };

  // ===================== NOTIFIKASI =====================
  const notifikasi = {
    milik: idUser => muat().notifikasi.filter(n => n.id_user === idUser).sort((a, b) => ms(b.waktu) - ms(a.waktu) || b.id - a.id),

    baca(id) {
      const n = muat().notifikasi.find(x => x.id === Number(id));
      if (!n) return;
      n.dibaca = true;
      simpan();
    },

    bacaSemua(idUser) {
      muat().notifikasi.forEach(n => { if (n.id_user === idUser) n.dibaca = true; });
      simpan();
    },

    hapus(id) {
      const d = muat();
      d.notifikasi = d.notifikasi.filter(x => x.id !== Number(id));
      simpan();
    },

    hapusSemua(idUser) {
      const d = muat();
      d.notifikasi = d.notifikasi.filter(x => x.id_user !== idUser);
      simpan();
    },
  };

  function reset() {
    db = buatDataAwal();
    simpan();
    akun.keluar();
  }

  window.DB = { STATUS, STATUS_BEKERJA, STATUS_STUDI, STATUS_TIDAK_BEKERJA, OPSI, hariIni, akun, tracer, statistik, cv, feed, gigs, forum, notifikasi, pengumuman, reset };
})();
