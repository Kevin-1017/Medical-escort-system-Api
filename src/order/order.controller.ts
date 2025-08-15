import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { order_CreateDto, order_UpdateDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationDto } from 'src/utils/pagination';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() dto: order_CreateDto) {
    return await this.orderService.createOrder(dto);
  }

  @Get('list')
  async findForPage(@Query() pagination: PaginationDto) {
    return this.orderService.findForPage(pagination, pagination.id);
  }

  @Get('h5/list')
  async findForStatus(@Query('order_status') order_status: string) {
    return this.orderService.findForStatus(order_status);
  }

  @Get('h5/detail')
  async findOne(@Query('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Post('update')
  async update(@Body() dto: order_UpdateDto) {
    return this.orderService.update(dto);
  }
}
