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
      const response = await axios.get<OAuthInitiateResponse>(`${API_BASE_URL}/api/meta/initiate`);
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
      const response = await axios.get<OAuthCallbackResponse>(`${API_BASE_URL}/api/meta/callback`, {
        params: { code }
      });
      return {
        access_token: response.data.access_token,
        expires_in: response.data.expires_in
      };
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
      const response = await axios.get<{ ad_accounts: MetaAdsAccountInfo[] }>(`${API_BASE_URL}/api/meta/ad-accounts`, {
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
      const response = await axios.get<{ valid: boolean; user?: any; error?: string }>(`${API_BASE_URL}/api/meta/test-token`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return {
        valid: response.data.valid || false,
        user: response.data.user,
        error: response.data.error
      };
    } catch (error: any) {
      console.error('Erro ao validar token:', error);
      return {
        valid: false,
        error: error.response?.data?.error || error.message
      };
    }
  }

  /**
   * Abre uma janela popup para o fluxo OAuth usando postMessage
   * Retorna uma Promise que resolve com o access token diretamente
   */
  async openOAuthPopup(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // Limpar resultado anterior do localStorage
        localStorage.removeItem('meta_ads_oauth_result');
        
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

        let authCompleted = false;
        let timeoutId: NodeJS.Timeout;

        // Escutar mensagem de sucesso do popup
        function handleMessage(event: MessageEvent) {
          if (event.origin !== window.location.origin) return;
          if (event.data !== 'meta_auth_success') return;
          
          authCompleted = true;
          clearTimeout(timeoutId);
          window.removeEventListener('message', handleMessage);

          // Pequeno delay para garantir que o localStorage seja atualizado
          setTimeout(() => {
            // Ler resultado do localStorage após receber a mensagem
            const resultStr = localStorage.getItem('meta_ads_oauth_result');
            if (!resultStr) {
              reject(new Error('Resultado OAuth não encontrado no localStorage'));
              return;
            }

            try {
              const result = JSON.parse(resultStr);
              console.log('Resultado OAuth recebido via postMessage:', result);
              
              // Limpar localStorage
              localStorage.removeItem('meta_ads_oauth_result');
              
              if (result.type === 'META_ADS_OAUTH_SUCCESS') {
                resolve(result.accessToken);
              } else if (result.type === 'META_ADS_OAUTH_ERROR') {
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
  async completeOAuthFlow(): Promise<{ accessToken: string; accounts: MetaAdsAccountInfo[] }> {
    try {
      // Abrir popup e obter access token diretamente via localStorage
      const accessToken = await this.openOAuthPopup();
      
      // Buscar informações das contas
      const accounts = await this.getAccountInfo(accessToken);
      
      return {
        accessToken,
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



