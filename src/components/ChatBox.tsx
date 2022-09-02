import { FC, useEffect, useRef, useState } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { styled } from '@stitches/react'
import { Userstate } from 'tmi.js'

export const ChatBox: FC<ChatBoxProps> = ({ userData }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.map(user => user?.userstate.id)])

  const [height, setHeight] = useState(window.innerHeight - 42 - 70)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight - 205)
    })
  }, [])

  const StyledScrollArea = styled(ScrollArea.Root, {
    height: height,
    overflow: 'hidden'
  })

  if (typeof window !== 'undefined') {
    return (
      <StyledScrollArea>
        <ScrollArea.Viewport className='w-full h-full'>
          {userData.map(user => {
            const Tag = styled('span', {
              color: user.userstate.color
            })

            return (
              <div
                key={user.userstate.id}
                className='flex space-x-2 text-sm md:text-base'
              >
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
}

type UserData = {
  message: string
  userstate: Userstate
}[]
