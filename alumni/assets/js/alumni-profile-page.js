/**
 * Bagian halaman profil alumni yang sama di profil/page.tsx dan [id]/page.tsx:
 * header, tentang, modal cover/avatar/logo, pratinjau, hapus, lightbox, proyek,
 * keahlian, penghargaan, organisasi, pendidikan, sertifikasi, toast + komponen Alpine profilePage.
 * data-variant="profil" | "detail" mengikuti perbedaan kecil antara kedua halaman sumber.
 */

window.ALUMNI_PARTIALS = window.ALUMNI_PARTIALS || {};

// URL tanpa protokol & www (profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""))
function stripProto(url) {
  return (url || "").replace(/^https?:\/\/(www\.)?/, "");
}

const EDIT_ICON_16 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>`;
const CAMERA_PATH = `<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
const UPLOAD_PATH = `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
const SECTION_ADD_BTN = (id, open, label) =>
  `<button id="${id}" @click="${open} = true" class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer" aria-label="${label}">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>`;
const SECTION_EDIT_BTN = (id, open, label) =>
  `<button id="${id}" ${open ? `@click="${open} = true"` : ""} class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer" aria-label="${label}">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>`;
const COUNT_BADGE = (expr) =>
  `<span class="w-8 h-8 rounded-full bg-blue-50 text-[#1E3A8A] text-[15px] font-bold border border-blue-200/80 flex items-center justify-center shadow-xs flex-shrink-0" x-text="${expr}"></span>`;
const CHIP = "inline-flex items-center justify-center h-12 px-6 rounded-full bg-blue-50 border border-blue-100 text-[#1E3A8A] text-[14px] font-semibold";
const AFFILIATED_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 21h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 3L3.5 8h17L12 3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 11v7M10 11v7M14 11v7M18 11v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const LOGO_OVERLAY = `<div class="absolute inset-0 bg-[#1E3A8A]/80 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <span class="text-[10px] font-semibold mt-0.5">Ubah</span>
                </div>`;
const ICON_CIRCLE = "w-[60px] h-[60px] rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-center text-[#1E3A8A] flex-shrink-0 shadow-sm";
const LOGO_BUTTON = `${ICON_CIRCLE} relative group cursor-pointer overflow-hidden hover:border-[#1E3A8A] transition-colors`;
const PROFILE_LINK_CHIP = "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-blue-50/80 text-gray-700 hover:text-[#1E3A8A] border border-gray-200/80 hover:border-blue-200 text-[15px] font-medium transition-colors shadow-2xs";

// Modal bantu di page.tsx (judul + tombol tutup bulat)
function pageModalHTML({ id, open, close, title, subtitle, body }) {
  return `<template x-teleport="body">
    <template x-if="${open}">
      <div id="${id}" class="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4" @click.self="${close}">
        <div class="bg-white rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden" style="width: 90vw; max-width: 1024px">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 class="text-[18px] font-bold text-gray-900" x-text="${title}"></h3>
              ${subtitle ? `<p class="text-[14px] text-gray-500 mt-0.5" x-text="${subtitle}"></p>` : ""}
            </div>
            <button id="btn-close-${id}" @click="${close}" class="text-gray-400 hover:text-gray-700 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Tutup modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
            </button>
          </div>
          <div class="p-6 overflow-y-auto flex-1">${body}</div>
        </div>
      </div>
    </template>
  </template>`;
}
window.pageModalHTML = pageModalHTML;

