'use client'

import { Avatar, Typography, IconButton } from '@mui/material'
import { Edit, Delete, OpenInNew } from '@mui/icons-material'
import StatusBadge from '@/components/feedback/StatusBadge'
import BaseTable, { ColDef } from '@/components/data/BaseTable'
import { Category, Movie } from '@/types'

interface Props {
  rows: Movie[]
  loading?: boolean
  showTypeColumn: boolean
  emptyText: string
  categories: Category[]
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  onEdit: (item: Movie) => void
  onDelete: (item: Movie) => void
  onDetail: (id: string) => void
}

export default function MovieTable({
  rows,
  loading,
  showTypeColumn,
  emptyText,
  categories,
  page,
  pageCount,
  onPageChange,
  onEdit,
  onDelete,
  onDetail,
}: Props) {
  const categoryMap = new Map(categories.map((c) => [String(c.num_id ?? c.id), c.name]))
  const getCategoryNames = (ids: string[]) =>
    ids.map((id) => categoryMap.get(String(id)) ?? id).join(', ')

  const columns: ColDef<Movie>[] = [
    {
      key: 'poster',
      label: 'Poster',
      render: (item) => (
        <Avatar src={item.poster_url ?? undefined} variant="rounded" sx={{ width: 40, height: 56 }}>
          {item.title[0]}
        </Avatar>
      ),
    },
    {
      key: 'title',
      label: 'Başlık',
      render: (item) => <Typography fontWeight={500}>{item.title}</Typography>,
    },
    {
      key: 'categories',
      label: 'Kategori',
      render: (item) =>
        Array.isArray(item.categories) && item.categories.length > 0
          ? getCategoryNames(item.categories.map(String))
          : '-',
    },
    ...(showTypeColumn
      ? [{ key: 'type', label: 'Tür', render: (item: Movie) => (item.type === 'movie' ? 'Film' : 'Dizi') }]
      : []),
    { key: 'release_year', label: 'Yıl', render: (item) => item.release_year ?? '-' },
    {
      key: 'rating',
      label: 'Puan',
      render: (item) => (item.avg_rating ? `⭐ ${item.avg_rating} (${item.rating_count})` : '-'),
    },
    { key: 'status', label: 'Durum', render: (item) => <StatusBadge status={item.status} /> },
    {
      key: 'actions',
      label: 'İşlemler',
      align: 'right',
      render: (item) => (
        <>
          <IconButton
            size="small"
            onClick={() => onDetail(item.id)}
            sx={{ color: 'text.secondary', mr: 0.5 }}
            title="Detay"
          >
            <OpenInNew fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onEdit(item)} sx={{ color: 'primary.main', mr: 0.5 }}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(item)} sx={{ color: 'error.main' }}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <BaseTable
      columns={columns}
      rows={rows}
      rowKey={(item) => item.id}
      loading={loading}
      emptyText={emptyText}
      page={page}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  )
}
