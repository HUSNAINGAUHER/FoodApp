import '../styles/global.css'

import type { AppProps } from 'next/app'
import { QueryClientProvider, Hydrate, QueryClient } from 'react-query'
import React from 'react'
import { GlobalsContext } from '@/context/GlobalContext'

const MyApp = ({ Component, pageProps }: AppProps) => 
  {
  const [queryClient] = React.useState(() => new QueryClient())
    
  
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalsContext >
            <Component {...pageProps} />
          </GlobalsContext>
        </Hydrate>
      </QueryClientProvider>
    )
  }


export default MyApp
