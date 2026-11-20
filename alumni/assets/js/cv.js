/**
 * Kategori data profil alumni, mengikuti tabel dan form di monolight, ditambah Proyek dan Portofolio.
 * Dipakai Profil Saya, Generate CV, profil alumni, dan pratinjau CV referral.
 */
const lokasi = [['kota', 'Kota', 'text'], ['negara', 'Negara', 'text']];
const skala = (name, label) => [name, label, 'select', DB.OPSI.kemampuan];

const CV_KATEGORI = {
  academic: {
    judul: 'Akademik', ikon: 'graduation-cap', tabel: 'academics',
    fields: [['nama_studi', 'Nama Universitas', 'text'], ['prodi', 'Program Studi', 'text'], ['ipk', 'IPK Mahasiswa', 'ipk'], ['tahun_masuk', 'Tahun Masuk', 'tahun'], ['tahun_lulus', 'Tahun Lulus', 'tahun'], ...lokasi, ['catatan', 'Catatan', 'textarea']],
    ringkas: r => ({ judul: `${r.nama_studi} - ${r.kota}, ${r.negara}`, waktu: `${r.tahun_masuk} - ${r.tahun_lulus}`, baris: `${r.prodi}, ${r.ipk}/4.00`, catatan: r.catatan }),
  },
  job: {
    judul: 'Pekerjaan', ikon: 'briefcase', tabel: 'jobs',
    fields: [['nama_job', 'Nama Instansi', 'text'], ['jabatan_job', 'Jabatan Pekerjaan', 'text'], ['periode_masuk_job', 'Mulai (contoh: Januari 2024)', 'text'], ['periode_keluar_job', 'Sampai (contoh: Sekarang)', 'text'], ...lokasi, ['catatan', 'Catatan', 'textarea']],
    ringkas: r => ({ judul: `${r.nama_job} - ${r.kota}, ${r.negara}`, waktu: `${r.periode_masuk_job} - ${r.periode_keluar_job}`, baris: r.jabatan_job, catatan: r.catatan }),
  },
  // Bank karya: sumber Hall of Fame di Beranda, lampiran lamaran Gigs, dan tujuan sinkron gig yang selesai
  project: {
    judul: 'Proyek dan Portofolio', ikon: 'folder-git-2', tabel: 'projects',
    fields: [['nama_proyek', 'Nama Proyek', 'text'], ['peran_proyek', 'Peran Anda', 'text'], ['tahun_proyek', 'Tahun', 'tahun'], ['stack_proyek', 'Tech Stack (pisahkan dengan koma)', 'text'], ['link_proyek', 'Tautan Proyek', 'url'], ['deskripsi_proyek', 'Deskripsi', 'textarea']],
    ringkas: r => ({ judul: r.nama_proyek, waktu: r.tahun_proyek, baris: `${r.peran_proyek} · ${r.stack_proyek}`, catatan: r.deskripsi_proyek, tautan: r.link_proyek }),
    // Publish ke Beranda sebagai karya (Hall of Fame atau uji beta) tanpa mengisi ulang. Hanya tampil untuk pemilik.
    aksi: r => (r.id_post
      ? `<a href="beranda.html#post-${r.id_post}" class="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-green1 hover:underline"><i data-lucide="circle-check" class="w-3.5 h-3.5"></i> Sudah di Beranda, lihat karya</a>`
      : `<a href="beranda.html?karya=${r.id}" class="btn-outline !px-3 !py-1.5 !text-xs mt-2.5"><i data-lucide="rocket" class="w-3.5 h-3.5"></i> Publish ke Beranda</a>`),
  },
  internship: {
    judul: 'Magang', ikon: 'building-2', tabel: 'internships',
    fields: [['nama_intern', 'Nama Instansi', 'text'], ['jabatan_intern', 'Jabatan Pekerjaan', 'text'], ['periode_masuk_intern', 'Mulai (contoh: Juli 2023)', 'text'], ['periode_keluar_intern', 'Sampai (contoh: Desember 2023)', 'text'], ...lokasi, ['catatan', 'Catatan', 'textarea']],
    ringkas: r => ({ judul: `${r.nama_intern} - ${r.kota}, ${r.negara}`, waktu: `${r.periode_masuk_intern} - ${r.periode_keluar_intern}`, baris: r.jabatan_intern, catatan: r.catatan }),
  },
  organization: {
    judul: 'Organisasi', ikon: 'users', tabel: 'organizations',
    fields: [['nama_org', 'Nama Organisasi', 'text'], ['jabatan_org', 'Jabatan Organisasi', 'text'], ['periode_masuk_org', 'Mulai (contoh: 2021)', 'text'], ['periode_keluar_org', 'Sampai (contoh: 2022)', 'text'], ...lokasi, ['catatan', 'Catatan', 'textarea']],
    ringkas: r => ({ judul: `${r.nama_org} - ${r.kota}, ${r.negara}`, waktu: `${r.periode_masuk_org} - ${r.periode_keluar_org}`, baris: r.jabatan_org, catatan: r.catatan }),
  },
  award: {
    judul: 'Penghargaan', ikon: 'award', tabel: 'awards',
    fields: [['nama_award', 'Nama Penghargaan', 'text'], ['institusi_award', 'Nama Institusi Penghargaan', 'text'], ['tingkat_award', 'Tingkat Penghargaan', 'select', DB.OPSI.tingkat], ['tahun_award', 'Tahun Penghargaan', 'tahun'], ['deskripsi_award', 'Deskripsi Penghargaan', 'textarea']],
    ringkas: r => ({ judul: r.nama_award, waktu: r.tahun_award, baris: `${r.institusi_award} · Tingkat ${r.tingkat_award}`, catatan: r.deskripsi_award }),
  },
  course: {
    judul: 'Sertifikat dan Lisensi', ikon: 'badge-check', tabel: 'courses',
    fields: [['nama_course', 'Nama Pelatihan', 'text'], ['institusi_course', 'Nama Institusi', 'text'], ['tingkat_course', 'Tingkat Pelatihan', 'select', DB.OPSI.tingkat], ['tahun_course', 'Tahun Pelatihan', 'tahun']],
    ringkas: r => ({ judul: r.nama_course, waktu: r.tahun_course, baris: `${r.institusi_course} · Tingkat ${r.tingkat_course}`, catatan: '' }),
  },
  skill: {
    judul: 'Kemampuan Diri', ikon: 'sparkles', tabel: 'skills', satuBaris: true,
    fields: [skala('kerjasama_skill', 'Kerjasama Tim'), skala('ahli_skill', 'Keahlian di Bidang IT'), skala('inggris_skill', 'Kemampuan Berbahasa Inggris'), skala('komunikasi_skill', 'Kemampuan Berkomunikasi'), skala('pengembangan_skill', 'Pengembangan Diri'), skala('kepemimpinan_skill', 'Kepemimpinan'), skala('etoskerja_skill', 'Etos Kerja')],
    ringkas: r => ({ judul: 'Penilaian kemampuan', waktu: '', baris: '', catatan: '', daftar: CV_KATEGORI.skill.fields.map(([name, label]) => [label, r[name]]) }),
  },
};

