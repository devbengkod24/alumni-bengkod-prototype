// Cek alur data utama tanpa browser. Jalankan: node cek-data.js
const assert = require('node:assert/strict');

const simpanan = new Map();
globalThis.localStorage = {
  getItem: k => (simpanan.has(k) ? simpanan.get(k) : null),
  setItem: (k, v) => simpanan.set(k, String(v)),
  removeItem: k => simpanan.delete(k),
};
globalThis.window = globalThis;
require('./assets/js/data.js');

const { akun, tracer, statistik, cv, feed, gigs, forum, notifikasi, pengumuman, reset } = window.DB;
const NADIA = 900;
const RIZKY = 2;
const KOOR = 1;
const YOGA = 10;
const DIMAS = 8;
const FAJAR = 4;
const INTAN = 7;
const ARIF = 12;
const TAHUN = new Date().getFullYear();

const jawaban = {
  jns_kelamin: 'Perempuan', nim: 'A11.2022.99999', tahun_masuk: TAHUN - 4, tahun_lulus: TAHUN, no_hp: '081299990000', kota: 'Semarang',
  status: 'Wiraswasta', bidang_job: 'Infokom', jns_job: 'Wirausaha', nama_job: 'Toko Kode', jabatan_job: 'Founder', lingkup_job: 'Nasional',
};

// Login, daftar, dan OTP
reset();
assert.equal(akun.masuk('koordinator@contoh.id', 'koor12345').user.role, 'admin');
assert.equal(akun.masuk('rizky@contoh.id', 'salah').field, 'password');
assert.equal(akun.masuk('tidakada@contoh.id', 'x').field, 'email');
const baru = akun.daftar({ nama: 'Uji', email: 'uji@contoh.id', password: 'rahasia1' });
assert.equal(baru.user.role, 'alumni');
assert.equal(akun.daftar({ nama: 'Uji', email: 'UJI@contoh.id', password: 'rahasia1' }).field, 'email');
assert.equal(akun.daftar({ nama: 'Pendek', email: 'p@contoh.id', password: '123' }).field, 'password');
assert.equal(akun.masuk('uji@contoh.id', 'rahasia1').perluOtp, true);
assert.equal(akun.verifikasiOtp('uji@contoh.id', '000000').ok, false);
assert.equal(akun.verifikasiOtp('uji@contoh.id', baru.user.code).ok, true);
assert.equal(akun.masuk('uji@contoh.id', 'rahasia1').ok, true);

// Lupa password
const kode = akun.kirimUlangOtp('rizky@contoh.id').user.code;
assert.equal(akun.cekKode('rizky@contoh.id', kode), true);
assert.equal(akun.gantiPasswordLewatKode('rizky@contoh.id', kode, 'sandibaru').ok, true);
assert.equal(akun.masuk('rizky@contoh.id', 'alumni123').ok, false);
assert.equal(akun.gantiPassword(RIZKY, 'keliru', 'sandilain').field, 'lama');

// First login: akun baru dan akun demo Nadia belum punya data, Rizky sudah
reset();
assert.equal(tracer.milik(NADIA), null);
assert.ok(tracer.milik(RIZKY));
assert.equal(tracer.milik(akun.daftar({ nama: 'Baru', email: 'baru@contoh.id', password: 'rahasia1' }).user.id), null);

// Tracer menaikkan angka terdeteksi dan status Wiraswasta ikut terhitung
reset();
const sebelum = statistik.terdeteksi(TAHUN);
const wiraSebelum = tracer.jumlahPerStatus().Wiraswasta;
assert.equal(tracer.simpan(NADIA, jawaban).ok, true);
assert.equal(statistik.terdeteksi(TAHUN), sebelum + 1);
assert.equal(tracer.jumlahPerStatus().Wiraswasta, wiraSebelum + 1);
assert.equal(tracer.simpan(RIZKY, { ...jawaban, nim: 'A11.BEDA' }).field, 'no_hp');
assert.equal(tracer.simpan(RIZKY, { ...jawaban, no_hp: '0811' }).field, 'nim');
assert.equal(tracer.simpan(NADIA, { ...jawaban, tahun_masuk: TAHUN + 1 }).field, 'tahun_lulus');

// Pindah status mengosongkan jawaban cabang lama, tanpa membuat baris kedua
const jumlahTracer = tracer.semua().length;
tracer.simpan(NADIA, { ...jawaban, status: 'Melanjutkan Pendidikan', biaya_studi: 'Beasiswa', nama_studi: 'Kampus', prodi: 'S2', tgl_studi: '2026-09-01' });
assert.equal(tracer.semua().length, jumlahTracer);
assert.equal(tracer.milik(NADIA).nama_job, '');
assert.equal(tracer.milik(NADIA).prodi, 'S2');

