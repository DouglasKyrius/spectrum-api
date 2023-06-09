import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;
}
