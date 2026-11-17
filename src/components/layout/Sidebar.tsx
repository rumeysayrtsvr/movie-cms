'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Divider
} from '@mui/material'
import {
  Dashboard, Movie, Tv, Category,
  People,
} from '@mui/icons-material'
import { ElementType } from 'react'

interface NavItem {
  label: string
  href: string
  icon: ElementType
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: Dashboard },
  { label: 'Movies', href: '/admin/movies', icon: Movie },
  { label: 'TV Shows', href: '/admin/tvshows', icon: Tv },
  { label: 'Oyuncular', href: '/admin/actors', icon: People },
  { label: 'Categories', href: '/admin/categories', icon: Category },
]


export default function Sidebar() {
  const pathname = usePathname()

  return (
    <Box
      sx={{
        width: 240,
        minHeight: '100vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid #1E2F45',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Box sx={{ height: 64, display: 'flex', alignItems: 'center', px: 3, gap: 1.5 }}>
        <Movie sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h6" fontWeight={700} color="primary.main">
          MOVIE CMS
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#1E2F45' }} />

      {/* Nav Items */}
      <List sx={{ px: 1, py: 2, flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 2,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  bgcolor: isActive ? 'rgba(79, 195, 247, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(79, 195, 247, 0.07)',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}