// Karir terbaca dari cabang mana pun: studi lanjut, part time, atau belum bekerja
assert.deepEqual(tracer.karir(tracer.milik(NADIA)), { tempat: 'Kampus', posisi: 'S2', ringkas: 'S2 di Kampus' });
tracer.simpan(NADIA, { ...jawaban, status: 'Bekerja Part Time', nama_job: 'Studio Lepas', jabatan_job: 'Freelance' });
assert.equal(tracer.karir(tracer.milik(NADIA)).ringkas, 'Freelance di Studio Lepas');
tracer.simpan(NADIA, { ...jawaban, status: 'Belum Memungkinkan Bekerja' });
assert.equal(tracer.karir(tracer.milik(NADIA)).ringkas, 'Belum Memungkinkan Bekerja');
assert.equal(tracer.karir(null).tempat, '');

// Status karir: kota wajib, keahlian dipisah koma, studi lanjut dan pekerjaan sampingan bisa bersamaan dengan bekerja
reset();
assert.equal(tracer.simpan(NADIA, { ...jawaban, kota: ' ' }).field, 'kota');
tracer.simpan(NADIA, {
  ...jawaban, keahlian: 'Laravel, react , Laravel', juga_studi: '1', biaya_studi: 'Sendiri', nama_studi: 'Kampus', prodi: 'S2 Informatika', tgl_studi: '2026-09-01',
  ada_sampingan: '1', nama_sampingan: 'Klien Lepas', peran_sampingan: 'Freelance Frontend',
});
const ganda = tracer.milik(NADIA);
assert.deepEqual(ganda.keahlian, ['Laravel', 'react']);
assert.deepEqual([ganda.status, ganda.nama_job, ganda.nama_studi, ganda.nama_sampingan], ['Wiraswasta', 'Toko Kode', 'Kampus', 'Klien Lepas']);
assert.equal(tracer.karir(ganda).ringkas, 'Founder di Toko Kode'); // pekerjaan utama tetap jadi ringkasan
tracer.simpan(NADIA, jawaban);
assert.deepEqual([tracer.milik(NADIA).nama_studi, tracer.milik(NADIA).nama_sampingan], ['', '']);

// Direktori: angkatan (tahun masuk), keahlian tanpa beda huruf besar, kota, dan S2 termasuk yang bekerja sambil kuliah
const dir = saring => tracer.direktori(RIZKY, saring).map(t => t.id_alumni);
assert.ok(!dir({}).includes(RIZKY));
assert.ok(dir({ s2: true }).includes(FAJAR) && dir({ s2: true }).includes(DIMAS));
assert.ok(tracer.direktori(RIZKY, { keahlian: 'flutter' }).every(t => t.keahlian.includes('Flutter')));
const kudus = tracer.direktori(RIZKY, { kota: 'kudus', angkatan: 2018 });
assert.ok(kudus.length > 0 && kudus.every(t => t.kota === 'Kudus' && t.tahun_masuk === 2018));
assert.deepEqual(dir({ kata: 'fajar saputra' }), [FAJAR]);

// Statistik: satu baris per tahun, tahun baru dari tracer tetap muncul
assert.equal(statistik.simpan({ id: null, tahun_lulus: 2024, alumni_total: 5 }).field, 'tahun_lulus');
tracer.simpan(NADIA, { ...jawaban, tahun_masuk: 2015, tahun_lulus: 2019 });
const baris2019 = statistik.semua().find(s => s.tahun_lulus === 2019);
assert.deepEqual([baris2019.id, baris2019.alumni_total, baris2019.alumni_terlacak], [null, 0, 1]);
assert.equal(statistik.simpan({ id: null, tahun_lulus: 2019, alumni_total: 40 }).ok, true);
assert.equal(statistik.semua().filter(s => s.tahun_lulus === 2019).length, 1);
assert.equal(statistik.semua().find(s => s.tahun_lulus === 2019).alumni_total, 40);

// Feed: terbaru di atas, suka bisa dibatalkan, dan hanya pemilik yang bisa menghapus
reset();
assert.equal(window.DB.lowongan, undefined);
feed.semua().forEach(p => [p, ...p.komentar].forEach(x => assert.ok(akun.cari(x.id_alumni))));
const jumlahPost = feed.semua().length;
assert.equal(feed.tambah(NADIA, { isi: '   ', gambar: '' }).field, 'isi');
assert.equal(feed.tambah(NADIA, { isi: 'Halo alumni', gambar: '' }).ok, true);
const postBaru = feed.semua()[0];
assert.deepEqual([postBaru.isi, postBaru.id_alumni, feed.semua().length], ['Halo alumni', NADIA, jumlahPost + 1]);
feed.suka(postBaru.id, RIZKY);
assert.deepEqual(feed.cari(postBaru.id).suka, [RIZKY]);
feed.suka(postBaru.id, RIZKY);
assert.deepEqual(feed.cari(postBaru.id).suka, []);
feed.komentar(postBaru.id, RIZKY, '   ');
assert.equal(feed.cari(postBaru.id).komentar.length, 0);
feed.komentar(postBaru.id, RIZKY, 'Selamat');
assert.equal(feed.cari(postBaru.id).komentar[0].isi, 'Selamat');
feed.hapus(postBaru.id, RIZKY);
assert.ok(feed.cari(postBaru.id));
feed.hapus(postBaru.id, NADIA);
assert.equal(feed.cari(postBaru.id), undefined);

