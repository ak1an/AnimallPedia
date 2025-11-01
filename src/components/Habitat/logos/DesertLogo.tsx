import React from 'react';

interface DesertLogoProps {
  className?: string;
}

const DesertLogo: React.FC<DesertLogoProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
      fill="none"
    >
      {/* Sun */}
      <circle cx="80" cy="20" r="10" fill="#FFD700" />
      <line x1="80" y1="5" x2="80" y2="0" stroke="#FFD700" strokeWidth="2" />
      <line x1="80" y1="35" x2="80" y2="40" stroke="#FFD700" strokeWidth="2" />
      <line x1="95" y1="20" x2="100" y2="20" stroke="#FFD700" strokeWidth="2" />
      <line x1="65" y1="20" x2="60" y2="20" stroke="#FFD700" strokeWidth="2" />
      
      {/* Dunes */}
      <path d="M0 70 Q 25 50 50 65 Q 75 80 100 60 L 100 100 L 0 100 Z" fill="#F4A460" />
      <path d="M0 80 Q 25 65 50 75 Q 75 85 100 70 L 100 100 L 0 100 Z" fill="#DEB887" />
      
      {/* Ground */}
      <rect x="0" y="85" width="100" height="15" fill="#D2B48C" />
    </svg>
  );
};

export default DesertLogo;