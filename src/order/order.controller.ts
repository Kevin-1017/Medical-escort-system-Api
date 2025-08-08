import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { order_CreateDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  async createOrder(@Body() dto: order_CreateDto) {
    const createdOrder = await this.orderService.createOrder(dto);
    return { message: '订单创建成功', data: createdOrder };
  }
}
