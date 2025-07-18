// services/googleAdsOAuthService.ts

export interface GoogleAdsAccountInfo {
  id: string;
  name: string;
  customerId: string;
  status: 'active' | 'inactive';         
  subAccounts: GoogleAdsAccountInfo[];  
}

interface OAuthResult {
  type: 'GOOGLE_ADS_OAUTH_SUCCESS' | 'GOOGLE_ADS_OAUTH_ERROR';
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export function useGoogleAdsOAuth() {
  /**
   * Inicia o fluxo OAuth do Google Ads e retorna accessToken + lista de contas.
   */
  async function completeOAuthFlow(): Promise<{ accessToken: string; accounts: GoogleAdsAccountInfo[] }> {
    // 1) Pega a URL de autorização
    // OAuth sempre precisa usar o domínio real do backend
    const API_BASE_URL = 'https://backend.otmizy.com';
    const initRes = await fetch(`${API_BASE_URL}/api/google/initiate`);
    if (!initRes.ok) throw new Error('Erro ao iniciar OAuth do Google');
    const { authUrl } = await initRes.json();

    // 2) Abre popup para consentimento do usuário
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const popup = window.open(
      authUrl,
      'googleOAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (!popup) throw new Error('Não foi possível abrir o popup de Google OAuth');

    return new Promise((resolve, reject) => {
      // 3) Escuta mensagem de sucesso ou erro do popup
      function handleMessage(event: MessageEvent) {
        if (event.origin !== window.location.origin) return;
        if (event.data !== 'google_auth_success') return;
        window.removeEventListener('message', handleMessage);

        // 4) Lê resultado do localStorage
        const raw = localStorage.getItem('google_ads_oauth_result');
        if (!raw) {
          return reject(new Error('Resultado OAuth não encontrado no localStorage'));
        }
        let result: any;
        try {
          result = JSON.parse(raw);
        } catch {
          return reject(new Error('Formato inválido de OAuth result'));
        }
        if (result.type === 'GOOGLE_ADS_OAUTH_ERROR') {
          return reject(new Error(result.message || 'Erro no OAuth do Google'));
        }
        
        // Verificar se os dados estão na nova estrutura com 'data'
        let token;
        if (result.data) {
          token = result.data.access_token;
        } else {
          // Fallback para estrutura antiga
          token = result.accessToken;
        }
        
        if (!token) {
          return reject(new Error('Token de acesso não encontrado'));
        }

        // 5) Busca contas via endpoint de campanhas (lista clientes acessíveis)
        fetch(`${API_BASE_URL}/api/google/campaigns`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            if (!res.ok) throw new Error('Falha ao buscar contas do Google Ads');
            return res.json();
          })
          .then((data: { resourceNames?: string[] }) => {
            const names = data.resourceNames || [];
            const accounts: GoogleAdsAccountInfo[] = names.map(rn => {
              const id = rn;
              const parts = rn.split('/');
              const customerId = parts[1] || rn;
              return {
                id,
                name: id,
                customerId,
                status: 'active',
                subAccounts: []
              };
            });
            resolve({ accessToken: token, accounts });
          })
          .catch(err => reject(err));
      }

      window.addEventListener('message', handleMessage);
    });
  }

  return { completeOAuthFlow };
}
