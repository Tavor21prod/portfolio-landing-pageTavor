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
    var href = t ? 'topic.html?t=' + encodeURIComponent(t.slug) : '#work';
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
  $('about-meta').innerHTML = [ab.location ? 'Based in ' + esc(ab.location) : '', ab.available ? 'Available for<br>' + esc(ab.available) : ''].filter(Boolean).join('<br><br>');
  var cta = $('about-cta');
  cta.href = 'mailto:' + (site.email || '');
  cta.textContent = (ab.cta || 'Say hello') + ' \u2192';

  // Work grid — 6-slot editorial pattern repeats for any number of projects
  $('count').textContent = '(' + pad(featured.length) + ')';
  $('grid').innerHTML = featured.map(function (p, i) {
    return '<a class="card p' + (i % 6) + '" href="' + esc(p.href || '#' + p.slug) + '">' +
      '<span class="frame"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt) + '" loading="lazy"></span>' +
      '<div class="cap"><span class="num mono">' + bySlug[p.slug].num + '</span><h3 class="title">' + esc(p.title) + '</h3></div>' +
      '<div class="meta mono"><span>' + esc(p.client) + '</span><span>' + esc(p.role) + '</span><span>' + esc(p.year) + '</span></div></a>';
  }).join('');


  // Phone carousel of the topic covers: swipe sideways; the centred slide plays its topic's loop clips in turn.
  var flow = $('flow');
  if (flow) {
    flow.innerHTML = (S.hero || []).map(function (h) {
      var t = topicBySlug[h.topic];
      if (!t) return '';
      var clips = (t.items || []).filter(function (it) { return it.loop; }).map(function (it) { return it.loop; });
      return '<a class="slide" data-font="' + esc(t.font || 'gothic') + '" href="topic.html?t=' + encodeURIComponent(t.slug) + '" aria-label="' + esc(t.title) + '" data-clips="' + esc(JSON.stringify(clips)) + '">' +
        '<img src="' + esc(h.image) + '" alt="' + esc(h.alt) + '">' +
        '<video muted playsinline preload="none" aria-hidden="true"></video>' +
        '<span class="slide-title">' + esc(t.title) + '</span></a>';
    }).join('');
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
      var next = function () {
        v.src = clips[n % clips.length]; n++;
        var p = v.play(); if (p && p.then) p.then(function () { v.classList.add('live'); }).catch(function () {});
      };
      v.onended = next; next();
    };
    var settle = function () {
      if (!flow.offsetParent) { if (current > -1) { stopClips(slides[current]); slides[current].classList.remove('on'); current = -1; } return; }
      var mid = flow.scrollLeft + flow.clientWidth / 2, best = 0, gap = Infinity;
      slides.forEach(function (el, i) {
        var d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
        if (d < gap) { gap = d; best = i; }
      });
      if (best === current) return;
      if (current > -1) { slides[current].classList.remove('on'); stopClips(slides[current]); }
      current = best; slides[best].classList.add('on'); startClips(slides[best]);
    };
    var tick = 0;
    flow.addEventListener('scroll', function () { cancelAnimationFrame(tick); tick = requestAnimationFrame(settle); }, { passive: true });
    window.addEventListener('resize', settle);
    window.addEventListener('load', settle);
    settle();
  }


  // The opening text surfaces out of film grain: an SVG noise mask whose threshold sweeps down, then the filter is dropped.
  var intro = document.querySelector('.intro'), fn = document.getElementById('reveal-fn');
  if (intro && fn && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

  var mail = $('mail');
  mail.href = 'mailto:' + (site.email || '');
  mail.textContent = site.email || '';
  $('social').innerHTML = (site.social || []).map(function (s) {
    return '<a class="u" href="' + esc(s.url) + '">' + esc(s.label) + ' ↗</a>';
  }).join('');
  $('year').textContent = new Date().getFullYear();
})();