// Forum: data contoh merujuk akun yang ada, hanya dua peran, dan tidak membawa lagi lowongan atau mitra
reset();
const diskusiKoor = forum.semua(KOOR);
diskusiKoor.forEach(t => [t, ...t.balasan].forEach(x => assert.ok(akun.cari(x.id_user))));
assert.ok(!/lowongan|mitra/i.test(JSON.stringify(diskusiKoor)));
assert.deepEqual(forum.daftar(KOOR)[0].sematkan, true);
const judulPopuler = forum.daftar(RIZKY, { tab: 'populer' }).map(t => t.id);
assert.ok(!judulPopuler.includes(9));

// Forum: diskusi tersembunyi hanya terlihat oleh penulis dan koordinator
assert.ok(!forum.semua(RIZKY).some(t => t.id === 9));
assert.ok(forum.semua(15).some(t => t.id === 9));
assert.ok(forum.daftar(KOOR, { tab: 'tersembunyi' }).some(t => t.id === 9));

// Forum: saringan tab, kategori, tag, dan pencarian
assert.deepEqual(forum.daftar(RIZKY, { tab: 'belum' }).map(t => t.id).sort(), [3, 4, 8]);
assert.ok(forum.daftar(RIZKY, { kategori: 'Wirausaha' }).every(t => t.kategori === 'Wirausaha'));
assert.deepEqual(forum.daftar(RIZKY, { tag: 'laravel' }).map(t => t.id), [4]);
assert.deepEqual(forum.tag(forum.cari(2)), ['wawancara', 'backend']);
assert.ok(forum.daftar(RIZKY, { kata: 'INDEKS DATABASE' }).some(t => t.id === 2)); // kata dari isi balasan
assert.equal(forum.daftar(RIZKY, { kata: 'tidak ada di mana pun' }).length, 0);
assert.deepEqual(forum.tag({ judul: 'Lihat https://contoh.id/#bagian', isi: 'Biaya #1 dan #Karier' }), ['karier']);

// Forum: membuat diskusi, validasi, dan diskusi serupa saat menulis judul
assert.equal(forum.simpan(RIZKY, { jenis: 'tanya', kategori: 'Karier', judul: 'Pendek', isi: 'x' }).field, 'judul');
assert.equal(forum.simpan(RIZKY, { jenis: 'tanya', kategori: 'Lowongan', judul: 'Judul yang cukup panjang', isi: 'x' }).field, 'kategori');
assert.equal(forum.simpan(RIZKY, { jenis: 'tanya', kategori: 'Karier', judul: 'Judul yang cukup panjang', isi: '  ' }).field, 'isi');
assert.equal(forum.simpan(RIZKY, { jenis: 'polling', kategori: 'Karier', judul: 'Judul yang cukup panjang', isi: '', opsi: ['Sama', ' Sama '] }).field, 'opsi');
assert.deepEqual(forum.serupa('Tips wawancara backend pertama', RIZKY).map(t => t.id), [2]);
assert.deepEqual(forum.serupa('yang dan atau', RIZKY), []);
const buat = forum.simpan(YOGA, { jenis: 'tanya', kategori: 'Studi Lanjut', judul: 'Tes bahasa Inggris untuk S2 luar negeri', isi: 'Mulai dari mana?' });
const baruForum = forum.cari(buat.id);
assert.equal(forum.daftar(RIZKY)[1].id, buat.id); // tepat di bawah diskusi yang disematkan
assert.equal(forum.simpan(RIZKY, { id: buat.id, kategori: 'Karier', judul: 'Diambil alih oleh orang lain', isi: 'x' }).ok, false);
assert.equal(forum.simpan(YOGA, { id: buat.id, kategori: 'Karier', judul: 'Tes bahasa Inggris untuk S2', isi: 'Ubah' }).ok, true);
assert.deepEqual([baruForum.kategori, baruForum.isi, baruForum.jenis, Boolean(baruForum.diubah)], ['Karier', 'Ubah', 'tanya', true]);

// Forum: alumni yang bisa bantu dibaca dari tracer, dan undangan sampai sebagai notifikasi
const s2 = forum.cari(3);
const pembantu = forum.bisaBantu(s2);
assert.ok(pembantu.length > 0 && pembantu.every(a => tracer.milik(a.id).nama_studi)); // termasuk yang bekerja sambil S2
assert.ok(forum.bisaBantu(forum.cari(6)).every(a => tracer.milik(a.id).status === 'Wiraswasta' && a.id !== 5));
assert.ok(forum.untukSaya(DIMAS).some(t => t.id === 3));
assert.ok(!forum.untukSaya(RIZKY).some(t => t.id === 3));
assert.ok(forum.untukSaya(KOOR).length > 0);
assert.equal(forum.undang(3, RIZKY, DIMAS).ok, false);
assert.equal(forum.undang(3, 3, DIMAS).ok, true);
assert.equal(forum.undang(3, 3, DIMAS).ok, false);
assert.match(notifikasi.milik(DIMAS)[0].pesan, /meminta bantuan Anda/);

