/**
 * Shared JS role SuperAdmin: config Tailwind, layout sidebar/topbar, data dummy, helper.
 * Dimuat di <head> setelah Tailwind CDN dan sebelum ../assets/js/main.js,
 * supaya sidebar sudah ada saat main.js membuat ikon Lucide.
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
  } catch {
    // LocalStorage diblokir: abaikan
  }
}

// ===================== DATA DUMMY SUPERADMIN =====================
const SUPERADMIN_DEFAULT = {
  user: { name: 'Super Admin', email: 'superadmin@dinus.ac.id' },
  koordinator: [
    {
      id: 1,
      nama: 'Dr. Ayu Lestari, M.Kom',
      nidn: '0612058501',
      email: 'ayu.lestari@dinus.ac.id',
      status: 'Aktif',
      divisi: 'Developer & Data Science',
      alumni_count: 250,
      ditugaskan: '2026-01-15'
    },
    {
      id: 2,
      nama: 'Bambang Nugroho, M.T',
      nidn: '0621098802',
      email: 'bambang.nugroho@dinus.ac.id',
      status: 'Aktif',
      divisi: 'Divisi Developer',
      alumni_count: 140,
      ditugaskan: '2026-02-01'
    },
    {
      id: 3,
      nama: 'Rina Puspitasari, M.Cs',
      nidn: '0614039101',
      email: 'rina.puspitasari@dinus.ac.id',
      status: 'Menunggu Undangan',
      divisi: 'Divisi Data Science',
      alumni_count: 110,
      ditugaskan: '2026-10-10'
    },
  ],
  kandidatDosen: [
    { id: 101, nama: 'Hendro Wijaya, S.Kom., M.Cs', nidn: '0612048901', email: 'hendro.wijaya@dinus.ac.id', prodi: 'Teknik Informatika' },
    { id: 102, nama: 'Siti Nurhaliza, M.Kom', nidn: '0615089202', email: 'siti.nurhaliza@dinus.ac.id', prodi: 'Sistem Informasi' },
    { id: 103, nama: 'Agus Setiawan, M.T', nidn: '0605118701', email: 'agus.setiawan@dinus.ac.id', prodi: 'Teknik Informatika' },
    { id: 104, nama: 'Dewi Rahmawati, M.Cs', nidn: '0620029003', email: 'dewi.rahmawati@dinus.ac.id', prodi: 'Ilmu Komunikasi / TI' }
  ],
  alumni: [
    { id: 1, nama: 'Rizky Pratama', nim: 'A11.2019.11823', email: 'rizky.pratama@gmail.com', tahun_lulus: 2023, divisi: 'Divisi Developer', status_karir: 'Bekerja Full Time', perusahaan: 'PT Telkom Indonesia', jabatan: 'Backend Engineer', status_akun: 'Aktif', terdaftar: '2026-01-10' },
    { id: 2, nama: 'Nadia Putri', nim: 'A11.2019.11902', email: 'nadia.putri@gmail.com', tahun_lulus: 2023, divisi: 'Divisi Data Science', status_karir: 'Bekerja Full Time', perusahaan: 'Gojek', jabatan: 'Data Analyst', status_akun: 'Aktif', terdaftar: '2026-01-15' },
    { id: 3, nama: 'Fajar Nugroho', nim: 'A11.2020.12011', email: 'fajar.nugroho@gmail.com', tahun_lulus: 2024, divisi: 'Divisi Developer', status_karir: 'Wirausaha', perusahaan: 'Studio Kode Semarang', jabatan: 'Founder & CEO', status_akun: 'Aktif', terdaftar: '2026-02-01' },
    { id: 4, nama: 'Salsa Ramadhani', nim: 'A11.2020.12088', email: 'salsa.ramadhani@gmail.com', tahun_lulus: 2024, divisi: 'Divisi Data Science', status_karir: 'Melanjutkan Pendidikan', perusahaan: 'Universitas Gadjah Mada', jabatan: 'S2 Ilmu Komputer', status_akun: 'Aktif', terdaftar: '2026-02-12' },
    { id: 5, nama: 'Bagas Saputra', nim: 'A11.2021.13120', email: 'bagas.saputra@gmail.com', tahun_lulus: 2025, divisi: 'Divisi Developer', status_karir: 'Mencari Pekerjaan', perusahaan: '-', jabatan: '-', status_akun: 'Nonaktif', terdaftar: '2026-03-05' },
    { id: 6, nama: 'Intan Maharani', nim: 'A11.2018.10544', email: 'intan.maharani@gmail.com', tahun_lulus: 2022, divisi: 'Divisi Developer', status_karir: 'Bekerja Part Time', perusahaan: 'Dicoding Academy', jabatan: 'Code Reviewer', status_akun: 'Aktif', terdaftar: '2026-01-08' },
    { id: 7, nama: 'Dimas Arya', nim: 'A11.2018.10601', email: 'dimas.arya@gmail.com', tahun_lulus: 2022, divisi: 'Divisi Developer', status_karir: 'Bekerja Full Time', perusahaan: 'Bank BCA', jabatan: 'Mobile Developer', status_akun: 'Aktif', terdaftar: '2026-01-18' },
    { id: 8, nama: 'Ananda Wulan', nim: 'A11.2021.13301', email: 'ananda.wulan@gmail.com', tahun_lulus: 2025, divisi: 'Divisi Data Science', status_karir: 'Bekerja Full Time', perusahaan: 'Tokopedia', jabatan: 'Frontend Engineer', status_akun: 'Aktif', terdaftar: '2026-03-10' },
  ],
  mitra: [
    { id: 1, nama_perusahaan: 'PT Telkom Indonesia', bidang_usaha: 'Telekomunikasi & IT', kota: 'Bandung', email: 'hr@telkom.co.id', pic: 'Hendra W.', telp: '0812-3456-7890', status_verifikasi: 'Terverifikasi', status_akun: 'Aktif', loker_count: 2, terdaftar: '2026-01-12' },
    { id: 2, nama_perusahaan: 'Gojek', bidang_usaha: 'Teknologi & Ride Hailing', kota: 'Jakarta', email: 'recruitment@gojek.com', pic: 'Maya Safitri', telp: '0812-9876-5432', status_verifikasi: 'Terverifikasi', status_akun: 'Aktif', loker_count: 1, terdaftar: '2026-01-20' },
    { id: 3, nama_perusahaan: 'CV Solusi Digital Jateng', bidang_usaha: 'Software House', kota: 'Semarang', email: 'hr@solusidigital.id', pic: 'Andi Kurniawan', telp: '0813-4567-8901', status_verifikasi: 'Terverifikasi', status_akun: 'Aktif', loker_count: 1, terdaftar: '2026-02-05' },
    { id: 4, nama_perusahaan: 'PT Data Nusantara', bidang_usaha: 'Big Data & AI Services', kota: 'Yogyakarta', email: 'contact@datanusantara.id', pic: 'Rina Pramestia', telp: '0815-6789-0123', status_verifikasi: 'Belum Verifikasi', status_akun: 'Aktif', loker_count: 1, terdaftar: '2026-03-01' },
    { id: 5, nama_perusahaan: 'PT Abal Sejahtera', bidang_usaha: 'Konsultan IT', kota: 'Kudus', email: 'info@abalsejahtera.com', pic: 'Budi Santoso', telp: '0817-8901-2345', status_verifikasi: 'Ditolak', status_akun: 'Nonaktif', loker_count: 0, terdaftar: '2026-03-15' },
  ],
  activityLogs: [
    { id: 1, waktu: '2026-10-22 09:15', user: 'Super Admin', role: 'SuperAdmin', action: 'Penugasan Koordinator', detail: 'Menugaskan Dr. Ayu Lestari, M.Kom sebagai Koordinator Divisi Dev & DS', ip: '10.14.0.1', status: 'Sukses' },
    { id: 2, waktu: '2026-10-22 08:30', user: 'Dr. Ayu Lestari, M.Kom', role: 'Koordinator', action: 'Verifikasi Tracer Study', detail: 'Memverifikasi data tracer study Rizky Pratama (NIM: A11.2019.11823)', ip: '10.14.2.45', status: 'Sukses' },
    { id: 3, waktu: '2026-10-21 16:45', user: 'Super Admin', role: 'SuperAdmin', action: 'Reset Password Akun', detail: 'Mereset kredensial password untuk akun Koordinator Bambang Nugroho, M.T', ip: '10.14.0.1', status: 'Sukses' },
    { id: 4, waktu: '2026-10-21 14:20', user: 'Maya Safitri (Gojek)', role: 'Mitra', action: 'Pengajuan Lowongan Baru', detail: 'Mengajukan loker Mobile Engineer (Flutter) Full Time', ip: '180.252.16.8', status: 'Sukses' },
    { id: 5, waktu: '2026-10-21 11:10', user: 'Dr. Ayu Lestari, M.Kom', role: 'Koordinator', action: 'Moderasi Lowongan', detail: 'Menyetujui publikasi lowongan QA Engineer dari PT Telkom Indonesia', ip: '10.14.2.45', status: 'Sukses' },
    { id: 6, waktu: '2026-10-20 15:30', user: 'Super Admin', role: 'SuperAdmin', action: 'Aktivasi Akun Mitra', detail: 'Memverifikasi dan mengaktifkan akun CV Solusi Digital Jateng', ip: '10.14.0.1', status: 'Sukses' },
    { id: 7, waktu: '2026-10-20 13:05', user: 'Bagas Saputra', role: 'Alumni', action: 'Pembaruan Status Karir', detail: 'Memperbarui status karir ke Mencari Pekerjaan', ip: '114.122.34.12', status: 'Sukses' },
    { id: 8, waktu: '2026-10-20 10:00', user: 'Super Admin', role: 'SuperAdmin', action: 'Nonaktifkan Akun', detail: 'Menonaktifkan sementara akun alumni Bagas Saputra', ip: '10.14.0.1', status: 'Sukses' },
    { id: 9, waktu: '2026-10-19 14:15', user: 'Budi Santoso (PT Abal)', role: 'Mitra', action: 'Pendaftaran Akun Mitra', detail: 'Mengisi form registrasi mitra industri baru dari Kudus', ip: '125.160.77.2', status: 'Menunggu' },
    { id: 10, waktu: '2026-10-19 09:00', user: 'Super Admin', role: 'SuperAdmin', action: 'Autentikasi Sesi', detail: 'Login SuperAdmin berhasil melalui SSO Lab Bengkel Koding', ip: '10.14.0.1', status: 'Sukses' },
  ]
};

const SUPERADMIN = {
  user: SUPERADMIN_DEFAULT.user,
  get koordinator() {
    return window.BengkodStore ? window.BengkodStore.getKoordinator() : lsGet('superadmin-koordinator', SUPERADMIN_DEFAULT.koordinator);
  },
  set koordinator(val) {
    if (window.BengkodStore) window.BengkodStore.saveKoordinator(val);
    lsSet('superadmin-koordinator', val);
  },
  kandidatDosen: SUPERADMIN_DEFAULT.kandidatDosen,
  get alumni() {
    return window.BengkodStore ? window.BengkodStore.getAlumni() : lsGet('superadmin-alumni', SUPERADMIN_DEFAULT.alumni);
  },
  set alumni(val) {
    if (window.BengkodStore) window.BengkodStore.saveAlumni(val);
    lsSet('superadmin-alumni', val);
  },
  get mitra() {
    return window.BengkodStore ? window.BengkodStore.getMitra() : lsGet('superadmin-mitra', SUPERADMIN_DEFAULT.mitra);
  },
  set mitra(val) {
    if (window.BengkodStore) window.BengkodStore.saveMitra(val);
    lsSet('superadmin-mitra', val);
  },
  get activityLogs() {
    return window.BengkodStore ? window.BengkodStore.getLogs() : lsGet('superadmin-activity-logs', SUPERADMIN_DEFAULT.activityLogs);
  },
};

function saveKoordinator() {
  if (window.BengkodStore) window.BengkodStore.saveKoordinator(SUPERADMIN.koordinator);
  lsSet('superadmin-koordinator', SUPERADMIN.koordinator);
}

function saveAlumni() {
  if (window.BengkodStore) window.BengkodStore.saveAlumni(SUPERADMIN.alumni);
  lsSet('superadmin-alumni', SUPERADMIN.alumni);
}

function saveMitra() {
  if (window.BengkodStore) window.BengkodStore.saveMitra(SUPERADMIN.mitra);
  lsSet('superadmin-mitra', SUPERADMIN.mitra);
}

function saveActivityLogs() {
  lsSet('superadmin-activity-logs', SUPERADMIN.activityLogs);
}

function addActivityLog(action, detail, role = 'SuperAdmin', user = 'Super Admin') {
  if (window.BengkodStore) {
    window.BengkodStore.logActivity(role, action, detail);
  } else {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const waktu = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const newLog = {
      id: Date.now(),
      waktu,
      user,
      role,
      action,
      detail,
      ip: '10.14.0.1',
      status: 'Sukses'
    };
    SUPERADMIN.activityLogs.unshift(newLog);
    saveActivityLogs();
  }
}

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
};

function badge(status) {
  const s = status || '-';
  const cls = BADGE[BADGE_COLOR[s] || 'blue'];
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cls}">${s}</span>`;
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtDate(iso) {
  return iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';
}

// Dialog konfirmasi generik untuk aksi sensitif
let pendingConfirm = null;
function confirmAction({ title, message, okLabel = 'Ya, Lanjutkan', danger = false }, onOk) {
  const titleEl = document.getElementById('confirm-title');
  const messageEl = document.getElementById('confirm-message');
  const ok = document.getElementById('confirm-ok');
  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;
  if (ok) {
    ok.textContent = okLabel;
    ok.className = `px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-4 ${danger ? 'bg-red2 hover:bg-red1 focus:ring-red3' : 'bg-primary1 hover:bg-primary2 focus:ring-primary5'}`;
  }
  pendingConfirm = onOk;
  openModal('confirm-modal');
}

// Navigasi SuperAdmin (Sesuai arahan: tanpa kelas, learning path, dll. Hanya Management Users (Alumni, Mitra, Koordinator) dan Log Aktivitas)
const SUPERADMIN_NAV = [
  { href: 'index.html', icon: 'layout-dashboard', label: 'Dashboard', match: 'index.html' },
  {
    label: 'Management Users',
    icon: 'users',
    submenu: [
      { href: 'koordinator.html', icon: 'graduation-cap', label: 'Koordinator', match: 'koordinator.html' },
      { href: 'alumni.html', icon: 'user-check', label: 'Alumni', match: 'alumni.html' },
      { href: 'mitra.html', icon: 'building-2', label: 'Mitra', match: 'mitra.html' },
    ]
  },
  { href: 'log-aktivitas.html', icon: 'history', label: 'Log Aktivitas', match: 'log-aktivitas.html' },
];

// Submit Pengaturan Profil SuperAdmin
window.handleSaProfileSubmit = function(e) {
  e.preventDefault();
  const nama = document.getElementById('sa-p-nama').value.trim();
  const email = document.getElementById('sa-p-email').value.trim();
  if (!nama || !email) return;

  SUPERADMIN.user.name = nama;
  SUPERADMIN.user.email = email;
  lsSet('superadmin-user', SUPERADMIN.user);

  closeModal('modal-pengaturan-profil-sa');
  showToast('Profil SuperAdmin berhasil diperbarui!', 'success');
  setTimeout(() => location.reload(), 300);
};

// ===================== LAYOUT (Sidebar + Topbar Sesuai lms-bengkod-web) =====================
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main[data-title]');
  if (!main) return;
  const current = location.pathname.split('/').pop() || 'index.html';

  const navItems = SUPERADMIN_NAV.map(n => {
    if (n.submenu) {
      const subActive = n.submenu.some(s => s.match === current);
      const subItems = n.submenu.map(s => {
        const active = s.match === current;
        return `<a href="${s.href}" ${active ? 'aria-current="page"' : ''}
          class="flex items-center justify-between w-full pl-9 pr-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral2 hover:bg-primary5 hover:text-primary1'}">
          <span class="flex items-center gap-2.5">
            <i data-lucide="${s.icon}" class="w-4 h-4 shrink-0"></i>
            <span>${s.label}</span>
          </span>
          ${s.badge ? `<span class="px-1.5 py-0.2 rounded text-[10px] font-bold ${active ? 'bg-white text-primary1' : 'bg-primary5 text-primary1'}">${s.badge}</span>` : ''}
        </a>`;
      }).join('');

      return `<div class="space-y-0.5">
        <button data-submenu-toggle class="flex items-center justify-between gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${subActive ? 'text-primary1 bg-primary5' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
          <span class="flex items-center gap-3">
            <i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i>
            <span>${n.label}</span>
          </span>
          <i data-lucide="chevron-down" class="w-4 h-4 shrink-0 transition-transform ${subActive ? 'rotate-180' : ''}"></i>
        </button>
        <div class="space-y-0.5 ${subActive ? '' : 'hidden'}" data-submenu>${subItems}</div>
      </div>`;
    }

    const active = n.match === current;
    return `<a href="${n.href}" ${active ? 'aria-current="page"' : ''}
      class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary3 ${active ? 'text-white bg-primary1 shadow-sm' : 'text-neutral1 hover:bg-primary5 hover:text-primary1'}">
      <i data-lucide="${n.icon}" class="w-5 h-5 shrink-0"></i>
      <span>${n.label}</span>
    </a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="sidebar-overlay" class="fixed inset-0 bg-neutral1/40 backdrop-blur-sm z-40 hidden"></div>
    <aside id="sidebar" class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 z-50 flex flex-col -translate-x-full transition-transform duration-300 ease-in-out" aria-label="Menu SuperAdmin">
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
  const isDashboard = current === 'index.html' || main.dataset.title === 'Dashboard';
  const isLogAktivitas = current === 'log-aktivitas.html' || main.dataset.title === 'Log Aktivitas';
  const pageTitle = esc(main.dataset.title);

  const breadcrumbHTML = isDashboard
    ? `<a href="index.html" class="text-neutral1 hover:text-primary1 transition-colors font-medium">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1">SuperAdmin</span>`
    : isLogAktivitas
    ? `<a href="index.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1">${pageTitle}</span>`
    : `<a href="index.html" class="text-neutral2 hover:text-primary1 transition-colors">Dashboard</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <a href="koordinator.html" class="text-neutral2 hover:text-primary1 transition-colors">Management Users</a>
       <span class="mx-2 text-neutral3 select-none font-normal">›</span>
       <span class="font-medium text-neutral1 truncate">${pageTitle}</span>`;

  const saInitials = (SUPERADMIN.user.name || 'Super Admin').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'SA';

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
              <div class="text-sm font-semibold text-neutral1 leading-tight group-hover:text-primary1 transition-colors">${esc(SUPERADMIN.user.name)}</div>
              <div class="text-[11px] text-neutral3">Super Administrator</div>
            </div>
            <div class="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs border border-purple-200 shadow-xs">
              ${saInitials}
            </div>
          </button>

          <!-- Dropdown Popover Profil (100% Identik dengan Alumni) -->
          <div id="dropdown-profile-menu" class="hidden absolute top-12 right-0 z-[70] w-64 origin-top-right rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden">
            <div class="px-4 pt-3.5 pb-3 bg-gradient-to-br from-primary1 via-primary2 to-primary3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-white/20 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                  ${saInitials}
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold text-white truncate">${esc(SUPERADMIN.user.name)}</p>
                  <p class="text-[11px] text-white/80 truncate">${esc(SUPERADMIN.user.email)}</p>
                </div>
              </div>
            </div>
            <ul class="py-1.5 text-sm text-neutral1">
              <li>
                <button type="button" onclick="openModal('modal-pengaturan-profil-sa')" class="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-primary5 transition-colors group">
                  <span class="w-7 h-7 rounded-lg bg-primary5 text-primary2 flex items-center justify-center group-hover:bg-primary2 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 1 .33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </span>
                  <span>Pengaturan Profil</span>
                </button>
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

  // Modal konfirmasi bersama & Modal Pengaturan Profil SuperAdmin
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
    </div>

    <!-- Modal Pengaturan Profil SuperAdmin -->
    <div id="modal-pengaturan-profil-sa" data-modal-backdrop class="fixed inset-0 z-50 bg-neutral1/60 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 elevation5 max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-sa-profile-title">
        <div class="flex items-center justify-between pb-3 border-b border-neutral4 mb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <i data-lucide="shield-check" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 id="modal-sa-profile-title" class="font-bold text-base text-neutral1">Pengaturan Akun SuperAdmin</h3>
              <p class="text-xs text-neutral3">Kelola kredensial akun administrator utama</p>
            </div>
          </div>
          <button type="button" onclick="closeModal('modal-pengaturan-profil-sa')" class="btn-icon" aria-label="Tutup"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <form id="form-pengaturan-profil-sa" onsubmit="handleSaProfileSubmit(event)" class="space-y-4 text-xs">
          <div>
            <label for="sa-p-nama" class="label text-xs">Nama Administrator</label>
            <input type="text" id="sa-p-nama" required class="input" value="${esc(SUPERADMIN.user.name)}">
          </div>
          <div>
            <label for="sa-p-email" class="label text-xs">Email Administrator</label>
            <input type="email" id="sa-p-email" required class="input" value="${esc(SUPERADMIN.user.email)}">
          </div>
          <div>
            <label for="sa-p-password" class="label text-xs">Password Baru (Opsional)</label>
            <input type="password" id="sa-p-password" placeholder="Biarkan kosong jika tidak diubah" class="input">
          </div>
          <div class="flex justify-end gap-2 pt-3 border-t border-neutral4">
            <button type="button" onclick="closeModal('modal-pengaturan-profil-sa')" class="btn-outline text-xs px-4 py-2">Batal</button>
            <button type="submit" class="btn-primary text-xs px-5 py-2 font-semibold">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>`);

  document.getElementById('confirm-ok').addEventListener('click', () => {
    closeModal('confirm-modal');
    if (pendingConfirm) pendingConfirm();
    pendingConfirm = null;
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

  // Submenu toggle untuk Management Users
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
