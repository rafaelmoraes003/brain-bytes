import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from '../schemas/user';

@Controller('login')
export class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginBody: User) {
    const { data } = await this.loginService.login(loginBody);
    return { _id: data };
  }
}
