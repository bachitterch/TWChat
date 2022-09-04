import { FC, ReactNode, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { Nav } from './Navbar'

interface ContainerProps {
  children?: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { data: session } = useSession()

  if (!mounted) return null
  return (
    <>
      <header className='mx-auto w-full max-w-2xl flex-col'>
        {session && <Nav />}
      </header>
      <main className='mx-auto flex w-full max-w-2xl flex-col h-full max-h-full'>
        {children}
      </main>
    </>
  )
}
