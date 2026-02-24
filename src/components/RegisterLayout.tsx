import { useState } from "react";
import { Link } from "react-router-dom";
import { Key, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";


interface RegisterTheme {
  name: string;
  gradient: string;
  primary: string;
  textOnGradient: string;
  dashboardPath: string;
  royaltyLevels: number[];
  licensingFee: string;
  bgImage: string;
}

const RegisterLayout = ({ theme }: { theme: RegisterTheme }) => {
  const [form, setForm] = useState({
    regKey: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [licensingFee, setLicensingFee] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    disclaimer: false,
    guarantee: false,
  });

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleLevel = (level: number) =>
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );

  const toggleAgreement = (key: keyof typeof agreements) =>
    setAgreements((p) => ({ ...p, [key]: !p[key] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClass = "bg-white/80 border-white/40 focus-visible:ring-2 pl-10 h-11 text-foreground placeholder:text-muted-foreground/50";

  const IconInput = ({
    icon: Icon,
    label,
    field,
    type = "text",
    placeholder,
    suffix,
  }: {
    icon: typeof Key;
    label: string;
    field: string;
    type?: string;
    placeholder?: string;
    suffix?: React.ReactNode;
  }) => (
    <div className="space-y-1">
      <Label className="text-xs font-semibold text-foreground/90">{label}</Label>
      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40"
        />
        <Input
          type={type}
          placeholder={placeholder}
          value={(form as any)[field]}
          onChange={(e) => update(field, e.target.value)}
          className={inputClass}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-stretch relative"
      style={{
        backgroundImage: `url(${theme.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Nav bar */}
      <div className="absolute top-0 right-0 z-20 flex items-center gap-4 p-6">
        <Link to="/login" className="text-white/90 text-sm font-medium hover:text-white transition-colors">
          Login
        </Link>
        <Link
          to="/#join"
          className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:brightness-110"
          style={{
            background: theme.gradient,
            color: theme.textOnGradient,
            boxShadow: `0 4px 16px ${theme.primary}40`,
          }}
        >
          Join Us →
        </Link>
      </div>

      {/* Form card — left side */}
      <div className="relative z-10 w-full max-w-xl flex flex-col min-h-screen overflow-y-auto">
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex justify-center mb-4">
              <Logo className="!h-14" />
            </Link>

            <h1
              className="text-2xl md:text-3xl font-bold text-center italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Create Your Account
            </h1>
            <p className="text-center text-muted-foreground text-sm mt-1 mb-6">
              Join the world's first peer-to-peer crowdfunding system and start receiving contributions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* General Information */}
              <div>
                <h2 className="text-sm font-bold text-foreground mb-3">General Information</h2>
                <div className="grid grid-cols-3 gap-3">
                  <IconInput icon={Key} label="Registration Key" field="regKey" placeholder="eg:1000" />
                  <IconInput icon={User} label="First Name" field="firstName" />
                  <IconInput icon={User} label="Last Name" field="lastName" />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <IconInput icon={Mail} label="Email Address" field="email" type="email" />
                  <IconInput icon={Mail} label="Confirm Email" field="confirmEmail" type="email" />
                  <IconInput icon={Phone} label="Mobile Number" field="mobile" type="tel" placeholder="201-555-0123" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <IconInput
                    icon={Lock}
                    label="Password"
                    field="password"
                    type={showPassword ? "text" : "password"}
                    suffix={
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-muted-foreground/40 hover:text-muted-foreground">
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />
                  <IconInput
                    icon={Lock}
                    label="Confirm Password"
                    field="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    suffix={
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-muted-foreground/40 hover:text-muted-foreground">
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />
                </div>
              </div>

              {/* Activity Information */}
              <div>
                <h2 className="text-sm font-bold text-foreground mb-3">Activity Information</h2>

                <div className="mb-4">
                  <h3 className="text-xs font-bold text-foreground mb-1.5">Licensing Fee:</h3>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      checked={licensingFee}
                      onChange={() => setLicensingFee(true)}
                      style={{ accentColor: theme.primary }}
                    />
                    {theme.licensingFee}
                  </label>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground mb-1.5">Royalty Levels:</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {theme.royaltyLevels.map((level) => (
                      <label key={level} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => toggleLevel(level)}
                        />
                        ${level.toLocaleString()}
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    Please note it is your absolute choice to contribute at the level or levels you so desire in ascending order.
                  </p>
                </div>
              </div>

              {/* Legal agreements */}
              <div
                className="rounded-lg p-4 space-y-2.5"
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                {[
                  { key: "terms" as const, label: "Terms & Conditions" },
                  { key: "privacy" as const, label: "Privacy Policy" },
                  { key: "disclaimer" as const, label: "Disclaimer" },
                  { key: "guarantee" as const, label: "Guarantee Policy" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={agreements[item.key]}
                      onCheckedChange={() => toggleAgreement(item.key)}
                    />
                    I have read and agree to the{" "}
                    <span className="font-medium underline" style={{ color: theme.primary }}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Submit */}
              <div className="text-center space-y-3 pt-2">
                <Button
                  type="submit"
                  className="px-12 py-3 text-sm font-bold tracking-wide rounded-lg"
                  style={{
                    background: theme.gradient,
                    color: theme.textOnGradient,
                    boxShadow: `0 4px 16px ${theme.primary}40`,
                  }}
                >
                  Join
                </Button>
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium" style={{ color: theme.primary }}>
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLayout;