// Forum: balasan memberi tahu penulis, balasan bertingkat tetap satu tingkat
assert.equal(forum.balas(3, DIMAS, '   ').field, 'isi');
const balasDimas = forum.balas(3, DIMAS, 'Coba beasiswa dari kampus tujuan.');
assert.match(notifikasi.milik(3)[0].pesan, /membalas/);
const balasAnak = forum.balas(3, RIZKY, 'Terima kasih infonya.', balasDimas.id);
const balasCucu = forum.balas(3, 3, 'Saya coba dulu.', balasAnak.id);
assert.equal(s2.balasan.find(b => b.id === balasCucu.id).id_induk, balasDimas.id);
assert.equal(s2.balasan.find(b => b.id === balasCucu.id).id_tujuan, RIZKY);
assert.equal(forum.ubahBalasan(3, balasDimas.id, RIZKY, 'Bukan milik saya').ok, false);
assert.equal(forum.ubahBalasan(3, balasDimas.id, DIMAS, 'Coba LPDP dan beasiswa kampus.').ok, true);

// Forum: hanya penanya atau koordinator yang memilih jawaban, balasan bertingkat tidak bisa dipilih
assert.equal(forum.pilihJawaban(3, balasDimas.id, RIZKY).ok, false);
assert.equal(forum.pilihJawaban(3, balasAnak.id, 3).ok, false);
assert.equal(forum.pilihJawaban(3, balasDimas.id, 3).ok, true);
assert.equal(s2.id_jawaban, balasDimas.id);
assert.ok(!forum.daftar(RIZKY, { tab: 'belum' }).some(t => t.id === 3));
assert.equal(forum.reputasi(DIMAS).jawaban, 1);
assert.match(notifikasi.milik(DIMAS)[0].pesan, /jawaban terbaik/);
forum.pilihJawaban(3, balasDimas.id, KOOR);
assert.equal(s2.id_jawaban, null);
assert.equal(forum.pilihJawaban(1, 1, KOOR).ok, false); // bukan pertanyaan

// Forum: menghapus balasan ikut membersihkan anak, jawaban terpilih, dan laporannya
forum.pilihJawaban(3, balasDimas.id, 3);
assert.equal(forum.lapor(NADIA, { id_topik: 3, id_balasan: balasAnak.id, alasan: 'Spam' }).ok, true);
assert.equal(forum.hapusBalasan(3, balasDimas.id, RIZKY).ok, false);
assert.equal(forum.hapusBalasan(3, balasDimas.id, DIMAS).ok, true);
assert.equal(s2.balasan.length, 0);
assert.equal(s2.id_jawaban, null);
assert.ok(!forum.laporan('menunggu').some(l => l.id_balasan === balasAnak.id && l.id_topik === 3));

// Forum: suka dan simpan bisa dibatalkan, polling satu suara, koordinator hanya melihat hasil
forum.suka(7, RIZKY, 1);
assert.ok(!forum.cari(7).balasan[0].suka.includes(RIZKY));
forum.suka(7, RIZKY, 1);
assert.ok(forum.cari(7).balasan[0].suka.includes(RIZKY));
forum.tandai(7, RIZKY);
assert.deepEqual(forum.daftar(RIZKY, { tab: 'tersimpan' }).map(t => t.id), [7]);
forum.tandai(7, RIZKY);
assert.equal(forum.daftar(RIZKY, { tab: 'tersimpan' }).length, 0);
assert.equal(forum.pilihOpsi(5, 1, RIZKY).ok, true);
assert.equal(forum.pilihOpsi(5, 2, RIZKY).ok, false);
assert.equal(forum.pilihOpsi(5, 1, KOOR).ok, false);
assert.equal(forum.cari(5).opsi.reduce((n, o) => n + o.suara.filter(x => x === RIZKY).length, 0), 1);

// Forum: moderasi khusus koordinator, diskusi tertutup tidak menerima balasan
assert.equal(forum.atur(4, RIZKY, 'kunci').ok, false);
assert.equal(forum.atur(4, KOOR, 'kunci').ok, true);
assert.equal(forum.balas(4, RIZKY, 'Halo').ok, false);
assert.equal(forum.atur(4, KOOR, 'kunci').ok, true);
assert.equal(forum.balas(4, RIZKY, 'Halo').ok, true);
assert.equal(forum.atur(4, KOOR, 'sematkan').ok, true);
assert.equal(forum.daftar(RIZKY)[0].sematkan, true);
assert.equal(forum.sembunyikan({ id_topik: 7, id_balasan: 1 }, RIZKY, 'Spam').ok, false);

