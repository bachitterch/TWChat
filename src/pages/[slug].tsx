import { FormEvent, useEffect, useState } from 'react'

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
            className='absolute bottom-0 inset-x-0 w-full mx-auto max-w-2xl'
            onSubmit={handleSubmit}
          >
            <label htmlFor='chat' className='sr-only'>
              Your message
            </label>
            <div className='flex items-center py-2 px-3 bg-gray-50 dark:bg-gray-700'>
              <button
                type='button'
                className='p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
              >
                <svg
                  aria-hidden='true'
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Add emoji</span>
              </button>
              <textarea
                id='chat'
                value={msg}
                onChange={e => setMsg(e.target.value)}
                rows={1}
                className='block mx-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
                placeholder='Your message...'
              ></textarea>
              <button
                type='submit'
                className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
              >
                <svg
                  aria-hidden='true'
                  className='w-6 h-6 rotate-90'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
                </svg>
                <span className='sr-only'>Send message</span>
              </button>
            </div>
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

    const streamData = await getStream(streamerData[0]?.id, accessToken)

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
