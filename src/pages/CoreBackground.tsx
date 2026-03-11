import bgImage from "@/assets/register-bg-macro.jpg";

const CoreBackground = () => (
  <div
    className="min-h-screen w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  />
);

export default CoreBackground;
