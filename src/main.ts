import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    session({
      secret: configService.get('JWT_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(configService.get('PORT') || 4000);
}
bootstrap();
