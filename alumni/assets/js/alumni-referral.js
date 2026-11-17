/**
 * Logika referral bersama (fungsi murni, tanpa markup).
 * Dipakai:
 *   - dashboard.html           : kartu referral di feed Beranda
 *   - referral.html            : tab Jelajahi, Referral Saya, Pengajuan Terkirim
 *   - referral-pengajuan.html  : daftar pengajuan untuk satu referral milik sendiri
 * Data post referral ada di alumni-data.js (loadPosts / savePosts, post.jenis === "referral").
 * Bentuk data: post.referral = { perusahaan, posisi, level, batas: "YYYY-MM-DD", ditutup?: true }
 *              post.pengajuan = [{ id, authorName, authorAvatar, authorHeadline, pesan, status, masukan, waktu, no_hp, linkedin }]
 *              status: "menunggu" | "dihubungi" | "masukan"
 */

/** Tanggal hari ini (zona waktu lokal) dalam format YYYY-MM-DD */
function referralTodayStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Referral ditutup: ditutup manual (Tutup Sekarang) atau batas review sudah lewat */
function referralIsClosed(post) {
  if (!post || !post.referral) return false;
  if (post.referral.ditutup === true) return true;
  return Boolean(post.referral.batas) && post.referral.batas < referralTodayStr();
}

/** Sisa hari sampai batas review (0 = hari terakhir, negatif = sudah lewat, null = tanpa batas) */
function referralDaysLeft(post) {
  const batas = post && post.referral && post.referral.batas;
  if (!batas) return null;
  const end = new Date(`${batas}T00:00:00`);
  const today = new Date(`${referralTodayStr()}T00:00:00`);
  if (isNaN(end.getTime())) return null;
  return Math.round((end - today) / 86400000);
}

/** Referral milik profil aktif: nama cocok, atau post seed Aisha (id 5) */
function referralIsMine(post, name) {
  if (!post) return false;
  const myName = String(name || "").trim().toLowerCase();
  const authorName = String(post.authorName || "").trim().toLowerCase();
  return Boolean(myName && authorName && myName === authorName) || post.id === 5;
}

/** Pengajuan milik profil aktif di sebuah referral (null bila belum mengajukan) */
function referralMyPengajuan(post, name) {
  if (!post || !Array.isArray(post.pengajuan)) return null;
  const myName = String(name || "").trim().toLowerCase();
  if (!myName) return null;
  return post.pengajuan.find((a) => String(a.authorName || "").trim().toLowerCase() === myName) || null;
}

function referralStatusLabel(status) {
  if (status === "dihubungi") return "Dihubungi";
  if (status === "masukan") return "Diberi Masukan";
  return "Menunggu";
}

/** Kelas badge status pengajuan (Tailwind) */
function referralStatusClass(status) {
  if (status === "dihubungi") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "masukan") return "bg-blue-50 text-[#1E3A8A] border-blue-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

/** "2026-11-20" atau ISO -> "20 Nov 2026" */
function referralFormatDate(str) {
  if (!str) return "";
  const iso = String(str).includes("T") ? str : `${str}T00:00:00`;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return String(str);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

/** Tautan wa.me berisi pesan pembuka dari pemilik referral ke pelamar */
function referralWaUrl(post, pelamar, myName) {
  const phone = String((pelamar && pelamar.no_hp) || "081234567890").replace(/\D/g, "");
  const waNumber = phone.startsWith("0") ? `62${phone.slice(1)}` : phone;
  const pos = (post && post.referral && post.referral.posisi) || "posisi";
  const per = (post && post.referral && post.referral.perusahaan) || "perusahaan";
  const nama = (pelamar && pelamar.authorName) || "rekan alumni";
  const pesan = `Halo ${nama}, saya ${myName || "rekan alumni"} dari Portal Alumni Bengkel Koding. Terima kasih sudah mengajukan referral ${pos} di ${per}. Boleh kita ngobrol sebentar soal posisinya?`;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`;
}

/** Profil aktif (nama, headline, avatar): direktori alumni, ditimpa hasil edit profil bila ada */
function referralCurrentProfile() {
  const dir = typeof ALUMNI_DIRECTORY !== "undefined" ? ALUMNI_DIRECTORY[0] : null;
  const fallbackAvatar = typeof DEFAULT_AVATAR !== "undefined" ? DEFAULT_AVATAR : "";
  const profile = {
    name: dir ? dir.name : "Aisha Dwi Rahmawati",
    headline: dir ? dir.headline : "Alumni Bengkel Koding",
    avatarUrl: (dir && dir.avatarUrl) || fallbackAvatar,
  };
  try {
    const saved = JSON.parse(localStorage.getItem("bengkod_alumni_profile") || "null");
    if (saved) {
      profile.name = saved.name || profile.name;
      profile.headline = saved.headline || profile.headline;
      profile.avatarUrl = saved.avatarUrl || profile.avatarUrl;
    }
  } catch {}
  return profile;
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    referralTodayStr,
    referralIsClosed,
    referralDaysLeft,
    referralIsMine,
    referralMyPengajuan,
    referralStatusLabel,
    referralStatusClass,
    referralFormatDate,
    referralWaUrl,
    referralCurrentProfile,
  });
}
