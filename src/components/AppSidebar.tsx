
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
  Receipt,
  Trophy,
  ShoppingBag,
  TrendingDown
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'de', name: 'Deutsch' },
  ];

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: 'IAgente',
      url: '/chatbot',
      icon: MessageSquare,
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

  const progressItems = [
    {
      title: 'Shop',
      url: '/shop',
      icon: ShoppingBag,
    },
    {
      title: language === 'pt' ? 'Conquistas' : language === 'es' ? 'Logros' : language === 'ru' ? 'Достижения' : language === 'de' ? 'Erfolge' : 'Achievements',
      url: '/achievements',
      icon: Trophy,
    },
  ];

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="bg-black border-yellow-500/20">
      <SidebarHeader className="p-4 bg-black border-b border-yellow-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="text-black w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            SafeAd.AI
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-black">
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
            {language === 'pt' ? 'Progresso' : language === 'es' ? 'Progreso' : language === 'ru' ? 'Прогресс' : language === 'de' ? 'Fortschritt' : 'Progress'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {progressItems.map((item) => (
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
      
      <SidebarFooter className="p-4 bg-black border-t border-yellow-500/20">
        <div className="mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                <Globe className="h-4 w-4" />
                <span>{languages.find(lang => lang.code === language)?.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-700 border-yellow-500/20 z-50">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className="hover:bg-gray-600 text-white"
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-center text-xs text-gray-400 space-y-1">
          <div className="flex items-center justify-center">
            <Copyright className="w-3 h-3 mr-1" />
            <span>2025 SafeAd.AI</span>
          </div>
          <div>created by Caio Henrique and Pedro Rossini</div>
          <div className="text-yellow-400 font-medium">ZEUZ Midia company</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
