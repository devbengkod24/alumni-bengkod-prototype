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
  const agreementError = document.getElementById('agreement-error');

  const nimError = document.getElementById('nim-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const passwordError = document.getElementById('password-error');

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

  if (agreement && agreementError) {
    agreement.addEventListener('change', () => {
      if (agreement.checked) {
        agreementError.textContent = '';
        agreementError.classList.add('hidden');
      }
    });
  }

  // Flatpickr Year Picker
  if (typeof flatpickr !== 'undefined' && tahun) {
    function renderYearPicker(instance) {
      const cal = instance.calendarContainer;
      if (!cal) return;
      cal.innerHTML = '';
      cal.className = 'flatpickr-calendar animate open p-3 !w-64 bg-white shadow-xl rounded-xl border border-neutral4';

      const head = document.createElement('div');
      head.className = 'flex items-center justify-between pb-2 mb-2 border-b border-neutral4';
      head.innerHTML = '<span class="text-xs font-semibold text-neutral1">Pilih Tahun Lulus</span>';
      cal.appendChild(head);

      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-3 gap-1.5';

      const currentYearVal = tahun.value;
      const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
      years.forEach((yr) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = yr;
        const isSelected = String(yr) === currentYearVal;
        btn.className = isSelected
          ? 'py-2 text-xs font-semibold rounded-lg bg-primary1 text-white border border-primary1 shadow-sm'
          : 'py-2 text-xs font-medium rounded-lg text-neutral1 hover:bg-primary5 hover:text-primary1 border border-neutral4 transition-colors focus:outline-none focus:ring-2 focus:ring-primary1';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          tahun.value = String(yr);
          tahun.removeAttribute('aria-invalid');
          instance.close();
        });
        grid.appendChild(btn);
      });
      cal.appendChild(grid);
    }

    flatpickr(tahun, {
      dateFormat: 'Y',
      disableMobile: true,
      onReady: function (selectedDates, dateStr, instance) {
        renderYearPicker(instance);
      },
      onOpen: function (selectedDates, dateStr, instance) {
        renderYearPicker(instance);
      },
    });
  }

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
      if (agreementError) {
        agreementError.textContent = 'Centang persetujuan ini untuk melanjutkan pendaftaran.';
        agreementError.classList.remove('hidden');
      }
      problems.push(agreement);
    } else if (agreementError) {
      agreementError.textContent = '';
      agreementError.classList.add('hidden');
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
