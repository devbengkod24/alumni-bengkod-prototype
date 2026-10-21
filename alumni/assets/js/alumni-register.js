/**
 * Script Khusus Registrasi Alumni Bengkel Koding
 * Menangani validasi form, show/hide password, upload preview, loading state, dan modal sukses
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi ikon Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const registerForm = document.getElementById('alumni-register-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitSpinner = document.getElementById('submit-spinner');
  const submitText = document.getElementById('submit-text');

  // Input elements
  const namaInput = document.getElementById('nama_lengkap');
  const emailInput = document.getElementById('email');
  const nimInput = document.getElementById('nim');
  const phoneInput = document.getElementById('phone');
  const tahunLulusSelect = document.getElementById('tahun_lulus');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('password_confirmation');
  const agreementCheckbox = document.getElementById('agreement_tracer');

  // Error elements
  const phoneError = document.getElementById('phone-error');
  const passwordError = document.getElementById('password-error');
  const emailError = document.getElementById('email-error');
  const nimError = document.getElementById('nim-error');

  // Photo & CV upload elements
  const fotoInput = document.getElementById('foto_profil');
  const fotoPreview = document.getElementById('foto-preview');
  const fotoPlaceholder = document.getElementById('foto-placeholder');
  const cvInput = document.getElementById('cv_file');
  const cvFileName = document.getElementById('cv-file-name');
  const cvError = document.getElementById('cv-error');

  // 2. Toggle Visibility Password
  window.togglePasswordVisibility = function(inputId, iconId) {
    const input = document.getElementById(inputId);
    const iconContainer = document.getElementById(iconId);
    if (!input || !iconContainer) return;

    if (input.type === 'password') {
      input.type = 'text';
      iconContainer.innerHTML = '<i data-lucide="eye-off" class="w-4 h-4 text-neutral2"></i>';
    } else {
      input.type = 'password';
      iconContainer.innerHTML = '<i data-lucide="eye" class="w-4 h-4 text-neutral2"></i>';
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // 3. Validasi Realtime Nomor Telepon (Hanya Angka, Format Indonesia +62 atau 08)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value;

      // Filter karakter: hanya izinkan digit dan tanda plus di awal
      if (!/^[0-9+]*$/.test(val)) {
        val = val.replace(/[^0-9+]/g, '');
        e.target.value = val;
      }

      // Validasi awalan nomor telepon Indonesia
      if (val.length >= 3) {
        const isValidPrefix = val.startsWith('+62') || val.startsWith('62') || val.startsWith('08');
        if (!isValidPrefix) {
          phoneError.textContent = 'Nomor telepon harus berformat Indonesia (+62 atau diawali 08).';
          phoneError.classList.remove('hidden');
          phoneInput.classList.add('border-red1', 'focus:ring-red3');
        } else if (val.length < 10) {
          phoneError.textContent = 'Nomor telepon terlalu pendek (minimal 10 digit).';
          phoneError.classList.remove('hidden');
          phoneInput.classList.add('border-red1', 'focus:ring-red3');
        } else {
          phoneError.classList.add('hidden');
          phoneInput.classList.remove('border-red1', 'focus:ring-red3');
        }
      } else if (val.length === 0) {
        phoneError.classList.add('hidden');
        phoneInput.classList.remove('border-red1', 'focus:ring-red3');
      }
    });
  }

  // 4. Validasi NIM Realtime
  if (nimInput) {
    nimInput.addEventListener('blur', () => {
      const val = nimInput.value.trim();
      if (val.length > 0 && val.length < 8) {
        nimError.textContent = 'Format NIM tidak valid (contoh: A11.2021.13456).';
        nimError.classList.remove('hidden');
        nimInput.classList.add('border-red1');
      } else {
        nimError.classList.add('hidden');
        nimInput.classList.remove('border-red1');
      }
    });
  }

  // 5. Validasi Email Realtime
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const val = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val.length > 0 && !emailRegex.test(val)) {
        emailError.textContent = 'Format alamat email tidak valid.';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red1');
      } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red1');
      }
    });
  }

  // 6. Preview Foto Profil
  if (fotoInput && fotoPreview && fotoPlaceholder) {
    fotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert('Ukuran foto profil maksimal 2MB.');
          fotoInput.value = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          fotoPreview.src = event.target.result;
          fotoPreview.classList.remove('hidden');
          fotoPlaceholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 7. Preview & Validasi File CV PDF
  if (cvInput && cvFileName) {
    cvInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.type !== 'application/pdf') {
          cvError.textContent = 'Berkas CV harus dalam format PDF.';
          cvError.classList.remove('hidden');
          cvInput.value = '';
          cvFileName.textContent = 'Belum ada berkas dipilih';
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          cvError.textContent = 'Ukuran berkas CV maksimal 5MB.';
          cvError.classList.remove('hidden');
          cvInput.value = '';
          cvFileName.textContent = 'Belum ada berkas dipilih';
          return;
        }
        cvError.classList.add('hidden');
        cvFileName.textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
      }
    });
  }

  // 8. Submit Handler Khusus Prototype (Arahkan Button Registrasi ke Halaman Login)
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Aktifkan Loading State pada Tombol Submit
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      submitSpinner.classList.remove('hidden');
      submitText.textContent = 'Mendaftar & Mengarahkan ke Login...';

      // Langsung arahkan ke halaman login
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 400);
    });
  }
});
