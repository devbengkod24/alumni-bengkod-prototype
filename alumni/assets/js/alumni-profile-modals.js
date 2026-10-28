/**
 * Modal & widget halaman profil alumni:
 *   ProfileModals, SkillModals, HonorModals, OrganizationModals,
 *   EducationModals, EducationLogo, ProjectModals, CertificationModals,
 *   MediaPicker, MediaThumbs, ContributorPicker.
 * Markup ditulis sebagai potongan HTML (window.ALUMNI_PARTIALS) dan state sebagai komponen Alpine.
 */

window.ALUMNI_PARTIALS = window.ALUMNI_PARTIALS || {};

// ===================== IKON =====================
const PI = {
  close: (cls = "w-5 h-5") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`,
  chevron: (bind) => `<svg class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform" :class="${bind} ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>`,
  search: (cls = "w-4 h-4") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>`,
  check: (cls = "w-4 h-4", sw = "2.5") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>`,
  trash: (cls = "w-4 h-4") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>`,
  pencil: (cls = "w-4 h-4") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>`,
  plus: (cls = "w-5 h-5") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>`,
  folder: (cls = "w-5 h-5") => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path opacity="0.78" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h4.2c.6 0 1.2.24 1.6.66L11.5 6H19.5A2.5 2.5 0 0 1 22 8.5V10H2V6.5z" /><path d="M2 9.2h20v8.3a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5V9.2z" /></svg>`,
  link: (cls) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>`,
  image: (cls, sw = "2") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>`,
};

// ===================== KELAS REUSABLE =====================
const PC = {
  closeBtn: "w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer",
  btnOutline: "px-5 py-2 rounded-full border border-gray-300 text-[14px] font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer",
  btnPrimary: "px-6 py-2 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-sm transition-colors cursor-pointer",
  btnPrimaryDis: "px-6 py-2 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  textarea: "w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all leading-relaxed",
  input: "w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all",
  listRow: "flex items-center justify-between p-3 rounded-lg border transition-colors",
  listRowActive: "border-blue-300 bg-blue-50",
  listRowIdle: "border-gray-200 bg-gray-50 hover:bg-gray-100",
  listTrash: "ml-2 p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer flex-shrink-0",
  numBadge: "w-6 h-6 rounded-full bg-[#1E3A8A] text-white text-[12px] font-semibold flex items-center justify-center flex-shrink-0",
};

function errInputClass(showErr) {
  return `${showErr} ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]'`;
}

// Lifecycle modal (kunci scroll body)
const modalLifecycle = (lockScroll = true) => ({
  _prevOverflow: "",
  _lock() {
    if (!lockScroll) return;
    this._prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  },
  destroy() {
    if (lockScroll) document.body.style.overflow = this._prevOverflow;
  },
});

// Modal wrapper standar
function formModalHTML({ open, close, formId, labelledby, ariaLabel, xdata, submit = "submit()", title, titleId, headerExtra = "", headerShrink = true, body, footer, footerShrink = true, footerCls }) {
  return `<template x-teleport="body">
    <template x-if="${open}">
      <div class="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4" @mousedown.self="${close}">
        <form ${formId ? `id="${formId}"` : ""} role="dialog" aria-modal="true" ${labelledby ? `aria-labelledby="${labelledby}"` : ""} ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
          novalidate autocomplete="off" x-data="${xdata}" @submit.prevent="${submit}" @keydown.window.escape="${close}"
          class="bg-white rounded-xl border border-gray-200/90 shadow-sm flex flex-col overflow-hidden"
          style="width: 90vw; max-width: 1024px; height: min(92vh, 720px)">
          <div class="px-6 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between${headerShrink ? " flex-shrink-0" : ""}">
            ${headerExtra || `<h2 ${titleId ? `id="${titleId}"` : ""} class="text-[20px] font-bold text-gray-900 tracking-tight">${title}</h2>`}
            <button type="button" @click="${close}" class="${PC.closeBtn}" aria-label="Tutup modal">${PI.close()}</button>
          </div>
          <div class="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-5">${body}</div>
          <div class="${footerCls || `border-t border-gray-200 px-6 sm:px-8 py-3.5 bg-gray-50/50 flex items-center justify-end gap-3${footerShrink ? " flex-shrink-0" : ""}`}">${footer}</div>
        </form>
      </div>
    </template>
  </template>`;
}

function defaultFooter(close, submitDisabled = "") {
  return `<button type="button" @click="${close}" class="${PC.btnOutline}">Batal</button><button type="submit" ${submitDisabled ? `:disabled="${submitDisabled}"` : ""} class="${submitDisabled ? PC.btnPrimaryDis : PC.btnPrimary}">Simpan</button>`;
}

function labelRow({ forId, label, required = false, star = '<span class="text-red-500">*</span>', err }) {
  return `<div class="flex items-center justify-between"><label ${forId ? `for="${forId}"` : ""} class="block text-[14px] font-medium text-gray-700">${label}${required ? ` ${star}` : ""}</label>
    ${err ? `<template x-if="${err}"><span class="text-[12px] text-red-600 font-medium" x-text="${err}"></span></template>` : ""}
  </div>`;
}

function selectDropdownHTML({ id, label, model, options, placeholder, overlay = false, clearCheck = "text-[#1E3A8A] text-[12px] font-bold", optCheck = "text-[12px] font-bold" }) {
  const sel = `(${options}).find((o) => o.value === value)`;
  return `<div class="space-y-1.5">
  ${label ? `<label for="${id}" class="block text-[14px] font-medium text-gray-700">${label}</label>` : ""}
  <div class="relative" x-data="{ open: false, value: '' }" x-modelable="value" x-model="${model}" @mousedown.outside="open = false">
    ${overlay ? `<template x-if="open"><div class="fixed inset-0 z-40" @mousedown="open = false" aria-hidden="true"></div></template>` : ""}
    <button id="${id}" type="button" @click="open = !open"
      class="${overlay ? "relative z-50 " : ""}w-full flex items-center justify-between gap-2 rounded-md border bg-white px-3.5 py-2.5 text-[15px] outline-none transition-all cursor-pointer"
      :class="open ? 'border-[#1E3A8A] ring-1 ring-[#1E3A8A]' : 'border-gray-300 hover:border-gray-400'"
      ${overlay ? `aria-haspopup="listbox" :aria-expanded="open"` : ""}><span :class="${sel} ? 'text-gray-900' : 'text-gray-400'" x-text="${sel} ? ${sel}.label : (${placeholder})"></span>${PI.chevron("open")}</button><template x-if="open"><ul role="listbox" class="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl py-1"><li role="option" :aria-selected="!value" @mousedown.prevent="value = ''; open = false"
          class="px-4 py-2.5 text-[14px] text-gray-400 cursor-pointer hover:bg-gray-50 flex items-center justify-between"><span x-text="${placeholder}"></span><template x-if="!value"><span class="${clearCheck}">✓</span></template></li><template x-for="opt in ${options}" :key="opt.value"><li role="option" :aria-selected="value === opt.value" @mousedown.prevent="value = opt.value; open = false"
            class="px-4 py-2.5 text-[14px] cursor-pointer transition-colors flex items-center justify-between"
            :class="value === opt.value ? 'bg-blue-50 text-[#1E3A8A] font-semibold' : 'text-gray-800 hover:bg-gray-50'"><span x-text="opt.label"></span><template x-if="value === opt.value"><span class="${optCheck}">✓</span></template></li></template></ul></template></div></div>`;
}

function currentCheckboxHTML(model, text) {
  return `<div><label class="flex items-center gap-3 cursor-pointer group w-fit"><div @click="${model} = !${model}"
        class="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
        :class="${model} ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white' : 'border-gray-300 bg-white'"><template x-if="${model}">${PI.check("w-3 h-3")}</template></div><span class="text-[15px] text-gray-800 group-hover:text-gray-900">${text}</span></label></div>`;
}

function educationLogoHTML(nameExpr, logoExpr = "''", textCls = "text-[22px]", imgCls = "w-full h-full object-contain p-1") {
  const src = `eduLogoSrc(${nameExpr}, ${logoExpr})`;
  return `<div class="w-full h-full flex items-center justify-center overflow-hidden" x-data="{ failed: false }" x-effect="${src}; failed = false"><template x-if="${src} && !failed"><img :src="${src}" :alt="${nameExpr}" class="${imgCls}" @error="failed = true"></template><template x-if="!(${src} && !failed)"><div :class="'w-full h-full flex items-center justify-center bg-gradient-to-br ' + eduGradientFor(${nameExpr} || '?') + ' text-white font-bold tracking-wide select-none ${textCls}'"
        :aria-label="${nameExpr}" :title="${nameExpr}" x-text="eduInitials(${nameExpr})"></div></template></div>`;
}

