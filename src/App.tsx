import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Chatbot from "./components/Chatbot";

// Marketplace Pages
import Index from "./pages/Index";
import ProductCatalog from "./pages/marketplace/ProductCatalog";
import ProductDetails from "./pages/marketplace/ProductDetails";
import Cart from "./pages/marketplace/Cart";
import Checkout from "./pages/marketplace/Checkout";

// Marketing Pages
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import Pricing from "./pages/marketing/Pricing";
import Solutions from "./pages/marketing/Solutions";
import Blog from "./pages/marketing/Blog";
import BlogPost from "./pages/marketing/BlogPost";
import HelpCenter from "./pages/marketing/HelpCenter";
import Resources from "./pages/marketing/Resources";
import ProductPage from "./pages/marketing/ProductPage";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Dashboard Pages
import DashboardLayout from "./components/layout/DashboardLayout";
import UserDashboard from "./pages/dashboard/UserDashboard";
import UserProducts from "./pages/dashboard/UserProducts";
import UserSubscriptions from "./pages/dashboard/UserSubscriptions";
import UserNotifications from "./pages/dashboard/UserNotifications";
import UserSupport from "./pages/dashboard/UserSupport";
import UserSettings from "./pages/dashboard/UserSettings";
import UserOrders from "./pages/dashboard/UserOrders";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerManagement from "./pages/admin/CustomerManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import TicketManagement from "./pages/admin/TicketManagement";
import RegionManagement from "./pages/admin/RegionManagement";
import EmailManagement from "./pages/admin/EmailManagement";
import AdminSettings from "./pages/admin/AdminSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Marketplace Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<ProductCatalog />} />
      <Route path="/products/:categoryId" element={<ProductCatalog />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      
      {/* Marketing Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/solutions/:solutionId" element={<Solutions />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to={isAdmin ? "/admin" : "/dashboard"} /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      
      {/* User Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<UserDashboard />} />
        <Route path="products" element={<UserProducts />} />
        <Route path="subscriptions" element={<UserSubscriptions />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="notifications" element={<UserNotifications />} />
        <Route path="support" element={<UserSupport />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="tickets" element={<TicketManagement />} />
        <Route path="regions" element={<RegionManagement />} />
        <Route path="emails" element={<EmailManagement />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
            <Chatbot />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