// ===================== HEADER + TENTANG =====================
ALUMNI_PARTIALS["profile-top"] = ({ variant }) => {
  const detail = variant === "detail";
  const linkChip = (field, href, iconBg, icon, extraIconCls = "") => `<template x-if="profile.${field}">
                  <a class="${PROFILE_LINK_CHIP}" :href="${href}" ${field === "email" ? "" : 'target="_blank" rel="noreferrer"'}>
                    <div class="w-5 h-5 rounded-full ${iconBg} text-white flex items-center justify-center${extraIconCls}">${icon}</div>
                    <span x-text="${field === "email" ? "profile.email" : `stripProto(profile.${field})`}"></span>
                  </a>
                </template>`;
  return `<div id="section-header-profil" class="bg-white rounded-xl border border-gray-200/90 shadow-sm overflow-hidden">
        <input type="file" x-ref="coverFileInput" accept="image/*" class="hidden" hidden @change="handleCoverFileUpload($event)">
        <input type="file" x-ref="avatarFileInput" accept="image/*" class="hidden" hidden @change="handleAvatarFileUpload($event)">
        <div class="h-36 sm:h-44 relative p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
          :class="profile.coverImageUrl ? 'bg-gray-900' : 'bg-gradient-to-r ' + profile.coverGradient">
          <template x-if="profile.coverImageUrl">
            <img :src="profile.coverImageUrl" alt="Cover Banner" class="absolute inset-0 w-full h-full object-cover object-center">
          </template>
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
          <div class="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none"></div>
          ${detail ? "" : `<div class="flex items-center justify-end z-10">
            <button id="btn-ubah-cover" @click="coverUrlDraft = profile.coverImageUrl; editCoverOpen = true"
              class="bg-white/90 hover:bg-white text-[#1E3A8A] text-[15px] font-semibold px-5 py-2.5 rounded-full shadow-sm backdrop-blur-xs flex items-center gap-2 transition-all cursor-pointer border border-white/60 hover:shadow-md"
              title="Ganti foto atau tema cover">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>Ubah Cover</span>
            </button>
          </div>`}
        </div>

        <div class="px-6 sm:px-8 pb-7">
          <div class="flex items-start">
            <div class="relative z-10 -mt-[56px] sm:-mt-[68px] w-[112px] h-[112px] sm:w-[136px] sm:h-[136px] flex-shrink-0">
              <div class="w-full h-full rounded-full border-4 border-white shadow-xl bg-gray-100 overflow-hidden ring-2 ring-blue-100">
                <template x-if="profile.avatarUrl && !avatarBroken">
                  <img :alt="profile.name" class="w-full h-full object-cover" :src="profile.avatarUrl" @error="avatarBroken = true">
                </template>
                <template x-if="!(profile.avatarUrl && !avatarBroken)">
                  <div class="w-full h-full bg-[#1E3A8A] flex items-center justify-center text-white text-3xl sm:text-4xl font-bold" x-text="(profile.name || 'Alumni').slice(0, 2).toUpperCase()"></div>
                </template>
              </div>
              ${detail ? "" : `<button id="btn-ganti-foto-profil" aria-label="Ganti Foto Profil" @click="avatarUrlDraft = profile.avatarUrl; avatarModalOpen = true"
                class="absolute bottom-1 right-1 z-20 w-8 h-8 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-[#1D4ED8] transition-all cursor-pointer hover:scale-110"
                title="Ganti Foto Profil">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  ${CAMERA_PATH}
                  <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2" />
                </svg>
              </button>`}
            </div>
          </div>

          <div class="mt-4 space-y-3.5">
            <div class="flex items-center justify-between gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
              <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap min-w-0">
                <h2 class="text-[22px] sm:text-[25px] font-bold text-gray-900 tracking-tight leading-tight shrink-0" x-text="profile.name"></h2>
                <span class="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[15px] font-semibold bg-[#1E3A8A] text-white shadow-sm shrink-0 self-center leading-normal">
                  <span x-text="'Alumni ' + (profile.batch || '2024')"></span>
                </span>
              </div>
              ${detail ? `<button type="button" @click="toggleConnectDetail()"
                  class="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[15px] font-semibold gap-2 transition-all shadow-sm cursor-pointer shrink-0 leading-normal"
                  :class="isDetailConnected ? 'bg-blue-50 text-[#1E3A8A] border border-blue-200' : 'bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white'">
                  <template x-if="isDetailConnected">
                    <span class="inline-flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>Terhubung</span>
                    </span>
                  </template>
                  <template x-if="!isDetailConnected">
                    <span class="inline-flex items-center gap-2">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                      <span>Hubungkan</span>
                    </span>
                  </template>
                </button>` : `<div class="shrink-0">
                <button id="btn-edit-profil" @click="editProfileOpen = true"
                  class="inline-flex items-center justify-center bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-full text-[15px] font-semibold gap-2 transition-colors shadow-sm cursor-pointer shrink-0 leading-normal" title="Edit Profil">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span>Edit Profil</span>
                </button>
              </div>`}
            </div>

            <p class="text-[14px] sm:text-[15px] text-gray-700 font-normal leading-relaxed max-w-3xl" x-text="profile.headline"></p>

            <div class="flex flex-col gap-1 text-[14px] sm:text-[15px] text-gray-600 pt-0.5">
              <div class="flex items-center gap-1.5"><span x-text="profile.location"></span></div>
              <div><span class="text-[#1E3A8A] font-semibold text-[14px] sm:text-[15px] hover:underline cursor-pointer" x-text="(profile.connections || 75) + ' koneksi'"></span></div>
            </div>

            <template x-if="profile.linkedin || profile.github || profile.website || profile.email">
              <div class="${detail ? "pt-4" : "pt-3"} border-t border-gray-100 flex flex-wrap items-center gap-2.5 text-[15px]">
                <span class="text-gray-500 font-medium text-[15px] mr-1">Tautan:</span>
                ${linkChip("linkedin", "profile.linkedin", "bg-[#0A66C2]", `<svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>`, " flex-shrink-0")}
                ${linkChip("github", "profile.github", "bg-gray-900", `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>`)}
                ${linkChip("website", "profile.website", "bg-gray-700", `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>`)}
                ${linkChip("email", "'mailto:' + profile.email", "bg-[#1E3A8A]", `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>`)}
              </div>
            </template>
          </div>
        </div>
      </div>

      <div id="section-about" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <h3 class="text-[20px] font-bold text-gray-900 tracking-tight">Tentang Saya</h3>
          </div>
          ${detail ? "" : `<button id="btn-edit-about" aria-label="Edit Tentang Saya" @click="editAboutOpen = true"
            class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>`}
        </div>
        <p class="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line"><span x-text="aboutExpanded ? profile.about : profile.about.length > 280 ? profile.about.slice(0, 280) + '... ' : profile.about"></span><template x-if="profile.about.length > 280"><button id="btn-toggle-about" @click="aboutExpanded = !aboutExpanded" class="text-[#1E3A8A] hover:underline font-semibold text-[15px] cursor-pointer ml-1 inline-block" x-text="aboutExpanded ? 'Tutup ringkasan' : 'Baca selengkapnya'"></button></template></p>
      </div>`;
};

