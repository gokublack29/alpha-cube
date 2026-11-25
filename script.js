// Alpha cube Client Interactions

(function () {
  'use strict';

  const STUDIO_EMAIL = 'convinceyoucoo16@gmail.com';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Theme Controller ---
  const themeToggle = document.getElementById('theme-toggle');

  function getActiveTheme() {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  function applyTheme(theme, persist = false) {
    const resolved = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', resolved);

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.content = resolved;
    }

    if (persist) {
      try {
        localStorage.setItem('theme', resolved);
      } catch (e) {}
    }

    if (themeToggle) {
      const isLight = resolved === 'light';
      themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
  }

  applyTheme(getActiveTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light', true);
    });
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && e.newValue) {
      applyTheme(e.newValue, false);
    }
  });

  // --- Header Scroll Hairline & Mobile Navigation Sheet ---
  const siteHeader = document.querySelector('.site-header');
  const drawer = document.getElementById('mobile-nav-drawer');

  function syncHeaderBorder() {
    if (!siteHeader) return;
    const scrolled = window.scrollY > 8;
    const drawerOpen = drawer ? !drawer.hidden : false;
    siteHeader.classList.toggle('is-scrolled', scrolled || drawerOpen);
  }

  if (siteHeader) {
    syncHeaderBorder();
    window.addEventListener('scroll', syncHeaderBorder, { passive: true });
  }

  (function initMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (!menuBtn || !drawer) return;

    const drawerTargets = drawer.querySelectorAll('a, button');

    function setOpen(open) {
      drawer.hidden = !open;
      menuBtn.classList.toggle('active', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      syncHeaderBorder();
    }

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(drawer.hidden);
    });

    drawerTargets.forEach((el) => {
      el.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!drawer.hidden && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) {
        setOpen(false);
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && !drawer.hidden) {
        setOpen(false);
      }
    });
  })();

  // --- Client Stories Mobile/Tablet Carousel ---
  (function initStoriesCarousel() {
    const storyPanels = document.querySelectorAll('.story-panel');
    const prevBtn = document.getElementById('prev-story');
    const nextBtn = document.getElementById('next-story');
    const counter = document.getElementById('story-counter');
    if (!storyPanels.length || !prevBtn || !nextBtn) return;

    let currentIdx = 0;

    function syncStories() {
      const isCompact = window.innerWidth <= 1024;
      storyPanels.forEach((panel, i) => {
        panel.classList.toggle('active', !isCompact || i === currentIdx);
      });
      if (counter) {
        counter.textContent = `${currentIdx + 1} / ${storyPanels.length}`;
      }
    }

    function stepStory(delta) {
      currentIdx = (currentIdx + delta + storyPanels.length) % storyPanels.length;
      syncStories();
    }

    syncStories();

    prevBtn.addEventListener('click', () => stepStory(-1));
    nextBtn.addEventListener('click', () => stepStory(1));

    document.addEventListener('keydown', (e) => {
      if (document.activeElement === prevBtn || document.activeElement === nextBtn) {
        if (e.key === 'ArrowLeft') stepStory(-1);
        if (e.key === 'ArrowRight') stepStory(1);
      }
    });

    window.addEventListener('resize', syncStories);
  })();

  // --- Copy Email Action in Closing Banner ---
  (function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const copyLabel = document.getElementById('copy-email-label');
    if (!copyBtn || !copyLabel) return;

    let resetTimer = null;
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(STUDIO_EMAIL);
        copyLabel.textContent = 'Copied Email';
      } catch (e) {
        copyLabel.textContent = STUDIO_EMAIL;
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyLabel.textContent = 'Copy Email';
      }, 2200);
    });
  })();

  // --- Contact Dialog, Validation & Mailto Handoff ---
  (function initContactModal() {
    const modal = document.getElementById('contact-dialog');
    const triggerBtns = document.querySelectorAll('.trigger-modal');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('contact-form');
    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    const briefPreview = document.getElementById('brief-preview');
    const mailtoLink = document.getElementById('mailto-handoff-link');
    const copyBriefBtn = document.getElementById('copy-brief-btn');
    const editBriefBtn = document.getElementById('edit-brief-btn');
    if (!modal || !form || !formView || !successView) return;

    const fields = [
      {
        el: document.getElementById('contact-name'),
        errEl: document.getElementById('contact-name-error'),
        validate: (v) => (v.trim().length >= 2 ? '' : 'Enter your name so we know who to address.'),
      },
      {
        el: document.getElementById('contact-email'),
        errEl: document.getElementById('contact-email-error'),
        validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address with an @ symbol.'),
      },
      {
        el: document.getElementById('contact-service'),
        errEl: document.getElementById('contact-service-error'),
        validate: (v) => (v.trim() ? '' : 'Select the engineering area you need help with.'),
      },
      {
        el: document.getElementById('contact-message'),
        errEl: document.getElementById('contact-message-error'),
        validate: (v) => (v.trim().length >= 10 ? '' : 'Add at least a brief sentence describing your project or incident.'),
      },
    ];

    const touched = new WeakSet();
    let lastBriefText = '';

    function showFieldError(field, msg) {
      if (!field.el || !field.errEl) return;
      if (msg) {
        field.el.setAttribute('aria-invalid', 'true');
        field.errEl.textContent = msg;
        field.errEl.hidden = false;
      } else {
        field.el.removeAttribute('aria-invalid');
        field.errEl.textContent = '';
        field.errEl.hidden = true;
      }
    }

    function validateField(field) {
      if (!field.el) return true;
      const msg = field.validate(field.el.value || '');
      showFieldError(field, msg);
      return !msg;
    }

    fields.forEach((field) => {
      if (!field.el) return;
      field.el.addEventListener('blur', () => {
        if (field.el.value.trim() !== '' || touched.has(field.el)) {
          touched.add(field.el);
          validateField(field);
        }
      });
      const clearEvt = field.el.tagName === 'SELECT' ? 'change' : 'input';
      field.el.addEventListener(clearEvt, () => {
        touched.add(field.el);
        if (field.el.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    function openModal() {
      formView.hidden = false;
      successView.hidden = true;
      modal.showModal();
      const nameInput = document.getElementById('contact-name');
      if (nameInput) nameInput.focus();
    }

    triggerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.close());
    }

    // Light-dismiss fallback for browsers without <dialog closedby="any">
    // Require pointerdown AND pointerup outside dialog rect so dragging text selection never closes it.
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e) => {
        const rect = modal.getBoundingClientRect();
        return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      };
      let pressedOutside = false;
      modal.addEventListener('pointerdown', (e) => {
        pressedOutside = outside(e);
      });
      modal.addEventListener('pointerup', (e) => {
        if (pressedOutside && outside(e)) modal.close();
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;

      fields.forEach((field) => {
        touched.add(field.el);
        const valid = validateField(field);
        if (!valid && !firstInvalid) {
          firstInvalid = field.el;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const name = fields[0].el.value.trim();
      const email = fields[1].el.value.trim();
      const service = fields[2].el.value.trim();
      const details = fields[3].el.value.trim();

      lastBriefText = [
        `Name: ${name}`,
        `Reply Email: ${email}`,
        `Focus: ${service}`,
        '',
        'Details:',
        details,
      ].join('\n');

      if (briefPreview) {
        briefPreview.textContent = lastBriefText;
      }

      if (mailtoLink) {
        const subject = encodeURIComponent(`Project Inquiry: ${service} (${name})`);
        const body = encodeURIComponent(lastBriefText);
        mailtoLink.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
      }

      formView.hidden = true;
      successView.hidden = false;
      if (mailtoLink) mailtoLink.focus();
    });

    if (editBriefBtn) {
      editBriefBtn.addEventListener('click', () => {
        successView.hidden = true;
        formView.hidden = false;
        if (fields[0].el) fields[0].el.focus();
      });
    }

    if (copyBriefBtn) {
      let copyTimer = null;
      copyBriefBtn.addEventListener('click', async () => {
        if (!lastBriefText) return;
        try {
          await navigator.clipboard.writeText(lastBriefText);
          copyBriefBtn.textContent = 'Copied Project Brief';
        } catch (e) {
          copyBriefBtn.textContent = 'Select and copy text above';
        }
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
          copyBriefBtn.textContent = 'Copy Project Brief';
        }, 2200);
      });
    }
  })();

  // --- Interactive ASCII Portrait (Uses transparent cutout for both themes) ---
  (function initInteractiveAscii() {
    const canvas = document.getElementById('hero-ascii-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const CHARS = ' .·:;+=xX#$@';
    const GLITCH_CHARS = '01<>/[]{}+*#%@$&!?~';
    const COLS = 72;
    let ROWS = 0;
    let grid = [];
    let ripples = [];
    let isHovered = false;
    let mouse = { x: -9999, y: -9999 };
    let animId = null;
    let offscreenData = null;

    function buildAsciiGrid() {
      if (!img.naturalWidth || !img.naturalHeight) return;

      // Center crop to the transparent alpha cutout in assets/saul-dark.png (1510x981)
      const sx = 95;
      const sy = 0;
      const sw = Math.min(1040, img.naturalWidth - sx);
      const sh = Math.min(900, img.naturalHeight - sy);

      const charAspect = 0.55;
      ROWS = Math.round(COLS * (sh / sw) * charAspect);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = COLS;
      offCanvas.height = ROWS;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, COLS, ROWS);
      offscreenData = offCtx.getImageData(0, 0, COLS, ROWS).data;

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

      const getLum = (gx, gy) => {
        const cx = Math.max(0, Math.min(COLS - 1, gx));
        const cy = Math.max(0, Math.min(ROWS - 1, gy));
        const idx = (cy * COLS + cx) * 4;
        const a = offscreenData[idx + 3] / 255;
        if (a <= 0.08) return 0;
        return (0.299 * offscreenData[idx] + 0.587 * offscreenData[idx + 1] + 0.114 * offscreenData[idx + 2]) / 255;
      };

      grid = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const idx = (y * COLS + x) * 4;
          const a = offscreenData[idx + 3] / 255;
          const rawLum = getLum(x, y);
          const lum = Math.max(0, Math.min(1, Math.pow(rawLum, 1.2) * 1.25 - 0.04));
          // Lift midtones on light canvas so facial contours render in solid ink without hollowing out cheeks
          const lightLum = a > 0.08 ? Math.max(0.18, Math.min(1, Math.pow(rawLum, 0.72) * 1.05)) : 0;

          const darkChar = CHARS[Math.floor(lum * (CHARS.length - 1))];
          const lightChar = CHARS[Math.floor(lightLum * (CHARS.length - 1))];
          const originX = (x + 0.5) * cellW;
          const originY = (y + 0.5) * cellH;

          grid.push({
            x: originX,
            y: originY,
            originX,
            originY,
            vx: 0,
            vy: 0,
            darkChar,
            lightChar,
            glitchChar: null,
            lum,
            lightLum,
            alpha: a,
          });
        }
      }

      render();
    }

    function addRipple(x, y) {
      if (prefersReducedMotion) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ripples.push({
        x: x * dpr,
        y: y * dpr,
        radius: 0,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.95,
        speed: 15 * dpr,
        life: 1.0,
      });
      wake();
    }

    function updatePhysics() {
      if (prefersReducedMotion) return false;
      let isMoving = false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scaledMouseX = mouse.x * dpr;
      const scaledMouseY = mouse.y * dpr;
      const cursorRadius = 110 * dpr;

      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.life = Math.max(0, 1.0 - rip.radius / rip.maxRadius);
        if (rip.life <= 0.02 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
        } else {
          isMoving = true;
        }
      }

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        if (cell.alpha < 0.08) continue;

        if (isHovered) {
          const dx = cell.x - scaledMouseX;
          const dy = cell.y - scaledMouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < cursorRadius && dist > 0) {
            const force = (1 - dist / cursorRadius) * 14 * dpr;
            cell.vx += (dx / dist) * force * 0.36;
            cell.vy += (dy / dist) * force * 0.36;
            if (dist < cursorRadius * 0.65 && Math.random() < 0.28) {
              cell.glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
            isMoving = true;
          }
        }

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
            cell.glitchChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            isMoving = true;
          }
        }

        cell.vx += (cell.originX - cell.x) * 0.16;
        cell.vy += (cell.originY - cell.y) * 0.16;
        cell.vx *= 0.7;
        cell.vy *= 0.7;
        cell.x += cell.vx;
        cell.y += cell.vy;

        if (Math.abs(cell.vx) > 0.05 || Math.abs(cell.vy) > 0.05) {
          isMoving = true;
        } else {
          cell.glitchChar = null;
        }
      }

      return isMoving;
    }

    function render() {
      if (!ROWS || !grid.length) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellH = canvas.height / ROWS;
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      ctx.font = `${isLight ? 800 : 700} ${Math.round(cellH * (isLight ? 1.02 : 0.96))}px ui-monospace, "Cascadia Mono", Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const scaledMouseX = mouse.x * dpr;
      const scaledMouseY = mouse.y * dpr;
      const cursorRadius = 110 * dpr;

      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        const drawChar = cell.glitchChar || (isLight ? cell.lightChar : cell.darkChar);
        if (cell.alpha < 0.08 || drawChar === ' ') continue;

        let isActive = false;
        if (!prefersReducedMotion && isHovered) {
          if (Math.hypot(cell.x - scaledMouseX, cell.y - scaledMouseY) < cursorRadius) {
            isActive = true;
          }
        }

        if (!isActive && !prefersReducedMotion) {
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            if (Math.abs(Math.hypot(cell.x - rip.x, cell.y - rip.y) - rip.radius) < 32 * dpr) {
              isActive = true;
              break;
            }
          }
        }

        if (isActive) {
          ctx.fillStyle = isLight ? '#B01E6E' : '#FD91CC';
        } else if (isLight) {
          if (cell.lightLum > 0.52) {
            ctx.fillStyle = '#051029';
          } else if (cell.lightLum > 0.30) {
            ctx.fillStyle = '#09318D';
          } else {
            ctx.fillStyle = '#1E40AF';
          }
        } else {
          if (cell.lum > 0.62) {
            ctx.fillStyle = '#F8FAFC';
          } else if (cell.lum > 0.28) {
            ctx.fillStyle = `rgba(203, 216, 246, ${Math.max(0.45, cell.lum * 1.1)})`;
          } else {
            ctx.fillStyle = `rgba(148, 168, 212, ${Math.max(0.24, cell.lum * 0.95)})`;
          }
        }

        ctx.fillText(drawChar, cell.x, cell.y);
      }

      const keepLooping = updatePhysics();
      if (keepLooping || (isHovered && !prefersReducedMotion) || ripples.length > 0) {
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
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    });

    window.addEventListener('resize', resizeCanvas);

    img.addEventListener('load', buildAsciiGrid);
    img.src = 'assets/saul-dark.png';

    const observer = new MutationObserver(() => render());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  })();

  // --- Interactive Incident Bus Console ---
  (function initTelemetryConsole() {
    const telemetryBox = document.getElementById('bento-ascii-telemetry');
    const telemetryStream = document.getElementById('telemetry-stream');
    const pingVal = document.getElementById('telemetry-ping-val');
    if (!telemetryBox || !telemetryStream) return;

    const GLYPHS = '01#%*+=-:|/';
    let resetTimer = null;

    function renderTelemetry(burst = false) {
      const ping = burst ? Math.floor(Math.random() * 7 + 5) : 12;
      if (pingVal) pingVal.textContent = `${ping}ms`;

      if (burst) {
        const r = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        telemetryStream.textContent =
          `CORE_01  [${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}${r()}..] 91%  ${ping}ms\n` +
          `NET_BUS  ${r()}${r()} 99.99%  PONG ${ping}ms  TLS\n` +
          `ONCALL   <SENIOR_ENGINEER_READY>`;
        return;
      }

      telemetryStream.textContent =
        `CORE_01  [||||||||||..] 78%  12ms\n` +
        `NET_BUS  OK 99.99%  PONG 4ms  TLS\n` +
        `ONCALL   <SENIOR_DEV_ONCALL: TRUE>`;
    }

    function triggerBurst() {
      renderTelemetry(true);
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => renderTelemetry(false), 450);
    }

    renderTelemetry(false);
    telemetryBox.addEventListener('mouseenter', triggerBurst);
    telemetryBox.addEventListener('click', triggerBurst);
    telemetryBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerBurst();
      }
    });
  })();
})();
