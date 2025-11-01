import React from 'react';

interface ForestLogoProps {
  className?: string;
}

const ForestLogo: React.FC<ForestLogoProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
    >
      {/* Tree Trunks */}
      <rect x="30" y="40" width="5" height="30" fill="#8B4513" />
      <rect x="45" y="35" width="5" height="35" fill="#8B4513" />
      <rect x="60" y="45" width="5" height="25" fill="#8B4513" />
      
      {/* Tree Tops */}
      <ellipse cx="32.5" cy="35" rx="15" ry="12" fill="#228B22" />
      <ellipse cx="47.5" cy="28" rx="18" ry="15" fill="#32CD32" />
      <ellipse cx="62.5" cy="38" rx="14" ry="11" fill="#228B22" />
      
      {/* Ground */}
      <rect x="0" y="70" width="100" height="30" fill="#90EE90" />
    </svg>
  );
};

export default ForestLogo;