import bgImage from "@/assets/register-bg-micro.jpg";

const FastBackground = () => (
  <div
    className="min-h-screen w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  />
);

export default FastBackground;
