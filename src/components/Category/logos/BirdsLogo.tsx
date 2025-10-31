import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const BirdsLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/4600/4600626.png" // здесь ссылка на твоё изображение птицы
    alt="Птицы"
  />
);

export default BirdsLogo;
