const SESSION_KEYS = {
  signupSeen: 'zp.signupPromptSeen.v2',
};

const safeSession = {
  get(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.localStorage.setItem(key, value); } catch { /* Storage can be unavailable. */ }
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

  video.controls = false;
  video.removeAttribute('controls');
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('disablePictureInPicture', '');
  video.setAttribute('disableremoteplayback', '');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;

  const playIfAllowed = async () => {
    if (!visible || document.hidden || reducedMotion.matches) return;
    try {
      video.muted = true;
      video.loop = true;
      await video.play();
    } catch { /* Fallback */ }
  };
  const pause = () => video.pause();

  video.addEventListener('pause', () => {
    if (visible && !document.hidden && !reducedMotion.matches) {
      playIfAllowed();
    }
  });

  const triggerPlay = () => playIfAllowed();
  window.addEventListener('touchstart', triggerPlay, { passive: true, once: true });
  window.addEventListener('click', triggerPlay, { passive: true, once: true });
  window.addEventListener('scroll', triggerPlay, { passive: true, once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else playIfAllowed();
  });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) pause();
    else playIfAllowed();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) playIfAllowed();
    else pause();
  }, { threshold: 0.1 }).observe(video);

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

  const open = () => {
    if (document.hidden || dialog.open || document.body.classList.contains('nav-open')) return;
    safeSession.set(SESSION_KEYS.signupSeen, 'true');
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('input[type="email"]')?.focus();
  };

  const close = () => dialog.close();

  closeButton?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  open();
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

import verifiedLinksData from '../data/zeke-pujols-music-links-verified.json';

const PLATFORM_CONFIG = [
  { key: 'spotify', name: 'Spotify', action: 'STREAM', icon: 'spotify', bg: '#1DB954' },
  { key: 'apple_music', name: 'Apple Music', action: 'STREAM', icon: 'apple', bg: '#FA243C' },
  { key: 'itunes', name: 'iTunes', action: 'BUY', icon: 'apple', bg: '#FA243C' },
  { key: 'amazon_music', name: 'Amazon Music', action: 'STREAM', icon: 'amazon', bg: '#00A8E1' },
  { key: 'deezer', name: 'Deezer', action: 'STREAM', icon: 'deezer', bg: '#FEAA2D' },
  { key: 'tidal', name: 'Tidal', action: 'HIFI STREAM', icon: 'tidal', bg: '#000000' },
  { key: 'soundcloud', name: 'SoundCloud', action: 'STREAM', icon: 'soundcloud', bg: '#FF5500' },
  { key: 'pandora', name: 'Pandora', action: 'STREAM', icon: 'pandora', bg: '#224099' },
  { key: 'iheartradio', name: 'iHeartRadio', action: 'STREAM', icon: 'iheartradio', bg: '#C6002B' },
];

const SONG_METADATA = {
  'second-place': { title: 'Second Place', tag: 'SINGLE', art: 'assets/images/second-place-1200.webp' },
  'can-i-bother-you': { title: 'Can I Bother You?', tag: 'EP', art: 'assets/images/9.jpg' },
  'who-can-blame-her': { title: 'Who Can Blame Her', tag: 'SINGLE', art: 'assets/images/IMG_5659 2(1).jpeg' },
  'every-night': { title: 'Every Night', tag: 'SINGLE', art: 'assets/images/EVERY NIGHT-2.jpg' },
  'vices': { title: 'Vices', tag: 'SINGLE', art: 'assets/images/vices.jpg' },
  'unconditional': { title: 'Unconditional', tag: 'SINGLE', art: 'assets/images/8.jpg' },
  'remind-me-you-exist': { title: 'Remind Me You Exist', tag: 'SINGLE', art: 'assets/images/remind-me-you-exist-optimized.jpg' },
  'ella-calcula-si-te-vas': { title: 'Ella Calcula / Si Te Vas', tag: 'SINGLE', art: 'assets/images/ella-calcula.jpg' },
  'ella-calcula': { title: 'Ella Calcula / Si Te Vas', tag: 'SINGLE', art: 'assets/images/ella-calcula.jpg' },
  'do-no-wrong': { title: 'Do No Wrong', tag: 'SINGLE', art: 'assets/images/do-no-wrong.jpg' },
  'came-from-la': { title: 'Came From LA', tag: 'SINGLE', art: 'assets/images/came-from-la.jpg' },
  'cant-be-alone': { title: "Can't Be Alone", tag: 'SINGLE', art: 'assets/images/CANT BE ALONE(2)-1.jpg' },
};

