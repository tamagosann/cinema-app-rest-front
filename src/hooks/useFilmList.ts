import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { FilmInfo } from 'types/dto/ssr'
import { FetchFilmsByfilmIdDTO } from 'types/film'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

type Props = {
  genreId: number
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res: Response) => res.json())
    .then((res: FetchFilmsByfilmIdDTO) => res.results)
    .catch((err) => err)

export const useFilmList = ({ genreId }: Props) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    return `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${genreId}&page=${
      pageIndex + 1
    }`
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher)

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
  }
}
