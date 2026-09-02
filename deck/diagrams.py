"""Native-shape diagrams for the HireOS deck.

Each function draws one slide's diagram using PowerPoint autoshapes and
connectors, so the result is vector, editable and crisp at any zoom. Nothing
here rasterizes.

Every function takes the slide plus the content dict and returns the Y
coordinate (EMU) where the next block can start.
"""

from __future__ import annotations

from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches, Pt

from brand import tokens as T
from deck import components as C


# ==========================================================================
# Thesis - two-brain architecture
# ==========================================================================

def two_brain(slide, data: dict, y: int) -> int:
    gutter = Inches(0.30)
    col_w = int((int(T.CONTENT_W) - int(gutter)) / 2)
    left_x = int(T.MARGIN_X)
    right_x = left_x + col_w + int(gutter)
    card_h = Inches(2.50)

    for x, spec, accent in (
        (left_x, data["ai_layer"], T.CYAN),
        (right_x, data["policy_layer"], T.INDIGO),
    ):
        C.rect(slide, x, y, col_w, card_h, fill=T.SURFACE, line=T.LINE, radius=T.RADIUS_ADJ)
        C.rect(slide, x, y, col_w, Inches(0.045), fill=accent)

        pad = Inches(0.28)
        inner_x = x + int(pad)
        inner_w = col_w - 2 * int(pad)
        ty = y + int(Inches(0.28))

        C.add_text(slide, inner_x, ty, inner_w, Inches(0.32), spec["heading"],
                   size=Pt(19), color=T.TEXT_HI, bold=True)
        ty += Inches(0.34)
        C.add_text(slide, inner_x, ty, inner_w, Inches(0.24), spec["subhead"].upper(),
                   size=T.SIZE_MICRO, color=accent, bold=True, letter_spacing=1.2)
        ty += Inches(0.32)
        C.add_bullets(slide, inner_x, ty, inner_w, y + int(card_h) - ty - int(Inches(0.18)),
                      spec["items"], size=Pt(11.5), accent=accent,
                      line_spacing=1.16, space_after=Pt(2.5))

    y += int(card_h) + Inches(0.20)

    # Both layers feed the gate; the gate alone decides.
    for x in (left_x + int(col_w * 0.5), right_x + int(col_w * 0.5)):
        C.arrow(slide, x, y - Inches(0.16), x, y + Inches(0.02), T.LINE, width=Pt(1.25))

    gate_h = Inches(0.74)
    C.rect(slide, T.MARGIN_X, y, T.CONTENT_W, gate_h,
           fill=C._mix(T.SURFACE, T.INDIGO, 0.18), line=T.INDIGO, radius=0.10)

    label_w = Inches(2.05)
    C.diamond(slide, int(T.MARGIN_X) + Inches(0.44), y + int(gate_h / 2), Inches(0.30),
              fill=T.INDIGO)
    C.add_text(slide, int(T.MARGIN_X) + Inches(0.72), y, label_w, gate_h,
               data["gate_label"], size=Pt(11.5), color=T.TEXT_HI, bold=True,
               anchor=MSO_ANCHOR.MIDDLE, letter_spacing=1.3)
    C.rect(slide, int(T.MARGIN_X) + Inches(0.72) + int(label_w), y + Inches(0.16),
           Emu(9525), gate_h - Inches(0.32), fill=T.INDIGO)
    rule_x = int(T.MARGIN_X) + Inches(0.72) + int(label_w) + Inches(0.24)
    C.add_text(slide, rule_x, y, int(T.MARGIN_X) + int(T.CONTENT_W) - rule_x - Inches(0.26),
               gate_h, data["rule"], size=Pt(12.5), color=T.TEXT_HI, bold=True,
               anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.25)

    y += int(gate_h) + Inches(0.18)
    y += C.note_bar(slide, T.MARGIN_X, y, T.CONTENT_W, data["example"],
                    label="In practice", accent=T.AMBER)
    return y


# ==========================================================================
# Product - orchestration layer above the systems of record
# ==========================================================================

