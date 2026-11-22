import os
import re

html = open('index.html', encoding='utf-8').read()
css = open('style.css', encoding='utf-8').read()
js = open('script.js', encoding='utf-8').read()

print(f"HTML length: {len(html)} bytes")
print(f"CSS length: {len(css)} bytes")
print(f"JS length: {len(js)} bytes")

# Check for banned github star button
assert 'star on github' not in html.lower(), "Found 'star on github' button!"
print("Checked: No GitHub star button found.")

# Check all image paths exist
img_srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
for src in set(img_srcs):
    if not src.startswith(('http', 'data:')):
        clean_src = src.split('?')[0].split('#')[0]
        assert os.path.exists(clean_src), f"Missing asset: {clean_src}"
        print(f"Asset verified on disk: {clean_src}")

print("All asset and content checks passed cleanly!")
