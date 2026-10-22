/**
 * Registrasi Alumni Bengkel Koding: validasi form, toggle password, dan dialog sukses.
 * Prototipe statis, data tidak dikirim ke server.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('alumni-register-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const submitSpinner = document.getElementById('submit-spinner');
  const submitText = document.getElementById('submit-text');

  const nama = document.getElementById('nama_lengkap');
  const nim = document.getElementById('nim');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const tahun = document.getElementById('tahun_lulus');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password_confirmation');
  const agreement = document.getElementById('agreement_tracer');
  const cvFile = document.getElementById('cv_file');
  const fotoFile = document.getElementById('foto_profil');

  const nimError = document.getElementById('nim-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const passwordError = document.getElementById('password-error');
  const cvError = document.getElementById('cv-error');
  const fotoError = document.getElementById('foto-error');

  function setError(input, errorEl, message) {
    if (message) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
      input.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
      input.removeAttribute('aria-invalid');
    }
  }

  // Ikon mata: terbuka saat password terlihat, dicoret saat tersembunyi
  const ICON_EYE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  const ICON_EYE_OFF = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.6 5.2A9.9 9.9 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.2 6.2A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 4.2-.9"/><path d="M3 3l18 18"/></svg>';

  window.togglePasswordVisibility = function (inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(inputId + '-toggle-icon');
    const button = icon ? icon.closest('button') : null;
    if (!input || !icon) return;

    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    icon.innerHTML = showing ? ICON_EYE : ICON_EYE_OFF;
    icon.classList.toggle('text-primary1', !showing);

    if (button) {
      button.setAttribute('aria-label', showing ? 'Tampilkan password' : 'Sembunyikan password');
      button.setAttribute('aria-pressed', String(!showing));
    }
  };

  // NIM: format A11.20xx.xxxxx
  const nimPattern = /^[A-Za-z]\d{2}\.\d{4}\.\d{5}$/;
  nim.addEventListener('blur', () => {
    const value = nim.value.trim();
    if (!value) return setError(nim, nimError, '');
    setError(nim, nimError, nimPattern.test(value) ? '' : 'Format NIM belum sesuai, contoh A11.2021.13456.');
  });

  // Email
  email.addEventListener('blur', () => {
    const value = email.value.trim();
    if (!value) return setError(email, emailError, '');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setError(email, emailError, ok ? '' : 'Alamat email belum valid.');
  });

  // Telepon: hanya digit dan plus di awal
  phone.addEventListener('input', () => {
    const cleaned = phone.value.replace(/[^0-9+]/g, '').replace(/(?!^)\+/g, '');
    if (cleaned !== phone.value) phone.value = cleaned;

    const value = cleaned;
    if (!value) return setError(phone, phoneError, '');

    const prefixOk = value.startsWith('+62') || value.startsWith('62') || value.startsWith('08');
    if (!prefixOk) return setError(phone, phoneError, 'Nomor harus diawali 08 atau +62.');
    if (value.replace(/\D/g, '').length < 10) return setError(phone, phoneError, 'Nomor terlalu pendek, minimal 10 digit.');
    setError(phone, phoneError, '');
  });

  // Nama berkas tampil di baris yang sama dengan tombol pilih
  const cvFileName = document.getElementById('cv-file-name');
  const fotoFileName = document.getElementById('foto-file-name');

  // Berkas CV
  cvFile.addEventListener('change', () => {
    const file = cvFile.files[0];
    if (!file) {
      cvFileName.textContent = 'Belum ada berkas';
      return setError(cvFile, cvError, '');
    }
    if (file.type !== 'application/pdf') {
      cvFile.value = '';
      cvFileName.textContent = 'Belum ada berkas';
      return setError(cvFile, cvError, 'Berkas CV harus PDF.');
    }
    if (file.size > 5 * 1024 * 1024) {
      cvFile.value = '';
      cvFileName.textContent = 'Belum ada berkas';
      return setError(cvFile, cvError, 'Ukuran CV melebihi 5 MB.');
    }
    cvFileName.textContent = file.name;
    setError(cvFile, cvError, '');
  });

  // Berkas foto
  fotoFile.addEventListener('change', () => {
    const file = fotoFile.files[0];
    if (!file) {
      fotoFileName.textContent = 'Belum ada berkas';
      return setError(fotoFile, fotoError, '');
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      fotoFile.value = '';
      fotoFileName.textContent = 'Belum ada berkas';
      return setError(fotoFile, fotoError, 'Foto harus JPG atau PNG.');
    }
    if (file.size > 2 * 1024 * 1024) {
      fotoFile.value = '';
      fotoFileName.textContent = 'Belum ada berkas';
      return setError(fotoFile, fotoError, 'Ukuran foto melebihi 2 MB.');
    }
    fotoFileName.textContent = file.name;
    setError(fotoFile, fotoError, '');
  });

  // Validasi saat submit
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const problems = [];

    if (!nama.value.trim()) {
      nama.setAttribute('aria-invalid', 'true');
      problems.push(nama);
    } else {
      nama.removeAttribute('aria-invalid');
    }

    if (!nimPattern.test(nim.value.trim())) {
      setError(nim, nimError, 'Format NIM belum sesuai, contoh A11.2021.13456.');
      problems.push(nim);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError(email, emailError, 'Alamat email belum valid.');
      problems.push(email);
    }

    if (!tahun.value) {
      tahun.setAttribute('aria-invalid', 'true');
      problems.push(tahun);
    } else {
      tahun.removeAttribute('aria-invalid');
    }

    if (phone.getAttribute('aria-invalid') === 'true' || !phone.value.trim()) {
      if (!phone.value.trim()) setError(phone, phoneError, 'Nomor WhatsApp wajib diisi.');
      problems.push(phone);
    }

    if (password.value.length < 8) {
      setError(password, passwordError, 'Password minimal 8 karakter.');
      problems.push(password);
    } else if (password.value !== passwordConfirm.value) {
      setError(passwordConfirm, passwordError, 'Konfirmasi password tidak sama.');
      problems.push(passwordConfirm);
    } else {
      setError(password, passwordError, '');
    }

    if (!agreement.checked) {
      problems.push(agreement);
    }

    if (problems.length > 0) {
      problems[0].focus();
      return;
    }

    // Prototipe: tampilkan dialog sukses, tanpa mengirim data
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    submitSpinner.classList.remove('hidden');
    submitText.textContent = 'Menyimpan';

    setTimeout(() => {
      document.getElementById('registered-name').textContent = nama.value.trim();
      document.getElementById('registered-email').textContent = email.value.trim();
      document.getElementById('registered-nim').textContent = nim.value.trim();

      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      submitSpinner.classList.add('hidden');
      submitText.textContent = 'Daftar';

      openModal('registration-success-modal');
    }, 500);
  });
});