def layer_stack(slide, data: dict, y: int) -> int:
    top_spec = data["hireos_layer"]
    band_h = Inches(1.54)

    C.rect(slide, T.MARGIN_X, y, T.CONTENT_W, band_h,
           fill=C._mix(T.SURFACE, T.INDIGO, 0.13), line=T.INDIGO, radius=0.05)
    C.gradient_bar(slide, T.MARGIN_X, y, T.CONTENT_W, Inches(0.055), T.INDIGO, T.CYAN)

    pad = Inches(0.30)
    inner_x = int(T.MARGIN_X) + int(pad)
    ty = y + int(Inches(0.26))

    C.logo_lockup(slide, inner_x, ty, Inches(0.40), dark=True, show_name=False)
    C.add_text(slide, inner_x + Inches(0.54), ty + Inches(0.01), Inches(3.0), Inches(0.34),
               top_spec["heading"], size=Pt(21), color=T.TEXT_HI, bold=True,
               letter_spacing=-0.4)
    C.add_text(slide, inner_x + Inches(0.54), ty + Inches(0.36), Inches(3.20), Inches(0.24),
               top_spec["subhead"].upper(), size=T.SIZE_MICRO, color=T.CYAN, bold=True,
               letter_spacing=1.2)

    # Module chips, right-aligned into the band as a two-row grid.
    modules = top_spec["modules"]
    chip_cols = 4
    chip_area_x = inner_x + Inches(3.95)
    chip_area_w = int(T.MARGIN_X) + int(T.CONTENT_W) - int(pad) - chip_area_x
    chip_gap = Inches(0.10)
    chip_w = int((chip_area_w - (chip_cols - 1) * int(chip_gap)) / chip_cols)
    chip_h = Inches(0.40)
    for index, module in enumerate(modules):
        row, col = divmod(index, chip_cols)
        cx = chip_area_x + col * (chip_w + int(chip_gap))
        cy = ty + Inches(0.02) + row * (int(chip_h) + int(Inches(0.11)))
        C.rect(slide, cx, cy, chip_w, chip_h, fill=T.SURFACE_2, line=T.LINE, radius=0.16)
        size = C.fit_size(module, chip_w - Inches(0.14), chip_h, 10.0, line_spacing=1.05)
        C.add_text(slide, cx + Inches(0.07), cy, chip_w - Inches(0.14), chip_h, module,
                   size=Pt(size), color=T.TEXT_MID, align=PP_ALIGN.CENTER,
                   anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.05)

    y += int(band_h)

    # Bidirectional integration arrows between the two bands.
    gap = Inches(0.36)
    for i in range(6):
        x = int(T.MARGIN_X) + Inches(1.1) + i * Inches(1.9)
        C.arrow(slide, x, y + Inches(0.06), x, y + int(gap) - Inches(0.06), T.LINE_SOFT)
        C.arrow(slide, x + Inches(0.10), y + int(gap) - Inches(0.06),
                x + Inches(0.10), y + Inches(0.06), T.LINE_SOFT)
    C.add_text(slide, int(T.MARGIN_X) + Inches(11.0) - Inches(2.4), y + Inches(0.09),
               Inches(2.4), Inches(0.24), "CONNECTORS", size=T.SIZE_MICRO,
               color=T.TEXT_LOW, bold=True, align=PP_ALIGN.RIGHT, letter_spacing=1.2)
    y += int(gap)

    bottom_spec = data["systems_layer"]
    bottom_h = Inches(0.94)
    C.rect(slide, T.MARGIN_X, y, T.CONTENT_W, bottom_h,
           fill=T.SURFACE, line=T.LINE, radius=0.06)
    C.add_text(slide, inner_x, y + Inches(0.16), Inches(6.0), Inches(0.24),
               bottom_spec["heading"].upper(), size=T.SIZE_MICRO, color=T.TEXT_LOW,
               bold=True, letter_spacing=1.2)

    systems = bottom_spec["systems"]
    sys_gap = Inches(0.12)
    sys_w = int((int(T.CONTENT_W) - 2 * int(pad) - (len(systems) - 1) * int(sys_gap))
                / len(systems))
    for index, system in enumerate(systems):
        sx = inner_x + index * (sys_w + int(sys_gap))
        sy = y + Inches(0.48)
        C.rect(slide, sx, sy, sys_w, Inches(0.36), fill=T.INK, line=T.LINE, radius=0.16)
        size = C.fit_size(system, sys_w - Inches(0.12), Inches(0.36), 10.0, line_spacing=1.05)
        C.add_text(slide, sx + Inches(0.06), sy, sys_w - Inches(0.12), Inches(0.36), system,
                   size=Pt(size), color=T.TEXT_MID, align=PP_ALIGN.CENTER,
                   anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.05)

    y += int(bottom_h) + Inches(0.22)

    reasons = data["why"]
    cols = T.columns(len(reasons), gutter=Inches(0.34))
    for (heading, body), (cx, cw) in zip(reasons, cols):
        C.rect(slide, cx, y + Inches(0.02), Inches(0.035), Inches(0.58), fill=T.CYAN)
        C.add_text(slide, int(cx) + Inches(0.20), y, int(cw) - Inches(0.20), Inches(0.24),
                   heading, size=Pt(12.5), color=T.TEXT_HI, bold=True)
        C.add_text(slide, int(cx) + Inches(0.20), y + Inches(0.25),
                   int(cw) - Inches(0.20), Inches(0.40), body,
                   size=Pt(10), color=T.TEXT_MID, line_spacing=1.22)
    return y + Inches(0.70)


