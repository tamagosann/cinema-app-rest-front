import useSWRInfinite from 'swr/infinite'
import { createAxios } from '../../libs/axios'
import { FetchPersonsDTO } from 'types/film'

const { axios } = createAxios()

const PEOPLE_PATH = '/api/people'

const fetcher = (url: string) =>
  axios.get<FetchPersonsDTO>(url).then((res) => res.data.results)

type Props = {
  keyword?: string
}

export const usePersonList = ({ keyword }: Props) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    if (!keyword) {
      return `${PEOPLE_PATH}?page=${pageIndex + 1}`
    } else {
      return `${PEOPLE_PATH}?query=${keyword}&page=${pageIndex + 1}`
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
