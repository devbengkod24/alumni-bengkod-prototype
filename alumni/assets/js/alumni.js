tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary1: "#1E3A8A",
        primary2: "#1D4ED8",
        primary3: "#3B82F6",
        primary4: "#93C5FD",
        primary5: "#DBEAFE",
        secondary1: "#FFC150",
        secondary2: "#FFCD73",
        secondary3: "#FFE0A8",
        secondary4: "#DEDFE1",
        neutral1: "#46494E",
        neutral2: "#55585E",
        neutral3: "#6B6E76",
        neutral4: "#DEDFE1",
        neutral5: "#F4F4F4",
        neutral6: "#FFFFFF",
        red1: "#B00B0B",
        red2: "#D73D3D",
        red3: "#FCC6CD",
        yellow1: "#8F6F00",
        yellow2: "#FFCE22",
        yellow3: "#FFECAA",
        green1: "#1C6A1A",
        green2: "#068913",
        green3: "#CDFECF",
        blue1: "#002C9D",
        blue2: "#2E63EA",
        blue3: "#B0C6FF",
      },
    },
  },
};

document.head.insertAdjacentHTML('beforeend', `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap">
<style>
  [x-cloak] { display: none !important; }
  body { font-family: 'Poppins', sans-serif; font-style: normal; padding: 0 !important; overflow: auto !important; }
  .elevation1 { box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); }
  .elevation2 { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
  .elevation3 { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
  .elevation4 { box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); }
  .elevation5 { box-shadow: 0 12px 16px rgba(0, 0, 0, 0.1); }
  .no-scrollbar::-webkit-scrollbar, .scrollbar-hide::-webkit-scrollbar { display: none; }
  .no-scrollbar, .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
<style type="text/tailwindcss">
@layer base {
  h1 { font-size: 42px; font-weight: 600; }
  h2 { font-size: 32px; font-weight: 500; }
  h3 { font-size: 18px; font-weight: 500; }
  p { font-size: 16px; }
  label { font-size: 16px; font-weight: 500; }
  caption { font-size: 12px; }
  @media (max-width: 600px) {
    h1 { font-size: 39px; }
    h2 { font-size: 24px; }
    h3 { font-size: 17px; }
    p, label { font-size: 15px; }
    caption { font-size: 11px; }
  }
}
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
  .label { @apply block text-sm font-medium text-neutral2 mb-1.5; }
  .input { @apply block w-full px-3.5 py-2.5 border border-neutral4 rounded-md text-neutral1 bg-white placeholder-neutral3 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 text-sm transition-all duration-150; }
}
</style>`);

function isAlumniSubdir() {
  const p = (typeof window !== "undefined" ? window.location.pathname || "" : "").replace(/\\/g, "/");
  return p.includes("/alumni/mitra");
}

function alumniBasePrefix() {
  return isAlumniSubdir() ? "../" : "";
}

function alumniRootPrefix() {
  return isAlumniSubdir() ? "../../" : "../";
}

function alumniHref(link) {
  const base = alumniBasePrefix();
  const root = alumniRootPrefix();

  if (link === "/") return `${root}index.html`;
  if (link === "/dashboard/alumni" || link === "/dashboard/alumni/beranda") return `${base}dashboard.html`;
  if (link === "/dashboard/alumni/direktori") return `${base}direktori.html`;
  if (link === "/dashboard/alumni/showcase") return `${base}showcase.html`;
  if (link === "/dashboard/alumni/gigs") return `${base}gigs.html`;
  if (link === "/dashboard/alumni/referral") return `${base}referral.html`;
  if (link === "/dashboard/alumni/referral-pengajuan") return `${base}referral-pengajuan.html`;
  if (link === "/dashboard/alumni/generate-cv") return `${base}generate-cv.html`;
  if (link === "/dashboard/alumni/profil") return `${base}profil.html`;
  if (link === "/dashboard/alumni/detail") return `${base}detail.html`;
  if (link === "/dashboard/alumni/detail-proyek" || link === "/dashboard/alumni/proyek") return `${base}detail-proyek.html`;

  // Fallback rute lama
  if (link === "/dashboard/alumni/lowongan") return `${base}lowongan.html`;
  if (link === "/dashboard/alumni/pengumuman") return `${base}pengumuman.html`;

  const m = /^\/dashboard\/alumni\/([^/]+)$/.exec(link || "");
  if (m) return `${base}detail.html?id=${encodeURIComponent(m[1])}`;

  return "#";
}

