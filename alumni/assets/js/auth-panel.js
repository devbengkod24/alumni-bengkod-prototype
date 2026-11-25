/**
 * Shared feature panel renderer ("Panel fitur Alumni") for login.html and register.html.
 * Dynamically scales the 730x540 collage to fit inside 1 viewport height with zero page scroll,
 * and animates the 3 preview cards with staggered entrance and subtle continuous float.
 */
(function () {
  function injectAnimationStyles() {
    if (document.getElementById('auth-panel-anim')) return;
    const style = document.createElement('style');
    style.id = 'auth-panel-anim';
    style.textContent = `
      @keyframes authCardEnter {
        from { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); }
        to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
      @keyframes authFloatA {
        0%, 100% { transform: rotate(-7deg) translate3d(0, 0, 0); }
        50% { transform: rotate(-5.8deg) translate3d(0, -7px, 0); }
      }
      @keyframes authFloatB {
        0%, 100% { transform: rotate(6deg) translate3d(0, 0, 0); }
        50% { transform: rotate(4.8deg) translate3d(0, -8px, 0); }
      }
      @keyframes authFloatC {
        0%, 100% { transform: rotate(-7deg) translate3d(0, 0, 0); }
        50% { transform: rotate(-8.2deg) translate3d(0, 6px, 0); }
      }
      @keyframes authGlowPulse {
        0%, 100% { opacity: 0.85; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.06); }
      }
      .auth-enter-1 { animation: authCardEnter 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
      .auth-enter-2 { animation: authCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
      .auth-enter-3 { animation: authCardEnter 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
      .auth-float-a { animation: authFloatA 6.2s ease-in-out infinite; will-change: transform; }
      .auth-float-b { animation: authFloatB 7.2s ease-in-out -2.1s infinite; will-change: transform; }
      .auth-float-c { animation: authFloatC 6.6s ease-in-out -3.8s infinite; will-change: transform; }
      .auth-glow-pulse { animation: authGlowPulse 8s ease-in-out infinite; will-change: transform, opacity; }
      .auth-card-lift { transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
      .auth-card-lift:hover { transform: translateY(-4px) scale(1.02); }
      @media (prefers-reduced-motion: reduce) {
        .auth-enter-1, .auth-enter-2, .auth-enter-3,
        .auth-float-a, .auth-float-b, .auth-float-c,
        .auth-glow-pulse { animation: none !important; }
        .auth-float-a, .auth-float-c { transform: rotate(-7deg); }
        .auth-float-b { transform: rotate(6deg); }
        .auth-card-lift:hover { transform: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function fitAuthCollage() {
    const slot = document.getElementById('auth-collage-slot');
    const box = document.getElementById('auth-collage-box');
    const canvas = document.getElementById('auth-collage-canvas');
    if (!slot || !box || !canvas) return;

    const cs = getComputedStyle(slot);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + 16;
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + 8;
    const availW = Math.max(100, slot.clientWidth - padX);
    const availH = Math.max(80, slot.clientHeight - padY);
    const scale = Math.min(availW / 730, availH / 540, 1);

    box.style.width = `${Math.round(730 * scale)}px`;
    box.style.height = `${Math.round(540 * scale)}px`;
    canvas.style.transform = `scale(${scale})`;
  }

  function observeAuthCollage() {
    const slot = document.getElementById('auth-collage-slot');
    if (slot && typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => fitAuthCollage());
      ro.observe(slot);
    }
    if (!window.__authCollageBound) {
      window.addEventListener('resize', fitAuthCollage);
      window.addEventListener('DOMContentLoaded', fitAuthCollage);
      window.addEventListener('load', fitAuthCollage);
      window.__authCollageBound = true;
    }
    requestAnimationFrame(fitAuthCollage);
  }

  function renderAuthFeaturePanel(opts = {}) {
    const {
      containerId = 'auth-feature-panel',
      mobileHeightClass = 'h-[clamp(144px,20dvh,205px)]',
    } = opts;
    const el = document.getElementById(containerId);
    if (!el) return;

    injectAnimationStyles();

    el.innerHTML = `
      <div class="relative ${mobileHeightClass} lg:h-full w-full overflow-hidden flex flex-col justify-between"
           style="background-image: linear-gradient(99.27deg, #14275A 0%, #2A53B9 98.04%);">

        <!-- Radial ambient glow -->
        <div class="pointer-events-none select-none absolute top-[-96px] left-[120px] lg:top-[61px] lg:left-[284px] origin-top-left scale-[0.42] lg:scale-100" aria-hidden="true">
          <img src="assets/img/auth/pusat-cahaya-panel.svg" alt="" width="570" height="570" class="block max-w-none auth-glow-pulse">
        </div>

        <!-- Mobile heading -->
        <div class="relative z-10 px-5 pt-2.5 lg:hidden shrink-0">
          <p class="font-bold text-[17px] sm:text-[20px] leading-[1.25] text-white">
            Ruang berkarya untuk alumni
          </p>
        </div>

        <!-- Desktop heading -->
        <div class="hidden lg:block relative z-10 shrink-0 px-10 xl:px-14 min-[1420px]:px-[67px] pt-[clamp(24px,5.5vh,72px)]">
          <p class="font-semibold text-[13px] leading-[1.45] text-[#D7E5FF]">
            PORTAL ALUMNI
          </p>
          <h2 class="mt-2.5 font-bold text-[36px] xl:text-[44px] min-[1420px]:text-[51px] leading-[1.11] text-white">
            Ruang berkarya<br>untuk alumni.
          </h2>
          <p class="mt-3 min-[1420px]:mt-[17px] font-medium text-[15px] xl:text-[16px] min-[1420px]:text-[17px] leading-[1.45] text-[#DDE9FF]">
            Karya, proyek, dan peluang dari sesama alumni.
          </p>
        </div>

        <!-- 3-Card Feature Collage (730x540 base, animated & fitted inside remaining viewport height) -->
        <div id="auth-collage-slot"
             class="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center lg:items-center min-[1420px]:items-start lg:justify-start lg:pl-6 xl:pl-8 min-[1420px]:pl-[28px] pb-1 lg:pb-4 min-[1420px]:pt-[28px]"
             style="flex: 1 1 0%; min-height: 0;"
             aria-hidden="true">
          <div id="auth-collage-box" class="relative shrink-0">
            <div id="auth-collage-canvas" class="absolute top-0 left-0 w-[730px] h-[540px] origin-top-left">

              <!-- Card 1: Gigs & Proyek -->
              <div class="absolute left-[358px] top-[5px] w-[369.5px] h-[198.85px] flex items-center justify-center auth-enter-1">
                <div class="auth-float-a flex-none">
                  <div class="relative w-[353px] h-[157px] rounded-[22px] bg-white border border-[#D9E3F4] auth-card-lift"
                       style="filter: drop-shadow(0 16px 19.5px rgba(7, 21, 54, 0.27));">
                    <div class="absolute left-[18px] top-[16px] w-[42px] h-[42px] rounded-[12px] bg-[#EDF3FF] flex items-center justify-center">
                      <img src="assets/img/auth/icon-gigs.svg" alt="" width="21" height="21" class="block">
                    </div>
                    <p class="absolute left-[72px] top-[28px] w-[269px] font-bold text-[14px] leading-[1.45] text-[#1E3A8A]">
                      Gigs &amp; Proyek
                    </p>
                    <p class="absolute left-[21px] top-[75px] w-[305px] font-bold text-[18px] leading-[1.45] text-[#0F172A]">
                      Sistem Presensi QR Code
                    </p>
                    <p class="absolute left-[21px] top-[109px] w-[302px] font-medium text-[13px] leading-[1.45] text-[#475569]">
                      Mobile App · Flutter · Laravel
                    </p>
                  </div>
                </div>
              </div>

              <!-- Card 2: Showcase Karya (AntreKlinik preview) -->
              <div class="absolute left-[1.27px] top-[154px] w-[479.26px] h-[339.53px] flex items-center justify-center auth-enter-2">
                <div class="auth-float-b flex-none">
                  <div class="relative w-[451px] h-[294px] rounded-[22px] bg-white border border-[#D9E3F4] auth-card-lift"
                       style="filter: drop-shadow(0 16px 19.5px rgba(7, 21, 54, 0.27));">
                    <div class="absolute left-[18px] top-[16px] w-[42px] h-[42px] rounded-[12px] bg-[#EDF3FF] flex items-center justify-center">
                      <img src="assets/img/auth/icon-showcase.svg" alt="" width="21" height="21" class="block">
                    </div>
                    <p class="absolute left-[72px] top-[28px] w-[367px] font-bold text-[14px] leading-[1.45] text-[#1E3A8A]">
                      Showcase Karya
                    </p>
                    <div class="absolute left-[17px] top-[69px] w-[415px] h-[211px] rounded-[12px] bg-[#DCE8FF] overflow-hidden font-poppins">
                      <div class="absolute left-[287.43px] top-[-76.85px]">
                        <img src="assets/img/auth/antreklinik-shape-1.svg" alt="" width="198.278" height="198.278" class="block max-w-none">
                      </div>
                      <div class="absolute left-[345.83px] top-[134.49px]">
                        <img src="assets/img/auth/antreklinik-shape-2.svg" alt="" width="98.3704" height="98.3704" class="block max-w-none">
                      </div>
                      <p class="absolute left-[19.98px] top-[19.98px] w-[173.69px] font-semibold text-[9.222px] leading-[1.45] text-[#172E71]">
                        Layanan kesehatan
                      </p>
                      <p class="absolute left-[19.98px] top-[39.19px] w-[185.98px] font-bold text-[23.056px] leading-[1.25] text-[#172E71]">
                        AntreKlinik
                      </p>
                      <p class="absolute left-[19.98px] top-[104.52px] w-[157.55px] font-medium text-[10.759px] leading-[1.45] text-[#172E71]">
                        Antrean klinik dari ponsel, tanpa menunggu di ruang tunggu.
                      </p>
                      <div class="absolute left-[233.63px] top-[22.29px] w-[141.41px] h-[190.59px] rounded-[17.68px] bg-[#172E71]"
                           style="filter: drop-shadow(0 10.76px 10.76px rgba(14, 27, 56, 0.22));">
                        <div class="absolute left-[5.38px] top-[5.38px] w-[130.65px] h-[179.83px] rounded-[13.07px] bg-white">
                          <p class="absolute left-[12.3px] top-[15.37px] w-[107.59px] font-bold text-[10.759px] leading-[1.45] text-[#172E71]">
                            AntreKlinik
                          </p>
                          <div class="absolute left-[12.3px] top-[39.19px] w-[106.06px] h-[0.77px] bg-[#DEE7F6]"></div>
                          <p class="absolute left-[12.3px] top-[51.49px] w-[104.52px] font-medium text-[9.222px] leading-[1.45] text-[#475569]">
                            Antrean klinik
                          </p>
                          <div class="absolute left-[12.3px] top-[69.94px] w-[106.06px] h-[46.11px] rounded-[6.92px] bg-[#DCE8FF] text-[#172E71]">
                            <p class="absolute left-[7.69px] top-[6.15px] w-[90.69px] font-medium text-[7.685px] leading-[1.45]">
                              Nomor antrean
                            </p>
                            <p class="absolute left-[7.69px] top-[17.68px] w-[90.69px] font-bold text-[15.37px] leading-[1.45]">
                              A–012
                            </p>
                          </div>
                          <div class="absolute left-[12.3px] top-[132.19px] w-[106.06px] h-[26.13px] rounded-[6.15px] bg-[#1D4ED8] flex items-center justify-center">
                            <span class="font-semibold text-[8.454px] leading-[1.45] text-white">Ambil nomor</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card 3: Lowongan & Referral -->
              <div class="absolute left-[370px] top-[310.81px] w-[354.98px] h-[200px] flex items-center justify-center auth-enter-3">
                <div class="auth-float-c flex-none">
                  <div class="relative w-[338px] h-[160px] rounded-[22px] bg-white border border-[#D9E3F4] auth-card-lift"
                       style="filter: drop-shadow(0 16px 19.5px rgba(7, 21, 54, 0.27));">
                    <div class="absolute left-[18px] top-[16px] w-[42px] h-[42px] rounded-[12px] bg-[#EDF3FF] flex items-center justify-center">
                      <img src="assets/img/auth/icon-referral.svg" alt="" width="21" height="21" class="block">
                    </div>
                    <p class="absolute left-[72px] top-[28px] w-[254px] font-bold text-[14px] leading-[1.45] text-[#1E3A8A]">
                      Lowongan &amp; Referral
                    </p>
                    <p class="absolute left-[20px] top-[75px] w-[300px] font-bold text-[18px] leading-[1.45] text-[#0F172A]">
                      Backend Developer Intern
                    </p>
                    <p class="absolute left-[20px] top-[109px] w-[297px] font-normal text-[13px] leading-[1.45] text-[#475569]">
                      PT Solusi Digital Jateng
                    </p>
                    <div class="absolute left-[20px] top-[131px] h-[21px] px-[8px] rounded-[6px] bg-[#EDF3FF] inline-flex items-center">
                      <span class="font-semibold text-[10px] leading-[1.45] text-[#1E3A8A]">Magang</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    `;

    fitAuthCollage();
    observeAuthCollage();
  }

  window.renderAuthFeaturePanel = renderAuthFeaturePanel;
})();
