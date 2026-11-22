import xml.etree.ElementTree as ET
import os

tree_dark = ET.parse('dark-theme.svg')
root_dark = tree_dark.getroot()

tree_white = ET.parse('white-theme.svg')
root_white = tree_white.getroot()

# Function to extract slice of SVG by y range and element criteria
def create_section_svg(source_svg, out_path, min_y, max_y, view_w=1728, is_footer=False):
    tree = ET.parse(source_svg)
    root = tree.getroot()
    h = max_y - min_y
    
    # We will build a new SVG with viewBox="0 {min_y} {view_w} {h}"
    out_svg = [
        f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 {min_y} {view_w} {h}" width="100%" height="auto" fill="none" style="display:block; overflow:visible;">'
    ]
    
    # In footer, we want the starburst buttons to be clickable links!
    # Let us iterate over children of root
    for elem in root:
        tag = elem.tag.split('}')[-1]
        
        # Skip top-level background rects that cover entire canvas
        if tag == 'rect' and (elem.attrib.get('width') == '1728' or elem.attrib.get('fill') in ['black', 'white']):
            continue
            
        # Check if element is within our y range
        elem_y = elem.attrib.get('y')
        elem_d = elem.attrib.get('d')
        
        # Check if rect is in range
        if elem_y is not None:
            fy = float(elem_y)
            fh = float(elem.attrib.get('height', '0'))
            if (min_y - 200) <= fy <= max_y:
                # If this rect is using an embedded pattern/image, we can replace href with clean local asset!
                fill = elem.attrib.get('fill', '')
                rect_x = elem.attrib.get('x', '0')
                rect_w = elem.attrib.get('width')
                rect_h = elem.attrib.get('height')
                rx = elem.attrib.get('rx', '0')
                
                # Check what image it was
                if 'pattern2' in fill: # Team photo
                    img_src = 'team-dark.png' if 'dark' in source_svg else 'team-light.png'
                    out_svg.append(f'  <image href="assets/{img_src}" x="{rect_x}" y="{elem_y}" width="{rect_w}" height="{rect_h}" preserveAspectRatio="xMidYMid meet" />')
                elif 'pattern4' in fill: # Anirudh
                    out_svg.append(f'  <image href="assets/anirudh.png" x="{rect_x}" y="{elem_y}" width="{rect_w}" height="{rect_h}" preserveAspectRatio="xMidYMid meet" />')
                elif 'pattern3' in fill: # Alpha logo in footer
                    out_svg.append(f'  <image href="assets/logo.png" x="{rect_x}" y="{elem_y}" width="{rect_w}" height="{rect_h}" preserveAspectRatio="xMidYMid meet" />')
                elif 'pattern5' in fill: # Gmail icon
                    out_svg.append(f'  <image href="assets/mail-icon.png" x="{rect_x}" y="{elem_y}" width="{rect_w}" height="{rect_h}" preserveAspectRatio="xMidYMid meet" />')
                elif 'pattern6' in fill: # Phone icon
                    out_svg.append(f'  <image href="assets/phone-icon.png" x="{rect_x}" y="{elem_y}" width="{rect_w}" height="{rect_h}" preserveAspectRatio="xMidYMid meet" />')
                elif elem.attrib.get('fill') == '#D9D9D9':
                    out_svg.append(f'  <rect x="{rect_x}" y="{elem_y}" width="{rect_w}" height="{rect_h}" rx="{rx}" fill="#D9D9D9" />')
        
        # Check if path is in range
        elif elem_d:
            # check approx y from commands
            import re
            ys = [float(v) for v in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', elem_d)[1::2]]
            if ys:
                min_py = min(ys)
                max_py = max(ys)
                if (min_y - 50) <= min_py <= (max_y + 50) or (min_y - 50) <= max_py <= (max_y + 50):
                    fill_attr = f' fill="{elem.attrib["fill"]}"' if "fill" in elem.attrib else ' fill="none"'
                    stroke_attr = f' stroke="{elem.attrib["stroke"]}"' if "stroke" in elem.attrib else ''
                    sw_attr = f' stroke-width="{elem.attrib["stroke-width"]}"' if "stroke-width" in elem.attrib else ''
                    out_svg.append(f'  <path d="{elem_d}"{fill_attr}{stroke_attr}{sw_attr} />')

    out_svg.append('</svg>')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(out_svg))
    print(f"Generated {out_path} ({view_w}x{h})")

# Generate team stages
create_section_svg('dark-theme.svg', 'assets/team-stage-dark.svg', 2500, 3350)
create_section_svg('white-theme.svg', 'assets/team-stage-white.svg', 2500, 3350)

# Generate footer stages
create_section_svg('dark-theme.svg', 'assets/footer-stage-dark.svg', 4200, 5550, is_footer=True)
create_section_svg('white-theme.svg', 'assets/footer-stage-white.svg', 4200, 5550, is_footer=True)
