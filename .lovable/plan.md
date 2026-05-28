## Add `/coop5050` to the site navigation

The new page exists at `/coop5050` but isn't linked anywhere on the homepage — that's why you don't see it.

The current site doesn't actually have a dropdown menu; the homepage hero has a row of inline text links in the top-right (`How It Works · Join Now · Log in`). I'll add a "Reactivate" link there pointing to `/coop5050`, styled to match the others (white, underlined, hover-white).

### Files to change
- **`src/pages/Index.tsx`** — add one `<Link to="/coop5050">Reactivate</Link>` in the top-right nav cluster, between "How It Works" and "Join Now".

### Out of scope
- No new dropdown component (the site doesn't use one). If you actually want a real dropdown menu (e.g. "Members ▾" containing Reactivate, Welcome Back, Log in), say so and I'll build it instead.
- Other pages (HowItWorks, Landing pages, etc.) keep their existing navs untouched unless you ask.

### Open question
Is **"Reactivate"** the right label, or do you prefer something else like *Coop5050*, *Renew*, or *Returning members*?
