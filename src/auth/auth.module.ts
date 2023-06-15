import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@/common/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { JwtStrategy, GoogleStrategy } from './strategies';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {}
