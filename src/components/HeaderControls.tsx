
import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';

export function HeaderControls() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/20">
            <Globe className="h-4 w-4 text-orange-600 mr-2" />
            <span className="text-orange-700 dark:text-orange-300">
              {languages.find(lang => lang.code === language)?.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-orange-200 dark:border-orange-800">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className="hover:bg-orange-100 dark:hover:bg-orange-900/20"
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Toggle
        pressed={theme === 'dark'}
        onPressedChange={toggleTheme}
        className="border-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/20"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-orange-600" />
        ) : (
          <Moon className="h-4 w-4 text-orange-600" />
        )}
      </Toggle>
    </div>
  );
}
