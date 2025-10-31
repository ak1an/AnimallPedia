import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedCategory: string | null;
  animalData: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
  animalData: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setAnimalData: (state, action: PayloadAction<any[]>) => {
      state.animalData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedCategory, setAnimalData, setLoading, setError } = categorySlice.actions;

export default categorySlice.reducer;