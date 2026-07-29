from pathlib import Path
from xml.sax.saxutils import escape

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from reportlab.lib.colors import PCMYKColor
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas


OUT = Path(__file__).resolve().parent
URL = "https://logisticoreapp.com/logisticore-saas.html"
PAGE_W_MM, PAGE_H_MM = 91, 61  # 85 × 55 mm finished size + 3 mm bleed

NAVY = "#0A1628"
CYAN = "#00BCD4"
TEAL = "#0A9396"
GOLD = "#D4A84B"
WHITE = "#FFFFFF"
LIGHT = "#E2E8F0"

C_NAVY = PCMYKColor(75, 45, 0, 84)
C_CYAN = PCMYKColor(100, 11, 0, 17)
C_TEAL = PCMYKColor(93, 2, 0, 41)
C_GOLD = PCMYKColor(0, 21, 65, 17)
C_WHITE = PCMYKColor(0, 0, 0, 0)
C_LIGHT = PCMYKColor(6, 3, 0, 6)
C_BLACK = PCMYKColor(0, 0, 0, 100)
C_ORANGE = PCMYKColor(0, 60, 100, 0)


def qr_matrix():
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=1,
        border=4,
    )
    qr.add_data(URL)
    qr.make(fit=True)
    return qr.get_matrix()


QR = qr_matrix()


def cube_svg(x, y, s, colour):
    top = (x, y - s * 0.55)
    left = (x - s * 0.55, y - s * 0.20)
    centre = (x, y + s * 0.05)
    right = (x + s * 0.55, y - s * 0.20)
    lower_left = (x - s * 0.55, y + s * 0.30)
    bottom = (x, y + s * 0.58)
    lower_right = (x + s * 0.55, y + s * 0.30)
    lines = [
        (top, left), (left, centre), (centre, right), (right, top),
        (left, lower_left), (lower_left, bottom), (bottom, centre),
        (right, lower_right), (lower_right, bottom),
        ((x - s * 0.33, y - s * 0.28), (x - s * 0.10, y - s * 0.12)),
        ((x + s * 0.33, y - s * 0.28), (x + s * 0.10, y - s * 0.12)),
        ((x - s * 0.35, y + s * 0.02), (x - s * 0.18, y + s * 0.18)),
        ((x - s * 0.18, y + s * 0.18), (x - s * 0.18, y + s * 0.42)),
        ((x + s * 0.35, y + s * 0.02), (x + s * 0.18, y + s * 0.18)),
        ((x + s * 0.18, y + s * 0.18), (x + s * 0.18, y + s * 0.42)),
    ]
    line_markup = "".join(
        f'<line x1="{a[0]:.3f}" y1="{a[1]:.3f}" x2="{b[0]:.3f}" y2="{b[1]:.3f}"/>'
        for a, b in lines
    )
    dots = [
        (x - s * 0.33, y - s * 0.28),
        (x + s * 0.33, y - s * 0.28),
        (x - s * 0.35, y + s * 0.02),
        (x + s * 0.35, y + s * 0.02),
        (x - s * 0.18, y + s * 0.42),
        (x + s * 0.18, y + s * 0.42),
    ]
    dot_markup = "".join(
        f'<circle cx="{dx:.3f}" cy="{dy:.3f}" r="{s * 0.035:.3f}"/>'
        for dx, dy in dots
    )
    return (
        f'<g fill="none" stroke="{colour}" stroke-width="0.42" '
        f'stroke-linecap="round" stroke-linejoin="round">{line_markup}{dot_markup}</g>'
    )


def qr_svg(x, y, size):
    n = len(QR)
    module = size / n
    rects = []
    for row, values in enumerate(QR):
        for col, dark in enumerate(values):
            if dark:
                rects.append(
                    f'<rect x="{x + col * module:.4f}" y="{y + row * module:.4f}" '
                    f'width="{module + 0.01:.4f}" height="{module + 0.01:.4f}"/>'
                )
    return f'<g fill="{NAVY}">{"".join(rects)}</g>'


def svg_document(body, title):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{PAGE_W_MM}mm" height="{PAGE_H_MM}mm"
     viewBox="0 0 {PAGE_W_MM} {PAGE_H_MM}">
  <title>{escape(title)}</title>
  <desc>91 × 61 mm artwork including 3 mm bleed; finished trim 85 × 55 mm.</desc>
  {body}
</svg>
'''


def front_svg(spot=False):
    if spot:
        body = f'''
  <rect width="91" height="61" fill="#FFFFFF"/>
  {cube_svg(17, 30.5, 15, "#FF6600")}
  <text x="30" y="29.4" fill="#FF6600" font-family="Helvetica, Arial, sans-serif"
        font-size="7" font-weight="700" letter-spacing="0.75">LOGISTICORE</text>
  <rect x="30" y="31.3" width="51" height="0.45" fill="#FF6600"/>
