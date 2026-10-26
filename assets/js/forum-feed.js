/**
 * Feed forum bersama Koordinator & Mitra. Tampilan dan interaksinya mengikuti feed dashboard alumni
 * (alumni/dashboard.html) tanpa kolom pengumuman; datanya forum bersama BengkodStore (store.js).
 * Dimuat setelah store.js, JS role (esc, fmtDate, confirmAction) dan main.js (showToast).
 * Pakai: ForumFeed.mount(elemen, { nama, peran, moderator }) — moderator boleh menghapus post/komentar.
 */
(function () {
  const MAX_GAMBAR = 1024 * 1024; // gambar disimpan sebagai data URL di localStorage, jadi dibatasi 1 MB
  const PERAN_WARNA = {
    Mitra: 'bg-secondary3 text-yellow1 border-yellow2/30',
    Alumni: 'bg-green3 text-green1 border-green2/30',
    Koordinator: 'bg-primary5 text-primary1 border-primary4/50',
  };

  // Ikon SVG yang sama dengan feed alumni
  const svg = (isi, ukuran = 18, attr = 'fill="none"') => `<svg xmlns="http://www.w3.org/2000/svg" width="${ukuran}" height="${ukuran}" viewBox="0 0 24 24" ${attr} aria-hidden="true">${isi}</svg>`;
  const garis = d => `<path d="${d}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const JEMPOL = 'M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3';
  const ICON = {
    tambah: svg('<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>', 13),
    cari: svg('<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>' + garis('M21 21l-4.35-4.35')),
    publik: svg('<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>', 12),
    suka: (aktif, ukuran = 18) => svg(garis(JEMPOL), ukuran, `fill="${aktif ? 'currentColor' : 'none'}"`),
    sukaBulat: svg(`<path d="${JEMPOL}"/>`, 11, 'fill="currentColor"'),
    komentar: svg(garis('M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z')),
    balas: svg(garis('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z') + garis('M8 10h8'), 17),
    bagikan: svg(garis('M17 1l4 4-4 4') + garis('M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4') + garis('M21 13v2a4 4 0 01-4 4H3')),
    pendapat: svg(garis('M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7') + garis('M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z')),
    menu: svg('<circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/>'),
    tutup: svg(garis('M18 6L6 18M6 6l12 12'), 20),
  };

  let user, listEl, modalEl, posts = [], mitra = [], alumni = [];
  const ui = { q: '', komentarId: null, balasId: null, menuId: null, bagikanId: null, draft: {}, modal: null, isi: '', gambar: '', galat: '', sumber: null, opini: '' };

  // ===== Helper =====
  const inisial = nama => nama.replace(/^(Dr|Prof|Ir)\.\s*/i, '').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const avatar = (nama, ukuran) => `<div class="${ukuran} rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-center flex-shrink-0 shadow-sm text-[#1E3A8A] font-bold">${esc(inisial(nama))}</div>`;
  const peranBadge = peran => `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${PERAN_WARNA[peran] || 'bg-gray-100 text-gray-600 border-gray-200'}">${esc(peran)}</span>`;
  const linkify = teks => esc(teks).replace(/https?:\/\/[^\s<]+/g, u => `<a href="${u}" target="_blank" rel="noreferrer" class="text-[#1E3A8A] font-semibold hover:underline">${u}</a>`);
  const toggle = (arr, nama) => { const i = arr.indexOf(nama); if (i >= 0) arr.splice(i, 1); else arr.push(nama); };
  const jumlahKomentar = p => (p.comments || []).reduce((n, c) => n + 1 + (c.balasan || []).length, 0);
  const ringkas = p => `"${(p.judul || p.isi || '').slice(0, 50)}"`;
  const simpan = () => BengkodStore.saveForum(posts);
  const catat = (aksi, detail) => BengkodStore.logActivity(user.peran, aksi, detail);

  function headline(nama, peran) {
    if (peran === 'Koordinator') return 'Koordinator Alumni · Bengkel Koding UDINUS';
    if (peran === 'Mitra') {
      const m = mitra.find(x => x.pic === nama);
      return `Mitra · ${m ? m.nama_perusahaan : 'Perusahaan Mitra'}`;
    }
    const a = alumni.find(x => x.nama === nama);
    if (!a) return 'Alumni Bengkel Koding';
    return a.jabatan && a.jabatan !== '-' ? `${a.jabatan} · ${a.nama_perusahaan}` : `Alumni Bengkel Koding · Lulus ${a.tahun_lulus}`;
  }

  function waktuLalu(iso) {
    const menit = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (menit < 1) return 'Baru saja';
    if (menit < 60) return `${menit} menit lalu`;
    if (menit < 1440) return `${Math.floor(menit / 60)} jam lalu`;
    return fmtDate(iso);
  }

  function tambahPost(data) {
    posts.unshift({ id: Date.now(), penulis: user.nama, peran: user.peran, waktu: new Date().toISOString(), tags: [], comments: [], disukai: [], dibagikan: 0, ...data });
  }

  // ===== Tampilan =====
  const shellHTML = () => `
    <div class="max-w-3xl mx-auto flex flex-col gap-6">
      <div class="flex items-center justify-between gap-4 pb-3 border-b border-gray-200">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1E3A8A] tracking-tight">Forum Diskusi</h1>
          <p class="text-sm text-gray-500 mt-0.5">Linimasa diskusi koordinator, mitra, dan alumni Bengkel Koding</p>
        </div>
        <button type="button" data-aksi="buat" class="px-5 py-2.5 rounded-full text-[15px] font-semibold text-white bg-[#1E3A8A] hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-sm cursor-pointer shrink-0">
          <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">${ICON.tambah}</span><span>Buat Post</span>
        </button>
      </div>
      <div class="relative">
        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">${ICON.cari}</div>
        <input id="feed-cari" type="search" placeholder="Cari postingan atau nama penulis..." aria-label="Cari postingan forum"
          class="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all shadow-sm">
      </div>
      <div id="feed-list" class="space-y-6"></div>
    </div>
    <div id="feed-modal"></div>`;

  function renderList() {
    const q = ui.q.trim().toLowerCase();
    const list = posts.filter(p => !q || [p.penulis, p.judul, p.isi, ...(p.tags || [])].join(' ').toLowerCase().includes(q));
    listEl.innerHTML = list.map(postHTML).join('') || `<div class="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-[15px]">${q
      ? `Tidak ada postingan yang cocok dengan "${esc(ui.q.trim())}".`
      : 'Belum ada postingan di forum. Klik tombol "Buat Post" untuk memulai diskusi pertama!'}</div>`;
  }

  function postHTML(p) {
    const suka = p.disukai || [];
    const disukai = suka.includes(user.nama);
    const komentarBuka = ui.komentarId === p.id;
    return `<article class="border border-gray-200/90 rounded-xl relative shadow-xs hover:border-gray-300 transition-colors bg-white">
      ${p.dibagikanOleh ? `<div class="px-5 pt-3.5 pb-2 border-b border-gray-100 flex items-center gap-2 text-[14px] text-gray-600 bg-gray-50/50 rounded-t-xl">
        ${avatar(p.dibagikanOleh, 'w-7 h-7 text-[10px]')}<span><span class="font-semibold text-gray-900">${esc(p.dibagikanOleh)}</span> membagikan ulang ini</span></div>` : ''}
      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-3.5 min-w-0">
            ${avatar(p.penulis, 'w-16 h-16 text-base')}
            <div class="flex flex-col min-w-0">
              <div class="flex flex-wrap items-center gap-2"><h4 class="text-[17px] font-semibold text-gray-900 leading-tight">${esc(p.penulis)}</h4>${peranBadge(p.peran)}</div>
              <p class="text-[14px] text-gray-500 leading-snug mt-1">${esc(headline(p.penulis, p.peran))}</p>
              <div class="flex items-center gap-1.5 text-[13px] text-gray-500 mt-1">
                <span>${waktuLalu(p.waktu)}</span><span>•</span>
                <span class="inline-flex items-center gap-1 text-[12px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">${ICON.publik}<span>Semua anggota forum</span></span>
              </div>
            </div>
          </div>
          ${user.moderator ? `<div class="relative shrink-0" data-dropdown>
            <button type="button" data-aksi="menu-post" data-id="${p.id}" aria-label="Menu postingan" aria-expanded="${ui.menuId === p.id}" class="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer">${ICON.menu}</button>
            ${ui.menuId === p.id ? `<div class="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-200/90 overflow-hidden z-50">
              <button type="button" data-aksi="hapus-post" data-id="${p.id}" class="w-full text-left px-4 py-3 text-[14px] font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer">Hapus postingan</button>
            </div>` : ''}
          </div>` : ''}
        </div>
        ${p.judul ? `<h5 class="text-[17px] font-semibold text-gray-900 mt-3.5">${esc(p.judul)}</h5>` : ''}
        ${p.isi ? `<p class="text-[15px] text-gray-800 leading-relaxed ${p.judul ? 'mt-1' : 'mt-3.5'} whitespace-pre-line">${linkify(p.isi)}</p>` : ''}
        ${(p.tags || []).length ? `<div class="flex flex-wrap gap-1.5 mt-3">${p.tags.map(t => `<span class="px-2.5 py-1 rounded-full bg-blue-50 text-[#1E3A8A] text-[12px] font-medium">#${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
      ${p.gambar ? `<div class="px-5 pb-5"><img src="${esc(p.gambar)}" alt="Gambar postingan" class="w-full max-h-[220px] object-cover rounded-xl border border-gray-200/80"></div>` : ''}

      <div class="px-5 py-2.5 border-t border-gray-100 flex items-center justify-between text-[14px] text-gray-500">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">${ICON.sukaBulat}</span>
          <span class="font-medium text-gray-700">${suka.length} menyukai</span>
        </div>
        <div class="flex items-center gap-4"><span>${jumlahKomentar(p)} komentar</span><span>${p.dibagikan || 0} dibagikan</span></div>
      </div>

      <div class="px-5 py-1.5 flex items-center justify-around ${komentarBuka ? 'border-b border-gray-100' : ''} text-[15px] font-semibold text-gray-600">
        <button type="button" data-aksi="suka" data-id="${p.id}" aria-pressed="${disukai}" class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${disukai ? 'text-[#1E3A8A] font-bold bg-blue-50' : ''}">${ICON.suka(disukai)}<span>Suka</span></button>
        <button type="button" data-aksi="komentar" data-id="${p.id}" aria-expanded="${komentarBuka}" class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${komentarBuka ? 'text-[#1E3A8A]' : ''}">${ICON.komentar}<span>Komentar</span></button>
        <div class="relative" data-dropdown>
          <button type="button" data-aksi="menu-bagikan" data-id="${p.id}" aria-expanded="${ui.bagikanId === p.id}" class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">${ICON.bagikan}<span>Bagikan</span></button>
          ${ui.bagikanId === p.id ? `<div class="absolute top-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-[260px] bg-white rounded-xl shadow-2xl border border-gray-200/90 overflow-hidden z-50">
            <button type="button" data-aksi="bagikan-pendapat" data-id="${p.id}" class="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer text-left">${ICON.pendapat}<span class="text-[15px] font-semibold text-gray-900">Bagikan disertai pendapat</span></button>
            <div class="border-t border-gray-100"></div>
            <button type="button" data-aksi="bagikan-instan" data-id="${p.id}" class="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer text-left">${ICON.bagikan}<span class="text-[15px] font-semibold text-gray-900">Bagikan secara instan</span></button>
          </div>` : ''}
        </div>
      </div>
      ${komentarBuka ? komentarHTML(p) : ''}
    </article>`;
  }

  function komentarHTML(p) {
    const komentar = p.comments || [];
    return `<div class="bg-white px-5 py-4 rounded-b-xl">
      <div class="flex items-start gap-3 ${komentar.length ? 'mb-4' : ''}">
        ${avatar(user.nama, 'w-9 h-9 text-[12px]')}
        <div class="flex-1 relative">
          <input type="text" data-draft="k${p.id}" data-kirim="komentar" data-id="${p.id}" value="${esc(ui.draft['k' + p.id] || '')}" placeholder="Tulis komentar..." aria-label="Tulis komentar"
            class="w-full px-4 py-2.5 pr-20 rounded-full border border-gray-200 bg-gray-50 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10">
          <button type="button" data-aksi="kirim-komentar" data-id="${p.id}" class="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8] transition-colors cursor-pointer">Kirim</button>
        </div>
      </div>
      ${komentar.length ? `<div class="space-y-4">${komentar.map(c => komentarItemHTML(p, c)).join('')}</div>` : ''}
    </div>`;
  }

  const tombolSuka = (suka, data, ukuran, teks) => {
    const aktif = suka.includes(user.nama);
    return `<button type="button" ${data} aria-pressed="${aktif}" title="Suka" class="flex items-center gap-1.5 ${teks} font-bold hover:text-[#1E3A8A] transition-colors cursor-pointer ${aktif ? 'text-[#1E3A8A]' : 'text-gray-800'}">${ICON.suka(aktif, ukuran)}<span>${suka.length || ''}</span></button>`;
  };
  const tombolHapus = (data, teks) => user.moderator ? `<button type="button" ${data} class="${teks} font-semibold text-gray-400 hover:text-red-600 transition-colors cursor-pointer">Hapus</button>` : '';

  function komentarItemHTML(p, c) {
    const balasan = c.balasan || [];
    const ref = `data-id="${p.id}" data-c="${c.id}"`;
    return `<div class="flex items-start gap-3">
      ${avatar(c.penulis, 'w-9 h-9 text-[12px]')}
      <div class="flex-1 min-w-0">
        <div class="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
          <p class="text-[14px] font-semibold text-gray-900 flex flex-wrap items-center gap-1.5">${esc(c.penulis)} ${peranBadge(c.peran)}</p>
          <p class="text-[14px] text-gray-700 mt-0.5 leading-relaxed whitespace-pre-line">${linkify(c.isi)}</p>
        </div>
        <div class="flex items-center gap-4 mt-2 px-1">
          ${tombolSuka(c.disukai || [], `data-aksi="suka-komentar" ${ref}`, 16, 'text-[14px]')}
          <button type="button" data-aksi="balas" ${ref} title="Balas komentar ini" aria-label="Balas komentar ${esc(c.penulis)}" class="flex items-center hover:text-[#1E3A8A] transition-colors cursor-pointer ${ui.balasId === c.id ? 'text-[#1E3A8A]' : 'text-gray-800'}">${ICON.balas}</button>
          <span class="text-[13px] text-gray-400">${waktuLalu(c.waktu)}</span>
          ${tombolHapus(`data-aksi="hapus-komentar" ${ref}`, 'text-[13px]')}
        </div>
        ${balasan.length ? `<div class="space-y-3 mt-3 pl-2 sm:pl-3 relative">
          <div class="absolute -left-2 top-0 bottom-3 w-0.5 bg-gray-200"></div>
          ${balasan.map(b => balasanHTML(p, c, b)).join('')}
        </div>` : ''}
        ${ui.balasId === c.id ? `<div class="flex items-start gap-2.5 mt-3 pl-2 sm:pl-3 relative">
          <div class="absolute -left-2.5 top-0 h-4 w-3 border-l-2 border-b-2 border-gray-200 rounded-bl-xl pointer-events-none"></div>
          ${avatar(user.nama, 'w-8 h-8 text-[11px] mt-1')}
          <div class="flex-1 min-w-0">
            <div class="relative flex items-center bg-white rounded-full border border-gray-300 focus-within:border-[#1E3A8A] focus-within:ring-2 focus-within:ring-[#1E3A8A]/10 px-3.5 py-1.5 transition-all">
              <span class="font-bold text-[13px] text-gray-900 mr-1.5 flex-shrink-0 select-none">${esc(c.penulis)}</span>
              <input type="text" data-draft="b${c.id}" data-kirim="balasan" ${ref} value="${esc(ui.draft['b' + c.id] || '')}" placeholder="Tulis balasan..." aria-label="Tulis balasan" class="flex-1 bg-transparent text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none min-w-0">
              <button type="button" data-aksi="kirim-balasan" ${ref} class="ml-2 text-[13px] font-semibold text-[#1E3A8A] hover:text-[#1D4ED8] transition-colors cursor-pointer flex-shrink-0">Kirim</button>
            </div>
          </div>
        </div>` : ''}
      </div>
    </div>`;
  }

  function balasanHTML(p, c, b) {
    const ref = `data-id="${p.id}" data-c="${c.id}" data-b="${b.id}"`;
    return `<div class="flex items-start gap-2.5 relative">
      <div class="absolute -left-2 top-3 w-2.5 border-b-2 border-gray-200"></div>
      ${avatar(b.penulis, 'w-8 h-8 text-[11px]')}
      <div class="flex-1 min-w-0">
        <div class="bg-gray-50 rounded-xl px-3.5 py-2.5 border border-gray-100">
          <p class="text-[13px] font-bold text-gray-900 flex flex-wrap items-center gap-1.5">${esc(b.penulis)} ${peranBadge(b.peran)}</p>
          <p class="text-[13px] text-gray-700 mt-0.5 leading-relaxed"><span class="font-semibold text-[#1E3A8A] mr-1">@${esc(c.penulis)}</span>${linkify(b.isi)}</p>
        </div>
        <div class="flex items-center gap-3 mt-1 px-1">
          ${tombolSuka(b.disukai || [], `data-aksi="suka-balasan" ${ref}`, 13, 'text-[12px]')}
          <span class="text-[12px] text-gray-400">${waktuLalu(b.waktu)}</span>
          ${tombolHapus(`data-aksi="hapus-balasan" ${ref}`, 'text-[12px]')}
        </div>
      </div>
    </div>`;
  }

  function renderModal() {
    document.body.classList.toggle('overflow-hidden', !!ui.modal);
    modalEl.innerHTML = ui.modal === 'buat' ? modalBuatHTML() : ui.modal === 'bagikan' ? modalBagikanHTML() : '';
    const fokus = modalEl.querySelector('textarea');
    if (fokus) setTimeout(() => fokus.focus(), 30);
  }

  const modalBuatHTML = () => `<div data-backdrop class="fixed inset-0 z-[80] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
    <form data-form="buat" role="dialog" aria-modal="true" aria-labelledby="feed-buat-judul" novalidate class="bg-white rounded-xl border border-gray-200/90 shadow-sm flex flex-col overflow-hidden w-[90vw] max-w-[720px] max-h-[92vh]">
      <div class="px-6 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 id="feed-buat-judul" class="text-[20px] font-bold text-gray-900 tracking-tight">Tambah postingan</h2>
        <button type="button" data-aksi="tutup" aria-label="Tutup modal" class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer">${ICON.tutup}</button>
      </div>
      <div class="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
        <div class="space-y-1.5">
          <label for="feed-isi" class="block text-[14px] font-medium text-gray-700">Keterangan <span class="text-red-500 font-bold">*</span></label>
          <textarea id="feed-isi" data-draft="isi" rows="5" style="resize: none" placeholder="Bagikan informasi, pertanyaan, atau topik diskusi untuk anggota forum..."
            class="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 leading-relaxed">${esc(ui.isi)}</textarea>
        </div>
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="block text-[14px] font-medium text-gray-700">Media</span>
            <span class="text-[12px] text-gray-400 tabular-nums">${ui.gambar ? '1/1' : '0/1'}</span>
          </div>
          ${ui.gambar ? `<div class="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
            <div class="max-w-md mx-auto rounded-lg overflow-hidden border border-gray-200 bg-white"><img src="${esc(ui.gambar)}" alt="Pratinjau media" class="w-full max-h-[260px] object-contain"></div>
            <div class="mt-3 flex items-center justify-end gap-2">
              <button type="button" data-aksi="pilih-gambar" class="px-4 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-[13px] font-semibold text-gray-700 transition-colors cursor-pointer">Ganti media</button>
              <button type="button" data-aksi="hapus-gambar" class="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold transition-colors cursor-pointer">Hapus media</button>
            </div>
          </div>` : `<div>
            <button type="button" data-aksi="pilih-gambar" class="px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-[14px] font-semibold text-gray-700 transition-colors flex items-center gap-2 cursor-pointer"><span class="text-lg leading-none">+</span><span>Tambahkan media</span></button>
            <p class="text-[12px] text-gray-400 mt-2">Belum ada media. Tambahkan gambar (maks. 1 MB) untuk postingan Anda.</p>
          </div>`}
          ${ui.galat ? `<p class="text-[12px] text-red-600" role="alert">${esc(ui.galat)}</p>` : ''}
          <input type="file" data-file accept="image/*" class="hidden">
        </div>
      </div>
      <div class="border-t border-gray-200 px-6 sm:px-8 py-3.5 bg-gray-50/50 flex items-center justify-end gap-3 flex-shrink-0">
        <button type="button" data-aksi="tutup" class="px-5 py-2 rounded-full border border-gray-300 text-[14px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">Batal</button>
        <button type="submit" data-simpan ${ui.isi.trim() || ui.gambar ? '' : 'disabled'} class="px-6 py-2 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[14px] font-semibold shadow-sm transition-colors cursor-pointer">Simpan</button>
      </div>
    </form>
  </div>`;

  function modalBagikanHTML() {
    const s = ui.sumber;
    return `<div data-backdrop class="fixed inset-0 z-[80] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="feed-bagikan-judul" class="bg-white rounded-2xl border border-gray-200/90 shadow-2xl flex flex-col w-[95vw] max-w-[620px] max-h-[90vh] overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            ${avatar(user.nama, 'w-12 h-12 text-sm')}
            <div class="min-w-0">
              <h4 id="feed-bagikan-judul" class="font-bold text-gray-900 text-[15px] truncate">${esc(user.nama)}</h4>
              <span class="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 mt-0.5">${ICON.publik}<span>Posting ke semua anggota forum</span></span>
            </div>
          </div>
          <button type="button" data-aksi="tutup" aria-label="Tutup" class="text-gray-400 hover:text-gray-700 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer shrink-0">${ICON.tutup}</button>
        </div>
        <div class="p-6 overflow-y-auto space-y-4 flex-1 min-h-0">
          <textarea data-draft="opini" rows="3" placeholder="Tambahkan pemikiran Anda (opsional)" aria-label="Pemikiran Anda" class="w-full resize-none text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none leading-relaxed">${esc(ui.opini)}</textarea>
          <div class="border border-gray-200 rounded-xl p-4 bg-gray-50/60 space-y-3">
            <div class="flex items-center gap-3">
              ${avatar(s.penulis, 'w-10 h-10 text-[12px]')}
              <div class="min-w-0">
                <p class="font-bold text-[14px] text-gray-900">${esc(s.penulis)}</p>
                <p class="text-[12px] text-gray-500 truncate">${esc(headline(s.penulis, s.peran))}</p>
              </div>
            </div>
            ${s.judul ? `<p class="text-[14px] font-semibold text-gray-900">${esc(s.judul)}</p>` : ''}
            <p class="text-[13px] text-gray-800 leading-relaxed line-clamp-3">${esc(s.isi || '')}</p>
            ${s.gambar ? `<div class="rounded-lg overflow-hidden border border-gray-200 max-h-48 bg-gray-100"><img src="${esc(s.gambar)}" alt="Pratinjau media" class="w-full h-full object-cover"></div>` : ''}
          </div>
        </div>
        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2.5 bg-white">
          <button type="button" data-aksi="tutup" class="px-4 py-2 text-[14px] font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">Batal</button>
          <button type="button" data-aksi="kirim-bagikan" class="px-6 py-2 bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold rounded-full shadow-sm cursor-pointer transition-colors">Bagikan</button>
        </div>
      </div>
    </div>`;
  }

  // ===== Aksi =====
  // Tanpa pendapat = bagikan ulang post asli (penulis asli tetap); dengan pendapat = post baru milik pengguna
  function bagikan(s, opini) {
    tambahPost(opini
      ? { isi: `${opini}\n\n---\nRepost dari @${s.penulis}:\n${[s.judul, s.isi].filter(Boolean).join('\n')}`, gambar: s.gambar, dibagikanOleh: user.nama }
      : { penulis: s.penulis, peran: s.peran, judul: s.judul, isi: s.isi, tags: s.tags || [], gambar: s.gambar, dibagikanOleh: user.nama });
    s.dibagikan = (s.dibagikan || 0) + 1;
    simpan();
    catat('Bagikan Postingan Forum', `Membagikan postingan ${ringkas(s)}`);
    renderList();
    showToast(opini ? 'Postingan berhasil dibagikan dengan pemikiran Anda.' : 'Postingan berhasil dibagikan ulang.');
  }

  // Moderasi (khusus moderator): konfirmasi dulu, lalu hapus, simpan, dan catat ke log aktivitas
  function hapus(benda, pesan, terapkan, aksiLog, detailLog) {
    confirmAction({ title: `Hapus ${benda}?`, message: pesan, okLabel: 'Hapus', danger: true }, () => {
      terapkan();
      simpan();
      catat(aksiLog, detailLog);
      renderList();
      showToast(`${benda[0].toUpperCase()}${benda.slice(1)} dihapus.`);
    });
  }

  function simpanPost() {
    const isi = ui.isi.trim();
    if (!isi && !ui.gambar) return;
    tambahPost({ isi, gambar: ui.gambar || undefined });
    simpan();
    catat('Buat Postingan Forum', `Menerbitkan postingan "${isi.slice(0, 50)}"`);
    ui.modal = null;
    renderModal();
    renderList();
    showToast('Postingan berhasil diterbitkan.');
  }

  function bacaGambar(input) {
    const file = input.files && input.files[0];
    input.value = '';
    if (!file) return;
    ui.galat = !file.type.startsWith('image/') ? 'Berkas harus berupa gambar.' : file.size > MAX_GAMBAR ? 'Ukuran gambar maksimal 1 MB.' : '';
    if (ui.galat) return renderModal();
    const reader = new FileReader();
    reader.onload = () => { ui.gambar = reader.result; renderModal(); };
    reader.readAsDataURL(file);
  }

  const AKSI = {
    buat() { Object.assign(ui, { isi: '', gambar: '', galat: '', modal: 'buat' }); renderModal(); },
    tutup() { Object.assign(ui, { modal: null, sumber: null }); renderModal(); },
    'pilih-gambar'() { modalEl.querySelector('[data-file]').click(); },
    'hapus-gambar'() { ui.gambar = ''; renderModal(); },
    suka(p) { toggle(p.disukai = p.disukai || [], user.nama); simpan(); renderList(); },
    komentar(p) { ui.komentarId = ui.komentarId === p.id ? null : p.id; ui.balasId = null; renderList(); },
    'menu-post'(p) { ui.menuId = ui.menuId === p.id ? null : p.id; ui.bagikanId = null; renderList(); },
    'menu-bagikan'(p) { ui.bagikanId = ui.bagikanId === p.id ? null : p.id; ui.menuId = null; renderList(); },
    'bagikan-instan'(p) { ui.bagikanId = null; bagikan(p, ''); },
    'bagikan-pendapat'(p) { Object.assign(ui, { bagikanId: null, sumber: p, opini: '', modal: 'bagikan' }); renderList(); renderModal(); },
    'kirim-bagikan'() { const s = ui.sumber; const opini = ui.opini.trim(); AKSI.tutup(); bagikan(s, opini); },
    'kirim-komentar'(p) {
      const isi = (ui.draft['k' + p.id] || '').trim();
      if (!isi) return;
      (p.comments = p.comments || []).push({ id: Date.now(), penulis: user.nama, peran: user.peran, waktu: new Date().toISOString(), isi, disukai: [], balasan: [] });
      ui.draft['k' + p.id] = '';
      simpan();
      catat('Komentar Forum', `Mengomentari postingan ${ringkas(p)}`);
      renderList();
      const input = listEl.querySelector(`[data-draft="k${p.id}"]`);
      if (input) input.focus();
    },
    balas(p, c) {
      ui.balasId = ui.balasId === c.id ? null : c.id;
      renderList();
      const input = listEl.querySelector(`[data-draft="b${c.id}"]`);
      if (input) input.focus();
    },
    'kirim-balasan'(p, c) {
      const isi = (ui.draft['b' + c.id] || '').trim();
      if (!isi) return;
      (c.balasan = c.balasan || []).push({ id: Date.now(), penulis: user.nama, peran: user.peran, waktu: new Date().toISOString(), isi, disukai: [] });
      ui.draft['b' + c.id] = '';
      ui.balasId = null;
      simpan();
      catat('Komentar Forum', `Membalas komentar ${c.penulis} di postingan ${ringkas(p)}`);
      renderList();
    },
    'suka-komentar'(p, c) { toggle(c.disukai = c.disukai || [], user.nama); simpan(); renderList(); },
    'suka-balasan'(p, c, b) { toggle(b.disukai = b.disukai || [], user.nama); simpan(); renderList(); },
    'hapus-post'(p) {
      ui.menuId = null;
      renderList();
      hapus('postingan', `Postingan ${p.penulis} ${ringkas(p)} beserta komentarnya akan dihapus.`,
        () => { posts = posts.filter(x => x !== p); }, 'Hapus Postingan Forum', `Menghapus postingan ${p.penulis}: ${ringkas(p)}`);
    },
    'hapus-komentar'(p, c) {
      hapus('komentar', `Komentar ${c.penulis} beserta balasannya akan dihapus.`,
        () => { p.comments = p.comments.filter(x => x !== c); }, 'Hapus Komentar Forum', `Menghapus komentar ${c.penulis} di postingan ${ringkas(p)}`);
    },
    'hapus-balasan'(p, c, b) {
      hapus('balasan', `Balasan ${b.penulis} akan dihapus.`,
        () => { c.balasan = c.balasan.filter(x => x !== b); }, 'Hapus Komentar Forum', `Menghapus balasan ${b.penulis} di postingan ${ringkas(p)}`);
    },
  };

  function mount(root, pengguna) {
    user = pengguna;
    mitra = BengkodStore.getMitra();
    alumni = BengkodStore.getAlumni();
    posts = BengkodStore.getForum().sort((a, b) => String(b.waktu).localeCompare(String(a.waktu)));
    root.innerHTML = shellHTML();
    listEl = root.querySelector('#feed-list');
    modalEl = root.querySelector('#feed-modal');

    root.addEventListener('click', e => {
      if (e.target.matches('[data-backdrop]')) return AKSI.tutup();
      const btn = e.target.closest('[data-aksi]');
      if (!btn) return;
      const p = btn.dataset.id ? posts.find(x => x.id === Number(btn.dataset.id)) : null;
      const c = p && btn.dataset.c ? (p.comments || []).find(x => x.id === Number(btn.dataset.c)) : null;
      const b = c && btn.dataset.b ? (c.balasan || []).find(x => x.id === Number(btn.dataset.b)) : null;
      AKSI[btn.dataset.aksi](p, c, b);
    });
    // Klik di luar menu ⋮ / Bagikan menutup menu tersebut
    document.addEventListener('click', e => {
      if ((ui.menuId || ui.bagikanId) && !e.target.closest('[data-dropdown]')) {
        ui.menuId = ui.bagikanId = null;
        renderList();
      }
    });
    root.addEventListener('input', e => {
      const t = e.target;
      if (t.id === 'feed-cari') { ui.q = t.value; return renderList(); }
      if (t.dataset.draft === 'isi') { ui.isi = t.value; modalEl.querySelector('[data-simpan]').disabled = !ui.isi.trim() && !ui.gambar; return; }
      if (t.dataset.draft === 'opini') { ui.opini = t.value; return; }
      if (t.dataset.draft) ui.draft[t.dataset.draft] = t.value;
    });
    root.addEventListener('keydown', e => {
      const t = e.target;
      if (e.key !== 'Enter' || !t.dataset.kirim) return;
      e.preventDefault();
      const p = posts.find(x => x.id === Number(t.dataset.id));
      AKSI['kirim-' + t.dataset.kirim](p, t.dataset.c ? (p.comments || []).find(x => x.id === Number(t.dataset.c)) : null);
    });
    root.addEventListener('submit', e => { e.preventDefault(); simpanPost(); });
    root.addEventListener('change', e => { if (e.target.matches('[data-file]')) bacaGambar(e.target); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && ui.modal) AKSI.tutup(); });

    renderList();
  }

  window.ForumFeed = { mount };
})();
