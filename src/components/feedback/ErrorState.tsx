import { Box, Typography, Button } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Bir hata oluştu.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 6,
        color: 'text.secondary',
      }}
    >
      <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
      <Typography variant="body1" color="error.main" fontWeight={500}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="error" size="small" onClick={onRetry}>
          Tekrar Dene
        </Button>
      )}
    </Box>
  )
}
