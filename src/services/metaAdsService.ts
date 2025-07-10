import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://otmizy-meta-ads.vercel.app' // Em produção, usar URL relativa
  : 'localhost:8080/oauth_meta'; // Em desenvolvimento, usar URL completa

// Tipos TypeScript para as respostas da API
export interface MetaAdsCampaign {
  id: string;
  name: string;
  status: string;
  objective?: string;
  dailyBudget?: number;
  lifetimeBudget?: number;
  spend: number;
  impressions: number;
  clicks: number;
  cpc: number;
  cpm: number;
  ctr: number;
  reach: number;
  conversions: number;
  conversionValue: number;
  cpa: number;
  roas: number;
  rawActions?: any[];
  rawActionValues?: any[];
}

export interface MetaAdsAccount {
  id: string;
  name: string;
  account_status: string;
  currency: string;
  timezone_name: string;
  business_name?: string;
}

export interface MetaAdsUser {
  id: string;
  name: string;
}

export interface ApiResponse<T> {
  campaigns?: T[];
  ad_accounts?: T[];
  insights?: T[];
  total: number;
  user?: MetaAdsUser;
  valid?: boolean;
  error?: string;
  details?: any;
}

// Classe para gerenciar as chamadas à API do Meta Ads
export class MetaAdsService {
  private accessToken: string | null = null;

  constructor(accessToken?: string) {
    if (accessToken) {
      this.setAccessToken(accessToken);
    }
  }

  /**
   * Define o access token para autenticação
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Obtém os headers de autenticação
   */
  private getAuthHeaders() {
    if (!this.accessToken) {
      throw new Error('Access token não configurado');
    }
    
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Testa se o access token é válido
   */
  async testToken(): Promise<{ valid: boolean; user?: MetaAdsUser; error?: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/test-token`, {
        headers: this.getAuthHeaders()
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao testar token:', error);
      return {
        valid: false,
        error: error.response?.data?.error || error.message
      };
    }
  }

  /**
   * Busca todas as contas de anúncio do usuário
   */
  async getAdAccounts(): Promise<MetaAdsAccount[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/ad-accounts`, {
        headers: this.getAuthHeaders()
      });
      
      return response.data.ad_accounts || [];
    } catch (error: any) {
      console.error('Erro ao buscar contas de anúncio:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar contas de anúncio');
    }
  }

  /**
   * Busca campanhas de uma conta específica
   */
  async getCampaigns(adAccountId: string): Promise<MetaAdsCampaign[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/campaigns`, {
        headers: this.getAuthHeaders(),
        params: { ad_account_id: adAccountId }
      });
      
      return response.data.campaigns || [];
    } catch (error: any) {
      console.error('Erro ao buscar campanhas:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar campanhas');
    }
  }

  /**
   * Busca insights de campanhas
   */
  async getCampaignInsights(
    adAccountId: string, 
    campaignIds?: string[], 
    datePreset: string = 'last_30_days'
  ): Promise<any[]> {
    try {
      const params: any = {
        ad_account_id: adAccountId,
        date_preset: datePreset
      };
      
      if (campaignIds && campaignIds.length > 0) {
        params.campaign_ids = campaignIds.join(',');
      }
      
      const response = await axios.get(`${API_BASE_URL}/campaigns/insights`, {
        headers: this.getAuthHeaders(),
        params
      });
      
      return response.data.insights || [];
    } catch (error: any) {
      console.error('Erro ao buscar insights:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar insights');
    }
  }

  /**
   * Busca campanhas com insights combinados (mais eficiente)
   */
  async getCampaignsWithInsights(
    adAccountId: string, 
    datePreset: string = 'last_30_days'
  ): Promise<MetaAdsCampaign[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/campaigns/combined`, {
        headers: this.getAuthHeaders(),
        params: {
          ad_account_id: adAccountId,
          date_preset: datePreset
        }
      });
      
      return response.data.campaigns || [];
    } catch (error: any) {
      console.error('Erro ao buscar campanhas com insights:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar campanhas com insights');
    }
  }
}

// Instância singleton do serviço
export const metaAdsService = new MetaAdsService();

// Hook personalizado para usar o serviço no React
export const useMetaAdsService = (accessToken?: string) => {
  if (accessToken) {
    metaAdsService.setAccessToken(accessToken);
  }
  
  return metaAdsService;
};

