/**
 * Data & helper halaman profil alumni — konversi dari lms-bengkod-web:
 *   profil/page.tsx, [id]/page.tsx (data awal & helper),
 *   _components/EducationLogo.tsx, SkillModals.tsx, ProfileModals.tsx,
 *   HonorModals.tsx, OrganizationModals.tsx, EducationModals.tsx,
 *   CertificationModals.tsx, ProjectModals.tsx (konstanta & helper).
 * Membutuhkan alumni-data.js (DEFAULT_AVATAR, mediaUtils, alumniDirectory).
 */

// Gabung objek data Alpine tanpa membekukan getter (spread akan mengevaluasi getter)
function mixData(...objs) {
  return Object.defineProperties({}, Object.assign({}, ...objs.map((o) => Object.getOwnPropertyDescriptors(o))));
}

// ===================== DATA AWAL (profil/page.tsx & [id]/page.tsx) =====================
const INITIAL_PROFILE = {
  name: "Aisha Dwi Rahmawati",
  firstName: "Aisha Dwi",
  lastName: "Rahmawati",
  headline: "Data Scientist & Data Analyst | Undergraduate Student at Dian Nuswantoro University",
  batch: "2024",
  isVerified: true,
  location: "Kota Kudus, Jawa Tengah, Indonesia",
  countryCode: "ID",
  city: "Kota Kudus, Jawa Tengah",
  industry: "Teknologi, Informasi, dan Internet",
  university: "Universitas Dian Nuswantoro",
  connections: 75,
  followers: 77,
  linkedin: "https://www.linkedin.com/in/aisharah",
  github: "https://github.com/aishaadr",
  website: "",
  email: "aisha.rahma@alumni.dinus.ac.id",
  about: `Motivated Informatics Engineering student at Universitas Dian Nuswantoro Semarang with a strong passion for data science and business analysis. Focused on extracting meaningful insights from data through statistical analysis, data visualization, and predictive modeling to solve real-world problems and support data-driven decision-making.

Selama masa studi, aktif memegang peranan krusial sebagai Koordinator Asisten Praktikum di laboratorium Bengkel Koding, memimpin sesi bimbingan teknis serta mentoring bagi lebih dari 150 mahasiswa dalam mata kuliah Pemrograman Berorientasi Objek dan Rekayasa Web. Berpengalaman mendalami arsitektur sistem Next.js, TypeScript, Python, dan Laravel.`,
  avatarUrl: DEFAULT_AVATAR,
  coverImageUrl: "",
  coverGradient: "from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]",
};

// Postingan bawaan halaman [id] (tidak memakai localStorage)
const DETAIL_INITIAL_POSTS = [
  {
    id: 1,
    authorName: "Aisha Dwi Rahmawati",
    authorAvatar: DEFAULT_AVATAR,
    authorHeadline: "Data Scientist & Data Analyst | Undergraduate Student...",
    date: "Feb 12, 2026",
    content:
      "Dengan gembira, saya membagikan proyek Sentiment Analysis System for OVO App yang saya kerjakan. Lihat di sini: https://lnkd.in/eVbna2d3",
    category: "Pencapaian Proyek / Capstone",
    imageUrl: DEFAULT_AVATAR,
    likes: 3,
    isLiked: false,
    commentsCount: 36,
    repostsCount: 541,
    impressions: 502,
  },
  {
    id: 2,
    authorName: "Arif Alam",
    authorAvatar: "",
    authorHeadline: "Making AI Accessible to All | Building @Data ...",
    date: "Apr 12, 2025",
    isRepost: true,
    repostedBy: "Aisha Dwi Rahmawati",
    content: "Machine Learning Algorithms Cheatsheet\n➔ Linear Regression...",
    category: "Knowledge Sharing",
    tablePreview: INITIAL_POSTS[1].tablePreview,
    likes: 3,
    isLiked: false,
    commentsCount: 36,
    repostsCount: 541,
    impressions: 502,
  },
];

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "UMKM Success Probability Prediction",
    period: "Jun 2026 – Jun 2026",
    desc: "Memprediksi probabilitas keberhasilan bisnis UMKM dari 250 data historis menggunakan pendekatan regresi ensemble dan interpretasi model SHAP values...",
    tags: ["Deep Learning & Data Analysis"],
    contributor: "Clarista",
    contributorId: "clarista",
    contributorAvatar: "https://i.pravatar.cc/150?img=45",
    linkUrl: "https://github.com/aishaadr",
    imageUrl: "assets/img/kursus-1.png",
  },
  {
    id: 2,
    title: "Automatic Proofreading System for Indonesian Academic Documents",
    period: "Mar 2026 – Mei 2026",
    desc: "Mengembangkan sistem koreksi otomatis tata bahasa dan tipografi dokumen akademik Bahasa Indonesia menggunakan arsitektur hybrid transformer NLP...",
    tags: ["Deep Learning & Natural Language Processing"],
    linkUrl: "https://github.com/aishaadr",
    imageUrl: "assets/img/kursus-2.png",
  },
];

