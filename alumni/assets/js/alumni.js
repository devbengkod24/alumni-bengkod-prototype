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

// 5 Navigasi Utama Role Alumni
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

function alumniCurrentProfile() {
  let user = null;
  try {
    if (typeof DB !== "undefined" && DB.akun) user = DB.akun.aktif();
  } catch {}
  const base = {
    name: user ? user.nama : "Aisha Dwi Rahmawati",
    email: user ? user.email : "aisha.rahma@alumni.dinus.ac.id",
    image: user ? (user.foto || "") : "",
  };
  try {
    const saved = JSON.parse(localStorage.getItem("bengkod_alumni_profile") || "null");
    if (saved) return { name: saved.name || base.name, email: saved.email || base.email, image: saved.avatarUrl || base.image };
  } catch {}
  return base;
}

document.addEventListener("alpine:init", () => {
  Alpine.data("alumniLayout", () => ({
    sidebarIsOpen: true,
    isMobile: false,
    isHydrated: false,
    profileIsOpen: false,
    breadcrumbDropdownOpen: false,
    navSearchQuery: "",
    navSearchOpen: false,
    mobileSearchOpen: false,
    profile: alumniCurrentProfile(),
    init() {
      this.checkMobile();
      this.loadNotifs();
      window.addEventListener("resize", () => this.checkMobile());
      this.$watch("sidebarIsOpen", (v) => {
        if (this.isHydrated && !this.isMobile) localStorage.setItem("sidebar_open", String(v));
      });
      // Tutup dropdown kalau klik di luar (satu-satunya handler click-away)
      document.addEventListener("mousedown", (event) => {
        const t = event.target;
        if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(t)) this.profileIsOpen = false;
        if (this.$refs.breadcrumbRef && !this.$refs.breadcrumbRef.contains(t)) this.breadcrumbDropdownOpen = false;
        const inSearch = [this.$refs.navSearchRef, this.$refs.mobileSearchRef, this.$refs.mobileSearchToggle].some((el) => el && el.contains(t));
        if (!inSearch) this.navSearchOpen = false;
      });
    },
    // Pencarian alumni di navbar (selalu terjangkau di semua halaman, desktop & ponsel)
    get navSearchResults() {
      const q = this.navSearchQuery.trim();
      if (!q || typeof searchAlumni !== "function") return [];
      return searchAlumni(q).slice(0, 6);
    },
    navSearchHref(a) {
      return alumniBasePrefix() + "detail.html?id=" + encodeURIComponent(a.id);
    },
    openMobileSearch() {
      this.mobileSearchOpen = !this.mobileSearchOpen;
    },
    submitNavSearch() {
      const first = this.navSearchResults[0];
      if (first) window.location.href = this.navSearchHref(first);
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
    handleLogout() {
      try {
        if (typeof DB !== "undefined" && DB.akun) DB.akun.keluar();
        localStorage.removeItem("bengkod_alumni_profile");
      } catch {}
      window.location.href = "login.html";
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

// Dropdown hasil pencarian alumni di navbar (dipakai versi desktop & ponsel)
function alumniNavSearchDropdownHTML() {
  return `<div x-show="navSearchOpen && navSearchQuery.trim()" x-cloak
      class="absolute top-[calc(100%+6px)] left-0 right-0 z-[70] bg-white rounded-xl border border-neutral4/70 shadow-xl overflow-hidden">
      <template x-for="a in navSearchResults" :key="a.id">
        <a :href="navSearchHref(a)" class="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral5 transition-colors">
          <img :src="a.avatarUrl" :alt="a.name" class="w-8 h-8 rounded-full object-cover border border-neutral4 shrink-0">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-neutral1 truncate" x-text="a.name"></p>
            <p class="text-xs text-neutral3 truncate" x-text="a.headline"></p>
          </div>
        </a>
      </template>
      <template x-if="navSearchResults.length === 0">
        <p class="px-3.5 py-3 text-sm text-neutral3">Tidak ada alumni untuk "<span class="font-semibold text-neutral1" x-text="navSearchQuery"></span>"</p>
      </template>
    </div>`;
}

function alumniLayoutHTML(route, breadcrumbItems) {
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
        <a href="${alumniRootPrefix()}index.html" class="flex items-center gap-3 w-full p-2.5 rounded-lg text-sm font-medium text-neutral2 hover:bg-red3/40 hover:text-red1 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Keluar</span>
        </a>
      </div>
    </aside>

    <template x-if="isMobile && sidebarIsOpen">
      <div class="fixed inset-0 bg-black/40 z-[65] transition-opacity duration-300 ease-in-out" @click="sidebarIsOpen = false" aria-hidden="true"></div>
    </template>

    <div class="flex-1 flex flex-col min-h-screen min-w-0 duration-300 ease-in-out" :class="!isMobile && sidebarIsOpen ? 'pl-64' : 'pl-0'" style="transition: padding-left 300ms ease-in-out">
      <header class="sticky top-0 z-30 bg-white border-b border-neutral4 h-16 px-3 lg:px-6 flex items-center justify-between gap-3">
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

            <div class="flex items-center gap-3 shrink-0">
              <!-- Cari alumni: kolom di desktop -->
              <form class="relative hidden md:block w-64 lg:w-80" x-ref="navSearchRef" role="search" @submit.prevent="submitNavSearch()">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral3 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></span>
                <input type="search" x-model="navSearchQuery" @focus="navSearchOpen = true" @input="navSearchOpen = true" @keydown.escape="navSearchOpen = false"
                  placeholder="Cari alumni" aria-label="Cari alumni" autocomplete="off"
                  class="w-full pl-10 pr-4 py-2 rounded-full bg-neutral5 border border-transparent text-sm text-neutral1 placeholder:text-neutral3 focus:outline-none focus:bg-white focus:border-primary2 focus:ring-2 focus:ring-primary2/15 transition-all">
                ${alumniNavSearchDropdownHTML()}
              </form>
              <!-- Cari alumni: ikon di ponsel -->
              <button type="button" x-ref="mobileSearchToggle" class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-neutral2 hover:bg-neutral5" @click="openMobileSearch()" :aria-expanded="mobileSearchOpen" aria-label="Cari alumni">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </button>

              <div class="relative flex items-center" x-ref="dropdownRef">
                <div>
                  <button type="button" class="flex text-sm rounded-full focus:ring-4 focus:ring-primary5" :aria-expanded="profileIsOpen" @click="toggleProfile()">
                    <span class="sr-only">Open user menu</span>
                    <div class="mx-auto">
                      ${alumniAvatarHTML("profile.image", "profile.name", "w-8 h-8", "text-xs")}
                    </div>
                  </button>
                </div>

            <!-- Dropdown Panel Notifikasi -->
            <div
              x-show="notifIsOpen"
              x-cloak
              class="fixed sm:absolute top-16 sm:top-12 inset-x-3 sm:inset-x-auto sm:right-0 sm:w-80 z-[70] rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden"
              id="notif-panel"
            >
              <div class="px-4 py-3 flex items-center justify-between gap-3 border-b border-neutral4/70">
                <p class="!text-sm font-semibold text-neutral1">Notifikasi</p>
                <button
                  x-show="notifUnreadCount > 0"
                  type="button"
                  @click="markAllNotifsRead()"
                  class="text-xs font-semibold text-primary2 hover:underline cursor-pointer"
                >
                  Tandai semua dibaca
                </button>
              </div>
              <div class="max-h-80 overflow-y-auto divide-y divide-neutral4/40">
                <template x-for="n in notifs" :key="n.id">
                  <a
                    :href="n.tautan || '#'"
                    @click="markNotifRead(n.id)"
                    class="block px-4 py-3 hover:bg-neutral5 transition-colors"
                    :class="!n.dibaca ? 'bg-primary5/30' : ''"
                  >
                    <div class="flex items-start gap-2.5">
                      <span class="w-2 h-2 rounded-full bg-primary2 mt-1.5 shrink-0" :class="n.dibaca ? 'invisible' : ''"></span>
                      <div class="flex-1 min-w-0">
                        <p class="text-xs text-neutral1 leading-relaxed" x-text="n.pesan"></p>
                        <p class="text-[10px] text-neutral3 mt-1" x-text="n.waktu"></p>
                      </div>
                    </div>
                  </a>
                </template>
                <template x-if="notifs.length === 0">
                  <p class="!text-sm text-neutral3 px-4 py-8 text-center">Belum ada notifikasi.</p>
                </template>
              </div>
            </div>
          </div>

          <!-- User Menu Button & Dropdown -->
          <div class="relative flex items-center" id="profile-dropdown-wrapper" x-ref="dropdownRef">
            <button
              type="button"
              id="profile-menu-btn"
              @click="profileIsOpen = !profileIsOpen; notifIsOpen = false"
              class="flex items-center gap-2.5 text-sm rounded-full focus:ring-4 focus:ring-primary5 p-0.5 transition-all cursor-pointer group"
              :aria-expanded="profileIsOpen"
              aria-label="Menu Pengguna"
            >
              <div class="text-right hidden sm:block">
                <div class="text-sm font-semibold text-neutral1 leading-tight group-hover:text-primary1 transition-colors" x-text="profile.name"></div>
                <div class="text-[11px] text-neutral3">Alumni Asisten Lab</div>
              </div>
              <div data-avatar-saya class="w-9 h-9 rounded-full overflow-hidden bg-primary5 text-primary1 flex items-center justify-center font-bold text-xs border border-primary4/50 shadow-xs">
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
        <!-- Cari alumni: baris yang melebar di ponsel -->
        <template x-if="mobileSearchOpen">
        <form class="md:hidden px-3 pb-3" x-ref="mobileSearchRef" role="search" @submit.prevent="submitNavSearch()">
          <div class="relative">
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral3 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg></span>
            <input type="search" x-ref="mobileSearchInput" x-init="$nextTick(() => $el.focus())" x-model="navSearchQuery" @focus="navSearchOpen = true" @input="navSearchOpen = true" @keydown.escape="mobileSearchOpen = false"
              placeholder="Cari alumni" aria-label="Cari alumni" autocomplete="off"
              class="w-full pl-10 pr-4 py-2 rounded-full bg-neutral5 border border-transparent text-sm text-neutral1 placeholder:text-neutral3 focus:outline-none focus:bg-white focus:border-primary2 focus:ring-2 focus:ring-primary2/15 transition-all">
            ${alumniNavSearchDropdownHTML()}
          </div>
        </form>
        </template>
      </nav>
      <div class="flex-1 px-6 lg:px-10 py-6" data-main-slot></div>
      <footer class="w-full px-2 lg:px-4 py-4">
        <div class="max-w-7xl mx-auto border-t pt-4 flex justify-between text-neutral3 items-center">
          <p class="text-xs lg:text-sm">&#xA9; 2026 Bengkel Koding</p>
          <div class="flex items-center gap-1 md:gap-2">
            <a class="text-xs lg:text-sm" href="#">Terms</a> • <a class="text-xs lg:text-sm" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>`;
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