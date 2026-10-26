/**
 * Shared JS role Alumni: config Tailwind, globals.css, layout (Aside + Nav + Footer) dan loader Alpine.
 * Konversi HTML dari lms-bengkod-web:
 *   - app/(dashboard)/dashboard/alumni/layout.tsx
 *   - features/admin/components/Aside.tsx (navigasi "alumni")
 *   - features/admin/components/Nav.tsx
 *   - features/student/components/Footer.tsx
 * Dimuat di <head> setelah Tailwind CDN. Halaman menaruh kontennya di <main data-route="...">,
 * mendaftarkan komponen lewat event "alpine:init", lalu file ini membungkus <main> dengan layout
 * dan memuat Alpine setelah layout terpasang.
 */

// tailwind.config.ts lms-bengkod-web (urutan warna sama persis)
tailwind.config = {
  theme: {
    extend: {
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

// app/globals.css (bagian yang dipakai halaman alumni)
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

// Rute Next.js → file HTML prototype
const ALUMNI_ROUTES = {
  "/": "../index.html",
  "/dashboard/alumni": "dashboard.html",
  "/dashboard/alumni/profil": "profil.html",
  "/dashboard/alumni/lowongan": "lowongan.html",
  "/dashboard/alumni/pengumuman": "pengumuman.html",
};

function alumniHref(link) {
  if (ALUMNI_ROUTES[link]) return ALUMNI_ROUTES[link];
  const m = /^\/dashboard\/alumni\/([^/]+)$/.exec(link || "");
  if (m) return `detail.html?id=${encodeURIComponent(m[1])}`;
  return "#";
}

// Navigasi "alumni" di features/admin/components/Aside.tsx
const ALUMNI_NAVIGATIONS = [
  {
    title: "Dashboard",
    link: "/dashboard/alumni",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 20 20" fill="none">
          <path d="M17 1C18.1046 1 19 1.88316 19 2.9726L19 6.33992C19 7.42936 18.1046 8.31252 17 8.31252H14C12.8954 8.31252 12 7.42936 12 6.33992L12 2.9726C12 1.88316 12.8954 1 14 1L17 1Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3 1C1.89543 1 0.999999 1.88316 0.999999 2.9726L1.00001 6.33992C1.00001 7.42936 1.89544 8.31252 3.00001 8.31252H6.00001C7.10458 8.31252 8.00001 7.42936 8.00001 6.33992L8 2.9726C8 1.88316 7.10457 1 6 1L3 1Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 11.6875C18.1046 11.6875 19 12.5707 19 13.6601V17.0274C19 18.1168 18.1046 19 17 19H14C12.8954 19 12 18.1168 12 17.0274L12 13.6601C12 12.5707 12.8954 11.6875 14 11.6875H17Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M3.00001 11.6875C1.89544 11.6875 1.00001 12.5707 1.00001 13.6601L1.00001 17.0274C1.00001 18.1168 1.89544 19 3.00001 19H6.00001C7.10458 19 8.00001 18.1168 8.00001 17.0274L8.00001 13.6601C8.00001 12.5707 7.10458 11.6875 6.00001 11.6875H3.00001Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`,
  },
  {
    title: "Profil Saya",
    link: "/dashboard/alumni/profil",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="none">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`,
  },
  {
    title: "Lowongan Kerja",
    link: "/dashboard/alumni/lowongan",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="12" y1="12" x2="12" y2="12.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>`,
  },
  {
    title: "Pengumuman",
    link: "/dashboard/alumni/pengumuman",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
  },
];

const ALWAYS_SHOW_MOBILE = ["Alumni", "Student", "Admin", "Superadmin", "Dosen", "Asisten"];

// layout.tsx: convertToTitleCase + modifyBreadcrumb
function alumniBreadcrumbItems(pathname) {
  const pathParts = pathname.split("/").filter(Boolean);
  const items = pathParts.map((part, index) => ({
    text: part.charAt(0).toUpperCase() + part.slice(1),
    href: `/${pathParts.slice(0, index + 1).join("/")}`,
  }));
  const toTitle = (input) => input.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return items.map((item, i) => {
    const text = toTitle(item.text);
    const alwaysShow = ALWAYS_SHOW_MOBILE.includes(text);
    if (i === 0 || i === items.length - 1) return { text, alwaysShow };
    return { text, href: alumniHref(item.href), alwaysShow };
  });
}

function alumniCurrentProfile() {
  const base = { name: "Aisha Dwi Rahmawati", email: "aisha.rahma@alumni.dinus.ac.id", image: "" };
  try {
    const saved = JSON.parse(localStorage.getItem("bengkod_alumni_profile") || "null");
    if (saved) return { name: saved.name || base.name, email: saved.email || base.email, image: saved.avatarUrl || "" };
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
    profile: alumniCurrentProfile(),
    init() {
      this.checkMobile();
      window.addEventListener("resize", () => this.checkMobile());
      this.$watch("sidebarIsOpen", (v) => {
        if (this.isHydrated && !this.isMobile) localStorage.setItem("sidebar_open", String(v));
      });
      document.addEventListener("mousedown", (event) => {
        const t = event.target;
        if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(t)) this.profileIsOpen = false;
        if (this.$refs.breadcrumbRef && !this.$refs.breadcrumbRef.contains(t)) this.breadcrumbDropdownOpen = false;
      });
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
      window.location.href = "../index.html";
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

function alumniLayoutHTML(route, breadcrumbItems) {
  const navItems = ALUMNI_NAVIGATIONS.map((nav) => {
    const active = nav.link === route;
    return `
          <li>
            <a href="${alumniHref(nav.link)}" class="flex items-center p-2 rounded-lg transition-all ease-in-out duration-200 ${active ? "bg-primary1 text-white fill-white" : "text-primary1 fill-primary1 hover:bg-primary5"}">
              ${nav.icon}
              <span class="ms-3 text-sm ${active ? "bg-primary1 text-white fill-white" : "text-neutral1"}">${nav.title}</span>
            </a>
          </li>`;
  }).join("");

  // Nav.tsx: logika breadcrumb (tampil di mobile: pertama, terakhir, kedua dari akhir, alwaysShow)
  const n = breadcrumbItems.length;
  const isMobileVisible = (i) => i === 0 || i === n - 1 || i === n - 2 || breadcrumbItems[i].alwaysShow;
  const hiddenItems = breadcrumbItems.filter((_, i) => !isMobileVisible(i));
  const crumbs = breadcrumbItems.map((item, index) => {
    const isFirst = index === 0;
    const isLast = index === n - 1;
    const hideOnMobile = hiddenItems.length > 0 && !isMobileVisible(index);
    let html = "";
    if (index > 0) html += `<span class="mx-2 shrink-0 ${hideOnMobile ? "hidden lg:inline" : ""}">›</span>`;
    if (isFirst && hiddenItems.length > 0) {
      html += `<span class="relative mr-2 lg:hidden">
              <button type="button" @click="breadcrumbDropdownOpen = !breadcrumbDropdownOpen" class="text-neutral3 hover:text-primary1 px-1 rounded">...</button>
              <template x-if="breadcrumbDropdownOpen">
                <div class="absolute top-6 left-0 z-50 min-w-[160px] py-1.5 bg-white border border-neutral4/70 rounded-lg shadow-lg">
                  ${hiddenItems.map((h) => `<a href="${h.href}" title="${h.text}" @click="breadcrumbDropdownOpen = false" class="block max-w-[16rem] truncate px-3 py-1.5 text-xs whitespace-nowrap hover:bg-neutral5 hover:text-primary1">${h.text}</a>`).join("")}
                </div>
              </template>
            </span>`;
    }
    const inner = item.href
      ? `<a href="${item.href}" title="${item.text}" class="block max-w-[10rem] truncate hover:text-primary1 lg:max-w-[14rem]">${item.text}</a>`
      : `<span title="${item.text}" ${isLast ? 'aria-current="page"' : ""} class="block truncate font-medium ${isLast ? "max-w-[16rem] lg:max-w-[24rem]" : "max-w-[10rem] lg:max-w-[14rem]"}">${item.text}</span>`;
    html += `<span class="min-w-0 whitespace-nowrap ${isFirst ? "hidden lg:inline" : hideOnMobile ? "hidden lg:inline" : ""}">${inner}</span>`;
    return html;
  }).join("");

  return `
    <aside id="logo-sidebar"
      class="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-neutral4 transition-transform duration-300 ease-in-out overflow-hidden"
      :class="[isMobile ? 'z-[70] shadow-2xl' : 'z-30', sidebarIsOpen ? 'translate-x-0' : '-translate-x-full']"
      aria-label="Sidebar">
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        <div class="flex items-center justify-center py-6 pr-3">
          <a href="${alumniHref("/")}">
            <img src="assets/img/bengkelkoding-text.png" alt="Bengkel Koding" width="120" height="120" style="color: transparent">
          </a>
        </div>
        <ul class="space-y-2 font-medium">${navItems}
        </ul>
        <div class="w-full h-0.5 my-4 bg-neutral4"></div>
        <ul class="space-y-2 font-medium">
          <li>
            <button @click="handleLogout()" class="flex items-center w-full p-2 text-neutral2 fill-neutral2 rounded-lg hover:bg-red-100 hover:text-red1 hover:fill-red1 transition-all ease-in-out duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M12.0337 16.9999L6.20039 10.9999M6.20039 10.9999L12.0337 4.9999M6.20039 10.9999H20.6004M1.40039 1.3999V20.5999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="ms-3 text-neutral1 text-sm">Keluar</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <template x-if="isMobile && sidebarIsOpen">
      <div class="fixed inset-0 bg-black/40 z-[65] transition-opacity duration-300 ease-in-out" @click="sidebarIsOpen = false" aria-hidden="true"></div>
    </template>

    <div class="flex-1 flex flex-col min-h-screen min-w-0 duration-300 ease-in-out" :class="!isMobile && sidebarIsOpen ? 'pl-64' : 'pl-0'" style="transition: padding-left 300ms ease-in-out">
      <nav class="sticky top-0 z-[60] bg-white border-b border-neutral4 shadow-sm">
        <div class="w-full px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex min-w-0 flex-1 items-center justify-start gap-3">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button"
                class="inline-flex items-center p-2 ml-1 text-sm fill-neutral2 rounded-lg hover:bg-neutral5 focus:outline-none shrink-0"
                @click="sidebarIsOpen = !sidebarIsOpen">
                <span class="sr-only">Toggle sidebar</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              </button>

              <div class="relative flex items-center text-sm text-neutral1 min-w-0 flex-1" x-ref="breadcrumbRef">${crumbs}</div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <div class="relative flex items-center" x-ref="dropdownRef">
                <div>
                  <button type="button" class="flex text-sm rounded-full focus:ring-4 focus:ring-primary5" :aria-expanded="profileIsOpen" @click="toggleProfile()">
                    <span class="sr-only">Open user menu</span>
                    <div class="mx-auto">
                      ${alumniAvatarHTML("profile.image", "profile.name", "w-8 h-8", "text-xs")}
                    </div>
                  </button>
                </div>

                <template x-if="profileIsOpen">
                  <div class="absolute top-10 right-0 z-[70] w-64 origin-top-right rounded-xl bg-white border border-neutral4/70 shadow-xl shadow-neutral1/10 overflow-hidden" id="dropdown-profile">
                    <div class="px-4 pt-3.5 pb-3 bg-gradient-to-br from-primary1 via-primary2 to-primary3">
                      <div class="flex items-center gap-2.5">
                        ${alumniAvatarHTML("profile.image", "profile.name", "w-9 h-9", "text-xs", "border-2 border-white shadow-sm shrink-0")}
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-semibold text-white truncate" x-text="profile.name"></p>
                          <p class="text-[11px] text-white/80 truncate" x-text="profile.email"></p>
                        </div>
                      </div>
                    </div>
                    <ul class="py-1.5 text-sm text-neutral1" aria-labelledby="avatarButton">
                      <li>
                        <a href="#" class="flex items-center gap-2.5 px-4 py-2 text-xs md:text-sm hover:bg-primary5 transition-colors group">
                          <span class="w-7 h-7 rounded-lg bg-primary5 text-primary2 flex items-center justify-center group-hover:bg-primary2 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <circle cx="12" cy="12" r="3" />
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 1 .33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                          </span>
                          <span>Pengaturan</span>
                        </a>
                      </li>
                    </ul>
                    <div class="border-t border-neutral4/70"></div>
                    <ul class="py-1.5">
                      <li>
                        <button type="button" @click="handleLogout()" class="flex items-center gap-2.5 w-full px-4 py-2 text-xs md:text-sm text-red-600 hover:bg-red-50 transition-colors group">
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
                </template>
              </div>
            </div>
          </div>
        </div>
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

// Potongan markup bersama (diisi file lain lewat window.ALUMNI_PARTIALS): <div data-partial="nama" data-*>
function expandAlumniPartials(root) {
  const partials = window.ALUMNI_PARTIALS || {};
  let el;
  while ((el = root.querySelector("[data-partial]"))) {
    const render = partials[el.dataset.partial];
    el.outerHTML = render ? render(el.dataset) : "";
  }
}

// React tidak merender apa pun untuk kondisi false, sedangkan Alpine menyisakan <template>.
// Atribut hidden membuat <template> diabaikan selektor space-y-* / divide-y-* Tailwind.
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
    // data-route: halaman hasil konversi (rute Next.js); data-title: halaman lama prototype (status-karir)
    const r = main.hasAttribute("data-route") ? main.dataset.route : location.pathname.split("/").pop().replace(/\.html$/, "");
    const route = "/dashboard/alumni" + (r ? "/" + r : "");
    const shell = document.createElement("div");
    shell.setAttribute("x-data", "alumniLayout");
    shell.className = "flex min-h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]";
    shell.innerHTML = alumniLayoutHTML(route, alumniBreadcrumbItems(route));
    main.before(shell);
    shell.querySelector("[data-main-slot]").appendChild(main);
  }
  hideAlumniTemplates(document);

  const alpine = document.createElement("script");
  alpine.src = "https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js";
  document.head.appendChild(alpine);
});
