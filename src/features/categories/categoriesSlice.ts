import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '@/types'

interface CategoriesState {
  items: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
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
    clearError(state) {
      state.error = null
    },
  },
})

export const { setCategories, setLoading, setError, clearError } =
  categoriesSlice.actions
export default categoriesSlice.reducer