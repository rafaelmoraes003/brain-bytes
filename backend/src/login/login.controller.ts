import { Controller } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }
}
