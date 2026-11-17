import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActorFilterFormValues } from '@/features/actors/components/ActorsFilter'

export function useActorsFilters() {
  const [search, setSearch] = useState('')

  const form = useForm<ActorFilterFormValues>({
    defaultValues: {
      searchInput: '',
      sort: 'newest',
    },
  })

  const searchInput = form.watch('searchInput') ?? ''
  const sort = form.watch('sort') ?? 'newest'

  useEffect(() => {
    if (searchInput.length === 0 || searchInput.length >= 3) {
      setSearch(searchInput)
    }
  }, [searchInput])

  return {
    form,
    search,
    sort,
  }
}
