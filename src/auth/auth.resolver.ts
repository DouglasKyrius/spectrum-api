import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoggedUserResponse } from './dto/logged-user.response';
import { SignInInput } from './dto/sign-in.input';
import { User } from '@/users/entities/user.entity';
import { SignUpInput } from './dto/sign-up.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoggedUserResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUpUser(signUpInput);
  }

  @Mutation(() => LoggedUserResponse)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signInUser(signInInput);
  }
}
