'use client'

import { useMemo, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme, selectThemeMode } from '@/lib/store/themeSlice'
import type { AppDispatch } from '@/lib/store/store'

type Mode = 'light' | 'dark'

interface ThemeModeContextValue {
  mode: Mode
  toggle: () => void
}

import { createContext, useContext } from 'react'

export const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'dark',
  toggle: () => {},
})

export function useThemeMode() {
  return useContext(ThemeModeContext)
}

function buildTheme(mode: Mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#4FC3F7' },
      ...(mode === 'dark'
        ? {
            background: { default: '#0F1923', paper: '#162032' },
            text: { primary: '#ffffff', secondary: '#8899AA' },
          }
        : {
            background: { default: '#F0F4F8', paper: '#ffffff' },
            text: { primary: '#0F1923', secondary: '#5a6a7a' },
          }),
    },
    typography: { fontFamily: 'Inter, sans-serif' },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', borderRadius: 12 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: mode === 'dark' ? '#1E2F45' : '#e0e7ef',
          },
        },
      },
    },
  })
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const mode = useSelector(selectThemeMode)

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', mode === 'light')
    document.body.classList.toggle('light-mode', mode === 'light')
  }, [mode])

  const toggle = () => dispatch(toggleTheme())

  const theme = useMemo(() => buildTheme(mode), [mode])

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}