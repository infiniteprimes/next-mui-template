'use client'
import './output.css'
import { ReactNode, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query/src/QueryClientProvider'
import { Hydrate } from '@tanstack/react-query/src/Hydrate'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <html>
      <head />
      <body>
        <QueryClientProvider client={queryClient}>
          <div>root layout</div>
          <Hydrate>{children}</Hydrate>
        </QueryClientProvider>
      </body>
    </html>
  )
}
