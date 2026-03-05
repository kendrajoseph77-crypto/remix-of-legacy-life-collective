

## Plan: Turn all white text to black on How It Works page

The How It Works page (`src/pages/HowItWorks.tsx`) uses a light background, but the `WheelhouseAnimations.tsx` components contain hardcoded white text (`text-white`, `text-white/60`, `fill="white"`, `stroke="white"`) from earlier dark-background fixes. These need to become black/dark to match the light page background.

### Changes

**1. `src/components/WheelhouseAnimations.tsx`**
- Replace all `text-white` → `text-foreground` (resolves to near-black)
- Replace all `text-white/60` → `text-muted-foreground`
- Replace all `border-white/20` → `border-border`
- Replace SVG `fill="white"` → `fill="black"` or `fill="currentColor"`
- Replace SVG `stroke="white"` → `stroke="black"` or remove
- Update any inline `color: "white"` styles

**2. `src/pages/HowItWorks.tsx`**
- Scan for any white text classes or inline white color values and convert to dark equivalents

This restores proper contrast for light-background viewing.

