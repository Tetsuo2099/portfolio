(function () {
  'use strict';

  /* ── SCROLL REVEAL ── */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  /* ── CURSOR ── */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'jd-cursor';
    ring.className = 'jd-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('jd-cursor-on');

    /* start both elements off-screen so they don't flash at 0,0 */
    dot.style.transform  = 'translate(-200px, -200px)';
    ring.style.transform = 'translate(-200px, -200px)';

    var mx = -200, my = -200;
    var rx = -200, ry = -200;

    function updateCursorColor() {
      var el = document.elementFromPoint(mx, my);
      while (el) {
        var bg = window.getComputedStyle(el).backgroundColor;
        var rgb = bg.match(/\d+/g);
        if (rgb && rgb.length >= 3 && !(rgb[0] === '0' && rgb[1] === '0' && rgb[2] === '0' && rgb[3] === '0')) {
          var brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          var isDark = brightness < 100;
          dot.classList.toggle('light', isDark);
          ring.classList.toggle('light', isDark);
          return;
        }
        el = el.parentElement;
      }
    }

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
      updateCursorColor();
    });

    /* ring follows with lerp via rAF — GPU compositing only, no layout reflow */
    (function loop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('jd-cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('jd-cursor-hover'); });
    });
  }

  /* ── MOBILE NAV ── */
  function initMobileNav() {
    var header = document.querySelector('header');
    var nav    = header && header.querySelector('nav');
    if (!nav) return;

    /* hamburger button — stili inline per evitare conflitti CSS */
    var btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Menu');
    btn.style.cssText = 'display:none;flex-direction:column;justify-content:center;gap:6px;width:36px;height:36px;background:none;border:none;cursor:pointer;padding:4px;position:relative;z-index:601;';
    btn.innerHTML =
      '<span style="display:block;width:100%;height:1.5px;background:currentColor;transition:transform 0.4s,opacity 0.3s;transform-origin:center;"></span>' +
      '<span style="display:block;width:100%;height:1.5px;background:currentColor;transition:transform 0.4s,opacity 0.3s;transform-origin:center;"></span>';
    header.appendChild(btn);

    /* mostra su mobile */
    function checkMobile() {
      btn.style.display = window.innerWidth <= 600 ? 'flex' : 'none';
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);

    /* overlay — tutto inline */
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:600;background:#0c0c0c;display:flex;flex-direction:column;justify-content:center;padding:80px 36px 60px;opacity:0;pointer-events:none;transition:opacity 0.35s ease;';

    /* voci menu */
    nav.querySelectorAll('a').forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = link.textContent;
      a.style.cssText = 'display:block;font-family:Inter,-apple-system,Helvetica,sans-serif;font-size:clamp(40px,12vw,64px);font-weight:800;letter-spacing:-0.03em;text-transform:uppercase;text-decoration:none;color:rgba(255,255,255,0.6);line-height:1.15;transition:color 0.2s;';
      a.addEventListener('mouseenter', function () { a.style.color = '#fff'; });
      a.addEventListener('mouseleave', function () { a.style.color = 'rgba(255,255,255,0.6)'; });
      overlay.appendChild(a);
    });

    /* social footer */
    var footer = document.createElement('div');
    footer.style.cssText = 'position:absolute;bottom:40px;left:36px;right:36px;display:flex;gap:24px;';
    [['Instagram','https://www.instagram.com/juridabiankov'],
     ['Behance','https://www.behance.net/juridabiankov'],
     ['LinkedIn','https://www.linkedin.com/in/juridabiankov']].forEach(function(item) {
      var a = document.createElement('a');
      a.href = item[1]; a.target = '_blank'; a.textContent = item[0];
      a.style.cssText = 'font-family:Inter,-apple-system,Helvetica,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;color:rgba(255,255,255,0.3);transition:color 0.2s;';
      a.addEventListener('mouseenter', function () { a.style.color = 'rgba(255,255,255,0.7)'; });
      a.addEventListener('mouseleave', function () { a.style.color = 'rgba(255,255,255,0.3)'; });
      footer.appendChild(a);
    });
    overlay.appendChild(footer);

    document.body.appendChild(overlay);

    /* white su pagine scure, nero su pagine chiare / header scrolled */
    function syncBtnColor() {
      var scrolled = header.classList.contains('scrolled');
      if (scrolled) {
        btn.style.color = '#0c0c0c';
      } else {
        var bg  = window.getComputedStyle(document.body).backgroundColor;
        var rgb = bg.match(/\d+/g);
        var lum = rgb ? (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000 : 255;
        btn.style.color = lum < 100 ? '#ffffff' : '#0c0c0c';
      }
    }
    syncBtnColor();
    new MutationObserver(syncBtnColor).observe(header, { attributes: true, attributeFilter: ['class'] });

    var isOpen = false;
    btn.addEventListener('click', function () {
      isOpen = !isOpen;
      overlay.style.opacity        = isOpen ? '1' : '0';
      overlay.style.pointerEvents  = isOpen ? 'all' : 'none';
      document.body.style.overflow = isOpen ? 'hidden' : '';
      /* X animation */
      var spans = btn.querySelectorAll('span');
      spans[0].style.transform = isOpen ? 'translateY(3.75px) rotate(45deg)'  : '';
      spans[1].style.transform = isOpen ? 'translateY(-3.75px) rotate(-45deg)' : '';
    });

    overlay.querySelectorAll('a').forEach(function (a) {
      if (a.closest && a.closest('[style*="position:absolute"]')) return;
      a.addEventListener('click', function () {
        isOpen = false;
        overlay.style.opacity       = '0';
        overlay.style.pointerEvents = 'none';
        document.body.style.overflow = '';
        var spans = btn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      });
    });
  }

  /* ── PAGE TRANSITIONS ── */
  function initTransitions() {
    var overlay = document.createElement('div');
    overlay.className = 'jd-transition';
    /* match the dark/light theme of each page */
    var bg = window.getComputedStyle(document.body).backgroundColor;
    overlay.style.background = bg === 'rgb(245, 245, 243)' || bg === 'rgb(255, 255, 255)'
      ? '#0c0c0c'
      : '#0c0c0c';
    document.body.appendChild(overlay);

    /* page enter — su main/article, NON su body (evita transform su body che rompe position:fixed) */
    var mainEl = document.querySelector('main, .page, section');
    if (mainEl) mainEl.classList.add('jd-page-enter');

    /* page exit on internal link click */
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('mailto') === 0 || href.indexOf('http') === 0 || link.target === '_blank') return;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.style.transition = 'transform 0.55s cubic-bezier(0.76,0,0.24,1)';
        overlay.style.transformOrigin = 'bottom';
        overlay.style.transform = 'scaleY(1)';
        var dest = href;
        setTimeout(function () { window.location.href = dest; }, 530);
      });
    });

    /* page enter reveal (after back/forward) */
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        overlay.style.transition = 'none';
        overlay.style.transform  = 'scaleY(0)';
      }
    });
  }

  /* ── INIT ── */
  function init() {
    document.querySelectorAll('[data-anim]').forEach(function (el) {
      obs.observe(el);
    });
    /* initCursor(); — disabilitato temporaneamente */
    initMobileNav();
    initTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
