
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Globe, Save } from 'lucide-react';

const Settings = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState(localStorage.getItem('manus-api-key') || '');

  const saveApiKey = () => {
    localStorage.setItem('manus-api-key', apiKey);
    alert(language === 'pt' ? 'Chave da API salva!' : 'API Key saved!');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        {language === 'pt' ? 'Configurações' : 'Settings'}
      </h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            {theme === 'dark' ? <Moon className="mr-2" /> : <Sun className="mr-2" />}
            {language === 'pt' ? 'Aparência' : 'Appearance'}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {language === 'pt' ? 'Tema' : 'Theme'}
              </span>
              <Button onClick={toggleTheme} variant="outline">
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
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="mr-2" />
            {language === 'pt' ? 'Idioma' : 'Language'}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {language === 'pt' ? 'Idioma da Interface' : 'Interface Language'}
              </span>
              <Button onClick={toggleLanguage} variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                {language === 'pt' ? 'English' : 'Português'}
              </Button>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'pt' ? 'Configurações da API' : 'API Settings'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'pt' ? 'Chave da API Manus' : 'Manus API Key'}
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={language === 'pt' ? 'Cole sua chave da API aqui' : 'Paste your API key here'}
                  className="flex-1"
                />
                <Button onClick={saveApiKey}>
                  <Save className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Salvar' : 'Save'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {language === 'pt' 
                  ? 'Encontre sua chave da API em: https://manus.chat/dashboard/api-keys'
                  : 'Find your API key at: https://manus.chat/dashboard/api-keys'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
