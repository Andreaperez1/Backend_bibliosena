import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { JwtAuthGuard } from 'src/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() signDto: LoginDto) {
    return await this.authService.signIn(signDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  prueba(){
    return "Estas logueado";
  }

}
