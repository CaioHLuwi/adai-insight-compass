
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
  Trophy,
  Settings,
  Crown,
  Calculator
} from "lucide-react"
import { useLocation } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { useLanguage } from "@/hooks/useLanguage"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { language } = useLanguage();
  const location = useLocation();

  const getTranslations = () => {
    const translations = {
      dashboard: {
        en: 'Dashboard',
        pt: 'Dashboard',
        es: 'Dashboard',
        ru: 'Панель управления',
        de: 'Dashboard'
      },
      otmizy: {
        en: 'Otmizy.ai',
        pt: 'Otmizy.ai',
        es: 'Otmizy.ai',
        ru: 'Otmizy.ai',
        de: 'Otmizy.ai'
      },
      campaigns: {
        en: 'Campaigns',
        pt: 'Campanhas',
        es: 'Campañas',
        ru: 'Кампании',
        de: 'Kampagnen'
      },
      users: {
        en: 'Users',
        pt: 'Usuários',
        es: 'Usuarios',
        ru: 'Пользователи',
        de: 'Benutzer'
      },
      adsAccounts: {
        en: 'Ads Accounts',
        pt: 'Contas ADS',
        es: 'Cuentas de Anuncios',
        ru: 'Рекламные аккаунты',
        de: 'Werbekonten'
      },
      expenses: {
        en: 'Expenses',
        pt: 'Despesas',
        es: 'Gastos',
        ru: 'Расходы',
        de: 'Ausgaben'
      },
      reports: {
        en: 'Reports',
        pt: 'Relatórios',
        es: 'Informes',
        ru: 'Отчеты',
        de: 'Berichte'
      },
      notifications: {
        en: 'Notifications',
        pt: 'Notificações',
        es: 'Notificaciones',
        ru: 'Уведомления',
        de: 'Benachrichtigungen'
      },
      settings: {
        en: 'Settings',
        pt: 'Configurações',
        es: 'Configuración',
        ru: 'Настройки',
        de: 'Einstellungen'
      },
      subscription: {
        en: 'Subscription',
        pt: 'Assinatura',
        es: 'Suscripción',
        ru: 'Подписка',
        de: 'Abonnement'
      },
      inProgress: {
        en: 'In Progress',
        pt: 'Em Progresso',
        es: 'En Progreso',
        ru: 'В процессе',
        de: 'In Bearbeitung'
      },
      achievements: {
        en: 'Achievements',
        pt: 'Conquistas',
        es: 'Logros',
        ru: 'Достижения',
        de: 'Erfolge'
      },
      rates: {
        en: 'Rates',
        pt: 'Taxas',
        es: 'Tasas',
        ru: 'Ставки',
        de: 'Tarife'
      }
    };

    return translations;
  };

  const translations = getTranslations();

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
        title: translations.dashboard[language] || translations.dashboard.en,
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: location.pathname === "/dashboard",
      },
      {
        title: translations.otmizy[language] || translations.otmizy.en,
        url: "/chatbot",
        icon: Bot,
        isActive: location.pathname === "/chatbot",
      },
      {
        title: translations.campaigns[language] || translations.campaigns.en,
        url: "/campaigns",
        icon: PieChart,
        isActive: location.pathname === "/campaigns",
      },
      {
        title: translations.users[language] || translations.users.en,
        url: "/users",
        icon: Users,
        isActive: location.pathname === "/users",
      },
      {
        title: translations.adsAccounts[language] || translations.adsAccounts.en,
        url: "/ads-accounts",
        icon: CreditCard,
        isActive: location.pathname === "/ads-accounts",
      },
      {
        title: translations.expenses[language] || translations.expenses.en,
        url: "/expenses",
        icon: DollarSign,
        isActive: location.pathname === "/expenses",
      },
      {
        title: translations.rates[language] || translations.rates.en,
        url: "/rates",
        icon: Calculator,
        isActive: location.pathname === "/rates",
      },
      {
        title: translations.reports[language] || translations.reports.en,
        url: "/reports",
        icon: FileText,
        isActive: location.pathname === "/reports",
      },
      {
        title: translations.notifications[language] || translations.notifications.en,
        url: "/notifications",
        icon: Bell,
        isActive: location.pathname === "/notifications",
      },
    ],
    navSecondary: [
      {
        title: translations.settings[language] || translations.settings.en,
        url: "/settings",
        icon: Settings,
        isActive: location.pathname === "/settings",
      },
      {
        title: translations.subscription[language] || translations.subscription.en,
        url: "/subscription",
        icon: Crown,
        isActive: location.pathname === "/subscription",
      },
    ],
    projects: [
      {
        name: translations.inProgress[language] || translations.inProgress.en,
        url: "#",
        icon: Frame,
      },
    ],
    progressItems: [
      {
        title: translations.achievements[language] || translations.achievements.en,
        url: "/achievements",
        icon: Trophy,
        isActive: location.pathname === "/achievements",
      },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <img src="/horizontal-darkmode.png" alt="Otmizy.ai Logo" style={{ height: '47px', width: 'auto' }} />
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
