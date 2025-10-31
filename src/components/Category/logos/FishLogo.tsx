import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const FishLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/6660/6660390.png" // сюда вставь своё изображение рыбы
    alt="Рыбы"
  />
);

export default FishLogo;
