import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService, pincodeDto } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/testValidatePincode')
  async testValidatePincode( @Body() body: pincodeDto){
  return this.appService.validatePincode(body);
}
}