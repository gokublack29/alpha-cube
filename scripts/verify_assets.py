import re
import os

with open('index.html', encoding='utf-8') as f:
    html = f.read()

refs = re.findall(r'(?:src|href)="([^"]+)"', html)
print(f"Total attributes scanned: {len(refs)}")

missing = []
for r in refs:
    if r.startswith('http') or r.startswith('#') or r.startswith('mailto:') or r.startswith('tel:'):
        continue
    clean_r = r.split('?')[0].split('#')[0]
    if not os.path.exists(clean_r):
        missing.append(r)
    else:
        print(f"OK: {clean_r} ({os.path.getsize(clean_r)} bytes)")

# Also check dynamic references in script.js
with open('script.js', encoding='utf-8') as f:
    js = f.read()
js_refs = re.findall(r"'assets/[^']+'", js)
for r in js_refs:
    clean_r = r.strip("'")
    if not os.path.exists(clean_r):
        missing.append(clean_r)
    else:
        print(f"OK (JS): {clean_r} ({os.path.getsize(clean_r)} bytes)")

if missing:
    print(f"MISSING: {missing}")
    exit(1)
else:
    print("ALL ASSETS VERIFIED SUCCESSFULLY!")
