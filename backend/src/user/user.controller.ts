import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService;
  }
}