// ===================== REGISTRASI KOMPONEN ALPINE =====================
document.addEventListener("alpine:init", () => {
  // Combobox
  Alpine.data("combobox", (allowCustom = false) => ({
    open: false,
    query: "",
    active: 0,
    value: "",
    display(options) {
      if (!this.value) return "";
      const match = options.find((o) => o.value === this.value);
      return match ? match.label : this.value;
    },
    items(options) {
      const q = this.query.trim().toLowerCase();
      if (!q) return options;
      const filtered = options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
      if (allowCustom && q && !filtered.some((o) => o.label.toLowerCase() === q)) {
        return [...filtered, { value: this.query.trim(), label: this.query.trim(), custom: true }];
      }
      return filtered;
    },
    choose(o) {
      this.value = o.value;
      this.open = false;
      this.query = "";
      this.$dispatch("combobox-chosen");
    },
    onKey(e, items) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!this.open) this.open = true;
        else this.active = Math.min(this.active + 1, Math.max(items.length - 1, 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.active = Math.max(this.active - 1, 0);
      } else if (e.key === "Enter") {
        if (this.open) {
          e.preventDefault();
          const o = items[this.active];
          if (o) this.choose(o);
        }
      } else if (e.key === "Escape" && this.open) {
        e.stopPropagation();
        this.open = false;
        this.query = "";
      }
    },
  }));

  // Edit Profil
  Alpine.data("editProfileModal", () => ({
    ...modalLifecycle(true),
    draft: {},
    touched: {},
    submitted: false,
    init() {
      this.draft = initProfileDraft(this.$data.profile);
      this._lock();
      this.$watch("draft.countryCode", (code, old) => {
        if (code !== old) this.draft.city = "";
      });
    },
    get cityOptions() {
      return (CITIES[this.draft.countryCode] || []).map((c) => ({ value: c, label: c }));
    },
    urlError(v, domain, name) {
      if (!v.trim()) return "";
      const host = hostOf(v);
      if (!host) return "Tautan tidak valid, contoh: linkedin.com/in/nama";
      if (domain && !(host === domain || host.endsWith(`.${domain}`))) return `Tautan ${name} harus berasal dari ${domain}`;
      return "";
    },
    get errors() {
      const d = this.draft;
      return {
        fullName: d.fullName.trim() ? "" : "Nama lengkap wajib diisi.",
        headline: d.headline.trim() ? "" : "Moto profesional tidak boleh kosong.",
        countryCode: d.countryCode ? "" : "Pilih negara atau wilayah Anda.",
        linkedin: this.urlError(d.linkedin, "linkedin.com", "LinkedIn"),
        github: this.urlError(d.github, "github.com", "GitHub"),
        website: this.urlError(d.website),
        email: !d.email.trim() || isEmail(d.email) ? "" : "Format email belum sesuai.",
      };
    },
    showErr(key) {
      return this.touched[key] || this.submitted ? this.errors[key] : "";
    },
    touch(key) {
      this.touched = { ...this.touched, [key]: true };
    },
    submit() {
      this.submitted = true;
      if (Object.values(this.errors).some(Boolean)) return;
      const d = this.draft;
      const countryName = (COUNTRIES.find((c) => c.value === d.countryCode) || {}).label || "";
      const name = d.fullName.trim().split(/\s+/).join(" ");
      const parts = name.split(" ");
      const city = d.city.trim();
      this.$dispatch("profile-save", {
        ...JSON.parse(JSON.stringify(this.$data.profile)),
        firstName: parts.length > 1 ? parts.slice(0, -1).join(" ") : name,
        lastName: parts.length > 1 ? parts[parts.length - 1] : "",
        name,
        headline: d.headline.trim(),
        countryCode: d.countryCode,
        city,
        location: [city, countryName].filter(Boolean).join(", "),
        linkedin: profileNormalizeUrl(d.linkedin),
        github: profileNormalizeUrl(d.github),
        website: profileNormalizeUrl(d.website),
        email: d.email.trim(),
      });
    },
  }));

  // Edit Tentang
  Alpine.data("editAboutModal", () => ({
    aboutText: "",
    init() {
      this.aboutText = this.$data.profile.about;
      setTimeout(() => this.$refs.aboutTextarea && this.$refs.aboutTextarea.focus(), 80);
    },
  }));

  // Tambah Keahlian
  const makeSkillEntry = () => ({
    id: `entry-${Date.now()}-${Math.random()}`,
    name: "",
    level: DEFAULT_SKILL_LEVEL,
    links: [],
    query: "",
    openList: false,
    error: "",
    activeIdx: 0,
  });

  Alpine.data("addSkillsModal", () => ({
    ...modalLifecycle(true),
    entries: [makeSkillEntry()],
    init() {
      this._lock();
    },
    get existingNames() {
      return new Set(this.$data.skills.map((s) => s.name.trim().toLowerCase()));
    },
    usedNamesOf(excludeIdx) {
      return new Set(this.entries.filter((e, i) => i !== excludeIdx && e.name.trim()).map((e) => e.name.trim().toLowerCase()));
    },
    filteredGroupsOf(entry) {
      const q = entry.query.trim().toLowerCase();
      return SKILL_OPTIONS.map((g) => ({ group: g.group, items: g.items.filter((it) => !q || it.toLowerCase().includes(q)) })).filter((g) => g.items.length > 0);
    },
    showCustomOf(entry) {
      const q = entry.query.trim().toLowerCase();
      return q.length > 0 && !SKILL_OPTIONS.flatMap((g) => g.items).some((it) => it.toLowerCase() === q);
    },
    optionsOf(entry) {
      return [...this.filteredGroupsOf(entry).flatMap((g) => g.items), ...(this.showCustomOf(entry) ? [entry.query.trim()] : [])];
    },
    takenFor(idx, item) {
      return this.existingNames.has(item.toLowerCase()) || this.usedNamesOf(idx).has(item.toLowerCase());
    },
    chooseFor(entry, idx, val) {
      const name = val.trim();
      if (!name) return;
      if (this.existingNames.has(name.toLowerCase())) {
        Object.assign(entry, { error: "Keahlian ini sudah ada di profil Anda.", openList: false, query: "" });
        return;
      }
      if (this.usedNamesOf(idx).has(name.toLowerCase())) {
        Object.assign(entry, { error: "Keahlian ini sudah dipilih di atas.", openList: false, query: "" });
        return;
      }
      Object.assign(entry, { name, query: "", openList: false, error: "" });
    },
    entryKey(entry, idx, e) {
      const options = this.optionsOf(entry);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!entry.openList) entry.openList = true;
        else entry.activeIdx = Math.min(entry.activeIdx + 1, Math.max(options.length - 1, 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        entry.activeIdx = Math.max(entry.activeIdx - 1, 0);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (entry.openList && options[entry.activeIdx]) this.chooseFor(entry, idx, options[entry.activeIdx]);
      } else if (e.key === "Escape" && entry.openList) {
        e.stopPropagation();
        entry.openList = false;
        entry.query = "";
      }
    },
    addEntry() {
      this.entries = [...this.entries, makeSkillEntry()];
    },
    removeEntry(idx) {
      this.entries = this.entries.filter((_, i) => i !== idx);
    },
    submit() {
      let hasError = false;
      this.entries.forEach((e) => {
        if (!e.name.trim()) {
          hasError = true;
          e.error = "Nama keahlian wajib dipilih.";
        }
      });
      if (hasError) return;
      this.$dispatch("skills-save", [
        ...this.$data.skills,
        ...this.entries.map((e, i) => ({ id: `skill-${Date.now()}-${i}`, name: e.name.trim(), level: e.level, links: e.links })),
      ]);
    },
  }));

  // Edit Keahlian
  const skillToForm = (s) => ({ name: s.name, level: s.level || DEFAULT_SKILL_LEVEL, links: linksOfSkill(s) });

  Alpine.data("editSkillModal", () => ({
    ...modalLifecycle(true),
    list: [],
    selectedId: null,
    form: null,
    error: "",
    init() {
      const skills = JSON.parse(JSON.stringify(this.$data.skills));
      this.list = skills;
      const first = skills[0] || null;
      this.selectedId = first ? first.id : null;
      this.form = first ? skillToForm(first) : null;
      this.error = "";
      this._lock();
    },
    applied(current) {
      if (!this.form || !this.selectedId) return current;
      return current.map((s) => (s.id === this.selectedId ? { ...s, name: this.form.name.trim(), level: this.form.level, links: this.form.links } : s));
    },
    validate(f, id, current) {
      const n = f.name.trim();
      if (!n) return "Nama keahlian wajib diisi.";
      if (current.some((s) => s.id !== id && s.name.trim().toLowerCase() === n.toLowerCase())) return "Nama keahlian sudah dipakai.";
      return "";
    },
    selectSkill(s) {
      if (s.id === this.selectedId) return;
      if (this.form && this.selectedId) {
        const err = this.validate(this.form, this.selectedId, this.list);
        if (err) {
          this.error = err;
          return;
        }
      }
      const next = this.applied(this.list);
      this.list = next;
      const target = next.find((x) => x.id === s.id) || s;
      this.selectedId = target.id;
      this.form = skillToForm(target);
      this.error = "";
    },
    deleteSkill(s) {
      if (!window.confirm(`Hapus keahlian "${s.name}" dari profil Anda?`)) return;
      const next = this.list.filter((x) => x.id !== s.id);
      this.list = next;
      if (this.selectedId === s.id) {
        const fallback = next[0] || null;
        this.selectedId = fallback ? fallback.id : null;
        this.form = fallback ? skillToForm(fallback) : null;
        this.error = "";
      }
      this.$dispatch("skill-delete", s.id);
    },
    submit() {
      if (this.form && this.selectedId) {
        const err = this.validate(this.form, this.selectedId, this.list);
        if (err) {
          this.error = err;
          return;
        }
      }
      this.$dispatch("skills-save", this.applied(this.list));
    },
  }));

  // Skill Picker
  Alpine.data("skillPicker", () => ({
    value: [],
    query: "",
    openList: false,
    active: 0,
    get filteredGroups() {
      const q = this.query.trim().toLowerCase();
      const base = SKILL_OPTIONS.map((g) => ({ group: g.group, items: g.items.filter((it) => !this.value.includes(it)) }));
      if (!q) return base.filter((g) => g.items.length > 0);
      return base.map((g) => ({ group: g.group, items: g.items.filter((it) => it.toLowerCase().includes(q)) })).filter((g) => g.items.length > 0);
    },
    get flatFiltered() {
      return this.filteredGroups.flatMap((g) => g.items);
    },
    choose(name) {
      if (!this.value.includes(name)) this.value = [...this.value, name];
      this.query = "";
      this.openList = false;
      this.active = 0;
    },
    remove(name) {
      this.value = this.value.filter((v) => v !== name);
    },
    onKey(e) {
      const flat = this.flatFiltered;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!this.openList) this.openList = true;
        else this.active = Math.min(this.active + 1, Math.max(flat.length - 1, 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.active = Math.max(this.active - 1, 0);
      } else if (e.key === "Enter") {
        if (this.openList && flat[this.active]) {
          e.preventDefault();
          this.choose(flat[this.active]);
        }
      } else if (e.key === "Escape" && this.openList) {
        e.stopPropagation();
        this.openList = false;
        this.query = "";
      }
    },
  }));

  // Contributor Picker
  Alpine.data("contributorPicker", () => ({
    value: [],
    query: "",
    openList: false,
    active: 0,
    get results() {
      return searchAlumni(this.query);
    },
    isSelected(id) {
      return this.value.some((v) => v.id === id);
    },
    toggle(a) {
      if (this.isSelected(a.id)) this.value = this.value.filter((v) => v.id !== a.id);
      else this.value = [...this.value, { id: a.id, name: a.name, avatarUrl: a.avatarUrl }];
      this.query = "";
      this.active = 0;
    },
    remove(id) {
      this.value = this.value.filter((v) => v !== id);
    },
    onKey(e) {
      const results = this.results;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!this.openList) this.openList = true;
        else this.active = Math.min(this.active + 1, Math.max(results.length - 1, 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.active = Math.max(this.active - 1, 0);
      } else if (e.key === "Enter") {
        if (this.openList && results[this.active]) {
          e.preventDefault();
          this.toggle(results[this.active]);
        }
      } else if (e.key === "Escape" && this.openList) {
        e.stopPropagation();
        this.openList = false;
        this.query = "";
      }
    },
  }));

  // Media Picker
  Alpine.data("mediaPicker", (max = MAX_MEDIA_ITEMS) => ({
    value: { linkUrl: "", imageUrl: "" },
    max,
    menuOpen: false,
    dialog: null,
    pickError: "",
    get items() {
      return itemsFromValue(this.value);
    },
    get atLimit() {
      return this.items.length >= this.max;
    },
    commit(next) {
      this.value = valueFromItems(next);
    },
    chooseImage() {
      this.menuOpen = false;
      this.pickError = "";
      this.$refs.mediaFile.click();
    },
    async onPickImage(e) {
      const file = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!file) return;
      const err = validateImageFile(file);
      if (err) {
        this.pickError = err;
        return;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        this.pickError = "";
        this.dialog = { kind: "image", editing: null, pendingImage: { dataUrl, name: file.name } };
      } catch {
        this.pickError = "Gagal membaca berkas. Coba lagi.";
      }
    },
    handleSave(item) {
      const items = this.items;
      const exists = items.some((i) => i.id === item.id);
      this.commit(exists ? items.map((i) => (i.id === item.id ? item : i)) : [...items, item]);
      this.dialog = null;
    },
    removeMedia(id) {
      this.commit(this.items.filter((i) => i.id !== id));
    },
    makePrimary(id) {
      const items = this.items;
      const target = items.find((i) => i.id === id);
      if (!target) return;
      const rest = items.filter((i) => i.id !== id);
      const firstSame = rest.findIndex((i) => i.kind === target.kind);
      const next = [...rest];
      next.splice(firstSame < 0 ? 0 : firstSame, 0, target);
      this.commit(next);
    },
    isPrimary(item, idx) {
      return this.items.findIndex((i) => i.kind === item.kind) === idx;
    },
    isMulti(item) {
      return this.items.filter((i) => i.kind === item.kind).length > 1;
    },
  }));

  // Media Dialog
  Alpine.data("mediaDialog", (state) => {
    const isLink = state.kind === "link";
    const editing = state.editing;
    const pendingImage = state.pendingImage;
    return {
      dKind: state.kind,
      dEditing: editing,
      isLink,
      url: isLink && editing ? editing.url : "",
      stage: isLink && !editing ? "paste" : "details",
      urlError: "",
      title: editing ? editing.title : pendingImage ? titleFromFileName(pendingImage.name) : "",
      titleTouched: Boolean(editing),
      titleVisited: false,
      description: editing && editing.description ? editing.description : "",
      thumbnail: isLink ? (editing && editing.thumbnail) || "" : (editing && editing.url) || (pendingImage && pendingImage.dataUrl) || "",
      fileError: "",
      get normalized() {
        return normalizeUrl(this.url);
      },
      get canSave() {
        return this.stage === "details" && this.title.trim().length > 0 && (this.isLink ? Boolean(this.normalized) : Boolean(this.thumbnail));
      },
      get titleError() {
        return this.titleVisited && !this.title.trim() ? "Judul wajib diisi." : "";
      },
      get hasOgPreview() {
        return Boolean(previewImageFor(this.normalized));
      },
      addLink() {
        if (!this.normalized) {
          this.urlError = "Tautan tidak valid. Contoh: github.com/username/repo";
          return;
        }
        this.urlError = "";
        if (!this.titleTouched) this.title = suggestTitleFromUrl(this.normalized);
        this.stage = "details";
      },
      async onThumbFile(e) {
        const file = e.target.files && e.target.files[0];
        e.target.value = "";
        if (!file) return;
        const err = validateImageFile(file);
        if (err) {
          this.fileError = err;
          return;
        }
        try {
          const dataUrl = await readFileAsDataUrl(file);
          this.fileError = "";
          this.thumbnail = dataUrl;
          if (!this.isLink && !this.titleTouched) this.title = titleFromFileName(file.name);
        } catch {
          this.fileError = "Gagal membaca berkas. Coba lagi.";
        }
      },
      buildItem() {
        return {
          id: (this.dEditing && this.dEditing.id) || newMediaId(),
          kind: this.dKind,
          url: this.isLink ? this.normalized : this.thumbnail,
          title: this.title.trim(),
          description: this.description.trim(),
          thumbnail: this.isLink ? this.thumbnail || undefined : this.thumbnail,
        };
      },
    };
  });

  // Media Thumb Sources
  Alpine.data("mediaThumb", () => ({
    thumbIdx: 0,
    sourcesOf(kind, url, thumbnail) {
      const list = [];
      if (kind === "image") {
        if (url) list.push({ src: url, icon: false });
      } else {
        if (thumbnail) list.push({ src: thumbnail, icon: false });
        const og = previewImageFor(url);
        if (og) list.push({ src: og, icon: false });
        const fav = faviconFor(url);
        if (fav) list.push({ src: fav, icon: true });
      }
      return list;
    },
  }));

  // Tambah Penghargaan
  Alpine.data("addHonorModal", () => ({
    ...modalLifecycle(true),
    form: { title: "", relatedEducationId: "", issuer: "", month: "", year: "", description: "", media: { linkUrl: "", imageUrl: "" } },
    touched: {},
    submitted: false,
    init() {
      this._lock();
      setTimeout(() => this.$refs.honorTitle && this.$refs.honorTitle.focus(), 50);
    },
    get errors() {
      return {
        title: this.form.title.trim() ? "" : "Judul penghargaan wajib diisi.",
        issuer: this.form.issuer.trim() ? "" : "Pemberi penghargaan wajib diisi.",
      };
    },
    showErr(key) {
      return this.touched[key] || this.submitted ? this.errors[key] || "" : "";
    },
    blur(key) {
      this.touched = { ...this.touched, [key]: true };
    },
    submit() {
      this.submitted = true;
      if (this.errors.title || this.errors.issuer) return;
      const f = this.form;
      const date = f.month && f.year ? `${f.month} ${f.year}` : f.month || f.year || undefined;
      this.$dispatch("honor-add", {
        id: Date.now().toString(),
        title: f.title.trim(),
        relatedEducationId: f.relatedEducationId || undefined,
        issuer: f.issuer.trim(),
        date,
        description: f.description.trim() || undefined,
        media: f.media,
      });
    },
  }));

  // Edit Penghargaan
  Alpine.data("editHonorsModal", () => ({
    ...modalLifecycle(true),
    draftList: [],
    selectedId: null,
    form: null,
    touched: {},
    submitted: false,
    init() {
      const honors = JSON.parse(JSON.stringify(this.$data.honors));
      this.draftList = honors;
      const first = honors[0] || null;
      this.selectedId = first ? first.id : null;
      this.form = first ? honorToDraft(first) : null;
      this._lock();
    },
    get errors() {
      return {
        title: this.form && this.form.title.trim() ? "" : "Judul penghargaan wajib diisi.",
        issuer: this.form && this.form.issuer.trim() ? "" : "Pemberi penghargaan wajib diisi.",
      };
    },
    showErr(key) {
      return this.touched[key] || this.submitted ? this.errors[key] || "" : "";
    },
    focusTitle(delay) {
      setTimeout(() => this.$refs.honorEditTitle && this.$refs.honorEditTitle.focus(), delay);
    },
    selectHonor(h) {
      this.selectedId = h.id;
      this.form = honorToDraft(h);
      this.touched = {};
      this.submitted = false;
      this.focusTitle(30);
    },
    addNew() {
      if (this.form && this.selectedId && this.form.title.trim()) {
        this.draftList = this.draftList.map((h) => (h.id === this.selectedId ? draftToHonor(this.form, h.id) : h));
      }
      const newHonor = { id: `honor-${Date.now()}`, title: "", issuer: "" };
      this.draftList = [...this.draftList, newHonor];
      this.selectedId = newHonor.id;
      this.form = honorToDraft(newHonor);
      this.touched = {};
      this.submitted = false;
      this.focusTitle(50);
    },
    removeHonor(id) {
      const next = this.draftList.filter((h) => h.id !== id);
      this.draftList = next;
      if (this.selectedId === id) {
        const fallback = next[0] || null;
        this.selectedId = fallback ? fallback.id : null;
        this.form = fallback ? honorToDraft(fallback) : null;
        this.touched = {};
        this.submitted = false;
      }
    },
    rowSubtitle(h) {
      if (h.id === this.selectedId && this.form) {
        const f = this.form;
        return [f.issuer, f.month && f.year ? `${f.month} ${f.year}` : f.month || f.year].filter(Boolean).join(" · ");
      }
      return [h.issuer, h.date].filter(Boolean).join(" · ");
    },
    submit() {
      this.submitted = true;
      if (this.form && this.selectedId) {
        if (this.errors.title || this.errors.issuer) return;
        this.$dispatch("honors-save", this.draftList.map((h) => (h.id === this.selectedId ? draftToHonor(this.form, h.id) : h)));
      } else {
        this.$dispatch("honors-save", this.draftList);
      }
    },
  }));

  // Tambah Organisasi
  const EMPTY_ORG = () => ({ name: "", role: "", relatedEducationId: "", isCurrent: false, startMonth: "", startYear: "", endMonth: "", endYear: "", desc: "" });

  Alpine.data("addOrgModal", () => ({
    ...modalLifecycle(true),
    form: EMPTY_ORG(),
    touched: {},
    submitted: false,
    init() {
      this._lock();
      setTimeout(() => this.$refs.orgName && this.$refs.orgName.focus(), 50);
    },
    get errors() {
      return {
        name: this.form.name.trim() ? "" : "Nama organisasi wajib diisi.",
        role: this.form.role.trim() ? "" : "Posisi yang dijabat wajib diisi.",
      };
    },
    showErr(k) {
      return this.touched[k] || this.submitted ? this.errors[k] || "" : "";
    },
    blur(k) {
      this.touched = { ...this.touched, [k]: true };
    },
    submit() {
      this.submitted = true;
      if (this.errors.name || this.errors.role) return;
      const f = this.form;
      const orgs = this.$data.organizations;
      const relatedEdu = this.$data.educations.find((e) => String(e.id) === f.relatedEducationId);
      this.$dispatch("org-add", {
        id: orgs.length > 0 ? Math.max(...orgs.map((o) => o.id)) + 1 : 1,
        abbr: orgAbbr(f.name),
        name: f.name.trim(),
        role: f.role.trim(),
        period: buildPeriod(f) || "–",
        affiliated: relatedEdu ? relatedEdu.name : "",
        tags: [],
        desc: f.desc.trim(),
        logoUrl: "",
        relatedEducationId: f.relatedEducationId || undefined,
        isCurrent: f.isCurrent,
        startMonth: f.startMonth || undefined,
        startYear: f.startYear || undefined,
        endMonth: f.isCurrent ? undefined : f.endMonth || undefined,
        endYear: f.isCurrent ? undefined : f.endYear || undefined,
      });
    },
  }));

  // Edit Organisasi
  Alpine.data("editOrgModal", () => ({
    ...modalLifecycle(true),
    list: [],
    selectedId: null,
    form: null,
    touched: {},
    submitted: false,
    init() {
      const orgs = JSON.parse(JSON.stringify(this.$data.organizations));
      this.list = orgs;
      const first = orgs[0] || null;
      this.selectedId = first ? first.id : null;
      this.form = first ? orgToDraft(first) : null;
      this._lock();
    },
    get errors() {
      return {
        name: this.form && this.form.name.trim() ? "" : "Nama organisasi wajib diisi.",
        role: this.form && this.form.role.trim() ? "" : "Posisi yang dijabat wajib diisi.",
      };
    },
    showErr(k) {
      return this.touched[k] || this.submitted ? this.errors[k] || "" : "";
    },
    blur(k) {
      this.touched = { ...this.touched, [k]: true };
    },
    selectOrg(org) {
      this.selectedId = org.id;
      this.form = orgToDraft(org);
      this.touched = {};
      this.submitted = false;
      setTimeout(() => this.$refs.orgEditName && this.$refs.orgEditName.focus(), 30);
    },
    buildUpdated(org) {
      if (!this.form) return org;
      const f = this.form;
      const relatedEdu = this.$data.educations.find((e) => String(e.id) === f.relatedEducationId);
      return {
        ...org,
        name: f.name.trim(),
        abbr: orgAbbr(f.name),
        role: f.role.trim(),
        period: buildPeriod(f, "–"),
        affiliated: relatedEdu ? relatedEdu.name : org.affiliated,
        desc: f.desc.trim(),
        relatedEducationId: f.relatedEducationId || undefined,
        isCurrent: f.isCurrent,
        startMonth: f.startMonth || undefined,
        startYear: f.startYear || undefined,
        endMonth: f.isCurrent ? undefined : f.endMonth || undefined,
        endYear: f.isCurrent ? undefined : f.endYear || undefined,
      };
    },
    removeOrg(id) {
      const next = this.list.filter((o) => o.id !== id);
      this.list = next;
      if (this.selectedId === id) {
        const fallback = next[0] || null;
        this.selectedId = fallback ? fallback.id : null;
        this.form = fallback ? orgToDraft(fallback) : null;
        this.touched = {};
        this.submitted = false;
      }
    },
    rowStart(org) {
      const src = org.id === this.selectedId && this.form ? this.form : org;
      return [src.startMonth, src.startYear].filter(Boolean).join(" ");
    },
    submit() {
      this.submitted = true;
      if (this.form && this.selectedId !== null) {
        if (this.errors.name || this.errors.role) return;
        this.$dispatch("orgs-save", this.list.map((o) => (o.id === this.selectedId ? this.buildUpdated(o) : o)));
      } else {
        this.$dispatch("orgs-save", this.list);
      }
    },
  }));

  // Pendidikan
  const EMPTY_EDU = () => ({ name: "", major: "", degree: "", isCurrent: false, startMonth: "", startYear: "", endMonth: "", endYear: "", tags: [] });

  const eduFormMixin = {
    touched: {},
    submitted: false,
    tagInput: "",
    openSuggest: false,
    get errors() {
      return {
        name: this.form && this.form.name.trim() ? "" : "Institusi wajib diisi.",
        major: this.form && this.form.major.trim() ? "" : "Jurusan wajib diisi.",
      };
    },
    showErr(k) {
      return this.touched[k] || this.submitted ? this.errors[k] || "" : "";
    },
    blur(k) {
      this.touched = { ...this.touched, [k]: true };
    },
    get suggestions() {
      return this.openSuggest && this.form ? suggestInstitutions(this.form.name, 6) : [];
    },
    addTag(raw) {
      const t = raw.trim();
      if (!t) return;
      if (!this.form.tags.includes(t)) this.form.tags = [...this.form.tags, t];
      this.tagInput = "";
    },
    removeTag(t) {
      this.form.tags = this.form.tags.filter((x) => x !== t);
    },
    tagKey(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.addTag(this.tagInput);
      } else if (e.key === "Backspace" && !this.tagInput && this.form.tags.length) {
        this.removeTag(this.form.tags[this.form.tags.length - 1]);
      }
    },
  };

  Alpine.data("addEduModal", () => mixData(modalLifecycle(true), eduFormMixin, {
    form: EMPTY_EDU(),
    init() {
      this._lock();
      setTimeout(() => this.$refs.eduName && this.$refs.eduName.focus(), 50);
    },
    submit() {
      this.submitted = true;
      if (this.errors.name || this.errors.major) return;
      const f = this.form;
      const edus = this.$data.educations;
      this.$dispatch("edu-add", {
        id: edus.length > 0 ? Math.max(...edus.map((e) => e.id)) + 1 : 1,
        name: f.name.trim(),
        major: f.major.trim(),
        degree: f.degree.trim(),
        period: buildPeriod(f) || "–",
        tags: f.tags,
        logoUrl: "",
        isCurrent: f.isCurrent,
        startMonth: f.startMonth || undefined,
        startYear: f.startYear || undefined,
        endMonth: f.isCurrent ? undefined : f.endMonth || undefined,
        endYear: f.isCurrent ? undefined : f.endYear || undefined,
      });
    },
  }));

  Alpine.data("editEduModal", () => mixData(modalLifecycle(true), eduFormMixin, {
    list: [],
    selectedId: null,
    form: null,
    init() {
      const edus = JSON.parse(JSON.stringify(this.$data.educations));
      this.list = edus;
      const first = edus[0] || null;
      this.selectedId = first ? first.id : null;
      this.form = first ? eduToDraft(first) : null;
      this._lock();
    },
    selectEdu(e) {
      this.selectedId = e.id;
      this.form = eduToDraft(e);
      this.touched = {};
      this.submitted = false;
      this.tagInput = "";
      this.openSuggest = false;
      setTimeout(() => this.$refs.eduEditName && this.$refs.eduEditName.focus(), 30);
    },
    buildUpdated(e) {
      if (!this.form) return e;
      const f = this.form;
      return {
        ...e,
        name: f.name.trim(),
        major: f.major.trim(),
        degree: f.degree.trim(),
        period: buildPeriod(f, "–"),
        tags: f.tags,
        isCurrent: f.isCurrent,
        startMonth: f.startMonth || undefined,
        startYear: f.startYear || undefined,
        endMonth: f.isCurrent ? undefined : f.endMonth || undefined,
        endYear: f.isCurrent ? undefined : f.endYear || undefined,
      };
    },
    removeEdu(id) {
      const next = this.list.filter((e) => e.id !== id);
      this.list = next;
      if (this.selectedId === id) {
        const fallback = next[0] || null;
        this.selectedId = fallback ? fallback.id : null;
        this.form = fallback ? eduToDraft(fallback) : null;
        this.touched = {};
        this.submitted = false;
      }
    },
    rowStart(e) {
      const src = e.id === this.selectedId && this.form ? this.form : e;
      return [src.startMonth, src.startYear].filter(Boolean).join(" ");
    },
    submit() {
      this.submitted = true;
      if (this.form && this.selectedId !== null) {
        if (this.errors.name || this.errors.major) return;
        this.$dispatch("edus-save", this.list.map((e) => (e.id === this.selectedId ? this.buildUpdated(e) : e)));
      } else {
        this.$dispatch("edus-save", this.list);
      }
    },
  }));

  // Proyek
  const EMPTY_PROJECT = () => ({ title: "", period: "", desc: "", contributors: [], skills: [], media: { linkUrl: "", imageUrl: "" } });
  const projectToDraft = (p) => ({
    title: p.title,
    period: p.period,
    desc: p.desc,
    contributors: contributorsFromProject(p),
    skills: p.tags || [],
    media: projectToMediaValue(p),
  });
  const projectFields = (f) => ({
    title: f.title.trim(),
    period: f.period.trim(),
    desc: f.desc.trim(),
    tags: f.skills.length ? f.skills : ["Umum"],
    contributor: f.contributors[0] ? f.contributors[0].name : undefined,
    contributorId: (f.contributors[0] && f.contributors[0].id) || undefined,
    contributorAvatar: (f.contributors[0] && f.contributors[0].avatarUrl) || undefined,
    contributors: f.contributors,
    ...mediaToProjectFields(f.media),
  });

  Alpine.data("addProjectModal", () => ({
    ...modalLifecycle(true),
    form: EMPTY_PROJECT(),
    touched: {},
    submitted: false,
    init() {
      this._lock();
      setTimeout(() => this.$refs.projectTitle && this.$refs.projectTitle.focus(), 50);
    },
    get errors() {
      const mediaFilled = Boolean(normalizeUrl(this.form.media.linkUrl) || this.form.media.imageUrl);
      return {
        title: this.form.title.trim() ? "" : "Judul proyek wajib diisi.",
        period: this.form.period.trim() ? "" : "Periode wajib diisi.",
        desc: this.form.desc.trim() ? "" : "Deskripsi wajib diisi.",
        media: mediaFilled ? "" : "Isi tautan proyek atau unggah gambar.",
      };
    },
    showErr(key) {
      return this.touched[key] || this.submitted ? this.errors[key] : "";
    },
    blur(key) {
      this.touched = { ...this.touched, [key]: true };
    },
    submit() {
      this.submitted = true;
      const e = this.errors;
      if (e.title || e.period || e.desc || e.media) return;
      this.$dispatch("project-add", { id: Date.now(), ...projectFields(this.form) });
    },
  }));

  Alpine.data("editProjectModal", () => ({
    ...modalLifecycle(true),
    draftList: [],
    selectedId: null,
    form: null,
    touched: {},
    submitted: false,
    init() {
      const projects = JSON.parse(JSON.stringify(this.$data.projects));
      this.draftList = projects;
      const first = projects[0] ? projects[0].id : null;
      this.selectedId = first;
      const found = projects.find((p) => p.id === first) || null;
      this.form = found ? projectToDraft(found) : null;
      this._lock();
    },
    get errors() {
      const f = this.form;
      const mediaFilled = Boolean(f && (f.media.linkUrl || f.media.imageUrl));
      return {
        title: f && f.title.trim() ? "" : "Judul proyek wajib diisi.",
        period: f && f.period.trim() ? "" : "Periode wajib diisi.",
        desc: f && f.desc.trim() ? "" : "Deskripsi wajib diisi.",
        media: mediaFilled ? "" : "Tambahkan minimal satu media (link atau gambar).",
      };
    },
    showErr(key) {
      return this.touched[key] || this.submitted ? this.errors[key] : "";
    },
    blur(key) {
      this.touched = { ...this.touched, [key]: true };
    },
    selectProject(p) {
      this.selectedId = p.id;
      this.form = projectToDraft(p);
      this.touched = {};
      this.submitted = false;
      setTimeout(() => this.$refs.projectEditTitle && this.$refs.projectEditTitle.focus(), 30);
    },
    removeProject(id) {
      const next = this.draftList.filter((p) => p.id !== id);
      this.draftList = next;
      if (this.selectedId === id) {
        const first = next[0] || null;
        this.selectedId = first ? first.id : null;
        this.form = first ? projectToDraft(first) : null;
        this.touched = {};
        this.submitted = false;
      }
    },
    submit() {
      this.submitted = true;
      const e = this.errors;
      if (e.title || e.period || e.desc || e.media) return;
      if (!this.form || this.selectedId === null) {
        this.$dispatch("projects-save", this.draftList);
        return;
      }
      this.$dispatch("projects-save", this.draftList.map((p) => (p.id === this.selectedId ? { ...p, ...projectFields(this.form) } : p)));
    },
  }));

  // Sertifikasi
  const EMPTY_CERT = () => ({ name: "", issuer: "", issueMonth: "", issueYear: "", expireMonth: "", expireYear: "", credId: "", url: "", skills: [] });
  const certNormalizeUrl = (raw) => {
    let u = raw.trim();
    if (u && !/^https?:\/\//i.test(u)) u = `https://${u}`;
    return u;
  };

  const certFormMixin = {
    touched: {},
    submitted: false,
    get errors() {
      const errors = {};
      if (this.form) {
        if (!this.form.name.trim()) errors.name = "Nama sertifikasi wajib diisi";
        if (!this.form.issuer.trim()) errors.issuer = "Organisasi penerbit wajib diisi";
      }
      return errors;
    },
    showErr(k) {
      return (this.submitted || this.touched[k]) && this.errors[k];
    },
    blur(k) {
      this.touched = { ...this.touched, [k]: true };
    },
  };

  Alpine.data("addCertModal", () => mixData(modalLifecycle(true), certFormMixin, {
    form: EMPTY_CERT(),
    init() {
      this._lock();
      setTimeout(() => this.$refs.certName && this.$refs.certName.focus(), 50);
    },
    submit() {
      this.submitted = true;
      if (Object.keys(this.errors).length > 0) return;
      const f = this.form;
      let dateLabel = "Diterbitkan 2026";
      if (f.issueMonth && f.issueYear) dateLabel = `Diterbitkan ${MONTH_ABBR[f.issueMonth] || f.issueMonth} ${f.issueYear}`;
      else if (f.issueYear) dateLabel = `Diterbitkan ${f.issueYear}`;
      const certs = this.$data.certifications;
      this.$dispatch("cert-add", {
        id: certs.length > 0 ? Math.max(...certs.map((c) => c.id)) + 1 : 1,
        logoBg: "bg-[#1a1a2e]",
        logoText: "text-cyan-400",
        logoLabel: "☁",
        name: f.name.trim(),
        issuer: f.issuer.trim(),
        date: dateLabel,
        credId: f.credId.trim(),
        tags: f.skills,
        url: certNormalizeUrl(f.url),
        issueMonth: f.issueMonth,
        issueYear: f.issueYear,
        expireMonth: f.expireMonth,
        expireYear: f.expireYear,
        logoUrl: "",
      });
    },
  }));

  Alpine.data("editCertModal", () => mixData(modalLifecycle(true), certFormMixin, {
    list: [],
    selectedId: null,
    form: null,
    init() {
      const certs = JSON.parse(JSON.stringify(this.$data.certifications));
      this.list = certs;
      const first = certs[0] || null;
      this.selectedId = first ? first.id : null;
      this.form = first ? certToDraft(first) : null;
      this._lock();
    },
    selectCert(c) {
      this.selectedId = c.id;
      this.form = certToDraft(c);
      this.touched = {};
      this.submitted = false;
      setTimeout(() => this.$refs.certEditName && this.$refs.certEditName.focus(), 50);
    },
    removeCert(id) {
      const next = this.list.filter((c) => c.id !== id);
      this.list = next;
      if (this.selectedId === id) {
        const fallback = next[0] || null;
        this.selectedId = fallback ? fallback.id : null;
        this.form = fallback ? certToDraft(fallback) : null;
        this.touched = {};
        this.submitted = false;
      }
    },
    buildUpdated(c) {
      if (!this.form) return c;
      const f = this.form;
      let dateLabel = c.date || "Diterbitkan 2026";
      if (f.issueMonth && f.issueYear) dateLabel = `Diterbitkan ${MONTH_ABBR2[f.issueMonth] || f.issueMonth} ${f.issueYear}`;
      else if (f.issueYear) dateLabel = `Diterbitkan ${f.issueYear}`;
      return {
        ...c,
        name: f.name.trim(),
        issuer: f.issuer.trim(),
        date: dateLabel,
        credId: f.credId.trim(),
        tags: f.skills,
        url: certNormalizeUrl(f.url),
        issueMonth: f.issueMonth,
        issueYear: f.issueYear,
        expireMonth: f.expireMonth,
        expireYear: f.expireYear,
      };
    },
    submit() {
      this.submitted = true;
      if (this.form && this.selectedId !== null) {
        if (this.errors.name || this.errors.issuer) return;
        this.$dispatch("certs-save", this.list.map((c) => (c.id === this.selectedId ? this.buildUpdated(c) : c)));
      } else {
        this.$dispatch("certs-save", this.list);
      }
    },
  }));

  // Honor Media Thumb
  Alpine.data("honorMediaThumb", () => ({
    lightbox: null,
    openLightbox(item) {
      this.lightbox = {
        imageUrl: item.kind === "image" ? item.url : item.thumbnail || "",
        title: item.title,
        description: item.description,
        linkUrl: item.kind === "link" ? item.url : undefined,
      };
    },
  }));
});

