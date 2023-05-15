import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { GetHelloResponse } from './interfaces/GetHelloResponse';

@Controller()
export class AppController {
  private appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello(): GetHelloResponse {
    return { message: this.appService.getHello() };
  }
}
