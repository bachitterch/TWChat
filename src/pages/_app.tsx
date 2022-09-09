import '@styles/globals.css'
import { NextComponentType } from 'next'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

type CustomAppProps = AppProps & {
  pageProps: NextComponentType & { session?: Session }
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: CustomAppProps) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
      </Head>
      <ThemeProvider attribute='class'>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
export default MyApp
