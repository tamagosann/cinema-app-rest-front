import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { SearchWithButton } from 'components/UIKit/searchWithButton'
import { Genre, genres } from 'utils/filmRequests'

function getStyles(genreName: string, genres: Genre[], theme: Theme) {
  return {
    fontWeight:
      genres.find((_genre) => _genre.genreName === genreName) === undefined
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const IndexView = () => {
  const [selectedGenreNames, setSelectedGenreNames] = React.useState<string[]>(
    [],
  )

  const [keyword, setKeyWord] = useState('')

  const handleChangeGenresSelected = (
    event: SelectChangeEvent<typeof selectedGenreNames>,
  ) => {
    const {
      target: { value },
    } = event
    setSelectedGenreNames(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleChangeKeyword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setKeyWord(e.target.value)
  }

  const clearKeyword = () => {
    setKeyWord('')
  }

  const theme = useTheme()

  return (
    <>
      <Box>
        <Box>
          <SearchWithButton
            {...{
              keyword,
              handleChangeKeyword,
              clearKeyword,
              handleClickSearchButton: () => {
                console.log('clicked')
              },
            }}
          />
        </Box>
        <Box>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel>genres</InputLabel>
            <Select
              multiple
              value={selectedGenreNames}
              onChange={handleChangeGenresSelected}
              onClose={() => {}}
              input={<OutlinedInput label='Name' />}
              MenuProps={MenuProps}
            >
              {genres.map(({ genreName }) => (
                <MenuItem
                  key={genreName}
                  value={genreName}
                  style={getStyles(genreName, genres, theme)}
                >
                  {genreName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default IndexView
