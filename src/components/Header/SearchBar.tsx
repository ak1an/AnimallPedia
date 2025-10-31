import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setSuggestions, setIsSearching } from '../../store/slices/searchSlice';
import { RootState } from '../../store';

/**
 * SearchBar component with autocomplete functionality
 * Provides search suggestions as the user types
 */
const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { query, suggestions, isSearching } = useSelector((state: RootState) => state.search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock animal data for suggestions
  const mockAnimals = [
    'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 
    'Panda', 'Penguin', 'Dolphin', 'Eagle', 'Wolf', 'Bear',
    'Fox', 'Deer', 'Rabbit', 'Hedgehog', 'Squirrel', 'Otter'
  ];

  // Handle clicks outside the search component to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    
    if (value.length > 0) {
      dispatch(setIsSearching(true));
      // Filter mock animals based on input
      const filtered = mockAnimals.filter(animal => 
        animal.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setSuggestions(filtered.slice(0, 5))); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      dispatch(setIsSearching(false));
      dispatch(setSuggestions([]));
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setQuery(suggestion));
    setShowSuggestions(false);
    // In a real app, this would trigger a search
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    // In a real app, this would trigger a search
    console.log('Searching for:', query);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          placeholder="Search animals..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading indicator */}
      {isSearching && suggestions.length === 0 && query.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 text-gray-500 dark:text-gray-400">Searching...</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;