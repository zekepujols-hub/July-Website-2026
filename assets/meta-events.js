(function() {
  'use strict';

  function getTestCode() {
    try {
      var params = new URLSearchParams(window.location.search);
      var code = params.get('test_event_code') || params.get('fb_test_events');
      if (code) {
        sessionStorage.setItem('meta_test_code', code);
        return code;
      }
      return sessionStorage.getItem('meta_test_code');
    } catch (e) {
      return null;
    }
  }

  // Global helper for firing standard and custom Meta Pixel events
  window.trackMeta = function(eventName, data, isStandard) {
    if (!window.fbq) return;
    var testCode = getTestCode();
    var opts = testCode ? { test_event_code: testCode } : undefined;
    try {
      if (isStandard) {
        window.fbq('track', eventName, data || {}, opts);
      } else {
        window.fbq('trackCustom', eventName, data || {}, opts);
      }
    } catch (err) {
      console.warn('[Meta Tracking Error]', err);
    }
  };

  function getTabName() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('second-place') !== -1) return 'Ad: Second Place';
    if (p.indexOf('music') !== -1) return 'Music';
    if (p.indexOf('videos') !== -1) return 'Videos';
    if (p.indexOf('tour') !== -1) return 'Live Shows';
    if (p.indexOf('merch') !== -1) return 'Shop';
    if (p.indexOf('about') !== -1) return 'About';
    if (p.indexOf('contact-us') !== -1) return 'Contact';
    if (p.indexOf('contact') !== -1) return 'Sign Up';
    if (p.indexOf('community') !== -1) return 'Community';
    if (p.indexOf('vault') !== -1) return 'Vault';
    return 'Home';
  }

  function init() {
    var currentTab = getTabName();
    var testCode = getTestCode();

    // 1. Preserve test_event_code across internal navigation links during testing
    if (testCode) {
      document.querySelectorAll('a[href]').forEach(function(a) {
        var href = a.getAttribute('href');
        if (!href) return;
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
        if (href.indexOf('http') === 0 && href.indexOf(window.location.hostname) === -1) return; // external link
        if (href.indexOf('test_event_code') !== -1) return; // already has it

        var sep = href.indexOf('?') === -1 ? '?' : '&';
        a.setAttribute('href', href + sep + 'test_event_code=' + encodeURIComponent(testCode));
      });
    }

    // 2. Fire clear TabView event with tab name and exact URL
    window.trackMeta('TabView', {
      tab: currentTab,
      url: window.location.href
    }, false);

    // 3. Track Navigation Tab Clicks with small delay to ensure delivery before unload
    document.querySelectorAll('.nav-bar a, .masthead a, .footer-links a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var label = (link.textContent || '').trim();
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
        if (link.target === '_blank') return;

        if (label && window.trackMeta) {
          e.preventDefault();
          window.trackMeta('NavigationClick', {
            tab: label,
            destination: href
          }, false);
          setTimeout(function() {
            window.location.href = href;
          }, 120);
        }
      });
    });

    // 4. Track Subscribe / Updates Popup ("Stay Updated") open & close on Home Page
    var signupDialog = document.querySelector('#signup-dialog');
    if (signupDialog) {
      var isSubmitted = false;
      var lastClosedTime = 0;

      // Track if form was actually submitted
      var signupForm = signupDialog.querySelector('form.signup-form');
      if (signupForm) {
        signupForm.addEventListener('submit', function() {
          isSubmitted = true;
        });
      }

      function handlePopupDismiss(reason) {
        var now = Date.now();
        if (now - lastClosedTime < 500) return; // debounce
        lastClosedTime = now;
        if (!isSubmitted) {
          window.trackMeta('CloseSubscribePopup', {
            modal: 'Stay Updated',
            page: currentTab,
            trigger: reason || 'close'
          }, false);
        }
      }

      // Close button (X)
      var closeBtn = signupDialog.querySelector('[data-dialog-close], .dialog-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          handlePopupDismiss('close_button');
        });
      }

      // Dialog native close event (Escape key or programmatic close)
      signupDialog.addEventListener('close', function() {
        handlePopupDismiss('dialog_close');
      });

      // Dialog backdrop click
      signupDialog.addEventListener('click', function(e) {
        if (e.target === signupDialog) {
          handlePopupDismiss('backdrop_click');
        }
      });
    }

    // 5. Track Real Newsletter Form Submissions
    document.querySelectorAll('form.signup-form').forEach(function(form) {
      form.addEventListener('submit', function() {
        var honeypot = form.querySelector('input[name^="hp"]');
        if (honeypot && honeypot.value) return; // ignore bot spam
        window.trackMeta('Lead', {
          content_name: 'Newsletter Signup',
          tab: currentTab
        }, true);
      });
    });

    // 6. Track General Outbound / Social clicks (Instagram, Spotify, etc.) outside of modals
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link || !link.href) return;
      if (link.classList.contains('pm-row')) return; // Handled separately with song details

      var href = link.href.toLowerCase();
      var destination = null;
      if (href.indexOf('spotify.com') !== -1) destination = 'Spotify';
      else if (href.indexOf('music.apple.com') !== -1 || href.indexOf('itunes.apple.com') !== -1) destination = 'Apple Music';
      else if (href.indexOf('music.youtube.com') !== -1 || href.indexOf('youtube.com') !== -1) destination = 'YouTube';
      else if (href.indexOf('instagram.com') !== -1) destination = 'Instagram';
      else if (href.indexOf('tiktok.com') !== -1) destination = 'TikTok';
      else if (href.indexOf('soundcloud.com') !== -1) destination = 'SoundCloud';

      if (destination) {
        window.trackMeta('OutboundClick', {
          destination: destination,
          url: link.href,
          source_tab: currentTab
        }, false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
