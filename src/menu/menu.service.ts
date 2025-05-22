import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { menu_CreateDto } from './dto/menu.dto';

interface TreeMenu extends Omit<Menu, 'children'> {
  children?: TreeMenu[];
}

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async getMenus(): Promise<TreeMenu[]> {
    const menus = await this.menuRepository.find();

    // 构建树形结构
    const map = new Map<number, TreeMenu>();
    menus.forEach((menu) => map.set(menu.id, { ...menu }));

    const tree: TreeMenu[] = [];

    menus.forEach((menu) => {
      const item = map.get(menu.id);
      if (item && item.parentId && map.has(item.parentId)) {
        const parent = map.get(item.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }
      } else if (item && !item.parentId) {
        tree.push(item);
      }
    });

    return tree;
  }
  async createMenu(dto: menu_CreateDto): Promise<Menu> {
    const menu = new Menu();
    menu.label = dto.label;
    menu.parentId = dto.parentId ?? null;
    menu.disabled = dto.disabled ?? false;
    return await this.menuRepository.save(menu);
  }
}
