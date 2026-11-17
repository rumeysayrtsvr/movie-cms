'use client'

import { Box, Button, Grid, Typography } from '@mui/material'
import { Add, Person } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import LoadingSpinner from '@/components/feedback/LoadingSpinner'
import ErrorState from '@/components/feedback/ErrorState'
import { useActors } from '@/features/actors/hooks/useActors'
import { useActorForm } from '@/features/actors/hooks/useActorForm'
import { useActorsFilters } from '@/features/actors/hooks/useActorsFilters'
import { useActorsPageState } from '@/features/actors/hooks/useActorsPageState'
import ActorCard from '@/features/actors/components/ActorCard'
import ActorsFilter from '@/features/actors/components/ActorsFilter'
import ActorDetailDialog from '@/features/actors/components/ActorDetailDialog'
import ActorFormDialog from '@/features/actors/components/ActorFormDialog'
import DeleteActorDialog from '@/features/actors/components/DeleteActorDialog'

export default function ActorsPage() {
  const { enqueueSnackbar } = useSnackbar()

  const { form: filterForm, search, sort } = useActorsFilters()

  const { actors, loading, error, refresh } = useActors({ search, sort })

  const {
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
  } = useActorsPageState({ refresh })

  const actorForm = useActorForm({
    selectedActor,
    notify: enqueueSnackbar,
    refresh,
    onSubmitted,
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Oyuncular</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openAdd}>
          Oyuncu Ekle
        </Button>
      </Box>

      {error && <ErrorState message={error} onRetry={refresh} />}

      <ActorsFilter form={filterForm} />

      {loading ? (
        <LoadingSpinner />
      ) : actors.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
          <Person sx={{ fontSize: 64, opacity: 0.2, mb: 1 }} />
          <Typography>Oyuncu bulunamadı</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {actors.map((actor) => (
            <ActorCard
              key={actor.id}
              actor={actor}
              onOpenDetail={openDetail}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </Grid>
      )}

      <ActorDetailDialog
        open={detailOpen}
        actor={detailActor}
        onClose={closeDetail}
        onEdit={openEdit}
      />

      <ActorFormDialog
        open={formOpen}
        actor={selectedActor}
        onClose={closeForm}
        onSubmit={actorForm.onSubmit}
        register={actorForm.register}
        errors={actorForm.errors}
        watchName={actorForm.watchName}
        watchPhotoUrl={actorForm.watchPhotoUrl}
        saving={actorForm.saving}
      />

      <DeleteActorDialog
        open={deleteOpen}
        actor={deleteActor}
        onConfirm={handleDelete}
        onCancel={closeDelete}
        loading={deleting}
      />
    </Box>
  )
}
