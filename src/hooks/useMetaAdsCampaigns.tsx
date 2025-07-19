import { useState, useEffect, useCallback } from 'react';
import { MetaAdsCampaign, MetaAdsAccount, metaAdsService } from '../services/metaAdsService';

interface UseMetaAdsCampaignsProps {
  accessToken?: string;
  adAccountId?: string;
  datePreset?: string;
  autoFetch?: boolean;
}

interface UseMetaAdsCampaignsReturn {
  // Estados
  campaigns: MetaAdsCampaign[];
  adAccounts: MetaAdsAccount[];
  loading: boolean;
  error: string | null;
  
  // Funções
  fetchCampaigns: (accountId?: string) => Promise<void>;
  fetchAdAccounts: () => Promise<void>;
  testToken: () => Promise<boolean>;
  refreshData: () => Promise<void>;
  
  // Configurações
  setAccessToken: (token: string) => void;
  setAdAccountId: (accountId: string) => void;
  setDatePreset: (preset: string) => void;
}

export const useMetaAdsCampaigns = ({
  accessToken,
  adAccountId,
  datePreset = 'last_30_days',
  autoFetch = false
}: UseMetaAdsCampaignsProps = {}): UseMetaAdsCampaignsReturn => {
  
  // Estados
  const [campaigns, setCampaigns] = useState<MetaAdsCampaign[]>([]);
  const [adAccounts, setAdAccounts] = useState<MetaAdsAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados internos para configuração
  const [currentAccessToken, setCurrentAccessToken] = useState(accessToken || '');
  const [currentAdAccountId, setCurrentAdAccountId] = useState(adAccountId || '');
  const [currentDatePreset, setCurrentDatePreset] = useState(datePreset);

  /**
   * Configura o access token
   */
  const setAccessToken = useCallback((token: string) => {
    console.log('🔑 === CONFIGURANDO ACCESS TOKEN ===');
    console.log('📥 Token recebido:', token ? token.substring(0, 20) + '...' : 'VAZIO');
    console.log('📏 Tamanho do token:', token?.length || 0);
    
    setCurrentAccessToken(token);
    metaAdsService.setAccessToken(token);
    
    console.log('✅ Token configurado no hook e no serviço');
  }, []);

  /**
   * Configura o ID da conta de anúncio
   */
  const setAdAccountId = useCallback((accountId: string) => {
    setCurrentAdAccountId(accountId);
  }, []);

  /**
   * Configura o preset de data
   */
  const setDatePreset = useCallback((preset: string) => {
    setCurrentDatePreset(preset);
  }, []);

  /**
   * Testa se o access token é válido
   */
  const testToken = useCallback(async (): Promise<boolean> => {
    if (!currentAccessToken) {
      setError('Access token não configurado');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await metaAdsService.testToken();
      
      if (!result.valid) {
        setError(result.error || 'Token inválido');
        return false;
      }
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Erro ao testar token');
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentAccessToken]);

  /**
   * Busca todas as contas de anúncio do usuário
   */
  const fetchAdAccounts = useCallback(async (): Promise<void> => {
    console.log('🔍 fetchAdAccounts chamado - Estado atual:', {
      currentAccessToken: currentAccessToken ? 'PRESENTE' : 'AUSENTE',
      tokenLength: currentAccessToken?.length || 0
    });
    
    if (!currentAccessToken) {
      console.warn('⚠️ Access token não configurado para buscar contas');
      setError('Access token não configurado');
      return;
    }

    try {
      console.log('🔄 Iniciando busca de contas de anúncio...');
      console.log('🔑 Token sendo usado:', currentAccessToken.substring(0, 20) + '...');
      setLoading(true);
      setError(null);
      
      // Configurar o token no serviço antes de fazer a requisição
      metaAdsService.setAccessToken(currentAccessToken);
      
      const accounts = await metaAdsService.getAdAccounts();
      console.log('✅ Contas de anúncio encontradas:', accounts);
      console.log('📊 Número de contas:', accounts.length);
      setAdAccounts(accounts);
      
    } catch (err: any) {
      console.error('❌ Erro ao buscar contas de anúncio:', err);
      console.error('📄 Detalhes completos do erro:', err.response?.data);
      setError(err.message || 'Erro ao buscar contas de anúncio');
      setAdAccounts([]);
    } finally {
      setLoading(false);
    }
  }, [currentAccessToken]);

  /**
   * Busca campanhas de uma ou múltiplas contas específicas
   */
  const fetchCampaigns = useCallback(async (accountIds?: string | string[]): Promise<void> => {
    console.log('🔍 === FETCHCAMPAIGNS CHAMADO ===');
    console.log('📥 Parâmetros recebidos:', accountIds);
    console.log('🔑 Token atual:', currentAccessToken ? 'PRESENTE' : 'AUSENTE');
    console.log('📋 currentAdAccountId:', currentAdAccountId);
    
    let targetAccountIds: string[];
    
    if (Array.isArray(accountIds)) {
      targetAccountIds = accountIds;
      console.log('📊 Usando array de contas fornecido:', targetAccountIds);
    } else if (accountIds) {
      targetAccountIds = [accountIds];
      console.log('📊 Convertendo conta única para array:', targetAccountIds);
    } else if (currentAdAccountId) {
      targetAccountIds = [currentAdAccountId];
      console.log('📊 Usando currentAdAccountId:', targetAccountIds);
    } else {
      targetAccountIds = [];
      console.log('📊 Nenhuma conta definida');
    }
    
    console.log('🎯 Contas finais para busca:', targetAccountIds);
    
    if (!currentAccessToken) {
      console.warn('⚠️ Access token não configurado para buscar campanhas');
      setError('Access token não configurado');
      return;
    }
    
    if (targetAccountIds.length === 0) {
      console.warn('⚠️ Nenhuma conta de anúncio configurada');
      setError('Nenhuma conta de anúncio configurada');
      return;
    }

    try {
      console.log('🔄 Buscando campanhas para múltiplas contas...');
      setLoading(true);
      setError(null);
      
      let allCampaigns: MetaAdsCampaign[] = [];
      
      // Buscar campanhas para cada conta selecionada
      for (const accountId of targetAccountIds) {
        try {
          console.log(`📋 Buscando campanhas para conta: ${accountId}`);
          const campaignsData = await metaAdsService.getCampaigns(accountId);
          console.log(`✅ Campanhas encontradas para ${accountId}:`, campaignsData);
          
          if (campaignsData && campaignsData.length > 0) {
            // Adicionar ID da conta a cada campanha para identificação
            const campaignsWithAccount = campaignsData.map(campaign => ({
              ...campaign,
              account_id: accountId
            }));
            
            console.log('📊 Buscando insights para as campanhas...');
            const campaignIds = campaignsData.map(campaign => campaign.id);
            const insightsData = await metaAdsService.getCampaignInsights(
              accountId,
              campaignIds,
              currentDatePreset
            );
            console.log(`✅ Insights encontrados para ${accountId}:`, insightsData);
            
            // Combinar campanhas com insights
            const campaignsWithInsights = campaignsWithAccount.map(campaign => {
              const insight = insightsData.find(insight => insight.campaign_id === campaign.id);
              return {
                ...campaign,
                insights: insight || {}
              };
            });
            
            allCampaigns.push(...campaignsWithInsights);
          }
        } catch (accountError: any) {
          console.error(`❌ Erro ao buscar campanhas da conta ${accountId}:`, accountError);
          // Continue com as outras contas mesmo se uma falhar
        }
      }
      
      console.log('📊 Total de campanhas encontradas:', allCampaigns.length);
      setCampaigns(allCampaigns);
      
    } catch (err: any) {
      console.error('❌ Erro geral ao buscar campanhas:', err);
      setError(err.message || 'Erro ao buscar campanhas');
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, [currentAccessToken, currentAdAccountId, currentDatePreset]);

  /**
   * Atualiza todos os dados
   */
  const refreshData = useCallback(async (): Promise<void> => {
    if (currentAdAccountId) {
      await fetchCampaigns();
    }
    await fetchAdAccounts();
  }, [fetchCampaigns, fetchAdAccounts, currentAdAccountId]);

  // Efeito para configurar o access token inicial
  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken, setAccessToken]);

  // Efeito para buscar dados automaticamente
  useEffect(() => {
    if (autoFetch && currentAccessToken) {
      if (currentAdAccountId) {
        fetchCampaigns();
      } else {
        fetchAdAccounts();
      }
    }
  }, [autoFetch, currentAccessToken, currentAdAccountId, fetchCampaigns, fetchAdAccounts]);

  return {
    // Estados
    campaigns,
    adAccounts,
    loading,
    error,
    
    // Funções
    fetchCampaigns,
    fetchAdAccounts,
    testToken,
    refreshData,
    
    // Configurações
    setAccessToken,
    setAdAccountId,
    setDatePreset
  };
};

