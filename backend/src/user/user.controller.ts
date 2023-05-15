import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user';

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
}
