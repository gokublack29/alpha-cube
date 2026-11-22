// Alpha cube Interactive Logic

(function () {
  'use strict';

  // --- Theme Management ---
  const themeToggle = document.getElementById('theme-toggle');
  const saulImage = document.getElementById('saul-image');
  const teamImage = document.getElementById('team-image');

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
    if (teamImage) {
      teamImage.src = theme === 'light' ? 'assets/team-light.png' : 'assets/team-dark.png';
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
  const cards = document.querySelectorAll('.testimonial-card');
  let activeIndex = 0;

  function updateTestimonialView() {
    // On small screens, toggle active card
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

  if (prevBtn && nextBtn && cards.length > 1) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      updateTestimonialView();
      cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateTestimonialView();
      cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    window.addEventListener('resize', updateTestimonialView);
    updateTestimonialView();
  }

  // --- Contact Dialog ---
  const contactDialog = document.getElementById('contact-dialog');
  const closeModalBtn = document.getElementById('close-modal');
  const heroCta = document.getElementById('hero-cta');

  if (contactDialog && heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      contactDialog.showModal();
    });
  }

  if (closeModalBtn && contactDialog) {
    closeModalBtn.addEventListener('click', () => {
      contactDialog.close();
    });

    // Close when clicking dialog backdrop
    contactDialog.addEventListener('click', (e) => {
      const rect = contactDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        contactDialog.close();
      }
    });
  }
})();
