import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Avatar } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import { default as Link } from 'next/link'

import { DarkModeToggle } from './DarkThemeToggle'

interface NavProps {
  children?: ReactNode
}

export const Nav: FC<NavProps> = () => {
  const { data: session } = useSession()

  return (
    <nav className='flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-700'>
      <div>
        <Link href='/'>
          <a>TWChat</a>
        </Link>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='focus-visible:outline-none'>
          <Avatar
            alt='Nav Menu'
            img={session?.user.image}
            rounded={true}
            bordered={true}
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align='end'
            className='bg-gray-800 focus-visible:outline-none rounded-md border-gray-700 border'
          >
            <DropdownMenu.Item className='focus-visible:outline-none p-6'>
              <p>{session?.user.name}</p>
              <p>{session?.user.email}</p>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className='h-[1px] bg-gray-200' />

            <DropdownMenu.Group>
              <DropdownMenu.Item className='focus-visible:outline-none'>
                <Link href='/'>
                  <a>Dashboard</a>
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Group>
              <DropdownMenu.Item className='focus-visible:outline-none'>
                <DarkModeToggle />
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  )
}
/* 
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

*/