const SONGS_DATA = {};

(function buildSongsData() {
  const releases = verifiedLinksData.releases || [];
  releases.forEach((rel) => {
    const slug = rel.slug;
    const meta = SONG_METADATA[slug] || { title: rel.title, tag: 'SINGLE', art: 'assets/images/second-place-1200.webp' };
    
    const platforms = [];
    if (rel.platforms) {
      PLATFORM_CONFIG.forEach((cfg) => {
        if (rel.platforms[cfg.key]) {
          platforms.push({
            name: cfg.name,
            action: cfg.action,
            icon: cfg.icon,
            bg: cfg.bg,
            url: rel.platforms[cfg.key],
          });
        }
      });
    }

    SONGS_DATA[slug] = {
      title: meta.title,
      tag: meta.tag,
      art: meta.art,
      platforms,
    };
    // Also alias 'ella-calcula' slug for compatibility with existing DOM matching logic
    if (slug === 'ella-calcula-si-te-vas') {
      SONGS_DATA['ella-calcula'] = SONGS_DATA[slug];
    }
  });
})();

const PLATFORM_ICONS = {
  spotify: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.68.471-1.037.254-2.846-1.739-6.429-2.132-10.651-1.168-.404.093-.807-.16-.899-.564-.093-.404.16-.807.564-.899 4.622-1.056 8.583-.604 11.769 1.341.357.217.471.68.254 1.036zm1.474-3.272c-.273.444-.854.587-1.298.314-3.256-2.001-8.222-2.583-12.077-1.413-.497.151-1.026-.134-1.177-.63-.151-.497.134-1.026.63-1.177 4.41-1.339 9.873-.7 13.608 1.594.444.273.587.854.314 1.298zm.127-3.415c-3.905-2.319-10.347-2.533-14.103-1.393-.604.183-1.246-.168-1.429-.772-.183-.604.168-1.246.772-1.429 4.312-1.309 11.424-1.054 15.932 1.621.542.322.721 1.022.399 1.564-.322.542-1.022.721-1.571.409z"/></svg>',
  apple: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-.97.04-2.16.65-2.85 1.46-.62.72-1.16 1.88-1.01 3.01 1.09.08 2.2-.54 2.87-1.36z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm-2.5-9.8v5.6l5-2.8-5-2.8z"/></svg>',
  amazon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.8 17.4c-2.4 0-4.2-1.2-5.1-3.2.3.1.6.2.9.2 1.5 0 2.7-.9 3.2-2.1.2.5.6.9 1.1 1.2.7.4 1.5.6 2.3.6 2.5 0 4.5-2 4.5-4.5S15.1 5 12.6 5c-2.5 0-4.5 2-4.5 4.5 0 .6.1 1.2.4 1.7-1.1.2-2.1.8-2.7 1.7-.8 1.1-1.1 2.4-1 3.7.8 1.8 2.5 2.8 4.4 2.8 3.1 0 5.9-1.8 7.3-4.5.2-.4.4-.8.5-1.2.2.1.3.3.4.5-.8 3.4-3.9 5.8-7.4 5.8z"/></svg>',
  deezer: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-5 15h2v2H7v-2zm0-3h2v2H7v-2zm0-3h2v2H7V9zm4 6h2v2h-2v-2zm0-3h2v2h-2v-2zm0-3h2v2h-2V9zm0-3h2v2h-2V6zm4 9h2v2h-2v-2zm0-3h2v2h-2v-2zm0-3h2v2h-2V9zm0-3h2v2h-2V6z"/></svg>',
  tidal: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M12 0L6 6l6 6 6-6-6-6zM0 12l6 6 6-6-6-6-6 6zm12 0l6 6 6-6-6-6-6 6zm-6 6l6 6 6-6-6-6-6 6z"/></svg>',
  soundcloud: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M1.175 12.225c-.07 0-.13.06-.15.13l-.53 3.32.53 3.23c.02.07.08.12.15.12s.13-.05.15-.12l.62-3.23-.62-3.32c-.02-.07-.08-.13-.15-.13zm2.08-1.5c-.09 0-.16.07-.18.16l-.6 4.79.6 4.67c.02.09.09.15.18.15s.16-.06.18-.15l.7-4.67-.7-4.79c-.02-.09-.09-.16-.18-.16zm2.14-1.12c-.1 0-.19.08-.2.19l-.66 5.88.66 5.66c.01.11.1.19.2.19s.19-.08.2-.19l.78-5.66-.78-5.88c-.01-.11-.1-.19-.2-.19zm2.19-.59c-.12 0-.22.1-.23.22l-.7 6.46.7 6.16c.01.12.11.22.23.22s.22-.1.23-.22l.84-6.16-.84-6.46c-.01-.12-.11-.22-.23-.22zm16.415 4.31c-.48 0-.94.09-1.37.26-.45-2.61-2.72-4.61-5.45-4.61-1.37 0-2.63.5-3.6 1.34v7.7c.97.84 2.23 1.34 3.6 1.34 3.03 0 5.5-2.47 5.5-5.5 0-3.03-2.47-5.5-5.5-5.5-.43 0-.85.05-1.25.15v-3.79c0-.15-.12-.27-.27-.27s-.27.12-.27.27v11.75c0 .15.12.27.27.27.02 0 .04 0 .06-.01 1.05-.33 2.19-.52 3.39-.52 4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5c-3.1 0-5.75-1.89-6.88-4.57h-1.34c.02.15.12.27.27.27h1.07c.07 0 .13.06.15.13l.31 4.44-.31 4.14c-.02.07-.08.13-.15.13s-.13-.06-.15-.13l-.36-4.14.36-4.44c.02-.07.08-.13.15-.13z"/></svg>',
  pandora: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M22.308 12.001c0-5.698-4.62-10.318-10.318-10.318H1.692v20.636h6.769v-6.769h3.529c5.698 0 10.318-4.62 10.318-10.318zM12 15.549H8.461V8.451H12c1.956 0 3.549 1.593 3.549 3.549S13.956 15.549 12 15.549z"/></svg>',
  iheartradio: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
};

