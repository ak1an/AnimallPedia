import React from 'react';

interface SavannaLogoProps {
  className?: string;
}

const SavannaLogo: React.FC<SavannaLogoProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
    >
      {/* Acacia Tree */}
      <rect x="50" y="40" width="3" height="30" fill="#8B4513" />
      <circle cx="51.5" cy="35" r="12" fill="#DAA520" />
      <circle cx="51.5" cy="25" r="8" fill="#DAA520" />
      <circle cx="58" cy="32" r="7" fill="#DAA520" />
      
      {/* Grass */}
      <path d="M0 70 L 5 65 L 10 70 L 15 65 L 20 70 L 25 65 L 30 70 L 35 65 L 40 70" stroke="#9ACD32" strokeWidth="2" fill="none" />
      <path d="M45 70 L 50 65 L 55 70 L 60 65 L 65 70 L 70 65 L 75 70 L 80 65 L 85 70" stroke="#9ACD32" strokeWidth="2" fill="none" />
      <path d="M90 70 L 95 65 L 100 70" stroke="#9ACD32" strokeWidth="2" fill="none" />
      
      {/* Elephant Silhouette */}
      <path d="M20 65 L 15 60 L 18 55 L 25 58 L 30 65 L 25 70 Z" fill="#8B4513" />
      <ellipse cx="27" cy="62" rx="3" ry="2" fill="#000" />
      
      {/* Ground */}
      <rect x="0" y="70" width="100" height="30" fill="#F0E68C" />
    </svg>
  );
};

export default SavannaLogo;