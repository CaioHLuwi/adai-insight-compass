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
    setCurrentAccessToken(token);
    metaAdsService.setAccessToken(token);
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
    if (!currentAccessToken) {
      setError('Access token não configurado');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const accounts = await metaAdsService.getAdAccounts();
      setAdAccounts(accounts);
      
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar contas de anúncio');
      setAdAccounts([]);
    } finally {
      setLoading(false);
    }
  }, [currentAccessToken]);

  /**
   * Busca campanhas de uma conta específica
   */
  const fetchCampaigns = useCallback(async (accountId?: string): Promise<void> => {
    const targetAccountId = accountId || currentAdAccountId;
    
    if (!currentAccessToken) {
      setError('Access token não configurado');
      return;
    }
    
    if (!targetAccountId) {
      setError('ID da conta de anúncio não configurado');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Usar o endpoint combinado para obter campanhas com insights
      const campaignsData = await metaAdsService.getCampaignsWithInsights(
        targetAccountId,
        currentDatePreset
      );
      
      setCampaigns(campaignsData);
      
    } catch (err: any) {
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