function ensurePlatformDialog() {
  let dialog = document.querySelector('#platform-dialog');
  if (dialog) return dialog;

  dialog = document.createElement('dialog');
  dialog.id = 'platform-dialog';
  dialog.className = 'platform-dialog';
  dialog.setAttribute('aria-labelledby', 'platform-dialog-title');
  dialog.innerHTML = `
    <div class="platform-dialog__inner">
      <button class="platform-dialog__close" type="button" data-platform-close aria-label="Close platform selector">✕</button>
      <div class="platform-dialog__header">
        <img class="platform-dialog__art" src="" alt="Album Artwork" id="platform-dialog-art">
        <div class="platform-dialog__meta">
          <div class="platform-dialog__tag" id="platform-dialog-tag">SINGLE • 2026</div>
          <h2 class="platform-dialog__title" id="platform-dialog-title">Song Title</h2>
          <div class="platform-dialog__artist">Zeke Pujols</div>
        </div>
      </div>
      <div class="platform-dialog__divider"></div>
      <div class="platform-dialog__section-label">CHOOSE YOUR PLATFORM</div>
      <div class="platform-dialog__list" id="platform-dialog-list"></div>
      <div class="platform-dialog__footer">
        Available on all major music streaming services &amp; digital stores.
      </div>
    </div>
  `;
  document.body.appendChild(dialog);
  return dialog;
}

