---
name: Salon Dola
description: A private hair atelier entered through a full stop; black and white, Outfit only, the point as the door.
colors:
  ink: "#141414"
  ink-2: "#1e1e1e"
  paper: "#fafafa"
  mute: "#8a8a8a"
  line: "rgba(250, 250, 250, .12)"
  field-line: "rgba(250, 250, 250, .32)"
  error: "#f0b4ac"
typography:
  display:
    fontFamily: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
    fontSize: "clamp(3.6rem, 1.6rem + 9vw, 11.5rem)"
    fontWeight: 450
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 1.4rem + 5vw, 5.6rem)"
    fontWeight: 450
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 1.1rem + 1.4vw, 2.35rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
    fontSize: "clamp(1.02rem, .96rem + .25vw, 1.18rem)"
    fontWeight: 300
    lineHeight: 1.6
  label:
    fontFamily: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
    fontSize: ".72rem"
    fontWeight: 300
    lineHeight: 1.4
    letterSpacing: "0.5em"
  control:
    fontFamily: "'Outfit Variable', 'Outfit', system-ui, sans-serif"
    fontSize: ".82rem"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  none: "0"
  pill: "999px"
  circle: "50%"
spacing:
  col-gap: "clamp(12px, 2vw, 32px)"
  gutter: "clamp(16px, 4vw, 64px)"
  section-y: "clamp(7rem, 16vw, 15rem)"
components:
  button-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.pill}"
    padding: "0 1.35rem"
    height: "2.6rem"
  button-pill-hover:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
  button-pill-lg:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 2rem"
    height: "3.4rem"
  chip-choice:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 1.15rem"
    height: "2.5rem"
  chip-choice-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: ".55rem 0 .7rem"
  photo-frame:
    backgroundColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
  rule-frame:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "clamp(2.2rem, 6vw, 6rem) clamp(1.4rem, 5vw, 5rem)"
  point:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.circle}"
    size: "12px"
---

# Design System: Salon Dola

## Overview

**Creative North Star: "The Door in the Full Stop"**

Salon Dola is a private atelier you enter through a punctuation mark. The point after "DOLA." is the one figure the whole system is built from: it is the cursor, the shape that opens every photograph, the window the intro zooms through, the menu's toggle and the quiet pulse that confirms a sent form. Everything else is type on broken black, set in a single family and scaled hard, with thin light lines as the only structure.

The register is a fashion house, not a high-street salon. Density is low and the pace is slow: generous section spacing, long expo-out eases, photographs held back in warm monochrome until the pointer asks for colour. Warmth comes from the photography and the restraint, never from an accent colour or ornament. The logo's own two voices, a thin, widely tracked "SALON" and a tight, heavy "DOLA.", are the two voices of every page: tracked labels and tightly set display headings that end on a full stop.

The brief rejects the salon template of hero photo, service cards and price list, and rejects decorative icons; the build carries no icon set.

**Key Characteristics:**
- Pure black and white, warm-toned grayscale photography, no accent colour.
- Outfit only; scale and tracking do all the hierarchy work.
- Circles are the only curved shape; every plane, photo and frame is square.
- Headings are short statements that close with a full stop.
- Motion is slow and soft; reduced motion falls back to fades only.

## Colors

A strictly achromatic palette of broken black and near-white; contrast comes from black against white and from the photography.

### Neutral
- **Broken Black** (ink): the page field, the menu sheet and the text colour on filled pills. Never pure #000.
- **Raised Black** (ink-2): the plane behind photographs and the empty placeholder frames that hold only the point.
- **Gallery White** (paper): all primary text, the point, the cursor, filled pills, focus outlines and selected choice chips.
- **Graphite Label** (mute): tracked labels, optional-field hints, form status and the legal line. Body copy is not mute; it is paper at 82% opacity.
- **Hairline** (line): the 1px structural lines: footer top rule, the Bel/Aanvraag divider, the extension house-rule frame.
- **Field Line** (field-line): the stronger 1px stroke on form underlines and unselected choice chips, so controls read as controls against the softer structural hairline.

### Functional
- **Soft Error Rose** (error): form error messages and the failed-send status only. It is the single non-neutral value in the system and exists for legibility of errors, not decoration.

