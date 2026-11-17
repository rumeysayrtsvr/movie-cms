import { useCallback, useState } from 'react'
import { ModeConfig } from '@/features/movies/content/Config'
import { Movie, MovieFormData } from '@/types'

type Notify = (message: string, options?: { variant: 'success' | 'error' }) => void

interface UseMovieContentActionsParams {
  cfg: ModeConfig
  notify: Notify
  refresh: () => Promise<void>
}

export function useMovieContentActions({ cfg, notify, refresh }: UseMovieContentActionsParams) {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selected, setSelected] = useState<Movie | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setSelected(null)
  }, [])

  const closeDelete = useCallback(() => {
    setDeleteOpen(false)
    setSelected(null)
  }, [])

  const openCreate = useCallback(() => {
    setSelected(null)
    setModalOpen(true)
  }, [])

  const openEdit = useCallback((movie: Movie) => {
    setSelected(movie)
    setModalOpen(true)
  }, [])

  const openDelete = useCallback((movie: Movie) => {
    setSelected(movie)
    setDeleteOpen(true)
  }, [])

  const submit = useCallback(async (data: MovieFormData) => {
    setSaving(true)
    try {
      if (selected) {
        await cfg.service.update(selected.id, data)
        notify(cfg.msg.update, { variant: 'success' })
      } else {
        const payload = cfg.fixedType ? { ...data, type: cfg.fixedType } : data
        await cfg.service.create(payload)
        notify(cfg.msg.add, { variant: 'success' })
      }
      closeModal()
      await refresh()
    } catch (e: unknown) {
      notify(e instanceof Error ? e.message : 'Hata', { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }, [cfg, closeModal, notify, refresh, selected])

  const remove = useCallback(async () => {
    if (!selected) return
    setDeleting(true)
    try {
      await cfg.service.delete(selected.id)
      closeDelete()
      notify(cfg.msg.delete, { variant: 'success' })
      await refresh()
    } catch (e: unknown) {
      notify(e instanceof Error ? e.message : 'Hata', { variant: 'error' })
    } finally {
      setDeleting(false)
    }
  }, [cfg, closeDelete, notify, refresh, selected])

  return {
    modalOpen,
    deleteOpen,
    selected,
    saving,
    deleting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    closeDelete,
    submit,
    remove,
  }
}
