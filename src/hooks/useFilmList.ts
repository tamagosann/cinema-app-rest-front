import useSWR from 'swr'
import { FilmInfo } from 'types/dto/ssr'
import { FetchFilmsByfilmIdDTO } from 'types/film'
import { DISCOVER_FILM_URL, TMDB_HOST } from 'utils/filmRequests'

type Props = {
  genreId: number
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res: Response) => res.json())
    .then((res: FetchFilmsByfilmIdDTO) => res.data)
    .catch((err) => err)

export const useFilmList = ({ genreId }: Props) => {
  const url = `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${genreId}`
  const { data, error } = useSWR<FilmInfo[], Error>(url, fetcher)

  return {
    count: data?.length,
    error,
    isLoading: !error && !data,
    data,
  }
}
