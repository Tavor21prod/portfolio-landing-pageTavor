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
  // item.loop points to a short muted clip (.mp4/.webm), that clip on repeat. A plain item is just a picture.
  var media = function (it, i) {
    var pic = '<img src="' + esc(it.image) + '" alt="' + esc(it.alt) + '"' + (i ? ' loading="lazy"' : '') + '>';
    if (!it.video) return pic;
    var inner = it.loop
      ? '<video src="' + esc(it.loop) + '" poster="' + esc(it.image) + '" muted loop autoplay playsinline preload="metadata"></video>'
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

  var n = $('topic-next');
  if (next && next.slug !== t.slug) {
    n.href = 'topic.html?t=' + encodeURIComponent(next.slug);
    n.innerHTML = '<span class="mono">Next topic</span><span class="topic-next-title">' + esc(next.title) + ' →</span>';
  } else {
    n.style.display = 'none';
  }
})();
