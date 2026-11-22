import xml.etree.ElementTree as ET
import re

tree = ET.parse('dark-theme.svg')
root = tree.getroot()

print("=== TEAM ELEMENTS (2400 <= y < 3400) ===")
for elem in root.iter():
    d = elem.attrib.get('d')
    y = elem.attrib.get('y')
    tag = elem.tag.split('}')[-1]
    if y is not None and 2400 <= float(y) < 3400:
        print(f"rect: x={elem.attrib.get('x')}, y={y}, w={elem.attrib.get('width')}, h={elem.attrib.get('height')}, fill={elem.attrib.get('fill')}")
    elif d:
        ys = [float(v) for v in re.findall(r'[-+]?(?:\d*\ .d+|\d+)', d)[1::2]]
        xs = [float(v) for v in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', d)[0::2]]
        if ys and 2400 <= min(ys) < 3400:
            print(f"path: minx={min(xs):.1f}, maxx={max(xs):.1f}, miny={min(ys):.1f}, maxy={max(ys):.1f}, fill={elem.attrib.get('fill')}")
