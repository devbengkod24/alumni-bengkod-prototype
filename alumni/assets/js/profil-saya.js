const PROFIL_SAYA_KEY = "bengkod_alumni_profile";

const DEFAULT_PROFIL_SAYA = {
  name: "Aisha Dwi Rahmawati",
  firstName: "Aisha Dwi",
  lastName: "Rahmawati",
  nim: "A11.2020.12345",
  gender: "Perempuan",
  entryYear: "2020",
  gradYear: "2024",
  batch: "2024",
  phone: "081234567890",
  whatsapp: "081234567890",
  headline: "Data Scientist & Data Analyst",
  location: "Kota Kudus, Jawa Tengah, Indonesia",
  city: "Kota Kudus, Jawa Tengah",
  industry: "Teknologi, Informasi, dan Internet",
  university: "Universitas Dian Nuswantoro",
  followers: 77,
  linkedin: "https://www.linkedin.com/in/aisharah",
  github: "https://github.com/aishaadr",
  website: "https://aisharahma.dev",
  email: "aisha.rahma@alumni.dinus.ac.id",
  careerStatus: "Bekerja",
  jobField: "Infokom",
  jobCategory: "Perusahaan Swasta",
  companyName: "PT GoTo Gojek Tokopedia",
  jobTitle: "Junior Data Scientist & Analyst",
  jobScope: "Nasional",
  about: `Motivated Informatics Engineering student at Universitas Dian Nuswantoro Semarang with a strong passion for data science and business analysis. Focused on extracting meaningful insights from data through statistical analysis, data visualization, and predictive modeling to solve real-world problems and support data-driven decision-making.

Selama masa studi, aktif memegang peranan krusial sebagai Koordinator Asisten Praktikum di laboratorium Bengkel Koding, memimpin sesi bimbingan teknis serta mentoring bagi lebih dari 150 mahasiswa dalam mata kuliah Pemrograman Berorientasi Objek dan Rekayasa Web. Berpengalaman mendalami arsitektur sistem Next.js, TypeScript, Python, dan Laravel.`,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80",
  coverImageUrl: "",
};

async function readProfileImage(file, limitMb) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Pilih gambar JPG, PNG, atau WebP.");
  }
  if (file.size > limitMb * 1024 * 1024) {
    throw new Error(`Ukuran gambar maksimal ${limitMb} MB.`);
  }
  try {
    const url = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const image = new Image();
    image.src = url;
    await image.decode();
    return url;
  } catch {
    throw new Error("Gambar gagal dibaca.");
  }
}

function loadProfilSaya() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFIL_SAYA_KEY));
    const profile = { ...DEFAULT_PROFIL_SAYA, ...saved };
    if (typeof profile.headline === "string") {
      profile.headline = profile.headline.replace(/\s*\|\s*Undergraduate Student at Dian Nuswantoro University\s*$/, "");
    }
    return profile;
  } catch {
    return { ...DEFAULT_PROFIL_SAYA };
  }
}

function saveProfilSaya(changes) {
  const profile = { ...loadProfilSaya(), ...changes };
  localStorage.setItem(PROFIL_SAYA_KEY, JSON.stringify(profile));
  return profile;
}
