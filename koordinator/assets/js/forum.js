/**
 * Tampilan forum, sama untuk alumni dan koordinator.
 * Alumni melaporkan konten, koordinator menyematkan, menutup, dan menyembunyikan.
 * Dimuat setelah app.js. Halaman memanggil pasangForum() atau pasangDetailForum().
 */
const KOORDINATOR = SAYA?.role === 'admin';
const JENIS_FORUM = {
  tanya: { label: 'Pertanyaan', ikon: 'circle-help' },
  diskusi: { label: 'Diskusi', ikon: 'messages-square' },
  polling: { label: 'Polling', ikon: 'chart-column' },
};
const KETERANGAN_ALASAN = {
  Spam: 'Promosi atau konten yang berulang.',
  Pelecehan: 'Menghina atau mengancam orang lain.',
  'Tidak Relevan': 'Tidak sesuai dengan topik forum.',
  Lainnya: 'Alasan lain, jelaskan di bawah.',
};

// Pekerjaan atau studi diambil dari tracer, jadi jawaban bisa dinilai dari pengalaman penulisnya
function identitasForum(user) {
  if (user.role === 'admin') return 'Koordinator Alumni';
  const t = DB.tracer.milik(user.id);
  return t ? `${DB.tracer.karir(t).ringkas} · Lulus ${t.tahun_lulus}` : 'Alumni Bengkel Koding';
}

const badgeKoordinator = user => (user.role === 'admin' ? badge('Koordinator') : '');

// Teks di-escape dulu, baru tautan dan #tag diubah menjadi link
function isiForum(teks) {
  return esc(teks)
    .replace(/https?:\/\/[^\s<]+/g, u => `<a href="${u}" target="_blank" rel="noreferrer" class="text-primary2 hover:underline break-all">${u}</a>`)
    .replace(DB.forum.POLA_TAG, (_, awal, tag) => `${awal}<a href="forum.html?tag=${encodeURIComponent(tag.toLowerCase())}" class="text-primary2 font-medium hover:underline">#${tag}</a>`);
}

function badgeDiskusi(t) {
  return [
    t.disembunyikan && badge('Disembunyikan', 'red'),
    t.sematkan && badge('Disematkan', 'gray'),
    badge(t.kategori),
    t.jenis === 'tanya' && badge(t.id_jawaban ? 'Terjawab' : 'Belum terjawab', t.id_jawaban ? 'green' : 'yellow'),
    t.jenis === 'polling' && badge('Polling', 'gray'),
    t.kunci && badge('Ditutup', 'gray'),
  ].filter(Boolean).join('');
}

const jumlahSuara = t => t.opsi.reduce((n, o) => n + o.suara.length, 0);

function barisDiskusi(t) {
  const penulis = DB.akun.cari(t.id_user);
  const lulus = DB.tracer.milik(t.id_user)?.tahun_lulus;
  const tersimpan = t.disimpan.includes(SAYA.id);
  const angka = [
    ['message-square', `${DB.forum.balasanTampil(t).length} balasan`],
    ['thumbs-up', `${t.suka.length} suka`],
    ['eye', `${t.dilihat} dilihat`],
    ...(t.jenis === 'polling' ? [['chart-column', `${jumlahSuara(t)} suara`]] : []),
  ];
  return `
    <article class="relative p-4 sm:p-5 flex items-start gap-3 hover:bg-blue-50/40 transition-colors">
      ${fotoBulat(penulis, 'w-10 h-10')}
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center gap-1.5">${badgeDiskusi(t)}</div>
        <h3 class="!text-[15px] font-semibold text-neutral1 leading-snug mt-2 break-words">
          <a href="forum-detail.html?id=${t.id}" class="hover:text-primary1 focus:outline-none focus-visible:underline after:absolute after:inset-0">${esc(t.judul)}</a>
        </h3>
        ${t.isi ? `<p class="!text-[13px] text-neutral2 mt-1 leading-relaxed line-clamp-2 break-words">${esc(t.isi)}</p>` : ''}
        <p class="!text-xs text-neutral3 mt-2">${esc(penulis.nama)}${penulis.role === 'admin' ? ' · Koordinator' : lulus ? ` · Lulus ${lulus}` : ''} · Aktif ${waktuLalu(DB.forum.aktivitas(t))}</p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-neutral3">
          ${angka.map(([ikon, teks]) => `<span class="inline-flex items-center gap-1"><i data-lucide="${ikon}" class="w-3.5 h-3.5"></i>${teks}</span>`).join('')}
        </div>
      </div>
      <button type="button" data-tandai="${t.id}" aria-pressed="${tersimpan}" aria-label="Simpan diskusi" title="Simpan diskusi" class="btn-icon relative z-10 shrink-0 ${tersimpan ? 'text-primary1' : ''}"><i data-lucide="bookmark" class="w-4 h-4 ${tersimpan ? 'fill-current' : ''}"></i></button>
    </article>`;
}

function tautanRingkas(t) {
  return `
    <a href="forum-detail.html?id=${t.id}" class="block px-3.5 py-2.5 bg-neutral5/80 rounded-xl hover:bg-neutral4/40 transition-colors border border-transparent hover:border-neutral4/80">
      <p class="!text-[13px] font-semibold text-neutral1 leading-snug line-clamp-2">${esc(t.judul)}</p>
      <p class="!text-[11px] text-neutral3 mt-0.5">${esc(t.kategori)} · ${DB.forum.balasanTampil(t).length} balasan</p>
    </a>`;
}

const daftarRingkas = list => `<div class="flex flex-col gap-2">${list.map(tautanRingkas).join('')}</div>`;

