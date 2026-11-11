/**
 * JS bersama: config Tailwind, komponen UI, helper, penjaga role, dan layout sidebar/topbar.
 * Dimuat di <head> setelah Tailwind CDN, data.js, dan sebelum main.js.
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

// ===================== PENJAGA ROLE (pengganti middleware userAkses) =====================
// Dipakai halaman di folder alumni/ (termasuk login) dan koordinator/. Login hanya ada di alumni/.
const ROLE_HALAMAN = document.documentElement.dataset.role || '';
const SAYA = DB.akun.aktif();
const DASHBOARD = { alumni: 'dashboard.html', admin: '../koordinator/dashboard.html' };
const NAMA_FILE = location.pathname.split('/').pop() || 'dashboard.html';

if (ROLE_HALAMAN && SAYA?.role !== ROLE_HALAMAN) {
  location.replace(ROLE_HALAMAN === 'admin' ? '../koordinator/login.html' : 'login.html');
} else if (ROLE_HALAMAN === 'alumni' && NAMA_FILE !== 'isi-data.html' && !DB.tracer.milik(SAYA.id)) {
  // First login: alumni mengisi data dulu sebelum masuk portal
  location.replace('isi-data.html');
}

// ===================== HELPER =====================
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtDate(iso) {
  return iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
}

function waktuLalu(waktu) {
  const menit = Math.floor((Date.now() - new Date(waktu).getTime()) / 60000);
  if (menit < 1) return 'baru saja';
  if (menit < 60) return `${menit} menit lalu`;
  if (menit < 1440) return `${Math.floor(menit / 60)} jam lalu`;
  if (menit < 10080) return `${Math.floor(menit / 1440)} hari lalu`;
  return fmtDate(waktu);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function inisial(nama) {
  return String(nama || '').replace(/^(Dr\.|Prof\.|Ir\.)\s*/i, '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
}

function avatar(user) {
  return user && user.foto ? `<img src="${esc(user.foto)}" alt="" class="w-full h-full object-cover">` : esc(inisial(user && user.nama));
}

function fotoBulat(user, ukuran = 'w-11 h-11') {
  return `<div class="${ukuran} rounded-full overflow-hidden bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50 shrink-0">${avatar(user)}</div>`;
}

// Tautan WhatsApp dari nomor lokal 08xx, bisa sekaligus membawa template pesan
function tautanWa(noHp, pesan = '') {
  return `https://wa.me/${String(noHp).replace(/^0/, '62')}${pesan ? `?text=${encodeURIComponent(pesan)}` : ''}`;
}

// Hanya tautan http(s) yang dipasang di href, supaya javascript: dari isian pengguna tidak bisa dijalankan
const tautanAman = url => (/^https?:\/\//i.test(String(url || '').trim()) ? String(url).trim() : '');

const tautanProfil = id => (id === SAYA?.id ? 'profil.html' : `profil-alumni.html?id=${id}`);

function chip(teks) {
  return `<span class="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral5 text-neutral2 text-xs font-medium border border-neutral4">${esc(teks)}</span>`;
}

// Pilihan radio atau checkbox berbentuk tombol
function pilihanPil(tipe, name, nilai, label, ikon = '') {
  return `
    <label class="cursor-pointer">
      <input type="${tipe}" name="${name}" value="${esc(nilai)}" class="peer sr-only">
      <span class="flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg border border-neutral4 text-xs sm:text-sm font-medium text-neutral2 text-center transition-colors peer-checked:border-primary1 peer-checked:bg-primary5 peer-checked:text-primary1 peer-focus-visible:ring-4 peer-focus-visible:ring-primary5">${ikon ? `<i data-lucide="${ikon}" class="w-4 h-4 shrink-0"></i>` : ''}${esc(label)}</span>
    </label>`;
}

// Kerangka modal berisi form. Pesan gagal tampil di [data-error] lewat tampilGagal.
function kerangkaModal(id, judul, isi, tombol = 'Simpan', lebar = 'max-w-lg') {
  return `
    <div id="${id}" data-modal-backdrop class="modal-backdrop">
      <form class="modal ${lebar}" role="dialog" aria-modal="true" aria-labelledby="${id}-judul" novalidate>
        <h3 id="${id}-judul" class="font-semibold text-base text-neutral1 mb-4">${judul}</h3>
        <div class="space-y-4">${isi}</div>
        <p data-error class="hidden mt-4 !text-sm text-red1" role="alert"></p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" onclick="closeModal('${id}')" class="btn-outline">Batal</button>
          <button type="submit" class="btn-primary">${tombol}</button>
        </div>
      </form>
    </div>`;
}

// Panel samping dari kanan untuk daftar pelamar. Isinya diisi ke #<id>-isi.
function kerangkaDrawer(id, judul) {
  return `
    <div id="${id}" data-modal-backdrop class="fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden justify-end">
      <div class="h-full w-full max-w-xl bg-white overflow-y-auto elevation5" role="dialog" aria-modal="true" aria-labelledby="${id}-judul">
        <div class="sticky top-0 z-10 bg-white border-b border-neutral4 px-5 py-4 flex items-center justify-between gap-3">
          <h3 id="${id}-judul" class="font-semibold text-base text-neutral1">${judul}</h3>
          <button type="button" onclick="closeModal('${id}')" class="btn-icon" aria-label="Tutup"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <div id="${id}-isi" class="p-5 space-y-4"></div>
      </div>
    </div>`;
}

function tampilGagal(form, hasil) {
  const pesan = form.querySelector('[data-error]');
  pesan.textContent = hasil.error;
  pesan.classList.remove('hidden');
  form.elements[hasil.field]?.focus?.();
}

// Membuka modal dari kerangkaModal dalam keadaan bersih, lalu mengisi nilai awal
function bukaModalForm(idModal, nilai = {}) {
  const form = document.querySelector(`#${idModal} form`);
  form.reset();
  form.querySelector('[data-error]').classList.add('hidden');
  Object.entries(nilai).forEach(([k, v]) => { form.elements[k].value = v; });
  openModal(idModal);
  return form;
}

// kirim(FormData) mengembalikan hasil dari DB, boleh berupa Promise. setelah(hasil) dipanggil saat berhasil.
function pasangForm(idModal, pesanSukses, kirim, setelah) {
  const form = document.querySelector(`#${idModal} form`);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    form.querySelector('[data-error]').classList.add('hidden');
    const hasil = await kirim(new FormData(form));
    if (!hasil.ok) return tampilGagal(form, hasil);
    closeModal(idModal);
    setelah(hasil);
    showToast(pesanSukses);
  });
  return form;
}

