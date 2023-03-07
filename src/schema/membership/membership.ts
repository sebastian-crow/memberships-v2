import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Membership {
  @Field(() => ID)
  type!: string

  @Field(() => String)
  description!: string
}
