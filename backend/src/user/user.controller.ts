import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { Categories } from '../types/Categories';
import { User } from '../schemas/user';
import { UserService } from './user.service';

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

  @Patch(':_id/category/:category')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async addCategory(
    @Param('_id') _id: Types.ObjectId,
    @Param('category') category: Categories,
  ) {
    await this.userService.addCategory(_id, category);
    return;
  }

  @Patch(':_id/bytes/:operation/:bytes')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async handleBytes(
    @Param('_id') _id: Types.ObjectId,
    @Param('operation') operation: string,
    @Param('bytes') bytes: number,
  ) {
    await this.userService.handleBytes(_id, operation, bytes);
    return;
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
    return;
  }
}
