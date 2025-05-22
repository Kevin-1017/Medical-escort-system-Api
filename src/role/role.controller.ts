import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { role_CreateDto, role_UpdateDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRolesWithPermissions() {
    return this.roleService.getRolesWithPermissions();
  }
  @Post('create')
  createRole(@Body() role: role_CreateDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Post('update')
  async update(@Body() updateRoleDto: role_UpdateDto): Promise<Role> {
    return this.roleService.updateRole(updateRoleDto);
  }
}
