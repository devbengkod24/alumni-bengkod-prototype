/**
 * Skeleton saat halaman dimuat, dipakai semua role. Dimuat di <head> sebelum JS role.
 * Selama class html.page-loading aktif: konten asli disembunyikan, semua transisi/animasi
 * dimatikan (sidebar & konten tidak bergeser saat pindah halaman), dan skeleton ditampilkan.
 * Class dilepas setelah window "load" (Tailwind CDN, Alpine, Lucide dan data sudah terpasang).
 */
(function () {
  const html = document.documentElement;
  html.classList.add('page-loading');

  document.head.insertAdjacentHTML('beforeend', `<style>
    html.page-loading *, html.page-loading *::before, html.page-loading *::after { transition: none !important; animation: none !important; }
    html.page-loading body > :not(#page-skeleton) { visibility: hidden !important; }
    #page-skeleton { position: fixed; inset: 0; z-index: 9999; display: flex; background: #fff; }
    #page-skeleton .sk { background: #EEF0F3; border-radius: 8px; animation: sk-pulse 1.4s ease-in-out infinite !important; }
    #page-skeleton .sk-side { width: 256px; flex-shrink: 0; border-right: 1px solid #DEDFE1; padding: 20px 12px; display: flex; flex-direction: column; gap: 10px; }
    #page-skeleton .sk-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    #page-skeleton .sk-top { height: 64px; border-bottom: 1px solid #DEDFE1; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
    #page-skeleton .sk-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
    #page-skeleton .sk-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    @media (max-width: 1023px) { #page-skeleton .sk-side { display: none; } #page-skeleton .sk-body { padding: 16px; } }
    @keyframes sk-pulse { 50% { opacity: .5; } }
  </style>`);

  const bar = (w, h) => `<div class="sk" style="width:${w};height:${h}px"></div>`;

  document.addEventListener('DOMContentLoaded', () => {
    // Halaman tanpa layout dashboard (login/register) cukup disembunyikan sampai siap
    if (!document.querySelector('main[data-route], main[data-title]')) return;
    // Alumni menyimpan status sidebar desktop di localStorage
    const sideClosed = location.pathname.includes('/alumni/') && localStorage.getItem('sidebar_open') === 'false';
    document.body.insertAdjacentHTML('afterbegin', `
      <div id="page-skeleton" aria-busy="true" aria-label="Memuat halaman">
        ${sideClosed ? '' : `<div class="sk-side">${bar('70%', 36)}<div style="height:12px"></div>${Array(7).fill(bar('100%', 36)).join('')}</div>`}
        <div class="sk-main">
          <div class="sk-top">${bar('220px', 16)}<div class="sk" style="width:32px;height:32px;border-radius:50%"></div></div>
          <div class="sk-body">
            ${bar('240px', 28)}${bar('360px', 14)}
            <div class="sk-row">${Array(3).fill(bar('100%', 96)).join('')}</div>
            ${bar('100%', 220)}
            ${bar('100%', 140)}
          </div>
        </div>
      </div>`);
  });

  window.addEventListener('load', () => {
    // Tunggu satu frame agar gaya akhir sudah diterapkan tanpa transisi
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById('page-skeleton')?.remove();
      html.classList.remove('page-loading');
    }));
  });
})();