// ===================== POTONGAN MARKUP: WIDGET =====================

// ContributorPicker
function contributorPickerHTML(id, model) {
  const avatar = (nameExpr, srcExpr, size) => `<span class="${size} rounded-full overflow-hidden flex-shrink-0 bg-blue-100 border border-blue-200 flex items-center justify-center text-[#1E3A8A] font-semibold" x-data="{ broken: false }" x-effect="${srcExpr}; broken = false"><template x-if="${srcExpr} && !broken"><img :src="${srcExpr}" :alt="${nameExpr}" class="w-full h-full object-cover" @error="broken = true"></template><template x-if="!(${srcExpr} && !broken)"><span class="text-[13px]" x-text="initialsOf(${nameExpr})"></span></template></span>`;

  return `<div class="space-y-1.5" x-data="contributorPicker()" x-modelable="value" x-model="${model}"><label for="${id}" class="block text-[14px] font-medium text-gray-700">Kontributor (opsional)</label><div class="relative" @mousedown.outside="openList = false; query = ''"><span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">${PI.search()}</span><input id="${id}" type="text" role="combobox" :aria-expanded="openList" autocomplete="off" x-model="query"
        :placeholder="value.length > 0 ? value.length + ' kontributor dipilih — tambah lagi...' : 'Cari alumni terdaftar, misal: Clarista...'"
        @focus="openList = true; active = 0" @click="openList = true" @input="openList = true; active = 0" @keydown="onKey($event)"
        class="w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] bg-white pl-10 pr-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"><template x-if="openList"><ul role="listbox" class="absolute z-50 left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg py-1"><template x-if="results.length === 0"><li class="px-4 py-3 text-[14px] text-gray-400 italic">Alumni tidak ditemukan</li></template><template x-for="(a, idx) in results" :key="a.id"><li role="option" :aria-selected="isSelected(a.id)" @mousedown.prevent="toggle(a)" @mouseenter="active = idx"
              class="px-3 py-2.5 flex items-center gap-3 cursor-pointer transition-colors" :class="idx === active ? 'bg-blue-50' : ''">${avatar("a.name", "a.avatarUrl", "w-10 h-10")}<span class="min-w-0 flex-1"><span class="block text-[14px] font-semibold text-gray-900 truncate" x-text="a.name"></span><span class="block text-[12px] text-gray-500 truncate" x-text="a.headline"></span></span><template x-if="isSelected(a.id)"><span class="flex-shrink-0 text-[#1E3A8A]">${PI.check("w-4 h-4", "2.2")}</span></template></li></template></ul></template></div><template x-if="value.length > 0"><div class="pt-1.5 flex flex-wrap gap-2"><template x-for="v in value" :key="v.id"><span class="inline-flex items-center gap-3 h-12 pl-1.5 pr-2 rounded-full bg-blue-50 border border-blue-100 text-[14px] text-[#1E3A8A]">${avatar("v.name", "v.avatarUrl", "w-9 h-9")}<a :href="alumniPageHref(alumniProfileHref(v.id))" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#1E3A8A] hover:underline" :title="'Buka halaman ' + v.name" x-text="v.name"></a><button type="button" @click="remove(v.id)" class="w-7 h-7 rounded-full flex items-center justify-center text-[#1E3A8A] hover:bg-blue-100 transition-colors cursor-pointer" :title="'Hapus ' + v.name" :aria-label="'Hapus ' + v.name">${PI.close("w-3.5 h-3.5")}</button></span></template></div></template><template x-if="value.length === 0"><p class="text-[12px] text-gray-500">Pilih satu atau lebih kontributor dari alumni yang sudah terdaftar.</p></template></div>`;
}

