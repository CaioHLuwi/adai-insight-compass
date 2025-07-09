const express = require('express');
const axios = require('axios');
const router = express.Router();

// Configurações da Meta Ads API
const META_API_VERSION = 'v23.0';
const META_API_BASE_URL = `https://graph.facebook.com/${META_API_VERSION}`;

/**
 * Middleware para validar access token
 */
const validateAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token é obrigatório' });
  }
  
  req.accessToken = authHeader.replace('Bearer ', '');
  next();
};

/**
 * GET /campaigns
 * Buscar campanhas de uma conta de anúncio do Meta Ads
 */
router.get('/campaigns', validateAccessToken, async (req, res) => {
  try {
    const { ad_account_id } = req.query;
    
    if (!ad_account_id) {
      return res.status(400).json({ error: 'ID da conta de anúncio é obrigatório' });
    }
    
    // Garantir que o ad_account_id tenha o prefixo 'act_'
    const accountId = ad_account_id.startsWith('act_') ? ad_account_id : `act_${ad_account_id}`;
    
    // Campos que queremos buscar das campanhas
    const campaignFields = [
      'id',
      'name',
      'status',
      'objective',
      'created_time',
      'updated_time',
      'start_time',
      'stop_time',
      'daily_budget',
      'lifetime_budget',
      'budget_remaining'
    ];
    
    // Fazer requisição para a Meta Ads API
    const response = await axios.get(`${META_API_BASE_URL}/${accountId}/campaigns`, {
      params: {
        access_token: req.accessToken,
        fields: campaignFields.join(','),
        limit: 100
      }
    });
    
    const campaigns = response.data.data || [];
    
    // Processar e formatar os dados das campanhas
    const formattedCampaigns = campaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      objective: campaign.objective,
      created_time: campaign.created_time,
      updated_time: campaign.updated_time,
      start_time: campaign.start_time,
      stop_time: campaign.stop_time,
      daily_budget: campaign.daily_budget ? parseFloat(campaign.daily_budget) / 100 : null, // Converter de centavos para reais
      lifetime_budget: campaign.lifetime_budget ? parseFloat(campaign.lifetime_budget) / 100 : null,
      budget_remaining: campaign.budget_remaining ? parseFloat(campaign.budget_remaining) / 100 : null
    }));
    
    res.json({
      campaigns: formattedCampaigns,
      total: formattedCampaigns.length,
      paging: response.data.paging || {}
    });
    
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error.response?.data || error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Erro ao buscar campanhas',
        details: error.response.data
      });
    }
    
    res.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

/**
 * GET /campaigns/insights
 * Buscar insights (métricas) das campanhas
 */
