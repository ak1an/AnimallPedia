import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import Translator from './Translator';
import ThemeToggle from './ThemeToggle';
import UserProfile from './UserProfile';

/**
 * Main Header component for AnimalPedia
 * Fixed header with logo, search, navigation, translator, theme toggle, and user profile
 */
const Header: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [scrolled, setScrolled] = useState(false);

  // Apply theme class to body element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled
          ? 'h-14 bg-white/50 dark:bg-gray-900/50 shadow-lg backdrop-blur-md'
          : 'h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ease-in-out ${scrolled ? 'h-14' : 'h-20'}`}>
          {/* Left section: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center section: Search bar (hidden on mobile) */}
          <div className="hidden md:block flex-1 mx-4">
            <SearchBar />
          </div>

          {/* Right section: Navigation, Translator, Theme Toggle, and User Profile */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <NavMenu />
            
            {/* Search bar for mobile */}
            <div className="md:hidden">
              <SearchBar />
            </div>
            
            <Translator />
            <ThemeToggle />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;