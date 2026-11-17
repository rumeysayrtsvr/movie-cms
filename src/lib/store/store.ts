import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import moviesReducer from '@/features/movies/store/moviesSlice'
import categoriesReducer from '@/features/categories/categoriesSlice'
import themeReducer from './themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    categories: categoriesReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch