import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminContacts from "./pages/AdminContacts";
import AdminSubscribers from "./pages/AdminSubscribers";
import AdminServices from "./pages/AdminServices";
import AdminTherapists from "./pages/AdminTherapists";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

// Wrapper for public pages with Layout
const PublicPage = ({ component: Component }: { component: React.ComponentType }) => (
  <Layout>
    <PageTransition>
      <Component />
    </PageTransition>
  </Layout>
);

// Wrapper for admin pages with AdminLayout
const AdminPage = ({ component: Component }: { component: React.ComponentType }) => (
  <AdminLayout>
    <PageTransition>
      <Component />
    </PageTransition>
  </AdminLayout>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin Routes - Must come first to avoid wildcard matching */}
        <Route path="/admin" element={<AdminPage component={AdminDashboard} />} />
        <Route path="/admin/bookings" element={<AdminPage component={AdminBookings} />} />
        <Route path="/admin/contacts" element={<AdminPage component={AdminContacts} />} />
        <Route path="/admin/subscribers" element={<AdminPage component={AdminSubscribers} />} />
        <Route path="/admin/services" element={<AdminPage component={AdminServices} />} />
        <Route path="/admin/therapists" element={<AdminPage component={AdminTherapists} />} />
        <Route path="/admin/analytics" element={<AdminPage component={AdminAnalytics} />} />
        <Route path="/admin/settings" element={<AdminPage component={AdminSettings} />} />

        {/* Public Routes */}
        <Route path="/" element={<PublicPage component={Index} />} />
        <Route path="/about" element={<PublicPage component={About} />} />
        <Route path="/services" element={<PublicPage component={Services} />} />
        <Route path="/gallery" element={<PublicPage component={Gallery} />} />
        <Route path="/booking" element={<PublicPage component={Booking} />} />
        <Route path="/contact" element={<PublicPage component={Contact} />} />
        <Route path="/faq" element={<PublicPage component={FAQ} />} />
        
        {/* 404 - Must be last */}
        <Route path="*" element={<PublicPage component={NotFound} />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
