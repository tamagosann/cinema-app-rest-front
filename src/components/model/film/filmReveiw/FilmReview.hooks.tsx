import { useMemo } from 'react'

type Props = {
  star: number | undefined
  reviewDate: number | undefined
}

const useFilmReview = ({ star, reviewDate }: Props) => {
  const starToShow = useMemo(() => {
    return star ? star.toFixed(1) : undefined
  }, [star])

  const reviewDateToShow = useMemo(() => {
    if (!reviewDate) return undefined
    const reviewDateObject = new Date(reviewDate)
    const year = reviewDateObject.getFullYear()
    const month = reviewDateObject.getMonth() + 1
    const day = reviewDateObject.getDate()

    const reviewDateToShow = `${year}/${month}/${day}`
    return reviewDateToShow
  }, [reviewDate])

  return {
    starToShow,
    reviewDateToShow,
  }
}

export default useFilmReview
