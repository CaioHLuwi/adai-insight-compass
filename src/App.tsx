
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import { AchievementsProvider } from "@/hooks/useAchievements";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { HeaderControls } from "@/components/HeaderControls";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import Users from "./pages/Users";
import Subscription from "./pages/Subscription";
import Expenses from "./pages/Expenses";
import Rates from "./pages/Rates";
import Notifications from "./pages/Notifications";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import AdsAccounts from "./pages/AdsAccounts";
import EditAccount from "./pages/EditAccount";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Achievements from "./pages/Achievements";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-yellow-500">Carregando...</div>
    </div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider defaultLanguage="pt">
        <BrowserRouter>
          <AuthProvider>
            <AchievementsProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  {/* Landing page - public */}
                  <Route path="/landing" element={<Landing />} />
                  
                  {/* Auth routes without sidebar */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Policy routes without sidebar */}
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  
                  {/* Main app routes with sidebar - all protected */}
                  <Route path="*" element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="min-h-screen flex w-full bg-sidebarbackground relative">
                          <div className="animated-bg"></div>
                          <AppSidebar />
                          <SidebarInset className="flex-1 bg-background">
                            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-yellow-500/20 px-4 bg-background/80 backdrop-blur-sm">
                              <SidebarTrigger className="-ml-1 text-yellow-400 hover:bg-yellow-500/10" />
                              <HeaderControls />
                            </header>
                            <main className="flex-1 bg-background min-h-screen">
                              <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/campaigns" element={<Campaigns />} />
                                <Route path="/reports" element={<Reports />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/subscription" element={<Subscription />} />
                                <Route path="/expenses" element={<Expenses />} />
                                <Route path="/ads-accounts" element={<AdsAccounts />} />
                                <Route path="/chatbot" element={<Chatbot />} />
                                <Route path="/rates" element={<Rates />} />
                                <Route path="/notifications" element={<Notifications />} />
                                <Route path="/achievements" element={<Achievements />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/edit-account" element={<EditAccount />} />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                </Routes>
              </TooltipProvider>
            </AchievementsProvider>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
