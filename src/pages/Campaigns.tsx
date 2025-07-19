
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Save, RefreshCw, AlertCircle, CheckCircle, Eye, EyeOff, Search, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMetaAdsCampaigns } from '@/hooks/useMetaAdsCampaigns';
import { MetaAdsCampaign, metaAdsService } from '@/services/metaAdsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Campaigns = () => {
  const { language } = useLanguage();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [editingCampaign, setEditingCampaign] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{[key: string]: any}>({});
  const [syncStatus, setSyncStatus] = useState<{[key: string]: 'idle' | 'syncing' | 'success' | 'error'}>({});
  const [metaAuthData, setMetaAuthData] = useState<any>(null);
  
  // Hook para gerenciar campanhas do Meta
  const {
    campaigns,
    adAccounts,
    loading,
    error,
    fetchCampaigns,
    fetchAdAccounts,
    setAccessToken,
    setAdAccountId
  } = useMetaAdsCampaigns({ autoFetch: false });

  const allFields = [
    { key: 'status', label: 'STATUS', visible: true, editable: true },
    { key: 'name', label: 'CAMPANHA', visible: true, editable: true },
    { key: 'dailyBudget', label: 'ORÇAMENTO', visible: true, editable: true },
    { key: 'conversions', label: 'VENDAS', visible: true, editable: false },
    { key: 'cpa', label: 'CPA', visible: true, editable: false },
    { key: 'spend', label: 'GASTOS', visible: true, editable: false },
    { key: 'grossRevenue', label: 'FATURAMENTO', visible: true, editable: false },
    { key: 'profit', label: 'LUCRO', visible: true, editable: false },
    { key: 'roas', label: 'ROAS', visible: true, editable: false },
    { key: 'roi', label: 'ROI', visible: true, editable: false },
    // Campos adicionais (ocultos por padrão)
    { key: 'objective', label: language === 'pt' ? 'OBJETIVO' : 'OBJECTIVE', visible: false, editable: false },
    { key: 'lifetimeBudget', label: language === 'pt' ? 'ORÇAMENTO TOTAL' : 'LIFETIME BUDGET', visible: false, editable: true },
    { key: 'impressions', label: language === 'pt' ? 'IMPRESSÕES' : 'IMPRESSIONS', visible: false, editable: false },
    { key: 'clicks', label: 'CLICKS', visible: false, editable: false },
    { key: 'cpc', label: 'CPC', visible: false, editable: false },
    { key: 'cpm', label: 'CPM', visible: false, editable: false },
    { key: 'ctr', label: 'CTR (%)', visible: false, editable: false },
    { key: 'reach', label: language === 'pt' ? 'ALCANCE' : 'REACH', visible: false, editable: false },
    { key: 'conversionValue', label: language === 'pt' ? 'VALOR DAS CONVERSÕES' : 'CONVERSION VALUE', visible: false, editable: false },
    { key: 'netRevenue', label: language === 'pt' ? 'FATURAMENTO LÍQUIDO' : 'NET REVENUE', visible: false, editable: false },
    { key: 'profitMargin', label: language === 'pt' ? 'MARGEM DE LUCRO' : 'PROFIT MARGIN', visible: false, editable: false }
  ];

  const [visibleFields, setVisibleFields] = useState(allFields);

  // Carregar dados de autenticação do Meta
  useEffect(() => {
    console.log('🔍 === INICIANDO VERIFICAÇÃO DO LOCALSTORAGE ===');
    console.log('🔍 Todas as chaves do localStorage:', Object.keys(localStorage));
    
    // Verificar todas as possíveis chaves onde os dados podem estar
    const allPossibleKeys = ['metaAuthData', 'otmizy_meta_auth', 'meta_access_token', 'metaAuth', 'meta_auth', 'facebook_auth', 'meta_ads_auth'];
    
    let foundData = null;
    let foundKey = null;
    
    allPossibleKeys.forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        console.log(`🔍 Encontrado dados em '${key}':`, data.substring(0, 100) + '...');
        if (!foundData) {
          foundData = data;
          foundKey = key;
        }
      }
    });
    
    if (foundData) {
      try {
        const metaData = JSON.parse(foundData);
        console.log('📊 Dados do Meta parseados da chave:', foundKey);
        console.log('📊 Estrutura dos dados:', {
          hasAccessToken: !!metaData.accessToken,
          hasUserInfo: !!metaData.userInfo,
          hasAdAccounts: !!metaData.adAccounts,
          adAccountsLength: metaData.adAccounts?.data?.length || 0,
          tokenPreview: metaData.accessToken ? metaData.accessToken.substring(0, 20) + '...' : 'N/A'
        });
        
        setMetaAuthData(metaData);
        
        if (metaData.accessToken) {
          console.log('🔑 Access token encontrado, configurando hook...');
          setAccessToken(metaData.accessToken);
          
          // Aguardar um pouco para garantir que o token foi configurado
          setTimeout(() => {
            console.log('🔄 Iniciando busca de contas após configuração...');
            fetchAdAccounts();
          }, 100);
        } else {
          console.warn('⚠️ Access token não encontrado nos dados salvos');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar dados do Meta:', error);
      }
    } else {
      console.warn('⚠️ Nenhum dado do Meta encontrado no localStorage');
      console.log('💡 Para conectar sua conta Meta, vá para a página de Contas ADS');
    }
    
    console.log('🔍 === FIM DA VERIFICAÇÃO DO LOCALSTORAGE ===');
  }, [setAccessToken, fetchAdAccounts]);

  // Carregar campanhas quando uma conta for selecionada
  useEffect(() => {
    if (selectedAccount && metaAuthData?.accessToken) {
      setAdAccountId(selectedAccount);
      fetchCampaigns();
    }
  }, [selectedAccount, metaAuthData, setAdAccountId, fetchCampaigns]);

  // Funções para edição e sincronização
  const handleEditStart = (campaignId: string, field: string, currentValue: any) => {
    setEditingCampaign(campaignId);
    setEditValues({ [field]: currentValue });
  };

  const handleEditCancel = () => {
    setEditingCampaign(null);
    setEditValues({});
  };

  const handleEditSave = async (campaignId: string) => {
    if (!metaAuthData?.accessToken) {
      alert(language === 'pt' ? 'Token de acesso não encontrado' : 'Access token not found');
      return;
    }

    setSyncStatus(prev => ({ ...prev, [campaignId]: 'syncing' }));

    try {
      // Preparar dados para atualização
      const updateData: any = {};
      
      if (editValues.name) updateData.name = editValues.name;
      if (editValues.status) updateData.status = editValues.status === 'Ativa' ? 'ACTIVE' : 'PAUSED';
      if (editValues.dailyBudget) {
        const budgetValue = typeof editValues.dailyBudget === 'string' 
          ? parseFloat(editValues.dailyBudget.replace(/[^\d.,]/g, '').replace(',', '.'))
          : editValues.dailyBudget;
        updateData.daily_budget = Math.round(budgetValue * 100); // Meta espera em centavos
      }
      if (editValues.lifetimeBudget) {
        const budgetValue = typeof editValues.lifetimeBudget === 'string'
          ? parseFloat(editValues.lifetimeBudget.replace(/[^\d.,]/g, '').replace(',', '.'))
          : editValues.lifetimeBudget;
        updateData.lifetime_budget = Math.round(budgetValue * 100);
      }

      // Fazer a requisição de atualização para o Meta
      const response = await fetch(`https://graph.facebook.com/v18.0/${campaignId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${metaAuthData.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        setSyncStatus(prev => ({ ...prev, [campaignId]: 'success' }));
        // Recarregar campanhas para mostrar dados atualizados
        fetchCampaigns();
        handleEditCancel();
        
        setTimeout(() => {
          setSyncStatus(prev => ({ ...prev, [campaignId]: 'idle' }));
        }, 3000);
      } else {
        throw new Error('Falha na sincronização');
      }
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
      setSyncStatus(prev => ({ ...prev, [campaignId]: 'error' }));
      
      setTimeout(() => {
        setSyncStatus(prev => ({ ...prev, [campaignId]: 'idle' }));
      }, 3000);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Estado para seleção múltipla de contas
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Função para alternar seleção de todas as contas
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(adAccounts.map(account => account.id));
    }
    setSelectAll(!selectAll);
  };

  // Função para alternar seleção de uma conta específica
  const toggleAccountSelection = (accountId: string) => {
    setSelectedAccounts(prev => {
      const newSelection = prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId];
      
      setSelectAll(newSelection.length === adAccounts.length);
      return newSelection;
    });
  };

  // Transformar dados do Meta para o formato da tabela
  const transformedCampaigns = campaigns.map(campaign => {
    console.log('🔍 === ANÁLISE DETALHADA DA CAMPANHA ===');
    console.log('📋 ID da Campanha:', campaign.id);
    console.log('📋 Nome:', campaign.name);
    console.log('📊 Tem insights?', !!campaign.insights);
    console.log('📊 Insights completos:', campaign.insights);
    
    if (campaign.insights) {
      console.log('🔍 Campos disponíveis nos insights:', Object.keys(campaign.insights));
      console.log('💰 Spend:', campaign.insights.spend);
      console.log('👁️ Impressions:', campaign.insights.impressions);
      console.log('🖱️ Clicks:', campaign.insights.clicks);
      console.log('💵 CPC:', campaign.insights.cpc);
      console.log('📈 CPM:', campaign.insights.cpm);
      console.log('📊 CTR:', campaign.insights.ctr);
      console.log('🎯 Reach:', campaign.insights.reach);
      console.log('🔄 Conversions:', campaign.insights.conversions);
      console.log('💎 Conversion Values:', campaign.insights.conversion_values);
      console.log('🎯 Actions:', campaign.insights.actions);
      console.log('💰 Action Values:', campaign.insights.action_values);
    } else {
      console.log('⚠️ Nenhum insight encontrado para esta campanha');
    }
    console.log('🔍 === FIM DA ANÁLISE ===');
    
    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status === 'ACTIVE' ? 'Ativa' : campaign.status === 'PAUSED' ? 'Pausada' : campaign.status,
      objective: campaign.objective,
      dailyBudget: campaign.daily_budget ? formatCurrency(campaign.daily_budget / 100) : 'N/A',
      lifetimeBudget: campaign.lifetime_budget ? formatCurrency(campaign.lifetime_budget / 100) : 'N/A',
      spend: campaign.insights?.spend ? formatCurrency(parseFloat(campaign.insights.spend)) : 'R$ 0,00',
      impressions: campaign.insights?.impressions ? parseInt(campaign.insights.impressions).toLocaleString('pt-BR') : '0',
      clicks: campaign.insights?.clicks ? parseInt(campaign.insights.clicks).toLocaleString('pt-BR') : '0',
      cpc: campaign.insights?.cpc ? formatCurrency(parseFloat(campaign.insights.cpc)) : 'N/A',
      cpm: campaign.insights?.cpm ? formatCurrency(parseFloat(campaign.insights.cpm)) : 'N/A',
      ctr: campaign.insights?.ctr ? formatPercentage(parseFloat(campaign.insights.ctr) / 100) : 'N/A',
      reach: campaign.insights?.reach ? parseInt(campaign.insights.reach).toLocaleString('pt-BR') : 'N/A',
      conversions: campaign.insights?.conversions ? parseFloat(campaign.insights.conversions).toFixed(0) : '0',
      conversionValue: campaign.insights?.conversion_values ? formatCurrency(parseFloat(campaign.insights.conversion_values)) : 'R$ 0,00',
      cpa: campaign.insights?.cost_per_action_type ? formatCurrency(parseFloat(campaign.insights.cost_per_action_type[0]?.value || '0')) : 'N/A',
      roas: campaign.insights?.purchase_roas ? parseFloat(campaign.insights.purchase_roas[0]?.value || '0').toFixed(2) : 'N/A',
      // Campos calculados/personalizados (podem ser implementados com lógica de negócio)
      grossRevenue: 'N/A',
      profit: 'R$ 0,00',
      netRevenue: 'R$ 0,00',
      roi: 'N/A',
      profitMargin: 'N/A'
    };
  });

  // Calcular totais para a linha de resumo
  const totals = campaigns.reduce((acc, campaign) => {
    console.log('🧮 Calculando totais para campanha:', campaign.name);
    console.log('📊 Insights da campanha:', campaign.insights);
    
    // Somar gastos diretamente dos insights originais
    const spend = campaign.insights?.spend ? parseFloat(campaign.insights.spend) : 0;
    acc.totalSpend += spend;
    console.log('💰 Spend adicionado:', spend, 'Total atual:', acc.totalSpend);
    
    // Somar impressões
    const impressions = campaign.insights?.impressions ? parseInt(campaign.insights.impressions) : 0;
    acc.totalImpressions += impressions;
    console.log('👁️ Impressions adicionadas:', impressions, 'Total atual:', acc.totalImpressions);
    
    // Somar cliques
    const clicks = campaign.insights?.clicks ? parseInt(campaign.insights.clicks) : 0;
    acc.totalClicks += clicks;
    console.log('🖱️ Clicks adicionados:', clicks, 'Total atual:', acc.totalClicks);
    
    // Somar conversões
    const conversions = campaign.insights?.conversions ? parseFloat(campaign.insights.conversions) : 0;
    acc.totalConversions += conversions;
    console.log('🎯 Conversions adicionadas:', conversions, 'Total atual:', acc.totalConversions);
    
    // Somar valor de conversões
    const conversionValue = campaign.insights?.conversion_values ? parseFloat(campaign.insights.conversion_values) : 0;
    acc.totalConversionValue += conversionValue;
    console.log('💎 Conversion value adicionado:', conversionValue, 'Total atual:', acc.totalConversionValue);
    
    return acc;
  }, {
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalConversionValue: 0
  });
  
  console.log('🧮 === TOTAIS FINAIS CALCULADOS ===');
  console.log('💰 Total Spend:', totals.totalSpend);
  console.log('👁️ Total Impressions:', totals.totalImpressions);
  console.log('🖱️ Total Clicks:', totals.totalClicks);
  console.log('🎯 Total Conversions:', totals.totalConversions);
  console.log('💎 Total Conversion Value:', totals.totalConversionValue);

  const toggleFieldVisibility = (fieldKey: string) => {
    setVisibleFields(prev => 
      prev.map(field => 
        field.key === fieldKey ? { ...field, visible: !field.visible } : field
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {language === 'pt' ? 'Campanhas Meta Ads' : 'Meta Ads Campaigns'}
          </h1>
          <p className="text-gray-400">
            {language === 'pt' 
              ? 'Gerencie e monitore suas campanhas do Meta Ads com sincronização em tempo real' 
              : 'Manage and monitor your Meta Ads campaigns with real-time sync'
            }
          </p>
          {metaAuthData && (
            <div className="mt-2 text-sm text-green-400">
              📱 {language === 'pt' ? 'Conectado como:' : 'Connected as:'} {metaAuthData.userInfo?.name}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => {
              console.log('🧪 Teste manual - Estado atual:');
              console.log('metaAuthData:', metaAuthData);
              console.log('selectedAccount:', selectedAccount);
              console.log('adAccounts:', adAccounts);
              console.log('campaigns:', campaigns);
              if (metaAuthData?.accessToken) {
                console.log('🔄 Forçando busca de contas...');
                fetchAdAccounts();
              }
            }}
            variant="outline" 
            className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === 'pt' ? 'Testar' : 'Test'}
          </Button>
          
          <Button 
            onClick={async () => {
              console.log('🧪 === TESTE DIRETO DA API META ===');
              
              try {
                // Verificar se temos um token salvo
                const savedData = localStorage.getItem('metaAuthData');
                if (!savedData) {
                  console.error('❌ Nenhum dado do Meta encontrado no localStorage');
                  alert('Nenhuma conta Meta conectada. Vá para Contas ADS para conectar.');
                  return;
                }
                
                const metaData = JSON.parse(savedData);
                const token = metaData.accessToken;
                
                if (!token) {
                  console.error('❌ Token de acesso não encontrado');
                  alert('Token de acesso não encontrado nos dados salvos.');
                  return;
                }
                
                console.log('🔑 Token encontrado:', token.substring(0, 20) + '...');
                
                // Configurar o token no serviço
                console.log('⚙️ Configurando token no metaAdsService...');
                setAccessToken(token);
                
                // Testar o token
                console.log('🔍 Testando validade do token...');
                metaAdsService.setAccessToken(token);
                const tokenTest = await metaAdsService.testToken();
                console.log('✅ Token válido:', tokenTest);
                
                if (!tokenTest.valid) {
                  alert('Token inválido ou expirado. Reconecte sua conta Meta.');
                  return;
                }
                
                // Buscar contas de anúncio
                console.log('📊 Buscando contas de anúncio...');
                await fetchAdAccounts();
                
                console.log('🎉 Teste concluído! Verifique os logs acima.');
                
              } catch (error) {
                console.error('❌ Erro no teste da API:', error);
                alert('Erro no teste: ' + error.message);
              }
            }}
            variant="outline" 
            className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            {language === 'pt' ? 'Teste API' : 'API Test'}
          </Button>
          
          <Button 
            onClick={() => {
              console.log('🔍 === VERIFICAÇÃO COMPLETA DO LOCALSTORAGE ===');
              
              // Listar todas as chaves
              const allKeys = Object.keys(localStorage);
              console.log('📋 Todas as chaves no localStorage:', allKeys);
              
              // Verificar especificamente as chaves relacionadas ao Meta
              const metaKeys = ['metaAuthData', 'otmizy_meta_auth', 'meta_access_token', 'meta_auth'];
              
              metaKeys.forEach(key => {
                const data = localStorage.getItem(key);
                if (data) {
                  console.log(`✅ Dados encontrados em '${key}':`);
                  try {
                    const parsed = JSON.parse(data);
                    console.log('📊 Estrutura:', {
                      hasAccessToken: !!parsed.accessToken,
                      hasUserInfo: !!parsed.userInfo,
                      hasAdAccounts: !!parsed.adAccounts,
                      adAccountsCount: parsed.adAccounts?.data?.length || 0,
                      savedAt: parsed.savedAt ? new Date(parsed.savedAt).toLocaleString() : 'N/A'
                    });
                  } catch (e) {
                    console.log('📄 Dados (string):', data.substring(0, 100) + '...');
                  }
                } else {
                  console.log(`❌ Nenhum dado em '${key}'`);
                }
              });
              
              console.log('🔍 === FIM DA VERIFICAÇÃO ===');
            }}
            variant="outline" 
            className="border-green-500/20 text-green-400 hover:bg-green-500/10"
          >
            <Eye className="w-4 h-4 mr-2" />
            {language === 'pt' ? 'Ver Dados' : 'View Data'}
          </Button>
          <Button 
            onClick={() => setShowConfigDialog(true)}
            variant="outline" 
            className="border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            {language === 'pt' ? 'Configurar' : 'Configure'}
          </Button>
          <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
            <DialogContent className="max-w-2xl bg-gray-800 border-yellow-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">{language === 'pt' ? 'Configurar Campos da Tabela' : 'Configure Table Fields'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {visibleFields.map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={field.visible}
                      onCheckedChange={() => toggleFieldVisibility(field.key)}
                    />
                    <label className="text-sm text-white">{field.label}</label>
                  </div>
                ))}
              </div>
              <Button onClick={() => setShowConfigDialog(false)} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                {language === 'pt' ? 'Salvar' : 'Save'}
              </Button>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === 'pt' ? 'Nova Campanha' : 'New Campaign'}
          </Button>
        </div>
      </div>



      {/* Status de Carregamento */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-yellow-500 mr-2" />
          <span className="text-white">
            {language === 'pt' ? 'Carregando campanhas...' : 'Loading campaigns...'}
          </span>
        </div>
      )}

      {/* Mensagem de Erro */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Aviso se não há autenticação */}
      {!metaAuthData && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="flex items-center text-yellow-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>
              {language === 'pt' 
                ? 'Para visualizar campanhas reais, faça a autenticação do Meta Ads na página de Contas de Anúncios.' 
                : 'To view real campaigns, authenticate Meta Ads on the Ad Accounts page.'
              }
            </span>
          </div>
        </div>
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-gray-800 border-yellow-500/20">
          <DialogHeader>
            <DialogTitle className="text-white">{language === 'pt' ? 'Criar Nova Campanha' : 'Create New Campaign'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-white">{language === 'pt' ? 'Nome da Campanha' : 'Campaign Name'}</Label>
              <Input placeholder={language === 'pt' ? 'Digite o nome da campanha' : 'Enter campaign name'} className="bg-gray-700 border-yellow-500/20 text-white" />
            </div>
            <div>
              <Label className="text-white">{language === 'pt' ? 'ID da Conta Meta Ads' : 'Meta Ads Account ID'}</Label>
              <Input placeholder="act_123456789" className="bg-gray-700 border-yellow-500/20 text-white" />
            </div>
            <div>
              <Label className="text-white">{language === 'pt' ? 'ID da Campanha' : 'Campaign ID'}</Label>
              <Input placeholder="987654321" className="bg-gray-700 border-yellow-500/20 text-white" />
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
              {language === 'pt' ? 'Conectar e Importar' : 'Connect and Import'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Seção de Filtros - Sempre visível quando há autenticação */}
      {!loading && metaAuthData && (
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden mb-6">
          {/* Header da seção de filtros */}
          <div className="bg-gray-700/50 p-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                  🔍 {language === 'pt' ? 'Filtros de Campanhas' : 'Campaign Filters'}
                </span>
                <span className="text-sm text-gray-400">
                  {language === 'pt' ? 'Configure os filtros e carregue as campanhas' : 'Configure filters and load campaigns'}
                </span>
              </div>
              {selectedAccounts.length > 0 && campaigns.length > 0 && (
                <Button 
                  onClick={() => fetchCampaigns()}
                  variant="outline" 
                  size="sm"
                  className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                >
                  {language === 'pt' ? 'Atualizar' : 'Update'}
                </Button>
              )}
            </div>
          </div>

          {/* Filtros */}
          <div className="p-4 border-b border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {language === 'pt' ? 'Nome da Campanha' : 'Campaign Name'}
                </label>
                <Input 
                  placeholder={language === 'pt' ? 'Filtrar por nome' : 'Filter by name'}
                  className="bg-gray-700 border-gray-600 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {language === 'pt' ? 'Status da Campanha' : 'Campaign Status'}
                </label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm">
                    <SelectValue placeholder={language === 'pt' ? 'Qualquer' : 'Any'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'pt' ? 'Qualquer' : 'Any'}</SelectItem>
                    <SelectItem value="active">{language === 'pt' ? 'Ativa' : 'Active'}</SelectItem>
                    <SelectItem value="paused">{language === 'pt' ? 'Pausada' : 'Paused'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {language === 'pt' ? 'Período de Visualização' : 'View Period'}
                </label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm">
                    <SelectValue placeholder={language === 'pt' ? 'Hoje' : 'Today'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{language === 'pt' ? 'Hoje' : 'Today'}</SelectItem>
                    <SelectItem value="yesterday">{language === 'pt' ? 'Ontem' : 'Yesterday'}</SelectItem>
                    <SelectItem value="last_7_days">{language === 'pt' ? 'Últimos 7 dias' : 'Last 7 days'}</SelectItem>
                    <SelectItem value="last_30_days">{language === 'pt' ? 'Últimos 30 dias' : 'Last 30 days'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {language === 'pt' ? 'Conta de Anúncio' : 'Ad Account'}
                </label>
                {!loading && metaAuthData && adAccounts.length > 0 ? (
                  <div className="space-y-2">
                    {/* Checkbox para selecionar todas */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-filter"
                        checked={selectAll}
                        onCheckedChange={toggleSelectAll}
                        className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <label htmlFor="select-all-filter" className="text-xs text-gray-300 cursor-pointer">
                        {language === 'pt' ? 'Selecionar Todas' : 'Select All'}
                      </label>
                    </div>
                    
                    {/* Lista de contas */}
                    <div className="space-y-1 max-h-32 overflow-y-auto bg-gray-700 border border-gray-600 rounded p-2">
                      {adAccounts.map((account) => (
                        <div key={account.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`filter-${account.id}`}
                            checked={selectedAccounts.includes(account.id)}
                            onCheckedChange={() => toggleAccountSelection(account.id)}
                            className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <label htmlFor={`filter-${account.id}`} className="text-xs text-gray-300 cursor-pointer flex-1 truncate">
                            {account.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    {/* Botão para carregar campanhas */}
                     <Button
                       onClick={() => {
                         console.log('🎯 === BOTÃO CARREGAR CAMPANHAS CLICADO ===');
                         console.log('📊 Contas selecionadas:', selectedAccounts);
                         console.log('🔑 Token disponível:', !!metaAuthData?.accessToken);
                         console.log('📋 Número de contas:', selectedAccounts.length);
                         
                         if (selectedAccounts.length > 0) {
                           if (!metaAuthData?.accessToken) {
                             console.error('❌ Token de acesso não encontrado!');
                             alert('Token de acesso não encontrado. Reconecte sua conta Meta.');
                             return;
                           }
                           
                           console.log('🚀 Iniciando busca de campanhas APENAS para contas selecionadas:', selectedAccounts);
                           console.log('🔧 CORREÇÃO: Passando apenas as contas selecionadas, não todas as contas disponíveis');
                           
                           // CORREÇÃO: Usar apenas as contas selecionadas
                           fetchCampaigns(selectedAccounts);
                         } else {
                           console.warn('⚠️ Nenhuma conta selecionada!');
                           alert('Selecione pelo menos uma conta de anúncio.');
                         }
                       }}
                       disabled={selectedAccounts.length === 0 || loading}
                       size="sm"
                       className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                     >
                       {loading 
                         ? (language === 'pt' ? 'Carregando...' : 'Loading...') 
                         : (language === 'pt' ? `Carregar (${selectedAccounts.length})` : `Load (${selectedAccounts.length})`)
                       }
                     </Button>
                  </div>
                ) : (
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm">
                      <SelectValue placeholder={language === 'pt' ? 'Qualquer' : 'Any'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === 'pt' ? 'Qualquer' : 'Any'}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {language === 'pt' ? 'Produto' : 'Product'}
                </label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-sm">
                    <SelectValue placeholder={language === 'pt' ? 'Qualquer' : 'Any'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'pt' ? 'Qualquer' : 'Any'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando não há campanhas carregadas */}
      {!loading && metaAuthData && (selectedAccounts.length === 0 || campaigns.length === 0) && (
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                {language === 'pt' ? 'Nenhuma campanha carregada' : 'No campaigns loaded'}
              </h3>
              <p className="text-gray-400 text-sm">
                {selectedAccounts.length === 0 
                  ? (language === 'pt' ? 'Selecione uma ou mais contas de anúncio nos filtros acima e clique em "Carregar"' : 'Select one or more ad accounts in the filters above and click "Load"')
                  : (language === 'pt' ? 'Clique no botão "Carregar" nos filtros para buscar as campanhas' : 'Click the "Load" button in the filters to fetch campaigns')
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabela de Campanhas - Só aparece quando há campanhas carregadas */}
      {!loading && metaAuthData && selectedAccounts.length > 0 && campaigns.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
          {/* Header da tabela com informações */}
          <div className="bg-gray-700/50 p-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                  ✅ {language === 'pt' ? 'Todas as vendas trackeadas' : 'All sales tracked'}
                </span>
                <span className="text-sm text-gray-400">
                  {language === 'pt' ? 'Atualizado agora mesmo' : 'Updated just now'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Container com scroll horizontal apenas para as tabelas */}
          <div className="overflow-x-auto">
            {/* Linha de resumo */}
            <div className="bg-gray-700/30 border-b border-gray-600">
              <table className="min-w-full">
                <tbody>
                  <tr className="text-sm font-medium">
                    {visibleFields.filter(field => field.visible).map((field) => {
                      let value = 'N/A';
                      
                      switch(field.key) {
                        case 'name':
                          value = `${transformedCampaigns.length} CAMPANHAS`;
                          break;
                        case 'spend':
                          value = formatCurrency(totals.totalSpend);
                          break;
                        case 'impressions':
                          value = totals.totalImpressions.toLocaleString('pt-BR');
                          break;
                        case 'clicks':
                          value = totals.totalClicks.toLocaleString('pt-BR');
                          break;
                        case 'conversions':
                          value = totals.totalConversions.toFixed(0);
                          break;
                        case 'conversionValue':
                          value = formatCurrency(totals.totalConversionValue);
                          break;
                        default:
                          value = 'N/A';
                      }
                      
                      return (
                        <td key={field.key} className="px-6 py-3 text-gray-400">
                          {value}
                        </td>
                      );
                    })}
                    {/* Coluna vazia para alinhamento com a coluna de ações */}
                    <td className="px-6 py-3 text-gray-400 w-24">
                      {/* Espaço para alinhamento */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Tabela principal */}
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-700/50">
                <tr>
                  {visibleFields.filter(field => field.visible).map((field) => (
                    <th key={field.key} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      {field.label}
                    </th>
                  ))}
                  {/* Coluna de ações */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-24">
                    {language === 'pt' ? 'Ações' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/30 divide-y divide-gray-600">
                {transformedCampaigns.length > 0 ? transformedCampaigns.map((campaign, index) => (
                  <tr key={campaign.id || index} className="hover:bg-gray-700/30">
                    {visibleFields.filter(field => field.visible).map((field) => (
                      <td key={field.key} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {editingCampaign === campaign.id && field.editable ? (
                          <div className="flex items-center gap-2">
                            {field.key === 'status' ? (
                              <Select 
                                value={editValues[field.key] || campaign[field.key]}
                                onValueChange={(value) => setEditValues(prev => ({ ...prev, [field.key]: value }))}
                              >
                                <SelectTrigger className="w-24 h-8 bg-gray-700 border-gray-600">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Ativa">Ativa</SelectItem>
                                  <SelectItem value="Pausada">Pausada</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                value={editValues[field.key] || campaign[field.key]}
                                onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                                className="w-32 h-8 bg-gray-700 border-gray-600 text-white"
                              />
                            )}
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() => handleEditSave(campaign.id)}
                                disabled={syncStatus[campaign.id] === 'syncing'}
                                className="h-6 w-6 p-0 bg-green-600 hover:bg-green-700"
                              >
                                {syncStatus[campaign.id] === 'syncing' ? (
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                ) : syncStatus[campaign.id] === 'success' ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : syncStatus[campaign.id] === 'error' ? (
                                  <AlertCircle className="w-3 h-3" />
                                ) : (
                                  <Save className="w-3 h-3" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleEditCancel}
                                className="h-6 w-6 p-0 bg-gray-600 hover:bg-gray-700"
                              >
                                ✕
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div 
                            className={field.editable ? "cursor-pointer hover:bg-gray-600/30 p-1 rounded" : ""}
                            onClick={() => field.editable && handleEditStart(campaign.id, field.key, campaign[field.key])}
                          >
                            {field.key === 'status' ? (
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                campaign.status === 'Ativa' 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {campaign.status}
                              </span>
                            ) : (
                              campaign[field.key] || 'N/A'
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                    {/* Coluna de ações */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white w-24">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          onClick={() => handleEditStart(campaign.id, 'name', campaign.name)}
                          className="h-6 w-6 p-0 bg-blue-600 hover:bg-blue-700"
                          title={language === 'pt' ? 'Editar campanha' : 'Edit campaign'}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={visibleFields.filter(field => field.visible).length + 1} className="px-6 py-8 text-center text-gray-400">
                      {language === 'pt' ? 'Nenhuma campanha encontrada para as contas selecionadas' : 'No campaigns found for selected accounts'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pergunta sobre campanhas não aparecerem */}
          {transformedCampaigns.length === 0 && (
            <div className="p-4 border-t border-gray-600 bg-gray-700/30">
              <div className="flex items-center text-sm text-gray-400">
                <AlertCircle className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'Por que as campanhas não estão aparecendo?' : 'Why are campaigns not showing up?'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
