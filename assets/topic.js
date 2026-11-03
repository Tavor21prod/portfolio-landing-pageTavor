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
  document.body.setAttribute('data-font', t.font || 'gothic');
  var next = topics[(at + 1) % topics.length];
  document.title = t.title + ' — ' + full;
  $('topic-label').textContent = '(Topic ' + pad(at + 1) + ' / ' + pad(topics.length) + ')';
  $('topic-title').textContent = t.title;
  $('topic-blurb').textContent = t.blurb || '';

  // A video item opens on YouTube/Vimeo in a new tab. It shows a poster picture (item.image) or, if
  // item.loop points to a short muted clip (.mp4/.webm), that clip: still showing the
  // poster picture, playing on repeat only while the pointer is over it.
  // In a "feature" layout, an item with feature:true is a tall tile in the middle column.
  var media = function (it, i) {
    var pic = '<img src="' + esc(it.image) + '" alt="' + esc(it.alt) + '"' + (i && !t.carousel ? ' loading="lazy"' : '') + '>';
    if (!it.video) return pic;
    var inner = it.loop
      ? pic.replace('<img ', '<img class="rest" ') + '<video class="clip" src="' + esc(it.loop) + '" muted loop playsinline preload="none"></video>'
      : pic;
    return '<a class="vid" href="' + esc(it.video) + '"' + (it.ratio ? ' data-ratio="' + esc(it.ratio) + '"' : '') + ' target="_blank" rel="noopener" aria-label="' + esc('Watch ' + (it.caption || it.alt || 'video') + ' on YouTube') + '">' +
      inner + '<span class="play" aria-hidden="true"></span></a>';
  };

  if (t.layout) $('topic-grid').classList.add(t.layout);
  var items = t.items || [];
  var tail = -1; // in a feature layout, the last ordinary tile sits under the tall one
  items.forEach(function (it, i) { if (!it.feature) tail = i; });
  var tile = function (it, i) {
    return '<figure class="shot t' + (i % 4) + (it.feature ? ' feat' : '') + (t.layout === 'feature' && i === tail ? ' tail' : '') + '">' +
      '<span class="frame">' + media(it, i) + '</span>' +
      (it.caption ? '<figcaption class="mono">' + esc(it.caption) + '</figcaption>' : '') +
      '</figure>';
  };
  var main = '', side = '';
  items.forEach(function (it, i) { if (t.layout === 'feature' && (it.feature || i === tail)) side += tile(it, i); else main += tile(it, i); });
  // the tall tile goes first in the side column, the ordinary one under it
  if (t.layout === 'feature') {
    var tall = '', low = '';
    items.forEach(function (it, i) { if (it.feature) tall += tile(it, i); else if (i === tail) low += tile(it, i); });
    side = tall + low;
    main += '<div class="stack">' + side + '</div>';
  }
  // On phones a "carousel" topic becomes a swipeable strip that never ends: three copies of the tiles
  // back to back, with the scroll quietly moved back to the middle copy. The copies are hidden on wider screens.
  // a closing tile that links out to a profile (t.more), shown after the videos
  if (t.more) {
    main += '<figure class="shot more"><span class="frame"><a class="more-card" href="' + esc(t.more.href) + '" target="_blank" rel="noopener" aria-label="' + esc(t.more.eyebrow + ' ' + t.more.name + ' ' + t.more.handle) + '">' +
      (t.more.image ? '<img class="more-pic" src="' + esc(t.more.image) + '" alt="">' : '') +
      '<span class="more-eyebrow mono">' + esc(t.more.eyebrow) + '</span><span class="more-name">' + esc(t.more.name) + '</span><span class="more-handle mono">' + esc(t.more.handle) + ' \u2197</span></a></span></figure>';
  }
  var per = items.length + (t.more ? 1 : 0), ring = !!t.carousel && per > 1;
  if (ring) {
    $('topic-grid').classList.add('carousel');
    var again = main.replace(/class="shot /g, 'class="shot copy ').replace(/<a class="(vid|more-card)"/g, '<a class="$1" tabindex="-1" aria-hidden="true"');
    main = main + again + again;
    var around = document.createElement('div');
    around.className = 'carousel-wrap';
    around.innerHTML = '<div class="flow-glow" aria-hidden="true"></div>';
    $('topic-grid').parentNode.insertBefore(around, $('topic-grid'));
    around.appendChild($('topic-grid'));
  }
  $('topic-grid').innerHTML = main;

  // Loop clips play while hovered or focused and rewind on leave. On touch screens, which can't hover,
  // they play while they are mostly in view instead.
  var play = function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
  var stop = function (v) { v.pause(); v.currentTime = 0; v.classList.remove('on'); };
  var canHover = window.matchMedia('(hover: hover)').matches;
  var seen = !canHover && 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.isIntersecting ? play(e.target) : stop(e.target); });
  }, { threshold: 0.6 }) : null;
  document.querySelectorAll('.vid video').forEach(function (v) {
    var a = v.parentNode;
    v.addEventListener('playing', function () { v.classList.add('on'); });
    a.addEventListener('mouseenter', function () { play(v); });
    a.addEventListener('mouseleave', function () { stop(v); });
    a.addEventListener('focus', function () { play(v); });
    a.addEventListener('blur', function () { stop(v); });
    if (seen) seen.observe(v);
  });

  if (ring) {
    var strip = $('topic-grid'), cards = Array.prototype.slice.call(strip.children), at0 = -1, settleT = 0, wrapT = 0;
    var live = function () { return strip.offsetParent && strip.scrollWidth > strip.clientWidth + 4; };
    var settle = function () {
      if (!live()) return;
      var mid = strip.scrollLeft + strip.clientWidth / 2, best = 0, gap = Infinity;
      cards.forEach(function (el, i) { var d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid); if (d < gap) { gap = d; best = i; } });
      if (best === at0) return;
      var v;
      if (at0 > -1) { cards[at0].classList.remove('on'); v = cards[at0].querySelector('video'); if (v) stop(v); }
      at0 = best; cards[best].classList.add('on');
      v = cards[best].querySelector('video'); if (v) play(v);
    };
    var snapOff = function (fn) { strip.style.scrollSnapType = 'none'; fn(); requestAnimationFrame(function () { strip.style.scrollSnapType = ''; settle(); }); };
    var recentre = function () {
      if (!live() || at0 < 0) return;
      var span = cards[per].offsetLeft - cards[0].offsetLeft, shift = at0 < per ? span : at0 >= 2 * per ? -span : 0;
      if (!shift) return;
      snapOff(function () { cards[at0].classList.remove('on'); at0 = -1; strip.scrollLeft += shift; });
    };
    var home = function () { if (live()) snapOff(function () { strip.scrollLeft = cards[per].offsetLeft + cards[per].offsetWidth / 2 - strip.clientWidth / 2; }); };
    strip.addEventListener('scroll', function () {
      cancelAnimationFrame(settleT); settleT = requestAnimationFrame(settle);
      clearTimeout(wrapT); wrapT = setTimeout(recentre, 140);
    }, { passive: true });
    window.addEventListener('resize', function () { at0 = -1; home(); });
    window.addEventListener('load', home);
    home();
  }

  // A video opens in a player on top of this page instead of sending the visitor to YouTube.
  // (Anything that is not a YouTube link keeps its normal behaviour.)
  var ytId = function (url) { var m = /(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?(?:.*&)?v=))([\w-]{11})/.exec(url); return m && m[1]; };
  var shut = null;
  var openPlayer = function (url, ratio, opener) {
    var id = ytId(url);
    if (!id) return false;
    var tall = ratio ? ratio === '9/16' : /\/shorts\//.test(url);
    var box = document.createElement('div');
    box.className = 'player';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Video player');
    box.innerHTML = '<div class="player-frame' + (tall ? ' tall' : '') + '"><iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1&modestbranding=1" title="Video" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>' +
      '<button class="player-close mono" type="button" aria-label="Close video">Close \u2715</button>';
    document.body.appendChild(box);
    document.documentElement.classList.add('player-open');
    var close = box.querySelector('.player-close');
    shut = function () {
      box.remove();
      document.documentElement.classList.remove('player-open');
      document.removeEventListener('keydown', onKey);
      shut = null;
      if (opener && opener.focus) opener.focus();
    };
    var onKey = function (e) { if (e.key === 'Escape') shut(); };
    document.addEventListener('keydown', onKey);
    box.addEventListener('click', function (e) { if (e.target === box || e.target === close) shut(); });
    close.focus();
    return true;
  };
  $('topic-grid').addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.vid');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (openPlayer(a.getAttribute('href'), a.getAttribute('data-ratio'), a)) e.preventDefault();
  });

  var n = $('topic-next');
  if (next && next.slug !== t.slug) {
    n.href = 'topic.html?t=' + encodeURIComponent(next.slug);
    n.innerHTML = '<span class="mono">Next topic</span><span class="topic-next-title">' + esc(next.title) + ' →</span>';
  } else {
    n.style.display = 'none';
  }
})();
