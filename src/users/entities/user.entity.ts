import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop({ unique: true })
  @Field(() => String, { description: 'Username' })
  username: string;

  @Prop()
  @Field(() => String)
  picture: string;

  @Prop()
  @Field(() => String)
  provider: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
