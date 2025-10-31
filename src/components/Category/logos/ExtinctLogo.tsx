import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const ExtinctLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/2604/2604728.png" // сюда вставь своё изображение вымершего животного
    alt="Вымершие"
  />
);

export default ExtinctLogo;
