
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface GoogleAdsAccount {
  id: string;
  name: string;
  customerId: string;
  status: 'active' | 'inactive';
  type: 'google';
  subAccounts: GoogleAdsSubAccount[];
}

interface MetaAdsAccount {
  id: string;
  name: string;
  accountId: string;
  status: 'active' | 'inactive';
  type: 'meta';
  subAccounts: MetaAdsSubAccount[];
}

interface GoogleAdsSubAccount {
  id: string;
  name: string;
  customerId: string;
  status: 'active' | 'inactive';
}

interface MetaAdsSubAccount {
  id: string;
  name: string;
  accountId: string;
  status: 'active' | 'inactive';
}

const AdsAccounts = () => {
  const { language } = useLanguage();
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);
  const [showMetaDialog, setShowMetaDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);

  const [googleAccounts, setGoogleAccounts] = useState<GoogleAdsAccount[]>([
    {
      id: '1',
      name: 'Conta Principal Google',
      customerId: '123-456-7890',
      status: 'active',
      type: 'google',
      subAccounts: [
        { id: '1', name: 'Subconta 1', customerId: '111-222-3333', status: 'active' },
        { id: '2', name: 'Subconta 2', customerId: '444-555-6666', status: 'inactive' }
      ]
    }
  ]);

  const [metaAccounts, setMetaAccounts] = useState<MetaAdsAccount[]>([
    {
      id: '1',
      name: 'Conta Principal Meta',
      accountId: 'act_123456789',
      status: 'active',
      type: 'meta',
      subAccounts: [
        { id: '1', name: 'Página Facebook', accountId: 'act_111222333', status: 'active' },
        { id: '2', name: 'Instagram Business', accountId: 'act_444555666', status: 'active' }
      ]
    }
  ]);

  const handleGoogleConnect = () => {
    console.log('Connecting to Google Ads...');
    // Google OAuth integration would go here
  };

  const handleMetaConnect = () => {
    console.log('Connecting to Meta Ads...');
    // Meta OAuth integration would go here
  };

  const handleEditAccount = (accountId: string, type: 'google' | 'meta') => {
    setEditingAccount(`${type}-${accountId}`);
    if (type === 'google') {
      setShowGoogleDialog(true);
    } else {
      setShowMetaDialog(true);
    }
  };

  const handleDeleteAccount = (accountId: string, type: 'google' | 'meta') => {
    if (type === 'google') {
      setGoogleAccounts(prev => prev.filter(acc => acc.id !== accountId));
    } else {
      setMetaAccounts(prev => prev.filter(acc => acc.id !== accountId));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {language === 'pt' ? 'Contas de ADS' : 'ADS Accounts'}
      </h1>

      {/* Google Ads Section */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              Google Ads
            </CardTitle>
            <Dialog open={showGoogleDialog} onOpenChange={setShowGoogleDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Adicionar Conta' : 'Add Account'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-yellow-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {language === 'pt' ? 'Adicionar Conta Google Ads' : 'Add Google Ads Account'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">{language === 'pt' ? 'Nome da Conta' : 'Account Name'}</Label>
                    <Input className="bg-gray-700 border-yellow-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Customer ID</Label>
                    <Input className="bg-gray-700 border-yellow-500/20 text-white" placeholder="123-456-7890" />
                  </div>
                  <Button onClick={handleGoogleConnect} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                    {language === 'pt' ? 'Conectar conta' : 'Connect Account'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {googleAccounts.map((account) => (
            <div key={account.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-white">{account.name}</h3>
                  <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                    {account.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                    onClick={() => handleEditAccount(account.id, 'google')}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                    onClick={() => handleDeleteAccount(account.id, 'google')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">Customer ID: {account.customerId}</p>
              
              {/* Sub Accounts */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">{language === 'pt' ? 'Subcontas' : 'Sub Accounts'}:</h4>
                {account.subAccounts.map((subAccount) => (
                  <div key={subAccount.id} className="flex items-center justify-between bg-gray-600/30 rounded p-2">
                    <div>
                      <span className="text-white text-sm">{subAccount.name}</span>
                      <span className="text-gray-400 text-xs ml-2">({subAccount.customerId})</span>
                    </div>
                    <Badge variant={subAccount.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {subAccount.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Meta Ads Section */}
      <Card className="bg-gradient-to-r from-blue-800/30 to-blue-900/30 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">f</span>
              </div>
              Meta Ads
            </CardTitle>
            <Dialog open={showMetaDialog} onOpenChange={setShowMetaDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Adicionar Conta' : 'Add Account'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-blue-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {language === 'pt' ? 'Adicionar Conta Meta Ads' : 'Add Meta Ads Account'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">{language === 'pt' ? 'Nome da Conta' : 'Account Name'}</Label>
                    <Input className="bg-gray-700 border-blue-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Account ID</Label>
                    <Input className="bg-gray-700 border-blue-500/20 text-white" placeholder="act_123456789" />
                  </div>
                  <Button onClick={handleMetaConnect} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {language === 'pt' ? 'Conectar conta' : 'Connect Account'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {metaAccounts.map((account) => (
            <div key={account.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-white">{account.name}</h3>
                  <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                    {account.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/50 hover:bg-blue-500/10 text-blue-400"
                    onClick={() => handleEditAccount(account.id, 'meta')}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                    onClick={() => handleDeleteAccount(account.id, 'meta')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">Account ID: {account.accountId}</p>
              
              {/* Sub Accounts */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">{language === 'pt' ? 'Subcontas' : 'Sub Accounts'}:</h4>
                {account.subAccounts.map((subAccount) => (
                  <div key={subAccount.id} className="flex items-center justify-between bg-gray-600/30 rounded p-2">
                    <div>
                      <span className="text-white text-sm">{subAccount.name}</span>
                      <span className="text-gray-400 text-xs ml-2">({subAccount.accountId})</span>
                    </div>
                    <Badge variant={subAccount.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {subAccount.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdsAccounts;
