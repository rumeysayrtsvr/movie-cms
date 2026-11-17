import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { actorsService } from '@/features/actors/services/actorsService'
import { Actor, ActorFormData } from '@/types'

export interface ActorFormValues {
  name: string
  birth_date: string
  biography: string
  photo_url: string
}

type Notify = (message: string, options?: { variant: 'success' | 'error' }) => void

interface Params {
  selectedActor: Actor | null
  notify: Notify
  refresh: () => Promise<void>
  onSubmitted: () => void
}

export function useActorForm({ selectedActor, notify, refresh, onSubmitted }: Params) {
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ActorFormValues>({
    defaultValues: {
      name: '',
      birth_date: '',
      biography: '',
      photo_url: '',
    },
  })

  useEffect(() => {
    if (selectedActor) {
      reset({
        name: selectedActor.name,
        biography: selectedActor.biography ?? '',
        birth_date: selectedActor.birth_date ?? '',
        photo_url: selectedActor.photo_url ?? '',
      })
    } else {
      reset({ name: '', birth_date: '', biography: '', photo_url: '' })
    }
  }, [selectedActor, reset])

  const onSubmit = handleSubmit(async (values) => {
    if (!values.name.trim()) return
    setSaving(true)
    try {
      const payload: ActorFormData = {
        name: values.name.trim(),
        photo_url: values.photo_url.trim() || null,
        biography: values.biography || null,
        birth_date: values.birth_date || null,
      }

      if (selectedActor) {
        await actorsService.update(selectedActor.id, payload)
        notify('Oyuncu güncellendi!', { variant: 'success' })
      } else {
        await actorsService.create(payload)
        notify('Oyuncu eklendi!', { variant: 'success' })
      }

      onSubmitted()
      reset({ name: '', birth_date: '', biography: '', photo_url: '' })
      await refresh()
    } catch (e: unknown) {
      notify(e instanceof Error ? e.message : 'Hata', { variant: 'error' })
    } finally {
      setSaving(false)
    }
  })

  return {
    register,
    watchName: watch('name'),
    watchPhotoUrl: watch('photo_url'),
    errors,
    saving,
    onSubmit,
  }
}