# ==========================================================================
# One request, one workflow
# ==========================================================================

def workflow_story(slide, data: dict, y: int) -> int:
    bar_h = Inches(0.86)
    C.rect(slide, T.MARGIN_X, y, T.CONTENT_W, bar_h,
           fill=C._mix(T.SURFACE, T.CYAN, 0.10), line=T.CYAN, radius=0.09)
    C.rect(slide, T.MARGIN_X, y, Inches(0.05), bar_h, fill=T.CYAN)

    C.add_text(slide, int(T.MARGIN_X) + Inches(0.28), y + Inches(0.13),
               Inches(6.0), Inches(0.22), data["request_label"].upper(),
               size=T.SIZE_MICRO, color=T.CYAN, bold=True, letter_spacing=1.2)
    C.add_text(slide, int(T.MARGIN_X) + Inches(0.28), y + Inches(0.38),
               int(T.CONTENT_W) - Inches(0.56), Inches(0.34),
               f"\u201c{data['request']}\u201d",
               size=Pt(15.5), color=T.TEXT_HI, bold=True, italic=True)

    y += int(bar_h) + Inches(0.24)

    steps = data["steps"]
    cols = 5
    gap = Inches(0.13)
    card_w = int((int(T.CONTENT_W) - (cols - 1) * int(gap)) / cols)
    card_h = Inches(0.96)
    row_gap = Inches(0.10)

    for index, (name, body, is_human) in enumerate(steps):
        row, col = divmod(index, cols)
        cx = int(T.MARGIN_X) + col * (card_w + int(gap))
        cy = y + row * (int(card_h) + int(row_gap))
        accent = T.AMBER if is_human else T.INDIGO

        C.rect(slide, cx, cy, card_w, card_h,
               fill=C._mix(T.SURFACE, accent, 0.09) if is_human else T.SURFACE,
               line=C._mix(T.LINE, accent, 0.30) if is_human else T.LINE,
               radius=0.07)
        C.rect(slide, cx, cy, card_w, Inches(0.035), fill=accent)

        pad = Inches(0.15)
        inner_w = card_w - 2 * int(pad)
        C.add_text(slide, cx + int(pad), cy + Inches(0.15), Inches(0.30), Inches(0.20),
                   f"{index + 1:02d}", size=Pt(8), color=accent, bold=True)
        C.add_text(slide, cx + int(pad) + Inches(0.30), cy + Inches(0.13),
                   inner_w - Inches(0.30), Inches(0.22), name,
                   size=Pt(11.5), color=T.TEXT_HI, bold=True)
        size = C.fit_size(body, inner_w, Inches(0.50), 8.5, line_spacing=1.22)
        C.add_text(slide, cx + int(pad), cy + Inches(0.38), inner_w, Inches(0.54), body,
                   size=Pt(size), color=T.TEXT_MID, line_spacing=1.22)

    rows = (len(steps) + cols - 1) // cols
    y += rows * (int(card_h) + int(row_gap)) + Inches(0.02)

    # Legend, then the kicker beside it.
    lx = int(T.MARGIN_X)
    for label, color in ((data["legend_ai"], T.INDIGO), (data["legend_human"], T.AMBER)):
        C.rect(slide, lx, y + Inches(0.06), Inches(0.16), Inches(0.16), fill=color, radius=0.3)
        C.add_text(slide, lx + Inches(0.24), y + Inches(0.02), Inches(1.5), Inches(0.24),
                   label, size=Pt(10), color=T.TEXT_MID)
        lx += Inches(1.62)

    C.add_text(slide, int(T.MARGIN_X) + Inches(3.6), y, Inches(8.0), Inches(0.30),
               data["kicker"], size=Pt(11.5), color=T.TEXT_HI, bold=True,
               align=PP_ALIGN.RIGHT)
    return y + Inches(0.34)


