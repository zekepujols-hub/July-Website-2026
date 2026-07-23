const SESSION_KEYS = {
  signupSeen: 'zp.signupPromptSeen',
};

const safeSession = {
  get(key) {
    try { return window.sessionStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch { /* Storage can be unavailable. */ }
  },
};

function initMobileNav() {
  const nav = document.querySelector('.nav-bar');
  const masthead = document.querySelector('.masthead');
  if (!nav || !masthead) return;

  nav.id = 'primary-navigation';
  nav.setAttribute('aria-label', 'Primary');

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach((link) => {
    const target = new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html';
    if (target === currentFile) link.setAttribute('aria-current', 'page');
  });

  const menuButton = document.createElement('button');
  menuButton.className = 'nav-toggle';
  menuButton.type = 'button';
  menuButton.textContent = 'Menu';
  menuButton.setAttribute('aria-controls', nav.id);
  menuButton.setAttribute('aria-expanded', 'false');

  const closeButton = document.createElement('button');
  closeButton.className = 'nav-close';
  closeButton.type = 'button';
  closeButton.textContent = 'Close';

  const backdrop = document.createElement('button');
  backdrop.className = 'nav-backdrop';
  backdrop.type = 'button';
  backdrop.tabIndex = -1;
  backdrop.setAttribute('aria-label', 'Close menu');

  masthead.append(menuButton);
  nav.prepend(closeButton);
  nav.after(backdrop);
  document.documentElement.classList.add('nav-enhanced');

  const mobile = window.matchMedia('(max-width: 768px)');
  let restoreFocus = null;

  const focusable = () => [...nav.querySelectorAll('a[href], button:not([disabled])')]
    .filter((element) => !element.hidden);

  const close = ({ restore = true } = {}) => {
    nav.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    if (mobile.matches) {
      nav.inert = true;
      nav.setAttribute('aria-hidden', 'true');
    } else {
      nav.inert = false;
      nav.removeAttribute('aria-hidden');
    }
    if (restore && restoreFocus && mobile.matches) restoreFocus.focus();
    restoreFocus = null;
  };

  const open = () => {
    if (!mobile.matches) return;
    restoreFocus = document.activeElement;
    nav.inert = false;
    nav.removeAttribute('aria-hidden');
    nav.classList.add('is-open');
    backdrop.classList.add('is-open');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    closeButton.focus();
  };

  const syncBreakpoint = () => {
    if (mobile.matches) close({ restore: false });
    else {
      close({ restore: false });
      nav.inert = false;
      nav.removeAttribute('aria-hidden');
    }
  };

  menuButton.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());
  backdrop.addEventListener('click', () => close());
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => close({ restore: false })));
  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab' || !mobile.matches || !nav.classList.contains('is-open')) return;
    const items = focusable();
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  mobile.addEventListener('change', syncBreakpoint);
  window.addEventListener('pageshow', syncBreakpoint);
  syncBreakpoint();
}

function initHeroMedia() {
  const video = document.querySelector('.cover-left video');
  if (!video) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactViewport = window.matchMedia('(max-width: 768px)');
  let visible = true;

  const playIfAllowed = async () => {
    if (!visible || document.hidden || reducedMotion.matches || compactViewport.matches) return;
    try { await video.play(); } catch { /* The poster remains as a complete fallback. */ }
  };
  const pause = () => video.pause();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else playIfAllowed();
  });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) pause();
    else playIfAllowed();
  });
  compactViewport.addEventListener('change', (event) => {
    if (event.matches) pause();
    else playIfAllowed();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) playIfAllowed();
    else pause();
  }, { threshold: 0.2 }).observe(video);

  pause();
  playIfAllowed();
}

function initVideoFacades() {
  const dialog = document.querySelector('#video-dialog');
  if (!(dialog instanceof HTMLDialogElement)) return;

  const stage = dialog.querySelector('[data-video-dialog-stage]');
  const titleElement = dialog.querySelector('#video-dialog-title');
  const youtubeLink = dialog.querySelector('[data-video-dialog-youtube]');
  const closeButton = dialog.querySelector('[data-video-dialog-close]');
  let restoreFocus = null;

  const close = () => {
    if (dialog.open) dialog.close();
  };

  document.querySelectorAll('[data-video-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const videoId = button.dataset.videoId;
      const title = button.dataset.videoTitle || 'Zeke Pujols video';
      if (!videoId || !stage || !titleElement || !youtubeLink) return;

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      restoreFocus = button;
      titleElement.textContent = button.closest('.video-card')?.querySelector('h2')?.textContent?.trim() || title;
      youtubeLink.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
      stage.replaceChildren(iframe);
      dialog.showModal();
      document.body.classList.add('video-dialog-open');
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => {
    stage?.replaceChildren();
    document.body.classList.remove('video-dialog-open');
    restoreFocus?.focus();
    restoreFocus = null;
  });
}

function initSignupDialog() {
  const dialog = document.querySelector('#signup-dialog');
  if (!(dialog instanceof HTMLDialogElement) || safeSession.get(SESSION_KEYS.signupSeen)) return;

  const closeButton = dialog.querySelector('[data-dialog-close]');
  const desktop = window.matchMedia('(min-width: 1024px)');
  let thresholdReached = false;
  let timer = window.setTimeout(() => {
    thresholdReached = true;
    maybeOpen();
  }, 45_000);

  const maybeOpen = () => {
    if (!thresholdReached || !desktop.matches || document.hidden || dialog.open || document.body.classList.contains('nav-open')) return;
    safeSession.set(SESSION_KEYS.signupSeen, 'true');
    window.clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('input[type="email"]')?.focus();
  };
  const onScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0 && window.scrollY / maxScroll >= 0.5) {
      thresholdReached = true;
      maybeOpen();
    }
  };
  const close = () => dialog.close();

  window.addEventListener('scroll', onScroll, { passive: true });
  desktop.addEventListener('change', maybeOpen);
  document.addEventListener('visibilitychange', maybeOpen);
  closeButton?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
}

function initReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;
  document.documentElement.classList.add('reveal-enhanced');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  elements.forEach((element) => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroMedia();
  initVideoFacades();
  initSignupDialog();
  initReveals();
});
