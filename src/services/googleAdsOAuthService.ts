import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend.otmizy.com' // Em produção, usar URL da Vercel
  : 'https://backend.otmizy.com'; // Em desenvolvimento, usar URL completa

// Tipos TypeScript para as respostas da API OAuth
export interface OAuthInitiateResponse {
  authUrl: string;
}

export interface OAuthCallbackResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface GoogleAdsAccountInfo {
  id: string;
  name: string;
  descriptiveName: string;
  currencyCode: string;
  timeZone: string;
  customerId: string;
}

// Classe para gerenciar o fluxo OAuth do Google Ads
export class GoogleAdsOAuthService {
  
  /**
   * Inicia o fluxo OAuth do Google Ads
   * Retorna a URL de autorização para redirecionar o usuário
   */
  async initiateOAuth(): Promise<string> {
    try {
      const response = await axios.get<OAuthInitiateResponse>(`${API_BASE_URL}/api/google/initiate`);
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
      const response = await axios.get<OAuthCallbackResponse>(`${API_BASE_URL}/api/google/callback`, {
        params: { code }
      });
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in
      };
    } catch (error: any) {
      console.error('Erro ao trocar código por token:', error);
      throw new Error(error.response?.data?.error || 'Erro ao obter access token');
    }
  }

  /**
   * Abre uma janela popup para o fluxo OAuth usando localStorage
   * Retorna uma Promise que resolve com o access token diretamente
   */
  async openOAuthPopup(): Promise<{ accessToken: string; refreshToken?: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        // Limpar resultado anterior do localStorage
        localStorage.removeItem('google_ads_oauth_result');
        
        // Obter URL de autorização
        const authUrl = await this.initiateOAuth();
        
        // Abrir popup
        const popup = window.open(
          authUrl,
          'google-ads-oauth',
          'width=600,height=700,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          reject(new Error('Popup foi bloqueado. Permita popups para este site.'));
          return;
        }

        // Monitorar localStorage para resultado do OAuth
        const checkResult = setInterval(() => {
          // Verificar se há resultado no localStorage
          const resultStr = localStorage.getItem('google_ads_oauth_result');
          if (resultStr) {
            clearInterval(checkResult);
            try {
              const result = JSON.parse(resultStr);
              console.log('Resultado OAuth recebido via localStorage:', result);
              
              // Limpar localStorage
              localStorage.removeItem('google_ads_oauth_result');
              
              if (result.type === 'GOOGLE_ADS_OAUTH_SUCCESS') {
                resolve({
                  accessToken: result.accessToken,
                  refreshToken: result.refreshToken
                });
              } else if (result.type === 'GOOGLE_ADS_OAUTH_ERROR') {
                reject(new Error(result.error || 'Erro na autenticação'));
              } else {
                reject(new Error('Resultado OAuth inválido'));
              }
            } catch (e) {
              reject(new Error('Erro ao processar resultado OAuth'));
            }
          } else if (popup.closed) { // Só rejeita se o popup fechar E não houver resultado
            clearInterval(checkResult);
            reject(new Error('Autenticação cancelada pelo usuário'));
          }
        }, 1000);

        // Timeout de segurança (5 minutos)
        setTimeout(() => {
          clearInterval(checkResult);
          if (!popup.closed) {
            popup.close();
          }
          reject(new Error('Timeout na autenticação'));
        }, 5 * 60 * 1000);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Fluxo completo de OAuth: abre popup e obtém access token diretamente
   */
  async completeOAuthFlow(): Promise<{ accessToken: string; refreshToken?: string }> {
    try {
      // Abrir popup e obter tokens diretamente via localStorage
      const tokens = await this.openOAuthPopup();
      
      return tokens;
    } catch (error: any) {
      console.error('Erro no fluxo OAuth completo:', error);
      throw error;
    }
  }
}

// Instância singleton do serviço OAuth
export const googleAdsOAuthService = new GoogleAdsOAuthService();

// Hook personalizado para usar o serviço OAuth no React
export const useGoogleAdsOAuth = () => {
  return googleAdsOAuthService;
};