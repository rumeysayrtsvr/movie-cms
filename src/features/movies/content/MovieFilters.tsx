'use client'

import {
  Paper, TextField, MenuItem,
  FormControl, InputLabel, Select, Checkbox, ListItemText,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { Controller, type Control } from 'react-hook-form'
import { Category, MovieFilters as MovieFiltersType } from '@/types'

interface MovieFilterFormValues {
  search: string
  categories: string[]
  status: MovieFiltersType['status']
  sort: MovieFiltersType['sort']
}

interface MovieFiltersProps {
  control: Control<MovieFilterFormValues>
  categories: Category[]
  searchInput: string
  searchPlaceholder: string
}

export default function MovieFilters({
  control,
  categories,
  searchInput,
  searchPlaceholder,
}: MovieFiltersProps) {
  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            placeholder={searchPlaceholder}
            value={searchInput}
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> } }}
            sx={{ flex: 1, minWidth: 200 }}
          />
        )}
      />
      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Kategori</InputLabel>
            <Select
              {...field}
              multiple
              label="Kategori"
              value={field.value ?? []}
              renderValue={(selected) =>
                selected.length === 0
                  ? 'Tümü'
                  : selected.join(', ')
              }
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  <Checkbox checked={(field.value ?? []).includes(cat.name)} />
                  <ListItemText primary={cat.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} select size="small" label="Durum" sx={{ width: 130 }}>
            <MenuItem value="all">Tümü</MenuItem>
            <MenuItem value="active">Aktif</MenuItem>
            <MenuItem value="inactive">Pasif</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="sort"
        control={control}
        render={({ field }) => (
          <TextField {...field} select size="small" label="Sıralama" sx={{ width: 140 }}>
            <MenuItem value="newest">En Yeni</MenuItem>
            <MenuItem value="oldest">En Eski</MenuItem>
          </TextField>
        )}
      />
    </Paper>
  )
}