// Navigasi utama role alumni
const ALUMNI_NAVIGATIONS = [
  {
    title: "Beranda",
    link: "/dashboard/alumni",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>`,
  },
  {
    title: "Alumni",
    link: "/dashboard/alumni/direktori",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>`,
  },
  {
    title: "Showcase",
    link: "/dashboard/alumni/showcase",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>`,
  },
  {
    title: "Gigs & Proyek",
    link: "/dashboard/alumni/gigs",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>`,
  },
  {
    title: "Referral",
    link: "/dashboard/alumni/referral",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>`,
  },
  {
    title: "Generate CV",
    link: "/dashboard/alumni/generate-cv",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>`,
  },
  {
    title: "Profil Saya",
    link: "/dashboard/alumni/profil",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>`,
  },
];

const ALWAYS_SHOW_MOBILE = ["Alumni", "Student", "Admin", "Superadmin", "Dosen", "Asisten"];

/* ------------------------------------------------------------------ */
/* Breadcrumb: Role › Nama Halaman                                     */
/* ------------------------------------------------------------------ */

// Halaman yang nggak ada di sidebar tapi tetap butuh judul breadcrumb
const ALUMNI_EXTRA_TITLES = {
  "/dashboard/alumni/detail": "Detail Alumni",
  "/dashboard/alumni/detail-proyek": "Detail Proyek",
  "/dashboard/alumni/pengumuman": "Pengumuman",
  "/dashboard/alumni/tracer": "Status Karir",
  "/dashboard/alumni/gigs-pelamar": "Pelamar Proyek",
  "/dashboard/alumni/referral-pengajuan": "Pengajuan Referral",
};

// Halaman turunan menyorot menu induknya di sidebar
const ALUMNI_NAV_PARENT = {
  "/dashboard/alumni/pengumuman": "/dashboard/alumni",
  "/dashboard/alumni/tracer": "/dashboard/alumni/profil",
  "/dashboard/alumni/gigs-pelamar": "/dashboard/alumni/gigs",
  "/dashboard/alumni/referral-pengajuan": "/dashboard/alumni/referral",
};

// Samain route alias ke route utama di ALUMNI_NAVIGATIONS
function alumniNormalizeRoute(route) {
  if (route === "/dashboard/alumni/beranda") return "/dashboard/alumni";
  if (route === "/dashboard/alumni/alumni") return "/dashboard/alumni/direktori";
  return route;
}

function alumniPageTitle(route) {
  const r = alumniNormalizeRoute(route);
  const nav = ALUMNI_NAVIGATIONS.find((n) => n.link === r);
  if (nav) return nav.title;
  if (ALUMNI_EXTRA_TITLES[r]) return ALUMNI_EXTRA_TITLES[r];
  // /dashboard/alumni/<id> -> halaman detail
  if (/^\/dashboard\/alumni\/[^/]+$/.test(r)) return "Detail Alumni";
  return "Halaman";
}

function alumniRoleLabel() {
  return isAlumniSubdir() ? "Mitra" : "Alumni";
}

function alumniBreadcrumbHTML(title = "Profil Saya", role = alumniRoleLabel()) {
  return `
    <a href="${alumniHref("/dashboard/alumni")}" class="text-neutral2 hover:text-primary1 transition-colors font-medium">${role}</a>
    <span class="mx-2 text-neutral3 select-none font-normal">›</span>
    <span class="font-medium text-neutral1 truncate">${title}</span>`;
}

// Identitas di topbar selalu dari data profil Aisha (alumni-profile-data.js / hasil edit di profil.html)
function alumniCurrentProfile() {
  const seed = typeof INITIAL_PROFILE !== "undefined" ? INITIAL_PROFILE : null;
  const base = {
    name: seed ? seed.name : "Aisha Dwi Rahmawati",
    email: seed ? seed.email : "aisha.rahma@alumni.dinus.ac.id",
    image: seed ? (seed.avatarUrl || "") : (typeof DEFAULT_AVATAR !== "undefined" ? DEFAULT_AVATAR : ""),
  };
  try {
    const saved = JSON.parse(localStorage.getItem("bengkod_alumni_profile") || "null");
    if (saved) return { name: saved.name || base.name, email: saved.email || base.email, image: saved.avatarUrl || base.image };
  } catch {}
  return base;
}

/* ------------------------------------------------------------------ */
/* Pencarian alumni bersama (kolom "Cari alumni" di Beranda)           */
/* ------------------------------------------------------------------ */

// State + aksi pencarian. Pakai lewat alumniWithNavSearch({...}) supaya getter tidak ikut dievaluasi.
// Mencari alumni (nama/keahlian) dan, bila komponen punya searchFeedPosts(q) & focusFeedPost(id),
// juga postingan feed berdasarkan topik/isi.
function alumniNavSearch() {
  return {
    navSearchQuery: "",
    navSearchOpen: false,
    get navSearchResults() {
      const q = this.navSearchQuery.trim();
      if (!q || typeof searchAlumni !== "function") return [];
      return searchAlumni(q).slice(0, 4);
    },
    get navSearchPostResults() {
      const q = this.navSearchQuery.trim();
      if (!q || typeof this.searchFeedPosts !== "function") return [];
      return this.searchFeedPosts(q).slice(0, 5);
    },
    navSearchHref(a) {
      return alumniBasePrefix() + "detail.html?id=" + encodeURIComponent(a.id);
    },
    openNavSearchPost(p) {
      this.navSearchOpen = false;
      if (typeof this.focusFeedPost === "function") this.focusFeedPost(p.id);
    },
    submitNavSearch() {
      const first = this.navSearchResults[0];
      if (first) {
        window.location.href = this.navSearchHref(first);
        return;
      }
      const post = this.navSearchPostResults[0];
      if (post) this.openNavSearchPost(post);
    },
  };
}

function alumniWithNavSearch(component) {
  return Object.defineProperties(component, Object.getOwnPropertyDescriptors(alumniNavSearch()));
}

// Dropdown hasil pencarian bisa disisipkan di HTML halaman: <div data-partial="navSearchDropdown"></div>
window.ALUMNI_PARTIALS = Object.assign(window.ALUMNI_PARTIALS || {}, {
  navSearchDropdown: () => alumniNavSearchDropdownHTML(),
});

/* ------------------------------------------------------------------ */
/* Notifikasi lonceng: seed NOTIFIKASI_AISHA (alumni-data.js),         */
/* status baca & notifikasi yang dihapus disimpan di localStorage.     */
/* Desain (dropdown + modal Semua Notifikasi) mengikuti role           */
/* koordinator di alumni/assets/js/app.js.                             */
/* ------------------------------------------------------------------ */

const ALUMNI_NOTIF_READ_KEY = "bengkod_alumni_notif_read_v1";
const ALUMNI_NOTIF_HAPUS_KEY = "bengkod_alumni_notif_hapus_v1";
const ALUMNI_NOTIF_PER_HALAMAN = 5;
const ALUMNI_NOTIF_MODAL_PER_HAL = 6;

function alumniNotifHapusIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(ALUMNI_NOTIF_HAPUS_KEY) || "[]");
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function alumniSaveNotifHapusIds(ids) {
  try {
    localStorage.setItem(ALUMNI_NOTIF_HAPUS_KEY, JSON.stringify([...new Set(ids)]));
  } catch {}
}

// Ikon lucide (stroke) yang dipakai lonceng koordinator, ditulis inline karena halaman alumni tidak memuat lucide
const alumniLucide = (size, paths) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const ALUMNI_NOTIF_SVG = {
  trash: alumniLucide(14, '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>'),
  chevronLeft: alumniLucide(14, '<path d="m15 18-6-6 6-6"/>'),
  chevronRight: alumniLucide(14, '<path d="m9 18 6-6-6-6"/>'),
  x: alumniLucide(20, '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
  bellOff: (size) => alumniLucide(size, '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742"/><path d="m2 2 20 20"/><path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"/>'),
};

function alumniNotifReadIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(ALUMNI_NOTIF_READ_KEY) || "[]");
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function alumniSaveNotifReadIds(ids) {
  try {
    localStorage.setItem(ALUMNI_NOTIF_READ_KEY, JSON.stringify([...new Set(ids)]));
  } catch {}
}

function alumniWaktuLalu(iso) {
  const t = Date.parse(iso);
  if (isNaN(t)) return "";
  const menit = Math.floor((Date.now() - t) / 60000);
  if (menit < 1) return "baru saja";
  if (menit < 60) return `${menit} menit lalu`;
  if (menit < 1440) return `${Math.floor(menit / 60)} jam lalu`;
  if (menit < 10080) return `${Math.floor(menit / 1440)} hari lalu`;
  return new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

const ALUMNI_NOTIF_ICONS = {
  referral: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>`,
  gigs: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>`,
  pengumuman: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>`,
};

document.addEventListener("alpine:init", () => {
  Alpine.data("alumniLayout", () => ({
    sidebarIsOpen: true,
    isMobile: false,
    isHydrated: false,
    profileIsOpen: false,
    notifIsOpen: false,
    notifs: [],
    notifHalaman: 1,
    notifModalOpen: false,
    notifModalFilter: "semua",
    notifModalHal: 1,
    notifConfirmOpen: false,
    NOTIF_MODAL_PER_HAL: ALUMNI_NOTIF_MODAL_PER_HAL,
    breadcrumbDropdownOpen: false,
    profile: alumniCurrentProfile(),
    init() {
      this.checkMobile();
      this.loadNotifs();
      window.addEventListener("resize", () => this.checkMobile());
      this.$watch("sidebarIsOpen", (v) => {
        if (this.isHydrated && !this.isMobile) localStorage.setItem("sidebar_open", String(v));
      });
      // Status baca ikut berubah kalau ditandai dari tab lain
      window.addEventListener("storage", (e) => {
        if (e.key === ALUMNI_NOTIF_READ_KEY || e.key === ALUMNI_NOTIF_HAPUS_KEY) this.loadNotifs();
      });
      // Tutup dropdown kalau klik di luar (satu-satunya handler click-away)
      document.addEventListener("mousedown", (event) => {
        const t = event.target;
        if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(t)) this.profileIsOpen = false;
        if (this.$refs.notifDropdownRef && !this.$refs.notifDropdownRef.contains(t)) this.notifIsOpen = false;
        if (this.$refs.breadcrumbRef && !this.$refs.breadcrumbRef.contains(t)) this.breadcrumbDropdownOpen = false;
      });
    },
    get notifUnreadCount() {
      return this.notifs.filter((n) => !n.dibaca).length;
    },
    loadNotifs() {
      const seed = typeof NOTIFIKASI_AISHA !== "undefined" ? NOTIFIKASI_AISHA : [];
      const read = alumniNotifReadIds();
      const dihapus = alumniNotifHapusIds();
      this.notifs = seed
        .filter((n) => !dihapus.includes(n.id))
        .map((n) => ({ ...n, dibaca: read.includes(n.id) }))
        .sort((a, b) => String(b.waktu).localeCompare(String(a.waktu)));
    },
    markNotifRead(id) {
      alumniSaveNotifReadIds([...alumniNotifReadIds(), id]);
      this.loadNotifs();
    },
    markAllNotifsRead() {
      alumniSaveNotifReadIds([...alumniNotifReadIds(), ...this.notifs.map((n) => n.id)]);
      this.loadNotifs();
    },
    hapusNotif(id) {
      alumniSaveNotifHapusIds([...alumniNotifHapusIds(), id]);
      this.loadNotifs();
    },
    mintaHapusSemuaNotif() {
      this.notifIsOpen = false;
      this.notifConfirmOpen = true;
    },
    hapusSemuaNotif() {
      alumniSaveNotifHapusIds([...alumniNotifHapusIds(), ...this.notifs.map((n) => n.id)]);
      this.notifConfirmOpen = false;
      this.loadNotifs();
    },
    bukaSemuaNotif() {
      this.notifIsOpen = false;
      this.notifModalFilter = "semua";
      this.notifModalHal = 1;
      this.notifModalOpen = true;
    },
    // Dropdown: 5 per halaman (halaman dijaga tetap valid setelah ada yang dihapus)
    get notifTotalHalaman() {
      return Math.max(1, Math.ceil(this.notifs.length / ALUMNI_NOTIF_PER_HALAMAN));
    },
    get notifHalamanAktif() {
      return Math.min(Math.max(1, this.notifHalaman), this.notifTotalHalaman);
    },
    get notifHalamanIni() {
      const awal = (this.notifHalamanAktif - 1) * ALUMNI_NOTIF_PER_HALAMAN;
      return this.notifs.slice(awal, awal + ALUMNI_NOTIF_PER_HALAMAN);
    },
    // Modal Semua Notifikasi: tab Semua / Belum Dibaca, 6 per halaman
    get notifModalList() {
      return this.notifModalFilter === "belum" ? this.notifs.filter((n) => !n.dibaca) : this.notifs;
    },
    get notifModalTotalHal() {
      return Math.max(1, Math.ceil(this.notifModalList.length / ALUMNI_NOTIF_MODAL_PER_HAL));
    },
    get notifModalHalAktif() {
      return Math.min(Math.max(1, this.notifModalHal), this.notifModalTotalHal);
    },
    get notifModalAwal() {
      return (this.notifModalHalAktif - 1) * ALUMNI_NOTIF_MODAL_PER_HAL;
    },
    get notifModalItems() {
      return this.notifModalList.slice(this.notifModalAwal, this.notifModalAwal + ALUMNI_NOTIF_MODAL_PER_HAL);
    },
    notifHref(n) {
      return alumniBasePrefix() + (n.tautan || "dashboard.html");
    },
    notifIcon(n) {
      return ALUMNI_NOTIF_ICONS[n.jenis] || ALUMNI_NOTIF_ICONS.pengumuman;
    },
    notifTime(n) {
      return alumniWaktuLalu(n.waktu);
    },
    checkMobile() {
      const mobile = window.innerWidth < 1024;
      this.isMobile = mobile;
      if (mobile) this.sidebarIsOpen = false;
      else this.sidebarIsOpen = localStorage.getItem("sidebar_open") !== "false";
      this.isHydrated = true;
    },
    toggleProfile() {
      this.profileIsOpen = !this.profileIsOpen;
    },
    // Sesi login disimpan data.js (tidak dimuat di sini), jadi login.html yang menghapusnya lewat ?keluar
    handleLogout() {
      try {
        if (typeof DB !== "undefined" && DB.akun) DB.akun.keluar();
      } catch {}
      window.location.href = alumniBasePrefix() + "login.html?keluar=1";
    },
  }));
});

