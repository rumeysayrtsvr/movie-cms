import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            bgcolor: 'background.default',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}