const INITIAL_ORGANIZATIONS = [
  {
    id: 1,
    abbr: "CC",
    name: "Chemistry Club",
    role: "Ketua Umum (Leader)",
    period: "Jul 2023 – Jan 2024",
    affiliated: "SMAN 2 Kudus",
    tags: ["Manajemen Tim", "Kepemimpinan", "Riset"],
    desc: "Memimpin 35 anggota dalam program riset dan pembinaan olimpiade sains, menyelenggarakan kompetisi antarsekolah tingkat kabupaten dengan peningkatan partisipasi 40%.",
    logoUrl: "",
  },
  {
    id: 2,
    abbr: "HMTI",
    name: "Himpunan Mahasiswa Informatika (HMTI)",
    role: "Staff Divisi Riset & Teknologi",
    period: "Okt 2024 – Sekarang",
    affiliated: "Universitas Dian Nuswantoro",
    tags: ["AI Workshop", "Koordinasi Event"],
    desc: "Mengelola workshop kecerdasan buatan dan kurikulum pendampingan coding untuk mahasiswa baru.",
    logoUrl: "",
  },
];

const INITIAL_EDUCATIONS = [
  {
    id: 1,
    name: "Universitas Dian Nuswantoro",
    major: "S1 Teknik Informatika (Informatics Engineering)",
    period: "Sep 2024 – Sekarang",
    tags: ["Machine Learning", "Struktur Data & Algoritma", "Rekayasa Perangkat Lunak", "Basis Data"],
    logoUrl: "",
  },
  {
    id: 2,
    name: "SMAN 2 Kudus",
    major: "Jurusan Matematika dan Ilmu Pengetahuan Alam (MIPA)",
    period: "Jul 2021 – Mar 2024",
    tags: ["Matematika Lanjut", "Olimpiade Sains Kimia", "Dasar Algoritma"],
    logoUrl: "",
  },
];

const INITIAL_CERTIFICATIONS = [
  {
    id: 1,
    logoBg: "bg-[#1a1a2e]",
    logoText: "text-cyan-400",
    logoLabel: "☁",
    name: "DevOps Foundation (Linux & Systems) – Hands-On",
    issuer: "KodeKloud",
    date: "Diterbitkan Sep 2026",
    credId: "RYGYG6DS1R1G",
    tags: ["Linux Administration", "Bash Scripting", "Docker Basics"],
    url: "https://kodekloud.com",
    logoUrl: "",
  },
  {
    id: 2,
    logoBg: "bg-[#1F5EFF]",
    logoText: "text-white",
    logoLabel: "IBM",
    name: "Generative AI: Introduction and Applications",
    issuer: "IBM SkillsBuild",
    date: "Diterbitkan Sep 2026",
    credId: "UKIM7338H99L",
    tags: ["LLM Architecture", "Prompt Engineering", "Ethical AI"],
    url: "https://skillsbuild.org",
    logoUrl: "",
  },
  {
    id: 3,
    logoBg: "bg-white border-2 border-gray-200",
    logoText: "text-[#4285F4]",
    logoLabel: "G",
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google Career Certificates",
    date: "Diterbitkan Mei 2025",
    credId: "GGL-DA-882190",
    tags: ["SQL", "Tableau", "R Programming", "Data Wrangling"],
    url: "https://grow.google",
    logoUrl: "",
  },
];

