import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const AmphibiansLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/15624/15624902.png" // сюда вставляй своё изображение
    alt="Амфибии"
  />
);

export default AmphibiansLogo;
