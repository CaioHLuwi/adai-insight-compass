
export interface ManusMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ManusResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class ManusService {
  private apiKey: string;
  private baseUrl = 'https://api.manus.chat/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(messages: ManusMessage[], agentType: 'ads' | 'support' = 'ads'): Promise<string> {
    const systemPrompts = {
      ads: `You are AdsBot, an AI assistant specialized in Google Ads performance analysis. 
            You help users understand their campaign metrics, analyze performance data, 
            and provide insights about CPC, CPA, CTR, conversions, and budget optimization.
            Always provide data-driven answers and actionable recommendations.`,
      support: `You are SupportBot, a helpful AI assistant for AdGuardAI SaaS platform. 
               You help users with billing questions, user management, account setup, 
               connecting Google Ads accounts, and general platform usage. 
               Be friendly and provide clear step-by-step instructions.`
    };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompts[agentType] },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Manus API error: ${response.status}`);
      }

      const data: ManusResponse = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Error calling Manus API:', error);
      throw new Error('Failed to get response from AI assistant');
    }
  }
}
