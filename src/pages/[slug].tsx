import { FormEvent, useEffect, useState } from 'react'

import { TextInput } from 'flowbite-react'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Userstate } from 'tmi.js'

import { ChatBox } from '@components/ChatBox'
import { Container } from '@components/MainLayout'
import { parseMessage, tmiClient } from '@lib/tmi'
import { getStream, getUser } from '@lib/twitch/user'
import { getServerSession } from '@lib/utils/getServerSession'

// const TwitchEmbed = dynamic(() => import('@components/VideoEmbed'), {
//   ssr: false
// })

const Stream: NextPage<Props> = ({ streamData }) => {
  const [userData, setUserData] = useState<UserData[]>([])
  const [msg, setMsg] = useState('')

  const [isMod, setIsMod] = useState(false)

  const { data: session } = useSession()
  const username = session?.user?.name || ''
  const streamer: string = streamData[0]?.user_name || ''

  const client = tmiClient(streamer, session as Session)

  useEffect(() => {
    client.on('connected', () => {
      checkMod()
    })

    client.on('chat', (channel, userstate, message) => {
      const emotes = userstate.emotes
      const parsedMessages = parseMessage(message, emotes)
      updateUserData(parsedMessages, userstate)
    })

    client.disconnect()
  }, [])

  const checkMod = () => {
    client.mods(streamer).then(mods => {
      if (mods.includes(username)) {
        setIsMod(true)
      } else {
        setIsMod(false)
      }
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    client.say(streamer, msg)
    setMsg('')
  }

  const updateUserData = (message: string, userstate: Userstate) => {
    return setUserData((prevstate: any) => [
      ...prevstate,
      { message, userstate }
    ])
  }

  client.connect()

  if (streamData.length === 0) {
    return <Container>User is not live</Container>
  }

  if (!session) {
    return <Container>Unauthroized</Container>
  }

  return (
    <Container>
      {session && (
        <div className='overflow-auto'>
          {/* <div className='sticky top-0 w-full'>
            <p>Streamer: {streamData[0]?.user_name}</p>

            <TwitchEmbed channel={streamData[0]?.user_login} />
          </div> */}

          <ChatBox userData={userData}></ChatBox>

          <form
            className='absolute bottom-0 inset-x-0 w-full mx-auto max-w-2xl px-10'
            onSubmit={handleSubmit}
          >
            <TextInput
              type='text'
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
          </form>
        </div>
      )}
    </Container>
  )
}
export default Stream

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context)
  const accessToken = session?.accessToken as string
  const slug = context?.query.slug as string

  if (session) {
    const streamerData = await getUser(slug, accessToken)

    const streamData = await getStream(streamerData[0].id, accessToken)

    return {
      props: {
        streamData
      }
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

type Props = {
  session: Session
  streamData: StreamData[]
}

interface StreamData {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  title: string
  view_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
  is_mature: boolean
}

interface UserData {
  message: string
  userstate: Userstate
}
