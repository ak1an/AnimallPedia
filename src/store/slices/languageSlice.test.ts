import languageReducer, { setLanguage, LanguageState } from './languageSlice';

/**
 * Test suite for the languageSlice
 */
describe('languageSlice', () => {
  const initialState: LanguageState = {
    currentLanguage: 'RU',
  };

  it('should return the initial state', () => {
    expect(languageReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setLanguage with RU', () => {
    const actual = languageReducer(initialState, setLanguage('RU'));
    expect(actual.currentLanguage).toEqual('RU');
  });

  it('should handle setLanguage with EN', () => {
    const actual = languageReducer(initialState, setLanguage('EN'));
    expect(actual.currentLanguage).toEqual('EN');
  });

  it('should handle setLanguage with KG', () => {
    const actual = languageReducer(initialState, setLanguage('KG'));
    expect(actual.currentLanguage).toEqual('KG');
  });
});