'''
    else:
        body = f'''
  <rect width="91" height="61" fill="{NAVY}"/>
  {cube_svg(17, 30.5, 15, CYAN)}
  <text x="30" y="29.4" fill="{WHITE}" font-family="Helvetica, Arial, sans-serif"
        font-size="7" font-weight="700" letter-spacing="0.75">LOGISTICORE</text>
  <rect x="30" y="31.3" width="51" height="0.28" fill="{GOLD}"/>
  <text x="30" y="36.7" fill="{CYAN}" font-family="Helvetica, Arial, sans-serif"
        font-size="2.25" font-weight="700" letter-spacing="0.55">FREIGHT FORWARDING SOFTWARE</text>
'''
    return svg_document(body, "LogistiCore business card front Spot UV" if spot else "LogistiCore business card front")


def icon_phone_svg(x, y):
    return (
        f'<path d="M{x:.2f},{y:.2f} c0.7,1.7 2.0,3.0 3.7,3.7 '
        f'l0.9,-1.1 c0.2,-0.2 0.5,-0.25 0.75,-0.1 l1.5,0.8 '
        f'c0.3,0.15 0.4,0.45 0.3,0.75 l-0.35,1.25 '
        f'c-0.15,0.5 -0.6,0.85 -1.1,0.8 c-4.1,-0.45 -7.35,-3.7 -7.8,-7.8 '
        f'c-0.05,-0.5 0.3,-0.95 0.8,-1.1 l1.25,-0.35 '
        f'c0.3,-0.1 0.6,0 0.75,0.3 l0.8,1.5 c0.15,0.25 0.1,0.55 -0.1,0.75z" '
        f'fill="{CYAN}" transform="scale(0.45) translate({x / 0.45 - x:.2f},{y / 0.45 - y:.2f})"/>'
    )


def back_svg(spot=False):
    if spot:
        body = '''
  <rect width="91" height="61" fill="#FFFFFF"/>
  <text x="8" y="14.5" fill="#FF6600" font-family="Helvetica, Arial, sans-serif"
        font-size="5.1" font-weight="700">Stuart Pople</text>
'''
        return svg_document(body, "LogistiCore business card back Spot UV")

    qr_x, qr_y, qr_size = 58.1, 15.1, 20.8
    body = f'''
  <rect width="91" height="61" fill="{NAVY}"/>
  <rect x="46" y="7" width="0.25" height="47" fill="{GOLD}"/>
  <text x="8" y="14.5" fill="{WHITE}" font-family="Helvetica, Arial, sans-serif"
        font-size="5.1" font-weight="700">Stuart Pople</text>
  <text x="8" y="19.3" fill="{CYAN}" font-family="Helvetica, Arial, sans-serif"
        font-size="2.65">Founder &amp; Director</text>

  <g fill="none" stroke="{CYAN}" stroke-width="0.38">
    <path d="M8.3 25.0c0.5 1.2 1.4 2.1 2.6 2.6l0.7-0.8 1.0 0.55-0.25 0.9c-0.1 0.35-0.4 0.55-0.75 0.5-2.8-0.3-5-2.5-5.3-5.3-0.05-0.35 0.15-0.65 0.5-0.75l0.9-0.25 0.55 1.0-0.8 0.7z"/>
    <rect x="7.2" y="30.8" width="4.2" height="3.0" rx="0.2"/>
    <path d="M7.3 31l2 1.5 2-1.5"/>
    <circle cx="9.3" cy="38.8" r="2.1"/>
    <path d="M7.2 38.8h4.2M9.3 36.7c-0.8 0.8-0.8 3.4 0 4.2M9.3 36.7c0.8 0.8 0.8 3.4 0 4.2"/>
  </g>
  <text x="14" y="27.1" fill="{LIGHT}" font-family="Helvetica, Arial, sans-serif" font-size="2.5">+44 (0) 20 4511 4156</text>
  <text x="14" y="33.2" fill="{LIGHT}" font-family="Helvetica, Arial, sans-serif" font-size="2.5">sales@logisticoreapp.com</text>
  <text x="14" y="39.6" fill="{LIGHT}" font-family="Helvetica, Arial, sans-serif" font-size="2.5">www.logisticoreapp.com</text>

  {cube_svg(10.7, 48.6, 6.0, CYAN)}
  <text x="15" y="48.4" fill="{CYAN}" font-family="Helvetica, Arial, sans-serif"
        font-size="3.0" font-weight="700">LogistiCore</text>
  <text x="15" y="51.3" fill="{CYAN}" font-family="Helvetica, Arial, sans-serif"
        font-size="1.3" font-weight="700" letter-spacing="0.65">TECHNOLOGIES</text>

  <rect x="55" y="12" width="27" height="28" rx="1.2" fill="{WHITE}" stroke="{CYAN}" stroke-width="0.35"/>
  {qr_svg(qr_x, qr_y, qr_size)}
  <text x="68.5" y="44.3" text-anchor="middle" fill="{GOLD}"
        font-family="Helvetica, Arial, sans-serif" font-size="2.55" font-weight="700">Platform</text>
