import api from '@/lib/axios'
import { Category, CategoryFormData } from '@/types'

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/api/categories')
    return data
  },

  async create(payload: CategoryFormData): Promise<Category> {
    const { data } = await api.post<Category>('/api/categories', payload)
    return data
  },

  async update(id: string, payload: CategoryFormData): Promise<Category> {
    const { data } = await api.put<Category>(`/api/categories/${id}`, payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/categories/${id}`)
  },
}