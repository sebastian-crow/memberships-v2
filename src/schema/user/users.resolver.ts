import { Resolver, Query } from 'type-graphql'

import { User } from './users'
import users from './users.json'

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  user(): User[] {
    return users
  }
}
