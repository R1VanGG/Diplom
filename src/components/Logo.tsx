import React from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`rounded-full bg-primary-600 p-3 text-white ${size === 'small' ? 'p-2' : size === 'large' ? 'p-4' : 'p-3'}`}>
        <Building2 className={sizeClasses[size]} />
      </div>
      <div className={`ml-2 font-semibold ${sizeClasses[size]} text-primary-800`}>
        GovService
      </div>
    </div>
  );
};

export default Logo;