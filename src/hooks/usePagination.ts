import { useEffect, useMemo, useState } from 'react'

export function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1)

  const pageCount = useMemo(() => Math.ceil(items.length / perPage), [items.length, perPage])

  const paginated = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage]
  )

  useEffect(() => {
    if (pageCount === 0 && page !== 1) {
      setPage(1)
      return
    }
    if (page > pageCount && pageCount > 0) {
      setPage(pageCount)
    }
  }, [page, pageCount])

  return {
    page,
    setPage,
    pageCount,
    paginated,
  }
}