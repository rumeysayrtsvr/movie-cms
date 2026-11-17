'use client'

import { Box, Card, CardContent, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
  color?: string
}

export default function StatCard({ title, value, icon, color = '#4FC3F7' }: StatCardProps) {
  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" fontWeight={700} mt={0.5}>{value}</Typography>
          </Box>
          <Box sx={{
            color,
            fontSize: 40,
            bgcolor: `${color}18`,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
