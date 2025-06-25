import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import { AchievementsProvider } from "@/hooks/useAchievements";
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
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider defaultLanguage="en">
        <AchievementsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Auth routes without sidebar */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Main app routes with sidebar */}
                <Route path="*" element={
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
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/shop/item/:id" element={<ProductDetail />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/edit-account" element={<EditAccount />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </SidebarInset>
                    </div>
                  </SidebarProvider>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AchievementsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
