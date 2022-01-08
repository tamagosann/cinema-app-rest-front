import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

type ReviewFormInput = {
  title: string
  detail: string
  rating: number
}

type Props = {
  initialRating: number
}

export const useReviewModal = ({ initialRating }: Props) => {
  const formReturn = useForm<ReviewFormInput>()
  const {
    watch,
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = formReturn

  const rating = watch('rating') as unknown
  const ratingToShow = useMemo(() => {
    return rating ? parseInt(rating as string).toFixed(1) : initialRating
  }, [rating, initialRating])

  const submit = (data: ReviewFormInput) => {
    console.log(data)
  }

  return {
    formReturn,
    ratingToShow,
    register,
    control,
    errors,
    submit,
    handleSubmit,
  }
}
