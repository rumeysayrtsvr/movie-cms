'use client'

import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

interface FilterOption {
  label: string
  value: string
}

interface FiltersBarProps {
  filters: FilterOption[][]
  values: string[]
  onChanges: ((value: string) => void)[]
  labels: string[]
}

export default function FiltersBar({ filters, values, onChanges, labels }: FiltersBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {filters.map((options, i) => (
        <FormControl key={i} size="small" sx={{ minWidth: 160 }}>
          <InputLabel>{labels[i]}</InputLabel>
          <Select
            value={values[i]}
            label={labels[i]}
            onChange={(e) => onChanges[i](e.target.value)}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  )
}
