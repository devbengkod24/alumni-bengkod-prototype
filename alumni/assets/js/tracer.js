/**
 * Ringkasan dan form tracer study (Status Karir di Profil Saya).
 * Dipakai halaman tracer, isi data first login, Profil Saya, dan profil alumni di kedua role.
 */
const wajib = '<span class="text-red2">*</span>';

const opsi = (list, terpilih, kosong) => `<option value="">${esc(kosong)}</option>` +
  list.map(o => `<option ${o === terpilih ? 'selected' : ''}>${esc(o)}</option>`).join('');

const pilihan = (name, label, list, nilai, kosong) => `
  <div><label for="f-${name}" class="label">${esc(label)} ${wajib}</label>
    <select id="f-${name}" name="${name}" class="input" required>${opsi(list, nilai, kosong)}</select></div>`;

const isian = (name, label, nilai, atribut = '') => `
  <div><label for="f-${name}" class="label">${esc(label)} ${wajib}</label>
    <input id="f-${name}" name="${name}" class="input" value="${esc(nilai)}" required ${atribut}></div>`;

const judulBagian = (ikon, judul, warna = 'bg-primary5 text-primary1') => `
  <div class="flex items-center gap-3 mb-4">
    <span class="w-9 h-9 rounded-lg ${warna} flex items-center justify-center shrink-0"><i data-lucide="${ikon}" class="w-[18px] h-[18px]"></i></span>
    <h3 class="!text-base font-semibold text-neutral1">${judul}</h3>
  </div>`;

// Nama tempat mengikuti status yang dipilih
const LABEL_TEMPAT = { 'Bekerja Full Time': 'Tempat Bekerja', 'Bekerja Part Time': 'Tempat Part Time', Wiraswasta: 'Nama Usaha' };

// Dua kartu: data diri dan status karir. publik menyembunyikan NIM dan nomor HP untuk sesama alumni.
function ringkasanTracer(t, publik = false) {
  const baris = rows => rows.map(([label, nilai]) => `
    <div class="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-4 gap-y-0.5 py-2.5 border-b border-neutral4/70 last:border-0">
      <dt class="text-sm text-neutral3">${esc(label)}</dt><dd class="text-sm font-medium text-neutral1">${esc(nilai || '-')}</dd>
    </div>`).join('');
  const subjudul = teks => `<p class="!text-xs font-semibold uppercase tracking-wider text-neutral3 mt-4">${teks}</p>`;

  const kerja = DB.STATUS_BEKERJA.includes(t.status);
  const diri = [
    ['Nama Alumni', t.nama_alumni], ['Jenis Kelamin', t.jns_kelamin], !publik && ['NIM', t.nim], ['Tahun Masuk', t.tahun_masuk], ['Tahun Lulus', t.tahun_lulus],
    ['Kota Domisili', t.kota], ['Keahlian', t.keahlian.join(', ')], ['Email', t.email], !publik && ['Nomor HP (WhatsApp)', t.no_hp],
  ].filter(Boolean);
  return `
    <section class="card">
      ${judulBagian('user-round', 'Data Diri')}
      <dl>${baris(diri)}</dl>
    </section>
    <section class="card">
      ${judulBagian('flag', 'Status Karir')}
      <div class="mb-1">${badgeStatus(t.status)}</div>
      ${kerja ? `${subjudul('Pekerjaan Utama')}<dl>${baris([['Bidang Pekerjaan', t.bidang_job], ['Kategori Pekerjaan', t.jns_job], [LABEL_TEMPAT[t.status], t.nama_job], ['Jabatan Pekerjaan', t.jabatan_job], ['Tingkat Pekerjaan', t.lingkup_job]])}</dl>` : ''}
      ${t.nama_studi ? `${subjudul('Studi Lanjut')}<dl>${baris([['Sumber Biaya Studi', t.biaya_studi], ['Perguruan Tinggi', t.nama_studi], ['Program Studi', t.prodi], ['Tanggal Mulai Studi', fmtDate(t.tgl_studi)]])}</dl>` : ''}
      ${t.nama_sampingan ? `${subjudul('Pekerjaan Sampingan / Freelance')}<dl>${baris([['Tempat atau Klien', t.nama_sampingan], ['Peran', t.peran_sampingan]])}</dl>` : ''}
    </section>`;
}

