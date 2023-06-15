import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUsersInput } from './dto/list-users.input';
import { GoogleProfile } from './dto/google-profile';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const userExists = await this.userModel
      .findOne({ email: createUserInput.email })
      .exec();
    if (userExists) {
      throw new BadRequestException(
        `Email ${createUserInput.email} is already in use`,
      );
    }
    const saltOrRounds = 10;
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, saltOrRounds);
    const randomUsername = randomUUID();
    const user = await new this.userModel({
      username: randomUsername,
      provider: 'database',
      ...createUserInput,
    }).save();

    return user;
  }

  findAll(paginationQuery: ListUsersInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string | ObjectId) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.deleteOne();
  }

  async validateUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (user) {
      if (user.provider === 'google' && !user.password)
        throw new BadRequestException('This is a Google account');

      if (await bcrypt.compare(password, user.password)) return user;
    }
    return null;
  }

  async validateOAuthUser(profile: GoogleProfile) {
    const user = await this.userModel.findOne({ email: profile.email }).exec();
    if (user) {
      if (user.provider === 'database') {
        return await this.userModel
          .findOneAndUpdate(
            { _id: user.id },
            { $set: { provider: 'google', ...profile } },
            { new: true },
          )
          .exec();
      }
      return user;
    }

    const randomUsername = randomUUID();
    const newUser = await new this.userModel({
      username: randomUsername,
      provider: 'google',
      ...profile,
    }).save();
    return newUser;
  }
}
