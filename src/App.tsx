import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import VehicleDetails from "./pages/VehicleDetails";
import Services from "./pages/Services";
import PrivateInquiry from "./pages/PrivateInquiry";
import About from "./pages/About";
import FAQ from "./pages/Faq";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import Insurance from "./pages/Insurance";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import Requests from "./pages/admin/Requests";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfile from "./pages/admin/adminProfile";
// import FAQ from "./pages/FAQ";
import AOS from "aos";
import "aos/dist/aos.css";


const ScrollToTop = () => {
  const url = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);


  }, [url]);

  return null;
};

export function App() {

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
  }, []);


  return (
    // <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ScrollToTop />
      <Toaster />
      <Sonner />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/:vehicleId" element={<VehicleDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/private-inquiry" element={<PrivateInquiry />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Routes>
      </Layout>

    </TooltipProvider>
    // </QueryClientProvider>
  );
}

export default App;
