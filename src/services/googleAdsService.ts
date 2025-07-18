import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend.otmizy.com' // Em produção, usar URL da Vercel
  : ''; // Em desenvolvimento, usar proxy do Vite

// Tipos TypeScript para as respostas da API
export interface GoogleAdsAccount {
  id: string;
  name: string;
  descriptiveName: string;
  currencyCode: string;
  timeZone: string;
  customerId: string;
}

export interface GoogleAdsCampaign {
  id: string;
  name: string;
  status: string;
  advertisingChannelType: string;
  biddingStrategyType: string;
  budget: {
    id: string;
    name: string;
    amountMicros: string;
    deliveryMethod: string;
  };
  startDate: string;
  endDate?: string;
  metrics?: {
    impressions: string;
    clicks: string;
    cost: string;
    ctr: number;
    averageCpc: string;
    conversions: string;
    conversionRate: number;
    costPerConversion: string;
  };
}

export interface GoogleAdsUser {
  id: string;
  email: string;
  name: string;
}

// Classe para gerenciar interações com a API do Google Ads
export class GoogleAdsService {
  private accessToken: string | null = null;

  /**
   * Define o access token para autenticação
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Remove o access token
   */
  clearAccessToken(): void {
    this.accessToken = null;
  }

  /**
   * Retorna os headers de autenticação
   */
  private getAuthHeaders() {
    if (!this.accessToken) {
      throw new Error('Access token não definido');
    }
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Testa se o token atual é válido
   */
  async testToken(): Promise<{ valid: boolean; user?: GoogleAdsUser; error?: string }> {
    try {
      const response = await axios.get<{ valid: boolean; user?: GoogleAdsUser; error?: string }>(`${API_BASE_URL}/api/google/test-token`, {
        headers: this.getAuthHeaders()
      });
      
      return {
        valid: response.data.valid || false,
        user: response.data.user,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Erro ao testar token:', error);
      return {
        valid: false,
        error: error.response?.data?.error || error.message
      };
    }
  }

  /**
   * Busca todas as contas de anúncio do Google Ads
   */
  async getAdAccounts(): Promise<GoogleAdsAccount[]> {
    try {
      const response = await axios.get<{ accounts: GoogleAdsAccount[] }>(`${API_BASE_URL}/api/google/accounts`, {
        headers: this.getAuthHeaders()
      });
      
      return response.data.accounts || [];
    } catch (error: any) {
      console.error('Erro ao buscar contas de anúncio:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar contas de anúncio');
    }
  }

  /**
   * Busca campanhas de uma conta específica
   */
  async getCampaigns(customerId: string): Promise<GoogleAdsCampaign[]> {
    try {
      const response = await axios.get<{ campaigns: GoogleAdsCampaign[] }>(`${API_BASE_URL}/api/google/campaigns`, {
        headers: this.getAuthHeaders(),
        params: { customer_id: customerId }
      });
      
      return response.data.campaigns || [];
    } catch (error: any) {
      console.error('Erro ao buscar campanhas:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar campanhas');
    }
  }

  /**
   * Busca insights/métricas de campanhas
   */
  async getCampaignInsights(
    customerId: string,
    campaignIds?: string[],
    dateRange?: {
      startDate: string;
      endDate: string;
    }
  ): Promise<any[]> {
    try {
      const params: any = {
        customer_id: customerId
      };
      
      if (campaignIds && campaignIds.length > 0) {
        params.campaign_ids = campaignIds.join(',');
      }
      
      if (dateRange) {
        params.start_date = dateRange.startDate;
        params.end_date = dateRange.endDate;
      }
      
      const response = await axios.get<{ insights: any[] }>(`${API_BASE_URL}/api/google/campaigns/insights`, {
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
   * Busca campanhas com métricas combinadas
   */
  async getCampaignsWithMetrics(
    customerId: string,
    datePreset: string = 'last_30_days'
  ): Promise<GoogleAdsCampaign[]> {
    try {
      const response = await axios.get<{ campaigns: GoogleAdsCampaign[] }>(`${API_BASE_URL}/api/google/campaigns/combined`, {
        headers: this.getAuthHeaders(),
        params: {
          customer_id: customerId,
          date_preset: datePreset
        }
      });
      
      return response.data.campaigns || [];
    } catch (error: any) {
      console.error('Erro ao buscar campanhas com métricas:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar campanhas com métricas');
    }
  }

  /**
   * Sincroniza campanhas (busca e atualiza dados)
   */
  async syncCampaigns(customerId: string): Promise<{ success: boolean; message: string; campaigns?: GoogleAdsCampaign[] }> {
    try {
      const response = await axios.post<{ success: boolean; message: string; campaigns?: GoogleAdsCampaign[] }>(
        `${API_BASE_URL}/api/google/campaigns/sync`,
        { customer_id: customerId },
        { headers: this.getAuthHeaders() }
      );
      
      return response.data;
    } catch (error: any) {
      console.error('Erro ao sincronizar campanhas:', error);
      throw new Error(error.response?.data?.error || 'Erro ao sincronizar campanhas');
    }
  }
}

// Instância singleton do serviço
export const googleAdsService = new GoogleAdsService();

// Hook personalizado para usar o serviço no React
export const useGoogleAds = () => {
  return googleAdsService;
};