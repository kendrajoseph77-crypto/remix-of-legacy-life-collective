import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Join from "./pages/Join";
import Login from "./pages/Login";
import RegisterMicro from "./pages/RegisterMicro";
import RegisterMacro from "./pages/RegisterMacro";
import RegisterMogul from "./pages/RegisterMogul";
import Dashboard from "./pages/Dashboard";
import MicroDashboard from "./pages/BuilderDashboard";
import MacroDashboard from "./pages/ArchitectDashboard";
import NotFound from "./pages/NotFound";
import HowItWorksDemo from "./pages/HowItWorksDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/how-it-works-demo" element={<HowItWorksDemo />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/micro" element={<RegisterMicro />} />
          <Route path="/register/macro" element={<RegisterMacro />} />
          <Route path="/register/mogul" element={<RegisterMogul />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/micro" element={<MicroDashboard />} />
          <Route path="/dashboard/macro" element={<MacroDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
