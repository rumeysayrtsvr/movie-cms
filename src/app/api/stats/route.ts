import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET() {
  const [movies, tvshows, categories, actors] = await Promise.all([
    supabaseServer.from('movies').select('id', { count: 'exact', head: true }).eq('type', 1),
    supabaseServer.from('movies').select('id', { count: 'exact', head: true }).eq('type', 2),
    supabaseServer.from('categories').select('id', { count: 'exact', head: true }),
    supabaseServer.from('actors').select('id', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    movies: movies.count ?? 0,
    tvshows: tvshows.count ?? 0,
    categories: categories.count ?? 0,
    actors: actors.count ?? 0,
  })
}
