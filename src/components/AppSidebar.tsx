
import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Users,
  CreditCard,
  DollarSign,
  Bell,
  FileText,
  Zap,
  Trophy,
  ShoppingBag,
  BarChart3,
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
import { useLanguage } from "@/hooks/useLanguage"

const data = {
  user: {
    name: "SafeAd User",
    email: "user@safead.ai",
    avatar: "/placeholder.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
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
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Ads Accounts",
      url: "/ads-accounts",
      icon: CreditCard,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: DollarSign,
    },
    {
      title: "Rates",
      url: "/rates",
      icon: FileText,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
  ],
  navProgress: [
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
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
    {
      title: "Subscription",
      url: "/subscription",
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { language } = useLanguage()

  const getTranslatedText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      dashboard: {
        en: "Dashboard",
        pt: "Dashboard",
        es: "Dashboard",
        ru: "Панель управления",
        de: "Dashboard"
      },
      iagente: {
        en: "IAgente",
        pt: "IAgente",
        es: "IAgente",
        ru: "ИАгент",
        de: "IAgent"
      },
      campaigns: {
        en: "Campaigns",
        pt: "Campanhas",
        es: "Campañas",
        ru: "Кампании",
        de: "Kampagnen"
      },
      reports: {
        en: "Reports",
        pt: "Relatórios",
        es: "Informes",
        ru: "Отчеты",
        de: "Berichte"
      },
      users: {
        en: "Users",
        pt: "Usuários",
        es: "Usuarios",
        ru: "Пользователи",
        de: "Benutzer"
      },
      adsAccounts: {
        en: "Ads Accounts",
        pt: "Contas de Anúncios",
        es: "Cuentas de Anuncios",
        ru: "Рекламные аккаунты",
        de: "Werbekonten"
      },
      expenses: {
        en: "Expenses",
        pt: "Despesas",
        es: "Gastos",
        ru: "Расходы",
        de: "Ausgaben"
      },
      rates: {
        en: "Rates",
        pt: "Taxas",
        es: "Tarifas",
        ru: "Тарифы",
        de: "Tarife"
      },
      notifications: {
        en: "Notifications",
        pt: "Notificações",
        es: "Notificaciones",
        ru: "Уведомления",
        de: "Benachrichtigungen"
      },
      progress: {
        en: "Progress",
        pt: "Progresso",
        es: "Progreso",
        ru: "Прогресс",
        de: "Fortschritt"
      },
      shop: {
        en: "Shop",
        pt: "Loja",
        es: "Tienda",
        ru: "Магазин",
        de: "Shop"
      },
      achievements: {
        en: "Achievements",
        pt: "Conquistas",
        es: "Logros",
        ru: "Достижения",
        de: "Erfolge"
      },
      settings: {
        en: "Settings",
        pt: "Configurações",
        es: "Configuraciones",
        ru: "Настройки",
        de: "Einstellungen"
      },
      subscription: {
        en: "Subscription",
        pt: "Assinatura",
        es: "Suscripción",
        ru: "Подписка",
        de: "Abonnement"
      }
    }
    return translations[key]?.[language] || translations[key]?.['en'] || key
  }

  const translatedNavMain = data.navMain.map(item => ({
    ...item,
    title: getTranslatedText(item.title.toLowerCase().replace(/\s+/g, ''))
  }))

  const translatedNavProgress = data.navProgress.map(item => ({
    ...item,
    title: getTranslatedText(item.title.toLowerCase())
  }))

  const translatedNavSecondary = data.navSecondary.map(item => ({
    ...item,
    title: getTranslatedText(item.title.toLowerCase())
  }))

  return (
    <Sidebar variant="inset" {...props} className="border-r border-yellow-500/20">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 text-sidebar-primary-foreground">
                  <Zap className="size-4 text-black" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    <span className="text-yellow-400">Otmizy</span>
                    <span className="text-white">.AI</span>
                  </span>
                  <span className="truncate text-xs text-gray-400">Marketing Platform</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <NavMain items={translatedNavMain} />
        <NavProjects 
          projects={[
            {
              name: getTranslatedText('progress'),
              url: "#",
              icon: Frame,
            },
          ]}
          progressItems={translatedNavProgress}
        />
        <NavSecondary items={translatedNavSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-black border-t border-yellow-500/20">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
