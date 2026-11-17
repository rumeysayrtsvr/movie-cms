'use client'

import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import ErrorState from '@/components/feedback/ErrorState'
import { useCategoriesPage } from '@/features/categories/hooks/useCategoriesPage'
import {
  CategoriesTable,
  EditCategoryDialog,
  DeleteCategoryDialog,
  AddCategoryDialog,
} from '@/features/categories/components'

export default function CategoriesPage() {
  const { enqueueSnackbar } = useSnackbar()

  const { list, add, edit, remove } = useCategoriesPage(enqueueSnackbar)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Kategoriler</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={add.openDialog}>
          Kategori Ekle
        </Button>
      </Box>

      {list.error && <ErrorState message={list.error} onRetry={list.fetchCategories} />}

      <CategoriesTable
        categories={list.paginated}
        loading={list.loading}
        page={list.page}
        perPage={list.perPage}
        pageCount={list.pageCount}
        onPageChange={list.setPage}
        onEdit={edit.openDialog}
        onDelete={remove.openDialog}
      />

      <AddCategoryDialog
        open={add.open}
        onClose={add.closeDialog}
        onSubmit={add.submit}
        form={add.form}
        loading={add.loading}
      />

      <EditCategoryDialog
        open={edit.open}
        onClose={edit.closeDialog}
        onSubmit={edit.submit}
        form={edit.form}
      />

      <DeleteCategoryDialog
        open={remove.open}
        category={remove.category}
        onConfirm={remove.submit}
        onCancel={remove.closeDialog}
        loading={remove.loading}
      />
    </Box>
  )
}