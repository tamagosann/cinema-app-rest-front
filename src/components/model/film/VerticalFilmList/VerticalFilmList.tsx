import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { FilmCard } from '../filmCard'
import { FilmInfo } from 'types/dto/ssr'

type Props = {
  filmList: FilmInfo[] | undefined
  isValidating: boolean
}

const VerticalFilmList: FC<Props> = ({ filmList, isValidating }) => {
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          {!filmList || filmList.length === 0
            ? [...Array(20)].map((_: undefined, index: number) => {
                return (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Box>
                      <FilmCard {...{ isMobileSize: false }} />
                    </Box>
                  </Grid>
                )
              })
            : filmList.map((filmInfo, index) => {
                return (
                  <Grid item xs={6} sm={4} md={3} key={filmInfo?.id || index}>
                    <Box>
                      <FilmCard
                        {...(filmInfo as FilmInfo)}
                        {...{ isMobileSize: false }}
                      />
                    </Box>
                  </Grid>
                )
              })}
          {isValidating &&
            [...Array(20)].map((_: undefined, index: number) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={index + 21}>
                  <Box>
                    <FilmCard {...{ isMobileSize: false }} />
                  </Box>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    </>
  )
}

export default VerticalFilmList