function openPlatformModal(songId, defaultUrl) {
  const dialog = ensurePlatformDialog();
  const data = SONGS_DATA[songId] || {
    title: 'Zeke Pujols Song',
    tag: 'SINGLE',
    art: 'assets/images/second-place-1200.webp',
    platforms: [],
  };

  const artEl = dialog.querySelector('#platform-dialog-art');
  const tagEl = dialog.querySelector('#platform-dialog-tag');
  const titleEl = dialog.querySelector('#platform-dialog-title');
  const listEl = dialog.querySelector('#platform-dialog-list');

  if (artEl) artEl.src = data.art;
  if (tagEl) {
    // Strips out " • YYYY" so only release type (e.g. SINGLE, EP) is displayed
    const rawTag = data.tag || 'SINGLE';
    tagEl.textContent = rawTag.split('•')[0].trim();
  }
  if (titleEl) titleEl.textContent = data.title;

  if (listEl) {
    if (!data.platforms || data.platforms.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 24px 0; text-align: center; color: #88888e; font-size: 14px;">
          Direct platform links coming soon.
        </div>
      `;
    } else {
      listEl.innerHTML = data.platforms.map((p) => `
        <a class="platform-row" href="${p.url}" target="_blank" rel="noopener">
          <div class="platform-row__left">
            <div class="platform-row__icon" style="background: ${p.bg}">
              ${PLATFORM_ICONS[p.icon] || ''}
            </div>
            <span class="platform-row__name">${p.name}</span>
          </div>
          <div class="platform-row__right">
            <span class="platform-row__btn">${p.action}</span>
            <span class="platform-row__ext">↗</span>
          </div>
        </a>
      `).join('');
    }
  }

  dialog.showModal();
  document.body.classList.add('dialog-open');
}

function initPlatformModalTriggers() {
  const dialog = ensurePlatformDialog();
  const closeBtn = dialog.querySelector('[data-platform-close]');

  const close = () => {
    if (dialog.open) dialog.close();
  };

  closeBtn?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

  // Global delegated click handler to reliably catch every song link click
  document.body.addEventListener('click', (event) => {
    // Never intercept clicks inside the platform selector modal itself
    if (event.target.closest('#platform-dialog')) return;

    const link = event.target.closest('.music-item a, .music-item .music-link, .latest-release-section a, .editorial-cta, .latest-cover');
    if (!link) return;

    // Skip nav, footer, or non-song links (e.g. contact.html, partiful.com, etc.)
    const href = link.getAttribute('href');
    if (
      link.closest('.nav-bar') ||
      link.closest('.masthead') ||
      link.closest('.footer') ||
      (href && (href.endsWith('.html') || href.includes('contact') || href.includes('partiful.com')))
    ) return;

    event.preventDefault();
    event.stopPropagation();

    const item = link.closest('.music-item') || link.closest('.latest-release-section') || link.closest('.editorial-content') || link.closest('.music-section');
    
    let songId = 'second-place';
    if (item) {
      const titleText = item.querySelector('.music-title, .article-headline, h2, h3')?.textContent?.trim()?.toLowerCase() || '';
      if (titleText.includes('second place')) songId = 'second-place';
      else if (titleText.includes('bother')) songId = 'can-i-bother-you';
      else if (titleText.includes('blame')) songId = 'who-can-blame-her';
      else if (titleText.includes('every night')) songId = 'every-night';
      else if (titleText.includes('vices')) songId = 'vices';
      else if (titleText.includes('unconditional')) songId = 'unconditional';
      else if (titleText.includes('remind')) songId = 'remind-me-you-exist';
      else if (titleText.includes('ella') || titleText.includes('calcula')) songId = 'ella-calcula';
      else if (titleText.includes('wrong')) songId = 'do-no-wrong';
      else if (titleText.includes('came from')) songId = 'came-from-la';
      else if (titleText.includes('alone')) songId = 'cant-be-alone';
    }

    openPlatformModal(songId, href);
  });
}

function initAllPlatformTriggers() {
  initMobileNav();
  initHeroMedia();
  initVideoFacades();
  initSignupDialog();
  initSignupForms();
  initReveals();
  initPlatformModalTriggers();
}

// Run immediately if body is ready, or on DOMContentLoaded
if (document.body) {
  initPlatformModalTriggers();
}
document.addEventListener('DOMContentLoaded', initAllPlatformTriggers);
window.addEventListener('load', initPlatformModalTriggers);

