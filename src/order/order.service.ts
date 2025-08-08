import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { order_CreateDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(dto: order_CreateDto): Promise<Order> {
    const newOrder = this.orderRepository.create({
      hospitalId: dto.hospital_id,
      hospitalName: dto.hospital_name,
      receiveAddress: dto.receiveAddress,
      tel: dto.tel,
      starttime: dto.starttime,
      demand: dto.demand,
      companionId: dto.companion_id,
      status: 'pending', // 默认状态
      createdAt: new Date(),
    });

    return await this.orderRepository.save(newOrder);
  }
}
