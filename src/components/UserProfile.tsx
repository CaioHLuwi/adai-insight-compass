
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Edit, LogOut, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserProfile() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Admin User',
    email: 'admin@otmizy.ai',
    role: 'Administrator',
    avatar: null
  });

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.length > 1 
      ? names[0][0] + names[names.length - 1][0]
      : names[0][0] + (names[0][1] || '');
  };

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      editAccount: {
        en: 'Edit Account',
        pt: 'Editar Conta',
        es: 'Editar Cuenta',
        ru: 'Редактировать аккаунт',
        de: 'Konto bearbeiten'
      },
      logout: {
        en: 'Logout',
        pt: 'Sair',
        es: 'Cerrar Sesión',
        ru: 'Выйти',
        de: 'Abmelden'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <div className="flex items-center space-x-4">
      {/* User Info Display */}
      <div className="text-right">
        <div className="text-sm font-medium text-white">{user.name}</div>
        <div className="text-xs text-gray-400">{user.email}</div>
        <div className="flex items-center justify-end text-xs text-yellow-400 mt-1">
          <Shield className="w-3 h-3 mr-1" />
          {user.role}
        </div>
      </div>

      {/* User Avatar with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-3 p-2 hover:bg-gray-700/50">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 font-semibold text-sm">
              {getInitials(user.name)}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-700 border-yellow-500/20 w-48">
          <DropdownMenuItem
            onClick={() => navigate('/admin-settings')}
            className="hover:bg-gray-600 text-white cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" />
            {getText('editAccount')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              // Handle admin logout
              navigate('/admin-login');
            }}
            className="hover:bg-gray-600 text-white cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {getText('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
</DropdownMenuContent>
