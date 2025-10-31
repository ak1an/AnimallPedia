import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './components/Header';
import { WelcomeSection } from './components/WelcomeSection';
import { DailyNews } from './components/DailyNews';
import { FactOfTheDay } from './components/FactOfTheDay';
import { AnimalOfTheDay } from './components/AnimalOfTheDay';
import { PopularAnimals } from './components/PopularAnimals';
import { MiniGames, MiniGamesMain } from './components/MiniGames';
import { Habitat } from './components/Habitat';
import { Animals } from './components/Animals';
import { ExtinctAnimals } from './components/ExtinctAnimals';
import { RecentlyViewedBlock } from './components/RecentlyViewed';
import { Favorites } from './components/Favorites';
import { CategoriesPage } from './components/Categories';
import { AboutPage } from './components/About';
import { AnimalDetails } from './components/AnimalDetails';
import CategoryPage from './components/Category/CategoryPage';
import { RedBookPage } from './components/RedBook';
import { Footer } from './components/Footer';
import AuthWrapper from './components/Auth/AuthWrapper';
import './index.css';

/**
 * Main App component for AnimalPedia
 * Demonstrates the usage of the Header component
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 pt-20">
            <Routes>
              <Route path="/" element={
                <>
                  <WelcomeSection />
                  <DailyNews />
                  <FactOfTheDay />
                  <AnimalOfTheDay />
                  <PopularAnimals />
                  <MiniGamesMain />
                  <Habitat />
                  <Animals />
                  <ExtinctAnimals />
                  <RecentlyViewedBlock />
                </>
              } />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/red-book" element={<RedBookPage />} />
              <Route path="/news" element={<div>News Page</div>} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/games" element={<MiniGames />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/reviews" element={<div>Reviews Page</div>} />
              <Route path="/profile" element={<AuthWrapper />} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              <Route path="/login" element={<AuthWrapper />} />
              <Route path="/register" element={<AuthWrapper />} />
              <Route path="/animal/:id" element={<AnimalDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;