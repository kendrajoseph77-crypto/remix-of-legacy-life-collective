## New page: `/coop5050` ("coop5050.works")

Add a new route that ports all of the content from David's *Coop5050 Landing Page* (`/coop5050`) into this project — but rebuilt to match **this site's** existing design system (editorial light theme, Cormorant Garamond headings, Plus Jakarta Sans body, gold accents, 3D buttons, brand colors for Fast / Core / Max).

### Source content (verbatim copy, just restyled)
Pulled from project "David 5050 Landing Page" → `src/routes/coop5050.tsx`. All sections preserved:
1. Header with brand + nav (Your savings · How to restart · How you get paid · Reactivate)
2. Hero — *"You do not repay your levels. You simply reactivate your position."* + CTA *"Reactivate from $45"* + 3 stat tiles (Up to $10,000 / From $45 / Position preserved)
3. Savings message + Ease of restart (2-col)
4. What stays saved + Why this matters (2-col)
5. How you get paid (3-col: How you earn / How the system helps / When you get paid)
6. Automation + CUI relevance (2-col)
7. Trust & proof stats (25 years / 178 countries / 9,000+ days / $1.5B)
8. Three Systems · One Movement — Fast / Core / Max tier cards with SLF pricing
9. Urgency block ("free agents")
10. Final CTA panel — *"Reactivate the position you already paid for"* + 4-step list

### Design mapping (this site's tokens, NOT David's)
- Background: editorial white (`hsl(0 0% 100%)`), foreground near-black `hsl(0 0% 8%)`
- Headings: **Cormorant Garamond**, weight 600, tight letter-spacing
- Body: **Plus Jakarta Sans**, 16px / 1.6 line-height
- Eyebrows: 11px uppercase, tracked 0.12em, muted grey `hsl(0 0% 45%)`
- Section padding: 96px vertical, alternating white / `hsl(0 0% 98%)` bands
- Cards: white, 1px border `hsl(0 0% 90%)`, 12px radius, no heavy shadow
- Tier cards: bordered in brand color (Fast `hsl(224 85% 58%)`, Core `hsl(160 80% 42%)`, Max gold `hsl(41 50% 65%)`)
- Primary CTAs: existing `.btn-gold` (3D gold) for "Reactivate from $45" / "Renew your account"
- Secondary CTAs: existing `.btn-coral` (3D editorial black)
- Final panel: dark `hsl(0 0% 6%)` section with champagne/gold text — matches existing `.section-dark`
- Reuses `<Navbar />` (logo only) at top
- Numbered bullets: small circular badge `hsl(0 0% 96%)` bg, near-black numeral

### Files to add / change
- **Create** `src/pages/Coop5050.tsx` — single-file page, all sections inline, using Tailwind + design tokens from `index.css`. No new dependencies.
- **Edit** `src/App.tsx` — import `Coop5050` and add `<Route path="/coop5050" element={<Coop5050 />} />` above the catch-all.

### Out of scope
- No backend, no forms, no theme toggle (this site is light-only editorial).
- "coop5050.works" is treated as the page name/concept; the route itself stays `/coop5050`. Actually wiring the custom domain `coop5050.works` happens in Publish settings, not in code.
- David's structural CSS (`.page-5050`, `.bullet-dot`, etc.) is **not** ported — we re-implement with this site's tokens.

### Open question
Confirm the route path should be **`/coop5050`** (matches David's URL). If you'd rather use `/coop5050-works` or something else, say the word and I'll adjust before building.
