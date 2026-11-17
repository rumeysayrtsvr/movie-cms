import api from '@/lib/axios'
import { Movie, MovieFormData, MovieFilters } from '@/types'

export const tvshowsService = {
  async getAll(filters?: Partial<MovieFilters>): Promise<{ data: Movie[]; count: number }> {
    const params = new URLSearchParams()
    if (filters?.search) params.set('search', filters.search)
    if (filters?.categories?.length) filters.categories.forEach((c) => params.append('category', c))
    if (filters?.status) params.set('status', filters.status)
    if (filters?.sort) params.set('sort', filters.sort)
    const { data } = await api.get<{ data: Movie[]; count: number }>(`/api/tvshows?${params.toString()}`)
    return data
  },

  async getById(id: string): Promise<Movie> {
    const { data } = await api.get<Movie>(`/api/tvshows/${id}`)
    return data
  },

  async create(payload: MovieFormData): Promise<Movie> {
    const { data } = await api.post<Movie>('/api/tvshows', payload)
    return data
  },

  async update(id: string, payload: Partial<MovieFormData>): Promise<Movie> {
    const { data } = await api.put<Movie>(`/api/tvshows/${id}`, payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/tvshows/${id}`)
  },
}
