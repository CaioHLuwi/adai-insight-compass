
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
    { name: 'OctusPay', icon: <CreditCard className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'PantherFy', icon: <Crown className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Ticto', icon: <Smartphone className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Kirvano', icon: <Building2 className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Vega', icon: <Star className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'SlatPay', icon: <Diamond className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Eduzz', icon: <Store className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Disrupty', icon: <Zap className="w-6 h-6" />, color: 'text-gray-400' },
  ];

  const platformsLine2 = [
    { name: 'CartPanda', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Guru', icon: <Award className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Monetizze', icon: <DollarSign className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'ClickBank', icon: <Banknote className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Vega', icon: <Star className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'LastLink', icon: <Globe className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'TriboPay', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Hubla', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
  ];

  const platformsLine3 = [
    { name: 'Payt', icon: <Wallet className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Hotmart', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Kiwify', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'PerfectPay', icon: <CreditCard className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Google Ads', icon: <Target className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Meta Ads', icon: <Globe className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Shopify', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Yampi', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-gray-400' },
  ];

  return (
    <div className="w-full overflow-hidden py-8 space-y-6">
      {/* First line - moving left */}
      <div className="flex animate-scroll-left space-x-8">
        {/* First set */}
        {platformsLine1.map((platform, index) => (
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
        {platformsLine1.map((platform, index) => (
          <div
            key={`first-duplicate-${index}`}
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

      {/* Second line - moving right */}
      <div className="flex animate-scroll-right space-x-8">
        {/* First set */}
        {platformsLine2.map((platform, index) => (
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
        {/* Duplicate set for seamless loop */}
        {platformsLine2.map((platform, index) => (
          <div
            key={`second-duplicate-${index}`}
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

      {/* Third line - moving left */}
      <div className="flex animate-scroll-left space-x-8">
        {/* First set */}
        {platformsLine3.map((platform, index) => (
          <div
            key={`third-${index}`}
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
        {platformsLine3.map((platform, index) => (
          <div
            key={`third-duplicate-${index}`}
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
    </div>
  );
};

export default PlatformsCarousel;
