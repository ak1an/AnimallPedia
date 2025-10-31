import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguage: 'RU' | 'EN' | 'KG';
}

const initialState: LanguageState = {
  currentLanguage: 'RU',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'RU' | 'EN' | 'KG'>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;