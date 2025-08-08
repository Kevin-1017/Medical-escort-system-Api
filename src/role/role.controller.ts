import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { role_CreateDto, role_UpdateDto } from './dto/role.dto';
import { PaginationDto } from '../utils/pagination';
import { Role } from './entities/role.entity';
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRolesWithPermissions(@Query() pagination: PaginationDto) {
    return this.roleService.getRolesWithPermissions(pagination);
  }

  @Get('getRolePermissionsByName')
  async getRolePermissionsByName(@Query('name') name: string) {
    return this.roleService.getRoleByName(name);
  }

  @Post('create')
  createRole(@Body() role: role_CreateDto): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @Post('update')
  async update(@Body() updateRoleDto: role_UpdateDto): Promise<Role> {
    return this.roleService.updateRole(updateRoleDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
