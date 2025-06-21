
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
  Sun
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
      title: language === 'pt' ? 'Dashboard' : 'Dashboard',
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
      title: language === 'pt' ? 'Financeiro' : 'Financial',
      url: '/financial',
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
  ];

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AG</span>
          </div>
          <span className="font-bold text-lg">AdGuardAI</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
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
                  >
                    <button className="w-full flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>
            {language === 'pt' ? 'Configurações' : 'Settings'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/settings')}
                  onClick={() => navigate('/settings')}
                >
                  <button className="w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{language === 'pt' ? 'Configurações' : 'Settings'}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              {language === 'pt' ? 'Modo Claro' : 'Light Mode'}
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              {language === 'pt' ? 'Modo Escuro' : 'Dark Mode'}
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="w-full justify-start"
        >
          <Globe className="mr-2 h-4 w-4" />
          {language === 'pt' ? 'English' : 'Português'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
