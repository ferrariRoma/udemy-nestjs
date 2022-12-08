import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() { email, password }: CreateUserDto) {
    this.UsersService.create(email, password);
  }
}
