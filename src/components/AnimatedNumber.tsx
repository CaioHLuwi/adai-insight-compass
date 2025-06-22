
import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  decimals = 2
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // If value is a string (like formatted currency), just return it as is
    if (typeof value === 'string') {
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(value * easeOutCubic);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // If value is already a string, return it directly
  if (typeof value === 'string') {
    return <span>{value}</span>;
  }

  return (
    <span>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
};

export default AnimatedNumber;
