
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { Bell, BellRing, Shield } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface NotificationSettings {
  approvedSales: 'disabled' | 'enabled';
  salesValue: 'commission' | 'total' | 'net';
  productName: 'show' | 'hide';
  dashboardName: 'show' | 'hide';
}

const Notifications = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettings>({
    approvedSales: 'disabled',
    salesValue: 'total',
    productName: 'show',
    dashboardName: 'show'
  });
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Notifications',
        pt: 'Notificações',
        es: 'Notificaciones',
        ru: 'Уведомления',
        de: 'Benachrichtigungen'
      },
      subtitle: {
        en: 'Configure your notification preferences for Google Ads sales',
        pt: 'Configure suas preferências de notificação para vendas do Google Ads',
        es: 'Configura tus preferencias de notificación para ventas de Google Ads',
        ru: 'Настройте ваши предпочтения уведомлений для продаж Google Ads',
        de: 'Konfigurieren Sie Ihre Benachrichtigungseinstellungen für Google Ads-Verkäufe'
      },
      approvedSales: {
        en: 'Send Approved Sales Notifications',
        pt: 'Enviar Notificações de Vendas Aprovadas',
        es: 'Enviar Notificaciones de Ventas Aprobadas',
        ru: 'Отправлять уведомления об одобренных продажах',
        de: 'Benachrichtigungen für genehmigte Verkäufe senden'
      },
      salesValue: {
        en: 'Sales Value Display',
        pt: 'Exibição do Valor da Venda',
        es: 'Visualización del Valor de Venta',
        ru: 'Отображение стоимости продажи',
        de: 'Verkaufswert-Anzeige'
      },
      productName: {
        en: 'Product Name',
        pt: 'Nome do Produto',
        es: 'Nombre del Producto',
        ru: 'Название продукта',
        de: 'Produktname'
      },
      dashboardName: {
        en: 'Dashboard Name',
        pt: 'Nome do Dashboard',
        es: 'Nombre del Dashboard',
        ru: 'Название панели',
        de: 'Dashboard-Name'
      },
      testNotification: {
        en: 'Test Notification',
        pt: 'Testar Notificação',
        es: 'Probar Notificación',
        ru: 'Тестовое уведомление',
        de: 'Test-Benachrichtigung'
      },
      saveSettings: {
        en: 'Save Settings',
        pt: 'Salvar Configurações',
        es: 'Guardar Configuraciones',
        ru: 'Сохранить настройки',
        de: 'Einstellungen speichern'
      },
      enableNotifications: {
        en: 'Enable Browser Notifications',
        pt: 'Ativar Notificações do Navegador',
        es: 'Habilitar Notificaciones del Navegador',
        ru: 'Включить уведомления браузера',
        de: 'Browser-Benachrichtigungen aktivieren'
      },
      notificationsBlocked: {
        en: 'Notifications are blocked. Please enable them in your browser settings.',
        pt: 'As notificações estão bloqueadas. Por favor, ative-as nas configurações do seu navegador.',
        es: 'Las notificaciones están bloqueadas. Por favor, habilítalas en la configuración de tu navegador.',
        ru: 'Уведомления заблокированы. Пожалуйста, включите их в настройках браузера.',
        de: 'Benachrichtigungen sind blockiert. Bitte aktivieren Sie sie in Ihren Browser-Einstellungen.'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        toast({
          title: "Notifications enabled",
          description: "Browser notifications have been enabled successfully!",
        });
      }
    }
  };

  const showTestNotification = () => {
    if (notificationPermission !== 'granted') {
      toast({
        title: "Permission required",
        description: getText('notificationsBlocked'),
        variant: "destructive",
      });
      return;
    }

    const notificationContent = generateNotificationContent();
    
    if ('Notification' in window) {
      new Notification(notificationContent.title, {
        body: notificationContent.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'adguard-sale',
        requireInteraction: true,
        data: {
          url: window.location.origin,
          timestamp: Date.now()
        }
      });
    }

    toast({
      title: "Test notification sent",
      description: "Check your browser for the notification!",
    });
  };

  const generateNotificationContent = () => {
    const sampleData = {
      productName: 'Premium Course Bundle',
      dashboardName: 'Black Friday Campaign',
      value: 299.99,
      commission: 59.99,
      netValue: 239.99
    };

    let title = '🎉 ADGuard.AI - New Sale!';
    let body = 'A new sale has been approved!';

    if (settings.approvedSales === 'enabled') {
      let valueText = '';
      switch (settings.salesValue) {
        case 'commission':
          valueText = `$${sampleData.commission.toFixed(2)} commission`;
          break;
        case 'total':
          valueText = `$${sampleData.value.toFixed(2)} total`;
          break;
        case 'net':
          valueText = `$${sampleData.netValue.toFixed(2)} net`;
          break;
      }

      body = `💰 ${valueText}`;
      
      if (settings.productName === 'show') {
        body += ` - ${sampleData.productName}`;
      }
      
      if (settings.dashboardName === 'show') {
        body += ` (${sampleData.dashboardName})`;
      }
    }

    return { title, body };
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('notification-settings', JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been saved successfully!",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            {getText('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {getText('subtitle')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            ADGuard.AI
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Browser Permission Card */}
        {notificationPermission !== 'granted' && (
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700 dark:text-orange-300">
                <BellRing className="w-5 h-5 mr-2" />
                {getText('enableNotifications')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-600 dark:text-orange-400 mb-4">
                {getText('notificationsBlocked')}
              </p>
              <Button onClick={requestNotificationPermission} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                <Bell className="w-4 h-4 mr-2" />
                {getText('enableNotifications')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings Card */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Approved Sales Notifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('approvedSales')}
              </label>
              <Select value={settings.approvedSales} onValueChange={(value: any) => setSettings({...settings, approvedSales: value})}>
                <SelectTrigger className="border-orange-200 focus:ring-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">
                    {language === 'pt' ? 'Desabilitado' : 
                     language === 'es' ? 'Deshabilitado' :
                     language === 'ru' ? 'Отключено' :
                     language === 'de' ? 'Deaktiviert' :
                     'Disabled'}
                  </SelectItem>
                  <SelectItem value="enabled">
                    {language === 'pt' ? 'Habilitado' : 
                     language === 'es' ? 'Habilitado' :
                     language === 'ru' ? 'Включено' :
                     language === 'de' ? 'Aktiviert' :
                     'Enabled'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sales Value Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('salesValue')}
              </label>
              <Select value={settings.salesValue} onValueChange={(value: any) => setSettings({...settings, salesValue: value})}>
                <SelectTrigger className="border-orange-200 focus:ring-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commission">
                    {language === 'pt' ? 'Comissão' : 
                     language === 'es' ? 'Comisión' :
                     language === 'ru' ? 'Комиссия' :
                     language === 'de' ? 'Provision' :
                     'Commission'}
                  </SelectItem>
                  <SelectItem value="total">
                    {language === 'pt' ? 'Total' : 
                     language === 'es' ? 'Total' :
                     language === 'ru' ? 'Общая сумма' :
                     language === 'de' ? 'Gesamt' :
                     'Total'}
                  </SelectItem>
                  <SelectItem value="net">
                    {language === 'pt' ? 'Líquido' : 
                     language === 'es' ? 'Neto' :
                     language === 'ru' ? 'Чистая сумма' :
                     language === 'de' ? 'Netto' :
                     'Net'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Name Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('productName')}
              </label>
              <Select value={settings.productName} onValueChange={(value: any) => setSettings({...settings, productName: value})}>
                <SelectTrigger className="border-orange-200 focus:ring-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">
                    {language === 'pt' ? 'Mostrar' : 
                     language === 'es' ? 'Mostrar' :
                     language === 'ru' ? 'Показать' :
                     language === 'de' ? 'Anzeigen' :
                     'Show'}
                  </SelectItem>
                  <SelectItem value="hide">
                    {language === 'pt' ? 'Esconder' : 
                     language === 'es' ? 'Ocultar' :
                     language === 'ru' ? 'Скрыть' :
                     language === 'de' ? 'Verstecken' :
                     'Hide'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dashboard Name Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {getText('dashboardName')}
              </label>
              <Select value={settings.dashboardName} onValueChange={(value: any) => setSettings({...settings, dashboardName: value})}>
                <SelectTrigger className="border-orange-200 focus:ring-orange-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">
                    {language === 'pt' ? 'Mostrar' : 
                     language === 'es' ? 'Mostrar' :
                     language === 'ru' ? 'Показать' :
                     language === 'de' ? 'Anzeigen' :
                     'Show'}
                  </SelectItem>
                  <SelectItem value="hide">
                    {language === 'pt' ? 'Esconder' : 
                     language === 'es' ? 'Ocultar' :
                     language === 'ru' ? 'Скрыть' :
                     language === 'de' ? 'Verstecken' :
                     'Hide'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={showTestNotification}
                className="border-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/20"
                disabled={notificationPermission !== 'granted'}
              >
                <Bell className="w-4 h-4 mr-2 text-orange-600" />
                {getText('testNotification')}
              </Button>
              
              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                {getText('saveSettings')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