const INITIAL_SKILLS = [
  { id: "1", name: "Data Analysis & Visualization", level: "Tingkat Mahir", links: [{ type: "project", id: "1" }] },
  { id: "2", name: "Internet of Things (IoT)", level: "Tingkat Menengah", links: [] },
];

const SKILLS_PREVIEW = 3;
const PROJECTS_PREVIEW = 3;

const COVER_THEMES = [
  { name: "Bengkel Koding Blue (Default)", val: "from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]" },
  { name: "Deep Ocean Navy", val: "from-[#0f172a] via-[#1e3a8a] to-[#2563eb]" },
  { name: "Emerald Tech", val: "from-[#064e3b] via-[#047857] to-[#10b981]" },
  { name: "Indigo Horizon", val: "from-[#312e81] via-[#4338ca] to-[#6366f1]" },
];

// ===================== HELPER PROYEK (profil/page.tsx) =====================
function contributorHref(p) {
  const byId = findAlumni(p.contributorId);
  if (byId) return alumniProfileHref(byId.id);
  const byName = findAlumniByName(p.contributor);
  if (byName) return alumniProfileHref(byName.id);
  return "";
}

function getProjectMediaItems(proj) {
  if (!proj) return [];
  if (Array.isArray(proj.media)) return proj.media;
  if (proj.media && Array.isArray(proj.media.items)) return proj.media.items;
  return itemsFromValue({ linkUrl: proj.linkUrl || "", imageUrl: proj.imageUrl || "" });
}

function getPrimaryProjectMedia(proj) {
  const items = getProjectMediaItems(proj);
  if (items.length === 0) return null;
  if (proj.imageUrl) {
    const matched = items.find(
      (i) => (i.kind === "image" && i.url === proj.imageUrl) || (i.kind === "link" && i.thumbnail === proj.imageUrl)
    );
    if (matched) return matched;
  }
  return items[0];
}

// Daftar kontributor yang ditampilkan di kartu proyek (contributors[] baru atau contributor lama)
function projectContributors(proj) {
  if (proj.contributors && proj.contributors.length > 0) return proj.contributors;
  if (proj.contributor) return [{ id: "", name: proj.contributor, avatarUrl: proj.contributorAvatar || "" }];
  return [];
}

function projectContributorHref(proj, c) {
  if (c.id) {
    const byId = findAlumni(c.id);
    return byId ? alumniProfileHref(byId.id) : "";
  }
  return contributorHref(proj);
}

// Link Next.js /dashboard/alumni/<id> → halaman HTML prototype
function alumniPageHref(href) {
  const m = /^\/dashboard\/alumni\/([^/]+)$/.exec(href || "");
  return m ? `detail.html?id=${encodeURIComponent(m[1])}` : href;
}

// ===================== ProjectModals.tsx =====================
function contributorsFromProject(p) {
  if (p.contributors && p.contributors.length > 0) return p.contributors;
  const byId = findAlumni(p.contributorId);
  if (byId) return [{ id: byId.id, name: byId.name, avatarUrl: byId.avatarUrl }];
  const byName = findAlumniByName(p.contributor);
  if (byName) return [{ id: byName.id, name: byName.name, avatarUrl: byName.avatarUrl }];
  if (p.contributor) return [{ id: "", name: p.contributor, avatarUrl: p.contributorAvatar || "" }];
  return [];
}

// ===================== SkillModals.tsx =====================
const SKILL_LEVELS = ["Tingkat Pemula", "Tingkat Menengah", "Tingkat Mahir"];
const DEFAULT_SKILL_LEVEL = "Tingkat Menengah";

function isSkillLinked(links, type, id) {
  return links.some((l) => l.type === type && l.id === id);
}

function linksOfSkill(skill) {
  const out = [...(skill.links || [])];
  for (const pid of skill.projectIds || []) {
    const sid = String(pid);
    if (!out.some((l) => l.type === "project" && l.id === sid)) out.push({ type: "project", id: sid });
  }
  return out;
}

function countLinks(skill) {
  return linksOfSkill(skill).length;
}

function toggleSkillLink(links, type, id) {
  return isSkillLinked(links, type, id) ? links.filter((l) => !(l.type === type && l.id === id)) : [...links, { type, id }];
}

