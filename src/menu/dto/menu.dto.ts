import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class menu_CreateDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  icon: string;

  @IsOptional() // 字段可选
  @IsNumber()
  parent_id: number;
}
