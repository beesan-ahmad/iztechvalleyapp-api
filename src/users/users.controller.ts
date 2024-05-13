import { Controller, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from './user-details.interface';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.usersService.findById(id);
  }
}
