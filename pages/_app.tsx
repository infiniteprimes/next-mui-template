import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import React, { ReactElement, ReactNode } from 'react'
import { EmotionCache } from '@emotion/react'
import DefaultLayout from '../component/layout/DefaultLayout'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query/src/QueryClientProvider'
import { Hydrate } from '@tanstack/react-query/src/Hydrate'
import PropTypes from 'prop-types'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayoutAndEmotionCache = AppProps<any> & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}

function App({ Component, pageProps, emotionCache }: AppPropsWithLayoutAndEmotionCache) {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{getLayout(<Component {...pageProps} />)}</Hydrate>
    </QueryClientProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
export default App