### Named Rules
**The No Accent Rule.** There is no brand accent. Emphasis is made with scale, weight, white fill or a line, never with hue. The error rose is the only colour and appears only when something has gone wrong.

**The Warm Monochrome Rule.** Photographs are shown grayscale with a slight warm cast (grayscale 1, sepia .16, contrast 1.04, brightness .94) and return to full colour on pointer hover over 1.2s. Touch devices keep the monochrome.

## Typography

**Display Font:** Outfit Variable (with Outfit, system-ui)
**Body Font:** Outfit Variable
**Label Font:** Outfit Variable

**Character:** One geometric family played through two extremes taken from the logo: weight 450 set tight at -0.03em for statements, weight 300 set wide at 0.5em for labels. No second typeface, ever.

### Hierarchy
- **Display** (450, clamp(3.6rem → 11.5rem), 0.92, -0.03em): section headings, always a short statement closing with a full stop ("Tim.", "Werk.", "Op afspraak."). Revealed line by line from a mask. The Tim heading scales further to clamp(6rem, 16vw, 15rem) on desktop.
- **Headline** (450, clamp(2.4rem → 5.6rem), 1.05, -0.03em): full-screen menu items and the closing gallery link. The phone number uses the same tight setting at weight 400 and tabular figures, up to 6.6rem.
- **Title** (400, clamp(1.45rem → 2.35rem), 1.15, -0.015em, balanced): subheadings and the form confirmation sentence. The extension house rule is a larger relative (400, up to 4.8rem, -0.025em, max 18ch).
- **Body** (300, clamp(1.02rem → 1.18rem), 1.6): paragraphs at paper 82% opacity, max 38ch, pretty wrapping.
- **Label** (300, .72rem, 0.5em, uppercase, mute): the "SALON" voice. Section index labels ("01 · De kapper"), footer column heads, the intro tagline and scroll hint. Centred labels compensate their trailing tracking with a negative right margin equal to the tracking.
- **Control** (400, .82rem, 0.06em): pill text, the Menu toggle, form field labels.

### Named Rules
**The Full Stop Rule.** Display headings and menu items are short declaratives that end on a period. The point is part of the word, not a decoration.

**The SALON Tracking Rule.** Wide 0.5em tracking belongs only to small uppercase labels at weight 300. Never track display type open; never set labels heavy.

## Layout

A 12-column grid inside a fluid side gutter (gutter), with a fluid column gap (col-gap). Sections are separated by very large vertical space (section-y) and composed asymmetrically: on wide screens a photo takes columns 1-6 and copy sits in 8-12; secondary photos overlap with negative margins rather than sitting in even rows. Below 900px everything stacks full width, with secondary photos narrowed (52-64%) and pushed to one side to keep the editorial offset.

Breakpoints observed: 640px (intro tagline breaks into stacked lines), 720px (footer goes three columns), 900px (asymmetric grid and pinned horizontal gallery), 1000px (booking becomes two columns with a sticky call column and a hairline between). The fixed nav is 72px high and transparent, gaining a black-to-clear gradient once the intro is passed.

The work gallery scrolls horizontally: pinned and scrubbed on desktop, native swipe with scroll-snap on mobile. Items vary in height and alignment (tall, low-bottom, square-top) so the strip has rhythm.

## Elevation & Depth

The system is flat. There are no elevation shadows, cards or layered surfaces; depth is made by the Raised Black plane under photographs, by the menu and intro window opening as circles over the page, and by the cursor blending in difference mode.

### Shadow Vocabulary
- **Point pulse** (`box-shadow: 0 0 0 0 → 0 0 0 22px`, paper from 35% to 0): an expanding ring on the confirmation point after a sent form, 2.6s loop, disabled under reduced motion.
- **Field focus underline** (`box-shadow: 0 1px 0 0 paper`): doubles the input underline on keyboard focus.

### Named Rules
**The Flat Atelier Rule.** Nothing floats. Shadow appears only as the point's pulse ring and as a focus underline, never to lift a surface.

## Shapes

