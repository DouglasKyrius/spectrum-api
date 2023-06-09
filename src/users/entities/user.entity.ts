import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId | string;

  @Prop()
  @Field(() => String, { description: 'Name' })
  displayName: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'User email' })
  email: string;

  @Prop({ default: randomUUID(), unique: true })
  @Field(() => String, { description: 'Username' })
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
