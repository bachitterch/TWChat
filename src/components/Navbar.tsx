import { FC, ReactNode } from 'react'

import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

interface NavProps {
  children?: ReactNode
}

export const Nav: FC<NavProps> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <>
      <Navbar>
        <Navbar.Brand href='/'>
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            TWChat
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          {session ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                session && (
                  <Avatar
                    alt='User avatar'
                    img={session?.user.image}
                    rounded={true}
                  />
                )
              }
            >
              <Dropdown.Header>
                <span className='block text-sm'>{session?.user.name}</span>
                <span className='block truncate text-sm font-medium'>
                  {session?.user.email}
                </span>
              </Dropdown.Header>
              <Link href='/dashboard'>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button onClick={() => signIn('twitch')}>SignIn</Button>
          )}
        </div>
      </Navbar>
    </>
  )
}
