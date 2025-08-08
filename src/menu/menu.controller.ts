import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { menu_CreateDto } from './dto/menu.dto';
import { Menu } from './entities/menu.entity';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('getMenu')
  async getMenu(): Promise<any> {
    return this.menuService.getMenu();
  }
  @Post('createMenu')
  createMenu(@Body() dto: menu_CreateDto): Promise<Menu> {
    return this.menuService.createMenu(dto);
  }

  @Delete('deleteMenu/:id')
  async deleteMenu(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.menuService.deleteMenu(id);
  }

  @Put('updateMenu/:id')
  async updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<menu_CreateDto>,
  ): Promise<Menu> {
    return this.menuService.updateMenu(id, dto);
  }

  @Get('getMenuById/:id')
  async getMenuById(@Param('id', ParseIntPipe) id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }
}
