import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { categoriesService } from '@/features/categories/categoriesService'
import { Category, Movie, MovieFilters } from '@/types'
import { ContentService } from '@/features/movies/content/Config'

const PER_PAGE = 10

interface MovieFilterFormValues {
  search: string
  categories: string[]
  status: MovieFilters['status']
  sort: MovieFilters['sort']
}

export function useMovieContentData(fixedType: MovieFilters['type'], service: ContentService) {
  const [items, setItems] = useState<Movie[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<MovieFilters>({
    search: '',
    categories: [],
    status: 'all',
    sort: 'newest',
    type: fixedType,
  })

  const filterForm = useForm<MovieFilterFormValues>({
    defaultValues: {
      search: '',
      categories: [],
      status: 'all',
      sort: 'newest',
    },
  })

  const searchInput = useWatch({ control: filterForm.control, name: 'search' }) ?? ''
  const selectedCategories = useWatch({ control: filterForm.control, name: 'categories' }) ?? []
  const status = useWatch({ control: filterForm.control, name: 'status' }) ?? 'all'
  const sort = useWatch({ control: filterForm.control, name: 'sort' }) ?? 'newest'

  const [page, setPage] = useState(1)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await service.getAll(filters)
      setItems(data)
      setPage(1)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Hata oluştu')
    } finally {
      setLoading(false)
    }
  }, [filters, service])

  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoriesService.getAll()
      setCategories(data)
    } catch {
      // Categories are auxiliary; keep page functional if this fails.
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: selectedCategories,
      status,
      sort,
      type: fixedType,
      search: searchInput.length === 0 || searchInput.length >= 3 ? searchInput : prev.search,
    }))
  }, [selectedCategories, fixedType, searchInput, sort, status])

  const pageCount = useMemo(() => Math.ceil(items.length / PER_PAGE), [items.length])
  const paginated = useMemo(
    () => items.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [items, page]
  )

  return {
    items,
    categories,
    loading,
    error,
    filters,
    searchInput,
    page,
    pageCount,
    paginated,
    setPage,
    filterForm,
    refresh: fetchItems,
  }
}
