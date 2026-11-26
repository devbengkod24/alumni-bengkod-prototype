(function () {
  const routes = {
    "dashboard.html": ["Beranda"],
    "beranda.html": ["Beranda", "dashboard.html"],
    "direktori.html": ["Direktori Alumni"],
    "detail.html": ["Profil Alumni", "direktori.html"],
    "profil-alumni.html": ["Profil Alumni", "direktori.html"],
    "showcase.html": ["Karya"],
    "detail-karya.html": ["Detail Karya", "showcase.html"],
    "detail-proyek.html": ["Detail Karya", "showcase.html"],
    "launch-karya.html": ["Publikasikan Karya", "showcase.html"],
    "gigs.html": ["Proyek"],
    "lempar-proyek.html": ["Publikasikan Proyek", "gigs.html"],
    "gigs-pelamar.html": ["Pelamar Proyek", "gigs.html"],
    "referral.html": ["Lowongan"],
    "bagikan-referral.html": ["Bagikan Lowongan", "referral.html"],
    "referral-pengajuan.html": ["Pengajuan Lowongan", "referral.html"],
    "data-cv.html": ["Data CV"],
    "kategori-cv.html": ["Kelola Data CV", "data-cv.html"],
    "profil.html": ["Profil Saya"],
    "edit-profil.html": ["Edit Profil", "profil.html"],
    "pengaturan.html": ["Pengaturan Akun", "profil.html"],
    "tracer.html": ["Studi Pelacakan Alumni", "profil.html"],
    "pengumuman.html": ["Pengumuman"],
    "notifikasi.html": ["Notifikasi"]
  };

  const icons = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/><circle cx="9" cy="7" r="4"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3m-5 0v13"/>',
    work: '<path d="M4 21v-4a4 4 0 0 1 4-4h3m3 5 2 2 5-5"/><circle cx="9" cy="6" r="3"/>',
    file: '<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/>',
    person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>',
    exit: '<path d="M10 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5m-2-7h13m-4-4 4 4-4 4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 6-3 7-3 9h18c0-2-3-3-3-9m-8 12a2 2 0 0 0 4 0"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    flag: '<path d="M4 22V4m0 0h12l-2 4 2 4H4"/>',
    chart: '<path d="M3 3v18h18M8 17v-5m5 5V8m5 9v-3"/>',
    idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.6-1.2 1.7-2 3-2s2.4.8 3 2m3-6h3m-3 3h3"/>',
    building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m0-10h2a2 2 0 0 1 2 2v8M2 21h20M8 7h4m-4 4h4m-4 4h4"/>',
    trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4m10-4h3a3 3 0 0 1-3 4"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1Zm15-2a4 4 0 0 1 0 6M7 14l1.5 5"/>'
  };
  const icon = name => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
  const groups = [
    ["Menu Utama", [["dashboard.html", "home"], ["direktori.html", "people"], ["showcase.html", "folder"], ["gigs.html", "case"], ["referral.html", "work"]]],
    ["Lainnya", [["data-cv.html", "file"], ["profil.html", "person"]]]
  ];
  const ALUMNI_NAV = {
    routes,
    groups,
    home: "dashboard.html",
    root: "Alumni",
    brand: "Jejaring Alumni",
    label: "alumni",
    accountLinks: [["profil.html", "Profil Saya"], ["pengaturan.html", "Pengaturan Akun"]]
  };
  const desktopPreference = "bengkod_portal_sidebar_open";
  const notifStorageKey = "bengkod_notifications_v1";
  const notifImgBase = new URL("../img/notif/", document.currentScript.src).href;
  const notifKindIcons = {
    referral: notifImgBase + "referral.svg",
    gigs: notifImgBase + "gigs.svg",
    announcement: notifImgBase + "announcement.svg"
  };
  const DEFAULT_NOTIFICATIONS = [
    {
      id: "notif-1",
      kind: "referral",
      title: "Yoga Kurniawan meminta review dan referral untuk Backend Developer Intern di PT Solusi Digital Jateng.",
      meta: "Pengajuan referral baru · 4 Nov 2026",
      href: "referral.html",
      unread: true
    },
    {
      id: "notif-2",
      kind: "gigs",
      title: "Kirana Maheswari mengajukan minat di Sistem Presensi QR Code Mobile App untuk Event Komunitas.",
      meta: "Pelamar gigs baru · 3 Nov 2026",
      href: "gigs.html",
      unread: true
    },
    {
      id: "notif-3",
      kind: "gigs",
      title: "Dimas Aryo mengajukan minat di Sistem Presensi QR Code Mobile App untuk Event Komunitas.",
      meta: "Pelamar gigs baru · 2 Nov 2026",
      href: "gigs.html",
      unread: true
    },
    {
      id: "notif-4",
      kind: "announcement",
      title: "Jadwal Pelepasan Alumni Angkatan 2024 sudah terbit.",
      meta: "Pengumuman koordinator · 24 Okt 2026",
      href: "pengumuman.html#pengumuman-1",
      unread: true
    },
    {
      id: "notif-5",
      kind: "announcement",
      title: "Pengisian Data Alumni Terbaru: perbarui profil, keahlian, dan tracer study Anda.",
      meta: "Pengumuman koordinator · 21 Okt 2026",
      href: "pengumuman.html#pengumuman-2",
      unread: true
    }
  ];

  function escapeHtml(text) {
    return String(text || "").replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    }[ch]));
  }

  function loadNotifications() {
    try {
      const saved = JSON.parse(localStorage.getItem(notifStorageKey));
      if (Array.isArray(saved)) return saved;
    } catch {}
    return DEFAULT_NOTIFICATIONS.map(item => ({ ...item }));
  }

  function saveNotifications(list) {
    try {
      localStorage.setItem(notifStorageKey, JSON.stringify(list));
    } catch {}
    window.dispatchEvent(new CustomEvent("bengkod:notifications-change"));
  }

  window.BengkodNotifications = {
    getAll: loadNotifications,
    unreadCount() {
      return loadNotifications().filter(item => item.unread).length;
    },
    markRead(id) {
      const list = loadNotifications();
      let changed = false;
      const updated = list.map(item => {
        if (item.id === id && item.unread) {
          changed = true;
          return { ...item, unread: false };
        }
        return item;
      });
      if (changed) saveNotifications(updated);
    },
    markAllRead() {
      const list = loadNotifications();
      if (!list.some(item => item.unread)) return;
      saveNotifications(list.map(item => ({ ...item, unread: false })));
    },
    remove(id) {
      const list = loadNotifications();
      const updated = list.filter(item => item.id !== id);
      if (updated.length !== list.length) saveNotifications(updated);
    },
    clear() {
      if (!loadNotifications().length) return;
      saveNotifications([]);
    },
    iconUrl(kind) {
      return notifKindIcons[kind] || notifKindIcons.announcement;
    }
  };

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("../css/portal-layout.css?v=3", document.currentScript.src).href;
  document.head.append(stylesheet);

  function firstText(...values) {
    return values.find(value => typeof value === "string" && value.trim())?.trim() || "";
  }

  function profileForPortal(profile) {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem("bengkod_alumni_profile"));
    } catch {}
    const defaults = typeof DEFAULT_PROFIL_SAYA !== "undefined" ? DEFAULT_PROFIL_SAYA
      : typeof ALUMNI_DIRECTORY !== "undefined" ? ALUMNI_DIRECTORY[0] : null;
    const name = firstText(profile?.name, saved?.name, defaults?.name, "Aisha Dwi Rahmawati");
    const batch = firstText(profile?.batch, saved?.batch, defaults?.batch, "2024");
    return {
      name,
      initials: name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase(),
      meta: profile?.meta || "Alumni " + batch
    };
  }

  function routeContext(file, search, routes = ALUMNI_NAV.routes) {
    let [title, parent] = routes[file] || ["Halaman Alumni"];
    let profileHref = "";
    const alumniId = new URLSearchParams(search).get("alumni");
    if (file === "detail-proyek.html" && alumniId) {
      title = "Detail Proyek";
      parent = "direktori.html";
      profileHref = "detail.html?id=" + encodeURIComponent(alumniId);
    }
    const sameAsParent = file === "beranda.html";
    return {
      title,
      active: parent || file,
      parents: [...(parent && !sameAsParent ? [[routes[parent][0], parent]] : []),
        ...(profileHref ? [["Profil Alumni", profileHref]] : [])]
    };
  }

  function renderBreadcrumb(nav, context, root = [ALUMNI_NAV.root, ALUMNI_NAV.home]) {
    const links = [root, ...context.parents];
    const list = document.createElement("ol");
    for (const [label, href] of links) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      link.title = label;
      item.append(link);
      list.append(item);
    }
    const current = document.createElement("li");
    current.setAttribute("aria-current", "page");
    const label = document.createElement("span");
    label.textContent = context.title;
    label.title = context.title;
    current.append(label);
    list.append(current);
    nav.append(list);
  }

  function mountAlumniPortal(main, { profile, logout, nav: navConfig, title, notifications } = {}) {
    if (!main || main.closest(".alumni-portal")) return null;
    const cfg = { ...ALUMNI_NAV, ...navConfig };
    const notif = notifications || window.BengkodNotifications;
    const file = location.pathname.split("/").pop() || cfg.home;
    const context = routeContext(file, location.search, cfg.routes);
    if (title) context.title = title;
    const user = profileForPortal(profile);
    const shell = document.createElement("div");
    shell.className = "alumni-portal";
    shell.innerHTML = `
      <div class="portal-overlay" hidden></div>
      <aside class="portal-sidebar" id="portal-sidebar" aria-label="Menu ${cfg.label}">
        <div class="portal-brand-row">
          <a class="portal-brand" href="${cfg.home}">
            <span class="portal-brand-mark" aria-hidden="true">BK</span>
            <span><strong>bengkod</strong><small>${escapeHtml(cfg.brand)}</small></span>
          </a>
          <button type="button" class="portal-icon portal-close" aria-label="Tutup menu">${icon("close")}</button>
        </div>
        <nav class="portal-nav" aria-label="Navigasi ${cfg.label}">
          ${cfg.groups.map(([label, links]) => `
            <div class="portal-nav-group">
              <p>${label}</p>
              ${links.map(([href, glyph, badge]) => `
                <a href="${href}"${context.active === href ? ' class="portal-active"' : ''}${file === href || (file === "beranda.html" && href === "dashboard.html") ? ' aria-current="page"' : ''}>
                  ${icon(glyph)}<span>${cfg.routes[href][0]}</span>${badge === undefined ? "" : `<span class="portal-nav-badge" data-nav-badge="${href}"${badge ? "" : " hidden"}>${badge}</span>`}
                </a>`).join("")}
            </div>`).join("")}
          <button class="portal-logout" type="button" data-portal-logout>${icon("exit")}<span>Keluar</span></button>
        </nav>
      </aside>
      <div class="portal-content">
        <header class="portal-topbar">
          <div class="portal-topbar-start">
            <button type="button" class="portal-icon portal-toggle" aria-label="Buka menu" aria-controls="portal-sidebar" aria-expanded="false">${icon("menu")}</button>
            <nav class="portal-breadcrumb" aria-label="Jejak navigasi"></nav>
          </div>
          <div class="portal-topbar-end">
            <div class="portal-notif-wrap">
              <button type="button" class="portal-icon portal-notif-trigger" aria-label="Notifikasi" aria-haspopup="dialog" aria-expanded="false"${file === "notifikasi.html" ? ' aria-current="page"' : ''}>
                ${icon("bell")}
                <span class="portal-notif-badge" hidden></span>
              </button>
              <section class="portal-notif-panel" role="dialog" aria-label="Panel Notifikasi" hidden></section>
            </div>
            <details class="portal-account">
              <summary aria-label="Menu akun">
                <span class="portal-avatar" aria-hidden="true"></span>
                <span class="portal-account-text"><strong></strong><small></small></span>
                ${icon("chevron")}
              </summary>
              <div class="portal-account-menu">
                ${cfg.accountLinks.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("")}
                <button type="button" data-portal-logout>Keluar</button>
              </div>
            </details>
          </div>
        </header>
      </div>`;

    renderBreadcrumb(shell.querySelector(".portal-breadcrumb"), context, [cfg.root, cfg.home]);
    shell.querySelector(".portal-avatar").textContent = user.initials;
    shell.querySelector(".portal-account-text strong").textContent = user.name;
    shell.querySelector(".portal-account-text small").textContent = user.meta;
    const content = shell.querySelector(".portal-content");
    document.documentElement.classList.add("has-alumni-portal");
    main.before(shell);
    content.append(main);

    const desktop = window.matchMedia("(min-width: 1024px)");
    let desktopOpen = true;
    let mobileOpen = false;
    const sidebar = shell.querySelector(".portal-sidebar");
    const overlay = shell.querySelector(".portal-overlay");
    const toggle = shell.querySelector(".portal-toggle");
    const close = shell.querySelector(".portal-close");
    const account = shell.querySelector(".portal-account");
    const notifWrap = shell.querySelector(".portal-notif-wrap");
    const notifTrigger = shell.querySelector(".portal-notif-trigger");
    const notifBadge = shell.querySelector(".portal-notif-badge");
    const notifPanel = shell.querySelector(".portal-notif-panel");
    let notifOpen = false;
    let confirmingClear = false;
    const trashSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

    function syncNotifications() {
      const items = notif.getAll();
      if (!items.length) confirmingClear = false;
      const unread = items.filter(item => item.unread).length;
      notifBadge.textContent = unread > 99 ? "99+" : String(unread);
      notifBadge.hidden = unread === 0;
      notifTrigger.setAttribute("aria-label", unread ? `Notifikasi (${unread} belum dibaca)` : "Notifikasi");

      const headHtml = confirmingClear ? `
        <div class="portal-notif-confirm">
          <span>Hapus semua notifikasi?</span>
          <div class="portal-notif-confirm-actions">
            <button type="button" class="portal-notif-confirm-yes" data-notif-clear-yes>Ya, Hapus</button>
            <button type="button" class="portal-notif-confirm-no" data-notif-clear-no>Batal</button>
          </div>
        </div>` : `
        <div class="portal-notif-head-title">
          <h2>Notifikasi</h2>
          ${unread ? `<span class="portal-notif-pill">${unread} baru</span>` : ""}
        </div>
        <div class="portal-notif-head-actions">
          ${unread ? `<button type="button" class="portal-notif-markall" data-notif-mark-all>Tandai semua dibaca</button>` : ""}
          ${items.length && notif.clear ? `<button type="button" class="portal-notif-clear" data-notif-clear aria-label="Hapus semua notifikasi" title="Hapus semua notifikasi">${trashSvg}</button>` : ""}
          <button type="button" class="portal-notif-close" data-notif-close aria-label="Tutup panel notifikasi">
            <img src="${notifImgBase}close.svg" alt="">
          </button>
        </div>`;

      const listHtml = items.length ? items.slice(0, 3).map(item => `
        <div class="portal-notif-item${item.unread ? " is-unread" : ""}">
          <a class="portal-notif-link" href="${escapeHtml(item.href)}" data-notif-item="${escapeHtml(item.id)}">
            <span class="portal-notif-iconbox" aria-hidden="true">
              <img class="portal-notif-kind-img" src="${window.BengkodNotifications.iconUrl(item.kind)}" alt="">
            </span>
            <span class="portal-notif-copy">
              <span class="portal-notif-title">${escapeHtml(item.title)}</span>
              <span class="portal-notif-meta">${escapeHtml(item.meta)}</span>
            </span>
            ${item.unread ? '<span class="portal-notif-dot" aria-label="Belum dibaca"></span>' : '<span class="portal-notif-dot-spacer" aria-hidden="true"></span>'}
          </a>
          ${notif.remove ? `<button type="button" class="portal-notif-remove" data-notif-remove="${escapeHtml(item.id)}" aria-label="Hapus notifikasi" title="Hapus notifikasi">${trashSvg}</button>` : ""}
        </div>`).join("") : `<p class="portal-notif-empty">Belum ada notifikasi.</p>`;

      notifPanel.innerHTML = `
        <div class="portal-notif-head">${headHtml}</div>
        <div class="portal-notif-list">${listHtml}</div>
        <a class="portal-notif-footer" href="${notif.allHref || "notifikasi.html"}" data-notif-all>
          <span>Lihat semua notifikasi</span>
          <span aria-hidden="true">→</span>
        </a>`;
    }

    function setNotifOpen(open) {
      notifOpen = open;
      if (!open) confirmingClear = false;
      notifPanel.hidden = !open;
      notifTrigger.setAttribute("aria-expanded", String(open));
      if (open) {
        account.open = false;
        syncNotifications();
      }
    }

    notifTrigger.addEventListener("click", event => {
      event.stopPropagation();
      setNotifOpen(!notifOpen);
    });
    notifPanel.addEventListener("click", event => {
      if (event.target.closest("[data-notif-close]")) {
        setNotifOpen(false);
        notifTrigger.focus();
        return;
      }
      if (event.target.closest("[data-notif-mark-all]")) {
        event.stopPropagation();
        notif.markAllRead();
        syncNotifications();
        return;
      }
      if (event.target.closest("[data-notif-clear]")) {
        event.stopPropagation();
        confirmingClear = true;
        syncNotifications();
        return;
      }
      if (event.target.closest("[data-notif-clear-no]")) {
        event.stopPropagation();
        confirmingClear = false;
        syncNotifications();
        return;
      }
      if (event.target.closest("[data-notif-clear-yes]")) {
        event.stopPropagation();
        confirmingClear = false;
        notif.clear?.();
        syncNotifications();
        return;
      }
      const removeBtn = event.target.closest("[data-notif-remove]");
      if (removeBtn) {
        event.stopPropagation();
        notif.remove?.(removeBtn.dataset.notifRemove);
        syncNotifications();
        return;
      }
      if (notif.showAll && event.target.closest("[data-notif-all]")) {
        event.preventDefault();
        setNotifOpen(false);
        notif.showAll();
        return;
      }
      const itemLink = event.target.closest("[data-notif-item]");
      if (itemLink) {
        notif.markRead(itemLink.dataset.notifItem);
      }
    });
    window.addEventListener("bengkod:notifications-change", syncNotifications);
    syncNotifications();

    function syncSidebar() {
      const open = desktop.matches ? desktopOpen : mobileOpen;
      const drawer = !desktop.matches && mobileOpen;
      sidebar.hidden = !open;
      overlay.hidden = !drawer;
      shell.dataset.sidebarOpen = String(open);
      content.inert = drawer;
      if (drawer) {
        sidebar.setAttribute("role", "dialog");
        sidebar.setAttribute("aria-modal", "true");
      } else {
        sidebar.removeAttribute("role");
        sidebar.removeAttribute("aria-modal");
      }
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    }

    function closeDrawer() {
      mobileOpen = false;
      syncSidebar();
      toggle.focus();
    }

    toggle.addEventListener("click", () => {
      if (desktop.matches) {
        desktopOpen = !desktopOpen;
        try {
          localStorage.setItem(desktopPreference, String(desktopOpen));
        } catch {}
        syncSidebar();
      } else {
        mobileOpen = true;
        account.open = false;
        syncSidebar();
        close.focus();
      }
    });
    close.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
    desktop.addEventListener("change", () => {
      mobileOpen = false;
      const hadSidebarFocus = sidebar.contains(document.activeElement);
      syncSidebar();
      if (hadSidebarFocus && sidebar.hidden) toggle.focus();
    });
    document.addEventListener("click", event => {
      if (!account.contains(event.target)) account.open = false;
      if (notifOpen && !notifWrap.contains(event.target)) setNotifOpen(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        closeDrawer();
      } else if (notifOpen) {
        setNotifOpen(false);
        notifTrigger.focus();
      } else if (account.open) {
        account.open = false;
        account.querySelector("summary").focus();
      }
    });

    for (const button of shell.querySelectorAll("[data-portal-logout]")) {
      button.addEventListener("click", () => {
        if (logout) {
          logout();
        } else if (window.confirm("Keluar dari Portal Alumni Bengkel Koding?")) {
          window.DB?.akun?.keluar();
          try { localStorage.removeItem("alumni_revisi_sesi_v1"); } catch {}
          location.href = "login.html?keluar=1";
        }
      });
    }
    syncSidebar();
    return content;
  }

  window.mountAlumniPortal = mountAlumniPortal;
})();
