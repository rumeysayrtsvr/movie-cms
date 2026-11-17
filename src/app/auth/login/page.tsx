'use client'

import { Box, Card, CardContent, TextField, Button, Typography, Alert } from '@mui/material'
import { Movie } from '@mui/icons-material'
import { useLoginForm } from './hooks/useLoginForm'

export default function LoginPage() {
  const { register, handleSubmit, errors, error, loading } = useLoginForm()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Movie sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700} color="primary.main">
              MOVIE CMS
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight={600} mb={3}>
            Giriş Yap
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="E-posta"
              type="email"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
              {...register('email', {
                required: 'E-posta zorunludur',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Geçerli bir e-posta girin',
                },
              })}
            />
            <TextField
              label="Şifre"
              type="password"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{ mb: 3 }}
              {...register('password', {
                required: 'Şifre zorunludur',
                minLength: {
                  value: 6,
                  message: 'Şifre en az 6 karakter olmalı',
                },
              })}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
