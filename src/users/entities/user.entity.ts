import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
class ExternalLinksGQL {
  @Field(() => String)
  socialNetwork: string;
  @Field(() => String)
  href: string;
}

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId | string;

  @Prop()
  @Field(() => String)
  displayName: string;

  @Prop({ unique: true })
  @Field(() => String)
  email: string;

  @Prop({ unique: true })
  @Field(() => String)
  username: string;

  @Prop()
  @Field(() => String)
  picture: string;

  @Prop()
  @Field(() => String)
  provider: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => Boolean)
  verifiedAccount: boolean;

  @Prop({ trim: true })
  @Field(() => [String])
  techs: string[];

  @Prop()
  @Field(() => String)
  bio: string;

  @Prop()
  @Field(() => String)
  location: string;

  @Prop()
  @Field(() => [ExternalLinksGQL])
  externalLinks: [{ socialNetwork: string; href: string }];

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
