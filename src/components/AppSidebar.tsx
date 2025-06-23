import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Zap,
  LayoutDashboard,
  Users,
  CreditCard,
  DollarSign,
  FileText,
  Bell,
  ShoppingBag,
  Trophy,
  Settings,
  Crown
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Caio Henrique",
    email: "caio@otmizy.ai",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Otmizy.AI",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "IAgente",
      url: "/chatbot",
      icon: Bot,
    },
    {
      title: "Campaigns",
      url: "/campaigns",
      icon: PieChart,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Contas ADS",
      url: "/ads-accounts",
      icon: CreditCard,
    },
    {
      title: "Despesas",
      url: "/expenses",
      icon: DollarSign,
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: FileText,
    },
    {
      title: "Notificações",
      url: "/notifications",
      icon: Bell,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Subscription",
      url: "/subscription",
      icon: Crown,
    },
  ],
  projects: [
    {
      name: "Em Progresso",
      url: "#",
      icon: Frame,
    },
  ],
  progressItems: [
    {
      title: "Shop",
      url: "/shop",
      icon: ShoppingBag,
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: Trophy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <img src="/otmizy_logo_darkmode.png" alt="Otmizy.ai Logo" style={{ height: '286px', width: 'auto' }} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} progressItems={data.progressItems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}


