import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { FC } from 'react'

type Direction = 'right' | 'left' | 'up' | 'down'

type Props = {
  direction?: Direction
  handleClick: () => void
}

const useStyles = makeStyles({
  right: { transform: 'rotate(0deg)' },
  left: { transform: 'rotate(180deg)' },
  up: { transform: 'rotate(-90deg)' },
  down: { transform: 'rotate(90deg)' },
})

const ArrowButton: FC<Props> = ({ direction, handleClick }) => {
  const { right, left, up, down } = useStyles()

  const classNameSelector = (direction: Direction | undefined) => {
    switch (direction) {
      case 'right':
        return right
      case 'left':
        return left
      case 'up':
        return up
      case 'down':
        return down
      default:
        return right
    }
  }

  const className = classNameSelector(direction)

  return (
    <IconButton onClick={handleClick}>
      <KeyboardArrowRightIcon className={className} />
    </IconButton>
  )
}

export default ArrowButton
