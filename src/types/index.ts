export interface MovieCastMember {
  id: string
  name: string
  character: string
  image: string | null
}

export interface Movie {
  id: string
  title: string
  categories: number[]
  actor_ids?: string[]
  cast?: MovieCastMember[]
  type: 'movie' | 'tv_show'
  release_year: number
  status: 'active' | 'inactive'
  poster_url: string | null
  trailer_url: string | null
  description: string | null
  countries: string[]
  languages: string[]
  avg_rating?: number | null
  rating_count?: number
  created_at: string
}

export interface Category {
  id: string
  num_id?: number
  name: string
  created_at: string
}

export interface Actor {
  id: string
  name: string
  photo_url: string | null
  birth_date: string | null
  biography: string | null
  created_at: string
}

export interface MovieActor {
  id: string
  movie_id: string
  actor_id: string
  character_name: string | null
  actor?: Actor
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  role: 'admin' | 'editor'
}



export type MovieFormData = Omit<Movie, 'id' | 'created_at' | 'updated_at'>
export type CategoryFormData = Pick<Category, 'name'>
export type ActorFormData = Omit<Actor, 'id' | 'created_at'>


export interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export interface MovieFilters {
  search: string
  categories: string[]
  status: 'all' | 'active' | 'inactive'
  sort: 'newest' | 'oldest'
  type?: 'movie' | 'tv_show'
}