router.get('/campaigns/insights', validateAccessToken, async (req, res) => {
  try {
    const { ad_account_id, campaign_ids, date_preset = 'last_30_days' } = req.query;
    
    if (!ad_account_id) {
      return res.status(400).json({ error: 'ID da conta de anúncio é obrigatório' });
    }
    
    // Garantir que o ad_account_id tenha o prefixo 'act_'
    const accountId = ad_account_id.startsWith('act_') ? ad_account_id : `act_${ad_account_id}`;
    
    // Campos de insights que queremos buscar
    const insightFields = [
      'campaign_id',
      'campaign_name',
      'account_id',
      'account_name',
      'spend',
      'impressions',
      'clicks',
      'cpc',
      'cpm',
      'ctr',
      'reach',
      'frequency',
      'actions',
      'action_values',
      'cost_per_action_type',
      'date_start',
      'date_stop'
    ];
    
    let allInsights = [];
    
    if (campaign_ids) {
      // Se IDs específicos de campanhas foram fornecidos, buscar insights para cada uma
      const campaignIdList = campaign_ids.split(',').filter(id => id.trim());
      
      const insightPromises = campaignIdList.map(async (campaignId) => {
        try {
          const response = await axios.get(`${META_API_BASE_URL}/${campaignId.trim()}/insights`, {
            params: {
              access_token: req.accessToken,
              fields: insightFields.join(','),
              date_preset: date_preset,
              limit: 100
            }
          });
          return response.data.data || [];
        } catch (error) {
          console.error(`Erro ao buscar insights para campanha ${campaignId}:`, error.response?.data || error.message);
          return [];
        }
      });
      
      const insightResults = await Promise.all(insightPromises);
      allInsights = insightResults.flat();
      
    } else {
      // Buscar insights para todas as campanhas da conta
      const response = await axios.get(`${META_API_BASE_URL}/${accountId}/insights`, {
        params: {
          access_token: req.accessToken,
          fields: insightFields.join(','),
          date_preset: date_preset,
          level: 'campaign',
          limit: 100
        }
      });
      
      allInsights = response.data.data || [];
    }
    
    // Processar e formatar os dados dos insights
    const formattedInsights = allInsights.map(insight => {
      // Processar ações (conversões)
      const actions = insight.actions || [];
      const actionValues = insight.action_values || [];
      
      // Extrair métricas específicas das ações
      let conversions = 0;
      let conversionValue = 0;
      
      actions.forEach(action => {
        if (['purchase', 'complete_registration', 'lead'].includes(action.action_type)) {
          conversions += parseFloat(action.value || 0);
        }
      });
      
      actionValues.forEach(actionValue => {
        if (['purchase', 'complete_registration', 'lead'].includes(actionValue.action_type)) {
          conversionValue += parseFloat(actionValue.value || 0);
        }
      });
      
      // Calcular métricas derivadas
      const spend = parseFloat(insight.spend || 0);
      const clicks = parseInt(insight.clicks || 0);
      const impressions = parseInt(insight.impressions || 0);
      
      const cpa = conversions > 0 ? spend / conversions : 0;
      const roas = spend > 0 ? conversionValue / spend : 0;
      
      return {
        campaign_id: insight.campaign_id,
        campaign_name: insight.campaign_name,
        account_id: insight.account_id,
        account_name: insight.account_name,
        spend: spend,
        impressions: impressions,
        clicks: clicks,
        cpc: parseFloat(insight.cpc || 0),
        cpm: parseFloat(insight.cpm || 0),
        ctr: parseFloat(insight.ctr || 0),
        reach: parseInt(insight.reach || 0),
        frequency: parseFloat(insight.frequency || 0),
        conversions: conversions,
        conversion_value: conversionValue,
        cpa: cpa,
        roas: roas,
        date_start: insight.date_start,
        date_stop: insight.date_stop,
        actions: actions,
        action_values: actionValues
      };
    });
    
    res.json({
      insights: formattedInsights,
      total: formattedInsights.length
    });
    
  } catch (error) {
    console.error('Erro ao buscar insights:', error.response?.data || error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Erro ao buscar insights',
        details: error.response.data
      });
    }
    
    res.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

/**
 * GET /ad-accounts
 * Buscar contas de anúncio do usuário
 */
router.get('/ad-accounts', validateAccessToken, async (req, res) => {
  try {
    // Buscar contas de anúncio do usuário
    const response = await axios.get(`${META_API_BASE_URL}/me/adaccounts`, {
      params: {
        access_token: req.accessToken,
        fields: 'id,name,account_status,currency,timezone_name,business_name',
        limit: 100
      }
    });
    
    const adAccounts = response.data.data || [];
    
    res.json({
      ad_accounts: adAccounts,
      total: adAccounts.length
    });
    
  } catch (error) {
    console.error('Erro ao buscar contas de anúncio:', error.response?.data || error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Erro ao buscar contas de anúncio',
        details: error.response.data
      });
    }
    
    res.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

/**
 * GET /test-token
 * Testar se o access token é válido
 */
router.get('/test-token', validateAccessToken, async (req, res) => {
  try {
    // Testar o token fazendo uma requisição simples
    const response = await axios.get(`${META_API_BASE_URL}/me`, {
      params: {
        access_token: req.accessToken,
        fields: 'id,name'
      }
    });
    
    res.json({
      valid: true,
      user: response.data
    });
    
  } catch (error) {
    console.error('Erro ao testar token:', error.response?.data || error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        valid: false,
        error: error.response.data
      });
    }
    
    res.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

/**
 * GET /campaigns/combined
 * Buscar campanhas com seus insights combinados
 */
router.get('/campaigns/combined', validateAccessToken, async (req, res) => {
  try {
    const { ad_account_id, date_preset = 'last_30_days' } = req.query;
    
    if (!ad_account_id) {
      return res.status(400).json({ error: 'ID da conta de anúncio é obrigatório' });
    }
    
    // Garantir que o ad_account_id tenha o prefixo 'act_'
    const accountId = ad_account_id.startsWith('act_') ? ad_account_id : `act_${ad_account_id}`;
    
    // Buscar campanhas e insights em paralelo
    const [campaignsResponse, insightsResponse] = await Promise.all([
      axios.get(`${META_API_BASE_URL}/${accountId}/campaigns`, {
        params: {
          access_token: req.accessToken,
          fields: 'id,name,status,objective,daily_budget,lifetime_budget',
          limit: 100
        }
      }),
      axios.get(`${META_API_BASE_URL}/${accountId}/insights`, {
        params: {
          access_token: req.accessToken,
          fields: 'campaign_id,campaign_name,spend,impressions,clicks,cpc,cpm,ctr,reach,actions,action_values',
          date_preset: date_preset,
          level: 'campaign',
          limit: 100
        }
      })
    ]);
    
    const campaigns = campaignsResponse.data.data || [];
    const insights = insightsResponse.data.data || [];
    
    // Criar um mapa de insights por campaign_id
    const insightsMap = {};
    insights.forEach(insight => {
      insightsMap[insight.campaign_id] = insight;
    });
    
    // Combinar dados de campanhas com insights
    const combinedData = campaigns.map(campaign => {
      const insight = insightsMap[campaign.id] || {};
      
      // Processar ações para calcular conversões
      const actions = insight.actions || [];
      const actionValues = insight.action_values || [];
      
      let conversions = 0;
      let conversionValue = 0;
      
      actions.forEach(action => {
        if (['purchase', 'complete_registration', 'lead'].includes(action.action_type)) {
          conversions += parseFloat(action.value || 0);
        }
      });
      
      actionValues.forEach(actionValue => {
        if (['purchase', 'complete_registration', 'lead'].includes(actionValue.action_type)) {
          conversionValue += parseFloat(actionValue.value || 0);
        }
      });
      
      const spend = parseFloat(insight.spend || 0);
      const cpa = conversions > 0 ? spend / conversions : 0;
      const roas = spend > 0 ? conversionValue / spend : 0;
      
      return {
        // Dados da campanha
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        objective: campaign.objective,
        dailyBudget: campaign.daily_budget ? parseFloat(campaign.daily_budget) / 100 : null,
        lifetimeBudget: campaign.lifetime_budget ? parseFloat(campaign.lifetime_budget) / 100 : null,
        
        // Métricas de performance
        spend: spend,
        impressions: parseInt(insight.impressions || 0),
        clicks: parseInt(insight.clicks || 0),
        cpc: parseFloat(insight.cpc || 0),
        cpm: parseFloat(insight.cpm || 0),
        ctr: parseFloat(insight.ctr || 0),
        reach: parseInt(insight.reach || 0),
        conversions: conversions,
        conversionValue: conversionValue,
        cpa: cpa,
        roas: roas,
        
        // Dados brutos para referência
        rawActions: actions,
        rawActionValues: actionValues
      };
    });
    
    res.json({
      campaigns: combinedData,
      total: combinedData.length
    });
    
  } catch (error) {
    console.error('Erro ao buscar dados combinados:', error.response?.data || error.message);
    
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Erro ao buscar dados combinados',
        details: error.response.data
      });
    }
    
    res.status(500).json({ error: `Erro interno: ${error.message}` });
  }
});

module.exports = router;

