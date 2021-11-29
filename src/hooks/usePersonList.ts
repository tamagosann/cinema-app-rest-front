import useSWRInfinite from 'swr/infinite'
import { FetchPersonsDTO } from 'types/film'
import { POPULAR_PERSON_URL, TMDB_HOST } from 'utils/filmRequests'

type Props = {
  personId?: number
  keyword?: string
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res: Response) => {
      return res.json()
    })
    .then((res: FetchPersonsDTO) => {
      console.log(res)
      return res.results
    })

export const usePersonList = ({ keyword }: Props) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    if (!keyword) {
      return `${TMDB_HOST}${POPULAR_PERSON_URL}&page=${pageIndex + 1}`
    } else {
      return `${TMDB_HOST}${POPULAR_PERSON_URL}&query=${keyword}&page=${
        pageIndex + 1
      }`
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