Two shapes only. Planes, photographs, frames, inputs and the menu sheet are perfectly square (0). Circles are reserved for the point and the things that behave like it: the cursor, the menu toggle dot, the radio-style check mark, the circle-mask reveals on photos, the menu and the intro window. Interactive pills are fully round (999px). Borders are 1px, always.

### Named Rules
**The Point or Square Rule.** If it is clickable as a pill or behaves like the point, it is round; everything else has zero radius. There are no intermediate radii.

**The Circle Reveal Rule.** Photographs enter by a clip-path circle opening from the centre (0% to 75%, 1.9s power3.inOut) with a light parallax scale from 1.16. Under reduced motion they fade.

## Components

### Buttons
Quiet, fully round and decisive.
- **Shape:** fully round pill (999px), 1px paper border.
- **Primary:** paper fill, ink text, control type; 2.6rem high with 1.35rem side padding (the nav "Afspraak"). Large variant 3.4rem high, 2rem padding, .95rem text (form submit).
- **Hover / Focus:** on hover the fill drains to transparent and the text turns paper over .5s expo-out; press scales to .98; focus is a 1px paper outline offset 4px. Disabled sits at 50% opacity with a progress cursor.

### Text links
- **Style:** inherit colour, a 1px currentColor underline drawn as a background. On hover the underline retracts to the right over .6s. Large typographic links (phone, gallery link, menu items) dim in opacity instead.

### Chips
- **Style:** multi-select treatment pills, 2.5rem high, transparent with a 1px field-line border, .88rem text.
- **State:** hover brightens the border to paper; selected fills paper with ink text; focus shows a 1px paper outline offset 3px.

### Inputs / Fields
- **Style:** no box. Transparent field with only a 1px field-line bottom border, zero radius, body type at weight 300. Labels in control type above; optional hints in mute.
- **Focus:** the underline turns paper and is doubled by a 1px focus shadow.
- **Error:** message in error rose at .82rem directly under the field.
- **Checkbox:** a 1.2rem circle outline with a paper dot that scales in when checked.

### Navigation
- **Style:** fixed, 72px, right-aligned primary pill plus a "Menu" text toggle led by an 8px point that grows 1.8x when open. The small DOLA. mark fades in at left after the intro.
- **Menu:** a full-screen ink sheet that opens as a circle from the toggle's position (1s expo-out). Items are numbered headline-size statements with a tracked label index; hovering one dims the rest to 30%.

### Photo frame
- Square-cornered frame on Raised Black, image cover-fitted in warm monochrome, colour on hover, circle reveal on entry. Empty frames (awaiting photography) show only the 12px point centred on Raised Black.

### The Point (signature)
- A 12px paper circle. It is the cursor (80px circle scaled to .125 at rest, .5 over links, full over photos with a tracked "Bekijk" label, difference blend), the placeholder mark, the menu toggle and the form confirmation (14px, pulsing). In the intro, scrolling zooms the logo into its point until the point becomes a circular window onto the salon. No custom cursor on touch.

### House rule frame
- One statement in title-scale type, max 18ch, inside a 1px hairline square frame with generous padding. Reserved for a single non-negotiable rule per page.

## Do's and Don'ts

### Do:
- **Do** build every emphasis from ink, paper, scale and a 1px line; keep the error rose for errors only.
- **Do** end display headings and menu items with a full stop.
- **Do** keep wide 0.5em tracking for small weight-300 uppercase labels, and compensate trailing tracking when centred.
- **Do** reveal photographs with a circle opening and show them in warm monochrome, colour on hover only on fine pointers.
- **Do** use slow expo-out easing (cubic-bezier(.16, 1, .3, 1)) and long durations (1.2s to 2s); fall back to fades under reduced motion.
- **Do** use the point as the placeholder for missing photography rather than generic grey boxes or stock imagery.

### Don't:
- **Don't** introduce an accent colour or a second typeface.
- **Don't** use any radius other than 0, fully round pill or circle.
- **Don't** lift surfaces with drop shadows or build card grids; the salon template of hero photo, service cards and price list is rejected.
- **Don't** use decorative icons, emoji or exclamation marks; the point is the only mark.
- **Don't** show the custom cursor on touch devices.
