import { store } from './index';
import { toggleTheme } from './slices/themeSlice';
import { setUser, clearUser } from './slices/userSlice';
import { setQuery, setSuggestions } from './slices/searchSlice';
import { setLanguage } from './slices/languageSlice';

/**
 * Test suite for the Redux store
 */
describe('Redux Store', () => {
  test('should handle theme toggle', () => {
    const initialState = store.getState().theme;
    expect(initialState.isDarkMode).toBe(false);
    
    store.dispatch(toggleTheme());
    const newState = store.getState().theme;
    expect(newState.isDarkMode).toBe(true);
  });

  test('should handle user authentication', () => {
    const userData = {
      uid: '12345',
      name: 'John Doe',
      email: 'john@example.com',
      avatarUrl: 'https://example.com/avatar.jpg'
    };
    
    store.dispatch(setUser(userData));
    const userState = store.getState().user;
    expect(userState.isAuthenticated).toBe(true);
    expect(userState.name).toBe(userData.name);
    expect(userState.email).toBe(userData.email);
    
    store.dispatch(clearUser());
    const clearedState = store.getState().user;
    expect(clearedState.isAuthenticated).toBe(false);
    expect(clearedState.name).toBeNull();
  });

  test('should handle search functionality', () => {
    const query = 'Lion';
    const suggestions = ['Lion', 'Lioness', 'Lion cub'];
    
    store.dispatch(setQuery(query));
    store.dispatch(setSuggestions(suggestions));
    
    const searchState = store.getState().search;
    expect(searchState.query).toBe(query);
    expect(searchState.suggestions).toEqual(suggestions);
  });

  test('should handle language change', () => {
    const initialLanguageState = store.getState().language;
    expect(initialLanguageState.currentLanguage).toBe('RU');
    
    store.dispatch(setLanguage('EN'));
    const newLanguageState = store.getState().language;
    expect(newLanguageState.currentLanguage).toBe('EN');
    
    store.dispatch(setLanguage('KG'));
    const finalLanguageState = store.getState().language;
    expect(finalLanguageState.currentLanguage).toBe('KG');
  });
});