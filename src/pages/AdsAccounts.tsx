
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings, ExternalLink, Chrome, Edit, Trash2 } from 'lucide-react';
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

interface MetaAdsAccount {
  id: string;
  name: string;
  accountId: string;
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
  const [googleAccounts, setGoogleAccounts] = useState<GoogleAdsAccount[]>([
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

  const [metaAccounts, setMetaAccounts] = useState<MetaAdsAccount[]>([
    {
      id: '1',
      name: 'Main Meta Ads Account',
      accountId: 'META-789-012',
      status: 'connected',
      subAccounts: [
        { id: '1', name: 'Instagram Campaigns', customerId: 'META-789-013', status: 'active' },
        { id: '2', name: 'Facebook Retargeting', customerId: 'META-789-014', status: 'active' },
      ]
    }
  ]);

  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState<string | null>(null);
  const [isEditingSubAccount, setIsEditingSubAccount] = useState<string | null>(null);
  const [newAccountName, setNewAccountName] = useState('');
  const [editAccountData, setEditAccountData] = useState({ name: '', customerId: '' });
  const [editSubAccountData, setEditSubAccountData] = useState({ name: '', customerId: '' });
  const [accountType, setAccountType] = useState<'google' | 'meta'>('google');

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
        en: 'Manage your advertising accounts and sub-accounts',
        pt: 'Gerencie suas contas de publicidade e subcontas',
        es: 'Gestiona tus cuentas de publicidad y subcuentas',
        ru: 'Управляйте рекламными аккаунтами и подаккаунтами',
        de: 'Verwalten Sie Ihre Werbekonten und Unterkonten'
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
      connectMeta: {
        en: 'Connect using Meta Account',
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
      metaAds: {
        en: 'Meta Ads',
        pt: 'Meta Ads',
        es: 'Meta Ads',
        ru: 'Meta Ads',
        de: 'Meta Ads'
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
    toast({
      title: getText('connected'),
      description: "Google Ads account connected successfully!",
    });
  };

  const handleConnectMeta = () => {
    toast({
      title: getText('connected'),
      description: "Meta Ads account connected successfully!",
    });
  };

  const handleSaveAccount = () => {
    if (newAccountName.trim()) {
      if (accountType === 'google') {
        const newAccount: GoogleAdsAccount = {
          id: Date.now().toString(),
          name: newAccountName,
          customerId: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          status: 'disconnected',
          subAccounts: []
        };
        setGoogleAccounts([...googleAccounts, newAccount]);
      } else {
        const newAccount: MetaAdsAccount = {
          id: Date.now().toString(),
          name: newAccountName,
          accountId: `META-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}`,
          status: 'disconnected',
          subAccounts: []
        };
        setMetaAccounts([...metaAccounts, newAccount]);
      }
      setNewAccountName('');
      setIsAddingAccount(false);
      toast({
        title: "Account added",
        description: `New ${accountType} Ads account has been added successfully!`,
      });
    }
  };

  const handleEditAccount = (accountId: string, type: 'google' | 'meta') => {
    const account = type === 'google' 
      ? googleAccounts.find(a => a.id === accountId)
      : metaAccounts.find(a => a.id === accountId);
    
    if (account) {
      setEditAccountData({
        name: account.name,
        customerId: type === 'google' ? account.customerId : (account as MetaAdsAccount).accountId
      });
      setIsEditingAccount(accountId);
      setAccountType(type);
    }
  };

  const handleSaveEditAccount = () => {
    if (accountType === 'google') {
      setGoogleAccounts(prev => prev.map(acc => 
        acc.id === isEditingAccount 
          ? { ...acc, name: editAccountData.name, customerId: editAccountData.customerId }
          : acc
      ));
    } else {
      setMetaAccounts(prev => prev.map(acc => 
        acc.id === isEditingAccount 
          ? { ...acc, name: editAccountData.name, accountId: editAccountData.customerId }
          : acc
      ));
    }
    setIsEditingAccount(null);
    toast({
      title: "Account updated",
      description: "Account information has been updated successfully!",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="animated-bg"></div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            {getText('title')}
          </h1>
          <p className="text-gray-300 mt-2">
            {getText('subtitle')}
          </p>
        </div>
        <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700">
              <Plus className="w-4 h-4 mr-2" />
              {getText('addAccount')}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-yellow-500/20">
            <DialogHeader>
              <DialogTitle className="text-white">{getText('addAccount')}</DialogTitle>
              <DialogDescription className="text-gray-300">
                Add a new advertising account to manage your campaigns.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium">Account Type</label>
                <div className="flex space-x-2 mt-2">
                  <Button
                    type="button"
                    variant={accountType === 'google' ? 'default' : 'outline'}
                    onClick={() => setAccountType('google')}
                    className={accountType === 'google' ? 'bg-yellow-500 text-gray-900' : 'border-yellow-500/50 text-yellow-400'}
                  >
                    Google Ads
                  </Button>
                  <Button
                    type="button"
                    variant={accountType === 'meta' ? 'default' : 'outline'}
                    onClick={() => setAccountType('meta')}
                    className={accountType === 'meta' ? 'bg-yellow-500 text-gray-900' : 'border-yellow-500/50 text-yellow-400'}
                  >
                    Meta Ads
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Account name"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
                className="bg-gray-700 border-yellow-500/20 text-white"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingAccount(false)} className="border-gray-500 text-gray-300">
                Cancel
              </Button>
              <Button onClick={handleSaveAccount} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {/* Google Ads Section */}
        <Card className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-yellow-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Chrome className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-white">
                {getText('googleAds')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {googleAccounts.map((account) => (
                <div key={account.id} className="border border-gray-600 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer bg-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{account.name}</h3>
                      <p className="text-sm text-gray-300">ID: {account.customerId}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={account.status === 'connected' ? 'default' : 'secondary'}
                        className={account.status === 'connected' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-600 text-gray-200'}
                      >
                        {getText(account.status)}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAccount(account.id, 'google')}
                        className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                      >
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
                      <h4 className="font-medium text-white mb-2 flex items-center justify-between">
                        {getText('subAccounts')} ({account.subAccounts.length})
                        <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Sub-account
                        </Button>
                      </h4>
                      <div className="space-y-2">
                        {account.subAccounts.map((subAccount) => (
                          <div key={subAccount.id} className="flex items-center justify-between bg-gray-800/50 rounded p-2">
                            <div>
                              <p className="font-medium text-sm text-white">{subAccount.name}</p>
                              <p className="text-xs text-gray-400">ID: {subAccount.customerId}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={subAccount.status === 'active' ? 'default' : 'secondary'}
                                className={subAccount.status === 'active' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-600 text-gray-200'}
                              >
                                {getText(subAccount.status)}
                              </Badge>
                              <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-400">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
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

        {/* Meta Ads Section */}
        <Card className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-yellow-500/20">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded text-blue-600 flex items-center justify-center font-bold text-sm">f</div>
              </div>
              <CardTitle className="text-xl font-bold text-white">
                {getText('metaAds')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metaAccounts.map((account) => (
                <div key={account.id} className="border border-gray-600 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer bg-gray-700/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white">{account.name}</h3>
                      <p className="text-sm text-gray-300">ID: {account.accountId}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={account.status === 'connected' ? 'default' : 'secondary'}
                        className={account.status === 'connected' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-600 text-gray-200'}
                      >
                        {getText(account.status)}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAccount(account.id, 'meta')}
                        className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {account.status === 'disconnected' && (
                    <Button 
                      onClick={handleConnectMeta}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-3"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {getText('connectMeta')}
                    </Button>
                  )}
                  
                  {account.subAccounts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-white mb-2 flex items-center justify-between">
                        {getText('subAccounts')} ({account.subAccounts.length})
                        <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-400 text-xs">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Sub-account
                        </Button>
                      </h4>
                      <div className="space-y-2">
                        {account.subAccounts.map((subAccount) => (
                          <div key={subAccount.id} className="flex items-center justify-between bg-gray-800/50 rounded p-2">
                            <div>
                              <p className="font-medium text-sm text-white">{subAccount.name}</p>
                              <p className="text-xs text-gray-400">ID: {subAccount.customerId}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={subAccount.status === 'active' ? 'default' : 'secondary'}
                                className={subAccount.status === 'active' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-600 text-gray-200'}
                              >
                                {getText(subAccount.status)}
                              </Badge>
                              <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-400">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
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

      {/* Edit Account Dialog */}
      <Dialog open={!!isEditingAccount} onOpenChange={() => setIsEditingAccount(null)}>
        <DialogContent className="bg-gray-800 border-yellow-500/20">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium">Account Name</label>
              <Input
                value={editAccountData.name}
                onChange={(e) => setEditAccountData({...editAccountData, name: e.target.value})}
                className="bg-gray-700 border-yellow-500/20 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium">Account ID</label>
              <Input
                value={editAccountData.customerId}
                onChange={(e) => setEditAccountData({...editAccountData, customerId: e.target.value})}
                className="bg-gray-700 border-yellow-500/20 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingAccount(null)} className="border-gray-500 text-gray-300">
              Cancel
            </Button>
            <Button onClick={handleSaveEditAccount} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdsAccounts;
