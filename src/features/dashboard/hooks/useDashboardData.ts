import { useCallback, useEffect, useState } from 'react'
import api from '@/lib/axios'
import { Movie } from '@/types'

export interface DashboardStats {
  movies: number
  tvshows: number
  categories: number
  actors: number
}

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [tvshows, setTvshows] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, moviesRes, tvRes] = await Promise.all([
        api.get<DashboardStats>('/api/stats'),
        api.get<{ data: Movie[] }>('/api/movies?type=movie&sort=newest'),
           api.get<{ data: Movie[] }>('/api/tvshows?sort=newest'),
      ])
      setStats(statsRes.data)
      setMovies(moviesRes.data.data)
      setTvshows(tvRes.data.data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Veri yüklenemedi')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { stats, movies, tvshows, loading, error, refetch: fetchAll }
}
