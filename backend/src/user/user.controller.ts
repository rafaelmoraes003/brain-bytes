import { Controller, Delete, Get, HttpCode, HttpStatus, Body, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { User } from '../schemas/user.schema';

@Controller('user')
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() user: User) {
    const { data } = await this.userService.create(user);
    return data;
  }

  @Get(':_id')
  @HttpCode(HttpStatus.OK)
  public async getById(@Param('_id') _id: Types.ObjectId) {
    const { data } = await this.userService.getById(_id);
    return data;
  }

  @Delete(':_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('_id') _id: Types.ObjectId) {
    await this.userService.delete(_id);
  }
}
