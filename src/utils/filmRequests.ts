export const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY
export const DISCOVER_FILM_URL = `/discover/movie?api_key=${API_KEY}`
export const SEARCH_FILM_URL = `/search/movie?api_key=${API_KEY}`
export const POPULAR_FILM_URL = `/trending/all/week?api_key=${API_KEY}`
export const POPULAR_PERSON_URL = `/person/popular?api_key=${API_KEY}&language=en-US`
export const SEARCH_PERSON_URL = `/search/person?api_key=${API_KEY}&language=en-US&include_adult=false`
export const TMDB_HOST = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original/'

type Requests = {
  [fetchSomething: string]: {
    title: string
    url: string
  }
}

export type Genre = {
  id: number
  genreName: string
}

export const genres: Genre[] = [
  {
    id: 28,
    genreName: 'Action',
  },
  {
    id: 12,
    genreName: 'Adventure',
  },
  {
    id: 16,
    genreName: 'Animation',
  },
  {
    id: 35,
    genreName: 'Comedy',
  },
  {
    id: 80,
    genreName: 'Crime',
  },
  {
    id: 99,
    genreName: 'Documentary',
  },
  {
    id: 18,
    genreName: 'Drama',
  },
  {
    id: 10751,
    genreName: 'Family',
  },
  {
    id: 14,
    genreName: 'Fantasy',
  },
  {
    id: 36,
    genreName: 'History',
  },
  {
    id: 27,
    genreName: 'Horror',
  },
  {
    id: 10402,
    genreName: 'Music',
  },
  {
    id: 9648,
    genreName: 'Mystery',
  },
  {
    id: 10749,
    genreName: 'Romance',
  },
  {
    id: 878,
    genreName: 'ScienceFiction',
  },
  {
    id: 10770,
    genreName: 'TVMovie',
  },
  {
    id: 53,
    genreName: 'Thriller',
  },
  {
    id: 10752,
    genreName: 'War',
  },
  {
    id: 37,
    genreName: 'Western',
  },
]

export const getGenreID = (genre: string) => {
  const genreId = genres.find((_genre) => _genre.genreName === genre)
    ?.id as number
  return genreId
}

export const getGenreIDs = (genres: string[]) => {
  const genreIdArray = genres.map((genre) => {
    return getGenreID(genre)
  })

  return genreIdArray.join()
}

export const getGenreName = (genreId: number): string | undefined => {
  const genre = genres.find((_genre) => {
    return _genre.id === genreId
  })
  return genre?.genreName
}

///   まずは、ここらへんのAPIの仕様を変える
//es凛とで、consoleがえらーになるやつと、つかってないやつがあるとえらーになるやつ入れる

export const requests: Requests = {
  fetchTrending: {
    title: 'Trending',
    url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  fetchTopRated: {
    title: 'TopRated',
    url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  fetchActionMovies: {
    title: 'Actions',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedyMovies: {
    title: 'Comedy',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  },
  fetchHorrorMovies: {
    title: 'Horror',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  },
  fetchRomanceMovies: {
    title: 'Romance',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchMystery: {
    title: 'Mistery',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  },
  fetchSciFi: {
    title: 'SF',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  },
  fetchWestern: {
    title: 'Western',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  },
  fetchAnimation: {
    title: 'Animation',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  },
  fetchTV: {
    title: 'TV',
    url: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
  },
}
