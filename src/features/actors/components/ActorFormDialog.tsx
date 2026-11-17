import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Person } from '@mui/icons-material'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import AppButton from '@/components/actions/AppButton'
import AppTextField from '@/components/forms/AppTextField'
import { Actor } from '@/types'
import { ActorFormValues } from '@/features/actors/hooks/useActorForm'

interface Props {
  open: boolean
  actor: Actor | null
  onClose: () => void
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>
  register: UseFormRegister<ActorFormValues>
  errors: FieldErrors<ActorFormValues>
  watchName?: string
  watchPhotoUrl?: string
  saving: boolean
}

export default function ActorFormDialog({
  open,
  actor,
  onClose,
  onSubmit,
  register,
  errors,
  watchName,
  watchPhotoUrl,
  saving,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{actor ? 'Oyuncu Düzenle' : 'Oyuncu Ekle'}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="actor-form"
          onSubmit={onSubmit}
          sx={{ display: 'flex', gap: 3, pt: 1, flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            <Avatar src={watchPhotoUrl || undefined} sx={{ width: 100, height: 100, fontSize: 36 }}>
              {watchName?.[0] ?? <Person />}
            </Avatar>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <AppTextField
              label="Ad Soyad"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register('name', { required: 'Ad Soyad zorunludur' })}
            />
            <AppTextField
              label="Doğum Tarihi"
              placeholder="1990-05-15"
              helperText="YYYY-MM-DD formatında giriniz"
              {...register('birth_date')}
            />
            <AppTextField
              label="Fotoğraf URL"
              placeholder="https://..."
              {...register('photo_url')}
            />
            <AppTextField
              label="Biyografi"
              rows={4}
              placeholder="Oyuncu hakkında kısa bilgi..."
              {...register('biography')}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={onClose}>İptal</AppButton>
        <AppButton type="submit" form="actor-form" variant="contained" loading={saving}>
          {actor ? 'Güncelle' : 'Ekle'}
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}
