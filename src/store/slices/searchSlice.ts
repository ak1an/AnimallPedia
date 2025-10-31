import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  suggestions: string[];
  isSearching: boolean;
}

const initialState: SearchState = {
  query: '',
  suggestions: [],
  isSearching: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.suggestions = [];
      state.isSearching = false;
    },
  },
});

export const { setQuery, setSuggestions, setIsSearching, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;