# my-portfolio

Static portfolio for Alvin Emmanuel Gideon (plain HTML/CSS/JS, hosted on Netlify, no build step).
Fonts: Inter Tight via Google Fonts (loaded non-blocking).

- `index.html` content (four scroll-driven panels) · `css/style.css` styles · `js/site.js` scroll, video scrub, preloader, menu
- `privacy.html`, `cookies.html`, `terms.html` + `legal.css` unchanged legal pages
- `_headers` Netlify security headers (CSP allows `'self'` scripts and media)

## How the scroll experience works
A fixed stage (video or typographic fallback) sits behind four fixed panels. A tall invisible track provides the scroll
height; `js/site.js` maps scroll progress to panel opacity/position and to the video's `currentTime`.
With `prefers-reduced-motion`, or without JavaScript, the panels stack as an ordinary page.

## Optional assets (the site works without them)
Nothing is faked: until these exist, the stage shows a typographic fallback and the project panel shows text only.

1. **Scrub video** `assets/scrub.mp4` (and optionally `assets/scrub.webm`). Use a screen recording of your own work
   (for example a slow scroll through estorasuites.netlify.app). Encode it all-intra so every frame is seekable:

   ```
   ffmpeg -i recording.mov -an -vf "scale=1280:-2,fps=24" -c:v libx264 -g 1 -crf 24 -pix_fmt yuv420p -movflags +faststart assets/scrub.mp4
   ffmpeg -i recording.mov -an -vf "scale=1280:-2,fps=24" -c:v libvpx-vp9 -g 1 -crf 34 -b:v 0 assets/scrub.webm
   ```
   Aim for 8–20 seconds and under ~8 MB. Longer or larger files scrub less smoothly on phones.
2. **Project previews** (about 1280x800, under ~250 KB, JPG). Each appears automatically in its Work-panel entry:
   - `assets/market-square.jpg`: screenshot of https://www.marketsquareexp.com/ (a clean placeholder shows until it exists)
   - `assets/estora-suites.jpg`: screenshot of ESTORA Suites (hidden until it exists)

## Adding projects
Duplicate an `<article class="plate">` block in the Work panel (`#work`) and fill in real details only.
Market Square: once you confirm exactly what you delivered, add a `My role` row where the HTML comment in `#plate-ms` says so.

## Tuning the pacing
`CUES` in `js/site.js` sets when each panel fades in/out (progress 0 to 1); `.track` height in `css/style.css`
(currently 500vh) sets how long the scroll is.

## Motion system
All motion lives in the existing `js/site.js` frame loop and `css/style.css`; no libraries, no extra animation loops.
- **Entrance:** loader lifts away (capped at 3 s, independent of fonts/video), header settles in, headline words rise through a mask, then eyebrow, text and CTAs follow in sequence.
- **Panel reveals:** each panel gets class `.in` when it is clearly visible and loses it only once fully gone (hysteresis), so small scroll wiggles never replay animations. Content reveals use `data-r` + `--i` (stagger index) and `.wi` + `--wi` (word index), set automatically.
- **Controls:** nav underline draws on hover/focus and marks the active section; buttons nudge their arrow and compress slightly when pressed.
- **Projects:** preview zooms on hover and answers the pointer slightly (fine pointers only). On touch devices the "Visit" tag and caption are always visible, so nothing depends on hover.
- **Stage:** between panels the visual comes forward (`--gap`), so the scroll feels like chapters.
- **Copy email:** a real action with visible and screen-reader confirmation.
- **Reduced motion / no JavaScript:** everything shows immediately as a normal stacked page; no stagger, parallax, loops or smooth scrolling.
Tune pacing with `CUES` in `js/site.js`, the `.track` height (460vh) and the delays in the "Motion system" block of the CSS.
