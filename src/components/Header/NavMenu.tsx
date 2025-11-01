import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaInfoCircle, FaGamepad, FaHeart, FaNewspaper, FaBook, FaComments } from 'react-icons/fa';

const NavMenu: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { to: '/categories', label: 'Категории', icon: <FaBook /> },
    { to: '/habitat-filter', label: 'Среда обитания', icon: <FaBook /> },
    { to: '/red-book', label: 'Красная книга', icon: <FaBook /> },
    { to: '/games', label: 'Игры', icon: <FaGamepad /> },
    { to: '/news', label: 'Новости', icon: <FaNewspaper /> },
    { to: '/reviews', label: 'Отзывы', icon: <FaComments /> },
    { to: '/about', label: 'О нас', icon: <FaInfoCircle /> },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
              location.pathname === item.to
                ? 'bg-green-600 text-white'
                : 'text-gray-700 hover:bg-green-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={closeMenu}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="ml-2 text-gray-700 dark:text-gray-300 focus:outline-none"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="fixed top-16 right-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <div className="py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center px-4 py-3 text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.to
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-green-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={closeMenu}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavMenu;