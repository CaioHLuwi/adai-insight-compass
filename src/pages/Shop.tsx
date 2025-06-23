import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '@/hooks/useAchievements';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShoppingCart, Eye } from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  description: string;
  descriptionTranslations: Record<string, string>;
  credits: number;
  moneyPrice: number;
  category: 'bracelet' | 'clothing' | 'caps';
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Shop = () => {
  const { totalCredits } = useAchievements();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [cart, setCart] = useState<ShopItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const shopItems: ShopItem[] = [
    {
      id: 'gold_bracelet',
      name: 'Gold Bracelet',
      nameTranslations: {
        en: 'Gold Bracelet',
        pt: 'Pulseira de Ouro',
        es: 'Pulsera de Oro',
        ru: 'Золотой браслет',
        de: 'Goldenes Armband'
      },
      description: 'Elegant gold bracelet with SafeAd.AI logo',
      descriptionTranslations: {
        en: 'Elegant gold bracelet with SafeAd.AI logo',
        pt: 'Pulseira elegante de ouro com logo SafeAd.AI',
        es: 'Elegante pulsera de oro con logo SafeAd.AI',
        ru: 'Элегантный золотой браслет с логотипом SafeAd.AI',
        de: 'Elegantes Goldarmband mit SafeAd.AI Logo'
      },
      credits: 150,
      moneyPrice: 299.99,
      category: 'bracelet',
      image: '/placeholder.svg',
      rarity: 'epic'
    },
    {
      id: 'premium_hoodie',
      name: 'Premium Hoodie',
      nameTranslations: {
        en: 'Premium Hoodie',
        pt: 'Moletom Premium',
        es: 'Sudadera Premium',
        ru: 'Премиум худи',
        de: 'Premium Hoodie'
      },
      description: 'High-quality hoodie with embroidered logo',
      descriptionTranslations: {
        en: 'High-quality hoodie with embroidered logo',
        pt: 'Moletom de alta qualidade com logo bordado',
        es: 'Sudadera de alta calidad con logo bordado',
        ru: 'Высококачественное худи с вышитым логотипом',
        de: 'Hochwertiger Hoodie mit besticktem Logo'
      },
      credits: 300,
      moneyPrice: 89.99,
      category: 'clothing',
      image: '/placeholder.svg',
      rarity: 'rare'
    },
    {
      id: 'snapback_cap',
      name: 'Snapback Cap',
      nameTranslations: {
        en: 'Snapback Cap',
        pt: 'Boné Snapback',
        es: 'Gorra Snapback',
        ru: 'Снэпбек кепка',
        de: 'Snapback Kappe'
      },
      description: 'Stylish snapback cap with metallic badge',
      descriptionTranslations: {
        en: 'Stylish snapback cap with metallic badge',
        pt: 'Boné snapback estiloso com badge metálico',
        es: 'Gorra snapback elegante con insignia metálica',
        ru: 'Стильная снэпбек кепка с металлическим значком',
        de: 'Stylische Snapback Kappe mit Metallabzeichen'
      },
      credits: 200,
      moneyPrice: 49.99,
      category: 'caps',
      image: '/placeholder.svg',
      rarity: 'rare'
    },
    {
      id: 'silver_bracelet',
      name: 'Silver Bracelet',
      nameTranslations: {
        en: 'Silver Bracelet',
        pt: 'Pulseira de Prata',
        es: 'Pulsera de Plata',
        ru: 'Серебряный браслет',
        de: 'Silbernes Armband'
      },
      description: 'Classic silver bracelet for everyday wear',
      descriptionTranslations: {
        en: 'Classic silver bracelet for everyday wear',
        pt: 'Pulseira clássica de prata para uso diário',
        es: 'Pulsera clásica de plata para uso diario',
        ru: 'Классический серебряный браслет для повседневной носки',
        de: 'Klassisches Silberarmband für den täglichen Gebrauch'
      },
      credits: 80,
      moneyPrice: 149.99,
      category: 'bracelet',
      image: '/placeholder.svg',
      rarity: 'common'
    },
    {
      id: 'basic_tshirt',
      name: 'Basic T-Shirt',
      nameTranslations: {
        en: 'Basic T-Shirt',
        pt: 'Camiseta Básica',
        es: 'Camiseta Básica',
        ru: 'Базовая футболка',
        de: 'Basic T-Shirt'
      },
      description: 'Comfortable cotton t-shirt with printed logo',
      descriptionTranslations: {
        en: 'Comfortable cotton t-shirt with printed logo',
        pt: 'Camiseta confortável de algodão com logo impresso',
        es: 'Camiseta cómoda de algodón con logo impreso',
        ru: 'Удобная хлопковая футболка с напечатанным логотипом',
        de: 'Bequemes Baumwoll-T-Shirt mit gedrucktem Logo'
      },
      credits: 120,
      moneyPrice: 29.99,
      category: 'clothing',
      image: '/placeholder.svg',
      rarity: 'common'
    },
    {
      id: 'baseball_cap',
      name: 'Baseball Cap',
      nameTranslations: {
        en: 'Baseball Cap',
        pt: 'Boné de Baseball',
        es: 'Gorra de Béisbol',
        ru: 'Бейсбольная кепка',
        de: 'Baseball Kappe'
      },
      description: 'Classic baseball cap with adjustable strap',
      descriptionTranslations: {
        en: 'Classic baseball cap with adjustable strap',
        pt: 'Boné clássico de baseball com alça ajustável',
        es: 'Gorra clásica de béisbol con correa ajustable',
        ru: 'Классическая бейсбольная кепка с регулируемым ремешком',
        de: 'Klassische Baseball-Kappe mit verstellbarem Riemen'
      },
      credits: 100,
      moneyPrice: 24.99,
      category: 'caps',
      image: '/placeholder.svg',
      rarity: 'common'
    }
  ];

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      shop: {
        en: 'Shop',
        pt: 'Loja',
        es: 'Tienda',
        ru: 'Магазин',
        de: 'Shop'
      },
      addToCart: {
        en: 'Add to Cart',
        pt: 'Adicionar ao Carrinho',
        es: 'Añadir al Carrito',
        ru: 'Добавить в корзину',
        de: 'In den Warenkorb'
      },
      buyNow: {
        en: 'Buy Now',
        pt: 'Comprar Agora',
        es: 'Comprar Ahora',
        ru: 'Купить сейчас',
        de: 'Jetzt kaufen'
      },
      viewDetails: {
        en: 'View Details',
        pt: 'Ver Detalhes',
        es: 'Ver Detalles',
        ru: 'Подробности',
        de: 'Details anzeigen'
      },
      cart: {
        en: 'Cart',
        pt: 'Carrinho',
        es: 'Carrito',
        ru: 'Корзина',
        de: 'Warenkorb'
      },
      checkout: {
        en: 'Checkout',
        pt: 'Finalizar Compra',
        es: 'Finalizar Compra',
        ru: 'Оформить заказ',
        de: 'Zur Kasse'
      },
      totalCredits: {
        en: 'Your Credits',
        pt: 'Seus Créditos',
        es: 'Tus Créditos',
        ru: 'Ваши кредиты',
        de: 'Deine Credits'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const getItemName = (item: ShopItem) => {
    return item.nameTranslations[language] || item.nameTranslations['en'] || item.name;
  };

  const getItemDescription = (item: ShopItem) => {
    return item.descriptionTranslations[language] || item.descriptionTranslations['en'] || item.description;
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'text-gray-400 border-gray-400',
      rare: 'text-blue-400 border-blue-400',
      epic: 'text-purple-400 border-purple-400',
      legendary: 'text-yellow-400 border-yellow-400'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const addToCart = (item: ShopItem) => {
    setCart(prev => [...prev, item]);
  };

  const buyNow = (item: ShopItem) => {
    navigate(`/checkout/${item.id}`);
  };

  const viewDetails = (item: ShopItem) => {
    navigate(`/shop/item/${item.id}`);
  };

  const goToCheckout = () => {
    navigate('/checkout/cart');
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="animated-bg"></div>
      
      {/* Fixed Cart Icon */}
      <div className="fixed top-20 right-6 z-50">
        <div 
          className="relative"
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
        >
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          
          {showCart && cart.length > 0 && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 rounded-lg border border-yellow-500/20 shadow-xl">
              <div className="p-4">
                <h3 className="text-white font-semibold mb-3">{getText('cart')}</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                      <img src={item.image} alt={getItemName(item)} className="w-10 h-10 rounded" />
                      <div className="flex-1">
                        <p className="text-white text-sm">{getItemName(item)}</p>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-400 text-xs">{item.credits}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={goToCheckout}
                  className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  {getText('checkout')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div className="relative mb-8 h-64 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden">
          <img 
            src="/placeholder.svg" 
            alt="Shop Banner" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {getText('shop')}
            </h1>
          </div>
        </div>

        {/* Credits Display */}
        <div className="mb-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-yellow-400 font-semibold">{getText('totalCredits')}:</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold text-white">{totalCredits.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map((item) => (
            <Card key={item.id} className="bg-gray-800/80 border-yellow-500/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="pb-2">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={getItemName(item)} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge className={`absolute top-2 right-2 ${getRarityColor(item.rarity)}`}>
                    {item.rarity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-white mb-2">{getItemName(item)}</CardTitle>
                <p className="text-gray-300 text-sm mb-4">{getItemDescription(item)}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">{item.credits}</span>
                    </div>
                    <span className="text-gray-400 text-sm">${item.moneyPrice}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    onClick={() => addToCart(item)}
                    variant="outline"
                    className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                    disabled={totalCredits < item.credits}
                  >
                    {getText('addToCart')}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => buyNow(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                      disabled={totalCredits < item.credits}
                    >
                      {getText('buyNow')}
                    </Button>
                    <Button 
                      onClick={() => viewDetails(item)}
                      variant="outline"
                      className="border-gray-500 hover:bg-gray-700 text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
