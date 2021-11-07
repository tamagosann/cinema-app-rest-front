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

// release_dateは後で正規表現に置き換える
export type FilmInfo = {
  release_date: string
  title: string
  id: number
  backdrop_path: string
  genre_ids: number[]
  poster_path: string
  overview: string
  original_title: string
}
