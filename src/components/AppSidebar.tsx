
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
  Shield,
  Copyright,
  Receipt
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
      title: language === 'pt' ? 'Despesas' : language === 'es' ? 'Gastos' : language === 'ru' ? 'Расходы' : language === 'de' ? 'Ausgaben' : 'Expenses',
      url: '/expenses',
      icon: Receipt,
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
    <Sidebar className="bg-gray-900 border-yellow-500/20">
      <SidebarHeader className="p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="text-gray-900 w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            ADGuard.AI
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400">
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
                    className={isActive(item.url) ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-l-3 border-yellow-500 text-yellow-400' : 'hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-400'}
                  >
                    <button className="w-full flex items-center">
                      <item.icon className={`mr-2 h-4 w-4 ${isActive(item.url) ? 'text-yellow-400' : ''}`} />
                      <span className={isActive(item.url) ? 'text-yellow-400 font-medium' : ''}>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator className="bg-yellow-500/20" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400">
            {language === 'pt' ? 'Configurações' : language === 'es' ? 'Configuraciones' : language === 'ru' ? 'Настройки' : language === 'de' ? 'Einstellungen' : 'Settings'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/settings')}
                  onClick={() => navigate('/settings')}
                  className={isActive('/settings') ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-l-3 border-yellow-500 text-yellow-400' : 'hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-400'}
                >
                  <button className="w-full flex items-center">
                    <Settings className={`mr-2 h-4 w-4 ${isActive('/settings') ? 'text-yellow-400' : ''}`} />
                    <span className={isActive('/settings') ? 'text-yellow-400 font-medium' : ''}>{language === 'pt' ? 'Configurações' : language === 'es' ? 'Configuraciones' : language === 'ru' ? 'Настройки' : language === 'de' ? 'Einstellungen' : 'Settings'}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-t border-yellow-500/20">
        <div className="text-center text-xs text-gray-400 space-y-1">
          <div className="flex items-center justify-center">
            <Copyright className="w-3 h-3 mr-1" />
            <span>2025 ADGuard.AI</span>
          </div>
          <div>created by Caio Henrique and Pedro Rossini</div>
          <div className="text-yellow-400 font-medium">ZEUZ Midia company</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
