import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Header } from '../components/Header';

/**
 * Example component demonstrating the updated Header component
 * Shows all the new features including the translator
 */
const UpdatedHeaderExample: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header is fixed at the top */}
        <Header />
        
        {/* Page content goes here */}
        <div className="container mx-auto px-4 py-8 pt-24">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            AnimalPedia Updated Header Example
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                New Features Demonstrated
              </h2>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Fixed header positioning</li>
                <li>Responsive design (mobile & desktop)</li>
                <li>Dark/light mode toggle</li>
                <li>Search with autocomplete</li>
                <li>Language selector (RU, EN, KG)</li>
                <li>User profile dropdown</li>
                <li>Navigation menu with mobile support</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                How to Use
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To use this updated header in your project:
              </p>
              <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Ensure Redux store is configured with theme, user, search, and language slices</li>
                <li>Wrap your app with Provider and pass the store</li>
                <li>Import and include the Header component</li>
                <li>Configure routing for navigation links</li>
              </ol>
            </div>
          </div>
          
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Implementation Notes
            </h2>
            <div className="text-gray-600 dark:text-gray-300 space-y-3">
              <p>
                The Header component has been updated with a new Translator component that allows 
                users to switch between Russian (RU), English (EN), and Kyrgyz (KG) languages.
              </p>
              <p>
                All components are built with modularity in mind. Each sub-component 
                (Logo, SearchBar, NavMenu, Translator, ThemeToggle, UserProfile) can be used independently 
                or together as part of the full Header.
              </p>
              <p>
                State management is handled through Redux Toolkit slices, making it easy to 
                extend functionality or modify behavior.
              </p>
              <p>
                Styling uses TailwindCSS with full dark mode support. All components adapt 
                to the current theme automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default UpdatedHeaderExample;