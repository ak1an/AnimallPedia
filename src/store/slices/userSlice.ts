import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  uid: string | null;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  favoriteAnimals: string[]; // Array of animal IDs
  registrationDate: string | null;
  lastLogin: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  uid: null,
  name: null,
  email: null,
  avatarUrl: null,
  favoriteAnimals: [],
  registrationDate: null,
  lastLogin: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ 
      uid: string;
      name: string; 
      email: string; 
      avatarUrl?: string;
      favoriteAnimals?: string[];
      registrationDate?: string;
      lastLogin?: string;
    }>) => {
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl || null;
      state.favoriteAnimals = action.payload.favoriteAnimals || [];
      state.registrationDate = action.payload.registrationDate || null;
      state.lastLogin = action.payload.lastLogin || null;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.uid = null;
      state.name = null;
      state.email = null;
      state.avatarUrl = null;
      state.favoriteAnimals = [];
      state.registrationDate = null;
      state.lastLogin = null;
    },
    addFavoriteAnimal: (state, action: PayloadAction<string>) => {
      if (!state.favoriteAnimals.includes(action.payload)) {
        state.favoriteAnimals.push(action.payload);
      }
    },
    removeFavoriteAnimal: (state, action: PayloadAction<string>) => {
      state.favoriteAnimals = state.favoriteAnimals.filter(id => id !== action.payload);
    },
    updateProfile: (state, action: PayloadAction<{ name?: string; avatarUrl?: string }>) => {
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.avatarUrl !== undefined) {
        state.avatarUrl = action.payload.avatarUrl;
      }
    },
  },
});

export const { setUser, clearUser, addFavoriteAnimal, removeFavoriteAnimal, updateProfile } = userSlice.actions;

export default userSlice.reducer;