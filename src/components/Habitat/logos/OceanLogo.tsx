import React from 'react';

interface OceanLogoProps {
  className?: string;
}

const OceanLogo: React.FC<OceanLogoProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
    >
      {/* Horizon */}
      <line x1="0" y1="70" x2="100" y2="70" stroke="#4682B4" strokeWidth="1" />
      
      {/* Sun */}
      <circle cx="80" cy="60" r="8" fill="#FFD700" />
      
      {/* Waves */}
      <path d="M0 75 Q 25 70 50 75 Q 75 80 100 75" stroke="#4682B4" strokeWidth="2" fill="none" />
      <path d="M0 80 Q 25 75 50 80 Q 75 85 100 80" stroke="#5F9EA0" strokeWidth="2" fill="none" />
      <path d="M0 85 Q 25 80 50 85 Q 75 90 100 85" stroke="#4682B4" strokeWidth="2" fill="none" />
      
      {/* Dolphin */}
      <path d="M30 65 Q 35 60 40 62 Q 45 65 48 68 Q 45 70 40 68 Q 35 65 30 65" fill="#87CEEB" />
      <path d="M48 68 Q 50 67 52 68 Q 50 70 48 69" fill="#87CEEB" />
      
      {/* Water */}
      <rect x="0" y="70" width="100" height="30" fill="#87CEEB" />
    </svg>
  );
};

export default OceanLogo;