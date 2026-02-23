import coopLogo from "@/assets/coop5050L.jpg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={coopLogo}
        alt="5050L logo"
        className="h-20 sm:h-24 w-auto"
      />
    </div>
  );
};

export default Logo;
