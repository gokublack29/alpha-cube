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

  function openModal() {
    if (!modal) return;
    if (formView && successView) {
      formView.style.display = 'block';
      successView.style.display = 'none';
    }
    if (form) form.reset();
    if (submitBtn) submitBtn.classList.remove('loading');
    modal.showModal();
  }

  function closeModal() {
    if (modal) modal.close();
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
})();
