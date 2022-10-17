import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

// Create a theme instance.
const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#064e3b',
      },
      secondary: {
        main: '#2196f3',
      },
      error: {
        main: red.A400,
      },
      warning: {
        main: '#FFB300',
      },
    },
  })

export default theme
