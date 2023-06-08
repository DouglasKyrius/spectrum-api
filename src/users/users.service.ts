import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUsersInput } from './dto/list-users.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    const userExists = await this.userModel.findOne({ email: createUserInput.email }).exec();
    if (userExists) {
      throw new BadRequestException(`Email ${createUserInput.email} is already in use`);
    }
    const saltOrRounds = 10;
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, saltOrRounds);
    const user = await new this.userModel(createUserInput).save();
    // TODO
    // return this.authService.generateUserCredentials(user);
    return user;
  }

  findAll(paginationQuery: ListUsersInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel.findOneAndUpdate({ id }, { $set: updateUserInput }, { new: true }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.deleteOne();
  }
}
