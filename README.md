# HireOS — Pre-Seed Investor Deck

A code-generated, fully editable PowerPoint deck for **HireOS**, the enterprise agentic hiring
operating system, plus the brand assets that go with it.

Everything is generated from source. There is no hand-edited `.pptx` in the repo — change the
code or the copy, rerun the build, and the deck is rebuilt from scratch.

**Output:** [`out/HireOS_PreSeed_Investor_Deck.pptx`](out/HireOS_PreSeed_Investor_Deck.pptx) — 27 slides, 16:9.

---

## Quick start

```bash
# One-time setup
uv venv .venv
uv pip install --python .venv/bin/python -r requirements.txt

# Build the deck
.venv/bin/python -m deck.build

# Check it for layout problems
.venv/bin/python -m deck.verify
```

`deck.build` prints the resolved font, the slide count and the output path. `deck.verify` reopens
the generated file and reports any text overflow, off-canvas shapes, footer collisions or missing
brand assets. It exits non-zero if it finds anything, so it works in a pre-commit hook or CI.

---

## What's in the deck

Sourced from `HireOS_Startup_Product_Blueprint.pdf` and the earlier
`Enterprise_Agentic_Hiring_Platform_Validation.pdf`. Each slide's footer cites the blueprint
section it came from, so any claim can be traced back.

| # | Slide | # | Slide |
|---|-------|---|-------|
| 01 | Cover | 15 | Compliance and responsible AI |
| 02 | Problem | 16 | Divider — The business |
| 03 | Why now | 17 | Wedge and MVP scope |
| 04 | Thesis — two-brain architecture | 18 | Competitive matrix |
| 05 | Divider — The product | 19 | Moat |
| 06 | Product — orchestration layer | 20 | Business model |
| 07 | One request, one workflow | 21 | Market (bottom-up) |
| 08 | Workflow state machine | 22 | Validation plan |
| 09 | Agent architecture | 23 | North-star metrics |
| 10 | Company hiring memory | 24 | Roadmap |
| 11 | Candidate intelligence | 25 | Team |
| 12 | Autonomy ladder | 26 | The ask |
| 13 | Divider — Trust and governance | 27 | Closing |
| 14 | Trust architecture | | |

### Two slides go beyond the source PDFs

The blueprint contains no market sizing and no funding plan, so slides **21 (Market)** and
**26 (The ask)** are original work. Both carry visible assumption framing on the slide itself
rather than presenting estimates as researched fact. The market slide is built bottom-up from the
blueprint's own pricing bands and states every input; it deliberately cites no third-party market
report.

### Placeholders to fill before sending

Search `deck/content.py` for `TBD`. The deck currently ships with bracketed placeholders for:

- Founder and team names, in `PLACEHOLDERS` and `TEAM["roles"]`
- Company entity name and contact details, in `PLACEHOLDERS`

Slide 25 carries an on-slide reminder about this. Traction is stated honestly as pre-product and
pre-revenue — if that changes, update `VALIDATION["status"]`.

---

## Editing

### Change the words

All copy lives in [`deck/content.py`](deck/content.py) as plain dicts, separate from any layout
code. Edit the text, rerun `python -m deck.build`, then `python -m deck.verify` to confirm nothing
overflowed. Slide order is the `SLIDES` list at the bottom of the file.

### Change the look

[`brand/tokens.py`](brand/tokens.py) holds the palette, type scale and page geometry. Retuning the
deck's colours or margins is a one-file change.

Fonts resolve at build time against what is actually installed, preferring Inter and falling back
through Helvetica Neue and Avenir Next. PowerPoint silently substitutes missing fonts, which breaks
the metrics the layouts are tuned against, so the deck only ever names a font present on the
machine. Override with `HIREOS_FONT="Some Font" .venv/bin/python -m deck.build`.

### Change the layout

- [`deck/components.py`](deck/components.py) — primitives: cards, chips, tables, bullets, callouts,
  the logo lockup, headers and footers. Also the Pillow-backed text measurement used to wrap and
  auto-fit copy.
