import 'reflect-metadata'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import Cors from 'cors'
import { UsersResolver } from '../../src/schema/user/users.resolver'
import { MembershipResolver } from '../../src/schema/membership/memberships.resolver'
//import { connectDB } from '../../server/utils/connectDB';

// Setup cors
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://studio.apollographql.com',
  ],
})

// Middleware to run the cors configuration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

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
  await runMiddleware(req, res, cors)
  //await connectDB();
  await startServer
  await server.createHandler({ path: '/api/graphql' })(req, res)
}
