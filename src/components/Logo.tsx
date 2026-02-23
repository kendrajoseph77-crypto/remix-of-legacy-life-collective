import { useEffect, useRef } from "react";
import coopLogo from "@/assets/logo-gold-new.png";

interface LogoProps {
  className?: string;
  darkBg?: boolean;
}

const Logo = ({ className = "", darkBg = true }: LogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If pixel is near-white, make it transparent
        if (r > 220 && g > 220 && b > 220) {
          data[i + 3] = 0; // fully transparent
        }
        // Fade semi-white pixels for smooth edges
        else if (r > 180 && g > 180 && b > 180) {
          const brightness = (r + g + b) / 3;
          const alpha = Math.max(0, 255 - ((brightness - 180) / 75) * 255);
          data[i + 3] = Math.min(data[i + 3], Math.round(alpha));
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = coopLogo;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-auto ${className}`}
      style={{ height: darkBg ? "360px" : "120px" }}
      role="img"
      aria-label="5050L logo"
    />
  );
};

export default Logo;