// ===================== FORM DISKUSI =====================
function pasangFormDiskusi(setelahSimpan) {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="diskusi-modal" data-modal-backdrop class="modal-backdrop">
      <form id="form-diskusi" class="modal max-w-2xl" role="dialog" aria-modal="true" aria-labelledby="diskusi-judul">
        <h3 id="diskusi-judul" class="font-semibold text-base text-neutral1 mb-4"></h3>
        <input type="hidden" name="id">
        <div class="space-y-4">
          <fieldset id="f-jenis">
            <legend class="label">Jenis</legend>
            <div class="grid grid-cols-3 gap-2">
              ${Object.entries(JENIS_FORUM).map(([nilai, j]) => `
                <label class="cursor-pointer">
                  <input type="radio" name="jenis" value="${nilai}" class="peer sr-only">
                  <span class="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-1 rounded-lg border border-neutral4 text-xs sm:text-sm font-medium text-neutral2 transition-colors peer-checked:border-primary1 peer-checked:bg-primary5 peer-checked:text-primary1 peer-focus-visible:ring-4 peer-focus-visible:ring-primary5"><i data-lucide="${j.ikon}" class="w-4 h-4 shrink-0"></i>${j.label}</span>
                </label>`).join('')}
            </div>
          </fieldset>
          <div>
            <label for="f-kategori" class="label">Kategori</label>
            <select id="f-kategori" name="kategori" class="input">
              ${DB.OPSI.kategori_forum.map(k => `<option>${esc(k)}</option>`).join('')}
            </select>
          </div>
          <div>
            <label for="f-judul" class="label">Judul</label>
            <input id="f-judul" name="judul" class="input" maxlength="120" autocomplete="off" placeholder="Tulis inti pertanyaan atau topik Anda">
          </div>
          <div id="serupa" class="hidden rounded-lg border border-yellow2/30 bg-yellow3/40 p-3"></div>
          <div>
            <label for="f-isi" class="label">Isi</label>
            <textarea id="f-isi" name="isi" rows="5" class="input" maxlength="2000" placeholder="Jelaskan konteksnya. Tambahkan #tag agar mudah ditemukan."></textarea>
            <p class="!text-xs text-neutral3 mt-1">Jaga bahasa dan jangan membagikan data pribadi orang lain.</p>
          </div>
          <div id="f-polling" class="hidden">
            <p class="label">Pilihan Polling</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${[1, 2, 3, 4].map(n => `<input name="opsi" class="input" maxlength="80" placeholder="Pilihan ${n}" aria-label="Pilihan ${n}">`).join('')}
            </div>
            <p class="!text-xs text-neutral3 mt-1">Isi minimal dua pilihan. Pilihan tidak bisa diubah setelah terbit.</p>
          </div>
          <div>
            <label for="f-gambar" class="label">Gambar</label>
            <input id="f-gambar" name="gambar" type="file" accept="image/png,image/jpeg,image/webp" class="input">
            <p class="!text-xs text-neutral3 mt-1">Opsional. JPG, PNG, atau WEBP, maksimal 500 KB.</p>
          </div>
        </div>
        <p id="diskusi-error" class="hidden mt-4 !text-sm text-red1" role="alert"></p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" onclick="closeModal('diskusi-modal')" class="btn-outline">Batal</button>
          <button type="submit" class="btn-primary">Terbitkan</button>
        </div>
      </form>
    </div>`);

  const form = document.getElementById('form-diskusi');
  const pesan = document.getElementById('diskusi-error');
  const kotakSerupa = document.getElementById('serupa');
  const sesuaikanJenis = () => document.getElementById('f-polling').classList.toggle('hidden', form.elements.jenis.value !== 'polling' || Boolean(form.elements.id.value));

  form.elements.jenis.forEach(r => r.addEventListener('change', sesuaikanJenis));

  // Saran saja, penulis tetap boleh menerbitkan diskusinya
  form.elements.judul.addEventListener('input', () => {
    const list = DB.forum.serupa(form.elements.judul.value, SAYA.id, Number(form.elements.id.value));
    kotakSerupa.classList.toggle('hidden', !list.length);
    kotakSerupa.innerHTML = `
      <p class="!text-xs font-semibold text-yellow1 mb-1.5">Mungkin sudah pernah dibahas</p>
      <ul class="space-y-1">${list.map(t => `<li><a href="forum-detail.html?id=${t.id}" target="_blank" rel="noreferrer" class="text-sm text-primary2 hover:underline">${esc(t.judul)}</a></li>`).join('')}</ul>`;
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    pesan.classList.add('hidden');
    const isian = new FormData(form);
    const berkas = isian.get('gambar');
    try {
      const gambar = berkas.size ? await bacaGambar(berkas, 500) : '';
      const hasil = DB.forum.simpan(SAYA.id, { ...Object.fromEntries(isian), gambar, opsi: isian.getAll('opsi') });
      if (!hasil.ok) throw new Error(hasil.error);
      closeModal('diskusi-modal');
      setelahSimpan(hasil.id);
    } catch (err) {
      pesan.textContent = err.message;
      pesan.classList.remove('hidden');
    }
  });

  return t => {
    form.reset();
    pesan.classList.add('hidden');
    kotakSerupa.classList.add('hidden');
    document.getElementById('diskusi-judul').textContent = t ? 'Edit Diskusi' : 'Buat Diskusi';
    document.getElementById('f-jenis').disabled = Boolean(t);
    form.elements.id.value = t ? t.id : '';
    form.elements.jenis.value = t ? t.jenis : 'tanya';
    if (t) {
      form.elements.kategori.value = t.kategori;
      form.elements.judul.value = t.judul;
      form.elements.isi.value = t.isi;
    }
    sesuaikanJenis();
    openModal('diskusi-modal');
  };
}

// ===================== HALAMAN DAFTAR DISKUSI =====================
function ringkasanKoordinator() {
  const laporan = DB.forum.laporan('menunggu').length;
  const kartu = (label, nilai, ikon, warna) => `
    <div class="w-11 h-11 rounded-xl ${warna} flex items-center justify-center shrink-0"><i data-lucide="${ikon}" class="w-5 h-5"></i></div>
    <div class="min-w-0">
      <div class="text-2xl font-semibold text-primary1">${nilai}</div>
      <div class="text-sm text-neutral2">${label}</div>
    </div>`;
  return `
    <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" aria-label="Ringkasan forum">
      <div class="card !p-4 flex items-center gap-3">${kartu('Total diskusi', DB.forum.daftar(SAYA.id).length, 'messages-square', 'bg-primary5 text-primary1')}</div>
      <div class="card !p-4 flex items-center gap-3">${kartu('Belum terjawab', DB.forum.daftar(SAYA.id, { tab: 'belum' }).length, 'circle-help', 'bg-yellow3 text-yellow1')}</div>
      <div class="card !p-4 flex items-center gap-3">${kartu('Alumni aktif 30 hari', DB.forum.alumniAktif(), 'users', 'bg-green3 text-green1')}</div>
      <a href="laporan-forum.html" class="card !p-4 flex items-center gap-3 hover:border-primary4 hover:-translate-y-0.5 transition-all">${kartu('Laporan menunggu', laporan, 'flag', 'bg-red3 text-red1')}</a>
    </section>`;
}

function pasangForum() {
  const PER_HALAMAN = 8;
  const TAB = [
    ['terbaru', 'Terbaru'], ['populer', 'Populer'], ['belum', 'Belum Terjawab'], ['tersimpan', 'Tersimpan'], ['saya', 'Diskusi Saya'],
    ...(KOORDINATOR ? [['tersembunyi', 'Disembunyikan']] : []),
  ];
  const KOSONG = {
    belum: ['circle-check', 'Semua pertanyaan sudah terjawab', 'Pertanyaan yang belum punya jawaban terbaik akan tampil di sini.'],
    tersimpan: ['bookmark', 'Belum ada diskusi tersimpan', 'Tekan ikon simpan agar diskusi mudah dibuka lagi.'],
    saya: ['messages-square', 'Anda belum ikut berdiskusi', 'Diskusi yang Anda buat atau balas akan tampil di sini.'],
    tersembunyi: ['eye-off', 'Tidak ada diskusi yang disembunyikan'],
  };
  const saring = { tab: 'terbaru', kategori: '', tag: new URLSearchParams(location.search).get('tag') || '', kata: '' };
  let halaman = 1;

  document.querySelector('main').innerHTML = `
    <div class="max-w-7xl mx-auto space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral4">
        <div>
          <h2 class="!text-2xl font-semibold text-neutral1">Forum Alumni</h2>
          <p class="!text-sm text-neutral2 mt-1">${KOORDINATOR ? 'Pantau diskusi alumni, sematkan yang penting, dan bantu pertanyaan yang belum terjawab.' : 'Bertanya, berbagi pengalaman, dan saling bantu sesama alumni Bengkel Koding.'}</p>
        </div>
        <button id="btn-buat" type="button" class="btn-primary shrink-0 self-start sm:self-auto"><i data-lucide="plus" class="w-4 h-4"></i> Buat Diskusi</button>
      </div>
      ${KOORDINATOR ? ringkasanKoordinator() : ''}
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div class="xl:col-span-2 space-y-4 min-w-0">
          <div class="relative">
            <i data-lucide="search" class="w-4 h-4 text-neutral3 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input id="cari" type="search" class="input !pl-9" placeholder="Cari judul, isi, balasan, atau nama penulis" aria-label="Cari diskusi">
          </div>
          <div id="kategori" class="flex gap-2 overflow-x-auto no-scrollbar" role="group" aria-label="Saring kategori"></div>
          <div id="tab" class="flex gap-1 overflow-x-auto no-scrollbar border-b border-neutral4" role="group" aria-label="Saring diskusi"></div>
          <div id="filter-tag" class="empty:hidden"></div>
          <section id="daftar" aria-label="Daftar diskusi"></section>
          <div id="pager"></div>
        </div>
        <aside id="samping" class="space-y-4 min-w-0" aria-label="Info forum"></aside>
      </div>
    </div>`;

  const bukaForm = pasangFormDiskusi(id => { location.href = `forum-detail.html?id=${id}`; });

  function renderFilter() {
    const chip = (nilai, label, jumlah) => `
      <button type="button" data-kategori="${esc(nilai)}" aria-pressed="${saring.kategori === nilai}" class="shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors ${saring.kategori === nilai ? 'bg-primary1 border-primary1 text-white' : 'bg-white border-neutral4 text-neutral2 hover:bg-primary5 hover:text-primary1'}">${esc(label)} <span class="text-xs opacity-70">${jumlah}</span></button>`;
    const semua = DB.forum.daftar(SAYA.id).filter(t => !t.disembunyikan);
    document.getElementById('kategori').innerHTML = chip('', 'Semua', semua.length)
      + DB.OPSI.kategori_forum.map(k => chip(k, k, semua.filter(t => t.kategori === k).length)).join('');
    document.getElementById('tab').innerHTML = TAB.map(([nilai, label]) => `
      <button type="button" data-tab="${nilai}" aria-pressed="${saring.tab === nilai}" class="shrink-0 whitespace-nowrap px-3 py-2.5 border-b-2 text-sm font-medium transition-colors ${saring.tab === nilai ? 'border-primary1 text-primary1' : 'border-transparent text-neutral2 hover:text-primary1'}">${label}</button>`).join('');
    document.getElementById('filter-tag').innerHTML = saring.tag ? `
      <button type="button" data-hapus-tag aria-label="Hapus saringan tag ${esc(saring.tag)}" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary5 text-primary1 text-xs font-semibold">#${esc(saring.tag)}<i data-lucide="x" class="w-3.5 h-3.5"></i></button>` : '';
  }

  function renderDaftar() {
    const list = DB.forum.daftar(SAYA.id, saring);
    const adaSaringan = saring.kata.trim() || saring.kategori || saring.tag;
    const kosong = adaSaringan ? ['search-x', 'Diskusi tidak ditemukan', 'Coba kata kunci, kategori, atau tag lain.'] : KOSONG[saring.tab] || ['messages-square', 'Belum ada diskusi', 'Tekan Buat Diskusi untuk memulai.'];
    document.getElementById('daftar').innerHTML = list.length
      ? `<div class="bg-white rounded-xl border border-neutral4 elevation1 divide-y divide-neutral4 overflow-hidden">${potong(list, halaman, PER_HALAMAN).map(barisDiskusi).join('')}</div>`
      : kartuKosong(...kosong);
    renderPager('pager', list.length, PER_HALAMAN, halaman, ke => { halaman = ke; render(); });
  }

  function renderSamping() {
    const bantu = DB.forum.untukSaya(SAYA.id);
    const ramai = DB.forum.daftar(SAYA.id, { tab: 'populer' }).filter(t => !t.sematkan && !t.disembunyikan).slice(0, 4);
    const membantu = DB.forum.palingMembantu();
    const tag = DB.forum.tagPopuler(SAYA.id);
    document.getElementById('samping').innerHTML = [
      bantu.length && kartuSamping('life-buoy', KOORDINATOR ? 'Belum Terjawab' : 'Butuh Bantuan Anda', daftarRingkas(bantu)),
      ramai.length && kartuSamping('flame', 'Sedang Ramai', daftarRingkas(ramai)),
      membantu.length && kartuSamping('award', 'Alumni Paling Membantu', `
        <div class="flex flex-col gap-3">
          ${membantu.map(({ user, jawaban, suka }) => `
            <div class="flex items-center gap-3 min-w-0">
              ${fotoBulat(user, 'w-9 h-9')}
              <div class="min-w-0">
                <p class="!text-[13px] font-semibold text-neutral1 truncate">${esc(user.nama)}</p>
                <p class="!text-[11px] text-neutral3">${jawaban} jawaban terbaik · ${suka} suka</p>
              </div>
            </div>`).join('')}
        </div>`),
      tag.length && kartuSamping('hash', 'Tag Populer', `
        <div class="flex flex-wrap gap-1.5">
          ${tag.map(([nama, jumlah]) => `<a href="forum.html?tag=${encodeURIComponent(nama)}" class="px-2.5 py-1 rounded-full bg-primary5 text-primary1 text-xs font-medium hover:bg-primary4/50 transition-colors">#${esc(nama)} <span class="opacity-70">${jumlah}</span></a>`).join('')}
        </div>`),
    ].filter(Boolean).join('');
  }

  function render() {
    renderFilter();
    renderDaftar();
    refreshIcons();
  }

  function ubahSaringan(perubahan) {
    Object.assign(saring, perubahan);
    halaman = 1;
    render();
  }

  document.querySelector('main').addEventListener('click', e => {
    const tombol = e.target.closest('[data-kategori], [data-tab], [data-hapus-tag], [data-tandai], #btn-buat');
    if (!tombol) return;
    if (tombol.id === 'btn-buat') return bukaForm();
    if (tombol.dataset.tandai) {
      DB.forum.tandai(tombol.dataset.tandai, SAYA.id);
      return render();
    }
    if (tombol.dataset.tab) return ubahSaringan({ tab: tombol.dataset.tab });
    if ('kategori' in tombol.dataset) return ubahSaringan({ kategori: tombol.dataset.kategori });
    ubahSaringan({ tag: '' });
  });
  document.getElementById('cari').addEventListener('input', e => ubahSaringan({ kata: e.target.value }));

  renderSamping();
  render();
}

// ===================== HALAMAN DETAIL DISKUSI =====================
function pasangFormLapor(setelahKirim) {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="lapor-modal" data-modal-backdrop class="modal-backdrop">
      <form id="form-lapor" class="modal max-w-md" role="dialog" aria-modal="true" aria-labelledby="lapor-judul">
        <h3 id="lapor-judul" class="font-semibold text-base text-neutral1"></h3>
        <p id="lapor-cuplikan" class="!text-sm text-neutral2 mt-3 p-3 rounded-lg bg-neutral5 border border-neutral4 line-clamp-2 break-words"></p>
        <fieldset class="mt-4 space-y-2">
          <legend class="label">Alasan</legend>
          ${DB.OPSI.alasan_laporan.map(a => `
            <label class="flex items-start gap-2.5 cursor-pointer">
              <input type="radio" name="alasan" value="${esc(a)}" class="mt-1 accent-primary1">
              <span class="min-w-0">
                <span class="block text-sm font-medium text-neutral1">${esc(a)}</span>
                <span class="block text-xs font-normal text-neutral3">${esc(KETERANGAN_ALASAN[a])}</span>
              </span>
            </label>`).join('')}
        </fieldset>
        <div id="lapor-penjelasan" class="hidden mt-3">
          <label for="f-catatan" class="label">Penjelasan</label>
          <textarea id="f-catatan" name="catatan" rows="3" class="input" maxlength="300"></textarea>
        </div>
        <p id="lapor-error" class="hidden mt-3 !text-sm text-red1" role="alert"></p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" onclick="closeModal('lapor-modal')" class="btn-outline">Batal</button>
          <button id="lapor-kirim" type="submit" class="btn-danger"></button>
        </div>
      </form>
    </div>`);

  const form = document.getElementById('form-lapor');
  const pesan = document.getElementById('lapor-error');
  const penjelasan = document.getElementById('lapor-penjelasan');
  let target = null;

  form.addEventListener('change', () => penjelasan.classList.toggle('hidden', form.elements.alasan.value !== 'Lainnya'));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const { alasan, catatan } = Object.fromEntries(new FormData(form));
    const hasil = target.sembunyikan
      ? DB.forum.sembunyikan(target, SAYA.id, alasan === 'Lainnya' ? catatan : alasan)
      : DB.forum.lapor(SAYA.id, { ...target, alasan, catatan });
    if (!hasil.ok) {
      pesan.textContent = hasil.error;
      pesan.classList.remove('hidden');
      return;
    }
    closeModal('lapor-modal');
    setelahKirim();
    showToast(target.sembunyikan ? 'Konten disembunyikan dan penulis sudah diberi tahu.' : 'Laporan terkirim. Terima kasih.');
  });

  return ({ cuplikan, ...sasaran }) => {
    const benda = sasaran.id_balasan ? 'Balasan' : 'Diskusi';
    target = sasaran;
    form.reset();
    pesan.classList.add('hidden');
    penjelasan.classList.add('hidden');
    document.getElementById('lapor-judul').textContent = `${sasaran.sembunyikan ? 'Sembunyikan' : 'Laporkan'} ${benda}`;
    document.getElementById('lapor-cuplikan').textContent = cuplikan;
    document.getElementById('lapor-kirim').textContent = sasaran.sembunyikan ? 'Sembunyikan' : 'Kirim Laporan';
    openModal('lapor-modal');
  };
}

