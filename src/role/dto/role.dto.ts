import { IsNumber, IsString, IsArray } from 'class-validator';

// 更新角色以及对应的菜单权限
export class role_UpdateDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  permissions: number[];
}

// 新建角色以及对应的菜单权限
export class role_CreateDto {
  @IsString()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  permissions: number[];
}
