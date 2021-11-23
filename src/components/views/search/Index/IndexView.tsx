import ClearIcon from '@mui/icons-material/Clear'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import MovieIcon from '@mui/icons-material/Movie'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { useState, useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SearchWithButton } from 'components/UIKit/searchWithButton'
import { VerticalFilmListWithLabel } from 'components/organisms/film/VerticalFilmListWithLabel'
import { Genre, genres } from 'utils/filmRequests'

const useStyles = makeStyles({
  textField: {
    width: '100%',
    [`& fieldset`]: {
      borderRadius: '4px 0 0 4px',
    },
  },
})

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

interface IFormInput {
  keyword: string
  genre: Genre[]
  searchForWhat: 'people' | 'film'
}

const IndexView = () => {
  const { textField } = useStyles()

  const theme = useTheme()

  const { control, handleSubmit, getValues, setValue } = useForm<IFormInput>()

  //べつべつの検索をする。
  const onSubmitKeyword: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  const onSubmitGenre: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Box>
        <Box>
          <form>
            <Controller
              name='searchForWhat'
              control={control}
              render={({ field }) => (
                <FormControl component='fieldset' {...field}>
                  <FormLabel component='legend'>
                    What for do you want to search?
                  </FormLabel>
                  <RadioGroup row defaultValue='people'>
                    <FormControlLabel
                      value='people'
                      control={<Radio />}
                      label='people'
                    />
                    <FormControlLabel
                      value='film'
                      control={<Radio />}
                      label='film'
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Box sx={{ m: 1 }} />
            <Controller
              name='keyword'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Box display='flex'>
                  <Box width='100%' className={textField}>
                    <TextField
                      {...field}
                      label='search Actor or Film'
                      placeholder='die hard'
                      variant='outlined'
                      fullWidth={true}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => {}}
                            disabled={!getValues('keyword')}
                          >
                            <ClearIcon color='disabled' fontSize='small' />
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>
                  <Box
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderLeft: 'none',
                      borderRadius: '0 4px 4px 0',
                      width: 56,
                      flex: '0 0 auto',
                    }}
                  >
                    <IconButton
                      style={{ width: '100%', height: '100%' }}
                      onClick={() => {
                        handleSubmit(onSubmitKeyword)()
                      }}
                    >
                      <SavedSearchIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            />
            <Box sx={{ m: 1 }} />
            <Controller
              name='genre'
              control={control}
              render={({ field }) => (
                <Select
                  label='genre'
                  {...field}
                  fullWidth
                  multiple
                  onClose={() => handleSubmit(onSubmitGenre)()}
                  input={<OutlinedInput label='Name' />}
                  MenuProps={MenuProps}
                  value={getValues('genre') || []}
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
              )}
            />
          </form>
        </Box>
        <Box>
          <VerticalFilmListWithLabel label={} genre={} keyword={} />
        </Box>
      </Box>
    </>
  )
}

export default IndexView
