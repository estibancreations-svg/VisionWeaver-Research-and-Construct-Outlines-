import sys, json, base64
d = json.load(sys.stdin)
for c in d['result']['content']:
    if 'resource' in c:
        sys.stdout.write(c['resource'].get('text', ''))
        sys.exit()
    t = c.get('text', '')
    try:
        j = json.loads(t)
        if isinstance(j, dict) and j.get('encoding') == 'base64':
            sys.stdout.write(base64.b64decode(j['content']).decode('utf-8', 'replace')); sys.exit()
        if isinstance(j, list):
            print('\n'.join(x['name'] for x in j)); sys.exit()
    except Exception:
        pass
    if t and not t.startswith('successfully downloaded'):
        sys.stdout.write(t); sys.exit()
