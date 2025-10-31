import themeReducer, { toggleTheme, setTheme } from './themeSlice';

/**
 * Test suite for the themeSlice
 */
describe('themeSlice', () => {
  const initialState = {
    isDarkMode: false,
  };

  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle toggleTheme', () => {
    const actual = themeReducer(initialState, toggleTheme());
    expect(actual.isDarkMode).toEqual(true);
  });

  it('should handle setTheme', () => {
    const actual = themeReducer(initialState, setTheme(true));
    expect(actual.isDarkMode).toEqual(true);
  });
});