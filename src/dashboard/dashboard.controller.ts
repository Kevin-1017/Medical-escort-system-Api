import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get()
  async getDashboard(@Request() req) {
    // 经过 AuthGuard 验证后，用户信息会存储在 req.userInfo 中
    return await this.dashboardService.getDashboard(req.userInfo.phoneNumber);
  }
}
