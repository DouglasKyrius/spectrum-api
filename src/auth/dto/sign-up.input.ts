import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field(() => String, { description: 'name' })
  displayName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'username', nullable: true })
  username: string;

  @Field(() => String, { description: 'password' })
  password: string;
}
