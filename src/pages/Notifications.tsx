
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Bell, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Notifications = () => {
  const { language } = useLanguage();
  const [showTestNotification, setShowTestNotification] = useState(false);
  
  const [notificationSettings, setNotificationSettings] = useState({
    approvedSales: 'disabled',
    saleValue: 'commission',
    productName: 'show',
    dashboardName: 'show'
  });

  const sendTestNotification = () => {
    setShowTestNotification(true);
    setTimeout(() => setShowTestNotification(false), 5000);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
        <Bell className="w-8 h-8 text-orange-600" />
        {language === 'pt' ? 'Notificações' : 'Notifications'}
      </h1>

      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800 dark:text-orange-200">
            {language === 'pt' ? 'Configurações de Notificação de Vendas' : 'Sales Notification Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium">
                {language === 'pt' ? 'Enviar vendas aprovadas' : 'Send approved sales'}
              </Label>
              <Select 
                value={notificationSettings.approvedSales} 
                onValueChange={(value) => setNotificationSettings({...notificationSettings, approvedSales: value})}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">{language === 'pt' ? 'Desabilitado' : 'Disabled'}</SelectItem>
                  <SelectItem value="enabled">{language === 'pt' ? 'Habilitado' : 'Enabled'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">
                {language === 'pt' ? 'Valor da venda' : 'Sale value'}
              </Label>
              <Select 
                value={notificationSettings.saleValue} 
                onValueChange={(value) => setNotificationSettings({...notificationSettings, saleValue: value})}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commission">{language === 'pt' ? 'Comissão' : 'Commission'}</SelectItem>
                  <SelectItem value="total">Total</SelectItem>
                  <SelectItem value="net">{language === 'pt' ? 'Líquido' : 'Net'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">
                {language === 'pt' ? 'Nome do produto' : 'Product name'}
              </Label>
              <Select 
                value={notificationSettings.productName} 
                onValueChange={(value) => setNotificationSettings({...notificationSettings, productName: value})}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">{language === 'pt' ? 'Mostrar' : 'Show'}</SelectItem>
                  <SelectItem value="hide">{language === 'pt' ? 'Esconder' : 'Hide'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">
                {language === 'pt' ? 'Nome do Dashboard' : 'Dashboard name'}
              </Label>
              <Select 
                value={notificationSettings.dashboardName} 
                onValueChange={(value) => setNotificationSettings({...notificationSettings, dashboardName: value})}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="show">{language === 'pt' ? 'Mostrar' : 'Show'}</SelectItem>
                  <SelectItem value="hide">{language === 'pt' ? 'Esconder' : 'Hide'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
              {language === 'pt' ? 'Salvar Configurações' : 'Save Settings'}
            </Button>
            <Button variant="outline" onClick={sendTestNotification} className="border-orange-200 hover:bg-orange-50">
              <Send className="w-4 h-4 mr-2" />
              {language === 'pt' ? 'Testar Notificação' : 'Test Notification'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Notification Preview */}
      {showTestNotification && (
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    {language === 'pt' ? 'Nova Venda Aprovada!' : 'New Approved Sale!'}
                  </span>
                </div>
                <div className="text-sm text-green-700 mt-1">
                  {notificationSettings.dashboardName === 'show' && (
                    <span className="font-medium">AdGuardAI Dashboard • </span>
                  )}
                  {notificationSettings.productName === 'show' && (
                    <span>Produto: Campanha Holiday Sale • </span>
                  )}
                  <span>
                    {language === 'pt' ? 'Valor: ' : 'Value: '}
                    {notificationSettings.saleValue === 'commission' ? 'R$ 125,00 (comissão)' :
                     notificationSettings.saleValue === 'total' ? 'R$ 850,00 (total)' :
                     'R$ 750,00 (líquido)'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notification Preview */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'pt' ? 'Prévia da Notificação' : 'Notification Preview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">AG</span>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {notificationSettings.approvedSales === 'enabled' 
                    ? (language === 'pt' ? '✅ Nova Venda Aprovada!' : '✅ New Approved Sale!')
                    : (language === 'pt' ? '❌ Notificações Desabilitadas' : '❌ Notifications Disabled')}
                </div>
                {notificationSettings.approvedSales === 'enabled' && (
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {notificationSettings.dashboardName === 'show' && 'AdGuardAI Dashboard • '}
                    {notificationSettings.productName === 'show' && (language === 'pt' ? 'Produto: [Nome] • ' : 'Product: [Name] • ')}
                    {language === 'pt' ? 'Valor: ' : 'Value: '}
                    {notificationSettings.saleValue === 'commission' ? (language === 'pt' ? '[Comissão]' : '[Commission]') :
                     notificationSettings.saleValue === 'total' ? '[Total]' :
                     (language === 'pt' ? '[Líquido]' : '[Net]')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
