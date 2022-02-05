import useSWRInfinite from 'swr/infinite'
import { createAxios } from '../../libs/axios'
import { FetchFilmReviewsByFilmIdDTO, FetchFilmsByfilmIdDTO } from 'types/film'

const FILM_PATH = '/api/film'

type Props = {
  genreId: number
}

const { axios } = createAxios()

const fetcher = (url: string) =>
  axios.get<FetchFilmReviewsByFilmIdDTO>(url).then((res) => res.data.results)

export const useFilmList = ({ genreId }: Props) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    return `${FILM_PATH}?with_genres=${genreId}&page=${pageIndex + 1}`
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
  )
  // const url = `${TMDB_HOST}${DISCOVER_FILM_URL}&with_genres=${genreId}`
  // const { data, error } = useSWR<FilmInfo[], Error>(url, fetcher, {
  //   revalidateIfStale: true,
  // })
  console.log(data)

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
