import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { createAxios } from '../../libs/axios'
import { UserPageDto } from 'types/dto/userPageDto'
import { FetchFilmReviewsByFilmIdDTO } from 'types/film'

type Props = {
  userId: string
  initialData: UserPageDto
}

const { axios } = createAxios()

const fetcher = (url: string) =>
  axios.get<UserPageDto>(url).then((res) => res.data)

export const useUserPage = ({ userId, initialData }: Props) => {
  const { data, error } = useSWR<UserPageDto>(
    `/api/user?userId=${userId}`,
    fetcher,
    {
      fallbackData: initialData,
    },
  )
  console.log(data)

  return {
    data,
    error,
    isLoading: !error && !data,
  }
}
