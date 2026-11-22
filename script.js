// Alpha cube Interactive Logic

(function () {
  'use strict';

  // --- Theme Management ---
  const themeToggle = document.getElementById('theme-toggle');
  const saulImage = document.getElementById('saul-image');
  const teamStageImage = document.getElementById('team-stage-img');

  function getSavedTheme() {
    return localStorage.getItem('theme') || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.content = theme;
    }
    localStorage.setItem('theme', theme);

    // Swap images based on theme
    if (saulImage) {
      saulImage.src = theme === 'light' ? 'assets/saul-light.png' : 'assets/saul-dark.png';
    }
    if (teamStageImage) {
      const teamSrc = theme === 'light' ? 'assets/team-light.png' : 'assets/team-dark.png';
      teamStageImage.setAttribute('href', teamSrc);
      teamStageImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', teamSrc);
    }

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // Initial theme setup
  applyTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // --- Testimonial Slider / Carousel Navigation ---
  const prevBtn = document.getElementById('prev-testimony');
  const nextBtn = document.getElementById('next-testimony');
  const cards = document.querySelectorAll('.story-card');
  let activeIndex = 0;

  function updateTestimonialView() {
    if (window.innerWidth <= 768 && cards.length > 0) {
      cards.forEach((card, idx) => {
        card.style.display = idx === activeIndex ? 'flex' : 'none';
      });
    } else {
      cards.forEach((card) => {
        card.style.display = 'flex';
      });
    }
  }

  function goToTestimony(index) {
    activeIndex = (index + cards.length) % cards.length;
    updateTestimonialView();
    if (cards[activeIndex]) {
      cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (prevBtn && nextBtn && cards.length > 1) {
    prevBtn.addEventListener('click', () => goToTestimony(activeIndex - 1));
    nextBtn.addEventListener('click', () => goToTestimony(activeIndex + 1));

    // Keyboard navigation when focusing carousel controls
    document.addEventListener('keydown', (e) => {
      if (document.activeElement === prevBtn || document.activeElement === nextBtn) {
        if (e.key === 'ArrowLeft') goToTestimony(activeIndex - 1);
        if (e.key === 'ArrowRight') goToTestimony(activeIndex + 1);
      }
    });

    window.addEventListener('resize', updateTestimonialView);
    updateTestimonialView();
  }

  // --- Contact Dialog & Form Handling ---
  const contactDialog = document.getElementById('contact-dialog');
  const closeModalBtn = document.getElementById('close-modal');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  const heroCta = document.getElementById('hero-cta');
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');

  function openDialog() {
    if (!contactDialog) return;
    if (formView && successView) {
      formView.style.display = 'block';
      successView.style.display = 'none';
    }
    if (contactForm) contactForm.reset();
    if (submitBtn) submitBtn.classList.remove('loading');
    contactDialog.showModal();
  }

  function closeDialog() {
    if (contactDialog) contactDialog.close();
  }

  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog();
    });
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeDialog);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeDialog);

  if (contactDialog) {
    contactDialog.addEventListener('click', (e) => {
      const rect = contactDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDialog();
      }
    });
  }

  if (contactForm && submitBtn && formView && successView) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.classList.add('loading');

      // Feedback animation (<400ms)
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        formView.style.display = 'none';
        successView.style.display = 'block';
      }, 350);
    });
  }
})();
