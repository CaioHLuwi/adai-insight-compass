
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAchievements } from '@/hooks/useAchievements';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  description: string;
  descriptionTranslations: Record<string, string>;
  credits: number;
  moneyPrice: number;
  category: 'bracelet' | 'clothing' | 'caps';
  images: string[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  specifications: Record<string, string>;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { totalCredits } = useAchievements();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Sample product data (in real app, this would come from an API)
  const products: Record<string, ShopItem> = {
    'gold_bracelet': {
      id: 'gold_bracelet',
      name: 'Gold Bracelet',
      nameTranslations: {
        en: 'Gold Bracelet',
        pt: 'Pulseira de Ouro',
        es: 'Pulsera de Oro',
        ru: 'Золотой браслет',
        de: 'Goldenes Armband'
      },
      description: 'Elegant gold bracelet with SafeAd.AI logo, crafted from premium materials',
      descriptionTranslations: {
        en: 'Elegant gold bracelet with Otmizy.AI logo, crafted from premium materials with attention to detail. This luxurious piece represents your achievement and success in digital marketing.',
        pt: 'Pulseira elegante de ouro com logo Otmizy.AI, confeccionada com materiais premium e atenção aos detalhes. Esta peça luxuosa representa sua conquista e sucesso em marketing digital.',
        es: 'Elegante pulsera de oro con logo Otmizy.AI, elaborada con materiales premium y atención al detalle. Esta pieza lujosa representa tu logro y éxito en marketing digital.',
        ru: 'Элегантный золотой браслет с логотипом Otmizy.AI, изготовленный из премиальных материалов с вниманием к деталям. Эта роскошная вещь представляет ваши достижения и успех в цифровом маркетинге.',
        de: 'Elegantes Goldarmband mit Otmizy.AI Logo, gefertigt aus hochwertigen Materialien mit Liebe zum Detail. Dieses luxuriöse Stück repräsentiert Ihre Leistung und Ihren Erfolg im digitalen Marketing.'
      },
      credits: 150,
      moneyPrice: 299.99,
      category: 'bracelet',
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      rarity: 'epic',
      specifications: {
        material: '18k Gold Plated',
        weight: '25g',
        size: 'Adjustable',
        warranty: '1 Year'
      }
    },
    'premium_hoodie': {
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
        en: 'High-quality hoodie with embroidered Otmizy.AI logo, made from premium cotton blend for ultimate comfort and style.',
        pt: 'Moletom de alta qualidade com logo Otmizy.AI bordado, feito de mistura de algodão premium para máximo conforto e estilo.',
        es: 'Sudadera de alta calidad con logo Otmizy.AI bordado, hecha de mezcla de algodón premium para máxima comodidad y estilo.',
        ru: 'Высококачественное худи с вышитым логотипом Otmizy.AI, изготовленное из премиальной хлопковой смеси для максимального комфорта и стиля.',
        de: 'Hochwertiger Hoodie mit besticktem Otmizy.AI Logo, aus Premium-Baumwollmischung für ultimativen Komfort und Stil.'
      },
      credits: 300,
      moneyPrice: 89.99,
      category: 'clothing',
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      rarity: 'rare',
      specifications: {
        material: '80% Cotton, 20% Polyester',
        sizes: 'S, M, L, XL, XXL',
        care: 'Machine Wash Cold',
        fit: 'Regular Fit'
      }
    }
  };

  const product = products[id || ''];

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      backToShop: {
        en: 'Back to Shop',
        pt: 'Voltar à Loja',
        es: 'Volver a la Tienda',
        ru: 'Назад в магазин',
        de: 'Zurück zum Shop'
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
      specifications: {
        en: 'Specifications',
        pt: 'Especificações',
        es: 'Especificaciones',
        ru: 'Характеристики',
        de: 'Spezifikationen'
      },
      quantity: {
        en: 'Quantity',
        pt: 'Quantidade',
        es: 'Cantidad',
        ru: 'Количество',
        de: 'Menge'
      },
      notEnoughCredits: {
        en: 'Not enough credits',
        pt: 'Créditos insuficientes',
        es: 'No hay suficientes créditos',
        ru: 'Недостаточно кредитов',
        de: 'Nicht genug Credits'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const getProductName = () => {
    return product.nameTranslations[language] || product.nameTranslations['en'] || product.name;
  };

  const getProductDescription = () => {
    return product.descriptionTranslations[language] || product.descriptionTranslations['en'] || product.description;
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

  const totalPrice = product.credits * quantity;
  const canAfford = totalCredits >= totalPrice;

  return (
    <div className="min-h-screen bg-black">
      <div className="animated-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/shop')}
          variant="outline"
          className="mb-6 border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {getText('backToShop')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[selectedImage]} 
                alt={getProductName()}
                className={`w-full h-96 object-cover rounded-lg cursor-zoom-in transition-transform duration-300 ${isZoomed ? 'scale-125' : 'scale-100'}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              />
              <Badge className={`absolute top-4 right-4 ${getRarityColor(product.rarity)}`}>
                {product.rarity}
              </Badge>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-yellow-500' : 'border-gray-600'
                  }`}
                >
                  <img src={image} alt={`${getProductName()} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{getProductName()}</h1>
              <p className="text-gray-300">{getProductDescription()}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">{product.credits}</span>
                  <span className="text-gray-400">credits</span>
                </div>
                <span className="text-gray-400">or ${product.moneyPrice}</span>
              </div>
              <p className="text-sm text-gray-500">
                Your credits: <span className="text-yellow-400">{totalCredits.toLocaleString()}</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-white font-medium">{getText('quantity')}</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-gray-600 text-gray-300"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-white font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gray-600 text-gray-300"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Total: <span className="text-yellow-400">{totalPrice} credits</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                disabled={!canAfford}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {getText('addToCart')}
              </Button>
              <Button 
                variant="outline"
                className="w-full border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                disabled={!canAfford}
              >
                {getText('buyNow')}
              </Button>
              {!canAfford && (
                <p className="text-red-400 text-sm text-center">{getText('notEnoughCredits')}</p>
              )}
            </div>

            {/* Specifications */}
            <Card className="bg-gray-800/50 border-gray-600">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-3">{getText('specifications')}</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