# ==========================================================================
# Workflow state machine
# ==========================================================================

def state_machine(slide, data: dict, y: int) -> int:
    states = data["states"]
    cols = 5
    gap = Inches(0.30)
    chip_w = int((int(T.CONTENT_W) - (cols - 1) * int(gap)) / cols)
    chip_h = Inches(0.46)
    row_gap = Inches(0.32)

    positions = []
    for index, (name, is_gate) in enumerate(states):
        row, col = divmod(index, cols)
        cx = int(T.MARGIN_X) + col * (chip_w + int(gap))
        cy = y + row * (int(chip_h) + int(row_gap))
        positions.append((cx, cy))

        accent = T.AMBER if is_gate else T.INDIGO
        C.rect(slide, cx, cy, chip_w, chip_h,
               fill=C._mix(T.SURFACE, accent, 0.16) if is_gate else T.SURFACE,
               line=accent if is_gate else T.LINE, radius=0.14)
        size = C.fit_size(name, chip_w - Inches(0.16), chip_h, 9.5, bold=True, line_spacing=1.05)
        C.add_text(slide, cx + Inches(0.08), cy, chip_w - Inches(0.16), chip_h, name,
                   size=Pt(size), color=T.TEXT_HI if is_gate else T.TEXT_MID, bold=True,
                   align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.05)

        if is_gate:
            C.diamond(slide, cx + chip_w - Inches(0.12), cy + Inches(0.05),
                      Inches(0.16), fill=T.AMBER)

    # Horizontal links, plus a wrap marker at each row end.
    for index in range(len(states) - 1):
        (x1, y1), (x2, y2) = positions[index], positions[index + 1]
        if y1 == y2:
            C.arrow(slide, x1 + chip_w + Inches(0.03), y1 + int(chip_h / 2),
                    x2 - Inches(0.03), y2 + int(chip_h / 2), T.LINE)
        else:
            mid = y1 + int(chip_h) + int(row_gap / 2)
            C.connector(slide, x1 + chip_w + Inches(0.03), y1 + int(chip_h / 2),
                        x1 + chip_w + Inches(0.14), y1 + int(chip_h / 2), T.LINE_SOFT)
            C.connector(slide, x1 + chip_w + Inches(0.14), y1 + int(chip_h / 2),
                        x1 + chip_w + Inches(0.14), mid, T.LINE_SOFT)
            C.connector(slide, x1 + chip_w + Inches(0.14), mid,
                        int(T.MARGIN_X) - Inches(0.18), mid, T.LINE_SOFT)
            C.connector(slide, int(T.MARGIN_X) - Inches(0.18), mid,
                        int(T.MARGIN_X) - Inches(0.18), y2 + int(chip_h / 2), T.LINE_SOFT)
            C.arrow(slide, int(T.MARGIN_X) - Inches(0.18), y2 + int(chip_h / 2),
                    int(T.MARGIN_X) - Inches(0.03), y2 + int(chip_h / 2), T.LINE_SOFT)

    rows = (len(states) + cols - 1) // cols
    y += rows * (int(chip_h) + int(row_gap)) - int(row_gap) + Inches(0.34)

    # Terminal states.
    last_x, last_y = positions[-1]
    C.add_text(slide, T.MARGIN_X, y, Inches(1.5), Inches(0.30), "TERMINAL",
               size=T.SIZE_MICRO, color=T.TEXT_LOW, bold=True, letter_spacing=1.2,
               anchor=MSO_ANCHOR.MIDDLE)
    tx = int(T.MARGIN_X) + Inches(1.30)
    palette = {"HIRED": T.GREEN, "REJECTED": T.ROSE, "CLOSED": T.TEXT_LOW}
    for terminal in data["terminals"]:
        color = palette.get(terminal, T.TEXT_LOW)
        width = C.chip(slide, tx, y, Inches(0.40), terminal,
                       fill=C._mix(T.SURFACE, color, 0.14), line=C._mix(T.LINE, color, 0.40),
                       color=color, size=Pt(10.5), bold=True, min_width=Inches(1.35))
        tx += width + int(Inches(0.14))

    y += Inches(0.40) + Inches(0.34)

    cols_geo = T.columns(len(data["notes"]), gutter=Inches(0.34))
    for (heading, body), (cx, cw) in zip(data["notes"], cols_geo):
        C.add_text(slide, cx, y, cw, Inches(0.24), heading.upper(),
                   size=T.SIZE_MICRO, color=T.CYAN, bold=True, letter_spacing=1.2)
        C.add_text(slide, cx, y + Inches(0.26), cw, Inches(0.50), body,
                   size=Pt(10.5), color=T.TEXT_MID, line_spacing=1.25)
    return y + Inches(0.78)


