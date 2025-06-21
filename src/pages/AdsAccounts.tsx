
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, ExternalLink, Chrome } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GoogleAdsAccount {
  id: string;
  name: string;
  customerId: string;
  status: 'connected' | 'disconnected';
  subAccounts: SubAccount[];
}

interface SubAccount {
  id: string;
  name: string;
  customerId: string;
  status: 'active' | 'paused';
}

const AdsAccounts = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<GoogleAdsAccount[]>([
    {
      id: '1',
      name: 'Main Google Ads Account',
      customerId: '123-456-7890',
      status: 'connected',
      subAccounts: [
        { id: '1', name: 'Campanhas de Verão', customerId: '123-456-7891', status: 'active' },
        { id: '2', name: 'Black Friday', customerId: '123-456-7892', status: 'paused' },
      ]
    }
  ]);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'ADS Accounts',
        pt: 'Contas de ADS',
        es: 'Cuentas de ADS',
        ru: 'Рекламные аккаунты',
        de: 'ADS-Konten'
      },
      subtitle: {
        en: 'Manage your Google Ads accounts and sub-accounts',
        pt: 'Gerencie suas contas do Google Ads e subcontas',
        es: 'Gestiona tus cuentas de Google Ads y subcuentas',
        ru: 'Управляйте аккаунтами Google Ads и подаккаунтами',
        de: 'Verwalten Sie Ihre Google Ads-Konten und Unterkonten'
      },
      addAccount: {
        en: 'Add Account',
        pt: 'Adicionar Conta',
        es: 'Agregar Cuenta',
        ru: 'Добавить аккаунт',
        de: 'Konto hinzufügen'
      },
      connectGoogle: {
        en: 'Connect using Google Account',
        pt: 'Conectar conta',
        es: 'Conectar cuenta',
        ru: 'Подключить аккаунт',
        de: 'Konto verbinden'
      },
      googleAds: {
        en: 'Google Ads',
        pt: 'Google Ads',
        es: 'Google Ads',
        ru: 'Google Ads',
        de: 'Google Ads'
      },
      subAccounts: {
        en: 'Sub-accounts',
        pt: 'Subcontas',
        es: 'Subcuentas',
        ru: 'Подаккаунты',
        de: 'Unterkonten'
      },
      connected: {
        en: 'Connected',
        pt: 'Conectado',
        es: 'Conectado',
        ru: 'Подключено',
        de: 'Verbunden'
      },
      disconnected: {
        en: 'Disconnected',
        pt: 'Desconectado',
        es: 'Desconectado',
        ru: 'Отключено',
        de: 'Getrennt'
      },
      active: {
        en: 'Active',
        pt: 'Ativo',
        es: 'Activo',
        ru: 'Активно',
        de: 'Aktiv'
      },
      paused: {
        en: 'Paused',
        pt: 'Pausado',
        es: 'Pausado',
        ru: 'Приостановлено',
        de: 'Pausiert'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const handleConnectGoogle = () => {
    // Simulate Google OAuth flow
    toast({
      title: getText('connected'),
      description: "Google Ads account connected successfully!",
    });
  };

  const handleSaveAccount = () => {
    if (newAccountName.trim()) {
      const newAccount: GoogleAdsAccount = {
        id: Date.now().toString(),
        name: newAccountName,
        customerId: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        status: 'disconnected',
        subAccounts: []
      };
      setAccounts([...accounts, newAccount]);
      setNewAccountName('');
      setIsAddingAccount(false);
      toast({
        title: "Account added",
        description: "New Google Ads account has been added successfully!",
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            {getText('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {getText('subtitle')}
          </p>
        </div>
        <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              {getText('addAccount')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{getText('addAccount')}</DialogTitle>
              <DialogDescription>
                Add a new Google Ads account to manage your campaigns.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Account name"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingAccount(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAccount}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Chrome className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {getText('googleAds')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{account.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ID: {account.customerId}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={account.status === 'connected' ? 'default' : 'secondary'}
                        className={account.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {getText(account.status)}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {account.status === 'disconnected' && (
                    <Button 
                      onClick={handleConnectGoogle}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 mb-3"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {getText('connectGoogle')}
                    </Button>
                  )}
                  
                  {account.subAccounts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {getText('subAccounts')} ({account.subAccounts.length})
                      </h4>
                      <div className="space-y-2">
                        {account.subAccounts.map((subAccount) => (
                          <div key={subAccount.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded p-2">
                            <div>
                              <p className="font-medium text-sm">{subAccount.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">ID: {subAccount.customerId}</p>
                            </div>
                            <Badge 
                              variant={subAccount.status === 'active' ? 'default' : 'secondary'}
                              className={subAccount.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {getText(subAccount.status)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdsAccounts;