// SkillPicker
function skillPickerHTML({ id, model, label = "Keahlian relevan", placeholder = "Cari keahlian, misal: React, Machine Learning..." }) {
  return `<div class="space-y-1.5" x-data="skillPicker()" x-modelable="value" x-model="${model}"><label for="${id}" class="block text-[14px] font-medium text-gray-700">${label}</label><div class="relative" @mousedown.outside="openList = false; query = ''"><span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">${PI.search()}</span><input id="${id}" type="text" role="combobox" :aria-expanded="openList" autocomplete="off" x-model="query" placeholder="${placeholder}"
        @focus="openList = true; active = 0" @click="openList = true" @input="openList = true; active = 0" @keydown="onKey($event)"
        class="w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] bg-white pl-10 pr-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"><template x-if="openList"><ul role="listbox" class="absolute z-50 left-0 right-0 mt-1 max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg py-1"><template x-if="filteredGroups.length === 0"><li class="px-4 py-2.5 text-[14px] text-gray-400 italic">Keahlian tidak ditemukan</li></template><template x-for="g in filteredGroups" :key="g.group"><li class="pt-1"><p class="px-4 pt-1.5 pb-1 text-[11px] font-bold uppercase tracking-wide text-gray-400" x-text="g.group"></p><ul><template x-for="item in g.items" :key="item"><li role="option" aria-selected="false" @mousedown.prevent="choose(item)" @mouseenter="active = flatFiltered.indexOf(item)"
                    class="px-4 py-2 text-[14px] cursor-pointer transition-colors"
                    :class="flatFiltered.indexOf(item) === active ? 'bg-blue-50 text-[#1E3A8A]' : 'text-gray-800'" x-text="item"></li></template></ul></li></template></ul></template></div><template x-if="value.length > 0"><div class="flex flex-wrap gap-2 pt-1.5"><template x-for="t in value" :key="t"><span class="inline-flex items-center gap-2 h-9 pl-3.5 pr-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1E3A8A] text-[13px] font-semibold"><span x-text="t"></span><button type="button" @click="remove(t)" class="w-6 h-6 rounded-full flex items-center justify-center text-[#1E3A8A] hover:bg-blue-100 transition-colors cursor-pointer" title="Hapus keahlian">${PI.close("w-3 h-3")}</button></span></template></div></template><template x-if="value.length === 0"><p class="text-[12px] text-gray-500">Pilih satu atau lebih keahlian yang relevan dengan proyek ini.</p></template></div>`;
}

// MediaThumb
function mediaThumbHTML(kind, url, thumb, large = false) {
  const sources = `sourcesOf(${kind}, ${url}, ${thumb})`;
  return `<div class="contents" x-data="mediaThumb()" x-effect="${sources}; thumbIdx = 0"><template x-if="!${sources}[thumbIdx]">${PI.image(large ? "w-12 h-12 text-[#1E3A8A]/60" : "w-7 h-7 text-[#1E3A8A]/60", "1.6")}</template><template x-if="${sources}[thumbIdx]"><img :src="${sources}[thumbIdx].src" alt="" @error="thumbIdx++"
        :class="${sources}[thumbIdx].icon ? '${large ? "w-14 h-14 object-contain" : "w-9 h-9 object-contain"}' : 'w-full h-full object-cover'"></template></div>`;
}

// MediaPicker & MediaDialog
function mediaPickerHTML({ model, label = "Media", max = "MAX_MEDIA_ITEMS" }) {
  const FIELD_BASE = "w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all";
  const FIELD_OK = "border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]";
  const FIELD_ERR = "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500";
  return `<div class="space-y-2.5" x-data="mediaPicker(${max})" x-modelable="value" x-model="${model}"><div class="flex items-center justify-between"><span class="block text-[14px] font-medium text-gray-700">${label}</span><span class="text-[12px] text-gray-400 tabular-nums" x-text="items.length + '/' + max"></span></div><div class="relative inline-block" @mousedown.outside="menuOpen = false"><button type="button" @click="menuOpen = !menuOpen" :disabled="atLimit" aria-haspopup="menu" :aria-expanded="menuOpen"
        class="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[#1E3A8A]/40 text-[14px] font-semibold text-[#1E3A8A] hover:bg-blue-50 hover:border-[#1E3A8A] transition-colors cursor-pointer disabled:text-gray-400 disabled:border-gray-200 disabled:hover:bg-transparent disabled:cursor-not-allowed">
        ${PI.plus("w-4 h-4")}
        Tambahkan media
      </button><template x-if="menuOpen"><div role="menu" class="absolute z-30 left-0 mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-lg p-1.5"><button type="button" role="menuitem" @click="menuOpen = false; dialog = { kind: 'link', editing: null, pendingImage: null }"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-blue-50 transition-colors cursor-pointer"><span class="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 text-[#1E3A8A] flex items-center justify-center flex-shrink-0">${PI.link("w-4 h-4")}</span><span class="min-w-0"><span class="block text-[14px] font-semibold text-gray-900">Link</span><span class="block text-[12px] text-gray-500">Repositori, demo, artikel, atau video</span></span></button><button type="button" role="menuitem" @click="chooseImage()"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-blue-50 transition-colors cursor-pointer"><span class="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 text-[#1E3A8A] flex items-center justify-center flex-shrink-0">${PI.image("w-4 h-4")}</span><span class="min-w-0"><span class="block text-[14px] font-semibold text-gray-900">Gambar</span><span class="block text-[12px] text-gray-500">Unggah dari komputer</span></span></button></div></template></div><template x-if="atLimit"><p class="text-[12px] text-gray-500" x-text="'Batas ' + max + ' media tercapai. Hapus salah satu untuk menambah yang baru.'"></p></template><template x-if="pickError"><p class="text-[12px] text-red-600 font-medium" x-text="pickError"></p></template><template x-if="items.length === 0"><p class="text-[12px] text-gray-500">Belum ada media. Tambahkan tautan proyek (GitHub, demo, video) atau gambar.</p></template><template x-if="items.length > 0"><ul class="space-y-2.5 pt-1"><template x-for="(item, idx) in items" :key="item.id"><li class="flex items-start gap-4 p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-blue-200 transition-colors"><div class="w-24 h-[72px] rounded-xl overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-[#1E3A8A] flex-shrink-0">${mediaThumbHTML("item.kind", "item.url", "item.thumbnail")}</div><div class="min-w-0 flex-1"><p class="text-[15px] font-semibold text-gray-900 truncate" :title="item.title" x-text="item.title"></p><template x-if="item.description"><p class="text-[14px] text-gray-500 mt-0.5 line-clamp-2" x-text="item.description"></p></template><p class="text-[13px] text-gray-400 mt-1 truncate" x-text="item.kind === 'link' ? hostFor(item.url) || 'Tautan' : 'Gambar'"></p><template x-if="isMulti(item) && isPrimary(item, idx)"><p class="text-[13px] font-semibold text-[#1E3A8A] mt-1">Dipakai di kartu proyek</p></template><template x-if="isMulti(item) && !isPrimary(item, idx)"><button type="button" @click="makePrimary(item.id)" class="text-[13px] font-semibold text-[#1E3A8A] hover:underline mt-1 cursor-pointer">Jadikan utama</button></template></div><div class="flex items-center gap-1 flex-shrink-0"><button type="button" @click="dialog = { kind: item.kind, editing: item, pendingImage: null }"
                class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer"
                title="Edit media" :aria-label="'Edit media ' + item.title">${PI.pencil("w-[18px] h-[18px]")}</button><button type="button" @click="removeMedia(item.id)"
                class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Hapus media" :aria-label="'Hapus media ' + item.title">${PI.trash("w-[18px] h-[18px]")}</button></div></li></template></ul></template><input x-ref="mediaFile" type="file" accept="image/*" class="hidden" @change="onPickImage($event)"><template x-teleport="body"><template x-if="dialog"><div class="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4" @mousedown.self="dialog = null"
          x-data="mediaDialog(dialog)" @keydown.window.escape.stop.capture="dialog = null"><div role="dialog" aria-modal="true" aria-labelledby="media-dialog-title" class="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style="width: min(560px, calc(100vw - 32px)); max-height: min(92vh, 720px)"><div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between"><h3 id="media-dialog-title" class="text-[20px] font-bold text-gray-900 tracking-tight" x-text="dEditing ? 'Edit media' : 'Tambahkan media'"></h3><button type="button" @click="dialog = null" class="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer" aria-label="Tutup">${PI.close()}</button></div><div class="flex-1 overflow-y-auto px-6 py-6 space-y-5"><template x-if="isLink"><div class="space-y-1.5"><label for="media-url" class="block text-[14px] font-medium text-gray-700">Tautan</label><p class="text-[13px] text-gray-500">Tempel atau ketik tautan repositori, demo, artikel, file, atau video.</p><div class="flex items-start gap-2"><input id="media-url" type="text" inputmode="url" autocomplete="off" x-model="url"
                      x-init="if (stage === 'paste') $nextTick(() => $el.focus())"
                      @input="if (urlError) urlError = ''" @keydown.enter.prevent="addLink()"
                      placeholder="https://github.com/username/repo"
                      class="${FIELD_BASE}" :class="urlError ? '${FIELD_ERR}' : '${FIELD_OK}'"><button type="button" @click="addLink()" :disabled="!url.trim()"
                      class="h-[46px] px-4 rounded-full text-[14px] font-semibold text-[#1E3A8A] hover:bg-blue-50 transition-colors cursor-pointer disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed flex-shrink-0"
                      x-text="stage === 'paste' ? 'Tambahkan' : 'Perbarui'"></button></div><template x-if="urlError"><p class="text-[12px] text-red-600 font-medium" x-text="urlError"></p></template></div></template><template x-if="stage === 'details'"><div class="contents space-y-5"><div class="flex items-start gap-4" :class="isLink ? 'mt-5' : ''"><div class="flex-shrink-0 space-y-2"><div class="relative w-32 h-24 rounded-xl overflow-hidden border border-blue-200/80 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-[#1E3A8A]">${mediaThumbHTML("dKind", "isLink ? normalized : thumbnail", "isLink ? thumbnail : undefined")}</div><button type="button" @click="$refs.thumbFile.click()" class="w-full text-center text-[12px] font-semibold text-[#1E3A8A] hover:underline cursor-pointer"
                        x-text="!isLink ? 'Ganti gambar' : thumbnail ? 'Ganti' : 'Unggah thumbnail'"></button><template x-if="isLink && thumbnail"><button type="button" @click="thumbnail = ''" class="w-full text-center text-[12px] font-semibold text-red-500 hover:underline cursor-pointer">Hapus thumbnail</button></template></div><div class="flex-1 min-w-0 space-y-3"><div class="space-y-1"><label for="media-title" class="block text-[14px] font-medium text-gray-700">Judul <span class="text-red-500 font-bold">*</span></label><input id="media-title" type="text" autocomplete="off" maxlength="120" x-model="title"
                          x-init="if (!isLink) $nextTick(() => $el.focus())"
                          @input="titleTouched = true" @blur="titleVisited = true" @keydown.enter.prevent
                          :placeholder="isLink ? 'Judul tautan' : 'Judul gambar'"
                          class="${FIELD_BASE}" :class="titleError ? '${FIELD_ERR}' : '${FIELD_OK}'"><template x-if="titleError"><p class="text-[12px] text-red-600 font-medium" x-text="titleError"></p></template></div><div class="space-y-1"><label for="media-desc" class="block text-[14px] font-medium text-gray-700">Deskripsi</label><textarea id="media-desc" rows="3" maxlength="500" x-model="description" placeholder="Jelaskan singkat isi media ini (opsional)" style="resize: none"
                          class="${FIELD_BASE} ${FIELD_OK} leading-relaxed"></textarea><div class="flex justify-end"><span class="text-[12px] text-gray-400 tabular-nums" x-text="description.length + '/500'"></span></div></div></div></div><template x-if="fileError"><p class="text-[12px] text-red-600 font-medium" x-text="fileError"></p></template><p class="text-[12px] text-gray-500"
                    x-text="!isLink ? 'PNG, JPG, atau WEBP, maksimal 5 MB.' : thumbnail ? 'Thumbnail kustom akan dipakai untuk media ini.' : hasOgPreview ? 'Pratinjau diambil otomatis dari repositori GitHub. Unggah gambar sendiri bila ingin menggantinya.' : 'Pratinjau memakai ikon situs. Unggah gambar sendiri untuk thumbnail yang lebih menarik.'"></p><input x-ref="thumbFile" type="file" accept="image/*" class="hidden" @change="onThumbFile($event)"></div></template></div><div class="border-t border-gray-200 px-6 py-3.5 bg-gray-50/50 flex items-center justify-end gap-3"><button type="button" @click="dialog = null" class="${PC.btnOutline}">Kembali</button><button type="button" @click="if (canSave) handleSave(buildItem())" :disabled="!canSave"
                class="px-6 py-2 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-sm transition-colors cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed">Simpan</button></div></div></div></template></template></div>`;
}

