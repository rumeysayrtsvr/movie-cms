'use client'

import { Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import BaseTable, { ColDef } from '@/components/data/BaseTable'
import { Category } from '@/types'

interface CategoriesTableProps {
  categories: Category[]
  loading: boolean
  page: number
  perPage: number
  pageCount: number
  onPageChange: (page: number) => void
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export default function CategoriesTable({
  categories,
  loading,
  page,
  perPage,
  pageCount,
  onPageChange,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  const columns: ColDef<Category>[] = [
    {
      key: 'index',
      label: '#',
      render: (_, index) => (page - 1) * perPage + (index ?? 0) + 1,
    },
    {
      key: 'name',
      label: 'Kategori Adı',
      render: (category) => category.name,
    },
    {
      key: 'created_at',
      label: 'Eklenme Tarihi',
      render: (category) =>
        category.created_at
          ? new Date(category.created_at).toLocaleDateString('tr-TR')
          : '-',
    },
    {
      key: 'actions',
      label: 'İşlemler',
      align: 'right',
      render: (category) => (
        <>
          <IconButton
            size="small"
            onClick={() => onEdit(category)}
            sx={{ color: 'primary.main', mr: 1 }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(category)}
            sx={{ color: 'error.main' }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <BaseTable
      columns={columns}
      rows={categories}
      rowKey={(c) => c.id}
      loading={loading}
      emptyText="Henüz kategori eklenmemiş"
      page={page}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  )
}