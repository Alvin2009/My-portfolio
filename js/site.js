/* Alvin Emmanuel Gideon — scroll-scrubbed portfolio. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement;
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return [].slice.call((c || doc).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function sm(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); } // smoothstep

  root.classList.add('js');
  var gf = $('#gf'); if (gf) gf.media = 'all';

  /* ---------- Config ---------- */
  // Cue points per panel in scroll progress [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd].
  // Gaps between panels (no readable text) let the stage breathe; ranges never overlap.
  var CUES = [
    [-0.2, -0.1, 0.15, 0.21],
    [0.28, 0.34, 0.48, 0.54],
    [0.61, 0.67, 0.80, 0.85],
    [0.90, 0.95, 9, 10]
  ];
  // Where each nav target lands (progress), chosen inside each panel's fully-visible hold.
  var GO = { top: 0, about: 0.07, work: 0.41, services: 0.735, contact: 1 };
  var VIDEO_SOURCES = ['assets/scrub.mp4', 'assets/scrub.webm'];
  var PRELOAD_MAX_MS = 3000;

  /* ---------- Elements ---------- */
  var panels = $$('.panel');
  var inners = panels.map(function (p) { return $('.panel-inner', p); });
  var anchors = $$('.anchor');
  var progressEl = $('#progress');
  var stage = $('#stage');
  var vid = $('#stage-video');
  var fbA = $('#fb-a'), fbB = $('#fb-b');
  var chap = $('#chap b');
  var navLinks = $$('#nav a[data-go]');
  var menuBtn = $('#menu-btn'), nav = $('#nav');
  var head = $('.site-head'), foot = $('#foot');

  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var rm = reduceMQ.matches;

  /* ---------- State ---------- */
  var maxScroll = 1, vh = window.innerHeight, scrollY = window.pageYOffset;
  var ps = 0;               // smoothed progress for panels
  var running = false, ready = false, introStart = 0;
  var activeIdx = -1;
  var lastO = [], lastInert = [];
  var vReady = false, vDur = 0, vCur = 0, vLast = -1, vFailed = false;
  var lastGap = -1;
  var pm = { el: null, tx: 0, ty: 0, cx: 0, cy: 0 };   // pointer parallax on project previews
  var finePointer = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false;

  /* ---------- Measure (layout reads live here only) ---------- */
  function measure() {
    vh = window.innerHeight;
    maxScroll = Math.max(1, root.scrollHeight - vh);
    var hh = head.offsetHeight, fh = foot.offsetHeight;
    root.style.setProperty('--head-h', hh + 'px');
    root.style.setProperty('--foot-h', fh + 'px');
    if (!rm) {
      anchors.forEach(function (a) {
        var k = a.getAttribute('data-for');
        a.style.top = Math.round(GO[k] * maxScroll) + 'px';
      });
    }
    scrollY = window.pageYOffset;
    request();
  }

  /* ---------- Mode: scrubbed vs. stacked (reduced motion) ---------- */
  function setMode() {
    rm = reduceMQ.matches;
    root.classList.toggle('rm', rm);
    root.classList.toggle('scrub', !rm);
    // Move section ids: onto panels when stacked (native anchors), onto track anchors when scrubbed.
    anchors.forEach(function (a, i) {
      var k = a.getAttribute('data-for');
      var panel = panels[['about', 'work', 'services', 'contact'].indexOf(k)];
      if (rm) { a.removeAttribute('id'); panel.id = k; }
      else { panel.removeAttribute('id'); a.id = k; }
    });
    panels.forEach(function (p, i) {
      p.style.opacity = ''; p.style.transform = ''; p.style.visibility = '';
      inners[i].style.transform = '';
      p.removeAttribute('inert');
      lastO[i] = -1; lastInert[i] = null;
    });
    if (rm) { vid.pause(); }
    measure();
  }

  /* ---------- Frame loop (runs only while something is moving) ---------- */
  function request() {
    if (!running) { running = true; requestAnimationFrame(frame); }
  }

  function frame(now) {
    var p = clamp(scrollY / maxScroll, 0, 1);
    progressEl.style.transform = 'scaleX(' + p.toFixed(4) + ')';

    var more = false;

    if (!rm) {
      // Panels
      ps += (p - ps) * 0.2;
      if (Math.abs(p - ps) < 0.0004) ps = p; else more = true;

      var intro = 1;
      if (introStart) {
        intro = sm((now - introStart) / 1100);
        if (intro < 1) more = true;
      } else if (!ready) { intro = 0; }

      var travel = Math.min(48, vh * 0.06);
      var strongest = 0, strongestO = -1;
      for (var i = 0; i < panels.length; i++) {
        var c = CUES[i];
        var a = sm((ps - c[0]) / (c[1] - c[0]));
        var b = 1 - sm((ps - c[2]) / (c[3] - c[2]));
        var o = a * b * (i === 0 ? intro : 1);
        var ty = (1 - a) * travel - (1 - b) * travel + (i === 0 ? (1 - intro) * 24 : 0);
        if (o > strongestO) { strongestO = o; strongest = i; }
        if (Math.abs(o - lastO[i]) > 0.0005 || lastO[i] === undefined || lastO[i] < 0) {
          var el = panels[i];
          el.style.opacity = o.toFixed(3);
          el.style.visibility = o < 0.003 ? 'hidden' : 'visible';
          el.style.transform = 'translate3d(0,' + ty.toFixed(1) + 'px,0)';
          inners[i].style.transform = 'translate3d(0,' + (-ty * 0.4).toFixed(1) + 'px,0)'; // counter-movement
          lastO[i] = o;
          // Reveal state with hysteresis: switches on once the panel is clearly visible, off only when it has gone.
          var isIn = el.classList.contains('in');
          if (!isIn && o > 0.3) el.classList.add('in');
          else if (isIn && o < 0.02) el.classList.remove('in');
          var inert = o < 0.5;
          if (inert !== lastInert[i]) {
            if (inert) el.setAttribute('inert', ''); else el.removeAttribute('inert');
            lastInert[i] = inert;
          }
        }
      }
      if (strongest !== activeIdx && strongestO > 0.5) setActive(strongest);

      // Stage "breathes": between panels the visual is revealed a little more
      var gap = 1 - clamp(strongestO, 0, 1);
      if (Math.abs(gap - lastGap) > 0.01) { stage.style.setProperty('--gap', gap.toFixed(2)); lastGap = gap; }

      // Fallback stage drift (only visible when no video)
      if (!vReady) {
        fbA.style.transform = 'translate3d(' + (-ps * 38).toFixed(2) + 'vw,0,0)';
        fbB.style.transform = 'translate3d(' + (ps * 46 - 8).toFixed(2) + 'vw,0,0)';
      }

      // Pointer parallax on project previews (fine pointers only; same loop, no extra rAF)
      if (pm.el) {
        pm.cx += (pm.tx - pm.cx) * 0.12; pm.cy += (pm.ty - pm.cy) * 0.12;
        pm.el.style.setProperty('--px', pm.cx.toFixed(3)); pm.el.style.setProperty('--py', pm.cy.toFixed(3));
        if (Math.abs(pm.tx - pm.cx) + Math.abs(pm.ty - pm.cy) > 0.004) more = true;
        else if (pm.tx === 0 && pm.ty === 0) { pm.el.style.setProperty('--px', 0); pm.el.style.setProperty('--py', 0); pm.el = null; }
      }

      // Video scrub: ease playback time toward target
      if (vReady && vDur > 0) {
        var target = p * vDur;
        vCur += (target - vCur) * 0.14;
        if (Math.abs(target - vCur) < 0.004) vCur = target; else more = true;
        if (!vid.seeking && Math.abs(vCur - vLast) > 0.008) {
          try { vid.currentTime = vCur; vLast = vCur; } catch (e) { /* ignore */ }
        }
      }
    } else {
      if (activeIdx === -1) setActive(0);
    }

    if (more) requestAnimationFrame(frame); else running = false;
  }

  function setActive(i) {
    activeIdx = i;
    chap.textContent = '0' + (i + 1);
    var keys = ['about', 'work', 'services', 'contact'];
    navLinks.forEach(function (a) {
      if (a.getAttribute('data-go') === keys[i]) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  /* ---------- Navigation ---------- */
  function go(key, instant) {
    if (!(key in GO)) return;
    var y = Math.round(GO[key] * maxScroll);
    window.scrollTo({ top: y, behavior: (instant || rm) ? 'auto' : 'smooth' });
  }
  doc.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-go]') : null;
    if (!a || rm || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    var key = a.getAttribute('data-go');
    closeMenu();
    go(key);
    try { history.replaceState(null, '', key === 'top' ? location.pathname : '#' + key); } catch (err) { /* ignore */ }
  });

  function closeMenu() {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
  }
  menuBtn.addEventListener('click', function () {
    var o = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', o ? 'true' : 'false');
    menuBtn.textContent = o ? 'Close' : 'Menu';
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuBtn.focus(); }
  });

  /* ---------- Video (optional asset; page never depends on it) ---------- */
  var videoCb = null;
  function initVideo(done) {
    var conn = navigator.connection || {};
    var skip = rm || conn.saveData || !vid.canPlayType;
    if (skip) { vFailed = true; done(); return; }
    var list = VIDEO_SOURCES.filter(function (s) {
      var t = s.slice(-4) === '.mp4' ? 'video/mp4; codecs="avc1.42E01E"' : 'video/webm; codecs="vp9"';
      return vid.canPlayType(t) !== '';
    });
    var i = 0, settled = false, giveUp;
    function settle() { if (!settled) { settled = true; done(); } }
    function fail() {
      if (i < list.length) { load(); return; }
      vFailed = true; clearTimeout(giveUp);
      vid.removeAttribute('src'); try { vid.load(); } catch (e) { /* ignore */ }
      settle();
    }
    function load() { vid.src = list[i++]; try { vid.load(); } catch (e) { fail(); } }
    vid.addEventListener('error', fail);
    vid.addEventListener('loadeddata', function () {
      if (!isFinite(vid.duration) || vid.duration <= 0) { fail(); return; }
      vDur = vid.duration; vReady = true; clearTimeout(giveUp);
      root.classList.add('video-on');
      // Prime decoder (helps iOS Safari); stay paused afterwards.
      try { var pr = vid.play(); if (pr && pr.then) pr.then(function () { vid.pause(); vid.currentTime = 0; }).catch(function () {}); else vid.pause(); } catch (e) { /* ignore */ }
      settle(); request();
    });
    giveUp = setTimeout(function () { if (!vReady) { vFailed = true; vid.removeAttribute('src'); try { vid.load(); } catch (e) { /* ignore */ } } }, 20000);
    if (!list.length) { fail(); return; }
    load();
  }

  /* ---------- Optional project previews (assets/*.jpg); pages work without them ---------- */
  $$('img[data-src]').forEach(function (img) {
    img.addEventListener('load', function () {
      img.hidden = false;
      var a = img.parentNode; a.hidden = false; a.classList.add('has-img');
      if (a.parentNode) a.parentNode.classList.add('has-media');
    });
    img.src = img.getAttribute('data-src');
  });

  /* ---------- Preloader (real milestones + hard cap) ---------- */
  var pre = $('#preloader'), preBar = $('#pre-bar'), prePct = $('#pre-pct');
  var milestones = { dom: 1, fonts: 0, video: 0, load: 0 };
  var shown = 0, preStart = performance.now(), preDone = false;
  function target() { return 8 + milestones.fonts * 37 + milestones.video * 35 + milestones.load * 20; }
  function finishPre() {
    if (preDone) return; preDone = true;
    pre.classList.add('done');
    ready = true;
    root.classList.add('ready');
    if (!rm && ps < 0.1 && panels[0]) panels[0].classList.add('in');
    introStart = performance.now();
    request();
    setTimeout(function () { pre.setAttribute('hidden', ''); }, 1000);
  }
  function preTick(now) {
    if (preDone) return;
    var forced = now - preStart > PRELOAD_MAX_MS;
    var t = forced ? 100 : target();
    shown += (t - shown) * 0.12 + 0.15;
    if (shown > t) shown = t;
    prePct.textContent = Math.round(shown);
    preBar.style.transform = 'scaleX(' + (shown / 100).toFixed(3) + ')';
    if (shown >= 99.5 && now - preStart > 500) { prePct.textContent = '100'; preBar.style.transform = 'scaleX(1)'; setTimeout(finishPre, 120); return; }
    requestAnimationFrame(preTick);
  }
  (function () {
    var fontsP = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
    Promise.race([fontsP, new Promise(function (r) { setTimeout(r, 2500); })]).then(function () { milestones.fonts = 1; });
    var vDone = false;
    function vMark() { if (!vDone) { vDone = true; milestones.video = 1; } }
    initVideo(vMark);
    setTimeout(vMark, 3000); // video is optional: never hold the page for it
    function onLoad() { milestones.load = 1; }
    if (doc.readyState === 'complete') onLoad(); else window.addEventListener('load', onLoad);
    requestAnimationFrame(preTick);
  })();

  /* ---------- Motion prep: word-mask headlines + staggered reveal targets ---------- */
  function splitWords(h) {
    h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    var n = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          c.nodeValue.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(doc.createTextNode(' ')); return; }
            var w = doc.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            var i = doc.createElement('span'); i.className = 'wi'; i.style.setProperty('--wi', n++); i.textContent = t;
            w.appendChild(i); frag.appendChild(w);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(h);
  }
  $$('.display').forEach(splitWords);
  panels.forEach(function (p) {
    var k = 0;
    $$('.eyebrow,.lede,.actions,.ident,.plate,.more,.rows li,.meta3>div,.contact-list>div,.cue', p).forEach(function (el) {
      el.setAttribute('data-r', ''); el.style.setProperty('--i', Math.min(k++, 9));
    });
  });

  /* ---------- Project preview pointer response (desktop only) ---------- */
  if (finePointer) {
    $$('.plate-media').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        if (rm) return;
        var r = el.getBoundingClientRect();
        pm.el = el; pm.tx = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1); pm.ty = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1);
        request();
      });
      el.addEventListener('pointerleave', function () { pm.tx = 0; pm.ty = 0; request(); });
    });
  }

  /* ---------- Copy email (real action with visible + announced confirmation) ---------- */
  (function () {
    var btn = $('#copy-email'), status = $('#copy-status'), t = 0;
    if (!btn) return;
    function done(ok) {
      btn.classList.toggle('ok', ok);
      btn.textContent = ok ? 'Copied ✓' : 'Copy failed';
      if (status) status.textContent = ok ? 'Email address copied' : 'Could not copy; please copy it manually';
      clearTimeout(t);
      t = setTimeout(function () { btn.classList.remove('ok'); btn.textContent = 'Copy'; if (status) status.textContent = ''; }, 2000);
    }
    function fallback(text) {
      var ta = doc.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0'; doc.body.appendChild(ta); ta.select();
      var ok = false; try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
      doc.body.removeChild(ta); done(ok);
    }
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallback(text); });
      else fallback(text);
    });
  })();

  /* ---------- Events ---------- */
  window.addEventListener('scroll', function () { scrollY = window.pageYOffset; request(); }, { passive: true });
  var rzT = 0;
  window.addEventListener('resize', function () { clearTimeout(rzT); rzT = setTimeout(measure, 80); });
  window.addEventListener('orientationchange', function () { setTimeout(measure, 250); });
  window.addEventListener('load', measure);
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(measure);
  if (reduceMQ.addEventListener) reduceMQ.addEventListener('change', function () { setMode(); }); else if (reduceMQ.addListener) reduceMQ.addListener(setMode);

  /* ---------- Init ---------- */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) { /* ignore */ }
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  setMode();
  var h = (location.hash || '').slice(1);
  if (!rm) {
    window.scrollTo(0, h && h in GO ? Math.round(GO[h] * maxScroll) : 0);
    scrollY = window.pageYOffset;
    ps = clamp(scrollY / maxScroll, 0, 1);
  }
  request();
})();
