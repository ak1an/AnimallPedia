import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaTiktok,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left Block: Logo and Copyright */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">AnimalPedia</h2>
            <p className="text-sm opacity-75">© 2025 AnimalPedia. Все права защищены.</p>
          </div>
          
          {/* Middle Block: Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3">Следите за нами</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-pink-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-black transition-colors duration-300"
                aria-label="TikTok"
              >
                <FaTiktok className="text-xl" />
              </a>
            </div>
            
            {/* Contact Information */}
            <div className="mt-4 flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <span className="text-sm">contact@animalpedia.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                <span className="text-sm">+7 (123) 456-78-90</span>
              </div>
            </div>
          </div>
          
          {/* Right Block: Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Быстрые ссылки</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/categories" 
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Категории
              </Link>
              <Link 
                to="/news" 
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Новости
              </Link>
              <Link 
                to="/categories" 
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Вымершие животные
              </Link>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm opacity-75">
          <p>AnimalPedia - ваш проводник в удивительный мир животных</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;