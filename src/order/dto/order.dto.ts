import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class order_CreateDto {
  @IsNumber()
  @IsNotEmpty({ message: '医院ID不能为空' })
  hospital_id: number;

  @IsString()
  @IsNotEmpty({ message: '医院名称不能为空' })
  hospital_name: string;

  @IsString()
  receiveAddress: string;

  @IsString()
  tel: string;

  @IsString()
  start_time: string;

  @IsString()
  demand: string;

  @IsNumber()
  companion_id: number;

  @IsString()
  companion_name: string;
}

export class order_UpdateDto {
  @IsNumber()
  id: number;

  @IsString()
  order_status: string;
}
