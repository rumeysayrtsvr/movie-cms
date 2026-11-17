'use client'

import { TextField, MenuItem, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

type AppSelectProps = Omit<TextFieldProps, 'select' | 'size'> & {
  options: SelectOption[]
}

const AppSelect = forwardRef<HTMLDivElement, AppSelectProps>(
  ({ options, fullWidth = true, ...props }, ref) => (
    <TextField
      ref={ref}
      select
      size="small"
      fullWidth={fullWidth}
      {...props}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  )
)

AppSelect.displayName = 'AppSelect'
export default AppSelect
