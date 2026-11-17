import {
  Paper, TableContainer, Table, TableHead, TableBody,
  TableRow, TableCell, CircularProgress, Box,
} from '@mui/material'
import { ReactNode } from 'react'
import AppPagination from '@/components/navigation/AppPagination'

export interface ColDef<T> {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  render: (row: T, index?: number) => ReactNode
}

interface BaseTableProps<T> {
  columns: ColDef<T>[]
  rows: T[]
  rowKey: (row: T) => string
  loading?: boolean
  emptyText?: string
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export default function BaseTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyText = 'Kayıt bulunamadı',
  page,
  pageCount,
  onPageChange,
}: BaseTableProps<T>) {
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align ?? 'left'} sx={{ fontWeight: 700 }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 4, color: 'text.secondary' }}
                  >
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, rowIndex) => (
                  <TableRow key={rowKey(row)} hover>
                    {columns.map((col) => (
                      <TableCell key={col.key} align={col.align ?? 'left'}>
                        {col.render(row, rowIndex)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <AppPagination count={pageCount} page={page} onChange={onPageChange} />
    </Paper>
  )
}
