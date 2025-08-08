import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class DashboardService {
  constructor(private readonly usersService: UsersService) {}
  async getDashboard(phoneNumber: string) {
    return this.usersService.findOne(phoneNumber);
  }
}
