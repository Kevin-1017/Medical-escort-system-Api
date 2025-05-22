import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { role_CreateDto, role_UpdateDto } from './dto/role.dto';
import { Menu } from 'src/menu/entities/menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async getRolesWithPermissions(): Promise<{
    list: {
      id: number;
      name: string;
      permissions: number[];
      permissionNames: string[];
    }[];
    total: number;
  }> {
    const roles = await this.roleRepository.find({
      relations: ['menus'],
      select: {
        id: true,
        name: true,
        menus: {
          id: true,
          label: true,
        },
      },
    });

    const list = roles.map((role) => ({
      id: role.id,
      name: role.name,
      permissions: role.menus.map((menu) => menu.id),
      permissionNames: role.menus.map((menu) => menu.label),
    }));
    return {
      list,
      total: list.length,
    };
  }

  async createRole(dto: role_CreateDto): Promise<Role> {
    const { name, permissions } = dto;

    // Step 1: 创建角色
    const newRole = this.roleRepository.create({ name });
    await this.roleRepository.save(newRole);

    // Step 2: 查询权限对应的菜单项
    if (permissions.length > 0) {
      const menus = await this.menuRepository.findBy({
        id: In(permissions),
      });
      if (menus.length !== permissions.length) {
        throw new Error('某些菜单ID无效');
      }

      // Step 3: 设置角色和菜单的关系
      newRole.menus = menus;
      await this.roleRepository.save(newRole);
    }

    return newRole;
  }

  async updateRole(dto: role_UpdateDto): Promise<Role> {
    const { id, name, permissions } = dto;

    // 查找角色
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['menus'], // 假设 'menus' 是角色与权限的关联关系
    });

    if (!role) {
      throw new Error('角色不存在');
    }

    // 更新角色名称
    role.name = name;

    // 查找对应权限/菜单项
    const menus = await this.menuRepository.findBy({
      id: In(permissions),
    });

    // 如果存在无效的权限ID，即findByIds没有找到对应的菜单项，则抛出异常或处理
    if (menus.length !== permissions.length) {
      throw new Error('部分权限ID无效');
    }

    // 设置新的权限菜单
    role.menus = menus;

    // 保存更新
    return await this.roleRepository.save(role);
  }
}