// Forum: alur laporan dari alumni sampai keputusan koordinator
reset();
const spam = { id_topik: 7, id_balasan: 3 };
assert.equal(forum.lapor(RIZKY, { id_topik: 7, alasan: 'Spam' }).ok, false); // diskusi sendiri
assert.equal(forum.lapor(KOOR, { ...spam, alasan: 'Spam' }).ok, false);
assert.equal(forum.lapor(RIZKY, { ...spam, alasan: 'Lainnya', catatan: ' ' }).field, 'catatan');
assert.equal(forum.lapor(RIZKY, { ...spam, alasan: 'Apa saja' }).field, 'alasan');
assert.equal(forum.lapor(FAJAR, { ...spam, alasan: 'Spam' }).ok, false); // sudah melapor di data contoh
assert.equal(forum.lapor(RIZKY, { ...spam, alasan: 'Spam' }).ok, true);
assert.match(notifikasi.milik(KOOR)[0].pesan, /melaporkan balasan/);
assert.equal(forum.laporan('menunggu').length, 2);
assert.equal(forum.tinjau(forum.laporan('menunggu')[0].id, RIZKY, 'selesai').ok, false);
assert.equal(forum.tinjau(forum.laporan('menunggu')[0].id, KOOR, 'selesai').ok, true);
assert.equal(forum.laporan('menunggu').length, 0); // dua laporan atas konten yang sama ikut selesai
assert.equal(forum.konten(spam).sasaran.disembunyikan, 'Spam');
assert.ok(!forum.balasanTampil(forum.cari(7)).some(b => b.id === 3));
assert.match(notifikasi.milik(FAJAR)[0].pesan, /ditindaklanjuti/);
assert.match(notifikasi.milik(RIZKY)[0].pesan, /ditindaklanjuti/);
assert.match(notifikasi.milik(17)[0].pesan, /disembunyikan koordinator/);
assert.equal(forum.tinjau(forum.laporan('selesai')[0].id, KOOR, 'selesai').ok, false);
assert.equal(forum.pulihkan(spam, RIZKY).ok, false);
assert.equal(forum.pulihkan(spam, KOOR).ok, true);
assert.equal(forum.konten(spam).sasaran.disembunyikan, '');
assert.match(notifikasi.milik(17)[0].pesan, /dipulihkan/);

// Forum: menyembunyikan langsung dari diskusi ikut menutup laporan yang menunggu
assert.equal(forum.lapor(RIZKY, { id_topik: 3, alasan: 'Spam' }).ok, true);
assert.equal(forum.sembunyikan({ id_topik: 3, id_balasan: null }, KOOR, 'Spam').ok, true);
assert.equal(forum.laporan('menunggu').length, 0);
assert.equal(forum.pulihkan({ id_topik: 3, id_balasan: null }, KOOR).ok, true);

// Forum: laporan yang diabaikan tidak mengubah konten, jawaban terbaik yang disembunyikan dilepas
assert.equal(forum.lapor(RIZKY, { id_topik: 6, id_balasan: 1, alasan: 'Tidak Relevan' }).ok, true);
assert.equal(forum.tinjau(forum.laporan('menunggu')[0].id, KOOR, 'diabaikan').ok, true);
assert.equal(forum.konten({ id_topik: 6, id_balasan: 1 }).sasaran.disembunyikan, '');
assert.match(notifikasi.milik(RIZKY)[0].pesan, /tidak ditemukan pelanggaran/);
assert.equal(forum.sembunyikan({ id_topik: 2, id_balasan: 1 }, KOOR, 'Spam').ok, true);
assert.equal(forum.cari(2).id_jawaban, null);

// Forum: penulis bisa menghapus diskusinya sendiri, laporannya ikut bersih
assert.equal(forum.hapus(7, FAJAR).ok, false);
assert.equal(forum.hapus(7, RIZKY).ok, true);
assert.equal(forum.cari(7), undefined);
assert.ok(![...forum.laporan('menunggu'), ...forum.laporan('selesai')].some(l => l.id_topik === 7));

// Notifikasi: hanya milik sendiri yang berubah
reset();
const belumRizky = notifikasi.milik(RIZKY).filter(n => !n.dibaca).length;
assert.equal(belumRizky, 4);
notifikasi.baca(notifikasi.milik(RIZKY)[0].id);
assert.equal(notifikasi.milik(RIZKY).filter(n => !n.dibaca).length, 3);
notifikasi.bacaSemua(RIZKY);
assert.equal(notifikasi.milik(RIZKY).filter(n => !n.dibaca).length, 0);
assert.equal(notifikasi.milik(KOOR).filter(n => !n.dibaca).length, 1);

