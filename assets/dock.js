// The contact icons: each platform is a 3D icon that rises and spins in when it scrolls into view, then can be dragged or
// flicked around. A tap (not a drag) opens the link. Used on the home page (big) and under the carousels (small).
(function () {
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
  window.makeDock = function (dock, site) {
    if (!dock) return;
  // Each platform is a big 3D icon: it rises and spins in when the section scrolls into view, then can be dragged or flicked
  // around like the title. A tap (not a drag) opens the link.
  var MARKS = {
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path transform="translate(12 12) scale(1.55) translate(-11.73 -11.27)" d="M9.2 8.4c-.4.4-.6 1.1-.3 1.9.6 1.6 1.9 3 3.5 3.7.8.3 1.4.1 1.8-.3l.5-.7-1.7-.9-.7.7c-.8-.3-1.6-1-2-1.9l.6-.7-.7-1.8z" fill="currentColor" stroke="none"/>',
    gmail: '<rect x="3" y="5.2" width="18" height="13.6" rx="2.2"/><path d="M3.6 6.6 12 13l8.4-6.4"/>',
    instagram: '<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/>',
    tiktok: '<g transform="translate(12 12) scale(1.22) translate(-12.4 -10.7)"><path d="M13.6 3.5v11a3.4 3.4 0 1 1-3.4-3.4"/><path d="M13.6 3.5c.3 2.4 1.9 4 4.4 4.2"/></g>'
  };
  var TINT = { whatsapp: '#1f8f4d', instagram: '#b8326b', tiktok: '#1aa3a8', gmail: '#c0392b' };
  var places = (site.social || []).concat([{ label: 'Gmail', url: 'mailto:' + (site.email || '') }]);
  dock.classList.add('dock');
  dock.innerHTML = places.map(function (s) {
    var key = String(s.label).toLowerCase().replace(/[^a-z]/g, '');
    var mark = MARKS[key];
    if (!mark) return '<a class="u" href="' + esc(s.url) + '">' + esc(s.label) + ' ↗</a>';
    var layers = '';
    for (var d = 0; d <= 6; d++) {
      layers += '<svg class="i3-layer' + (d ? ' back' : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (d ? 1.7 : 1.5) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="transform:translateZ(' + (-d * 2.4) + 'px);' + (d ? 'color:' + TINT[key] + ';opacity:' + (1 - d * 0.1).toFixed(2) : '') + '">' + mark + '</svg>';
    }
    return '<a class="icon3d" href="' + esc(s.url) + '"' + (/^mailto:/.test(s.url) ? '' : ' target="_blank" rel="noopener"') + ' aria-label="' + esc(s.label) + '"><span class="i3"><span class="i3-body">' + layers + '</span></span><span class="i3-name mono">' + esc(s.label) + '</span></a>';
  }).join('');
  var rest = function (n) { return -18 + n * 8; };
  Array.prototype.forEach.call(dock.querySelectorAll('.icon3d'), function (link, n) {
    var wrap = link.querySelector('.i3'), body = link.querySelector('.i3-body');
    var y = rest(n), x = 6, vy = 0, vx = 0, held = false, moved = 0, sx = 0, sy = 0, lx = 0, lt = 0, raf = 0, shown = false;
    var paint = function () {
      body.style.transform = 'rotateX(' + x.toFixed(1) + 'deg) rotateY(' + y.toFixed(1) + 'deg)';
      var sp = Math.abs(vy);
      wrap.style.filter = shown && sp > 7 ? 'blur(' + Math.min(4, (sp - 7) * 0.12).toFixed(1) + 'px)' : '';
    };
    var tick = function () {
      raf = 0;
      if (held) return;
      var home = rest(n) + Math.round((y - rest(n)) / 360) * 360;
      if (Math.abs(vy) > 2.4) { vy *= 0.975; y += vy; } else { vy += (home - y) * 0.02; vy *= 0.86; y += vy; }
      vx += (6 - x) * 0.03; vx *= 0.84; x += vx;
      paint();
      if (Math.abs(home - y) > 0.02 || Math.abs(vy) > 0.02 || Math.abs(6 - x) > 0.02) raf = requestAnimationFrame(tick);
    };
    var wake = function () { if (!raf) raf = requestAnimationFrame(tick); };
    wrap.addEventListener('pointerdown', function (e) {
      held = true; moved = 0; vy = vx = 0; sx = lx = e.clientX; sy = e.clientY; lt = e.timeStamp;
      if (wrap.setPointerCapture) wrap.setPointerCapture(e.pointerId);
    });
    wrap.addEventListener('pointermove', function (e) {
      if (!held) return;
      var dx = e.clientX - lx, dt = Math.max(8, e.timeStamp - lt);
      moved = Math.max(moved, Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy));
      y += dx * 0.8; vy = vy * 0.5 + (dx * 0.8 / dt) * 16 * 0.9; lx = e.clientX; lt = e.timeStamp;
      paint();
    });
    var letGo = function (e) {
      if (!held) return;
      held = false;
      if (e.timeStamp - lt > 90) vy = 0;
      vy = Math.max(-46, Math.min(46, vy));
      wake();
    };
    wrap.addEventListener('pointerup', letGo);
    wrap.addEventListener('pointercancel', letGo);
    link.addEventListener('click', function (e) { if (moved > 8) e.preventDefault(); });
    link.addEventListener('dragstart', function (e) { e.preventDefault(); });
    paint();
    link._enter = function (delay) {
      shown = true;
      var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (calm) { link.style.opacity = 1; return; }
      var from = rest(n) + 1080 * (n % 2 ? -1 : 1);
      body.style.transform = 'rotateX(6deg) rotateY(' + rest(n) + 'deg)';
      link.animate([{ opacity: 0, transform: 'translateY(90px)' }, { opacity: 1, transform: 'none' }], { duration: 1100, delay: delay, easing: 'cubic-bezier(.16,.8,.2,1)', fill: 'both' });
      wrap.animate([{ filter: 'blur(7px)' }, { filter: 'blur(0px)' }], { duration: 1300, delay: delay, easing: 'ease-out', fill: 'both' });
      var spin = body.animate([{ transform: 'rotateX(6deg) rotateY(' + from + 'deg)' }, { transform: 'rotateX(6deg) rotateY(' + rest(n) + 'deg)' }], { duration: 1700, delay: delay, easing: 'cubic-bezier(.08,.7,.15,1)', fill: 'both' });
      spin.onfinish = function () { spin.cancel(); paint(); };
      setTimeout(function () { wrap.classList.add('float'); }, delay + 1500); // a gentle drift once it has settled
    };
    wrap.style.setProperty('--drift', (3.8 + n * 0.45).toFixed(2) + 's');
    wrap.style.setProperty('--lag', (-n * 0.9).toFixed(1) + 's');
    if (!('IntersectionObserver' in window)) link._enter(0);
    else link.style.opacity = '0';
  });
  if ('IntersectionObserver' in window) {
    var seenDock = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      seenDock.disconnect();
      Array.prototype.forEach.call(dock.querySelectorAll('.icon3d'), function (link, n) { link._enter(n * 170); });
    }, { threshold: 0.25 });
    seenDock.observe(dock);
  }
  };
})();
