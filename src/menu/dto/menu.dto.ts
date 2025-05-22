import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class menu_CreateDto {
  @IsString()
  label: string;

  @IsOptional()
  @IsBoolean()
  disabled?: boolean;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