function alumniAvatarHTML(srcExpr, nameExpr, size, textSize, extraClass = "") {
  return `<template x-if="${srcExpr}">
      <div class="${size} ${extraClass} rounded-full overflow-hidden">
        <img :src="${srcExpr}" :alt="'Image Profile'" width="100" height="100" class="w-full h-full object-cover">
      </div>
    </template>
    <template x-if="!${srcExpr}">
      <div class="${size} ${extraClass} bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0" aria-label="Image Profile" role="img">
        <span class="${textSize} leading-none select-none" x-text="${nameExpr}.trim().split(/\\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?'"></span>
      </div>
    </template>`;
}

// Dropdown hasil pencarian: grup Alumni lalu grup Postingan
function alumniNavSearchDropdownHTML() {
  return `<div x-show="navSearchOpen && navSearchQuery.trim()" x-cloak
      class="absolute top-[calc(100%+6px)] left-0 right-0 z-[70] bg-white rounded-xl border border-neutral4/70 shadow-xl overflow-hidden max-h-[440px] overflow-y-auto">
      <template x-if="navSearchResults.length > 0">
        <p class="px-3.5 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral3">Alumni</p>
      </template>
      <template x-for="a in navSearchResults" :key="a.id">
        <a :href="navSearchHref(a)" class="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral5 transition-colors">
          <img :src="a.avatarUrl" :alt="a.name" class="w-8 h-8 rounded-full object-cover border border-neutral4 shrink-0">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-neutral1 truncate" x-text="a.name"></p>
            <p class="text-xs text-neutral3 truncate" x-text="a.headline"></p>
          </div>
        </a>
      </template>
      <template x-if="navSearchPostResults.length > 0">
        <p class="px-3.5 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral3 border-t border-neutral4/60">Postingan</p>
      </template>
      <template x-for="p in navSearchPostResults" :key="'post-' + p.id">
        <button type="button" @click="openNavSearchPost(p)" class="w-full text-left flex items-start gap-3 px-3.5 py-2.5 hover:bg-neutral5 transition-colors cursor-pointer">
          <img :src="p.avatar || 'assets/img/user.png'" :alt="p.author" class="w-8 h-8 rounded-full object-cover border border-neutral4 shrink-0 mt-0.5">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-neutral1 truncate" x-text="p.title"></p>
            <p class="text-xs text-neutral3 leading-snug line-clamp-2" x-text="p.snippet"></p>
          </div>
        </button>
      </template>
      <template x-if="navSearchResults.length === 0 && navSearchPostResults.length === 0">
        <p class="px-3.5 py-3 text-sm text-neutral3">Tidak ada alumni atau postingan untuk "<span class="font-semibold text-neutral1" x-text="navSearchQuery"></span>"</p>
      </template>
    </div>`;
}