// Beranda: karya wajib punya tautan http(s), tester memberi feedback, pembuat menanggapi, lalu rilis ke Live
reset();
const karyaDasar = { nama: 'Kalkulator Zakat', tagline: 'Hitung zakat dengan cepat', tahap: 'beta', fokus: ['Bug'], stack: 'Vue, Firebase', link: 'https://zakat.contoh.id' };
assert.equal(feed.tambah(NADIA, { jenis: 'karya', karya: { ...karyaDasar, link: 'javascript:alert(1)' } }).field, 'link');
assert.equal(feed.tambah(NADIA, { jenis: 'karya', karya: { ...karyaDasar, fokus: [] } }).field, 'fokus');
assert.equal(feed.tambah(RIZKY, { jenis: 'karya', karya: { ...karyaDasar, id_proyek: 1 } }).ok, false); // AntreKlinik sudah di Beranda
const karyaBaru = feed.tambah(NADIA, { jenis: 'karya', isi: 'Coba ya', tag: [RIZKY, NADIA, KOOR], karya: karyaDasar });
const pk = feed.cari(karyaBaru.id);
assert.deepEqual([pk.tag, pk.karya.stack], [[RIZKY], ['Vue', 'Firebase']]); // diri sendiri dan koordinator tidak ikut ditandai
const proyekKarya = cv.milik('projects', NADIA).find(r => r.id === pk.karya.id_proyek);
assert.equal(proyekKarya.id_post, pk.id); // karya yang ditulis dari nol otomatis masuk portofolio
assert.equal(feed.feedback(pk.id, NADIA, { kategori: 'Bug', isi: 'x' }).ok, false);
assert.equal(feed.feedback(pk.id, RIZKY, { kategori: 'Lainnya', isi: 'x' }).field, 'kategori');
assert.equal(feed.feedback(pk.id, RIZKY, { kategori: 'Bug', isi: 'Tombol hitung tidak merespons.' }).ok, true);
assert.match(notifikasi.milik(NADIA)[0].pesan, /feedback Bug/);
assert.equal(feed.tanggapi(pk.id, 1, RIZKY).ok, false);
assert.equal(feed.tanggapi(pk.id, 1, NADIA).ok, true);
assert.equal(pk.feedback[0].status, 'diperbaiki');
assert.match(notifikasi.milik(RIZKY)[0].pesan, /sudah diperbaiki/);
assert.equal(feed.tanggapi(pk.id, 1, NADIA).ok, false);
assert.equal(feed.spotlight(pk.id, KOOR).ok, false); // masih beta
assert.equal(feed.rilis(pk.id, RIZKY).ok, false);
assert.equal(feed.rilis(pk.id, NADIA).ok, true);
assert.deepEqual([pk.karya.tahap, pk.karya.fokus], ['live', []]);
feed.hapus(pk.id, NADIA);
assert.equal(proyekKarya.id_post, null); // proyek tetap ada dan bisa dipublikasikan lagi
assert.equal(feed.tambah(NADIA, { jenis: 'karya', karya: { ...karyaDasar, id_proyek: proyekKarya.id } }).ok, true);

// Spotlight: khusus koordinator, hanya karya Live, berlaku 30 hari, bisa dilepas, dan kedaluwarsa sendiri
reset();
assert.deepEqual(feed.spotlightAktif().map(p => p.id), [4]);
assert.equal(feed.spotlight(4, RIZKY).ok, false);
assert.equal(feed.spotlight(5, KOOR).ok, false); // KasRT masih beta
assert.equal(feed.spotlight(4, KOOR).ok, true);
assert.equal(feed.spotlightAktif().length, 0);
assert.equal(feed.spotlight(4, KOOR).ok, true);
const sisaHari = (new Date(feed.cari(4).spotlight_sampai) - Date.now()) / 864e5;
assert.ok(sisaHari > 29.9 && sisaHari <= 30);
assert.match(notifikasi.milik(RIZKY)[0].pesan, /Spotlight/);
feed.cari(4).spotlight_sampai = new Date(Date.now() - 1000).toISOString();
assert.equal(feed.spotlightAktif().length, 0);

// Lencana tester: feedback yang ditanggapi lebih berharga daripada jumlah feedback
assert.equal(feed.lencanaTester(FAJAR), 'Quality Contributor');
assert.equal(feed.lencanaTester(RIZKY), '');
['Bug', 'UI/UX', 'Apresiasi'].forEach(kategori => feed.feedback(5, RIZKY, { kategori, isi: 'Catatan uji' }));
assert.equal(feed.lencanaTester(RIZKY), 'Active Tester');