- [`deck/diagrams.py`](deck/diagrams.py) — the seven diagrams (two-brain split, layer stack,
  workflow story, state machine, agent grid, knowledge pipeline, security stack).
- [`deck/build.py`](deck/build.py) — the remaining slide renderers and the dispatch table.

Diagrams are drawn as **native PowerPoint shapes and connectors**, not images, so they stay vector,
crisp at any zoom, and editable by whoever opens the file.

---

## Brand assets

| File | Use |
|---|---|
| `brand/logo-mark.png` | Logo mark, transparent, for dark surfaces |
| `brand/logo-mark-light.png` | Logo mark, transparent, for light surfaces |
| `brand/hero-cover.png` | Cover and closing background |
| `brand/section-orchestration.png` | Divider — The product |
| `brand/section-governance.png` | Divider — Trust and governance |
| `brand/section-decision.png` | Divider — The business |
| `brand/section-memory.png` | Inline art on the hiring-memory slide |

The mark is an abstract glyph: two pillars joined by a diamond gate node, reading as an implied H.
The diamond is the product thesis — the policy gate between the two brains — and it recurs
throughout the deck as the marker for a human approval gate.

Wordmarks are set as **live text** beside the mark rather than baked into the images, so the brand
name stays selectable and re-typesettable.

### Swapping a logo or artwork

Drop replacements into `brand/` using the filenames above and rebuild. Logo marks should be square
with a transparent background.

To regenerate from freshly generated source art, put the new files in the directory referenced by
`SOURCE_DIR` in [`brand/prepare_assets.py`](brand/prepare_assets.py) and run:

```bash
.venv/bin/python brand/prepare_assets.py
```

That copies the full-bleed artwork through untouched and, for the logo marks, keys the flat
background out to alpha and trims the result to a centred square so the mark's optical size is
predictable wherever a layout places it.

---

## Exporting to PDF

There is no LibreOffice on this machine, so PDF export is a manual step:

- **Keynote** — open the `.pptx`, then File → Export To → PDF
- **PowerPoint** — File → Export → Create PDF/XPS

To install a headless exporter instead:

```bash
brew install --cask libreoffice
soffice --headless --convert-to pdf --outdir out out/HireOS_PreSeed_Investor_Deck.pptx
```

### Preview renders

`out/render/` holds a PNG per slide, exported through Keynote during the visual verification pass.
It is a disposable artifact — safe to delete, and regenerable with:

```bash
osascript -e 'tell application "Keynote"
  set d to open POSIX file "'"$PWD"'/out/HireOS_PreSeed_Investor_Deck.pptx"
  export d to POSIX file "'"$PWD"'/out/render" as slide images with properties {image format:PNG}
  close d saving no
end tell'
```

---

## Layout notes

Two things about this codebase are worth knowing before you change it.

**Text is measured, not estimated.** `components.py` loads the resolved font through Pillow and
measures real glyph widths to wrap text and auto-fit type sizes. Silent overflow is the standard
failure mode of generated decks, and `deck.verify` exists to catch it before you present.

**Point sizes and EMU lengths are easy to confuse.** The measurement helpers take *points*, while
the drawing helpers take *EMU* via `Inches()`/`Pt()`. Passing `Pt(13)` where points were expected
once produced shapes tens of thousands of inches tall, so the measurement functions now coerce
`Length` inputs at the boundary.

---

## Repository layout

```
brand/
  tokens.py            palette, type scale, geometry, font resolution
  prepare_assets.py    imports generated art; keys out logo backgrounds
  *.png                logo marks, hero, section artwork
deck/
  content.py           all slide copy, as data
  components.py        reusable primitives + text measurement
  diagrams.py          native-shape diagrams
  build.py             slide renderers, dispatch, assembly
  verify.py            post-build layout checks
out/
  HireOS_PreSeed_Investor_Deck.pptx
  render/              per-slide PNG previews (disposable)
requirements.txt
```
