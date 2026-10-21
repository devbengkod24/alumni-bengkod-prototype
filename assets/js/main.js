/**
 * Shared Javascript for Portal Alumni Bengkel Koding Prototype
 * Standar Aksesibilitas Keyboard, Lucide Icons, dan Manajemen Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi ikon Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Global Modal Open / Close dengan Keyboard Support (Escape key)
  let lastFocusedElement = null;

  window.openModal = function(modalId) {
    lastFocusedElement = document.activeElement;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');

      // Fokus ke elemen pertama di dalam modal
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) {
        setTimeout(() => focusable.focus(), 50);
      }
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }
  };

  // Tutup modal ketika menekan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('[data-modal-backdrop]:not(.hidden)');
      openModals.forEach(modal => {
        const id = modal.getAttribute('id');
        if (id) {
          window.closeModal(id);
        }
      });

      // Tutup menu mobile jika sedang terbuka
      const mobileNav = document.getElementById('mobile-nav');
      if (mobileNav && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
      }
    }
  });

  // Tutup modal ketika mengklik backdrop luar
  document.querySelectorAll('[data-modal-backdrop]').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        const id = backdrop.getAttribute('id');
        if (id) {
          window.closeModal(id);
        }
      }
    });
  });

  // 3. Mobile Menu Toggle
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggleBtn && mobileNav) {
    mobileToggleBtn.addEventListener('click', () => {
      const isExpanded = mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      mobileToggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // 4. Toast Notification
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-green1 text-white' : type === 'error' ? 'bg-red1 text-white' : 'bg-primary1 text-white';
    toast.className = `fixed bottom-5 right-5 z-50 ${bgClass} px-5 py-3 rounded-xl elevation4 flex items-center gap-2 text-sm font-medium transition-all duration-300 transform translate-y-10 opacity-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };
});
