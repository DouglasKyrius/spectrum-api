import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoggedUserResponse {
  @Field(() => String)
  access_token: string;
}