function alumniLayoutHTML(route, pageTitle = "Profil Saya") {
  const normalized = alumniNormalizeRoute(route);
  const activeRoute = ALUMNI_NAV_PARENT[normalized] || normalized;
  const navItems = ALUMNI_NAVIGATIONS.map((nav) => {
    const active = nav.link === activeRoute;
    return `
          <li>
            <a href="${alumniHref(nav.link)}" class="flex items-center p-2.5 rounded-lg transition-all ease-in-out duration-200 ${active ? "bg-primary1 text-white shadow-sm" : "text-neutral1 hover:bg-primary5 hover:text-primary1"}">
              ${nav.icon}
              <span class="ms-3 text-sm font-medium ${active ? "text-white" : "text-neutral1"}">${nav.title}</span>
            </a>
          </li>`;
  }).join("");

  return `
    <aside id="logo-sidebar"
      class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 transition-transform duration-300 ease-in-out flex flex-col"
      :class="[isMobile ? 'z-[70] shadow-2xl' : 'z-30', sidebarIsOpen ? 'translate-x-0' : '-translate-x-full']"
      aria-label="Sidebar">
      <div class="flex items-center justify-center py-5 px-4 border-b border-neutral4 shrink-0">
        <a href="${alumniHref("/")}" class="focus:outline-none focus:ring-2 focus:ring-primary1">
          <img src="${alumniBasePrefix()}assets/img/bengkelkoding-text.png" alt="Bengkel Koding Logo" class="h-9 w-auto object-contain">
        </a>
      </div>
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        <ul class="space-y-1.5 font-medium">${navItems}
        </ul>
      </nav>
      <div class="p-3 border-t border-neutral4 shrink-0">
        <button type="button" @click="handleLogout()" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Keluar</span>
        </button>
      </div>
    </aside>

    <template x-if="isMobile && sidebarIsOpen">
      <div class="fixed inset-0 bg-black/40 z-[65] transition-opacity duration-300 ease-in-out" @click="sidebarIsOpen = false" aria-hidden="true"></div>
    </template>

    <div class="flex-1 flex flex-col min-h-screen min-w-0 duration-300 ease-in-out" :class="!isMobile && sidebarIsOpen ? 'pl-64' : 'pl-0'" style="transition: padding-left 300ms ease-in-out">
      <header class="sticky top-0 z-30 bg-white border-b border-neutral4 px-3 lg:px-6">
        <div class="h-16 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 min-w-0 flex-1">
          <button
            id="sidebar-toggle"
            type="button"
            class="inline-flex items-center justify-center p-2 text-neutral2 hover:bg-neutral5 hover:text-neutral1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary5 transition-colors shrink-0 cursor-pointer"
            aria-label="Toggle sidebar"
            :aria-expanded="sidebarIsOpen"
            @click="sidebarIsOpen = !sidebarIsOpen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM20 6H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1z"/>
            </svg>
          </button>
          <nav class="flex items-center text-sm text-neutral1 min-w-0 flex-1 ml-1" aria-label="Breadcrumb">
            ${alumniBreadcrumbHTML(pageTitle)}
          </nav>
        </div>

            <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <!-- Lonceng notifikasi (paling kiri di grup kanan): badge belum dibaca + dropdown -->
              <div class="relative flex items-center" x-ref="notifDropdownRef">
                <button
                  type="button"
                  id="notif-btn"
                  @click="notifIsOpen = !notifIsOpen; profileIsOpen = false"
                  class="relative w-10 h-10 inline-flex items-center justify-center rounded-full text-neutral2 hover:bg-neutral5 hover:text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 transition-colors cursor-pointer"
                  :aria-expanded="notifIsOpen"
                  :aria-label="notifUnreadCount ? 'Notifikasi, ' + notifUnreadCount + ' belum dibaca' : 'Notifikasi'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span
                    x-show="notifUnreadCount > 0"
                    x-cloak
                    id="notif-badge"
                    class="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red2 text-white text-[10.5px] font-bold leading-[18px] text-center ring-2 ring-white"
                    x-text="notifUnreadCount > 9 ? '9+' : notifUnreadCount"
                  ></span>
                </button>

                <!-- Panel notifikasi: desain sama dengan lonceng role koordinator (alumni/assets/js/app.js renderNotifikasi) -->
                <div
                  x-show="notifIsOpen"
                  x-cloak
                  id="notif-panel"
                  class="fixed sm:absolute top-16 sm:top-12 inset-x-3 sm:inset-x-auto sm:right-0 sm:w-96 z-[70] rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden"
                >
                  <div class="px-4 py-3 flex items-center justify-between gap-3 border-b border-gray-100 bg-white">
                    <div class="flex items-center gap-2">
                      <p class="!text-sm font-bold text-gray-900">Notifikasi</p>
                      <template x-if="notifUnreadCount > 0">
                        <span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold" x-text="notifUnreadCount + ' baru'"></span>
                      </template>
                    </div>
                    <div class="flex items-center gap-2">
                      <template x-if="notifUnreadCount > 0">
                        <button type="button" @click="markAllNotifsRead()" class="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai semua dibaca</button>
                      </template>
                      <template x-if="notifs.length > 0">
                        <button type="button" @click="mintaHapusSemuaNotif()" class="text-xs text-gray-400 hover:text-red-600 transition-colors cursor-pointer" title="Hapus semua notifikasi" aria-label="Hapus semua notifikasi">${ALUMNI_NOTIF_SVG.trash}</button>
                      </template>
                    </div>
                  </div>
                  <div class="max-h-80 overflow-y-auto divide-y divide-gray-100">
                    <template x-for="n in notifHalamanIni" :key="n.id">
                      <div class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors" :class="n.dibaca ? 'bg-white' : 'bg-blue-50/40'">
                        <span class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" :class="n.dibaca ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-[#1E3A8A]'" x-html="notifIcon(n)"></span>
                        <div class="min-w-0 flex-1">
                          <a :href="notifHref(n)" @click="markNotifRead(n.id)" class="block group/link">
                            <span class="block text-[13px] leading-snug group-hover/link:text-[#1E3A8A] transition-colors" :class="n.dibaca ? 'text-gray-700 font-medium' : 'text-gray-900 font-semibold'" x-text="n.pesan"></span>
                            <span class="block text-[11px] text-gray-400 mt-1" x-text="n.judul + ' · ' + notifTime(n)"></span>
                          </a>
                          <div class="flex items-center gap-3 mt-1.5 pt-0.5">
                            <template x-if="!n.dibaca">
                              <button type="button" @click="markNotifRead(n.id)" class="text-[11px] font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai dibaca</button>
                            </template>
                            <button type="button" @click="hapusNotif(n.id)" class="text-[11px] font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer ml-auto">Hapus</button>
                          </div>
                        </div>
                        <template x-if="!n.dibaca">
                          <span class="w-2 h-2 rounded-full bg-[#1E3A8A] shrink-0 mt-1.5" aria-label="Belum dibaca"></span>
                        </template>
                      </div>
                    </template>
                    <template x-if="notifs.length === 0">
                      <div class="p-8 text-center text-gray-400">
                        <span class="flex justify-center mb-2 text-gray-300">${ALUMNI_NOTIF_SVG.bellOff(32)}</span>
                        <p class="!text-sm">Belum ada notifikasi.</p>
                      </div>
                    </template>
                  </div>
                  <template x-if="notifs.length > 0">
                    <div class="px-4 py-2.5 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between text-xs text-gray-600">
                      <button type="button" @click="bukaSemuaNotif()" class="font-semibold text-[#1E3A8A] hover:underline cursor-pointer" x-text="'Lihat semua notif (' + notifs.length + ')'"></button>
                      <template x-if="notifTotalHalaman > 1">
                        <div class="flex items-center gap-1.5">
                          <button type="button" @click="notifHalaman = notifHalamanAktif - 1" :disabled="notifHalamanAktif <= 1" class="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" title="Sebelumnya" aria-label="Halaman sebelumnya">${ALUMNI_NOTIF_SVG.chevronLeft}</button>
                          <span class="tabular-nums font-semibold text-gray-800" x-text="notifHalamanAktif + '/' + notifTotalHalaman"></span>
                          <button type="button" @click="notifHalaman = notifHalamanAktif + 1" :disabled="notifHalamanAktif >= notifTotalHalaman" class="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" title="Berikutnya" aria-label="Halaman berikutnya">${ALUMNI_NOTIF_SVG.chevronRight}</button>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Nama + avatar (avatar paling kanan, nama disembunyikan di layar < sm), klik membuka menu profil -->
              <div class="relative flex items-center" id="profile-dropdown-wrapper" x-ref="dropdownRef">
                <button
                  type="button"
                  id="profile-menu-btn"
                  @click="profileIsOpen = !profileIsOpen; notifIsOpen = false"
                  class="flex items-center gap-2.5 rounded-full p-0.5 sm:pl-3 text-sm hover:bg-neutral5 focus:outline-none focus:ring-4 focus:ring-primary5 transition-all cursor-pointer group"
                  :aria-expanded="profileIsOpen"
                  aria-label="Menu Pengguna"
                >
                  <span class="hidden sm:block max-w-[180px] truncate font-semibold text-neutral1 group-hover:text-primary1 transition-colors" x-text="profile.name"></span>
                  <div data-avatar-saya class="w-9 h-9 rounded-full overflow-hidden bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50 shadow-xs shrink-0">
                    <template x-if="profile.image">
                      <img :src="profile.image" :alt="profile.name" class="w-full h-full object-cover">
                    </template>
                    <template x-if="!profile.image">
                      <span x-text="(profile.name || 'Alumni').slice(0, 2).toUpperCase()"></span>
                    </template>
                  </div>
                </button>

            <!-- Dropdown Profile Menu -->
            <div
              x-show="profileIsOpen"
              x-cloak
              class="absolute top-12 right-0 z-[70] w-64 origin-top-right rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden"
              id="dropdown-profile-menu"
            >
              <div class="px-4 pt-3.5 pb-3 bg-gradient-to-br from-primary1 via-primary2 to-primary3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-full overflow-hidden bg-white/20 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                    <template x-if="profile.image">
                      <img :src="profile.image" :alt="profile.name" class="w-full h-full object-cover">
                    </template>
                    <template x-if="!profile.image">
                      <span x-text="(profile.name || 'Alumni').slice(0, 2).toUpperCase()"></span>
                    </template>
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="!text-sm font-semibold text-white truncate" x-text="profile.name"></p>
                    <p class="!text-[11px] text-white/80 truncate" x-text="profile.email"></p>
                  </div>
                </div>
              </div>
              <ul class="py-1.5 text-sm text-neutral1">
                <li>
                  <a href="${alumniHref("/dashboard/alumni/profil")}" class="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm hover:bg-primary5 transition-colors group">
                    <span class="w-7 h-7 rounded-lg bg-primary5 text-primary2 flex items-center justify-center group-hover:bg-primary2 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <span>Pengaturan Profil</span>
                  </a>
                </li>
              </ul>
              <div class="border-t border-neutral4/70"></div>
              <ul class="py-1.5">
                <li>
                  <button type="button" @click="handleLogout()" class="flex items-center gap-2.5 w-full px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors group cursor-pointer">
                    <span class="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                    </span>
                    <span>Keluar</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
            </div>
        </div>

      </header>
      <div class="flex-1 px-6 lg:px-10 py-6" data-main-slot></div>
      <footer class="w-full px-2 lg:px-4 py-4">
        <div class="max-w-7xl mx-auto border-t pt-4 flex justify-between text-neutral3 items-center">
          <p class="text-xs lg:text-sm">&#xA9; 2026 Bengkel Koding</p>
          <div class="flex items-center gap-1 md:gap-2">
            <a class="text-xs lg:text-sm" href="#">Terms</a> • <a class="text-xs lg:text-sm" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>

    <!-- Modal Semua Notifikasi + konfirmasi hapus: desain sama dengan role koordinator -->
    <template x-if="notifModalOpen">
      <div class="fixed inset-0 z-[80] bg-neutral1/60 backdrop-blur-sm flex items-center justify-center p-4" @mousedown.self="notifModalOpen = false" @keydown.window.escape="if (!notifConfirmOpen) notifModalOpen = false">
        <div class="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto elevation5" role="dialog" aria-modal="true" aria-labelledby="modal-notif-title">
          <div class="flex items-center justify-between pb-3 border-b border-gray-200">
            <div>
              <h3 id="modal-notif-title" class="text-lg font-bold text-gray-900 tracking-tight">Semua Notifikasi</h3>
              <p class="!text-xs text-gray-500 mt-0.5">Kelola seluruh riwayat notifikasi dan pemberitahuan Anda</p>
            </div>
            <button type="button" @click="notifModalOpen = false" class="p-2 rounded-lg text-neutral2 hover:bg-primary5 hover:text-primary1 focus:outline-none focus:ring-2 focus:ring-primary3 cursor-pointer" aria-label="Tutup">${ALUMNI_NOTIF_SVG.x}</button>
          </div>

          <div class="flex items-center justify-between gap-3 py-3 border-b border-gray-100 flex-wrap">
            <div class="flex items-center gap-1.5">
              <button type="button" @click="notifModalFilter = 'semua'; notifModalHal = 1" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer" :class="notifModalFilter === 'semua' ? 'bg-[#1E3A8A] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100 border border-gray-200'">Semua</button>
              <button type="button" @click="notifModalFilter = 'belum'; notifModalHal = 1" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer" :class="notifModalFilter === 'belum' ? 'bg-[#1E3A8A] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100 border border-gray-200'">Belum Dibaca</button>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" @click="markAllNotifsRead()" class="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai semua dibaca</button>
              <span class="text-gray-300">•</span>
              <button type="button" @click="mintaHapusSemuaNotif()" class="text-xs font-semibold text-red-600 hover:underline cursor-pointer">Hapus semua</button>
            </div>
          </div>

          <div class="space-y-2.5 py-3 min-h-[240px]">
            <template x-for="n in notifModalItems" :key="'m-' + n.id">
              <div class="flex items-start gap-3 p-4 rounded-xl border hover:border-gray-200 hover:bg-gray-50/70 transition-colors" :class="n.dibaca ? 'bg-white border-gray-100' : 'bg-blue-50/30 border-blue-100'">
                <span class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5" :class="n.dibaca ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-[#1E3A8A]'" x-html="notifIcon(n)"></span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <a :href="notifHref(n)" @click="markNotifRead(n.id)" class="text-[14px] hover:text-[#1E3A8A] leading-snug" :class="n.dibaca ? 'text-gray-700 font-medium' : 'text-gray-900 font-bold'" x-text="n.pesan"></a>
                    <template x-if="!n.dibaca">
                      <span class="px-2 py-0.5 rounded-full bg-blue-100 text-[#1E3A8A] text-[10.5px] font-bold shrink-0">Baru</span>
                    </template>
                  </div>
                  <p class="!text-xs text-gray-400 mt-1" x-text="n.judul + ' · ' + notifTime(n)"></p>
                  <div class="flex items-center gap-3 mt-2.5 pt-2 border-t border-gray-100/80">
                    <template x-if="!n.dibaca">
                      <button type="button" @click="markNotifRead(n.id)" class="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer">Tandai telah dibaca</button>
                    </template>
                    <button type="button" @click="hapusNotif(n.id)" class="text-xs font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer ml-auto flex items-center gap-1">
                      ${ALUMNI_NOTIF_SVG.trash}<span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template x-if="notifModalList.length === 0">
              <div class="p-12 text-center text-gray-400">
                <span class="flex justify-center mb-2 text-gray-300">${ALUMNI_NOTIF_SVG.bellOff(40)}</span>
                <p class="!text-sm" x-text="'Tidak ada notifikasi' + (notifModalFilter === 'belum' ? ' yang belum dibaca' : '') + '.'"></p>
              </div>
            </template>
          </div>

          <template x-if="notifModalList.length > NOTIF_MODAL_PER_HAL">
            <div class="pt-3 border-t border-gray-100">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p class="!text-xs sm:!text-[13px] text-gray-500 order-last sm:order-none">
                  Menampilkan <span class="font-semibold text-gray-800" x-text="notifModalAwal + 1"></span>–<span class="font-semibold text-gray-800" x-text="notifModalAwal + notifModalItems.length"></span> dari <span class="font-semibold text-gray-800" x-text="notifModalList.length"></span> data
                </p>
                <div class="flex items-center gap-1.5 self-center sm:self-auto">
                  <button type="button" @click="notifModalHal = notifModalHalAktif - 1" :disabled="notifModalHalAktif <= 1" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer">${ALUMNI_NOTIF_SVG.chevronLeft}<span>Sebelumnya</span></button>
                  <span class="px-2.5 py-1 text-xs font-semibold text-[#1E3A8A] bg-blue-50 border border-blue-100 rounded-lg" x-text="notifModalHalAktif + ' / ' + notifModalTotalHal"></span>
                  <button type="button" @click="notifModalHal = notifModalHalAktif + 1" :disabled="notifModalHalAktif >= notifModalTotalHal" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"><span>Berikutnya</span>${ALUMNI_NOTIF_SVG.chevronRight}</button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <template x-if="notifConfirmOpen">
      <div class="fixed inset-0 z-[90] bg-neutral1/60 backdrop-blur-sm flex items-center justify-center p-4" @mousedown.self="notifConfirmOpen = false" @keydown.window.escape="notifConfirmOpen = false">
        <div class="bg-white rounded-2xl max-w-sm w-full p-6 elevation5" role="alertdialog" aria-modal="true" aria-labelledby="notif-confirm-title" aria-describedby="notif-confirm-message">
          <h3 id="notif-confirm-title" class="font-semibold text-base text-neutral1">Hapus semua notifikasi?</h3>
          <p id="notif-confirm-message" class="!text-sm text-neutral2 mt-2">Seluruh riwayat notifikasi akan dihapus.</p>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" @click="notifConfirmOpen = false" class="px-4 py-2 border border-neutral4 text-neutral1 text-sm font-medium rounded-lg hover:bg-neutral5 cursor-pointer">Batal</button>
            <button type="button" @click="hapusSemuaNotif()" class="px-4 py-2 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-4 bg-red2 hover:bg-red1 focus:ring-red3 cursor-pointer">Hapus Semua</button>
          </div>
        </div>
      </div>
    </template>`;
}