function pasangFormBalasan(setelahSimpan) {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="edit-modal" data-modal-backdrop class="modal-backdrop">
      <form id="form-edit" class="modal max-w-lg" role="dialog" aria-modal="true" aria-labelledby="edit-judul">
        <h3 id="edit-judul" class="font-semibold text-base text-neutral1 mb-4">Edit Balasan</h3>
        <textarea name="isi" rows="5" class="input" maxlength="2000" aria-label="Isi balasan"></textarea>
        <p id="edit-error" class="hidden mt-3 !text-sm text-red1" role="alert"></p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" onclick="closeModal('edit-modal')" class="btn-outline">Batal</button>
          <button type="submit" class="btn-primary">Simpan</button>
        </div>
      </form>
    </div>`);

  const form = document.getElementById('form-edit');
  const pesan = document.getElementById('edit-error');
  let sasaran = null;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const hasil = DB.forum.ubahBalasan(sasaran.id_topik, sasaran.id, SAYA.id, form.elements.isi.value);
    if (!hasil.ok) {
      pesan.textContent = hasil.error;
      pesan.classList.remove('hidden');
      return;
    }
    closeModal('edit-modal');
    setelahSimpan();
    showToast('Balasan berhasil diubah.');
  });

  return (idTopik, b) => {
    sasaran = { id_topik: idTopik, id: b.id };
    form.elements.isi.value = b.isi;
    pesan.classList.add('hidden');
    openModal('edit-modal');
  };
}

function blokPolling(t) {
  const total = jumlahSuara(t);
  const sudahMemilih = t.opsi.some(o => o.suara.includes(SAYA.id));
  const tampilHasil = sudahMemilih || KOORDINATOR || t.kunci;
  return `
    <div class="mt-4 space-y-2">
      ${t.opsi.map(o => {
        const persen = total ? Math.round(o.suara.length / total * 100) : 0;
        return tampilHasil ? `
          <div class="relative rounded-lg border border-neutral4 overflow-hidden">
            <div class="absolute inset-y-0 left-0 bg-primary5" style="width:${persen}%"></div>
            <div class="relative flex items-center justify-between gap-3 px-3.5 py-2.5 text-sm">
              <span class="font-medium text-neutral1 min-w-0 inline-flex items-center gap-1.5">${o.suara.includes(SAYA.id) ? '<i data-lucide="check" class="w-4 h-4 text-primary1 shrink-0"></i>' : ''}${esc(o.teks)}</span>
              <span class="text-xs font-semibold text-neutral2 tabular-nums shrink-0">${persen}% · ${o.suara.length}</span>
            </div>
          </div>` : `
          <button type="button" data-aksi="pilih" data-opsi="${o.id}" class="w-full text-left px-3.5 py-2.5 rounded-lg border border-neutral4 text-sm font-medium text-neutral1 hover:border-primary1 hover:bg-primary5 transition-colors">${esc(o.teks)}</button>`;
      }).join('')}
      <p class="!text-xs text-neutral3">${total} suara${tampilHasil ? '' : ' · Pilih satu untuk melihat hasil'}</p>
    </div>`;
}

function pasangDetailForum() {
  const main = document.querySelector('main');
  const id = Number(new URLSearchParams(location.search).get('id'));
  const ambil = () => DB.forum.semua(SAYA.id).find(t => t.id === id);
  const kembali = '<a href="forum.html" class="inline-flex items-center gap-1.5 text-sm text-neutral2 hover:text-primary1"><i data-lucide="arrow-left" class="w-4 h-4"></i> Kembali ke Forum</a>';

  if (!ambil()) {
    main.innerHTML = `${kembali}${kartuKosong('search-x', 'Diskusi tidak ditemukan', 'Diskusi ini mungkin sudah dihapus atau disembunyikan.')}`;
    return;
  }

  DB.forum.lihat(id);
  const pertanyaan = ambil().jenis === 'tanya';
  const gayaTombol = 'inline-flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium hover:bg-neutral5 transition-colors';
  const gayaAksi = 'inline-flex items-center gap-1 font-medium text-neutral2 hover:text-primary1 transition-colors';
  const gayaModerasi = 'btn-outline !px-3 !py-1.5 !text-xs';
  let balasKe = null;

  main.innerHTML = `
    <div class="max-w-7xl mx-auto space-y-4">
      ${kembali}
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div class="xl:col-span-2 space-y-4 min-w-0">
          <div id="diskusi"></div>
          <section class="space-y-4" aria-labelledby="judul-balasan">
            <h3 id="judul-balasan" class="!text-base font-semibold text-neutral1"></h3>
            <div id="balasan" class="space-y-4"></div>
          </section>
          <p id="info-tutup" class="hidden !text-sm text-neutral2 bg-neutral5 border border-neutral4 rounded-xl px-4 py-3">Diskusi ini ditutup koordinator. Balasan baru tidak bisa dikirim.</p>
          <form id="form-balas" class="bg-white rounded-xl border border-neutral4 elevation1 p-4 scroll-mt-20">
            <div id="balas-ke" class="hidden mb-3 flex items-center justify-between gap-3 rounded-lg bg-primary5 px-3 py-2 text-xs text-primary1">
              <span id="balas-ke-nama" class="min-w-0 truncate"></span>
              <button type="button" data-aksi="batal-balas" class="font-semibold hover:underline shrink-0">Batal</button>
            </div>
            <div class="flex items-start gap-3">
              ${fotoBulat(SAYA, 'w-10 h-10')}
              <div class="flex-1 min-w-0">
                <textarea name="isi" rows="3" class="input" maxlength="2000" placeholder="${pertanyaan ? 'Tulis jawaban Anda' : 'Tulis balasan Anda'}" aria-label="Tulis balasan"></textarea>
                <p id="balas-error" class="hidden mt-2 !text-sm text-red1" role="alert"></p>
                <div class="flex justify-end mt-2">
                  <button type="submit" class="btn-primary"><i data-lucide="send" class="w-4 h-4"></i> Kirim</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <aside id="samping" class="space-y-4 min-w-0" aria-label="Info diskusi"></aside>
      </div>
    </div>`;

  const formBalas = document.getElementById('form-balas');
  const pesanBalas = document.getElementById('balas-error');
  const bukaForm = pasangFormDiskusi(() => {
    render();
    showToast('Diskusi berhasil diubah.');
  });
  const bukaLapor = pasangFormLapor(() => render());
  const bukaEditBalasan = pasangFormBalasan(() => render());

  function renderDiskusi(t) {
    const penulis = DB.akun.cari(t.id_user);
    const milikSaya = t.id_user === SAYA.id;
    const disukai = t.suka.includes(SAYA.id);
    const tersimpan = t.disimpan.includes(SAYA.id);
    document.getElementById('diskusi').innerHTML = `
      <article class="bg-white rounded-xl border border-neutral4 elevation1">
        ${t.disembunyikan ? `<p class="!text-sm text-red1 bg-red3/40 border-b border-red2/30 rounded-t-xl px-5 py-3">Disembunyikan koordinator karena ${esc(t.disembunyikan)}. Hanya penulis dan koordinator yang dapat melihatnya.</p>` : ''}
        <div class="p-5">
          <div class="flex flex-wrap items-center gap-1.5">${badgeDiskusi(t)}</div>
          <h2 class="!text-xl sm:!text-2xl font-semibold text-neutral1 leading-snug mt-2.5 break-words">${esc(t.judul)}</h2>
          <div class="flex items-center gap-3 mt-3">
            ${fotoBulat(penulis, 'w-11 h-11')}
            <div class="min-w-0">
              <p class="!text-sm font-semibold text-neutral1 leading-tight flex flex-wrap items-center gap-1.5">${namaPenulis(penulis)}${badgeKoordinator(penulis)}</p>
              <p class="!text-xs text-neutral3 mt-0.5">${esc(identitasForum(penulis))} · ${waktuLalu(t.waktu)}${t.diubah ? ' · diedit' : ''}</p>
            </div>
          </div>
          ${t.isi ? `<p class="!text-[15px] text-neutral1 leading-relaxed mt-4 whitespace-pre-line break-words">${isiForum(t.isi)}</p>` : ''}
          ${t.jenis === 'polling' ? blokPolling(t) : ''}
        </div>
        ${t.gambar ? `<div class="px-5 pb-5"><img src="${esc(t.gambar)}" alt="Gambar diskusi" class="w-full max-h-96 object-cover rounded-xl border border-neutral4"></div>` : ''}
        <div class="px-3 py-1.5 flex flex-wrap items-center gap-1 border-t border-neutral4/70">
          <button type="button" data-aksi="suka" aria-pressed="${disukai}" class="${gayaTombol} ${disukai ? 'text-primary1 bg-primary5' : 'text-neutral2'}"><i data-lucide="thumbs-up" class="w-[18px] h-[18px]"></i> ${t.suka.length} Suka</button>
          <button type="button" data-aksi="tandai" aria-pressed="${tersimpan}" class="${gayaTombol} ${tersimpan ? 'text-primary1 bg-primary5' : 'text-neutral2'}"><i data-lucide="bookmark" class="w-[18px] h-[18px]"></i> ${tersimpan ? 'Tersimpan' : 'Simpan'}</button>
          <button type="button" data-aksi="salin" class="${gayaTombol} text-neutral2"><i data-lucide="link" class="w-[18px] h-[18px]"></i> Salin Tautan</button>
          <span class="flex-1"></span>
          ${milikSaya ? `
            <button type="button" data-aksi="edit" class="btn-icon" aria-label="Edit diskusi" title="Edit diskusi"><i data-lucide="pencil" class="w-4 h-4"></i></button>
            <button type="button" data-aksi="hapus" class="btn-icon hover:!bg-red3 hover:!text-red1" aria-label="Hapus diskusi" title="Hapus diskusi"><i data-lucide="trash-2" class="w-4 h-4"></i></button>` : ''}
          ${!milikSaya && !KOORDINATOR ? `<button type="button" data-aksi="lapor" class="${gayaTombol} text-neutral2"><i data-lucide="flag" class="w-[18px] h-[18px]"></i> Laporkan</button>` : ''}
        </div>
        ${KOORDINATOR ? `
          <div class="px-5 py-3 border-t border-neutral4/70 bg-neutral5/60 rounded-b-xl flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-neutral3 mr-1">Moderasi</span>
            <button type="button" data-aksi="sematkan" class="${gayaModerasi}"><i data-lucide="${t.sematkan ? 'pin-off' : 'pin'}" class="w-3.5 h-3.5"></i> ${t.sematkan ? 'Lepas Sematan' : 'Sematkan'}</button>
            <button type="button" data-aksi="kunci" class="${gayaModerasi}"><i data-lucide="${t.kunci ? 'lock-open' : 'lock'}" class="w-3.5 h-3.5"></i> ${t.kunci ? 'Buka Kembali' : 'Tutup Diskusi'}</button>
            ${t.disembunyikan
              ? `<button type="button" data-aksi="pulihkan" class="${gayaModerasi}"><i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Pulihkan</button>`
              : `<button type="button" data-aksi="sembunyikan" class="${gayaModerasi}"><i data-lucide="eye-off" class="w-3.5 h-3.5"></i> Sembunyikan</button>`}
          </div>` : ''}
      </article>`;
  }

  // Koordinator membuka profil alumni dari nama penulis
  function namaPenulis(user) {
    return KOORDINATOR && user.role === 'alumni'
      ? `<a href="profil-alumni.html?id=${user.id}" class="hover:text-primary1 hover:underline">${esc(user.nama)}</a>`
      : esc(user.nama);
  }

  function blokBalasan(t, b, anak = []) {
    const penulis = DB.akun.cari(b.id_user);
    const milikSaya = b.id_user === SAYA.id;
    const terbaik = t.id_jawaban === b.id;
    const disukai = b.suka.includes(SAYA.id);
    const tujuan = b.id_tujuan ? DB.akun.cari(b.id_tujuan) : null;
    const tertutup = b.disembunyikan && !KOORDINATOR && !milikSaya;
    const bisaBalas = !t.kunci && !t.disembunyikan;
    const bisaPilih = t.jenis === 'tanya' && !b.id_induk && !b.disembunyikan && (t.id_user === SAYA.id || KOORDINATOR);
    const anakHTML = anak.length ? `<div class="mt-3 pl-3 border-l-2 border-neutral4 space-y-3">${anak.map(x => blokBalasan(t, x)).join('')}</div>` : '';

    if (tertutup) {
      return `
        <div id="balasan-${b.id}" class="scroll-mt-20 min-w-0">
          <p class="!text-sm italic text-neutral3 rounded-xl border border-dashed border-neutral4 px-4 py-2.5">Balasan ini disembunyikan koordinator.</p>
          ${anakHTML}
        </div>`;
    }

    const aksi = [
      `<button type="button" data-aksi="suka" data-balasan="${b.id}" aria-pressed="${disukai}" class="${gayaAksi} ${disukai ? '!text-primary1' : ''}"><i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>${b.suka.length ? `${b.suka.length} ` : ''}Suka</button>`,
      bisaBalas && `<button type="button" data-aksi="balas" data-balasan="${b.id}" class="${gayaAksi}"><i data-lucide="reply" class="w-3.5 h-3.5"></i>Balas</button>`,
      bisaPilih && `<button type="button" data-aksi="jawaban" data-balasan="${b.id}" class="${gayaAksi} ${terbaik ? '' : '!text-green1'}"><i data-lucide="circle-check" class="w-3.5 h-3.5"></i>${terbaik ? 'Batalkan Jawaban' : 'Jadikan Jawaban Terbaik'}</button>`,
      milikSaya && `<button type="button" data-aksi="edit-balasan" data-balasan="${b.id}" class="${gayaAksi}">Edit</button>`,
      milikSaya && `<button type="button" data-aksi="hapus-balasan" data-balasan="${b.id}" class="${gayaAksi} hover:!text-red1">Hapus</button>`,
      !milikSaya && !KOORDINATOR && `<button type="button" data-aksi="lapor" data-balasan="${b.id}" class="${gayaAksi}">Laporkan</button>`,
      KOORDINATOR && (b.disembunyikan
        ? `<button type="button" data-aksi="pulihkan" data-balasan="${b.id}" class="${gayaAksi}">Pulihkan</button>`
        : `<button type="button" data-aksi="sembunyikan" data-balasan="${b.id}" class="${gayaAksi} hover:!text-red1">Sembunyikan</button>`),
    ].filter(Boolean).join('');

    return `
      <div id="balasan-${b.id}" class="flex items-start gap-3 scroll-mt-20 min-w-0 rounded-xl target:ring-2 target:ring-primary3 target:ring-offset-4">
        ${fotoBulat(penulis, b.id_induk ? 'w-8 h-8' : 'w-10 h-10')}
        <div class="flex-1 min-w-0">
          <div class="rounded-xl border px-4 py-2.5 ${terbaik ? 'bg-green3/30 border-green2/30' : 'bg-neutral5/70 border-neutral4/60'}">
            ${terbaik ? '<p class="flex items-center gap-1.5 !text-xs font-semibold text-green1 mb-1"><i data-lucide="circle-check" class="w-3.5 h-3.5"></i> Jawaban Terbaik</p>' : ''}
            ${b.disembunyikan ? `<p class="!text-xs font-medium text-red1 mb-1">Disembunyikan koordinator karena ${esc(b.disembunyikan)}.</p>` : ''}
            <p class="!text-sm font-semibold text-neutral1 flex flex-wrap items-center gap-1.5">${namaPenulis(penulis)}${badgeKoordinator(penulis)}</p>
            <p class="!text-xs text-neutral3 leading-snug">${esc(identitasForum(penulis))}</p>
            <p class="!text-sm text-neutral1 mt-1.5 leading-relaxed whitespace-pre-line break-words">${tujuan ? `<span class="font-semibold text-primary1">@${esc(tujuan.nama)}</span> ` : ''}${isiForum(b.isi)}</p>
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 px-1 text-xs text-neutral3">
            <span>${waktuLalu(b.waktu)}${b.diubah ? ' · diedit' : ''}</span>
            ${aksi}
          </div>
          ${anakHTML}
        </div>
      </div>`;
  }

  function renderBalasan(t) {
    const induk = t.balasan.filter(b => !b.id_induk).sort((a, b) => (b.id === t.id_jawaban) - (a.id === t.id_jawaban) || a.id - b.id);
    const jumlah = DB.forum.balasanTampil(t).length;
    document.getElementById('judul-balasan').textContent = `${jumlah} ${pertanyaan ? 'Jawaban' : 'Balasan'}`;
    document.getElementById('balasan').innerHTML = induk.map(b => blokBalasan(t, b, t.balasan.filter(x => x.id_induk === b.id))).join('')
      || `<p class="!text-sm text-neutral3 bg-white rounded-xl border border-neutral4 px-4 py-6 text-center">${t.kunci ? 'Belum ada balasan.' : pertanyaan ? 'Belum ada jawaban. Bagikan pengalaman Anda.' : 'Belum ada balasan. Mulai percakapannya.'}</p>`;
    formBalas.classList.toggle('hidden', Boolean(t.kunci || t.disembunyikan));
    document.getElementById('info-tutup').classList.toggle('hidden', !t.kunci);
  }

  function renderSamping(t) {
    const bisaUndang = t.jenis === 'tanya' && !t.id_jawaban && !t.kunci && !t.disembunyikan && (t.id_user === SAYA.id || KOORDINATOR);
    const calon = bisaUndang ? DB.forum.bisaBantu(t) : [];
    const terkait = DB.forum.terkait(t, SAYA.id);
    document.getElementById('samping').innerHTML = [
      calon.length && kartuSamping('life-buoy', 'Alumni yang Bisa Bantu', `
        <p class="!text-xs text-neutral3 -mt-1">Dipilih dari data tracer yang sesuai kategori ${esc(t.kategori)}.</p>
        <div class="flex flex-col gap-3">
          ${calon.map(a => {
            const diundang = t.undangan.includes(a.id);
            return `
              <div class="flex items-center gap-3 min-w-0">
                ${fotoBulat(a, 'w-9 h-9')}
                <div class="flex-1 min-w-0">
                  <p class="!text-[13px] font-semibold text-neutral1 truncate">${esc(a.nama)}</p>
                  <p class="!text-[11px] text-neutral3 leading-snug">${esc(identitasForum(a))}</p>
                </div>
                <button type="button" data-aksi="undang" data-alumni="${a.id}" ${diundang ? 'disabled' : ''} class="btn-outline !px-2.5 !py-1 !text-xs shrink-0">${diundang ? 'Diundang' : 'Undang'}</button>
              </div>`;
          }).join('')}
        </div>`),
      terkait.length && kartuSamping('messages-square', 'Diskusi Terkait', daftarRingkas(terkait)),
    ].filter(Boolean).join('');
  }

  function render() {
    const t = ambil();
    renderDiskusi(t);
    renderBalasan(t);
    renderSamping(t);
    refreshIcons();
  }

  function aturBalasKe(idBalasan) {
    const b = idBalasan ? ambil().balasan.find(x => x.id === Number(idBalasan)) : null;
    balasKe = b ? b.id : null;
    document.getElementById('balas-ke').classList.toggle('hidden', !b);
    document.getElementById('balas-ke-nama').textContent = b ? `Membalas ${DB.akun.cari(b.id_user).nama}` : '';
  }

  const hapusDiskusi = () => confirmAction({ title: 'Hapus diskusi?', message: 'Diskusi beserta semua balasannya akan dihapus permanen.', okLabel: 'Hapus', danger: true }, () => {
    DB.forum.hapus(id, SAYA.id);
    location.replace('forum.html');
  });

  const hapusBalasan = idBalasan => confirmAction({ title: 'Hapus balasan?', message: 'Balasan ini dan balasan di bawahnya akan dihapus permanen.', okLabel: 'Hapus', danger: true }, () => {
    DB.forum.hapusBalasan(id, idBalasan, SAYA.id);
    aturBalasKe(null);
    render();
    showToast('Balasan berhasil dihapus.');
  });

  async function salinTautan() {
    try {
      await navigator.clipboard.writeText(location.href);
      showToast('Tautan disalin.');
    } catch {
      showToast('Browser menolak akses salin.', 'error');
    }
  }

  const sasaran = d => ({ id_topik: id, id_balasan: Number(d.balasan) || null });
  const cuplikan = d => {
    const { b } = DB.forum.konten(sasaran(d));
    return b ? b.isi : ambil().judul;
  };

  // Hanya membuka form atau menyalin, isi halaman tidak berubah
  const BUKA = {
    salin: salinTautan,
    edit: () => bukaForm(ambil()),
    hapus: hapusDiskusi,
    'hapus-balasan': d => hapusBalasan(d.balasan),
    'edit-balasan': d => bukaEditBalasan(id, DB.forum.konten(sasaran(d)).b),
    lapor: d => bukaLapor({ ...sasaran(d), cuplikan: cuplikan(d) }),
    sembunyikan: d => bukaLapor({ ...sasaran(d), cuplikan: cuplikan(d), sembunyikan: true }),
    balas: d => {
      aturBalasKe(d.balasan);
      formBalas.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formBalas.elements.isi.focus();
    },
    'batal-balas': () => aturBalasKe(null),
  };

  // Mengubah data, jadi isi halaman digambar ulang
  const UBAH = {
    suka: d => DB.forum.suka(id, SAYA.id, d.balasan),
    tandai: () => DB.forum.tandai(id, SAYA.id),
    pilih: d => DB.forum.pilihOpsi(id, d.opsi, SAYA.id),
    jawaban: d => DB.forum.pilihJawaban(id, d.balasan, SAYA.id),
    pulihkan: d => DB.forum.pulihkan(sasaran(d), SAYA.id),
    sematkan: () => DB.forum.atur(id, SAYA.id, 'sematkan'),
    kunci: () => DB.forum.atur(id, SAYA.id, 'kunci'),
    undang: d => {
      const hasil = DB.forum.undang(id, SAYA.id, Number(d.alumni));
      if (hasil.ok) showToast('Undangan terkirim lewat notifikasi.');
      return hasil;
    },
  };

  main.addEventListener('click', e => {
    const tombol = e.target.closest('[data-aksi]');
    if (!tombol) return;
    const { aksi, balasan } = tombol.dataset;
    if (BUKA[aksi]) return BUKA[aksi](tombol.dataset);
    const hasil = UBAH[aksi](tombol.dataset);
    if (hasil?.ok === false) showToast(hasil.error, 'error');
    render();
    // Tombol ikut digambar ulang, jadi fokus keyboard dikembalikan ke tombol yang sama
    main.querySelector(`[data-aksi="${aksi}"]${balasan ? `[data-balasan="${balasan}"]` : ''}`)?.focus();
  });

  formBalas.addEventListener('submit', e => {
    e.preventDefault();
    pesanBalas.classList.add('hidden');
    const hasil = DB.forum.balas(id, SAYA.id, formBalas.elements.isi.value, balasKe);
    if (!hasil.ok) {
      pesanBalas.textContent = hasil.error;
      pesanBalas.classList.remove('hidden');
      return;
    }
    formBalas.reset();
    aturBalasKe(null);
    render();
    document.getElementById(`balasan-${hasil.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Balasan terkirim.');
  });

  // Tautan dari notifikasi dan laporan menuju balasan tertentu, yang baru ada setelah halaman digambar
  window.addEventListener('load', () => document.getElementById(location.hash.slice(1))?.scrollIntoView());

  render();
}
