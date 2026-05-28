import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const eyebrowStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "hsl(0 0% 45%)",
};

const cardStyle: React.CSSProperties = {
  background: "hsl(0 0% 100%)",
  border: "1px solid hsl(0 0% 90%)",
  borderRadius: "12px",
  padding: "32px",
};

const Dot = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: "28px",
      height: "28px",
      borderRadius: "9999px",
      background: "hsl(0 0% 96%)",
      color: "hsl(0 0% 15%)",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "14px",
      fontWeight: 600,
      marginTop: "2px",
    }}
  >
    {children}
  </span>
);

const Bullet = ({ mark, children }: { mark: React.ReactNode; children: React.ReactNode }) => (
  <li style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
    <Dot>{mark}</Dot>
    <div style={{ flex: 1, color: "hsl(0 0% 25%)", lineHeight: 1.6 }}>{children}</div>
  </li>
);

const sectionPadding: React.CSSProperties = { padding: "96px 24px" };
const container: React.CSSProperties = { maxWidth: "1200px", margin: "0 auto" };

const Coop5050 = () => {
  return (
    <div style={{ background: "hsl(0 0% 100%)", color: "hsl(0 0% 8%)", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ ...sectionPadding, paddingTop: "160px", background: "hsl(0 0% 100%)" }}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "start" }} className="coop-grid-2">
          <div>
            <span style={eyebrowStyle}>25 Years · Cooperative Crowdfunding™</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", lineHeight: 1.05, marginTop: "20px", marginBottom: "24px" }}>
              You do <em style={{ color: "hsl(39 55% 52%)" }}>not</em> repay your levels.<br />
              You simply reactivate your position.
            </h1>
            <p style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "hsl(0 0% 35%)", marginBottom: "32px", maxWidth: "640px" }}>
              If you already paid for levels in Coop5050, those levels remain yours. That can mean preserved value of up to $10,000. Instead of repurchasing what you already own, restart for as little as a $45 Software Licensing Fee.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
              <a href="#renew" className="btn-gold" style={{ padding: "16px 32px", borderRadius: "8px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.8rem" }}>
                Reactivate from $45
              </a>
              <a href="#savings" className="btn-coral" style={{ padding: "16px 32px", borderRadius: "8px", fontWeight: 700 }}>
                See your preserved value
              </a>
            </div>
            <div id="savings" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                { v: "Up to $10,000", l: "Possible level savings" },
                { v: "From $45", l: "SLF to restart" },
                { v: "Position preserved", l: "Levels, team, history" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "20px", border: "1px solid hsl(0 0% 90%)", borderRadius: "10px", background: "hsl(0 0% 98%)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "hsl(0 0% 8%)" }}>{s.v}</div>
                  <div style={{ fontSize: "0.8rem", color: "hsl(0 0% 45%)", marginTop: "4px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <aside style={{ ...cardStyle, padding: "40px" }}>
            <span style={eyebrowStyle}>Why members act now</span>
            <h2 style={{ fontSize: "1.75rem", margin: "16px 0 24px" }}>What makes this the strongest decision today</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
              <Bullet mark="1"><strong>You already paid for your levels.</strong><br />You do not need to buy them again.</Bullet>
              <Bullet mark="2"><strong>Restart cost is small versus saved value.</strong><br />Pay the SLF and turn earning back on.</Bullet>
              <Bullet mark="3"><strong>Position, team, and history are preserved.</strong><br />Reactivating, not rebuilding.</Bullet>
              <Bullet mark="4"><strong>Fully automated.</strong><br />Once active, the system handles the flow.</Bullet>
            </ul>
          </aside>
        </div>
      </section>

      {/* TRUST & PROOF */}
      <section style={{ ...sectionPadding, background: "hsl(0 0% 98%)" }}>
        <div style={container}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 48px" }}>
            <span style={eyebrowStyle}>Trust and proof</span>
            <h2 style={{ fontSize: "2.5rem", margin: "16px 0" }}>Coop5050 has real history.</h2>
            <p style={{ color: "hsl(0 0% 45%)", fontSize: "1.05rem" }}>Twenty-five years of cooperative crowdfunding — uninterrupted.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="coop-grid-4">
            {[
              { v: "25 years", l: "Trusted track record" },
              { v: "178 countries", l: "Global reach" },
              { v: "9,000+ days", l: "Without missing a payday" },
              { v: "$1.5 billion", l: "Earned by members" },
            ].map((p, i) => (
              <div key={i} style={{ ...cardStyle, textAlign: "center", padding: "32px 20px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "hsl(39 55% 52%)" }}>{p.v}</div>
                <div style={{ fontSize: "0.85rem", color: "hsl(0 0% 45%)", marginTop: "8px" }}>{p.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVINGS + RESTART */}
      <section style={{ ...sectionPadding, background: "hsl(0 0% 98%)" }}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="coop-grid-2">
          <article style={cardStyle}>
            <span style={eyebrowStyle}>The savings message</span>
            <h2 style={{ fontSize: "1.75rem", margin: "16px 0 24px" }}>This is not a small discount. It is a major financial advantage.</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
              <Bullet mark="•"><strong>You do not repay levels you already own.</strong></Bullet>
              <Bullet mark="•">If you reached higher levels, your preserved value may be as much as $10,000.</Bullet>
              <Bullet mark="•">The decision is not "Should I start again?" — it is "Do I want to unlock what I already paid for?"</Bullet>
              <Bullet mark="•">For many members, paying the SLF instead of repurchasing levels is the strongest reason to renew now.</Bullet>
            </ul>
          </article>
          <article id="restart" style={cardStyle}>
            <span style={eyebrowStyle}>Ease of restart</span>
            <h2 style={{ fontSize: "1.75rem", margin: "16px 0 24px" }}>Restarting is simple.</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
              <Bullet mark="1">Log in to your Coop5050 account.</Bullet>
              <Bullet mark="2">Pay your Software Licensing Fee, starting at $45 for 3 months.</Bullet>
              <Bullet mark="3">Use credit card, Apple Pay, Google Pay, crypto, and more.</Bullet>
              <Bullet mark="4">Your account reactivates and paid levels begin working again.</Bullet>
            </ul>
          </article>
        </div>
      </section>

      {/* WHAT STAYS SAVED */}
      <section style={sectionPadding}>
        <div style={container}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 56px" }}>
            <span style={eyebrowStyle}>What stays saved</span>
            <h2 style={{ fontSize: "2.5rem", margin: "16px 0" }}>You are not starting from zero.</h2>
            <p style={{ color: "hsl(0 0% 45%)", fontSize: "1.05rem", lineHeight: 1.6 }}>
              Members hesitate when they think they have lost their place. This removes that fear — the value you built is unmistakably preserved.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="coop-grid-2">
            <article style={cardStyle}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Your saved assets inside Coop5050</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
                <Bullet mark="•">Your levels are saved.</Bullet>
                <Bullet mark="•">Your team is saved.</Bullet>
                <Bullet mark="•">Your open matrices are saved.</Bullet>
                <Bullet mark="•">Your closed matrices are saved.</Bullet>
                <Bullet mark="•">Your contributions sent and received are preserved in history.</Bullet>
              </ul>
            </article>
            <article style={{ ...cardStyle, background: "hsl(0 0% 6%)", color: "hsl(37 45% 88%)", borderColor: "hsl(0 0% 15%)" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "hsl(37 45% 88%)" }}>Why this matters</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
                <li style={{ display: "flex", gap: "14px" }}>
                  <span style={{ color: "hsl(39 55% 52%)" }}>•</span>
                  <span style={{ color: "hsl(37 45% 82%)", lineHeight: 1.6 }}>Members act faster when recovering existing value rather than taking on new cost.</span>
                </li>
                <li style={{ display: "flex", gap: "14px" }}>
                  <span style={{ color: "hsl(39 55% 52%)" }}>•</span>
                  <span style={{ color: "hsl(37 45% 82%)", lineHeight: 1.6 }}>Feel relief first, then urgency.</span>
                </li>
                <li style={{ display: "flex", gap: "14px" }}>
                  <span style={{ color: "hsl(39 55% 52%)" }}>•</span>
                  <span style={{ color: "hsl(37 45% 82%)", lineHeight: 1.6 }}>That is why "your position is saved" comes before technical explanations.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* HOW YOU GET PAID */}
      <section id="paid" style={{ ...sectionPadding, background: "hsl(0 0% 98%)" }}>
        <div style={container}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 56px" }}>
            <span style={eyebrowStyle}>How and when you get paid</span>
            <h2 style={{ fontSize: "2.5rem", margin: "16px 0" }}>Built to pay members fast — and automatically.</h2>
            <p style={{ color: "hsl(0 0% 45%)", fontSize: "1.05rem", lineHeight: 1.6 }}>
              Practical clarity: what happens, how money flows, and when you can access funds.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="coop-grid-3">
            <article style={cardStyle}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>How you earn</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                <Bullet mark="•">Coop5050 uses a 2 × 2 automated follow-me matrix with 6 positions.</Bullet>
                <Bullet mark="•">Instantly receive 50% from each position in your cooperative.</Bullet>
                <Bullet mark="•">Earn 300% over and over from each cooperative.</Bullet>
                <Bullet mark="•">Earn simultaneously from each cooperative.</Bullet>
              </ul>
            </article>
            <article style={cardStyle}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>How the system helps you</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                <Bullet mark="•">Help from above.</Bullet>
                <Bullet mark="•">Help from below.</Bullet>
                <Bullet mark="•">Auto-follow keeps your team moving together.</Bullet>
                <Bullet mark="•">Auto re-entry and optional auto-upgrade keep flow alive.</Bullet>
              </ul>
            </article>
            <article style={cardStyle}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>When you get paid</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                <Bullet mark="•">Payouts are instant to CoopWallet.</Bullet>
                <Bullet mark="•">Withdrawals can happen in seconds.</Bullet>
                <Bullet mark="•">Funds held in stable coin inside a free private decentralized wallet.</Bullet>
                <Bullet mark="•">2FA security helps keep funds safe.</Bullet>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* AUTOMATION + CUI */}
      <section style={sectionPadding}>
        <div style={{ ...container, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }} className="coop-grid-2">
          <article style={cardStyle}>
            <span style={eyebrowStyle}>Automation</span>
            <h2 style={{ fontSize: "1.75rem", margin: "16px 0 24px" }}>Everything is automated so earning does not depend on constant manual work.</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
              <Bullet mark="•">Auto receiving of contributions.</Bullet>
              <Bullet mark="•">Auto sending of contributions.</Bullet>
              <Bullet mark="•">Auto re-entry.</Bullet>
              <Bullet mark="•">Auto upgrade.</Bullet>
              <Bullet mark="•">Auto placement.</Bullet>
              <Bullet mark="•">Auto renew.</Bullet>
            </ul>
          </article>
          <article style={cardStyle}>
            <span style={eyebrowStyle}>Why this matters now</span>
            <h2 style={{ fontSize: "1.75rem", margin: "16px 0 24px" }}>CUI — Cooperative Universal Income — is more relevant than ever.</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
              <Bullet mark="•">As AI, robotics, and automation reshape work, people need income systems outside traditional jobs.</Bullet>
              <Bullet mark="•">Cooperative models matter — built around members helping members.</Bullet>
              <Bullet mark="•">Renewing is not only about income potential — it is about staying connected to a system built for resilience.</Bullet>
            </ul>
          </article>
        </div>
      </section>



      {/* THREE SYSTEMS */}
      <section style={sectionPadding}>
        <div style={container}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 56px" }}>
            <span style={eyebrowStyle}>Three systems · one movement</span>
            <h2 style={{ fontSize: "2.5rem", margin: "16px 0" }}>Choose the access level that matches where you want to participate.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="coop-grid-3">
            {[
              { name: "5050 FAST", color: "hsl(224 85% 58%)", price: "$25 · $50 · $100", slf: "SLF: $45 / 3 months", cycle: "Receive $525 each cycle.", note: "Quickest low-cost path back in." },
              { name: "5050 CORE", color: "hsl(160 80% 42%)", price: "$250 · $500 · $1,000", slf: "SLF: $75 / 3 months", cycle: "Receive $5,250 each cycle.", note: "Balanced participation and growth potential.", featured: true },
              { name: "5050 MAX", color: "hsl(39 55% 52%)", price: "$2,500 · $5,000 · $10,000", slf: "SLF: $150 / 3 months", cycle: "Receive $52,500 each cycle.", note: "Top vault participation." },
            ].map((t, i) => (
              <article key={i} style={{
                ...cardStyle,
                borderColor: t.color,
                borderWidth: t.featured ? "2px" : "1px",
                boxShadow: t.featured ? `0 8px 32px ${t.color.replace(")", " / 0.15)")}` : "none",
              }}>
                <h3 style={{ fontSize: "1.5rem", color: t.color, marginBottom: "16px", letterSpacing: "0.02em" }}>{t.name}</h3>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600 }}>{t.price}</div>
                  <div style={{ fontSize: "0.75rem", color: "hsl(0 0% 45%)", marginTop: "4px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.slf}</div>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                  <Bullet mark="•">{t.note}</Bullet>
                  <Bullet mark="•">{t.cycle}</Bullet>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* URGENCY */}
      <section style={{ ...sectionPadding, background: "hsl(0 0% 98%)" }}>
        <div style={container}>
          <article style={{ ...cardStyle, maxWidth: "880px", margin: "0 auto", padding: "48px", borderLeft: "4px solid hsl(39 55% 52%)" }}>
            <span style={eyebrowStyle}>Urgency</span>
            <h2 style={{ fontSize: "2rem", margin: "16px 0 24px" }}>Do not wait so long that your saved momentum starts helping someone else.</h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0 }}>
              <Bullet mark="•">All lapsed or free members are free agents.</Bullet>
              <Bullet mark="•">Free agents can choose a new team.</Bullet>
              <Bullet mark="•">Their teams can follow them.</Bullet>
              <Bullet mark="•">Delay has a real opportunity cost.</Bullet>
            </ul>
          </article>
        </div>
      </section>

      {/* FINAL CTA — dark editorial */}
      <section id="renew" style={{ ...sectionPadding, background: "hsl(0 0% 6%)", color: "hsl(37 45% 88%)" }}>
        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "48px", alignItems: "center" }} className="coop-grid-2">
            <div>
              <span style={{ ...eyebrowStyle, color: "hsl(39 55% 65%)" }}>What to do now</span>
              <h2 style={{ fontSize: "2.5rem", margin: "16px 0 32px", color: "hsl(37 45% 92%)" }}>Reactivate the position you already paid for.</h2>
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
                {[
                  "Log in to your Coop5050 account.",
                  "Pay your SLF, starting at $45.",
                  "Reconnect your saved levels, team, and earning flow.",
                  "Receive payouts automatically through CoopWallet.",
                ].map((step, i) => (
                  <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: "28px", height: "28px", borderRadius: "9999px",
                      background: "hsl(39 55% 52% / 0.18)", color: "hsl(39 55% 65%)",
                      fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: 600, flexShrink: 0,
                    }}>{i + 1}</span>
                    <span style={{ color: "hsl(37 45% 82%)", lineHeight: 1.6 }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "hsl(0 0% 0% / 0.4)", border: "1px solid hsl(39 55% 52% / 0.35)", borderRadius: "12px", padding: "32px" }}>
              <h3 style={{ fontSize: "1.6rem", color: "hsl(37 45% 92%)", marginBottom: "16px" }}>The decision, in one sentence</h3>
              <p style={{ color: "hsl(37 45% 80%)", lineHeight: 1.6, marginBottom: "24px" }}>
                Why repay levels you already own when you can save up to $10,000 and reactivate for as little as $45?
              </p>
              <a href="#" className="btn-gold" style={{ display: "inline-block", padding: "16px 32px", borderRadius: "8px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "16px" }}>
                Renew your account
              </a>
              <p style={{ fontSize: "0.85rem", color: "hsl(37 45% 65%)" }}>Credit card, Apple Pay, Google Pay, crypto, and more.</p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "32px 24px", background: "hsl(0 0% 6%)", color: "hsl(37 45% 65%)", textAlign: "center", fontSize: "0.85rem", borderTop: "1px solid hsl(0 0% 15%)" }}>
        Coop5050 · Cooperative Crowdfunding™ · 25 years of members helping members.
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .coop-grid-2 { grid-template-columns: 1fr !important; }
          .coop-grid-3 { grid-template-columns: 1fr !important; }
          .coop-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

export default Coop5050;
