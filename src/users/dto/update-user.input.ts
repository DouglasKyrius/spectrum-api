import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ProfileUserInput } from './profile-user.input';

@InputType()
export class UpdateUserInput extends PartialType(ProfileUserInput) {
  @Field(() => String)
  id: string;
}
