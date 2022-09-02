import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
