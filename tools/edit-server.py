# Local edit server for the portfolio. Serves the site and saves text edits made in ?edit mode back into content.js.
# Listens on 127.0.0.1 only; only ever writes content.js. Run from anywhere: python3 tools/edit-server.py
import json, os, re, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, 'content.js')
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5174
SHAPE = re.compile(r'^(.*?window\.SITE\s*=\s*)(\{.*\})(\s*;?\s*)$', re.S)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def _reply(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != '/__save':
            return self._reply(404, {'ok': False})
        try:
            req = json.loads(self.rfile.read(int(self.headers.get('Content-Length', 0))))
            path, value = req['path'], req['value']
            if not isinstance(value, str) or not isinstance(path, list) or not path:
                raise ValueError('bad request')
            text = open(CONTENT, encoding='utf-8').read()
            m = SHAPE.match(text)
            data = json.loads(m.group(2))
            node = data
            for key in path[:-1]:
                node = node[key]          # only existing keys: the editor never creates structure
            if not isinstance(node[path[-1]], str):
                raise ValueError('not a text field')
            node[path[-1]] = value
            out = m.group(1) + json.dumps(data, indent=2, ensure_ascii=False) + m.group(3)
            tmp = CONTENT + '.tmp'
            open(tmp, 'w', encoding='utf-8').write(out)
            os.replace(tmp, CONTENT)
            self._reply(200, {'ok': True})
        except Exception as e:
            self._reply(400, {'ok': False, 'error': str(e)})

    def log_message(self, *a):
        pass


if __name__ == '__main__':
    print('Edit server: http://127.0.0.1:%d/index.html?edit' % PORT)
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
