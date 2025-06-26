
import React from 'react';
import { 
  Target, 
  ShoppingCart, 
  CreditCard, 
  Zap, 
  Globe, 
  ShoppingBag, 
  DollarSign, 
  Store, 
  Wallet, 
  Building2,
  Package,
  TrendingUp,
  Coins,
  Banknote,
  MonitorSpeaker,
  Smartphone,
  Laptop,
  Users,
  Award,
  Star,
  Crown,
  Shield,
  Lock,
  Gift,
  Diamond
} from 'lucide-react';

const PlatformsCarousel = () => {
  const platformsLine1 = [
    { name: 'Hubla', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'OctusPay', icon: <CreditCard className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Payt', icon: <Wallet className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'TriboPay', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Vega', icon: <Star className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Pepper', icon: <Zap className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Ticto', icon: <Smartphone className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Monetizze', icon: <DollarSign className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Kirvano', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Lastlink', icon: <Globe className="w-6 h-6" />, color: 'text-gray-400' },
  ];

  const platformsLine2 = [
    { name: 'Clickbank', icon: <Banknote className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Cartpanda', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Guru', icon: <Award className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Greenn', icon: <TrendingUp className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Yampi', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Adoorei', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Braip', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'BuyGoods', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Appmax', icon: <Smartphone className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Woocommerce', icon: <Store className="w-6 h-6" />, color: 'text-gray-400' },
  ];

  const platformsLine3 = [
    { name: 'Digistore', icon: <Store className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Logzz', icon: <Package className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'MundPay', icon: <Globe className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'StrivPay', icon: <TrendingUp className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Systeme', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Disrupty', icon: <Zap className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Pantherfy', icon: <Crown className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'CinqPay', icon: <CreditCard className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Zouti', icon: <Globe className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'NitroPagamentos', icon: <Zap className="w-6 h-6" />, color: 'text-gray-400' },
  ];

  const renderPlatformLine = (platforms: typeof platformsLine1, animationClass: string) => (
    <div className={`flex ${animationClass} space-x-8 mb-8`}>
      {/* First set */}
      {platforms.map((platform, index) => (
        <div
          key={`first-${index}`}
          className="flex-shrink-0 bg-gray-800/50 border border-yellow-500/20 rounded-lg px-6 py-4 hover:bg-gray-800/70 transition-colors"
        >
          <div className={`flex items-center space-x-3 ${platform.color}`}>
            {platform.icon}
            <span className="text-lg font-semibold whitespace-nowrap">
              {platform.name}
            </span>
          </div>
        </div>
      ))}
      {/* Duplicate set for seamless loop */}
      {platforms.map((platform, index) => (
        <div
          key={`second-${index}`}
          className="flex-shrink-0 bg-gray-800/50 border border-yellow-500/20 rounded-lg px-6 py-4 hover:bg-gray-800/70 transition-colors"
        >
          <div className={`flex items-center space-x-3 ${platform.color}`}>
            {platform.icon}
            <span className="text-lg font-semibold whitespace-nowrap">
              {platform.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden py-8">
      {renderPlatformLine(platformsLine1, 'animate-scroll-left')}
      {renderPlatformLine(platformsLine2, 'animate-scroll-right')}
      {renderPlatformLine(platformsLine3, 'animate-scroll-left')}
    </div>
  );
};

export default PlatformsCarousel;
