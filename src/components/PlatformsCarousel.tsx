
import React, { useState } from 'react';
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
  Diamond,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PlatformsCarousel = () => {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  const allPlatforms = [
    { name: 'OctusPay', icon: <CreditCard className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'PantherFy', icon: <Crown className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Ticto', icon: <Smartphone className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Kirvano', icon: <Building2 className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Vega', icon: <Star className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'SlatPay', icon: <Diamond className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Eduzz', icon: <Store className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Disrupty', icon: <Zap className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'CartPanda', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Guru', icon: <Award className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Monetizze', icon: <DollarSign className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'ClickBank', icon: <Banknote className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'LastLink', icon: <Globe className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'TriboPay', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Hubla', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Payt', icon: <Wallet className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Hotmart', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Kiwify', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'PerfectPay', icon: <CreditCard className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Google Ads', icon: <Target className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Meta Ads', icon: <Globe className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Shopify', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Yampi', icon: <ShoppingCart className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'PayPal', icon: <CreditCard className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Stripe', icon: <CreditCard className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'PagSeguro', icon: <Shield className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'MercadoPago', icon: <Coins className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Pix', icon: <Zap className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'TikTok Ads', icon: <Smartphone className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Pinterest Ads', icon: <Package className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'LinkedIn Ads', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Twitter Ads', icon: <Globe className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Snapchat Ads', icon: <Smartphone className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'YouTube Ads', icon: <MonitorSpeaker className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Amazon Ads', icon: <Package className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Microsoft Ads', icon: <Laptop className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Bing Ads', icon: <Globe className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Reddit Ads', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Quora Ads', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Mailchimp', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Constant Contact', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Klaviyo', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'SendGrid', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'ConvertKit', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'ActiveCampaign', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'HubSpot', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Salesforce', icon: <Building2 className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Pipedrive', icon: <TrendingUp className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Zoho CRM', icon: <Building2 className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Freshworks', icon: <Building2 className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Intercom', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Zendesk', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Drift', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Crisp', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Tawk.to', icon: <Users className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'LiveChat', icon: <Users className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'Zapier', icon: <Zap className="w-6 h-6" />, color: 'text-gray-400' },
    { name: 'Integromat', icon: <Zap className="w-6 h-6" />, color: 'text-yellow-500' },
  ];

  const platformsLine1 = allPlatforms.slice(0, 8);
  const platformsLine2 = allPlatforms.slice(8, 16);
  const platformsLine3 = allPlatforms.slice(16, 24);

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

      {/* Modal for all platforms */}
      <Dialog open={showAllPlatforms} onOpenChange={setShowAllPlatforms}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-yellow-500/20 hover:bg-yellow-500/10 hover-scale mx-auto block"
          >
            Ver todas as integrações
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-yellow-500/20">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-2xl mb-4">
              Todas as Integrações ({allPlatforms.length}+ plataformas)
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allPlatforms.map((platform, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-yellow-500/20 rounded-lg p-4 hover:bg-gray-800/70 transition-colors"
              >
                <div className={`flex items-center space-x-3 ${platform.color}`}>
                  {platform.icon}
                  <span className="text-sm font-semibold">
                    {platform.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlatformsCarousel;
