import { Module } from '@nestjs/common';
import { GQLModule } from './graphql.module';
import { ConfigModule } from './config.module';
import { MongoModule } from './mongo.module';

@Module({
  imports: [ConfigModule, GQLModule, MongoModule],
  exports: [ConfigModule, GQLModule, MongoModule],
})
export class CommonModule {}
