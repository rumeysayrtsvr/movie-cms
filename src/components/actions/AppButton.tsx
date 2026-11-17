import { Button, ButtonProps, CircularProgress } from '@mui/material'

interface AppButtonProps extends ButtonProps {
  loading?: boolean
}

export default function AppButton({ loading = false, disabled, startIcon, children, ...props }: AppButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
    >
      {children}
    </Button>
  )
}
