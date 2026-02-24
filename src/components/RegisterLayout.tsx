import { useState } from "react";
import { Link } from "react-router-dom";
import { Key, User, Mail, Phone, Lock } from "lucide-react";
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
}

const RegisterLayout = ({ theme }: { theme: RegisterTheme }) => {
  const [form, setForm] = useState({
    donorKey: "",
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

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleLevel = (level: number) =>
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: real registration logic
  };

  const inputClass =
    "bg-background border-border focus-visible:ring-2 pl-10";

  const IconInput = ({
    icon: Icon,
    label,
    field,
    type = "text",
    placeholder,
  }: {
    icon: typeof Key;
    label: string;
    field: string;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="space-y-1.5">
      <Label className="text-sm text-foreground/80">{label}</Label>
      <div className="relative">
        <Icon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
        />
        <Input
          type={type}
          placeholder={placeholder}
          value={(form as any)[field]}
          onChange={(e) => update(field, e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center py-10 px-4">
      <Link to="/" className="mb-6">
        <Logo className="!h-14" />
      </Link>

      <div className="w-full max-w-2xl bg-background rounded-2xl border border-border shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Register</h1>
          <p className="text-muted-foreground mt-1">
            Join the{" "}
            <span className="font-semibold" style={{ color: theme.primary }}>
              {theme.name}
            </span>{" "}
            system to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Information */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              General Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <IconInput
                icon={Key}
                label="Donor Key"
                field="donorKey"
                placeholder="eg: 1000"
              />
              <IconInput icon={User} label="First Name" field="firstName" />
              <IconInput icon={User} label="Last Name" field="lastName" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <IconInput
                icon={Mail}
                label="Email Address"
                field="email"
                type="email"
              />
              <IconInput
                icon={Mail}
                label="Confirm Email"
                field="confirmEmail"
                type="email"
              />
              <IconInput
                icon={Phone}
                label="Mobile Number"
                field="mobile"
                type="tel"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <IconInput
                icon={Lock}
                label="Password"
                field="password"
                type="password"
              />
              <IconInput
                icon={Lock}
                label="Confirm Password"
                field="confirmPassword"
                type="password"
              />
            </div>
          </div>

          {/* Activity Information */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Activity Information
            </h2>

            <div className="mb-5">
              <h3 className="font-semibold text-foreground mb-2">
                Licensing Fee:
              </h3>
              <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                <input
                  type="radio"
                  checked={licensingFee}
                  onChange={() => setLicensingFee(true)}
                  className="accent-current"
                  style={{ accentColor: theme.primary }}
                />
                $29.99 Every 6 Months
              </label>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Royalty Levels:
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {theme.royaltyLevels.map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedLevels.includes(level)}
                      onCheckedChange={() => toggleLevel(level)}
                    />
                    ${level.toLocaleString()}
                  </label>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3 italic">
                Please note it is your absolute choice to donate at the level or
                levels you so desire in ascending order.
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center space-y-4">
            <Button
              type="submit"
              className="px-10 py-3 text-base font-semibold rounded-lg"
              style={{
                background: theme.gradient,
                color: theme.textOnGradient,
              }}
            >
              Join
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium"
                style={{ color: theme.primary }}
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLayout;
