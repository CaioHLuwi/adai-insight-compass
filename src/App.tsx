
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
              <div className="min-h-screen flex w-full">
                <AppSidebar />
                <SidebarInset className="flex-1">
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                  </header>
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route path="/reports" element={<div className="p-6"><h1 className="text-3xl font-bold">Reports - Coming Soon</h1></div>} />
                      <Route path="/users" element={<div className="p-6"><h1 className="text-3xl font-bold">Users - Coming Soon</h1></div>} />
                      <Route path="/financial" element={<div className="p-6"><h1 className="text-3xl font-bold">Financial - Coming Soon</h1></div>} />
                      <Route path="/ads-accounts" element={<div className="p-6"><h1 className="text-3xl font-bold">ADS Accounts - Coming Soon</h1></div>} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/rates" element={<div className="p-6"><h1 className="text-3xl font-bold">Rates - Coming Soon</h1></div>} />
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
