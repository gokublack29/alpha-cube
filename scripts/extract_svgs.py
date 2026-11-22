import xml.etree.ElementTree as ET
import re
import os

os.makedirs('assets', exist_ok=True)

tree = ET.parse('dark-theme.svg')
root = tree.getroot()
paths = [elem for elem in root.iter() if elem.tag.endswith('path')]

def get_bbox(d):
    commands = re.findall(r'([A-Za-z])([^A-Za-z]*)', d)
    pts = []
    curr_x, curr_y = 0.0, 0.0
    for cmd, args in commands:
        nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', args)]
        if cmd in 'Hh':
            for n in nums:
                curr_x = curr_x + n if cmd == 'h' else n
                pts.append((curr_x, curr_y))
        elif cmd in 'Vv':
            for n in nums:
                curr_y = curr_y + n if cmd == 'v' else n
                pts.append((curr_x, curr_y))
        elif cmd.isupper():
            for i in range(0, len(nums), 2):
                if i+1 < len(nums):
                    curr_x, curr_y = nums[i], nums[i+1]
                    pts.append((curr_x, curr_y))
        else: # relative
            for i in range(0, len(nums), 2):
                if i+1 < len(nums):
                    curr_x += nums[i]
                    curr_y += nums[i+1]
                    pts.append((curr_x, curr_y))
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)

def make_svg_from_paths(path_indices, out_path, padding=4):
    all_xs, all_ys = [], []
    collected = []
    for idx in path_indices:
        p = paths[idx]
        d = p.attrib.get('d', '')
        fill = p.attrib.get('fill', 'none')
        stroke = p.attrib.get('stroke', 'none')
        sw = p.attrib.get('stroke-width', '1')
        minx, miny, maxx, maxy = get_bbox(d)
        all_xs.extend([minx, maxx])
        all_ys.extend([miny, maxy])
        collected.append((d, fill, stroke, sw))
    
    min_x = min(all_xs) - padding
    min_y = min(all_ys) - padding
    width = (max(all_xs) - min(all_xs)) + 2 * padding
    height = (max(all_ys) - min(all_ys)) + 2 * padding
    
    svg_lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{min_x} {min_y} {width} {height}" width="100%" height="100%" fill="none">'
    ]
    for d, fill, stroke, sw in collected:
        s_attr = f' stroke="{stroke}" stroke-width="{sw}"' if stroke != 'none' else ''
        svg_lines.append(f'  <path d="{d}" fill="{fill}"{s_attr} />')
    svg_lines.append('</svg>')
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(svg_lines))
    print(f'Wrote {out_path} ({width:.1f}x{height:.1f})')

# Extract arrows
make_svg_from_paths([21], 'assets/arrow-jayadithya.svg')
make_svg_from_paths([22], 'assets/arrow-gurubaravikkram.svg')

# Extract testimonial borders
make_svg_from_paths([10], 'assets/card-border-1.svg')
make_svg_from_paths([14], 'assets/card-border-2.svg')

# Extract starbursts
make_svg_from_paths([28, 29, 30], 'assets/starburst-mail.svg')
make_svg_from_paths([32, 33, 34], 'assets/starburst-call.svg')

# Extract CTA button squiggles
make_svg_from_paths([4, 5], 'assets/btn-squiggly.svg')

# Extract comic banner
make_svg_from_paths([24, 25, 26, 27], 'assets/comic-banner.svg')