function kartuSamping(ikon, judul, isi, tautan = '') {
  return `
    <section class="bg-white rounded-2xl border border-neutral4/80 p-5 flex flex-col gap-3 elevation1">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-8 h-8 rounded-xl bg-neutral5 flex items-center justify-center flex-shrink-0 text-neutral2"><i data-lucide="${ikon}" class="w-4 h-4"></i></div>
          <p class="!text-sm font-semibold text-neutral1">${esc(judul)}</p>
        </div>
        ${tautan ? `<a href="${tautan}" class="text-xs font-semibold text-primary2 hover:underline shrink-0">Lihat semua</a>` : ''}
      </div>
      ${isi}
    </section>`;
}

function itemRingkas(href, judul, sub) {
  return `
    <a href="${href}" class="block px-3.5 py-2.5 bg-neutral5/80 rounded-xl hover:bg-neutral4/40 transition-colors border border-transparent hover:border-neutral4/80">
      <p class="!text-[13px] font-semibold text-neutral1 leading-snug line-clamp-2">${esc(judul)}</p>
      <p class="!text-[11px] text-neutral3 mt-0.5">${esc(sub)}</p>
    </a>`;
}

const BADGE = {
  green: 'bg-green3 text-green1 border-green2/30',
  yellow: 'bg-yellow3 text-yellow1 border-yellow2/30',
  red: 'bg-red3 text-red1 border-red2/30',
  blue: 'bg-primary5 text-primary1 border-primary4/50',
  gray: 'bg-neutral5 text-neutral2 border-neutral4',
};

function badge(teks, warna = 'blue') {
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${BADGE[warna]}">${esc(teks)}</span>`;
}

function badgeStatus(status) {
  const warna = DB.STATUS_BEKERJA.includes(status) ? 'green' : status === DB.STATUS_STUDI ? 'blue' : 'yellow';
  return badge(status, warna);
}

// Dialog konfirmasi (pengganti confirm() bawaan browser)
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

// Tombol Salin, Ekspor ke Excel, dan Cetak seperti tabel DataTables di monolight
function pasangToolsTabel(idWadah, namaFile, ambilBaris) {
  document.getElementById(idWadah).innerHTML = `
    <button type="button" data-aksi="salin" class="btn-outline"><i data-lucide="copy" class="w-4 h-4"></i> Salin</button>
    <button type="button" data-aksi="excel" class="btn-outline"><i data-lucide="file-spreadsheet" class="w-4 h-4"></i> Ekspor ke Excel</button>
    <button type="button" data-aksi="cetak" class="btn-outline"><i data-lucide="printer" class="w-4 h-4"></i> Cetak</button>`;
  document.getElementById(idWadah).addEventListener('click', async e => {
    const aksi = e.target.closest('[data-aksi]')?.dataset.aksi;
    if (aksi === 'cetak') window.print();
    if (aksi === 'excel') {
      downloadCSV(namaFile, ambilBaris());
      showToast('File berhasil diekspor.');
    }
    if (aksi === 'salin') {
      try {
        await navigator.clipboard.writeText(ambilBaris().map(r => r.join('\t')).join('\n'));
        showToast('Tabel disalin.');
      } catch {
        showToast('Browser menolak akses salin.', 'error');
      }
    }
  });
}

