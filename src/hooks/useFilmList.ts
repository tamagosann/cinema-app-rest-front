import useSWRInfinite from 'swr/infinite'
import { FetchFilmsByfilmIdDTO } from 'types/film'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

type Props = {
  genreId: number
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

export const useFilmList = ({ genreId }: Props) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    return `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${genreId}&page=${
      pageIndex + 1
    }`
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
  )
  // const url = `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${genreId}`
  // const { data, error } = useSWR<FilmInfo[], Error>(url, fetcher, {
  //   revalidateIfStale: true,
  // })

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
