import React from 'react';

const RedBookLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Professional red book design */}
      <path 
        d="M30 25 L70 25 L70 75 L30 75 Z" 
        fill="#EF4444" 
      />
      <path 
        d="M30 25 L35 20 L75 20 L75 70 L70 75 L70 25 L35 25 L35 75 L30 75 Z" 
        fill="#B91C1C" 
      />
      <path 
        d="M40 35 L60 35" 
        stroke="#FECACA" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M40 45 L60 45" 
        stroke="#FECACA" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M40 55 L60 55" 
        stroke="#FECACA" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M40 65 L60 65" 
        stroke="#FECACA" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      {/* Bookmark */}
      <path 
        d="M70 30 L75 35 L75 50 L70 45 Z" 
        fill="#FECACA" 
      />
    </svg>
  );
};

export default RedBookLogo;