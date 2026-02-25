import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
}

const SlideLayout = ({ children, className = "" }: SlideLayoutProps) => (
  <div className={`flex flex-col items-center justify-center h-full px-8 md:px-16 ${className}`}>
    {children}
  </div>
);

export const SlideLabel = ({ children }: { children: ReactNode }) => (
  <p
    className="text-sm md:text-base tracking-[0.35em] uppercase font-semibold mb-5"
    style={{ color: "hsl(41 50% 65%)" }}
  >
    {children}
  </p>
);

export const SlideHeading = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2
    className={`text-5xl md:text-7xl font-bold mb-6 leading-[1.05] text-white ${className}`}
    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
  >
    {children}
  </h2>
);

export const SlideBody = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-white/60 ${className}`}>
    {children}
  </p>
);

export default SlideLayout;
