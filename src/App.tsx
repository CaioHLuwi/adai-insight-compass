
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import Campaigns from "./pages/Campaigns";
import Users from "./pages/Users";
import Subscription from "./pages/Subscription";
import Rates from "./pages/Rates";
import Notifications from "./pages/Notifications";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LanguageProvider defaultLanguage="en">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <AppSidebar />
                <SidebarInset className="flex-1">
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b border-orange-200 dark:border-orange-800 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <SidebarTrigger className="-ml-1 text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20" />
                  </header>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route path="/reports" element={<div className="p-6"><h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Reports - Coming Soon</h1></div>} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/ads-accounts" element={<div className="p-6"><h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">ADS Accounts - Coming Soon</h1></div>} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/rates" element={<Rates />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
