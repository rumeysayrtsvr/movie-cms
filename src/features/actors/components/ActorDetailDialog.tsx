import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { Actor } from '@/types'

interface Props {
  open: boolean
  actor: Actor | null
  onClose: () => void
  onEdit: (actor: Actor) => void
}

export default function ActorDetailDialog({ open, actor, onClose, onEdit }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {actor && (
        <>
          <DialogTitle sx={{ textAlign: 'center', pb: 0 }}>Oyuncu Bilgileri</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 2 }}>
              <Avatar src={actor.photo_url ?? undefined} sx={{ width: 100, height: 100, fontSize: 36 }}>
                {actor.name[0]}
              </Avatar>
              <Typography variant="h6" fontWeight={700}>{actor.name}</Typography>
              {actor.birth_date && (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="text.secondary">Doğum Tarihi</Typography>
                  <Typography variant="body2">{actor.birth_date}</Typography>
                </Box>
              )}
              {actor.biography && (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="caption" color="text.secondary">Biyografi</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {actor.biography}
                  </Typography>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Kapat</Button>
            <Button variant="outlined" onClick={() => onEdit(actor)}>
              Düzenle
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
