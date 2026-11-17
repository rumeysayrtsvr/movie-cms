'use client'

import { Box, TextField } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import FormModal from '@/components/dialogs/FormModal'
import { CategoryFormValues } from '../hooks/useCategoriesPage'

interface EditCategoryDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  form: UseFormReturn<CategoryFormValues>
}

export default function EditCategoryDialog({
  open,
  onClose,
  onSubmit,
  form,
}: EditCategoryDialogProps) {
  return (
    <FormModal
      open={open}
      title="Kategori Düzenle"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="Kategori adı"
          sx={{ mt: 1 }}
          error={Boolean(form.formState.errors.name)}
          helperText={form.formState.errors.name?.message}
          {...form.register('name', { required: 'Kategori adı zorunludur' })}
        />
      </Box>
    </FormModal>
  )
}