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
  $('hero-stills').innerHTML = (S.hero || []).map(function (h) {
    var t = topicBySlug[h.topic];
    var href = t ? 'topic.html?t=' + encodeURIComponent(t.slug) : '#work';
    var cap = t ? t.num + ' — ' + t.title : (h.caption || '');
    return '<a class="still s-' + esc(h.slot) + '" href="' + esc(href) + '">' +
      '<span class="frame"><img src="' + esc(h.image) + '" alt="' + esc(h.alt) + '"></span>' +
      '<span class="cap mono">' + esc(cap) + '</span></a>';
  }).join('');

  // Oversized name, one glyph at a time
  $('hero-name').innerHTML = '<span class="vh">' + esc(full + ' — ' + roles) + '</span>' +
    name.split('').map(function (l, i) { return '<span class="glyph g' + i + '" aria-hidden="true">' + esc(l) + '</span>'; }).join('');

  $('reel').href = site.reelUrl || '#';

  $('statement').innerHTML = (site.statement || []).map(function (s) {
    return s.italic ? '<em>' + esc(s.text) + '</em>' : '<span>' + esc(s.text) + '</span>';
  }).join('');

  // Work grid — 6-slot editorial pattern repeats for any number of projects
  $('count').textContent = '(' + pad(featured.length) + ')';
  $('grid').innerHTML = featured.map(function (p, i) {
    return '<a class="card p' + (i % 6) + '" href="' + esc(p.href || '#' + p.slug) + '">' +
      '<span class="frame"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt) + '" loading="lazy"></span>' +
      '<div class="cap"><span class="num mono">' + bySlug[p.slug].num + '</span><h3 class="title">' + esc(p.title) + '</h3></div>' +
      '<div class="meta mono"><span>' + esc(p.client) + '</span><span>' + esc(p.role) + '</span><span>' + esc(p.year) + '</span></div></a>';
  }).join('');

  var mail = $('mail');
  mail.href = 'mailto:' + (site.email || '');
  mail.textContent = site.email || '';
  $('social').innerHTML = (site.social || []).map(function (s) {
    return '<a class="u" href="' + esc(s.url) + '">' + esc(s.label) + ' ↗</a>';
  }).join('');
  $('year').textContent = new Date().getFullYear();
})();
