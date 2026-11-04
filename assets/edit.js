// Edit mode: open the site on localhost with ?edit and a panel lists every text of the page as a field.
// Changing a field saves it into content.js through tools/edit-server.py and reloads the page.
(function start() {
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', start); return; }
  var S = window.SITE;
  if (!S) return;
  var q = new URLSearchParams(location.search), slug = q.get('t');
  var fields = [];
  var add = function (group, label, path, value) { if (typeof value === 'string') fields.push({ group: group, label: label, path: path, value: value }); };
  var site = S.site || {};
  if (!slug) {
    add('Title', 'Big title', ['site', 'lede'], site.lede);
    add('Title', 'Title word in gothic', ['site', 'ledeAccent'], site.ledeAccent);
    add('Title', 'Line under the title', ['site', 'tagline'], site.tagline);
    (site.statement || []).forEach(function (p, i) { add('Statement', 'Part ' + (i + 1), ['site', 'statement', i, 'text'], p.text); });
    var ab = site.about || {};
    add('Statement', 'Name line', ['site', 'about', 'heading'], ab.heading);
    add('Contact', 'Contact line', ['site', 'contactLine'], site.contactLine);
  }
  (S.topics || []).forEach(function (t, i) {
    if (slug && t.slug !== slug) return;
    add('Topic: ' + (t.title || t.slug), 'Title', ['topics', i, 'title'], t.title);
    add('Topic: ' + (t.title || t.slug), 'Short text', ['topics', i, 'blurb'], t.blurb);
  });

  var css = document.createElement('style');
  css.textContent = '.ed-btn{position:fixed;right:12px;bottom:12px;z-index:99999;font:700 12px/1 system-ui;letter-spacing:.08em;background:#f6d84c;color:#111;border:0;border-radius:99px;padding:12px 16px;box-shadow:0 4px 18px rgba(0,0,0,.5)}'
    + '.ed-panel{position:fixed;left:0;right:0;bottom:0;max-height:62vh;overflow:auto;z-index:99998;background:#16161a;color:#eee;font:14px/1.4 system-ui;padding:14px 14px 70px;border-top:1px solid #444;box-shadow:0 -10px 30px rgba(0,0,0,.6);display:none}'
    + '.ed-panel.open{display:block}.ed-panel h4{margin:16px 0 6px;font:700 11px system-ui;letter-spacing:.12em;text-transform:uppercase;color:#f6d84c}'
    + '.ed-panel label{display:block;font-size:11px;color:#999;margin:8px 0 3px}.ed-panel textarea{width:100%;box-sizing:border-box;background:#0d0d10;color:#fff;border:1px solid #444;border-radius:8px;padding:9px;font:15px/1.4 system-ui;resize:vertical;min-height:40px}'
    + '.ed-msg{position:fixed;left:12px;bottom:14px;z-index:99999;font:700 12px system-ui;color:#111;background:#9be28b;border-radius:99px;padding:9px 14px;opacity:0;transition:opacity .25s}.ed-msg.on{opacity:1}.ed-msg.bad{background:#ff8a80}';
  document.head.appendChild(css);

  var btn = document.createElement('button'), panel = document.createElement('div'), msg = document.createElement('div');
  btn.className = 'ed-btn'; btn.textContent = 'EDIT'; panel.className = 'ed-panel'; msg.className = 'ed-msg';
  var open = sessionStorage.getItem('edOpen') === '1';
  if (open) panel.classList.add('open');
  btn.onclick = function () { panel.classList.toggle('open'); sessionStorage.setItem('edOpen', panel.classList.contains('open') ? '1' : '0'); };
  var last = '';
  fields.forEach(function (f) {
    if (f.group !== last) { var h = document.createElement('h4'); h.textContent = f.group; panel.appendChild(h); last = f.group; }
    var l = document.createElement('label'), ta = document.createElement('textarea');
    l.textContent = f.label; ta.value = f.value; ta.rows = Math.max(1, Math.ceil(f.value.length / 38));
    ta.onchange = function () {
      fetch('/__save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path: f.path, value: ta.value }) })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (!r.ok) throw new Error(r.error || 'save failed');
          msg.textContent = 'Saved'; msg.className = 'ed-msg on';
          sessionStorage.setItem('edScroll', String(scrollY));
          setTimeout(function () { location.reload(); }, 350);
        })
        .catch(function (e) { msg.textContent = 'Not saved: ' + e.message; msg.className = 'ed-msg on bad'; });
    };
    panel.appendChild(l); panel.appendChild(ta);
  });
  document.body.appendChild(panel); document.body.appendChild(btn); document.body.appendChild(msg);
  var y = sessionStorage.getItem('edScroll');
  if (y) { sessionStorage.removeItem('edScroll'); addEventListener('load', function () { setTimeout(function () { scrollTo(0, +y); }, 400); }); }
})();
