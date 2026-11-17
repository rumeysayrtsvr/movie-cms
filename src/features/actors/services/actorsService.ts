import api from '@/lib/axios'
import { Actor, ActorFormData } from '@/types'

export const actorsService = {
  async getAll(params?: { search?: string; sort?: string }): Promise<Actor[]> {
    const q = new URLSearchParams()
    if (params?.search) q.set('search', params.search)
    if (params?.sort) q.set('sort', params.sort)
    const { data } = await api.get<Actor[]>(`/api/actors?${q.toString()}`)
    return data
  },

  async create(payload: ActorFormData): Promise<Actor> {
    const { data } = await api.post<Actor>('/api/actors', payload)
    return data
  },

  async update(id: string, payload: Partial<ActorFormData>): Promise<Actor> {
    const { data } = await api.put<Actor>(`/api/actors/${id}`, payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/actors/${id}`)
  },
}
