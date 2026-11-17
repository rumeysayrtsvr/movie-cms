'use client'

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { ReactNode } from 'react'

interface FormModalProps {
  open: boolean
  title: string
  onClose: () => void
  onSubmit: () => void
  children: ReactNode
  loading?: boolean
  submitLabel?: string
}

export default function FormModal({
  open, title, onClose, onSubmit, children, loading, submitLabel = 'Kaydet'
}: FormModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small"><Close /></IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>İptal</Button>
        <Button onClick={onSubmit} variant="contained" disabled={loading}>
          {loading ? 'Kaydediliyor...' : submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
