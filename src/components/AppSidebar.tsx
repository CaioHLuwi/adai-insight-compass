
import React from "react"
import {
  BarChart3,
  Bot,
  ChevronRight,
  Command,
  CreditCard,
  Crown,
  HelpCircle,
  LayoutDashboard,
  Receipt,
  Settings,
  Target,
  Users,
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import { NavMain } from "@/components/nav-main"
import { useNavigate, useLocation } from "react-router-dom"

const data = {
  user: {
    name: "Timo Breumelhof",
    email: "timo@otmizy.ai",
    avatar: "/avatars/01.png",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: location.pathname === "/dashboard",
    },
    {
      title: "Campanhas",
      url: "/campaigns", 
      icon: Target,
      isActive: location.pathname === "/campaigns",
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: BarChart3,
      isActive: location.pathname === "/reports",
    },
    {
      title: "Contas de Anúncios",
      url: "/ads-accounts",
      icon: CreditCard,
      isActive: location.pathname === "/ads-accounts",
    },
    {
      title: "Chat IA",
      url: "/ai-chat",
      icon: Bot,
      isActive: location.pathname === "/ai-chat",
    },
    {
      title: "Taxas",
      url: "/taxas",
      icon: Receipt,
      isActive: location.pathname === "/taxas",
    },
  ];

  const navSecondary = [
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
      isActive: location.pathname === "/settings",
    },
    {
      title: "Usuários",
      url: "/users",
      icon: Users,
      isActive: location.pathname === "/users",
    },
    {
      title: "Assinatura",
      url: "/subscription",
      icon: Crown,
      isActive: location.pathname === "/subscription",
    },
    {
      title: "Suporte",
      url: "#",
      icon: HelpCircle,
      isActive: false,
    },
  ];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center space-x-2 p-2">
          <div 
            className="flex aspect-square size-8 items-center justify-center rounded-lg bg-yellow-500 text-black cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Otmizy.ai</span>
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavMain items={navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
