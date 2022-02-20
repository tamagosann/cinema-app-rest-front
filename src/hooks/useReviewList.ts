import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { FetchFilmReviewsByFilmIdDTO } from 'types/film'

type Props = {
  filmId: number
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res: Response) => res.json())
    .then((res: FetchFilmReviewsByFilmIdDTO) => res)

export const useFilmReviewList = ({ filmId }: Props) => {
  const [page, setPage] = useState(1)
  const [totalpage, setTotalPage] = useState(1)
  const { data, error } = useSWR(`/auth/login`, fetcher)
  console.log(data)

  useEffect(() => {
    if (!data) return
    setTotalPage(data.totalPages)
  }, [data])

  return {
    error,
    totalPage: totalpage,
    isLoading: !error && !data,
    data: data?.results,
    totalResults: data?.totalResults,
    page,
    setPage,
  }
}
