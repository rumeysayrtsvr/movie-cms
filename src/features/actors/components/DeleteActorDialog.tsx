import { Actor } from '@/types'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

interface Props {
  open: boolean
  actor: Actor | null
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export default function DeleteActorDialog({ open, actor, onConfirm, onCancel, loading }: Props) {
  return (
    <ConfirmDialog
      open={open}
      title="Oyuncuyu Sil"
      description={`"${actor?.name ?? ''}" oyuncusunu silmek istediğinize emin misiniz?`}
      onConfirm={onConfirm}
      onCancel={onCancel}
      loading={loading}
    />
  )
}
