import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/slices/userSlice';
import { RootState } from '../../store';

/**
 * User profile component with dropdown menu
 * Shows user avatar and provides access to profile settings and logout
 */
const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, name, avatarUrl } = useSelector((state: RootState) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle user logout
  const handleLogout = () => {
    dispatch(clearUser());
    setIsDropdownOpen(false);
    // In a real app, you would also clear auth tokens, etc.
  };

  // Default avatar component
  const DefaultAvatar = () => (
    <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {isAuthenticated ? (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
          aria-label="User profile"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <DefaultAvatar />
          )}
          <span className="hidden md:inline text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        </button>
      ) : (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
          aria-label="User profile"
        >
          <DefaultAvatar />
          <span className="hidden md:inline text-gray-700 dark:text-gray-300 font-medium">Guest</span>
        </button>
      )}

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50">
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
              </div>
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </Link>
              <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Избранное
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Sign in
              </Link>
              <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;