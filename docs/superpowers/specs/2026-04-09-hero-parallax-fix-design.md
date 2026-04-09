# HeroParallax Fix-in-Place Design

**Date:** 2026-04-09
**Status:** Approved (rev 4 — Lenis version check, code split, fonts.ready)
**Approach:** Fix-in-place (Approach A) — patch current component, don't rebuild

## BLOCKER 0: Verify Lenis Version

The GSAP integration pattern differs between Lenis v1 and v2. In v1 (`@studio-freight/lenis`), the API is `lenis.raf(time * 1000)`. In v2 (`lenis`), the raf method signature changed and the GSAP integration pattern is different. Using the wrong pattern means the ticker code silently does nothing.

**Confirmed:** Project uses `@studio-freight/lenis@1.0.42` (v1). All code in this spec uses the v1 API. If Lenis is ever upgraded to v2, the smooth-scroll-provider integration must be rewritten.

## BLOCKER 1: Resolve Video Filename First

Git status shows `public/hero-banner.mp4` (untracked) alongside `public/hero-video.mp4`. The component references `hero-video.mp4`. **Before any code changes:** confirm which file is the source of truth. If `hero-banner.mp4` is the intended video, rename it to `hero-video.mp4` or update all references. Do not proceed until this is resolved.

## Problem Summary

The HeroParallax component renders as a static image with text. Five root causes identified:

1. **Lenis + GSAP ScrollTrigger are not synchronized** — Lenis intercepts scroll and smoothly interpolates `scrollY` via its own rAF loop. ScrollTrigger reads `scrollY` on a separate rAF loop. The two are out of phase, so `self.progress` in ScrollTrigger's `onUpdate` is erratic or stuck at 0. This is why the video doesn't scrub and panels don't animate.

2. **`scrub: false` on main trigger breaks child triggers** — The main ScrollTrigger uses `scrub: false` while child triggers (panels, labels, CTA) use `scrub: 1`. The children depend on accurate scroll-position mapping that's broken by issue #1.

3. **Video `currentTime` seeking doesn't work with AI-generated video** — The Kling-generated MP4 has standard keyframe intervals (every few seconds). Setting `video.currentTime` to non-keyframe positions requires the browser to decode from the previous keyframe forward (50-200ms per seek), making the video appear frozen during scroll.

4. **Missing poster image** — `hero-poster.jpg` doesn't exist. Before the video loads, users see a black rectangle with floating text.

5. **Two hero sections back-to-back** — `page.tsx` renders `<HeroParallax />` then `<Hero />`. The content should be merged into one section.

## Solution Design

### Fix 1: Lenis + GSAP Integration (smooth-scroll-provider.tsx)

Connect Lenis to GSAP's ticker so both systems share a single rAF loop and scroll position.

**All setup and cleanup code must live inside the `useEffect` in `smooth-scroll-provider.tsx`.** The `lenisRaf` function must be defined inside the effect so it can access the `lenis` instance via closure, and so the cleanup function can reference the exact same function object for removal.

**Module-level (top of file, outside component):**

