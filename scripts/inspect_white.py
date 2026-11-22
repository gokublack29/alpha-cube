import xml.etree.ElementTree as ET

tree = ET.parse('white-theme.svg')
root = tree.getroot()
paths = [elem for elem in root.iter() if elem.tag.endswith('path')]
print(f"Paths in white-theme.svg: {len(paths)}")
for i, p in enumerate(paths):
    fill = p.attrib.get('fill')
    stroke = p.attrib.get('stroke')
    print(f"{i}: fill={fill} stroke={stroke} len={len(p.attrib.get('d', ''))}")
