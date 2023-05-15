import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getHello() {
    return { message: this.appService.getHello() };
  }
}
