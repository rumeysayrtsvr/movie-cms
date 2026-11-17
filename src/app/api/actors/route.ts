import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') ?? ''
  const sort = searchParams.get('sort') ?? 'newest'

  let query = supabaseServer.from('actors').select('*')

  if (search) query = query.ilike('name', `%${search}%`)

  const orderMap: Record<string, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    oldest: { column: 'created_at', ascending: true },
    name_az: { column: 'name', ascending: true },
    name_za: { column: 'name', ascending: false },
  }
  const order = orderMap[sort] ?? orderMap.newest
  query = query.order(order.column, { ascending: order.ascending })

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const payload = {
    name: body.name,
    photo_url: body.photo_url || null,
    biography: body.biography || null,
    birth_date: body.birth_date || null,
  }

  const { data, error } = await supabaseServer
    .from('actors')
    .insert(payload)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
