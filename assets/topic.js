// Renders one topic page from window.SITE (content.js). The topic comes from ?t=<slug>.
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
  var name = site.name || '';
  var full = site.fullName || name;
  var surname = full.indexOf(name) === 0 ? full.slice(name.length).trim() : '';
  var roles = (site.roles || []).join(' · ');
  var binds = { name: name, brandSuffix: site.brandSuffix || surname, roles: roles };
  document.querySelectorAll('[data-bind]').forEach(function (el) { el.textContent = binds[el.getAttribute('data-bind')] || ''; });

  var topics = S.topics || [];
  var slug = new URLSearchParams(location.search).get('t');
  var at = topics.findIndex(function (t) { return t.slug === slug; });

  if (at < 0) {
    document.title = 'Topic not found — ' + full;
    $('topic-label').textContent = '(Topic)';
    $('topic-title').textContent = 'Not found';
    $('topic-blurb').textContent = 'This topic does not exist (yet).';
    $('topic-next').style.display = 'none';
    return;
  }

  var t = topics[at];
  var next = topics[(at + 1) % topics.length];
  document.title = t.title + ' — ' + full;
  $('topic-label').textContent = '(Topic ' + pad(at + 1) + ' / ' + pad(topics.length) + ')';
  $('topic-title').textContent = t.title;
  $('topic-blurb').textContent = t.blurb || '';

  // A video item opens on YouTube/Vimeo in a new tab. It shows a poster picture (item.image) or, if
  // item.loop points to a short muted clip (.mp4/.webm), that clip: still showing the
  // poster picture, playing on repeat only while the pointer is over it. fit:"contain" shows a clip whose
  // shape differs from the tile (e.g. vertical) whole, with the poster's blurred sides filling the rest.
  var media = function (it, i) {
    var pic = '<img src="' + esc(it.image) + '" alt="' + esc(it.alt) + '"' + (i ? ' loading="lazy"' : '') + '>';
    if (!it.video) return pic;
    var inner = it.loop
      ? '<video src="' + esc(it.loop) + '" poster="' + esc(it.image) + '"' +
        (it.fit === 'contain' ? ' class="contain" style="background:url(' + esc(it.image) + ') center/cover"' : '') +
        ' muted loop playsinline preload="auto"></video>'
      : pic;
    return '<a class="vid" href="' + esc(it.video) + '" target="_blank" rel="noopener" aria-label="' + esc('Watch ' + (it.caption || it.alt || 'video') + ' on YouTube') + '">' +
      inner + '<span class="play" aria-hidden="true"></span></a>';
  };

  if (t.layout) $('topic-grid').classList.add(t.layout);
  $('topic-grid').innerHTML = (t.items || []).map(function (it, i) {
    return '<figure class="shot t' + (i % 4) + '">' +
      '<span class="frame">' + media(it, i) + '</span>' +
      (it.caption ? '<figcaption class="mono">' + esc(it.caption) + '</figcaption>' : '') +
      '</figure>';
  }).join('');

  // Loop clips play while hovered or focused and rewind on leave. On touch screens, which can't hover,
  // they play while they are mostly in view instead.
  var play = function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
  var stop = function (v) { v.pause(); v.currentTime = 0; };
  var canHover = window.matchMedia('(hover: hover)').matches;
  var seen = !canHover && 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.isIntersecting ? play(e.target) : stop(e.target); });
  }, { threshold: 0.6 }) : null;
  document.querySelectorAll('.vid video').forEach(function (v) {
    var a = v.parentNode;
    a.addEventListener('mouseenter', function () { play(v); });
    a.addEventListener('mouseleave', function () { stop(v); });
    a.addEventListener('focus', function () { play(v); });
    a.addEventListener('blur', function () { stop(v); });
    if (seen) seen.observe(v);
  });

  var n = $('topic-next');
  if (next && next.slug !== t.slug) {
    n.href = 'topic.html?t=' + encodeURIComponent(next.slug);
    n.innerHTML = '<span class="mono">Next topic</span><span class="topic-next-title">' + esc(next.title) + ' →</span>';
  } else {
    n.style.display = 'none';
  }
})();
