import { Box, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { ReactNode } from 'react'
import AppButton from '@/components/actions/AppButton'

interface PageHeaderProps {
  title: string
  subtitle?: string
  count?: number
  onAdd?: () => void
  addLabel?: string
  actions?: ReactNode
}

export default function PageHeader({
  title,
  subtitle,
  count,
  onAdd,
  addLabel = 'Yeni Ekle',
  actions,
}: PageHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight={700}>{title}</Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>{subtitle}</Typography>
        )}
        {count !== undefined && (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Toplam {count} kayıt
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {actions}
        {onAdd && (
          <AppButton variant="contained" startIcon={<Add />} onClick={onAdd}>
            {addLabel}
          </AppButton>
        )}
      </Box>
    </Box>
  )
}
