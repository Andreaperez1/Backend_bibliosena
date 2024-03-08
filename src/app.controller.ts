import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './user/dto/User.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

}