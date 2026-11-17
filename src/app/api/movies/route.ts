import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') ?? ''
  const categoryIds = searchParams.getAll('category')
  const status = searchParams.get('status') ?? 'all'
  const sort = searchParams.get('sort') ?? 'newest'
  const type = searchParams.get('type') ?? ''

  let query = supabaseServer
    .from('movies')
    .select('*, movie_actors(actor_id), ratings(score)', { count: 'exact' })

  if (search) query = query.ilike('title', `%${search}%`)
  if (categoryIds.length) query = query.overlaps('categories', categoryIds.map(Number))
  if (status !== 'all') query = query.eq('status', status)
  if (type) query = query.eq('type', type === 'tv_show' ? 2 : 1)

  const orderMap: Record<string, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    oldest: { column: 'created_at', ascending: true },
    rating: { column: 'rating', ascending: false },
  }
  const order = orderMap[sort] ?? orderMap.newest
  query = query.order(order.column, { ascending: order.ascending })

  const { data, error, count } = await query
  if (error) {
    console.error('[GET /api/movies] Supabase error:', JSON.stringify(error, null, 2))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const mapped = (data ?? []).map((m: Record<string, unknown> & { movie_actors?: { actor_id: string }[], ratings?: { score: number }[] }) => {
    const scores = (m.ratings ?? []).map((r) => r.score)
    const avg_rating = scores.length > 0
      ? Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 10) / 10
      : null
    return {
      ...m,
      type: m.type === 2 ? 'tv_show' : 'movie',
      actor_ids: (m.movie_actors ?? []).map((ma) => ma.actor_id),
      avg_rating,
      rating_count: scores.length,
      movie_actors: undefined,
      ratings: undefined,
    }
  })
  return NextResponse.json({ data: mapped, count: count ?? 0 })
}

export async function POST(request: NextRequest) {
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
    .insert(payload)
    .select()
    .single()

  if (error) {
    console.error('[POST /api/movies] Supabase error:', JSON.stringify(error, null, 2))
    return NextResponse.json({ error: error.message, details: error }, { status: 500 })
  }

  if (actor_ids?.length && data?.id) {
    const rows = actor_ids.map((aid: string) => ({ movie_id: data.id, actor_id: aid }))
    await supabaseServer.from('movie_actors').insert(rows)
  }

  return NextResponse.json(data, { status: 201 })
}
