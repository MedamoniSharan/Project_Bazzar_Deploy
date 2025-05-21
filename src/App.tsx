import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import RefundPolicy from "./components/RefundPolicy";
import ShippingPolicy from "./components/ShippingPolicy";
import ContactUs from "./components/ContactUs";
import SignupPage from "./pages/SignupPage";
import LoginUserPage from "./pages/LogininUserPage";
import PurchasedProjects from "./pages/PurchasedProjects";
import WishlistPage from "./pages/WishlistPage";

const queryClient = new QueryClient();

// 🔑 Replace this with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID = "1045739523565-kfdqmjlct79j44k4hko6ioo7bq46c6jg.apps.googleusercontent.com";

const App = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Index />} />
              <Route path="/purchased" element={<PurchasedProjects />} />
              <Route path="/ss" element={<AdminDashboard />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/favourites" element={<WishlistPage />} />
              <Route path="/loginuser" element={<LoginUserPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
