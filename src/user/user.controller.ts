import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminsOnly } from 'src/auth/guards/admin.guard';
import { AppResponse } from 'src/common/app-response';

@Controller('users')
@UseGuards(AuthGuard, AdminsOnly)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const data = await this.userService.findAll();
    return AppResponse('Users retrieved successfully', data);
  }
}
