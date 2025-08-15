import {
  IsNumber,
  IsString,
  IsBoolean,
  Min,
  Length,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class companion_CreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @Length(11, 11, { message: '手机号长度必须为11位' })
  mobile: string;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  @Min(18, { message: '年龄至少为18岁' })
  age: number;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsString()
  name: string;

  @IsString()
  sex: string;
}

export class companion_DeleteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // 确保数组中的每个元素都是有效的数字
  id: number[];
}