// ===================== MODAL COVER / AVATAR / LOGO + MODAL KOMPONEN =====================
ALUMNI_PARTIALS["profile-modals"] = () => {
  const urlInput = "w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-[15px] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 font-medium";
  const btnCancel = "px-5 py-2.5 border border-gray-300 rounded-lg text-[15px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer";
  const btnSave = "px-6 py-2.5 bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white rounded-lg text-[15px] font-semibold transition-colors shadow-sm cursor-pointer";
  const pickBtn = (id, ref) => `<button type="button" ${id ? `id="${id}"` : ""} @click="$refs.${ref}.click()"
            class="bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-full text-[15px] font-semibold shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">${UPLOAD_PATH}</svg>
            <span>Pilih Berkas Foto Komputer</span>
          </button>`;

  const coverBody = `<div class="space-y-5 text-[15px]">
          <div class="p-4 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/40 text-center">
            <div class="w-12 h-12 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${UPLOAD_PATH}</svg>
            </div>
            <p class="font-semibold text-gray-800 text-[15px]">Upload Foto dari Komputer</p>
            <p class="text-[13px] text-gray-500 mt-1 mb-3">Format PNG, JPG, WEBP disarankan (Rasio 3:1 atau minimal 1200x400 px)</p>
            <button type="button" id="btn-pilih-file-cover" @click="$refs.coverFileInput.click()"
              class="bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg text-[15px] font-semibold shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <polyline points="21 15 16 10 5 21" stroke="currentColor" stroke-width="2" />
              </svg>
              <span>Pilih Berkas Foto</span>
            </button>
          </div>
          <div>
            <label class="block font-semibold text-gray-700 mb-1">Atau Gunakan Link / URL Gambar</label>
            <input type="url" x-model="coverUrlDraft" placeholder="https://images.unsplash.com/... atau URL foto lainnya"
              class="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-gray-900 text-[15px] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 font-medium">
          </div>
          <template x-if="coverUrlDraft">
            <div>
              <p class="text-[13px] font-semibold text-gray-600 mb-1">Pratinjau Foto Cover:</p>
              <div class="h-28 rounded-lg overflow-hidden border border-gray-200 relative">
                <img :src="coverUrlDraft" alt="Preview Cover" class="w-full h-full object-cover">
                <button type="button" @click="coverUrlDraft = ''" class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-[13px] px-2.5 py-1 rounded shadow cursor-pointer">Hapus Foto</button>
              </div>
            </div>
          </template>
          <div>
            <label class="block font-semibold text-gray-700 mb-2">Atau Pilih Tema Gradien Bengkel Koding:</label>
            <div class="grid grid-cols-2 gap-2.5">
              <template x-for="(theme, i) in COVER_THEMES" :key="i">
                <button type="button" @click="selectedGradient = theme.val; coverUrlDraft = ''"
                  class="p-2.5 rounded-lg border text-left transition-colors cursor-pointer"
                  :class="!coverUrlDraft && selectedGradient === theme.val ? 'border-[#1E3A8A] bg-blue-50/70 ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'">
                  <div :class="'h-8 w-full rounded bg-gradient-to-r ' + theme.val + ' mb-1.5'"></div>
                  <p class="text-[13px] font-semibold text-gray-800 truncate" x-text="theme.name"></p>
                </button>
              </template>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button type="button" @click="handleResetCoverToDefault()" class="text-[15px] text-red-600 hover:underline font-semibold cursor-pointer">Reset ke Default</button>
          <div class="flex items-center gap-2.5">
            <button @click="editCoverOpen = false" class="${btnCancel}">Batal</button>
            <button @click="handleSaveCover()" class="${btnSave}">Terapkan Cover</button>
          </div>
        </div>`;

  const avatarBody = `<div class="space-y-4 text-[15px] text-center">
          <div class="flex justify-center py-2">
            <img :src="avatarUrlDraft || DEFAULT_AVATAR" alt="Preview Avatar" class="w-44 h-44 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-xl object-cover ring-2 ring-blue-100">
          </div>
          ${pickBtn("btn-pilih-avatar-file", "avatarFileInput")}
          <div class="text-left pt-2">
            <label class="block text-[15px] font-semibold text-gray-700 mb-1">Atau Gunakan Link URL Foto:</label>
            <input type="url" x-model="avatarUrlDraft" placeholder="https://..." class="${urlInput}">
          </div>
        </div>
        <div class="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-gray-100">
          <button @click="avatarModalOpen = false" class="${btnCancel}">Batal</button>
          <button @click="avatarModalOpen = false; profile.avatarUrl = avatarUrlDraft" class="${btnSave}">Simpan Foto</button>
        </div>`;

  const logoBody = `<div class="space-y-4 text-[15px] text-center">
          <div class="flex justify-center py-2">
            <div class="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl bg-blue-50/80 overflow-hidden ring-2 ring-blue-100 flex items-center justify-center">
              <template x-if="logoModalDraft"><img :src="logoModalDraft" alt="Preview Logo" class="w-full h-full object-cover"></template>
              <template x-if="!logoModalDraft">
                <div class="text-[#1E3A8A] flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span class="text-[13px] font-semibold mt-1">Belum Ada Foto</span>
                </div>
              </template>
            </div>
          </div>
          ${pickBtn("", "entityFileInput")}
          <div class="text-left pt-2">
            <label class="block text-[15px] font-semibold text-gray-700 mb-1">Atau Gunakan Tautan / Link URL Foto:</label>
            <input type="url" x-model="logoModalDraft" placeholder="https://..." class="${urlInput}">
          </div>
        </div>
        <div class="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-gray-100">
          <button @click="logoModalOpen = false" class="${btnCancel}">Batal</button>
          <button @click="handleSaveEntityLogo()" class="${btnSave}">Simpan Foto Logo</button>
        </div>`;

  const P = ALUMNI_PARTIALS;
  return `${pageModalHTML({
    id: "modal-ubah-cover",
    open: "editCoverOpen",
    close: "editCoverOpen = false",
    title: "'Ubah Foto Cover Banner'",
    subtitle: "'Pilih foto dari komputer Anda, masukkan URL gambar, atau pilih tema gradien resmi.'",
    body: coverBody,
  })}

      <input type="file" x-ref="entityFileInput" accept="image/*" class="hidden" @change="handleEntityFileUpload($event)">

      ${pageModalHTML({
        id: "modal-ganti-avatar",
        open: "avatarModalOpen",
        close: "avatarModalOpen = false",
        title: "'Ganti Foto Profil Alumni'",
        subtitle: "'Pilih foto langsung dari komputer Anda atau masukkan link gambar.'",
        body: avatarBody,
      })}

      ${pageModalHTML({
        id: "modal-ganti-logo-entitas",
        open: "logoModalOpen",
        close: "logoModalOpen = false",
        title: "logoModalTitle",
        subtitle: "'Kustomisasi foto lingkaran untuk: ' + ((logoModalTarget && logoModalTarget.title) || '')",
        body: logoBody,
      })}

      ${P["modal-edit-profile"]()}
      ${P["modal-edit-about"]()}
      ${P["modal-add-skills"]()}
      ${P["modal-edit-skill"]()}
      ${P["modal-edit-honors"]()}
      ${P["modal-add-honor"]()}
      ${P["modal-add-org"]()}
      ${P["modal-edit-org"]()}
      ${P["modal-add-edu"]()}
      ${P["modal-edit-edu"]()}
      ${P["modal-add-project"]()}
      ${P["modal-edit-project"]()}`;
};

