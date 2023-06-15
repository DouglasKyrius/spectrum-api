import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // auth/google/login
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() request: Request, @Res() res) {
    const token = await this.authService.signInOAuthUser(request.user);
    res.redirect(
      `${this.configService.get<string>(
        'FRONTEND_BASE_URL',
      )}/auth/callback?token=${token.access_token}`,
    );
    return { msg: 'ok' };
  }

  // auth/status
  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
