import '../styles/global.css'

import type { AppProps } from 'next/app'
import { QueryClientProvider, Hydrate, QueryClient } from 'react-query'
import React from 'react'
import { GlobalsContext } from '@/context/GlobalContext'


import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  .use(LanguageDetector)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      useSuspense: false,
    },
  })

export { i18n }



const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })


    
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalsContext>
          <Component {...pageProps} />
        </GlobalsContext>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