// Navigasi halaman untuk daftar
function renderPager(idWadah, total, perHalaman, halaman, keHalaman) {
  const el = document.getElementById(idWadah);
  if (!el) return;
  const jumlah = Math.max(1, Math.ceil(total / perHalaman));
  if (total <= perHalaman) { el.innerHTML = ''; return; }

  const awal = (halaman - 1) * perHalaman + 1;
  const akhir = Math.min(halaman * perHalaman, total);

  el.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
      <p class="text-xs sm:text-[13px] text-gray-500 order-last sm:order-none">
        Menampilkan <span class="font-semibold text-gray-800">${awal}</span>–<span class="font-semibold text-gray-800">${akhir}</span> dari <span class="font-semibold text-gray-800">${total}</span> data
      </p>
      <div class="flex items-center gap-1.5 self-center sm:self-auto">
        <button type="button" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer" data-ke="${halaman - 1}" ${halaman <= 1 ? 'disabled' : ''}>
          <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
          <span>Sebelumnya</span>
        </button>
        <span class="px-2.5 py-1 text-xs font-semibold text-[#1E3A8A] bg-blue-50 border border-blue-100 rounded-lg">
          ${halaman} / ${jumlah}
        </span>
        <button type="button" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer" data-ke="${halaman + 1}" ${halaman >= jumlah ? 'disabled' : ''}>
          <span>Berikutnya</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>`;
  el.querySelectorAll('[data-ke]').forEach(b => b.addEventListener('click', () => {
    if (!b.disabled) keHalaman(Number(b.dataset.ke));
  }));
  refreshIcons();
}

function potong(list, halaman, perHalaman) {
  return list.slice((halaman - 1) * perHalaman, halaman * perHalaman);
}

// Membaca file gambar menjadi data URL agar bisa disimpan di localStorage
function bacaGambar(file, maksKB) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('File harus berupa gambar.'));
    if (file.size > maksKB * 1024) return reject(new Error(`Ukuran gambar maksimal ${maksKB} KB.`));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Gambar gagal dibaca.'));
    reader.readAsDataURL(file);
  });
}

function kartuKosong(ikon, judul, sub = '') {
  return `<div class="bg-white rounded-xl border border-neutral4 p-12 text-center text-neutral3">
    <i data-lucide="${ikon}" class="w-10 h-10 mx-auto mb-3 text-neutral4"></i>
    <p class="text-[15px] font-medium">${esc(judul)}</p>
    ${sub ? `<p class="text-sm mt-1">${esc(sub)}</p>` : ''}
  </div>`;
}

// Banner sapaan dashboard
function bannerSapaan(nama, keterangan) {
  const tanggal = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  return `
  <div class="relative rounded-2xl overflow-hidden shadow-md" style="background: linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%); min-height: 95px;">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/50 to-transparent pointer-events-none"></div>
    <div class="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
    <div class="absolute right-32 -top-10 w-48 h-48 rounded-full bg-blue-400/10 blur-xl pointer-events-none"></div>
    <div class="relative z-10 px-6 sm:px-8 py-5 flex flex-col justify-center">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-white/70 mb-1">${tanggal}</p>
      <h1 class="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight">Halo, ${esc(nama)}!</h1>
      <p class="text-xs sm:text-[12px] text-white/80 max-w-xl leading-relaxed">${esc(keterangan)}</p>
    </div>
  </div>`;
}

const WARNA_KARTU = {
  ungu: ['#5b21b6', '#7c3aed', '#C4B5FD'],
  hijau: ['#0f766e', '#0d9488', '#99F6E4'],
  oranye: ['#9a3412', '#ea580c', '#FED7AA'],
  merah: ['#9f1239', '#e11d48', '#FECDD3'],
  biru: ['#1E3A8A', '#2563EB', '#BFDBFE'],
};

// Kartu pintasan bergradien (StatCard di prototype)
function kartuPintasan({ href, ikon, label, nilai, sub, warna }) {
  const [dari, ke, teks] = WARNA_KARTU[warna];
  return `
    <a href="${href}" class="relative rounded-2xl overflow-hidden p-3.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex items-center gap-3.5 group cursor-pointer" style="background: linear-gradient(135deg,${dari} 0%,${ke} 100%);">
      <span class="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none" style="background: rgba(255,255,255,0.08);"></span>
      <span class="absolute top-6 -right-1 w-12 h-12 rounded-full pointer-events-none" style="background: rgba(255,255,255,0.05);"></span>
      <div class="relative z-10 w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white" style="background: rgba(255,255,255,0.18);">
        <i data-lucide="${ikon}" class="w-5 h-5"></i>
      </div>
      <div class="relative z-10 flex-1 min-w-0">
        <p class="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style="color: ${teks};">${esc(label)}</p>
        <p class="text-[22px] font-bold text-white leading-none">${esc(nilai)}</p>
        <p class="text-[10px] mt-1" style="color: ${teks};">${esc(sub)}</p>
      </div>
    </a>`;
}

// Warna tetap per status tracer, memakai palet grafik di prototype
const WARNA_STATUS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#6d5bd0', '#8a8f98'];

function grafikDonat(idCanvas, label, nilai, warna) {
  return new Chart(document.getElementById(idCanvas), {
    type: 'doughnut',
    data: { labels: label, datasets: [{ data: nilai, backgroundColor: warna, borderColor: '#FFFFFF', borderWidth: 2 }] },
    options: {
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#FFFFFF', titleColor: '#46494E', bodyColor: '#55585E', borderColor: '#DEDFE1', borderWidth: 1, padding: 10, boxPadding: 4, usePointStyle: true },
      },
    },
  });
}

function legendaDonat(label, nilai, warna) {
  return label.map((l, i) => `
    <li class="flex items-start justify-between gap-3 text-xs text-neutral2">
      <span class="flex items-start gap-2 min-w-0"><span class="w-2.5 h-2.5 rounded-sm mt-0.5 shrink-0" style="background:${warna[i]}"></span><span>${esc(l)}</span></span>
      <span class="font-semibold text-neutral1 tabular-nums">${nilai[i]}</span>
    </li>`).join('');
}

// ===================== LAYOUT (Sidebar + Topbar) =====================
const NAV = {
  // Menu alumni mengarah ke halaman versi Aisha (shell alumni.js). Halaman lama tidak lagi ditautkan.
  alumni: [
    { href: 'dashboard.html', icon: 'house', label: 'Beranda' },
    { href: 'direktori.html', icon: 'users', label: 'Alumni' },
    { href: 'showcase.html', icon: 'rocket', label: 'Showcase' },
    { href: 'gigs.html', icon: 'briefcase-business', label: 'Gigs & Proyek' },
    { href: 'generate-cv.html', icon: 'file-text', label: 'Generate CV' },
    { href: 'profil.html', icon: 'user-round', label: 'Profil Saya' },
  ],
  admin: [
    { href: 'dashboard.html', icon: 'layout-dashboard', label: 'Dashboard' },
    { href: 'forum.html', icon: 'messages-square', label: 'Forum' },
    { href: 'laporan-forum.html', icon: 'flag', label: 'Laporan Forum' },
    { href: 'tracer.html', icon: 'chart-column', label: 'Statistik & Tracer' },
    { href: 'data-alumni.html', icon: 'id-card', label: 'Data Alumni' },
    { href: 'karya.html', icon: 'trophy', label: 'Karya Alumni' },
    { href: 'pengumuman.html', icon: 'megaphone', label: 'Pengumuman' },
  ],
};
const NAMA_ROLE = { alumni: 'Alumni', admin: 'Koordinator Alumni' };

function hitungLaporanMenunggu() {
  const listBaru = (typeof BengkodStore !== 'undefined' && BengkodStore.getLaporan)
    ? BengkodStore.getLaporan('menunggu') : [];
  const listLama = (typeof DB !== 'undefined' && DB.forum?.laporan)
    ? DB.forum.laporan('menunggu') : [];
  return listBaru.length + listLama.length;
}

window.segarkanBadgeSidebar = function () {
  const el = document.getElementById('badge-laporan-sidebar');
  if (!el) return;
  const count = hitungLaporanMenunggu();
  el.textContent = count;
  el.classList.toggle('hidden', count === 0);
};

function keluar() {
  DB.akun.keluar();
  location.href = '../index.html';
}

// Menu lipat di topbar: tutup saat klik di luar menu atau menekan Escape
function pasangDropdown(tombol, panel) {
  const tutup = () => {
    panel.classList.add('hidden');
    tombol.setAttribute('aria-expanded', 'false');
  };
  tombol.addEventListener('click', () => {
    const terbuka = !panel.classList.contains('hidden');
    panel.classList.toggle('hidden', terbuka);
    tombol.setAttribute('aria-expanded', String(!terbuka));
  });
  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && !tombol.contains(e.target)) tutup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') tutup();
  });
}

let notifHalaman = 1;
const NOTIF_PER_HALAMAN = 5;
let filterModalNotif = 'semua';
let halModalNotif = 1;
const NOTIF_MODAL_PER_HAL = 6;

function bukaModalSemuaNotif() {
  document.getElementById('notif-panel')?.classList.add('hidden');
  renderModalSemuaNotif();
  openModal('modal-semua-notif');
}

function renderModalSemuaNotif() {
  const list = DB.notifikasi.milik(SAYA.id).filter(n => SAYA.role !== 'alumni' || !n.tautan.startsWith('forum'));
  const terfilter = filterModalNotif === 'belum' ? list.filter(n => !n.dibaca) : list;
  const belum = list.filter(n => !n.dibaca).length;
  const total = terfilter.length;
  const awal = (halModalNotif - 1) * NOTIF_MODAL_PER_HAL;
  const itemDitampilkan = terfilter.slice(awal, awal + NOTIF_MODAL_PER_HAL);

  const btnSemua = document.getElementById('btn-tab-notif-semua');
  const btnBelum = document.getElementById('btn-tab-notif-belum');
  if (btnSemua && btnBelum) {
    const isSemua = filterModalNotif === 'semua';
    btnSemua.className = `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${isSemua ? 'bg-[#1E3A8A] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100 border border-gray-200'}`;
    btnBelum.className = `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${!isSemua ? 'bg-[#1E3A8A] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100 border border-gray-200'}`;
  }

  const wadah = document.getElementById('modal-notif-daftar');
  if (!wadah) return;

  wadah.innerHTML = itemDitampilkan.map(n => `
    <div class="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/70 transition-colors ${n.dibaca ? 'bg-white' : 'bg-blue-50/30 border-blue-100'}">
      <span class="w-9 h-9 rounded-full ${n.dibaca ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-[#1E3A8A]'} flex items-center justify-center shrink-0 mt-0.5">
        <i data-lucide="${esc(n.ikon)}" class="w-4 h-4"></i>
      </span>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <a href="${esc(n.tautan)}" onclick="DB.notifikasi.baca(${n.id})" class="text-[14px] ${n.dibaca ? 'text-gray-700 font-medium' : 'text-gray-900 font-bold'} hover:text-[#1E3A8A] leading-snug">
            ${esc(n.pesan)}
          </a>
          ${!n.dibaca ? '<span class="px-2 py-0.5 rounded-full bg-blue-100 text-[#1E3A8A] text-[10.5px] font-bold shrink-0">Baru</span>' : ''}
        </div>
        <p class="text-xs text-gray-400 mt-1">${waktuLalu(n.waktu)}</p>
        <div class="flex items-center gap-3 mt-2.5 pt-2 border-t border-gray-100/80">
          ${!n.dibaca ? `<button type="button" onclick="DB.notifikasi.baca(${n.id}); renderNotifikasi(); renderModalSemuaNotif();" class="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai telah dibaca</button>` : ''}
          <button type="button" onclick="DB.notifikasi.hapus(${n.id}); renderNotifikasi(); renderModalSemuaNotif();" class="text-xs font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer ml-auto flex items-center gap-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i><span>Hapus</span>
          </button>
        </div>
      </div>
    </div>`).join('') || `<div class="p-12 text-center text-gray-400"><i data-lucide="bell-off" class="w-10 h-10 mx-auto mb-2 text-gray-300"></i><p class="text-sm">Tidak ada notifikasi ${filterModalNotif === 'belum' ? 'yang belum dibaca' : ''}.</p></div>`;

  renderPager('modal-notif-pager', total, NOTIF_MODAL_PER_HAL, halModalNotif, ke => {
    halModalNotif = ke;
    renderModalSemuaNotif();
  });
  refreshIcons();
}

function renderNotifikasi() {
  const list = DB.notifikasi.milik(SAYA.id).filter(n => SAYA.role !== 'alumni' || !n.tautan.startsWith('forum'));
  const belum = list.filter(n => !n.dibaca).length;
  const jumlah = document.getElementById('notif-jumlah');
  if (jumlah) {
    jumlah.textContent = belum > 9 ? '9+' : belum;
    jumlah.classList.toggle('hidden', !belum);
  }

  const panel = document.getElementById('notif-panel');
  if (!panel) return;

  const total = list.length;
  const totalHalaman = Math.max(1, Math.ceil(total / NOTIF_PER_HALAMAN));
  if (notifHalaman > totalHalaman) notifHalaman = totalHalaman;
  if (notifHalaman < 1) notifHalaman = 1;

  const awal = (notifHalaman - 1) * NOTIF_PER_HALAMAN;
  const itemDitampilkan = list.slice(awal, awal + NOTIF_PER_HALAMAN);

  panel.innerHTML = `
    <div class="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100 bg-white">
      <div class="flex items-center gap-2">
        <p class="!text-sm font-bold text-gray-900">Notifikasi</p>
        ${belum ? `<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">${belum} baru</span>` : ''}
      </div>
      <div class="flex items-center gap-2">
        ${belum ? '<button type="button" data-baca-semua class="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai semua dibaca</button>' : ''}
        ${total ? '<button type="button" data-hapus-semua class="text-xs text-gray-400 hover:text-red-600 transition-colors cursor-pointer" title="Hapus semua notifikasi"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>' : ''}
      </div>
    </div>
    <div class="max-h-80 overflow-y-auto divide-y divide-gray-100">
      ${itemDitampilkan.map(n => `
        <div class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${n.dibaca ? 'bg-white' : 'bg-blue-50/40'}">
          <span class="w-8 h-8 rounded-full ${n.dibaca ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-[#1E3A8A]'} flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="${esc(n.ikon)}" class="w-4 h-4"></i>
          </span>
          <div class="min-w-0 flex-1">
            <a href="${esc(n.tautan)}" data-notif="${n.id}" class="block group/link">
              <span class="block text-[13px] ${n.dibaca ? 'text-gray-700 font-medium' : 'text-gray-900 font-semibold'} leading-snug group-hover/link:text-[#1E3A8A] transition-colors">${esc(n.pesan)}</span>
              <span class="block text-[11px] text-gray-400 mt-1">${waktuLalu(n.waktu)}</span>
            </a>
            <div class="flex items-center gap-3 mt-1.5 pt-0.5">
              ${!n.dibaca ? `<button type="button" data-baca-item="${n.id}" class="text-[11px] font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai dibaca</button>` : ''}
              <button type="button" data-hapus-item="${n.id}" class="text-[11px] font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer ml-auto">Hapus</button>
            </div>
          </div>
          ${!n.dibaca ? '<span class="w-2 h-2 rounded-full bg-[#1E3A8A] shrink-0 mt-1.5" aria-label="Belum dibaca"></span>' : ''}
        </div>`).join('') || '<div class="p-8 text-center text-gray-400"><i data-lucide="bell-off" class="w-8 h-8 mx-auto mb-2 text-gray-300"></i><p class="text-sm">Belum ada notifikasi.</p></div>'}
    </div>
    ${total > 0 ? `
      <div class="px-4 py-2.5 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between text-xs text-gray-600">
        <button type="button" data-lihat-semua class="font-semibold text-[#1E3A8A] hover:underline cursor-pointer">
          Lihat semua notif (${total})
        </button>
        ${totalHalaman > 1 ? `
          <div class="flex items-center gap-1.5">
            <button type="button" data-notif-ke="${notifHalaman - 1}" ${notifHalaman <= 1 ? 'disabled' : ''} class="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" title="Sebelumnya"><i data-lucide="chevron-left" class="w-3.5 h-3.5"></i></button>
            <span class="tabular-nums font-semibold text-gray-800">${notifHalaman}/${totalHalaman}</span>
            <button type="button" data-notif-ke="${notifHalaman + 1}" ${notifHalaman >= totalHalaman ? 'disabled' : ''} class="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" title="Berikutnya"><i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></button>
          </div>` : ''}
      </div>` : ''}
  `;
  refreshIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main[data-title]');
  if (!main || !SAYA) return;

  const nav = NAV[SAYA.role];
  // Halaman turunan menunjuk menu induknya lewat data-nav
  const activeHref = main.dataset.nav || NAMA_FILE;

  const navItems = nav.map(n => {
    const active = n.href === activeHref;
    let badgeHTML = '';
    if (n.href === 'laporan-forum.html') {
      const count = hitungLaporanMenunggu();
      badgeHTML = `<span id="badge-laporan-sidebar" class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold ${active ? 'bg-white text-primary1' : 'bg-red2 text-white'} ${count === 0 ? 'hidden' : ''}">${count}</span>`;
    }
    return `<a href="${n.href}" ${active ? 'aria-current="page"' : ''}
      class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
      <i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i><span class="truncate">${n.label}</span>${badgeHTML}</a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="sidebar-overlay" class="fixed inset-0 bg-neutral1/40 backdrop-blur-sm z-40 hidden"></div>
    <aside id="sidebar" class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 z-50 flex flex-col -translate-x-full transition-transform duration-300 ease-in-out" aria-label="Menu ${NAMA_ROLE[SAYA.role]}">
      <div class="flex items-center justify-between py-4 px-4 border-b border-neutral4">
        <a href="${nav[0].href}" class="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary1">
          <img src="../assets/images/bengkelkoding-text.webp" alt="Bengkel Koding Logo" class="h-8 w-auto object-contain">
        </a>
        <button id="sidebar-close-btn" type="button" class="lg:hidden p-1.5 rounded-lg text-neutral2 hover:bg-neutral5 hover:text-neutral1 transition-colors cursor-pointer" aria-label="Tutup menu">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1.5">${navItems}</nav>
      <div class="p-3 border-t border-neutral4">
        <button type="button" onclick="keluar()" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors cursor-pointer">
          <i data-lucide="log-out" class="w-5 h-5"></i><span>Keluar</span></button>
      </div>
    </aside>`);

  const beranda = nav[0].href;
  const judulHalaman = esc(main.dataset.title);
  const urlParams = new URLSearchParams(location.search);
  const idParam = urlParams.get('id');

  // Breadcrumb dinamis: halaman berbasis ID mengambil nama entitas asli
  let breadcrumbHTML = '';
  if (NAMA_FILE === 'profil-alumni.html' && idParam) {
    const a = DB.akun.cari(idParam);
    const namaAlumni = a ? esc(a.nama) : `Alumni #${esc(idParam)}`;
    breadcrumbHTML = `
      <a href="${beranda}" class="text-neutral2 hover:text-primary1 transition-colors font-medium">${SAYA.role === 'admin' ? 'Koordinator' : 'Alumni'}</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <a href="data-alumni.html" class="text-neutral2 hover:text-primary1 transition-colors font-medium">Data Alumni</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <span class="font-medium text-neutral1 truncate">${namaAlumni}</span>`;
  } else if (NAMA_FILE === 'forum-detail.html' && idParam) {
    const p = (typeof FeedBersama !== 'undefined' ? FeedBersama.cari(idParam) : null) || (DB.forum ? DB.forum.cari(idParam) : null);
    const judul = p ? esc(p.judul || (p.isi ? (p.isi.slice(0, 32) + (p.isi.length > 32 ? '…' : '')) : 'Detail Diskusi')) : 'Detail Diskusi';
    breadcrumbHTML = `
      <a href="${beranda}" class="text-neutral2 hover:text-primary1 transition-colors font-medium">${SAYA.role === 'admin' ? 'Koordinator' : 'Alumni'}</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <a href="forum.html" class="text-neutral2 hover:text-primary1 transition-colors font-medium">Forum</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <span class="font-medium text-neutral1 truncate">${judul}</span>`;
  } else if (NAMA_FILE === 'detail-kelulusan.html') {
    const thn = esc(urlParams.get('tahun') || '2026');
    breadcrumbHTML = `
      <a href="${beranda}" class="text-neutral2 hover:text-primary1 transition-colors font-medium">${SAYA.role === 'admin' ? 'Koordinator' : 'Alumni'}</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <a href="tracer.html?tab=statistik" class="text-neutral2 hover:text-primary1 transition-colors font-medium">Statistik & Tracer</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <span class="font-medium text-neutral1 truncate">Tahun Lulus ${thn}</span>`;
  } else {
    breadcrumbHTML = `
      <a href="${beranda}" class="text-neutral2 hover:text-primary1 transition-colors font-medium">${SAYA.role === 'admin' ? 'Koordinator' : 'Alumni'}</a>
      <span class="mx-2 text-neutral3 select-none font-normal">›</span>
      <span class="font-medium text-neutral1 truncate">${judulHalaman}</span>`;
  }

  const wrapper = document.createElement('div');
  wrapper.id = 'main-wrapper';
  wrapper.className = 'lg:ml-64 min-h-screen flex flex-col transition-all duration-300';
  wrapper.innerHTML = `
    <header class="sticky top-0 z-30 bg-white border-b border-neutral4 h-16 px-3 lg:px-6 flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <button
          id="sidebar-toggle"
          type="button"
          class="inline-flex items-center justify-center p-2 text-neutral2 hover:bg-neutral5 hover:text-neutral1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary5 transition-colors shrink-0 cursor-pointer"
          aria-label="Toggle sidebar"
          aria-expanded="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="currentColor">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0-1 .45-1 1s.45 1 1 1H4c-.55 0-1-.45-1-1s.45-1-1-1zM20 6H4c-.55 0-1 .45-1 1v.01c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"/>
          </svg>
        </button>
        <nav class="flex items-center text-sm text-neutral1 min-w-0 flex-1 ml-1" aria-label="Breadcrumb">${breadcrumbHTML}</nav>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <div class="relative flex items-center">
          <button type="button" id="notif-btn" class="relative w-10 h-10 inline-flex items-center justify-center rounded-full text-neutral2 hover:bg-neutral5 hover:text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 transition-colors cursor-pointer" aria-expanded="false" aria-label="Notifikasi">
            <i data-lucide="bell" class="w-5 h-5"></i>
            <span id="notif-jumlah" class="hidden absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red2 text-white text-[10.5px] font-bold leading-[18px] text-center ring-2 ring-white"></span>
          </button>
          <div id="notif-panel" class="hidden fixed sm:absolute top-16 sm:top-12 inset-x-3 sm:inset-x-auto sm:right-0 sm:w-96 z-[70] rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden"></div>
        </div>
        <div class="relative flex items-center" id="profile-dropdown-wrapper">
          <button type="button" id="profile-menu-btn" class="flex items-center gap-2.5 rounded-full p-0.5 sm:pl-3 text-sm hover:bg-neutral5 focus:outline-none focus:ring-4 focus:ring-primary5 transition-all cursor-pointer group" aria-expanded="false" aria-label="Menu Pengguna">
            <div class="text-right hidden sm:block">
              <div class="text-sm font-semibold text-neutral1 leading-tight group-hover:text-primary1 transition-colors" data-nama-saya>${esc(SAYA.nama)}</div>
              <div class="text-[11px] text-neutral3">${SAYA.role === 'admin' ? NAMA_ROLE.admin : 'Alumni Asisten Lab'}</div>
            </div>
            <div data-avatar-saya class="w-9 h-9 rounded-full overflow-hidden bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50 shadow-xs">${avatar(SAYA)}</div>
          </button>

          <div id="dropdown-profile-menu" class="hidden absolute top-12 right-0 z-[70] w-64 origin-top-right rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden">
            <div class="px-4 pt-3.5 pb-3 bg-gradient-to-br from-primary1 via-primary2 to-primary3">
              <div class="flex items-center gap-2.5">
                <div data-avatar-saya class="w-9 h-9 rounded-full overflow-hidden bg-white/20 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm shrink-0">${avatar(SAYA)}</div>
                <div class="min-w-0 flex-1">
                  <p class="!text-sm font-semibold text-white truncate">${esc(SAYA.nama)}</p>
                  <p class="!text-[11px] text-white/80 truncate">${esc(SAYA.email)}</p>
                </div>
              </div>
            </div>
            <ul class="py-1.5 text-sm text-neutral1">
              <li>
                <a href="profil.html" class="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-primary5 transition-colors group">
                  <span class="w-7 h-7 rounded-lg bg-primary5 text-primary2 flex items-center justify-center group-hover:bg-primary2 group-hover:text-white transition-colors"><i data-lucide="settings" class="w-3.5 h-3.5"></i></span>
                  <span>Pengaturan Profil</span>
                </a>
              </li>
            </ul>
            <div class="border-t border-neutral4/70"></div>
            <ul class="py-1.5">
              <li>
                <button type="button" onclick="keluar()" class="flex items-center gap-2.5 w-full px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors group cursor-pointer">
                  <span class="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors"><i data-lucide="log-out" class="w-3.5 h-3.5"></i></span>
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

  document.body.insertAdjacentHTML('beforeend', `
    <div id="confirm-modal" data-modal-backdrop class="fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 elevation5" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-message">
        <h3 id="confirm-title" class="font-semibold text-base text-neutral1"></h3>
        <p id="confirm-message" class="!text-sm text-neutral2 mt-2"></p>
        <div class="mt-6 flex justify-end gap-2">
          <button onclick="closeModal('confirm-modal')" class="px-4 py-2 border border-neutral4 text-neutral1 text-sm font-medium rounded-lg hover:bg-neutral5 cursor-pointer">Batal</button>
          <button id="confirm-ok" class="cursor-pointer"></button>
        </div>
      </div>
    </div>

    <!-- Modal Lihat Semua Notifikasi -->
    <div id="modal-semua-notif" data-modal-backdrop class="modal-backdrop">
      <div class="modal max-w-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-notif-title">
        <div class="flex items-center justify-between pb-3 border-b border-gray-200">
          <div>
            <h3 id="modal-notif-title" class="text-lg font-bold text-gray-900 tracking-tight">Semua Notifikasi</h3>
            <p class="text-xs text-gray-500 mt-0.5">Kelola seluruh riwayat notifikasi dan pemberitahuan Anda</p>
          </div>
          <button type="button" onclick="closeModal('modal-semua-notif')" class="btn-icon" aria-label="Tutup"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <div class="flex items-center justify-between gap-3 py-3 border-b border-gray-100 flex-wrap">
          <div class="flex items-center gap-1.5">
            <button type="button" id="btn-tab-notif-semua" onclick="filterModalNotif = 'semua'; halModalNotif = 1; renderModalSemuaNotif();" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1E3A8A] text-white transition-colors cursor-pointer">Semua</button>
            <button type="button" id="btn-tab-notif-belum" onclick="filterModalNotif = 'belum'; halModalNotif = 1; renderModalSemuaNotif();" class="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer">Belum Dibaca</button>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="DB.notifikasi.bacaSemua(SAYA.id); renderNotifikasi(); renderModalSemuaNotif();" class="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai semua dibaca</button>
            <span class="text-gray-300">•</span>
            <button type="button" onclick="confirmAction({ title: 'Hapus semua notifikasi?', message: 'Seluruh riwayat notifikasi Anda akan dibersihkan.', okLabel: 'Hapus Semua', danger: true }, () => { DB.notifikasi.hapusSemua(SAYA.id); renderNotifikasi(); renderModalSemuaNotif(); });" class="text-xs font-semibold text-red-600 hover:underline cursor-pointer">Hapus semua</button>
          </div>
        </div>

        <div id="modal-notif-daftar" class="space-y-2.5 py-3 min-h-[240px]"></div>
        <div id="modal-notif-pager" class="pt-3 border-t border-gray-100"></div>
      </div>
    </div>`);

  document.getElementById('confirm-ok').addEventListener('click', () => {
    closeModal('confirm-modal');
    if (pendingConfirm) pendingConfirm();
    pendingConfirm = null;
  });

  pasangDropdown(document.getElementById('profile-menu-btn'), document.getElementById('dropdown-profile-menu'));

  const panelNotifikasi = document.getElementById('notif-panel');
  pasangDropdown(document.getElementById('notif-btn'), panelNotifikasi);
  panelNotifikasi.addEventListener('click', e => {
    // Cegah penutupan dropdown saat paginasi, hapus item, atau tandai dibaca
    if (!e.target.closest('[data-lihat-semua]') && !e.target.closest('[data-hapus-semua]') && !e.target.closest('[data-notif]')) {
      e.stopPropagation();
    }

    const item = e.target.closest('[data-notif]');
    if (item) DB.notifikasi.baca(item.dataset.notif);

    const bacaItem = e.target.closest('[data-baca-item]');
    if (bacaItem) {
      e.preventDefault();
      DB.notifikasi.baca(bacaItem.dataset.bacaItem);
      renderNotifikasi();
      return;
    }

    const hapusItem = e.target.closest('[data-hapus-item]');
    if (hapusItem) {
      e.preventDefault();
      DB.notifikasi.hapus(hapusItem.dataset.hapusItem);
      renderNotifikasi();
      return;
    }

    if (e.target.closest('[data-baca-semua]')) {
      e.preventDefault();
      DB.notifikasi.bacaSemua(SAYA.id);
      renderNotifikasi();
      return;
    }

    if (e.target.closest('[data-hapus-semua]')) {
      confirmAction({
        title: 'Hapus semua notifikasi?',
        message: 'Seluruh riwayat notifikasi akan dihapus.',
        okLabel: 'Hapus Semua',
        danger: true
      }, () => {
        DB.notifikasi.hapusSemua(SAYA.id);
        renderNotifikasi();
      });
      return;
    }

    const tombolHal = e.target.closest('[data-notif-ke]');
    if (tombolHal && !tombolHal.disabled) {
      e.preventDefault();
      notifHalaman = Number(tombolHal.dataset.notifKe);
      renderNotifikasi();
      return;
    }

    if (e.target.closest('[data-lihat-semua]')) {
      bukaModalSemuaNotif();
    }
  });
  renderNotifikasi();

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const isDesktop = () => window.innerWidth >= 1024;
  let sidebarOpen = isDesktop();

  function applySidebarState() {
    sidebar.classList.toggle('-translate-x-full', !sidebarOpen);
    sidebar.classList.toggle('translate-x-0', sidebarOpen);
    wrapper.classList.toggle('lg:ml-64', sidebarOpen && isDesktop());
    wrapper.classList.toggle('lg:ml-0', !(sidebarOpen && isDesktop()));
    overlay.classList.toggle('hidden', !sidebarOpen || isDesktop());
    toggleBtn.setAttribute('aria-expanded', String(sidebarOpen));
  }
  applySidebarState();
  refreshIcons();

  toggleBtn.addEventListener('click', () => { sidebarOpen = !sidebarOpen; applySidebarState(); });
  overlay.addEventListener('click', () => { sidebarOpen = false; applySidebarState(); });
  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sidebarOpen = false;
      applySidebarState();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !isDesktop() && sidebarOpen) { sidebarOpen = false; applySidebarState(); }
  });
});
