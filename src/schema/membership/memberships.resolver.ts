import { Resolver, Query } from 'type-graphql'

import { Membership } from './membership'
import memberships from './memberships.json'

@Resolver(Membership)
export class MembershipResolver {
  @Query(() => [Membership])
  membership(): Membership[] {
    return memberships
  }
}
