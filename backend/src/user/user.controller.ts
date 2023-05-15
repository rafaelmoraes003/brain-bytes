import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  private userService: UserService

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
}
