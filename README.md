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
2. **Project screenshot** `assets/estora-suites.jpg` (about 1280x800). It appears automatically in the Work panel.

## Adding projects
Duplicate the `<article class="plate">` block in the Work panel (`#work`) and fill in real details only.

## Tuning the pacing
`CUES` in `js/site.js` sets when each panel fades in/out (progress 0 to 1); `.track` height in `css/style.css`
(currently 500vh) sets how long the scroll is.
