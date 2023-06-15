import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtTokenService: JwtService,
  ) {}

  async generateUserCredentials(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      picture: user.picture,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async signInUser(signInInput: SignInInput) {
    const user = await this.usersService.validateUser(
      signInInput.email,
      signInInput.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid password');
    }
    return this.generateUserCredentials(user);
  }

  signInOAuthUser(user: any) {
    return this.generateUserCredentials(user);
  }

  async signUpUser(signUpInput: SignUpInput) {
    const user = await this.usersService.create(signUpInput);
    return this.generateUserCredentials(user);
  }
}
