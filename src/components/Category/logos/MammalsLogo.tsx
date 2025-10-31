import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const MammalsLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/616/616523.png" // сюда вставь своё изображение млекопитающего
    alt="Млекопитающие"
  />
);

export default MammalsLogo;
