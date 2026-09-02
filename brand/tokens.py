"""HireOS brand tokens: palette, type scale, geometry and font resolution.

Every visual constant used by the deck lives here so the whole look can be
retuned from one file.
"""

from __future__ import annotations

import os
from pathlib import Path

from pptx.dml.color import RGBColor
from pptx.util import Emu, Inches, Pt

REPO_ROOT = Path(__file__).resolve().parent.parent
BRAND_DIR = REPO_ROOT / "brand"
OUT_DIR = REPO_ROOT / "out"


# --------------------------------------------------------------------------
# Palette
# --------------------------------------------------------------------------

def _rgb(hex_str: str) -> RGBColor:
    return RGBColor.from_string(hex_str.lstrip("#").upper())


INK = _rgb("070A14")
SURFACE = _rgb("0E1424")
SURFACE_2 = _rgb("151E33")
LINE = _rgb("222C47")
LINE_SOFT = _rgb("1A2337")

INDIGO = _rgb("4F6BFF")
INDIGO_DEEP = _rgb("2F45C7")
CYAN = _rgb("22D3EE")
AMBER = _rgb("F59E0B")
GREEN = _rgb("34D399")
ROSE = _rgb("FB7185")

PAPER = _rgb("F7F8FC")
PAPER_2 = _rgb("ECEEF6")

TEXT_HI = _rgb("FFFFFF")
TEXT_MID = _rgb("A9B4D0")
TEXT_LOW = _rgb("6E7C9E")

INK_TEXT_HI = _rgb("0B1020")
INK_TEXT_MID = _rgb("495573")
INK_TEXT_LOW = _rgb("7C88A6")

# Column accents, cycled by multi-card layouts.
ACCENTS = (INDIGO, CYAN, AMBER, GREEN)


# --------------------------------------------------------------------------
# Type
# --------------------------------------------------------------------------

_FONT_PREFERENCE = (
    ("Inter", ("Inter.ttc", "Inter-Regular.ttf", "Inter-Regular.otf", "InterVariable.ttf")),
    ("Helvetica Neue", ("HelveticaNeue.ttc",)),
    ("Avenir Next", ("Avenir Next.ttc",)),
    ("Helvetica", ("Helvetica.ttc",)),
)

_FONT_DIRS = (
    Path("/System/Library/Fonts"),
    Path("/Library/Fonts"),
    Path.home() / "Library/Fonts",
    Path("/usr/share/fonts"),
)


def resolve_font() -> str:
    """Return the first preferred font family actually installed.

    PowerPoint silently substitutes missing families, which wrecks the metrics
    the layouts are tuned against, so the deck names only a font we can see.
    """
    override = os.environ.get("HIREOS_FONT")
    if override:
        return override
    for family, filenames in _FONT_PREFERENCE:
        for directory in _FONT_DIRS:
            if not directory.is_dir():
                continue
            for filename in filenames:
                if (directory / filename).exists():
                    return family
    return "Helvetica"


FONT = resolve_font()
FONT_MONO = "Menlo"

# Point sizes for the deck's type scale.
SIZE_DISPLAY = Pt(58)
SIZE_TITLE = Pt(34)
SIZE_SUBTITLE = Pt(19)
SIZE_LEAD = Pt(16)
SIZE_BODY = Pt(13.5)
SIZE_SMALL = Pt(11)
SIZE_MICRO = Pt(9)
SIZE_EYEBROW = Pt(10.5)
SIZE_STAT = Pt(40)


# --------------------------------------------------------------------------
# Geometry
# --------------------------------------------------------------------------

SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)

MARGIN_X = Inches(0.85)
MARGIN_TOP = Inches(0.62)
MARGIN_BOTTOM = Inches(0.52)

CONTENT_W = Emu(SLIDE_W - 2 * MARGIN_X)
CONTENT_TOP = Inches(1.92)
CONTENT_H = Emu(SLIDE_H - CONTENT_TOP - Inches(0.95))

GUTTER = Inches(0.28)
RADIUS_ADJ = 0.055


def columns(count: int, total_w=None, gutter=None, left=None):
    """Return (left, width) pairs for an evenly divided column grid."""
    total_w = CONTENT_W if total_w is None else total_w
    gutter = GUTTER if gutter is None else gutter
    left = MARGIN_X if left is None else left
    width = int((total_w - gutter * (count - 1)) / count)
    return [(Emu(int(left) + i * (width + int(gutter))), Emu(width)) for i in range(count)]


# --------------------------------------------------------------------------
# Brand copy
# --------------------------------------------------------------------------

BRAND_NAME = "HireOS"
BRAND_DESCRIPTOR = "Enterprise Agentic Hiring Operating System"
BRAND_TAGLINE = "AI executes. Company policy governs. Humans decide."

LOGO_MARK_DARK = BRAND_DIR / "logo-mark.png"
LOGO_MARK_LIGHT = BRAND_DIR / "logo-mark-light.png"
HERO_COVER = BRAND_DIR / "hero-cover.png"
SECTION_ART = {
    "orchestration": BRAND_DIR / "section-orchestration.png",
    "memory": BRAND_DIR / "section-memory.png",
    "governance": BRAND_DIR / "section-governance.png",
    "decision": BRAND_DIR / "section-decision.png",
}