```typescript
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

**Inside the component's `useEffect` (this is a completely separate block — not inside the imports):**

```typescript
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Lenis notifies ScrollTrigger on every scroll frame
  lenis.on('scroll', ScrollTrigger.update);

  // CRITICAL: store as named variable — gsap.ticker.remove() needs
  // the exact same function reference. An inline arrow cannot be removed.
  const lenisRaf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);

  // iOS Safari: prevent touch inertia causing unpredictable scroll events
  ScrollTrigger.normalizeScroll(true);

  // Refresh AFTER fonts load — text elements need correct dimensions
  // for GSAP to calculate pin start/end positions accurately
  document.fonts.ready.then(() => ScrollTrigger.refresh());

  return () => {
    gsap.ticker.remove(lenisRaf);  // exact same reference
    ScrollTrigger.normalizeScroll(false);  // remove global side-effect
    lenis.destroy();
  };
}, []);
```

Remove the existing manual `requestAnimationFrame` loop that currently drives Lenis.

**Why scoping matters:** If `lenisRaf` is defined outside the `useEffect`, the `lenis` instance won't exist yet (it's created inside the effect). If it's an inline arrow inside `gsap.ticker.add()`, the cleanup can't reference it and `gsap.ticker.remove()` silently fails. Every hot reload then adds another ticker callback that can never be removed — causing performance degradation and multiple Lenis instances fighting each other.

**Why `document.fonts.ready`:** `useEffect` fires after paint but before fonts/images finish loading. If fonts aren't loaded yet, text elements have wrong dimensions, and GSAP calculates pin start/end positions incorrectly — the scroll zone ends too early or too late. `document.fonts.ready` is a native Promise that resolves when all `@font-face` declarations have loaded.

### Fix 2: Re-encode Video for Frame-Perfect Seeking, PlaybackRate as Fallback

**Primary approach — re-encode with dense keyframes:**

```bash
ffmpeg -i public/hero-video.mp4 -g 1 -keyint_min 1 -c:v libx264 -crf 28 public/hero-video-seekable.mp4
```

This makes every frame a keyframe (I-frame), enabling instant `currentTime` seeking. Replace `hero-video.mp4` with the re-encoded version. Then the original scroll-scrub approach works — `self.progress * duration` mapped to `video.currentTime` with rAF lerp smoothing.

**File size warning:** `-g 1` makes every frame an I-frame, which typically increases file size 3-5x. The 16MB source could become 50-80MB at `-crf 23`. We use `-crf 28` (higher = more compression) to keep it smaller. **If the output exceeds 30MB**, use the playbackRate fallback instead — a 50MB+ video on a portfolio site will cause noticeable load times on slower connections.

**If re-encode is not possible** (no ffmpeg, output exceeds 30MB, or other issues), fall back to playbackRate modulation:
- Video autoplays muted at 0.3× speed
- `video.play().catch(() => {})` as fallback for autoplay rejection
- Scroll velocity (`ScrollTrigger.getVelocity()` — static method) maps to playbackRate
- Floor at 0.15 for Safari, cap at 2.0
- `loop={true}`, no duration tracking

**Main ScrollTrigger changes (either approach):** Change to `scrub: 1` (was `scrub: false`). This gives smooth interpolated `self.progress` for progress bar and video opacity fade.

**Removals (if using re-encode):** Delete `targetTimeRef` and `rafRef` refs. Replace the existing broken rAF tick loop with a cleaner version that uses the same lerp pattern but is driven by a GSAP ticker callback instead of a standalone rAF loop.

**Removals (if using playbackRate fallback):** Delete `targetTimeRef`, `rafRef`, all `video.currentTime` assignment code, `cancelAnimationFrame(rafRef.current)` in cleanup.

### Fix 3: Merge Hero.tsx Content Into HeroParallax

Bring these elements from the existing Hero component:

1. **Availability badge** — Green-dot "Available for Hire" pill, positioned above headline
2. **Headline** — "12 years. Wall Street to AI SaaS." with gradient shimmer on last line. Replaces the existing "Heitinder Singh" h1 (which becomes a subtitle below the headline)
3. **Name subtitle** — "Heitinder Singh" in DM Serif Display, repositioned below headline (already exists in HeroParallax, just moves down)
4. **Mono tagline** — "Enterprise-grade frontend · Startup-speed shipping · AI-native"
5. **Bio paragraph** — Federal Reserve / BNY Mellon / 4 AI SaaS products
6. **CTAs** — MagneticButton ("See What I've Shipped") + "Book a Call" outline button
7. **Trust chips** — 4 chips at bottom of section with mouse parallax
8. **Scroll indicator** — CSS-animated chevron (already exists, keep as-is)

**Animation changes for merged content:**
- Replace Framer Motion entrance animations (`motion.div initial/animate`) with GSAP `gsap.from()` tweens that fire on mount
- Replace trust chip mouse parallax (`useMotionValue`/`useTransform`) with `gsap.quickTo()` for the mouse-follow effect
- MagneticButton already uses GSAP internally — no change needed

**Accessibility:** Check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip GSAP entrance animations + set `video.playbackRate = 0` (or don't autoplay) when true. The existing Hero checks `useReducedMotion()` from Framer; replace with the native matchMedia check since we're removing Framer from this component. **SSR safety:** `window.matchMedia` will throw `ReferenceError` during server-side rendering in Next.js. The check must be inside a `useEffect` (which only runs on the client) or guarded with `typeof window !== 'undefined'`. Since we only need it to gate animations (not affect initial render), putting it in the same `useEffect` that sets up GSAP animations is the cleanest approach.

**Removals:**
- HeroCanvas (Three.js background) — video replaces it
- All `framer-motion` imports from this component
- Hero.tsx — delete the file (content is fully merged, dead code invites confusion). **Before deleting:** grep the entire codebase for `import.*Hero` and `from.*Hero` to confirm no other file imports it. If other files reference it, update those imports first.
- Hero component import and `<Hero />` element from page.tsx

### Fix 4: Generate Poster from Video First Frame

```bash
ffmpeg -i public/hero-video.mp4 -vframes 1 -q:v 2 public/hero-poster.jpg
```

If ffmpeg is not available, manually open the video, screenshot frame 0, save as `hero-poster.jpg` in public/.

**Also:** Remove the `<source src="/hero-video.webm">` tag — `/public/hero-video.webm` does not exist. Can add it back if a WebM version is generated later.

### What Stays Unchanged

- 3D skill panels — same GSAP ScrollTrigger scrub, positions, border pulse CSS
- Scroll-reveal labels — same clip-path reveal at 20/40/60/80%
- End-of-pin CTA — "Built with precision. Ready for your stack."
- Progress bar — 2px blue scaleX at viewport top
- Particle canvas — 50-dot upward drift
- Dark gradient overlay — bottom 30% fade to black
- Video fade at 80% scroll — opacity to 0.6
- Mobile fallback — static skill tags
- Pin distance — 4x viewport height
- All child ScrollTrigger scrub values (`scrub: 1`)

## Implementation Order

0. Verify Lenis version is v1 (`@studio-freight/lenis`) — **confirmed: 1.0.42**
1. Resolve video filename blocker (`hero-banner.mp4` vs `hero-video.mp4`)
2. Fix 4 — generate poster image
3. Fix 2a — ffmpeg re-encode video with dense keyframes (or confirm fallback to playbackRate)
4. Fix 1 — Lenis + GSAP integration in smooth-scroll-provider
5. Fix 2b — update HeroParallax video scrub logic (scrub: 1, clean up dead refs/loops)
6. Fix 3 — merge Hero content, replace Framer with GSAP, delete Hero.tsx
7. Verify all animations work end-to-end

## Files Modified

| File | Change |
|------|--------|
| `components/shared/smooth-scroll-provider.tsx` | Connect Lenis to GSAP ticker via stored function reference, remove manual rAF loop, add `normalizeScroll(true)` |
| `components/sections/HeroParallax.tsx` | Fix video scrub (re-encode or playbackRate), merge Hero content, replace Framer with GSAP entrance anims, add reduced-motion check |
| `app/page.tsx` | Remove `<Hero />` and its import |
| `public/hero-poster.jpg` | Generate from video frame 0 |
| `public/hero-video.mp4` | Re-encode with `-g 1 -keyint_min 1` for dense keyframes |

## Files Deleted

| File | Reason |
|------|--------|
| `components/sections/Hero.tsx` | Content fully merged into HeroParallax. Dead code. |

## Files Not Modified

| File | Reason |
|------|--------|
| `styles/globals.css` | No CSS changes needed |
| `app/layout.tsx` | No changes needed |

## Risk Assessment

- **Lenis integration** — Well-documented pattern, GSAP docs recommend this exact approach for Lenis v1.x. Ticker reference stored for proper cleanup.
- **Video re-encode** — `-g 1` makes every frame an I-frame, increasing file size 3-5x. 16MB source could become 50-80MB at low CRF. Using `-crf 28` to compensate. If output exceeds 30MB, use playbackRate fallback instead.
- **normalizeScroll** — Prevents iOS Safari touch inertia issues. May slightly change scroll feel on iOS; test on device.
- **Merging content** — Purely additive; copying tested JSX into a new container
- **Removing Hero** — One-line change in page.tsx, easily reversible via git
- **Hot reload** — `gsap.ticker.remove(lenisRaf)` with stored reference + `ScrollTrigger.refresh()` on re-mount prevents stale ticker callbacks in dev mode
