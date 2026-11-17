import { useCallback, useEffect, useState } from 'react'
import { actorsService } from '@/features/actors/services/actorsService'
import { Actor } from '@/types'

interface Params {
  search: string
  sort: string
}

export function useActors({ search, sort }: Params) {
  const [actors, setActors] = useState<Actor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await actorsService.getAll({ search, sort })
      setActors(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Hata oluştu')
    } finally {
      setLoading(false)
    }
  }, [search, sort])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { actors, loading, error, refresh }
}