// Referral: bukan job board, hanya pengajuan, kontak langsung, atau masukan singkat
reset();
const referralDasar = { perusahaan: 'PT Uji', posisi: 'QA Engineer', level: 'Mid', batas: '2999-01-01' };
assert.equal(feed.tambah(RIZKY, { jenis: 'referral', isi: 'Paham Selenium', referral: { ...referralDasar, batas: '2020-01-01' } }).field, 'batas');
assert.equal(feed.tambah(RIZKY, { jenis: 'referral', isi: ' ', referral: referralDasar }).field, 'isi');
assert.equal(feed.tambah(RIZKY, { jenis: 'referral', isi: 'Paham Selenium', referral: { ...referralDasar, level: 'Senior' } }).field, 'level');
assert.equal(feed.tambah(RIZKY, { jenis: 'referral', isi: 'Paham Selenium', referral: referralDasar }).ok, true);
const ref = feed.cari(7); // PT Awan Nusantara milik Arif
assert.equal(feed.ajukan(7, ARIF, { format: 'ats', pesan: 'Halo' }).ok, false);
assert.equal(feed.ajukan(7, RIZKY, { format: 'pdf', pesan: 'Halo' }).field, 'format');
assert.equal(feed.ajukan(7, RIZKY, { format: 'ats', pesan: 'x'.repeat(251) }).field, 'pesan');
assert.equal(feed.ajukan(7, RIZKY, { format: 'modern', pesan: 'Saya sudah merilis dua aplikasi Flutter.' }).ok, true);
assert.equal(feed.ajukan(7, RIZKY, { format: 'modern', pesan: 'Lagi' }).ok, false);
assert.match(notifikasi.milik(ARIF)[0].pesan, /meminta review dan referral/);
assert.equal(feed.hubungi(7, 1, RIZKY).ok, false); // bukan pemberi referral
assert.equal(feed.beriMasukan(7, 1, ARIF, ' ').field, 'masukan');
assert.equal(feed.beriMasukan(7, 1, ARIF, 'Portofolio bagus, tapi posisi ini butuh yang paham Docker.').ok, true);
assert.equal(ref.pengajuan[0].status, 'masukan');
assert.match(notifikasi.milik(RIZKY)[0].pesan, /Docker/);
assert.equal(feed.hubungi(7, 1, ARIF).ok, false); // sudah ditanggapi
assert.equal(feed.hubungi(6, 1, RIZKY).ok, true);
assert.equal(feed.cari(6).pengajuan[0].status, 'dihubungi');
assert.match(notifikasi.milik(YOGA)[0].pesan, /WhatsApp/);
ref.referral.batas = '2020-01-01';
assert.equal(feed.ajukan(7, INTAN, { format: 'ats', pesan: 'Halo' }).ok, false); // batas review lewat

// Gigs: validasi, ajukan minat dengan 1-2 portofolio sendiri, kuota penuh memulai pengerjaan
reset();
const gigDasar = { judul: 'Aplikasi Kasir Kedai Kopi', peran: ['Mobile'], stack: 'Flutter, Firebase', deskripsi: 'Kasir dan laporan harian.', budget: 'Rp 1 Juta - Rp 3 Juta', deadline: '2999-12-31', kuota: '2' };
assert.equal(gigs.simpan(RIZKY, { ...gigDasar, judul: 'Pendek' }).field, 'judul');
assert.equal(gigs.simpan(RIZKY, { ...gigDasar, peran: ['Lainnya'] }).field, 'peran');
assert.equal(gigs.simpan(RIZKY, { ...gigDasar, budget: 'Gratis' }).field, 'budget');
assert.equal(gigs.simpan(RIZKY, { ...gigDasar, deadline: '2020-01-01' }).field, 'deadline');
assert.equal(gigs.simpan(RIZKY, { ...gigDasar, kuota: '0' }).field, 'kuota');
const g = gigs.cari(gigs.simpan(RIZKY, gigDasar).id);
assert.deepEqual([g.status, g.stack], ['open', ['Flutter', 'Firebase']]);
assert.ok(gigs.daftar({ peran: 'Mobile', stack: 'flutter' }).some(x => x.id === g.id));
assert.ok(!gigs.daftar({ budget: '> Rp 5 Juta' }).some(x => x.id === g.id));
assert.equal(gigs.lamar(g.id, RIZKY, { pesan: 'Saya', portofolio: [1] }).ok, false); // pemilik
assert.equal(gigs.lamar(g.id, FAJAR, { pesan: ' ', portofolio: [6] }).field, 'pesan');
assert.equal(gigs.lamar(g.id, FAJAR, { pesan: 'x'.repeat(251), portofolio: [6] }).field, 'pesan');
assert.equal(gigs.lamar(g.id, FAJAR, { pesan: 'Siap', portofolio: [] }).field, 'portofolio');
assert.equal(gigs.lamar(g.id, FAJAR, { pesan: 'Siap', portofolio: [1] }).field, 'portofolio'); // milik Rizky
assert.equal(gigs.lamar(g.id, FAJAR, { pesan: 'Siap', portofolio: ['6', '7', '6'] }).ok, true);
assert.equal(gigs.lamar(g.id, FAJAR, { pesan: 'Lagi', portofolio: [6] }).ok, false);
assert.equal(gigs.lamar(g.id, NADIA, { pesan: 'Siap', portofolio: [] }).field, 'portofolio'); // belum punya portofolio
assert.equal(gigs.lamar(g.id, YOGA, { pesan: 'Saya bisa backend', portofolio: [4] }).ok, true);
assert.equal(gigs.lamar(g.id, INTAN, { pesan: 'Saya bisa deploy', portofolio: [5] }).ok, true);
assert.match(notifikasi.milik(RIZKY)[0].pesan, /mengajukan minat/);
const pelamar = u => g.pelamar.find(a => a.id_user === u);
assert.equal(gigs.putuskan(g.id, pelamar(FAJAR).id, FAJAR, true).ok, false);
assert.equal(gigs.mulai(g.id, RIZKY).ok, false); // belum ada yang diterima
gigs.putuskan(g.id, pelamar(FAJAR).id, RIZKY, true);
assert.equal(g.status, 'open');
gigs.putuskan(g.id, pelamar(YOGA).id, RIZKY, true);
assert.equal(g.status, 'progress'); // kuota 2 penuh
assert.equal(pelamar(INTAN).status, 'ditolak');
assert.match(notifikasi.milik(INTAN)[0].pesan, /sudah lengkap/);
assert.equal(gigs.lamar(g.id, 9, { pesan: 'Telat', portofolio: [] }).ok, false);