# ==========================================================================
# Agent architecture
# ==========================================================================

def agent_grid(slide, data: dict, y: int) -> int:
    agents = data["agents"]
    cols = 3
    gap = Inches(0.24)
    card_w = int((int(T.CONTENT_W) - (cols - 1) * int(gap)) / cols)
    card_h = Inches(1.42)
    row_gap = Inches(0.12)

    for index, (name, body, permission) in enumerate(agents):
        row, col = divmod(index, cols)
        cx = int(T.MARGIN_X) + col * (card_w + int(gap))
        cy = y + row * (int(card_h) + int(row_gap))
        accent = T.ACCENTS[index % len(T.ACCENTS)]

        C.rect(slide, cx, cy, card_w, card_h, fill=T.SURFACE, line=T.LINE, radius=T.RADIUS_ADJ)
        C.rect(slide, cx, cy, Inches(0.035), card_h, fill=accent)

        pad = Inches(0.24)
        inner_x = cx + int(pad)
        inner_w = card_w - 2 * int(pad)

        C.diamond(slide, inner_x + Inches(0.09), cy + Inches(0.29), Inches(0.18), fill=accent)
        C.add_text(slide, inner_x + Inches(0.28), cy + Inches(0.18), inner_w - Inches(0.28),
                   Inches(0.24), name, size=Pt(13.5), color=T.TEXT_HI, bold=True)
        C.add_text(slide, inner_x, cy + Inches(0.48), inner_w, Inches(0.52), body,
                   size=Pt(10), color=T.TEXT_MID, line_spacing=1.26)

        C.rect(slide, inner_x, cy + int(card_h) - Inches(0.48), inner_w, Inches(0.34),
               fill=T.INK, line=T.LINE_SOFT, radius=0.16)
        size = C.fit_size(permission, inner_w - Inches(0.16), Inches(0.34), 8.5,
                          line_spacing=1.1)
        C.add_text(slide, inner_x + Inches(0.08), cy + int(card_h) - Inches(0.48),
                   inner_w - Inches(0.16), Inches(0.34), permission,
                   size=Pt(size), color=accent, align=PP_ALIGN.CENTER,
                   anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.1)

    rows = (len(agents) + cols - 1) // cols
    y += rows * (int(card_h) + int(row_gap)) + Inches(0.04)

    gov = data["governance"]
    gov_h = Inches(0.66)
    C.rect(slide, T.MARGIN_X, y, T.CONTENT_W, gov_h,
           fill=C._mix(T.SURFACE, T.INDIGO, 0.16), line=T.INDIGO, radius=0.10)
    C.diamond(slide, int(T.MARGIN_X) + Inches(0.42), y + int(gov_h / 2), Inches(0.28),
              fill=T.INDIGO)
    C.add_text(slide, int(T.MARGIN_X) + Inches(0.70), y + Inches(0.11),
               Inches(3.0), Inches(0.24), gov["heading"],
               size=Pt(13), color=T.TEXT_HI, bold=True)
    C.add_text(slide, int(T.MARGIN_X) + Inches(0.70), y + Inches(0.34),
               int(T.CONTENT_W) - Inches(1.0), Inches(0.22), gov["body"],
               size=Pt(10), color=T.TEXT_MID)
    return y + int(gov_h)


# ==========================================================================
# Company hiring memory
# ==========================================================================

