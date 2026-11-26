/**
 * Shared Auth Layout Component (assets/js/auth-layout.js)
 * Digunakan bersama oleh root /login.html dan /register.html untuk seluruh role.
 * Bergantung pada alumni/assets/js/auth-panel.js untuk panel fitur kanan.
 */
(function () {
  function renderAuthPage({
    brandSubtitle = 'ALUMNI NETWORK',
    title = '',
    subtitle = '',
    formHtml = '',
    afterFormHtml = '',
    mainPaddingClass = 'px-6 py-3 sm:px-12 lg:px-14 min-[1420px]:px-[94px] lg:py-6',
    panelOptions = {},
  }) {
    const root = document.getElementById('auth-root');
    if (!root) return;

    root.innerHTML = `
      <div class="h-full w-full flex flex-col lg:flex-row overflow-hidden bg-white">
        <main class="order-2 lg:order-1 flex-1 min-h-0 w-full lg:w-[45.14%] lg:flex-none bg-white flex flex-col justify-center ${mainPaddingClass} overflow-y-auto lg:overflow-hidden">
          <div class="w-full max-w-[462px] mx-auto">
            <a href="index.html" class="inline-flex items-center gap-[10px] lg:gap-[12px] w-fit rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30">
              <div class="w-[30px] h-[30px] lg:w-[38px] lg:h-[38px] rounded-[9px] lg:rounded-[12px] bg-[#1E3A8A] flex items-center justify-center shrink-0">
                <span class="font-bold text-[12px] lg:text-[15px] leading-none text-white">BK</span>
              </div>
              <div class="flex flex-col gap-[1.5px] lg:gap-[2px] leading-none">
                <span class="font-bold text-[15px] lg:text-[18px] text-[#1E3A8A]">bengkod</span>
                <span class="font-semibold text-[7.5px] lg:text-[9px] text-[#2563EB]">${brandSubtitle}</span>
              </div>
            </a>

            <h1 class="mt-[clamp(10px,2vh,22px)] lg:mt-[clamp(16px,3vh,32px)] font-bold text-[23px] sm:text-[27px] lg:text-[34px] min-[1420px]:text-[38px] leading-[1.11] text-[#0F172A]">
              ${title}
            </h1>
            <p class="mt-1 lg:mt-2 font-normal text-[12.5px] lg:text-[14.5px] leading-[1.4] lg:leading-[1.45] text-[#475569]">
              ${subtitle}
            </p>

            ${formHtml}
            ${afterFormHtml}
          </div>
        </main>

        <aside id="auth-feature-panel" class="order-1 lg:order-2 w-full lg:w-[54.86%] lg:h-full shrink-0"></aside>
      </div>
    `;

    if (typeof window.renderAuthFeaturePanel === 'function') {
      window.renderAuthFeaturePanel({
        base: 'alumni/',
        mobileHeightClass: 'h-[clamp(132px,18dvh,185px)]',
        ...panelOptions,
      });
    }
  }

  function showAuthToast(message, autoHideMs = 2200) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 bg-[#1C6A1A] text-white px-4 py-2.5 rounded-xl shadow-lg text-xs sm:text-sm font-medium';
    toast.setAttribute('role', 'alert');
    toast.textContent = message;
    document.body.appendChild(toast);
    if (autoHideMs > 0) setTimeout(() => toast.remove(), autoHideMs);
  }

  function clearAuthErrors(form, fields) {
    fields.forEach(f => {
      document.getElementById(`error-${f}`)?.classList.add('hidden');
      form.elements[f]?.classList.remove('!border-red-600');
    });
  }

  function showAuthError(form, fields, field, pesan) {
    clearAuthErrors(form, fields);
    const el = document.getElementById(`error-${field}`);
    if (el) {
      el.textContent = pesan;
      el.classList.remove('hidden');
    }
    const input = form.elements[field];
    if (input) {
      input.classList.add('!border-red-600');
      input.focus();
    }
  }

  window.renderAuthPage = renderAuthPage;
  window.showAuthToast = showAuthToast;
  window.clearAuthErrors = clearAuthErrors;
  window.showAuthError = showAuthError;
})();