// Gigs: selesai menyinkronkan portofolio kontributor dan bisa dibagikan ke Beranda dengan tag tim
assert.equal(gigs.selesai(g.id, RIZKY, { endorsement: ' ' }).field, 'endorsement');
assert.equal(gigs.selesai(g.id, FAJAR, { endorsement: 'Bagus' }).ok, false);
const portoFajar = cv.milik('projects', FAJAR).length;
const jumlahBeranda = feed.semua().length;
assert.equal(gigs.selesai(g.id, RIZKY, { endorsement: 'Rapi dan tepat waktu.', bagikan: true }).ok, true);
const sinkron = cv.milik('projects', FAJAR).find(r => r.id_gig === g.id);
assert.deepEqual([g.status, cv.milik('projects', FAJAR).length], ['selesai', portoFajar + 1]);
assert.match(sinkron.deskripsi_proyek, /Rapi dan tepat waktu/);
assert.ok(cv.milik('projects', YOGA).some(r => r.id_gig === g.id));
assert.ok(!cv.milik('projects', INTAN).some(r => r.id_gig === g.id));
assert.equal(feed.semua().length, jumlahBeranda + 1);
assert.deepEqual(feed.semua()[0].tag, [FAJAR, YOGA]);
assert.equal(gigs.batal(g.id, RIZKY).ok, false); // sudah selesai
assert.equal(gigs.batal(2, FAJAR).ok, false);
assert.equal(gigs.batal(2, RIZKY).ok, true);
assert.match(notifikasi.milik(FAJAR)[0].pesan, /dibatalkan/);

// CV hanya bisa diubah pemiliknya
cv.simpan('awards', NADIA, { id: '', nama_award: 'Uji' });
const penghargaan = cv.milik('awards', NADIA)[0];
cv.hapus('awards', RIZKY, penghargaan.id);
assert.equal(cv.milik('awards', NADIA).length, 1);
cv.simpan('awards', NADIA, { id: String(penghargaan.id), nama_award: 'Ubah' });
assert.equal(cv.milik('awards', NADIA).length, 1);
assert.equal(cv.milik('awards', NADIA)[0].nama_award, 'Ubah');

// Pengumuman terbaru berada di atas
pengumuman.simpan({ id: '', judul: 'Baru', isi: 'Isi' });
assert.equal(pengumuman.semua()[0].judul, 'Baru');

// Data v3 di browser dinaikkan ke v5: isian lama tetap ada, fitur baru ikut terisi
reset();
const v3 = JSON.parse(simpanan.get('alumni_revisi_data_v5'));
v3.tracer.forEach(t => ['kota', 'keahlian', 'nama_sampingan', 'peran_sampingan'].forEach(k => delete t[k]));
delete v3.cv.projects;
delete v3.gigs;
v3.feed = v3.feed.filter(p => p.id <= 3).map(({ jenis, tag, ...p }) => p);
v3.feed.push({ id: 4, id_alumni: NADIA, isi: 'Postingan saya sebelum revisi', gambar: '', waktu: '2026-11-02T08:00:00', suka: [], komentar: [] });
v3.notifikasi = v3.notifikasi.filter(n => n.id <= 3);
simpanan.clear();
simpanan.set('alumni_revisi_data_v3', JSON.stringify(v3));
simpanan.set('alumni_revisi_data_v4', '{"feed":[]}'); // v4 setengah jadi diabaikan
delete require.cache[require.resolve('./assets/js/data.js')];
require('./assets/js/data.js');
const naik = window.DB;
const postLama = naik.feed.cari(4);
assert.deepEqual([postLama.isi, postLama.jenis, postLama.tag], ['Postingan saya sebelum revisi', 'pengalaman', []]);
const antre = naik.feed.semua().find(p => p.karya?.nama === 'AntreKlinik');
assert.ok(antre.id > 4); // id postingan contoh digeser supaya tidak menimpa postingan lama
assert.equal(naik.cv.milik('projects', RIZKY).find(r => r.nama_proyek === 'AntreKlinik').id_post, antre.id);
const referralRizky = naik.feed.semua().find(p => p.referral?.posisi === 'Backend Developer Intern');
assert.ok(naik.notifikasi.milik(RIZKY).some(n => n.tautan === `beranda.html#post-${referralRizky.id}`));
assert.deepEqual(naik.tracer.milik(RIZKY).keahlian, ['Laravel', 'MySQL', 'REST API']);
assert.equal(naik.gigs.semua().length, 4);
assert.ok(naik.tracer.direktori(RIZKY).length > 0);
assert.ok(simpanan.has('alumni_revisi_data_v5')); // hasil migrasi langsung disimpan

console.log('Semua cek alur data lolos.');
