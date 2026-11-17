import { useCallback, useEffect, useState } from 'react'
import { tvshowsService } from '@/features/movies/services/tvshowsService'
import { categoriesService } from '@/features/categories/categoriesService'
import { Category, Movie } from '@/types'

export function useTvShowDetailData(id: string) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [movieData, categoriesData] = await Promise.all([
        tvshowsService.getById(id),
        categoriesService.getAll(),
      ])
      setMovie(movieData)
      setCategories(categoriesData)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Veri yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    movie,
    categories,
    loading,
    error,
    refetch: fetchData,
  }
}
