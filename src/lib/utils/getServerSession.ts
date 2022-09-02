import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { authOptions } from 'pages/api/auth/[...nextauth]'

export const getServerSession = async (context: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return await unstable_getServerSession(context.req, context.res, authOptions)
}
