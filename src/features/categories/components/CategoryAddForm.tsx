'use client'

import { Add } from '@mui/icons-material'
import { Box, Paper, TextField, Typography } from '@mui/material'
import { UseFormReturn } from 'react-hook-form'
import AppButton from '@/components/actions/AppButton'
import { CategoryFormValues } from '../hooks/useCategoriesPage'

interface CategoryAddFormProps {
  form: UseFormReturn<CategoryFormValues>
  adding: boolean
  onSubmit: () => void
}

export default function CategoryAddForm({ form, adding, onSubmit }: CategoryAddFormProps) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Yeni Kategori Ekle
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Kategori adı"
          placeholder="Orn: Aksiyon, Komedi..."
          error={Boolean(form.formState.errors.name)}
          helperText={form.formState.errors.name?.message}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
          {...form.register('name', { required: 'Kategori adı zorunludur' })}
        />
        <AppButton
          type="button"
          variant="contained"
          startIcon={<Add />}
          loading={adding}
          onClick={onSubmit}
          sx={{ whiteSpace: 'nowrap', px: 3 }}
        >
          Ekle
        </AppButton>
      </Box>
    </Paper>
  )
}