import useSWRInfinite from 'swr/infinite'
import { FetchFilmsByfilmIdDTO } from 'types/film'
import {
  DISCOVER_FILM_URL,
  POPULAR_FILM_URL,
  SEARCH_FILM_URL,
  TMDB_HOST,
} from 'utils/filmRequests'

type Props = {
  genre: string | undefined
  keyword: string | undefined
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res: Response) => {
      return res.json()
    })
    .then((res: FetchFilmsByfilmIdDTO) => {
      console.log(res)
      return res.results
    })
    .catch(() => undefined)

export const useFilmListBySearch = ({ genre, keyword }: Props) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    if (!!genre) {
      return `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${genre}&page=${
        pageIndex + 1
      }`
    } else if (!!keyword) {
      return `${TMDB_HOST}${SEARCH_FILM_URL}&query=${keyword}&page=${
        pageIndex + 1
      }`
    } else {
      return `${TMDB_HOST}${POPULAR_FILM_URL}&page=${pageIndex + 1}`
    }
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
  )

  return {
    count: data?.length,
    error,
    isLoading: !error && !data,
    data: data?.flat(),
    size,
    setSize,
    isValidating,
  }
}