def knowledge_pipeline(slide, data: dict, y: int) -> int:
    stages = data["pipeline"]
    overlap = Inches(0.11)
    total_w = int(T.CONTENT_W)
    stage_w = int((total_w + (len(stages) - 1) * int(overlap)) / len(stages))
    stage_h = Inches(0.54)

    for index, stage in enumerate(stages):
        sx = int(T.MARGIN_X) + index * (stage_w - int(overlap))
        ratio = index / max(len(stages) - 1, 1)
        accent = C._mix(T.INDIGO, T.CYAN, ratio)
        shape = C.rect(slide, sx, y, stage_w, stage_h,
                       fill=C._mix(T.SURFACE, accent, 0.16), line=accent,
                       shape_type=MSO_SHAPE.CHEVRON)
        shape.line.width = Pt(0.75)
        size = C.fit_size(stage, stage_w - Inches(0.34), stage_h, 9.5, line_spacing=1.05)
        C.add_text(slide, sx + Inches(0.17), y, stage_w - Inches(0.34), stage_h, stage,
                   size=Pt(size), color=T.TEXT_HI, bold=True, align=PP_ALIGN.CENTER,
                   anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.05)

    y += int(stage_h) + Inches(0.30)

    # Knowledge panel and artwork share one row, then the discipline caveat runs
    # full width beneath both so neither column is left with dead space.
    row_h = Inches(2.40)
    left_w = Inches(5.70)
    right_x = int(T.MARGIN_X) + int(left_w) + Inches(0.42)
    right_w = int(T.MARGIN_X) + int(T.CONTENT_W) - right_x

    knows = data["knows"]
    C.rect(slide, T.MARGIN_X, y, left_w, row_h, fill=T.SURFACE, line=T.LINE, radius=0.05)
    C.rect(slide, T.MARGIN_X, y, left_w, Inches(0.04), fill=T.CYAN)
    pad = Inches(0.28)
    C.add_text(slide, int(T.MARGIN_X) + int(pad), y + Inches(0.22),
               int(left_w) - 2 * int(pad), Inches(0.24), knows["heading"].upper(),
               size=T.SIZE_MICRO, color=T.CYAN, bold=True, letter_spacing=1.2)
    C.add_bullets(slide, int(T.MARGIN_X) + int(pad), y + Inches(0.56),
                  int(left_w) - 2 * int(pad), int(row_h) - Inches(0.74),
                  knows["items"], size=Pt(11), accent=T.CYAN,
                  line_spacing=1.2, space_after=Pt(6))

    art_path = T.SECTION_ART.get(data.get("art", ""))
    if art_path and art_path.exists():
        picture = C.add_picture_cover(slide, art_path, right_x, y, right_w, row_h)
        C.set_picture_transparency(picture, 0.22)
        C.rect(slide, right_x, y, right_w, row_h, fill=None, line=T.LINE, radius=0.05)

    y += int(row_h) + Inches(0.24)

    discipline = data["discipline"]
    y += C.note_bar(slide, T.MARGIN_X, y, T.CONTENT_W, discipline["body"],
                    label=discipline["heading"], accent=T.AMBER, size=Pt(11.5))
    return y


# ==========================================================================
# Security / trust architecture
# ==========================================================================

