
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, CreditCard, Edit, Trash2, Lock, Calendar, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Subscription = () => {
  const { language } = useLanguage();
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [showHolderDialog, setShowHolderDialog] = useState(false);
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        {language === 'pt' ? 'Assinatura' : 'Subscription'}
      </h1>

      {/* Credit Cards Section */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-orange-600" />
              {language === 'pt' ? 'Cartões de Crédito' : 'Credit Cards'}
            </CardTitle>
            <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Adicionar Cartão' : 'Add Card'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{language === 'pt' ? 'Adicionar Cartão de Crédito' : 'Add Credit Card'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Animated Card Preview */}
                  <div className="relative w-full h-48 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-xl">
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-orange-300 rounded-full opacity-70"></div>
                      <div className="w-8 h-8 bg-orange-200 rounded-full opacity-50 -mt-6 ml-4"></div>
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
                    <Label>{language === 'pt' ? 'Número do Cartão' : 'Card Number'}</Label>
                    <Input 
                      value={cardData.number}
                      onChange={(e) => setCardData({...cardData, number: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{language === 'pt' ? 'Data de Validade' : 'Expiry Date'}</Label>
                      <Input 
                        value={cardData.expiryDate}
                        onChange={(e) => setCardData({...cardData, expiryDate: formatExpiryDate(e.target.value)})}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input 
                        value={cardData.cvv}
                        onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                        placeholder="123"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>{language === 'pt' ? 'Nome do Portador' : 'Cardholder Name'}</Label>
                    <Input 
                      value={cardData.holderName}
                      onChange={(e) => setCardData({...cardData, holderName: e.target.value.toUpperCase()})}
                      placeholder={language === 'pt' ? 'NOME COMO NO CARTÃO' : 'NAME AS ON CARD'}
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600">
                    {language === 'pt' ? 'Salvar Cartão' : 'Save Card'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditCards.map((card) => (
              <div key={card.id} className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                {card.isDefault && (
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {language === 'pt' ? 'Padrão' : 'Default'}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">**** **** **** {card.last4}</div>
                    <div className="text-sm text-gray-500">{card.brand}</div>
                    <div className="text-sm text-gray-500">{card.holderName}</div>
                    <div className="text-sm text-gray-500">{card.expiry}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
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
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              {language === 'pt' ? 'Informações do Titular' : 'Holder Information'}
            </CardTitle>
            <Dialog open={showHolderDialog} onOpenChange={setShowHolderDialog}>
              <DialogTrigger asChild>
                <Button 
                  disabled={!canEditHolder()}
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{language === 'pt' ? 'Editar Informações do Titular' : 'Edit Holder Information'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{language === 'pt' ? 'Nome Completo' : 'Full Name'}</Label>
                    <Input value={holderData.fullName} onChange={(e) => setHolderData({...holderData, fullName: e.target.value})} />
                  </div>
                  <div>
                    <Label>{language === 'pt' ? 'CPF/CNPJ' : 'Tax ID'}</Label>
                    <Input value={holderData.document} onChange={(e) => setHolderData({...holderData, document: e.target.value})} />
                  </div>
                  <div>
                    <Label>{language === 'pt' ? 'Endereço' : 'Address'}</Label>
                    <Input value={holderData.address} onChange={(e) => setHolderData({...holderData, address: e.target.value})} />
                  </div>
                  <div>
                    <Label>CEP</Label>
                    <Input value={holderData.zipCode} onChange={(e) => setHolderData({...holderData, zipCode: e.target.value})} />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
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
              <Label className="text-sm text-gray-500">{language === 'pt' ? 'Nome Completo' : 'Full Name'}</Label>
              <div className="font-medium">{holderData.fullName}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">{language === 'pt' ? 'CPF/CNPJ' : 'Tax ID'}</Label>
              <div className="font-medium">{holderData.document}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">{language === 'pt' ? 'Endereço' : 'Address'}</Label>
              <div className="font-medium">{holderData.address}</div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">CEP</Label>
              <div className="font-medium">{holderData.zipCode}</div>
            </div>
          </div>
          {!canEditHolder() && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
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
