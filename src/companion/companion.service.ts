import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Companion } from './entities/companion.entity';
import { companion_CreateDto } from './dto/companion.dto';
import {
  PaginationDto,
  paginate,
  PaginatedResponse,
} from '../utils/pagination';

@Injectable()
export class CompanionService {
  constructor(
    @InjectRepository(Companion)
    private companionRepository: Repository<Companion>,
  ) {}

  async findAll(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<Companion>> {
    return await paginate(this.companionRepository, pagination);
  }

  async save(dto: companion_CreateDto): Promise<Companion> {
    if (dto.id) {
      const existingCompanion = await this.companionRepository.findOneBy({
        id: dto.id,
      });
      if (!existingCompanion) {
        throw new NotFoundException(`没有这个companion`);
      }
      // 将新数据合并到现有实体中
      Object.assign(existingCompanion, dto);
      return this.companionRepository.save(existingCompanion);
    }

    return this.companionRepository.save(dto);
  }

  async delete(id: number[]): Promise<void> {
    const companions = await this.companionRepository.findBy({ id: In(id) });
    if (companions.length !== id.length) {
      throw new NotFoundException(`没有这个companion`);
    }

    await this.companionRepository.delete(id);
  }
}
