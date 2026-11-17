/**
 * CV bersama: sumber data, template HTML (ATS / Modern), pembuat PDF, dan penampil CV.
 *   - generate-cv.html         : pratinjau ATS memakai renderAtsCvHTML (x-html)
 *   - profil.html              : "Lihat CV" di checklist profil -> openCvPdf (PDF ATS di tab baru)
 *   - openCvViewer             : modal pratinjau web dengan pilihan ATS Standar | Modern Clean + Unduh PDF.
 *                                Pengirim tidak memilih versi; penerima yang memilih tampilan saat melihat.
 *       · dashboard.html / referral.html : "Pratinjau CV" di modal Minta Review & Referral, "Lihat CV saya"
 *       · referral-pengajuan.html        : "Lihat CV" pelamar referral
 *       · gigs.html                      : "Pratinjau CV" di modal Ajukan Minat
 *       · gigs-pelamar.html              : "Lihat CV" pelamar gigs
 *   - cvBaseFileName           : nama berkas tanpa akhiran versi (CV_<Nama>.pdf) untuk kartu berkas
 * Butuh alumni-data.js (ALUMNI_DIRECTORY, loadStoredProjects) dan alumni-profile-data.js (INITIAL_*).
 * PDF dibuat di browser dengan html2pdf.js (dimuat saat pertama kali dibutuhkan).
 */

const HTML2PDF_SRC = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

const CV_DEFAULT_SECTIONS = {
  about: true,
  education: true,
  organization: true,
  projects: true,
  skills: true,
  certifications: true,
};

function cvEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const cvClone = (v) => JSON.parse(JSON.stringify(v));

function cvNameSlug(name) {
  const clean = String(name || "Alumni").trim().replace(/[^\p{L}\p{N}\s.-]/gu, "").replace(/\s+/g, "_");
  return clean || "Alumni";
}

/** Nama berkas PDF: CV_<Nama_Dengan_Garis_Bawah>_ATS.pdf atau _MODERN.pdf */
function cvFileName(name, format = "ats") {
  return `CV_${cvNameSlug(name)}_${format === "modern" ? "MODERN" : "ATS"}.pdf`;
}

/** Nama berkas tanpa akhiran versi: CV_<Nama>.pdf (kartu berkas; versi dipilih penerima saat melihat) */
function cvBaseFileName(name) {
  return `CV_${cvNameSlug(name)}.pdf`;
}

/** Profil sendiri (hasil edit profil.html bila ada) */
function cvOwnProfile() {
  let profile = typeof INITIAL_PROFILE !== "undefined" ? cvClone(INITIAL_PROFILE) : {
    name: "Aisha Dwi Rahmawati",
    headline: "Mobile & Full-Stack Developer",
    email: "aisha.rahma@alumni.dinus.ac.id",
    location: "Semarang, Jawa Tengah, Indonesia",
    about: "Lulusan S1 Teknik Informatika UDINUS dengan ketertarikan tinggi pada arsitektur sistem terdistribusi, mobile application (Flutter / React Native), dan modern web frontend.",
    linkedin: "https://linkedin.com/in/aishadwirahma",
    github: "https://github.com/aishaadr",
  };
  try {
    const saved = localStorage.getItem("bengkod_alumni_profile") || localStorage.getItem("bengkod_profile_v1");
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed && parsed.name) profile = { ...profile, ...parsed };
  } catch (e) {
    console.warn("Gagal memuat profil tersimpan:", e);
  }
  return profile;
}

/**
 * Data CV. Tanpa argumen = CV milik sendiri. Dengan nama/id = CV pelamar (referral / gigs).
 * Dipindah dari generateCvComponent di generate-cv.html.
 */