function expandAlumniPartials(root) {
  const partials = window.ALUMNI_PARTIALS || {};
  let el;
  while ((el = root.querySelector("[data-partial]"))) {
    const render = partials[el.dataset.partial];
    el.outerHTML = render ? render(el.dataset) : "";
  }
}
function hideAlumniTemplates(root) {
  root.querySelectorAll("template").forEach((t) => {
    t.setAttribute("hidden", "");
    hideAlumniTemplates(t.content);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  expandAlumniPartials(document.body);
  const main = document.querySelector("main[data-route], main[data-title]");
  if (main) {
    const r = main.hasAttribute("data-route") ? main.dataset.route : location.pathname.split("/").pop().replace(/\.html$/, "");
    const route = r.startsWith("/dashboard/alumni") ? r : "/dashboard/alumni" + (r ? "/" + r.replace(/^\/+/, "") : "");
    const shell = document.createElement("div");
    shell.setAttribute("x-data", "alumniLayout");
    shell.className = "flex min-h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]";
    shell.innerHTML = alumniLayoutHTML(route, alumniPageTitle(route));
    main.before(shell);
    shell.querySelector("[data-main-slot]").appendChild(main);
  }
  hideAlumniTemplates(document);

  const alpine = document.createElement("script");
  alpine.src = "https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js";
  document.head.appendChild(alpine);
});