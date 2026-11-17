'use client'

import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

type AppTextFieldProps = Omit<TextFieldProps, 'size'> & {
  rows?: number
}


const AppTextField = forwardRef<HTMLDivElement, AppTextFieldProps>(
  ({ rows, fullWidth = true, ...props }, ref) => (
    <TextField
      ref={ref}
      size="small"
      fullWidth={fullWidth}
      multiline={rows !== undefined}
      rows={rows}
      {...props}
    />
  )
)

AppTextField.displayName = 'AppTextField'
export default AppTextField
