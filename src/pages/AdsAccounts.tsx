import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Edit, Trash2, Loader2, CheckCircle, XCircle, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { metaAdsOAuthService } from '@/services/metaAdsOAuthService';

interface GoogleAuthResult {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
  adsAccounts: {
    resourceNames: string[];
  };
  timestamp: number;
}

interface MetaAuthResult {
  accessToken: string;
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
  adAccounts: {
    data: Array<{
      id: string;
      name: string;
      account_status: string;
      currency: string;
      business_manager?: {
        id: string;
        name: string;
        verification_status: string;
      };
    }>;
  };
  businessManagers: {
    data: Array<{
      id: string;
      name: string;
      verification_status: string;
    }>;
  };
  permissionErrors: any[];
}

const AdsAccounts = () => {
  const { language } = useLanguage();
  const [googleData, setGoogleData] = useState<GoogleAuthResult | null>(null);
  const [metaData, setMetaData] = useState<MetaAuthResult | null>(null);
  const [authErrors, setAuthErrors] = useState<string[]>([]);
  const [googleSearchTerm, setGoogleSearchTerm] = useState('');
  const [metaSearchTerm, setMetaSearchTerm] = useState('');
  const [showGoogleDialog, setShowGoogleDialog] = useState(false);
  const [showMetaDialog, setShowMetaDialog] = useState(false);
  const [isGoogleConnecting, setIsGoogleConnecting] = useState(false);
  const [isMetaConnecting, setIsMetaConnecting] = useState(false);

  // Funções para persistência de dados
  const saveToLocalStorage = (key: string, data: any) => {
    try {
      const dataWithTimestamp = {
        ...data,
        savedAt: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(dataWithTimestamp));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  };

  const loadFromLocalStorage = (key: string, maxAgeInDays: number = 30) => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      const maxAge = maxAgeInDays * 24 * 60 * 60 * 1000; // Converter dias para milissegundos
      
      if (data.savedAt && (Date.now() - data.savedAt) > maxAge) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      return null;
    }
  };

  const clearStoredData = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao limpar dados do localStorage:', error);
    }
  };

  // Funções para desconectar contas
  const disconnectGoogleAccount = () => {
    if (window.confirm(t.disconnectConfirm)) {
      setGoogleData(null);
      clearStoredData('otmizy_google_auth');
      console.log('Conta Google desconectada e dados removidos do localStorage');
    }
  };

  const disconnectMetaAccount = () => {
    if (window.confirm(t.disconnectConfirm)) {
      setMetaData(null);
      clearStoredData('otmizy_meta_auth');
      console.log('Conta Meta desconectada e dados removidos do localStorage');
    }
  };


  // useEffect para carregar dados salvos na inicialização
  useEffect(() => {
    const loadSavedData = () => {
      // Carregar dados do Google (válidos por 30 dias)
      const savedGoogleData = loadFromLocalStorage('otmizy_google_auth', 30);
      if (savedGoogleData) {
        setGoogleData(savedGoogleData);
        console.log('Dados do Google carregados do localStorage:', savedGoogleData);
      }
      
      // Carregar dados do Meta (válidos por 60 dias - tokens do Meta duram mais)
      const savedMetaData = loadFromLocalStorage('otmizy_meta_auth', 60);
      if (savedMetaData) {
        setMetaData(savedMetaData);
        console.log('Dados do Meta carregados do localStorage:', savedMetaData);
      }
    };
    
    loadSavedData();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('📨 Mensagem recebida:', {
        origin: event.origin,
        type: event.data?.type,
        data: event.data
      });
      
      // Verificar origem se necessário
      // if (event.origin !== 'https://backend.otmizy.com') return;
      
      switch (event.data.type) {
        case 'GOOGLE_AUTH_SUCCESS':
        case 'google_auth_success':
          console.log('✅ Google Auth Success:', event.data);
          const googleData = event.data.data || event.data.result;
          console.log('📊 Dados do Google processados:', googleData);
          
          setGoogleData(googleData);
          setIsGoogleConnecting(false);
          setShowGoogleDialog(false);
          
          // Salvar dados do Google no localStorage
          saveToLocalStorage('otmizy_google_auth', googleData);
          
          console.log('💾 Dados do Google salvos no localStorage');
          

          break;
          
        case 'GOOGLE_AUTH_ERROR':
        case 'google_auth_error':
          console.error('❌ Google Auth Error:', event.data);
          const errorMessage = event.data.result?.error || event.data.error || 'Erro desconhecido na autenticação';
          console.error('📋 Detalhes do erro:', errorMessage);
          setAuthErrors(prev => [...prev, `Google: ${errorMessage}`]);
          setIsGoogleConnecting(false);
          break;

        case 'META_AUTH_SUCCESS':
        case 'meta_auth_success':
          console.log('Meta Auth Success:', event.data);
          const metaData = event.data.data || event.data.result;
          
          // Transformar o resultado para o formato esperado pelo componente
          const metaAuthResult: MetaAuthResult = {
            accessToken: metaData.accessToken || '',
            userInfo: {
              id: metaData.userInfo?.id || '',
              name: metaData.userInfo?.name || '',
              email: metaData.userInfo?.email || ''
            },
            adAccounts: {
              data: metaData.adAccounts?.data || []
            },
            businessManagers: {
              data: metaData.businessManagers?.data || []
            },
            permissionErrors: metaData.permissionErrors || []
          };
          
          setMetaData(metaAuthResult);
          setIsMetaConnecting(false);
          setShowMetaDialog(false);
          
          // Salvar dados do Meta no localStorage
          saveToLocalStorage('otmizy_meta_auth', metaAuthResult);
          
          console.log('Meta data processed and saved:', metaAuthResult);
          

          break;
          
        case 'META_AUTH_ERROR':
          console.error('Meta Auth Error:', event.data.result.error);
          setAuthErrors(prev => [...prev, `Meta: ${event.data.result.error}`]);
          setIsMetaConnecting(false);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);



  const openGoogleAuth = async () => {
    setIsGoogleConnecting(true);
    try {
      console.log('🔄 Iniciando autenticação Google...');
      
      // Primeiro, vamos verificar se o endpoint está respondendo corretamente
      const response = await fetch('https://backend.otmizy.com/api/google/initiate');
      console.log('📡 Resposta do /api/google/initiate:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Erro no endpoint: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📋 Dados recebidos do backend:', data);
      
      // Verificar se temos a authUrl
      const authUrl = data.authUrl || data.url || 'https://backend.otmizy.com/api/google/initiate';
      console.log('🔗 URL de autenticação:', authUrl);
      
      // Abrir popup
      const popup = window.open(
        authUrl,
        'google_auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      if (!popup) {
        throw new Error('Popup foi bloqueado. Permita popups para este site.');
      }
      
      console.log('✅ Popup aberto com sucesso');
      
      // Verificar se o popup foi fechado pelo usuário
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          console.log('❌ Popup foi fechado pelo usuário');
          clearInterval(checkClosed);
          setIsGoogleConnecting(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('❌ Erro ao iniciar autenticação Google:', error);
      setAuthErrors(prev => [...prev, `Google: ${error.message}`]);
      setIsGoogleConnecting(false);
    }
  };

  const openMetaAuth = async () => {
    setIsMetaConnecting(true);
    try {
      // Buscar a URL de autenticação do backend
      const response = await fetch('https://backend.otmizy.com/api/meta/initiate');
      const data = await response.json();
      
      if (!data.authUrl) {
        throw new Error('URL de autenticação não encontrada');
      }
      
      // Abrir popup com a URL de autenticação
      const popup = window.open(
        data.authUrl,
        'meta_auth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );
      
      if (!popup) {
        throw new Error('Popup foi bloqueado. Permita popups para este site.');
      }
      
    } catch (error) {
      console.error('Erro ao iniciar autenticação Meta:', error);
      setAuthErrors(prev => [...prev, `Meta: ${error.message}`]);
      setIsMetaConnecting(false);
    }
  };

  // Função para filtrar contas Google
  const getFilteredGoogleAccounts = () => {
    if (!googleData?.adsAccounts?.resourceNames) return [];
    
    const accounts = googleData.adsAccounts.resourceNames.map((resourceName, index) => ({
      id: `google-${index}`,
      name: resourceName,
      resourceName
    }));
    
    if (googleSearchTerm) {
      return accounts.filter(acc => 
        acc.name.toLowerCase().includes(googleSearchTerm.toLowerCase())
      );
    }
    return accounts;
  };

  // Função para filtrar contas Meta
  const getFilteredMetaAccounts = () => {
    if (!metaData?.adAccounts?.data) return [];
    
    if (metaSearchTerm) {
      return metaData.adAccounts.data.filter(acc => 
        acc.name.toLowerCase().includes(metaSearchTerm.toLowerCase())
      );
    }
    return metaData.adAccounts.data;
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
      active: 'Ativo',
      inactive: 'Inativo',
      connecting: 'Conectando...',
      syncCampaigns: 'Sincronizar Campanhas',
      connectedAt: 'Conectado em',
      mainAccount: 'Conta Principal',
      adAccounts: 'Contas de Anúncio',
      noMainAccount: 'Nenhuma conta principal conectada.',
      noAdAccounts: 'Nenhuma conta de anúncio encontrada.',
      searchPlaceholder: 'Buscar conta...',
      noAccountsFound: 'Nenhuma conta encontrada.',
      disconnect: 'Desconectar',
      disconnectConfirm: 'Tem certeza que deseja desconectar esta conta?',

    },
    en: {
      title: 'ADS Accounts',
      addAccount: 'Add Account',
      connectAccount: 'Connect Account',
      addGoogleAccount: 'Add Google Ads Account',
      addMetaAccount: 'Add Meta Ads Account',
      accountName: 'Account Name',
      active: 'Active',
      inactive: 'Inactive',
      connecting: 'Connecting...',
      syncCampaigns: 'Sync Campaigns',
      connectedAt: 'Connected at',
      mainAccount: 'Main Account',
      adAccounts: 'Ad Accounts',
      noMainAccount: 'No main account connected.',
      noAdAccounts: 'No ad accounts found.',
      searchPlaceholder: 'Search account...',
      noAccountsFound: 'No accounts found.',
      disconnect: 'Disconnect',
      disconnectConfirm: 'Are you sure you want to disconnect this account?',

    }
  };
  const t = texts[language];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {t.title}
      </h1>

      {/* Exibir Erros */}
      {authErrors.length > 0 && (
        <Alert className="bg-red-500/10 border-red-500/20">
          <XCircle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-300">
            {authErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
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
                  <Alert className="bg-yellow-500/10 border-yellow-500/20">
                    <AlertDescription className="text-yellow-300">
                      {language === 'pt'
                        ? 'Clique em "Conectar conta" para ser redirecionado ao Google e autorizar o acesso às suas contas de anúncio.'
                        : 'Click "Connect Account" to be redirected to Google and authorize access to your ad accounts.'
                      }
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={openGoogleAuth}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900"
                    disabled={isGoogleConnecting}
                  >
                    {isGoogleConnecting ? (
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
        <CardContent className="space-y-6">
          {/* Busca de Contas Google */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="googleSearch" className="text-gray-300 text-sm">
                {t.searchPlaceholder}
              </Label>
              <Input
                id="googleSearch"
                type="text"
                placeholder={t.searchPlaceholder}
                value={googleSearchTerm}
                onChange={(e) => setGoogleSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Dados do Google */}
          {googleData && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.mainAccount}
              </h3>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {googleData.userInfo.picture && (
                      <img 
                        src={googleData.userInfo.picture} 
                        alt={googleData.userInfo.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-white">{googleData.userInfo.name}</h4>
                      <p className="text-gray-300 text-sm">{googleData.userInfo.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={disconnectGoogleAccount}
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                  >
                    {t.disconnect}
                  </Button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t.adAccounts}
              </h3>
              {getFilteredGoogleAccounts().length === 0 ? (
                <div className="text-center py-4 text-gray-400 bg-gray-700/20 rounded-lg border border-gray-600">
                  {googleSearchTerm ? t.noAccountsFound : t.noAdAccounts}
                </div>
              ) : (
                <div className="space-y-3">
                  {getFilteredGoogleAccounts().map((account) => (
                    <div key={account.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-white">{account.name}</h4>
                          <Badge variant="default">
                            {t.active}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/50 hover:bg-green-500/10 text-green-400"
                          >
                            {t.syncCampaigns}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!googleData && (
            <div className="text-center py-4 text-gray-400 bg-gray-700/20 rounded-lg border border-gray-600">
              {language === 'pt'
                ? 'Nenhuma conta Google Ads conectada. Clique em "Adicionar Conta" para começar.'
                : 'No Google Ads accounts connected. Click "Add Account" to get started.'
              }
            </div>
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
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addAccount}
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
                    onClick={openMetaAuth}
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
        <CardContent className="space-y-6">
          {/* Busca de Contas Meta */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="metaSearch" className="text-gray-300 text-sm">
                {t.searchPlaceholder}
              </Label>
              <Input
                id="metaSearch"
                type="text"
                placeholder={t.searchPlaceholder}
                value={metaSearchTerm}
                onChange={(e) => setMetaSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Dados da Meta */}
          {metaData && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.mainAccount}
              </h3>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-semibold text-white">{metaData.userInfo.name}</h4>
                      <p className="text-gray-300 text-sm">{metaData.userInfo.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={disconnectMetaAccount}
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                  >
                    {t.disconnect}
                  </Button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t.adAccounts}
              </h3>
              {getFilteredMetaAccounts().length === 0 ? (
                <div className="text-center py-4 text-gray-400 bg-gray-700/20 rounded-lg border border-gray-600">
                  {metaSearchTerm ? t.noAccountsFound : t.noAdAccounts}
                </div>
              ) : (
                <div className="space-y-3">
                  {getFilteredMetaAccounts().map((account) => (
                    <div key={account.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-white">{account.name}</h4>
                          <Badge variant={account.account_status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {account.account_status === 'ACTIVE' ? t.active : t.inactive}
                          </Badge>
                          {account.business_manager && (
                            <Badge variant="outline" className="text-xs">
                              BM: {account.business_manager.name}
                            </Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/50 hover:bg-green-500/10 text-green-400"
                          >
                            {t.syncCampaigns}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">Account ID: {account.id}</p>
                      <p className="text-gray-300 text-sm mb-3">Currency: {account.currency}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!metaData && (
            <div className="text-center py-4 text-gray-400 bg-gray-700/20 rounded-lg border border-gray-600">
              {language === 'pt'
                ? 'Nenhuma conta Meta Ads conectada. Clique em "Adicionar Conta" para começar.'
                : 'No Meta Ads accounts connected. Click "Add Account" to get started.'
              }
            </div>
          )}
        </CardContent>
      </Card>



    </div>
  );
};

export default AdsAccounts;
