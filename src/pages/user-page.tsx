import { GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { FC } from 'react'
import { createAxios } from '../../libs/axios'
import { UserPageView } from 'components/views/Userpage'
import { useUserPage } from 'hooks/useUserPage'
import { UserPageDto } from 'types/dto/userPageDto'

const UserPagePage: FC<UserPageDto> = (props) => {
  const router = useRouter()
  const userId = router.query.userId as string
  const { data: userData } = useUserPage({
    userId,
    initialData: props,
  })
  return <UserPageView {...{ ...userData }} />
}

export default UserPagePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { axios } = createAxios()
  const userId = context.query.userId as string | undefined
  if (!userId) return { notFound: true }

  try {
    const res = await axios.get<UserPageDto>(`/api/user?userId=${userId}`)
    return {
      props: res.data,
    }
  } catch (err) {
    return {
      // 空プロップスを返す事でスケルトン表示させる
      props: {},
    }
  }
}
