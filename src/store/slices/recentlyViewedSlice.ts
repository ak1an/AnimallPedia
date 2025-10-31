import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
}

interface RecentlyViewedState {
  animals: Animal[];
}

const initialState: RecentlyViewedState = {
  animals: [],
};

export const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addRecentlyViewedAnimal: (state, action: PayloadAction<Animal>) => {
      // Check if animal already exists in the list
      const existingIndex = state.animals.findIndex(animal => animal.id === action.payload.id);
      
      if (existingIndex !== -1) {
        // If exists, remove it from current position
        state.animals.splice(existingIndex, 1);
      }
      
      // Add to the beginning of the list
      state.animals.unshift(action.payload);
      
      // Keep only the last 20 animals
      if (state.animals.length > 20) {
        state.animals = state.animals.slice(0, 20);
      }
    },
    clearRecentlyViewed: (state) => {
      state.animals = [];
    },
  },
});

export const { addRecentlyViewedAnimal, clearRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;