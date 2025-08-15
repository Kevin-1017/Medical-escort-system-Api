import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { CompanionService } from './companion.service';
import { companion_CreateDto, companion_DeleteDto } from './dto/companion.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PaginationDto } from '../utils/pagination';

@Controller('companion')
@UseGuards(AuthGuard)
export class CompanionController {
  constructor(private readonly companionService: CompanionService) {}

  @Get('list')
  async findAll(@Query() pagination: PaginationDto) {
    return await this.companionService.findAll(pagination);
  }

  @Post('save')
  async save(@Body() dto: companion_CreateDto) {
    return await this.companionService.save(dto);
  }

  @Post('delete')
  async delete(@Body() dto: companion_DeleteDto) {
    return await this.companionService.delete(dto.id);
  }
}
