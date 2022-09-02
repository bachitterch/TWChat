import { Button } from 'flowbite-react'
import { GetServerSideProps, NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

import { Container } from '@components/MainLayout'
import { getServerSession } from '@lib/utils/getServerSession'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <Container>
      <div className='w-full h-full flex items-center justify-center'>
        <Button onClick={() => signIn('twitch')}>SignIn</Button>
      </div>
    </Container>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
