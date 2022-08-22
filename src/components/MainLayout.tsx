import { FC, ReactNode } from 'react'

interface ContainerProps {
  children?: ReactNode
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <main className='mx-auto flex w-full max-w-2xl flex-col justify-center px-8 py-36 h-full'>
        {children}
      </main>
    </>
  )
}
