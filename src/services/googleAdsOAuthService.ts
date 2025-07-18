import axios from 'axios';

// Configuração base da API
// OAuth sempre precisa usar o domínio real do backend
const API_BASE_URL = 'https://backend.otmizy.com';

// Tipos TypeScript para as respostas da API OAuth
export interface OAuthInitiateResponse {
  authUrl: string;
}

export interface OAuthCallbackResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  userInfo?: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
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
   * Abre uma janela popup para o fluxo OAuth usando postMessage
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

        let authCompleted = false;
        let timeoutId: NodeJS.Timeout;

        // Escutar mensagem de sucesso do popup
        function handleMessage(event: MessageEvent) {
          if (event.origin !== window.location.origin) return;
          if (event.data !== 'google_auth_success') return;
          
          authCompleted = true;
          clearTimeout(timeoutId);
          window.removeEventListener('message', handleMessage);

          // Pequeno delay para garantir que o localStorage seja atualizado
          setTimeout(() => {
            // Ler resultado do localStorage após receber a mensagem
            const resultStr = localStorage.getItem('google_ads_oauth_result');
            if (!resultStr) {
              reject(new Error('Resultado OAuth não encontrado no localStorage'));
              return;
            }

            try {
              const result = JSON.parse(resultStr);
              console.log('Resultado OAuth recebido via postMessage:', result);
              
              // Limpar localStorage
              localStorage.removeItem('google_ads_oauth_result');
              
              if (result.type === 'GOOGLE_ADS_OAUTH_SUCCESS') {
                // Verificar se os dados estão na nova estrutura com 'data'
                let accessToken, refreshToken;
                if (result.data) {
                  accessToken = result.data.access_token;
                  refreshToken = result.data.refresh_token;
                } else {
                  // Fallback para estrutura antiga
                  accessToken = result.accessToken;
                  refreshToken = result.refreshToken;
                }
                
                resolve({
                  accessToken,
                  refreshToken
                });
              } else if (result.type === 'GOOGLE_ADS_OAUTH_ERROR') {
                reject(new Error(result.error || 'Erro na autenticação'));
              } else {
                reject(new Error('Resultado OAuth inválido'));
              }
            } catch (e) {
              reject(new Error('Erro ao processar resultado OAuth'));
            }
          }, 100); // Delay de 100ms
        }

        // Adicionar listener para mensagens
        window.addEventListener('message', handleMessage);

        // Timeout de segurança (5 minutos) - removemos a verificação de popup.closed
        timeoutId = setTimeout(() => {
          if (!authCompleted) {
            window.removeEventListener('message', handleMessage);
            try {
              popup.close();
            } catch (e) {
              // Ignorar erros ao fechar popup devido a políticas de segurança
            }
            reject(new Error('Timeout na autenticação'));
          }
        }, 5 * 60 * 1000);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Fluxo completo de OAuth: abre popup e obtém access token diretamente
   */
  async completeOAuthFlow(): Promise<{ accessToken: string; refreshToken?: string; userInfo?: any }> {
    try {
      // Abrir popup e obter tokens diretamente via localStorage
      const tokens = await this.openOAuthPopup();
      
      // Tentar extrair informações do usuário do localStorage
      let userInfo = null;
      const oauthResultStr = localStorage.getItem('google_ads_oauth_result');
      if (oauthResultStr) {
        try {
          const oauthResult = JSON.parse(oauthResultStr);
          // Verificar se os dados estão na nova estrutura com 'data'
          if (oauthResult.data) {
            userInfo = oauthResult.data.userInfo;
          } else {
            // Fallback para estrutura antiga
            userInfo = oauthResult.userInfo;
          }
        } catch (e) {
          console.warn('Erro ao extrair userInfo do OAuth result:', e);
        }
      }
      
      return {
        ...tokens,
        userInfo
      };
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