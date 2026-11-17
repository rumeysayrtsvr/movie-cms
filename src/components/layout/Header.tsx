'use client'

import { Box, Typography, IconButton as MuiIconButton, Avatar, Tooltip } from '@mui/material'
import { Logout, DarkMode, LightMode } from '@mui/icons-material'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useThemeMode } from '@/components/ThemeRegistry'

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/movies': 'Filmler',
  '/admin/tvshows': 'Diziler',
  '/admin/categories': 'Kategoriler',
  '/admin/banners': 'Bannerlar',
  '/admin/actors': 'Oyuncular',
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { mode, toggle } = useThemeMode()
  const currentPath = pathname ?? ''
  let title = 'Movie CMS'
  if (currentPath.startsWith('/admin/movies')) title = 'Filmler'
  else if (currentPath.startsWith('/admin/tvshows')) title = 'Diziler'
  else if (pageTitles[currentPath]) title = pageTitles[currentPath]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <Box
      sx={{
        height: 64,
        bgcolor: 'background.paper',
        borderBottom: '1px solid #1E2F45',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MuiIconButton onClick={toggle} sx={{ color: 'text.secondary' }}>
            {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </MuiIconButton>


        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'primary.main',
            fontSize: 14,
            fontWeight: 700,
            ml: 1,
          }}
        >
          A
        </Avatar>

        <Tooltip title="Çıkış Yap">
          <MuiIconButton onClick={handleLogout} sx={{ color: 'text.secondary' }}>
            <Logout fontSize="small" />
          </MuiIconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}