// Alpha cube Client Interactions

(function () {
  'use strict';

  // --- Theme Controller ---
  const themeToggle = document.getElementById('theme-toggle');

  function getActiveTheme() {
    return localStorage.getItem('theme') || 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.content = theme;
    }
    localStorage.setItem('theme', theme);

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }

    // Swap theme-dependent images
    const saulImg = document.getElementById('hero-saul-img');
    if (saulImg) {
      saulImg.src = theme === 'light' ? 'assets/saul-light.png' : 'assets/saul-dark.png';
    }
    const teamPhoto = document.querySelector('.founders-photo');
    if (teamPhoto) {
      teamPhoto.src = theme === 'light' ? 'assets/team-light.png' : 'assets/team-dark.png';
    }
  }

  // Initialize saved theme
  setTheme(getActiveTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // --- Client Stories Carousel ---
  const storyPanels = document.querySelectorAll('.story-panel');
  const prevBtn = document.getElementById('prev-story');
  const nextBtn = document.getElementById('next-story');
  let currentStoryIdx = 0;

  function showStory(idx) {
    if (!storyPanels.length) return;
    currentStoryIdx = (idx + storyPanels.length) % storyPanels.length;

    if (window.innerWidth <= 1024) {
      storyPanels.forEach((panel, i) => {
        panel.classList.toggle('active', i === currentStoryIdx);
      });
    }
  }

  if (prevBtn && nextBtn && storyPanels.length > 1) {
    prevBtn.addEventListener('click', () => showStory(currentStoryIdx - 1));
    nextBtn.addEventListener('click', () => showStory(currentStoryIdx + 1));

    document.addEventListener('keydown', (e) => {
      if (document.activeElement === prevBtn || document.activeElement === nextBtn) {
        if (e.key === 'ArrowLeft') showStory(currentStoryIdx - 1);
        if (e.key === 'ArrowRight') showStory(currentStoryIdx + 1);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1024) {
        showStory(currentStoryIdx);
      } else {
        storyPanels.forEach(p => p.classList.remove('active'));
      }
    });
  }

  // --- Modal Controller ---
  const modal = document.getElementById('contact-dialog');
  const triggerBtns = document.querySelectorAll('.trigger-modal');
  const closeBtn = document.getElementById('close-modal');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  let lastActiveElement = null;

  function openModal() {
    if (!modal) return;
    lastActiveElement = document.activeElement;
    if (formView && successView) {
      formView.style.display = 'block';
      successView.style.display = 'none';
    }
    if (form) form.reset();
    if (submitBtn) submitBtn.classList.remove('loading');
    modal.showModal();
    const nameInput = document.getElementById('contact-name');
    if (nameInput) nameInput.focus();
  }

  function closeModal() {
    if (modal) modal.close();
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inDialog) closeModal();
    });
  }

  if (form && submitBtn && formView && successView) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.classList.add('loading');

      // Feedback response within 300ms
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        formView.style.display = 'none';
        successView.style.display = 'flex';
      }, 260);
    });
  }

  // --- Interactive ASCII Image Controller ---
  (function initInteractiveAscii() {
    const canvas = document.getElementById('hero-ascii-canvas');
    const img = document.getElementById('hero-saul-img');
    const container = document.getElementById('hero-portrait-card');

    if (!canvas || !img || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CHARS = " .·:;+=xX#$@";
    const GLITCH_CHARS = "01<>/[]{}+*#%@$&!?~";
    const COLS = 76;
    let ROWS = 0;
    let grid = [];
    let ripples = [];
    let isHovered = false;
    let mouse = { x: -9999, y: -9999 };
    let animId = null;
    let offscreenData = null;

    function buildAsciiGrid() {
      if (!img.naturalWidth || !img.naturalHeight) return;

      // Crop to the actual visible subject in saul-dark.png (x: 35..1170, y: 0..980)
      const sx = 35;
      const sy = 0;
      const sw = Math.min(1135, img.naturalWidth - sx);
      const sh = Math.min(980, img.naturalHeight - sy);

      // Monospace character optical aspect ratio (width is ~0.55 of height)
      const charAspect = 0.55;
      ROWS = Math.round(COLS * (sh / sw) * charAspect);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = COLS;
      offCanvas.height = ROWS;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, COLS, ROWS);
      const imgData = offCtx.getImageData(0, 0, COLS, ROWS);
      offscreenData = imgData.data;

      resizeCanvas();
    }

    function resizeCanvas() {
      if (!ROWS || !offscreenData) return;

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        requestAnimationFrame(resizeCanvas);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      const cellW = canvas.width / COLS;
      const cellH = canvas.height / ROWS;

      grid = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const idx = (y * COLS + x) * 4;
          const r = offscreenData[idx];
          const g = offscreenData[idx + 1];
          const b = offscreenData[idx + 2];
          const a = offscreenData[idx + 3] / 255;

          const rawLum = a > 0.05 ? (0.299 * r + 0.587 * g + 0.114 * b) / 255 : 0;
          // Non-linear contrast enhancement for sharp facial and silhouette contours
          let lum = Math.pow(rawLum, 1.28) * 1.3 - 0.04;
          lum = Math.max(0, Math.min(1, lum));

          const charIdx = Math.floor(lum * (CHARS.length - 1));
          const originX = (x + 0.5) * cellW;
          const originY = (y + 0.5) * cellH;

          grid.push({
            x: originX,
            y: originY,
            originX,
            originY,
            vx: 0,
            vy: 0,
            baseChar: CHARS[charIdx],
            char: CHARS[charIdx],
            lum,
            alpha: a
          });
        }
      }

      wake();
    }

    function addRipple(x, y) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ripples.push({
        x: x * dpr,
        y: y * dpr,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.95,
        speed: 15 * dpr,
        life: 1.0
      });
      wake();
    }

    function updatePhysics() {
      let isMoving = false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scaledMouseX = mouse.x * dpr;
      const scaledMouseY = mouse.y * dpr;
      const cursorRadius = 115 * dpr;

      // Update ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.life = Math.max(0, 1.0 - (rip.radius / rip.maxRadius));
        if (rip.life <= 0.02 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        } else {
          isMoving = true;
        }
      }

      // Update grid cells
      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        if (cell.alpha < 0.05) continue;

        // Pointer proximity interaction
        if (isHovered) {
          const dx = cell.x - scaledMouseX;
          const dy = cell.y - scaledMouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < cursorRadius && dist > 0) {
            const force = (1 - dist / cursorRadius) * 14 * dpr;
            cell.vx += (dx / dist) * force * 0.38;
            cell.vy += (dy / dist) * force * 0.38;

            if (dist < cursorRadius * 0.65 && Math.random() < 0.3) {
              cell.char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            isMoving = true;
          }
        }

        // Ripple shockwave interaction
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const rdx = cell.x - rip.x;
          const rdy = cell.y - rip.y;
          const rdist = Math.hypot(rdx, rdy);
          const waveDist = Math.abs(rdist - rip.radius);

          if (waveDist < 32 * dpr && rdist > 0) {
            const waveForce = (1 - waveDist / (32 * dpr)) * rip.life * 16 * dpr;
            cell.vx += (rdx / rdist) * waveForce * 0.32;
            cell.vy += (rdy / rdist) * waveForce * 0.32;
            cell.char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            isMoving = true;
          }
        }

        // Damped spring return
        const springK = 0.15;
        const damping = 0.7;
        cell.vx += (cell.originX - cell.x) * springK;
        cell.vy += (cell.originY - cell.y) * springK;
        cell.vx *= damping;
        cell.vy *= damping;

        cell.x += cell.vx;
        cell.y += cell.vy;

        if (Math.abs(cell.vx) > 0.05 || Math.abs(cell.vy) > 0.05) {
          isMoving = true;
        } else {
          cell.char = cell.baseChar;
        }
      }

      return isMoving;
    }

    function render() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellH = canvas.height / ROWS;
      ctx.font = `700 ${Math.round(cellH * 0.96)}px "Inter", "Consolas", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const scaledMouseX = mouse.x * dpr;
      const scaledMouseY = mouse.y * dpr;
      const cursorRadius = 115 * dpr;

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        if (cell.alpha < 0.05 || cell.char === ' ') continue;

        let isCursorActive = false;
        let isRippleActive = false;

        if (isHovered) {
          const dist = Math.hypot(cell.x - scaledMouseX, cell.y - scaledMouseY);
          if (dist < cursorRadius) isCursorActive = true;
        }

        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          if (Math.abs(Math.hypot(cell.x - rip.x, cell.y - rip.y) - rip.radius) < 32 * dpr) {
            isRippleActive = true;
            break;
          }
        }

        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        if (isCursorActive || isRippleActive) {
          ctx.fillStyle = '#FD91CC';
          ctx.shadowColor = 'rgba(253, 145, 204, 0.7)';
          ctx.shadowBlur = 8 * dpr;
        } else if (isLight) {
          // Light theme: dark cobalt highlights, mid-blue midtones, faint shadows
          if (cell.lum > 0.65) {
            ctx.fillStyle = '#051029';
            ctx.shadowColor = 'rgba(5, 16, 41, 0.25)';
            ctx.shadowBlur = 3 * dpr;
          } else if (cell.lum > 0.28) {
            ctx.fillStyle = `rgba(9, 49, 141, ${Math.max(0.4, cell.lum * 1.1)})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = `rgba(36, 65, 133, ${Math.max(0.2, cell.lum * 0.9)})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }
        } else {
          // Dark theme: white highlights, luminous ice midtones, cobalt shadows
          if (cell.lum > 0.65) {
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.35)';
            ctx.shadowBlur = 3 * dpr;
          } else if (cell.lum > 0.28) {
            ctx.fillStyle = `rgba(203, 216, 246, ${Math.max(0.4, cell.lum * 1.1)})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = `rgba(147, 168, 212, ${Math.max(0.2, cell.lum * 0.9)})`;
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
          }
        }

        ctx.fillText(cell.char, cell.x, cell.y);
      }

      ctx.shadowBlur = 0;

      const keepLooping = updatePhysics();
      if (keepLooping || isHovered || ripples.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    }

    function wake() {
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    }

    // Pointer events
    canvas.addEventListener('mouseenter', () => {
      isHovered = true;
      wake();
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      isHovered = true;
      wake();
    });

    canvas.addEventListener('mouseleave', () => {
      isHovered = false;
      mouse.x = -9999;
      mouse.y = -9999;
      wake();
    });

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      addRipple(clickX, clickY);
    });

    window.addEventListener('resize', resizeCanvas);

    // Rebuild grid when image loads (initial + theme swap)
    img.addEventListener('load', buildAsciiGrid);
    if (img.complete) {
      buildAsciiGrid();
    }

    // Re-render on theme change so colors update
    const observer = new MutationObserver(() => {
      // Image src changes are handled in setTheme; just re-render with new palette
      wake();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  })();

  // --- Mobile Floating Liquid Glass Navigation Controller ---
  (function initMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

    if (!menuBtn || !drawer) return;

    function toggleMenu(forceClose) {
      const isOpen = forceClose ? false : !drawer.classList.contains('open');
      drawer.classList.toggle('open', isOpen);
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu(true);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && drawer.classList.contains('open')) {
        toggleMenu(true);
      }
    });
  })();

  // --- Liquid Glass ASCII Telemetry Stream Controller ---
  (function initLiquidGlassTelemetry() {
    const statusAscii = document.getElementById('hero-status-ascii');
    const telemetryBox = document.getElementById('bento-ascii-telemetry');
    const telemetryStream = document.getElementById('telemetry-stream');
    const pingVal = document.getElementById('telemetry-ping-val');

    // 1. Hero Status Pill ASCII Telemetry Ticker
    if (statusAscii) {
      const TICKER_FRAMES = [
        '[99.99%::OK]',
        '[12ms::LIVE]',
        '[NODE::UP]',
        '[SLO::100%]',
        '[SLA::ZERO-FAIL]'
      ];
      let frameIdx = 0;
      setInterval(() => {
        frameIdx = (frameIdx + 1) % TICKER_FRAMES.length;
        statusAscii.textContent = TICKER_FRAMES[frameIdx];
      }, 2600);
    }

    // 2. Bento Card 4 Live Liquid Glass ASCII Telemetry Stream
    if (telemetryStream && telemetryBox) {
      const GLYPHS = '01#%*+=-:·|/';
      let isGlitched = false;

      function generateTelemetry(glitch = false) {
        const ping = glitch ? Math.floor(Math.random() * 8 + 4) : 12;
        if (pingVal) pingVal.textContent = `${ping}ms`;

        if (glitch) {
          const r = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          return (
            `CORE_01  ▲ [${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}░░] 94% · ${ping}ms\n` +
            `NET_BUS  ${r()}${r()} 99.99% · PONG ${ping}ms · SECURE\n` +
            `DISPATCH < SENIOR_ENGINEER_PAGED: ACTIVE >`
          );
        }

        return (
          `CORE_01  ▲ [||||||||||||░░] 78% · 12ms\n` +
          `NET_BUS  OK 99.99% · PONG 4ms · SECURE\n` +
          `DISPATCH < SENIOR_DEV_ONCALL: TRUE >`
        );
      }

      telemetryStream.textContent = generateTelemetry();

      telemetryBox.addEventListener('mousemove', () => {
        if (!isGlitched) {
          isGlitched = true;
          telemetryStream.textContent = generateTelemetry(true);
          setTimeout(() => {
            telemetryStream.textContent = generateTelemetry(false);
            isGlitched = false;
          }, 350);
        }
      });

      telemetryBox.addEventListener('click', () => {
        telemetryStream.textContent = generateTelemetry(true);
        setTimeout(() => {
          telemetryStream.textContent = generateTelemetry(false);
        }, 500);
      });
    }
  })();
})();
