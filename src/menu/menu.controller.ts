import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { menu_CreateDto } from './dto/menu.dto';
import { Menu } from './entities/menu.entity';
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('getmenus')
  async getMenus(): Promise<any> {
    return this.menuService.getMenus();
  }
  @Post('create')
  createMenu(@Body() dto: menu_CreateDto): Promise<Menu> {
    return this.menuService.createMenu(dto);
  }
}
