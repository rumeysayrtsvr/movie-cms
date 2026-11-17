import { Chip } from '@mui/material'

interface Props {
  status: 'active' | 'inactive'
}

export default function StatusBadge({ status }: Props) {
  return (
    <Chip
      label={status === 'active' ? 'Aktif' : 'Pasif'}
      size="small"
      color={status === 'active' ? 'success' : 'default'}
      sx={{ fontWeight: 600, fontSize: 11 }}
    />
  )
}
