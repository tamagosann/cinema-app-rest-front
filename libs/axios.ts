import defaultAxios from 'axios'

import type { AxiosError } from 'axios'
import type { NextApiRequest } from 'next'

export const createAxios = (cookie?: NextApiRequest['headers']['cookie']) => {
  const { create } = defaultAxios
  const isAxiosError = <T = any>(payload: any): payload is AxiosError<T> =>
    !!payload.isAxiosError
  const isClient = typeof window !== 'undefined'
  const baseURL = !!isClient ? '' : `${process.env.NEXT_PUBLIC_BFF_URL}`
  console.log('baseURL')
  console.log(baseURL)

  const axios = create({
    baseURL,
    withCredentials: true,
    ...(cookie && {
      headers: {
        Cookie: cookie,
      },
    }),
  })

  return {
    axios,
    isAxiosError,
  }
}
