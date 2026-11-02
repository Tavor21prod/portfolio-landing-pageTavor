// Renders the page from window.SITE (content.js). No build step, no dependencies.
(function () {
  var S = window.SITE;
  if (!S) { document.body.insertAdjacentHTML('afterbegin', '<p class="mono" style="color:#e53b20;padding:80px 3%">content.js could not be loaded.</p>'); return; }

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var $ = function (id) { return document.getElementById(id); };

  var site = S.site || {};
  var all = S.projects || [];
  var featured = all.filter(function (p) { return p.featured !== false; });
  var topicBySlug = {};
  (S.topics || []).forEach(function (t, i) { topicBySlug[t.slug] = Object.assign({ num: pad(i + 1) }, t); });
  var bySlug = {};
  all.forEach(function (p, i) { bySlug[p.slug] = Object.assign({ num: pad(i + 1) }, p); });

  var name = site.name || '';
  var full = site.fullName || name;
  var surname = full.indexOf(name) === 0 ? full.slice(name.length).trim() : '';
  var roles = (site.roles || []).join(' · ');
  var binds = { name: name, surname: surname, roles: roles, brandSuffix: site.brandSuffix || surname, lede: site.lede || roles, tagline: site.tagline || '', location: site.location, years: site.years, fullName: full };

  document.title = full + (roles ? ' — ' + roles : '');
  document.querySelectorAll('[data-bind]').forEach(function (el) { el.textContent = binds[el.getAttribute('data-bind')] || ''; });

  // Hero collage
  // One word of the opening line is set in the display face (site.ledeAccent in content.js).
  var ledeEl = document.querySelector('.lede');
  if (ledeEl && site.ledeAccent) {
    var plain = site.lede || roles, at = plain.toLowerCase().indexOf(String(site.ledeAccent).toLowerCase());
    if (at > -1) ledeEl.innerHTML = (esc(plain.slice(0, at)) + '<span class="gothic">' + esc(plain.slice(at, at + site.ledeAccent.length)) + '</span>' + esc(plain.slice(at + site.ledeAccent.length))).replace(/&amp; (\S+)/, '<span class="tail"><span class="amp">&amp;</span>$1</span>'); // "&" hangs to the left so the word after it stays centred with the lines above
  }

  $('hero-stills').innerHTML = (S.hero || []).map(function (h) {
    var t = topicBySlug[h.topic];
    var href = t ? 'topic.html?t=' + encodeURIComponent(t.slug) : '#top';
    var cap = t ? t.title : (h.caption || '');
    return '<a class="still s-' + esc(h.slot) + '" data-font="' + esc(t ? t.font || 'gothic' : 'gothic') + '" href="' + esc(href) + '">' +
      '<span class="frame"><img src="' + esc(h.image) + '" alt="' + esc(h.alt) + '"></span>' +
      '<span class="cap mono">' + esc(cap) + '</span></a>';
  }).join('');

  // Oversized name, one glyph at a time
  $('hero-name').innerHTML = '<span class="vh">' + esc(full + ' — ' + roles) + '</span>' +
    name.split('').map(function (l, i) { return '<span class="glyph g' + i + '" aria-hidden="true">' + esc(l) + '</span>'; }).join('');

  if ($('reel')) $('reel').href = site.reelUrl || '#';

  $('statement').innerHTML = (site.statement || []).map(function (s) {
    return s.italic ? '<em>' + esc(s.text) + '</em>' : '<span>' + esc(s.text) + '</span>';
  }).join('');


  // About
  var ab = site.about || {};
  $('about-photo').innerHTML = ab.photo
    ? '<span class="frame"><img src="' + esc(ab.photo) + '" alt="' + esc(ab.photoAlt) + '" loading="lazy"></span>'
    : '<span class="frame ph mono">' + esc(ab.photoCaption || '[Photo]') + '</span>';
  var hw = String(ab.heading || '').split(' ');
  $('about-title').innerHTML = hw.length > 1 ? '<span class="fm">' + esc(hw[0]) + '</span> ' + esc(hw.slice(1).join(' ')) : esc(hw[0]);
  $('about-bio').innerHTML = (ab.bio || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
  $('about-meta').innerHTML = [ab.location ? 'Based in ' + esc(ab.location) : ''].filter(Boolean).join('<br><br>');
  var cta = $('about-cta');
  var chat = (site.social || []).filter(function (s) { return s.label === 'WhatsApp'; })[0];
  cta.href = chat ? chat.url : 'mailto:' + (site.email || '');
  if (chat) { cta.target = '_blank'; cta.rel = 'noopener'; }
  cta.textContent = (ab.cta || 'Say hello') + ' \u2192';


  // Phone carousel of the topic covers: swipe sideways; the centred slide plays its topic's loop clips in turn.
  var flow = $('flow');
  if (flow) {
    var cards = (S.hero || []).map(function (h) {
      var t = topicBySlug[h.topic];
      if (!t) return '';
      var clips = (t.items || []).filter(function (it) { return it.loop; }).map(function (it) { return it.loop; });
      return '<a class="slide" data-font="' + esc(t.font || 'gothic') + '" href="topic.html?t=' + encodeURIComponent(t.slug) + '" aria-label="' + esc(t.title) + '" data-clips="' + esc(JSON.stringify(clips)) + '">' +
        '<img src="' + esc(h.image) + '" alt="' + esc(h.alt) + '">' +
        '<video muted playsinline preload="none" aria-hidden="true"></video>' +
        '<span class="slide-title">' + esc(t.title) + '</span></a>';
    }).filter(Boolean);
    // three copies back to back; scrolling is quietly moved to the middle copy, so the strip never ends
    var per = cards.length, loop = per > 1;
    flow.innerHTML = loop ? cards.concat(cards, cards).join('') : cards.join('');
    var slides = Array.prototype.slice.call(flow.children);
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = -1;
    var stopClips = function (el) {
      var v = el.querySelector('video');
      v.onended = null; v.pause(); v.classList.remove('live'); v.removeAttribute('src'); v.load();
    };
    var startClips = function (el) {
      var clips = JSON.parse(el.getAttribute('data-clips') || '[]');
      if (!clips.length || still) return;
      var v = el.querySelector('video'), n = 0;
      v.preload = 'auto';
      var next = function () {
        v.src = clips[n % clips.length]; n++;
        var p = v.play(); if (p && p.then) p.then(function () { v.classList.add('live'); }).catch(function () {});
      };
      v.onended = next; next();
    };
    var spinning = document.documentElement.classList.contains('intro-run'); // the opening spin runs later in this file
    var settle = function () {
      if (flow.classList.contains('spin')) return;
      if (!flow.offsetParent) { if (current > -1) { stopClips(slides[current]); slides[current].classList.remove('on'); current = -1; } return; }
      var mid = flow.scrollLeft + flow.clientWidth / 2, best = 0, gap = Infinity;
      slides.forEach(function (el, i) {
        var d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
        if (d < gap) { gap = d; best = i; }
      });
      if (best === current) return;
      if (current > -1) { slides[current].classList.remove('on'); stopClips(slides[current]); }
      current = best; slides[best].classList.add('on'); if (!spinning) startClips(slides[best]);
    };
    var tick = 0;
    var wrapTimer = 0;
    var recentre = function () {
      if (spinning || !loop || !flow.offsetParent || current < 0) return;
      var span = slides[per].offsetLeft - slides[0].offsetLeft, shift = current < per ? span : current >= 2 * per ? -span : 0;
      if (!shift) return;
      flow.classList.add('jump');
      slides[current].classList.remove('on'); stopClips(slides[current]);
      flow.style.scrollSnapType = 'none';
      flow.scrollLeft += shift;
      current += shift > 0 ? per : -per;
      slides[current].classList.add('on'); startClips(slides[current]);
      void flow.offsetWidth;
      flow.classList.remove('jump');
      requestAnimationFrame(function () { flow.style.scrollSnapType = ''; });
    };
    flow.addEventListener('scroll', function () {
      cancelAnimationFrame(tick); tick = requestAnimationFrame(settle);
      clearTimeout(wrapTimer); wrapTimer = setTimeout(recentre, 140);
    }, { passive: true });
    if (loop) {
      var home = function () { if (!spinning && flow.offsetParent) { flow.style.scrollSnapType = 'none'; flow.scrollLeft = slides[per].offsetLeft + slides[per].offsetWidth / 2 - flow.clientWidth / 2; requestAnimationFrame(function () { flow.style.scrollSnapType = ''; settle(); }); } };
      slides.forEach(function (el, i) { if (i < per || i >= 2 * per) { el.setAttribute('aria-hidden', 'true'); el.tabIndex = -1; } });
      window.addEventListener('load', home); home();
    }
    window.addEventListener('resize', settle);
    window.addEventListener('load', settle);
    settle();
  }


  // The opening text surfaces out of film grain: an SVG noise mask whose threshold sweeps down, then the filter is dropped.
  var intro = document.querySelector('.intro'), fn = document.getElementById('reveal-fn');
  if (intro && fn && !document.documentElement.classList.contains('intro-run') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var t0 = null, dur = 4400;
    intro.style.filter = 'url(#grain-reveal)';
    fn.setAttribute('intercept', '-14');
    var surface = function (ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 2);
      fn.setAttribute('intercept', String(-14 * (0.85 - e * 0.8)));
      if (p < 1) requestAnimationFrame(surface); else intro.style.filter = '';
    };
    requestAnimationFrame(surface);
  }

  // Wraps every letter of el in its own span (words stay unbroken), hidden until animated, and adds the spans to out.
  var splitLetters = function (el, out) {
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.style.cssText = 'display:inline-block;white-space:nowrap';
          part.split('').forEach(function (ch) {
            var s = document.createElement('span');
            s.textContent = ch; s.style.cssText = 'display:inline-block;opacity:0';
            w.appendChild(s); out.push(s);
          });
          frag.appendChild(w);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1) splitLetters(n, out);
    });
  };

  // The title is a real 3D object: stacked layers give it depth, dragging turns it, a flick spins it fast with a motion blur,
  // and it always comes back to face the visitor.
  // Every layer is split into letters that stay that way, so the opening can raise the same 3D title that later turns.
  function turnable(forOpening) {
    var title = document.querySelector('.lede');
    if (!title) return null;
    var DEPTH = 7, html = title.innerHTML, plain = title.textContent, stage = document.createElement('div'), rows = [];
    stage.className = 't3d';
    title.parentNode.insertBefore(stage, title);
    stage.appendChild(title);
    title.innerHTML = '';
    for (var d = 0; d <= DEPTH; d++) {
      var layer = document.createElement('span'), row = [];
      layer.className = 't3d-layer ' + (d ? 'back' + (d === DEPTH ? ' rear' : '') : 'front');
      layer.setAttribute('aria-hidden', 'true');
      layer.style.transform = 'translateZ(' + (-d * 1.9) + 'px)';
      layer.innerHTML = html;
      splitLetters(layer, row);
      if (!forOpening) row.forEach(function (c) { c.style.opacity = ''; });
      title.appendChild(layer);
      rows.push(row);
    }
    title.setAttribute('role', 'img');
    title.setAttribute('aria-label', plain);
    var scaleY = window.matchMedia('(max-width: 720px)').matches ? ' scaleY(1.42)' : '';
    var REST_Y = -16, REST_X = 7, y = REST_Y, x = REST_X, vy = 0, vx = 0, held = false, lastX = 0, lastY = 0, lastT = 0, raf = 0;
    var paint = function () {
      title.style.transform = 'rotateX(' + x.toFixed(2) + 'deg) rotateY(' + y.toFixed(2) + 'deg)' + scaleY;
      var speed = Math.abs(vy);
      stage.style.filter = speed > 6 ? 'blur(' + Math.min(5, (speed - 6) * 0.12).toFixed(1) + 'px)' : '';
    };
    var tick = function () {
      raf = 0;
      if (held) return;
      var home = REST_Y + Math.round((y - REST_Y) / 360) * 360;
      if (Math.abs(vy) > 2.4) { vy *= 0.975; y += vy; } // still spinning freely
      else { vy += (home - y) * 0.02; vy *= 0.86; y += vy; } // slowed enough: settle facing front
      vx += (REST_X - x) * 0.03; vx *= 0.84; x += vx;
      paint();
      if (Math.abs(home - y) > 0.02 || Math.abs(vy) > 0.02 || Math.abs(REST_X - x) > 0.02) raf = requestAnimationFrame(tick);
    };
    var wake = function () { if (!raf) raf = requestAnimationFrame(tick); };
    stage.addEventListener('pointerdown', function (e) {
      held = true; vy = vx = 0; lastX = e.clientX; lastY = e.clientY; lastT = e.timeStamp;
      stage.classList.add('held');
      if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', function (e) {
      if (!held) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY, dt = Math.max(8, e.timeStamp - lastT);
      y += dx * 0.7; x = Math.max(-40, Math.min(40, x - dy * 0.35));
      vy = vy * 0.5 + (dx * 0.7 / dt) * 16 * 0.5 * 1.8; // keeps the flick's speed for the release
      lastX = e.clientX; lastY = e.clientY; lastT = e.timeStamp;
      paint();
    });
    var letGo = function (e) {
      if (!held) return;
      held = false;
      stage.classList.remove('held');
      if (e.timeStamp - lastT > 90) vy = 0; // held still before letting go: no throw
      vy = Math.max(-46, Math.min(46, vy));
      wake();
    };
    stage.addEventListener('pointerup', letGo);
    stage.addEventListener('pointercancel', letGo);
    paint();
    return rows;
  }

  // Phone opening. "Tavor Production" rises letter by letter in the middle of the screen, drops to its line, and the title rises
  // above it letter by letter, together with the film grain and a slow growth. Then it all settles up into its place and the
  // top bar drops in. Just before it lands, the carousel
  // comes straight up from below while spinning through its slides, fast at first, slowing to a stop on the first slide.
  var root = document.documentElement, armSaid = null;
  var glow = document.querySelector('.flow-glow');
  if (intro && flow && glow && root.classList.contains('intro-run')) {
    var DROP_AT = 1460, DROP = 380, TITLE_AT = 1500, GROW = 2100, GLIDE_AT = 2200, TOTAL = 3100, RISE_AT = TOTAL - 280, RISE = 800, SPIN = 1700, TURNS = 24;
    var lede = intro.querySelector('.lede'), tag = intro.querySelector('.tagline');
    // the grain is a still speckle layer that fades out, which the phone can do cheaply
    var speck = document.createElement('span');
    speck.className = 'speckle';
    intro.appendChild(speck);
    speck.animate([{ opacity: 1 }, { opacity: 1, offset: TITLE_AT / GROW }, { opacity: 0 }], { duration: GROW, easing: 'ease-in', fill: 'both' }).onfinish = function () { speck.remove(); };
    var savedTag = tag.innerHTML, letters = [];
    var rise = function (c, delay) {
      letters.push(c);
      c.animate([{ opacity: 0, transform: 'translateY(.9em)' }, { opacity: 1, transform: 'none' }], { duration: 340, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both', delay: delay });
    };
    var tagChars = [];
    splitLetters(tag, tagChars);
    tagChars.forEach(function (c, i) { rise(c, 40 + i * 24); });
    // the title is in 3D from its first letter: each letter rises in all the layers together
    turnable(true).forEach(function (row) { row.forEach(function (c, i) { rise(c, TITLE_AT + i * 20); }); });

    // "Tavor Production" starts out white and glowing, with a soft light right under it, and calms down to its normal look
    var halo = document.createElement('span');
    halo.style.cssText = 'position:absolute;left:50%;top:115%;width:125%;height:260%;transform:translate(-50%,-50%);background:radial-gradient(ellipse closest-side,rgba(255,255,255,.62) 0,rgba(255,255,255,.34) 35%,rgba(255,255,255,.1) 70%,rgba(255,255,255,0) 100%);filter:blur(8px);z-index:-1;pointer-events:none';
    tag.style.cssText = 'position:relative;z-index:7;color:#fff;text-shadow:0 0 14px rgba(255,255,255,.8),0 0 3px rgba(255,255,255,.9)';
    tag.insertBefore(halo, tag.firstChild);
    halo.animate([{ opacity: 1, offset: 0 }, { opacity: 1, offset: DROP_AT / GLIDE_AT }, { opacity: 0, offset: 1 }], { duration: GLIDE_AT, fill: 'both' });

    var line = document.createRange();
    line.setStartAfter(halo); line.setEnd(tag, tag.childNodes.length);
    var widest = Math.max(215, line.getBoundingClientRect().width); // the title must fit the screen at its biggest
    var box = intro.getBoundingClientRect(), tagBox = tag.getBoundingClientRect();
    var dy = innerHeight / 2 - (box.top + box.height / 2), s1 = Math.min(3, 0.78 * innerWidth / widest);
    var lift = 'translateY(' + ((box.top + box.height / 2) - (tagBox.top + tagBox.height / 2)) + 'px)';
    var drop = tag.animate([
      { transform: lift, offset: 0, easing: 'linear' },
      { transform: lift, offset: DROP_AT / (DROP_AT + DROP), easing: 'cubic-bezier(.65,0,.3,1)' },
      { transform: 'none', offset: 1 }
    ], { duration: DROP_AT + DROP, fill: 'both' });
    var at = function (k) { return 'translateY(' + dy + 'px) scale(' + (s1 * k).toFixed(3) + ')'; };
    var move = intro.animate([
      { transform: at(0.8), offset: 0, easing: 'cubic-bezier(.4,0,.7,1)' },
      { transform: at(1), offset: GROW / TOTAL, easing: 'linear' },
      { transform: at(1), offset: GLIDE_AT / TOTAL, easing: 'cubic-bezier(.65,0,.3,1)' },
      { transform: 'none', offset: 1 }
    ], { duration: TOTAL, fill: 'both' });
    move.onfinish = function () {
      move.cancel(); drop.cancel();
      letters.forEach(function (c) { c.style.opacity = ''; c.getAnimations().forEach(function (a) { a.cancel(); }); });
      tag.innerHTML = savedTag;
      tag.style.cssText = 'color:#fff;text-shadow:0 0 14px rgba(255,255,255,.8),0 0 3px rgba(255,255,255,.9);transition:color 1.2s ease,text-shadow 1.2s ease';
      void tag.offsetWidth;
      tag.style.color = tag.style.textShadow = '';
    };

    // the top bar drops in from above as the title lands
    setTimeout(function () {
      var bar = document.querySelector('.nav');
      var fall = bar.animate([{ opacity: 0, transform: 'translateY(-100%)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });
      root.classList.remove('intro-nav');
      fall.onfinish = function () { fall.cancel(); };
    }, TOTAL - 100);

    setTimeout(function () {
      var begin = null;
      var first = slides[0].offsetWidth / 2 - flow.clientWidth / 2;
      var step = slides[1].offsetLeft - slides[0].offsetLeft;
      var ring = loop ? per : 1;
      flow.classList.add('spin');
      flow.style.scrollSnapType = 'none';
      var pose = function (ms) {
        var p = Math.min(1, ms / SPIN), t = Math.min(1, ms / RISE);
        var rise = t * t * t * (t * (6 * t - 15) + 10), v = Math.pow(1 - p, 2); // rise: gentle start, then fast, soft landing. v: spin speed
        var left = TURNS * Math.pow(1 - p, 3); // slides still to go; the copies are identical, so the strip can wrap while spinning
        if (left < 1.5) flow.classList.remove('spin');
        flow.scrollLeft = slides[0].offsetLeft + first + step * (ring + (left % ring));
        flow.style.transform = 'translateY(' + (60 * (1 - rise)).toFixed(2) + 'vh)';
        flow.style.opacity = String(Math.min(1, t * 8));
        flow.style.filter = v > 0.04 ? 'blur(' + (5 * v).toFixed(1) + 'px)' : '';
        // the light behind the carousel travels with it
        glow.style.transform = flow.style.transform;
        glow.style.opacity = String(rise);
      };
      pose(0);
      root.classList.remove('intro-run');
      var frame = function (ts) {
        if (begin === null) begin = ts;
        var ms = ts - begin;
        pose(ms);
        if (ms < SPIN) { requestAnimationFrame(frame); return; }
        flow.style.transform = flow.style.filter = flow.style.opacity = flow.style.scrollSnapType = '';
        glow.style.transform = glow.style.opacity = '';
        settle();
        spinning = false;
        if (current > -1) startClips(slides[current]);
        if (armSaid) armSaid();
      };
      requestAnimationFrame(frame);
    }, RISE_AT);
  } else {
    root.classList.remove('intro-run', 'intro-nav');
    spinning = false;
    turnable();
  }

  // The statement rises letter by letter from a faint start the first time it scrolls into view.
  var said = $('statement');
  // On phones the words fill the whole space between the carousel and the About section.
  var fitSaid = function () {
    if (!said || !window.matchMedia('(max-width: 720px)').matches) { if (said) said.style.fontSize = said.style.lineHeight = ''; return; }
    var room = Math.round(innerHeight * 0.78);
    said.style.lineHeight = '1.25';
    var size = 46;
    for (; size > 14; size--) {
      said.style.fontSize = size + 'px';
      if (said.scrollWidth <= said.clientWidth + 1 && said.offsetHeight <= room) break;
    }
    var lines = Math.round(said.offsetHeight / (size * 1.25));
    said.style.lineHeight = (room / lines).toFixed(1) + 'px';
  };
  fitSaid();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSaid);
  var lastW = innerWidth;
  window.addEventListener('resize', function () { if (innerWidth !== lastW) { lastW = innerWidth; fitSaid(); } });
  if (said && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var whole = said.innerHTML, chars = [];
    splitLetters(said, chars);
    var seenIt = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      seenIt.disconnect();
      var last = null;
      chars.forEach(function (s, i) {
        last = s.animate([{ opacity: 0.12, transform: 'translateY(.8em)' }, { opacity: 1, transform: 'none' }],
          { duration: 800, delay: i * 16, easing: 'cubic-bezier(.45,0,.4,1)', fill: 'both' });
      });
      if (last) last.onfinish = function () { said.innerHTML = whole; };
    }, { threshold: 0, rootMargin: '0px 0px -35% 0px' });
    chars.forEach(function (s) { s.style.opacity = '.12'; s.style.transform = 'translateY(.8em)'; });
    armSaid = function () { seenIt.observe(said); };
    if (!spinning) armSaid();
  }

  var mail = $('mail');
  mail.href = 'mailto:' + (site.email || '');
  mail.textContent = site.email || '';
  $('social').innerHTML = (site.social || []).map(function (s) {
    return '<a class="u" href="' + esc(s.url) + '">' + esc(s.label) + ' ↗</a>';
  }).join('');
  $('year').textContent = new Date().getFullYear();
})();
