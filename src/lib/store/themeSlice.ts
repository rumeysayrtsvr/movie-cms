import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

type Mode = 'light' | 'dark'

const STORAGE_KEY = 'theme-mode'

function loadMode(): Mode {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return 'dark'
}

interface ThemeState {
  mode: Mode
}

const initialState: ThemeState = {
  mode: loadMode(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, state.mode)
      } catch {}
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export const selectThemeMode = (state: RootState) => state.theme.mode
export default themeSlice.reducer
