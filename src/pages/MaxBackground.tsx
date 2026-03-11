import bgImage from "@/assets/register-bg-mogul.jpg";

const MaxBackground = () => (
  <div
    className="min-h-screen w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  />
);

export default MaxBackground;
