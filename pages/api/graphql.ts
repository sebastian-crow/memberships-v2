import 'reflect-metadata'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'

import { UsersResolver } from '../../src/schema/user/users.resolver'
import { MembershipResolver } from '../../src/schema/membership/memberships.resolver'

const schema = await buildSchema({
  resolvers: [UsersResolver, MembershipResolver],
})

const server = new ApolloServer({ schema })

export const config = {
  api: {
    bodyParser: false,
  },
}

const startServer = server.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  await server.createHandler({ path: '/api/graphql' })(req, res)
}
