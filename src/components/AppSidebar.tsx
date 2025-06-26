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
import { LucideIcon } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"
import { SidebarFooter } from "@/components/ui/sidebar-footer"
import { SidebarHeader } from "@/components/ui/sidebar-header"
import { SidebarContent } from "@/components/ui/sidebar-content"
import { SidebarMenu } from "@/components/ui/sidebar-menu"
import { SidebarMenuItem } from "@/components/ui/sidebar-menu-item"
import { SidebarMenuButton } from "@/components/ui/sidebar-menu-button"
import { SidebarGroup } from "@/components/ui/sidebar-group"
import { SidebarGroupLabel } from "@/components/ui/sidebar-group-label"
import { SidebarMenuAction } from "@/components/ui/sidebar-menu-action"
import { SidebarMenuSub } from "@/components/ui/sidebar-menu-sub"
import { SidebarMenuSubItem } from "@/components/ui/sidebar-menu-sub-item"
import { SidebarMenuSubButton } from "@/components/ui/sidebar-menu-sub-button"
import { NavUser } from "@/components/nav-user"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useNavigate, useLocation } from "react-router-dom"

const data = {
  user: {
    name: "Timo Breumelhof",
    handle: "@timobreumelhof",
    image: "/avatars/01.png",
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              asChild
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer"
            >
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-yellow-500 text-black">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Otmizy.ai</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
