import xml.etree.ElementTree as ET

# Load dark and white SVG
tree_dark = ET.parse('dark-theme.svg')
root_dark = tree_dark.getroot()
paths_dark = [e for e in root_dark.iter() if e.tag.endswith('path')]

tree_white = ET.parse('white-theme.svg')
root_white = tree_white.getroot()
paths_white = [e for e in root_white.iter() if e.tag.endswith('path')]

# Let us verify path indexes in dark-theme.svg
# Jayadithya arrow: 21
# Jayadithya text: 19
# Gurubaravikkram arrow: 22
# Gurubaravikkram text: 20
# Comic beam yellow: 24
# Comic beam red: 25
# HEY WHO ARE WE text shadow: 26
# HEY WHO ARE WE text yellow: 27
# Alpha cube text: 23
# Starburst mail p1: 28, p2: 29, p3: 30, text: 31
# Starburst call p1: 32, p2: 33, p3: 34, text: 35
# Card border 1: 10
# Card border 2: 14
# Get in touch squiggles: 4, 5

print("Verifying paths...")
print("P19 (Jayadithya text):", paths_dark[19].attrib['d'][:40])
print("P20 (Gurubaravikkram text):", paths_dark[20].attrib['d'][:40])
print("P21 (Jayadithya arrow):", paths_dark[21].attrib['d'][:40])
print("P22 (Gurubaravikkram arrow):", paths_dark[22].attrib['d'][:40])
print("P24 (Yellow beam):", paths_dark[24].attrib['d'][:40])
print("P25 (Red beam):", paths_dark[25].attrib['d'][:40])
print("P26 (Text shadow):", paths_dark[26].attrib['d'][:40])
print("P27 (Text yellow):", paths_dark[27].attrib['d'][:40])
print("P23 (Alpha cube text):", paths_dark[23].attrib['d'][:40])
print("P28 (Mail starburst):", paths_dark[28].attrib['d'][:40])
print("P32 (Call starburst):", paths_dark[32].attrib['d'][:40])
