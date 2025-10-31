import React from 'react';

interface CategoryLogoProps {
  className?: string;
}

const ReptilesLogo: React.FC<CategoryLogoProps> = ({ className = "w-16 h-16" }) => (
  <img
    className={className}
    src="https://cdn-icons-png.flaticon.com/128/616/616487.png" // сюда вставь своё изображение рептилии
    alt="Рептилии"
  />
);

export default ReptilesLogo;
