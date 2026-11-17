import { Controller, UseFormReturn } from 'react-hook-form'
import { MenuItem, Paper, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

export interface ActorFilterFormValues {
  searchInput: string
  sort: string
}

interface Props {
  form: UseFormReturn<ActorFilterFormValues>
}

export default function ActorsFilter({ form }: Props) {
  
  return (
    <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <Controller
        name="searchInput"
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            placeholder="Oyuncu ara..."
            slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> } }}
            sx={{ flex: 1 }}
          />
        )}
      />
      <Controller
        name="sort"
        control={form.control}
        render={({ field }) => (
          <TextField {...field} select size="small" label="Sırala" sx={{ width: 160 }}>
            <MenuItem value="newest">En Yeni</MenuItem>
            <MenuItem value="oldest">En Eski</MenuItem>
            <MenuItem value="name_az">İsim A→Z</MenuItem>
            <MenuItem value="name_za">İsim Z→A</MenuItem>
          </TextField>
        )}
      />
    </Paper>
  )
}