// ===================== PRATINJAU PUBLIK + HAPUS POSTINGAN + LIGHTBOX PROYEK =====================
ALUMNI_PARTIALS["profile-preview"] = () => {
  const previewBody = `<div class="space-y-4">
          <div class="px-6 py-3.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between -mx-6 -mt-6 mb-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span class="text-[13px] text-gray-500 ml-2" x-text="'bengkelkoding.dinus.ac.id/alumni/' + profile.name.toLowerCase().split(/\\s+/).join('-')"></span>
            </div>
          </div>
          <div class="p-4 bg-blue-50/80 border border-blue-200/80 rounded-xl text-center">
            <span class="text-3xl">🎓</span>
            <h4 class="text-[18px] font-bold text-[#1E3A8A] mt-1.5">Kartu Profil Publik Bengkel Koding</h4>
            <p class="text-[15px] text-gray-600 mt-1 max-w-md mx-auto leading-relaxed">
              Tampilan resmi ini dapat diakses oleh mitra industri, rekruter perusahaan rekanan, dan mahasiswa umum.
            </p>
          </div>
          <div class="border border-gray-200 rounded-xl p-5 bg-white shadow-xs flex items-center gap-4">
            <div class="w-28 h-28 rounded-full overflow-hidden border-4 border-white ring-2 ring-blue-100 flex-shrink-0 shadow-md bg-gray-100">
              <template x-if="profile.avatarUrl && !avatarBroken">
                <img :alt="profile.name" class="w-full h-full object-cover" :src="profile.avatarUrl" @error="avatarBroken = true">
              </template>
              <template x-if="!(profile.avatarUrl && !avatarBroken)">
                <div class="w-full h-full bg-[#1E3A8A] flex items-center justify-center text-white text-2xl font-bold" x-text="profile.name.slice(0, 2).toUpperCase()"></div>
              </template>
            </div>
            <div>
              <h5 class="text-[18px] font-bold text-gray-900" x-text="profile.name"></h5>
              <p class="text-[15px] font-medium text-gray-600 mt-0.5" x-text="profile.headline"></p>
              <p class="text-[14px] text-gray-600 font-medium mt-1" x-text="'Lulusan Batch ' + profile.batch"></p>
              <p class="text-[14px] text-emerald-700 font-semibold mt-0.5">Terverifikasi Resmi</p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end -mx-6 -mb-6 mt-6">
          <button @click="publicPreviewOpen = false" class="px-5 py-2.5 bg-[#1E3A8A] text-white rounded-full text-[15px] font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer">Tutup Pratinjau</button>
        </div>`;
  return `${pageModalHTML({
    id: "modalPreview",
    open: "publicPreviewOpen",
    close: "publicPreviewOpen = false",
    title: "'Pratinjau Halaman Terbuka Publik'",
    subtitle: "'Ini adalah tampilan kartu publik yang dapat diakses oleh recruiter mitra dan publik.'",
    body: previewBody,
  })}

      <template x-teleport="body">
        <template x-if="deleteTargetId !== null">
          <div class="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div class="bg-white rounded-xl border border-gray-200 shadow-xl max-w-sm w-full p-6">
              <div class="flex flex-col items-center text-center gap-3">
                <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <h3 class="text-[17px] font-bold text-gray-900">Hapus Postingan Ini?</h3>
                <p class="text-[15px] text-gray-500 leading-relaxed">Postingan aktivitas ini akan dihapus secara permanen dari linimasa portofolio Anda.</p>
              </div>
              <div class="flex items-center gap-3 mt-6">
                <button @click="deleteTargetId = null" class="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-[15px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">Batal</button>
                <button @click="handleConfirmDelete()" class="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-[15px] font-semibold transition-colors shadow-sm cursor-pointer">Hapus</button>
              </div>
            </div>
          </div>
        </template>
      </template>

      ${lightboxHTML({
        state: "projectLightbox",
        close: "projectLightbox = null",
        linkLabel: "Pratinjau tautan proyek",
        emptyLabel: "Gambar proyek belum tersedia",
        fallbackDesc: "Pratinjau gambar proyek",
        buttonLabel: "Buka Tautan Proyek",
        badgeTitle: "Buka tautan proyek",
      })}`;
};