// ekstra berisi tombol tambahan di dalam kartu, misalnya Publish ke Beranda
function kartuEntriCv(k, r, ekstra = '') {
  const x = k.ringkas(r);
  return `
    <div class="p-4 rounded-lg border border-neutral4">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
        <div class="flex flex-wrap items-center gap-2">
          <p class="!text-sm font-semibold text-neutral1">${esc(x.judul)}</p>
          ${r.id_gig ? '<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-primary1 bg-primary5 border border-primary4/60 px-2 py-0.5 rounded-full"><i data-lucide="briefcase-business" class="w-3 h-3"></i> Bengkod Gigs</span>' : ''}
        </div>
        ${x.waktu ? `<p class="!text-xs text-neutral3 shrink-0">${esc(x.waktu)}</p>` : ''}
      </div>
      ${x.baris ? `<p class="!text-sm text-neutral2 mt-0.5">${esc(x.baris)}</p>` : ''}
      ${x.catatan ? `<p class="!text-sm text-neutral2 mt-1.5 leading-relaxed">${esc(x.catatan)}</p>` : ''}
      ${tautanAman(x.tautan) ? `<a href="${esc(tautanAman(x.tautan))}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 mt-1.5 text-sm text-primary2 hover:underline break-all"><i data-lucide="external-link" class="w-3.5 h-3.5 shrink-0"></i>${esc(x.tautan)}</a>` : ''}
      ${x.daftar ? `<dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 text-sm">${x.daftar.map(([label, nilai]) => `
        <div class="flex justify-between gap-3"><dt class="text-neutral2">${esc(label)}</dt><dd class="font-medium text-neutral1">${esc(nilai)}</dd></div>`).join('')}</dl>` : ''}
      ${ekstra}
    </div>`;
}

// Semua kategori sekaligus. Ikon pensil dan tombol aksi hanya tampil untuk pemilik CV.
function renderCv(idWadah, idAlumni, bisaUbah) {
  document.getElementById(idWadah).innerHTML = Object.entries(CV_KATEGORI).map(([kunci, k]) => {
    const baris = DB.cv.milik(k.tabel, idAlumni);
    return `
      <section class="card !p-5">
        <div class="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-neutral4">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-8 h-8 rounded-lg bg-primary5 text-primary1 flex items-center justify-center shrink-0"><i data-lucide="${k.ikon}" class="w-4 h-4"></i></span>
            <h3 class="text-base font-semibold text-neutral1 truncate">${esc(k.judul)}</h3>
          </div>
          ${bisaUbah ? `<a href="kategori-cv.html?k=${kunci}" class="btn-icon" aria-label="Kelola ${esc(k.judul)}" title="Kelola ${esc(k.judul)}"><i data-lucide="pencil" class="w-4 h-4"></i></a>` : ''}
        </div>
        <div class="space-y-3">
          ${baris.map(r => kartuEntriCv(k, r, bisaUbah && k.aksi ? k.aksi(r) : '')).join('') || '<p class="!text-sm text-neutral3 text-center py-4">Belum ada data.</p>'}
        </div>
      </section>`;
  }).join('');
  refreshIcons();
}

// ===================== DOKUMEN CV (format ATS dan Modern) =====================
const KOLOM_KIRI = ['academic', 'skill', 'course'];

function entriAts(x) {
  if (x.daftar) return `<p class="!text-[13px] text-neutral2 leading-relaxed">${x.daftar.map(([label, nilai]) => `${esc(label)}: ${esc(nilai)}`).join(' • ')}</p>`;
  return `
    <div>
      <div class="flex items-start justify-between gap-4 text-[13px] font-bold text-neutral1"><span>${esc(x.judul)}</span><span class="font-medium text-neutral2 shrink-0">${esc(x.waktu)}</span></div>
      ${x.baris ? `<p class="!text-[13px] italic text-neutral2 mt-0.5">${esc(x.baris)}</p>` : ''}
      ${x.catatan ? `<p class="!text-[13px] text-neutral2 mt-1 leading-relaxed">${esc(x.catatan)}</p>` : ''}
      ${tautanAman(x.tautan) ? `<p class="!text-[13px] text-neutral2 mt-0.5 break-all">${esc(x.tautan)}</p>` : ''}
    </div>`;
}

function cvAts(kepala, bagian) {
  return `
    <div class="space-y-6">
      <div class="text-center pb-4 border-b-2 border-neutral1 space-y-1.5">
        <h2 class="!text-2xl sm:!text-3xl !font-bold uppercase tracking-wider text-neutral1">${esc(kepala.nama)}</h2>
        <p class="!text-sm sm:!text-[15px] font-semibold text-neutral2">${esc(kepala.karir)}</p>
        <p class="!text-[13px] text-neutral2">${kepala.kontak.map(k => esc(k)).join(' • ')}</p>
        ${kepala.keahlian.length ? `<p class="!text-[13px] text-neutral2">Keahlian: ${kepala.keahlian.map(k => esc(k)).join(' • ')}</p>` : ''}
      </div>
      ${bagian.map(b => `
        <div class="space-y-3">
          <h3 class="!text-sm !font-bold uppercase tracking-wider text-neutral1 pb-1 border-b border-neutral4">${esc(b.judul)}</h3>
          ${b.entri.map(entriAts).join('')}
        </div>`).join('')}
    </div>`;
}

function entriModern(x) {
  if (x.daftar) return `<dl class="space-y-1 text-[13px]">${x.daftar.map(([label, nilai]) => `<div class="flex justify-between gap-3"><dt class="text-neutral2">${esc(label)}</dt><dd class="font-semibold text-neutral1 shrink-0">${esc(nilai)}</dd></div>`).join('')}</dl>`;
  return `
    <div class="border-b border-neutral4/70 pb-3 last:border-0 last:pb-0">
      <p class="!text-[13px] font-bold text-neutral1 leading-snug">${esc(x.judul)}</p>
      ${x.baris ? `<p class="!text-[13px] font-semibold text-primary1 mt-0.5">${esc(x.baris)}</p>` : ''}
      ${x.waktu ? `<p class="!text-xs text-neutral3 mt-0.5">${esc(x.waktu)}</p>` : ''}
      ${x.catatan ? `<p class="!text-[13px] text-neutral2 mt-1 leading-relaxed">${esc(x.catatan)}</p>` : ''}
      ${tautanAman(x.tautan) ? `<p class="!text-xs text-primary2 mt-0.5 break-all">${esc(x.tautan)}</p>` : ''}
    </div>`;
}

const kolomModern = bagian => bagian.map(b => `
  <div class="space-y-3">
    <h3 class="!text-[15px] !font-bold text-primary1 uppercase flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-primary1"></span>${esc(b.judul)}</h3>
    ${b.entri.map(entriModern).join('')}
  </div>`).join('');

function cvModern(kepala, bagian) {
  return `
    <div class="space-y-7">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-neutral4">
        <div class="min-w-0">
          <h2 class="!text-3xl !font-extrabold text-primary1 tracking-tight">${esc(kepala.nama)}</h2>
          <p class="!text-base font-semibold text-neutral2 mt-1.5">${esc(kepala.karir)}</p>
          <p class="!text-[13px] text-neutral3 mt-0.5">Universitas Dian Nuswantoro</p>
          ${kepala.keahlian.length ? `<div class="flex flex-wrap gap-1.5 mt-3">${kepala.keahlian.map(chip).join('')}</div>` : ''}
        </div>
        <div class="space-y-1 sm:text-right shrink-0">${kepala.kontak.map(k => `<p class="!text-[13px] text-neutral2">${esc(k)}</p>`).join('')}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-8">
        <div class="sm:col-span-5 space-y-6">${kolomModern(bagian.filter(b => KOLOM_KIRI.includes(b.kunci)))}</div>
        <div class="sm:col-span-7 space-y-6">${kolomModern(bagian.filter(b => !KOLOM_KIRI.includes(b.kunci)))}</div>
      </div>
    </div>`;
}

// CV satu alumni. aktif berisi kategori yang dicentang, bawaannya semua. freelance=false membuang proyek hasil Gigs.
function dokumenCv(idAlumni, format, aktif = new Set(Object.keys(CV_KATEGORI)), freelance = true) {
  const user = DB.akun.cari(idAlumni);
  const t = DB.tracer.milik(idAlumni);
  const kepala = {
    nama: user.nama,
    karir: DB.tracer.karir(t).ringkas,
    kontak: [user.email, t?.no_hp, t && `Lulus ${t.tahun_lulus}`].filter(Boolean),
    keahlian: t?.keahlian || [],
  };
  const bagian = Object.entries(CV_KATEGORI)
    .filter(([kunci]) => aktif.has(kunci))
    .map(([kunci, k]) => ({ kunci, judul: k.judul, entri: DB.cv.milik(k.tabel, idAlumni).filter(r => freelance || !r.id_gig).map(r => k.ringkas(r)) }))
    .filter(b => b.entri.length);
  const kosong = bagian.length ? '' : '<p class="!text-sm text-neutral3 text-center pt-6 no-print">Belum ada data untuk ditampilkan. Lengkapi riwayat di Profil Saya.</p>';
  return (format === 'ats' ? cvAts(kepala, bagian) : cvModern(kepala, bagian)) + kosong;
}
