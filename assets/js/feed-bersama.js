/**
 * Feed bersama alumni dan koordinator: data yang sama dengan Beranda alumni (alumni/dashboard.html).
 * Sumbernya dua penyimpanan yang juga dibaca Beranda:
 *   - postingan alumni: loadPosts/savePosts (alumni/assets/js/alumni-data.js), id positif
 *   - forum bersama koordinator & mitra: BengkodStore.getForum/saveForum (assets/js/store.js), id negatif
 * Konvensi id negatif sama dengan Beranda, jadi tautan #post-<id> menunjuk postingan yang sama.
 * Dimuat setelah store.js dan alumni-data.js. Pakai: FeedBersama.semua(), FeedBersama.cari(id), dst.
 */
(function () {
  const KATEGORI_BERANDA = { umum: 'Umum', karya: 'Karya & Showcase', referral: 'Internal Referral', tanya: 'Tanya Koordinator' };

  // Kategori dikenali dengan aturan yang sama seperti filteredPosts di Beranda
  function kategoriDari(p, isi) {
    const c = (p.category || '').toLowerCase();
    if (c === 'tanya koordinator') return 'tanya';
    if (p.karya || c.includes('karya') || c.includes('showcase') || c.includes('proyek')) return 'karya';
    if (c.includes('referral') || c.includes('loker') || (!p.category && isi.toLowerCase().includes('referral'))) return 'referral';
    return 'umum';
  }

  const waktuAlumni = p => (p.waktu ? Date.parse(p.waktu) : p.id > 1e12 ? p.id : Date.parse(p.date) || 0);
  const keKomentar = c => ({ id: c.id, penulis: c.penulis, peran: c.peran || 'Alumni', waktu: Date.parse(c.waktu) || 0, isi: c.isi, balasan: (c.balasan || []).map(keKomentar) });

  function dariAlumni(p, nama) {
    const isi = p.content || '';
    return {
      id: p.id, sumber: 'alumni', penulis: p.authorName, peran: 'Alumni', foto: p.authorAvatar || '', headline: p.authorHeadline || '',
      waktu: waktuAlumni(p), isi, gambar: p.imageUrl || '', karya: p.karya || null, referral: p.referral || null, pengajuan: p.pengajuan || [],
      kategori: kategoriDari(p, isi), pertanyaan: false, disematkan: !!p.disematkan, tag: p.tagRekap || '',
      suka: p.likes || 0, disukaiSaya: (p.disukai || []).includes(nama), komentar: (p.komentarForum || []).map(keKomentar),
    };
  }

  function dariForum(f, nama) {
    const isi = [f.judul, f.isi].filter(Boolean).join('\n\n');
    return {
      id: -f.id, sumber: 'forum', penulis: f.penulis, peran: f.peran || 'Alumni', foto: f.foto || '', headline: f.headline || '',
      waktu: Date.parse(f.waktu) || 0, isi, gambar: f.gambar || '', karya: null, referral: f.referral || null, pengajuan: f.pengajuan || [],
      kategori: kategoriDari(f, isi), pertanyaan: !!f.pertanyaan, disematkan: !!f.disematkan, tag: f.tagRekap || '',
      suka: (f.disukai || []).length, disukaiSaya: (f.disukai || []).includes(nama), komentar: (f.comments || []).map(keKomentar),
    };
  }

  // Ubah satu postingan mentah di penyimpanannya, lalu simpan. ubah(p) mengembalikan false untuk membatalkan.
  function ubahMentah(id, ubah) {
    if (id > 0) {
      const list = loadPosts();
      const p = list.find(x => x.id === id);
      if (!p || ubah(p, 'alumni') === false) return false;
      savePosts(list);
    } else {
      const list = BengkodStore.getForum();
      const f = list.find(x => x.id === -id);
      if (!f || ubah(f, 'forum') === false) return false;
      BengkodStore.saveForum(list);
    }
    return true;
  }

  const komentarMentah = (p, sumber) => (sumber === 'alumni' ? (p.komentarForum = p.komentarForum || []) : (p.comments = p.comments || []));

  window.FeedBersama = {
    KATEGORI_BERANDA,

    // Postingan disematkan selalu di atas, sisanya dari yang terbaru
    semua(nama) {
      const list = [...loadPosts().map(p => dariAlumni(p, nama)), ...BengkodStore.getForum().map(f => dariForum(f, nama))];
      const urut = l => l.sort((a, b) => b.waktu - a.waktu);
      return [...urut(list.filter(p => p.disematkan)), ...urut(list.filter(p => !p.disematkan))];
    },

    cari(id, nama) {
      return this.semua(nama).find(p => p.id === Number(id)) || null;
    },

    // Pertanyaan alumni untuk koordinator yang belum dikomentari koordinator, yang terlama lebih dulu
    perluDijawab(nama) {
      return this.semua(nama)
        .filter(p => p.kategori === 'tanya' && p.peran !== 'Koordinator' && !p.komentar.some(k => k.peran === 'Koordinator'))
        .sort((a, b) => a.waktu - b.waktu);
    },

    // Postingan koordinator masuk forum bersama, jadi langsung tampil di Beranda alumni
    tambah({ nama, peran, isi, gambar = '', kategori = 'umum', pertanyaan = false }) {
      const teks = String(isi || '').trim();
      if (!teks && !gambar) return { ok: false, error: 'Tulis sesuatu atau tambahkan foto.' };
      if (!KATEGORI_BERANDA[kategori]) return { ok: false, error: 'Pilih kategori postingan.' };
      const list = BengkodStore.getForum();
      const id = list.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
      list.push({
        id, judul: '', isi: teks, gambar, tags: [], penulis: nama, peran, waktu: new Date().toISOString(),
        category: KATEGORI_BERANDA[kategori], pertanyaan: !!pertanyaan, disematkan: false, disukai: [], dibagikan: 0, comments: [],
      });
      BengkodStore.saveForum(list);
      return { ok: true, id: -id };
    },

    suka(id, nama) {
      return ubahMentah(id, (p, sumber) => {
        const sudah = (p.disukai || []).includes(nama);
        p.disukai = sudah ? p.disukai.filter(n => n !== nama) : [...(p.disukai || []), nama];
        if (sumber === 'alumni') p.likes = Math.max(0, (p.likes || 0) + (sudah ? -1 : 1));
      });
    },

    komentar(id, { nama, peran, isi }) {
      const teks = String(isi || '').trim();
      if (!teks) return { ok: false, error: 'Komentar tidak boleh kosong.' };
      const ok = ubahMentah(id, (p, sumber) => {
        komentarMentah(p, sumber).push({ id: Date.now(), penulis: nama, peran, waktu: new Date().toISOString(), isi: teks, disukai: [], balasan: [] });
        if (sumber === 'alumni') p.commentsCount = (p.commentsCount || 0) + 1;
      });
      return ok ? { ok: true } : { ok: false, error: 'Postingan tidak ditemukan.' };
    },

    balas(id, idInduk, { nama, peran, isi }) {
      const teks = String(isi || '').trim();
      if (!teks) return { ok: false, error: 'Balasan tidak boleh kosong.' };
      const ok = ubahMentah(id, (p, sumber) => {
        const daftar = komentarMentah(p, sumber);
        const induk = daftar.find(c => c.id === Number(idInduk));
        if (!induk) return false;
        induk.balasan = induk.balasan || [];
        induk.balasan.push({ id: Date.now(), penulis: nama, peran, waktu: new Date().toISOString(), isi: teks, disukai: [] });
        if (sumber === 'alumni') p.commentsCount = (p.commentsCount || 0) + 1;
      });
      return ok ? { ok: true } : { ok: false, error: 'Komentar tidak ditemukan.' };
    },

    sukaKomentar(id, idKomentar, nama) {
      return ubahMentah(id, (p, sumber) => {
        const daftar = komentarMentah(p, sumber);
        const k = daftar.find(c => c.id === Number(idKomentar));
        if (!k) return false;
        k.disukai = k.disukai || [];
        const sudah = k.disukai.includes(nama);
        k.disukai = sudah ? k.disukai.filter(n => n !== nama) : [...k.disukai, nama];
      });
    },

    sukaBalasan(id, idKomentar, idBalasan, nama) {
      return ubahMentah(id, (p, sumber) => {
        const daftar = komentarMentah(p, sumber);
        const k = daftar.find(c => c.id === Number(idKomentar));
        if (!k) return false;
        const b = (k.balasan || []).find(x => x.id === Number(idBalasan));
        if (!b) return false;
        b.disukai = b.disukai || [];
        const sudah = b.disukai.includes(nama);
        b.disukai = sudah ? b.disukai.filter(n => n !== nama) : [...b.disukai, nama];
      });
    },

    // Komentar atau balasan komentar; jumlah komentar di Beranda ikut dikurangi
    hapusKomentar(id, idKomentar) {
      return ubahMentah(id, (p, sumber) => {
        const daftar = komentarMentah(p, sumber);
        const sebelum = daftar.reduce((n, c) => n + 1 + (c.balasan || []).length, 0);
        const sisa = daftar.filter(c => c.id !== idKomentar);
        sisa.forEach(c => { c.balasan = (c.balasan || []).filter(b => b.id !== idKomentar); });
        if (sumber === 'alumni') p.komentarForum = sisa;
        else p.comments = sisa;
        const terhapus = sebelum - sisa.reduce((n, c) => n + 1 + (c.balasan || []).length, 0);
        if (sumber === 'alumni') p.commentsCount = Math.max(0, (p.commentsCount || 0) - terhapus);
      });
    },

    sematkan(id) {
      let hasil = false;
      ubahMentah(id, p => { p.disematkan = hasil = !p.disematkan; });
      return hasil;
    },

    beriTag(id, tag) {
      return ubahMentah(id, p => { p.tagRekap = tag; });
    },

    hapus(id) {
      if (id > 0) savePosts(loadPosts().filter(p => p.id !== id));
      else BengkodStore.saveForum(BengkodStore.getForum().filter(f => f.id !== -id));
    },

    // Laporkan postingan ke koordinator
    lapor({ id, pelapor = 'Alumni', peran = 'Alumni', alasan = 'Spam', catatan = '' }) {
      const p = this.cari(id);
      if (!p) return { ok: false, error: 'Postingan tidak ditemukan.' };
      const judul = p.karya?.nama || (p.isi ? (p.isi.slice(0, 80) + (p.isi.length > 80 ? '…' : '')) : 'Postingan Media');
      if (typeof BengkodStore !== 'undefined' && BengkodStore.addLaporan) {
        BengkodStore.addLaporan({
          id_post: id,
          judul_post: judul,
          penulis_post: p.penulis,
          pelapor,
          peran_pelapor: peran,
          alasan,
          catatan,
        });
      }
      return { ok: true };
    },

    laporan(status) {
      if (typeof BengkodStore !== 'undefined' && BengkodStore.getLaporan) {
        return BengkodStore.getLaporan(status);
      }
      return [];
    },

    tinjauLaporan(idLaporan, statusBaru) {
      if (typeof BengkodStore !== 'undefined' && BengkodStore.updateLaporanStatus) {
        return BengkodStore.updateLaporanStatus(idLaporan, statusBaru);
      }
      return null;
    },
  };
})();