// HonorMediaThumb
function honorMediaThumbHTML(mediaExpr) {
  return `<div class="contents" x-data="honorMediaThumb()" @keydown.window.escape="lightbox = null"><div class="flex flex-wrap gap-3 mt-3"><template x-for="item in itemsFromValue(${mediaExpr})" :key="item.id"><button type="button" @click="openLightbox(item)"
          class="relative group flex-shrink-0 w-full sm:w-[440px] rounded-xl overflow-hidden border border-blue-200/80 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100 cursor-pointer"
          :class="(item.kind === 'image' ? item.url : item.thumbnail) ? '' : 'h-32'"
          :title="item.title || 'Lihat media'" :aria-label="'Lihat media: ' + item.title"><template x-if="item.kind === 'image' ? item.url : item.thumbnail"><img :src="item.kind === 'image' ? item.url : item.thumbnail" :alt="item.title" class="block w-full h-auto" @error="$el.style.opacity = '0.3'"></template><template x-if="!(item.kind === 'image' ? item.url : item.thumbnail) && item.kind === 'link'"><span class="flex w-full h-full items-center justify-center text-[#1E3A8A]"><img :src="faviconFor(item.url)" alt="Ikon tautan" class="w-12 h-12 object-contain" @error="$el.src = 'assets/img/gambar-kosong.png'"></span></template><template x-if="!(item.kind === 'image' ? item.url : item.thumbnail) && item.kind !== 'link'"><span class="flex w-full h-full items-center justify-center text-[#1E3A8A]"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"> <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5" /> <circle cx="9" cy="9" r="1.6" stroke="currentColor" stroke-width="1.5" /> <path d="M3.5 16l5-5 4 4 3-3 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg></span></template></button></template></div>
    ${lightboxHTML({ state: "lightbox", close: "lightbox = null", linkLabel: "Pratinjau tautan", emptyLabel: "Gambar belum tersedia", fallbackDesc: "Pratinjau media", buttonLabel: "Buka Tautan", badgeTitle: "Buka tautan" })}
  </div>`;
}

// Lightbox
function lightboxHTML({ state, close, linkLabel, emptyLabel, fallbackDesc, buttonLabel, badgeTitle }) {
  return `<template x-if="${state}"><div class="fixed inset-0 z-[80] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4" @click.self="${close}"><div class="relative w-full max-w-4xl max-h-[92vh] flex flex-col items-center"><button type="button" @click="${close}"
          class="absolute -top-1 right-0 sm:-top-2 sm:-right-2 z-10 w-10 h-10 rounded-full bg-white/95 text-gray-700 hover:bg-white hover:text-gray-900 flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          aria-label="Tutup pratinjau"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg></button><div class="relative w-full flex items-center justify-center rounded-2xl overflow-hidden bg-black/20 shadow-2xl"><template x-if="${state}.imageUrl"><img :src="${state}.imageUrl" :alt="${state}.title" class="max-w-full max-h-[74vh] object-contain"></template><template x-if="!${state}.imageUrl && ${state}.linkUrl"><div class="w-full h-64 sm:h-96 flex flex-col items-center justify-center gap-4"><img :src="faviconFor(${state}.linkUrl)" alt="${linkLabel === "Pratinjau tautan" ? "Ikon tautan" : "Ikon tautan proyek"}" class="w-20 h-20 object-contain rounded-2xl bg-white p-3 shadow-lg" @error="$el.src = 'assets/img/gambar-kosong.png'"><p class="text-[15px] font-medium text-white/80">${linkLabel}</p></div></template><template x-if="!${state}.imageUrl && !${state}.linkUrl"><div class="w-full h-64 sm:h-96 flex flex-col items-center justify-center text-white/70 gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"> <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.5" /> <circle cx="9" cy="9" r="1.6" stroke="currentColor" stroke-width="1.5" /> <path d="M3.5 16l5-5 4 4 3-3 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg><p class="text-[15px] font-medium">${emptyLabel}</p></div></template><template x-if="${state}.linkUrl"><a :href="normalizeUrl(${state}.linkUrl)" target="_blank" rel="noopener noreferrer"
              class="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg ring-2 ring-white/90 transition-colors cursor-pointer"
              title="${badgeTitle}" aria-label="${badgeTitle}"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg></a></template></div><div class="w-full mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl shadow-lg px-5 py-4"><div class="min-w-0"><h4 class="text-[17px] font-bold text-gray-900 leading-snug truncate" x-text="${state}.title"></h4><p class="text-[13px] text-gray-500 mt-0.5" x-text="${state}.description || '${fallbackDesc}'"></p></div><template x-if="${state}.linkUrl"><a :href="normalizeUrl(${state}.linkUrl)" target="_blank" rel="noopener noreferrer"
              class="flex-shrink-0 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-[15px] font-semibold transition-colors shadow-sm cursor-pointer"><span>${buttonLabel}</span><span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg></span></a></template></div></div></div></template>`;
}

// ===================== POTONGAN MARKUP: MODAL =====================

// Profile Field & Combobox HTML
function profileFieldHTML({ label, forId, required, err, hint, body }) {
  return `<div class="space-y-1.5"><div class="flex items-center justify-between"><label ${forId ? `for="${forId}"` : ""} class="block text-[14px] font-medium text-gray-700">${label} ${required ? '<span class="text-red-500 font-bold">*</span>' : ""}</label>
      ${err ? `<template x-if="${err}"><span class="text-[12px] text-red-600 font-medium" x-text="${err}"></span></template>` : ""}
    </div>
    ${body}
    ${hint ? `<template x-if="(${hint}) && !(${err || "''"})"><p class="text-[12px] text-gray-500 leading-relaxed" x-text="${hint}"></p></template>` : ""}
  </div>`;
}

function comboboxHTML({ id, label, model, options, placeholder, required, err, hint, disabled = "false", allowCustom = false, emptyText = "Tidak ditemukan", onChosen = "" }) {
  const body = `<div class="relative" x-data="combobox(${allowCustom})" x-modelable="value" x-model="${model}" @mousedown.outside="open = false; query = ''" ${onChosen ? `@combobox-chosen="${onChosen}"` : ""}><span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">${PI.search()}</span><input id="${id}" type="text" role="combobox" :aria-expanded="open" autocomplete="off" :disabled="${disabled}"
      :value="open ? query : display(${options})"
      :placeholder="open && display(${options}) ? display(${options}) : (${placeholder})"
      @focus="if (!(${disabled})) { open = true; active = 0 }"
      @click="if (!(${disabled})) open = true"
      @input="query = $event.target.value; open = true; active = 0"
      @keydown="onKey($event, items(${options}))"
      class="w-full rounded-md border bg-white pl-10 pr-9 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
      :class="[${err} ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]', (${disabled}) ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : '']"><template x-if="value && !open && !(${disabled})"><button type="button" @click="value = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition cursor-pointer" title="Hapus pilihan">${PI.close("w-3.5 h-3.5")}</button></template><template x-if="open && !(${disabled})"><ul role="listbox" class="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg py-1"><template x-if="items(${options}).length === 0"><li class="px-4 py-2.5 text-[14px] text-gray-400 italic">${emptyText}</li></template><template x-for="(o, i) in items(${options})" :key="o.custom ? '__custom__' : o.value"><li role="option" :aria-selected="!o.custom && o.value === value" @mousedown.prevent="choose(o)" @mouseenter="active = i"
            class="px-4 py-2 text-[14px] cursor-pointer transition-colors"
            :class="[i === active ? 'bg-blue-50 text-[#1E3A8A]' : 'text-gray-800', !o.custom && o.value === value ? 'font-semibold bg-gray-50 text-[#1E3A8A]' : '', o.custom ? 'border-t border-gray-100 text-[#1E3A8A] font-medium' : '']"
            x-text="o.custom ? 'Gunakan &quot;' + o.label + '&quot;' : o.label"></li></template></ul></template></div>`;
  return profileFieldHTML({ label, forId: id, required, err, hint, body });
}

// Modal: Edit Profil
ALUMNI_PARTIALS["modal-edit-profile"] = () => {
  const close = "editProfileOpen = false";
  const inputCls = (key, hasIcon = false) => `class="w-full rounded-md border bg-white py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all ${hasIcon ? "pl-11 pr-3.5" : "px-3.5"}" :class="${errInputClass(`showErr('${key}')`)}"`;
  const iconInput = (id, key, type, placeholder, iconBg, icon, inputmode = 'inputmode="url"') => `<div class="relative"><div class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${iconBg} text-white flex items-center justify-center flex-shrink-0">${icon}</div><input id="${id}" type="${type}" ${inputmode} autocomplete="off" x-model="draft.${key}" @blur="touch('${key}')" placeholder="${placeholder}" ${inputCls(key, true)}></div>`;

  const body = `${profileFieldHTML({ label: "Nama lengkap", forId: "ep-fld-name", required: true, err: "showErr('fullName')", body: `<input id="ep-fld-name" type="text" x-init="$nextTick(() => $el.focus())" autocomplete="off" x-model="draft.fullName" @blur="touch('fullName')" placeholder="Nama lengkap" ${inputCls("fullName")}>` })}
  ${profileFieldHTML({
    label: "Moto profesional",
    forId: "ep-headline",
    required: true,
    err: "showErr('headline')",
    body: `<div class="relative">
      <textarea id="ep-headline" rows="2" maxlength="220" x-model="draft.headline" @blur="touch('headline')"
        x-effect="draft.headline; $el.style.height = 'auto'; $el.style.height = Math.max($el.scrollHeight, 72) + 'px'"
        placeholder="Contoh: Data Scientist | Machine Learning Enthusiast | Alumni UDINUS"
        class="w-full min-h-[72px] rounded-md border bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 outline-none transition-all resize-none overflow-hidden"
        :class="${errInputClass("showErr('headline')")}"></textarea>
      <div class="mt-1 flex items-center justify-between text-[12px] text-gray-500">
        <span>Tuliskan spesialisasi atau peran Anda saat ini.</span>
        <span class="font-mono text-gray-400" x-text="draft.headline.length + '/220'"></span>
      </div>
    </div>`,
  })}
  ${comboboxHTML({ id: "ep-country", label: "Negara/Wilayah", required: true, model: "draft.countryCode", options: "COUNTRIES", placeholder: "'Cari negara...'", err: "showErr('countryCode')", onChosen: "touch('countryCode')" })}
  ${comboboxHTML({
    id: "ep-city",
    label: "City",
    model: "draft.city",
    options: "cityOptions",
    allowCustom: true,
    disabled: "!draft.countryCode",
    placeholder: "draft.countryCode ? 'Cari kota atau ketik langsung...' : 'Pilih negara terlebih dahulu'",
    err: "''",
    hint: "draft.countryCode ? 'Daftar disesuaikan dengan negara yang dipilih. Jika kota Anda belum ada, ketik nama kota lalu pilih.' : ''",
  })}
  <div class="border-t border-gray-200 pt-5 space-y-4"><div><h3 class="text-[16px] font-semibold text-gray-900">Informasi kontak</h3><p class="text-[13px] text-gray-500 mt-0.5">Tambahkan atau edit URL profil, email, dan lainnya.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${profileFieldHTML({ label: "LinkedIn", forId: "ep-linkedin", err: "showErr('linkedin')", body: iconInput("ep-linkedin", "linkedin", "text", "https://www.linkedin.com/in/username", "bg-[#0A66C2]", `<svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>`) })}
      ${profileFieldHTML({ label: "GitHub", forId: "ep-github", err: "showErr('github')", body: iconInput("ep-github", "github", "text", "https://github.com/username", "bg-gray-900", `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>`) })}
      ${profileFieldHTML({ label: "Website / Portofolio", forId: "ep-website", err: "showErr('website')", body: iconInput("ep-website", "website", "text", "portofolioanda.com", "bg-gray-700", `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>`) })}
      ${profileFieldHTML({ label: "Email", forId: "ep-email", err: "showErr('email')", body: iconInput("ep-email", "email", "email", "nama@alumni.dinus.ac.id", "bg-[#1E3A8A]", `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>`, "") })}
    </div></div>`;

  return formModalHTML({
    open: "editProfileOpen",
    close,
    formId: "modalEditProfilForm",
    labelledby: "edit-intro-title",
    xdata: "editProfileModal",
    title: "Edit intro",
    titleId: "edit-intro-title",
    headerShrink: false,
    footerShrink: false,
    body,
    footer: defaultFooter(close),
  });
};

// Modal: Edit Tentang
ALUMNI_PARTIALS["modal-edit-about"] = () => `<template x-teleport="body"><template x-if="editAboutOpen"><div id="modal-edit-about" class="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-4" @click.self="editAboutOpen = false"><div class="bg-white rounded-xl border border-gray-200/90 shadow-sm flex flex-col overflow-hidden" style="width: 90vw; max-width: 1024px; height: min(92vh, 720px)"
      x-data="editAboutModal" @keydown.window.escape="editAboutOpen = false"><div class="px-6 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between"><h3 class="text-[20px] font-bold text-gray-900 tracking-tight">Tentang Saya</h3><button id="btn-close-modal-edit-about" @click="editAboutOpen = false" class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-colors flex-shrink-0 cursor-pointer" aria-label="Tutup modal"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button></div><div class="px-6 sm:px-8 py-6 overflow-y-auto flex-1 space-y-4"><p class="text-[14.5px] text-gray-500 leading-relaxed">
          Tuliskan pengalaman, keahlian, atau pencapaian yang ingin kamu tonjolkan. Bagian ini biasanya berisi ringkasan latar belakang dan tujuan profesionalmu.
        </p><div><textarea id="input-about-text" x-ref="aboutTextarea" x-model="aboutText"
            x-effect="aboutText; $el.style.height = 'auto'; $el.style.height = $el.scrollHeight + 'px'"
            placeholder="Contoh: Saya adalah mahasiswa Teknik Informatika yang berfokus pada data science dan machine learning..."
            rows="10" style="resize: none; overflow: hidden; min-height: 220px"
            class="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 text-[15px] leading-relaxed placeholder:text-gray-400 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition"></textarea><div class="flex justify-end mt-1.5"><span class="text-[13px] font-mono tabular-nums" :class="aboutText.length > 2600 ? 'text-rose-500 font-semibold' : 'text-gray-400'"
              x-text="aboutText.length.toLocaleString('id-ID') + '/' + (2600).toLocaleString('id-ID')"></span></div></div></div><div class="border-t border-gray-200 px-6 sm:px-8 py-3.5 bg-gray-50/50 flex items-center justify-end gap-3"><button id="btn-cancel-edit-about" type="button" class="${PC.btnOutline}" @click="editAboutOpen = false">Batal</button><button id="btn-save-edit-about" type="button" :disabled="aboutText.length > 2600"
          class="${PC.btnPrimaryDis}" @click="$dispatch('about-save', aboutText.trim() ? aboutText : profile.about)">Simpan</button></div></div></div></template></template>`;

