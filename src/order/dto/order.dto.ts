import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class order_CreateDto {
  @IsString()
  @IsNotEmpty({ message: '医院ID不能为空' })
  hospital_id: string;

  @IsString()
  @IsNotEmpty({ message: '医院名称不能为空' })
  hospital_name: string;

  @IsString()
  receiveAddress: string;

  @IsString()
  tel: string;

  @IsNumber()
  starttime: number;

  @IsString()
  demand: string;

  @IsNumber()
  companion_id: number;
}
