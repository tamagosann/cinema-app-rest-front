import useSWR from 'swr'
import { createAxios } from '../../libs/axios'
import { LoginUserDtoClient } from 'types/dto/loginDto'

const { axios } = createAxios()

const fetcher = async (url: string) => {
  const { data } = await axios.post<LoginUserDtoClient>(url)
  return data
}

export const useLoginUser = () => {
  const { data, error, mutate } = useSWR(
    typeof window !== 'undefined' ? `/api/auth/loginUser` : null,
    fetcher,
    {
      // useSwrをimmutable化 これもうreduxが必要な場合が思いつかない
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  console.log('data')
  console.log(data)

  return {
    data: data?.user,
    error,
    mutate,
  }
}