// ===================== PROYEK, KEAHLIAN, PENGHARGAAN, ORGANISASI, PENDIDIKAN, SERTIFIKASI =====================
ALUMNI_PARTIALS["profile-bottom"] = ({ variant }) => {
  const detail = variant === "detail";
  const sectionHead = (title, countExpr, buttons) => `<div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            ${countExpr ? `<div class="flex items-center gap-2.5">
              <h3 class="text-[20px] font-bold text-gray-900 tracking-tight">${title}</h3>
              ${COUNT_BADGE(countExpr)}
            </div>` : `<h3 class="text-[20px] font-bold text-gray-900 tracking-tight">${title}</h3>`}
          </div>
          <div class="flex items-center gap-1">
            ${detail ? "" : buttons}
          </div>
        </div>`;
  const toggleAll = (id, flag, showLabel) => `<div class="mt-4 pt-2">
            <button id="${id}" @click="${flag} = !${flag}" :aria-expanded="${flag}"
              class="w-full px-5 py-2.5 rounded-full border border-gray-200/90 hover:border-blue-300 hover:bg-blue-50/40 text-[15px] font-semibold text-[#1E3A8A] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer">
              <span x-text="${flag} ? 'Tampilkan lebih sedikit' : ${showLabel}"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" :class="${flag} ? '-rotate-90 transition-transform' : 'transition-transform'">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>`;

  const projects = `<div id="section-projects" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        ${sectionHead("Proyek &amp; Portofolio", "projects.length", SECTION_ADD_BTN("btn-add-project", "addProjectOpen", "Tambah proyek") + SECTION_EDIT_BTN("btn-edit-project", "editProjectOpen", "Edit proyek"))}
        <div class="space-y-4 pt-4">
          <template x-if="projects.length === 0">
            <p class="text-center text-[15px] text-gray-500 py-8">${detail ? 'Belum ada proyek yang dipublikasikan.' : 'Belum ada proyek. Klik tanda + untuk menambahkan.'}</p>
          </template>
          <template x-for="proj in visibleProjects" :key="proj.id">
            <article class="p-5 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-blue-200/80 hover:bg-blue-50/20 transition-colors duration-200">
              <div class="flex flex-col sm:flex-row items-start gap-5">
                <div class="relative group w-full h-40 sm:w-36 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden border border-blue-200/80 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
                  <button type="button" @click="openProjectLightbox(proj)" class="flex w-full h-full items-center justify-center text-[#1E3A8A] cursor-pointer"
                    :title="proj.imageUrl ? 'Lihat gambar proyek' : proj.title" :aria-label="'Lihat proyek ' + proj.title">
                    <template x-if="proj.imageUrl"><img :src="proj.imageUrl" :alt="proj.title" class="w-full h-full object-cover"></template>
                    <template x-if="!proj.imageUrl && proj.linkUrl">
                      <img :src="faviconFor(proj.linkUrl)" alt="Ikon tautan proyek" class="w-12 h-12 object-contain" @error="$el.src = 'assets/img/gambar-kosong.png'">
                    </template>
                    <template x-if="!proj.imageUrl && !proj.linkUrl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.6" />
                        <circle cx="9" cy="9" r="1.6" stroke="currentColor" stroke-width="1.6" />
                        <path d="M3.5 16l5-5 4 4 3-3 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </template>
                    <span class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gray-900/45 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
                        <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                      </svg>
                      <span class="text-[12px] font-semibold">Lihat</span>
                    </span>
                  </button>
                  <template x-if="proj.linkUrl">
                    <a :href="normalizeUrl(proj.linkUrl)" target="_blank" rel="noopener noreferrer" @click.stop
                      class="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-md ring-2 ring-white transition-colors cursor-pointer z-10"
                      title="Buka tautan proyek" :aria-label="'Buka tautan proyek ' + proj.title">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </a>
                  </template>
                  ${detail ? "" : `<button type="button" @click="handleOpenLogoModal('project', proj.id, proj.title, proj.imageUrl)"
                    class="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/95 text-[#1E3A8A] flex items-center justify-center shadow-sm border border-blue-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-white transition-opacity cursor-pointer"
                    title="Ubah foto proyek" aria-label="Ubah foto proyek">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none">${CAMERA_PATH}<circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2" /></svg>
                  </button>`}
                </div>

                <div class="flex-1 min-w-0 text-left">
                  <h4 class="text-[17px] font-semibold text-gray-900 leading-snug">
                    <template x-if="proj.linkUrl"><a :href="normalizeUrl(proj.linkUrl)" target="_blank" rel="noopener noreferrer" class="hover:text-[#1E3A8A] transition-colors" x-text="proj.title"></a></template>
                    <template x-if="!proj.linkUrl"><span x-text="proj.title"></span></template>
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[14px] text-gray-500 font-medium" x-text="proj.period"></span>
                  </div>
                  <p class="text-[15px] text-gray-600 mt-2.5 leading-relaxed"><span x-text="expandedProjIds[proj.id] ? proj.desc : proj.desc.length > 200 ? proj.desc.slice(0, 200) + '…' : proj.desc"></span><template x-if="proj.desc.length > 200"><span> <button type="button" @click="expandedProjIds = { ...expandedProjIds, [proj.id]: !expandedProjIds[proj.id] }" class="text-[#1E3A8A] font-semibold text-[15px] hover:underline cursor-pointer" x-text="expandedProjIds[proj.id] ? 'lebih sedikit' : 'selengkapnya'"></button></span></template></p>
                  <div class="mt-4 pt-4 border-t border-gray-200/70 flex flex-wrap items-center gap-2.5">
                    <template x-for="c in projectContributors(proj)" :key="c.id || c.name">
                      <span class="inline-flex items-center gap-3 h-12 pl-1.5 pr-6 rounded-full bg-blue-50 border border-blue-100 text-[14px] text-[#1E3A8A]">
                        <span class="w-9 h-9 rounded-full bg-blue-100 overflow-hidden flex-shrink-0 border border-blue-200">
                          <template x-if="c.avatarUrl"><img :src="c.avatarUrl" :alt="c.name" class="w-full h-full object-cover"></template>
                          <template x-if="!c.avatarUrl">
                            <svg viewBox="0 0 32 32" class="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
                              <rect width="32" height="32" fill="#DBEAFE" />
                              <circle cx="16" cy="13" r="5.5" fill="#6F8FC9" />
                              <path d="M4 32c0-7.5 5.4-12 12-12s12 4.5 12 12z" fill="#9DB5E3" />
                            </svg>
                          </template>
                        </span>
                        <template x-if="projectContributorHref(proj, c)">
                          <a :href="alumniPageHref(projectContributorHref(proj, c))" class="font-semibold text-[#1E3A8A] hover:underline" :title="'Buka halaman ' + c.name" x-text="'Kontributor: ' + c.name"></a>
                        </template>
                        <template x-if="!projectContributorHref(proj, c)">
                          <span class="font-semibold text-[#1E3A8A]" x-text="'Kontributor: ' + c.name"></span>
                        </template>
                      </span>
                    </template>
                    <template x-for="tag in proj.tags" :key="tag">
                      <span class="${CHIP}" x-text="tag"></span>
                    </template>
                  </div>
                </div>
              </div>
            </article>
          </template>
        </div>
        <template x-if="projects.length > PROJECTS_PREVIEW">
          ${toggleAll("btn-toggle-projects", "showAllProjects", "'Tampilkan semua ' + projects.length + ' proyek'")}
        </template>
      </div>`;

  const skills = `<div id="section-skills" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        ${sectionHead("Keahlian &amp; Kompetensi", "skills.length", SECTION_ADD_BTN("btn-add-skill", "addSkillsOpen", "Tambah keahlian") + SECTION_EDIT_BTN("btn-edit-skill", "editSkillOpen", "Edit keahlian"))}
        <div class="space-y-3.5 pt-4">
          <template x-if="skills.length === 0">
            <p class="text-center text-[15px] text-gray-500 py-8">${detail ? 'Belum ada keahlian terdaftar.' : 'Belum ada keahlian. Klik tanda + untuk menambahkan.'}</p>
          </template>
          <template x-for="skill in visibleSkills" :key="skill.id">
            <div class="p-4 sm:p-5 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-blue-200/80 hover:bg-blue-50/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
              <div class="min-w-0">
                <h4 class="text-[17px] font-semibold text-gray-900 leading-snug" x-text="skill.name"></h4>
                <template x-if="linkedItemsOf(skill).length > 0">
                  <ul class="mt-3 space-y-2.5">
                    <template x-for="item in linkedItemsOf(skill)" :key="item.key">
                      <li class="flex items-center gap-3 min-w-0">
                        ${PI.folder("w-6 h-6 text-gray-700 flex-shrink-0")}
                        <span class="text-[15px] text-gray-700 truncate" x-text="item.label"></span>
                      </li>
                    </template>
                  </ul>
                </template>
              </div>
              <div class="flex-shrink-0 self-start sm:self-center">
                <span class="inline-flex items-center justify-center gap-2 w-[200px] h-12 rounded-full bg-blue-50 border border-blue-100 text-[#1E3A8A] text-[14px] font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span x-text="skill.level || 'Tingkat Menengah'"></span>
                </span>
              </div>
            </div>
          </template>
        </div>
        <template x-if="skills.length > SKILLS_PREVIEW">
          ${toggleAll("btn-toggle-skills", "showAllSkills", "'Tampilkan semua ' + skills.length + ' keahlian'")}
        </template>
      </div>`;

  const honors = `<div id="section-honors" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        ${sectionHead("Penghargaan &amp; Prestasi", "honors.length", SECTION_ADD_BTN("btn-add-honor", "addHonorOpen", "Tambah penghargaan") + SECTION_EDIT_BTN("btn-edit-honor", "editHonorsOpen", "Edit penghargaan"))}
        <div class="pt-4">
          <template x-if="honors.length === 0">
            <p class="text-center text-[15px] text-gray-500 py-8">${detail ? 'Belum ada penghargaan yang dicantumkan.' : 'Belum ada penghargaan. Klik tanda + untuk menambahkan.'}</p>
          </template>
          <template x-if="honors.length > 0">
            <div class="space-y-4">
              <template x-for="honor in honors" :key="honor.id">
                <div class="p-5 sm:p-6 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-blue-200/80 hover:bg-blue-50/20 transition-colors duration-200">
                  <div class="flex items-start gap-4">
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-wrap items-center justify-between gap-2">
                        <h4 class="text-[17px] font-semibold text-gray-900 leading-snug" x-text="honor.title"></h4>
                        <template x-if="honor.date"><span class="${CHIP} flex-shrink-0" x-text="honor.date"></span></template>
                      </div>
                      <template x-if="honor.media && (honor.media.imageUrl || honor.media.linkUrl || (honor.media.items || []).length > 0)">
                        ${honorMediaThumbHTML("honor.media")}
                      </template>
                      <p class="text-[15px] text-gray-600 font-medium mt-1" x-text="'Diberikan oleh ' + honor.issuer"></p>
                      <template x-if="relatedEduOf(honor)">
                        <div class="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-blue-50 border border-blue-100 text-[14px] text-[#1E3A8A] font-semibold mt-3">
                          ${AFFILIATED_ICON}
                          <span x-text="'Terafiliasi dengan ' + relatedEduOf(honor).name"></span>
                        </div>
                      </template>
                      <template x-if="honor.description"><p class="text-[15px] text-gray-600 mt-3 leading-relaxed" x-text="honor.description"></p></template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>`;

  const organizations = `<div id="section-organizations" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        ${sectionHead("Organisasi &amp; Kepemimpinan", "organizations.length", SECTION_ADD_BTN("btn-add-organization", "addOrgOpen", "Tambah organisasi") + SECTION_EDIT_BTN("btn-edit-organization", "editOrgOpen", "Edit organisasi"))}
        <div class="divide-y divide-gray-100 pt-2">
          <template x-if="organizations.length === 0">
            <p class="text-center text-[15px] text-gray-500 py-8">${detail ? 'Belum ada organisasi yang dicantumkan.' : 'Belum ada organisasi. Klik tanda + untuk menambahkan.'}</p>
          </template>
          <template x-for="(org, idx) in organizations" :key="org.id">
            <div class="py-5" :class="idx === 0 ? 'pt-2' : ''">
              <div class="flex-1 min-w-0">
                <h4 class="text-[17px] font-semibold text-gray-900 leading-snug" x-text="org.name"></h4>
                <p class="text-[15px] text-gray-700 font-medium mt-1" x-text="org.role"></p>
                <p class="text-[14px] text-gray-500 mt-0.5" x-text="org.period"></p>
                <template x-if="org.affiliated">
                  <div class="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-blue-50 border border-blue-100 text-[14px] text-[#1E3A8A] font-semibold mt-3">
                    ${AFFILIATED_ICON}
                    <span x-text="'Terafiliasi dengan ' + org.affiliated"></span>
                  </div>
                </template>
                <template x-if="org.desc"><p class="text-[15px] text-gray-600 mt-2.5 leading-relaxed" x-text="org.desc"></p></template>
                <template x-if="org.tags.length > 0">
                  <div class="flex flex-wrap gap-2.5 mt-3">
                    <template x-for="tag in org.tags" :key="tag"><span class="${CHIP}" x-text="tag"></span></template>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>`;

  const education = `<div id="section-education" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        ${sectionHead("Riwayat Pendidikan", "", SECTION_ADD_BTN("btn-add-education", "addEducationOpen", "Tambah pendidikan") + SECTION_EDIT_BTN("btn-edit-education", "editEducationOpen", "Edit pendidikan"))}
        <div class="divide-y divide-gray-100 pt-2">
          <template x-for="(edu, idx) in educations" :key="edu.id">
            <div class="py-5 flex items-start gap-4" :class="[idx === 0 ? 'pt-2' : '', idx === educations.length - 1 ? 'pb-0' : '']">
              ${detail ? `<div class="${LOGO_BUTTON} cursor-default" x-bind:title="edu.name">
                ${educationLogoHTML("edu.name", "edu.logoUrl", "text-[22px]")}
              </div>` : `<div @click="handleOpenLogoModal('school', edu.id, edu.name, edu.logoUrl)" class="${LOGO_BUTTON}" title="Klik untuk mengubah logo sekolah / universitas">
                ${educationLogoHTML("edu.name", "edu.logoUrl", "text-[22px]")}
                ${LOGO_OVERLAY}
              </div>`}
              <div class="flex-1 min-w-0">
                <h4 class="text-[17px] font-semibold text-gray-900 leading-snug" x-text="edu.name"></h4>
                <p class="text-[15px] text-gray-700 font-medium mt-1" x-text="edu.degree ? edu.degree + ' ' + edu.major : edu.major"></p>
                <p class="text-[14px] text-gray-500 mt-1" x-text="edu.period"></p>
                <p class="text-[14px] text-gray-500 mt-2.5 font-medium">Mata Kuliah Relevan:</p>
                <div class="flex flex-wrap gap-2.5 mt-3">
                  <template x-for="tag in edu.tags" :key="tag"><span class="${CHIP}" x-text="tag"></span></template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>`;

  const certLogo = detail
    ? `<div class="${LOGO_BUTTON} font-bold text-[13px] cursor-default">
         <template x-if="cert.logoUrl"><img :src="cert.logoUrl" :alt="cert.name" class="w-full h-full object-cover"></template>
         <template x-if="!cert.logoUrl"><span x-text="cert.logoLabel"></span></template>
       </div>`
    : `<div @click="handleOpenLogoModal('cert', cert.id, cert.name, cert.logoUrl)" class="${LOGO_BUTTON} font-bold text-[13px]" title="Klik untuk mengubah logo sertifikat">
         <template x-if="cert.logoUrl"><img :src="cert.logoUrl" :alt="cert.name" class="w-full h-full object-cover"></template>
         <template x-if="!cert.logoUrl"><span x-text="cert.logoLabel"></span></template>
         ${LOGO_OVERLAY}
       </div>`;
  const certInfo = `<div class="flex-1 min-w-0">
                <h4 class="text-[17px] font-semibold text-gray-900 leading-snug" x-text="cert.name"></h4>
                <p class="text-[15px] text-gray-700 font-medium mt-1" x-text="cert.issuer"></p>
                <p class="text-[14px] text-gray-500 mt-1" x-text="cert.date"></p>
                <p class="text-[14px] font-medium text-gray-600 mt-0.5" x-text="'ID Kredensial: ' + cert.credId"></p>
                <div class="flex flex-wrap gap-2.5 mt-3">
                  <template x-for="tag in cert.tags" :key="tag"><span class="${CHIP}" x-text="tag"></span></template>
                </div>
                <div class="mt-3.5">
                  <a :href="${detail ? "cert.url" : "cert.url ? (cert.url.startsWith('http') ? cert.url : 'https://' + cert.url) : '#'"}" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A8A] text-white text-[15px] font-semibold hover:bg-[#1D4ED8] transition-colors shadow-xs cursor-pointer">
                    <span>Lihat Kredensial Resmi</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </a>
                </div>
              </div>`;
  const certList = detail
    ? `<div class="divide-y divide-gray-100 pt-2">
          <template x-for="(cert, idx) in certifications" :key="cert.id">
            <div class="py-5 flex items-start gap-4" :class="[idx === 0 ? 'pt-2' : '', idx === certifications.length - 1 ? 'pb-0' : '']">
              ${certLogo}
              ${certInfo}
            </div>
          </template>
        </div>`
    : `<div class="space-y-4 pt-4">
          <template x-for="cert in certifications" :key="cert.id">
            <div class="p-5 sm:p-6 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-blue-200/80 hover:bg-blue-50/20 transition-colors duration-200">
              <div class="flex items-start gap-4">
              ${certLogo}
              ${certInfo}
              </div>
            </div>
          </template>
        </div>`;
  const certifications = `<div id="section-certifications" class="bg-white rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        ${sectionHead(
          "Lisensi &amp; Sertifikasi",
          "certifications.length",
          detail
            ? ""
            : SECTION_ADD_BTN("btn-add-certification", "addCertificationOpen", "Tambah sertifikasi") + SECTION_EDIT_BTN("btn-edit-certification", "editCertificationOpen", "Edit sertifikasi")
        )}
        ${certList}
        <div class="mt-4 pt-2">
          <button class="w-full px-5 py-2.5 rounded-full border border-gray-200/90 hover:border-blue-300 hover:bg-blue-50/40 text-[15px] font-semibold text-[#1E3A8A] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <span>Tampilkan semua 23 sertifikasi</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>`;

  const toast = `<template x-if="toast">
        <div role="status" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-gray-900 text-white text-[15px] font-semibold shadow-xl">
          <span class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <span x-text="toast"></span>
        </div>
      </template>`;

  return [projects, skills, honors, organizations, education, certifications, toast].join("\n\n      ");
};

