'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box, Paper, Typography, Button, Skeleton, Breadcrumbs,
  Link as MuiLink, Chip, Avatar, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import { ArrowBack, Edit } from '@mui/icons-material'
import LoadingSpinner from '@/components/feedback/LoadingSpinner'
import ErrorState from '@/components/feedback/ErrorState'
import { useTvShowDetailData } from '@/features/movies/hooks/useTvShowDetailData'
import MovieForm from '@/features/movies/components/MovieForm'
import AppButton from '@/components/actions/AppButton'
import { tvshowsService } from '@/features/movies/services/tvshowsService'
import { MovieFormData } from '@/types'
import { useSnackbar } from 'notistack'

function parseArray(val: unknown): string[] {
  if (Array.isArray(val)) return val as string[]
  if (typeof val === 'string') {
    try { const p = JSON.parse(val); return Array.isArray(p) ? p : [] } catch { return [] }
  }
  return []
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', py: 1 }}>
      <Typography sx={{ minWidth: 120, color: 'text.secondary', fontSize: 14, fontWeight: 600 }}>
        {label}
      </Typography>
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  )
}

export default function TvShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { movie, categories, loading, error, refetch } = useTvShowDetailData(id)
  const [editOpen, setEditOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(data: MovieFormData) {
    setSaving(true)
    try {
      await tvshowsService.update(id, data)
      enqueueSnackbar('Güncelleme kaydedildi!', { variant: 'success' })
      setEditOpen(false)
      refetch()
    } catch (e: unknown) {
      enqueueSnackbar(e instanceof Error ? e.message : 'Güncelleme hatası', { variant: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const backHref = '/admin/tvshows'
  const backLabel = 'Diziler'

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push(backHref)} size="small" sx={{ mr: 1 }}>
          {backLabel}
        </Button>
        <Breadcrumbs>
          <MuiLink underline="hover" color="text.secondary" sx={{ cursor: 'pointer', fontSize: 14 }}
            onClick={() => router.push(backHref)}>
            {backLabel}
          </MuiLink>
          <Typography fontSize={14} color="text.primary">
            {loading ? <Skeleton width={120} /> : (movie?.title ?? id)}
          </Typography>
        </Breadcrumbs>
      </Box>

      {loading && <LoadingSpinner />}
      {!loading && error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && movie && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              {movie.title}
            </Typography>
            <Button variant="outlined" startIcon={<Edit />} size="small" onClick={() => setEditOpen(true)}>
              Düzenle
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Poster */}
            <Box sx={{ flexShrink: 0 }}>
              <Box
                component="img"
                src={movie.poster_url ?? ''}
                alt={movie.title}
                sx={{ width: 180, borderRadius: 2, display: 'block',
                  bgcolor: 'rgba(255,255,255,0.05)', minHeight: 260, objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </Box>

            {/* Bilgiler */}
            <Box sx={{ flex: 1 }}>
              <InfoRow label="Tür">
                <Chip label={movie.type === 'tv_show' ? 'Dizi' : 'Film'} size="small" />
              </InfoRow>
              <Divider sx={{ my: 0.5 }} />

              <InfoRow label="Kategori">
                {movie.categories?.length
                  ? movie.categories.map((cat) => <Chip key={cat} label={cat} size="small" color="primary" variant="outlined" sx={{ mr: 0.5 }} />)
                  : <Typography fontSize={14} color="text.secondary">—</Typography>}
              </InfoRow>
              <Divider sx={{ my: 0.5 }} />

              <InfoRow label="Yayın Yılı">
                <Typography fontSize={14}>{movie.release_year}</Typography>
              </InfoRow>
              <Divider sx={{ my: 0.5 }} />

              <InfoRow label="Durum">
                <Chip
                  label={movie.status === 'active' ? 'Aktif' : 'Pasif'}
                  size="small"
                  color={movie.status === 'active' ? 'success' : 'default'}
                />
              </InfoRow>
              <Divider sx={{ my: 0.5 }} />

              <InfoRow label="Ülkeler">
                {parseArray(movie.countries).length > 0
                  ? <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {parseArray(movie.countries).map((c: string) => <Chip key={c} label={c} size="small" />)}
                    </Box>
                  : <Typography fontSize={14} color="text.secondary">—</Typography>}
              </InfoRow>
              <Divider sx={{ my: 0.5 }} />

              <InfoRow label="Diller">
                {parseArray(movie.languages).length > 0
                  ? <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {parseArray(movie.languages).map((l: string) => <Chip key={l} label={l} size="small" />)}
                    </Box>
                  : <Typography fontSize={14} color="text.secondary">—</Typography>}
              </InfoRow>
              <Divider sx={{ my: 0.5 }} />

              <InfoRow label="Açıklama">
                <Typography fontSize={14} sx={{ whiteSpace: 'pre-wrap', color: movie.description ? 'text.primary' : 'text.secondary' }}>
                  {movie.description || '—'}
                </Typography>
              </InfoRow>

              {(movie.actor_ids?.length ?? 0) > 0 && (
                <>
                  <Divider sx={{ my: 0.5 }} />
                  <InfoRow label="Oyuncular">
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {movie.cast?.map((a) => (
                        <Chip
                          key={a.id}
                          label={a.name}
                          size="small"
                          avatar={<Avatar src={a.image ?? undefined}>{a.name[0]}</Avatar>}
                        />
                      ))}
                    </Box>
                  </InfoRow>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      )}
      </Box>

      {movie && (
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{movie.type === 'tv_show' ? 'Dizi Düzenle' : 'Film Düzenle'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <MovieForm
            movie={movie}
            categories={categories}
            onSubmit={handleSubmit}
            loading={saving}
            defaultType={movie.type}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>İptal</Button>
          <AppButton type="submit" form="movie-form" variant="contained" loading={saving}>
            Güncelle
          </AppButton>
        </DialogActions>
      </Dialog>
    )}
  </>
  )
}
