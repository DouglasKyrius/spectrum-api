import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

const { NODE_ENV } = process.env;

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: !NODE_ENV ? '.env' : `.env.${NODE_ENV}`,
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
