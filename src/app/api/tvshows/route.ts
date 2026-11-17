import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') ?? ''
  const categoryIds = searchParams.getAll('category')
  const status = searchParams.get('status') ?? 'all'
  const sort = searchParams.get('sort') ?? 'newest'

  let query = supabaseServer
    .from('tvshows')
    .select('*, tvshow_actors(actor_id)', { count: 'exact' })

  if (search) query = query.ilike('title', `%${search}%`)
  if (categoryIds.length) query = query.overlaps('categories', categoryIds.map(Number))
  if (status !== 'all') query = query.eq('status', status)

  const orderMap: Record<string, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    oldest: { column: 'created_at', ascending: true },
  }
  const order = orderMap[sort] ?? orderMap.newest
  query = query.order(order.column, { ascending: order.ascending })

  const { data, error, count } = await query
  if (error) {
    console.error('[GET /api/tvshows] Supabase error:', JSON.stringify(error, null, 2))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const mapped = (data ?? []).map((m: Record<string, unknown> & { tvshow_actors?: { actor_id: string }[] }) => ({
    ...m,
    type: 'tv_show',
    actor_ids: (m.tvshow_actors ?? []).map((a) => a.actor_id),
    avg_rating: null,
    rating_count: 0,
    tvshow_actors: undefined,
  }))

  return NextResponse.json({ data: mapped, count: count ?? 0 })
}

export async function POST(request: NextRequest) {
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
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error('[POST /api/tvshows] Supabase error:', JSON.stringify(error, null, 2))
    return NextResponse.json({ error: error.message, details: error }, { status: 500 })
  }

  if (actor_ids?.length && data?.id) {
    const rows = actor_ids.map((aid: string) => ({ tvshow_id: data.id, actor_id: aid }))
    await supabaseServer.from('tvshow_actors').insert(rows)
  }

  return NextResponse.json(data, { status: 201 })
}
