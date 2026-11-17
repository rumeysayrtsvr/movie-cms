import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Category, Movie, MovieFormData, Actor } from '@/types'
import { actorsService } from '@/features/actors/services/actorsService'
import { parseArray } from '@/lib/parseArray'

export interface MovieFormValues {
  title: string
  description: string
  trailer_url: string
  category_ids: string[]
  type: 'movie' | 'tv_show'
  release_year: number
  status: 'active' | 'inactive'
  actor_ids: string[]
  countries: string[]
  languages: string[]
}

interface Params {
  movie: Movie | null
  categories: Category[]
  onSubmit: (data: MovieFormData) => void
  defaultType: 'movie' | 'tv_show'
}

const EMPTY_DEFAULTS = (defaultType: 'movie' | 'tv_show'): MovieFormValues => ({
  title: '',
  description: '',
  trailer_url: '',
  category_ids: [],
  type: defaultType,
  release_year: new Date().getFullYear(),
  status: 'active',
  actor_ids: [],
  countries: [],
  languages: [],
})

export function useMovieForm({ movie, categories, onSubmit, defaultType }: Params) {
  const [posterUrl, setPosterUrl] = useState('')
  const [allActors, setAllActors] = useState<Actor[]>([])

  const { control, watch, reset, handleSubmit, formState: { errors } } = useForm<MovieFormValues>({
    defaultValues: EMPTY_DEFAULTS(defaultType),
  })

  useEffect(() => {
    actorsService.getAll().then(setAllActors).catch(console.error)
  }, [])

  useEffect(() => {
    if (movie) {
      reset({
        title: movie.title,
        description: movie.description ?? '',
        trailer_url: movie.trailer_url ?? '',
        category_ids: movie.categories?.map(String) ?? [],
        type: movie.type,
        release_year: movie.release_year,
        status: movie.status,
        actor_ids: movie.actor_ids ?? [],
        countries: parseArray(movie.countries),
        languages: parseArray(movie.languages),
      })
      setPosterUrl(movie.poster_url ?? '')
    } else {
      reset(EMPTY_DEFAULTS(defaultType))
      setPosterUrl('')
    }
  }, [movie, defaultType, reset])

  const selectedCategoryIds = watch('category_ids')
  const selectedActorIds = watch('actor_ids')
  const selectedCategories = categories.filter((c) => selectedCategoryIds.includes(String(c.num_id ?? c.id)))
  const selectedActors = allActors.filter((a) => selectedActorIds.includes(a.id))

  const onFormSubmit = handleSubmit((values) => {
    onSubmit({
      title: values.title,
      description: values.description || null,
      categories: values.category_ids.map(Number),
      type: values.type,
      release_year: values.release_year,
      status: values.status,
      poster_url: posterUrl.trim() || null,
      trailer_url: values.trailer_url.trim() || null,
      actor_ids: values.actor_ids,
      countries: values.countries,
      languages: values.languages,
    })
  })

  return {
    control,
    errors,
    onFormSubmit,
    posterUrl,
    setPosterUrl,
    allActors,
    selectedCategories,
    selectedActors,
  }
}
