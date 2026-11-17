'use client'

import { Box, Pagination } from '@mui/material'

interface AppPaginationProps {
  count: number
  page: number
  onChange: (page: number) => void
}

export default function AppPagination({ count, page, onChange }: AppPaginationProps) {
  if (count <= 0) return null

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
      />
    </Box>
  )
}