const SKILL_OPTIONS = [
  { group: "Pemrograman", items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "PHP", "Go", "Dart", "SQL"] },
  {
    group: "Data & AI",
    items: [
      "Data Analysis & Visualization",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Data Wrangling",
      "Statistik",
      "Business Intelligence",
    ],
  },
  {
    group: "Web & Mobile",
    items: ["React", "Next.js", "Laravel", "Node.js", "Tailwind CSS", "REST API", "Flutter", "Android Development"],
  },
  {
    group: "Database & Cloud",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Docker", "Linux Administration", "Cloud Computing (AWS)", "Git & GitHub"],
  },
  { group: "IoT, Jaringan & Keamanan", items: ["Internet of Things (IoT)", "Embedded Systems", "Jaringan Komputer", "Keamanan Siber"] },
  { group: "Desain", items: ["UI/UX Design", "Figma"] },
  {
    group: "Soft Skills",
    items: ["Kepemimpinan", "Manajemen Tim", "Komunikasi", "Problem Solving", "Berpikir Kritis", "Manajemen Waktu", "Kerja Sama Tim", "Public Speaking"],
  },
];

// ===================== ProfileModals.tsx =====================
const REGION_CODES = "ID MY SG TH VN PH BN KH LA MM TL US GB AU CA DE FR NL JP KR CN IN SA AE QA TR NZ RU BR EG ZA IT ES CH SE BE".split(" ");

const COUNTRIES = (() => {
  let dn = null;
  try {
    dn = new Intl.DisplayNames(["id"], { type: "region" });
  } catch {
    dn = null;
  }
  const list = REGION_CODES.map((code) => {
    let label = code;
    try {
      label = (dn && dn.of(code)) || code;
    } catch {
      label = code;
    }
    return { value: code, label };
  });
  list.sort((a, b) => {
    if (a.value === "ID") return -1;
    if (b.value === "ID") return 1;
    return a.label.localeCompare(b.label, "id");
  });
  return list;
})();

