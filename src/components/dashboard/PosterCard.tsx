import { Box, Typography } from '@mui/material'
import { MovieOutlined, TvOutlined } from '@mui/icons-material'
import { Movie as MovieType } from '@/types'

interface PosterCardProps {
  item: MovieType
}

export default function PosterCard({ item }: PosterCardProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      <Box
        sx={{
          aspectRatio: '2/3',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {item.poster_url ? (
          <Box
            component="img"
            src={item.poster_url}
            alt={item.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        ) : (
          <Box sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {item.type === 'movie'
              ? <MovieOutlined sx={{ fontSize: 48 }} />
              : <TvOutlined sx={{ fontSize: 48 }} />}
          </Box>
        )}
      </Box>
      <Typography
        variant="caption"
        fontWeight={500}
        sx={{
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block',
        }}
      >
        {item.title}
      </Typography>
    </Box>
  )
}
