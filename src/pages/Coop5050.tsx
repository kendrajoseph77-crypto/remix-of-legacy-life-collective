import { useEffect } from "react";

const Coop5050 = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .c5050 {
          --paper: #F4F0E8;
          --paper-2: #FBF8F2;
          --ink: #1F1B16;
          --ink-soft: #5C564D;
          --ink-faint: #8E877B;
          --line: rgba(31, 27, 22, 0.12);
          --accent: #1A5E54;
          --accent-soft: #DCE8E2;
          --accent-warm: #C2562B;
          --display: 'Fraunces', Georgia, serif;
          --body: 'Spline Sans', system-ui, sans-serif;
          --content: 1080px;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--body);
          font-size: 17px;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          position: relative;
        }
        .c5050 * { box-sizing: border-box; }
        .c5050 .wrap { width: min(calc(100% - 2.5rem), var(--content)); margin-inline: auto; }
        .c5050::before {
          content: "";
          position: fixed; inset: 0; pointer-events: none; opacity: 0.4; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        }
        .c5050 header.c-header {
          position: sticky; top: 0; z-index: 50;
          background: color-mix(in srgb, var(--paper) 90%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .c5050 .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; }
        .c5050 .logo {
          font-family: var(--display); font-weight: 600; font-size: 1.3rem; letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .c5050 .logo-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--accent-warm); }
        .c5050 .header-cta {
          font-family: var(--body); font-weight: 600; font-size: 0.9rem;
          background: var(--ink); color: var(--paper-2);
          padding: 0.65rem 1.25rem; border-radius: 999px;
          transition: transform 0.2s, background 0.2s; text-decoration: none;
        }
        .c5050 .header-cta:hover { transform: translateY(-1px); background: var(--accent); }

        .c5050 .hero { padding: clamp(3.5rem, 9vw, 7rem) 0 clamp(3rem, 7vw, 5.5rem); position: relative; z-index: 2; }
        .c5050 .hero-eyebrow {
          font-family: var(--body); font-weight: 600;
          font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.7rem;
        }
        .c5050 .hero-eyebrow::before { content: ""; width: 28px; height: 1.5px; background: var(--accent); }
        .c5050 .hero h1 {
          font-family: var(--display); font-weight: 400;
          font-size: clamp(2.6rem, 6.5vw, 5rem); line-height: 1.02;
          letter-spacing: -0.025em; max-width: 16ch; margin-bottom: 1.8rem;
        }
        .c5050 .hero h1 em { font-style: italic; color: var(--accent); }
        .c5050 .hero-lead {
          font-size: clamp(1.1rem, 1.4vw, 1.3rem); color: var(--ink-soft);
          max-width: 48ch; margin-bottom: 2.5rem; line-height: 1.55;
        }
        .c5050 .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .c5050 .btn-primary {
          font-family: var(--body); font-weight: 600; font-size: 1rem;
          background: var(--accent); color: var(--paper-2);
          padding: 1rem 1.8rem; border-radius: 999px; border: none; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 0.6rem;
          transition: transform 0.25s cubic-bezier(.2,.8,.2,1), box-shadow 0.25s;
          box-shadow: 0 6px 20px rgba(26, 94, 84, 0.22);
        }
        .c5050 .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(26, 94, 84, 0.3); }
        .c5050 .btn-text {
          font-family: var(--body); font-weight: 500; font-size: 0.98rem;
          color: var(--ink); text-decoration: none; border-bottom: 1.5px solid var(--ink);
          padding-bottom: 2px; transition: opacity 0.2s;
        }
        .c5050 .btn-text:hover { opacity: 0.6; }

        .c5050 .legacy {
          margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--line);
          display: flex; flex-wrap: wrap; gap: 2.5rem 3.5rem;
        }
        .c5050 .legacy-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .c5050 .legacy-num {
          font-family: var(--display); font-weight: 500; font-size: 1.7rem;
          letter-spacing: -0.02em; color: var(--ink);
        }
        .c5050 .legacy-label { font-size: 0.82rem; color: var(--ink-faint); letter-spacing: 0.02em; }

        .c5050 section { position: relative; z-index: 2; }
        .c5050 .section-pad { padding: clamp(3.5rem, 7vw, 6rem) 0; }
        .c5050 .section-eyebrow {
          font-family: var(--body); font-weight: 600;
          font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--accent-warm); margin-bottom: 1rem;
        }
        .c5050 h2 {
          font-family: var(--display); font-weight: 400;
          font-size: clamp(1.9rem, 3.5vw, 2.9rem); line-height: 1.1;
          letter-spacing: -0.02em; max-width: 18ch; margin-bottom: 1.2rem;
        }
        .c5050 h2 em { font-style: italic; color: var(--accent); }
        .c5050 .section-lead { font-size: 1.1rem; color: var(--ink-soft); max-width: 52ch; }

        .c5050 .saved { background: var(--paper-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .c5050 .saved-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: start; }
        .c5050 .saved-list { list-style: none; display: flex; flex-direction: column; gap: 1.1rem; margin-top: 0.5rem; padding: 0; }
        .c5050 .saved-list li { display: flex; gap: 0.9rem; align-items: flex-start; font-size: 1.05rem; color: var(--ink); }
        .c5050 .saved-list .check {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
          background: var(--accent-soft); display: grid; place-items: center; margin-top: 2px;
        }
        .c5050 .saved-list .check::after {
          content: ""; width: 9px; height: 5px;
          border: 2px solid var(--accent); border-top: 0; border-right: 0;
          transform: rotate(-45deg) translate(0, -1px);
        }
        .c5050 .saved-note {
          background: var(--paper); border: 1px solid var(--line); border-radius: 14px;
          padding: 1.8rem; font-family: var(--display); font-style: italic;
          font-size: 1.15rem; line-height: 1.5; color: var(--ink-soft);
        }
        .c5050 .saved-note strong { font-style: normal; font-weight: 600; color: var(--ink); }

        .c5050 .how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 2.5rem; }
        .c5050 .how-card { background: var(--paper-2); border: 1px solid var(--line); border-radius: 16px; padding: 2rem; }
        .c5050 .how-card.feature { grid-column: span 2; background: var(--ink); color: var(--paper-2); border-color: var(--ink); }
        .c5050 .how-card h3 {
          font-family: var(--display); font-weight: 500; font-size: 1.35rem;
          margin-bottom: 1rem; letter-spacing: -0.01em;
        }
        .c5050 .how-card.feature h3 { color: var(--paper-2); }
        .c5050 .how-card ul { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; padding: 0; margin: 0; }
        .c5050 .how-card li { display: flex; gap: 0.7rem; font-size: 1rem; color: var(--ink-soft); }
        .c5050 .how-card.feature li { color: color-mix(in srgb, var(--paper-2) 80%, transparent); }
        .c5050 .how-card li::before { content: "—"; color: var(--accent-warm); flex-shrink: 0; }
        .c5050 .how-card.feature li::before { color: var(--accent); }
        .c5050 .how-card.feature .big {
          font-family: var(--display); font-size: 2.4rem; font-weight: 400;
          color: var(--paper-2); margin-bottom: 0.3rem; letter-spacing: -0.02em;
        }
        .c5050 .how-card.feature .big em { font-style: italic; color: #8FC9BE; }

        .c5050 .tiers { background: var(--paper-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .c5050 .tier-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2.5rem; }
        .c5050 .tier {
          background: var(--paper); border: 1px solid var(--line); border-radius: 16px;
          padding: 1.8rem; display: flex; flex-direction: column; gap: 1rem;
          transition: transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s, border-color 0.3s;
        }
        .c5050 .tier:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(31,27,22,0.1); border-color: var(--accent); }
        .c5050 .tier-name {
          font-family: var(--body); font-weight: 600; font-size: 0.8rem;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent);
        }
        .c5050 .tier.core { border-color: var(--accent); position: relative; }
        .c5050 .tier-tag {
          position: absolute; top: -10px; right: 18px;
          background: var(--accent); color: var(--paper-2);
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.25rem 0.7rem; border-radius: 999px;
        }
        .c5050 .tier-amounts { font-family: var(--display); font-size: 1.5rem; font-weight: 500; letter-spacing: -0.02em; }
        .c5050 .tier-fee { font-size: 0.92rem; color: var(--ink-faint); }
        .c5050 .tier-desc { font-size: 0.95rem; color: var(--ink-soft); line-height: 1.5; border-top: 1px solid var(--line); padding-top: 1rem; }

        .c5050 .reactivate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
        .c5050 .steps { list-style: none; counter-reset: step; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; padding: 0; }
        .c5050 .steps li { counter-increment: step; display: flex; gap: 1.1rem; align-items: flex-start; }
        .c5050 .steps li::before {
          content: counter(step); flex-shrink: 0;
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--accent); color: var(--paper-2);
          font-family: var(--display); font-weight: 500; font-size: 1rem;
          display: grid; place-items: center;
        }
        .c5050 .steps .step-text { font-size: 1.05rem; color: var(--ink); padding-top: 0.3rem; }
        .c5050 .pay-methods { margin-top: 1.5rem; font-size: 0.9rem; color: var(--ink-faint); }

        .c5050 .urgency { background: var(--ink); color: var(--paper-2); }
        .c5050 .urgency h2 { color: var(--paper-2); }
        .c5050 .urgency h2 em { color: #8FC9BE; }
        .c5050 .urgency .section-lead { color: color-mix(in srgb, var(--paper-2) 78%, transparent); }
        .c5050 .urgency-points { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 2rem; max-width: 52ch; padding: 0; }
        .c5050 .urgency-points li { list-style: none; display: flex; gap: 0.8rem; color: color-mix(in srgb, var(--paper-2) 85%, transparent); }
        .c5050 .urgency-points li::before { content: "→"; color: var(--accent-warm); flex-shrink: 0; }

        .c5050 .final { text-align: center; padding: clamp(4rem, 8vw, 7rem) 0; }
        .c5050 .final h2 { margin-inline: auto; max-width: 20ch; }
        .c5050 .final .section-lead { margin-inline: auto; margin-bottom: 2.5rem; }
        .c5050 .final .btn-primary { font-size: 1.1rem; padding: 1.15rem 2.2rem; }

        .c5050 footer.c-footer { border-top: 1px solid var(--line); padding: 2.5rem 0; position: relative; z-index: 2; }
        .c5050 .footer-inner { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; color: var(--ink-faint); font-size: 0.85rem; }

        .c5050 .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.2,.8,.2,1); }
        .c5050 .reveal.in { opacity: 1; transform: none; }

        @media (max-width: 820px) {
          .c5050 .saved-grid, .c5050 .reactivate-grid { grid-template-columns: 1fr; gap: 2rem; }
          .c5050 .how-grid { grid-template-columns: 1fr; }
          .c5050 .how-card.feature { grid-column: span 1; }
          .c5050 .tier-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="c5050">
        <header className="c-header">
          <div className="wrap header-inner">
            <div className="logo"><span className="logo-dot" />5050.Works</div>
            <a href="#reactivate" className="header-cta">Reactivate</a>
          </div>
        </header>

        <section className="hero">
          <div className="wrap">
            <div className="hero-eyebrow reveal">Welcome back</div>
            <h1 className="reveal">Your position is <em>still here.</em> Waiting for you.</h1>
            <p className="hero-lead reveal">
              You were an active member — and you're already in, with as much as $10,000 in 5050 levels ready to go to work for you. Your levels, your team, your history: all of it is exactly where you left it. You're not starting over. You're turning something back on.
            </p>
            <div className="hero-actions reveal">
              <a href="#reactivate" className="btn-primary">Reactivate your account →</a>
              <a href="#saved" className="btn-text">See what's saved</a>
            </div>

            <div className="legacy reveal">
              <div className="legacy-item"><div className="legacy-num">25 years</div><div className="legacy-label">A model that's lasted</div></div>
              <div className="legacy-item"><div className="legacy-num">178 countries</div><div className="legacy-label">Members worldwide</div></div>
              <div className="legacy-item"><div className="legacy-num">9,000+ days</div><div className="legacy-label">Without missing a payout</div></div>
              <div className="legacy-item"><div className="legacy-num">$1.5 billion</div><div className="legacy-label">Earned by members</div></div>
            </div>
          </div>
        </section>

        <section id="saved" className="saved section-pad">
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: "2.5rem" }}>
              <div className="section-eyebrow">What's saved</div>
              <h2>You're not <em>rebuilding</em> from scratch.</h2>
              <p className="section-lead">The most common worry when coming back is "do I have to start over?" You don't. Everything you built is preserved.</p>
            </div>

            <div className="saved-grid">
              <div className="saved-note reveal">
                <strong>The main reason to come back today —</strong> Your team is saved. The people you built with are still connected to your position, waiting, intact.
              </div>

              <ul className="saved-list reveal">
                <li><span className="check" />You're not starting from zero.</li>
                <li><span className="check" />Your levels are saved — you don't pay for them again.</li>
                <li><span className="check" />Your open and closed matrices are preserved.</li>
                <li><span className="check" />Every contribution you've sent and received is still part of your history.</li>
              </ul>
            </div>

            <p className="reveal" style={{ marginTop: "2.5rem", fontSize: "1rem", color: "var(--ink-soft)", maxWidth: "62ch" }}>
              To come back, you just pay the software licensing fee — then you start earning again on the levels you already paid for. That's the whole step.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">How it works</div>
              <h2>Simple mechanics. <em>Everything automated.</em></h2>
              <p className="section-lead">The structure does the work. Here's what's actually happening underneath, in plain terms.</p>
            </div>

            <div className="how-grid">
              <div className="how-card feature reveal">
                <div className="big">Earn 50% <em>instantly,</em> from every position.</div>
                <p style={{ color: "color-mix(in srgb, var(--paper-2) 78%, transparent)", marginBottom: "1.2rem" }}>
                  The 2×2 follow-me matrix — six positions per cooperative, help from above and below, earning simultaneously across cooperatives. The model returns 300% from each cooperative, over and over.
                </p>
                <ul>
                  <li>Six positions in each cooperative</li>
                  <li>Receive 50% from each position, instantly</li>
                  <li>Earn simultaneously across cooperatives</li>
                </ul>
              </div>

              <div className="how-card reveal">
                <h3>100% goes to members</h3>
                <ul>
                  <li>Earn 50% from every member you invite — whether that's 2 or 2,000</li>
                  <li>Earn again from many of the members they invite</li>
                  <li>Earn again when your team re-enters</li>
                  <li>No middleman, no company taking a cut</li>
                </ul>
              </div>

              <div className="how-card reveal">
                <h3>The Mobius Loop</h3>
                <ul>
                  <li>Auto follow-me, auto re-entry</li>
                  <li>Optional auto-upgrade — your choice</li>
                  <li>Earn from all vaults at once</li>
                  <li>Your team stays together — no boards, no splits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap">
            <div className="reveal" style={{ marginBottom: "2rem" }}>
              <div className="section-eyebrow">CoopWallet</div>
              <h2>Your money, in <em>three seconds.</em></h2>
              <p className="section-lead">A free, private, decentralized wallet — built so the money moves the moment it's yours.</p>
            </div>
            <ul className="saved-list reveal" style={{ maxWidth: "62ch" }}>
              <li><span className="check" />Instant payouts — receive in about three seconds.</li>
              <li><span className="check" />Withdraw just as fast.</li>
              <li><span className="check" />Held in a stable coin, so the value stays steady.</li>
              <li><span className="check" />2FA secured, private, and yours.</li>
            </ul>
          </div>
        </section>

        <section className="tiers section-pad">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow">Choosing where to restart</div>
              <h2>Three tiers. Nine vaults. <em>One way back in.</em></h2>
              <p className="section-lead">Pick the level of commitment that fits where you are now. You can always move up later.</p>
            </div>

            <div className="tier-grid">
              <div className="tier reveal">
                <div className="tier-name">Fast</div>
                <div className="tier-amounts">$25 · $50 · $100</div>
                <div className="tier-fee">Software fee $45 / 3 months</div>
                <div className="tier-desc">The lowest restart point. Best if you want to reactivate quickly and ease back in.</div>
              </div>
              <div className="tier core reveal">
                <span className="tier-tag">Most chosen</span>
                <div className="tier-name">Core</div>
                <div className="tier-amounts">$250 · $500 · $1,000</div>
                <div className="tier-fee">Software fee $75 / 3 months</div>
                <div className="tier-desc">A balanced path for members building a team again, with solid mid-tier participation.</div>
              </div>
              <div className="tier reveal">
                <div className="tier-name">Max</div>
                <div className="tier-amounts">$2,500 · $5,000 · $10,000</div>
                <div className="tier-fee">Software fee $150 / 3 months</div>
                <div className="tier-desc">Full access to the top vaults, for members ready for the highest level of participation.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="urgency section-pad">
          <div className="wrap">
            <div className="reveal">
              <div className="section-eyebrow" style={{ color: "#E89A78" }}>Worth knowing</div>
              <h2>A position left idle <em>doesn't stay yours</em> forever.</h2>
              <p className="section-lead">While an account is lapsed, it's treated as a free agent — and so is the team attached to it. Members can choose a new team, and their teams can move with them. The longer a position sits, the more of that momentum can drift elsewhere.</p>
              <ul className="urgency-points">
                <li>Lapsed members become free agents</li>
                <li>Free agents can choose a new team</li>
                <li>And their teams can follow them</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="reactivate" className="section-pad">
          <div className="wrap">
            <div className="reactivate-grid">
              <div className="reveal">
                <div className="section-eyebrow">Your next step</div>
                <h2>Your position is saved. <em>Turning it back on</em> is simple.</h2>
                <p className="section-lead">Three steps, and you're earning again through your saved position and CoopWallet.</p>
              </div>
              <div className="reveal">
                <ol className="steps">
                  <li><div className="step-text">Log in to your 5050.Works account.</div></li>
                  <li><div className="step-text">Pay your software licensing fee — card, Apple Pay, Google Pay, crypto, and more.</div></li>
                  <li><div className="step-text">Start receiving again through your saved position.</div></li>
                </ol>
                <div style={{ marginTop: "2rem" }}>
                  <a href="https://www.coop5050.com/#join" target="_blank" rel="noopener noreferrer" className="btn-primary">Reactivate your account →</a>
                </div>
                <div className="pay-methods">Card · Apple Pay · Google Pay · Crypto · and more</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="c-footer">
          <div className="wrap footer-inner">
            <div>5050.Works — Reconnect</div>
            <div>Your position has been held for you.</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Coop5050;