const CITIES = {
  ID: ["Jakarta", "Surabaya", "Bandung", "Semarang", "Kudus", "Yogyakarta", "Surakarta (Solo)", "Malang", "Medan", "Makassar", "Palembang", "Denpasar", "Tangerang", "Tangerang Selatan", "Bekasi", "Depok", "Bogor", "Balikpapan", "Samarinda", "Banjarmasin", "Pontianak", "Batam", "Pekanbaru", "Padang", "Bandar Lampung", "Manado", "Mataram"],
  MY: ["Kuala Lumpur", "George Town (Penang)", "Johor Bahru", "Petaling Jaya", "Cyberjaya", "Putrajaya"],
  SG: ["Singapore", "Central Area", "Jurong", "Tampines", "Woodlands"],
  US: ["New York, NY", "San Francisco, CA", "Seattle, WA", "Los Angeles, CA", "Austin, TX", "Chicago, IL", "Boston, MA"],
  GB: ["London", "Manchester", "Edinburgh", "Cambridge", "Oxford", "Birmingham"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  JP: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Fukuoka"],
  DE: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
  NL: ["Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven"],
  SA: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  AE: ["Dubai", "Abu Dhabi", "Sharjah"],
};

function hostOf(url) {
  try {
    const raw = url.trim();
    if (!raw) return "";
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(withProto).hostname.toLowerCase();
  } catch {
    return "";
  }
}

// normalizeUrl versi ProfileModals.tsx (berbeda dari mediaUtils)
function profileNormalizeUrl(url) {
  const v = url.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function initProfileDraft(p) {
  let matchedCountry = p.countryCode || "";
  let matchedCity = p.city || "";
  if (!matchedCountry && p.location) {
    const locParts = p.location.split(",").map((s) => s.trim());
    if (locParts.length >= 2) {
      matchedCity = locParts[0];
      const found = COUNTRIES.find((c) => c.label.toLowerCase() === locParts[1].toLowerCase());
      if (found) matchedCountry = found.value;
    } else {
      matchedCity = locParts[0];
      matchedCountry = "ID";
    }
  }
  return {
    fullName: p.name || "",
    headline: p.headline || "",
    countryCode: matchedCountry || "ID", // default Indonesia
    city: matchedCity || "",
    linkedin: p.linkedin || "",
    github: p.github || "",
    website: p.website || "",
    email: p.email || "",
  };
}

// ===================== BULAN & TAHUN =====================
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const CURRENT_YEAR = new Date().getFullYear();
const MONTH_OPTIONS = MONTHS.map((m) => ({ value: m, label: m }));
const yearOptionsOf = (years) => years.map((y) => ({ value: String(y), label: String(y) }));
// HonorModals & OrganizationModals: 10 tahun terakhir
const YEAR_OPTIONS_10 = yearOptionsOf(Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i));
// EducationModals: 12 tahun (hingga 2 tahun ke depan)
const YEAR_OPTIONS_EDU = yearOptionsOf(Array.from({ length: 12 }, (_, i) => CURRENT_YEAR + 2 - i));
// CertificationModals: 30 tahun (hingga 10 tahun ke depan)
const YEAR_OPTIONS_CERT = yearOptionsOf(Array.from({ length: 30 }, (_, i) => CURRENT_YEAR + 10 - i));

// CertificationModals.tsx (MONTH_ABBR dipakai saat tambah, MONTH_ABBR2 saat edit — sama seperti sumber)
const MONTH_ABBR = {
  Januari: "Sep", Februari: "Feb", Maret: "Mar", April: "Apr", Mei: "Mei", Juni: "Jun",
  Juli: "Jul", Agustus: "Agu", September: "Sep", Oktober: "Okt", November: "Nov", Desember: "Des",
};
const MONTH_ABBR2 = {
  Januari: "Jan", Februari: "Feb", Maret: "Mar", April: "Apr", Mei: "Mei", Juni: "Jun",
  Juli: "Jul", Agustus: "Agu", September: "Sep", Oktober: "Okt", November: "Nov", Desember: "Des",
};

// ===================== HonorModals.tsx =====================
function draftToHonor(draft, id) {
  const date = draft.month && draft.year ? `${draft.month} ${draft.year}` : draft.month ? draft.month : draft.year ? draft.year : undefined;
  return {
    id: id ?? Date.now().toString(),
    title: draft.title.trim(),
    relatedEducationId: draft.relatedEducationId || undefined,
    issuer: draft.issuer.trim(),
    date,
    description: draft.description.trim() || undefined,
    media: draft.media,
  };
}

function honorToDraft(h) {
  let month = "";
  let year = "";
  if (h.date) {
    const parts = h.date.split(" ");
    if (parts.length === 2) {
      month = parts[0];
      year = parts[1];
    } else if (MONTHS.includes(parts[0])) month = parts[0];
    else year = parts[0];
  }
  return {
    title: h.title,
    relatedEducationId: h.relatedEducationId ?? "",
    issuer: h.issuer,
    month,
    year,
    description: h.description ?? "",
    media: h.media ?? { linkUrl: "", imageUrl: "" },
  };
}

// ===================== OrganizationModals.tsx / EducationModals.tsx =====================
// buildPeriod (tambah) mengembalikan "" bila kosong; buildPeriod2 (edit) mengembalikan "–"
function buildPeriod(d, emptyValue = "") {
  const start = [d.startMonth, d.startYear].filter(Boolean).join(" ");
  const end = d.isCurrent ? "Sekarang" : [d.endMonth, d.endYear].filter(Boolean).join(" ");
  if (!start && !end) return emptyValue;
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
}

function orgToDraft(org) {
  return {
    name: org.name,
    role: org.role,
    relatedEducationId: org.relatedEducationId ?? "",
    isCurrent: org.isCurrent ?? false,
    startMonth: org.startMonth ?? "",
    startYear: org.startYear ?? "",
    endMonth: org.endMonth ?? "",
    endYear: org.endYear ?? "",
    desc: org.desc,
  };
}

function eduToDraft(e) {
  return {
    name: e.name,
    major: e.major,
    degree: e.degree ?? "",
    isCurrent: e.isCurrent ?? false,
    startMonth: e.startMonth ?? "",
    startYear: e.startYear ?? "",
    endMonth: e.endMonth ?? "",
    endYear: e.endYear ?? "",
    tags: e.tags ?? [],
  };
}

function orgAbbr(name) {
  return name.trim().split(" ").map((w) => w[0]).slice(0, 3).join("").toUpperCase();
}

// ===================== CertificationModals.tsx =====================
function certToDraft(c) {
  let issueMonth = c.issueMonth || "";
  let issueYear = c.issueYear || "";
  if (!issueYear && c.date) {
    const yearMatch = c.date.match(/\b(19\d\d|20\d\d)\b/);
    if (yearMatch) issueYear = yearMatch[1];
    for (const [mName, mAbbr] of Object.entries(MONTH_ABBR2)) {
      if (c.date.includes(mAbbr) || c.date.includes(mName)) {
        issueMonth = mName;
        break;
      }
    }
  }
  return {
    name: c.name || "",
    issuer: c.issuer || "",
    issueMonth,
    issueYear,
    expireMonth: c.expireMonth || "",
    expireYear: c.expireYear || "",
    credId: c.credId || "",
    url: c.url || "",
    skills: c.tags || [],
  };
}

// ===================== EducationLogo.tsx =====================
function eduInitials(name) {
  const words = (name || "").replace(/[^A-Za-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const skip = /^(universitas|institut|sekolah|sma|smk|smp|ma|man|mts|sd|negeri|n|the|of)$/i;
  const meaningful = words.filter((w) => !skip.test(w));
  const pick = (meaningful.length ? meaningful : words).slice(0, 2);
  return pick.map((w) => w[0].toUpperCase()).join("");
}

const EDU_GRADIENTS = [
  "from-[#1E3A8A] to-[#3B82F6]",
  "from-[#0F766E] to-[#14B8A6]",
  "from-[#7C3AED] to-[#A78BFA]",
  "from-[#B45309] to-[#F59E0B]",
  "from-[#BE123C] to-[#FB7185]",
  "from-[#0369A1] to-[#38BDF8]",
  "from-[#4338CA] to-[#818CF8]",
  "from-[#166534] to-[#22C55E]",
];

function eduGradientFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return EDU_GRADIENTS[h % EDU_GRADIENTS.length];
}

const INSTITUTIONS = [
  { name: "Universitas Airlangga", domain: "unair.ac.id", keys: ["unair", "universitasairlangga", "airlangga"] },
  { name: "Universitas Indonesia", domain: "ui.ac.id", keys: ["ui", "universitasindonesia"] },
  { name: "Universitas Gadjah Mada", domain: "ugm.ac.id", keys: ["ugm", "universitasgadjahmada", "gadjahmada"] },
  { name: "Institut Teknologi Bandung", domain: "itb.ac.id", keys: ["itb", "institutteknologibandung"] },
  { name: "Institut Teknologi Sepuluh Nopember", domain: "its.ac.id", keys: ["its", "institutteknologisepuluhnopember", "sepuluhnopember"] },
  { name: "IPB University", domain: "ipb.ac.id", keys: ["ipb", "ipbuniversity", "institutpertanianbogor"] },
  { name: "Universitas Diponegoro", domain: "undip.ac.id", keys: ["undip", "universitasdiponegoro", "diponegoro"] },
  { name: "Universitas Brawijaya", domain: "ub.ac.id", keys: ["ub", "universitasbrawijaya", "brawijaya"] },
  { name: "Universitas Padjadjaran", domain: "unpad.ac.id", keys: ["unpad", "universitaspadjadjaran", "padjadjaran"] },
  { name: "Universitas Sebelas Maret", domain: "uns.ac.id", keys: ["uns", "universitassebelasmaret", "sebelasmaret"] },
  { name: "Universitas Negeri Yogyakarta", domain: "uny.ac.id", keys: ["uny", "universitasnegeriyogyakarta"] },
  { name: "Universitas Negeri Semarang", domain: "unnes.ac.id", keys: ["unnes", "universitasnegerisemarang"] },
  { name: "Universitas Negeri Malang", domain: "um.ac.id", keys: ["um", "universitasnegerimalang"] },
  { name: "Universitas Bina Nusantara", domain: "binus.ac.id", keys: ["binus", "universitasbinanusantara", "bina"] },
  { name: "Universitas Telkom", domain: "telkomuniversity.ac.id", keys: ["telkom", "telkomuniversity", "universitastelkom"] },
  { name: "Universitas Dian Nuswantoro", domain: "dinus.ac.id", keys: ["udinus", "universitasdiannuswantoro", "diannuswantoro", "dinus"] },
  { name: "Universitas Muhammadiyah Yogyakarta", domain: "umy.ac.id", keys: ["umy", "universitasmuhammadiyahyogyakarta"] },
  { name: "Universitas Islam Indonesia", domain: "uii.ac.id", keys: ["uii", "universitasislamindonesia"] },
  { name: "Universitas Katolik Indonesia Atma Jaya", domain: "atmajaya.ac.id", keys: ["atmajaya", "unikaatma"] },
  { name: "Universitas Sanata Dharma", domain: "usd.ac.id", keys: ["usd", "sanatadharma", "universitassanatadharma"] },
  { name: "Universitas Ahmad Dahlan", domain: "uad.ac.id", keys: ["uad", "universitasahmaddahlan"] },
  { name: "Universitas Hasanuddin", domain: "unhas.ac.id", keys: ["unhas", "universitashasanuddin", "hasanuddin"] },
  { name: "Universitas Sumatera Utara", domain: "usu.ac.id", keys: ["usu", "universitassumaterautara"] },
  { name: "Universitas Andalas", domain: "unand.ac.id", keys: ["unand", "universitasandalas"] },
  { name: "Universitas Sriwijaya", domain: "unsri.ac.id", keys: ["unsri", "universitassriwijaya", "sriwijaya"] },
  { name: "Universitas Riau", domain: "unri.ac.id", keys: ["unri", "universitasriau"] },
  { name: "Universitas Udayana", domain: "unud.ac.id", keys: ["unud", "universitasudayana", "udayana"] },
  { name: "Universitas Jenderal Soedirman", domain: "unsoed.ac.id", keys: ["unsoed", "jenderalsoedirman", "soedirman"] },
  { name: "Universitas Negeri Surabaya", domain: "unesa.ac.id", keys: ["unesa", "universitasnegerisurabaya"] },
  { name: "Universitas Islam Negeri Sunan Kalijaga", domain: "uin-suka.ac.id", keys: ["uinsuka", "sunankalijaga"] },
  { name: "Universitas Islam Negeri Maulana Malik Ibrahim", domain: "uin-malang.ac.id", keys: ["uinmalang", "maulanamalikibrahim"] },
  { name: "Universitas Pelita Harapan", domain: "uph.edu", keys: ["uph", "pelitaharapan", "universitaspelitaharapan"] },
  { name: "Universitas Multimedia Nusantara", domain: "umn.ac.id", keys: ["umn", "multimedianusantara", "universitasmultimedianusantara"] },
  { name: "Universitas Prasetiya Mulya", domain: "pmbs.ac.id", keys: ["prasetiyamulya", "pmbs"] },
  { name: "Universitas Ciputra", domain: "ciputra.ac.id", keys: ["ciputra", "universitasciputra"] },
  { name: "Universitas Tarumanagara", domain: "untar.ac.id", keys: ["untar", "tarumanagara", "universitastarumanagara"] },
  { name: "Universitas Trisakti", domain: "trisakti.ac.id", keys: ["trisakti", "universitastrisakti"] },
  { name: "Universitas Mercu Buana", domain: "mercubuana.ac.id", keys: ["mercubuana", "universitasmercubuana"] },
  { name: "Universitas Gunadarma", domain: "gunadarma.ac.id", keys: ["gunadarma", "universitasgunadarma"] },
  { name: "Universitas Atma Jaya Yogyakarta", domain: "uajy.ac.id", keys: ["uajy", "atmajayayogyakarta"] },
  { name: "Universitas Esa Unggul", domain: "esaunggul.ac.id", keys: ["esaunggul", "universitasesaunggul"] },
  { name: "Universitas Muhammadiyah Malang", domain: "umm.ac.id", keys: ["umm", "universitasmuhammadiyahmalang"] },
  { name: "Universitas Negeri Padang", domain: "unp.ac.id", keys: ["unp", "universitasnegeripadang"] },
  { name: "Universitas Negeri Makassar", domain: "unm.ac.id", keys: ["unm", "universitasnegerimakassar"] },
  { name: "Universitas Lambung Mangkurat", domain: "ulm.ac.id", keys: ["ulm", "lambungmangkurat"] },
  { name: "Universitas Syiah Kuala", domain: "usk.ac.id", keys: ["usk", "syiahkuala", "unsyiah"] },
  { name: "Universitas Sam Ratulangi", domain: "unsrat.ac.id", keys: ["unsrat", "samratulangi"] },
  { name: "Universitas Jember", domain: "unej.ac.id", keys: ["unej", "universitasjember"] },
  { name: "Universitas Nusa Cendana", domain: "undana.ac.id", keys: ["undana", "nusacendana"] },
];

function cleanInstitution(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchInstitution(name) {
  const n = cleanInstitution(name);
  if (!n) return null;
  for (const entry of INSTITUTIONS) {
    for (const key of entry.keys) {
      if (!key) continue;
      if (n === key) return entry;
      if (key.length >= 3 && (n.includes(key) || key.includes(n))) return entry;
    }
  }
  return null;
}

function guessDomain(name) {
  const raw = (name || "").trim();
  if (!raw) return "";
  if (/\.[a-z]{2,}$/i.test(raw) && !/\s/.test(raw)) return raw.toLowerCase();
  const words = raw.split(/\s+/).filter(Boolean);
  const firstTok = words[0].toUpperCase().replace(/[^A-Z]/g, "");
  const schoolMatch = firstTok.match(/^(SMA|SMK|SMP|MAN|MA|MTS|SD)(N?)$/);
  if (schoolMatch) {
    const base = schoolMatch[1];
    const isNegeri = schoolMatch[2] === "N" || words.some((w) => /^negeri$/i.test(w));
    const num = words.find((w) => /^\d+$/.test(w)) || "";
    const city = words
      .filter((w, i) => i > 0 && !/^(sma|smk|smp|ma|man|mts|sd|n)$/i.test(w) && !/^negeri$/i.test(w) && !/^\d+$/.test(w))
      .join("")
      .toLowerCase();
    return `${base.toLowerCase()}${isNegeri ? "n" : ""}${num}${city}.sch.id`;
  }
  const generic = new Set(["universitas", "institut", "sekolah", "tinggi", "politeknik", "akademi", "negeri", "swasta", "islam", "katolik", "kristen", "hindu", "buddha"]);
  const abbr = words.slice(0, -1).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join("").toLowerCase();
  const tail = (words.filter((w) => !generic.has(w.toLowerCase()) && /^[A-Za-z]/.test(w)).pop() || "").toLowerCase();
  const slug = (abbr && tail ? abbr + tail : tail || words.join("").toLowerCase()).replace(/[^a-z0-9]/g, "");
  return slug ? `${slug}.ac.id` : "";
}

function institutionDomain(name) {
  const matched = matchInstitution(name);
  if (matched) return matched.domain;
  return guessDomain(name);
}

function faviconForDomain(domain) {
  const d = (domain || "").trim();
  if (!d) return "";
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=128`;
}

function resolveEducationLogo(name) {
  const domain = institutionDomain(name);
  return domain ? faviconForDomain(domain) : "";
}

// Sumber gambar EducationLogo: logo manual menimpa logo otomatis
function eduLogoSrc(name, logoUrl) {
  const manual = (logoUrl || "").trim();
  return manual || resolveEducationLogo(name);
}

function suggestInstitutions(query, limit = 6) {
  const q = cleanInstitution(query);
  if (!q) return [];
  const starts = [];
  const contains = [];
  for (const entry of INSTITUTIONS) {
    const name = cleanInstitution(entry.name);
    const hitStart = entry.keys.some((k) => k.startsWith(q)) || name.startsWith(q);
    const hitAny = entry.keys.some((k) => k.includes(q)) || name.includes(q);
    if (hitStart) starts.push(entry);
    else if (hitAny) contains.push(entry);
  }
  return [...starts, ...contains].slice(0, limit);
}
