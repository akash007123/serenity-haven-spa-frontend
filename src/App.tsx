import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import AdminLayout from "@/components/AdminLayout";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
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
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

const queryClient = new QueryClient();

// Wrapper for public pages with Layout
const PublicPage = ({ component: Component }: { component: React.ComponentType }) => (
  <Layout>
    <PageTransition>
      <Component />
    </PageTransition>
  </Layout>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth Routes - Public */}
        <Route 
          path="/admin/login" 
          element={isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin />} 
        />
        <Route 
          path="/admin/register" 
          element={isAuthenticated ? <Navigate to="/admin" replace /> : <AdminRegister />} 
        />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout><PageTransition><AdminDashboard /></PageTransition></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><PageTransition><AdminBookings /></PageTransition></AdminLayout>} />
          <Route path="/admin/contacts" element={<AdminLayout><PageTransition><AdminContacts /></PageTransition></AdminLayout>} />
          <Route path="/admin/subscribers" element={<AdminLayout><PageTransition><AdminSubscribers /></PageTransition></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><PageTransition><AdminServices /></PageTransition></AdminLayout>} />
          <Route path="/admin/therapists" element={<AdminLayout><PageTransition><AdminTherapists /></PageTransition></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><PageTransition><AdminAnalytics /></PageTransition></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><PageTransition><AdminSettings /></PageTransition></AdminLayout>} />
        </Route>

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
