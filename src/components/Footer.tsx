import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <Logo darkBg={false} />
            <p className="text-muted-foreground text-sm leading-relaxed">
              The elite peer-to-peer crowdfunding platform built for legacy wealth.
              Transparent. Automated. Unstoppable.
            </p>
          </div>
          <div>
            <h4 className="text-foreground font-semibold mb-4 tracking-widest uppercase text-xs text-primary">Legal</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms & Conditions</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2025 Coop5050™. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs italic">
            "Money when you want it. Life the way you deserve it."
          </p>
          <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase font-semibold">
            Powered by <span className="text-foreground">CUI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
