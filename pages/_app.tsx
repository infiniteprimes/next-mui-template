import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import DefaultLayout from '../component/layout/DefaultLayout'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { MantineProvider } from '@mantine/core'

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

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            {getLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </Hydrate>
      </QueryClientProvider>
    </div>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
export default App