// Form ditambahkan ke wadah. Tombol Batal hanya muncul saat ada fungsi batal.
function formTracer(wadah, t, setelahSimpan, batal) {
  const v = t || {};
  const TAHUN_INI = new Date().getFullYear();
  wadah.insertAdjacentHTML('beforeend', `
    <form id="form" class="space-y-6">
      <section class="card">
        ${judulBagian('user-round', 'Data Diri')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label for="f-nama" class="label">Nama Alumni</label><input id="f-nama" class="input !bg-neutral5" value="${esc(SAYA.nama)}" readonly></div>
          <div><label for="f-email" class="label">Alamat Email</label><input id="f-email" class="input !bg-neutral5" value="${esc(SAYA.email)}" readonly></div>
          ${pilihan('jns_kelamin', 'Jenis Kelamin', DB.OPSI.jns_kelamin, v.jns_kelamin, 'Pilih Jenis Kelamin')}
          ${isian('nim', 'NIM', v.nim ?? '', 'placeholder="Masukkan NIM sewaktu mahasiswa"')}
          ${isian('tahun_masuk', 'Tahun Masuk', v.tahun_masuk ?? '', `type="number" min="1990" max="${TAHUN_INI}" step="1" placeholder="Masukkan tahun masuk perkuliahan"`)}
          ${isian('tahun_lulus', 'Tahun Lulus', v.tahun_lulus ?? '', `type="number" min="1990" max="${TAHUN_INI}" step="1" placeholder="Masukkan tahun lulus perkuliahan"`)}
          ${isian('no_hp', 'Nomor HP (WhatsApp)', v.no_hp ?? '', 'inputmode="numeric" pattern="[0-9]{8,15}" title="Masukkan 8 sampai 15 angka" placeholder="Nomor yang terhubung WhatsApp"')}
          ${isian('kota', 'Kota Domisili', v.kota ?? '', 'placeholder="Contoh: Semarang"')}
          <div><label for="f-keahlian" class="label">Keahlian</label>
            <input id="f-keahlian" name="keahlian" class="input" value="${esc((v.keahlian || []).join(', '))}" placeholder="Contoh: Laravel, React, Figma">
            <p class="!text-xs text-neutral3 mt-1">Pisahkan dengan koma. Dipakai untuk pencarian Alumni dan Gigs.</p></div>
        </div>
      </section>

      <section class="card">
        ${judulBagian('flag', 'Status Saat Ini')}
        ${pilihan('status', 'Jelaskan Status Anda Saat Ini', DB.STATUS, v.status, 'Pilih Status Anda Saat Ini')}
        <div class="mt-4 space-y-2.5">
          <label id="opsi-juga-studi" class="flex items-start gap-2.5 text-sm text-neutral1 cursor-pointer"><input type="checkbox" name="juga_studi" value="1" ${v.nama_studi && v.status !== DB.STATUS_STUDI ? 'checked' : ''} class="w-4 h-4 mt-0.5 accent-[#1E3A8A]"> Saya juga sedang menempuh studi lanjut (S2)</label>
          <label class="flex items-start gap-2.5 text-sm text-neutral1 cursor-pointer"><input type="checkbox" name="ada_sampingan" value="1" ${v.nama_sampingan ? 'checked' : ''} class="w-4 h-4 mt-0.5 accent-[#1E3A8A]"> Saya punya pekerjaan sampingan atau freelance</label>
        </div>
      </section>

      <section id="grup-kerja" class="card hidden">
        ${judulBagian('briefcase', 'Data Pekerjaan', 'bg-green3 text-green1')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${pilihan('bidang_job', 'Bidang Pekerjaan', DB.OPSI.bidang_job, v.bidang_job, 'Pilih Bidang Pekerjaan')}
          ${pilihan('jns_job', 'Kategori Pekerjaan', DB.OPSI.jns_job, v.jns_job, 'Pilih Kategori Perusahaan')}
          ${isian('nama_job', 'Nama Instansi', v.nama_job ?? '', 'placeholder="Masukkan nama tempat"')}
          ${pilihan('jabatan_job', 'Jabatan Pekerjaan', DB.OPSI.jabatan_job, v.jabatan_job, 'Pilih Jabatan Pekerjaan')}
          <div class="sm:col-span-2">${pilihan('lingkup_job', 'Tingkat Pekerjaan', DB.OPSI.lingkup_job, v.lingkup_job, 'Pilih Tingkat Pekerjaan')}</div>
        </div>
      </section>

      <section id="grup-studi" class="card hidden">
        ${judulBagian('graduation-cap', 'Data Studi Lanjut', 'bg-yellow3 text-yellow1')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${pilihan('biaya_studi', 'Sumber Biaya Melanjutkan Studi', DB.OPSI.biaya_studi, v.biaya_studi, 'Pilih Sumber Biaya')}
          ${isian('nama_studi', 'Nama Perguruan Tinggi Lanjutan Studi', v.nama_studi ?? '', 'placeholder="Tempat Anda melakukan studi"')}
          ${isian('prodi', 'Nama Program Studi yang Sedang Ditempuh', v.prodi ?? '', 'placeholder="Contoh: S2 Teknik Informatika"')}
          ${isian('tgl_studi', 'Tanggal Masuk atau Mulai Studi Lanjutan', v.tgl_studi ?? '', 'type="date"')}
        </div>
      </section>

      <section id="grup-sampingan" class="card hidden">
        ${judulBagian('laptop', 'Pekerjaan Sampingan / Freelance', 'bg-primary5 text-primary1')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${isian('nama_sampingan', 'Tempat atau Klien', v.nama_sampingan ?? '', 'placeholder="Contoh: Klien UMKM, Studio Kode"')}
          ${isian('peran_sampingan', 'Peran', v.peran_sampingan ?? '', 'placeholder="Contoh: Freelance Frontend Developer"')}
        </div>
      </section>

      <p id="form-error" class="hidden !text-sm text-red1" role="alert"></p>
      <div class="flex justify-end gap-2">
        ${batal ? '<button type="button" id="btn-batal" class="btn-outline">Batal</button>' : ''}
        <button type="submit" class="btn-primary">Simpan</button>
      </div>
    </form>`);

  const form = document.getElementById('form');
  const status = form.elements.status;

  // Cabang yang tidak dipakai dimatikan supaya tidak ikut divalidasi dan tersimpan
  function aturCabang() {
    const studiUtama = status.value === DB.STATUS_STUDI;
    const cabang = {
      'grup-kerja': DB.STATUS_BEKERJA.includes(status.value),
      'grup-studi': studiUtama || form.elements.juga_studi.checked,
      'grup-sampingan': form.elements.ada_sampingan.checked,
    };
    Object.entries(cabang).forEach(([id, aktif]) => {
      const grup = document.getElementById(id);
      grup.classList.toggle('hidden', !aktif);
      grup.querySelectorAll('input, select').forEach(el => { el.disabled = !aktif; });
    });
    document.getElementById('opsi-juga-studi').classList.toggle('hidden', studiUtama);
    if (cabang['grup-kerja']) form.querySelector('label[for="f-nama_job"]').firstChild.textContent = `${LABEL_TEMPAT[status.value]} `;
  }

  form.addEventListener('change', e => { if (['status', 'juga_studi', 'ada_sampingan'].includes(e.target.name)) aturCabang(); });
  document.getElementById('btn-batal')?.addEventListener('click', batal);
  aturCabang();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const pesan = document.getElementById('form-error');
    const hasil = DB.tracer.simpan(SAYA.id, Object.fromEntries(new FormData(form)));
    if (!hasil.ok) {
      pesan.textContent = hasil.error;
      pesan.classList.remove('hidden');
      form.elements[hasil.field]?.focus();
      return;
    }
    setelahSimpan();
  });
  refreshIcons();
}
