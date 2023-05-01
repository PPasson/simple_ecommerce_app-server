import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService, /*(private readonly employeeService: EmployeeService*/) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: LoginDTO, @Request() req) {
    return await this.authService.login(req.body);
  }

  @Post('/logout')
  async logout(@Request() req){
    return await this.authService.logout(req.body);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto){
    return await this.authService.registerUser(body);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Get('/profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
