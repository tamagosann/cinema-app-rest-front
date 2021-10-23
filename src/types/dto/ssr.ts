export type TopSsrDto = {
  filmList: FilmList[]
}

export type FilmList = {
  release_date: '/d{4}_d{2}_d{2}/'
  title: string
  id: string
  backdrop_path: string
  genre_ids: string[]
  poster_path: string
  overview: string
}
