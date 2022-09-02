import { Card } from 'flowbite-react'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@components/MainLayout'
import { getFollowedStreams } from '@lib/twitch/user'
import { getServerSession } from '@lib/utils/getServerSession'

const Streams: NextPage<Props> = ({ streams }) => {
  const { data: session } = useSession()

  const twitchThumbnailLoader = (streamer: string) => {
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer}-1920x1080.jpg`
  }

  return (
    <Container>
      <div className='grid space-y-8'>
        {streams.map((stream: StreamData) => {
          return (
            <Link href={`/${stream?.user_login}`} key={stream.id}>
              <a>
                <Card>
                  <Image
                    src={twitchThumbnailLoader(stream?.user_login)}
                    width={1920}
                    alt={stream.user_name}
                    height={1080}
                  />
                  <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {stream?.title}
                  </h2>
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {stream?.user_name}
                  </p>
                </Card>
              </a>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}
export default Streams

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const token = session?.accessToken as string
  const id = session?.user?.id as string

  const { data } = await getFollowedStreams(id, token)

  return {
    props: {
      session,
      streams: data
    }
  }
}

type Props = {
  streams: StreamData[]
}

interface StreamData {
  game_id: string
  game_name: string
  id: string
  is_mature: boolean
  language: string
  started_at: string
  tag_ids: string[]
  thumbnail_url: string
  title: string
  type: string
  user_id: string
  user_login: string
  user_name: string
  view_count: number
}
