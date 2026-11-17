import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: Context) {
  const { id } = await context.params

  const { data, error } = await supabaseServer
    .from('movies')
    .select('*, movie_actors(actor_id, character_name, actor:actors(*))')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  type MovieActorRow = {
    actor_id: string
    character_name: string | null
    actor: { id: string; name: string; photo_url: string | null } | null
  }

  const cast = (data.movie_actors ?? []).map((ma: MovieActorRow) => ({
    id: ma.actor?.id,
    name: ma.actor?.name,
    character: ma.character_name || '',
    image: ma.actor?.photo_url,
  }))

  const movie = {
    ...data,
    type: data.type === 2 ? 'tv_show' : 'movie',
    actor_ids: (data.movie_actors ?? []).map((ma: MovieActorRow) => ma.actor_id),
    cast,
    movie_actors: undefined,
  }

  return NextResponse.json(movie)
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params
  const body = await request.json()
  const { category_ids, categories: _cats, actor_ids, type: bodyType, ...restBody } = body

  const payload = {
    ...restBody,
    type: bodyType === 'tv_show' ? 2 : 1,
    categories: (category_ids ?? _cats ?? []).map(Number),
    description: body.description || null,
    poster_url: body.poster_url || null,
  }

  const { data, error } = await supabaseServer
    .from('movies')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (actor_ids !== undefined) {
    await supabaseServer.from('movie_actors').delete().eq('movie_id', id)
    if (actor_ids.length > 0) {
      const rows = actor_ids.map((aid: string) => ({ movie_id: id, actor_id: aid }))
      await supabaseServer.from('movie_actors').insert(rows)
    }
  }

  return NextResponse.json(data)
}

export async function DELETE(_request: NextRequest, context: Context) {
  const { id } = await context.params

  await supabaseServer.from('movie_actors').delete().eq('movie_id', id)

  const { error } = await supabaseServer
    .from('movies')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
