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
