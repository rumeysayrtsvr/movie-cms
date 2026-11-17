import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export interface LoginFormValues {
  email: string
  password: string
}

export function useLoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  async function onSubmit(values: LoginFormValues) {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return { register, handleSubmit: handleSubmit(onSubmit), errors, error, loading }
}
