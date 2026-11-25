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

    // 1. Fire clear TabView event with tab name
    window.trackMeta('TabView', {
      tab: currentTab,
      url: window.location.href
    }, false);

    // 2. Track Navigation Tab Clicks
    document.querySelectorAll('.nav-bar a, .masthead a').forEach(function(link) {
      link.addEventListener('click', function() {
        var label = (link.textContent || '').trim();
        if (label) {
          window.trackMeta('NavigationClick', {
            tab: label,
            destination: link.getAttribute('href')
          }, false);
        }
      });
    });

    // 3. Track Real Newsletter Form Submissions
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

    // 4. Track General Outbound / Social clicks (Instagram, Spotify, etc.) outside of modals
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