// Shell & Widget Keahlian
function skillShellHTML({ open, close, formId, title, description, xdata, body, footer }) {
  return `<template x-teleport="body"><template x-if="${open}"><div class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" @mousedown.self="${close}"><form id="${formId}" role="dialog" aria-modal="true" aria-label="${title}" novalidate autocomplete="off" x-data="${xdata}"
      @submit.prevent="submit()" @keydown.window.escape="${close}"
      class="bg-white rounded-xl border border-gray-200/90 shadow-sm flex flex-col overflow-hidden" style="width: 90vw; max-width: 1024px; height: min(92vh, 720px)"><div class="px-6 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0"><h2 class="text-[20px] font-bold text-gray-900 tracking-tight truncate">${title}</h2><button type="button" @click="${close}" class="${PC.closeBtn} flex-shrink-0" aria-label="Tutup modal">${PI.close()}</button></div><div class="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-5"><p class="text-[14.5px] text-gray-500 leading-relaxed">${description}</p>${body}</div><div class="border-t border-gray-200 px-6 sm:px-8 py-3.5 bg-gray-50/50 flex items-center gap-3 flex-shrink-0"><div class="flex-1"></div>${footer}</div></form></div></template></template>`;
}

function skillFieldHTML({ label, forId, required, error, hint, body }) {
  return `<div class="space-y-1.5"><div class="flex items-baseline justify-between gap-3"><label ${forId ? `:for="${forId}"` : ""} class="block text-[14px] font-semibold text-gray-800">${label}${required ? '<span class="text-red-500 ml-0.5">*</span>' : ""}</label>
      ${error ? `<template x-if="${error}"><span class="text-[12px] text-red-600 font-medium shrink-0" x-text="${error}"></span></template>` : ""}
    </div>
    ${body}
    ${hint ? (error ? `<template x-if="!(${error})"><p class="text-[12px] text-gray-500 leading-relaxed">${hint}</p></template>` : `<p class="text-[12px] text-gray-500 leading-relaxed">${hint}</p>`) : ""}
  </div>`;
}

function levelSelectorHTML(model) {
  return `<div role="radiogroup" aria-label="Tingkat keahlian" class="grid grid-cols-3 gap-2"><template x-for="lvl in SKILL_LEVELS" :key="lvl"><button type="button" role="radio" :aria-checked="${model} === lvl" @click="${model} = lvl"
        class="inline-flex items-center justify-center gap-1.5 h-11 rounded-full border text-[13px] font-semibold transition-all cursor-pointer"
        :class="${model} === lvl ? 'bg-blue-50 border-[#1E3A8A] text-[#1E3A8A] ring-1 ring-[#1E3A8A]/30' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'"><template x-if="${model} === lvl">${PI.check("w-3.5 h-3.5 shrink-0")}</template><span class="truncate" x-text="lvl"></span></button></template></div>`;
}

function skillLinkChecklistHTML(model, idPrefix) {
  const visible = "linkGroups.filter((g) => g.items.length > 0)";
  const checked = `isSkillLinked(${model}, group.type, item.id)`;
  const inputId = `${idPrefix} + '-' + group.type + '-' + item.id`;
  return `<div class="space-y-3"><div><p class="text-[14px] font-semibold text-gray-800">Beri tahu kami cara Anda memanfaatkan keahlian ini</p><p class="text-[13px] text-gray-500 mt-0.5">Pilih item yang berkaitan dengan keahlian ini</p></div><template x-if="${visible}.length === 0"><p class="text-[13px] text-gray-400 italic py-2">Belum ada item profil. Tambahkan pendidikan, sertifikasi, organisasi, proyek, atau penghargaan terlebih dahulu.</p></template><template x-if="${visible}.length > 0"><div class="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100"><div class="max-h-[280px] overflow-y-auto divide-y divide-gray-100"><template x-for="group in ${visible}" :key="group.type"><div class="bg-white"><div class="px-4 py-2 bg-gray-50 border-b border-gray-100"><span class="text-[11px] font-bold uppercase tracking-wider text-gray-400" x-text="group.label"></span></div><template x-for="item in group.items" :key="item.id"><label :for="${inputId}" class="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors select-none" :class="${checked} ? 'bg-blue-50/60' : 'hover:bg-gray-50'"><input :id="${inputId}" type="checkbox" :checked="${checked}" @change="${model} = toggleSkillLink(${model}, group.type, item.id)" class="sr-only"><span class="w-[18px] h-[18px] rounded border flex items-center justify-center flex-shrink-0 transition-colors" :class="${checked} ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white' : 'border-gray-300 bg-white'"><template x-if="${checked}">${PI.check("w-3 h-3")}</template></span>${PI.folder("w-[18px] h-[18px] text-gray-500 flex-shrink-0")}<span class="text-[14px] text-gray-800 truncate" x-text="item.label"></span></label></template></div></template></div></div></template><template x-if="${visible}.length > 0"><p class="text-[12px] text-gray-400" x-text="${model}.length + ' item dipilih'"></p></template></div>`;
}

// Modal: Tambah Keahlian
ALUMNI_PARTIALS["modal-add-skills"] = () => {
  const close = "addSkillsOpen = false";
  const nameInput = `<div class="relative" @mousedown.outside="if (entry.openList) { entry.openList = false; entry.query = '' }"><span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">${PI.search()}</span><input :id="'skill-name-' + entry.id" type="text" autocomplete="off" role="combobox" :aria-expanded="entry.openList"
      :value="entry.openList ? entry.query : entry.name"
      :placeholder="entry.openList && entry.name ? entry.name : 'Cari atau ketik nama keahlian…'"
      @click="entry.openList = true"
      @input="entry.query = $event.target.value; entry.openList = true; entry.error = ''; entry.activeIdx = 0"
      @keydown="entryKey(entry, idx, $event)"
      class="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all pl-10 pr-9"
      :class="entry.error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20'"><template x-if="entry.name && !entry.openList"><button type="button" @click="entry.name = ''; entry.error = ''" class="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 transition cursor-pointer" aria-label="Hapus pilihan">${PI.close("w-4 h-4")}</button></template><template x-if="entry.openList"><div class="absolute z-50 left-0 right-0 mt-1 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"><ul role="listbox" class="max-h-52 overflow-y-auto py-1"><template x-if="optionsOf(entry).length === 0"><li class="px-4 py-3 text-[14px] text-gray-400 italic">Keahlian tidak ditemukan</li></template><template x-for="g in (optionsOf(entry).length ? filteredGroupsOf(entry) : [])" :key="g.group"><li><p class="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50/80" x-text="g.group"></p><ul><template x-for="item in g.items" :key="item"><li role="option" :aria-disabled="takenFor(idx, item)"
                    @mousedown.prevent="if (!takenFor(idx, item)) chooseFor(entry, idx, item)"
                    @mouseenter="entry.activeIdx = optionsOf(entry).indexOf(item)"
                    class="px-4 py-2 text-[14px] flex items-center justify-between gap-2 transition-colors"
                    :class="takenFor(idx, item) ? 'text-gray-300 cursor-not-allowed' : optionsOf(entry).indexOf(item) === entry.activeIdx ? 'bg-blue-50 text-[#1E3A8A] cursor-pointer' : 'text-gray-800 hover:bg-gray-50 cursor-pointer'"><span x-text="item"></span><template x-if="takenFor(idx, item)"><span class="text-[11px] text-gray-300 flex items-center gap-1 shrink-0">${PI.check("w-3 h-3")} Sudah ada</span></template><template x-if="!takenFor(idx, item) && optionsOf(entry).indexOf(item) === entry.activeIdx"><span class="text-[11px] text-[#1E3A8A] shrink-0">Pilih →</span></template></li></template></ul></li></template><template x-if="optionsOf(entry).length && showCustomOf(entry)"><li role="option" @mousedown.prevent="chooseFor(entry, idx, entry.query.trim())" @mouseenter="entry.activeIdx = optionsOf(entry).length - 1"
              class="px-4 py-2.5 text-[14px] font-medium border-t border-gray-100 cursor-pointer text-[#1E3A8A] flex items-center gap-2"
              :class="entry.activeIdx === optionsOf(entry).length - 1 ? 'bg-blue-50' : ''"><span class="w-4 h-4 rounded-full border-2 border-[#1E3A8A] flex items-center justify-center text-[10px] font-bold shrink-0">+</span><span x-text="'Gunakan &quot;' + entry.query.trim() + '&quot;'"></span></li></template></ul></div></template></div>`;

  const body = `<div class="space-y-4"><template x-for="(entry, idx) in entries" :key="entry.id"><div class="rounded-xl border border-gray-200 bg-white overflow-hidden"><div class="flex items-center justify-between px-4 pt-4 pb-0"><span class="text-[12px] font-bold text-gray-400 uppercase tracking-widest" x-text="'Keahlian ' + (idx + 1)"></span><template x-if="entries.length > 1"><button type="button" @click="removeEntry(idx)" class="flex items-center gap-1 text-[12px] text-gray-400 hover:text-red-500 transition-colors cursor-pointer">${PI.close("w-3.5 h-3.5")} Hapus</button></template></div><div class="px-4 pt-3 pb-5 space-y-5">
          ${skillFieldHTML({ label: "Nama keahlian", forId: "'skill-name-' + entry.id", required: true, error: "entry.error", body: nameInput })}
          ${skillFieldHTML({ label: "Tingkat keahlian", body: levelSelectorHTML("entry.level") })}
          ${skillFieldHTML({ label: "Terkait dengan", hint: "Opsional — item yang dipilih akan muncul di bawah nama keahlian.", body: skillLinkChecklistHTML("entry.links", "'entry-' + entry.id") })}
        </div></div></template></div><button type="button" @click="addEntry()"
    class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-[14px] font-semibold text-gray-500 hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] hover:bg-blue-50/30 transition-all cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14" /></svg>
    Tambah keahlian lain
  </button>`;

  return skillShellHTML({
    open: "addSkillsOpen",
    close,
    formId: "modalAddSkillForm",
    title: "Tambah keahlian",
    description: "Cari keahlian, atur tingkat, dan pilih item terkait. Klik 'Tambah keahlian lain' untuk menambahkan lebih dari satu sekaligus.",
    xdata: "addSkillsModal",
    body,
    footer: `<button type="button" @click="${close}" class="${PC.btnOutline}">Batal</button><button type="submit" class="${PC.btnPrimaryDis}" x-text="entries.length > 1 ? 'Simpan ' + entries.length + ' keahlian' : 'Simpan keahlian'"></button>`,
  });
};

// Modal: Edit Keahlian
ALUMNI_PARTIALS["modal-edit-skill"] = () => {
  const close = "editSkillOpen = false";
  const body = `<template x-if="list.length === 0"><p class="text-[14px] text-gray-500 italic py-4 text-center">Belum ada keahlian untuk diedit.</p></template><template x-if="list.length > 0"><div class="space-y-5"><div><p class="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">Pilih keahlian yang ingin diedit</p><div class="space-y-1.5"><template x-for="(s, idx) in list" :key="s.id"><div class="${PC.listRow}" :class="s.id === selectedId ? '${PC.listRowActive}' : '${PC.listRowIdle}'"><button type="button" @click="selectSkill(s)" class="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"><span class="w-6 h-6 rounded-full text-[12px] font-semibold flex items-center justify-center flex-shrink-0"
                  :class="s.id === selectedId ? 'bg-[#1E3A8A] text-white' : 'bg-white border border-gray-300 text-gray-500'" x-text="idx + 1"></span><span class="min-w-0 flex-1"><span class="block text-[14px] font-medium truncate text-gray-900" x-text="s.id === selectedId && form ? form.name || s.name : s.name"></span><span class="block text-[12px] text-gray-500 truncate" x-text="s.id === selectedId && form ? form.level : s.level || DEFAULT_SKILL_LEVEL"></span></span><template x-if="countLinks(s) > 0"><span class="flex items-center gap-1 text-[12px] text-gray-400 flex-shrink-0 mr-2">${PI.folder("w-3.5 h-3.5")}<span x-text="countLinks(s)"></span></span></template><template x-if="s.id === selectedId"><span class="flex-shrink-0 mr-1"><svg class="w-4 h-4 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span></template></button><button type="button" @click="deleteSkill(s)" class="${PC.listTrash}" title="Hapus keahlian">${PI.trash()}</button></div></template></div></div><template x-if="form"><div class="rounded-xl border border-gray-200 bg-white overflow-hidden"><div class="px-4 pt-4 pb-0"><p class="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Detail keahlian terpilih</p></div><div class="px-4 pt-3 pb-5 space-y-5">
            ${skillFieldHTML({
              label: "Nama keahlian",
              forId: "'edit-skill-name'",
              required: true,
              error: "error",
              body: `<input id="edit-skill-name" type="text" autocomplete="off" x-model="form.name" @input="if (error) error = ''" placeholder="Nama keahlian"
                class="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all"
                :class="error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-gray-300 hover:border-gray-400 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20'">`,
            })}
            ${skillFieldHTML({ label: "Tingkat keahlian", body: levelSelectorHTML("form.level") })}
            ${skillFieldHTML({ label: "Terkait dengan", hint: "Item yang dipilih akan muncul di bawah nama keahlian ini.", body: skillLinkChecklistHTML("form.links", "'edit-' + selectedId") })}
          </div></div></template></div></template>`;

  return skillShellHTML({
    open: "editSkillOpen",
    close,
    formId: "modalEditSkillForm",
    title: "Edit keahlian",
    description: "Pilih keahlian yang ingin diperbarui. Ubah tingkat atau item terkait, lalu simpan.",
    xdata: "editSkillModal",
    body,
    footer: `<button type="button" @click="${close}" class="${PC.btnOutline}">Batal</button><button type="submit" :disabled="list.length === 0" class="${PC.btnPrimaryDis}">Simpan</button>`,
  });
};

// Modal: Tambah Penghargaan
ALUMNI_PARTIALS["modal-add-honor"] = () => {
  const close = "addHonorOpen = false";
  const inputCls = (k) => `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all" :class="${errInputClass(`showErr('${k}')`)}"`;
  const body = `<div class="space-y-1.5">
    ${labelRow({ forId: "honor-title", label: "Judul penghargaan", required: true, star: '<span class="text-red-500 font-bold">*</span>', err: "showErr('title')" })}
    <div class="relative"><input id="honor-title" x-ref="honorTitle" type="text" autocomplete="off" maxlength="255" x-model="form.title" @blur="blur('title')" placeholder="Contoh: Top 1 Nasional – Best Developer Award" ${inputCls("title")}><span class="absolute right-3 bottom-2.5 text-[11px] text-gray-400 tabular-nums pointer-events-none" x-text="form.title.length + '/255'"></span></div><p class="text-[12px] text-gray-500">Isi dengan judul dan/atau posisi, contoh: &quot;Juara 1 – Data Science Competition 2024&quot;</p></div><div class="space-y-1.5"><template x-if="educations.length === 0"><div class="contents space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Terkait dengan</label><p class="text-[13px] text-gray-500 italic">Tambahkan data pendidikan terlebih dahulu.</p></div></template><template x-if="educations.length > 0">
      ${selectDropdownHTML({ id: "honor-education", label: "Terkait dengan", model: "form.relatedEducationId", options: "educations.map((e) => ({ value: String(e.id), label: e.name }))", placeholder: "'Silakan pilih'", overlay: true, optCheck: "text-[#1E3A8A] text-[12px] font-bold" })}
    </template></div><div class="space-y-1.5">
    ${labelRow({ forId: "honor-issuer", label: "Pemberi penghargaan", required: true, star: '<span class="text-red-500 font-bold">*</span>', err: "showErr('issuer')" })}
    <div class="relative"><input id="honor-issuer" type="text" autocomplete="off" maxlength="255" x-model="form.issuer" @blur="blur('issuer')" placeholder="Contoh: Kementerian Pendidikan" ${inputCls("issuer")}><span class="absolute right-3 bottom-2.5 text-[11px] text-gray-400 tabular-nums pointer-events-none" x-text="form.issuer.length + '/255'"></span></div></div><div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal penerbitan</label><div class="grid grid-cols-2 gap-3">
      ${selectDropdownHTML({ id: "honor-month", model: "form.month", options: "MONTH_OPTIONS", placeholder: "'Bulan'", overlay: true, optCheck: "text-[#1E3A8A] text-[12px] font-bold" })}
      ${selectDropdownHTML({ id: "honor-year", model: "form.year", options: "YEAR_OPTIONS_10", placeholder: "'Tahun'", overlay: true, optCheck: "text-[#1E3A8A] text-[12px] font-bold" })}
    </div></div><div class="space-y-1.5"><label for="honor-description" class="block text-[14px] font-medium text-gray-700">Deskripsi</label><textarea id="honor-description" rows="4" maxlength="2000" x-model="form.description"
      placeholder="Ceritakan tentang penghargaan ini, pencapaian Anda, kompetisi yang diikuti, dan dampaknya..." style="resize: none" class="${PC.textarea}"></textarea><div class="flex justify-end"><span class="text-[11px] text-gray-400 tabular-nums" x-text="form.description.length + '/2000'"></span></div></div><div class="space-y-1.5">
    ${mediaPickerHTML({ model: "form.media", label: "Media", max: "5" })}
  </div>`;

  return formModalHTML({
    open: "addHonorOpen",
    close,
    formId: "modalAddHonorForm",
    labelledby: "add-honor-title",
    xdata: "addHonorModal",
    title: "Tambah penghargaan",
    titleId: "add-honor-title",
    body,
    footer: defaultFooter(close),
  });
};

