
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Globe, Save, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState(localStorage.getItem('manus-api-key') || '');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    campaigns: true,
    revenue: true,
    anomalies: true,
    reports: false
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'de', name: 'Deutsch' },
  ];

  const saveApiKey = () => {
    localStorage.setItem('manus-api-key', apiKey);
    alert(language === 'pt' ? 'Chave da API salva!' : 'API Key saved!');
  };

  const updateNotification = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Settings',
        pt: 'Configurações',
        es: 'Configuraciones',
        ru: 'Настройки',
        de: 'Einstellungen'
      },
      appearance: {
        en: 'Appearance',
        pt: 'Aparência',
        es: 'Apariencia',
        ru: 'Внешний вид',
        de: 'Erscheinungsbild'
      },
      theme: {
        en: 'Theme',
        pt: 'Tema',
        es: 'Tema',
        ru: 'Тема',
        de: 'Thema'
      },
      lightMode: {
        en: 'Light Mode',
        pt: 'Modo Claro',
        es: 'Modo Claro',
        ru: 'Светлый режим',
        de: 'Heller Modus'
      },
      darkMode: {
        en: 'Dark Mode',
        pt: 'Modo Escuro',
        es: 'Modo Oscuro',
        ru: 'Темный режим',
        de: 'Dunkler Modus'
      },
      language: {
        en: 'Language',
        pt: 'Idioma',
        es: 'Idioma',
        ru: 'Язык',
        de: 'Sprache'
      },
      interfaceLanguage: {
        en: 'Interface Language',
        pt: 'Idioma da Interface',
        es: 'Idioma de la Interfaz',
        ru: 'Язык интерфейса',
        de: 'Sprache der Benutzeroberfläche'
      },
      notifications: {
        en: 'Notifications',
        pt: 'Notificações',
        es: 'Notificaciones',
        ru: 'Уведомления',
        de: 'Benachrichtigungen'
      },
      emailNotifications: {
        en: 'Email Notifications',
        pt: 'Notificações por Email',
        es: 'Notificaciones por Email',
        ru: 'Email уведомления',
        de: 'E-Mail-Benachrichtigungen'
      },
      pushNotifications: {
        en: 'Push Notifications',
        pt: 'Notificações Push',
        es: 'Notificaciones Push',
        ru: 'Push уведомления',
        de: 'Push-Benachrichtigungen'
      },
      campaignAlerts: {
        en: 'Campaign Alerts',
        pt: 'Alertas de Campanhas',
        es: 'Alertas de Campañas',
        ru: 'Оповещения о кампаниях',
        de: 'Kampagnen-Benachrichtigungen'
      },
      revenueAlerts: {
        en: 'Revenue Alerts',
        pt: 'Alertas de Receita',
        es: 'Alertas de Ingresos',
        ru: 'Оповещения о доходах',
        de: 'Umsatz-Benachrichtigungen'
      },
      anomalyDetection: {
        en: 'Anomaly Detection',
        pt: 'Detecção de Anomalias',
        es: 'Detección de Anomalías',
        ru: 'Обнаружение аномалий',
        de: 'Anomalie-Erkennung'
      },
      weeklyReports: {
        en: 'Weekly Reports',
        pt: 'Relatórios Semanais',
        es: 'Reportes Semanales',
        ru: 'Еженедельные отчеты',
        de: 'Wöchentliche Berichte'
      },
      apiSettings: {
        en: 'API Settings',
        pt: 'Configurações da API',
        es: 'Configuraciones de API',
        ru: 'Настройки API',
        de: 'API-Einstellungen'
      },
      manusApiKey: {
        en: 'Manus API Key',
        pt: 'Chave da API Manus',
        es: 'Clave API de Manus',
        ru: 'API ключ Manus',
        de: 'Manus API-Schlüssel'
      },
      apiKeyPlaceholder: {
        en: 'Paste your API key here',
        pt: 'Cole sua chave da API aqui',
        es: 'Pega tu clave API aquí',
        ru: 'Вставьте ваш API ключ сюда',
        de: 'Fügen Sie Ihren API-Schlüssel hier ein'
      },
      save: {
        en: 'Save',
        pt: 'Salvar',
        es: 'Guardar',
        ru: 'Сохранить',
        de: 'Speichern'
      },
      apiKeyDescription: {
        en: 'Find your API key at: https://manus.chat/dashboard/api-keys',
        pt: 'Encontre sua chave da API em: https://manus.chat/dashboard/api-keys',
        es: 'Encuentra tu clave API en: https://manus.chat/dashboard/api-keys',
        ru: 'Найдите ваш API ключ на: https://manus.chat/dashboard/api-keys',
        de: 'Finden Sie Ihren API-Schlüssel unter: https://manus.chat/dashboard/api-keys'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <div className="p-6 max-w-2xl">
      <div className="animated-bg"></div>
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {getText('title')}
      </h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow border border-yellow-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
            {theme === 'dark' ? <Moon className="mr-2 text-yellow-400" /> : <Sun className="mr-2 text-yellow-400" />}
            {getText('appearance')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                {getText('theme')}
              </span>
              <div className="flex items-center space-x-2">
                <Toggle
                  pressed={theme === 'dark'}
                  onPressedChange={toggleTheme}
                  className="border-yellow-500/50 hover:bg-yellow-500/10"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-yellow-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-yellow-400" />
                  )}
                </Toggle>
                <span className="text-gray-300 text-sm">
                  {theme === 'dark' ? getText('darkMode') : getText('lightMode')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow border border-yellow-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
            <Globe className="mr-2 text-yellow-400" />
            {getText('language')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                {getText('interfaceLanguage')}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400">
                    <Globe className="h-4 w-4 mr-2" />
                    {languages.find(lang => lang.code === language)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-700 border-yellow-500/20">
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
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow border border-yellow-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
            <Bell className="mr-2 text-yellow-400" />
            {getText('notifications')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{getText('emailNotifications')}</span>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(checked) => updateNotification('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{getText('pushNotifications')}</span>
              <Switch 
                checked={notifications.push}
                onCheckedChange={(checked) => updateNotification('push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{getText('campaignAlerts')}</span>
              <Switch 
                checked={notifications.campaigns}
                onCheckedChange={(checked) => updateNotification('campaigns', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{getText('revenueAlerts')}</span>
              <Switch 
                checked={notifications.revenue}
                onCheckedChange={(checked) => updateNotification('revenue', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{getText('anomalyDetection')}</span>
              <Switch 
                checked={notifications.anomalies}
                onCheckedChange={(checked) => updateNotification('anomalies', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{getText('weeklyReports')}</span>
              <Switch 
                checked={notifications.reports}
                onCheckedChange={(checked) => updateNotification('reports', checked)}
              />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 shadow border border-yellow-500/20">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {getText('apiSettings')}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {getText('manusApiKey')}
              </label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={getText('apiKeyPlaceholder')}
                  className="flex-1 bg-gray-700 border-yellow-500/20 text-white"
                />
                <Button onClick={saveApiKey} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700">
                  <Save className="w-4 h-4 mr-2" />
                  {getText('save')}
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {getText('apiKeyDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
