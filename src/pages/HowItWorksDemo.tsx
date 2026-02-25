import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoGold from "@/assets/logo-5050-gold.png";
import {
  SlideHero,
  SlideFiftyFifty,
  SlideIncomeLevels,
  Slide300Percent,
  SlideWaysToEarn,
  SlideMatrixFill,
  SlideWheelhouse,
  SlideMobiusLoop,
  SlideAutomated,
  SlideClosing,
} from "@/components/demo/DemoSlides";

const WHEELHOUSE_INDEX = 5; // index of wheelhouse slide

const slides = [
  { id: "hero", label: "Intro", Component: SlideHero },
  { id: "ways", label: "6 Ways to Earn", Component: SlideWaysToEarn },
  { id: "matrix", label: "Matrix Fill", Component: SlideMatrixFill },
  { id: "300", label: "300% Return", Component: Slide300Percent },
  { id: "5050", label: "50/50 Payout", Component: SlideFiftyFifty },
  { id: "wheelhouse", label: "Wheelhouse", Component: SlideWheelhouse },
  { id: "mobius", label: "Mobius Loop", Component: SlideMobiusLoop },
  { id: "levels", label: "3 Levels", Component: SlideIncomeLevels },
  { id: "automated", label: "Automated", Component: SlideAutomated },
  { id: "closing", label: "Closing", Component: SlideClosing },
];

const gold = "hsl(41 50% 65%)";

const HowItWorksDemo = () => {
  const [current, setCurrent] = useState(0);
  const [wheelhouseFirstCycleDone, setWheelhouseFirstCycleDone] = useState(false);
  const isWheelhouseBlocking = current === WHEELHOUSE_INDEX && !wheelhouseFirstCycleDone;

  const goNext = useCallback(() => setCurrent((c) => Math.min(c + 1, slides.length - 1)), []);
  const goPrev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't handle if wheelhouse is capturing keys
      if (current === WHEELHOUSE_INDEX && !wheelhouseFirstCycleDone) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, current, wheelhouseFirstCycleDone]);

  const Slide = slides[current].Component;
  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div
      className="h-screen flex flex-col overflow-hidden select-none"
      style={{ background: "linear-gradient(180deg, hsl(220 30% 8%) 0%, hsl(220 25% 5%) 100%)" }}
    >
      {/* Top progress bar */}
      <div className="h-1 w-full relative" style={{ background: "hsl(0 0% 100% / 0.05)" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${gold}, hsl(39 55% 52%))` }}
        />
      </div>

      {/* Slide area */}
      <div className="flex-1 relative flex items-stretch min-h-0">
        {/* Logo — top left */}
        <Link to="/" className="absolute top-4 left-4 z-30 hover:opacity-80 transition-opacity">
          <img src={logoGold} alt="Coop5050 Home" className="h-10" style={{ filter: "drop-shadow(0 0 6px hsl(41 50% 65% / 0.4))" }} />
        </Link>
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
          style={{
            background: "hsl(0 0% 100% / 0.06)",
            border: "1px solid hsl(0 0% 100% / 0.1)",
            color: "hsl(0 0% 100% / 0.6)",
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center overflow-hidden px-16">
          <div key={current} className="w-full h-full animate-in fade-in slide-in-from-right-4 duration-500">
            {current === WHEELHOUSE_INDEX ? (
              <SlideWheelhouse onFirstCycleComplete={() => setWheelhouseFirstCycleDone(true)} />
            ) : (
              <Slide />
            )}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={isWheelhouseBlocking ? undefined : goNext}
          disabled={current === slides.length - 1 || isWheelhouseBlocking}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
          style={{
            background: "hsl(0 0% 100% / 0.06)",
            border: "1px solid hsl(0 0% 100% / 0.1)",
            color: "hsl(0 0% 100% / 0.6)",
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom bar */}
      <div className="py-4 flex items-center justify-between px-8" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.06)" }}>
        {/* Slide dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 32 : 8,
                background: i === current ? gold : "hsl(0 0% 100% / 0.15)",
              }}
              aria-label={`Go to slide: ${s.label}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="flex items-center gap-4">
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "hsl(0 0% 100% / 0.35)" }}>
            <span style={{ color: gold }} className="font-bold">{String(current + 1).padStart(2, "0")}</span>
            {" / "}
            {String(slides.length).padStart(2, "0")}
          </p>
          <p className="text-xs font-medium" style={{ color: "hsl(0 0% 100% / 0.5)" }}>
            {slides[current].label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksDemo;
