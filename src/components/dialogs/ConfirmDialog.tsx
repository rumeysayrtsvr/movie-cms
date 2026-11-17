'use client'

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from '@mui/material'
import AppButton from '@/components/actions/AppButton'

interface Props {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function ConfirmDialog({
  open, title, description, onConfirm, onCancel, loading
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>İptal</Button>
        <AppButton
          variant="contained"
          color="error"
          onClick={onConfirm}
          loading={loading}
        >
          Sil
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}
