/**
 * Isi halaman profil, sama untuk alumni dan koordinator.
 * isiTambahan tampil di antara kartu identitas dan pengaturan akun.
 */
function pasangHalamanProfil(isiTambahan = '') {
  const main = document.querySelector('main');
  main.innerHTML = `
    <section class="relative rounded-2xl overflow-hidden shadow-md text-white" style="background: linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%);">
      <span class="absolute -right-12 -top-12 w-48 h-48 rounded-full pointer-events-none" style="background: rgba(255,255,255,0.06);"></span>
      <span class="absolute right-24 -bottom-16 w-36 h-36 rounded-full pointer-events-none" style="background: rgba(255,255,255,0.04);"></span>
      <div class="relative z-10 px-5 sm:px-8 py-6 flex items-center gap-4 min-w-0">
        <div class="relative shrink-0">
          <div data-avatar-saya class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white/15 border-2 border-white/40 flex items-center justify-center text-xl sm:text-2xl font-bold">${avatar(SAYA)}</div>
          <label for="f-foto" title="Unggah foto profil" class="absolute -bottom-0.5 -right-0.5 w-8 h-8 rounded-full bg-white text-primary1 border-2 border-primary2 flex items-center justify-center cursor-pointer hover:bg-primary5 transition-colors focus-within:ring-4 focus-within:ring-white/40">
            <i data-lucide="camera" class="w-4 h-4"></i>
            <input id="f-foto" type="file" accept="image/png,image/jpeg,image/webp" class="sr-only" aria-label="Unggah foto profil">
          </label>
        </div>
        <div class="min-w-0">
          <p class="!text-[10px] font-semibold uppercase tracking-widest text-white/70">${esc(NAMA_ROLE[SAYA.role])}</p>
          <h2 class="!text-xl sm:!text-2xl !font-bold leading-tight truncate">${esc(SAYA.nama)}</h2>
          <p class="!text-sm text-white/80 truncate">${esc(SAYA.email)}</p>
          <p class="!text-xs text-white/60 mt-1">JPG, PNG, atau WEBP, maksimal 500 KB</p>
          <p id="foto-error" class="hidden mt-1 !text-xs font-medium text-red3" role="alert"></p>
        </div>
      </div>
    </section>

    ${isiTambahan}

    <div class="bg-white rounded-xl border border-neutral4 elevation2">
      <div class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-neutral4">
        <section class="p-5 sm:p-6 space-y-4">
          <div class="flex items-center gap-3 mb-1">
            <span class="w-9 h-9 rounded-lg bg-primary5 text-primary1 flex items-center justify-center shrink-0"><i data-lucide="user-round" class="w-[18px] h-[18px]"></i></span>
            <h3 class="!text-base font-semibold text-neutral1">Informasi Pribadi</h3>
          </div>
          <dl class="space-y-3 text-sm">
            <div><dt class="text-neutral3 text-xs">Nama</dt><dd class="font-medium text-neutral1">${esc(SAYA.nama)}</dd></div>
            <div><dt class="text-neutral3 text-xs">Email</dt><dd class="font-medium text-neutral1">${esc(SAYA.email)}</dd></div>
            <div><dt class="text-neutral3 text-xs">Password</dt><dd class="font-medium text-neutral1">********</dd></div>
          </dl>
        </section>

        <form id="form-password" class="p-5 sm:p-6 space-y-4 border-t lg:border-t-0 border-neutral4">
          <div class="flex items-center gap-3 mb-1">
            <span class="w-9 h-9 rounded-lg bg-yellow3 text-yellow1 flex items-center justify-center shrink-0"><i data-lucide="key-round" class="w-[18px] h-[18px]"></i></span>
            <h3 class="!text-base font-semibold text-neutral1">Ganti Password</h3>
          </div>
          <div><label for="f-lama" class="label">Password Lama</label><input id="f-lama" name="lama" type="password" class="input" required autocomplete="current-password"></div>
          <div><label for="f-baru" class="label">Password Baru</label><input id="f-baru" name="baru" type="password" class="input" required minlength="7" autocomplete="new-password" placeholder="Minimal 7 karakter"></div>
          <div><label for="f-konfirmasi" class="label">Konfirmasi Password Baru</label><input id="f-konfirmasi" name="konfirmasi" type="password" class="input" required autocomplete="new-password"></div>
          <p id="password-error" class="hidden !text-sm text-red1" role="alert"></p>
          <div class="flex justify-end"><button type="submit" class="btn-primary">Ganti Password</button></div>
        </form>
      </div>
    </div>`;

  document.getElementById('f-foto').addEventListener('change', async e => {
    const pesan = document.getElementById('foto-error');
    pesan.classList.add('hidden');
    const file = e.target.files[0];
    if (!file) return;
    try {
      const foto = await bacaGambar(file, 500);
      const hasil = DB.akun.gantiFoto(SAYA.id, foto);
      if (!hasil.ok) throw new Error(hasil.error);
      SAYA.foto = foto;
      document.querySelectorAll('[data-avatar-saya]').forEach(el => { el.innerHTML = avatar(SAYA); });
      showToast('Foto profil berhasil diunggah.');
    } catch (err) {
      pesan.textContent = err.message;
      pesan.classList.remove('hidden');
    }
  });

  document.getElementById('form-password').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const pesan = document.getElementById('password-error');
    const { lama, baru, konfirmasi } = Object.fromEntries(new FormData(form));
    pesan.classList.add('hidden');
    const hasil = baru === konfirmasi ? DB.akun.gantiPassword(SAYA.id, lama, baru) : { ok: false, error: 'Konfirmasi password tidak sama.' };
    if (!hasil.ok) {
      pesan.textContent = hasil.error;
      pesan.classList.remove('hidden');
      return;
    }
    form.reset();
    showToast('Password berhasil diubah.');
  });
}
