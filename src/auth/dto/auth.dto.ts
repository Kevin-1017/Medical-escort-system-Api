// 定义DTO(数据传输对象) 定义认证请求的数据结构
import { Length, IsNotEmpty } from 'class-validator';

export class auth_RegisterDto {
  @Length(11, 11, { message: '手机号长度必须为11位' })
  phoneNumber: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  validCode: string;
}

export class auth_LoginDto {
  @Length(11, 11, { message: '手机号长度必须为11位' })
  phoneNumber: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
