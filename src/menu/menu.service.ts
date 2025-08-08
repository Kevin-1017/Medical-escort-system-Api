import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async getMenu(): Promise<TreeMenu[]> {
    const menus = await this.menuRepository.find({
      order: {
        parent_id: 'ASC',
        id: 'ASC',
      },
    });

    // 构建树形结构
    const map = new Map<number, TreeMenu>();
    const tree: TreeMenu[] = [];

    // 先将所有菜单项放入map中
    menus.forEach((menu) => {
      map.set(menu.id, { ...menu, children: [] });
    });

    // 构建树形结构
    menus.forEach((menu) => {
      const item = map.get(menu.id);
      if (item) {
        if (menu.parent_id && map.has(menu.parent_id)) {
          // 有父节点的情况
          const parent = map.get(menu.parent_id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(item);
          }
        } else {
          // 没有父节点的情况，作为根节点
          tree.push(item);
        }
      }
    });

    return tree;
  }

  async createMenu(dto: menu_CreateDto): Promise<Menu> {
    const menu = this.menuRepository.create({
      name: dto.name,
      path: dto.path,
      icon: dto.icon,
      parent_id: dto.parent_id ?? null,
    });

    return await this.menuRepository.save(menu);
  }
  async deleteMenu(id: number): Promise<void> {
    // 首先检查菜单是否存在
    const menu = await this.menuRepository.findOne({
      where: { id },
    });

    if (!menu) {
      throw new Error('菜单不存在');
    }

    // 查找所有子菜单
    const childMenus = await this.findChildMenus(id);

    // 删除所有子菜单
    if (childMenus.length > 0) {
      await this.menuRepository.delete({
        id: In(childMenus.map((menu) => menu.id)),
      });
    }

    // 删除菜单本身
    await this.menuRepository.delete(id);
  }

  private async findChildMenus(parentId: number): Promise<Menu[]> {
    const allMenus = await this.menuRepository.find();
    const childMenus: Menu[] = [];

    const findChildren = (pid: number) => {
      const children = allMenus.filter((menu) => menu.parent_id === pid);
      children.forEach((child) => {
        childMenus.push(child);
        findChildren(child.id);
      });
    };

    findChildren(parentId);
    return childMenus;
  }

  async updateMenu(id: number, dto: Partial<menu_CreateDto>): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
    });

    if (!menu) {
      throw new Error('菜单不存在');
    }

    // 更新菜单属性
    Object.assign(menu, {
      name: dto.name ?? menu.name,
      path: dto.path ?? menu.path,
      icon: dto.icon ?? menu.icon,
      parent_id: dto.parent_id ?? menu.parent_id,
    });

    return await this.menuRepository.save(menu);
  }

  async getMenuById(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
    });

    if (!menu) {
      throw new Error('菜单不存在');
    }

    return menu;
  }
}
