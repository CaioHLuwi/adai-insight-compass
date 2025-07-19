import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend.otmizy.com' // Em produção, usar URL direta
  : ''; // Em desenvolvimento, usar proxy do Vite (requisições relativas)

console.log('🔧 Configuração da API:', { NODE_ENV: process.env.NODE_ENV, API_BASE_URL });

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
      const url = `${API_BASE_URL}/api/meta/test-token`;
      console.log('🔍 Testando token na URL:', url);
      console.log('🔑 Headers enviados:', this.getAuthHeaders());
      
      const response = await axios.get<{ valid: boolean; user?: MetaAdsUser; error?: string }>(url, {
        headers: this.getAuthHeaders()
      });
      
      console.log('📡 Resposta completa do test-token:', response.data);
      console.log('📊 Status da resposta:', response.status);
      
      return {
        valid: response.data.valid || false,
        user: response.data.user,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('❌ Erro ao testar token:', error);
      console.error('📄 Detalhes do erro:', error.response?.data);
      console.error('🔍 Status do erro:', error.response?.status);
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
      const url = `${API_BASE_URL}/api/meta/ad-accounts`;
      console.log('🌐 Fazendo requisição para:', url);
      console.log('🔑 Headers:', this.getAuthHeaders());
      
      const response = await axios.get<{ ad_accounts: MetaAdsAccount[]; success?: boolean; data?: any }>(url, {
        headers: this.getAuthHeaders()
      });
      
      console.log('📡 Resposta completa da API (ad-accounts):', response.data);
      console.log('📊 Status da resposta:', response.status);
      console.log('🔍 Estrutura da resposta:', {
        hasSuccess: 'success' in response.data,
        hasData: 'data' in response.data,
        hasAdAccounts: 'ad_accounts' in response.data,
        successValue: response.data.success,
        dataKeys: response.data.data ? Object.keys(response.data.data) : 'N/A'
      });
      
      // Verificar diferentes estruturas de resposta
      let accounts = [];
      if (response.data.ad_accounts) {
        accounts = response.data.ad_accounts;
      } else if (response.data.data?.ad_accounts) {
        accounts = response.data.data.ad_accounts;
      } else if (response.data.data?.data) {
        accounts = response.data.data.data;
      }
      
      console.log('📊 Contas extraídas:', accounts);
      console.log('📊 Número de contas:', accounts.length);
      
      return accounts || [];
    } catch (error: any) {
      console.error('❌ Erro na requisição de contas:', error);
      console.error('📄 Detalhes do erro:', error.response?.data);
      console.error('🔍 Status do erro:', error.response?.status);
      throw new Error(error.response?.data?.error || 'Erro ao buscar contas de anúncio');
    }
  }

  /**
   * Busca campanhas de uma conta específica
   */
  async getCampaigns(adAccountId: string): Promise<MetaAdsCampaign[]> {
    try {
      const url = `${API_BASE_URL}/api/meta/campaigns`;
      const params = { ad_account_id: adAccountId };
      
      console.log('🌐 === BUSCANDO CAMPANHAS ===');
      console.log('📍 URL:', url);
      console.log('📋 Parâmetros:', params);
      console.log('🔑 Headers:', this.getAuthHeaders());
      console.log('🏢 Account ID:', adAccountId);
      
      const response = await axios.get<{ campaigns: MetaAdsCampaign[] }>(url, {
        headers: this.getAuthHeaders(),
        params
      });
      
      console.log('📡 Resposta completa da API (campaigns):', response.data);
      console.log('📊 Status da resposta:', response.status);
      console.log('📊 Campanhas encontradas:', response.data.campaigns?.length || 0);
      
      return response.data.campaigns || [];
    } catch (error: any) {
      console.error('❌ Erro ao buscar campanhas:', error);
      console.error('📄 Detalhes do erro:', error.response?.data);
      console.error('🔍 Status do erro:', error.response?.status);
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
      
      const url = `${API_BASE_URL}/api/meta/campaigns/insights`;
      
      console.log('📊 === BUSCANDO INSIGHTS ===');
      console.log('📍 URL:', url);
      console.log('📋 Parâmetros:', params);
      console.log('🔑 Headers:', this.getAuthHeaders());
      console.log('🏢 Account ID:', adAccountId);
      console.log('🎯 Campaign IDs:', campaignIds);
      
      const response = await axios.get<{ insights: any[] }>(url, {
        headers: this.getAuthHeaders(),
        params
      });
      
      console.log('📡 Resposta completa da API (insights):', response.data);
      console.log('📊 Status da resposta:', response.status);
      console.log('📊 Insights encontrados:', response.data.insights?.length || 0);
      
      return response.data.insights || [];
    } catch (error: any) {
      console.error('❌ Erro ao buscar insights:', error);
      console.error('📄 Detalhes do erro:', error.response?.data);
      console.error('🔍 Status do erro:', error.response?.status);
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
      const url = `${API_BASE_URL}/api/meta/campaigns/combined`;
      const params = {
        ad_account_id: adAccountId,
        date_preset: datePreset
      };
      
      console.log('🌐 Fazendo requisição para campanhas:', url);
      console.log('📋 Parâmetros:', params);
      console.log('🔑 Headers:', this.getAuthHeaders());
      
      const response = await axios.get<{ campaigns: MetaAdsCampaign[] }>(url, {
        headers: this.getAuthHeaders(),
        params
      });
      
      console.log('📡 Resposta da API (campaigns):', response.data);
      return response.data.campaigns || [];
    } catch (error: any) {
      console.error('❌ Erro na requisição de campanhas:', error);
      console.error('📄 Detalhes do erro:', error.response?.data);
      console.error('🔍 Status do erro:', error.response?.status);
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

