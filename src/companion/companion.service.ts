// src/companion/companion.service.ts
import { Injectable } from '@nestjs/common';
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
}
