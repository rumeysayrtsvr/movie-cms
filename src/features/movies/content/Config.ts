import { moviesService } from '@/features/movies/services/moviesService'
import { tvshowsService } from '@/features/movies/services/tvshowsService'
import { Movie, MovieFilters, MovieFormData } from '@/types'

export type ContentService = {
  getAll: (filters?: Partial<MovieFilters>) => Promise<{ data: Movie[]; count: number }>
  getById: (id: string) => Promise<Movie>
  create: (payload: MovieFormData) => Promise<Movie>
  update: (id: string, payload: Partial<MovieFormData>) => Promise<Movie>
  delete: (id: string) => Promise<void>
}

export type Mode = 'movie' | 'tvshow'

export interface ModeConfig {
  title: string
  addLabel: string
  searchPlaceholder: string
  fixedType: 'movie' | 'tv_show' | undefined
  defaultType: 'movie' | 'tv_show'
  showTypeColumn: boolean
  emptyText: string
  deleteTitle: string
  deleteDesc: (t: string) => string
  msg: { add: string; update: string; delete: string }
  dialogAdd: string
  dialogEdit: string
  service: ContentService
}

export const MOVIE_CONTENT_CONFIG: Record<Mode, ModeConfig> = {
  movie: {
    title: 'Filmler',
    addLabel: 'Film Ekle',
    searchPlaceholder: 'Film ara...',
    fixedType: 'movie',
    defaultType: 'movie',
    showTypeColumn: true,
    emptyText: 'Film bulunamadı',
    deleteTitle: 'Filmi Sil',
    deleteDesc: (t: string) => `"${t}" filmini silmek istediğinize emin misiniz?`,
    msg: { add: 'Film eklendi!', update: 'Film güncellendi!', delete: 'Film silindi!' },
    dialogAdd: 'Film Ekle',
    dialogEdit: 'Film Düzenle',
    service: moviesService,
  },
  tvshow: {
    title: 'Diziler',
    addLabel: 'Dizi Ekle',
    searchPlaceholder: 'Dizi ara...',
    fixedType: 'tv_show',
    defaultType: 'tv_show',
    showTypeColumn: false,
    emptyText: 'Dizi bulunamadı',
    deleteTitle: 'Diziyi Sil',
    deleteDesc: (t: string) => `"${t}" dizisini silmek istediğinize emin misiniz?`,
    msg: { add: 'Dizi eklendi!', update: 'Dizi güncellendi!', delete: 'Dizi silindi!' },
    dialogAdd: 'Dizi Ekle',
    dialogEdit: 'Dizi Düzenle',
    service: tvshowsService,
  },
}
