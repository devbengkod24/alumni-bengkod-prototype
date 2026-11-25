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
    "pengumuman.html": ["Pengumuman"]
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
    chevron: '<path d="m6 9 6 6 6-6"/>'
  };
  const icon = name => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
  const groups = [
    ["Menu Utama", [["dashboard.html", "home"], ["direktori.html", "people"], ["showcase.html", "folder"], ["gigs.html", "case"], ["referral.html", "work"]]],
    ["Lainnya", [["data-cv.html", "file"], ["profil.html", "person"]]]
  ];
  const desktopPreference = "bengkod_portal_sidebar_open";
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("../css/portal-layout.css", document.currentScript.src).href;
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
    const headline = firstText(profile?.headline, saved?.headline, defaults?.headline);
    return {
      name,
      initials: name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase(),
      meta: ["Alumni " + batch, headline].filter(Boolean).join(" · ")
    };
  }

  function routeContext(file, search) {
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

  function renderBreadcrumb(nav, context) {
    const links = [["Alumni", "dashboard.html"], ...context.parents];
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

  function mountAlumniPortal(main, { profile, logout } = {}) {
    if (!main || main.closest(".alumni-portal")) return null;
    const file = location.pathname.split("/").pop();
    const context = routeContext(file, location.search);
    const user = profileForPortal(profile);
    const shell = document.createElement("div");
    shell.className = "alumni-portal";
    shell.innerHTML = `
      <div class="portal-overlay" hidden></div>
      <aside class="portal-sidebar" id="portal-sidebar" aria-label="Menu alumni">
        <div class="portal-brand-row">
          <a class="portal-brand" href="dashboard.html">
            <span class="portal-brand-mark" aria-hidden="true">BK</span>
            <span><strong>bengkod</strong><small>Jejaring Alumni</small></span>
          </a>
          <button type="button" class="portal-icon portal-close" aria-label="Tutup menu">${icon("close")}</button>
        </div>
        <nav class="portal-nav" aria-label="Navigasi alumni">
          ${groups.map(([label, links]) => `
            <div class="portal-nav-group">
              <p>${label}</p>
              ${links.map(([href, glyph]) => `
                <a href="${href}"${context.active === href ? ' class="portal-active"' : ''}${file === href || (file === "beranda.html" && href === "dashboard.html") ? ' aria-current="page"' : ''}>
                  ${icon(glyph)}<span>${routes[href][0]}</span>
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
            <a class="portal-icon" href="pengumuman.html" aria-label="Pengumuman"${file === "pengumuman.html" ? ' aria-current="page"' : ''}>${icon("bell")}</a>
            <details class="portal-account">
              <summary aria-label="Menu akun">
                <span class="portal-avatar" aria-hidden="true"></span>
                <span class="portal-account-text"><strong></strong><small></small></span>
                ${icon("chevron")}
              </summary>
              <div class="portal-account-menu">
                <a href="profil.html">Profil Saya</a>
                <a href="pengaturan.html">Pengaturan Akun</a>
                <button type="button" data-portal-logout>Keluar</button>
              </div>
            </details>
          </div>
        </header>
      </div>`;

    renderBreadcrumb(shell.querySelector(".portal-breadcrumb"), context);
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
    try {
      desktopOpen = localStorage.getItem(desktopPreference) !== "false";
    } catch {}
    const sidebar = shell.querySelector(".portal-sidebar");
    const overlay = shell.querySelector(".portal-overlay");
    const toggle = shell.querySelector(".portal-toggle");
    const close = shell.querySelector(".portal-close");
    const account = shell.querySelector(".portal-account");

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
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        closeDrawer();
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
