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
import RegisterFast from "./pages/RegisterMicro";
import RegisterCore from "./pages/RegisterMacro";
import RegisterMax from "./pages/RegisterMogul";
import Dashboard from "./pages/Dashboard";
import FastDashboard from "./pages/BuilderDashboard";
import CoreDashboard from "./pages/ArchitectDashboard";
import NotFound from "./pages/NotFound";
import HowItWorksMax from "./pages/HowItWorksMax";
import HowItWorksFast from "./pages/HowItWorksFast";
import HowItWorksCore from "./pages/HowItWorksCore";
import LandingFast from "./pages/LandingFast";
import LandingCore from "./pages/LandingCore";

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
          <Route path="/how-it-works-max" element={<HowItWorksMax />} />
          <Route path="/how-it-works-fast" element={<HowItWorksFast />} />
          <Route path="/how-it-works-core" element={<HowItWorksCore />} />
          <Route path="/landing/fast" element={<LandingFast />} />
          <Route path="/landing/core" element={<LandingCore />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/fast" element={<RegisterFast />} />
          <Route path="/register/core" element={<RegisterCore />} />
          <Route path="/register/max" element={<RegisterMax />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/fast" element={<FastDashboard />} />
          <Route path="/dashboard/core" element={<CoreDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
