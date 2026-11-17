'use client'

import {
  Box,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import { MovieFormData } from '@/types'
import ErrorState from '@/components/feedback/ErrorState'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import AppButton from '@/components/actions/AppButton'
import PageHeader from '@/components/navigation/PageHeader'
import MovieForm from '@/features/movies/components/MovieForm'
import MovieFilters from '../content/MovieFilters'
import MovieTable from '@/features/movies/components/MovieTable'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { MOVIE_CONTENT_CONFIG, type Mode } from '@/features/movies/content/Config'
import { useMovieContentData } from '@/features/movies/content/hooks/useMovieContentData'
import { useMovieContentActions } from '@/features/movies/content/hooks/useMovieContentActions'

interface Props {
  mode: Mode
}

export default function MovieContentPage({ mode }: Props) {
  const cfg = MOVIE_CONTENT_CONFIG[mode]
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const {
    items,
    categories,
    loading,
    error,
    searchInput,
    page,
    pageCount,
    paginated,
    setPage,
    filterForm,
    refresh,
  } = useMovieContentData(cfg.fixedType, cfg.service)

  const {
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
  } = useMovieContentActions({
    cfg,
    notify: enqueueSnackbar,
    refresh,
  })

  async function handleSubmit(data: MovieFormData) {
    await submit(data)
  }

  return (
    <Box>
      <PageHeader
        title={cfg.title}
        count={items.length}
        onAdd={openCreate}
        addLabel={cfg.addLabel}
      />

      {error && <ErrorState message={error} onRetry={refresh} />}
      <MovieFilters
        control={filterForm.control}
        categories={categories}
        searchInput={searchInput}
        searchPlaceholder={cfg.searchPlaceholder}
      />

      <MovieTable
        rows={paginated}
        loading={loading}
        showTypeColumn={cfg.showTypeColumn}
        emptyText={cfg.emptyText}
        categories={categories}
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
        onEdit={openEdit}
        onDelete={openDelete}
        onDetail={(id) => router.push(mode === 'tvshow' ? `/admin/tvshows/${id}` : `/admin/movies/${id}`)}
      />

      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>{selected ? cfg.dialogEdit : cfg.dialogAdd}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <MovieForm
            movie={selected}
            categories={categories}
            onSubmit={handleSubmit}
            loading={saving}
            defaultType={cfg.defaultType}
          />
        </DialogContent>
        <DialogActions>
          <AppButton onClick={closeModal}>İptal</AppButton>
          <AppButton type="submit" form="movie-form" variant="contained" loading={saving}>
            {selected ? 'Güncelle' : 'Ekle'}
          </AppButton>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        title={cfg.deleteTitle}
        description={cfg.deleteDesc(selected?.title ?? '')}
        onConfirm={remove}
        onCancel={closeDelete}
        loading={deleting}
      />
    </Box>
  )
}
