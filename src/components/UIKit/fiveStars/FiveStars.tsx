import StarIcon from '@mui/icons-material/Star'
import Rating from '@mui/material/Rating'
import React, { useState, FC } from 'react'

type Props = {
  value: number | null
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => void
  readonly?: boolean
  size?: 'small' | 'medium' | 'large'
}

const FiveStars: FC<Props> = ({
  value,
  onChange,
  readonly = false,
  size = 'medium',
}) => {
  // const [value, setValue] = useState<number | null>(2)

  return (
    <Rating
      name='review'
      value={value}
      precision={0.5}
      onChange={onChange}
      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
      size={size}
      readOnly={readonly}
    />
  )
}

export default FiveStars
