import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: Context) {
  const { id } = await context.params

  const { data, error } = await supabaseServer
    .from('tvshows')
    .select('*, tvshow_actors(actor_id, character_name, actor:actors(*))')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  type TvShowActorRow = {
    actor_id: string
    character_name: string | null
    actor: { id: string; name: string; photo_url: string | null } | null
  }

  const cast = (data.tvshow_actors ?? []).map((ta: TvShowActorRow) => ({
    id: ta.actor?.id,
    name: ta.actor?.name,
    character: ta.character_name || '',
    image: ta.actor?.photo_url,
  }))

  const show = {
    ...data,
    type: 'tv_show',
    actor_ids: (data.tvshow_actors ?? []).map((ta: TvShowActorRow) => ta.actor_id),
    cast,
    tvshow_actors: undefined,
  }

  return NextResponse.json(show)
}

export async function PUT(request: NextRequest, context: Context) {
  const { id } = await context.params
  const body = await request.json()
  const { category_ids, categories: _cats, actor_ids, type: _type, ...restBody } = body

  const payload = {
    ...restBody,
    categories: (category_ids ?? _cats ?? []).map(Number),
    description: body.description || null,
    poster_url: body.poster_url || null,
  }

  const { data, error } = await supabaseServer
    .from('tvshows')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (actor_ids !== undefined) {
    await supabaseServer.from('tvshow_actors').delete().eq('tvshow_id', id)
    if (actor_ids.length > 0) {
      const rows = actor_ids.map((aid: string) => ({ tvshow_id: id, actor_id: aid }))
      await supabaseServer.from('tvshow_actors').insert(rows)
    }
  }

  return NextResponse.json(data)
}

export async function DELETE(_request: NextRequest, context: Context) {
  const { id } = await context.params

  await supabaseServer.from('tvshow_actors').delete().eq('tvshow_id', id)

  const { error } = await supabaseServer
    .from('tvshows')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
