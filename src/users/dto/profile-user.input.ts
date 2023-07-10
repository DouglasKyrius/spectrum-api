import { InputType, Field } from '@nestjs/graphql';

@InputType()
class ExternalLinks {
  @Field(() => String)
  socialNetwork: string;
  @Field(() => String)
  href: string;
}

@InputType()
export class ProfileUserInput {
  @Field(() => String, { description: 'name' })
  displayName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'username' })
  username: string;

  @Field(() => String)
  title: string;

  @Field(() => Boolean)
  verifiedAccount: boolean;

  @Field(() => [String])
  techs: string[];

  @Field(() => String)
  bio: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  picture: string;

  @Field(() => String)
  provider: string;

  @Field(() => [ExternalLinks])
  externalLinks: ExternalLinks[];

  @Field(() => String, { description: 'password' })
  password: string;
}
