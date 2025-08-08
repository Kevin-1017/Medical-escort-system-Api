import { Body, Controller, Post, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { CompanionService } from './companion.service';
import { companion_CreateDto, companion_DeleteDto } from './dto/companion.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('companion')
@UseGuards(AuthGuard)
export class CompanionController {
  constructor(private readonly companionService: CompanionService) {}

  @Post('create')
  async create(@Body() dto: companion_CreateDto) {
    await this.companionService.create(dto);
    return { message: 'Companion created successfully.' };
  }
  @Get()
  findAll() {
    return this.companionService.findAll();
  }

  @Post('delete')
  async delete(@Body() dto: companion_DeleteDto) {
    await this.companionService.delete(dto.ids);
    return 'Companion deleted successfully.';
  }
}
