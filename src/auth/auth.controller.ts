import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUseryDto } from './dto/LoginUser';
import { RegisterUserDto } from './dto/RegisterUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiResponse({ status: 403, description: 'Password must contain at least 8 characters' })
  @ApiResponse({ status: 409, description: 'Already exists' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiOperation({ summary: 'Registers new user', description: 'Required:all.' })
  @ApiTags('Auth')
  @Post('/register')
  register(@Body() dto: RegisterUserDto, @Req() req: Request) {
    return this.AuthService.register(dto, req);
  }

  @ApiResponse({ status: 409, description: 'User Not Found' })
  @ApiResponse({ status: 403, description: 'Password is invalid' })
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiOperation({ summary: 'Logins existing user', description: 'Required:all.' })
  @ApiTags('Auth')
  @Post('/login')
  login(@Body() dto: LoginUseryDto, @Req() req: Request) {
    return this.AuthService.login(dto, req);
  }
}
