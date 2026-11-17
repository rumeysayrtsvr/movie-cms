export interface MoviesService {
  getAll: (filters?: Record<string, string>) => Promise<unknown[]>
  getById: (id: string) => Promise<unknown>
  create: (data: unknown) => Promise<unknown>
  update: (id: string, data: unknown) => Promise<unknown>
  delete: (id: string) => Promise<void>
}