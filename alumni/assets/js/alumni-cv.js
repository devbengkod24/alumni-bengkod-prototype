/**
 * CV ATS bersama: sumber data, template HTML, dan pembuat PDF.
 *   - generate-cv.html  : pratinjau ATS memakai renderAtsCvHTML (x-html)
 *   - dashboard.html    : "Lihat CV" pelamar referral & "Lihat CV saya" -> openCvPdf
 *   - gigs.html         : kartu "CV terlampir" di modal lamar -> openCvPdf
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

/** Nama berkas PDF: CV_<Nama_Dengan_Garis_Bawah>_ATS.pdf */
function cvFileName(name) {
  const clean = String(name || "Alumni").trim().replace(/[^\p{L}\p{N}\s.-]/gu, "").replace(/\s+/g, "_");
  return `CV_${clean || "Alumni"}_ATS.pdf`;
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

/** Buat PDF CV ATS dan kembalikan { url, fileName } (url = blob URL) */
async function createCvPdf(applicant, options = {}) {
  const data = alumniCvData(applicant);
  const fileName = cvFileName(data.profile.name);
  const html2pdf = await loadHtml2Pdf();
  await cvWaitPageReady();
  const source = `<div style="padding:4px 2px;background:#fff;">${renderAtsCvHTML(data, options)}</div>`;
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
      pdf.setProperties({ title: fileName, subject: `CV ATS ${data.profile.name}`, creator: "Portal Alumni Bengkel Koding" });
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
  const loadingName = cvFileName(alumniCvData(applicant).profile.name);
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

if (typeof window !== "undefined") {
  Object.assign(window, { cvFileName, alumniCvData, renderAtsCvHTML, createCvPdf, openCvPdf });
}
