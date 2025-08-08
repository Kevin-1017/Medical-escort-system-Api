import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';
import { role_CreateDto, role_UpdateDto } from './dto/role.dto';
import {
  PaginationDto,
  paginate,
  PaginatedResponse,
} from '../utils/pagination';
import { Menu } from 'src/menu/entities/menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  // 获取全部角色权限
  async getRolesWithPermissions(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<any>> {
    return await paginate(
      this.roleRepository,
      pagination,
      { relations: ['menu'] },
      (role) => ({
        id: role.id,
        name: role.name,
        permissions: role.menu?.map((menu) => menu.id) || [],
      }),
    );
  }

  // 获取单个角色权限
  async getRoleByName(name: string): Promise<number[]> {
    const role = await this.roleRepository.findOne({
      where: { name },
      relations: ['menu'],
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    return role.menu.map((menu) => menu.id);
  }

  // 新建角色权限
  async createRole(dto: role_CreateDto): Promise<Role> {
    const { name, permissions } = dto;

    // Step 1: 创建角色
    const newRole = this.roleRepository.create({ name });
    await this.roleRepository.save(newRole);

    // Step 2: 查询权限对应的菜单项
    if (permissions && permissions.length > 0) {
      const menus = await this.menuRepository.findBy({
        id: In(permissions),
      });
      if (menus.length !== permissions.length) {
        throw new BadRequestException('某些菜单ID无效');
      }

      // Step 3: 设置角色和菜单的关系
      newRole.menu = menus;
      await this.roleRepository.save(newRole);
    }

    return newRole;
  }

  // 更新角色权限
  async updateRole(dto: role_UpdateDto): Promise<Role> {
    const { id, name, permissions } = dto;

    // 查找角色
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['menu'], // 假设 'menu' 是角色与权限的关联关系
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    // 更新角色名称
    role.name = name;

    // 查找对应权限/菜单项
    if (permissions) {
      const menus = await this.menuRepository.findBy({
        id: In(permissions),
      });

      // 如果存在无效的权限ID，即findByIds没有找到对应的菜单项，则抛出异常或处理
      if (menus.length !== permissions.length) {
        throw new BadRequestException('部分权限ID无效');
      }

      // 设置新的权限菜单
      role.menu = menus;
    }

    // 保存更新
    return await this.roleRepository.save(role);
  }

  // 删除角色权限
  async deleteRole(id: number): Promise<void> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('角色不存在');
    }

    await this.roleRepository.remove(role);
  }
}
