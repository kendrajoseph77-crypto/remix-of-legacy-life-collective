import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="min-h-screen flex items-center justify-center pt-20 pb-20 hero-glow">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">Sign in to your Coop5050™ dashboard</p>
          </div>

          <div className="rounded-xl p-8 bg-card border border-border card-glow">
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Username or Email</label>
                <input
                  type="text"
                  placeholder="yourname@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground tracking-wide uppercase block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary" />
                  Remember me
                </label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-sm font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:brightness-110"
                style={{ background: "linear-gradient(135deg, hsl(41 50% 65%), hsl(39 55% 52%), hsl(35 55% 40%))", color: "hsl(35 30% 10%)", boxShadow: "0 4px 16px hsl(39 55% 52% / 0.3), inset 0 1px 0 hsl(42 45% 75% / 0.5)" }}
              >
                Sign In
              </button>

              <p className="text-muted-foreground text-xs text-center">
                Don't have an account?{" "}
                <Link to="/#join" className="text-primary hover:underline font-medium">Join Us</Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