// Modal: Edit Penghargaan
ALUMNI_PARTIALS["modal-edit-honors"] = () => {
  const close = "editHonorsOpen = false";
  const inputCls = (k) => `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all" :class="${errInputClass(`showErr('${k}')`)}"`;
  const sd2 = (opts) => selectDropdownHTML({ clearCheck: "text-[#1E3A8A] text-[12px]", optCheck: "text-[12px]", ...opts });

  const detailForm = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="space-y-1.5 sm:col-span-2">
      ${labelRow({ label: "Judul penghargaan", required: true, err: "showErr('title')" })}
      <div class="relative"><input type="text" x-ref="honorEditTitle" autocomplete="off" maxlength="255" x-model="form.title" placeholder="Contoh: Juara 1 – Best Developer Award" ${inputCls("title")}><span class="absolute right-3 bottom-2.5 text-[11px] text-gray-400 tabular-nums pointer-events-none" x-text="form.title.length + '/255'"></span></div><p class="text-[12px] text-gray-500">Isi dengan judul dan/atau posisi, contoh: &quot;Juara 1 – Data Science Competition 2024&quot;</p></div><div class="space-y-1.5 sm:col-span-2">
      ${sd2({ id: "honor-education", label: "Terkait dengan", model: "form.relatedEducationId", options: "educations.map((e) => ({ value: String(e.id), label: e.name }))", placeholder: "educations.length === 0 ? 'Belum ada pendidikan' : 'Silakan pilih'" })}
      <template x-if="educations.length === 0"><p class="text-[12px] text-gray-500">Tambahkan data pendidikan untuk menghubungkan penghargaan.</p></template></div><div class="space-y-1.5 sm:col-span-2">
      ${labelRow({ label: "Pemberi penghargaan", required: true, err: "showErr('issuer')" })}
      <div class="relative"><input type="text" autocomplete="off" maxlength="255" x-model="form.issuer" placeholder="Contoh: Kementerian Pendidikan, Tech Summit Indonesia" ${inputCls("issuer")}><span class="absolute right-3 bottom-2.5 text-[11px] text-gray-400 tabular-nums pointer-events-none" x-text="form.issuer.length + '/255'"></span></div></div><div class="space-y-1.5 sm:col-span-2"><label class="block text-[14px] font-medium text-gray-700">Tanggal penerbitan</label><div class="grid grid-cols-2 gap-3">
        ${sd2({ id: "honor-month", model: "form.month", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
        ${sd2({ id: "honor-year", model: "form.year", options: "YEAR_OPTIONS_10", placeholder: "'Tahun'" })}
      </div></div><div class="space-y-1.5 sm:col-span-2"><label class="block text-[14px] font-medium text-gray-700">Deskripsi</label><textarea rows="4" maxlength="2000" x-model="form.description" placeholder="Ceritakan tentang penghargaan ini, pencapaian Anda, dan kompetisi yang diikuti..." style="resize: none" class="${PC.textarea}"></textarea><div class="flex justify-end"><span class="text-[11px] text-gray-400 tabular-nums" x-text="form.description.length + '/2000'"></span></div></div><div class="sm:col-span-2">
      ${mediaPickerHTML({ model: "form.media", label: "Media", max: "5" })}
    </div></div>`;

  const body = `<p class="text-[14.5px] text-gray-500 leading-relaxed">
    Pilih penghargaan yang ingin diperbarui, ubah detailnya, lalu simpan. Anda juga dapat menghapus penghargaan dari daftar.
  </p><template x-if="draftList.length === 0"><div class="py-8 text-center"><p class="text-[14px] text-gray-500 italic mb-4">Belum ada penghargaan. Tambahkan yang pertama.</p><button type="button" @click="addNew()" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-[14px] font-semibold shadow-sm transition-colors cursor-pointer">
        ${PI.plus("w-4 h-4")}
        Tambah penghargaan
      </button></div></template><template x-if="draftList.length > 0"><div class="contents"><div class="mt-5 border-b border-gray-200 pb-5"><h3 class="text-[14px] font-semibold text-gray-900 mb-3" x-text="'Penghargaan Anda (' + draftList.length + ')'"></h3><div class="space-y-2"><template x-for="(h, idx) in draftList" :key="h.id"><div class="${PC.listRow}" :class="h.id === selectedId ? '${PC.listRowActive}' : '${PC.listRowIdle}'"><button type="button" @click="selectHonor(h)" class="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"><div class="${PC.numBadge}" x-text="idx + 1"></div><div class="min-w-0 flex-1"><p class="text-[14px] font-medium text-gray-900 truncate" x-text="h.id === selectedId && form ? (form.title || 'Penghargaan baru') : (h.title || 'Penghargaan baru')"></p><p class="text-[12px] text-gray-500 truncate" x-text="rowSubtitle(h)"></p></div><template x-if="h.id === selectedId"><span class="ml-2 flex-shrink-0 text-[#1E3A8A]">${PI.pencil()}</span></template></button><button type="button" @click="removeHonor(h.id)" class="${PC.listTrash}" title="Hapus penghargaan">${PI.trash()}</button></div></template></div><button type="button" @click="addNew()" class="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] transition-colors cursor-pointer">
          ${PI.plus("w-3.5 h-3.5")}
          Tambah penghargaan baru
        </button></div><template x-if="form"><div class="mt-5 space-y-4"><h3 class="text-[14px] font-semibold text-gray-900">Detail penghargaan terpilih</h3>${detailForm}</div></template></div></template>`;

  return formModalHTML({
    open: "editHonorsOpen",
    close,
    formId: "modalEditHonorsForm",
    labelledby: "edit-honors-title",
    xdata: "editHonorsModal",
    title: "Edit penghargaan",
    titleId: "edit-honors-title",
    headerShrink: false,
    footerShrink: false,
    body,
    footer: defaultFooter(close, "draftList.length === 0"),
  });
};

// Form Organisasi
function orgFieldsHTML(prefix, refName) {
  const inputCls = (k) => `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all" :class="${errInputClass(`showErr('${k}')`)}"`;
  return `<div class="space-y-1.5">
    ${labelRow({ forId: prefix ? "edit-org-name" : "org-name", label: "Nama organisasi", required: true, err: "showErr('name')" })}
    <input id="${prefix ? "edit-org-name" : "org-name"}" x-ref="${refName}" type="text" autocomplete="off" x-model="form.name" @blur="blur('name')" placeholder="Contoh: Himpunan Mahasiswa Informatika" ${inputCls("name")}></div><div class="space-y-1.5">
    ${labelRow({ forId: prefix ? "edit-org-role" : "org-role", label: "Posisi yang dijabat", required: true, err: "showErr('role')" })}
    <input id="${prefix ? "edit-org-role" : "org-role"}" type="text" autocomplete="off" x-model="form.role" @blur="blur('role')" placeholder="Contoh: Ketua Umum, Staff Divisi Riset" ${inputCls("role")}></div><div class="space-y-1.5"><template x-if="educations.length === 0"><div class="contents space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Terkait dengan</label><p class="text-[13px] text-gray-500 italic">Tambahkan data pendidikan terlebih dahulu.</p></div></template><template x-if="educations.length > 0">
      ${selectDropdownHTML({ id: prefix ? "edit-org-education" : "org-education", label: "Terkait dengan", model: "form.relatedEducationId", options: "educations.map((e) => ({ value: String(e.id), label: e.name }))", placeholder: "'Silakan pilih'" })}
    </template></div>${currentCheckboxHTML("form.isCurrent", "Masih menjadi anggota")}<div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal mulai</label><div class="grid grid-cols-2 gap-3">
      ${selectDropdownHTML({ id: prefix ? "edit-org-start-month" : "org-start-month", model: "form.startMonth", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
      ${selectDropdownHTML({ id: prefix ? "edit-org-start-year" : "org-start-year", model: "form.startYear", options: "YEAR_OPTIONS_10", placeholder: "'Tahun'" })}
    </div></div><template x-if="!form.isCurrent"><div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal berakhir</label><div class="grid grid-cols-2 gap-3">
        ${selectDropdownHTML({ id: prefix ? "edit-org-end-month" : "org-end-month", model: "form.endMonth", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
        ${selectDropdownHTML({ id: prefix ? "edit-org-end-year" : "org-end-year", model: "form.endYear", options: "YEAR_OPTIONS_10", placeholder: "'Tahun'" })}
      </div></div></template><div class="space-y-1.5"><label for="${prefix ? "edit-org-desc" : "org-desc"}" class="block text-[14px] font-medium text-gray-700">Deskripsi</label><textarea id="${prefix ? "edit-org-desc" : "org-desc"}" rows="4" maxlength="2000" x-model="form.desc" placeholder="Ceritakan kegiatan, pencapaian, dan peran Anda di organisasi ini..." style="resize: none" class="${PC.textarea}"></textarea><div class="flex justify-end"><span class="text-[11px] text-gray-400 tabular-nums" x-text="form.desc.length + '/2000'"></span></div></div>`;
}

// Modal: Tambah & Edit Organisasi
ALUMNI_PARTIALS["modal-add-org"] = () => {
  const close = "addOrgOpen = false";
  return formModalHTML({
    open: "addOrgOpen",
    close,
    labelledby: "add-org-title",
    xdata: "addOrgModal",
    title: "Tambah organisasi",
    titleId: "add-org-title",
    body: orgFieldsHTML("", "orgName"),
    footer: defaultFooter(close),
  });
};

ALUMNI_PARTIALS["modal-edit-org"] = () => {
  const close = "editOrgOpen = false";
  const body = `<p class="text-[14.5px] text-gray-500 leading-relaxed">
    Pilih organisasi yang ingin diperbarui, ubah detailnya, lalu simpan. Anda juga dapat menghapus organisasi dari daftar.
  </p><template x-if="list.length === 0"><p class="text-[14px] text-gray-500 italic py-4 text-center">Belum ada organisasi untuk diedit.</p></template><template x-if="list.length > 0"><div class="contents"><div class="mt-5 border-b border-gray-200 pb-5"><h3 class="text-[14px] font-semibold text-gray-900 mb-3" x-text="'Organisasi Anda (' + list.length + ')'"></h3><div class="space-y-2"><template x-for="(org, idx) in list" :key="org.id"><div class="${PC.listRow}" :class="org.id === selectedId ? '${PC.listRowActive}' : '${PC.listRowIdle}'"><button type="button" @click="selectOrg(org)" class="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"><div class="${PC.numBadge}" x-text="idx + 1"></div><div class="min-w-0 flex-1"><p class="text-[14px] font-medium text-gray-900 truncate" x-text="org.id === selectedId && form ? (form.name || org.name) : org.name"></p><p class="text-[12px] text-gray-500 truncate"><span x-text="org.id === selectedId && form ? (form.role || org.role) : org.role"></span><template x-if="rowStart(org)"><span class="ml-1" x-text="'· ' + rowStart(org)"></span></template></p></div><template x-if="org.id === selectedId"><span class="ml-2 flex-shrink-0 text-[#1E3A8A]">${PI.pencil()}</span></template></button><button type="button" @click="removeOrg(org.id)" class="${PC.listTrash}" title="Hapus organisasi">${PI.trash()}</button></div></template></div></div><template x-if="form"><div class="mt-5 space-y-4"><h3 class="text-[14px] font-semibold text-gray-900">Detail organisasi terpilih</h3>${orgFieldsHTML("edit", "orgEditName")}</div></template></div></template>`;

  return formModalHTML({
    open: "editOrgOpen",
    close,
    labelledby: "edit-org-title",
    xdata: "editOrgModal",
    title: "Edit organisasi",
    titleId: "edit-org-title",
    body,
    footer: defaultFooter(close, "list.length === 0"),
  });
};

// Form Pendidikan
function eduFieldsHTML(edit) {
  const p = (s) => (edit ? `edit-edu-${s}` : `edu-${s}`);
  const inputCls = (k) => `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all" :class="${errInputClass(`showErr('${k}')`)}"`;
  return `<div class="space-y-1.5">
    ${labelRow({ forId: p("name"), label: "Institusi", required: true, err: "showErr('name')" })}
    <div class="relative" @mousedown.outside="openSuggest = false"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0"><template x-if="form.name.trim()">${educationLogoHTML("form.name", "''", "text-[15px]")}</template><template x-if="!form.name.trim()"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" class="text-gray-300"><path d="M12 3L2 9l10 6 10-6-10-6zM2 17l10 6 10-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></template></div><input id="${p("name")}" x-ref="${edit ? "eduEditName" : "eduName"}" type="text" autocomplete="off" role="combobox" :aria-expanded="suggestions.length > 0"
          x-model="form.name" @input="openSuggest = true" @focus="openSuggest = true" @blur="blur('name')"
          placeholder="Contoh: Universitas Airlangga" ${inputCls("name")}></div><template x-if="suggestions.length > 0"><ul role="listbox" class="absolute z-50 left-[60px] right-0 mt-1 rounded-xl border border-gray-200 bg-white shadow-xl py-1 overflow-hidden"><template x-for="s in suggestions" :key="s.name"><li role="option" :aria-selected="form.name === s.name" @mousedown.prevent="form.name = s.name; openSuggest = false; blur('name')"
              class="px-4 py-2.5 text-[14px] cursor-pointer transition-colors flex items-center gap-3 text-gray-800 hover:bg-gray-50"><span class="w-7 h-7 rounded-md overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">${educationLogoHTML("s.name", "''", "text-[10px]")}</span><span class="truncate" x-text="s.name"></span></li></template></ul></template></div>
    ${edit ? "" : `<p class="text-[12px] text-gray-400">Logo terisi otomatis dari nama institusi. Bila belum tepat, klik logo pada kartu untuk menggantinya.</p>`}
  </div><div class="space-y-1.5">
    ${labelRow({ forId: p("major"), label: "Jurusan", required: true, err: "showErr('major')" })}
    <input id="${p("major")}" type="text" autocomplete="off" x-model="form.major" @blur="blur('major')" placeholder="Contoh: Informatika" ${inputCls("major")}></div><div class="space-y-1.5"><label for="${p("degree")}" class="block text-[14px] font-medium text-gray-700">Gelar</label><input id="${p("degree")}" type="text" autocomplete="off" x-model="form.degree" placeholder="Contoh: S1, S2, SMA/SMK" class="${PC.input}"></div>${currentCheckboxHTML("form.isCurrent", "Saat ini saya bersekolah di sini")}<div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal mulai</label><div class="grid grid-cols-2 gap-3">
      ${selectDropdownHTML({ id: p("start-month"), model: "form.startMonth", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
      ${selectDropdownHTML({ id: p("start-year"), model: "form.startYear", options: "YEAR_OPTIONS_EDU", placeholder: "'Tahun'" })}
    </div></div><template x-if="!form.isCurrent"><div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal berakhir</label><div class="grid grid-cols-2 gap-3">
        ${selectDropdownHTML({ id: p("end-month"), model: "form.endMonth", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
        ${selectDropdownHTML({ id: p("end-year"), model: "form.endYear", options: "YEAR_OPTIONS_EDU", placeholder: "'Tahun'" })}
      </div></div></template><div class="space-y-1.5"><label for="${p("tag")}" class="block text-[14px] font-medium text-gray-700">Mata kuliah relevan</label><input id="${p("tag")}" type="text" autocomplete="off" x-model="tagInput" @keydown="tagKey($event)" placeholder="Ketik lalu tekan Enter (mis. Machine Learning)" class="${PC.input}"><template x-if="form.tags.length > 0"><div class="flex flex-wrap gap-2 pt-1"><template x-for="t in form.tags" :key="t"><span class="inline-flex items-center gap-1.5 h-8 pl-3.5 pr-2 rounded-full bg-blue-50 border border-blue-100 text-[#1E3A8A] text-[13px] font-semibold"><span x-text="t"></span><button type="button" @click="removeTag(t)" class="w-5 h-5 rounded-full flex items-center justify-center text-[#1E3A8A]/60 hover:text-[#1E3A8A] hover:bg-blue-100 transition-colors cursor-pointer" :aria-label="'Hapus ' + t">${PI.close("w-3 h-3")}</button></span></template></div></template></div>`;
}

// Modal: Tambah & Edit Pendidikan
ALUMNI_PARTIALS["modal-add-edu"] = () => {
  const close = "addEducationOpen = false";
  return formModalHTML({
    open: "addEducationOpen",
    close,
    labelledby: "add-edu-title",
    xdata: "addEduModal",
    title: "Tambah pendidikan",
    titleId: "add-edu-title",
    body: eduFieldsHTML(false),
    footer: defaultFooter(close),
  });
};

ALUMNI_PARTIALS["modal-edit-edu"] = () => {
  const close = "editEducationOpen = false";
  const body = `<p class="text-[14.5px] text-gray-500 leading-relaxed">
    Pilih pendidikan yang ingin diperbarui, ubah detailnya, lalu simpan. Anda juga dapat menghapus pendidikan dari daftar.
  </p><template x-if="list.length === 0"><p class="text-[14px] text-gray-500 italic py-4 text-center">Belum ada pendidikan untuk diedit.</p></template><template x-if="list.length > 0"><div class="contents"><div class="mt-5 border-b border-gray-200 pb-5"><h3 class="text-[14px] font-semibold text-gray-900 mb-3" x-text="'Pendidikan Anda (' + list.length + ')'"></h3><div class="space-y-2"><template x-for="(e, idx) in list" :key="e.id"><div class="${PC.listRow}" :class="e.id === selectedId ? '${PC.listRowActive}' : '${PC.listRowIdle}'"><button type="button" @click="selectEdu(e)" class="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"><div class="${PC.numBadge}" x-text="idx + 1"></div><div class="min-w-0 flex-1"><p class="text-[14px] font-medium text-gray-900 truncate" x-text="e.id === selectedId && form ? (form.name || e.name) : e.name"></p><p class="text-[12px] text-gray-500 truncate"><span x-text="e.id === selectedId && form ? (form.major || e.major) : e.major"></span><template x-if="rowStart(e)"><span class="ml-1" x-text="'· ' + rowStart(e)"></span></template></p></div><template x-if="e.id === selectedId"><span class="ml-2 flex-shrink-0 text-[#1E3A8A]">${PI.pencil()}</span></template></button><button type="button" @click="removeEdu(e.id)" class="${PC.listTrash}" title="Hapus pendidikan">${PI.trash()}</button></div></template></div></div><template x-if="form"><div class="mt-5 space-y-4"><h3 class="text-[14px] font-semibold text-gray-900">Detail pendidikan terpilih</h3>${eduFieldsHTML(true)}</div></template></div></template>`;

  return formModalHTML({
    open: "editEducationOpen",
    close,
    labelledby: "edit-edu-title",
    xdata: "editEduModal",
    title: "Edit pendidikan",
    titleId: "edit-edu-title",
    body,
    footer: defaultFooter(close, "list.length === 0"),
  });
};

// Form Proyek
function projectFieldsHTML(edit) {
  const inputCls = (k) => `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all" :class="${errInputClass(`showErr('${k}')`)}"`;
  const textareaCls = `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition-all leading-relaxed" :class="${errInputClass(`showErr('desc')`)}"`;
  const star = '<span class="text-red-500 font-bold">*</span>';
  return `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="space-y-1.5">
      ${labelRow({ forId: edit ? "edit-project-title-input" : "project-title", label: "Judul proyek", required: true, star, err: "showErr('title')" })}
      <input id="${edit ? "edit-project-title-input" : "project-title"}" x-ref="${edit ? "projectEditTitle" : "projectTitle"}" type="text" autocomplete="off" x-model="form.title" @blur="blur('title')" ${edit ? "" : 'placeholder="Contoh: Sistem Prediksi UMKM"'} ${inputCls("title")}></div><div class="space-y-1.5">
      ${labelRow({ forId: edit ? "edit-project-period" : "project-period", label: "Periode", required: true, star, err: "showErr('period')" })}
      <input id="${edit ? "edit-project-period" : "project-period"}" type="text" autocomplete="off" x-model="form.period" @blur="blur('period')" ${edit ? "" : 'placeholder="Contoh: Jun 2026 – Jun 2026"'} ${inputCls("period")}></div><div class="space-y-1.5 sm:col-span-2">
      ${labelRow({ forId: edit ? "edit-project-desc" : "project-desc", label: "Deskripsi", required: true, star, err: "showErr('desc')" })}
      <textarea id="${edit ? "edit-project-desc" : "project-desc"}" rows="3" x-model="form.desc" @blur="blur('desc')" ${edit ? "" : 'placeholder="Jelaskan tujuan, teknologi, dan hasil dari proyek ini..."'} style="resize: none" ${textareaCls}></textarea></div><div class="sm:col-span-2">${contributorPickerHTML(edit ? "edit-project-contributor" : "project-contributor", "form.contributors")}</div><div class="sm:col-span-2">
      ${skillPickerHTML({ id: edit ? "edit-project-skills" : "project-skills", model: "form.skills" })}
    </div><div class="sm:col-span-2 space-y-1.5">
      ${mediaPickerHTML({ model: "form.media" })}
      <template x-if="showErr('media')"><p class="text-[12px] text-red-600 font-medium" x-text="showErr('media')"></p></template></div></div>`;
}

// Modal: Tambah & Edit Proyek
ALUMNI_PARTIALS["modal-add-project"] = () => {
  const close = "addProjectOpen = false";
  return formModalHTML({
    open: "addProjectOpen",
    close,
    formId: "modalAddProjectForm",
    labelledby: "add-project-title",
    xdata: "addProjectModal",
    title: "Tambah proyek",
    titleId: "add-project-title",
    headerShrink: false,
    footerShrink: false,
    body: projectFieldsHTML(false),
    footer: defaultFooter(close),
  });
};

ALUMNI_PARTIALS["modal-edit-project"] = () => {
  const close = "editProjectOpen = false";
  const body = `<p class="text-[14.5px] text-gray-500 leading-relaxed">
    Pilih proyek yang ingin diperbarui, ubah detailnya, lalu simpan. Anda juga dapat menghapus proyek dari daftar.
  </p><template x-if="draftList.length === 0"><p class="text-[14px] text-gray-500 italic">Belum ada proyek untuk diedit.</p></template><template x-if="draftList.length > 0"><div class="contents"><div class="mt-5 border-b border-gray-200 pb-5"><h3 class="text-[14px] font-semibold text-gray-900 mb-3" x-text="'Proyek Anda (' + draftList.length + ')'"></h3><div class="space-y-2"><template x-for="(p, idx) in draftList" :key="p.id"><div class="${PC.listRow}" :class="p.id === selectedId ? '${PC.listRowActive}' : '${PC.listRowIdle}'"><button type="button" @click="selectProject(p)" class="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"><div class="${PC.numBadge}" x-text="idx + 1"></div><div class="min-w-0 flex-1"><p class="text-[14px] font-medium text-gray-900 truncate" x-text="p.title"></p><p class="text-[12px] text-gray-500 truncate" x-text="p.period"></p></div><template x-if="p.id === selectedId"><span class="ml-2 flex-shrink-0 text-[#1E3A8A]">${PI.pencil()}</span></template></button><button type="button" @click="removeProject(p.id)" class="${PC.listTrash}" title="Hapus proyek">${PI.trash()}</button></div></template></div></div><template x-if="form"><div class="mt-5 space-y-4"><h3 class="text-[14px] font-semibold text-gray-900">Detail proyek terpilih</h3>${projectFieldsHTML(true)}</div></template></div></template>`;

  return formModalHTML({
    open: "editProjectOpen",
    close,
    formId: "modalEditProjectForm",
    labelledby: "edit-project-title",
    xdata: "editProjectModal",
    title: "Edit proyek",
    titleId: "edit-project-title",
    headerShrink: false,
    footerShrink: false,
    body,
    footer: defaultFooter(close, "draftList.length === 0"),
  });
};

// Form Sertifikasi
function certFieldsHTML(edit) {
  const p = (s) => (edit ? `edit-cert-${s}` : `cert-${s}`);
  const inputCls = (k) => `class="w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] outline-none transition-all placeholder:text-gray-400" :class="showErr('${k}') ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A]'"`;
  const star = '<span class="text-red-500 font-bold">*</span>';
  return `<div class="space-y-1.5">
    ${labelRow({ forId: p("name"), label: "Nama", required: true, star, err: "showErr('name')" })}
    <input id="${p("name")}" x-ref="${edit ? "certEditName" : "certName"}" type="text" placeholder="Mis.: Microsoft certified network associate security" x-model="form.name" @blur="blur('name')" ${inputCls("name")}></div><div class="space-y-1.5">
    ${labelRow({ forId: p("issuer"), label: "Organisasi penerbit", required: true, star, err: "showErr('issuer')" })}
    <input id="${p("issuer")}" type="text" placeholder="Misalnya: Microsoft" x-model="form.issuer" @blur="blur('issuer')" ${inputCls("issuer")}></div><div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal penerbitan</label><div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      ${selectDropdownHTML({ id: p("issue-month"), model: "form.issueMonth", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
      ${selectDropdownHTML({ id: p("issue-year"), model: "form.issueYear", options: "YEAR_OPTIONS_CERT", placeholder: "'Tahun'" })}
    </div></div><div class="space-y-1.5"><label class="block text-[14px] font-medium text-gray-700">Tanggal kedaluwarsa</label><div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      ${selectDropdownHTML({ id: p("expire-month"), model: "form.expireMonth", options: "MONTH_OPTIONS", placeholder: "'Bulan'" })}
      ${selectDropdownHTML({ id: p("expire-year"), model: "form.expireYear", options: "YEAR_OPTIONS_CERT", placeholder: "'Tahun'" })}
    </div></div><div class="space-y-1.5"><div class="flex items-center justify-between"><label for="${p("cred-id")}" class="block text-[14px] font-medium text-gray-700">ID Kredensial</label><span class="text-[12px] text-gray-400 tabular-nums" x-text="form.credId.length + '/80'"></span></div><input id="${p("cred-id")}" type="text" maxlength="80" placeholder="Contoh: RYGYG6DS1R1G" x-model="form.credId" ${inputCls("credId")}></div><div class="space-y-1.5"><label for="${p("url")}" class="block text-[14px] font-medium text-gray-700">URL Kredensial</label><input id="${p("url")}" type="text" placeholder="https://..." x-model="form.url" ${inputCls("url")}></div><div class="space-y-2 pt-2 border-t border-gray-100"><div><label class="block text-[15px] font-semibold text-gray-900">Keahlian</label><p class="text-[13px] text-gray-500 mt-0.5">${edit ? "Kaitkan minimal 1 keahlian ke lisensi atau sertifikasi ini." : "Kaitkan minimal 1 keahlian ke lisensi atau sertifikasi ini. Akan ditampilkan juga di bagian Keahlian."}</p></div>
    ${skillPickerHTML({ id: p("skills"), model: "form.skills", label: "", placeholder: "Cari keahlian, misal: Linux, Docker, Python..." })}
  </div>`;
}

// Modal: Tambah & Edit Sertifikasi
ALUMNI_PARTIALS["modal-add-cert"] = () => {
  const close = "addCertificationOpen = false";
  return formModalHTML({
    open: "addCertificationOpen",
    close,
    labelledby: "add-cert-title",
    xdata: "addCertModal",
    headerExtra: `<div><h2 id="add-cert-title" class="text-[20px] font-bold text-gray-900 tracking-tight">Tambahkan lisensi atau sertifikasi</h2><p class="text-[13px] text-gray-400 mt-0.5">* Wajib diisi</p></div>`,
    body: certFieldsHTML(false),
    footerCls: "border-t border-gray-200 px-6 sm:px-8 py-4 bg-gray-50/50 flex items-center justify-end gap-3 flex-shrink-0",
    footer: `<button type="button" @click="${close}" class="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-[14.5px] hover:bg-gray-100 transition-colors cursor-pointer">Batal</button><button type="submit" class="px-7 py-2.5 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-semibold text-[14.5px] shadow-sm transition-colors cursor-pointer">Simpan</button>`,
  });
};

ALUMNI_PARTIALS["modal-edit-cert"] = () => {
  const close = "editCertificationOpen = false";
  const body = `<p class="text-[14px] text-gray-500 leading-relaxed">
    Pilih sertifikasi yang ingin diperbarui dari daftar di bawah, ubah informasinya, lalu simpan perubahan.
  </p><div class="border-b border-gray-200 pb-5"><h3 class="text-[14px] font-semibold text-gray-900 mb-3" x-text="'Daftar Sertifikasi (' + list.length + ')'"></h3><template x-if="list.length === 0"><p class="text-[14px] text-gray-400 italic py-3 text-center">Belum ada sertifikasi.</p></template><template x-if="list.length > 0"><div class="space-y-2"><template x-for="(c, idx) in list" :key="c.id"><div class="${PC.listRow}" :class="c.id === selectedId ? 'border-blue-300 bg-blue-50/70' : 'border-gray-200 bg-gray-50/70 hover:bg-gray-100/70'"><button type="button" @click="selectCert(c)" class="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"><div class="${PC.numBadge}" x-text="idx + 1"></div><div class="min-w-0 flex-1"><p class="text-[14px] font-medium text-gray-900 truncate" x-text="c.name"></p><p class="text-[12px] text-gray-500 truncate" x-text="c.issuer + ' • ' + c.date"></p></div><template x-if="c.id === selectedId"><span class="ml-2 flex-shrink-0 text-[#1E3A8A]">${PI.pencil()}</span></template></button><button type="button" @click="removeCert(c.id)" class="${PC.listTrash}" title="Hapus sertifikasi">${PI.trash()}</button></div></template></div></template></div><template x-if="form"><div class="space-y-4 pt-1"><div><h3 class="text-[15px] font-semibold text-gray-900">Detail sertifikasi terpilih</h3></div>${certFieldsHTML(true)}</div></template>`;

  return formModalHTML({
    open: "editCertificationOpen",
    close,
    labelledby: "edit-cert-title",
    xdata: "editCertModal",
    title: "Edit lisensi &amp; sertifikasi",
    titleId: "edit-cert-title",
    body,
    footerCls: "border-t border-gray-200 px-6 sm:px-8 py-4 bg-gray-50/50 flex items-center justify-end gap-3 flex-shrink-0",
    footer: `<button type="button" @click="${close}" class="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-[14.5px] hover:bg-gray-100 transition-colors cursor-pointer">Batal</button><button type="submit" class="px-6 py-2.5 rounded-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white font-semibold text-[14.5px] shadow-sm transition-colors cursor-pointer">Simpan</button>`,
  });
};
