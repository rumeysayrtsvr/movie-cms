import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MovieFilters, PaginationState } from '@/types'

interface MoviesState {
  items: Movie[]
  loading: boolean
  error: string | null
  filters: MovieFilters
  pagination: PaginationState
}

const initialState: MoviesState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    categories: [],
    status: 'all',
    sort: 'newest',
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    setFilters(state, action: PayloadAction<Partial<MovieFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1
    },
    setPagination(state, action: PayloadAction<Partial<PaginationState>>) {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const {
  setMovies,
  setLoading,
  setError,
  setFilters,
  setPagination,
  clearError,
} = moviesSlice.actions
export default moviesSlice.reducer