def security_stack(slide, data: dict, y: int) -> int:
    left_w = Inches(5.35)
    right_x = int(T.MARGIN_X) + int(left_w) + Inches(0.48)
    right_w = int(T.MARGIN_X) + int(T.CONTENT_W) - right_x

    C.add_text(slide, T.MARGIN_X, y, left_w, Inches(0.26), "DEFENCE IN DEPTH",
               size=T.SIZE_MICRO, color=T.CYAN, bold=True, letter_spacing=1.2)
    sy = y + Inches(0.32)
    band_h = Inches(0.32)
    band_gap = Inches(0.05)

    for index, (name, detail) in enumerate(data["stack"]):
        ratio = index / max(len(data["stack"]) - 1, 1)
        accent = C._mix(T.ROSE, T.CYAN, ratio)
        by = sy + index * (int(band_h) + int(band_gap))
        C.rect(slide, T.MARGIN_X, by, left_w, band_h,
               fill=C._mix(T.SURFACE, accent, 0.12), line=C._mix(T.LINE, accent, 0.35),
               radius=0.14)
        C.rect(slide, T.MARGIN_X, by, Inches(0.04), band_h, fill=accent)
        C.add_text(slide, int(T.MARGIN_X) + Inches(0.20), by, Inches(2.45), band_h, name,
                   size=Pt(10.5), color=T.TEXT_HI, bold=True, anchor=MSO_ANCHOR.MIDDLE)
        C.add_text(slide, int(T.MARGIN_X) + Inches(2.70), by,
                   int(left_w) - Inches(2.88), band_h, detail,
                   size=Pt(9), color=T.TEXT_MID, anchor=MSO_ANCHOR.MIDDLE,
                   align=PP_ALIGN.RIGHT)
        if index < len(data["stack"]) - 1:
            C.arrow(slide, int(T.MARGIN_X) + int(left_w / 2), by + int(band_h),
                    int(T.MARGIN_X) + int(left_w / 2), by + int(band_h) + int(band_gap),
                    T.LINE_SOFT, width=Pt(0.75))

    stack_bottom = sy + len(data["stack"]) * (int(band_h) + int(band_gap))

    injection = data["injection"]
    inj_h = Inches(2.16)
    C.rect(slide, right_x, y, right_w, inj_h,
           fill=C._mix(T.SURFACE, T.AMBER, 0.08), line=C._mix(T.LINE, T.AMBER, 0.38),
           radius=0.06)
    C.rect(slide, right_x, y, right_w, Inches(0.04), fill=T.AMBER)

    pad = Inches(0.26)
    inner_x = right_x + int(pad)
    inner_w = right_w - 2 * int(pad)
    C.add_text(slide, inner_x, y + Inches(0.22), inner_w, Inches(0.26),
               injection["heading"], size=Pt(13.5), color=T.TEXT_HI, bold=True)
    C.add_text(slide, inner_x, y + Inches(0.50), inner_w, Inches(0.46),
               injection["body"], size=Pt(10.5), color=T.TEXT_MID, line_spacing=1.28)

    flow = injection["flow"]
    fy = y + Inches(1.06)
    step_h = Inches(0.32)
    per_row = 4
    step_gap = Inches(0.09)
    step_w = int((inner_w - (per_row - 1) * int(step_gap)) / per_row)
    for index, step in enumerate(flow):
        row, col = divmod(index, per_row)
        fx = inner_x + col * (step_w + int(step_gap))
        fy_row = fy + row * (int(step_h) + int(Inches(0.30)))
        is_boundary = step == "Content boundary"
        is_final = index == len(flow) - 1
        accent = T.AMBER if is_boundary else (T.GREEN if is_final else T.TEXT_LOW)
        C.rect(slide, fx, fy_row, step_w, step_h,
               fill=C._mix(T.INK, accent, 0.14), line=C._mix(T.LINE, accent, 0.40),
               radius=0.18)
        size = C.fit_size(step, step_w - Inches(0.10), step_h, 8.5, line_spacing=1.02)
        C.add_text(slide, fx + Inches(0.05), fy_row, step_w - Inches(0.10), step_h, step,
                   size=Pt(size), color=T.TEXT_HI if (is_boundary or is_final) else T.TEXT_MID,
                   bold=is_boundary or is_final, align=PP_ALIGN.CENTER,
                   anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.02)
        if col < per_row - 1 and index < len(flow) - 1:
            C.arrow(slide, fx + step_w + Inches(0.01), fy_row + int(step_h / 2),
                    fx + step_w + int(step_gap) - Inches(0.01), fy_row + int(step_h / 2),
                    T.LINE, width=Pt(0.75))
        elif index < len(flow) - 1:
            C.arrow(slide, fx + int(step_w / 2), fy_row + int(step_h),
                    inner_x + int(step_w / 2), fy_row + int(step_h) + int(Inches(0.30)),
                    T.LINE, width=Pt(0.75))

    y = max(stack_bottom, y + int(inj_h)) + Inches(0.18)

    C.add_text(slide, T.MARGIN_X, y, T.CONTENT_W, Inches(0.24), "ENTERPRISE CONTROLS",
               size=T.SIZE_MICRO, color=T.CYAN, bold=True, letter_spacing=1.2)
    y += Inches(0.28)

    # Four columns of two keeps each control on a single line at this width.
    controls = data["controls"]
    per_col = 2
    col_count = (len(controls) + per_col - 1) // per_col
    geo = T.columns(col_count, gutter=Inches(0.28))
    for index, (cx, cw) in enumerate(geo):
        chunk = controls[index * per_col:(index + 1) * per_col]
        C.add_bullets(slide, cx, y, cw, Inches(0.58), chunk,
                      size=Pt(9.5), accent=T.INDIGO, line_spacing=1.16,
                      space_after=Pt(2.5))
    return y + Inches(0.60)
