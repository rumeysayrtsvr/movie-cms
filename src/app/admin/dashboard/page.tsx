'use client'

import { Grid, Box, Typography, Paper } from '@mui/material'
import { Movie, Tv, Category, People } from '@mui/icons-material'
import StatCard from '@/components/dashboard/StatCard'
import LoadingSpinner from '@/components/feedback/LoadingSpinner'
import ErrorState from '@/components/feedback/ErrorState'
import PageHeader from '@/components/navigation/PageHeader'
import { Movie as MovieType } from '@/types'
import PosterCard from '@/components/dashboard/PosterCard'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'

function PosterSection({ title, items }: { title: string; items: MovieType[] }) {
  if (items.length === 0) return null
  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>{title}</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 2,
        }}
      >
        {items.map((item) => (
          <PosterCard key={item.id} item={item} />
        ))}
      </Box>
    </Paper>
  )
}

const statConfig = [
  { title: 'Filmler',     key: 'movies',      icon: <Movie />,    color: '#4FC3F7' },
  { title: 'Diziler',     key: 'tvshows',     icon: <Tv />,       color: '#81C784' },
  { title: 'Kategoriler', key: 'categories',  icon: <Category />, color: '#FFB74D' },
  { title: 'Oyuncular',   key: 'actors',      icon: <People />,   color: '#BA68C8' },
] as const

export default function DashboardPage() {
  const { stats, movies, tvshows, loading, error, refetch } = useDashboardData()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error} onRetry={refetch} />

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <PageHeader title="Dashboard" subtitle="Genel istatistikler" />

      <Grid container spacing={3}>
        {statConfig.map((stat) => (
          <Grid key={stat.key} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title={stat.title}
              value={stats?.[stat.key] ?? 0}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      <PosterSection title="Filmler" items={movies} />
      <PosterSection title="Diziler" items={tvshows} />
    </Box>
  )
}