function alumniCvData(applicant) {
  const own = {
    profile: cvOwnProfile(),
    educations: typeof INITIAL_EDUCATIONS !== "undefined" ? cvClone(INITIAL_EDUCATIONS) : [],
    organizations: typeof INITIAL_ORGANIZATIONS !== "undefined" ? cvClone(INITIAL_ORGANIZATIONS) : [],
    projects: typeof loadStoredProjects === "function" ? loadStoredProjects() : (typeof INITIAL_PROJECTS !== "undefined" ? cvClone(INITIAL_PROJECTS) : []),
    skills: typeof INITIAL_SKILLS !== "undefined" ? cvClone(INITIAL_SKILLS) : [],
    certifications: typeof INITIAL_CERTIFICATIONS !== "undefined" ? cvClone(INITIAL_CERTIFICATIONS) : [],
  };

  const rawName = String(applicant || "").trim();
  if (!rawName || rawName.toLowerCase() === own.profile.name.toLowerCase()) return own;

  if (rawName.toLowerCase().includes("yoga")) {
    return {
      profile: {
        name: "Yoga Kurniawan",
        headline: "Backend Developer · Batch 2023",
        email: "yoga.kurniawan@alumni.dinus.ac.id",
        location: "Kota Semarang, Jawa Tengah, Indonesia",
        about: "Backend Engineer lulusan S1 Teknik Informatika Universitas Dian Nuswantoro. Berpengalaman mendesain arsitektur microservices, optimasi query database PostgreSQL, integrasi REST API, dan containerization dengan Docker di lingkungan cloud.",
        linkedin: "https://linkedin.com/in/yogakurniawan",
        github: "https://github.com/yogakurniawan",
        university: "Universitas Dian Nuswantoro",
        batch: "2023",
      },
      educations: [
        {
          id: 1,
          name: "Universitas Dian Nuswantoro",
          major: "S1 Teknik Informatika (Informatics Engineering)",
          period: "2019 – 2023",
          degree: "Sarjana Komputer",
          tags: ["Struktur Data & Algoritma", "Basis Data Lanjut", "Arsitektur Perangkat Lunak", "Jaringan Komputer"],
        },
      ],
      organizations: [
        {
          id: 1,
          name: "Laboratorium Bengkel Koding UDINUS",
          role: "Koordinator Asisten Lab Backend",
          period: "2022 – 2023",
          desc: "Membimbing praktikum pemrograman backend, merancang modul basis data SQL, dan memelihara server staging lab.",
        },
      ],
      projects: [
        {
          id: 1,
          title: "Microservices Payment Gateway API",
          period: "2024",
          desc: "Arsitektur backend pembayaran multi-vendor menggunakan Express, PostgreSQL, Redis caching, dan RabbitMQ message queue.",
          tags: ["Node.js", "PostgreSQL", "Docker", "Redis"],
        },
        {
          id: 2,
          title: "Sistem Manajemen Inventaris Lab Bengkod",
          period: "2023",
          desc: "Layanan REST API pencatatan perangkat keras lab dengan autentikasi JWT dan audit trail log terenkripsi.",
          tags: ["Golang", "PostgreSQL", "REST API", "Docker"],
        },
      ],
      skills: [
        { id: 1, name: "Node.js & Express" },
        { id: 2, name: "PostgreSQL & Prisma" },
        { id: 3, name: "Docker & Container" },
        { id: 4, name: "REST API & Microservices" },
        { id: 5, name: "Redis Caching" },
        { id: 6, name: "Git & CI/CD" },
      ],
      certifications: [
        { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Nov 2023", credId: "AWS-SAA-884920" },
      ],
    };
  }

  const dir = typeof ALUMNI_DIRECTORY !== "undefined" ? ALUMNI_DIRECTORY : [];
  const found = dir.find((a) => a.name.toLowerCase() === rawName.toLowerCase() || a.id.toLowerCase() === rawName.toLowerCase());
  const name = found ? found.name : rawName;
  const slug = name.toLowerCase();
  return {
    profile: {
      name,
      headline: found ? found.headline : "Alumni Asisten Lab Bengkel Koding",
      email: (found && found.email) || `${slug.replace(/\s+/g, "")}@alumni.dinus.ac.id`,
      location: (found && found.location) || "Semarang, Jawa Tengah, Indonesia",
      about: (found && found.about) || (found
        ? `Alumni Asisten Lab Bengkel Koding UDINUS Batch ${found.batch || "2024"}. Berpengalaman mengembangkan sistem perangkat lunak modern dan kolaboratif.`
        : "Alumni Asisten Lab Bengkel Koding Universitas Dian Nuswantoro."),
      linkedin: (found && found.linkedin) || `https://linkedin.com/in/${slug.replace(/\s+/g, "-")}`,
      github: (found && found.github) || `https://github.com/${slug.replace(/\s+/g, "")}`,
      university: "Universitas Dian Nuswantoro",
      batch: (found && found.batch) || "2024",
    },
    educations: own.educations,
    organizations: own.organizations,
    projects: own.projects,
    skills: own.skills,
    certifications: own.certifications,
  };
}

/** Proyek kolaborasi Gigs bisa disembunyikan dari CV */
function cvFilterProjects(projects, includeGigs = true) {
  if (includeGigs) return projects || [];
  return (projects || []).filter((p) => !p.isGig && !p.id_gig && !(p.tags && p.tags.includes("Bengkod Gigs")));
}

/**
 * Template ATS (satu kolom, teks hitam, judul bagian huruf kapital).
 * Gaya inline supaya hasilnya sama di pratinjau, cetak, dan PDF tanpa bergantung kelas Tailwind.
 */
function renderAtsCvHTML(data, options = {}) {
  const s = { ...CV_DEFAULT_SECTIONS, ...(options.sections || {}) };
  const p = data.profile || {};
  const projects = cvFilterProjects(data.projects, options.includeGigs !== false);
  const e = cvEscape;
  const stripUrl = (u) => String(u || "").replace(/^https?:\/\/(www\.)?/, "");

  const H = (title) => `<h3 style="margin:0 0 8px;padding-bottom:4px;border-bottom:1px solid #d1d5db;font-size:14px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#111827;">${title}</h3>`;
  const row = (left, right) => `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;font-weight:700;color:#111827;"><span>${left}</span><span style="flex-shrink:0;font-weight:500;color:#4b5563;">${right || ""}</span></div>`;
  const item = (inner) => `<div class="cv-item" style="font-size:13px;line-height:1.5;margin-bottom:12px;page-break-inside:avoid;break-inside:avoid;">${inner}</div>`;
  const section = (inner) => `<section style="margin-top:22px;">${inner}</section>`;

  const contacts = [p.location, p.email, p.linkedin && stripUrl(p.linkedin), p.github && stripUrl(p.github)].filter(Boolean).map(e);

  let html = `<div class="cv-ats" style="font-family:Arial, Helvetica, sans-serif;color:#1f2937;background:#fff;">`;
  html += `<header style="text-align:center;padding-bottom:16px;border-bottom:2px solid #1f2937;">
    <h2 style="margin:0;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#111827;">${e(p.name)}</h2>
    ${p.headline ? `<p style="margin:6px 0 0;font-size:14px;line-height:1.4;font-weight:600;color:#374151;">${e(p.headline)}</p>` : ""}
    ${contacts.length ? `<p style="margin:8px 0 0;font-size:12.5px;line-height:1.5;color:#4b5563;">${contacts.join(" &nbsp;•&nbsp; ")}</p>` : ""}
  </header>`;

  if (s.about && p.about) {
    html += section(`${H("Ringkasan Profesional")}<p style="margin:0;font-size:13px;line-height:1.6;color:#374151;text-align:justify;white-space:pre-line;">${e(p.about)}</p>`);
  }

  if (s.education && (data.educations || []).length) {
    html += section(H("Pendidikan") + data.educations.map((edu) => item(
      row(e(edu.name), e(edu.period)) +
      `<div style="margin-top:2px;font-style:italic;color:#374151;">${e(edu.degree ? `${edu.degree} ${edu.major}` : edu.major)}</div>` +
      (edu.tags && edu.tags.length ? `<div style="margin-top:4px;color:#4b5563;">Mata Kuliah Utama: ${e(edu.tags.join(", "))}</div>` : "")
    )).join(""));
  }

  if (s.organization && (data.organizations || []).length) {
    html += section(H("Pengalaman Organisasi &amp; Kepemimpinan") + data.organizations.map((org) => item(
      row(`${e(org.role)} <span style="font-weight:400;color:#374151;">–</span> <span style="font-weight:600;color:#1f2937;">${e(org.name)}</span>`, e(org.period)) +
      (org.desc ? `<p style="margin:4px 0 0;font-size:13px;line-height:1.5;color:#374151;text-align:justify;">${e(org.desc)}</p>` : "")
    )).join(""));
  }

  if (s.projects && projects.length) {
    html += section(H("Proyek &amp; Portofolio Unggulan") + projects.map((proj) => item(
      row(e(proj.title), e(proj.period)) +
      ((proj.desc || proj.description) ? `<p style="margin:4px 0 0;font-size:13px;line-height:1.5;color:#374151;text-align:justify;">${e(proj.desc || proj.description)}</p>` : "") +
      (proj.tags && proj.tags.length ? `<div style="margin-top:4px;font-size:12px;color:#4b5563;"><span style="font-weight:600;color:#374151;">Teknologi: </span>${e(proj.tags.join(", "))}</div>` : "")
    )).join(""));
  }

  if (s.skills && (data.skills || []).length) {
    html += section(H("Keahlian &amp; Kompetensi") +
      `<div style="font-size:13px;line-height:1.6;color:#374151;"><span style="font-weight:600;color:#111827;">Keahlian Utama: </span>${data.skills.map((sk) => e(sk.name)).join(" • ")}</div>`);
  }

  if (s.certifications && (data.certifications || []).length) {
    html += section(H("Lisensi &amp; Sertifikasi") + data.certifications.map((cert) => `
      <div class="cv-item" style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;font-size:13px;line-height:1.5;margin-bottom:8px;break-inside:avoid;">
        <div><span style="font-weight:600;color:#111827;">${e(cert.name)}</span><span style="color:#4b5563;"> – ${e(cert.issuer)}</span>${cert.credId ? `<span style="margin-left:4px;font-size:12px;color:#6b7280;font-family:monospace;">(ID: ${e(cert.credId)})</span>` : ""}</div>
        <span style="flex-shrink:0;font-size:12px;color:#4b5563;">${e(cert.date)}</span>
      </div>`).join(""));
  }

  return html + `</div>`;
}

/**
 * Template Modern Clean (aksen navy, dua kolom) — padanan template Modern di generate-cv.html.
 * Gaya inline supaya sama di PDF tanpa bergantung kelas Tailwind.
 */
function renderModernCvHTML(data, options = {}) {
  const s = { ...CV_DEFAULT_SECTIONS, ...(options.sections || {}) };
  const p = data.profile || {};
  const projects = cvFilterProjects(data.projects, options.includeGigs !== false);
  const e = cvEscape;
  const stripUrl = (u) => String(u || "").replace(/^https?:\/\/(www\.)?/, "");
  const NAVY = "#1E3A8A";

  const H = (title) => `<h3 style="margin:0 0 10px;display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:${NAVY};"><span style="display:inline-block;width:9px;height:9px;border-radius:999px;background:${NAVY};"></span>${title}</h3>`;
  const block = (inner) => `<section style="margin-bottom:20px;">${inner}</section>`;
  const p13 = "margin:0;font-size:12.5px;line-height:1.5;";

  const kontak = [
    p.email && `<p style="${p13}font-weight:600;color:#111827;">${e(p.email)}</p>`,
    p.location && `<p style="${p13}color:#4b5563;">${e(p.location)}</p>`,
    p.linkedin && `<p style="${p13}color:${NAVY};">${e(stripUrl(p.linkedin))}</p>`,
    p.github && `<p style="${p13}color:#374151;">${e(stripUrl(p.github))}</p>`,
  ].filter(Boolean).join("");

  let html = `<div class="cv-modern" style="font-family:Poppins, Arial, Helvetica, sans-serif;color:#1f2937;background:#fff;">`;
  html += `<header style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:18px;border-bottom:1px solid #e5e7eb;">
    <div style="min-width:0;flex:1;">
      <h2 style="margin:0;font-size:26px;line-height:1.2;font-weight:800;color:${NAVY};">${e(p.name)}</h2>
      ${p.headline ? `<p style="margin:6px 0 0;font-size:14px;line-height:1.4;font-weight:600;color:#374151;">${e(p.headline)}</p>` : ""}
      <p style="margin:4px 0 0;font-size:12px;line-height:1.4;color:#6b7280;">${e((p.university || "Universitas Dian Nuswantoro") + " • Angkatan " + (p.batch || "2024"))}</p>
    </div>
    <div style="text-align:right;flex-shrink:0;max-width:45%;">${kontak}</div>
  </header>`;

  if (s.about && p.about) {
    html += `<section style="margin:20px 0;">${H("Tentang Saya")}<p style="margin:0;font-size:12.5px;line-height:1.6;color:#374151;text-align:justify;white-space:pre-line;">${e(p.about)}</p></section>`;
  }

  let kiri = "";
  if (s.education && (data.educations || []).length) {
    kiri += block(H("Pendidikan") + data.educations.map((edu) => `
      <div class="cv-item" style="padding:10px 12px;margin-bottom:8px;background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;break-inside:avoid;">
        <p style="${p13}font-weight:700;color:#111827;">${e(edu.name)}</p>
        <p style="${p13}font-weight:500;color:#374151;">${e(edu.degree ? `${edu.degree} ${edu.major}` : edu.major)}</p>
        <p style="margin:2px 0 0;font-size:11.5px;line-height:1.4;color:#6b7280;">${e(edu.period)}</p>
      </div>`).join(""));
  }
  if (s.skills && (data.skills || []).length) {
    kiri += block(H("Keahlian") + `<div style="display:flex;flex-wrap:wrap;gap:6px;">${data.skills.map((sk) => `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:#eff6ff;border:1px solid #dbeafe;color:${NAVY};font-size:11.5px;font-weight:600;line-height:1.5;">${e(sk.name)}</span>`).join("")}</div>`);
  }
  if (s.certifications && (data.certifications || []).length) {
    kiri += block(H("Sertifikasi") + data.certifications.map((cert) => `
      <div class="cv-item" style="border-left:2px solid #2563eb;padding:1px 0 1px 10px;margin-bottom:8px;break-inside:avoid;">
        <p style="${p13}font-weight:600;color:#111827;">${e(cert.name)}</p>
        <p style="margin:0;font-size:11.5px;line-height:1.4;color:#6b7280;">${e([cert.issuer, cert.date].filter(Boolean).join(" • "))}</p>
      </div>`).join(""));
  }

  let kanan = "";
  if (s.organization && (data.organizations || []).length) {
    kanan += block(H("Pengalaman Organisasi") + data.organizations.map((org) => `
      <div class="cv-item" style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #f3f4f6;break-inside:avoid;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;">
          <span style="font-size:12.5px;font-weight:700;color:#111827;">${e(org.role)}</span>
          <span style="flex-shrink:0;font-size:11.5px;color:#6b7280;">${e(org.period)}</span>
        </div>
        <p style="${p13}font-weight:600;color:${NAVY};">${e(org.name)}</p>
        ${org.desc ? `<p style="margin:4px 0 0;font-size:12px;line-height:1.5;color:#4b5563;text-align:justify;">${e(org.desc)}</p>` : ""}
      </div>`).join(""));
  }
  if (s.projects && projects.length) {
    kanan += block(H("Proyek Unggulan") + projects.map((proj) => `
      <div class="cv-item" style="padding:10px 12px;margin-bottom:10px;background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;break-inside:avoid;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;">
          <span style="font-size:12.5px;font-weight:700;color:#111827;">${e(proj.title)}</span>
          <span style="flex-shrink:0;font-size:11.5px;color:#6b7280;">${e(proj.period)}</span>
        </div>
        ${(proj.desc || proj.description) ? `<p style="margin:4px 0 0;font-size:12px;line-height:1.5;color:#4b5563;text-align:justify;">${e(proj.desc || proj.description)}</p>` : ""}
        ${proj.tags && proj.tags.length ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">${proj.tags.map((t) => `<span style="display:inline-block;padding:1px 7px;border-radius:4px;background:#e5e7eb;color:#374151;font-size:10.5px;font-weight:500;line-height:1.6;">${e(t)}</span>`).join("")}</div>` : ""}
      </div>`).join(""));
  }

  html += `<div style="display:flex;gap:24px;align-items:flex-start;">
    <div style="width:40%;flex-shrink:0;">${kiri}</div>
    <div style="flex:1;min-width:0;">${kanan}</div>
  </div>`;
  return html + `</div>`;
}

/** Pilih template sesuai format: "modern" atau "ats" (bawaan) */
function renderCvHTML(data, options = {}) {
  return options.format === "modern" ? renderModernCvHTML(data, options) : renderAtsCvHTML(data, options);
}

let html2pdfLoader = null;
function loadHtml2Pdf() {
  if (typeof window.html2pdf === "function") return Promise.resolve(window.html2pdf);
  if (!html2pdfLoader) {
    html2pdfLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = HTML2PDF_SRC;
      script.onload = () => resolve(window.html2pdf);
      script.onerror = () => {
        html2pdfLoader = null;
        reject(new Error("html2pdf.js gagal dimuat"));
      };
      document.head.appendChild(script);
    });
  }
  return html2pdfLoader;
}

// Overlay html2pdf ditempel ke <body>; selama page-skeleton.js masih memasang html.page-loading,
// semua anak <body> disembunyikan sehingga PDF jadi kosong. Tunggu sampai kelas itu dilepas (maks. 8 detik).
function cvWaitPageReady(maxMs = 8000) {
  const html = document.documentElement;
  if (!html.classList.contains("page-loading")) return Promise.resolve();
  const until = Date.now() + maxMs;
  return new Promise((resolve) => {
    const check = () => (html.classList.contains("page-loading") && Date.now() < until ? setTimeout(check, 50) : resolve());
    check();
  });
}

/** Buat PDF CV (options.format: "ats" | "modern") dan kembalikan { url, fileName } (url = blob URL) */
async function createCvPdf(applicant, options = {}) {
  const data = alumniCvData(applicant);
  const fileName = cvFileName(data.profile.name, options.format);
  const html2pdf = await loadHtml2Pdf();
  await cvWaitPageReady();
  const source = `<div style="padding:4px 2px;background:#fff;">${renderCvHTML(data, options)}</div>`;
  const url = await html2pdf()
    .set({
      margin: [12, 14, 12, 14],
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      // windowWidth = lebar tanpa scrollbar; tanpa ini hasil bergeser ~setengah lebar scrollbar dan sisi kanan terpotong
      html2canvas: { scale: 2, backgroundColor: "#ffffff", windowWidth: document.documentElement.clientWidth },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"], avoid: ".cv-item" },
    })
    .from(source, "string")
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      pdf.setProperties({ title: fileName, subject: `CV ${options.format === "modern" ? "Modern" : "ATS"} ${data.profile.name}`, creator: "Portal Alumni Bengkel Koding" });
    })
    .output("bloburl");
  return { url, fileName };
}

function cvPdfTabHTML(fileName, body) {
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${cvEscape(fileName)}</title>
  <style>
    html,body{margin:0;height:100%;font-family:Poppins,Arial,sans-serif;background:#525659;}
    .bar{height:52px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 16px;background:#1E3A8A;color:#fff;font-size:14px;box-sizing:border-box;}
    .bar span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;}
    .bar a{flex-shrink:0;color:#1E3A8A;background:#fff;border-radius:999px;padding:7px 16px;font-weight:600;text-decoration:none;font-size:13px;}
    iframe{display:block;width:100%;height:calc(100% - 52px);border:0;background:#525659;}
    .msg{height:calc(100% - 52px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;padding:16px;text-align:center;}
  </style></head><body>${body}</body></html>`;
}

/**
 * Dipanggil langsung dari klik supaya tab baru tidak diblokir popup blocker:
 * tab dibuka dulu (pesan "menyiapkan"), lalu diisi PDF setelah selesai dibuat.
 */
async function openCvPdf(applicant, options = {}) {
  const loadingName = cvFileName(alumniCvData(applicant).profile.name, options.format);
  const tab = window.open("", "_blank");
  if (tab) {
    tab.document.write(cvPdfTabHTML(loadingName, `<div class="bar"><span>${cvEscape(loadingName)}</span></div><div class="msg">Menyiapkan PDF…</div>`));
    tab.document.close();
  }
  try {
    const { url, fileName } = await createCvPdf(applicant, options);
    if (tab && !tab.closed) {
      tab.document.open();
      tab.document.write(cvPdfTabHTML(fileName, `<div class="bar"><span>${cvEscape(fileName)}</span><a href="${url}" download="${cvEscape(fileName)}">Unduh PDF</a></div><iframe src="${url}" title="${cvEscape(fileName)}"></iframe>`));
      tab.document.close();
    } else {
      // Popup diblokir: unduh langsung
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    return { url, fileName };
  } catch (err) {
    console.error("Gagal membuat PDF CV:", err);
    if (tab && !tab.closed) {
      tab.document.open();
      tab.document.write(cvPdfTabHTML(loadingName, `<div class="bar"><span>${cvEscape(loadingName)}</span></div><div class="msg">PDF gagal dibuat. Periksa koneksi internet lalu coba lagi.</div>`));
      tab.document.close();
    }
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Penampil CV (modal DOM vanilla, dipakai semua halaman Alpine)       */
/* ------------------------------------------------------------------ */

const CV_PAPER_WIDTH = 794; // A4 pada 96 dpi
const CV_PAPER_HEIGHT = 1123;
const CV_FORMATS = [
  { id: "ats", label: "ATS Standar", desc: "Teks bersih terstruktur" },
  { id: "modern", label: "Modern Clean", desc: "Layout 2-kolom visual" },
];

// Gaya modal disuntik sekali; tidak memakai kelas Tailwind supaya tidak berkedip saat CDN belum membuat CSS-nya
function cvViewerInjectStyles() {
  if (document.getElementById("cv-viewer-style")) return;
  const style = document.createElement("style");
  style.id = "cv-viewer-style";
  style.textContent = `
    .cvv-overlay{position:fixed;inset:0;z-index:150;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(17,24,39,.6);backdrop-filter:blur(2px);font-family:Poppins,Arial,sans-serif;}
    .cvv-panel{display:flex;flex-direction:column;width:100%;max-width:920px;height:min(94vh,1040px);background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,.25);overflow:hidden;}
    .cvv-head{flex-shrink:0;display:flex;flex-direction:column;gap:12px;padding:16px 20px;border-bottom:1px solid #e5e7eb;background:#fff;}
    .cvv-row{display:flex;align-items:center;gap:10px;min-width:0;}
    .cvv-icon{width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#fef2f2;border:1px solid #fee2e2;color:#dc2626;}
    .cvv-title{flex:1;min-width:0;}
    .cvv-title h2{margin:0;font-size:17px;line-height:1.3;font-weight:700;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .cvv-title p{margin:2px 0 0;font-size:12.5px;line-height:1.4;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .cvv-dl{flex-shrink:0;display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 16px;border:0;border-radius:999px;background:#1E3A8A;color:#fff;font:600 13.5px/1 Poppins,Arial,sans-serif;white-space:nowrap;cursor:pointer;transition:background .15s;}
    .cvv-dl:hover{background:#1D4ED8;}
    .cvv-dl:disabled{opacity:.75;cursor:progress;}
    .cvv-x{flex-shrink:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:0;border-radius:999px;background:transparent;color:#9ca3af;cursor:pointer;transition:background .15s,color .15s;}
    .cvv-x:hover{background:#eff6ff;color:#1E3A8A;}
    .cvv-seg{display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;max-width:440px;padding:4px;border-radius:12px;background:#f3f4f6;}
    .cvv-seg button{display:block;min-width:0;padding:7px 12px;border:0;border-radius:9px;background:transparent;text-align:left;color:#4b5563;cursor:pointer;font-family:inherit;transition:background .15s,color .15s;}
    .cvv-seg button:hover{color:#111827;}
    .cvv-seg button[aria-pressed="true"]{background:#fff;color:#1E3A8A;box-shadow:0 1px 3px rgba(0,0,0,.1);}
    .cvv-seg b{display:block;font-size:13.5px;line-height:1.3;font-weight:600;}
    .cvv-seg span{display:block;margin-top:1px;font-size:11px;line-height:1.3;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .cvv-body{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:24px;background:#e5e7eb;overscroll-behavior:contain;}
    .cvv-sizer{margin:0 auto;overflow:hidden;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.12);}
    .cvv-paper{width:${CV_PAPER_WIDTH}px;min-height:${CV_PAPER_HEIGHT}px;box-sizing:border-box;padding:48px 53px;background:#fff;transform-origin:top left;}
    .cvv-overlay button:focus-visible{outline:2px solid #1E3A8A;outline-offset:2px;}
    @media (max-width:639px){
      .cvv-overlay{padding:0;}
      .cvv-panel{height:100%;max-width:none;border:0;border-radius:0;}
      .cvv-head{padding:12px 16px;gap:10px;}
      .cvv-icon{display:none;}
      .cvv-title h2{font-size:16px;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;}
      .cvv-title p{display:none;}
      .cvv-dl{padding:0 14px;}
      .cvv-seg{max-width:none;}
      .cvv-body{padding:12px;}
    }`;
  document.head.appendChild(style);
}

let cvActiveViewer = null;

/**
 * Buka penampil CV. applicant: nama/id pelamar, kosong = CV sendiri.
 * Versi ATS / Modern dirender ulang langsung; Unduh PDF memakai createCvPdf.
 */
function openCvViewer(applicant, { format = "ats" } = {}) {
  if (cvActiveViewer) cvActiveViewer.close();
  cvViewerInjectStyles();

  const data = alumniCvData(applicant);
  const name = data.profile.name || "Alumni";
  const trigger = document.activeElement;
  let current = format === "modern" ? "modern" : "ats";
  let busy = false;

  const overlay = document.createElement("div");
  overlay.className = "cvv-overlay";
  overlay.innerHTML = `
    <div class="cvv-panel" role="dialog" aria-modal="true" aria-labelledby="cvv-title">
      <div class="cvv-head">
        <div class="cvv-row">
          <span class="cvv-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
          <div class="cvv-title">
            <h2 id="cvv-title">CV ${cvEscape(name)}</h2>
            <p>Dibuat otomatis dari profil alumni</p>
          </div>
          <button type="button" class="cvv-dl" data-cvv="download">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span data-cvv="download-label">Unduh PDF</span>
          </button>
          <button type="button" class="cvv-x" data-cvv="close" aria-label="Tutup pratinjau CV">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="cvv-seg" role="group" aria-label="Versi tampilan CV">
          ${CV_FORMATS.map((f) => `<button type="button" data-cvv-format="${f.id}" aria-pressed="false"><b>${f.label}</b><span>${f.desc}</span></button>`).join("")}
        </div>
      </div>
      <div class="cvv-body" data-cvv="body">
        <div class="cvv-sizer" data-cvv="sizer"><div class="cvv-paper" data-cvv="paper"></div></div>
      </div>
    </div>`;

  const $ = (sel) => overlay.querySelector(`[data-cvv="${sel}"]`);
  const body = $("body");
  const sizer = $("sizer");
  const paper = $("paper");
  const dlBtn = $("download");
  const dlLabel = $("download-label");
  const closeBtn = $("close");
  const formatBtns = [...overlay.querySelectorAll("[data-cvv-format]")];

  // Kertas tetap lebar A4 lalu diperkecil mengikuti lebar area; sizer memotong sisa lebar supaya tidak bisa digeser ke samping
  function fit() {
    const cs = getComputedStyle(body);
    const avail = body.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const scale = Math.min(1, Math.max(0.2, avail / CV_PAPER_WIDTH));
    paper.style.transform = scale < 1 ? `scale(${scale})` : "";
    sizer.style.width = `${Math.floor(CV_PAPER_WIDTH * scale)}px`;
    sizer.style.height = `${Math.ceil(paper.offsetHeight * scale)}px`;
  }

  function render() {
    paper.innerHTML = renderCvHTML(data, { format: current });
    formatBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cvvFormat === current)));
    body.scrollTop = 0;
    fit();
  }

  async function download() {
    if (busy) return;
    busy = true;
    dlBtn.disabled = true;
    dlLabel.textContent = "Menyiapkan…";
    try {
      const { url, fileName } = await createCvPdf(applicant, { format: current });
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      dlLabel.textContent = "Unduh PDF";
    } catch (err) {
      console.error("Gagal membuat PDF CV:", err);
      dlLabel.textContent = "Gagal, coba lagi";
      setTimeout(() => { if (!busy) dlLabel.textContent = "Unduh PDF"; }, 3000);
    } finally {
      busy = false;
      dlBtn.disabled = false;
    }
  }

  function focusables() {
    return [...overlay.querySelectorAll("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")];
  }

  // Capture di window supaya Esc tidak ikut menutup modal Alpine di bawahnya
  function onKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopImmediatePropagation();
      close();
      return;
    }
    if (e.key === "Tab") {
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !overlay.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !overlay.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  const ro = typeof ResizeObserver === "function" ? new ResizeObserver(() => fit()) : null;
  const prevOverflow = document.body.style.getPropertyValue("overflow");
  const prevPriority = document.body.style.getPropertyPriority("overflow");

  function close() {
    if (cvActiveViewer !== handle) return;
    cvActiveViewer = null;
    window.removeEventListener("keydown", onKeydown, true);
    window.removeEventListener("resize", fit);
    if (ro) ro.disconnect();
    overlay.remove();
    // alumni.js memasang body { overflow: auto !important }, jadi kunci & pulihkan dengan prioritas yang sama
    if (prevOverflow) document.body.style.setProperty("overflow", prevOverflow, prevPriority);
    else document.body.style.removeProperty("overflow");
    if (trigger && typeof trigger.focus === "function" && document.contains(trigger)) trigger.focus({ preventScroll: true });
  }

  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener("click", close);
  dlBtn.addEventListener("click", download);
  formatBtns.forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.cvvFormat === current) return;
    current = b.dataset.cvvFormat;
    render();
  }));

  const handle = { close, get format() { return current; } };
  cvActiveViewer = handle;

  document.body.appendChild(overlay);
  document.body.style.setProperty("overflow", "hidden", "important");
  window.addEventListener("keydown", onKeydown, true);
  window.addEventListener("resize", fit);
  if (ro) {
    ro.observe(body);
    ro.observe(paper);
  }
  render();
  (formatBtns.find((b) => b.dataset.cvvFormat === current) || closeBtn).focus({ preventScroll: true });
  return handle;
}

if (typeof window !== "undefined") {
  Object.assign(window, { cvFileName, cvBaseFileName, alumniCvData, renderAtsCvHTML, renderModernCvHTML, renderCvHTML, createCvPdf, openCvPdf, openCvViewer });
}