'''
    return svg_document(body, "LogistiCore business card back")


def pdf_cube(c, x, y, s, colour, width=0.38):
    c.setStrokeColor(colour)
    c.setLineWidth(width * mm)
    c.setLineCap(1)
    c.setLineJoin(1)
    pts = {
        "t": (x, y - s * 0.55),
        "l": (x - s * 0.55, y - s * 0.20),
        "m": (x, y + s * 0.05),
        "r": (x + s * 0.55, y - s * 0.20),
        "ll": (x - s * 0.55, y + s * 0.30),
        "b": (x, y + s * 0.58),
        "lr": (x + s * 0.55, y + s * 0.30),
    }
    for a, b in [
        ("t", "l"), ("l", "m"), ("m", "r"), ("r", "t"),
        ("l", "ll"), ("ll", "b"), ("b", "m"),
        ("r", "lr"), ("lr", "b"),
    ]:
        c.line(pts[a][0] * mm, (PAGE_H_MM - pts[a][1]) * mm, pts[b][0] * mm, (PAGE_H_MM - pts[b][1]) * mm)
    circuits = [
        ((-0.33, -0.28), (-0.10, -0.12)),
        ((0.33, -0.28), (0.10, -0.12)),
        ((-0.35, 0.02), (-0.18, 0.18)),
        ((-0.18, 0.18), (-0.18, 0.42)),
        ((0.35, 0.02), (0.18, 0.18)),
        ((0.18, 0.18), (0.18, 0.42)),
    ]
    for (ax, ay), (bx, by) in circuits:
        c.line((x + s * ax) * mm, (PAGE_H_MM - (y + s * ay)) * mm, (x + s * bx) * mm, (PAGE_H_MM - (y + s * by)) * mm)
    for dx, dy in [(-0.33, -0.28), (0.33, -0.28), (-0.35, 0.02), (0.35, 0.02), (-0.18, 0.42), (0.18, 0.42)]:
        c.circle((x + s * dx) * mm, (PAGE_H_MM - (y + s * dy)) * mm, s * 0.035 * mm, stroke=1, fill=0)


def pdf_text_top(c, x, y, text, font, size, colour, char_space=0):
    t = c.beginText()
    t.setTextOrigin(x * mm, (PAGE_H_MM - y) * mm)
    t.setFont(font, size * mm)
    t.setFillColor(colour)
    t.setCharSpace(char_space * mm)
    t.textLine(text)
    c.drawText(t)


def pdf_qr(c, x, y, size):
    n = len(QR)
    module = size / n
    c.setFillColor(C_NAVY)
    for row, values in enumerate(QR):
        for col, dark in enumerate(values):
            if dark:
                c.rect(
                    (x + col * module) * mm,
                    (PAGE_H_MM - (y + (row + 1) * module)) * mm,
                    (module + 0.01) * mm,
                    (module + 0.01) * mm,
                    stroke=0,
                    fill=1,
                )


def draw_pdf_front(c, spot=False):
    c.setFillColor(C_WHITE if spot else C_NAVY)
    c.rect(0, 0, PAGE_W_MM * mm, PAGE_H_MM * mm, stroke=0, fill=1)
    plate = C_ORANGE if spot else C_CYAN
    pdf_cube(c, 17, 30.5, 15, plate)
    pdf_text_top(c, 30, 29.4, "LOGISTICORE", "Helvetica-Bold", 7, C_ORANGE if spot else C_WHITE, 0.75)
    c.setFillColor(C_ORANGE if spot else C_GOLD)
    c.rect(30 * mm, (PAGE_H_MM - 31.6) * mm, 51 * mm, (0.45 if spot else 0.28) * mm, stroke=0, fill=1)
    if not spot:
        pdf_text_top(c, 30, 36.7, "FREIGHT FORWARDING SOFTWARE", "Helvetica-Bold", 2.25, C_CYAN, 0.55)


def draw_pdf_back(c, spot=False):
    c.setFillColor(C_WHITE if spot else C_NAVY)
    c.rect(0, 0, PAGE_W_MM * mm, PAGE_H_MM * mm, stroke=0, fill=1)
    if spot:
        pdf_text_top(c, 8, 14.5, "Stuart Pople", "Helvetica-Bold", 5.1, C_ORANGE)
        return

    c.setFillColor(C_GOLD)
    c.rect(46 * mm, (PAGE_H_MM - 54) * mm, 0.25 * mm, 47 * mm, stroke=0, fill=1)
    pdf_text_top(c, 8, 14.5, "Stuart Pople", "Helvetica-Bold", 5.1, C_WHITE)
    pdf_text_top(c, 8, 19.3, "Founder & Director", "Helvetica", 2.65, C_CYAN)
    pdf_text_top(c, 14, 27.1, "+44 (0) 20 4511 4156", "Helvetica", 2.5, C_LIGHT)
    pdf_text_top(c, 14, 33.2, "sales@logisticoreapp.com", "Helvetica", 2.5, C_LIGHT)
    pdf_text_top(c, 14, 39.6, "www.logisticoreapp.com", "Helvetica", 2.5, C_LIGHT)
    c.setStrokeColor(C_CYAN)
    c.setLineWidth(0.38 * mm)
    c.circle(9.3 * mm, (PAGE_H_MM - 38.8) * mm, 2.1 * mm, stroke=1, fill=0)
    c.rect(7.2 * mm, (PAGE_H_MM - 33.8) * mm, 4.2 * mm, 3 * mm, stroke=1, fill=0)
    pdf_cube(c, 10.7, 48.6, 6.0, C_CYAN, 0.32)
    pdf_text_top(c, 15, 48.4, "LogistiCore", "Helvetica-Bold", 3.0, C_CYAN)
    pdf_text_top(c, 15, 51.3, "T E C H N O L O G I E S", "Helvetica-Bold", 1.05, C_CYAN)
    c.setFillColor(C_WHITE)
    c.setStrokeColor(C_CYAN)
    c.setLineWidth(0.35 * mm)
    c.roundRect(55 * mm, (PAGE_H_MM - 40) * mm, 27 * mm, 28 * mm, 1.2 * mm, stroke=1, fill=1)
    pdf_qr(c, 58.1, 15.1, 20.8)
    pdf_text_top(c, 64.5, 44.3, "Platform", "Helvetica-Bold", 2.55, C_GOLD)


def write_pdf():
    path = OUT / "PRINT-THIS-LogistiCore-Vector-SpotUV-4pages.pdf"
    c = canvas.Canvas(str(path), pagesize=(PAGE_W_MM * mm, PAGE_H_MM * mm), pageCompression=1)
    for draw in (draw_pdf_front, draw_pdf_back):
        draw(c, spot=False)
        c.showPage()
    for draw in (draw_pdf_front, draw_pdf_back):
        draw(c, spot=True)
        c.showPage()
    c.setTitle("LogistiCore Business Cards — Vector Artwork + Spot UV")
    c.setAuthor("LogistiCore Technologies Ltd")
    c.save()
    return path


def main():
    (OUT / "01-FRONT-vector.svg").write_text(front_svg(False), encoding="utf-8")
    (OUT / "02-BACK-vector-working-QR.svg").write_text(back_svg(False), encoding="utf-8")
    (OUT / "03-SPOT-UV-FRONT-vector-orange.svg").write_text(front_svg(True), encoding="utf-8")
    (OUT / "04-SPOT-UV-BACK-vector-orange.svg").write_text(back_svg(True), encoding="utf-8")

    qr_only = svg_document(
        f'<rect width="91" height="61" fill="#FFFFFF"/>{qr_svg(25, 10, 41)}',
        "LogistiCore Platform QR code",
    )
    (OUT / "QR-Platform-vector.svg").write_text(qr_only, encoding="utf-8")
    pdf = write_pdf()

    (OUT / "README-FIRST.txt").write_text(
        f"""LOGISTICORE VECTOR BUSINESS CARD PACK
=====================================

SEND YOUR PRINTER THIS ONE FILE:
  {pdf.name}

It is a true vector, CMYK, four-page PDF:
  Page 1 — Front artwork
  Page 2 — Back artwork with working vector QR
  Page 3 — Front Spot UV plate (orange)
  Page 4 — Back Spot UV plate (orange)

SIZE
  PDF/SVG page: 91 × 61 mm (includes 3 mm bleed)
  Finished trim: 85 × 55 mm
  Trim line: 3 mm in from every edge

COLOURS
  Navy: #0A1628
  Cyan: #00BCD4
  Teal: #0A9396
  Gold: #D4A84B
  Spot UV plates: bright orange for mapping

EDITABLE SOURCE
  01-FRONT-vector.svg
  02-BACK-vector-working-QR.svg
  03-SPOT-UV-FRONT-vector-orange.svg
  04-SPOT-UV-BACK-vector-orange.svg
  QR-Platform-vector.svg

The SVG typography uses Helvetica/Arial. Your printer should outline text
before final production if their workflow requires it.

QR destination:
  {URL}
""",
        encoding="utf-8",
    )
    print(pdf)


if __name__ == "__main__":
    main()
