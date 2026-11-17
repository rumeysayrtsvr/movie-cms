'use client'

import { Controller } from 'react-hook-form'
import { Box } from '@mui/material'
import { Category, Movie, MovieFormData } from '@/types'
import { useMovieForm } from '../hooks/useMovieForm'
import PosterPanel from './PosterPanel'
import CategorySelect from './CategorySelect'
import FreeSoloMultiField from './TagsInput'
import ActorSelect from './ActorSelect'
import AppTextField from '@/components/forms/AppTextField'
import AppSelect from '@/components/forms/AppSelect'

const COUNTRIES = ['Türkiye', 'ABD', 'İngiltere', 'Fransa', 'Almanya', 'İtalya', 'İspanya', 'Japonya', 'Güney Kore', 'Çin', 'Hindistan', 'Rusya', 'Avustralya', 'Kanada', 'Brezilya']
const LANGUAGES = ['Türkçe', 'İngilizce', 'Fransızca', 'Almanca', 'İspanyolca', 'İtalyanca', 'Japonca', 'Korece', 'Çince', 'Hintçe', 'Rusça', 'Arapça', 'Portekizce']

const TYPE_OPTIONS = [{ value: 'movie', label: 'Film' }, { value: 'tv_show', label: 'Dizi' }]
const STATUS_OPTIONS = [{ value: 'active', label: 'Aktif' }, { value: 'inactive', label: 'Pasif' }]

interface Props {
  movie: Movie | null
  categories: Category[]
  onSubmit: (data: MovieFormData) => void
  loading?: boolean
  defaultType?: 'movie' | 'tv_show'
}

export default function MovieForm({ movie, categories, onSubmit, defaultType = 'movie' }: Props) {
  const { control, errors, onFormSubmit, posterUrl, setPosterUrl, allActors, selectedCategories, selectedActors } =
    useMovieForm({ movie, categories, onSubmit, defaultType })

  return (
    <Box component="form" id="movie-form" onSubmit={onFormSubmit} sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <PosterPanel value={posterUrl} onChange={setPosterUrl} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Başlık zorunludur' }}
          render={({ field }) => (
            <AppTextField {...field} label="Film / Dizi Adı" error={Boolean(errors.title)} helperText={errors.title?.message} />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => <AppTextField {...field} label="Açıklama" rows={3} />}
        />

        <Controller
          name="trailer_url"
          control={control}
          render={({ field }) => (
            <AppTextField {...field} label="Fragman URL (YouTube vb.)" placeholder="https://www.youtube.com/watch?v=..." />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <AppSelect label="Tür" sx={{ flex: 1 }} options={TYPE_OPTIONS} {...field} />
            )}
          />
          <Controller
            name="release_year"
            control={control}
            render={({ field }) => (
              <AppTextField label="Yayın Yılı" type="number" sx={{ flex: 1 }} slotProps={{ htmlInput: { min: 1900, max: 2100 } }} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <AppSelect label="Durum" sx={{ flex: 1 }} options={STATUS_OPTIONS} {...field} />
            )}
          />
        </Box>

        <Controller
          name="category_ids"
          control={control}
          render={({ field }) => (
            <CategorySelect options={categories} value={selectedCategories} onChange={field.onChange} />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="countries"
            control={control}
            render={({ field }) => (
              <FreeSoloMultiField label="Ülkeler" placeholder="Ülke yazıp Enter..." options={COUNTRIES} value={field.value} onChange={field.onChange} sx={{ flex: 1 }} />
            )}
          />
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <FreeSoloMultiField label="Diller" placeholder="Dil yazıp Enter..." options={LANGUAGES} value={field.value} onChange={field.onChange} sx={{ flex: 1 }} />
            )}
          />
        </Box>

        <Controller
          name="actor_ids"
          control={control}
          render={({ field }) => (
            <ActorSelect options={allActors} value={selectedActors} onChange={field.onChange} />
          )}
        />
      </Box>
    </Box>
  )
}

