import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const InsectsLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/12800/12800863.png" // сюда вставь своё изображение насекомого
    alt="Насекомые"
  />
);

export default InsectsLogo;
