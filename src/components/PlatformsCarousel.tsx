
import React from 'react';

const PlatformsCarousel = () => {
  const platforms = [
    { name: 'Google Ads', color: 'text-blue-500' },
    { name: 'Meta', color: 'text-blue-600' },
    { name: 'Hotmart', color: 'text-green-500' },
    { name: 'PerfectPay', color: 'text-purple-500' },
    { name: 'Vega', color: 'text-yellow-500' },
    { name: 'TikTok Ads', color: 'text-pink-500' },
    { name: 'LinkedIn Ads', color: 'text-blue-700' },
    { name: 'Twitter Ads', color: 'text-sky-500' },
  ];

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="flex animate-scroll space-x-8">
        {/* First set */}
        {platforms.map((platform, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 bg-gray-800/50 border border-yellow-500/20 rounded-lg px-6 py-4 hover:bg-gray-800/70 transition-colors"
          >
            <div className={`text-lg font-semibold ${platform.color}`}>
              {platform.name}
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {platforms.map((platform, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 bg-gray-800/50 border border-yellow-500/20 rounded-lg px-6 py-4 hover:bg-gray-800/70 transition-colors"
          >
            <div className={`text-lg font-semibold ${platform.color}`}>
              {platform.name}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PlatformsCarousel;
