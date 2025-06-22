import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Edit, Trash2, Lock, Calendar, User, Crown, Check, Star, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Subscription = () => {
  const { language } = useLanguage();
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [showHolderDialog, setShowHolderDialog] = useState(false);
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  
  const plans = [
    {
      id: 'basic',
      name: language === 'pt' ? 'Básico' : 'Basic',
      price: 99,
      features: [
        language === 'pt' ? '5 contas Google Ads' : '5 Google Ads accounts',
        language === 'pt' ? 'Relatórios básicos' : 'Basic reports',
        language === 'pt' ? 'Suporte por email' : 'Email support',
        language === 'pt' ? 'Dashboard padrão' : 'Standard dashboard'
      ],
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'intermediate',
      name: language === 'pt' ? 'Intermediário' : 'Intermediate',
      price: 199,
      features: [
        language === 'pt' ? '20 contas Google Ads' : '20 Google Ads accounts',
        language === 'pt' ? 'Relatórios avançados' : 'Advanced reports',
        language === 'pt' ? 'Suporte prioritário' : 'Priority support',
        language === 'pt' ? 'Análises em tempo real' : 'Real-time analytics',
        language === 'pt' ? 'Automação básica' : 'Basic automation'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 299,
      features: [
        language === 'pt' ? 'Contas Google Ads ilimitadas' : 'Unlimited Google Ads accounts',
        language === 'pt' ? 'Análises avançadas e relatórios' : 'Advanced analytics & reports',
        language === 'pt' ? 'Otimização com IA' : 'AI-powered optimization',
        language === 'pt' ? 'Suporte prioritário' : 'Priority support',
        language === 'pt' ? 'Integrações personalizadas' : 'Custom integrations',
        language === 'pt' ? 'Soluções white-label' : 'White-label solutions'
      ],
      color: 'from-yellow-400 to-yellow-600',
      popular: true
    }
  ];

  const [cardData, setCardData] = useState({
    number: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });

  const [holderData, setHolderData] = useState({
    fullName: 'João Silva',
    document: '123.456.789-00',
    address: 'Rua das Flores, 123',
    zipCode: '01234-567',
    lastEdit: '2024-06-14'
  });

  const [activePlan] = useState({
    name: 'Professional',
    price: 299,
    billing: 'monthly',
    features: [
      'Unlimited Google Ads accounts',
      'Advanced analytics & reports',
      'AI-powered optimization',
      'Priority support',
      'Custom integrations',
      'White-label solutions'
    ]
  });

  const creditCards = [
    {
      id: 1,
      last4: '4532',
      brand: 'Visa',
      holderName: 'JOAO SILVA',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      last4: '1234',
      brand: 'Mastercard',
      holderName: 'JOAO SILVA',
      expiry: '08/25',
      isDefault: false
    }
  ];

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return cleaned;
    }
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const canEditHolder = () => {
    const lastEdit = new Date(holderData.lastEdit);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return lastEdit < weekAgo;
  };

  const handleSaveCard = () => {
    console.log('Saving card:', cardData);
    setShowCardDialog(false);
    setCardData({ number: '', expiryDate: '', cvv: '', holderName: '' });
  };

  const handleSaveHolder = () => {
    console.log('Saving holder data:', holderData);
    setHolderData({
      ...holderData,
      lastEdit: new Date().toISOString().split('T')[0]
    });
    setShowHolderDialog(false);
  };

  const handleEditCard = (cardId: number) => {
    setEditingCard(cardId);
    const card = creditCards.find(c => c.id === cardId);
    if (card) {
      setCardData({
        number: '**** **** **** ' + card.last4,
        expiryDate: card.expiry,
        cvv: '',
        holderName: card.holderName
      });
      setShowCardDialog(true);
    }
  };

  const handleDeleteCard = (cardId: number) => {
    console.log('Deleting card:', cardId);
    // Delete logic would go here
  };

  const handleChangePlan = (planId: string) => {
    console.log('Changing to plan:', planId);
    setShowPlanDialog(false);
  };

  const handleCancelSubscription = () => {
    console.log('Canceling subscription...');
    setShowCancelDialog(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {language === 'pt' ? 'Assinatura' : 'Subscription'}
      </h1>

      {/* Active Plan Card */}
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  {language === 'pt' ? 'Plano Ativo' : 'Active Plan'}
                </CardTitle>
                <p className="text-gray-300">
                  {activePlan.name} - ${activePlan.price}/{language === 'pt' ? 'mês' : 'month'}
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold">
              {language === 'pt' ? 'ATIVO' : 'ACTIVE'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                {language === 'pt' ? 'Benefícios Inclusos' : 'Included Benefits'}
              </h4>
              <ul className="space-y-2">
                {activePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="w-4 h-4 mr-2 text-yellow-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-3">
              <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700 font-semibold">
                    {language === 'pt' ? 'Alterar Plano' : 'Change Plan'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-yellow-500/20 max-w-4xl">
                  <DialogHeader>
                    <DialogTitle className="text-white text-2xl text-center">
                      {language === 'pt' ? 'Escolha seu Plano' : 'Choose Your Plan'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
                    {plans.map((plan) => (
                      <Card key={plan.id} className={`relative bg-gray-700 border-gray-600 ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold">
                              {language === 'pt' ? 'MAIS POPULAR' : 'MOST POPULAR'}
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mb-4`}>
                            <Crown className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                          <div className="text-3xl font-bold text-white">
                            ${plan.price}
                            <span className="text-base font-normal text-gray-400">/{language === 'pt' ? 'mês' : 'month'}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-300">
                                <Check className="w-4 h-4 mr-2 text-yellow-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button 
                            onClick={() => handleChangePlan(plan.id)}
                            className={`w-full bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}
                          >
                            {language === 'pt' ? 'Escolher Plano' : 'Choose Plan'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
                    {language === 'pt' ? 'Cancelar Assinatura' : 'Cancel Subscription'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-red-500/20">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl flex items-center">
                      <X className="w-6 h-6 mr-2 text-red-400" />
                      {language === 'pt' ? 'Cancelar Assinatura' : 'Cancel Subscription'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {language === 'pt' 
                        ? 'Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos seguintes benefícios:'
                        : 'Are you sure you want to cancel your subscription? You will lose access to the following benefits:'
                      }
                    </p>
                    <ul className="space-y-2">
                      {activePlan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-red-300">
                          <X className="w-4 h-4 mr-2 text-red-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <p className="text-yellow-400 text-sm">
                        {language === 'pt' 
                          ? 'Sua assinatura será cancelada no final do período atual (31/01/2024)'
                          : 'Your subscription will be canceled at the end of the current period (01/31/2024)'
                        }
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCancelDialog(false)}
                        className="flex-1"
                      >
                        {language === 'pt' ? 'Manter Assinatura' : 'Keep Subscription'}
                      </Button>
                      <Button 
                        onClick={handleCancelSubscription}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        {language === 'pt' ? 'Confirmar Cancelamento' : 'Confirm Cancellation'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Cards Section */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-white">
              <CreditCard className="w-5 h-5 text-yellow-400" />
              {language === 'pt' ? 'Cartões de Crédito' : 'Credit Cards'}
            </CardTitle>
            <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Adicionar Cartão' : 'Add Card'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-yellow-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingCard ? 
                      (language === 'pt' ? 'Editar Cartão de Crédito' : 'Edit Credit Card') :
                      (language === 'pt' ? 'Adicionar Cartão de Crédito' : 'Add Credit Card')
                    }
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Animated Card Preview */}
                  <div className="relative w-full h-48 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-6 text-gray-900 shadow-xl">
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-yellow-300 rounded-full opacity-70"></div>
                      <div className="w-8 h-8 bg-yellow-200 rounded-full opacity-50 -mt-6 ml-4"></div>
                    </div>
                    <div className="mt-8">
                      <div className="text-lg tracking-wider">
                        {cardData.number || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between mt-4">
                        <div>
                          <div className="text-xs opacity-75">{language === 'pt' ? 'PORTADOR' : 'CARDHOLDER'}</div>
                          <div className="text-sm">{cardData.holderName || 'NOME DO PORTADOR'}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-75">{language === 'pt' ? 'VÁLIDO ATÉ' : 'VALID THRU'}</div>
                          <div className="text-sm">{cardData.expiryDate || 'MM/AA'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">{language === 'pt' ? 'Número do Cartão' : 'Card Number'}</Label>
                    <Input 
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="bg-gray-700 border-yellow-500/20 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">{language === 'pt' ? 'Data de Validade' : 'Expiry Date'}</Label>
                      <Input 
                        value={cardData.expiryDate}
                        onChange={(e) => setCardData({...cardData, expiryDate: formatExpiryDate(e.target.value)})}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="bg-gray-700 border-yellow-500/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">CVV</Label>
                      <Input 
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                        placeholder="123"
                        maxLength={4}
                        type="password"
                        className="bg-gray-700 border-yellow-500/20 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">{language === 'pt' ? 'Nome do Portador' : 'Cardholder Name'}</Label>
                    <Input 
                      value={cardData.holderName}
                      onChange={(e) => setCardData({...cardData, holderName: e.target.value.toUpperCase()})}
                      placeholder={language === 'pt' ? 'NOME COMO NO CARTÃO' : 'NAME AS ON CARD'}
                      className="bg-gray-700 border-yellow-500/20 text-white"
                    />
                  </div>
                  <Button 
                    onClick={handleSaveCard}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700"
                  >
                    {editingCard ? 
                      (language === 'pt' ? 'Atualizar Cartão' : 'Update Card') :
                      (language === 'pt' ? 'Salvar Cartão' : 'Save Card')
                    }
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditCards.map((card) => (
              <div key={card.id} className="relative bg-gray-700/50 rounded-lg p-4 border border-gray-600 shadow-sm">
                {card.isDefault && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">
                    {language === 'pt' ? 'Padrão' : 'Default'}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">**** **** **** {card.last4}</div>
                    <div className="text-sm text-gray-300">{card.brand}</div>
                    <div className="text-sm text-gray-300">{card.holderName}</div>
                    <div className="text-sm text-gray-300">{card.expiry}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                      onClick={() => handleEditCard(card.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Holder Information Section */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="w-5 h-5 text-yellow-400" />
              {language === 'pt' ? 'Informações do Titular' : 'Holder Information'}
            </CardTitle>
            <Dialog open={showHolderDialog} onOpenChange={setShowHolderDialog}>
              <DialogTrigger asChild>
                <Button 
                  disabled={!canEditHolder()}
                  variant="outline"
                  className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400 disabled:opacity-50"
                >
                  {canEditHolder() ? (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Editar' : 'Edit'}
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Bloqueado' : 'Locked'}
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-yellow-500/20">
                <DialogHeader>
                  <DialogTitle className="text-white">{language === 'pt' ? 'Editar Informações do Titular' : 'Edit Holder Information'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">{language === 'pt' ? 'Nome Completo' : 'Full Name'}</Label>
                    <Input 
                      value={holderData.fullName} 
                      onChange={(e) => setHolderData({...holderData, fullName: e.target.value})}
                      className="bg-gray-700 border-yellow-500/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">{language === 'pt' ? 'CPF/CNPJ' : 'Tax ID'}</Label>
                    <Input 
                      value={holderData.document} 
                      onChange={(e) => setHolderData({...holderData, document: e.target.value})}
                      className="bg-gray-700 border-yellow-500/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">{language === 'pt' ? 'Endereço' : 'Address'}</Label>
                    <Input 
                      value={holderData.address} 
                      onChange={(e) => setHolderData({...holderData, address: e.target.value})}
                      className="bg-gray-700 border-yellow-500/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">CEP</Label>
                    <Input 
                      value={holderData.zipCode} 
                      onChange={(e) => setHolderData({...holderData, zipCode: e.target.value})}
                      className="bg-gray-700 border-yellow-500/20 text-white"
                    />
                  </div>
                  <Button 
                    onClick={handleSaveHolder}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700"
                  >
                    {language === 'pt' ? 'Salvar Alterações' : 'Save Changes'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-400">{language === 'pt' ? 'Nome Completo' : 'Full Name'}</Label>
              <div className="font-medium text-white">{holderData.fullName}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-400">{language === 'pt' ? 'CPF/CNPJ' : 'Tax ID'}</Label>
              <div className="font-medium text-white">{holderData.document}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-400">{language === 'pt' ? 'Endereço' : 'Address'}</Label>
              <div className="font-medium text-white">{holderData.address}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-400">CEP</Label>
              <div className="font-medium text-white">{holderData.zipCode}</div>
            </div>
          </div>
          {!canEditHolder() && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm">
                  {language === 'pt' 
                    ? `Próxima edição disponível em: ${new Date(new Date(holderData.lastEdit).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
                    : `Next edit available on: ${new Date(new Date(holderData.lastEdit).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscription;
