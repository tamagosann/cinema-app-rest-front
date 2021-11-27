import { Button, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { PersonData } from 'common/test_mock/stabPersonData'
import { PersonCard } from 'components/model/person/personCard'

const useStyles = makeStyles((theme: Theme) => ({
  personCardListRoot: {
    width: '100%',
  },
  personCardListStyle: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    overflowX: 'scroll',
  },
  filmCardBox: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: '100%',
    flex: '0 0 auto',
  },
}))

type Props = {
  personList: PersonData[] | undefined
  isValidating: boolean
  loadMore?: () => Promise<any[] | undefined>
  selectActor?: (personData: PersonData) => void
}

const HorizontalPersonCardList: FC<Props> = ({
  personList,
  isValidating,
  loadMore,
  selectActor = () => {},
}) => {
  const { personCardListRoot, personCardListStyle, filmCardBox } = useStyles()

  const onScroll = (e: React.UIEvent<React.ReactNode>) => {
    if (!loadMore) return
    // as HTMLDivElement としないとtype errorになる
    const target = e.target as HTMLDivElement

    const scrollRight =
      target.scrollWidth - (target.scrollLeft + target.clientWidth)

    // validation中（新規でfetch中も発動させない）
    if (isValidating) return
    if (scrollRight > 500) return

    loadMore()
  }

  return (
    <>
      <Box className={personCardListRoot}>
        <Box className={personCardListStyle} onScroll={onScroll}>
          {!personList || personList.length === 0
            ? [...Array(20)].map((_, index) => {
                return (
                  <Box key={index} className={filmCardBox}>
                    <PersonCard />
                  </Box>
                )
              })
            : personList.map((person) => {
                return (
                  <Box key={person.id} className={filmCardBox}>
                    <Button onClick={() => selectActor(person)}>
                      <PersonCard {...person} />
                    </Button>
                  </Box>
                )
              })}
          {isValidating &&
            [...Array(20)].map((_, index) => {
              return (
                <Box key={index} className={filmCardBox}>
                  <PersonCard />
                </Box>
              )
            })}
        </Box>
      </Box>
    </>
  )
}

export default HorizontalPersonCardList
