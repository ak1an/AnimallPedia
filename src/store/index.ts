import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
import languageReducer from './slices/languageSlice';
import categoryReducer from './slices/categorySlice';
import recentlyViewedReducer from './slices/recentlyViewedSlice';
import aboutReducer from './slices/aboutSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    search: searchReducer,
    language: languageReducer,
    category: categoryReducer,
    recentlyViewed: recentlyViewedReducer,
    about: aboutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;