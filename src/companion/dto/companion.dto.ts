import {
  IsNumber,
  IsString,
  IsBoolean,
  Min,
  Length,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class companion_CreateDto {
  @IsString()
  @Length(11, 11, { message: '手机号长度必须为11位' })
  mobile: string;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  @Min(18, { message: '年龄至少为18岁' })
  age: number;

  @IsString()
  avatar: string;

  @IsString()
  name: string;

  @IsString()
  sex: string; // '1' for male, '2' for female
}
export class companion_DeleteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // 确保数组中的每个元素都是有效的数字
  ids: number[];
}
