
import React from 'react';
import { 
  Calendar, 
  Home, 
  BarChart3, 
  Users, 
  CreditCard, 
  MessageSquare, 
  TrendingUp,
  Settings,
  Globe,
  Bell,
  Shield
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/hooks/useLanguage';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: language === 'pt' ? 'Campanhas' : language === 'es' ? 'Campañas' : language === 'ru' ? 'Кампании' : language === 'de' ? 'Kampagnen' : 'Campaigns',
      url: '/campaigns',
      icon: BarChart3,
    },
    {
      title: language === 'pt' ? 'Relatórios' : language === 'es' ? 'Informes' : language === 'ru' ? 'Отчеты' : language === 'de' ? 'Berichte' : 'Reports',
      url: '/reports',
      icon: Calendar,
    },
    {
      title: language === 'pt' ? 'Usuários' : language === 'es' ? 'Usuarios' : language === 'ru' ? 'Пользователи' : language === 'de' ? 'Benutzer' : 'Users',
      url: '/users',
      icon: Users,
    },
    {
      title: language === 'pt' ? 'Assinatura' : language === 'es' ? 'Suscripción' : language === 'ru' ? 'Подписка' : language === 'de' ? 'Abonnement' : 'Subscription',
      url: '/subscription',
      icon: CreditCard,
    },
    {
      title: language === 'pt' ? 'Contas de ADS' : language === 'es' ? 'Cuentas de ADS' : language === 'ru' ? 'Рекламные аккаунты' : language === 'de' ? 'ADS-Konten' : 'ADS Accounts',
      url: '/ads-accounts',
      icon: Globe,
    },
    {
      title: 'Chatbot',
      url: '/chatbot',
      icon: MessageSquare,
    },
    {
      title: language === 'pt' ? 'Taxas' : language === 'es' ? 'Tarifas' : language === 'ru' ? 'Тарифы' : language === 'de' ? 'Gebühren' : 'Rates',
      url: '/rates',
      icon: TrendingUp,
    },
    {
      title: language === 'pt' ? 'Notificações' : language === 'es' ? 'Notificaciones' : language === 'ru' ? 'Уведомления' : language === 'de' ? 'Benachrichtigungen' : 'Notifications',
      url: '/notifications',
      icon: Bell,
    },
  ];

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar>
      <SidebarHeader className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            ADGuard.AI
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 dark:text-orange-400">
            {language === 'pt' ? 'Menu Principal' : language === 'es' ? 'Menú Principal' : language === 'ru' ? 'Главное меню' : language === 'de' ? 'Hauptmenü' : 'Main Menu'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    onClick={() => navigate(item.url)}
                    className={isActive(item.url) ? 'bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 border-l-3 border-orange-500' : 'hover:bg-orange-50 dark:hover:bg-orange-900/10'}
                  >
                    <button className="w-full flex items-center">
                      <item.icon className={`mr-2 h-4 w-4 ${isActive(item.url) ? 'text-orange-600' : ''}`} />
                      <span className={isActive(item.url) ? 'text-orange-700 font-medium' : ''}>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator className="bg-orange-200 dark:bg-orange-800" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 dark:text-orange-400">
            {language === 'pt' ? 'Configurações' : language === 'es' ? 'Configuraciones' : language === 'ru' ? 'Настройки' : language === 'de' ? 'Einstellungen' : 'Settings'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/settings')}
                  onClick={() => navigate('/settings')}
                  className={isActive('/settings') ? 'bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30' : 'hover:bg-orange-50 dark:hover:bg-orange-900/10'}
                >
                  <button className="w-full flex items-center">
                    <Settings className={`mr-2 h-4 w-4 ${isActive('/settings') ? 'text-orange-600' : ''}`} />
                    <span className={isActive('/settings') ? 'text-orange-700 font-medium' : ''}>{language === 'pt' ? 'Configurações' : language === 'es' ? 'Configuraciones' : language === 'ru' ? 'Настройки' : language === 'de' ? 'Einstellungen' : 'Settings'}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <div className="text-center text-xs text-orange-600 dark:text-orange-400">
          © 2024 ADGuard.AI
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
