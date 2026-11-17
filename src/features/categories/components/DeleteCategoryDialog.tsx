'use client'

import { Category } from '@/types'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

interface DeleteCategoryDialogProps {
  open: boolean
  category: Category | null
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export default function DeleteCategoryDialog({
  open,
  category,
  onConfirm,
  onCancel,
  loading,
}: DeleteCategoryDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Kategori Sil"
      description={`"${category?.name ?? ''}" kategorisini silmek istediğinize emin misiniz?`}
      onConfirm={onConfirm}
      onCancel={onCancel}
      loading={loading}
    />
  )
}