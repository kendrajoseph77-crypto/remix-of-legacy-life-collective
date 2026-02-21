interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span
        className="text-xl sm:text-2xl font-bold tracking-tight"
        style={{
          background: "linear-gradient(135deg, hsl(38 70% 60%), hsl(38 65% 75%), hsl(38 70% 60%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        5050L
      </span>
    </div>
  );
};

export default Logo;
