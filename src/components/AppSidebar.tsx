
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
  Moon,
  Sun,
  Bell
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
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: Home,
    },
    {
      title: language === 'pt' ? 'Campanhas' : 'Campaigns',
      url: '/campaigns',
      icon: BarChart3,
    },
    {
      title: language === 'pt' ? 'Relatórios' : 'Reports',
      url: '/reports',
      icon: Calendar,
    },
    {
      title: language === 'pt' ? 'Usuários' : 'Users',
      url: '/users',
      icon: Users,
    },
    {
      title: language === 'pt' ? 'Assinatura' : 'Subscription',
      url: '/subscription',
      icon: CreditCard,
    },
    {
      title: language === 'pt' ? 'Contas de ADS' : 'ADS Accounts',
      url: '/ads-accounts',
      icon: Globe,
    },
    {
      title: 'Chatbot',
      url: '/chatbot',
      icon: MessageSquare,
    },
    {
      title: language === 'pt' ? 'Taxas' : 'Rates',
      url: '/rates',
      icon: TrendingUp,
    },
    {
      title: language === 'pt' ? 'Notificações' : 'Notifications',
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
            <span className="text-white font-bold text-sm">AG</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            AdGuardAI
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-orange-600 dark:text-orange-400">
            {language === 'pt' ? 'Menu Principal' : 'Main Menu'}
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
            {language === 'pt' ? 'Configurações' : 'Settings'}
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
                    <span className={isActive('/settings') ? 'text-orange-700 font-medium' : ''}>{language === 'pt' ? 'Configurações' : 'Settings'}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 space-y-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start border-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/20"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="mr-2 h-4 w-4 text-orange-600" />
              <span className="text-orange-700 dark:text-orange-300">
                {language === 'pt' ? 'Modo Claro' : 'Light Mode'}
              </span>
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4 text-orange-600" />
              <span className="text-orange-700 dark:text-orange-300">
                {language === 'pt' ? 'Modo Escuro' : 'Dark Mode'}
              </span>
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="w-full justify-start border-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/20"
        >
          <Globe className="mr-2 h-4 w-4 text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300">
            {language === 'pt' ? 'English' : 'Português'}
          </span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
