import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import StoreProvider from '@/lib/store/StoreProvider'
import ThemeRegistry from '@/components/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie CMS',
  description: 'Movie CMS Admin Panel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppRouterCacheProvider>
          <StoreProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}