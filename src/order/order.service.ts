import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { order_CreateDto, order_UpdateDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import {
  paginate,
  PaginatedResponse,
  PaginationDto,
} from 'src/utils/pagination';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(dto: order_CreateDto): Promise<Order> {
    return await this.orderRepository.save(dto);
  }

  async findForPage(
    pagination: PaginationDto,
    id?: number,
  ): Promise<PaginatedResponse<Order>> {
    const options: any = {};
    if (id) {
      options.where = { id };
    }
    return await paginate(this.orderRepository, pagination, options);
  }
  async findForStatus(orderStatus: string): Promise<Order[]> {
    if (orderStatus === 'all') {
      return await this.orderRepository.find();
    } else {
      return await this.orderRepository.find({
        where: { order_status: orderStatus },
      });
    }
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`id不存在`);
    }
    return order;
  }

  async update(dto: order_UpdateDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: dto.id } });
    if (!order) {
      throw new NotFoundException(`id不存在`);
    }
    // 将dto中的数据赋值给order对象
    Object.assign(order, dto);
    return await this.orderRepository.save(order);
  }
}
