import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/hooks/useLanguage";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import SummaryDashboard from "./components/SummaryDashboard";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import AIChat from "./pages/AIChat";
import Taxas from "./pages/Taxas";
import AdsAccounts from "./pages/AdsAccounts";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Subscription from "./pages/Subscription";
import Achievements from "./pages/Achievements";
import Rates from "./pages/Rates";
import Expenses from "./pages/Expenses";
import EditAccount from "./pages/EditAccount";
import Notifications from "./pages/Notifications";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function QueryClientWrapper(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          {props.children}
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientWrapper>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <SummaryDashboard 
                      totalSpendToday={1500}
                      avgCPC={2.5}
                      avgCPA={25}
                      conversionsToday={45}
                      recentAnomalies={[]}
                    />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/campaigns" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Campaigns />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/reports" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Reports />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/ai-chat" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <AIChat />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/taxas" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Taxas />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/ads-accounts" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <AdsAccounts />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/settings" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/users" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Users />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/subscription" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Subscription />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/achievements" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Achievements />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/rates" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Rates />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/expenses" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Expenses />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/edit-account" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <EditAccount />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/notifications" element={
              <AuthProvider>
                <ProtectedRoute>
                  <AppLayout>
                    <Notifications />
                  </AppLayout>
                </ProtectedRoute>
              </AuthProvider>
            } />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppWidget />
        </div>
      </Router>
    </QueryClientWrapper>
  );
}

export default App;
