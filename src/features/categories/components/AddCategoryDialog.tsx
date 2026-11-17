'use client'

import { Box, TextField } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import FormModal from '@/components/dialogs/FormModal'
import { CategoryFormValues } from '../hooks/useCategoriesPage'

interface AddCategoryDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  form: UseFormReturn<CategoryFormValues>
  loading?: boolean
}

export default function AddCategoryDialog({
  open,
  onClose,
  onSubmit,
  form,
  loading,
}: AddCategoryDialogProps) {
  return (
    <FormModal
      open={open}
      title="Yeni Kategori Ekle"
      onClose={onClose}
      onSubmit={onSubmit}
      submitLabel="Ekle"
      loading={loading}
    >
      <Box>
        <TextField
          fullWidth
          label="Kategori adı"
          placeholder="Orn: Aksiyon, Komedi..."
          sx={{ mt: 1 }}
          error={Boolean(form.formState.errors.name)}
          helperText={form.formState.errors.name?.message}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
          {...form.register('name', { required: 'Kategori adı zorunludur' })}
        />
      </Box>
    </FormModal>
  )
}
