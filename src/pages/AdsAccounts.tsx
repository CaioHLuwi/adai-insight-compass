import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Edit, Trash2, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMetaAdsOAuth, MetaAdsAccountInfo } from '../services/metaAdsOAuthService';
import { useMetaAdsCampaigns } from '../hooks/useMetaAdsCampaigns';
import { useGoogleAdsOAuth } from '../services/googleAdsOAuthService';
import { useGoogleAds } from '../services/googleAdsService';

interface GoogleAdsSubAccount {
  id: string;
  name: string;
  customerId: string;
  status: 'active' | 'inactive';
}

interface GoogleAdsAccount {
  id: string;
  name: string;
  customerId: string;
  status: 'active' | 'inactive';
  type: 'google';
  accessToken?: string;
  subAccounts: GoogleAdsSubAccount[];
  connectedAt?: string;
}

interface MetaAdsAccount {
  id: string;
  name: string;
  accountId: string;
  status: 'active' | 'inactive';
  type: 'meta';
  accessToken?: string;
  subAccounts: MetaAdsSubAccount[];
  connectedAt?: string;
}

interface MetaAdsSubAccount {
  id: string;
  name: string;
  accountId: string;
  status: 'active' | 'inactive';
}

const AdsAccountsUpdated = () => {
  const { language } = useLanguage();
  
  // diálogo Google
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);
  const [isGoogleConnecting, setIsGoogleConnecting] = useState(false);
  const [googleConnectionError, setGoogleConnectionError] = useState<string | null>(null);
  const [googleConnectionSuccess, setGoogleConnectionSuccess] = useState<string | null>(null);

  // diálogo Meta
  const [showMetaDialog, setShowMetaDialog] = useState(false);
  const [isMetaConnecting, setIsMetaConnecting] = useState(false);
  const [metaConnectionError, setMetaConnectionError] = useState<string | null>(null);
  const [metaConnectionSuccess, setMetaConnectionSuccess] = useState<string | null>(null);

  const [editingAccount, setEditingAccount] = useState<string | null>(null);

  // serviços OAuth
  const googleOAuthService = useGoogleAdsOAuth();
  const googleAdsService = useGoogleAds();
  const metaOAuthService = useMetaAdsOAuth();

  // hook de campanhas
  const { setAccessToken, fetchCampaigns } = useMetaAdsCampaigns();

  const [googleAccounts, setGoogleAccounts] = useState<GoogleAdsAccount[]>([]);
  const [metaAccounts, setMetaAccounts] = useState<MetaAdsAccount[]>([]);

  // Carregar contas do localStorage na inicialização
  useEffect(() => {
    // Carregar contas Google
    const savedGoogleAccounts = localStorage.getItem('googleAdsAccounts');
    if (savedGoogleAccounts) {
      try {
        const accounts = JSON.parse(savedGoogleAccounts);
        setGoogleAccounts(accounts);
      } catch (error) {
        console.error('Erro ao carregar contas Google salvas:', error);
      }
    }

    // Carregar contas Meta
    const savedMetaAccounts = localStorage.getItem('metaAdsAccounts');
    if (savedMetaAccounts) {
      try {
        const accounts = JSON.parse(savedMetaAccounts);
        setMetaAccounts(accounts);
      } catch (error) {
        console.error('Erro ao carregar contas Meta salvas:', error);
      }
    }
  }, []);

  // Salvar contas no localStorage sempre que mudarem
  useEffect(() => {
    if (googleAccounts.length > 0) {
      localStorage.setItem('googleAdsAccounts', JSON.stringify(googleAccounts));
    }
  }, [googleAccounts]);

  useEffect(() => {
    localStorage.setItem('metaAdsAccounts', JSON.stringify(metaAccounts));
  }, [metaAccounts]);

  const handleGoogleConnect = async () => {
    setIsGoogleConnecting(true);
    setGoogleConnectionError(null);
    setGoogleConnectionSuccess(null);

    try {
      const { accessToken, accounts } = await googleOAuthService.completeOAuthFlow();
      const newGoogleAccounts: GoogleAdsAccount[] = accounts.map((acc: any, idx: number) => ({
        id: `google-${Date.now()}-${idx}`,
        name: acc.name,
        customerId: acc.customerId,
        status: acc.status === 'ENABLED' ? 'active' : 'inactive',
        type: 'google',
        accessToken,
        subAccounts: [],
        connectedAt: new Date().toISOString()
      }));
      setGoogleAccounts(prev => [...prev, ...newGoogleAccounts]);
      
      setGoogleConnectionSuccess(
        language === 'pt'
          ? `${newGoogleAccounts.length} conta(s) Google Ads conectada(s) com sucesso!`
          : `${newGoogleAccounts.length} Google Ads account(s) connected!`
      );
      setShowGoogleDialog(false);
    } catch (err: any) {
      setGoogleConnectionError(err.message || 'Erro ao conectar com Google Ads');
    } finally {
      setIsGoogleConnecting(false);
    }
  };

  const handleMetaConnect = async () => {
    setIsMetaConnecting(true);
    setMetaConnectionError(null);
    setMetaConnectionSuccess(null);

    try {
      const { accessToken, accounts } = await metaOAuthService.completeOAuthFlow();
      const newMeta: MetaAdsAccount[] = accounts.map((acc: MetaAdsAccountInfo, idx: number) => ({
        id: `meta-${Date.now()}-${idx}`,
        name: acc.name,
        accountId: acc.id,
        status: acc.account_status === 'ACTIVE' ? 'active' : 'inactive',
        type: 'meta',
        accessToken,
        subAccounts: [],
        connectedAt: new Date().toISOString()
      }));
      setMetaAccounts(prev => [...prev, ...newMeta]);
      if (newMeta.length) setAccessToken(accessToken);

      setMetaConnectionSuccess(
        language === 'pt'
          ? `${newMeta.length} conta(s) Meta Ads conectada(s) com sucesso!`
          : `${newMeta.length} account(s) connected!`
      );
      setShowMetaDialog(false);
    } catch (err: any) {
      setMetaConnectionError(err.message || 'Erro ao conectar com Meta Ads');
    } finally {
      setIsMetaConnecting(false);
    }
  };

  // sincroniza campanhas Meta
  const handleSyncCampaigns = async (account: MetaAdsAccount) => {
    if (!account.accessToken) {
      setMetaConnectionError('Token de acesso não encontrado');
      return;
    }
    try {
      setAccessToken(account.accessToken);
      await fetchCampaigns(account.accountId);
      setMetaConnectionSuccess(
        language === 'pt'
          ? 'Campanhas sincronizadas com sucesso!'
          : 'Campaigns synced!'
      );
    } catch (err: any) {
      setMetaConnectionError(err.message || 'Erro ao sincronizar campanhas');
    }
  };

  const handleSyncGoogleCampaigns = async (account: GoogleAdsAccount) => {
    if (!account.accessToken) {
      setGoogleConnectionError(
        language === 'pt'
          ? 'Token de acesso não encontrado para esta conta'
          : 'Access token not found for this account'
      );
      return;
    }

    try {
      // Configurar token no serviço do Google Ads
      googleAdsService.setAccessToken(account.accessToken);
      
      // Sincronizar campanhas
      await googleAdsService.syncCampaigns(account.customerId);
      
      setGoogleConnectionSuccess(
        language === 'pt'
          ? 'Campanhas Google sincronizadas com sucesso!'
          : 'Google campaigns synced successfully!'
      );
    } catch (error: any) {
      setGoogleConnectionError(error.message || 'Erro ao sincronizar campanhas Google');
    }
  };

  const handleEditAccount = (accountId: string, type: 'google' | 'meta') => {
    setEditingAccount(accountId);
    // Implementar lógica de edição
  };

  const handleDeleteAccount = (accountId: string, type: 'google' | 'meta') => {
    if (type === 'google') {
      setGoogleAccounts(prev => prev.filter(acc => acc.id !== accountId));
    } else {
      setMetaAccounts(prev => prev.filter(acc => acc.id !== accountId));
    }
  };

  // textos internacionalizados
  const texts = {
    pt: {
      title: 'Contas de ADS',
      addAccount: 'Adicionar Conta',
      connectAccount: 'Conectar conta',
      addGoogleAccount: 'Adicionar Conta Google Ads',
      addMetaAccount: 'Adicionar Conta Meta Ads',
      accountName: 'Nome da Conta',
      subAccounts: 'Subcontas',
      active: 'Ativo',
      inactive: 'Inativo',
      connecting: 'Conectando...',
      syncCampaigns: 'Sincronizar Campanhas',
      connectedAt: 'Conectado em'
    },
    en: {
      title: 'ADS Accounts',
      addAccount: 'Add Account',
      connectAccount: 'Connect Account',
      addGoogleAccount: 'Add Google Ads Account',
      addMetaAccount: 'Add Meta Ads Account',
      accountName: 'Account Name',
      subAccounts: 'Sub Accounts',
      active: 'Active',
      inactive: 'Inactive',
      connecting: 'Connecting...',
      syncCampaigns: 'Sync Campaigns',
      connectedAt: 'Connected at'
    }
  };
  const t = texts[language];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {t.title}
      </h1>

      {/* Google – alertas */}
      {googleConnectionSuccess && (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <AlertDescription className="text-green-300">
            {googleConnectionSuccess}
          </AlertDescription>
        </Alert>
      )}
      {googleConnectionError && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <XCircle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {googleConnectionError}
          </AlertDescription>
        </Alert>
      )}

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
                  {t.addAccount}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-yellow-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {t.addGoogleAccount}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">{t.accountName}</Label>
                    <Input className="bg-gray-700 border-yellow-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Customer ID</Label>
                    <Input className="bg-gray-700 border-yellow-500/20 text-white" placeholder="123-456-7890" />
                  </div>
                  <Button onClick={handleGoogleConnect} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                    {t.connectAccount}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {googleAccounts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === 'pt'
                ? 'Nenhuma conta Google Ads conectada. Clique em "Adicionar Conta" para começar.'
                : 'No Google Ads accounts connected. Click "Add Account" to get started.'
              }
            </div>
          ) : (
            googleAccounts.map((account) => (
              <div key={account.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-white">{account.name}</h3>
                    <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                      {account.status === 'active' ? t.active : t.inactive}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 hover:bg-green-500/10 text-green-400"
                      onClick={() => handleSyncGoogleCampaigns(account)}
                    >
                      {t.syncCampaigns}
                    </Button>
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
                {account.connectedAt && (
                  <p className="text-gray-400 text-xs mb-3">
                    {t.connectedAt}: {new Date(account.connectedAt).toLocaleString()}
                  </p>
                )}
                
                {/* Sub Accounts */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">{t.subAccounts}:</h4>
                  {account.subAccounts.map((subAccount) => (
                    <div key={subAccount.id} className="flex items-center justify-between bg-gray-600/30 rounded p-2">
                      <div>
                        <span className="text-white text-sm">{subAccount.name}</span>
                        <span className="text-gray-400 text-xs ml-2">({subAccount.customerId})</span>
                      </div>
                      <Badge variant={subAccount.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {subAccount.status === 'active' ? t.active : t.inactive}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
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
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  disabled={isMetaConnecting}
                >
                  {isMetaConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t.connecting}
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      {t.addAccount}
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-blue-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {t.addMetaAccount}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert className="bg-blue-500/10 border-blue-500/20">
                    <AlertDescription className="text-blue-300">
                      {language === 'pt'
                        ? 'Clique em "Conectar conta" para ser redirecionado ao Google e autorizar o acesso às suas contas de anúncio.'
                        : 'Click "Connect Account" to be redirected to Google and authorize access to your ad accounts.'
                      }
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleMetaConnect}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    disabled={isMetaConnecting}
                  >
                    {isMetaConnecting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.connecting}
                      </>
                    ) : (
                      t.connectAccount
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {metaAccounts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === 'pt'
                ? 'Nenhuma conta Meta Ads conectada. Clique em "Adicionar Conta" para começar.'
                : 'No Meta Ads accounts connected. Click "Add Account" to get started.'
              }
            </div>
          ) : (
            metaAccounts.map(acc => (
              <div key={acc.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-white">{acc.name}</h3>
                    <Badge variant={acc.status === 'active' ? 'default' : 'secondary'}>
                      {acc.status === 'active' ? t.active : t.inactive}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 hover:bg-green-500/10 text-green-400"
                      onClick={() => handleSyncCampaigns(acc)}
                    >
                      {t.syncCampaigns}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                      onClick={() => handleEditAccount(acc.id, 'meta')}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                      onClick={() => handleDeleteAccount(acc.id, 'meta')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">Account ID: {acc.accountId}</p>
                {acc.connectedAt && (
                  <p className="text-gray-400 text-xs">
                    {t.connectedAt}: {new Date(acc.connectedAt).toLocaleString()}
                  </p>
                )}

                {/* sub‑contas */}
                {acc.subAccounts.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">{t.subAccounts}:</h4>
                    {acc.subAccounts.map(sa => (
                      <div key={sa.id} className="flex items-center justify-between bg-gray-600/30 rounded p-2">
                        <div>
                          <span className="text-white text-sm">{sa.name}</span>
                          <span className="text-gray-400 text-xs ml-2">({sa.accountId})</span>
                        </div>
                        <Badge variant={sa.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {sa.status === 'active' ? t.active : t.inactive}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Meta – alertas */}
      {metaConnectionSuccess && (
        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <AlertDescription className="text-green-300">
            {metaConnectionSuccess}
          </AlertDescription>
        </Alert>
      )}
      {metaConnectionError && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <XCircle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {metaConnectionError}
          </AlertDescription>
        </Alert>
      )}

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
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  disabled={isMetaConnecting}
                >
                  {isMetaConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t.connecting}
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      {t.addAccount}
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-blue-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {t.addMetaAccount}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Alert className="bg-blue-500/10 border-blue-500/20">
                    <AlertDescription className="text-blue-300">
                      {language === 'pt'
                        ? 'Clique em "Conectar conta" para ser redirecionado ao Meta e autorizar o acesso às suas contas de anúncio.'
                        : 'Click "Connect Account" to be redirected to Meta and authorize access to your ad accounts.'
                      }
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleMetaConnect}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    disabled={isMetaConnecting}
                  >
                    {isMetaConnecting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.connecting}
                      </>
                    ) : (
                      t.connectAccount
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {metaAccounts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === 'pt'
                ? 'Nenhuma conta Meta Ads conectada. Clique em "Adicionar Conta" para começar.'
                : 'No Meta Ads accounts connected. Click "Add Account" to get started.'
              }
            </div>
          ) : (
            metaAccounts.map(acc => (
              <div key={acc.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-white">{acc.name}</h3>
                    <Badge variant={acc.status === 'active' ? 'default' : 'secondary'}>
                      {acc.status === 'active' ? t.active : t.inactive}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/50 hover:bg-green-500/10 text-green-400"
                      onClick={() => handleSyncCampaigns(acc)}
                    >
                      {t.syncCampaigns}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                      onClick={() => handleEditAccount(acc.id, 'meta')}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                      onClick={() => handleDeleteAccount(acc.id, 'meta')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">Account ID: {acc.accountId}</p>
                {acc.connectedAt && (
                  <p className="text-gray-400 text-xs">
                    {t.connectedAt}: {new Date(acc.connectedAt).toLocaleString()}
                  </p>
                )}

                {/* sub‑contas */}
                {acc.subAccounts.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">{t.subAccounts}:</h4>
                    {acc.subAccounts.map(sa => (
                      <div key={sa.id} className="flex items-center justify-between bg-gray-600/30 rounded p-2">
                        <div>
                          <span className="text-white text-sm">{sa.name}</span>
                          <span className="text-gray-400 text-xs ml-2">({sa.accountId})</span>
                        </div>
                        <Badge variant={sa.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                          {sa.status === 'active' ? t.active : t.inactive}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default AdsAccountsUpdated;
