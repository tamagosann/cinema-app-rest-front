import ClearIcon from '@mui/icons-material/Clear'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import { IconButton, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React, { FC } from 'react'

const useStyles = makeStyles({
  textField: {
    width: '100%',
    [`& fieldset`]: {
      borderRadius: '4px 0 0 4px',
    },
  },
})

type Props = {
  keyword: string
  handleChangeKeyword: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  clearKeyword: () => void
  handleClickSearchButton: () => void
}

const SearchWithButton: FC<Props> = ({
  keyword,
  clearKeyword,
  handleClickSearchButton,
  handleChangeKeyword,
}) => {
  const { textField } = useStyles()
  return (
    <Box display='flex'>
      <Box className={textField}>
        <TextField
          label='search Actor or Film'
          placeholder='die hard'
          variant='outlined'
          value={keyword}
          fullWidth={true}
          onChange={handleChangeKeyword}
          InputProps={{
            endAdornment: (
              <IconButton onClick={clearKeyword} disabled={!keyword}>
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
          onClick={handleClickSearchButton}
        >
          <SavedSearchIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default SearchWithButton
