import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useCallback, useState, useEffect } from 'react'
import { PersonData } from 'common/test_mock/stabPersonData'
import { VerticalFilmList } from 'components/model/film/VerticalFilmList'
import { HorizontalPersonCardList } from 'components/model/person/horizontalPersonCardList'
import { usePersonList } from 'hooks/usePersonList'

type Props = {
  keyword: string
}

const HorizontalPersonListWithFamousFor: FC<Props> = ({ keyword }) => {
  const {
    data: personList,
    error,
    size,
    setSize,
    isValidating,
  } = usePersonList({ keyword })

  const loadMore = useCallback(() => setSize(size + 1), [size, setSize])

  const [selectedActor, setSelectedActor] = useState<PersonData | null>(null)

  const selectActor = useCallback(
    (personData: PersonData) => {
      setSelectedActor(personData)
    },
    [setSelectedActor],
  )

  return (
    <>
      <Box>
        <Box>
          <Typography variant='h6'>
            {!keyword ? 'Popular Film actor' : `serched for "${keyword}"`}
          </Typography>
        </Box>
        <Box>
          <HorizontalPersonCardList
            {...{
              personList,
              isValidating,
              loadMore,
              selectActor,
            }}
          />
        </Box>
        <Box>
          {!!selectedActor && (
            <VerticalFilmList
              filmList={selectedActor.known_for}
              isValidating={false}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default HorizontalPersonListWithFamousFor
