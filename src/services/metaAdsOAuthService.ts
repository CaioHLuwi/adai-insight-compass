import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://otmizy-meta-ads.vercel.app/oauth_meta/health' // Em produção, usar URL relativa
  : 'localhost:8080/oauth_meta'; // Em desenvolvimento, usar URL completa

// Tipos TypeScript para as respostas da API OAuth
export interface OAuthInitiateResponse {
  authUrl: string;
}

export interface OAuthCallbackResponse {
  access_token: string;
  expires_in?: number;
}

export interface MetaAdsAccountInfo {
  id: string;
  name: string;
  account_status: string;
  currency: string;
  timezone_name: string;
  business_name?: string;
}

// Classe para gerenciar o fluxo OAuth do Meta Ads
export class MetaAdsOAuthService {
  
  /**
   * Inicia o fluxo OAuth do Meta Ads
   * Retorna a URL de autorização para redirecionar o usuário
   */
  async initiateOAuth(): Promise<string> {
    try {
      const response = await axios.get(`${API_BASE_URL}/oauth/initiate`);
      return response.data.authUrl;
    } catch (error: any) {
      console.error('Erro ao iniciar OAuth:', error);
      throw new Error(error.response?.data?.error || 'Erro ao iniciar autenticação');
    }
  }

  /**
   * Troca o código de autorização por um access token
   */
  async exchangeCodeForToken(code: string): Promise<OAuthCallbackResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/oauth-callback`, {
        params: { code }
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao trocar código por token:', error);
      throw new Error(error.response?.data?.error || 'Erro ao obter access token');
    }
  }

  /**
   * Busca informações das contas de anúncio usando um access token
   */
  async getAccountInfo(accessToken: string): Promise<MetaAdsAccountInfo[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/ad-accounts`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data.ad_accounts || [];
    } catch (error: any) {
      console.error('Erro ao buscar informações da conta:', error);
      throw new Error(error.response?.data?.error || 'Erro ao buscar informações da conta');
    }
  }

  /**
   * Valida se um access token é válido
   */
  async validateToken(accessToken: string): Promise<{ valid: boolean; user?: any; error?: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/test-token`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao validar token:', error);
      return {
        valid: false,
        error: error.response?.data?.error || error.message
      };
    }
  }

  /**
   * Abre uma janela popup para o fluxo OAuth
   * Retorna uma Promise que resolve com o código de autorização
   */
  async openOAuthPopup(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // Obter URL de autorização
        const authUrl = await this.initiateOAuth();
        
        // Abrir popup
        const popup = window.open(
          authUrl,
          'meta-ads-oauth',
          'width=600,height=700,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          reject(new Error('Popup foi bloqueado. Permita popups para este site.'));
          return;
        }

        // Monitorar o popup para capturar o código de autorização
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            reject(new Error('Autenticação cancelada pelo usuário'));
          }
        }, 1000);

        // Listener para mensagens do popup (quando o callback for processado)
        const messageListener = (event: MessageEvent) => {
          // Verificar origem por segurança
          if (event.origin !== window.location.origin) {
            return;
          }

          if (event.data.type === 'META_ADS_OAUTH_SUCCESS') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            resolve(event.data.code);
          } else if (event.data.type === 'META_ADS_OAUTH_ERROR') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            reject(new Error(event.data.error || 'Erro na autenticação'));
          }
        };

        window.addEventListener('message', messageListener);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Fluxo completo de OAuth: abre popup, obtém código e troca por token
   */
  async completeOAuthFlow(): Promise<{ accessToken: string; accounts: MetaAdsAccountInfo[] }> {
    try {
      // Abrir popup e obter código
      const code = await this.openOAuthPopup();
      
      // Trocar código por token
      const tokenResponse = await this.exchangeCodeForToken(code);
      
      // Buscar informações das contas
      const accounts = await this.getAccountInfo(tokenResponse.access_token);
      
      return {
        accessToken: tokenResponse.access_token,
        accounts
      };
    } catch (error: any) {
      console.error('Erro no fluxo OAuth completo:', error);
      throw error;
    }
  }
}

// Instância singleton do serviço OAuth
export const metaAdsOAuthService = new MetaAdsOAuthService();

// Hook personalizado para usar o serviço OAuth no React
export const useMetaAdsOAuth = () => {
  return metaAdsOAuthService;
};

