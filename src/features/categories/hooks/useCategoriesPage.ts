import { useCallback, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { categoriesService } from '@/features/categories/categoriesService'
import { Category } from '@/types'
import { useCategories } from './useCategories'
import { usePagination } from '@/hooks/usePagination'

type Notify = (message: string, options?: { variant: 'success' | 'error' }) => void

const PER_PAGE = 10

export interface CategoryFormValues {
  name: string
}

type DialogType = 'edit' | 'delete' | null

interface CategoriesDialogState {
  type: DialogType
  category: Category | null
}

export function useCategoriesPage(notify: Notify) {
  const { categories, loading, error, setError, fetchCategories } = useCategories()

  const [adding, setAdding] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [dialog, setDialog] = useState<CategoriesDialogState>({
    type: null,
    category: null,
  })
  const [deleting, setDeleting] = useState(false)

  const addForm = useForm<CategoryFormValues>({ defaultValues: { name: '' } })
  const editForm = useForm<CategoryFormValues>({ defaultValues: { name: '' } })

  const { page, setPage, pageCount, paginated } = usePagination(categories, PER_PAGE)

  const openAddDialog = useCallback(() => {
    addForm.reset({ name: '' })
    setAddOpen(true)
  }, [addForm])

  const closeAddDialog = useCallback(() => {
    setAddOpen(false)
    addForm.reset({ name: '' })
  }, [addForm])

  const openEdit = useCallback((cat: Category) => {
    editForm.reset({ name: cat.name })
    setDialog({ type: 'edit', category: cat })
  }, [editForm])

  const openDelete = useCallback((cat: Category) => {
    setDialog({ type: 'delete', category: cat })
  }, [])

  const closeDialog = useCallback(() => {
    setDialog({ type: null, category: null })
  }, [])

  const addHandler: SubmitHandler<CategoryFormValues> = useCallback(async (values) => {
    if (!values.name.trim()) return
    setAdding(true)
    setError(null)
    try {
      await categoriesService.create({ name: values.name.trim() })
      addForm.reset({ name: '' })
      setAddOpen(false)
      notify('Kategori eklendi!', { variant: 'success' })
      await fetchCategories()
      setPage(1)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Hata'
      setError(msg)
      notify(msg, { variant: 'error' })
    } finally {
      setAdding(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategories, notify, setPage])

  const handleAdd = useCallback(() => {
    addForm.handleSubmit(addHandler)()
  }, [addForm, addHandler])

  const handleEdit = editForm.handleSubmit(async (values) => {
    if (dialog.type !== 'edit' || !dialog.category || !values.name.trim()) return
    try {
      await categoriesService.update(dialog.category.id, { name: values.name.trim() })
      closeDialog()
      notify('Kategori güncellendi!', { variant: 'success' })
      await fetchCategories()
    } catch (e: unknown) {
      notify(e instanceof Error ? e.message : 'Hata', { variant: 'error' })
    }
  })

  const handleDelete = useCallback(async () => {
    if (dialog.type !== 'delete' || !dialog.category) return
    setDeleting(true)
    try {
      await categoriesService.delete(dialog.category.id)
      closeDialog()
      notify('Kategori silindi!', { variant: 'success' })
      await fetchCategories()
    } catch (e: unknown) {
      notify(e instanceof Error ? e.message : 'Hata', { variant: 'error' })
    } finally {
      setDeleting(false)
    }
  }, [closeDialog, dialog.category, dialog.type, fetchCategories, notify])

  return {
    list: {
      categories,
      loading,
      error,
      fetchCategories,
      page,
      setPage,
      pageCount,
      paginated,
      perPage: PER_PAGE,
    },
    add: {
      open: addOpen,
      form: addForm,
      loading: adding,
      submit: handleAdd,
      openDialog: openAddDialog,
      closeDialog: closeAddDialog,
    },
    edit: {
      open: dialog.type === 'edit',
      form: editForm,
      openDialog: openEdit,
      closeDialog,
      submit: handleEdit,
    },
    remove: {
      open: dialog.type === 'delete',
      category: dialog.category,
      loading: deleting,
      openDialog: openDelete,
      closeDialog,
      submit: handleDelete,
    },
  }
}
