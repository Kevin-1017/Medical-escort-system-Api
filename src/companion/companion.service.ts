import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companion } from './entities/companion.entity';
import { companion_CreateDto } from './dto/companion.dto';

@Injectable()
export class CompanionService {
  constructor(
    @InjectRepository(Companion)
    private companionRepository: Repository<Companion>,
  ) {}

  async create(dto: companion_CreateDto): Promise<Companion> {
    const newCompanion = this.companionRepository.create(dto);
    return this.companionRepository.save(newCompanion);
  }

  async findAll(): Promise<{
    list: {
      id: number;
      mobile: string;
      active: boolean;
      name: string;
      age: number;
      sex: string;
      avatar: string;
    }[];
    total: number;
  }> {
    return {
      list: await this.companionRepository.find(),
      total: await this.companionRepository.count(),
    };
  }

  async delete(ids: number[]): Promise<void> {
    const notFoundIds: number[] = [];

    for (const id of ids) {
      const companion = await this.companionRepository.findOneBy({ id });

      if (!companion) {
        notFoundIds.push(id);
      }
    }

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `Companions with IDs ${notFoundIds.join(', ')} not found`,
      );
    }

    await this.companionRepository.delete(ids);
  }
}
