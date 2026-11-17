import { Box, TextField } from '@mui/material'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function PosterPanel({ value, onChange }: Props) {
  return (
    <Box sx={{ width: { xs: '100%', md: 200 }, flexShrink: 0 }}>
      <TextField
        label="Poster URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        size="small"
        placeholder="https://..."
        sx={{ mb: 1.5 }}
      />
      <Box
        sx={{
          width: '100%',
          height: 280,
          border: '2px dashed #1E2F45',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'rgba(255,255,255,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {value ? (
          <Box
            component="img"
            src={value}
            alt="Poster"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <Box sx={{ color: 'text.secondary', fontSize: 12, textAlign: 'center', px: 1 }}>
            Poster URL girin
          </Box>
        )}
      </Box>
    </Box>
  )
}
