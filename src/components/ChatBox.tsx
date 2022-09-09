import { FC, useEffect, useRef, useState } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { styled } from '@stitches/react'
import { Userstate } from 'tmi.js'

export const ChatBox: FC<ChatBoxProps> = ({ userData, isMod }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.map(user => user?.userstate.id)])

  const [height, setHeight] = useState(window.innerHeight - 42 - 70)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight - 42 - 70)
    })
  }, [height])

  const StyledScrollArea = styled(ScrollArea.Root, {
    maxHeight: height,
    height: '100%',
    overflow: 'hidden'
  })

  if (typeof window !== 'undefined') {
    return (
      <StyledScrollArea>
        <ScrollArea.Viewport className='w-full h-full p-2.5 text-sm text-gray-900 bg-white rounded-lg  dark:bg-gray-800  dark:text-white'>
          {userData.map(user => {
            const Tag = styled('span', {
              color: user.userstate.color
            })

            return (
              <div
                key={user.userstate.id}
                className='flex space-x-2 text-sm md:text-base'
              >
                <div>{isMod && ''}</div>
                <Tag>{user.userstate['display-name']}: </Tag>
                <span
                  dangerouslySetInnerHTML={{
                    __html: user.message
                  }}
                />
              </div>
            )
          })}
          <div ref={ref} className='w-full'></div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation='vertical'>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </StyledScrollArea>
    )
  }

  return null
}

interface ChatBoxProps {
  userData: UserData
  isMod: Boolean
}

type UserData = {
  message: string
  userstate: Userstate
}[]
