"""Import generated brand art into brand/ and post-process the logo marks.

The generated logo marks arrive on a baked-in solid background. Slide layouts
need them to sit on arbitrary surfaces, so this keys the flat background out to
alpha and trims the result to a square around the glyph. That keeps the mark's
optical size predictable wherever a layout places it.

Run:  .venv/bin/python brand/prepare_assets.py
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image

BRAND_DIR = Path(__file__).resolve().parent
SOURCE_DIR = Path(
    "/Users/gappu/.cursor/projects/Users-gappu-Downloads-hr/assets"
)

# Full-bleed art is copied through untouched.
ARTWORK = {
    "hireos-hero-cover.png": "hero-cover.png",
    "hireos-section-orchestration.png": "section-orchestration.png",
    "hireos-section-memory.png": "section-memory.png",
    "hireos-section-governance.png": "section-governance.png",
    "hireos-section-decision.png": "section-decision.png",
}

# Logo marks get their background keyed out. (source, dest, background rgb)
MARKS = (
    ("hireos-logo-mark.png", "logo-mark.png", (7, 10, 20)),
    ("hireos-logo-mark-light.png", "logo-mark-light.png", (255, 255, 255)),
)

# Chroma distance below LO is fully background, above HI fully opaque; the ramp
# between the two preserves the glyph's soft outer glow instead of hard-clipping it.
KEY_LO = 12
KEY_HI = 44


def key_out_background(image: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    image = image.convert("RGBA")
    pixels = image.load()
    width, height = image.size
    span = KEY_HI - KEY_LO
    for y in range(height):
        for x in range(width):
            r, g, b, _ = pixels[x, y]
            distance = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            if distance <= KEY_LO:
                alpha = 0
            elif distance >= KEY_HI:
                alpha = 255
            else:
                alpha = int(255 * (distance - KEY_LO) / span)
            pixels[x, y] = (r, g, b, alpha)
    return image


def trim_to_square(image: Image.Image, padding_ratio: float = 0.06) -> Image.Image:
    """Crop to the glyph, then pad back out to a centered square canvas."""
    alpha = image.getchannel("A")
    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    if box is None:
        return image
    glyph = image.crop(box)
    side = max(glyph.size)
    side += int(side * padding_ratio * 2)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(
        glyph,
        ((side - glyph.width) // 2, (side - glyph.height) // 2),
    )
    return canvas


def main() -> int:
    if not SOURCE_DIR.is_dir():
        print(f"source dir missing: {SOURCE_DIR}", file=sys.stderr)
        return 1

    missing: list[str] = []

    for source_name, dest_name in ARTWORK.items():
        source = SOURCE_DIR / source_name
        if not source.exists():
            missing.append(source_name)
            continue
        shutil.copyfile(source, BRAND_DIR / dest_name)
        print(f"copied   {dest_name}")

    for source_name, dest_name, bg in MARKS:
        source = SOURCE_DIR / source_name
        if not source.exists():
            missing.append(source_name)
            continue
        mark = trim_to_square(key_out_background(Image.open(source), bg))
        mark.save(BRAND_DIR / dest_name)
        print(f"keyed    {dest_name}  {mark.size[0]}x{mark.size[1]}")

    if missing:
        print("\nmissing sources:", ", ".join(missing), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
