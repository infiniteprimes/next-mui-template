import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import DefaultLayout from '../component/layout/DefaultLayout'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import themeGen from '../module/mui/theme'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<any> & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)
  const [queryClient] = React.useState(() => new QueryClient())
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(() => themeGen(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
export default App
