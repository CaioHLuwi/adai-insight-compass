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
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Landing from "./pages/Landing";
import LandingSecondary from "./pages/LandingSecondary";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Zeuz from "./pages/Zeuz";
import AdminLogin from "./pages/AdminLogin";
import Comunidade from "./pages/Comunidade";
import Ferramentas from "./pages/Ferramentas";

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
    return <Navigate to="/" replace />;
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
                  {/* Landing page as default */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/landing-secondary" element={<LandingSecondary />} />
                  
                  {/* Auth routes without sidebar */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/zeuz" element={<Zeuz />} />
                  
                  {/* Public pages without sidebar */}
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<Pricing />} />

                  {/* Novas rotas para Stripe Checkout */}
                  <Route path="/success" element={<Success />} />
                  <Route path="/cancel" element={<Cancel />} />
                  
                  {/* Policy routes without sidebar */}
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/data-deletion" element={<DataDeletion />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  
                  {/* Main app routes with sidebar - all protected */}
                  <Route path="/dashboard" element={
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
                              <Index />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/campaigns" element={
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
                              <Campaigns />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
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
                              <Reports />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/users" element={
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
                              <Users />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/subscription" element={
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
                              <Subscription />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/expenses" element={
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
                              <Expenses />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/ads-accounts" element={
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
                              <AdsAccounts />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/chatbot" element={
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
                              <Chatbot />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/rates" element={
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
                              <Rates />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
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
                              <Notifications />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/achievements" element={
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
                              <Achievements />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
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
                              <Settings />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/edit-account" element={
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
                              <EditAccount />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/comunidade" element={
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
                              <Comunidade />
                            </main>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="/ferramentas" element={
                    <ProtectedRoute>
                      <SidebarProvider>
                        <div className="flex h-screen w-full">
                          <AppSidebar />
                          <SidebarInset className="flex-1">
                            <HeaderControls />
                            <div className="flex-1 overflow-auto">
                              <Ferramentas />
                            </div>
                          </SidebarInset>
                        </div>
                      </SidebarProvider>
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* WhatsApp Widget - only on landing and public pages */}
                <WhatsAppWidget />
              </TooltipProvider>
            </AchievementsProvider>
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
