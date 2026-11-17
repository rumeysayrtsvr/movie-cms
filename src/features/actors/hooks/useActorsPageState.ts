import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { actorsService } from '@/features/actors/services/actorsService'
import { Actor } from '@/types'

interface Params {
  refresh: () => Promise<void>
}

export function useActorsPageState({ refresh }: Params) {
  const { enqueueSnackbar } = useSnackbar()

  const [detailOpen, setDetailOpen] = useState(false)
  const [detailActor, setDetailActor] = useState<Actor | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteActor, setDeleteActor] = useState<Actor | null>(null)
  const [deleting, setDeleting] = useState(false)

  const openAdd = () => {
    setSelectedActor(null)
    setFormOpen(true)
  }

  const openEdit = (actor: Actor) => {
    setDetailOpen(false)
    setDetailActor(null)
    setSelectedActor(actor)
    setFormOpen(true)
  }

  const openDetail = (actor: Actor) => {
    setDetailActor(actor)
    setDetailOpen(true)
  }

  const openDelete = (actor: Actor) => {
    setDeleteActor(actor)
    setDeleteOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setSelectedActor(null)
  }

  const closeDelete = () => {
    setDeleteOpen(false)
    setDeleteActor(null)
  }

  const closeDetail = () => {
    setDetailOpen(false)
    setDetailActor(null)
  }

  const onSubmitted = () => {
    setFormOpen(false)
    setSelectedActor(null)
  }

  const handleDelete = async () => {
    if (!deleteActor) return
    setDeleting(true)
    try {
      await actorsService.delete(deleteActor.id)
      closeDelete()
      enqueueSnackbar('Oyuncu silindi!', { variant: 'success' })
      await refresh()
    } catch (e: unknown) {
      enqueueSnackbar(e instanceof Error ? e.message : 'Hata', { variant: 'error' })
    } finally {
      setDeleting(false)
    }
  }

  return {
    detailOpen,
    detailActor,
    formOpen,
    selectedActor,
    deleteOpen,
    deleteActor,
    deleting,
    openAdd,
    openEdit,
    openDetail,
    openDelete,
    closeForm,
    closeDelete,
    closeDetail,
    onSubmitted,
    handleDelete,
  }
}
