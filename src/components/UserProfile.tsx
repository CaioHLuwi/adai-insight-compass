
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Edit, LogOut, User } from 'lucide-react';
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
    name: 'Caio Henrique',
    role: 'Admin',
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-3 p-2 hover:bg-gray-700/50">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 font-semibold text-sm">
            {getInitials(user.name)}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">{user.name}</div>
            <div className="text-xs text-gray-400">{user.role}</div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-700 border-yellow-500/20 w-48">
        <DropdownMenuItem
          onClick={() => navigate('/edit-account')}
          className="hover:bg-gray-600 text-white cursor-pointer"
        >
          <Edit className="w-4 h-4 mr-2" />
          {getText('editAccount')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // Handle logout
            console.log('Logging out...');
          }}
          className="hover:bg-gray-600 text-white cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {getText('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
