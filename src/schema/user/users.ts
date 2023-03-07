import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  name!: string

  @Field(() => String)
  username!: string

  @Field(() => String)
  password!: string

  @Field(() => String)
  phone!: string
  @Field(() => String)
  address!: string
}
