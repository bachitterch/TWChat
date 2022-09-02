import linkifyHtml from 'linkify-html'
import { Session } from 'next-auth'
import tmi from 'tmi.js'

export const tmiClient = (streamer: string, session: Session) => {
  const clientOptions = {
    options: {
      skipUpdatingEmotesets: true,
      clientId: process.env.TWITCH_CLIENT_ID || ''
    },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: session?.user.name,
      password: 'oauth:' + session?.accessToken
    },
    channels: ['#' + streamer]
  }

  return new tmi.Client(clientOptions)
}

export const parseMessage = (message: string, emotes: any) => {
  let newMessage = message.split('')

  for (let emoteIndex in emotes) {
    let emote = emotes[emoteIndex]

    for (let charIndexes in emote) {
      let emoteIndexes = emote[charIndexes]

      if (typeof emoteIndexes == 'string') {
        emoteIndexes = emoteIndexes.split('-')
        emoteIndexes = [parseInt(emoteIndexes[0]), parseInt(emoteIndexes[1])]

        for (let i = emoteIndexes[0]; i <= emoteIndexes[1]; ++i) {
          newMessage[i] = ''
        }

        newMessage[emoteIndexes[0]] =
          '<img class="emoticon w-7 inline-block" src="http://static-cdn.jtvnw.net/emoticons/v1/' +
          emoteIndex +
          '/3.0">'
      }
    }
  }

  let newMessageString = newMessage.join('')

  return linkifyHtml(newMessageString, {
    target: '_blank',
    nofollow: true
  })
}
