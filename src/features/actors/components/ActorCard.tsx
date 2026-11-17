import { Avatar, Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { Actor } from '@/types'

interface Props {
  actor: Actor
  onOpenDetail: (actor: Actor) => void
  onEdit: (actor: Actor) => void
  onDelete: (actor: Actor) => void
}

export default function ActorCard({ actor, onOpenDetail, onEdit, onDelete }: Props) {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
      <Paper
        onClick={() => onOpenDetail(actor)}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.15s, box-shadow 0.15s',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: 6,
            '& .actor-actions': { opacity: 1 },
          },
        }}
      >
        <Box
          className="actor-actions"
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            display: 'flex',
            gap: 0.5,
            opacity: 0,
            transition: 'opacity 0.15s',
          }}
        >
          <Tooltip title="Düzenle">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(actor)
              }}
              sx={{ bgcolor: 'background.default', color: 'primary.main', '&:hover': { bgcolor: 'background.default' } }}
            >
              <Edit sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sil">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(actor)
              }}
              sx={{ bgcolor: 'background.default', color: 'error.main', '&:hover': { bgcolor: 'background.default' } }}
            >
              <Delete sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Avatar src={actor.photo_url ?? undefined} sx={{ width: 80, height: 80, fontSize: 28 }}>
          {actor.name[0]}
        </Avatar>

        <Typography
          variant="body2"
          fontWeight={500}
          textAlign="center"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {actor.name}
        </Typography>
      </Paper>
    </Grid>
  )
}