// ===================== STATE HALAMAN (profil/page.tsx & [id]/page.tsx) =====================
// extra: state & method tambahan khusus halaman (init-nya dijalankan setelah init dasar)
function profilePageData(variant = "profil", extra = {}, initialData = null) {
  const profileSrc = (initialData && initialData.profile) ? initialData.profile : INITIAL_PROFILE;
  const postsSrc = (initialData && initialData.posts) ? initialData.posts : (variant === "detail" ? DETAIL_INITIAL_POSTS : INITIAL_POSTS);
  const projectsSrc = (initialData && initialData.projects) ? initialData.projects : INITIAL_PROJECTS;
  const orgsSrc = (initialData && initialData.organizations) ? initialData.organizations : INITIAL_ORGANIZATIONS;
  const edusSrc = (initialData && initialData.educations) ? initialData.educations : INITIAL_EDUCATIONS;
  const certsSrc = (initialData && initialData.certifications) ? initialData.certifications : INITIAL_CERTIFICATIONS;
  const skillsSrc = (initialData && initialData.skills) ? initialData.skills : INITIAL_SKILLS;
  const honorsSrc = (initialData && initialData.honors) ? initialData.honors : [];

  const base = {
    COVER_THEMES,
    DEFAULT_AVATAR,
    POSTS_PREVIEW,
    SKILLS_PREVIEW,
    PROJECTS_PREVIEW,
    profile: JSON.parse(JSON.stringify(profileSrc)),
    posts: JSON.parse(JSON.stringify(postsSrc)),
    projects: JSON.parse(JSON.stringify(projectsSrc)),
    organizations: JSON.parse(JSON.stringify(orgsSrc)),
    educations: JSON.parse(JSON.stringify(edusSrc)),
    certifications: JSON.parse(JSON.stringify(certsSrc)),
    skills: JSON.parse(JSON.stringify(skillsSrc)),
    honors: JSON.parse(JSON.stringify(honorsSrc)),
    recommendedPeople: (initialData && initialData.recommendedPeople) ? initialData.recommendedPeople : [],

    addOrgOpen: false,
    editOrgOpen: false,
    addEducationOpen: false,
    editEducationOpen: false,
    addCertificationOpen: false,
    editCertificationOpen: false,
    editCoverOpen: false,
    coverUrlDraft: profileSrc.coverImageUrl || "",
    selectedGradient: profileSrc.coverGradient || "from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]",
    avatarModalOpen: false,
    avatarUrlDraft: profileSrc.avatarUrl || DEFAULT_AVATAR,
    avatarBroken: false,
    editProfileOpen: false,
    editAboutOpen: false,
    addSkillsOpen: false,
    editSkillOpen: false,
    showAllSkills: false,
    editHonorsOpen: false,
    addHonorOpen: false,
    addProjectOpen: false,
    editProjectOpen: false,
    showAllProjects: false,
    showAllPosts: false,
    expandedProjIds: {},
    publicPreviewOpen: false,
    projectLightbox: null,
    logoModalOpen: false,
    logoModalTarget: null,
    logoModalDraft: "",
    aboutExpanded: false,
    toast: "",
    toastTimer: null,
    deleteTargetId: null,

    init() {
      if (variant !== "detail" && this.$el && typeof this.$el.addEventListener === "function") {
        bindProfileModalEvents(this.$el, this);
      }
      if (typeof this.$watch === "function") {
        this.$watch("profile.avatarUrl", () => (this.avatarBroken = false));
        this.$watch("toast", (v) => {
          clearTimeout(this.toastTimer);
          if (v) this.toastTimer = setTimeout(() => (this.toast = ""), 2600);
        });
      }
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.projectLightbox) this.projectLightbox = null;
      });
    },

    get linkGroups() {
      return [
        { type: "education", label: "Pendidikan", items: this.educations.map((edu) => ({ id: String(edu.id), label: edu.name })) },
        { type: "certification", label: "Lisensi & sertifikasi", items: this.certifications.map((cert) => ({ id: String(cert.id), label: cert.name })) },
        { type: "organization", label: "Organisasi", items: this.organizations.map((org) => ({ id: String(org.id), label: org.name })) },
        { type: "project", label: "Proyek & portofolio", items: this.projects.map((proj) => ({ id: String(proj.id), label: proj.title })) },
        { type: "honor", label: "Penghargaan", items: this.honors.map((hon) => ({ id: String(hon.id), label: hon.title })) },
      ];
    },
    get visibleSkills() {
      return this.showAllSkills ? this.skills : this.skills.slice(0, SKILLS_PREVIEW);
    },
    get visibleProjects() {
      return this.showAllProjects ? this.projects : this.projects.slice(0, PROJECTS_PREVIEW);
    },
    get visiblePosts() {
      return this.showAllPosts ? this.posts : this.posts.slice(0, this.POSTS_PREVIEW || 1);
    },
    get logoModalTitle() {
      const t = this.logoModalTarget && this.logoModalTarget.type;
      if (t === "school") return "Ubah Logo Sekolah / Universitas";
      if (t === "cert") return "Ubah Logo Sertifikat / Lisensi";
      if (t === "org") return "Ubah Logo Organisasi";
      return "Ubah Foto Proyek / Portofolio";
    },

    // Keahlian: item terkait (links), jatuh ke projectIds lama
    linkedItemsOf(skill) {
      const items = [];
      for (const link of skill.links || []) {
        const group = this.linkGroups.find((g) => g.type === link.type);
        const item = group && group.items.find((it) => it.id === link.id);
        if (item) items.push({ label: item.label, key: `${link.type}-${link.id}` });
      }
      if (items.length === 0) {
        const projectLinks = (skill.links || []).filter((l) => l.type === "project");
        const legacyIds = (skill.projectIds || []).map(String);
        const allIds = [...new Set([...projectLinks.map((l) => l.id), ...legacyIds])];
        allIds
          .map((id) => this.projects.find((p) => String(p.id) === id))
          .filter(Boolean)
          .forEach((p) => items.push({ label: p.title, key: `project-${p.id}` }));
      }
      return items;
    },
    relatedEduOf(honor) {
      return honor.relatedEducationId ? this.educations.find((e) => String(e.id) === honor.relatedEducationId) || null : null;
    },

    openProjectLightbox(proj) {
      const primaryMedia = getPrimaryProjectMedia(proj);
      if (primaryMedia) {
        this.projectLightbox = {
          imageUrl: primaryMedia.kind === "image" ? primaryMedia.url : primaryMedia.thumbnail || "",
          title: primaryMedia.title,
          description: primaryMedia.description,
          linkUrl: primaryMedia.kind === "link" ? primaryMedia.url : undefined,
        };
      } else {
        this.projectLightbox = { imageUrl: proj.imageUrl || "", title: proj.title, description: "Pratinjau gambar proyek", linkUrl: proj.linkUrl };
      }
    },

    // Cover, avatar & logo entitas
    readImage(e, done) {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => ev.target.result && done(ev.target.result);
        reader.readAsDataURL(file);
      }
      e.target.value = "";
    },
    handleCoverFileUpload(e) {
      this.readImage(e, (src) => {
        this.coverUrlDraft = src;
        this.profile.coverImageUrl = src;
        this.editCoverOpen = false;
      });
    },
    handleAvatarFileUpload(e) {
      this.readImage(e, (src) => {
        this.avatarUrlDraft = src;
        this.profile.avatarUrl = src;
        this.avatarModalOpen = false;
      });
    },
    handleEntityFileUpload(e) {
      this.readImage(e, (src) => (this.logoModalDraft = src));
    },
    handleSaveCover() {
      this.profile.coverImageUrl = this.coverUrlDraft;
      this.profile.coverGradient = this.selectedGradient;
      this.editCoverOpen = false;
    },
    handleResetCoverToDefault() {
      this.coverUrlDraft = "";
      this.profile.coverImageUrl = "";
      this.profile.coverGradient = "from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]";
      this.editCoverOpen = false;
    },
    handleOpenLogoModal(type, id, title, currentUrl) {
      this.logoModalTarget = { type, id, title, currentUrl };
      this.logoModalDraft = currentUrl || "";
      this.logoModalOpen = true;
    },
    handleSaveEntityLogo() {
      if (!this.logoModalTarget) return;
      const { type, id } = this.logoModalTarget;
      const set = (list, field) => list.map((item) => (item.id === id ? { ...item, [field]: this.logoModalDraft } : item));
      if (type === "school") this.educations = set(this.educations, "logoUrl");
      else if (type === "cert") this.certifications = set(this.certifications, "logoUrl");
      else if (type === "org") this.organizations = set(this.organizations, "logoUrl");
      else if (type === "project") this.projects = set(this.projects, "imageUrl");
      this.logoModalOpen = false;
    },

    // Hasil modal (event dari alumni-profile-modals.js)
    handleSaveProfile(next) {
      const oldName = this.profile.name;
      const shortHeadline = next.headline.length > 55 ? next.headline.slice(0, 52).trimEnd() + "..." : next.headline;
      this.posts = this.posts.map((p) => ({
        ...p,
        authorName: p.authorName === oldName ? next.name : p.authorName,
        authorHeadline: p.authorName === oldName ? shortHeadline : p.authorHeadline,
        repostedBy: p.repostedBy === oldName ? next.name : p.repostedBy,
      }));
      this.profile = next;
      this.editProfileOpen = false;
      this.toast = "Profil berhasil diperbarui";
    },
    handleModalEvent(name, detail) {
      switch (name) {
        case "about-save":
          this.profile.about = detail;
          this.editAboutOpen = false;
          break;
        case "skills-save":
          this.skills = detail;
          this.addSkillsOpen = false;
          this.editSkillOpen = false;
          break;
        case "skill-delete":
          this.skills = this.skills.filter((s) => s.id !== detail);
          this.editSkillOpen = false;
          break;
        case "honors-save":
          this.honors = detail;
          this.editHonorsOpen = false;
          break;
        case "honor-add":
          this.honors = [...this.honors, detail];
          this.addHonorOpen = false;
          break;
        case "org-add":
          this.organizations = [...this.organizations, detail];
          this.addOrgOpen = false;
          break;
        case "orgs-save":
          this.organizations = detail;
          this.editOrgOpen = false;
          break;
        case "edu-add":
          this.educations = [...this.educations, detail];
          this.addEducationOpen = false;
          break;
        case "edus-save":
          this.educations = detail;
          this.editEducationOpen = false;
          break;
        case "project-add":
          this.projects = [detail, ...this.projects];
          this.addProjectOpen = false;
          break;
        case "projects-save":
          this.projects = detail;
          this.editProjectOpen = false;
          break;
        case "cert-add":
          this.certifications = [detail, ...this.certifications];
          this.addCertificationOpen = false;
          this.toast = "Lisensi & sertifikasi berhasil ditambahkan";
          break;
        case "certs-save":
          this.certifications = detail;
          this.editCertificationOpen = false;
          this.toast = "Daftar lisensi & sertifikasi berhasil diperbarui";
          break;
      }
    },
  };
  const merged = mixData(base, extra);
  merged.init = function () {
    base.init.call(this);
    if (extra.init) extra.init.call(this);
  };
  return merged;
}

document.addEventListener("alpine:init", () => {
  Alpine.data("profilePage", profilePageData);
});

// Event dari modal (alumni-profile-modals.js) → handler profilePage
const PROFILE_MODAL_EVENTS = ["about-save", "skills-save", "skill-delete", "honors-save", "honor-add", "org-add", "orgs-save", "edu-add", "edus-save", "project-add", "projects-save", "cert-add", "certs-save"];

function bindProfileModalEvents(el, data) {
  if (!el || typeof el.addEventListener !== "function") return;
  el.addEventListener("profile-save", (e) => data.handleSaveProfile && data.handleSaveProfile(e.detail));
  PROFILE_MODAL_EVENTS.forEach((name) => el.addEventListener(name, (e) => data.handleModalEvent && data.handleModalEvent(name, e.detail)));
}

